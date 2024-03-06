import React, { Fragment, useContext, useEffect, useMemo, useState, useRef } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { PathType } from "../../../types"
import { observer } from "mobx-react-lite"
import { theme } from "../../../../lib/theme"
import { ROUTES } from "../../../../utils/routes"
import { CONSTANTS, ICONS } from "../../../constants"
import { Box, Stack, Typography } from "@mui/material"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import fetchRateFilter from "../../../../utils/fetchRateFilter"
import { useMobileCheck } from "../../../../utils/isMobilView"
import fetchHotelRoomData from "../../../../utils/fetchRoomData"
import { useAesthetics } from "../../../../utils/fetchAsthetics"
import { dateFormatConverter } from "../../../../utils/getDate"
import { CustomCheckBox } from "../../../hoc/CustomCheckBox/Checkbox"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import BookingFlowGlobalStore from "../../../../features/booking/store/globalStore/booking.flow.store"
import { handler as fetchOrderDetails } from "../../../../features/booking/api/handlers/fetch-order-details.service"
import { handler as ModifyBookingOrder } from "../../../../features/booking/api/handlers/modify-booking-order.service"

//*Styles
import { ButtonWrapper } from "./price-change-chart.styles"
import { TitleWrapper, SelectedRooms } from "./edit-rooms-styles"

//*Components
const BackButton = dynamic(() => import("../../back-button"))
const BasicModal = dynamic(() => import("../../../hoc/modal/modal"))
const EditDateComponent = dynamic(() => import("./edit-dates.component"))
const PiceChangeChart = dynamic(() => import("./Price-change-chart.component"))
const LoadingSpinner = dynamic(() => import("../../../../utils/SpinnerComponent"))
const HotelRoomsDetails = dynamic(() => import("./hotel-rooms-details.component"))
const RenderActionItem = dynamic(() => import("../../../hoc/actions/action-items-ui"))
const BookingModalContent = dynamic(() => import("../../../../features/booking/ui/booking-modal-content.component"))

import data from "./booking-json.json"

interface RoomsInterface {
  title: string
  subtitle: string
  parameterMap: any
  primaryAction: {
    url: string
    urlType: any
    title: string
    variant: string
    checkBox: PathType | undefined
  }
  secondaryAction: {
    url: string
    urlType: any
    title: string
    variant: string
    checkBox: PathType | undefined
  }
  aesthetic: any
}

const HotelRoomsComponent = ({
  title,
  subtitle,
  parameterMap,
  primaryAction,
  secondaryAction,
  aesthetic,
}: RoomsInterface) => {
  const router = useRouter()
  const isMobile = useMobileCheck()
  const datesRef = useRef<any>(null)
  const buttonRef = useRef<any>(null)
  const orderId = router?.query?.orderId
  const context: any = useContext(IHCLContext)
  const { cardPadding } = useAesthetics(aesthetic?._ref)
  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES.bookingFlowStore) as BookingFlowGlobalStore

  const {
    loading,
    setLoading,
    bookingError,
    errorMessage,
    roomsNewPrice,
    setRoomsNewPrice,
    setModifiedRooms,
    isModifiedSuccess,
    setIsModifySuccess,
    updateBookingError,
    modifiedRoomsDetails,
    setHotelNameAndAddress,
    updateBookingErrorMessage,
    setChangeDatesAvailability,
    setCheckAvailabilityPayload,
    changeDatesRoomsAvailability,
    emptyChangeDatesAvailability,
  } = bookingFlowGlobalStore

  const [date, setDate] = useState<any>([null, null])
  const [roomDetails, setRoomDetails] = useState<any>(null)
  const [roomDetailData, setRoomDetailData] = useState<any>()
  const [checkedDates, setCheckedDates] = useState<boolean>(false)
  const [selectedRooms, setSelectedRooms] = useState<boolean[]>([])
  const [selectedRoomsData, setSelectedRoomsData] = useState<any>([])
  const [hideEditDates, setHideEditDates] = useState<boolean>(false)

  const endDate = dateFormatConverter(date?.[1])
  const startDate = dateFormatConverter(date?.[0])
  const isAllRoomsSelected = selectedRooms?.every((box: any) => box)
  const complementaryBasePrice = roomDetails?.complementaryBasePrice
  const isComplementary = roomDetails?.voucherRedemption?.isComplementary
  const editableRooms = roomDetails?.rooms?.filter(
    (room: any) => room?.status?.toLowerCase() === CONSTANTS?.STATUS_TYPES?.CONFIRMED,
  )

  //? setting the check availability payload on page load
  useEffect(() => {
    setCheckAvailabilityPayload(
      selectedRoomsData?.children,
      selectedRoomsData?.adult,
      selectedRoomsData?.length,
      endDate,
      startDate,
      roomDetails?.hotelId,
      fetchRateFilter() || undefined,
      global?.window?.localStorage?.getItem("userTier") || undefined,
      false,
      "",
      "",
      "",
      "",
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRoomsData, startDate, endDate, selectedRooms?.length, roomDetails?.hotelId])

  const handleScroll = () => {
    if (datesRef?.current) {
      datesRef.current.scrollIntoView({
        block: "center",
        inline: "nearest",
        behavior: "smooth",
      })
    }
  }

  //? handling the parent checkbox for room selection
  const handleSelect = () => {
    if (selectedRooms?.every((box: any) => box)) {
      setSelectedRoomsData([])
      setSelectedRooms(Array.from({ length: editableRooms?.length }, () => false))
    } else {
      setSelectedRoomsData(editableRooms)
      setSelectedRooms(Array.from({ length: editableRooms?.length }, () => true))
      setRoomsNewPrice([])
      handleScroll()
    }
    setHideEditDates(false)
    setDate([])
  }

  //* clears all selected data
  const beforeChange = () => {
    setCheckedDates(false)
    setRoomsNewPrice([])
    setSelectedRoomsData([])
    setSelectedRooms(Array.from({ length: editableRooms?.length }, () => false))
    setIsModifySuccess(false)
  }

  //? Fetching the order details
  useEffect(() => {
    const res: any = fetchOrderDetails.apiCall(orderId)
    res?.then((data: any) => setRoomDetails(data?.data?.orderLineItems?.[0]?.hotel))
    beforeChange() //? to clear data on initial render
    return () => {
      emptyChangeDatesAvailability()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setSelectedRooms(Array.from({ length: editableRooms?.length }, () => false))
  }, [editableRooms?.length])

  //*Invoking the change date availability API
  const handleCheckRoomsAvailability = async () => {
    const roomsPayload = selectedRoomsData?.map((room: any) => {
      const roomData = room?.modifyBooking || room
      return {
        roomNumber: roomData?.roomNumber,
        rateCode: roomData?.rateCode,
        adults: roomData?.adult,
        children: roomData?.children,
      }
    })
    await setChangeDatesAvailability({
      hotelId: roomDetails?.hotelId,
      checkInDate: dateFormatConverter(startDate),
      checkOutDate: dateFormatConverter(endDate),
      rooms: roomsPayload,
    })
    setCheckedDates(true)
  }

  const handleErrorModalClose = () => {
    updateBookingError(false)
    updateBookingErrorMessage("")
    router?.back()
  }

  //*Invoking the modify booking API
  const confirmModifiedDates = async () => {
    const payload = {
      orderId: orderId,
      rateFilter: fetchRateFilter(),
      memberTier: global?.window?.localStorage?.getItem("userTier")
        ? global?.window?.localStorage?.getItem("userTier")
        : "Copper",
      modifyBookingDetails: roomsNewPrice?.map((item: any) => {
        const room = item?.modifyBooking || item
        return {
          isPackageCode: room?.isPackage,
          message: room?.message || "",
          cost: room?.cost,
          adult: room?.adult,
          roomId: room?.roomId,
          roomName: room?.roomName,
          children: room?.children,
          packageCode: room?.packageCode,
          roomTypeCode: room?.roomType,
          isServiceable: false,
          checkIn: startDate,
          checkOut: endDate,
          rateCode: room?.rateCode,
          currency: room?.currency,
          roomNumber: room?.roomNumber,
          packageName: room?.packageName,
          roomImgUrl: room?.roomImgUrl,
        }
      }),
    }
    await setModifiedRooms(payload)
    if (isMobile && isModifiedSuccess) {
      setHideEditDates(true)
    } else {
      setHideEditDates(false)
    }
  }

  //* To get the hotel address details from CMS
  useEffect(() => {
    async function fetchHotelData() {
      let response = await fetchHotelRoomData(roomDetails?.hotelId || "")
      setHotelNameAndAddress(
        response?.hotelBannerTitle?.desktopTitle?.join(" "),
        response?.hotelAddress?.addressLine1,
        response?.hotelAddress?.country,
        response?.hotelAddress?.pincode,
        response?.hotelAddress?.state,
        response?.hotelAddress?.city,
        response?.hotelContact?.email?.filter((email: any) => email?.type?.toLowerCase() === "business")?.[0]?.email,
        response?.hotelContact?.phone?.filter((email: any) => email?.type?.toLowerCase() === "business")?.[0]?.mobile,
        response?.subAccountId,
      )
      setRoomDetailData(response?.hotelRooms?.roomsList)
    }
    roomDetails?.hotelId && fetchHotelData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomDetails?.hotelId])

  //* Merging the API and CMS response
  const latestRoomsAvailability = useMemo(() => {
    const filteredResponse = changeDatesRoomsAvailability?.availabilityResponse?.roomTypes?.map((roomType: any) => {
      const roomData = roomType?.rooms?.map((apiRoom: any) => {
        const filteredRoomTypes = roomDetailData?.find(
          (sanityRoom: any) => sanityRoom?.roomCode?.toLowerCase() === apiRoom?.roomCode?.toLowerCase(),
        )
        const mergedData = filteredRoomTypes
          ? {
              ...apiRoom,
              roomImage: filteredRoomTypes?.basicInfo?.media,
              roomName: filteredRoomTypes?.basicInfo?.title,
            }
          : { ...apiRoom }
        return mergedData ? { ...mergedData } : null
      })
      return {
        ...roomType,
        rooms: [...roomData?.filter((room: any) => room?.roomName)],
      }
    })
    let finalResponse = filteredResponse?.filter((item: any) => item)
    return {
      ...changeDatesRoomsAvailability?.availabilityResponse,
      roomTypes: finalResponse,
    }
  }, [roomDetailData, changeDatesRoomsAvailability?.availabilityResponse])

  const getOldPrice = (roomNumber: number) => {
    const filteredRoom = editableRooms?.filter((room: any) => room?.roomNumber === roomNumber)?.[0]
    return filteredRoom?.modifyBooking?.price || filteredRoom?.price
  }

  const updateModifiedPrice = async () => {
    const availableRoomCodes = latestRoomsAvailability?.roomTypes
    if (availableRoomCodes) {
      const AvailableRoomData = await selectedRoomsData?.map((bookedRoom: any) => {
        let newRate: any
        let isRoomCodeExists: any
        availableRoomCodes?.forEach((availableRoom: any) => {
          if (bookedRoom?.roomNumber === availableRoom?.roomNumber) {
            availableRoom?.rooms?.forEach((newRoom: any) => {
              if (
                bookedRoom?.roomNumber === availableRoom?.roomNumber &&
                bookedRoom?.roomType?.toLowerCase() === newRoom?.roomCode?.toLowerCase()
              ) {
                isRoomCodeExists = true
                newRate = {
                  total: newRoom?.total,
                  tax: newRoom?.tax,
                }
              }
            })
          }
        })
        //* adding a boolean value in booked room details to check the availability
        return {
          ...bookedRoom,
          cost: newRate?.total?.amount,
          roomNumber: bookedRoom?.roomNumber,
          checkIn: startDate,
          checkOut: endDate,
          shouldHide: false,
          available: Boolean(isRoomCodeExists && newRate),
          showRooms: !Boolean(isRoomCodeExists && newRate),
          originalPrice: getOldPrice(bookedRoom?.roomNumber),
          priceDifference: isComplementary
            ? complementaryBasePrice
            : newRate?.total?.amount - getOldPrice(bookedRoom?.roomNumber),
        }
      })
      await setRoomsNewPrice([...roomsNewPrice, ...AvailableRoomData])
      setSelectedRoomsData([])
    }
  }

  //? checking selected room availability on selected date
  useEffect(() => {
    updateModifiedPrice()
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestRoomsAvailability])

  //? Continue to Payment
  const handlePayment = async () => {
    try {
      setLoading(true)
      const { data } = await ModifyBookingOrder?.apiCall(orderId)
      setLoading(false)
      data?.orderId && global?.window?.sessionStorage?.setItem("bookingOrderId", data?.orderId)
      await router?.push(`${global?.window?.location?.origin}${ROUTES?.BOOKING?.MODIFY_CONFIRMED_PAGE}`)
      emptyChangeDatesAvailability()
      beforeChange()
    } catch (error) {
      console.log("error at Modify Booking Order ", error)
    } finally {
      setLoading(false)
    }
  }

  //? Cancels Modification
  const handleCancellation = () => {
    beforeChange()
    setDate([])
    if (buttonRef?.current) {
      buttonRef.current.scrollIntoView({
        block: "start",
        behavior: "smooth",
      })
    }
  }

  return (
    <Box
      aria-label="HotelRoomsComponent"
      p={
        isMobile
          ? cardPadding?.mobile || aesthetic?.padding?.mobile
          : cardPadding?.desktop || aesthetic?.padding?.desktop
      }>
      {loading && <LoadingSpinner />}
      <BackButton beforeChange={beforeChange} />
      <TitleWrapper>
        <Typography
          ref={buttonRef}
          variant={isMobile ? "m-heading-s" : "heading-s"}
          mb={isMobile ? MobilePxToVw(10) : DesktopPxToVw(10)}>
          {title}
        </Typography>
        <Typography
          variant={isMobile ? "m-body-sl" : "body-s"}
          mb={isMobile ? MobilePxToVw(35) : DesktopPxToVw(20)}
          sx={{
            width: isMobile ? MobilePxToVw(476) : DesktopPxToVw(696),
            marginX: "auto",
          }}>
          {subtitle}
        </Typography>
      </TitleWrapper>
      <SelectedRooms>
        <Stack
          flexDirection={isMobile ? "column" : "row"}
          textAlign={"center"}
          rowGap={MobilePxToVw(20)}
          justifyContent={"space-between"}
          alignItems={"center"}>
          <Typography variant={isMobile ? "m-body-ml" : "body-ml"} sx={{ fontWeight: 700 }}>
            {data?.selectRooms}
          </Typography>
          <Stack
            sx={{
              alignItems: "center",
              flexDirection: "row",
              textAlign: "left",
            }}
            mb={isMobile ? MobilePxToVw(20) : ""}>
            <CustomCheckBox
              withBorder
              checked={isAllRoomsSelected}
              isCheckBoxDisabled={isModifiedSuccess || checkedDates}
              onChange={() => {
                handleSelect()
              }}
            />
            <Typography minWidth={isMobile ? "unset" : DesktopPxToVw(128)} variant={isMobile ? "m-body-m" : "body-m"}>
              {isMobile ? data?.selectAll : isAllRoomsSelected ? data?.unSelectRooms : data?.selectAll}
            </Typography>
          </Stack>
        </Stack>
        {editableRooms?.map((roomsData: any, index: number) => (
          <Fragment key={index}>
            <HotelRoomsDetails
              index={index}
              endDate={date?.[1]}
              startDate={date?.[0]}
              roomsData={roomsData?.modifyBooking || roomsData}
              selectedRooms={selectedRooms}
              setSelectedRooms={setSelectedRooms}
              selectedRoomsData={selectedRoomsData}
              setSelectedRoomsData={setSelectedRoomsData}
              latestRoomsAvailability={latestRoomsAvailability}
              roomsNewPrice={roomsNewPrice}
              setRoomsNewPrice={setRoomsNewPrice}
              getOldPrice={getOldPrice}
              isModifiedSuccess={isModifiedSuccess}
              checkedDates={checkedDates}
              isComplementary={isComplementary}
              complementaryBasePrice={complementaryBasePrice}
            />
          </Fragment>
        ))}
      </SelectedRooms>
      {(isMobile ? !isModifiedSuccess && !hideEditDates : !hideEditDates) && (
        <Box ref={datesRef}>
          <EditDateComponent
            isComplementary={isComplementary}
            date={date}
            setDate={setDate}
            roomDetails={editableRooms || roomDetails?.rooms}
            disableEdit={!selectedRooms.includes(true) || isModifiedSuccess || checkedDates}
            rateCode={selectedRoomsData?.[0]?.rateCode}
            promoCode={roomDetails?.promoCode || null}
            promoType={roomDetails?.promoType || null}
            agentId={roomDetails?.agentId || null}
            agentType={roomDetails?.agentId ? "IATA" : null}
          />
          <Box
            aria-label="handleCheckRoomsAvailability"
            width={"100%"}
            textAlign={"center"}
            mt={isMobile ? MobilePxToVw(35) : DesktopPxToVw(32)}
            paddingLeft={isMobile ? "unset" : DesktopPxToVw(110)}>
            {roomsNewPrice?.length > 0 &&
            // selectedRooms?.every((room: any) => room == false) &&
            roomsNewPrice?.every((room: any) => room?.available) ? (
              <ButtonWrapper variant="light-contained" disabled={isModifiedSuccess} onClick={confirmModifiedDates}>
                {data?.confirmChange}
              </ButtonWrapper>
            ) : (
              <ButtonWrapper
                variant="light-contained"
                disabled={!(date?.[0] && date?.[1]) || selectedRooms?.every((room: any) => room == false)}
                onClick={handleCheckRoomsAvailability}>
                {data?.checkAvailability}
              </ButtonWrapper>
            )}
          </Box>
        </Box>
      )}
      {isModifiedSuccess &&
        modifiedRoomsDetails?.data?.modifiedPaymentDetails &&
        roomsNewPrice?.length > 0 &&
        roomsNewPrice?.every((room: any) => room?.available) && (
          // selectedRooms?.every((room: any) => room == false) &&
          <Box mt={isMobile ? MobilePxToVw(0) : DesktopPxToVw(40)}>
            <PiceChangeChart
              aria-label="PiceChangeChart"
              primaryAction={primaryAction}
              secondaryAction={secondaryAction}
              parameterMap={parameterMap}
              orderDetails={modifiedRoomsDetails?.data}
              roomsNewPrice={roomsNewPrice}
              isComplementary={isComplementary}
              complementaryBasePrice={complementaryBasePrice}
            />
            <Stack
              flexDirection={isMobile ? "column-reverse" : "row"}
              width={"100%"}
              alignItems={"center"}
              justifyContent={"center"}
              mt={isMobile ? MobilePxToVw(35) : DesktopPxToVw(60)}
              gap={isMobile ? MobilePxToVw(27) : DesktopPxToVw(20)}>
              {/*//? BACK TO CHANGE DATES */}
              <RenderActionItem
                isActionButtonType={true}
                url={"/"}
                title={secondaryAction?.title}
                variant={secondaryAction?.variant}
                navigationType={secondaryAction?.urlType}
                onClick={handleCancellation}
              />
              <RenderActionItem
                isActionButtonType={true}
                url={"/"}
                title={primaryAction?.title}
                variant={primaryAction?.variant}
                navigationType={primaryAction?.urlType}
                onClick={handlePayment}
              />
            </Stack>
            {/* //? CANCEL BOOKING */}
            {isMobile && (
              <RenderActionItem
                isActionButtonType={true}
                url={`${ROUTES?.WITHOUTSEO_FOR_ROUTING?.MY_ACCOUNT?.CANCEL_BOOKING}?orderId=${orderId}&hotelId=${roomDetails?.hotelId}`}
                title={parameterMap?.[0]?.value}
                variant={parameterMap?.[2]?.key}
                navigationType={parameterMap?.[1]?.value}
                buttonStyles={{
                  fontWeight: 300,
                  display: "flex",
                  fontSize: `${MobilePxToVw(22)} !important`,
                  color: theme.palette.ihclPalette.hexSeventeen,
                  textDecoration: "underline",
                  margin: `${MobilePxToVw(20)} auto 0`,
                }}
              />
            )}
          </Box>
        )}
      {bookingError && (
        <BasicModal
          width={"100%"}
          height={"100%"}
          showLogo={true}
          tajLogoTop={"0vh"}
          open={bookingError}
          handleClose={handleErrorModalClose}
          webCloseIcon={ICONS?.CLOSE_WHITE_ICON}
          ModalCloseButtonColor={theme?.palette?.ihclPalette?.hexOne}
          ModalCloseButtonStyles={{ right: "25.5%" }}
          Component={
            <BookingModalContent
              ctaType={"dialog"}
              clickHandler={handleErrorModalClose}
              title={modifiedRoomsDetails?.data?.data}
              ctaTitle={"TRY AGAIN"}
              description={errorMessage || CONSTANTS?.BOOKING_ERROR_TEXT}
            />
          }
        />
      )}
    </Box>
  )
}

export default observer(HotelRoomsComponent)
