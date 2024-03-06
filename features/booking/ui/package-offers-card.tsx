import React, { Fragment, useContext, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { PathType } from "../../../types"
import { observer } from "mobx-react-lite"
import { GAStore, UserStore } from "../../../store"
import { theme } from "../../../lib/theme"
import { urlFor } from "../../../lib-sanity"
import { getCookie } from "../../../utils/cookie"
import { triggerEvent } from "../../../utils/analytics"
import { CONSTANTS } from "../../../components/constants"
import ModalStore from "../../../store/global/modal.store"
import { currencyPrettier } from "../../../utils/currency"
import { useMobileCheck } from "../../../utils/isMobilView"
import fetchRateFilter from "../../../utils/fetchRateFilter"
import { ExpandLess, ExpandMore } from "@mui/icons-material"
import BookingsFlowStore from "../store/pageStore/booking.store"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import { Box, Button, Grid, Stack, Typography } from "@mui/material"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import BookingFlowGlobalStore from "../store/globalStore/booking.flow.store"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import {
  RateBox,
  TabsStack,
  ButtonsBox,
  CardMainBox,
  CtaLabelTypo,
  GalleryImage,
  ColumnListBox,
  StyledDivider,
  HighlightsBox,
  BulletPointBox,
  DescriptionTypo,
  VerticalDivider,
  RateSelectButton,
  StyledBulletIcon,
  RoomDetailsBox,
  AmenitiesStack,
  AmenitiesImage,
  HighlightsImage,
  FullWidthDivider,
  AmenitiesItemStack,
  TabHighlightDivider,
  MemberRateLabelTypo,
} from "../../../components/BookingFlow/styles/details-card"
import { POWERED_BY_WIDGET } from "../constants"
import useStorage from "../../../utils/useStorage"
import { ErrorIcon } from "../../../utils/customIcons"
import { UseAddress } from "../../../utils/hooks/useAddress"
import { useLoggedIn } from "../../../utils/hooks/useLoggedIn"
import { HotelDataLayer } from "../../../utils/analytics/hotel-data-layer"
import { MemberDataLayer } from "../../../utils/analytics/member-data-layer"
import { getLowInventoryLabel } from "../../../utils/booking/getLowInventoryLabel"

const LoadingSpinner = dynamic(() => import("../../../utils/SpinnerComponent"))
const BasicModal = dynamic(() => import("../../../components/hoc/modal/modal"))
const BookingModalContent = dynamic(() => import("./booking-modal-content.component"))

const tabValues = [{ tab: "ROOM RATES" }, { tab: "ROOM DETAILS" }]

const PackageOffersCard = ({
  data,
  viewMore,
  showWithTaxes,
  isPackagesTab,
  isChangeRooms,
  isPromotionsTab,
  isOffersTab,
  parameterMap,
  activeTab,
  activeKey,
  currentHotelName,
  guestCount,
  currencyCode = "INR",
  handleGalleryPopup,
  isMemberDealsTab,
}: any) => {
  const router = useRouter()
  const isLoggedIn = useLoggedIn()
  const { getItem } = useStorage()
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const hotelDataLayer = HotelDataLayer()
  const modalStore = ModalStore.getInstance()
  const pageContext = useContext(PageContext)
  const context: any = useContext(IHCLContext)

  const complementaryBasePrice = 0
  const orderId = router?.query?.order_id
  const isModification = router?.asPath?.includes("change")
  const isComplementaryVoucher = router?.query?.isComplementaryVoucher

  const [tabIndex, setTabIndex] = useState<number>(0)
  const [viewMoreAmenities, setViewMoreAmenities] = useState<number>(4)
  const [journeyFrom, setJourneyFrom] = useState<string | null>("")

  const STATIC_IMAGE = `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/74e7a6cce64b4ef5f4f236507fcad9993d48bd4d-700x560.png`

  const BookingFlowPageStore = pageContext?.getPageStore(PAGE_STORES?.bookingFlowStore) as BookingsFlowStore
  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore
  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore

  const address = UseAddress(userStore)
  const dataLayer = MemberDataLayer(userStore, gaStoreData)

  //* Store Values
  const { updateCurrentStepper } = BookingFlowPageStore
  const {
    loading,
    cartDetails,
    guestDetails,
    setCartDetails,
    updateGuestDetails,
    selectedRoomsDetails,
    newChangedRooms,
    updateNewChangedRooms,
    setModifiedRooms,
    isModifiedSuccess,
    updateStepperDetails,
    stepperDetails,
    roomsAdded,
    changeCurrentRoomId,
    modifiedRoomsDetails,
    updateBookingError,
    roomsAvailability,
    setIsModifySuccess,
  } = bookingFlowGlobalStore
  // cartId
  const allRoomAvailability = roomsAvailability?.availabilityResponse?.roomAvailability
  const activeTabGuestDetails: any = guestDetails?.data?.find((item: any) => item?.isSelected === true)
  const activeStepperDetails: any = stepperDetails?.data?.filter((item: any) => item?.isSelected === true)?.[0]
  const currentCartDetailsLength = cartDetails?.cartDetailsResponse?.items?.[0]?.hotel?.[0]?.room?.length
  const isViewMoreAmenities = viewMoreAmenities < data?.roomModalDetails?.mobileAmenities?.length
  const isSEB = Boolean(router?.query?.sebbalance)
  const sebReqID = router?.query?.reqid

  const handleReservation = () => {
    updateCurrentStepper({
      stepName: CONSTANTS?.RESERVATION,
    })

    const isSelectedRoom = guestDetails?.data?.map((item: any) => {
      return { ...item, isSelected: false }
    }) //* to set all the isSelected to false
    updateGuestDetails({ data: isSelectedRoom })
  }

  const updateRoomSelection = (id: any) => {
    const isSelectedRoom = guestDetails?.data?.map((item: any) =>
      item?.id === id ? { ...item, isSelected: true } : { ...item, isSelected: false },
    )
    updateGuestDetails({ data: isSelectedRoom })
    changeCurrentRoomId(id)
  }

  const updateRoomModified = async (id: number) => {
    const isModifiedRooms = stepperDetails?.data?.map((item: any) => {
      if (item?.id === id) {
        return {
          ...item,
          modified: true,
        }
      } else {
        return item
      }
    })
    const nextRoom = isModifiedRooms?.filter((room: any) => room?.modified === false)?.[0]?.id
    const isSelectedRoom = isModifiedRooms?.map((item: any) =>
      item?.id === nextRoom ? { ...item, isSelected: true } : { ...item, isSelected: false },
    )
    updateStepperDetails({ data: isSelectedRoom })
    !nextRoom && isMobile && updateCurrentStepper({ stepName: "CONFIRM" })
    !nextRoom && isMobile && updateStepperDetails({ data: isSelectedRoom })
    setIsModifySuccess(false)
  }

  const isAllRoomsSelected = isChangeRooms
    ? stepperDetails?.data?.every((item: any) => item?.modified === true)
    : guestDetails?.data?.length === currentCartDetailsLength

  const defaultModalPath = parameterMap?.[1]?.value || "/hotel-rooms/rate-detail"
  const roomDetails = bookingFlowGlobalStore?.addToCartPayload?.hotel?.[0].room
  const codes = bookingFlowGlobalStore?.userEnteredPromoCode
  const dates = bookingFlowGlobalStore?.guestBookingSchedule
  const details = bookingFlowGlobalStore?.addToCartPayload

  const presentDate = new Date()
  const checkInDate = new Date(dates?.userCheckInDate)
  const checkOutDate = new Date(dates?.userCheckOutDate)

  useEffect(() => {
    const journeyFrom = (router?.query?.journeyFrom as string) || null
    setJourneyFrom(journeyFrom)
    const selectedRooms = cartDetails?.cartDetailsResponse?.items?.[0]?.hotel?.[0]?.room
    const activeIndex = guestDetails?.data?.find(
      (item: any) =>
        !selectedRooms?.find((childItem: any) => {
          return childItem?.roomNumber === item?.id && childItem?.roomName
        }),
    )
    roomsAdded > 0 && updateRoomSelection(activeIndex?.id ?? 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCartDetailsLength, roomsAdded, router.isReady])

  //analytics
  const handleAddToCart = async (
    item: any,
    amountPayableNow: string,
    adults: number,
    roomCode: any,
    title: string,
    child: number,
    id: any,
    name: string,
    amount: number,
    currencyCode: string,
    amountWithInclusiveTaxes: string,
    standardRate: boolean,
    memberRate: boolean,
    discountAmt: any,
    roomType: string,
    PathType: any,
    roomTypePrice: string,
  ) => {
    await BookingFlowPageStore?.updateSelectedRoom(isPackagesTab ? "Package" : "Room")
    await BookingFlowPageStore?.updateSelectedRoomPrice(isMemberDealsTab ? "Exclusive Rate" : roomTypePrice)
    await BookingFlowPageStore?.updateDiscountPrice(discountAmt)
    const selectedTab: any = getItem("activeTabName")
    await BookingFlowPageStore?.updateSelectedTab(selectedTab)
    global?.window?.localStorage?.setItem("roomType", roomTypePrice),
      global?.window?.localStorage?.setItem("promoCode", codes?.title)
    triggerEvent({
      action: "add_to_cart",
      params: {
        ...dataLayer,
        ...hotelDataLayer,
        bookingPaymentType: "",
        bookingType: details?.category,
        location: "",
        clientId: getCookie("_ga")?.slice(6),
        eventType: "",
        eventName: "",
        eventPlace: "",
        eventTicketsQty: "",
        eventDate: "",
        visitSource: "",
        datesToBook: Math.ceil((checkInDate?.getTime() - presentDate?.getTime()) / 86400000) || "",
        arrivalDate: details?.hotel?.[0]?.checkIn,
        departureDate: details?.hotel?.[0]?.checkOut,
        noOfAdults: adults,
        noOfChild: child,
        totalNoOfGuests: adults + child,
        noOfRooms: roomDetails?.length,
        brandName: hotelDataLayer?.hotelBrand || "",
        giftCardCategory: "",
        giftCardType: "",
        giftCardValue: "",
        giftCardQuantity: "",
        offerName: "",
        offerCode: "",
        offerID: "",
        offerCategory: "",
        offerValidity: "",
        redemptionType: "",
        redemptionName: "",
        redemptionDescription: "",
        pointsType: "",
        pointstobeRedeemed: "",
        buttonLinkName: roomTypePrice === "Standard Rate" || "Member Rate" ? CONSTANTS?.SELECT : CONSTANTS?.LOGIN_JOIN,
        link_url: roomTypePrice === "Standard Rate" || "Member Rate" ? defaultModalPath : "/neupass/login",
        link_text: roomTypePrice === "Standard Rate" || "Member Rate" ? CONSTANTS?.SELECT : CONSTANTS?.LOGIN_JOIN,
        outbound: PathType == "internal" ? false : true,
        paymentType: "",
        userPinCode: address?.pinCode ? address?.pinCode : "",
        userState: address?.state ? address?.state : "",
        userCity: address?.cityTown ? address?.cityTown : "",
        ecommerce: {
          currency: currencyCode || "",
          value:
            isPackagesTab || isMemberDealsTab || isPromotionsTab || isOffersTab
              ? item?.total?.amount
              : isLoggedIn && item?.memberRate?.total?.amount
              ? item?.memberRate?.total?.amount
              : item?.standardRate?.total?.amount,
          items: roomDetails?.map((room: any, index: number) => {
            return {
              item_id:
                `${bookingFlowGlobalStore?.analyticsHotelBookingData?.synxisHotelId}` +
                `_${room.roomName}` +
                `_${room?.packageName}`,
              item_name: room.roomName,
              discount:
                isPromotionsTab && isLoggedIn
                  ? bookingFlowGlobalStore?.cartDetails?.cartDetailsResponse?.totalCouponDiscountValue
                  : discountAmt,
              index: index,
              item_brand: hotelDataLayer?.hotelName || "",
              item_category: isPackagesTab ? "Package" : "Room",
              item_category2: room?.packageName || "",
              item_category3: isMemberDealsTab ? "Exclusive Rate" : roomTypePrice,
              item_category4: dataLayer?.membershipType,
              item_category5: hotelDataLayer?.hotelCity,
              price:
                isPackagesTab || isMemberDealsTab || isPromotionsTab || isOffersTab
                  ? item?.total?.amount
                  : isLoggedIn && item?.memberRate?.total?.amount
                  ? item?.memberRate?.total?.amount
                  : item?.standardRate?.total?.amountWithInclusiveTaxes,
              quantity: 1,
              affiliation: hotelDataLayer?.hotelBrand || "",
              promotion_name: "",
              promotion_id: "",
              coupon: activeTab === "promotions" ? codes?.title : "",
              item_list_name: getItem("activeTabName"),
              item_list_id: getItem("hotelJourneyPageType") + `| ${hotelDataLayer?.hotelName}`,
              room_nights: Math.ceil((checkOutDate?.getTime() - checkInDate?.getTime()) / 86400000) || "",
            }
          }),
        },
      },
    })
  }

  const checkRateCodeAvailable = (roomCode: string, rateCode: string, rateType: string) => {
    const addedRooms = cartDetails?.cartDetailsResponse?.items?.[0]?.hotel?.[0]?.room
    const noOfSimilarRooms = addedRooms
      ?.filter((room: any) => room?.roomId === roomCode)
      ?.filter((item: any) => item?.rateCode === rateCode)?.length
    let roomsAvailable
    if (isPromotionsTab || isOffersTab || isPackagesTab || isMemberDealsTab) {
      roomsAvailable = allRoomAvailability?.[activeKey]
        ?.filter((room: any) => room?.roomCode === roomCode)?.[0]
        ?.rooms?.filter((item: any) => item?.rateCode === rateCode)?.[0]?.availableInventory
    } else {
      roomsAvailable = allRoomAvailability?.[activeKey]
        ?.filter((room: any) => room?.roomCode === roomCode)?.[0]
        ?.rooms?.filter((item: any) => item?.[rateType]?.rateCode === rateCode)?.[0]?.[rateType]?.availableInventory
    }
    return !addedRooms || roomsAvailable > noOfSimilarRooms
  }

  const handleSelect = (
    amountPayableNow: number,
    adults: number,
    roomCode: any,
    title: any,
    child: number,
    id: any,
    name: any,
    rateCode: any,
    amount: number,
    currencyCode: string,
    index: number,
    urlType: any,
    item: any,
  ) => {
    const selectedRoomData = isPackagesTab
      ? data?.rooms?.filter((room: any) => room?.memberRate?.rateCode === rateCode)
      : data?.rooms?.rooms?.filter((room: any) => room?.memberRate?.rateCode === rateCode)[0]
    triggerEvent({
      action: "select_item",
      params: {
        event: "select_item",
        ...dataLayer,
        ...hotelDataLayer,
        outbound: urlType === "internal" ? false : true,
        location: "",
        eventType: "",
        eventName: "",
        eventPlace: "",
        eventTicketsQty: "",
        eventDate: "",
        clientId: getCookie("_ga")?.slice(6),
        visitSource: "",
        datesToBook: Math.ceil((checkInDate?.getTime() - presentDate?.getTime()) / 86400000) || "",
        arrivalDate: dates?.userCheckInDate,
        departureDate: dates?.userCheckOutDate,
        noOfAdults: guestCount?.adultCount,
        noOfChild: guestCount?.childCount,
        totalNoOfGuests: guestCount?.adultCount + guestCount?.childCount,
        noOfRooms: bookingFlowGlobalStore?.guestDetails?.data?.length,
        // specialCode:
        //   codes?.agentId ||
        //   codes?.couponCode ||
        //   codes?.promoCode ||
        //   codes?.rateCode ||
        //   codes?.index ||
        //   codes?.title,
        brandName: hotelDataLayer?.hotelBrand || "",
        giftCardCategory: "",
        giftCardType: "",
        giftCardValue: "",
        giftCardQuantity: "",
        offerName: "",
        offerCode: "",
        offerID: "",
        offerCategory: "",
        offerValidity: "",
        redemptionType: "",
        redemptionName: "",
        redemptionDescription: "",
        pointsType: "",
        pointstobeRedeemed: "",
        bookingType: details?.category || "",
        bookingPaymentType: "",
        buttonLinkName: isPackagesTab ? "Package Details" : "Rate Details",
        link_url: defaultModalPath,
        link_text: isPackagesTab ? "Package Details" : "Rate Details",
        widget_title: "",
        widget_description: "",
        widget_type: "",
        widget_position: "",
        widget_powered_by: POWERED_BY_WIDGET,
        paymentType: "",
        userPinCode: address?.pinCode ? address?.pinCode : "",
        userState: address?.state ? address?.state : "",
        userCity: address?.cityTown ? address?.cityTown : "",
        pageSection: activeTab,
        ecommerce: {
          item_list_name: getItem("activeTabName"),
          item_list_id: getItem("hotelJourneyPageType") + `| ${hotelDataLayer?.hotelName}`,
          items: {
            item_id:
              `${bookingFlowGlobalStore?.analyticsHotelBookingData?.synxisHotelId}` +
              `_${currentHotelName}` +
              `_${name}`,
            item_name: currentHotelName,
            discount:
              isPackagesTab || isMemberDealsTab || isOffersTab
                ? 0
                : isLoggedIn
                ? item?.memberRate?.total?.amount
                  ? Number(item?.standardRate?.total?.amount) - Number(item?.memberRate?.total?.amount)
                  : 0
                : 0,
            item_brand: hotelDataLayer?.hotelName,
            index: index,
            item_category: isPackagesTab ? "Package" : "Room",
            item_category2: name,
            item_category3: isMemberDealsTab
              ? "Exclusive Rate"
              : isPackagesTab
              ? selectedRoomData?.[index]?.memberRate
                ? "Member Rate"
                : "Standard Rate"
              : isLoggedIn
              ? selectedRoomData?.memberRate
                ? "Member Rate"
                : "Standard Rate"
              : "Standard Rate",
            item_category4: dataLayer?.membershipType,
            item_category5: hotelDataLayer?.hotelCity,
            price:
              isPackagesTab || isMemberDealsTab || isOffersTab || isPromotionsTab
                ? item?.total?.amount
                : isLoggedIn && item?.memberRate?.total?.amount
                ? item?.memberRate?.total?.amount
                : item?.standardRate?.total?.amount,
            quantity: 1,
            affiliation: hotelDataLayer?.hotelBrand || "",
            promotion_name: "",
            promotion_id: "",
            coupon: activeTab === "promotions" ? codes?.title : "",
            room_nights: Math.ceil((checkOutDate?.getTime() - checkInDate?.getTime()) / 86400000) || "",
          },
        },
      },
    })
  }

  const handleChangeRooms = (item: any, data: any, rateType: any) => {
    const activeRoomNumber = activeStepperDetails?.id || stepperDetails?.data?.length
    const changedRoomsDetails = newChangedRooms?.map((room: any) => {
      if (room?.roomNumber === activeRoomNumber) {
        return {
          ...room,
          isModified: true,
          isPackageCode: isPackagesTab,
          cost: rateType === "package" ? item?.total?.amount : item?.[rateType]?.total?.amount,
          roomId: data?.roomCode,
          roomName: data?.basicInfo?.title,
          packageCode: data?.roomCode,
          roomTypeCode: data?.roomCode,
          isServiceable: false,
          rateCode: rateType === "package" ? item?.rateCode : item?.[rateType]?.rateCode,
          currency: currencyCode,
          roomNumber: activeRoomNumber,
          packageName: item?.rateContent?.name,
          roomImgUrl: data?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref
            ? urlFor(data?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref).url()
            : STATIC_IMAGE,
        }
      } else {
        return room
      }
    })
    updateNewChangedRooms(changedRoomsDetails)
    setModifiedRooms({
      orderId: orderId,
      rateFilter: fetchRateFilter(),
      memberTier: global?.window?.localStorage?.getItem("userTier")
        ? global?.window?.localStorage?.getItem("userTier")
        : "Copper",
      modifyBookingDetails: changedRoomsDetails?.filter((room: any) => room?.isModified === true),
    })
  }

  useEffect(() => {
    isModifiedSuccess && updateRoomModified(activeStepperDetails?.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModifiedSuccess, isMobile])

  const selectedRoom = isAllRoomsSelected
    ? selectedRoomsDetails?.[selectedRoomsDetails?.length - 1]
    : selectedRoomsDetails?.filter((room: any) => room?.roomNumber === activeStepperDetails?.id)?.[0]

  const DetailedDescription = ({ longDescription }: any) => {
    let descriptionPoints = longDescription
      ?.split("+")
      ?.join(".")
      ?.split(".")
      ?.filter((des: any) => des !== "")
      ?.filter((text: any) => text !== "\r\n")
    return (
      <>
        {descriptionPoints && (
          <>
            {descriptionPoints?.slice(0, isMobile ? 2 : 3)?.map((item: string, index: number) => {
              return (
                <Fragment key={index}>
                  {item?.length > 1 && (
                    <BulletPointBox key={index}>
                      <Box display={"flex"} mt={isMobile ? MobilePxToVw(6) : DesktopPxToVw(8)}>
                        <StyledBulletIcon />
                      </Box>
                      <Typography
                        variant={isMobile ? "m-body-xs" : "body-xs"}
                        fontSize={isMobile ? MobilePxToVw(17) : DesktopPxToVw(16)}>
                        {item}
                      </Typography>
                    </BulletPointBox>
                  )}
                </Fragment>
              )
            })}
          </>
        )}
      </>
    )
  }

  const NoRoomsAvailableView = () => {
    return (
      <Stack
        sx={{
          height: "50%",
          textAlign: "center",
          justifyContent: "center",
          padding: isMobile ? "2vw" : "2.5vw 3.2vw",
          margin: isMobile ? "0vw 2vw 6vw 2vw" : "0vw",
          background: theme.palette.ihclPalette.hexTwentyNine,
        }}>
        <Typography variant={isMobile ? "m-body-s" : "body-xs"}>{CONSTANTS?.ROOM_UNAVAILABLE}</Typography>
      </Stack>
    )
  }

  const renderDesktopView = () => {
    return (
      <>
        {data?.rooms?.length > 0 ? (
          data?.rooms?.slice(0, viewMore)?.map((item: any, index: number) => (
            <>
              {item?.available || item?.standardRate?.available || item?.memberRate?.available ? (
                <Stack key={index}>
                  {index == 0 && item?.availableInventory < 6 && (
                    <Stack
                      sx={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: DesktopPxToVw(5),
                      }}>
                      <ErrorIcon
                        sx={{
                          height: DesktopPxToVw(14),
                          width: DesktopPxToVw(15),
                        }}
                      />
                      <Typography variant="body-xs" color={theme.palette.ihclPalette.hexThirtyOne}>
                        {getLowInventoryLabel(item?.availableInventory)}
                      </Typography>
                    </Stack>
                  )}
                  <CardMainBox
                    sx={{
                      justifyContent: "space-between",
                      mt: item?.availableInventory < 6 ? DesktopPxToVw(18) : DesktopPxToVw(8),
                    }}
                    aria-label="PackageOffersCard">
                    <ColumnListBox>
                      <Typography variant="body-m" fontWeight={400}>
                        {item?.rateContent?.name}
                      </Typography>
                      <DescriptionTypo variant="body-xs">{item?.rateContent?.details?.description}</DescriptionTypo>
                      {item?.rateContent?.details?.detailedDescription && (
                        <DetailedDescription longDescription={item?.rateContent?.details?.detailedDescription} />
                      )}
                      <CtaLabelTypo
                        variant="link-m"
                        sx={{ fontSize: DesktopPxToVw(16) }}
                        onClick={() => {
                          modalStore?.setPropertyData({
                            title: item?.rateContent?.name,
                            shortDescription: item?.rateContent?.details?.description,
                            longDescription: item?.rateContent?.details?.detailedDescription,
                            cancellationPolicy: item?.cancellationPolicy?.description,
                            guaranteePolicy: item?.bookingPolicy?.description,
                            disabled: isAllRoomsSelected,
                            standardRate: currencyPrettier(
                              isComplementaryVoucher
                                ? complementaryBasePrice
                                : item?.standardRate
                                ? Number(
                                    showWithTaxes
                                      ? isChangeRooms
                                        ? Number(item?.standardRate?.total?.amountWithTaxesFees) -
                                          (selectedRoom?.price + selectedRoom?.tax?.amount)
                                        : item?.standardRate?.perNight?.price?.total?.amountWithTaxesFees
                                      : isChangeRooms
                                      ? Number(item?.standardRate?.total?.amount) - selectedRoom?.price
                                      : item?.standardRate?.perNight?.price?.total?.amount,
                                  )
                                : Number(
                                    showWithTaxes
                                      ? isChangeRooms
                                        ? Number(item?.total?.amountWithTaxesFees) -
                                          (selectedRoom?.price + selectedRoom?.tax?.amount)
                                        : item?.perNight?.price?.total?.amountWithTaxesFees
                                      : isChangeRooms
                                      ? Number(item?.total?.amount) - selectedRoom?.price
                                      : item?.perNight?.price?.total?.amount,
                                  ),
                              item?.rateContent?.currencyCode,
                            ),
                            memberRate: item?.memberRate
                              ? currencyPrettier(
                                  isComplementaryVoucher
                                    ? complementaryBasePrice
                                    : Number(
                                        showWithTaxes
                                          ? isChangeRooms
                                            ? Number(item?.memberRate?.total?.amountWithTaxesFees) -
                                              (selectedRoom?.price + selectedRoom?.tax?.amount)
                                            : item?.memberRate?.perNight?.price?.total?.amountWithTaxesFees
                                          : isChangeRooms
                                          ? Number(item?.memberRate?.total?.amount) - selectedRoom?.price
                                          : item?.memberRate?.perNight?.price?.total?.amount,
                                      ),
                                  item?.rateContent?.currencyCode,
                                )
                              : undefined,
                            rateLabel:
                              isMemberDealsTab || isPromotionsTab
                                ? CONSTANTS?.EXCLUSIVE_RATE
                                : CONSTANTS?.STANDARD_RATE,
                            onStandardSelect: () => {
                              isMemberDealsTab && !isLoggedIn
                                ? navigate("/neupass-login", PathType.dialog)
                                : isAllRoomsSelected && !isChangeRooms
                                ? handleReservation()
                                : isChangeRooms
                                ? handleChangeRooms(item, data, "standardRate")
                                : [
                                    checkRateCodeAvailable(
                                      data?.roomCode,
                                      item?.standardRate?.rateCode,
                                      "standardRate",
                                    ),
                                    setCartDetails(
                                      isComplementaryVoucher
                                        ? complementaryBasePrice
                                        : item?.standardRate?.total?.amountPayableNow,
                                      activeTabGuestDetails?.adults,
                                      data?.roomCode,
                                      data?.basicInfo?.title,
                                      activeTabGuestDetails?.child,
                                      data?.roomCode,
                                      data?.roomCode,
                                      activeTabGuestDetails?.id,
                                      item?.rateContent?.name,
                                      data?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref
                                        ? urlFor(
                                            data?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref,
                                          ).url()
                                        : STATIC_IMAGE,
                                      item?.standardRate?.rateCode ? item?.standardRate?.rateCode : item?.rateCode,
                                      isPackagesTab ? true : false,
                                      currencyCode,
                                      journeyFrom,
                                      isSEB,
                                      isSEB ? sebReqID : "",
                                    ),
                                    handleAddToCart(
                                      item,
                                      item?.standardRate?.total?.amountPayableNow,
                                      activeTabGuestDetails?.adults,
                                      data?.basicInfo?.title,
                                      activeTabGuestDetails?.child,
                                      data?.roomCode,
                                      activeTabGuestDetails?.id,
                                      item?.rateContent?.name,
                                      item?.standardRate?.tax?.amount,
                                      item?.rateContent?.currencyCode,
                                      item?.standardRate?.total?.amountWithInclusiveTaxes,
                                      true,
                                      false,
                                      0,
                                      "Standard Room",
                                      PathType,
                                      "Standard Rate",
                                    ),
                                  ]
                            },
                            onMemberSelect: () => {
                              isLoggedIn
                                ? isChangeRooms
                                  ? handleChangeRooms(item, data, "memberRate")
                                  : isAllRoomsSelected
                                  ? handleReservation()
                                  : [
                                      checkRateCodeAvailable(data?.roomCode, item?.memberRate?.rateCode, "memberRate"),
                                      setCartDetails(
                                        isComplementaryVoucher
                                          ? complementaryBasePrice
                                          : item?.memberRate?.total?.amountPayableNow,
                                        activeTabGuestDetails?.adults,
                                        data?.roomCode,
                                        data?.basicInfo?.title,
                                        activeTabGuestDetails?.child,
                                        data?.roomCode,
                                        data?.roomCode,
                                        activeTabGuestDetails?.id,
                                        item?.rateContent?.name,
                                        data?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref
                                          ? urlFor(
                                              data?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref,
                                            ).url()
                                          : STATIC_IMAGE,
                                        item?.memberRate?.rateCode,
                                        isPackagesTab ? true : false,
                                        currencyCode,
                                        journeyFrom,
                                        isSEB,
                                        isSEB ? sebReqID : "",
                                      ),
                                      handleAddToCart(
                                        item,
                                        item?.memberRate?.total?.amountPayableNow,
                                        activeTabGuestDetails?.adults,
                                        data?.basicInfo?.title,
                                        activeTabGuestDetails?.child,
                                        data?.roomCode,
                                        activeTabGuestDetails?.id,
                                        item?.rateContent?.name,
                                        item?.memberRate?.tax?.amount,
                                        item?.rateContent?.currencyCode,
                                        item?.memberRate?.total?.amountWithInclusiveTaxes,
                                        false,
                                        true,
                                        showWithTaxes
                                          ? item?.standardRate?.total?.amountWithTaxesFees -
                                              item?.memberRate?.total?.amountWithTaxesFees
                                          : item?.standardRate?.total?.amount - item?.memberRate?.total?.amount,
                                        "Member Room",
                                        PathType,
                                        "Member Rate",
                                      ),
                                    ]
                                : navigate("/neupass-login", PathType.dialog)
                            },
                            memberRateText: isLoggedIn ? CONSTANTS?.SELECT : CONSTANTS?.LOGIN_JOIN,
                            standardRateText: isMemberDealsTab
                              ? isLoggedIn
                                ? CONSTANTS?.SELECT
                                : CONSTANTS?.LOGIN_JOIN
                              : CONSTANTS?.SELECT,
                          })
                          navigate(defaultModalPath, PathType?.dialog)
                          handleSelect(
                            item?.memberRate?.total?.amountPayableNow,
                            activeTabGuestDetails?.adults,
                            data?.basicInfo?.title,
                            activeTabGuestDetails?.child,
                            data?.roomCode,
                            activeTabGuestDetails?.id,
                            item?.rateContent?.name,
                            item?.memberRate?.rateCode,
                            item?.memberRate?.tax?.amount,
                            item?.rateContent?.currencyCode,
                            index,
                            PathType?.dialog,
                            item,
                          )
                        }}>
                        {isPackagesTab ? "Package Details" : "Rate Details"}
                      </CtaLabelTypo>
                      {item?.bookingPolicy?.guaranteeLevel?.toLowerCase() === "deposit" && (
                        <Typography
                          component="div"
                          variant="body-xs"
                          sx={{
                            mt: DesktopPxToVw(15),
                            fontWeight: 700,
                            fontStyle: "italic",
                          }}>
                          {item?.bookingPolicy?.description}
                        </Typography>
                      )}
                    </ColumnListBox>
                    <Stack sx={{ flexDirection: "row" }}>
                      <StyledDivider />
                      <ColumnListBox
                        sx={{
                          justifyContent: "center",
                          minWidth: DesktopPxToVw(156),
                        }}>
                        <>
                          {isChangeRooms && (
                            <Typography
                              mb={isMobile ? MobilePxToVw(10) : DesktopPxToVw(15)}
                              whiteSpace={"nowrap"}
                              color={theme.palette.ihclPalette.hexTwentyFour}
                              variant={isMobile ? "m-body-xs" : "body-xs"}>
                              &#8212;{` ${CONSTANTS?.PRICE_CHANGE} `}&#8212;
                            </Typography>
                          )}
                          {/* Room Rates */}
                          {/* Member Rate */}
                          {item?.memberRate && (
                            <RateBox>
                              <MemberRateLabelTypo variant="body-xs">{CONSTANTS?.MEMBER_RATE}</MemberRateLabelTypo>
                              <Typography variant="body-l">
                                {currencyPrettier(
                                  Number(
                                    showWithTaxes
                                      ? isChangeRooms
                                        ? Number(item?.memberRate?.total?.amountWithTaxesFees) -
                                          (selectedRoom?.modifyBooking?.price +
                                            selectedRoom?.modifyBooking?.tax?.amount ||
                                            selectedRoom?.price + selectedRoom?.tax?.amount)
                                        : item?.memberRate?.perNight?.price?.total?.amountWithTaxesFees
                                      : isChangeRooms
                                      ? Number(item?.memberRate?.total?.amount) -
                                        (selectedRoom?.modifyBooking?.price || selectedRoom?.price)
                                      : item?.memberRate?.perNight?.price?.total?.amount,
                                  ),
                                  item?.rateContent?.currencyCode,
                                )}
                              </Typography>
                              <Button
                                variant="light-contained"
                                disabled={isAllRoomsSelected}
                                sx={{
                                  whiteSpace: "nowrap",
                                  fontSize: DesktopPxToVw(12),
                                  height: "auto",
                                  padding: "0.521vw 1.2vw",
                                  minWidth: DesktopPxToVw(128),
                                  lineHeight: DesktopPxToVw(17),
                                }}
                                onClick={() => {
                                  isLoggedIn
                                    ? isChangeRooms
                                      ? handleChangeRooms(item, data, "memberRate")
                                      : isAllRoomsSelected
                                      ? handleReservation()
                                      : checkRateCodeAvailable(data?.roomCode, item?.memberRate?.rateCode, "memberRate")
                                      ? [
                                          setCartDetails(
                                            item?.memberRate?.total?.amountPayableNow,
                                            activeTabGuestDetails?.adults,
                                            data?.roomCode,
                                            data?.basicInfo?.title,
                                            activeTabGuestDetails?.child,
                                            data?.roomCode,
                                            data?.roomCode,
                                            activeTabGuestDetails?.id,
                                            item?.rateContent?.name,
                                            data?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref
                                              ? urlFor(
                                                  data?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref,
                                                ).url()
                                              : STATIC_IMAGE,
                                            item?.memberRate?.rateCode,
                                            isPackagesTab ? true : false,
                                            currencyCode,
                                            journeyFrom,
                                            isSEB,
                                            isSEB ? sebReqID : "",
                                          ),
                                          handleAddToCart(
                                            item,
                                            item?.memberRate?.total?.amountPayableNow,
                                            activeTabGuestDetails?.adults,
                                            data?.roomCode,
                                            data?.basicInfo?.title,
                                            activeTabGuestDetails?.child,
                                            activeTabGuestDetails?.id,
                                            item?.rateContent?.name,
                                            item?.memberRate?.tax?.amount,
                                            item?.rateContent?.currencyCode,
                                            item?.memberRate?.total?.amountWithInclusiveTaxes,
                                            false,
                                            true,
                                            showWithTaxes
                                              ? item?.standardRate?.total?.amountWithTaxesFees -
                                                  item?.memberRate?.total?.amountWithTaxesFees
                                              : item?.standardRate?.total?.amount - item?.memberRate?.total?.amount,
                                            "Member Room",
                                            PathType,
                                            "Member Rate",
                                          ),
                                        ]
                                      : updateBookingError(true)
                                    : navigate("/neupass-login", PathType.dialog)
                                }}>
                                {isLoggedIn ? CONSTANTS?.SELECT : CONSTANTS?.LOGIN_JOIN}
                              </Button>
                            </RateBox>
                          )}
                          {/* Standard Rate */}
                          {item?.standardRate && (
                            <RateBox sx={{ marginTop: "1.1vw" }}>
                              <Typography variant="body-xxs" whiteSpace={"nowrap"}>
                                {CONSTANTS?.STANDARD_RATE}
                              </Typography>
                              <Typography variant="body-l">
                                {currencyPrettier(
                                  Number(
                                    showWithTaxes
                                      ? isChangeRooms
                                        ? Number(item?.standardRate?.total?.amountWithTaxesFees) -
                                          (selectedRoom?.modifyBooking?.price +
                                            selectedRoom?.modifyBooking?.tax?.amount ||
                                            selectedRoom?.price + selectedRoom?.tax?.amount)
                                        : item?.standardRate?.perNight?.price?.total?.amountWithTaxesFees
                                      : isChangeRooms
                                      ? Number(item?.standardRate?.total?.amount) -
                                        (selectedRoom?.modifyBooking?.price || selectedRoom?.price)
                                      : item?.standardRate?.perNight?.price?.total?.amount,
                                  ),
                                  item?.rateContent?.currencyCode,
                                )}
                              </Typography>
                              <Button
                                variant="light-outlined"
                                disabled={isAllRoomsSelected}
                                sx={{
                                  fontSize: DesktopPxToVw(12),
                                  height: "auto",
                                  padding: "0.521vw 1.2vw",
                                  minWidth: DesktopPxToVw(128),
                                  lineHeight: DesktopPxToVw(17),
                                }}
                                onClick={() => {
                                  isAllRoomsSelected && !isChangeRooms
                                    ? handleReservation()
                                    : isChangeRooms
                                    ? handleChangeRooms(item, data, "standardRate")
                                    : checkRateCodeAvailable(
                                        data?.roomCode,
                                        item?.standardRate?.rateCode,
                                        "standardRate",
                                      )
                                    ? [
                                        setCartDetails(
                                          item?.standardRate?.total?.amountPayableNow,
                                          activeTabGuestDetails?.adults,
                                          data?.roomCode,
                                          data?.basicInfo?.title,
                                          activeTabGuestDetails?.child,
                                          data?.roomCode,
                                          data?.roomCode,
                                          activeTabGuestDetails?.id,
                                          item?.rateContent?.name,
                                          data?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref
                                            ? urlFor(
                                                data?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref,
                                              ).url()
                                            : STATIC_IMAGE,
                                          item?.standardRate?.rateCode,
                                          isPackagesTab ? true : false,
                                          currencyCode,
                                          journeyFrom,
                                          isSEB,
                                          isSEB ? sebReqID : "",
                                        ),
                                        handleAddToCart(
                                          item,
                                          item?.standardRate?.total?.amountPayableNow,
                                          activeTabGuestDetails?.adults,
                                          data?.roomCode,
                                          data?.basicInfo?.title,
                                          activeTabGuestDetails?.child,
                                          activeTabGuestDetails?.id,
                                          item?.rateContent?.name,
                                          item?.standarate?.tax?.amount,
                                          item?.rateContent?.currencyCode,
                                          item?.standardRate?.perNight?.price?.total?.amountWithInclusiveTaxes,
                                          true,
                                          false,
                                          0,
                                          "Standard Room",
                                          PathType,
                                          "Standard Rate",
                                        ),
                                      ]
                                    : updateBookingError(true)
                                }}>
                                SELECT
                              </Button>
                            </RateBox>
                          )}
                          {/* Packages */}
                          {item?.total && (
                            <RateBox sx={{ marginTop: "1.1vw" }}>
                              {isComplementaryVoucher ? (
                                <Typography variant="body-xs" sx={{ whiteSpace: "nowrap", mb: "2vw" }}>
                                  {CONSTANTS?.REDEEM_VOUCHER}
                                </Typography>
                              ) : (
                                <>
                                  <Typography variant="body-xs" whiteSpace={"nowrap"}>
                                    {isMemberDealsTab || isPromotionsTab
                                      ? CONSTANTS?.EXCLUSIVE_RATE
                                      : CONSTANTS?.STANDARD_RATE}
                                  </Typography>
                                  <Typography variant="body-l">
                                    {currencyPrettier(
                                      Number(
                                        showWithTaxes
                                          ? isChangeRooms
                                            ? Number(item?.total?.amountWithTaxesFees) -
                                              (selectedRoom?.price + selectedRoom?.tax?.amount)
                                            : item?.perNight?.price?.total?.amountWithTaxesFees
                                          : isChangeRooms
                                          ? Number(item?.total?.amount) - selectedRoom?.price
                                          : item?.perNight?.price?.total?.amount,
                                      ),
                                      item?.rateContent?.currencyCode,
                                    )}
                                  </Typography>
                                </>
                              )}

                              <Button
                                variant="light-outlined"
                                disabled={isAllRoomsSelected}
                                sx={{
                                  fontSize: DesktopPxToVw(12),
                                  height: "auto",
                                  padding: "0.521vw 1.2vw",
                                  minWidth: DesktopPxToVw(128),
                                  lineHeight: DesktopPxToVw(17),
                                }}
                                onClick={() => {
                                  isMemberDealsTab && !isLoggedIn
                                    ? navigate("/neupass-login", PathType.dialog)
                                    : isAllRoomsSelected && !isChangeRooms
                                    ? handleReservation()
                                    : isChangeRooms
                                    ? handleChangeRooms(item, data, "package")
                                    : checkRateCodeAvailable(data?.roomCode, item?.rateCode, "package")
                                    ? [
                                        setCartDetails(
                                          item?.total?.amountPayableNow,
                                          activeTabGuestDetails?.adults,
                                          data?.roomCode,
                                          data?.basicInfo?.title,
                                          activeTabGuestDetails?.child,
                                          data?.roomCode,
                                          data?.roomCode,
                                          activeTabGuestDetails?.id,
                                          item?.rateContent?.name,
                                          data?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref
                                            ? urlFor(
                                                data?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref,
                                              ).url()
                                            : STATIC_IMAGE,
                                          item?.rateCode,
                                          isPackagesTab ? true : false,
                                          currencyCode,
                                          journeyFrom,
                                          isSEB,
                                          isSEB ? sebReqID : "",
                                        ),
                                        handleAddToCart(
                                          item,
                                          item?.total?.amountPayableNow,
                                          activeTabGuestDetails?.adults,
                                          data?.roomCode,
                                          data?.basicInfo?.title,
                                          activeTabGuestDetails?.child,
                                          activeTabGuestDetails?.id,
                                          item?.rateContent?.name,
                                          item?.standardrate?.tax?.amount,
                                          item?.rateContent?.currencyCode,
                                          item?.standardRate?.total?.amountWithInclusiveTaxes,
                                          true,
                                          false,
                                          0,
                                          "Standard Room",
                                          PathType,
                                          "Standard Rate",
                                        ),
                                      ]
                                    : updateBookingError(true)
                                }}>
                                {data?.roomCode === selectedRoom?.roomType &&
                                isModification &&
                                item?.rateCode === selectedRoom?.rateCode
                                  ? "KEEP ROOM"
                                  : isMemberDealsTab && !isLoggedIn
                                  ? CONSTANTS?.LOGIN_JOIN
                                  : CONSTANTS?.SELECT}
                              </Button>
                            </RateBox>
                          )}
                        </>
                      </ColumnListBox>
                    </Stack>
                  </CardMainBox>
                </Stack>
              ) : (
                <NoRoomsAvailableView />
              )}
            </>
          ))
        ) : (
          <NoRoomsAvailableView />
        )}
      </>
    )
  }

  const renderMobileView = () => {
    return (
      <>
        <Stack>
          <TabsStack>
            {tabValues?.map((item: any, index: number) => (
              <Stack key={index}>
                <Typography
                  variant="m-body-s"
                  onClick={() => setTabIndex(index)}
                  sx={{
                    color: index == tabIndex ? theme?.palette?.ihclPalette?.hexTwo : theme?.palette?.text?.primary,
                  }}>
                  {item?.tab}
                </Typography>
                {index == tabIndex && <TabHighlightDivider />}
              </Stack>
            ))}
          </TabsStack>
          <FullWidthDivider sx={{ marginBottom: "3.125vw" }} />
        </Stack>
        {tabIndex === 0 ? (
          <>
            {data?.rooms?.length > 0 ? (
              data?.rooms?.slice(0, viewMore)?.map((item: any, index: number) => (
                <>
                  {item?.available || item?.standardRate?.available || item?.memberRate?.available ? (
                    <CardMainBox key={index} aria-label="PackageOffersCard">
                      <ColumnListBox>
                        <Typography variant={"m-body-l"} fontWeight={400}>
                          {item?.rateContent?.name}
                        </Typography>
                        <DescriptionTypo variant={"m-body-xs"} fontSize={MobilePxToVw(17)}>
                          {item?.rateContent?.details?.description}
                        </DescriptionTypo>
                        <HighlightsBox>
                          {item?.rateContent?.details?.detailedDescription && (
                            <DetailedDescription longDescription={item?.rateContent?.details?.detailedDescription} />
                          )}
                        </HighlightsBox>

                        <CtaLabelTypo
                          variant={"m-text-link"}
                          sx={{ fontSize: MobilePxToVw(17) }}
                          onClick={() => {
                            modalStore?.setPropertyData({
                              title: item?.rateContent?.name,
                              shortDescription: item?.rateContent?.details?.description,
                              longDescription: item?.rateContent?.details?.detailedDescription,
                              cancellationPolicy: item?.cancellationPolicy?.description,
                              guaranteePolicy: item?.bookingPolicy?.description,
                              disabled: isAllRoomsSelected,
                              standardRate:
                                !isComplementaryVoucher &&
                                currencyPrettier(
                                  item?.standardRate
                                    ? Number(
                                        showWithTaxes
                                          ? isChangeRooms
                                            ? Number(item?.standardRate?.total?.amountWithTaxesFees) -
                                              (selectedRoom?.price + selectedRoom?.tax?.amount)
                                            : item?.standardRate?.perNight?.price?.total?.amountWithTaxesFees
                                          : isChangeRooms
                                          ? Number(item?.standardRate?.total?.amount) - selectedRoom?.price
                                          : item?.standardRate?.perNight?.price?.total?.amount,
                                      )
                                    : Number(
                                        showWithTaxes
                                          ? isChangeRooms
                                            ? Number(item?.total?.amountWithTaxesFees) -
                                              (selectedRoom?.price + selectedRoom?.tax?.amount)
                                            : item?.perNight?.price?.total?.amountWithTaxesFees
                                          : isChangeRooms
                                          ? Number(item?.total?.amount) - selectedRoom?.price
                                          : item?.perNight?.price?.total?.amount,
                                      ),
                                  item?.rateContent?.currencyCode,
                                ),
                              memberRate: item?.memberRate
                                ? currencyPrettier(
                                    Number(
                                      showWithTaxes
                                        ? isChangeRooms
                                          ? Number(item?.memberRate?.total?.amountWithTaxesFees) -
                                            (selectedRoom?.price + selectedRoom?.tax?.amount)
                                          : item?.memberRate?.perNight?.price?.total?.amountWithTaxesFees
                                        : isChangeRooms
                                        ? Number(item?.memberRate?.total?.amount) - selectedRoom?.price
                                        : item?.memberRate?.perNight?.price?.total?.amount,
                                    ),
                                    item?.rateContent?.currencyCode,
                                  )
                                : undefined,
                              rateLabel:
                                isMemberDealsTab || isPromotionsTab
                                  ? CONSTANTS?.EXCLUSIVE_RATE
                                  : CONSTANTS?.STANDARD_RATE,
                              onStandardSelect: () => {
                                isMemberDealsTab && !isLoggedIn
                                  ? navigate("/neupass-login", PathType.dialog)
                                  : isAllRoomsSelected && !isChangeRooms
                                  ? handleReservation()
                                  : isChangeRooms
                                  ? handleChangeRooms(item, data, "standardRate")
                                  : checkRateCodeAvailable(data?.roomCode, item?.standardRate?.rateCode, "standardRate")
                                  ? [
                                      setCartDetails(
                                        item?.standardRate?.total?.amountPayableNow,
                                        activeTabGuestDetails?.adults,
                                        data?.roomCode,
                                        data?.basicInfo?.title,
                                        activeTabGuestDetails?.child,
                                        data?.roomCode,
                                        data?.roomCode,
                                        activeTabGuestDetails?.id,
                                        item?.rateContent?.name,
                                        data?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref
                                          ? urlFor(
                                              data?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref,
                                            ).url()
                                          : STATIC_IMAGE,
                                        item?.standardRate?.rateCode ? item?.standardRate?.rateCode : item?.rateCode,
                                        isPackagesTab ? true : false,
                                        currencyCode,
                                        journeyFrom,
                                        isSEB,
                                        isSEB ? sebReqID : "",
                                      ),
                                      handleAddToCart(
                                        item,
                                        item?.standardRate?.total?.amountPayableNow,
                                        activeTabGuestDetails?.adults,
                                        data?.roomCode,
                                        data?.basicInfo?.title,
                                        activeTabGuestDetails?.child,
                                        activeTabGuestDetails?.id,
                                        item?.rateContent?.name,
                                        item?.standardRate?.tax?.amount,
                                        item?.rateContent?.currencyCode,
                                        item?.standardRate?.total?.amountWithInclusiveTaxes,
                                        true,
                                        false,
                                        0,
                                        "Standard Room",
                                        PathType,
                                        "Standard Rate",
                                      ),
                                    ]
                                  : updateBookingError(true)
                              },
                              onMemberSelect: () => {
                                isLoggedIn
                                  ? isChangeRooms
                                    ? handleChangeRooms(item, data, "memberRate")
                                    : isAllRoomsSelected
                                    ? handleReservation()
                                    : checkRateCodeAvailable(data?.roomCode, item?.memberRate?.rateCode, "memberRate")
                                    ? [
                                        setCartDetails(
                                          item?.memberRate?.total?.amountPayableNow,
                                          activeTabGuestDetails?.adults,
                                          data?.roomCode,
                                          data?.basicInfo?.title,
                                          activeTabGuestDetails?.child,
                                          data?.roomCode,
                                          data?.roomCode,
                                          activeTabGuestDetails?.id,
                                          item?.rateContent?.name,
                                          data?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref
                                            ? urlFor(
                                                data?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref,
                                              ).url()
                                            : STATIC_IMAGE,
                                          item?.memberRate?.rateCode,
                                          isPackagesTab ? true : false,
                                          currencyCode,
                                          journeyFrom,
                                          isSEB,
                                          isSEB ? sebReqID : "",
                                        ),
                                        handleAddToCart(
                                          item,
                                          item?.memberRate?.total?.amountPayableNow,
                                          activeTabGuestDetails?.adults,
                                          data?.roomCode,
                                          data?.basicInfo?.title,
                                          activeTabGuestDetails?.child,
                                          activeTabGuestDetails?.id,
                                          item?.rateContent?.name,
                                          item?.memberRate?.tax?.amount,
                                          item?.rateContent?.currencyCode,
                                          item?.memberRate?.total?.amountWithInclusiveTaxes,
                                          false,
                                          true,
                                          showWithTaxes
                                            ? item?.standardRate?.total?.amountWithTaxesFees -
                                                item?.memberRate?.total?.amountWithTaxesFees
                                            : item?.standardRate?.total?.amount - item?.memberRate?.total?.amount,
                                          "Member Room",
                                          PathType,
                                          "Member Rate",
                                        ),
                                      ]
                                    : updateBookingError(true)
                                  : navigate("/neupass-login", PathType.dialog)
                              },
                              memberRateText: isLoggedIn ? CONSTANTS?.SELECT : CONSTANTS?.LOGIN_JOIN,
                              standardRateText: isMemberDealsTab
                                ? isLoggedIn
                                  ? CONSTANTS?.SELECT
                                  : CONSTANTS?.LOGIN_JOIN
                                : CONSTANTS?.SELECT,
                            })
                            navigate(defaultModalPath, PathType?.dialog)
                          }}>
                          {isPackagesTab ? "Package Details" : "Rate Details"}
                        </CtaLabelTypo>
                        {item?.bookingPolicy?.guaranteeLevel?.toLowerCase() === "deposit" && (
                          <Typography
                            component="div"
                            variant="m-body-xs"
                            sx={{
                              fontWeight: 700,
                              fontStyle: "italic",
                              mt: MobilePxToVw(15),
                            }}>
                            {item?.bookingPolicy?.description}
                          </Typography>
                        )}
                      </ColumnListBox>
                      <StyledDivider />
                      {isChangeRooms && (
                        <Typography
                          textAlign={"center"}
                          mb={MobilePxToVw(20)}
                          whiteSpace={"nowrap"}
                          color={theme.palette.ihclPalette.hexTwentyFour}
                          variant={isMobile ? "m-body-xs" : "body-xs"}>
                          &#9135; {`  ${CONSTANTS?.PRICE_CHANGE}  `} &#9135;
                        </Typography>
                      )}
                      <ButtonsBox>
                        {item?.standardRate && (
                          <RateBox>
                            <MemberRateLabelTypo variant="body-xs" fontWeight={"300 !important"}>
                              {CONSTANTS?.STANDARD_RATE}
                            </MemberRateLabelTypo>
                            <Typography variant={"m-body-ml"}>
                              {currencyPrettier(
                                Number(
                                  showWithTaxes
                                    ? isChangeRooms
                                      ? Number(item?.standardRate?.total?.amountWithTaxesFees) -
                                        (selectedRoom?.modifyBooking?.price +
                                          selectedRoom?.modifyBooking?.tax?.amount ||
                                          selectedRoom?.price + selectedRoom?.tax?.amount)
                                      : item?.standardRate?.perNight?.price?.total?.amountWithTaxesFees
                                    : isChangeRooms
                                    ? Number(item?.standardRate?.total?.amount) -
                                      (selectedRoom?.modifyBooking?.price || selectedRoom?.price)
                                    : item?.standardRate?.perNight?.price?.total?.amount,
                                ),
                                item?.rateContent?.currencyCode,
                              )}
                            </Typography>
                            <RateSelectButton
                              disabled={isAllRoomsSelected}
                              variant="light-outlined"
                              onClick={() => {
                                isAllRoomsSelected && !isChangeRooms
                                  ? handleReservation()
                                  : isChangeRooms
                                  ? handleChangeRooms(item, data, "standardRate")
                                  : checkRateCodeAvailable(data?.roomCode, item?.standardRate?.rateCode, "standardRate")
                                  ? setCartDetails(
                                      item?.standardRate?.total?.amountPayableNow,
                                      activeTabGuestDetails?.adults,
                                      data?.roomCode,
                                      data?.basicInfo?.title,
                                      activeTabGuestDetails?.child,
                                      data?.roomCode,
                                      data?.roomCode,
                                      activeTabGuestDetails?.id,
                                      item?.rateContent?.name,
                                      data?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref
                                        ? urlFor(
                                            data?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref,
                                          ).url()
                                        : STATIC_IMAGE,
                                      item?.standardRate?.rateCode,
                                      isPackagesTab ? true : false,
                                      currencyCode,
                                      journeyFrom,
                                      isSEB,
                                      isSEB ? sebReqID : "",
                                    )
                                  : updateBookingError(true)
                              }}>
                              SELECT
                            </RateSelectButton>
                          </RateBox>
                        )}
                        {item?.memberRate && (
                          <>
                            {item?.standardRate && <VerticalDivider />}
                            <RateBox>
                              <MemberRateLabelTypo variant="body-xs">{CONSTANTS?.MEMBER_RATE}</MemberRateLabelTypo>
                              <Typography variant={"m-body-ml"}>
                                {currencyPrettier(
                                  Number(
                                    showWithTaxes
                                      ? isChangeRooms
                                        ? Number(item?.memberRate?.total?.amountWithTaxesFees) -
                                          (selectedRoom?.price + selectedRoom?.tax?.amount)
                                        : item?.memberRate?.perNight?.price?.total?.amountWithTaxesFees
                                      : isChangeRooms
                                      ? Number(item?.memberRate?.total?.amount) - selectedRoom?.price
                                      : item?.memberRate?.perNight?.price?.total?.amount,
                                  ),
                                  item?.rateContent?.currencyCode,
                                )}
                              </Typography>
                              <RateSelectButton
                                disabled={isAllRoomsSelected}
                                variant="light-contained"
                                onClick={() => {
                                  isLoggedIn
                                    ? isChangeRooms
                                      ? handleChangeRooms(item, data, "memberRate")
                                      : isAllRoomsSelected
                                      ? handleReservation()
                                      : checkRateCodeAvailable(data?.roomCode, item?.memberRate?.rateCode, "memberRate")
                                      ? [
                                          setCartDetails(
                                            item?.memberRate?.total?.amountPayableNow,
                                            activeTabGuestDetails?.adults,
                                            data?.roomCode,
                                            data?.basicInfo?.title,
                                            activeTabGuestDetails?.child,
                                            data?.roomCode,
                                            data?.roomCode,
                                            activeTabGuestDetails?.id,
                                            item?.rateContent?.name,
                                            data?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref?._ref
                                              ? urlFor(
                                                  data?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref,
                                                ).url()
                                              : STATIC_IMAGE,
                                            item?.memberRate?.rateCode,
                                            isPackagesTab ? true : false,
                                            currencyCode,
                                            journeyFrom,
                                            isSEB,
                                            isSEB ? sebReqID : "",
                                          ),
                                          //analytics
                                          handleAddToCart(
                                            item,
                                            item?.memberRate?.total?.amountPayableNow,
                                            activeTabGuestDetails?.adults,
                                            data?.roomCode,
                                            data?.basicInfo?.title,
                                            activeTabGuestDetails?.child,
                                            activeTabGuestDetails?.id,
                                            item?.rateContent?.name,
                                            item?.memberRate?.tax?.amount,
                                            item?.rateContent?.currencyCode,
                                            item?.memberRate?.total?.amountWithInclusiveTaxes,
                                            false,
                                            true,
                                            showWithTaxes
                                              ? item?.standardRate?.total?.amountWithTaxesFees -
                                                  item?.memberRate?.total?.amountWithTaxesFees
                                              : item?.standardRate?.total?.amount - item?.memberRate?.total?.amount,
                                            "Member Room",
                                            PathType,
                                            "Member Rate",
                                          ),
                                        ]
                                      : updateBookingError(true)
                                    : navigate("/neupass-login", PathType.dialog)
                                }}>
                                {isLoggedIn ? CONSTANTS?.SELECT : CONSTANTS?.LOGIN_JOIN}
                              </RateSelectButton>
                            </RateBox>
                          </>
                        )}

                        {item?.total && (
                          <RateBox>
                            {isComplementaryVoucher ? (
                              <>
                                <MemberRateLabelTypo
                                  variant="body-xs"
                                  sx={{
                                    fontWeight: "300 !important",
                                    mb: "2vw !important",
                                  }}>
                                  {CONSTANTS?.REDEEM_VOUCHER}
                                </MemberRateLabelTypo>
                              </>
                            ) : (
                              <>
                                <MemberRateLabelTypo variant="body-xs" fontWeight={"300 !important"}>
                                  {isMemberDealsTab || isPromotionsTab
                                    ? CONSTANTS?.EXCLUSIVE_RATE
                                    : CONSTANTS?.STANDARD_RATE}
                                </MemberRateLabelTypo>
                                <Typography variant={"m-body-ml"}>
                                  {currencyPrettier(
                                    Number(
                                      showWithTaxes
                                        ? isChangeRooms
                                          ? Number(item?.total?.amountWithTaxesFees) -
                                            (selectedRoom?.price + selectedRoom?.tax?.amount)
                                          : item?.perNight?.price?.total?.amountWithTaxesFees
                                        : isChangeRooms
                                        ? Number(item?.total?.amount) - selectedRoom?.price
                                        : item?.perNight?.price?.total?.amount,
                                    ),
                                    item?.rateContent?.currencyCode,
                                  )}
                                </Typography>
                              </>
                            )}
                            <RateSelectButton
                              variant="light-outlined"
                              disabled={isAllRoomsSelected}
                              onClick={() => {
                                isMemberDealsTab && !isLoggedIn
                                  ? navigate("/neupass-login", PathType.dialog)
                                  : isAllRoomsSelected && !isChangeRooms
                                  ? handleReservation()
                                  : isChangeRooms
                                  ? handleChangeRooms(item, data, "package")
                                  : checkRateCodeAvailable(data?.roomCode, item?.rateCode, "package")
                                  ? setCartDetails(
                                      item?.total?.amountPayableNow,
                                      activeTabGuestDetails?.adults,
                                      data?.roomCode,
                                      data?.basicInfo?.title,
                                      activeTabGuestDetails?.child,
                                      data?.roomCode,
                                      data?.roomCode,
                                      activeTabGuestDetails?.id,
                                      item?.rateContent?.name,
                                      data?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref
                                        ? urlFor(
                                            data?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref,
                                          ).url()
                                        : STATIC_IMAGE,
                                      item?.rateCode,
                                      isPackagesTab ? true : false,
                                      currencyCode,
                                      journeyFrom,
                                      isSEB,
                                      isSEB ? sebReqID : "",
                                    )
                                  : updateBookingError(true)
                              }}>
                              {isMemberDealsTab && !isLoggedIn ? CONSTANTS?.LOGIN_JOIN : CONSTANTS?.SELECT}
                            </RateSelectButton>
                          </RateBox>
                        )}
                      </ButtonsBox>
                    </CardMainBox>
                  ) : (
                    <NoRoomsAvailableView />
                  )}
                </>
              ))
            ) : (
              <NoRoomsAvailableView />
            )}
          </>
        ) : (
          //* Room Details Tab View
          <RoomDetailsBox aria-label="RoomDetailsTabView">
            <Stack>
              <Typography variant="m-body-sl" fontWeight={400}>
                Room Details
              </Typography>
              <Typography variant="m-body-xs" mt="1.563vw">
                {data?.basicInfo?.description}
              </Typography>
              {data?.roomModalDetails?.specifications?.map((item: any, index: number) => (
                <AmenitiesStack key={index}>
                  <HighlightsImage component="img" src={urlFor(item?.imageAsset?.largeImage?.[0]?.asset?._ref).url()} />
                  <Typography variant="m-body-xs">{item?.value}</Typography>
                </AmenitiesStack>
              ))}

              <AmenitiesStack sx={{ marginTop: "3.672vw !important" }} onClick={handleGalleryPopup}>
                <GalleryImage component="img" src="../gold-gallery-icon.svg" />
                <Typography variant="m-body-xs" fontWeight={700} color={theme?.palette?.ihclPalette?.hexTwo}>
                  GALLERY
                </Typography>
              </AmenitiesStack>
              <FullWidthDivider sx={{ margin: "4.688vw 0vw 3.125vw 0vw" }} />
              <Typography variant="m-body-sl" fontWeight={400}>
                {data?.roomModalDetails?.mobileAmenitiesTitle}
              </Typography>
              {data?.roomModalDetails?.mobileAmenities?.length > 0 && (
                <>
                  <Grid
                    container
                    sx={{
                      justifyContent: "space-between",
                      marginTop: "4.688vw",
                    }}>
                    {data?.roomModalDetails?.mobileAmenities
                      ?.slice(0, viewMoreAmenities)
                      ?.map((item: any, index: number) => (
                        <Grid item xs={2.6} sm={2.6} key={index} marginBottom="4.688vw">
                          <AmenitiesItemStack>
                            <AmenitiesImage
                              component="img"
                              src={urlFor(item?.imageAsset?.largeImage?.[0]?.asset?._ref).url()}
                            />
                            <Typography variant="m-body-xs">{item?.value}</Typography>
                          </AmenitiesItemStack>
                        </Grid>
                      ))}
                  </Grid>
                  <Stack
                    onClick={() =>
                      setViewMoreAmenities(isViewMoreAmenities ? data?.roomModalDetails?.mobileAmenities?.length : 4)
                    }
                    sx={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                    <Typography variant="m-text-link" sx={{ textAlign: "center" }}>
                      {isViewMoreAmenities ? "View More" : "View Less"}
                    </Typography>
                    {isViewMoreAmenities ? (
                      <ExpandMore sx={{ color: theme.palette.ihclPalette.hexTwo }} />
                    ) : (
                      <ExpandLess sx={{ color: theme.palette.ihclPalette.hexTwo }} />
                    )}
                  </Stack>
                </>
              )}
            </Stack>
          </RoomDetailsBox>
        )}
      </>
    )
  }

  return (
    <>
      {loading && <LoadingSpinner />}
      {isMobile ? renderMobileView() : renderDesktopView()}
    </>
  )
}

export default observer(PackageOffersCard)
