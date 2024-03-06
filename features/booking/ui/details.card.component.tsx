import React, { useContext, useEffect, useMemo, useState } from "react"
import dynamic from "next/dynamic"
import { observer } from "mobx-react-lite"
import { useRouter } from "next/router"
import { theme } from "../../../lib/theme"
import { GAStore, PropertyStore } from "../../../store"
import { Box, Typography } from "@mui/material"
import { getCurrencyCode } from "../../../utils/currency"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { useMobileCheck } from "../../../utils/isMobilView"
import fetchHotelRoomData from "../../../utils/fetchRoomData"
import { UseAddress } from "../../../utils/hooks/useAddress"
import { UserStore } from "../../../store/global/user.store"
import { useLoggedIn } from "../../../utils/hooks/useLoggedIn"
import { CONSTANTS, ICONS } from "../../../components/constants"
import { MemberDataLayer } from "../../../utils/analytics/member-data-layer"
import BookingFlowGlobalStore from "../store/globalStore/booking.flow.store"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
const CustomCheckBox = dynamic(() =>
  import("../../../components/hoc/CustomCheckBox/Checkbox").then((module) => module.CustomCheckBox),
)
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { SearchLabelStack, TaxCheckBoxStack } from "../../../components/BookingFlow/styles/details-card"
import { groq } from "next-sanity"
import { getClient } from "../../../lib-sanity"
import useStorage from "../../../utils/useStorage"
import { HotelDataLayer } from "../../../utils/analytics/hotel-data-layer"
import { handleViewItemList } from "../../../utils/analytics/events/Ecommerce/Booking-Journey/view-item-list"
import ErrorModal from "./error-modal.component"
import { BOOKING_CONSTANT } from "../constants"

const HotelPackageCard = dynamic(() => import("./hotelPackageCard"))
const LoadingSpinner = dynamic(() => import("../../../utils/SpinnerComponent"))
const BasicModal = dynamic(() => import("../../../components/hoc/modal/modal"))
const BookingModalContent = dynamic(() => import("./booking-modal-content.component"))
const RoomReviewModalAfterLogin = dynamic(() => import("./room-review-modal.component"))
const NoRoomsAvailabilityData = dynamic(() => import("./no-room-availability-hotels.component"))

//* written for analytics to compare the arrays of hotel data
function areArraysEqual(arr1: any[], arr2: any[]) {
  if (arr1.length !== arr2.length) {
    return false
  }
  const sortedArr1 = [...arr1].sort((a, b) => a?._key - b?._key)
  const sortedArr2 = [...arr2].sort((a, b) => a?._key - b?._key)
  for (let i = 0; i < sortedArr1.length; i++) {
    if (sortedArr1[i]?._key !== sortedArr2[i]?._key) {
      return false
    }
  }
  return true
}

const DetailsCard = (props: any) => {
  const { primaryAction, secondaryAction, activeTabIndexedData = "room rates" } = props
  const router = useRouter()
  const isLoggedIn = useLoggedIn()
  const { getItem } = useStorage()
  const isMobile = useMobileCheck()
  const context: any = useContext(IHCLContext)
  const isCUGOffer = router?.query?.isCUGOffer === "true" //? CUG Offers journey

  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore
  const propertyStore = context?.getGlobalStore(GLOBAL_STORES.propertyStore) as PropertyStore
  const {
    loading,
    cartError,
    cartDetails,
    couponError,
    bookingError,
    isCouponAdded,
    roomsAvailability,
    selectedVoucherDetails,
    emptyUserCart,
    updateCartError,
    handleCouponModal,
    updateBookingError,
    updateCouponError,
    openCouponCodeWidget,
    setCountryCurrencyCode,
    setHotelNameAndAddress,
    setUserEnteredPromoCode,
    updateAnalyticsHotelBookingData,
  } = bookingFlowGlobalStore

  const address = UseAddress(userStore)
  const urlHotelId: any = router.query?.hotelId || propertyStore?.propertyData?.hotelId
  const userSelectedRoomCode = router?.query?.roomCode
  const activeTab: string = activeTabIndexedData?.toLowerCase() //* Which is active in the the toggle tabs
  const roomRatesAvailability = roomsAvailability?.availabilityResponse?.roomAvailability
  const tabs = roomsAvailability?.availabilityResponse?.tab
  const keyNames = roomRatesAvailability ? Object?.keys(roomRatesAvailability) : []

  const getRoomRateType = (tab: string): string => {
    switch (tab) {
      case "room rates":
        return "roomRates"
      case "member packages":
        return "memberExclusiveRates"
      case "other packages":
        return "packagesRates"
      case "offers":
        return "offerRates"
      case "promotions":
        return "promotionRates"
      default:
        return "roomRates"
    }
  }
  const availableTabKeys = tabs?.map((tab: any) => getRoomRateType(tab?.toLowerCase()))
  const isPackagesTab =
    props?.variant === "bookings.placeholders.hotels-packages" ||
    props?.variant === "myAccount.placeholders.hotels-packages" ||
    activeTab === "other packages"
  const isPromotionsTab = activeTab === "promotions"
  const isOffersTab = activeTab === "offers"
  const isMemberDealsTab = activeTab === "member packages"
  const isChangeRooms =
    props?.variant === "myAccount.placeholders.hotels-rooms" ||
    props?.variant === "myAccount.placeholders.hotels-packages"

  const dataLayer = MemberDataLayer(userStore, gaStoreData)
  const hotelDataLayer = HotelDataLayer()

  const [check, setCheck] = useState<boolean>(false)
  const [cityName, setCityName] = useState<string>("")
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [roomDetailData, setRoomDetailData] = useState<any>()
  const [currentHotelId, setCurrentHotelId] = useState<string | undefined>(undefined)

  const [guestCount, setGuestCount] = useState<{
    adultCount: number
    childCount: number
  }>({
    adultCount: 0,
    childCount: 0,
  })
  const handleModalClose = () => {
    setOpenModal(false)
    handleCouponModal(false)
  }

  useEffect(() => {
    const memberType =
      selectedVoucherDetails?.memberType?.toLowerCase() === "the chambers"
        ? "chambersSponsorId"
        : selectedVoucherDetails?.memberType?.toLowerCase() === "epicure"
        ? "epicureSponsorId"
        : ""

    async function fetchHotelData() {
      let response = await fetchHotelRoomData(urlHotelId || undefined, memberType)
      setCurrentHotelId(urlHotelId || undefined)
      setHotelNameAndAddress(
        response?.hotelBannerTitle?.desktopTitle?.join(" "),
        response?.hotelAddress?.addressLine1,
        response?.hotelAddress?.country,
        response?.hotelAddress?.pincode,
        response?.hotelAddress?.state,
        response?.hotelAddress?.city,
        response?.hotelContact?.email?.filter((email: any) => email?.type?.toLowerCase() === "business")?.[0]?.email,
        response?.hotelContact?.phone?.filter(
          (singlePhone: any) => singlePhone?.type?.toLowerCase() === "business",
        )?.[0]?.mobile,
        response?.subAccountId,
        response?.hotelSponsorId,
      )
      setCityName(response?.hotelAddress?.city)
      setRoomDetailData(response?.hotelRooms?.roomsList)
      updateAnalyticsHotelBookingData(
        response?.hotelType,
        response?.hotelCode,
        response?.brandName,
        response?.synxisHotelId,
      )
    }
    fetchHotelData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlHotelId])

  const checkOtherHotelsExistInTheCity = async () => {
    let isHotelsExist: boolean = false
    const query = groq`*[_type == "hotel" && hotelAddress->city != NULL  && hotelAddress->city =="${cityName}" ]{hotelId,hotelName,identifier,brandName,hotelAddress->,"image":hotelOverview->{basicInfo}}`
    await getClient(true)
      .fetch(query)
      .then((data) => {
        if (Array?.isArray(data)) {
          const OtherHotelsInCityData = data?.filter((item: any) => item?.hotelId !== currentHotelId)
          isHotelsExist = OtherHotelsInCityData?.length > 0
        } else {
          isHotelsExist = false
        }
      })
      .catch((err) => {
        isHotelsExist = false
      })
    setOpenModal(() => isHotelsExist)
  }

  useEffect(() => {
    if (!loading) {
      const areAllChildArraysAvailable = keyNames?.every((item: any) => {
        return roomRatesAvailability?.[item]?.length === 0
      })
      if (areAllChildArraysAvailable) {
        checkOtherHotelsExistInTheCity()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomsAvailability?.availabilityResponse])

  const hotelData: any = useMemo(() => {
    let combinedResponse = {}
    keyNames?.map((item: any) => {
      const filteredResponse =
        roomRatesAvailability?.[item]?.length > 0
          ? roomRatesAvailability?.[item]?.map((singleRoomHudini: any) => {
              const filteredRoomTypes = roomDetailData?.find(
                (sanityRoom: any, index: number) =>
                  singleRoomHudini?.roomCode?.toLowerCase() === sanityRoom?.roomCode?.toLowerCase(),
              )
              return filteredRoomTypes
                ? {
                    ...singleRoomHudini,
                    ...filteredRoomTypes,
                  }
                : null
            })
          : []
      let finalResponse = filteredResponse?.filter((item: any) => item) || []
      const availableHudiniRoomCodes: any[] = finalResponse?.map((room: any) => room?.roomCode?.toLowerCase()) || []
      const otherSanityRoomTypes: any[] =
        roomRatesAvailability?.[item]?.length > 0
          ? roomDetailData?.filter(
              (sanityRoom: any) => !availableHudiniRoomCodes?.includes(sanityRoom?.roomCode?.toLowerCase()),
            ) || []
          : availableTabKeys?.includes(item)
          ? roomDetailData || []
          : []
      //? changing the room position to the top if user selects any specific hotel in the rooms&suits page
      let indexOfTheSelectedRoom = finalResponse?.findIndex((room: any) => room?.roomCode === userSelectedRoomCode)
      if (indexOfTheSelectedRoom !== -1) {
        let selectedRoom = finalResponse?.splice(indexOfTheSelectedRoom, 1)[0]
        finalResponse?.unshift(selectedRoom)
      }
      combinedResponse = {
        ...combinedResponse,
        [item]: [...finalResponse, ...otherSanityRoomTypes],
      }
    })
    return keyNames?.length > 0 ? combinedResponse : { ["roomRates"]: roomDetailData }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomDetailData, roomsAvailability?.availabilityResponse, activeTab])

  useEffect(() => {
    //analytics viewItemList event
    handleViewItemList(
      "view_item_list",
      hotelData,
      bookingFlowGlobalStore,
      areArraysEqual,
      activeTab,
      hotelDataLayer,
      isPackagesTab,
      dataLayer,
      isLoggedIn,
      isMemberDealsTab,
      isPromotionsTab,
      isOffersTab,
      address,
      guestCount,
      getItem,
      setGuestCount,
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotelData, activeTab])

  //* using to show/hide the show with taxes option
  const isIndianHotel = getCurrencyCode(hotelData) === "INR"
  const currencyCode = getCurrencyCode(hotelData)
  setCountryCurrencyCode(currencyCode)

  const handleErrorModal = () => {
    updateBookingError(false)
    setOpenModal(false)
    updateCouponError(false)
  }
  const closeCartErrorModal = () => {
    updateCartError(false)
  }
  const handleCartError = () => {
    cartError && emptyUserCart()
    closeCartErrorModal()
  }
  const handleCouponError = () => {
    updateCouponError(false)
    setOpenModal(false)
    if (isCUGOffer) {
      setUserEnteredPromoCode({
        title: "",
        index: null,
        agentId: null,
        promoCode: null,
        couponCode: null,
      })
      router?.back()
    } else {
      openCouponCodeWidget(true)
    }
  }

  return (
    <>
      <SearchLabelStack aria-label="DetailsCard">
        <Typography variant={isMobile ? "m-body-s" : "body-s"} fontWeight={700}>
          Rooms for your search
        </Typography>
        {isIndianHotel && (
          <TaxCheckBoxStack>
            <RoomReviewModalAfterLogin />
            <CustomCheckBox
              withBorder
              checked={check}
              onChange={() => {
                setCheck(!check)
              }}
              isMarginRight={DesktopPxToVw(11)}
            />
            <Typography variant={isMobile ? "m-body-s" : "body-s"}>Show with taxes and fees</Typography>
          </TaxCheckBoxStack>
        )}
      </SearchLabelStack>

      {loading ? (
        <Box className={isMobile ? "room-listing-page" : ""}>
          {isMobile ? <LoadingSpinner componentLevel={true} /> : <Box width={"100%"} height={"100vh"}></Box>}
        </Box>
      ) : (
        hotelData &&
        hotelData?.[getRoomRateType(activeTab)]?.map((parentItem: any, parentIndex: number) => (
          <HotelPackageCard
            parentItem={parentItem}
            parentIndex={parentIndex}
            key={parentIndex}
            primaryAction={primaryAction}
            secondaryAction={secondaryAction}
            showWithTaxes={check}
            isPackagesTab={isPackagesTab}
            isChangeRooms={isChangeRooms}
            isPromotionsTab={isPromotionsTab}
            parameterMap={props?.parameterMap}
            isOffersTab={isOffersTab}
            activeTab={activeTab}
            activeKey={getRoomRateType(activeTab)}
            guestCount={guestCount}
            currencyCode={currencyCode}
            isMemberDealsTab={isMemberDealsTab}
          />
        ))
      )}

      {/* //? Using to show available hotels in the selected city if rooms are not available user searched hotel */}
      {openModal && !couponError && (
        <BasicModal
          width={"100%"}
          height={"100%"}
          open={openModal}
          handleClose={handleModalClose}
          CloseIcon={ICONS?.CLOSE_GOLD_ICON}
          webCloseIcon={ICONS?.CLOSE_WHITE_ICON}
          ModalCloseButtonColor={theme?.palette?.ihclPalette?.hexOne}
          mSiteCloseStyles={{
            padding: `${MobilePxToVw(67.5)} ${MobilePxToVw(59.45)} ${MobilePxToVw(45.63)} 0`,
          }}
          bgcolor={isMobile ? theme?.palette?.background?.default : ""}
          Component={
            <NoRoomsAvailabilityData
              cityName={cityName}
              currentHotelId={currentHotelId}
              handleModalClose={handleModalClose}
            />
          }
        />
      )}
      {bookingError && (
        <BasicModal
          width={"100%"}
          height={"100%"}
          showLogo={true}
          tajLogoTop={"0vh"}
          open={bookingError}
          handleClose={handleErrorModal}
          CloseIcon={ICONS?.CLOSE_GOLD_ICON}
          webCloseIcon={ICONS?.CLOSE_WHITE_ICON}
          ModalCloseButtonColor={theme?.palette?.background?.paper}
          ModalCloseButtonStyles={{ right: "25.5%" }}
          Component={
            <BookingModalContent
              title={CONSTANTS?.ROOM_NOT_AVAILABLE}
              description={CONSTANTS?.INVENTORY_ROOMS_NOT_AVAILABLE}
              ctaType={"dialog"}
              ctaTitle={"SELECT ANOTHER ROOM"}
              clickHandler={handleErrorModal}
            />
          }
        />
      )}
      {cartError && (
        <BasicModal
          width={"100%"}
          height={"100%"}
          showLogo={true}
          tajLogoTop={"0vh"}
          open={cartError}
          handleClose={closeCartErrorModal}
          CloseIcon={ICONS?.CLOSE_GOLD_ICON}
          webCloseIcon={ICONS?.CLOSE_WHITE_ICON}
          ModalCloseButtonColor={theme?.palette?.background?.paper}
          ModalCloseButtonStyles={{ right: "25.5%" }}
          Component={
            <BookingModalContent
              title={cartDetails?.errorResponse?.data}
              description={"Your existing cart values in other sessions will be lost. Do you wish to proceed?"}
              ctaType={"dialog"}
              ctaTitle={CONSTANTS?.PROCEED}
              clickHandler={handleCartError}
            />
          }
        />
      )}
      <BasicModal
        width={"100%"}
        height={"100%"}
        showLogo={true}
        tajLogoTop={"0vh"}
        open={couponError}
        handleClose={handleErrorModal}
        CloseIcon={ICONS?.CLOSE_GOLD_ICON}
        webCloseIcon={ICONS?.CLOSE_WHITE_ICON}
        ModalCloseButtonColor={theme?.palette?.background?.paper}
        ModalCloseButtonStyles={{ right: "25.5%" }}
        Component={
          <BookingModalContent
            title={
              roomsAvailability?.availabilityResponse?.couponRemark?.includes("used")
                ? CONSTANTS?.COUPON_CODE_ERROR
                : CONSTANTS?.INVALID_COUPON_CODE
            }
            description={roomsAvailability?.availabilityResponse?.couponRemark || ""}
            ctaType={"dialog"}
            ctaTitle={"TRY AGAIN"}
            clickHandler={handleCouponError}
          />
        }
      />
      <BasicModal
        width={"100%"}
        height={"100%"}
        showLogo={true}
        tajLogoTop={"0vh"}
        open={isCouponAdded}
        handleClose={handleModalClose}
        CloseIcon={ICONS?.CLOSE_GOLD_ICON}
        webCloseIcon={ICONS?.CLOSE_WHITE_ICON}
        ModalCloseButtonStyles={{ right: "25.5%" }}
        ModalCloseButtonColor={theme?.palette?.background?.paper}
        bgcolor={isMobile ? theme?.palette?.background?.default : ""}
        Component={
          <ErrorModal
            primaryAction={BOOKING_CONSTANT?.CONTINUE}
            actionHandler={handleModalClose}
            title={
              roomsAvailability?.availabilityResponse?.couponRemark
                ? (roomsAvailability?.availabilityResponse?.couponRemark as string)
                : ""
            }
            subTitle={CONSTANTS?.COUPON_CODE_APPLIED_SUCCESSFULL}
          />
        }
      />
    </>
  )
}

export default observer(DetailsCard)
