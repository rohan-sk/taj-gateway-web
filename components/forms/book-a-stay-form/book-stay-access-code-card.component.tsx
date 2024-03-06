import React, { useContext, useEffect, useRef, useState } from "react"
import dayjs from "dayjs"
import dynamic from "next/dynamic"
import { observer } from "mobx-react-lite"
import { KeyboardArrowDownOutlined } from "@mui/icons-material"
import { Autocomplete, Box, Input, InputAdornment, Paper, Stack, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { theme } from "../../../lib/theme"
import { ROUTES } from "../../../utils/routes"
import Pluralize from "../../../utils/pluralize"
import { CONSTANTS, CorporateAccessCugType, CouponCugType, TravelAgencyCugType } from "../../constants"
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
} from "../../../utils/getDate"
import { GLOBAL_STORES } from "../../../utils/Constants"
import fetchRateFilter from "../../../utils/fetchRateFilter"
import { GAStore, OffersStore, PropertyStore, UserStore } from "../../../store"
import { useAesthetics } from "../../../utils/fetchAsthetics"
import { useMobileCheck } from "../../../utils/isMobilView"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { ExpandMoreIcon } from "../../header/styles/booking-menu"
import { ActionProps, aestheticItems, parameterMapItems } from "../../types"
import { CalenderIcon, CloseIcon, SearchIcon } from "../../../utils/customIcons"
import SearchStore from "../../../features/search/store/search.store"
import { BookAStayErrorMessages } from "../gift-card-form/constants"
import { ErrorDisplayTypography } from "../business-form/business-sme-form"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import BookingFlowGlobalStore from "../../../features/booking/store/globalStore/booking.flow.store"
import { ColumnFlexBox } from "../enquiry-forms/khazana-enquiry-form/khazana-enquiry-form.styles"
import {
  HorizontalDivider,
  BookAStayCardTitleBox,
  BookAStayCardTitleDivider,
  BookAStayCardComponentBox,
  FieldsContainer,
  GuestRoomContainer,
  AutoCompleteInput,
  DatePickerContainer,
} from "../../card/styles/book-a-stay-default-card.styles"
import AddNumberOfDays from "../../../utils/addDaysToGivenDate"
import { StyledDivider } from "../../banner/styles"
import { FullBox } from "../../MyAccount/booking-history/booking-styles"
import fetchRateOnlyFilter from "../../../utils/fetchRateOnlyFilterForCalendar"
import { hotelRoute, offersRoute } from "../../../features/property/ui/constants"
import { triggerEvent } from "../../../utils/analytics"
import { getCookie } from "../../../utils/cookie"
import { MemberDataLayer } from "../../../utils/analytics/member-data-layer"
import { PAGE_LANG, TAJ_HOTELS } from "../../../utils/analytics/constants"
import { InputTextField } from "../enquiry-forms/news-letter-form/news-letter-form.styles"
import { useDebounce } from "../../../utils/useDebounce"
import ModalStore from "../../../store/global/modal.store"
import getNonTajBrandCrossURL from "../../../utils/getCrossBrandURL"
import { useLoggedIn } from "../../../utils/hooks/useLoggedIn"
import { CrossSiteNavigation } from "../../../utils/sso/cross-site-navigation"
const RenderActionItem = dynamic(() => import("../../hoc/actions/action-items-ui"))
const CustomDateTileComponent = dynamic(() => import("../../hoc/CustomDatePicker/custom-date-tile.component"))
const CustomDatePickerComponent = dynamic(() => import("../../hoc/CustomDatePicker/custom-date-picker.component"))
const GuestRoomComponent = dynamic(() => import("../../banner/guestRooms/GuestRoomComponent"))

interface BookAStayCardComponentProps {
  url: string
  title: string
  _type: string
  urlType: string
  ctaLabel: string
  largeVariant: string
  alignmentVariant: string
  aesthetic: any
  primaryAction: ActionProps
  isMultiBlockContent: boolean
  parameterMap: parameterMapItems[]
  variant: string
}

interface DefaultErrors {
  search: boolean
  date: boolean
  specialCode: boolean
}

const initialErrors: DefaultErrors = {
  search: false,
  date: false,
  specialCode: false,
}

export interface HotelInformation {
  name: string
  id: string
  brandName: string
  hotelType: string
  hotelAddress: any
  synxisHotelId: string
}
export const guestTextGenerator = (roomsCount: any) => {
  let temp = {
    adult: 0,
    child: 0,
    text: "",
  }
  temp = roomsCount?.reduce(
    (prev: any, room: any) => ({
      ...prev,
      adult: prev?.adult + room?.adults,
      child: prev?.child + room?.child,
    }),
    temp,
  )
  temp.text = `${Pluralize(CONSTANTS?.ADULTS?.slice(0, 5), temp?.adult, false)}, ${temp?.child} ${
    temp?.child > 1 ? CONSTANTS?.CHILDREN : CONSTANTS?.CHILD
  } - ${Pluralize(CONSTANTS?.ROOM_SMALL, roomsCount?.length, false)}`
  return temp
}

export const handleHotelSearch = (event: any, setHotelInformation: any, setError: any, newValue?: any) => {
  const { name, value } = event?.target
  if (newValue && newValue?.name?.length > 0) {
    setHotelInformation((prev: any) => ({
      ...prev,
      name: newValue?.name,
      id: newValue?.brand_name?.toLowerCase() === "taj" ? newValue?.id : newValue?.identifier,
      brandName: newValue?.brand_name,
      hotelType: newValue?.hotel_type,
      hotelAddress: newValue?.hotelAddress,
      synxisHotelId: newValue?.synxis_hotel_id,
    }))
  } else {
    setHotelInformation((prev: any) => ({
      ...prev,
      name: value,
      id: "",
      brandName: "",
      hotelType: "",
      hotelAddress: "",
      synxisHotelId: "",
    }))
  }
  if (newValue) {
    setError((prev: any) => ({
      ...prev,
      search: newValue ? newValue?.name?.length === 0 : value?.length === 0,
    }))
  }
}

function BookAStayAccessCardComponent({
  title,
  aesthetic,
  parameterMap,
  primaryAction,
  alignmentVariant,
  variant,
  largeVariant,
  ...props
}: BookAStayCardComponentProps) {
  const router = useRouter()
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const context: any = useContext(IHCLContext)
  const { cardPadding } = useAesthetics(aesthetic?._ref)
  const modalStore = ModalStore.getInstance()
  const calendarRef = useRef<any>(null)
  const expandGuestRoomCountRef = useRef<any>(null)
  const withHyphens = alignmentVariant === "preceding-hyphen-title"
  const isCustomerLoggedIn = useLoggedIn()
  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const [selectedType, setSelectedType] = useState<string>("check_in")
  //* stores
  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore

  const searchStore = context.getGlobalStore(GLOBAL_STORES.searchStore) as SearchStore

  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(UserStore, gaStoreData)

  const {
    updateGuestDetails,
    setRoomsAvailability,
    setGuestBookingSchedule,
    setCheckAvailabilityPayload,
    setUserEnteredPromoCode,
    isCalendarLoading,
    setCalenderViewData,
    clearCalenderViewData,
    updateCalenderViewData,
  } = bookingFlowGlobalStore

  const routerArr = router?.asPath?.split("/")
  const userTier = global?.window?.localStorage?.getItem("userTier")
  const hotelRouteIndex = routerArr?.findIndex((route: any) => route === hotelRoute)
  const isHotelSpecificOfferDetailsPage = hotelRouteIndex === 1 && routerArr?.[hotelRouteIndex + 2] === offersRoute

  //* states
  const [suggestDropOpen, setSuggestDropDown] = useState<boolean>(true)
  const [open, setOpen] = useState<boolean>(false)
  const [dateKey, setDateKey] = useState<number>(0)
  const [guestCount, setGuestCount] = useState<number>(1)
  const [searchValue, setSearchValue] = useState<string>("")
  const [refresh, setRefresh] = useState<any>(new Date().getTime())
  const [error, setError] = useState<DefaultErrors>(initialErrors)
  const [expandGuestRoomCount, setExpandGuestRoomCount] = useState<boolean>(false)
  const [hotelInformation, setHotelInformation] = useState<HotelInformation | null>(null)
  const [specialCode, setSpecialCode] = useState<string>("")
  const [roomsCount, setRoomsCount] = useState([{ id: 1, adults: 1, child: 0, room: "ROOM", isSelected: false }])
  const [searchResultsResponseData, setResultsResponseData] = useState<any>([])
  const { searchResults } = searchStore
  const debouncedSearchTerm = useDebounce(hotelInformation, 300)

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchStore?.autoCompleteSearch(hotelInformation?.name ?? "")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, searchStore])
  const [guestInformation, setGuestInformation] = useState<any>({
    adult: 1,
    child: 0,
    text: "1 Adult, 0 Child - 1 Room",
  })
  const [date, setDate] = useState<any>([dayjs(getTomorrowDate()), dayjs(getDayAfterTomorrowDate())])

  useEffect(() => {
    if (open && calendarRef?.current) {
      calendarRef.current.scrollIntoView({
        block: "start",
        inline: "nearest",
        behavior: "smooth",
      })
    }
  }, [open])
  useEffect(() => {
    if (expandGuestRoomCount && expandGuestRoomCountRef?.current) {
      expandGuestRoomCountRef.current.scrollIntoView({
        block: "center",
        inline: "nearest",
        behavior: "smooth",
      })
    }
  }, [expandGuestRoomCount])

  const handleDateSelection = (pickedDate: any) => {
    const checkInDate = new Date(date?.[0])
    if (selectedType === "check_in") {
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

  const startDate = dateFormatConverter(date[0])
  const endDate = dateFormatConverter(date[1])

  useEffect(() => {
    if (searchResults?.hotels?.data?.length > 0) {
      setResultsResponseData([
        {
          hotelsData: JSON?.parse(JSON?.stringify(searchResults?.hotels?.data))?.slice(0, CONSTANTS?.FIVE),
        },
      ])
    } else {
      setResultsResponseData({
        hotelsData: [],
      })
    }
  }, [searchResults])
  useEffect(() => {
    setGuestInformation((prev: any) => guestTextGenerator(roomsCount))
  }, [roomsCount])

  useEffect(() => {
    setGuestBookingSchedule(startDate, endDate)
    setError((prev: any) => ({
      ...prev,
      date: startDate?.length === 0 || endDate?.length === 0,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate])
  //Analytics Event
  const handleHotelBooking = (navigateURL: any) => {
    const presentDate = new Date()
    const checkInDate = new Date(startDate)
    global?.window?.localStorage?.setItem("hotelJourneyPageType", "corporatePage")
    triggerEvent({
      action: "hotelSelected",
      params: {
        ...dataLayer,
        buttonLinkName: primaryAction?.title,
        link_url: navigateURL,
        link_text: primaryAction?.title,
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
        noOfAdults: guestInformation?.adult,
        noOfChild: guestInformation?.child,
        noOfRooms: roomsCount?.length,
        specialCode: "",
        brandName: hotelInformation?.brandName ? hotelInformation?.brandName : "",
        country: hotelInformation?.hotelAddress?.country ? hotelInformation?.hotelAddress?.country : "",
        city: hotelInformation?.hotelAddress?.city ? hotelInformation?.hotelAddress?.city : "",
        hotelName: hotelInformation?.name,
        hotelCode: hotelInformation?.synxisHotelId ? hotelInformation?.synxisHotelId : "",
        hotelType: hotelInformation?.hotelType ? hotelInformation?.hotelType : "",
        hotelCountry: hotelInformation?.hotelAddress?.country ? hotelInformation?.hotelAddress?.country : "",
        hotelCity: hotelInformation?.hotelAddress?.city ? hotelInformation?.hotelAddress?.city : "",
        hotelState: hotelInformation?.hotelAddress?.state ? hotelInformation?.hotelAddress?.state : "",
        hotelPinCode: hotelInformation?.hotelAddress?.pincode ? hotelInformation?.hotelAddress?.pincode : "",
        hotelbrand: hotelInformation?.brandName ? hotelInformation?.brandName : "",
        roomName: "",
        roomOffer: "",
        bunglowCode: "",
        clientId: getCookie("_ga")?.slice(6),
        pageTitle: navigateURL?.replaceAll("/", "").toUpperCase(),
        pageURL: `${global?.window?.location.origin}` + `${navigateURL}`,
        item_type: props?._type,
        widget_type: props?._type,
        pageSection: title,
        widget_title: title,
        pageHierarchy: JSON.parse(
          `["${TAJ_HOTELS}",` +
            `"${PAGE_LANG}",` +
            `"${hotelInformation?.brandName || ""}",` +
            `"${navigateURL?.replaceAll("/", "").toUpperCase()}"]`,
        ),
        location: hotelInformation?.hotelAddress?.city ? hotelInformation?.hotelAddress?.city : "",
        outbound: primaryAction?.urlType == "internal" ? false : true,
      },
    })
  }

  const handleRedirection = async () => {
    const URL = getNonTajBrandCrossURL(
      hotelInformation?.brandName || "",
      hotelInformation?.id || "",
      endDate,
      startDate,
      roomsCount,
      "",
      specialCode,
    )
    await CrossSiteNavigation({
      url: URL,
      loggedIn: isCustomerLoggedIn,
      userStore,
    })
  }
  //* API Call
  const handleBooking = async () => {
    updateGuestDetails({
      data: roomsCount,
    })
    let tempUserEnteredPayload: any = {
      title: "Business Connect Code",
      index: 3,
      agentId: null,
      promoCode: specialCode,
      couponCode: null,
      rateCode: null,
    }

    setUserEnteredPromoCode(tempUserEnteredPayload)
    setCheckAvailabilityPayload(
      guestInformation?.child,
      guestInformation?.adult,
      roomsCount?.length,
      endDate,
      startDate,
      hotelInformation?.id,
      fetchRateFilter() || undefined,
      global?.window?.localStorage?.getItem("userTier") || undefined,
      false,
      "",
      specialCode,
      "",
      "",
      false,
      true,
    )
    let navigateURL = `${ROUTES?.WITHOUTSEO_FOR_ROUTING?.BOOKING?.CART}?`
    if (hotelInformation?.brandName?.toLocaleLowerCase() !== "taj" && hotelInformation?.brandName) {
      handleRedirection()
    } else if (hotelInformation?.id) {
      navigateURL = `${navigateURL}` + `hotelId=${hotelInformation?.id}`
      if (tempUserEnteredPayload?.title) {
        navigateURL = `${navigateURL}` + `&sc=${tempUserEnteredPayload?.title}`
      }
      navigate(navigateURL)
      handleHotelBooking(navigateURL)
    }
    modalStore?.visibility && modalStore?.setVisibility(false)
  }

  const handleChange = ({ target: { name, value } }: any) => {
    setSpecialCode(value)
    setError((prev: any) => ({ ...prev, specialCode: value?.length === 0 }))
  }
  const checkInvalidFields = () => {
    setError((prev: any) => ({
      ...prev,
      specialCode: prev?.specialCode || specialCode?.length === 0,
      search:
        prev?.search ||
        hotelInformation?.name === undefined ||
        hotelInformation?.name === null ||
        hotelInformation?.name?.length === 0 ||
        hotelInformation?.id?.length === 0,
      date: !(startDate?.length > 0 && endDate?.length > 0 && date[0] && date[1]),
    }))
  }
  const handleSearchClose = () => {
    setError((prev: DefaultErrors) => ({
      ...prev,
      search: true,
    }))
    setHotelInformation((prev: any) => null)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const leads: any = bookingFlowGlobalStore?.calendarViewData || []

  useEffect(() => {
    setDateKey((prev: number) => prev + 1)
  }, [leads])

  // used to update calendar view
  const handleView = ({ view, activeStartDate, action }: any) => {
    const startDate = activeStartDate
    const endDate = AddNumberOfDays(activeStartDate, 62)
    const hasDate = (date: any) => leads.some((obj: any) => obj?.arrivalDate == dateFormatConverter(date))
    const hasBothDates = hasDate(startDate) && hasDate(getPreviousDate(endDate))
    if (view === "month") {
      if (hasBothDates && hotelInformation?.id) {
        return null
      } else {
        getCalendarData(startDate, endDate, true)
      }
    }
  }

  const getCalendarData = async (startDate: any, endDate: any, update: boolean) => {
    const calendarPayload = {
      hotelId: hotelInformation?.id,
      startDate: dateFormatConverter(startDate),
      endDate: dateFormatConverter(endDate),
      onlyCheckRequested: "true",
      rateFilter: fetchRateOnlyFilter(),
      lengthOfStay: 1,
      rateCode: "",
      promoCode: specialCode,
      promoType: "promotion",
      agentId: null,
      agentType: null,
    }
    update ? updateCalenderViewData(calendarPayload) : setCalenderViewData(calendarPayload)
  }

  useEffect(() => {
    if (hotelInformation?.id) {
      clearCalenderViewData()
      getCalendarData(
        firstDateOfSelectedMonth(new Date(date?.[0])) || getTodayDate(),
        AddNumberOfDays(firstDateOfSelectedMonth(new Date(date?.[0])) || getTodayDate(), 62),
        false,
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotelInformation?.id, userTier])

  const keypadCloseForExpandGuestRoom = () => {
    if (document?.activeElement instanceof HTMLInputElement) {
      document?.activeElement.blur()
    }
  }

  return (
    <Box
      ref={calendarRef}
      aria-label="BookAStayAccessCardComponent"
      sx={{
        padding: `${isMobile ? cardPadding?.mobile : cardPadding?.desktop}`,
        paddingBottom: !isMobile && open ? "11vw" : "unset",
      }}>
      <BookAStayCardComponentBox $mobile={isMobile} $isOffersCard={true}>
        {title && (
          <BookAStayCardTitleBox $mobile={isMobile}>
            {withHyphens && !isMobile && <BookAStayCardTitleDivider />}
            <Typography variant={isMobile ? "m-heading-s" : "heading-s"} component={"h2"}>
              {title}
            </Typography>
            {withHyphens && !isMobile && <BookAStayCardTitleDivider />}
          </BookAStayCardTitleBox>
        )}
        <FieldsContainer>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Autocomplete
                onOpen={() => {
                  if (global?.window !== undefined) {
                    document.body.style.overflow = "hidden"
                  }
                }}
                onClose={() => {
                  if (global?.window !== undefined) {
                    document.body.style.overflow = "auto"
                  }
                }}
                open={
                  ((!!hotelInformation?.name && searchResultsResponseData?.[0]?.hotelsData?.length > 0) ||
                    (searchResults?.message?.length > 0
                      ? true
                      : searchResultsResponseData?.[0]?.hotelsData?.length === 0 && !!hotelInformation?.name
                      ? true
                      : false)) &&
                  suggestDropOpen
                }
                disableClearable={searchValue?.length === 0}
                onInput={(event: any) => {
                  handleHotelSearch(event, setHotelInformation, setError)
                }}
                onKeyUpCapture={() => {
                  setSuggestDropDown(true)
                }}
                onChange={(event: any, newValue: any) => {
                  handleHotelSearch(event, setHotelInformation, setError, newValue)
                }}
                popupIcon={<ExpandMoreIcon />}
                sx={{
                  width: "100%",
                  "& .MuiAutocomplete-inputRoot": {
                    paddingRight: "0vw!important",
                  },
                }}
                disabled={isHotelSpecificOfferDetailsPage ? true : false}
                noOptionsText={
                  searchResults?.message?.length > 0
                    ? searchResults?.message
                    : searchResultsResponseData?.[0]?.hotelsData?.length === 0
                    ? "We cannot find the results for you search"
                    : ""
                }
                value={hotelInformation}
                getOptionLabel={(option: any) => option.name}
                options={hotelInformation?.name ? searchResultsResponseData?.[0]?.hotelsData || [] : []}
                PaperComponent={({ children }: any) => (
                  <Paper
                    sx={{
                      borderRadius: 0,
                      boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
                      backgroundColor: theme?.palette?.background.default,
                    }}
                    onClick={() => {
                      !!searchResultsResponseData?.[0] && setSuggestDropDown(false)
                    }}>
                    {children}
                  </Paper>
                )}
                renderOption={(props: any) => {
                  return (
                    <Box component={"div"}>
                      <Typography
                        {...props}
                        variant={isMobile ? "m-body-m" : "body-m"}
                        sx={{
                          fontWeight: "300",
                          margin: "1.04vw 0vw 1.04vw",
                          paddingLeft: "2.083vw!important",
                        }}>
                        {props.key}
                      </Typography>
                    </Box>
                  )
                }}
                renderInput={(params) => {
                  const { InputProps } = params
                  const temp = {
                    ...params,
                    InputProps: {
                      ...InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon
                            sx={{
                              height: "auto",
                              marginBottom: "0.22vw",
                              width: isMobile ? MobilePxToVw(22) : DesktopPxToVw(22),
                            }}
                          />
                        </InputAdornment>
                      ),
                      endAdornment: hotelInformation?.name && hotelInformation?.name?.length > 0 && (
                        <>
                          {isHotelSpecificOfferDetailsPage ? (
                            <></>
                          ) : (
                            <InputAdornment position="end">
                              <Box
                                component={"div"}
                                onClick={() => {
                                  handleSearchClose(), setSuggestDropDown(false)
                                }}>
                                <CloseIcon
                                  sx={{
                                    cursor: "pointer",
                                    height: isMobile ? "auto" : "0.8vw",
                                    width: isMobile ? "2.5vw" : "1vw",
                                  }}
                                />
                              </Box>
                            </InputAdornment>
                          )}
                        </>
                      ),
                    },
                  }
                  return <AutoCompleteInput variant="standard" name={"name"} placeholder="Find a Hotel" {...temp} />
                }}
              />
              <Box>
                {error?.search && (
                  <ErrorDisplayTypography
                    sx={{
                      marginBottom: isMobile ? "1.563vw" : "0.541vw",
                      position: "absolute",
                    }}>
                    {BookAStayErrorMessages?.HOTEL}
                  </ErrorDisplayTypography>
                )}
              </Box>
            </Box>
          </Box>
          <ColumnFlexBox sx={{ width: "100%" }}>
            <DatePickerContainer key={refresh}>
              <CustomDatePickerComponent
                date={date}
                isOpen={open}
                onChange={handleDateSelection}
                minDate={new Date()}
                calendarWidth={isMobile ? MobilePxToVw(476) : DesktopPxToVw(1400)}
                sx={{
                  "& .react-calendar": {
                    maxWidth: "fit-content",
                    "@media (max-width: 640px)": {
                      padding: `${MobilePxToVw(30)} ${MobilePxToVw(10)} !important`,
                    },
                  },
                }}
                calendarIcon={<CalenderIcon sx={{ width: isMobile ? "2.656vw" : "0.833vw" }} />}
                showDoubleView={isMobile ? false : true}
                isCalendarLoading={isCalendarLoading && open && hotelInformation?.id}
                selectRange={true}
                allowPartialRange
                onCalendarOpen={() => {
                  setOpen(true), keypadCloseForExpandGuestRoom()
                }}
                onCalendarClose={() => {
                  setRefresh(`${new Date().getTime()}`)
                  setOpen(false)
                }}
                onActiveStartDateChange={handleView}
                tileContent={({ activeStartDate, date, view }: any) =>
                  view === "month" &&
                  !isCalendarLoading &&
                  hotelInformation?.id && (
                    <CustomDateTileComponent leads={leads} date={date} key={dateKey}></CustomDateTileComponent>
                  )
                }
                tileDisabled={({ activeStartDate, date, view }: any) => {
                  const filteredDate =
                    leads && leads?.filter((item: any) => item?.arrivalDate == dateFormatConverter(date))?.[0]
                  return (
                    isCalendarLoading ||
                    (!filteredDate?.available &&
                      view === "month" &&
                      !isCalendarLoading &&
                      selectedType === "check_in" &&
                      hotelInformation?.id)
                  )
                }}
                focusSelectedMonth={true}
                renderComponent={
                  <Stack
                    alignItems={"center"}
                    flexDirection={"row"}
                    onClick={() => {
                      setOpen(!open)
                    }}
                    columnGap={DesktopPxToVw(10)}>
                    <Typography
                      onClick={() => setSelectedType("check_in")}
                      letterSpacing={"-0.05rem"}
                      whiteSpace={"nowrap"}
                      color={theme.palette.ihclPalette.Seventeen}
                      //added color for default date as well, till now we had only to check-in
                      variant={isMobile ? "m-body-l" : "body-l"}>
                      {date?.[0] ? formatDateWithMON(date?.[0]) : "Check in"}
                    </Typography>
                    <StyledDivider sx={{ width: `${DesktopPxToVw(30)} !important` }} />
                    <Typography
                      letterSpacing={"-0.05rem"}
                      whiteSpace={"nowrap"}
                      onClick={() => setSelectedType("check_out")}
                      color={theme.palette.ihclPalette.hexSeventeen}
                      variant={isMobile ? "m-body-l" : "body-l"}>
                      {date?.[1] ? formatDateWithMON(date?.[1]) : "Check out"}
                    </Typography>
                  </Stack>
                }
              />
            </DatePickerContainer>
            {error?.date && (
              <Box position={"relative"} width={"100%"}>
                <ErrorDisplayTypography position={"absolute"}>{BookAStayErrorMessages?.DATE}</ErrorDisplayTypography>
              </Box>
            )}
          </ColumnFlexBox>
          <FullBox
            ref={expandGuestRoomCountRef}
            sx={{ display: "flex", flexDirection: "column" }}
            onClick={() => setExpandGuestRoomCount(!expandGuestRoomCount)}>
            <Input
              inputProps={{
                style: {
                  fontWeight: 300,
                  fontSize: isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
                  fontFamily: "Inter",
                },
              }}
              sx={{ width: isMobile ? "100%" : "17.708vw" }}
              onClick={(e: any) => {
                setExpandGuestRoomCount((prev: boolean) => !prev), keypadCloseForExpandGuestRoom()
              }}
              onKeyDown={(e: any) => e?.preventDefault()}
              endAdornment={
                <InputAdornment sx={{ cursor: "pointer" }} position="end">
                  <KeyboardArrowDownOutlined
                    sx={{
                      width: isMobile ? MobilePxToVw(24) : "1.5vw",
                    }}
                  />
                </InputAdornment>
              }
              value={guestInformation?.text}
            />
            {expandGuestRoomCount && (
              <GuestRoomContainer>
                <GuestRoomComponent
                  top={"0vw"}
                  right={isMobile ? "" : "-1.5vw"}
                  roomsCount={roomsCount}
                  setRoomsCount={setRoomsCount}
                  setGuestCount={setGuestCount}
                  expandGuestRoomCount={expandGuestRoomCount}
                  setExpandGuestRoomCount={setExpandGuestRoomCount}
                  isComplementary={false}
                />
              </GuestRoomContainer>
            )}
          </FullBox>
        </FieldsContainer>

        <Stack width={"100%"} alignItems={"center"} mt={isMobile ? MobilePxToVw(25) : DesktopPxToVw(40)}>
          <InputTextField
            variant="standard"
            sx={{
              width: isMobile ? "100%" : "22.604vw",
            }}
            placeholder={parameterMap?.[3]?.value}
            value={specialCode}
            helperText={error?.specialCode && `Please enter valid ${parameterMap?.[3]?.value?.toLowerCase()}`}
            onChange={handleChange}
          />
        </Stack>
        {primaryAction && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingTop: isMobile ? "8.594vw" : "3.125vw",
            }}>
            <RenderActionItem
              onClick={() => {
                if (
                  date[0] &&
                  date[1] &&
                  !error?.search &&
                  hotelInformation?.name &&
                  hotelInformation?.name?.length > 0 &&
                  hotelInformation?.id &&
                  hotelInformation?.id?.length > 0 &&
                  specialCode?.length > 0 &&
                  !error?.specialCode
                )
                  handleBooking()
                else {
                  checkInvalidFields()
                }
              }}
              url={primaryAction?.url}
              isActionButtonType={true}
              title={primaryAction?.title || "SUBMIT"}
              variant={primaryAction?.variant}
              navigationType={primaryAction?.urlType}
              buttonStyles={{
                letterSpacing: "0.1em",
              }}
            />
          </Box>
        )}
      </BookAStayCardComponentBox>
    </Box>
  )
}

export default observer(BookAStayAccessCardComponent)
