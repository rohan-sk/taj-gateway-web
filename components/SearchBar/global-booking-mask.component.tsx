import React, { useContext, useEffect, useRef, useState } from "react"
import dayjs from "dayjs"
import dynamic from "next/dynamic"
import { observer } from "mobx-react-lite"
import { ROUTES } from "../../utils/routes"
import Pluralize from "../../utils/pluralize"
import { CONSTANTS, GINGER_BRAND_NAME, ICONS } from "../constants"
import { ActionProps, ImageProps } from "../types"
import { GLOBAL_STORES } from "../../utils/Constants"
import { useMobileCheck } from "../../utils/isMobilView"
import fetchRateFilter from "../../utils/fetchRateFilter"
import { useAppNavigation } from "../../utils/NavigationUtility"
import GuestRoomComponent from "../banner/guestRooms/GuestRoomComponent"
import { Box, ClickAwayListener, Divider, Stack, Typography } from "@mui/material"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import BookingFlowGlobalStore from "../../features/booking/store/globalStore/booking.flow.store"
import {
  getTomorrowDate,
  getDayAfterTomorrowDate,
  formatDateWithMON,
  dateFormatConverter,
  differenceInDays,
  getTodayDate,
  firstDateOfSelectedMonth,
  getPreviousDate,
  getNextDate,
} from "../../utils/getDate"
import {
  DateBox,
  TextFieldBox,
  BookNowButton,
  DateBoxDivider,
  TypographyStyle,
  LocalizationProviderBox,
  StyledDivider,
} from "../banner/styles"
import { GuestRoomBox, VerticalDivider } from "../banner/guestRooms/GuestRoomStyles"
import { theme } from "../../lib/theme"
import { useDebounce } from "../../utils/useDebounce"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import AddNumberOfDays from "../../utils/addDaysToGivenDate"
import { GAStore, PropertyStore, UserStore } from "../../store"
import { SearchMenuList } from "../header/styles/booking-menu"
import SearchStore from "../../features/search/store/search.store"
import { useRouter } from "next/router"
import { getCookie } from "../../utils/cookie"
import { triggerEvent } from "../../utils/analytics"
import { useLoggedIn } from "../../utils/hooks/useLoggedIn"
import getNonTajBrandCrossURL from "../../utils/getCrossBrandURL"
import { PAGE_LANG, TAJ_HOTELS } from "../../utils/analytics/constants"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
import { CrossSiteNavigation } from "../../utils/sso/cross-site-navigation"
import fetchRateOnlyFilter from "../../utils/fetchRateOnlyFilterForCalendar"
import { StyledArrow } from "../header/styles/booking-flow-header"

//* Components
const BasicModal = dynamic(() => import("../hoc/modal/modal"))
const LoadingSpinner = dynamic(() => import("../../utils/SpinnerComponent"))
const BookingFlowSpecialCodeComponent = dynamic(() => import("../header/booking-special-code.component"))
const CustomDatePickerComponent = dynamic(() => import("../hoc/CustomDatePicker/custom-date-picker.component"))
const CustomDateTileComponent = dynamic(() => import("../hoc/CustomDatePicker/custom-date-tile.component"))
const BookingDateRangeLimitCardComponent = dynamic(() => import("../card/booking-date-range-limit.card.component"))

interface GlobalBookingFlowBarProps {
  imageAsset: ImageProps
  largeVariant: string
  mediaType: string
  primaryAction: ActionProps
  searchFieldVariant: string
  title: any
  variant: string
  _type: string
}

const GlobalBookingFlowBar = ({ title, _type }: GlobalBookingFlowBarProps) => {
  const router = useRouter()
  const isLogin = useLoggedIn()
  const boxRef: any = useRef(null)
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const context: any = useContext(IHCLContext)

  //* Booking Flow Global Store
  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore
  const propertyStore = context?.getGlobalStore(GLOBAL_STORES?.propertyStore) as PropertyStore
  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore

  const {
    loading,
    cartDetails,
    guestDetails,
    userEnteredPromoCode,
    isCalendarLoading,
    globalSearchedData,
    emptyUserCart,
    getCartDetails,
    updateGuestDetails,
    setGuestBookingSchedule,
    setCheckAvailabilityPayload,
    changeCurrentRoomId,
    setCalenderViewData,
    updateCalenderViewData,
    setGlobalSearchedData,
    clearCalenderViewData,
    setUserEnteredPromoCode,
  } = bookingFlowGlobalStore
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const searchStore = context.getGlobalStore(GLOBAL_STORES.searchStore) as SearchStore

  const { searchResults } = searchStore
  const dataLayer = MemberDataLayer(userStore, gaStoreData)

  let hotelName
  if (typeof title === "string") {
    hotelName = title
  } else {
    if (isMobile) {
      hotelName = title?.[0]?.mobileTitle?.[0]
    } else {
      hotelName = title?.desktopTitle?.[0]
    }
  }
  const initialData: any =
    ROUTES?.HOMEPAGE !== global?.window?.location?.pathname
      ? {
          hotelName: propertyStore?.propertyData?.hotelName || globalSearchedData?.name,
          hotelId: propertyStore?.propertyData?.hotelId || globalSearchedData?.id,
        }
      : {}

  const [open, setOpen] = useState<boolean>(false)
  const [dateKey, setDateKey] = useState<number>(0)
  const [adultCount, setAdultCount] = useState<number>(1)
  const [guestCount, setGuestCount] = useState<number>(1)
  const [childCount, setChildCount] = useState<number>(0)
  const [openSearch, setOpenSearch] = useState<boolean>(false)
  const [openOffers, setOpenOffers] = useState<boolean>(false)
  const [refresh, setRefresh] = useState<any>(new Date().getTime())
  const [searchValue, setSearchValue] = useState(initialData?.hotelName)
  const [limitExceedModal, setLimitExceedModal] = useState<boolean>(false)
  const [expandGuestRoomCount, setExpandGuestRoomCount] = useState<boolean>(false)
  const [activeStartDateState, setActiveStartDateState] = useState<Date>(getNextDate(new Date()))
  const [generatedHotelID, setGeneratedHotelID] = useState<string | undefined>(initialData?.hotelId)
  const [selectedType, setSelectedType] = useState<string>("check_in")
  const [date, setDate] = useState<any>([dayjs(getTomorrowDate()), dayjs(getDayAfterTomorrowDate())])
  const [roomsCount, setRoomsCount] = useState([{ id: 1, adults: 1, child: 0, room: "ROOM", isSelected: false }])
  const userTier = global?.window?.localStorage?.getItem("userTier")
  const isDateSelected = date?.[0] && date?.[1] //* Using to disable the Book Now button
  const startDate = dateFormatConverter(date?.[0])
  const endDate = dateFormatConverter(date?.[1])
  const isPromoCodeSelected = //* Using to show the selected promo code.
    userEnteredPromoCode?.promoCode || userEnteredPromoCode?.couponCode || userEnteredPromoCode?.agentId
  const isRoomsAvailableInCart = cartDetails?.cartDetailsResponse?.items?.[0]?.hotel?.[0]?.room?.length > 0
  const brandName = globalSearchedData?.brand_name
  const isGinger = GINGER_BRAND_NAME?.toLowerCase() === brandName?.toLowerCase()
  const debouncedSearchTerm = useDebounce(searchValue, 300)
  // Input Search
  const handleSearch = (event: any) => {
    const { value } = event?.target
    setSearchValue(value)
    clearCalenderViewData()
  }

  const handleModelClose = () => setLimitExceedModal(false)
  //** Invoking the autoCompleteSearch API
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        searchStore?.autoCompleteSearch(searchValue || "")
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedSearchTerm],
  )

  const handleSpecialCode = () => {
    setOpenOffers(!openOffers)
    setOpenSearch(false)
  }

  const handleCreatePayload = () => {
    updateGuestDetails({
      data: roomsCount,
    })
    setGuestBookingSchedule(startDate, endDate)
    setCheckAvailabilityPayload(
      roomsCount?.[0]?.adults,
      roomsCount?.[0]?.child,
      1,
      endDate,
      startDate,
      generatedHotelID,
      fetchRateFilter() || undefined,
      userTier || undefined,
      false,
      "",
      userEnteredPromoCode?.promoCode,
      userEnteredPromoCode?.couponCode,
      userEnteredPromoCode?.agentId,
    )
  }

  const handleBooking = async () => {
    const hotelId = globalSearchedData?.id || generatedHotelID
    updateGuestDetails({
      data: roomsCount,
    })
    setCheckAvailabilityPayload(
      roomsCount?.[0]?.child,
      roomsCount?.[0]?.adults,
      1,
      endDate,
      startDate,
      hotelId,
      fetchRateFilter() || undefined,
      userTier || undefined,
      false,
      "",
      userEnteredPromoCode?.promoCode,
      userEnteredPromoCode?.couponCode,
      userEnteredPromoCode?.agentId,
    )
    let navigateURL = `${ROUTES?.WITHOUTSEO_FOR_ROUTING?.BOOKING?.CART}?`
    if (isRoomsAvailableInCart) {
      await emptyUserCart()
    }
    changeCurrentRoomId(1)
    if (hotelId) {
      navigateURL = `${navigateURL}` + `hotelId=${hotelId}`
    }
    if (userEnteredPromoCode?.title) {
      navigateURL = `${navigateURL}` + `&sc=${userEnteredPromoCode?.title}`
    }
    navigate(navigateURL)
  }

  const handleNavigation = (data: any, searchType: any) => {
    if (searchType === "hotel") {
      if (data?.brand_name?.toLowerCase() !== "taj") {
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

  const handleUserNavigation = async (item: any) => {
    if (item?.brand_name?.toLowerCase() !== "taj") {
      const URL = getNonTajBrandCrossURL(
        item?.brand_name,
        item?.identifier,
        startDate,
        endDate,
        roomsCount,
        "",
        userEnteredPromoCode?.promoCode,
        "",
        userEnteredPromoCode?.agentId,
        userEnteredPromoCode?.couponCode,
        item?.synxis_hotel_id,
      )
      await CrossSiteNavigation({
        url: URL,
        loggedIn: isLogin,
        userStore,
      })
    } else {
      navigate(`/hotels/${item?.identifier}`)
    }
  }

  const handleDateSelection = (pickedDate: any) => {
    const checkInDate = new Date(date?.[0])
    if (selectedType === "check_in") {
      let nextMonthActiveStartDate = new Date(activeStartDateState)
      nextMonthActiveStartDate?.setMonth(nextMonthActiveStartDate?.getMonth() + 1)
      nextMonthActiveStartDate?.getMonth() === pickedDate?.[0]?.getMonth() &&
        setActiveStartDateState(activeStartDateState)

      setDate([pickedDate?.[0], getNextDate(pickedDate?.[0])])
      setSelectedType("check_out")
      setOpen(true)
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
    const urlParams = new URLSearchParams(global?.window?.location?.search)
    getCartDetails(), handleCreatePayload()
    setGeneratedHotelID(propertyStore?.propertyData?.hotelId || urlParams?.get("hotelId"))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setGuestBookingSchedule(startDate, endDate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate])

  useEffect(() => {
    updateGuestDetails({
      data: roomsCount,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomsCount])

  useEffect(() => {
    setAdultCount(
      guestDetails?.data?.reduce((accumulator: number, currentValue: any) => {
        return accumulator + Number.parseInt(currentValue.adults)
      }, 0),
    )
    setChildCount(
      guestDetails?.data?.reduce((accumulator: number, currentValue: any) => {
        return accumulator + Number.parseInt(currentValue.child)
      }, 0),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guestDetails])

  const handleScroll = () => {
    if (boxRef?.current) {
      const elementTop = boxRef?.current?.getBoundingClientRect().top
      const offset = 80 // Adjust this offset as needed
      window.scrollTo({
        top: elementTop + window.scrollY - offset,
        behavior: "smooth", // You can use 'auto' or 'smooth'
      })
    }
  }

  useEffect(() => {
    if (open || expandGuestRoomCount || openSearch || openOffers) {
      handleScroll()
    }
  }, [open, expandGuestRoomCount, openSearch, openOffers])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const leads: any = bookingFlowGlobalStore?.calendarViewData || []

  useEffect(() => {
    setDateKey((prev: number) => prev + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leads])

  const handleView = ({ view, activeStartDate, action }: any) => {
    const startDate = activeStartDate
    setActiveStartDateState(activeStartDate)
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
      AddNumberOfDays(firstDateOfSelectedMonth(new Date(date?.[0])) || getTodayDate(), 62),
      false,
    )
  }

  useEffect(() => {
    if (propertyStore?.propertyData?.hotelId || generatedHotelID) {
      setInitialCalendarData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyStore?.propertyData?.hotelId, generatedHotelID, userTier, userEnteredPromoCode])

  const selectedHotelData = propertyStore?.propertyData?.hotelAddress
  const selectedHotelDetails = searchResults?.hotels?.data?.[0]
  const handleHotelBooking = () => {
    const presentDate = new Date()
    const checkInDate = new Date(startDate)
    triggerEvent({
      action: "itinerary_Selected",
      params: {
        ...dataLayer,
        buttonLinkName: CONSTANTS?.BOOK_NOW,
        link_url: selectedHotelDetails?.path,
        link_text: CONSTANTS?.BOOK_NOW,
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
        noOfAdults: adultCount,
        noOfChild: childCount,
        noOfRooms: roomsCount?.length,
        specialCode: userEnteredPromoCode?.title || "",
        brandName: propertyStore?.propertyData?.brandName ? propertyStore?.propertyData?.brandName : "",
        country: selectedHotelData?.country ? selectedHotelData?.country : "",
        city: selectedHotelData?.city ? selectedHotelData?.city : "",
        hotelName: selectedHotelData?.title,
        hotelCode: selectedHotelDetails?.synxis_hotel_id ? selectedHotelDetails?.synxis_hotel_id : "",
        hotelType: selectedHotelDetails?.hotel_type ? selectedHotelDetails?.hotel_type : "",
        hotelCountry: selectedHotelData?.country ? selectedHotelData?.country : "",
        hotelCity: selectedHotelData?.city ? selectedHotelData?.city : "",
        hotelState: selectedHotelData?.state ? selectedHotelData?.state : "",
        hotelPinCode: selectedHotelData?.pincode ? selectedHotelData?.pincode : "",
        hotelbrand: propertyStore?.propertyData?.brandName ? propertyStore?.propertyData?.brandName : "",
        roomName: "",
        roomOffer: "",
        bunglowCode: "",
        clientId: getCookie("_ga")?.slice(6),
        pageTitle: selectedHotelDetails?.path?.replaceAll("/", "").toUpperCase(),
        pageURL: `${global?.window?.location.origin}` + `${selectedHotelDetails?.path}`,
        item_type: _type,
        widget_type: _type,
        pageSection: _type,
        widget_title: isMobile ? title?.[0]?.mobileTitle?.[0] : title?.desktopTitle?.[0],
        pageHierarchy: JSON.parse(
          `["${TAJ_HOTELS}",` +
            `"${PAGE_LANG}",` +
            `"${propertyStore?.propertyData?.brandName || ""}",` +
            `"${selectedHotelDetails?.path?.replaceAll("/", "").toUpperCase()}"]`,
        ),
        location: selectedHotelData?.city ? selectedHotelData?.city : "",
        outbound: false,
      },
    })
  }
  return (
    <>
      {loading && <LoadingSpinner />}
      <GuestRoomBox ref={boxRef} aria-label="Global Booking mask">
        <ClickAwayListener onClickAway={() => setOpenSearch(false)}>
          <Stack flexDirection={"column"} position={"relative"}>
            <TextFieldBox
              value={searchValue}
              variant="standard"
              placeholder="Find a hotel"
              onChange={(e: any) => handleSearch(e)}
              onFocus={() => setOpenSearch(true)}
              onClick={() => setOpenSearch(true)}
              sx={{
                "& .Mui-disabled": {
                  "-webkit-text-fill-color": "#45443F !important",
                },
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
            {openSearch && searchResults?.hotels?.data?.length > 0 && searchValue && (
              <SearchMenuList key={searchValue}>
                {searchResults?.hotels?.destinations?.length > 0 && (
                  <>
                    <Typography variant="body-s" color={theme.palette.ihclPalette.hexTwelve}>
                      {CONSTANTS?.DESTINATIONS}
                    </Typography>
                    <Divider sx={{ margin: `${DesktopPxToVw(8)} 0` }} />
                  </>
                )}
                {searchResults?.hotels?.destinations?.slice(0, 2)?.map((destination: any, index: number) => (
                  <Stack
                    key={index}
                    sx={{
                      "&:hover": {
                        background: "rgba(69, 68, 63, 0.1)",
                      },
                    }}>
                    <Typography
                      variant="body-l"
                      sx={{ cursor: "pointer", padding: "0.5vw 0vw" }}
                      onClick={() => {
                        setOpenSearch(false)
                        setSearchValue(destination?.name)
                        setGlobalSearchedData(destination)
                        setGeneratedHotelID("")
                        handleNavigation(destination, "destination")
                      }}>
                      {destination?.name}
                    </Typography>
                  </Stack>
                ))}
                {searchResults?.hotels?.data?.length > 0 && (
                  <>
                    <Typography variant="body-s" color={theme.palette.ihclPalette.hexTwelve} pb={DesktopPxToVw(20)}>
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
                      sx={{ cursor: "pointer", padding: "0.5vw 0vw" }}
                      onClick={() => {
                        setOpenSearch(false)
                        setSearchValue(hotel?.name)
                        setGlobalSearchedData(hotel)
                        setGeneratedHotelID(hotel?.id)
                        handleNavigation(hotel, "hotel")
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
                    </Typography>
                  </Stack>
                ))}
              </SearchMenuList>
            )}
          </Stack>
        </ClickAwayListener>
        <VerticalDivider orientation="vertical" flexItem />
        <LocalizationProviderBox sx={{ mr: DesktopPxToVw(12) }}>
          {/* using react-date-picker */}
          <Box position={"relative"} width={"100%"} key={refresh}>
            <CustomDatePickerComponent
              date={date}
              activeStartDate={activeStartDateState}
              isOpen={open}
              onChange={handleDateSelection}
              minDate={new Date()}
              calendarWidth={DesktopPxToVw(1158)}
              calendarIcon={null}
              showDoubleView={true}
              selectRange={true}
              allowPartialRange
              onCalendarClose={() => {
                setRefresh(`${new Date().getTime()}`)
                setOpen(false)
              }}
              onActiveStartDateChange={handleView}
              tileContent={({ activeStartDate, date, view }: any) =>
                view === "month" &&
                !isCalendarLoading && <CustomDateTileComponent leads={leads} date={date} key={dateKey} />
              }
              isCalendarLoading={isCalendarLoading && open}
              tileDisabled={({ activeStartDate, date, view }: any) => {
                const filteredDate =
                  leads && leads?.filter((item: any) => item?.arrivalDate == dateFormatConverter(date))?.[0]
                return (
                  isCalendarLoading ||
                  (!filteredDate?.available && view === "month" && selectedType === "check_in" && !isCalendarLoading)
                )
              }}
              focusSelectedMonth={true}
              renderComponent={
                <Stack
                  alignItems={"center"}
                  flexDirection={"row"}
                  onClick={() => {
                    setOpen(!open), setOpenSearch(false)
                  }}
                  columnGap={DesktopPxToVw(10)}>
                  <Typography
                    onClick={() => setSelectedType("check_in")}
                    letterSpacing={"-0.05rem"}
                    whiteSpace={"nowrap"}
                    color={date?.[0] ? "unset" : theme.palette.ihclPalette.hexTwelve}
                    variant={isMobile ? "m-body-l" : "body-l"}>
                    {date?.[0] ? formatDateWithMON(date?.[0]) : "Check in"}
                  </Typography>
                  <StyledDivider sx={{ width: `${DesktopPxToVw(30)} !important` }} />
                  <Typography
                    letterSpacing={"-0.05rem"}
                    whiteSpace={"nowrap"}
                    onClick={() => setSelectedType("check_out")}
                    color={date?.[0] ? "unset" : theme.palette.ihclPalette.hexTwelve}
                    variant={isMobile ? "m-body-l" : "body-l"}>
                    {date?.[1] ? formatDateWithMON(date?.[1]) : "Check out"}
                  </Typography>
                </Stack>
              }
            />
          </Box>
        </LocalizationProviderBox>
        <VerticalDivider orientation="vertical" flexItem />
        <DateBox
          onClick={() => {
            setExpandGuestRoomCount(!expandGuestRoomCount), setOpenSearch(false)
          }}
          sx={{ position: "relative" }}>
          <TypographyStyle variant="body-l">
            {Pluralize(CONSTANTS?.GUESTS.slice(0, 5), guestCount, false)}
          </TypographyStyle>
          <DateBoxDivider />
          <TypographyStyle variant="body-l">
            {`${roomsCount.length} ${roomsCount.length === 1 ? CONSTANTS?.ROOMS.slice(0, 4) : CONSTANTS?.ROOMS}`}
          </TypographyStyle>
          {expandGuestRoomCount && (
            <GuestRoomComponent
              top={"2.95vw"}
              right={"-14.8vw"}
              roomsCount={roomsCount}
              setGuestCount={setGuestCount}
              setRoomsCount={setRoomsCount}
              expandGuestRoomCount={expandGuestRoomCount}
              setExpandGuestRoomCount={setExpandGuestRoomCount}
            />
          )}
        </DateBox>
        <VerticalDivider orientation="vertical" flexItem />
        <Typography
          variant="body-l"
          onClick={() => handleSpecialCode()}
          sx={{
            cursor: "pointer",
            overflow: "hidden",
            minWidth: "7.552vw",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            WebkitBoxOrient: "vertical",
          }}>
          {isPromoCodeSelected
            ? userEnteredPromoCode?.title
              ? userEnteredPromoCode?.title
              : CONSTANTS?.SPECIAL_CODE
            : CONSTANTS?.SPECIAL_CODE}
        </Typography>
        <StyledArrow
          onClick={handleSpecialCode}
          $isDropDownOpened={openOffers}
          sx={{
            mr: DesktopPxToVw(20),
          }}
        />
        {openOffers && (
          <BookingFlowSpecialCodeComponent
            boxStyles={{
              top: "3.8vw !important",
              right: "13.2vw !important",
            }}
            openOffers={openOffers}
            handleSpecialCode={handleSpecialCode}
            currentRoomCount={roomsCount?.length}
            isGinger={isGinger}
          />
        )}
        <BookNowButton
          variant="light-contained"
          disabled={isDateSelected === null}
          sx={{
            whiteSpace: "noWrap",
          }}
          onClick={() => {
            const isExceeded = differenceInDays(date?.[0], date?.[1]) > 10 ? true : false
            if (isExceeded) {
              setLimitExceedModal(() => true)
            } else {
              handleBooking()
              handleHotelBooking()
              global?.window?.localStorage?.setItem("hotelJourneyPageType", "hotelDetailsPage")
            }
          }}>
          {CONSTANTS?.BOOK_NOW}
        </BookNowButton>
      </GuestRoomBox>
      <BasicModal
        width={"100%"}
        height={"100%"}
        bgcolor={""}
        handleClose={handleModelClose}
        ModalCloseButtonStyles={{
          right: "25vw",
          marginBottom: "1.563vw",
        }}
        ModalCloseButtonColor={theme?.palette?.ihclPalette?.hexOne}
        webCloseIcon={ICONS?.CLOSE_WHITE_ICON}
        open={limitExceedModal}
        Component={
          <BookingDateRangeLimitCardComponent handleClose={handleModelClose} handleCheckRates={handleBooking} />
        }
      />
    </>
  )
}

export default observer(GlobalBookingFlowBar)
