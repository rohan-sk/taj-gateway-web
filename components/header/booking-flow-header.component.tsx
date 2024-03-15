import React, { useContext, useEffect, useState } from "react"
import dayjs from "dayjs"
import dynamic from "next/dynamic"
import { PathType } from "../../types"
import { useRouter } from "next/router"
import { theme } from "../../lib/theme"
import { urlFor } from "../../lib-sanity"
import { observer } from "mobx-react-lite"
import { ROUTES } from "../../utils/routes"
import Pluralize from "../../utils/pluralize"
import { GAStore, PropertyStore, UserStore } from "../../store"
import { useDebounce } from "../../utils/useDebounce"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import fetchRateFilter from "../../utils/fetchRateFilter"
import AddNumberOfDays from "../../utils/addDaysToGivenDate"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { GLOBAL_STORES, PAGE_STORES } from "../../utils/Constants"
import { CONSTANTS, GINGER_BRAND_NAME, ICONS } from "../constants"
import SearchStore from "../../features/search/store/search.store"
import { Gold_Profile_icon } from "../forms/gift-card-form/constants"
import fetchRateOnlyFilter from "../../utils/fetchRateOnlyFilterForCalendar"
import BookingsFlowStore from "../../features/booking/store/pageStore/booking.store"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import BookingFlowGlobalStore from "../../features/booking/store/globalStore/booking.flow.store"
import { AppBar, Box, ClickAwayListener, Divider, Grid, Stack, Typography } from "@mui/material"
import BookingConfirmationPageStore from "../../features/booking/store/pageStore/booking.confirmation.store"
import BookingPopupMessage from "../../mock-data/booking/booking-popup-messages.json"
import {
  getTodayDate,
  getTomorrowDate,
  differenceInDays,
  formatDateWithMON,
  dateFormatConverter,
  getDayAfterTomorrowDate,
  firstDateOfSelectedMonth,
  getPreviousDate,
  addDaysToDate,
} from "../../utils/getDate"
import {
  FlexBox,
  LogoBox,
  ProfileBox,
  SearchLoader,
  BottomDivider,
  BookingMainBox,
  StyledArrowBox,
  AccountTypography,
  StyledVerticalDivider,
  LocalizationProviderBox,
  StyledHorizontalDivider,
  BookingMainSearchButton,
  SpecialCodeWrapperTypography,
  FieldsContainer,
} from "./styles/booking-flow-header"
import { SearchMenuList } from "./styles/booking-menu"
import { StyledDivider, TextFieldBox, TypographyStyle } from "../banner/styles"
import { getCookie } from "../../utils/cookie"
import { triggerEvent } from "../../utils/analytics"
import { useMobileCheck } from "../../utils/isMobilView"
import { useLoggedIn } from "../../utils/hooks/useLoggedIn"
import getNonTajBrandCrossURL from "../../utils/getCrossBrandURL"
import { PAGE_LANG, TAJ_HOTELS } from "../../utils/analytics/constants"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
import { CrossSiteNavigation } from "../../utils/sso/cross-site-navigation"
import { gridBreakPointsGenerator } from "../card/SearchResultCards/search-card.component"
import BookingSEBDateCardComponent from "../card/booking-seb-date-limit.card.component"
import getSEBCrossBrandURL from "../../utils/getSEBCrossBrandURL"
import { RoomsAndSuitesRoute, bookingRoute } from "../../features/property/ui/constants"

//*Components
const BasicModal = dynamic(() => import("../hoc/modal/modal"))
const Loader = dynamic(() => import("../../utils/SpinnerComponent"))
const GuestRoomComponent = dynamic(() => import("../banner/guestRooms/GuestRoomComponent"))
const BookingFlowSpecialCodeComponent = dynamic(() => import("./booking-special-code.component"))
const CartClearanceDialog = dynamic(() => import("../../features/booking/ui/cart-clearance-modal-component"))
const CustomDateTileComponent = dynamic(() => import("../hoc/CustomDatePicker/custom-date-tile.component"))
const CustomDatePickerComponent = dynamic(() => import("../hoc/CustomDatePicker/custom-date-picker.component"))
const BookingDateRangeLimitCardComponent = dynamic(() => import("../card/booking-date-range-limit.card.component"))
const DropDownArrow = dynamic(() => import("../../utils/customIcons").then((module) => module.DropDownArrow))

const BookingFlowHeader = (props: any) => {
  const { secondaryLogo } = props?.[0]
  const router = useRouter()
  const navigate = useAppNavigation()
  const isMobile = useMobileCheck()
  const isCustomerLoggedIn = useLoggedIn()
  const pageContext = useContext(PageContext)
  const context: any = useContext(IHCLContext)
  const isCUGOffer = router?.query?.isCUGOffer === "true" //? Using to disable the booking mask if it is a CUG Offers journey
  const isComplementary = router?.query?.isComplementaryVoucher
  const routerArr = router?.asPath?.split("/")
  const hotelRoomsSuitesIndex = routerArr?.findIndex((route: any) => route === RoomsAndSuitesRoute)
  const isHotelLevelBookingRoute =
    hotelRoomsSuitesIndex === 3 && routerArr?.[hotelRoomsSuitesIndex + 1] === bookingRoute

  //* store
  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const searchStore = context.getGlobalStore(GLOBAL_STORES.searchStore) as SearchStore
  const bookingFlowPageStore = pageContext?.getPageStore(PAGE_STORES?.bookingFlowStore) as BookingsFlowStore
  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore
  const propertyStore = context?.getGlobalStore(GLOBAL_STORES.propertyStore) as PropertyStore
  const bookingConfirmationPageStore = pageContext?.getPageStore(
    PAGE_STORES.BOOKING_STORES.bookingConfirmationPageStore,
  ) as BookingConfirmationPageStore

  const {
    loading,
    cartDetails,
    hotelDetails,
    guestDetails,
    timeRemaining,
    stepperDetails,
    addToCartPayload,
    isCalendarLoading,
    guestBookingSchedule,
    userEnteredPromoCode,
    modifiedRoomsDetails,
    globalSearchedData,
    isCouponCodeOpen,
    emptyUserCart,
    clearCartResponse,
    clearOrderResponse,
    updateGuestDetails,
    changeCurrentRoomId,
    setCalenderViewData,
    clearCalenderViewData,
    updateCalenderViewData,
    setGuestBookingSchedule,
    setInitialModifiedRooms,
    clearPaymentLabelResponse,
    setCheckAvailabilityPayload,
    setGlobalSearchedData,
    setUserEnteredPromoCode,
    updateSessionAlertModal,
    setIsSelectedComplimentaryVoucher,
  } = bookingFlowGlobalStore

  const { searchResults } = searchStore

  let lengthOfStay = Number(router?.query?.minLOS as string)
  const confirmationResponse = bookingConfirmationPageStore?.bookingConfirmationResponse
  const isSEB = Boolean(router?.query?.sebbalance) || Boolean(confirmationResponse?.isSeb)
  const hotelName = addToCartPayload?.hotel[0]?.hotelName || confirmationResponse?.hotelName || hotelDetails?.hotelName
  let cartClearanceData = {
    ...BookingPopupMessage?.cartClearance,
  }

  const [open, setOpen] = useState<boolean>(false)
  const [dateKey, setDateKey] = useState<number>(0)
  const [adultCount, setAdultCount] = useState<number>(1)
  const [childCount, setChildCount] = useState<number>(0)
  const [cartClearance, setCartClearance] = useState(false)
  const [searchValue, setSearchValue] = useState(hotelName)
  const [openOffers, setOpenOffers] = useState<boolean>(false)
  const [openSearch, setOpenSearch] = useState<boolean>(false)
  const [refresh, setRefresh] = useState<any>(new Date().getTime())
  const [popupData, setPopupData] = useState<any>(cartClearanceData)
  const [selectedHotelData, setSelectedHotelData] = useState<any>({})
  const [selectedType, setSelectedType] = useState<string>("check_in")
  const [limitExceedModal, setLimitExceedModal] = useState<boolean>(false)
  const [isTajLogoClicked, setIsTajLogoClicked] = useState<boolean>(false)
  const [pressedBackButton, setPressedBackButton] = useState<boolean>(false)
  const [isMyAccountClicked, setIsMyAccountClicked] = useState<boolean>(false)
  const [disableBookingMask, setDisableBookingMask] = useState<boolean>(false)
  const [expandGuestRoomCount, setExpandGuestRoomCount] = useState<boolean>(false)
  const [guestCount, setGuestCount] = useState<number>(guestDetails?.data?.length || 1)
  const [generatedHotelID, setGeneratedHotelID] = useState<string | undefined>(
    globalSearchedData?.id || globalSearchedData?.hotelId || propertyStore?.propertyData?.hotelId,
  )
  const [date, setDate] = useState<any>([
    guestBookingSchedule?.userCheckInDate ? new Date(guestBookingSchedule?.userCheckInDate) : dayjs(getTomorrowDate()),
    guestBookingSchedule?.userCheckOutDate
      ? new Date(guestBookingSchedule?.userCheckOutDate)
      : lengthOfStay
      ? addDaysToDate(dayjs(getTomorrowDate()), lengthOfStay ? lengthOfStay : 1)
      : getDayAfterTomorrowDate(),
  ])
  const [roomsCount, setRoomsCount] = useState(
    guestDetails?.data ? guestDetails?.data : [{ id: 1, adults: 1, child: 0, room: "ROOM", isSelected: false }],
  )
  const [userLandingFrom, setUserLandingFrom] = useState<any>({
    isFromOffers: false,
    isFromVouchers: false,
    offerPromoCode: null,
    offerRateCode: null,
    voucherPromoCode: null,
  })

  const currentRoomCount = confirmationResponse?.number_of_rooms
    ? confirmationResponse?.number_of_rooms
    : roomsCount.length

  const modificationPaths = [ROUTES?.MY_ACCOUNT.CHANGE_ROOMS, ROUTES?.MY_ACCOUNT.CHANGE_ROOMS_DETAIL]

  const sc = router?.query?.sc as string
  const endDate = dateFormatConverter(date[1])
  const startDate = dateFormatConverter(date[0])
  const userTier = global?.window?.localStorage?.getItem("userTier")
  const isModify = modificationPaths?.includes(global?.window?.location?.pathname)
  const roomLength = cartDetails?.cartDetailsResponse?.items?.[0]?.hotel?.[0]?.room?.length //* Selected room length (which are available in user cart)
  const isPromoCodeSelected = //* Using to show the selected promo code.
    userEnteredPromoCode?.agentId || userEnteredPromoCode?.promoCode || userEnteredPromoCode?.couponCode
  const roomsAddedInCart = cartDetails?.cartDetailsResponse?.items?.length > 0
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(userStore, gaStoreData)
  const isBookingConfirmationPage = router?.asPath?.includes("booking-confirmed")
  const brandName = selectedHotelData?.brand_name
  const isGinger = GINGER_BRAND_NAME?.toLowerCase() === brandName?.toLowerCase()
  const specialCode = isBookingConfirmationPage
    ? confirmationResponse?.promoType
      ? confirmationResponse?.promoType?.includes("-")
        ? confirmationResponse?.promoType?.split("-")?.[1]?.trim()
        : confirmationResponse?.promoType
      : CONSTANTS?.SPECIAL_CODE
    : isPromoCodeSelected
    ? userEnteredPromoCode?.title
      ? userEnteredPromoCode?.title
      : CONSTANTS?.SPECIAL_CODE
    : CONSTANTS?.SPECIAL_CODE
  const isReservationTab = bookingFlowPageStore?.currentStepper?.stepName === CONSTANTS?.RESERVATION
  const isRoomsTab = bookingFlowPageStore?.currentStepper?.stepName === CONSTANTS?.ROOM

  const handleEmptyCart = async () => {
    emptyUserCart()
    clearOrderResponse()
    clearPaymentLabelResponse()
    setInitialModifiedRooms()
    setUserEnteredPromoCode({
      title: "",
      index: null,
      agentId: null,
      promoCode: null,
      couponCode: null,
    })
    //? removes isComplementary when user discards booking
    if (isRoomsTab) {
      setIsSelectedComplimentaryVoucher(false)
    } else if (isReservationTab && (isTajLogoClicked || isMyAccountClicked)) {
      setIsSelectedComplimentaryVoucher(false)
    }
    if (brandName?.toLowerCase() !== "taj" && selectedHotelData?.brand_name) {
      handleRedirection()
    } else {
      if (!isTajLogoClicked && !isMyAccountClicked) {
        handleSearch()
      }
    }
  }

  const debouncedSearchTerm = useDebounce(searchValue, 300)
  // Input Search
  const handleHotelSearch = (event: any) => {
    const { value } = event?.target
    setOpenSearch(true)
    setSearchValue(value)
  }

  const handleHotelSelection = (hotel: any) => {
    setOpenSearch(false)
    setSearchValue(hotel?.name)
    setSelectedHotelData(hotel)
    setGeneratedHotelID(hotel?.id)
    if (hotel?.brand_name?.toLowerCase() === GINGER_BRAND_NAME?.toLowerCase()) {
      setUserEnteredPromoCode({
        title: "",
        index: null,
        agentId: null,
        promoCode: null,
        couponCode: null,
      })
    }
  }

  const handleModelClose = () => setLimitExceedModal(false)

  //? Invoking the autoCompleteSearch API
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        searchStore?.autoCompleteSearch(searchValue || "")
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedSearchTerm],
  )

  //? Showing the cart clearance alert if user have any selected rooms
  const handleLogoClick = () => {
    if (
      ((global?.window?.location.pathname === ROUTES.BOOKING.CART || isHotelLevelBookingRoute) &&
        cartDetails?.cartDetailsResponse?.items?.length > 0) ||
      (isModify && modifiedRoomsDetails?.data?.items?.length)
    ) {
      setCartClearance(true)
      setIsTajLogoClicked(true)
    } else {
      setUserEnteredPromoCode({
        title: "",
        index: null,
        agentId: null,
        promoCode: null,
        couponCode: null,
      })
      router?.push(ROUTES.WITHOUTSEO_FOR_ROUTING?.HOMEPAGE)
    }
  }

  const handleMyAccountClick = () => {
    if (isCustomerLoggedIn) {
      if (cartDetails?.cartDetailsResponse?.items?.length > 0 || modifiedRoomsDetails?.data?.items?.length > 0) {
        setIsMyAccountClicked(true)
        setCartClearance(true)
      } else {
        setUserEnteredPromoCode({
          title: "",
          index: null,
          agentId: null,
          promoCode: null,
          couponCode: null,
        })
        navigate(ROUTES.WITHOUTSEO_FOR_ROUTING.MY_ACCOUNT.OVERVIEW, PathType?.internal)
      }
    } else {
      navigate(props?.[0]?.loginList?.[0]?.url, props?.[0]?.loginList?.[0]?.urlType)
    }
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(global?.window?.location?.search)
    setGeneratedHotelID(urlParams?.get("hotelId") || undefined)
    setUserLandingFrom({
      ...userLandingFrom,
      isFromOffers: urlParams?.get("isFromOLP") ? true : false,
      isFromVouchers: urlParams?.get("isFromVoucher") ? true : false,
      offerPromoCode: urlParams?.get("offerPromoCode") !== undefined ? urlParams?.get("offerPromoCode") : null,
      offerRateCode: urlParams?.get("offerRateCode") !== undefined ? urlParams?.get("offerRateCode") : null,
      voucherPromoCode: urlParams?.get("voucherPromoCode") !== undefined ? urlParams?.get("voucherPromoCode") : null,
    })

    if (generatedHotelID || urlParams?.get("hotelId")) {
      setCheckAvailabilityPayload(
        roomsCount?.[0]?.child,
        roomsCount?.[0]?.adults,
        1,
        endDate,
        startDate,
        urlParams?.get("hotelId") || generatedHotelID || undefined,
        fetchRateFilter() || undefined,
        userTier || undefined,
        userLandingFrom?.isFromOffers,
        userLandingFrom?.offerRateCode,
        userLandingFrom?.offerPromoCode || userLandingFrom?.voucherPromoCode || userEnteredPromoCode?.promoCode,
        userEnteredPromoCode?.couponCode,
        userEnteredPromoCode?.agentId,
        userLandingFrom?.isFromVouchers,
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const mainUrl = global?.window?.location?.pathname
    const disablePaths = [
      ROUTES?.BOOKING?.CONFIRMED_PAGE,
      ROUTES?.MY_ACCOUNT?.CHANGE_ROOMS,
      ROUTES?.MY_ACCOUNT?.CHANGE_ROOMS_DETAIL,
    ]
    if (disablePaths?.includes(mainUrl) || isReservationTab) {
      setDisableBookingMask(true)
    } else {
      setDisableBookingMask(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingFlowPageStore?.currentStepper?.stepName])

  useEffect(() => {
    if (confirmationResponse?.check_in && confirmationResponse?.check_out) {
      setDate([confirmationResponse?.check_in, confirmationResponse?.check_out])
    }
  }, [confirmationResponse])
  const handleSpecialCode = () => {
    setOpenOffers(!openOffers)
  }

  const handleDateSelection = (pickedDate: any) => {
    const checkInDate = new Date(date?.[0])
    if (selectedType === "check_in") {
      setDate([pickedDate?.[0], addDaysToDate(pickedDate?.[0], lengthOfStay ? lengthOfStay : 1)])
      setSelectedType("check_out")
      setOpen(true)
    } else if (
      `${date?.[0]?.getDate()}${date?.[0]?.getMonth()}${date?.[0]?.getFullYear()}` ===
        `${pickedDate?.[0]?.getDate()}${pickedDate?.[0]?.getMonth()}${pickedDate?.[0]?.getFullYear()}` ||
      isComplementary
    ) {
      setDate([checkInDate, addDaysToDate(checkInDate, lengthOfStay ? lengthOfStay : 1)])
    } else if (pickedDate?.[0] <= checkInDate) {
      setDate([pickedDate?.[0], addDaysToDate(pickedDate?.[0], lengthOfStay ? lengthOfStay : 1)])
    } else if (differenceInDays(checkInDate, pickedDate?.[0]) < lengthOfStay) {
      setDate([checkInDate, addDaysToDate(checkInDate, lengthOfStay ? lengthOfStay : 1)])
    } else {
      setDate([checkInDate, pickedDate?.[0]])
    }
  }

  //Todo
  const removeQueryParam = async (paramKeyToRemove: string) => {
    const queryParams = { ...router?.query }
    if (queryParams?.[paramKeyToRemove]) {
      delete queryParams?.[paramKeyToRemove]
      router?.push({
        pathname: router?.pathname,
        query: queryParams,
      })
    }
  }

  const handleEdit = () => {
    setExpandGuestRoomCount(false)
    setCartClearance(true)
  }

  const handleRedirection = async () => {
    const sebObject = {
      sebRedemption: "true",
      myTajREQID: router?.query?.reqid,
      employeeID: router?.query?.eid,
      sebEntitlement: router?.query?.enum,
      salutation: router?.query?.salutation,
      firstName: router?.query?.fname,
      lastName: router?.query?.lname,
      emailID: router?.query?.email,
      mobileNumber: router?.query?.mobile,
      employeeNumber: router?.query?.enum,
      discountRate: router?.query?.discount,
      discount: router?.query?.discount,
    }
    const URL = isSEB
      ? getSEBCrossBrandURL(
          selectedHotelData?.identifier,
          brandName,
          startDate,
          endDate,
          userLandingFrom?.offerRateCode || "NSEB",
          roomsCount?.length,
          roomsCount,
          sebObject,
          Boolean(router?.query?.overrideSessionDates),
          Boolean(router?.query?.isTajSats),
        )
      : getNonTajBrandCrossURL(
          brandName,
          selectedHotelData?.identifier,
          endDate,
          startDate,
          roomsCount,
          "",
          userLandingFrom?.offerPromoCode || userEnteredPromoCode?.promoCode,
          userLandingFrom?.offerRateCode,
          userEnteredPromoCode?.agentId,
          userEnteredPromoCode?.couponCode,
          selectedHotelData?.synxis_hotel_id,
        )
    await CrossSiteNavigation({
      url: URL,
      loggedIn: isCustomerLoggedIn,
      userStore,
      isSEB,
    })
  }

  const searchHandler = () => {
    const isHotelChanged = searchValue !== hotelName //? checking hotel change
    const isRoomsLengthChanged = guestDetails?.data?.length !== roomsCount?.length //?checking rooms change
    const isDatesChanged = //? checking dates change
      guestBookingSchedule?.userCheckInDate !== startDate || guestBookingSchedule?.userCheckOutDate !== endDate
    const isRoomsChanged = roomsCount?.some((userChangedRoom: any) => {
      //?checking guest details change
      const isGuestDetailsChanged = guestDetails?.data?.every(
        (globalRoom: any) =>
          globalRoom?.child !== userChangedRoom?.child || globalRoom?.adults !== userChangedRoom?.adults,
      )
      return isGuestDetailsChanged
    })
    if (isRoomsLengthChanged || isRoomsChanged || isDatesChanged || isHotelChanged || userEnteredPromoCode) {
      if (roomLength > 0) {
        handleEdit()
      } else {
        if (brandName?.toLowerCase() !== "taj" && selectedHotelData?.brand_name) {
          handleRedirection()
        } else {
          handleSearch()
        }
      }
    }
  }

  useEffect(() => {
    if (router?.query?.hotelId !== undefined) {
      setGeneratedHotelID(`${router?.query?.hotelId}` || undefined)
    }
  }, [router?.query?.hotelId])

  const handleSearch = async () => {
    clearOrderResponse()
    setExpandGuestRoomCount(false)
    setGlobalSearchedData(selectedHotelData)
    updateGuestDetails({
      data: roomsCount?.map((room: any, index: number) => (index === 0 ? { ...room, isSelected: true } : room)),
    })
    setGuestBookingSchedule(startDate, endDate)
    changeCurrentRoomId(roomsCount?.[0]?.id)
    setCheckAvailabilityPayload(
      roomsCount?.[0]?.child,
      roomsCount?.[0]?.adults,
      1,
      endDate,
      startDate,
      generatedHotelID,
      fetchRateFilter() || undefined,
      userTier || undefined,
      userLandingFrom?.isFromOffers,
      userLandingFrom?.offerRateCode,
      userLandingFrom?.offerPromoCode || userLandingFrom?.voucherPromoCode || userEnteredPromoCode?.promoCode,
      userEnteredPromoCode?.couponCode,
      userEnteredPromoCode?.agentId,
      userLandingFrom?.isFromVouchers,
    )
    clearCartResponse()
    setCartClearance(false)
    let localPathName: any = router?.query?.pid
    const { pid, ...params } = router?.query
    router.push({
      pathname: localPathName.join("/"),
      query: {
        ...params,
        hotelId: generatedHotelID,
        ...(userEnteredPromoCode?.title && { sc: userEnteredPromoCode.title }),
      },
    })
  }

  useEffect(() => {
    const details = isModify ? stepperDetails?.data : roomsCount
    const adults = details?.reduce((accumulator: number, currentValue: any) => {
      return accumulator + Number.parseInt(currentValue.adults)
    }, 0)
    const children = details?.reduce((accumulator: number, currentValue: any) => {
      return accumulator + Number.parseInt(currentValue.child)
    }, 0)
    setAdultCount(adults)
    setChildCount(children)
    setGuestCount(adults + children)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guestDetails, stepperDetails, roomsCount])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const leads: any = bookingFlowGlobalStore?.calendarViewData || []

  useEffect(() => {
    setDateKey((prev: number) => prev + 1)
  }, [leads])

  const handleView = ({ view, activeStartDate, action }: any) => {
    const startDate = activeStartDate
    const endDate = AddNumberOfDays(activeStartDate, 62)
    const hasDate = (date: any) => leads.some((obj: any) => obj?.arrivalDate == dateFormatConverter(date))
    const hasBothDates = hasDate(startDate) && hasDate(getPreviousDate(endDate))
    if (view === "month") {
      if (hasBothDates) {
        return null
      } else {
        getCalendarData(startDate, endDate, true)
      }
    }
  }

  const getCalendarData = (startDate: any, endDate: any, update: boolean) => {
    const urlParams = new URLSearchParams(global?.window?.location?.search)
    const calendarPayload = {
      hotelId: generatedHotelID || urlParams?.get("hotelId"),
      startDate: dateFormatConverter(startDate),
      endDate: dateFormatConverter(endDate),
      onlyCheckRequested: "true",
      rateFilter: fetchRateOnlyFilter(),
      lengthOfStay: lengthOfStay || 1,
      rateCode: userLandingFrom?.offerRateCode,
      promoCode:
        userLandingFrom?.offerPromoCode || userLandingFrom?.voucherPromoCode || userEnteredPromoCode?.promoCode,
      promoType:
        userLandingFrom?.offerPromoCode || userLandingFrom?.voucherPromoCode
          ? "promotion"
          : userEnteredPromoCode?.index == 1 || userEnteredPromoCode?.index == 3
          ? "Corporate"
          : userEnteredPromoCode?.index == 4
          ? "group"
          : userEnteredPromoCode?.promoCode
          ? "promotion"
          : null,
      agentId: userEnteredPromoCode?.agentId,
      agentType: userEnteredPromoCode?.agentId ? "IATA" : null,
    }
    update ? updateCalenderViewData(calendarPayload) : setCalenderViewData(calendarPayload)
  }

  useEffect(() => {
    if (generatedHotelID && !disableBookingMask) {
      clearCalenderViewData()
      getCalendarData(
        firstDateOfSelectedMonth(new Date(date?.[0])) || getTodayDate(),
        AddNumberOfDays(firstDateOfSelectedMonth(new Date(date?.[0])) || getTodayDate(), 62),
        false,
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    generatedHotelID,
    userTier,
    userEnteredPromoCode,
    userLandingFrom,
    guestBookingSchedule?.userCheckInDate,
    guestBookingSchedule?.userCheckOutDate,
  ])

  const handleModalClose = () => {
    setCartClearance(false)
    setIsTajLogoClicked(false)
    setIsMyAccountClicked(false)
    setPopupData(cartClearanceData)
  }
  const handleHotelBooking = () => {
    const presentDate = new Date()
    const checkInDate = new Date(startDate)
    const isHotelChanged = searchValue !== hotelName
    const searchedHotel = searchResults?.hotels?.data?.[0]
    triggerEvent({
      action: "selected_itinerary_modified",
      params: {
        ...dataLayer,
        buttonLinkName: CONSTANTS?.SEARCH,
        link_url: isHotelChanged ? selectedHotelData?.path : searchedHotel?.path,
        link_text: CONSTANTS?.SEARCH,
        eventType: "",
        eventName: "",
        eventPlace: "",
        eventTicketsQty: "",
        eventDate: "",
        offerName: "",
        offerCode: "",
        offerID: "",
        offerCategory: "",
        offerValidity: "",
        datesToBook: Math.ceil((checkInDate?.getTime() - presentDate?.getTime()) / 86400000),
        arrivalDate: startDate,
        departureDate: endDate,
        noOfAdults: adultCount,
        noOfChild: childCount,
        noOfRooms: roomsCount?.length,
        specialCode: userEnteredPromoCode?.title,
        brandName: isHotelChanged ? selectedHotelData?.brand_name : searchedHotel?.brand_name,
        country: isHotelChanged ? selectedHotelData?.hotel_country : searchedHotel?.hotel_country,
        city: isHotelChanged ? selectedHotelData?.city : searchedHotel?.city,
        hotelName: isHotelChanged ? selectedHotelData?.name : searchedHotel?.name,
        hotelCode: isHotelChanged ? selectedHotelData?.synxis_hotel_id : searchedHotel?.synxis_hotel_id,
        hotelType: isHotelChanged ? selectedHotelData?.hotel_type : searchedHotel?.hotel_type,
        hotelCountry: isHotelChanged ? selectedHotelData?.hotel_country : searchedHotel?.hotel_country,
        hotelCity: isHotelChanged ? selectedHotelData?.city : searchedHotel?.city,
        hotelState: isHotelChanged ? selectedHotelData?.hotel_state : searchedHotel?.hotel_state,
        hotelPinCode: isHotelChanged ? selectedHotelData?.hotel_pin_code : searchedHotel?.hotel_pin_code,
        hotelbrand: isHotelChanged ? selectedHotelData?.brand_name : searchedHotel?.brand_name,
        roomName: "",
        roomOffer: "",
        bunglowCode: "",
        clientId: getCookie("_ga")?.slice(6),
        pageTitle: isHotelChanged
          ? selectedHotelData?.path?.replaceAll("/", "").toUpperCase()
          : searchedHotel?.path?.replaceAll("/", "").toUpperCase(),
        pageURL:
          `${global?.window?.location?.origin}` + `${isHotelChanged ? selectedHotelData?.path : searchedHotel?.path}`,
        item_type: props?.[0]?._type,
        widget_type: props?.[0]?._type,
        pageSection: props?.[0]?.title,
        widget_title: props?.[0]?.title,
        pageHierarchy: JSON.parse(
          `["${TAJ_HOTELS}",` +
            `"${PAGE_LANG}",` +
            `"${isHotelChanged ? selectedHotelData?.brand_name : searchedHotel?.brand_name}",` +
            `"${
              isHotelChanged
                ? selectedHotelData?.path?.replaceAll("/", "").toUpperCase()
                : searchedHotel?.path?.replaceAll("/", "").toUpperCase()
            }"]`,
        ),
        location: isHotelChanged ? selectedHotelData?.city : searchedHotel?.city,
        outbound: false,
      },
    })
  }

  //? Using to update the search value whenever the hotel name updated and hotelId updated in URL
  useEffect(() => {
    setSearchValue(hotelName)
  }, [hotelName])

  //? Using to close the dropdowns on page scroll, if anyone is in openState
  useEffect(() => {
    const handleScroll = () => {
      if (expandGuestRoomCount || openSearch || openOffers || open) {
        setOpen(false)
        setOpenSearch(false)
        setOpenOffers(false)
        setExpandGuestRoomCount(false)
      }
    }
    if (open) {
      setExpandGuestRoomCount(false)
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [expandGuestRoomCount, openSearch, openOffers, open, isCouponCodeOpen])

  //?Written to close the cart clearance modal,Cart clearance model and Session timeout model
  useEffect(() => {
    if (cartClearance) {
      handleModalClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRemaining === 600, timeRemaining === 0])

  //?Using to clear the special code on browser button back click
  useEffect(() => {
    const handleRemoveSpecialCode = (event: any) => {
      if (event?.state) {
        setUserEnteredPromoCode({
          title: "",
          index: null,
          agentId: null,
          promoCode: null,
          couponCode: null,
        })
      }
    }
    if (userEnteredPromoCode?.title) {
      window?.addEventListener("popstate", handleRemoveSpecialCode)
      return () => {
        window?.removeEventListener("popstate", handleRemoveSpecialCode)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEnteredPromoCode?.title])

  //? Handling Cart Clearance modal on browser back button
  useEffect(() => {
    if ((global?.window?.location.pathname === ROUTES.BOOKING.CART || isHotelLevelBookingRoute) && roomsAddedInCart) {
      window.history.pushState(null, "", `${window.location.pathname}${window?.location?.search}`)
      window.addEventListener("popstate", () => {
        if (roomLength > 0) {
          updateSessionAlertModal(false)
          setCartClearance(true)
          setPopupData({
            ...cartClearanceData,
            title: cartClearanceData.backClickTitle,
          })
          setPressedBackButton(true)
        } else {
          setCartClearance(false)
        }
      })
      return () => {
        window.removeEventListener("popstate", () => setCartClearance(false))
      }
    }
    setCartClearance(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomsAddedInCart, bookingFlowPageStore?.currentStepper?.stepName])

  return (
    <>
      {loading && <Loader />}
      <AppBar
        color="inherit"
        sx={{
          zIndex: "8",
          boxShadow: "none",
          position: "sticky",
          display:
            isBookingConfirmationPage && !Boolean(confirmationResponse?.orderId || confirmationResponse?.data)
              ? "none"
              : "",
        }}>
        <FieldsContainer>
          <Grid container>
            <Grid item {...gridBreakPointsGenerator(isMobile, 1.49)}>
              <LogoBox onClick={() => handleLogoClick()}>
                <Box
                  loading="lazy"
                  component="img"
                  src={secondaryLogo?.asset?._ref && urlFor(secondaryLogo?.asset?._ref).url()}
                  sx={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </LogoBox>
            </Grid>
            <Grid item {...gridBreakPointsGenerator(isMobile, 9)}>
              <Stack
                flexDirection="row"
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "2em",
                }}>
                <BookingMainBox
                  sx={
                    disableBookingMask
                      ? {
                          opacity: "0.5",
                          pointerEvents: "none",
                          cursor: "not-allowed",
                          gap: DesktopPxToVw(20),
                        }
                      : {
                          gap: DesktopPxToVw(20),
                          paddingLeft: "0 !important",
                        }
                  }>
                  <Stack flexDirection={"column"} position={"relative"}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}>
                      <TextFieldBox
                        key={hotelName}
                        value={searchValue ?? hotelName}
                        variant="standard"
                        placeholder="Find a hotel"
                        onChange={(e: any) => handleHotelSearch(e)}
                        onFocus={() => setOpenSearch(true)}
                        onClick={() => setOpenSearch(true)}
                        sx={{
                          "& .Mui-disabled": {
                            "-webkit-text-fill-color": "#45443F !important",
                          },
                          minWidth: `${DesktopPxToVw(16)} !important`,
                          padding: `0 ${DesktopPxToVw(22)} !important`,
                        }}
                        inputProps={{
                          style: {
                            fontWeight: 300,
                            fontSize: "1.25vw",
                            fontFamily: "supreme",
                          },
                        }}
                        InputProps={{ disableUnderline: true }}
                      />
                      <StyledArrowBox $isDropDownOpened={openSearch} onClick={() => setOpenSearch(!openSearch)}>
                        <DropDownArrow
                          sx={{
                            height: DesktopPxToVw(7),
                            width: DesktopPxToVw(14),
                          }}
                        />
                      </StyledArrowBox>
                    </Box>
                    {openSearch && searchResults?.hotels?.data?.length > 0 && searchValue && (
                      <ClickAwayListener onClickAway={() => setOpenSearch(false)}>
                        <SearchMenuList key={searchValue}>
                          {searchResults?.hotels?.data?.length > 0 && (
                            <>
                              <Typography
                                variant="body-s"
                                color={theme.palette.ihclPalette.hexTwelve}
                                pb={DesktopPxToVw(20)}>
                                {CONSTANTS?.HOTELS}
                              </Typography>
                              <Divider sx={{ margin: `${DesktopPxToVw(8)} 0` }} />
                            </>
                          )}
                          {searchResults?.hotels?.data?.slice(0, 5)?.map((hotel: any, index: number) => (
                            <Stack
                              key={index}
                              sx={{
                                "&:hover": {
                                  background: "rgba(69, 68, 63, 0.1)",
                                },
                              }}>
                              <Typography
                                variant="body-l"
                                sx={{
                                  cursor: "pointer",
                                  padding: "0.5vw 0vw",
                                }}
                                onClick={() => handleHotelSelection(hotel)}>
                                {hotel?.name}
                              </Typography>
                            </Stack>
                          ))}
                        </SearchMenuList>
                      </ClickAwayListener>
                    )}
                  </Stack>
                  <StyledVerticalDivider orientation="vertical" flexItem />
                  <LocalizationProviderBox
                    sx={{
                      mr: "2vw",
                      width: `${DesktopPxToVw(315)} !important`,
                    }}>
                    {/* using react-date-picker */}
                    <Box position={"relative"} width={DesktopPxToVw(340)} key={refresh}>
                      <CustomDatePickerComponent
                        date={date}
                        isOpen={open}
                        sx={{
                          width: "100%",
                          margin: "0vw",
                        }}
                        onChange={handleDateSelection}
                        minDate={new Date()}
                        calendarWidth={DesktopPxToVw(1158)}
                        calendarIcon={null}
                        showDoubleView={true}
                        selectRange={true}
                        onCalendarClose={() => {
                          setRefresh(`${new Date().getTime()}`)
                          setOpen(false)
                        }}
                        allowPartialRange
                        onCalendarOpen={() => setOpen(true)}
                        onActiveStartDateChange={handleView}
                        tileContent={({ activeStartDate, date, view }: any) =>
                          view === "month" &&
                          !isCalendarLoading && (
                            <CustomDateTileComponent
                              leads={leads}
                              date={date}
                              key={dateKey}
                              lengthOfStay={lengthOfStay || 1}
                              isComplementary={isComplementary}
                            />
                          )
                        }
                        isCalendarLoading={isCalendarLoading && open}
                        tileDisabled={({ activeStartDate, date, view }: any) => {
                          const filteredDate =
                            leads && leads?.filter((item: any) => item?.arrivalDate == dateFormatConverter(date))?.[0]
                          return (
                            isCalendarLoading ||
                            (!filteredDate?.available &&
                              view === "month" &&
                              selectedType === "check_in" &&
                              !isCalendarLoading)
                          )
                        }}
                        renderComponent={
                          <Stack
                            alignItems={"center"}
                            flexDirection={"row"}
                            onClick={() => setOpen(!open)}
                            columnGap={DesktopPxToVw(16)}>
                            <Stack
                              alignItems={"center"}
                              flexDirection={"row"}
                              justifyContent={"center"}
                              columnGap={DesktopPxToVw(10)}>
                              <Typography
                                whiteSpace={"nowrap"}
                                color={date?.[0] ? "unset" : theme.palette.ihclPalette.hexTwelve}
                                onClick={() => setSelectedType("check_in")}
                                variant={"body-ml"}>
                                {date?.[0] ? formatDateWithMON(date?.[0]) : "Check in"}
                              </Typography>
                              <StyledDivider
                                sx={{
                                  width: `${DesktopPxToVw(30)} !important`,
                                  margin: "0vw",
                                }}
                              />
                              <Typography
                                whiteSpace={"nowrap"}
                                color={date?.[0] ? "unset" : theme.palette.ihclPalette.hexTwelve}
                                onClick={() => setSelectedType("check_out")}
                                variant={"body-ml"}>
                                {date?.[1] ? formatDateWithMON(dayjs(date?.[1])) : "Check out"}
                              </Typography>
                            </Stack>
                            <StyledArrowBox $isDropDownOpened={open}>
                              <DropDownArrow
                                sx={{
                                  height: DesktopPxToVw(7),
                                  width: DesktopPxToVw(14),
                                }}
                              />
                            </StyledArrowBox>
                          </Stack>
                        }
                      />
                    </Box>
                  </LocalizationProviderBox>
                  <StyledVerticalDivider orientation="vertical" flexItem />
                  <FlexBox
                    sx={{
                      whiteSpace: "nowrap",
                      width: DesktopPxToVw(260),
                      justifyContent: "space-between",
                    }}
                    onClick={() => setExpandGuestRoomCount(!expandGuestRoomCount)}>
                    <>
                      <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
                        <TypographyStyle variant="body-l">
                          {Pluralize(
                            CONSTANTS?.GUESTS.slice(0, 5),
                            confirmationResponse?.number_of_guests_ADULTS
                              ? JSON.parse(confirmationResponse?.number_of_guests_ADULTS) +
                                  JSON.parse(confirmationResponse?.number_of_guests_CHILDREN)
                              : guestCount,
                            false,
                          )}
                        </TypographyStyle>
                        <StyledHorizontalDivider sx={{ height: "1px" }} />
                        <TypographyStyle variant="body-l">
                          {Pluralize(
                            CONSTANTS?.ROOMS.slice(0, 4),
                            confirmationResponse?.number_of_rooms
                              ? confirmationResponse?.number_of_rooms
                              : isModify
                              ? stepperDetails?.data?.length
                              : roomsCount.length,
                            false,
                          )}
                        </TypographyStyle>
                      </Stack>
                      <StyledArrowBox $isDropDownOpened={expandGuestRoomCount}>
                        <DropDownArrow
                          sx={{
                            height: DesktopPxToVw(7),
                            width: DesktopPxToVw(14),
                          }}
                        />
                      </StyledArrowBox>
                      {expandGuestRoomCount && (
                        <GuestRoomComponent
                          top={"4.8vw"}
                          right={"18.8vw"}
                          roomsCount={roomsCount}
                          zIndex={"9999 !important"}
                          setGuestCount={setGuestCount}
                          setRoomsCount={setRoomsCount}
                          setExpandGuestRoomCount={setExpandGuestRoomCount}
                          isComplementary={isComplementary}
                          isSEB={isSEB}
                        />
                      )}
                    </>
                  </FlexBox>
                  <StyledVerticalDivider orientation="vertical" flexItem />
                  <FlexBox sx={{ position: "relative" }}>
                    <SpecialCodeWrapperTypography variant="body-ml" onClick={() => handleSpecialCode()}>
                      {specialCode}
                    </SpecialCodeWrapperTypography>
                    <StyledArrowBox
                      $isDropDownOpened={openOffers || isCouponCodeOpen}
                      onClick={() => {
                        setOpenOffers(!openOffers)
                      }}>
                      <DropDownArrow
                        sx={{
                          height: DesktopPxToVw(7),
                          width: DesktopPxToVw(14),
                        }}
                      />
                    </StyledArrowBox>
                    {(openOffers || isCouponCodeOpen) && (
                      <BookingFlowSpecialCodeComponent
                        openOffers={openOffers}
                        handleSpecialCode={handleSpecialCode}
                        currentRoomCount={currentRoomCount}
                        isGinger={isGinger}
                      />
                    )}
                  </FlexBox>
                </BookingMainBox>
                <BookingMainSearchButton
                  variant="light-contained"
                  disabled={disableBookingMask || searchValue?.length < 3}
                  onClick={() => {
                    const isExceeded = differenceInDays(date?.[0], date?.[1]) > 10
                    const isSebExceeded =
                      differenceInDays(date?.[1], date?.[0]) * roomsCount?.length > Number(router?.query?.sebbalance)
                    if (isSEB ? isSebExceeded : isExceeded) {
                      setLimitExceedModal(true)
                      setExpandGuestRoomCount(false)
                    } else {
                      searchHandler(),
                        handleHotelBooking(),
                        global?.window?.localStorage?.setItem("hotelJourneyPageType", "planYourStayPage")
                    }
                  }}>
                  {CONSTANTS?.SEARCH}
                </BookingMainSearchButton>
              </Stack>
            </Grid>
            <Grid item {...gridBreakPointsGenerator(isMobile, 1.49)}>
              {!isSEB && (
                <Stack justifyContent={"center"} alignItems={"center"} minHeight={"100%"}>
                  <ProfileBox
                    onClick={() => {
                      handleMyAccountClick()
                    }}>
                    {isCustomerLoggedIn && (
                      <Box
                        loading="lazy"
                        component="img"
                        alt="profile-icon"
                        src={Gold_Profile_icon}
                        sx={{ height: "1.67vw", width: "1.67vw" }}
                      />
                    )}
                    <AccountTypography variant="body-s">
                      {isCustomerLoggedIn ? CONSTANTS?.ACCOUNT : props?.[0]?.loginList?.[0]?.title}
                    </AccountTypography>
                  </ProfileBox>
                </Stack>
              )}
            </Grid>
          </Grid>
        </FieldsContainer>
        <BottomDivider />
        {cartClearance && (
          <BasicModal
            top={"30%"}
            left={"25vw"}
            width={"50vw"}
            open={cartClearance}
            handleClose={handleModalClose}
            webCloseIcon={ICONS?.CLOSE_WHITE_ICON}
            bgcolor={theme?.palette?.background?.paper}
            ModalCloseButtonStyles={{ right: "0vw", top: "-2vw" }}
            ModalCloseButtonColor={theme.palette.ihclPalette.hexOne}
            Component={
              <CartClearanceDialog
                {...popupData}
                handleClose={handleModalClose}
                handleEmptyCart={handleEmptyCart}
                isTajLogoClicked={isTajLogoClicked}
                isMyAccountClicked={isMyAccountClicked}
                pressedBackButton={pressedBackButton}
                setPressedBackButton={setPressedBackButton}
              />
            }
          />
        )}
      </AppBar>
      <BasicModal
        width={"100%"}
        height={"100%"}
        bgcolor={""}
        ModalCloseButtonStyles={{
          right: "25vw",
          marginBottom: "1.563vw",
        }}
        ModalCloseButtonColor={theme?.palette?.ihclPalette?.hexOne}
        webCloseIcon={ICONS?.CLOSE_WHITE_ICON}
        handleClose={handleModelClose}
        open={limitExceedModal}
        buttonStyles={{
          display: "none",
        }}
        Component={
          isSEB ? (
            <BookingSEBDateCardComponent handleClose={handleModelClose} />
          ) : (
            <BookingDateRangeLimitCardComponent handleClose={handleModelClose} handleCheckRates={handleSearch} />
          )
        }
      />
    </>
  )
}

export default observer(BookingFlowHeader)
