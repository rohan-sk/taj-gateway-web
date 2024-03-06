import React, { useContext, useEffect, useState, useRef } from "react"
import dayjs from "dayjs"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { observer } from "mobx-react-lite"
import { theme } from "../../../lib/theme"
import { ROUTES } from "../../../utils/routes"
import Pluralize from "../../../utils/pluralize"
import CheckIcon from "@mui/icons-material/Check"
import { useDebounce } from "../../../utils/useDebounce"
import SearchStore from "../../search/store/search.store"
import { GLOBAL_STORES } from "../../../utils/Constants"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import fetchRateFilter from "../../../utils/fetchRateFilter"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import { CloseSharp, ExpandLess, ExpandMore } from "@mui/icons-material"
import BookingFlowGlobalStore from "../store/globalStore/booking.flow.store"
import { fetchHotelInformationwithHotelId } from "../../../utils/fetchRoomData"
import { CalenderIcon, CloseIcon, SearchIcon } from "../../../utils/customIcons"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { CONSTANTS, GINGER_BRAND_NAME, ICONS, externalNavigation } from "../../../components/constants"
import {
  getTodayDate,
  getTomorrowDate,
  formatDateWithMON,
  differenceInDays,
  dateFormatConverter,
  getDayAfterTomorrowDate,
  firstDateOfSelectedMonth,
  getPreviousDate,
  addDaysToDate,
} from "../../../utils/getDate"
import {
  Box,
  Input,
  Stack,
  Typography,
  InputAdornment,
  ListItemButton,
  AccordionDetails,
  ClickAwayListener,
  Divider,
  IconButton,
  CircularProgress,
} from "@mui/material"
import {
  FlexBox,
  MainBox,
  AddButton,
  DateDivider,
  DateMainBox,
  CheckIconBox,
  DateInnerBox,
  DateTextField,
  StyledListItem,
  StyledAccordion,
  TermsTypography,
  StyledFormGroup,
  SelectedCodeBox,
  CheckRatesButton,
  AccordionMainBox,
  DateBottomDivider,
  PromoCodeTextField,
  ColumnDirectionBox,
  TermsLinkTypography,
  StyledAccordionSummary,
  SpecialCodeDataWrapper,
  SpecialCodeDropDownDivider,
  SearchedOptions,
  CategoryText,
} from "./styles/msite-booking-mask"
import SpecialCodeData from "../../../components/header/promo-codes.json"
import { LocalizationProviderBox } from "../../../components/banner/styles"
import { DestinationStore, PropertyStore, UserStore } from "../../../store"
import { useMobileCheck } from "../../../utils/isMobilView"
import { useLoggedIn } from "../../../utils/hooks/useLoggedIn"
import { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import AddNumberOfDays from "../../../utils/addDaysToGivenDate"
import { StyledDivider } from "./styles/BookingConfirmedRoomDetails"
import getNonTajBrandCrossURL from "../../../utils/getCrossBrandURL"
import fetchRateOnlyFilter from "../../../utils/fetchRateOnlyFilterForCalendar"
import { CrossSiteNavigation } from "../../../utils/sso/cross-site-navigation"
import { ErrorTypography, HotelsContainer } from "../../../components/header/styles/booking-menu"
import getSEBCrossBrandURL from "../../../utils/getSEBCrossBrandURL"

const BasicModal = dynamic(() => import("../../../components/hoc/modal/modal"))
const GuestRoomComponent = dynamic(() => import("../../../components/banner/guestRooms/GuestRoomComponent"))
const BookingDateRangeLimitCardComponent = dynamic(
  () => import("../../../components/card/booking-date-range-limit.card.component"),
)
const CustomDateTileComponent = dynamic(
  () => import("../../../components/hoc/CustomDatePicker/custom-date-tile.component"),
)
const CustomDatePickerComponent = dynamic(
  () => import("../../../components/hoc/CustomDatePicker/custom-date-picker.component"),
)
const YellowBorderCheckbox = dynamic(() =>
  import("../../../components/hoc/yellow-border-checkbox").then((module) => module.YellowBorderCheckbox),
)
interface BookingMaskForMsiteProps {
  setOpenGuestDetailsModal: SetOpenGuestDetailsModal
  isDestinationBookingMask: boolean
}
type SetOpenGuestDetailsModal = (value: boolean) => void

const BookingMaskForMsite = ({
  setOpenGuestDetailsModal,
  isDestinationBookingMask = false,
}: BookingMaskForMsiteProps) => {
  const router = useRouter()
  const isLogin = useLoggedIn()
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const context: any = useContext(IHCLContext)
  const accordionContentRef: any = useRef(null)
  const urlParams = new URLSearchParams(global?.window?.location?.search)

  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const searchStore = context.getGlobalStore(GLOBAL_STORES.searchStore) as SearchStore
  const propertyStore = context?.getGlobalStore(GLOBAL_STORES?.propertyStore) as PropertyStore
  const destinationStore = context?.getGlobalStore(GLOBAL_STORES.destinationStore) as DestinationStore
  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore

  const {
    guestDetails,
    calendarViewData,
    roomsAvailability,
    updateGuestDetails,
    guestBookingSchedule,
    userEnteredPromoCode,
    clearAddToCartPayload,
    setGuestBookingSchedule,
    setUserEnteredPromoCode,
    setCheckAvailabilityPayload,
    setCalenderViewData,
    updateCalenderViewData,
    isCalendarLoading,
    clearCalenderViewData,
    filteredHotelData,
    globalSearchedData,
    setDestinationAvailability,
  } = bookingFlowGlobalStore

  const { searchLoading, searchResults } = searchStore
  const isSEB = Boolean(router?.query?.sebbalance)
  const initialValue =
    ROUTES?.HOMEPAGE !== window?.location?.pathname
      ? propertyStore?.propertyData?.hotelName ||
        destinationStore?.destinationData?.[0]?.city ||
        globalSearchedData?.city
      : ""

  const filteredIDs = filteredHotelData?.map((hotel: any) => hotel?.hotelId)
  const hotelIds = filteredIDs?.filter((item: any) => item)

  const [activeStartDate, setActiveStartDate] = useState<any>(
    new Date(guestBookingSchedule?.userCheckInDate ? guestBookingSchedule?.userCheckInDate : getTomorrowDate() || ""),
  )
  const [open, setOpen] = useState<boolean>(false)
  const [dateKey, setDateKey] = useState<number>(0)
  const [checked, setChecked] = useState<boolean>(false)
  const [guestCount, setGuestCount] = useState<number>(1)
  const [adultCount, setAdultCount] = useState<number>(1)
  const [childCount, setChildCount] = useState<number>(0)
  const [openSearch, setOpenSearch] = useState<any>(false)
  const [selectedType, setSelectedType] = useState("hotel")
  const [activeIndex, setActiveIndex] = useState<number>(-1)
  const [selectedHotel, setSelectedHotel] = useState<any>("")
  const [selectedData, setSelectedData] = useState<string>("")
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [refresh, setRefresh] = useState<any>(new Date().getTime())
  const [userEnteredCode, setUserEnteredCode] = useState<string>("")
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false)
  const [selectedDestination, setSelectedDestination] = useState<any>("")
  const [showSelectedCode, setShowSelectedCode] = useState<boolean>(false)
  const [limitExceedModal, setLimitExceedModal] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>(initialValue || "")
  const [searchResultsResponseData, setResultsResponseData] = useState<any>([])
  const [expandGuestRoomCount, setExpandGuestRoomCount] = useState<boolean>(false)
  const [generatedHotelID, setGeneratedHotelID] = useState<string | undefined>("")
  const [disableCheckRatesButton, setDisableCheckRatesButton] = useState<boolean>(false)
  const [selectedDateType, setSelectedDateType] = useState<string>("check_in")
  const isHotel = selectedType === "hotel"
  const isSpecialCodeExist =
    userEnteredPromoCode?.promoCode || userEnteredPromoCode?.couponCode || userEnteredPromoCode?.agentId
  const userTier = global?.window?.localStorage?.getItem("userTier")
  const isGinger = selectedHotel?.brand_name?.toLowerCase() === GINGER_BRAND_NAME?.toLowerCase()
  const handleModelClose = () => setLimitExceedModal(false)
  const isComplementary = router?.query?.isComplementaryVoucher || activeIndex == 6
  const lengthOfStay = Number(router?.query?.minLOS as string) || 1

  useEffect(() => {
    setGeneratedHotelID(urlParams?.get("hotelId") || undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    async function fetchHotelName() {
      let response = await fetchHotelInformationwithHotelId(
        urlParams?.get("hotelId") ||
          propertyStore?.propertyData?.hotelId ||
          roomsAvailability?.availabilityResponse?.hotelId,
      )
      if (response) {
        setSelectedHotel({
          id: response?.hotelId,
          name: response?.hotelName,
          brand_name: response?.brandName,
        })
      }
      if (ROUTES?.HOMEPAGE !== window?.location?.pathname) {
        setSearchValue(response?.hotelName)
        setGeneratedHotelID(response?.hotelId)
      } else {
        setSearchValue("")
      }
    }
    if (
      roomsAvailability?.availabilityResponse?.hotelId ||
      urlParams?.get("hotelId") ||
      propertyStore?.propertyData?.hotelId
    ) {
      fetchHotelName()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomsAvailability?.availabilityResponse?.hotelId])
  const [date, setDate] = useState<any>([
    guestBookingSchedule?.userCheckInDate ? guestBookingSchedule?.userCheckInDate : dayjs(getTomorrowDate()),
    guestBookingSchedule?.userCheckOutDate
      ? new Date(guestBookingSchedule?.userCheckOutDate)
      : lengthOfStay
      ? addDaysToDate(dayjs(getTomorrowDate()), lengthOfStay ? lengthOfStay : 1)
      : getDayAfterTomorrowDate(),
  ])
  const [roomsCount, setRoomsCount] = useState(
    guestDetails?.data ? guestDetails?.data : [{ id: 1, adults: 1, child: 0, room: "ROOM", isSelected: false }],
  )

  const selectedGuestDetails = `${Pluralize(CONSTANTS?.ADULTS.slice(0, 5), adultCount, false)}, ${childCount} ${
    childCount > 1 ? CONSTANTS?.CHILDREN : CONSTANTS?.CHILD
  } - 
  ${Pluralize(CONSTANTS?.ROOMS.slice(0, 4), roomsCount.length, false)}`

  const endDate = date?.[1]
  const startDate = date?.[0]
  const debouncedSearchTerm = useDebounce(searchValue, 300)

  const getAddButtonState = () => {
    // for Coupon Code
    // if (selectedIndex === SpecialCodeData?.promoCodes?.length - 1) {
    //   return !checked || userEnteredCode?.length < 3 || roomsCount?.length > 1 || isGinger
    // } else
    if (selectedIndex === 2) {
      // for Travel Agency Code
      return userEnteredCode?.length < 3 || isGinger
    } else {
      // for Other Codes
      return userEnteredCode?.length < 3
    }
  }

  const handleRemoveSpecialCode = () => {
    setUserEnteredPromoCode({
      title: "",
      agentId: null,
      promoCode: null,
      couponCode: null,
      index: null,
      rateCode: null,
    })
    setChecked(false)
    setSelectedIndex(0)
    setUserEnteredCode("")
    setAccordionOpen(!accordionOpen)
  }

  const handlePromoCodeSelection = (index: number) => {
    setSelectedIndex(index)
    if (isSpecialCodeExist && index !== 0) {
      setAccordionOpen(!accordionOpen)
    } else if (isSpecialCodeExist && index === 0) {
      setUserEnteredPromoCode({
        title: "",
        index: null,
        agentId: null,
        promoCode: null,
        couponCode: null,
        rateCode: null,
      })
      setUserEnteredCode("")
      setAccordionOpen(!accordionOpen)
    } else if (index !== 0) {
      setActiveIndex(index)
    } else {
      setAccordionOpen(!accordionOpen)
    }
  }
  const keypadCloseForDatePicker = () => {
    if (document.activeElement instanceof HTMLInputElement) {
      document.activeElement.blur()
    }
  }

  const searchHandler = () => {
    const isHotelChanged = router.query?.hotelId !== generatedHotelID //? checking hotel change
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

    if (
      isRoomsLengthChanged ||
      isRoomsChanged ||
      isDatesChanged ||
      isHotelChanged ||
      router.query?.hotelId ||
      !(searchValue?.length < 3)
    ) {
      setDisableCheckRatesButton(false)
    } else {
      setDisableCheckRatesButton(true)
    }
  }

  useEffect(() => {
    searchValue && searchValue?.length >= 3 && searchHandler()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, roomsCount, startDate, endDate])

  const handleCheckRates = async () => {
    const brandName = selectedHotel?.brand_name
    let navigateURL = `${ROUTES?.WITHOUTSEO_FOR_ROUTING?.BOOKING?.CART}?`
    setGuestBookingSchedule(startDate, endDate)
    setCheckAvailabilityPayload(
      roomsCount?.[0]?.adults,
      roomsCount?.[0]?.child,
      1,
      endDate,
      startDate,
      generatedHotelID || (router?.query?.hotelId as string),
      fetchRateFilter() || undefined,
      userTier || undefined,
      false,
      "",
      userEnteredPromoCode?.promoCode,
      userEnteredPromoCode?.couponCode,
      userEnteredPromoCode?.agentId,
    )
    updateGuestDetails({
      data: roomsCount,
    })
    setOpenGuestDetailsModal(false)
    if (generatedHotelID) {
      if (!!brandName && brandName?.toLowerCase() !== "taj") {
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
          loggedIn: isLogin,
          userStore,
        })
      } else {
        if (generatedHotelID) {
          navigateURL = `${navigateURL}` + `hotelId=${generatedHotelID}`
        }
        if (userEnteredPromoCode?.title) {
          navigateURL = `${navigateURL}` + `&sc=${userEnteredPromoCode?.title}`
        }
        navigate(navigateURL)
      }
    } else {
      if (isDestinationBookingMask) {
        hotelIds?.length > 0 &&
          setDestinationAvailability({
            hotelIds: hotelIds,
            startDate: startDate,
            endDate: endDate,
            numRooms: 1,
            adults: roomsCount?.[0]?.adults,
            children: roomsCount?.[0]?.child,
            rateFilter: fetchRateFilter() || "RRC",
          })
      } else {
        handleNavigation(selectedDestination || selectedHotel, selectedType)
      }
    }
  }

  useEffect(() => {
    setAdultCount(
      roomsCount?.reduce((accumulator: number, currentValue: any) => {
        return accumulator + Number.parseInt(currentValue.adults)
      }, 0),
    )
    setChildCount(
      roomsCount?.reduce((accumulator: number, currentValue: any) => {
        return accumulator + Number.parseInt(currentValue.child)
      }, 0),
    )
    setGuestCount(childCount + adultCount)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomsCount])

  const handleUserNavigation = async (item: any) => {
    const brand = item?.brand_name?.toUpperCase()
    const navUrl = externalNavigation[brand]
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
          item?.identifier,
          item?.brand_name,
          startDate,
          endDate,
          "NSEB",
          roomsCount?.length,
          roomsCount,
          sebObject,
          Boolean(router?.query?.overrideSessionDates),
          Boolean(router?.query?.isTajSats),
        )
      : `${navUrl}/${item?.identifier}?`
    if (item?.brand_name?.toLowerCase() !== "taj") {
      CrossSiteNavigation({
        url: URL,
        loggedIn: isLogin,
        userStore,
        isSEB,
      })
    } else {
      navigate(`/hotels/${item?.identifier}`)
    }
  }

  const handleNavigation = (data: any, searchType: any) => {
    if (searchType === "hotel") {
      if (data?.brand_name?.toLowerCase() !== "taj" && data?.hotel_type?.toLowerCase() === "hotels") {
        handleUserNavigation(data)
      } else {
        navigate(`/hotels/${data?.identifier}`)
      }
    } else if (searchType === "destination") {
      router.push({
        pathname: `/destination/hotels-in-${data?.city?.toLowerCase()?.replaceAll(" ", "-")}`,
        query: { hotel_type: data?.hotel_type },
      })
    }
  }

  useEffect(() => {
    setGuestBookingSchedule(startDate, endDate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate])

  const handleHotelSearch = (event: any) => {
    const { value } = event?.target
    setOpenSearch(true)
    setSearchValue(value)
    clearCalenderViewData()
  }

  //* Invoking the autoCompleteSearch API
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        searchStore?.autoCompleteSearch(searchValue)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedSearchTerm],
  )

  //* *Written to set the search results
  useEffect(() => {
    setResultsResponseData([
      {
        hotelsData: searchStore?.searchResults?.hotels,
      },
    ])
  }, [searchStore?.searchResults])

  const handleDateSelection = (pickedDate: any) => {
    const checkInDate = new Date(date?.[0])
    if (selectedDateType === "check_in") {
      setDate([pickedDate?.[0], addDaysToDate(pickedDate?.[0], lengthOfStay ? lengthOfStay : 1)])
      setSelectedDateType("check_out")
      setOpen(true)
    } else if (
      //? if user selects same date
      `${checkInDate?.getDate()}${checkInDate?.getMonth()}${checkInDate?.getFullYear()}` ===
      `${pickedDate?.[0]?.getDate()}${pickedDate?.[0]?.getMonth()}${pickedDate?.[0]?.getFullYear()}`
    ) {
      setDate([checkInDate, addDaysToDate(checkInDate, lengthOfStay ? lengthOfStay : 1)])
    } else if (pickedDate?.[0] <= checkInDate) {
      setDate([pickedDate?.[0], addDaysToDate(pickedDate?.[0], lengthOfStay ? lengthOfStay : 1)])
    } else if (differenceInDays(checkInDate, pickedDate?.[0]) < lengthOfStay) {
      setDate([checkInDate, addDaysToDate(checkInDate, lengthOfStay ? lengthOfStay : 1)])
    } else {
      setDate([checkInDate, pickedDate?.[0]])
    }
    if (selectedDateType === "check_out") {
      setActiveStartDate(new Date(checkInDate))
      setOpen(false)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const leads: any = calendarViewData || []

  useEffect(() => {
    setDateKey((prev: number) => prev + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leads])

  const handleView = ({ view, activeStartDate, action }: any) => {
    if (activeStartDate <= new Date()) {
      setActiveStartDate(new Date())
    } else {
      setActiveStartDate(activeStartDate)
    }
    const startDate = activeStartDate
    const endDate = AddNumberOfDays(activeStartDate, 31)
    const hasDate = (date: any) => leads.some((obj: any) => obj?.arrivalDate == dateFormatConverter(date))
    const hasBothDates = hasDate(startDate) && hasDate(getPreviousDate(endDate))
    if (view === "month" && isHotel && generatedHotelID) {
      if (hasBothDates) {
        return null
      } else {
        getCalendarData(startDate, endDate, true)
      }
    }
  }
  const handleClearSearchData = () => {
    setSearchValue("")
    setSelectedData("")
    setOpenSearch(false)
    setSelectedHotel("")
    setGeneratedHotelID("")
    clearCalenderViewData()
    clearAddToCartPayload()
    setResultsResponseData([])
    setSelectedDestination("")
  }

  const getCalendarData = (startDate: any, endDate: any, update: boolean) => {
    const urlParams = new URLSearchParams(global?.window?.location?.search)
    const calendarPayload = {
      hotelId: propertyStore?.propertyData?.hotelId || generatedHotelID || urlParams?.get("hotelId"),
      startDate: dateFormatConverter(startDate),
      endDate: dateFormatConverter(endDate),
      onlyCheckRequested: "true",
      rateFilter: fetchRateOnlyFilter(),
      lengthOfStay: lengthOfStay || 1,
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
    if (generatedHotelID && isHotel) {
      setInitialCalendarData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generatedHotelID, userTier, userEnteredPromoCode])

  const handleScroll = (index: number) => {
    if (index > 2) {
      if (accordionContentRef?.current) {
        accordionContentRef?.current.scrollIntoView({
          block: "center",
          inline: "nearest",
          behavior: "smooth",
        })
      }
    }
  }

  return (
    <MainBox aria-label="msite-booking-mask">
      <Box sx={{ p: "0vw 8.281vw" }}>
        <Input
          placeholder={"Find a hotel"}
          onChange={(e: any) => handleHotelSearch(e)}
          onKeyPress={(e: any) => handleHotelSearch(e)}
          sx={{
            width: "100%",
            fontSize: "3.750vw",
            "&.MuiInputBase-root:before": {
              borderBottom: `1px solid ${theme?.palette?.ihclPalette?.hexSeventeen}`,
            },
          }}
          value={searchValue}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon sx={{ width: "3.750vw", height: "3.9vw" }} />
            </InputAdornment>
          }
          endAdornment={
            selectedData || searchValue ? (
              <InputAdornment position="end" onClick={handleClearSearchData}>
                {searchLoading ? (
                  <CircularProgress sx={{ width: "2.5vw !important", height: "2.5vw !important" }} />
                ) : (
                  <CloseIcon sx={{ cursor: "pointer", width: "2.5vw", height: "2.5vw" }} />
                )}
              </InputAdornment>
            ) : (
              <></>
            )
          }
        />
        {openSearch && (
          <Box key={searchValue} pl={MobilePxToVw(20)}>
            {searchResults?.hotels?.destinations?.length > 0 && (
              <Stack flexDirection={"column"}>
                <CategoryText variant="m-body-s">{CONSTANTS?.DESTINATIONS}</CategoryText>
                <Divider sx={{ marginTop: MobilePxToVw(10) }} />
              </Stack>
            )}
            {searchResults?.hotels?.destinations?.slice(0, 2)?.map((destination: any, index: number) => (
              <Stack
                key={index}
                sx={{
                  "&:hover": {
                    background: "rgba(69, 68, 63, 0.1)",
                  },
                }}>
                <SearchedOptions
                  variant="m-body-l"
                  onClick={() => {
                    setSearchValue(destination?.name)
                    setSelectedData(destination?.name)
                    setSelectedDestination(destination)
                    setSelectedType("destination")
                    setGeneratedHotelID("")
                    setSelectedHotel("")
                    setOpenSearch(false)
                  }}>
                  {destination?.name}
                </SearchedOptions>
              </Stack>
            ))}
            {searchResults?.hotels?.data?.length > 0 && (
              <Stack flexDirection={"column"}>
                <CategoryText variant="m-body-s">{CONSTANTS?.HOTELS}</CategoryText>
                <Divider sx={{ marginTop: MobilePxToVw(10) }} />
              </Stack>
            )}
            {searchResults?.hotels?.data?.length > 0 && (
              <HotelsContainer>
                {searchResults?.hotels?.data?.map((hotel: any, index: number) => (
                  <Stack
                    key={index}
                    sx={{
                      "&:hover": {
                        background: "rgba(69, 68, 63, 0.1)",
                      },
                    }}>
                    <SearchedOptions
                      variant="m-body-l"
                      onClick={() => {
                        setSelectedType("hotel")
                        setSelectedHotel(hotel)
                        setSearchValue(hotel?.name)
                        setSelectedData(hotel?.name)
                        setGeneratedHotelID(hotel?.id)
                        setSelectedDestination("")
                        setOpenSearch(false)
                        setInitialCalendarData()
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
                    </SearchedOptions>
                  </Stack>
                ))}
              </HotelsContainer>
            )}
          </Box>
        )}
        <>
          <Box
            mt={MobilePxToVw(60)}
            pb={MobilePxToVw(6)}
            borderBottom={`1px solid ${theme.palette.ihclPalette.hexTwelve}`}>
            <ClickAwayListener
              in={open}
              onClickAway={() => {
                setOpen(false)
                if (date?.[0]) {
                  setActiveStartDate(new Date(date?.[0]))
                } else {
                  setActiveStartDate(new Date())
                }
              }}>
              <LocalizationProviderBox>
                {/* using react-date-picker */}
                <Box position={"relative"} width={"100%"} key={refresh}>
                  <CustomDatePickerComponent
                    sx={{
                      "& .react-calendar": {
                        boxShadow: "unset !important",
                        padding: `${MobilePxToVw(40)} 0 !important`,
                      },
                    }}
                    date={date}
                    isOpen={open}
                    onChange={handleDateSelection}
                    minDate={new Date()}
                    calendarWidth={MobilePxToVw(533)}
                    calendarIcon={null}
                    selectRange={true}
                    allowPartialRange
                    onCalendarOpen={() => {
                      keypadCloseForDatePicker(), setOpen(true)
                    }}
                    onCalendarClose={() => {
                      setRefresh(`${new Date().getTime()}`)
                      // setOpen(false)
                    }}
                    activeStartDate={activeStartDate} //? commented as we are getting application error
                    onActiveStartDateChange={handleView}
                    isCalendarLoading={isCalendarLoading && open}
                    tileContent={({ activeStartDate, date, view }: any) =>
                      view === "month" &&
                      !isCalendarLoading &&
                      generatedHotelID &&
                      isHotel &&
                      selectedHotel?.brand_name?.toLowerCase() === "taj" &&
                      searchValue && (
                        <CustomDateTileComponent
                          leads={leads}
                          date={date}
                          key={dateKey}
                          lengthOfStay={lengthOfStay}
                          isComplementary={isComplementary}
                        />
                      )
                    }
                    tileDisabled={({ activeStartDate, date, view }: any) => {
                      const filteredDate =
                        leads && leads?.filter((item: any) => item?.arrivalDate == dateFormatConverter(date))?.[0]
                      return (
                        isCalendarLoading ||
                        (!filteredDate?.available &&
                          view === "month" &&
                          isHotel &&
                          selectedHotel?.brand_name?.toLowerCase() === "taj" &&
                          selectedDateType === "check_in" &&
                          !isCalendarLoading)
                      )
                    }}
                    renderComponent={
                      <Stack
                        alignItems={"center"}
                        flexDirection={"row"}
                        onFocus={() => {
                          keypadCloseForDatePicker(), setOpen(() => true)
                        }}
                        onClick={() => {
                          keypadCloseForDatePicker(), setOpen(!open), setExpandGuestRoomCount(false)
                        }}
                        columnGap={MobilePxToVw(20)}>
                        <CalenderIcon />
                        <Typography
                          letterSpacing={"-0.05rem"}
                          whiteSpace={"nowrap"}
                          color={
                            date?.[0] ? theme.palette.ihclPalette.hexSeventeen : theme.palette.ihclPalette.hexTwelve
                          }
                          onClick={() => setSelectedDateType("check_in")}
                          variant={"m-body-l"}>
                          {date?.[0] ? formatDateWithMON(date?.[0]) : "Check in"}
                        </Typography>
                        <StyledDivider sx={{ width: `${MobilePxToVw(30)} !important` }} />
                        <Typography
                          letterSpacing={"-0.05rem"}
                          whiteSpace={"nowrap"}
                          color={
                            date?.[0] ? theme.palette.ihclPalette.hexSeventeen : theme.palette.ihclPalette.hexTwelve
                          }
                          onClick={() => setSelectedDateType("check_out")}
                          variant={"m-body-l"}>
                          {date?.[1] ? formatDateWithMON(date?.[1]) : "Check out"}
                        </Typography>
                      </Stack>
                    }
                  />
                </Box>
              </LocalizationProviderBox>
            </ClickAwayListener>
          </Box>
          <Box minHeight={open ? MobilePxToVw(555) : 0}></Box>
          <>
            <ListItemButton
              sx={{ padding: "9.375vw 0vw 0vw 0vw" }}
              onClick={() => {
                setExpandGuestRoomCount(!expandGuestRoomCount)
                accordionOpen && setAccordionOpen(false)
              }}>
              <Box
                loading="lazy"
                component="img"
                src={ICONS?.GUEST_COUNT_ICON}
                height={MobilePxToVw(20)}
                width={MobilePxToVw(25)}
              />
              <StyledListItem primary={selectedGuestDetails} />
              {expandGuestRoomCount ? (
                <ExpandLess
                  sx={{
                    color: theme?.palette?.ihclPalette?.hexSeventeen,
                  }}
                />
              ) : (
                <ExpandMore
                  sx={{
                    color: theme?.palette?.ihclPalette?.hexSeventeen,
                  }}
                />
              )}
            </ListItemButton>
            <DateBottomDivider sx={{ opacity: "0.6" }} />
            {expandGuestRoomCount && (
              <GuestRoomComponent
                roomsCount={roomsCount}
                setGuestCount={setGuestCount}
                setRoomsCount={setRoomsCount}
                shouldScrollOnAddingRoom={true}
                expandGuestRoomCount={expandGuestRoomCount}
                isComplementary={isComplementary}
                isSEB={isSEB}
              />
            )}
          </>
        </>
      </Box>
      <ClickAwayListener
        onClickAway={() => {
          accordionOpen && setAccordionOpen(false)
        }}>
        <AccordionMainBox
          sx={[
            accordionOpen && {
              position: "fixed",
              zIndex: 9,
              bottom: 0,
              height: "65vh",
              boxShadow: "-6px 10px 32px rgba(0, 0, 0, 0.15)",
            },
          ]}>
          <StyledAccordion expanded={accordionOpen}>
            <StyledAccordionSummary
              expandIcon={<ExpandMoreIcon style={{ fontSize: "20px" }} />}
              onClick={() => {
                setAccordionOpen(!accordionOpen)
                setExpandGuestRoomCount(false)
              }}>
              <Typography variant="m-body-l">
                {isSpecialCodeExist ? userEnteredPromoCode?.title : CONSTANTS?.SPECIAL_CODE}
              </Typography>
            </StyledAccordionSummary>
            <AccordionDetails>
              <SpecialCodeDataWrapper>
                {SpecialCodeData?.promoCodes?.map((code: any, index: number) => (
                  <>
                    <ColumnDirectionBox key={index} ref={accordionContentRef}>
                      <FlexBox
                        sx={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handlePromoCodeSelection(index)
                          index != activeIndex && setUserEnteredCode("")
                          index != activeIndex && setChecked(false)
                          setTimeout(() => {
                            handleScroll(index), 0
                          })
                        }}>
                        <CheckIcon
                          sx={{
                            marginRight: "1.563vw",
                            visibility:
                              (index == userEnteredPromoCode?.index || (index == 0 && !userEnteredPromoCode?.index)) &&
                              accordionOpen
                                ? "visible"
                                : "hidden",
                          }}
                        />
                        <Typography variant="m-body-l">{code?.title}</Typography>
                      </FlexBox>
                      {((isSpecialCodeExist && index == userEnteredPromoCode?.index) ||
                        (index === activeIndex && index !== 0)) && (
                        <ColumnDirectionBox sx={{ ml: showSelectedCode ? "" : "5.313vw" }}>
                          {isSpecialCodeExist && index == userEnteredPromoCode?.index ? (
                            <SelectedCodeBox>
                              <Typography
                                variant="m-body-l"
                                color={theme?.palette?.ihclPalette?.hexTwo}
                                sx={{ overflow: "hidden" }}>
                                {isSpecialCodeExist}
                              </Typography>
                              <CloseSharp
                                fontSize="medium"
                                sx={{
                                  color: theme?.palette?.ihclPalette?.hexTwo,
                                }}
                                onClick={() => handleRemoveSpecialCode()}
                              />
                            </SelectedCodeBox>
                          ) : (
                            <>
                              <StyledFormGroup row>
                                <PromoCodeTextField
                                  variant="standard"
                                  placeholder="Enter code"
                                  value={userEnteredCode}
                                  inputProps={{ maxLength: 25 }}
                                  onChange={(e: any) => setUserEnteredCode(e?.target?.value)}
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
                                      rateCode: code?.rateCode === "undefined" ? userEnteredCode : null,
                                    })
                                    setAccordionOpen(!accordionOpen)
                                  }}>
                                  {CONSTANTS?.ADD}
                                </AddButton>
                              </StyledFormGroup>
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
                            </>
                          )}
                          {/* {selectedIndex === SpecialCodeData?.promoCodes?.length - 1 && (
                            <CheckIconBox>
                              <IconButton disableRipple>
                                <YellowBorderCheckbox
                                  onChange={() => setChecked(!checked)}
                                  checked={checked || !!userEnteredPromoCode?.title}
                                />
                              </IconButton>
                              <TermsTypography>{CONSTANTS?.CHECK_BOX_LABEL}</TermsTypography>
                              <TermsLinkTypography
                                onClick={() => {
                                  window.open(`${window?.location?.origin}${ROUTES?.CC_TERMS_AND_CONDITIONS}`, "_blank")
                                }}>
                                {CONSTANTS?.TERMS_AND_CONDITIONS}
                              </TermsLinkTypography>
                            </CheckIconBox>
                          )} */}
                        </ColumnDirectionBox>
                      )}
                      {index !== SpecialCodeData?.promoCodes?.length - 1 && <SpecialCodeDropDownDivider />}
                    </ColumnDirectionBox>
                  </>
                ))}
              </SpecialCodeDataWrapper>
            </AccordionDetails>
          </StyledAccordion>
          <Stack alignItems="center">
            <CheckRatesButton
              variant="light-contained"
              disabled={!searchValue || disableCheckRatesButton || searchValue?.length < 3 || openSearch}
              onClick={() => {
                const isExceeded = differenceInDays(date?.[0], date?.[1]) > 10 ? true : false
                const isSebExceeded =
                  differenceInDays(date?.[1], date?.[0]) * roomsCount?.length > Number(router?.query?.sebbalance)
                if (isSEB ? isSebExceeded : isExceeded) {
                  setLimitExceedModal(true)
                } else {
                  handleCheckRates()
                }
              }}>
              {CONSTANTS.CHECK_RATES_1}
            </CheckRatesButton>
          </Stack>
        </AccordionMainBox>
      </ClickAwayListener>
      <BasicModal
        bgcolor={isMobile ? theme?.palette?.background?.default : ""}
        width={"100%"}
        tajLogoTop={"0vw"}
        height={"100%"}
        handleClose={handleModelClose}
        showLogo={true}
        CloseIcon={ICONS?.CLOSE_GOLD_ICON}
        open={limitExceedModal}
        Component={
          <BookingDateRangeLimitCardComponent handleClose={handleModelClose} handleCheckRates={handleCheckRates} />
        }
      />
    </MainBox>
  )
}

export default observer(BookingMaskForMsite)
