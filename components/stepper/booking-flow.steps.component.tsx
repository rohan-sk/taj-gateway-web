import React, { useContext, useEffect, useRef } from "react"
import { PropertyStore, UserStore } from "../../store"
import { useRouter } from "next/router"
import { CONSTANTS } from "../constants"
import { observer } from "mobx-react-lite"
import { useMobileCheck } from "../../utils/isMobilView"
import fetchRateFilter from "../../utils/fetchRateFilter"
import { BookFlowStepsTypes, StepperItems } from "./types"
import { Box, Step, Stepper, Typography } from "@mui/material"
import { GLOBAL_STORES, PAGE_STORES } from "../../utils/Constants"
import BookingsFlowStore from "../../features/booking/store/pageStore/booking.store"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import BookingFlowGlobalStore from "../../features/booking/store/globalStore/booking.flow.store"
import {
  MainBox,
  TitleBox,
  StyledButton,
  TitleDivider,
  StepperConnector,
  TitleWrapper,
} from "../BookingFlow/styles/stepper-button"

const BookFlowSteps = (props: BookFlowStepsTypes) => {
  const router = useRouter()
  const isMobile = useMobileCheck()
  const pageContext = useContext(PageContext)
  const context: any = useContext(IHCLContext)
  const parentRef = useRef<any>(null)

  const bookingFlowPageStore = pageContext?.getPageStore(PAGE_STORES?.bookingFlowStore) as BookingsFlowStore

  const { currentStepper, updateCurrentStepper } = bookingFlowPageStore

  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore

  const propertyStore = context?.getGlobalStore(GLOBAL_STORES.propertyStore) as PropertyStore

  const userStore = context?.getGlobalStore(GLOBAL_STORES?.userStore) as UserStore

  const {
    loading,
    roomsAdded,
    cartDetails,
    guestDetails,
    currentRoomId,
    updateGuestDetails,
    userEnteredPromoCode,
    setRoomsAvailability,
    checkAvailabilityPayload,
    setCheckAvailabilityPayload,
  } = bookingFlowGlobalStore

  const urlHotelId: any = router.query?.hotelId || propertyStore?.propertyData?.hotelId
  const customerTier = global?.window?.localStorage?.getItem("userTier")
  const customerHash = global?.window?.localStorage?.getItem("customerHash")
  const isReservationTab = currentStepper.stepName === CONSTANTS?.RESERVATION
  const currentCartDetailsLength = cartDetails?.cartDetailsResponse?.items?.[0]?.hotel?.[0]?.room?.length
  const isAllRoomsSelected = guestDetails?.data?.length === currentCartDetailsLength
  const totalAdults = guestDetails?.data?.reduce((total: number, current: any) => {
    return total + current?.child
  }, 0)

  const totalChildren = guestDetails?.data?.reduce((total: number, current: any) => {
    return total + current?.adults
  }, 0)

  const handleScroll = (element: any) => {
    if (element) {
      element?.scrollIntoView({
        block: "center",
        behavior: "smooth",
        inline: "center",
      })
    }
  }

  useEffect(() => {
    if (userStore?.userDetails?.userHash !== "" && customerHash) {
      bookingFlowGlobalStore?.mergeCart()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingFlowGlobalStore, userStore?.userDetails?.userHash])
  useEffect(() => {
    if (loading && parentRef?.current && !isReservationTab) {
      handleScroll(parentRef?.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  useEffect(() => {
    if (isAllRoomsSelected) {
      updateCurrentStepper({
        stepName: CONSTANTS?.RESERVATION,
      })
    } else {
      updateCurrentStepper({
        stepName: CONSTANTS?.ROOM,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAllRoomsSelected])

  useEffect(() => {
    if (!isAllRoomsSelected && (roomsAdded || currentCartDetailsLength <= 0)) {
      updateRoomSelection(currentRoomId)
      const element = document.getElementById(`step-${currentRoomId}`)
      handleScroll(element)
    } else if (!isAllRoomsSelected) {
      updateRoomSelection(1)
      const element = document.getElementById("step-1")
      handleScroll(element)
    } else {
      const element = document.getElementById("reservation")
      handleScroll(element)
      updateCurrentStepper({ stepName: CONSTANTS?.RESERVATION })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentRoomId,
    guestDetails?.data?.length,
    totalAdults,
    totalChildren,
    checkAvailabilityPayload?.startDate,
    checkAvailabilityPayload?.endDate,
    checkAvailabilityPayload?.promoCode,
    checkAvailabilityPayload?.promoType,
    checkAvailabilityPayload?.couponCode,
    checkAvailabilityPayload?.agentId,
    customerTier,
    urlHotelId,
  ])

  const handleBooking: Function = async (id: number) => {
    const urlParams = new URLSearchParams(global?.window?.location?.search)
    const activeRoom = guestDetails?.data?.filter((room: any) => room?.id == id)?.[0]
    setCheckAvailabilityPayload(
      activeRoom?.child,
      activeRoom?.adults,
      1,
      checkAvailabilityPayload.endDate,
      checkAvailabilityPayload.startDate,
      urlHotelId,
      fetchRateFilter() || undefined,
      global?.window?.localStorage?.getItem("userTier") || undefined,
      urlParams?.get("isFromOLP") ? true : checkAvailabilityPayload.isOfferLandingPage,
      urlParams?.get("offerRateCode") !== null ? urlParams?.get("offerRateCode") : checkAvailabilityPayload.rateCode,
      urlParams?.get("offerPromoCode") !== null
        ? urlParams?.get("offerPromoCode")
        : urlParams?.get("voucherPromoCode") !== null
        ? urlParams?.get("voucherPromoCode")
        : checkAvailabilityPayload.promoCode,
      checkAvailabilityPayload.couponCode,
      checkAvailabilityPayload.agentId,
      urlParams?.get("isFromVoucher") ? true : false,
      userEnteredPromoCode?.index === 1 || userEnteredPromoCode?.index === 3 ? true : false,
      urlParams?.get("memberOfferType") !== null ? urlParams?.get("memberOfferType") : "",
    )
    if (checkAvailabilityPayload?.startDate) {
      await setRoomsAvailability()
    }
  }

  const updateRoomSelection = (id: number) => {
    const isSelectedRoom = guestDetails?.data?.map((item: any) =>
      item?.id === id ? { ...item, isSelected: true } : { ...item, isSelected: false },
    )
    updateGuestDetails({ data: isSelectedRoom })
    handleBooking(id)
  }

  return (
    <>
      <TitleBox aria-label="BookFlowSteps" ref={parentRef}>
        <TitleWrapper>
          <TitleDivider />
          <Typography variant={isMobile ? "m-heading-s" : "heading-m"}>
            {isReservationTab ? CONSTANTS?.RESERVATION : props?.title}
          </Typography>
          <TitleDivider />
        </TitleWrapper>
      </TitleBox>
      <MainBox>
        <Box
          sx={{
            overflowX: "auto",
            margin: isMobile ? "0vw" : "0vw 2vw",
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}>
          <Stepper
            connector={<StepperConnector />}
            sx={{
              marginBottom: "0.5vw",
              marginLeft: isMobile ? (guestDetails?.data?.length > 1 ? "1vw" : "0") : "",
              justifyContent: isMobile ? (guestDetails?.data?.length > 1 ? "flex-start" : "center") : "center",
            }}>
            {props?.stepperItems?.map((item: StepperItems, index: number) =>
              item.type === CONSTANTS.DYNAMIC ? (
                guestDetails?.data?.map((childItem: any, index: number) => (
                  <Step key={index} sx={{ padding: "0vw" }} id={`step-${index + 1}`}>
                    <StyledButton
                      key={index}
                      variant="outlined"
                      disableRipple={true}
                      $isSelected={childItem?.isSelected}
                      endIcon={
                        cartDetails?.cartDetailsResponse?.items?.[0]?.hotel?.[0]?.room?.find(
                          (card: any) => card?.roomNumber === childItem?.id,
                        )?.roomNumber > 0 ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src="../selected-tick.png" alt="Image" />
                        ) : (
                          ""
                        )
                      }
                      disabled={
                        cartDetails?.cartDetailsResponse?.items?.[0]?.hotel?.[0]?.room?.find(
                          (card: any) => card?.roomNumber === childItem?.id,
                        )?.roomNumber > 0
                          ? true
                          : false
                      }>
                      {isReservationTab
                        ? `${childItem?.room} ${childItem?.id}`
                        : `SELECT ${childItem?.room} ${childItem?.id}`}
                    </StyledButton>
                  </Step>
                ))
              ) : (
                <Step key={index} sx={{ padding: "0vw" }} id="reservation">
                  <StyledButton
                    key={index}
                    variant="outlined"
                    disableRipple={true}
                    disabled={!isAllRoomsSelected}
                    $isSelected={currentStepper.stepName === item.title}
                    onClick={() => {
                      if (currentStepper.stepName !== item.title) {
                        updateCurrentStepper({
                          stepName: item.title,
                        })
                        updateRoomSelection(-2) // to set all the isSelected to false
                      }
                    }}>
                    {item.title}
                  </StyledButton>
                </Step>
              ),
            )}
          </Stepper>
        </Box>
      </MainBox>
    </>
  )
}

export default observer(BookFlowSteps)
