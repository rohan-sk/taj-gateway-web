import React, { useContext, useEffect, useRef, useState } from "react"
import dayjs from "dayjs"
import dynamic from "next/dynamic"
import { PathType } from "../../types"
import { useRouter } from "next/router"
import { observer } from "mobx-react-lite"
import { ROUTES } from "../../utils/routes"
import Pluralize from "../../utils/pluralize"
import { GLOBAL_STORES } from "../../utils/Constants"
import { useDebounce } from "../../utils/useDebounce"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import fetchRateFilter from "../../utils/fetchRateFilter"
import AddNumberOfDays from "../../utils/addDaysToGivenDate"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { CONSTANTS, GINGER_BRAND_NAME, ICONS } from "../constants"
import SearchStore from "../../features/search/store/search.store"
import { YellowBorderCheckbox } from "../hoc/yellow-border-checkbox"
import fetchRateOnlyFilter from "../../utils/fetchRateOnlyFilterForCalendar"
import { fetchHotelInformationwithHotelId } from "../../utils/fetchRoomData"
import { DestinationStore, GAStore, PropertyStore, UserStore } from "../../store"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import BookingFlowGlobalStore from "../../features/booking/store/globalStore/booking.flow.store"
import { CloseGoldIcon, CloseIcon, SearchIcon2, SelectedIcon, CalenderIconSvg } from "../../utils/customIcons"
import {
  dateFormatConverter,
  differenceInDays,
  firstDateOfSelectedMonth,
  formatDateWithMON,
  getDayAfterTomorrowDate,
  getNextDate,
  getPreviousDate,
  getTodayDate,
  getTomorrowDate,
} from "../../utils/getDate"
import {
  Box,
  Stack,
  Input,
  Divider,
  useTheme,
  Collapse,
  Accordion,
  Typography,
  ListItemText,
  ListItemButton,
  InputAdornment,
  ClickAwayListener,
} from "@mui/material"
import {
  AddButton,
  DividerStyle,
  StyledButton,
  ExpandLessIcon,
  ExpandMoreIcon,
  OfferTypography,
  FullDividerStyle,
  CustomAccordionDetails,
  CustomAccordionSummary,
  LocalizationProviderBoxStyle,
  HotelsContainer,
  BookingBoxes,
  BookingTypography,
} from "./styles/booking-menu"
import SpecialCodeData from "../header/promo-codes.json"
import { getCookie } from "../../utils/cookie"
import { triggerEvent } from "../../utils/analytics"
import { useLoggedIn } from "../../utils/hooks/useLoggedIn"
import { InputTextField } from "./styles/booking-flow-header"
import CircularProgress from "@mui/material/CircularProgress"
import getNonTajBrandCrossURL from "../../utils/getCrossBrandURL"
import { PAGE_LANG, TAJ_HOTELS } from "../../utils/analytics/constants"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
import { CrossSiteNavigation } from "../../utils/sso/cross-site-navigation"

//*Components
const BasicModal = dynamic(() => import("../hoc/modal/modal"))
const LoadingSpinner = dynamic(() => import("../../utils/SpinnerComponent"))
const GuestRoomComponent = dynamic(() => import("../banner/guestRooms/GuestRoomComponent"))
const CustomDateTileComponent = dynamic(() => import("../hoc/CustomDatePicker/custom-date-tile.component"))
const CustomDatePickerComponent = dynamic(() => import("../hoc/CustomDatePicker/custom-date-picker.component"))
const BookingDateRangeLimitCardComponent = dynamic(() => import("../card/booking-date-range-limit.card.component"))
const {
  PaddingBox,
  CenterPaddingBox,
  DefaultStyleBox,
  CenterPaddingColorBox,
  CenterFlexBox,
  FlexStartBox,
  AlignEndBox,
  MainBox,
  SpanBox,
  OfferBox,
  FlexBox,
  SearchResultBox,
} = BookingBoxes

const { ErrorTypography, DateTypography, TitleTypography } = BookingTypography
interface RoomCountItems {
  id: number
  room: string
  child: number
  adults: number
  isSelected: boolean
}

const BookingMenu = (props: any) => {
  const isMenuOpened = props?.showBookingMenu
  const theme = useTheme()
  const router = useRouter()
  const navigate = useAppNavigation()
  const isUserLoggedIn = useLoggedIn()
  const context: any = useContext(IHCLContext)
  const specialCodeInputRef: any = useRef(null)
  const urlParams = new URLSearchParams(global?.window?.location?.search)
  const userTier = global?.window?.localStorage?.getItem("userTier")
  const customerHash =
    global?.window?.localStorage?.getItem("customerHash") || global?.window?.localStorage?.getItem("guestCustomerHash")

  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const searchStore = context.getGlobalStore(GLOBAL_STORES.searchStore) as SearchStore
  const propertyStore = context?.getGlobalStore(GLOBAL_STORES?.propertyStore) as PropertyStore
  const destinationStore = context?.getGlobalStore(GLOBAL_STORES.destinationStore) as DestinationStore
  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore
  //** Search Store values
  const { searchResults, searchLoading } = searchStore

  //** Booking Flow Global Store values
  const {
    loading,
    cartDetails,
    guestDetails,
    calendarViewData,
    isCalendarLoading,
    roomsAvailability,
    guestBookingSchedule,
    userEnteredPromoCode,
    setLoading,
    emptyUserCart,
    getCartDetails,
    updateGuestDetails,
    setCalenderViewData,
    updateCalenderViewData,
    clearCalenderViewData,
    globalSearchedData,
    setGlobalSearchedData,
    setUserEnteredPromoCode,
    setGuestBookingSchedule,
    setCheckAvailabilityPayload,
  } = bookingFlowGlobalStore

  const paths = [ROUTES?.HOMEPAGE, ROUTES?.DESTINATIONS]
  //** useState values
  const initialData: any = paths?.includes(global?.window?.location?.pathname)
    ? {
        name: "",
        id: "",
        type: "",
      }
    : {
        name: propertyStore?.propertyData?.hotelName || destinationStore?.destinationData?.[0]?.name || "",
        id: propertyStore?.propertyData?.hotelName
          ? propertyStore?.propertyData?.hotelId || globalSearchedData?.id
          : "",
        type: propertyStore?.propertyData?.hotelName
          ? "Hotels"
          : destinationStore?.destinationData?.[0]?.name
          ? destinationStore?.destinationData?.[0]?.name
          : globalSearchedData?.hotel_type,
      }

  const [child, setChild] = useState<number>(0)
  const [adults, setAdults] = useState<number>(1)
  const [open, setOpen] = useState<boolean>(false)
  const [check, setCheck] = useState<boolean>(false)
  const [dateKey, setDateKey] = useState<number>(0)
  const [guestCount, setGuestCount] = useState<number>(1)
  const [userEnteredCode, setUserEnteredCode] = useState("")
  const [activeIndex, setActiveIndex] = useState<number>(-1)
  const [selectedHotel, setSelectedHotel] = useState<any>("")
  const [selectedData, setSelectedData] = useState<string>("")
  const [openSearch, setOpenSearch] = useState<boolean>(false)
  const [accordionOpen, setAccordionOpen] = useState<any>(false)
  const [openCalendar, setOpenCalendar] = useState<boolean>(false)
  const [refresh, setRefresh] = useState<any>(new Date().getTime())
  const [selectedType, setSelectedType] = useState<string>("check_in")
  const [searchValue, setSearchValue] = useState<any>(initialData?.name)
  const [limitExceedModal, setLimitExceedModal] = useState<boolean>(false)
  const [searchResultsResponseData, setResultsResponseData] = useState<any>([])
  const [expandGuestRoomCount, setExpandGuestRoomCount] = useState<boolean>(false)
  const [generatedHotelID, setGeneratedHotelID] = useState<string | undefined>(initialData?.id)
  const [AdultChildRoomLabel, setAdultChildRoomLabel] = useState<string>("2  Adults, 1  Child - 1  Room")
  const [roomsCount, setRoomsCount] = useState<any>(
    guestDetails?.data ? guestDetails?.data : [{ id: 1, adults: 1, child: 0, room: "ROOM", isSelected: false }],
  )
  const [selectedDestination, setSelectedDestination] = useState<any>({
    name: initialData?.name || "",
    hotel_type: initialData?.type || "",
    city: initialData?.name || "",
  })
  const [date, setDate] = useState<any>([
    new Date(guestBookingSchedule?.userCheckInDate ? guestBookingSchedule?.userCheckInDate : getTomorrowDate()),

    new Date(
      guestBookingSchedule?.userCheckOutDate ? guestBookingSchedule?.userCheckOutDate : getDayAfterTomorrowDate(),
    ),
  ])
  const isGinger = selectedHotel?.brand_name?.toLowerCase() === GINGER_BRAND_NAME?.toLowerCase()
  const endDate = dateFormatConverter(date?.[1])
  const startDate = dateFormatConverter(date?.[0])
  const debouncedSearchTerm = useDebounce(searchValue, 300)
  const getAddButtonState = () => {
    // for Coupon Code
    // if (activeIndex === SpecialCodeData?.promoCodes?.length - 1) {
    //   return !check || userEnteredCode?.length < 3 || roomsCount?.length > 1 || isGinger
    // } else
    if (activeIndex === 2) {
      // for Travel Agency Code
      return userEnteredCode?.length < 3 || isGinger
    } else {
      // for Other Codes
      return userEnteredCode?.length < 3
    }
  }
  const isSpecialCodeExist =
    userEnteredPromoCode?.promoCode || userEnteredPromoCode?.couponCode || userEnteredPromoCode?.agentId
  const isRoomsAvailableInCart = cartDetails?.cartDetailsResponse?.items?.[0]?.hotel?.[0]?.room?.length > 0

  const dataLayer = MemberDataLayer(userStore, gaStoreData)

  const handleClick = () => {
    setOpen(!open)
  }

  const handleClose = () => {
    setAccordionOpen(false)
  }

  const handleCode = (event: any) => {
    setUserEnteredCode(event.target.value)
  }

  const handleRemoveSpecialCode = () => {
    setUserEnteredPromoCode({
      title: "",
      index: null,
      agentId: null,
      promoCode: null,
      couponCode: null,
    }),
      // setAccordionOpen(!accordionOpen),
      setUserEnteredCode("")
  }

  const handleModelClose = () => setLimitExceedModal(false)
  const handlePromoCodeSelection = (index: number) => {
    if (isSpecialCodeExist && index !== 0) {
      setAccordionOpen(!accordionOpen)
    } else if (isSpecialCodeExist && index === 0) {
      setUserEnteredPromoCode({
        title: "",
        index: null,
        agentId: null,
        promoCode: null,
        couponCode: null,
      })
      setAccordionOpen(!accordionOpen)
    } else if (index !== 0) {
      setActiveIndex(index)
    } else {
      setAccordionOpen(!accordionOpen)
    }
  }

  const handleClearSearchData = () => {
    setSearchValue("")
    setSelectedData("")
    setOpenSearch(true)
    setSelectedHotel(null)
    setGeneratedHotelID("")
    clearCalenderViewData()
    setResultsResponseData([])
    setGlobalSearchedData(null)
    setSelectedDestination(null)
  }

  const handleDateSelection = (pickedDate: any) => {
    const checkInDate = new Date(date?.[0])
    if (selectedType === "check_in") {
      setDate([pickedDate?.[0], getNextDate(pickedDate?.[0])])
      setSelectedType("check_out")
      setOpenCalendar(true)
    } else if (
      `${checkInDate?.getDate()}${checkInDate?.getMonth()}${checkInDate?.getFullYear()}` ===
      `${pickedDate?.[0]?.getDate()}${pickedDate?.[0]?.getMonth()}${pickedDate?.[0]?.getFullYear()}`
    ) {
      const tomorrow = new Date(checkInDate)
      tomorrow.setDate(new Date(checkInDate).getDate() + 1)
      setDate([checkInDate, tomorrow])
    } else if (pickedDate?.[0] <= checkInDate) {
      setDate([pickedDate?.[0], checkInDate])
    } else {
      setDate([checkInDate, pickedDate?.[0]])
    }
  }

  useEffect(() => {
    const currentChildrenCount = roomsCount?.reduce((total: number, current: RoomCountItems) => {
      return total + current?.child
    }, 0)
    setChild(currentChildrenCount)

    const currentAdultsCount = roomsCount?.reduce((total: number, current: any) => {
      return total + current?.adults
    }, 0)
    setAdults(currentAdultsCount)
    updateGuestDetails({
      data: roomsCount,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomsCount])

  useEffect(() => {
    setAdultChildRoomLabel(() => {
      return `${Pluralize(CONSTANTS?.ADULTS.slice(0, 5), adults, false)}, ${child} ${
        child > 1 ? CONSTANTS?.CHILDREN : CONSTANTS?.CHILD
      } - 
      ${Pluralize(CONSTANTS?.ROOMS.slice(0, 4), roomsCount.length, false)}`
    })
  }, [adults, child, roomsCount])

  //** Written to set the search results
  useEffect(() => {
    setResultsResponseData([
      {
        hotelsData: searchResults?.hotels,
      },
    ])
  }, [searchResults])

  const handleSearch = (event: any) => {
    const { value } = event?.target
    setOpenSearch(true)
    setSearchValue(value)
    setGeneratedHotelID("")
    clearCalenderViewData()
    setSelectedDestination(null)
  }

  //** Invoking the autoCompleteSearch API
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        searchStore?.autoCompleteSearch(searchValue)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedSearchTerm],
  )

  //** Storing the guest checkIn and checkOut dates globally
  useEffect(() => {
    setGuestBookingSchedule(startDate, endDate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate])

  const handleCheckRates = async () => {
    customerHash && (await getCartDetails()) //? Using to get the User cart details.
    const brandName = selectedHotel?.brand_name
    setLoading(true)
    if (generatedHotelID) {
      if (brandName && brandName?.toLowerCase() !== "taj") {
        const URL = getNonTajBrandCrossURL(
          brandName,
          selectedHotel?.identifier,
          endDate,
          startDate,
          roomsCount,
          "",
          userEnteredPromoCode?.promoCode,
          "",
          userEnteredPromoCode?.agentId,
          userEnteredPromoCode?.couponCode,
          selectedHotel?.synxis_hotel_id,
        )
        await CrossSiteNavigation({
          url: URL,
          loggedIn: isUserLoggedIn,
          userStore,
        })
      } else {
        //? navigates to hotel booking page
        setGlobalSearchedData(selectedHotel)
        setCheckAvailabilityPayload(
          child,
          adults,
          roomsCount?.length,
          guestBookingSchedule?.userCheckOutDate,
          guestBookingSchedule?.userCheckInDate,
          generatedHotelID || selectedHotel?.id || globalSearchedData?.id,
          fetchRateFilter() || undefined,
          userTier || undefined,
          false,
          "",
          userEnteredPromoCode?.promoCode,
          userEnteredPromoCode?.couponCode,
          userEnteredPromoCode?.agentId,
        )
        if (isRoomsAvailableInCart) {
          await emptyUserCart()
        }
        router.push({
          pathname: `${ROUTES?.WITHOUTSEO_FOR_ROUTING?.BOOKING?.CART}`,
          query: {
            hotelId: generatedHotelID || globalSearchedData?.id || selectedHotel?.id,
            ...(userEnteredPromoCode?.title && { sc: userEnteredPromoCode.title }),
          },
        })
      }
    } else if (selectedDestination?.hotel_type) {
      setGlobalSearchedData(selectedDestination)
      //? navigates to destination page
      router.push({
        pathname: `/destination/hotels-in-${selectedDestination?.city?.toLowerCase()?.replaceAll(" ", "-")}`,
        query: { hotel_type: selectedDestination?.hotel_type },
      })
    }
    props?.setShowBookingMenu(false)
    setLoading(false)
  }

  useEffect(() => {
    setGeneratedHotelID(urlParams?.get("hotelId") || undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(
    () => {
      async function fetchHotelName() {
        let response = await fetchHotelInformationwithHotelId(
          urlParams?.get("hotelId") ||
            roomsAvailability?.availabilityResponse?.hotelId ||
            propertyStore?.propertyData?.hotelId,
        )
        if (ROUTES?.HOMEPAGE !== window?.location?.pathname) {
          setGeneratedHotelID(propertyStore?.propertyData?.hotelId)
        }
      }
      if (
        roomsAvailability?.availabilityResponse?.hotelId ||
        urlParams?.get("hotelId") ||
        propertyStore?.propertyData?.identifier
      ) {
        fetchHotelName()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      propertyStore?.propertyData?.hotelId,
      propertyStore?.propertyData?.identifier,
      roomsAvailability?.availabilityResponse?.hotelId,
    ],
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const leads: any = calendarViewData || []

  useEffect(() => {
    setDateKey((prev: number) => prev + 1)
  }, [leads])

  const getCalendarData = (startDate: any, endDate: any, update: boolean) => {
    const calendarPayload = {
      hotelId: propertyStore?.propertyData?.hotelId || generatedHotelID || urlParams?.get("hotelId"),
      startDate: dateFormatConverter(startDate),
      endDate: dateFormatConverter(endDate),
      onlyCheckRequested: "true",
      rateFilter: fetchRateOnlyFilter(),
      lengthOfStay: 1,
      rateCode: "",
      promoCode: userEnteredPromoCode?.promoCode,
      promoType:
        userEnteredPromoCode?.index == 1 || userEnteredPromoCode?.index == 3
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

  const setInitialCalendarData = () => {
    clearCalenderViewData()
    getCalendarData(
      firstDateOfSelectedMonth(new Date(date?.[0])) || getTodayDate(),
      AddNumberOfDays(firstDateOfSelectedMonth(new Date(date?.[0])) || getTodayDate(), 31),
      false,
    )
  }

  useEffect(() => {
    if (isMenuOpened) {
      if (
        propertyStore?.propertyData?.hotelId ||
        (generatedHotelID &&
          generatedHotelID?.toLocaleLowerCase() !== "null" &&
          generatedHotelID?.toLocaleLowerCase() !== "" &&
          generatedHotelID?.toLocaleLowerCase() !== null &&
          selectedHotel?.brand_name?.toLowerCase() === "taj")
      ) {
        setInitialCalendarData()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyStore?.propertyData?.hotelId, generatedHotelID, isMenuOpened])

  const handleView = ({ view, activeStartDate, action }: any) => {
    const startDate = activeStartDate
    const endDate = AddNumberOfDays(activeStartDate, 31)
    const hasDate = (date: any) => leads.some((obj: any) => obj?.arrivalDate == dateFormatConverter(date))
    const hasBothDates = hasDate(startDate) && hasDate(getPreviousDate(endDate))
    if (
      view === "month" &&
      generatedHotelID &&
      generatedHotelID?.toLocaleLowerCase() !== "null" &&
      generatedHotelID?.toLocaleLowerCase() !== null &&
      selectedHotel?.brand_name?.toLowerCase() === "taj"
    ) {
      if (hasBothDates) {
        return null
      } else {
        getCalendarData(startDate, endDate, true)
      }
    }
  }

  const handleScroll = () => {
    if (specialCodeInputRef?.current) {
      specialCodeInputRef?.current?.scrollIntoView({
        block: "nearest",
        inline: "nearest",
        behavior: "smooth",
      })
    }
  }
  const searchHotelData = searchResultsResponseData?.[0]?.hotelsData?.data?.[0]
  const handleHotelBooking = () => {
    const presentDate = new Date()
    const checkInDate = new Date(startDate)
    triggerEvent({
      action: "hotelSelected",
      params: {
        ...dataLayer,
        buttonLinkName: CONSTANTS?.CHECK_RATES,
        link_url: searchHotelData?.path,
        link_text: CONSTANTS?.CHECK_RATES,
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
        datesToBook: Math.ceil((checkInDate.getTime() - presentDate.getTime()) / 86400000),
        arrivalDate: startDate,
        departureDate: endDate,
        noOfAdults: adults,
        noOfChild: child,
        noOfRooms: roomsCount?.length,
        specialCode: userEnteredPromoCode?.title,
        brandName: searchHotelData?.brand_name ? searchHotelData?.brand_name : "",
        country: searchHotelData?.hotel_country ? searchHotelData?.hotel_country : "",
        city: searchHotelData?.city ? searchHotelData?.city : "",
        hotelName: searchHotelData?.name,
        hotelCode: searchHotelData?.synxis_hotel_id ? searchHotelData?.synxis_hotel_id : "",
        hotelType: searchHotelData?.hotel_type ? searchHotelData?.hotel_type : "",
        hotelCountry: searchHotelData?.hotel_country ? searchHotelData?.hotel_country : "",
        hotelCity: searchHotelData?.city ? searchHotelData?.city : "",
        hotelState: searchHotelData?.hotel_state ? searchHotelData?.hotel_state : "",
        hotelPinCode: searchHotelData?.hotel_pin_code ? searchHotelData?.hotel_pin_code : "",
        hotelbrand: searchHotelData?.brand_name ? searchHotelData?.brand_name : "",
        roomName: "",
        roomOffer: "",
        bunglowCode: "",
        clientId: getCookie("_ga")?.slice(6),
        pageTitle: searchHotelData?.path?.replaceAll("/", "").toUpperCase(),
        pageURL: `${global?.window?.location.origin}` + `${searchHotelData?.path}`,
        item_type: props?.headerData[0]?._type,
        widget_type: props?.headerData[0]?._type,
        pageSection: props?.headerData[0]?.title,
        widget_title: props?.headerData[0]?.title,
        pageHierarchy: JSON.parse(
          `["${TAJ_HOTELS}",` +
            `"${PAGE_LANG}",` +
            `"${searchHotelData?.brand_name || ""}",` +
            `"${searchHotelData?.path?.replaceAll("/", "").toUpperCase()}"]`,
        ),
        location: searchHotelData?.city ? searchHotelData?.city : "",
        outbound: false,
      },
    })
  }

  return (
    <>
      {loading && <LoadingSpinner />}
      <MainBox aria-label={"BookingMenu"}>
        <PaddingBox>
          <Input
            value={searchValue}
            placeholder={CONSTANTS?.BOOKING_SEARCH_PLACEHOLDER}
            sx={{
              fontSize: "1.250vw",
              fontWeight: 300,
              input: {
                fontSize: DesktopPxToVw(24),
                "&::placeholder": {
                  fontWeight: 300,
                  opacity: 1,
                },
              },
              width: "100%",
              "&.Mui-disabled": {
                "&:before": {
                  borderBottomStyle: "solid !important",
                },
              },
            }}
            onChange={(e: any) => handleSearch(e)}
            onKeyPress={(e: any) => handleSearch(e)}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon2
                  sx={{
                    width: "1.250vw",
                    height: "1.302vw",
                    marginRight: "0.502vw",
                  }}
                />
              </InputAdornment>
            }
            endAdornment={
              dateKey && (selectedData || searchValue) ? (
                <InputAdornment position="end" onClick={handleClearSearchData}>
                  {searchLoading ? (
                    <CircularProgress sx={{ width: "1.5vw !important", height: "1.5vw !important" }} />
                  ) : (
                    <CloseIcon sx={{ cursor: "pointer", width: "1.2vw", height: "1vw" }} />
                  )}
                </InputAdornment>
              ) : (
                <></>
              )
            }
          />
          {openSearch && searchResultsResponseData?.[0]?.hotelsData && (
            <SearchResultBox key={searchValue}>
              {searchResultsResponseData?.[0]?.hotelsData?.destinations?.length > 0 && (
                <>
                  <Typography sx={{ opacity: "0.8" }} variant="body-xxs">
                    {CONSTANTS?.DESTINATIONS}
                  </Typography>
                  <Divider sx={{ paddingTop: `${DesktopPxToVw(10)} !important` }} />
                </>
              )}
              {searchResultsResponseData?.[0]?.hotelsData?.destinations
                ?.slice(0, 2)
                ?.map((destination: any, index: number) => (
                  <Stack
                    key={index}
                    sx={{
                      "&:hover": {
                        background: "rgba(69, 68, 63, 0.1)",
                      },
                    }}>
                    <Typography
                      variant="body-s"
                      sx={{ cursor: "pointer", padding: "0.5vw 0vw" }}
                      onClick={() => {
                        setOpenSearch(false)
                        setSelectedHotel(null)
                        setGeneratedHotelID("")
                        setSearchValue(destination?.name)
                        setSelectedData(destination?.name)
                        setSelectedDestination(destination)
                      }}>
                      {destination?.name}
                    </Typography>
                  </Stack>
                ))}
              {searchResultsResponseData?.[0]?.hotelsData?.data?.length > 0 && (
                <>
                  <Typography sx={{ opacity: "0.8" }} variant="body-xxs">
                    {CONSTANTS?.HOTELS}
                  </Typography>
                  <Divider sx={{ paddingTop: `${DesktopPxToVw(10)} !important` }} />
                </>
              )}
              {searchResultsResponseData?.[0]?.hotelsData?.data?.length > 0 && (
                <HotelsContainer>
                  {searchResultsResponseData?.[0]?.hotelsData?.data?.map((hotel: any, index: number) => (
                    <Stack
                      key={index}
                      sx={{
                        "&:hover": {
                          background: "rgba(69, 68, 63, 0.1)",
                        },
                      }}>
                      <Typography
                        variant="body-s"
                        sx={{ cursor: "pointer", padding: "0.5vw 0vw" }}
                        onClick={() => {
                          setOpenSearch(false)
                          setSelectedHotel(hotel)
                          setSearchValue(hotel?.name)
                          setSelectedData(hotel?.name)
                          setGeneratedHotelID(hotel?.id)
                          setSelectedDestination(null)
                          if (hotel?.brand_name?.toLowerCase() === GINGER_BRAND_NAME?.toLowerCase()) {
                            setUserEnteredPromoCode({
                              title: "",
                              index: null,
                              agentId: null,
                              promoCode: null,
                              couponCode: null,
                            })
                          }
                        }}>
                        {hotel?.name}
                      </Typography>
                    </Stack>
                  ))}
                </HotelsContainer>
              )}
            </SearchResultBox>
          )}
          <CenterPaddingBox>
            <LocalizationProviderBoxStyle>
              <Box key={refresh}>
                <CustomDatePickerComponent
                  date={date}
                  isOpen={openCalendar}
                  onChange={handleDateSelection}
                  minDate={new Date()}
                  calendarWidth={DesktopPxToVw(533)}
                  onCalendarClose={() => {
                    setRefresh(`${new Date().getTime()}`)
                    setOpenCalendar(false)
                  }}
                  calendarIcon={null}
                  selectRange={true}
                  allowPartialRange
                  onActiveStartDateChange={handleView}
                  tileContent={({ activeStartDate, date, view }: any) =>
                    view === "month" &&
                    !isCalendarLoading &&
                    generatedHotelID &&
                    selectedHotel?.brand_name?.toLowerCase() === "taj" && (
                      <CustomDateTileComponent leads={leads} date={date} key={dateKey} />
                    )
                  }
                  isCalendarLoading={isCalendarLoading && openCalendar}
                  tileDisabled={({ activeStartDate, date, view }: any) => {
                    const filteredDate =
                      leads && leads?.filter((item: any) => item?.arrivalDate == dateFormatConverter(date))?.[0]
                    return (
                      isCalendarLoading ||
                      (!filteredDate?.available &&
                        selectedHotel?.brand_name?.toLowerCase() === "taj" &&
                        view === "month" &&
                        !isCalendarLoading &&
                        selectedType === "check_in" &&
                        generatedHotelID)
                    )
                  }}
                  focusSelectedMonth={true}
                  renderComponent={
                    <Stack
                      alignItems={"center"}
                      flexDirection={"row"}
                      onClick={() => {
                        setOpenCalendar(!openCalendar)
                        setOpen(false)
                      }}
                      columnGap={DesktopPxToVw(20)}>
                      <CalenderIconSvg sx={{ width: "1.250vw", height: "1.302vw" }} />
                      <DateTypography onClick={() => setSelectedType("check_in")} variant={"body-l"}>
                        {date?.[0] ? formatDateWithMON(date?.[0]) : "Check in"}
                      </DateTypography>
                      <DividerStyle />
                      <DateTypography onClick={() => setSelectedType("check_out")} variant={"body-l"}>
                        {date?.[1] ? formatDateWithMON(date?.[1]) : "Check out"}
                      </DateTypography>
                    </Stack>
                  }
                />
              </Box>
            </LocalizationProviderBoxStyle>
          </CenterPaddingBox>
          <FullDividerStyle />
          <ListItemButton onClick={handleClick} sx={{ padding: "0.89vw 0vw 0vw 0vw" }}>
            <Box
              loading="lazy"
              component="img"
              src={ICONS?.GUEST_COUNT_ICON}
              height={DesktopPxToVw(20)}
              width={DesktopPxToVw(25)}
            />
            <ListItemText
              primary={AdultChildRoomLabel}
              sx={{
                paddingLeft: "1.094vw",
                "& .MuiTypography-root": {
                  fontWeight: 300,
                  fontSize: "1.237vw",
                  color: theme?.palette?.ihclPalette?.hexSeventeen,
                },
              }}
            />
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
          <FullDividerStyle />
          <Collapse
            in={open}
            sx={{
              maxHeight: "16vw !important",
              overflowY: "auto",
              "::-webkit-scrollbar": { display: "none" },
            }}>
            <DefaultStyleBox>
              <GuestRoomComponent
                roomsCount={roomsCount}
                setRoomsCount={setRoomsCount}
                setGuestCount={setGuestCount}
                shouldScrollOnAddingRoom={true}
                setExpandGuestRoomCount={setExpandGuestRoomCount}
              />
            </DefaultStyleBox>
          </Collapse>
        </PaddingBox>
        <CenterPaddingColorBox>
          <ClickAwayListener onClickAway={handleClose}>
            <Box sx={{ width: "50%" }}>
              <Accordion sx={{ boxShadow: "none" }} expanded={accordionOpen}>
                <CustomAccordionSummary
                  expandIcon={<ExpandMoreIcon style={{ fontSize: "20px" }} />}
                  onClick={() => {
                    setAccordionOpen(!accordionOpen)
                    setOpen(false)
                    if (global?.window !== undefined) {
                      document.body.style.overflow = accordionOpen ? "auto" : "hidden"
                    }
                  }}>
                  <CenterFlexBox>
                    <Typography
                      variant="body-ml"
                      sx={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        WebkitBoxOrient: "vertical",
                        maxWidth: DesktopPxToVw(200),
                      }}>
                      {isSpecialCodeExist
                        ? userEnteredPromoCode?.title
                          ? userEnteredPromoCode?.title
                          : CONSTANTS?.SPECIAL_CODE
                        : CONSTANTS?.SPECIAL_CODE}
                    </Typography>
                  </CenterFlexBox>
                </CustomAccordionSummary>
                <CustomAccordionDetails>
                  {SpecialCodeData?.promoCodes?.map((code: any, index: number) => (
                    <Box key={index}>
                      <FlexStartBox
                        onClick={() => {
                          handlePromoCodeSelection(index)
                          index != activeIndex && setUserEnteredCode("")
                          index != activeIndex && setCheck(false)
                          setTimeout(() => {
                            handleScroll(), 0
                          })
                        }}>
                        <SelectedIcon
                          sx={{
                            height: "1vw",
                            width: "1.3vw",
                            paddingRight: "0.520vw",
                            visibility:
                              (index == userEnteredPromoCode?.index || (index == 0 && !userEnteredPromoCode?.index)) &&
                              accordionOpen
                                ? "visible"
                                : "hidden",
                          }}
                        />
                        <TitleTypography>{code.title}</TitleTypography>
                      </FlexStartBox>
                      {((isSpecialCodeExist && index == userEnteredPromoCode?.index) ||
                        (index === activeIndex && index !== 0)) && (
                        <Box ref={specialCodeInputRef}>
                          {isSpecialCodeExist && index == userEnteredPromoCode?.index ? (
                            <OfferBox>
                              <OfferTypography variant="body-ml">{isSpecialCodeExist}</OfferTypography>
                              <CloseGoldIcon
                                sx={{
                                  width: "0.8vw",
                                  height: "0.8vw",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleRemoveSpecialCode()}
                              />
                            </OfferBox>
                          ) : (
                            <Stack flexDirection={"column"}>
                              <AlignEndBox component="form">
                                <InputTextField
                                  placeholder="Enter code"
                                  variant="standard"
                                  value={userEnteredCode}
                                  onChange={(e: any) => handleCode(e)}
                                  sx={{
                                    "& .MuiInputBase-root.MuiInput-root::before, & .MuiInputBase-root.MuiInput-root::after":
                                      {
                                        border: "none",
                                        transition: {
                                          border: "none",
                                        },
                                      },
                                  }}
                                />
                                <AddButton
                                  disabled={getAddButtonState()}
                                  onClick={() => {
                                    setUserEnteredPromoCode({
                                      index: index,
                                      title: code?.title,
                                      agentId: code?.agentId === "undefined" ? userEnteredCode : null,
                                      promoCode: code?.promoCode === "undefined" ? userEnteredCode : null,
                                      couponCode: code?.couponCode === "undefined" ? userEnteredCode : null,
                                    }),
                                      setAccordionOpen(!accordionOpen),
                                      setUserEnteredCode("")
                                  }}>
                                  {CONSTANTS?.ADD}
                                </AddButton>
                              </AlignEndBox>
                              {activeIndex == 6 && (
                                <ErrorTypography textAlign={"center"}>
                                  {isGinger
                                    ? CONSTANTS?.COUPON_CODE_ERROR_MESSAGE
                                    : roomsCount?.length > 1
                                    ? CONSTANTS?.COUPON_CODE_WARNING
                                    : ""}
                                </ErrorTypography>
                              )}
                              {activeIndex == 2 && isGinger && (
                                <ErrorTypography textAlign={"center"}>
                                  {CONSTANTS?.TRAVEL_AGENCY_ERROR_MESSAGE}
                                </ErrorTypography>
                              )}
                            </Stack>
                          )}
                          {/* {index === 6 && (
                            <FlexBox
                              sx={{
                                gap: "0.521vw",
                                justifyContent: "center",
                              }}>
                              <YellowBorderCheckbox
                                onChange={() => setCheck(!check)}
                                checked={check || !!isSpecialCodeExist}
                              />
                              <Typography variant="body-xs" sx={{ margin: "1.250vw 0vw" }}>
                                {CONSTANTS?.CHECK_BOX_LABEL}
                                <SpanBox
                                  component={"span"}
                                  onClick={() => {
                                    navigate(ROUTES?.CC_TERMS_AND_CONDITIONS, PathType.external)
                                  }}>
                                  {CONSTANTS?.TERMS_AND_CONDITIONS}
                                </SpanBox>
                              </Typography>
                            </FlexBox>
                          )} */}
                        </Box>
                      )}
                      <Divider />
                    </Box>
                  ))}
                </CustomAccordionDetails>
              </Accordion>
            </Box>
          </ClickAwayListener>
          <Divider />
          <StyledButton
            variant="light-contained"
            disabled={generatedHotelID ? !generatedHotelID : !selectedDestination?.hotel_type}
            onClick={() => {
              const isExceeded = differenceInDays(date?.[0], date?.[1]) > 10 ? true : false
              if (isExceeded) {
                setLimitExceedModal(() => true)
              } else {
                handleCheckRates()
                handleHotelBooking()
                global?.window?.localStorage?.setItem("hotelJourneyPageType", "book_a_stay")
              }
            }}>
            {CONSTANTS?.CHECK_RATES}
          </StyledButton>
        </CenterPaddingColorBox>
      </MainBox>
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
        open={limitExceedModal}
        handleClose={handleModelClose}
        Component={
          <BookingDateRangeLimitCardComponent handleClose={handleModelClose} handleCheckRates={handleCheckRates} />
        }
      />
    </>
  )
}

export default observer(BookingMenu)
