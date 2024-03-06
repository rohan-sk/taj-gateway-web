import React, { useContext, useEffect, useRef, useState } from "react"
import dayjs from "dayjs"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { theme } from "../../lib/theme"
import { observer } from "mobx-react-lite"
import { ROUTES } from "../../utils/routes"
import Pluralize from "../../utils/pluralize"
import {
  CONSTANTS,
  CouponCugType,
  GINGER_BRAND_NAME,
  TravelAgencyCugType,
  CorporateAccessCugType,
  VoucherCugType,
} from "../constants"
import { GLOBAL_STORES } from "../../utils/Constants"
import { useMobileCheck } from "../../utils/isMobilView"
import fetchRateFilter from "../../utils/fetchRateFilter"
import OffersStore from "../../store/global/offers.store"
import { useAppNavigation } from "../../utils/NavigationUtility"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { ActionProps, parameterMapItems } from "../types"
import {
  getTomorrowDate,
  getDayAfterTomorrowDate,
  formatDateWithMON,
  dateFormatConverter,
  differenceInDays,
  getTodayDate,
  firstDateOfSelectedMonth,
  getPreviousDate,
  addDaysToDate,
} from "../../utils/getDate"
import { KeyboardArrowDownOutlined } from "@mui/icons-material"
import { KeyboardArrowUpOutlined } from "@mui/icons-material"
import { ExpandMoreIcon } from "../header/styles/booking-menu"
import { BookAStayErrorMessages } from "../forms/gift-card-form/constants"
import { CalenderIcon, CloseIcon, SearchIcon } from "../../utils/customIcons"
import { ErrorDisplayTypography } from "../forms/business-form/business-sme-form"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { Autocomplete, Box, Input, InputAdornment, Paper, Stack, Typography } from "@mui/material"
import BookingFlowGlobalStore from "../../features/booking/store/globalStore/booking.flow.store"
import AddNumberOfDays from "../../utils/addDaysToGivenDate"
import fetchRateOnlyFilter from "../../utils/fetchRateOnlyFilterForCalendar"
import { hotelRoute, offersRoute } from "../../features/property/ui/constants"
import { GAStore, PropertyStore, UserStore } from "../../store"
import { triggerEvent } from "../../utils/analytics"
import { getCookie } from "../../utils/cookie"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
import { PAGE_LANG, TAJ_HOTELS } from "../../utils/analytics/constants"
import { fetchAllHotels } from "../../lib/utils"
import { getListWithBrandSorting } from "../../utils/getListWithBrandSorting"
import getNonTajBrandCrossURL from "../../utils/getCrossBrandURL"
import { CrossSiteNavigation } from "../../utils/sso/cross-site-navigation"
import { useLoggedIn } from "../../utils/hooks/useLoggedIn"
import {
  FieldsContainer,
  GuestRoomContainer,
  AutoCompleteInput,
  DatePickerContainer,
  BookAStayCardTitleBox,
  BookAStayCardTitleDivider,
  BookAStayCardComponentBox,
} from "./styles/book-a-stay-default-card.styles"
import { StyledDivider } from "../banner/styles"
import { ArrowBox, FullBox } from "../MyAccount/booking-history/booking-styles"
import { InputTextField } from "../forms/enquiry-forms/news-letter-form/news-letter-form.styles"
import { ColumnFlexBox } from "../forms/enquiry-forms/khazana-enquiry-form/khazana-enquiry-form.styles"
import { PathType } from "../../types"

const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
const GuestRoomComponent = dynamic(() => import("../banner/guestRooms/GuestRoomComponent"))
const CustomDateTileComponent = dynamic(() => import("../hoc/CustomDatePicker/custom-date-tile.component"))
const CustomDatePickerComponent = dynamic(() => import("../hoc/CustomDatePicker/custom-date-picker.component"))

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
  hotelName: string
  hotelId: string
  brandName: string
  hotelType: string
  hotelAddress: any
  synxisHotelId: string
  identifier?: string
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

const getPlaceHolder = (cugType: string) => {
  switch (cugType?.toLowerCase()) {
    case TravelAgencyCugType:
      return "Travel Agency Code"
    case CouponCugType:
      return "Coupon Code"
    case CorporateAccessCugType:
      return "Corporate Access Code"
    default:
      return ""
  }
}

export const handleHotelSearch = (
  event: any,
  setHotelInformation: any,
  setError: any,
  newValue?: any,
  setUserEnteredPromoCode?: any,
) => {
  const { name, value } = event?.target
  if (newValue && newValue?.hotelName?.length > 0) {
    setHotelInformation((prev: any) => ({
      ...prev,
      hotelName: newValue?.hotelName,
      hotelId: newValue?.hotelId,
      brandName: newValue?.brandName,
      hotelType: newValue?.searchTaxonomies?.hotelType,
      hotelAddress: newValue?.hotelAddress,
      synxisHotelId: newValue?.searchTaxonomies?.synxisHotelId,
      identifier: newValue?.identifier,
    }))
    if (newValue?.brandName?.toLowerCase() === GINGER_BRAND_NAME?.toLowerCase() && setUserEnteredPromoCode) {
      setUserEnteredPromoCode({
        title: "",
        index: null,
        agentId: null,
        promoCode: null,
        couponCode: null,
      })
    }
  } else {
    setHotelInformation((prev: any) => ({
      ...prev,
      hotelName: value,
      hotelId: "",
      brandName: "",
      hotelType: "",
      hotelAddress: "",
      synxisHotelId: "",
      identifier: "",
    }))
  }
  setError((prev: any) => ({
    ...prev,
    search: newValue ? newValue?.hotelName?.length === 0 : value?.length === 0,
  }))
}

function BookAStayDefaultCardComponent({
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
  const calendarRef = useRef<any>(null)
  const isCustomerLoggedIn = useLoggedIn()
  const context: any = useContext(IHCLContext)
  const expandGuestRoomCountRef = useRef<any>(null)
  const withHyphens = alignmentVariant === "preceding-hyphen-title"

  //* stores
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const offerStore = context?.getGlobalStore(GLOBAL_STORES.offerStore) as OffersStore
  const propertyStore = context?.getGlobalStore(GLOBAL_STORES.propertyStore) as PropertyStore
  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore

  const dataLayer = MemberDataLayer(userStore, gaStoreData)
  const {
    updateGuestDetails,
    setGuestBookingSchedule,
    setCheckAvailabilityPayload,
    setUserEnteredPromoCode,
    isCalendarLoading,
    setCalenderViewData,
    clearCalenderViewData,
    updateCalenderViewData,
    setIsSelectedComplimentaryVoucher,
  } = bookingFlowGlobalStore

  const routerArr = router?.asPath?.split("/")
  const cugType = offerStore?.offersData?.cugType?.toLowerCase()
  const lengthOfStay = offerStore?.offersData?.lengthOfStay || 1
  const userTier = global?.window?.localStorage?.getItem("userTier")
  const isCUGOffer = offerStore?.offersData?.offerType?.toLowerCase() === "cug" //? Using to disable the header in room listing page
  const isFieldValidCUGType = [CorporateAccessCugType, TravelAgencyCugType, CouponCugType]
  const hotelRouteIndex = routerArr?.findIndex((route: any) => route === hotelRoute)
  const isHotelSpecificOfferDetailsPage = hotelRouteIndex === 1 && routerArr?.[hotelRouteIndex + 2] === offersRoute
  const isCugAvailable =
    offerStore?.offersData?.cugType &&
    offerStore?.offersData?.cugType?.length > 0 &&
    isFieldValidCUGType?.includes(offerStore?.offersData?.cugType?.toLowerCase())

  //* states
  const [open, setOpen] = useState<boolean>(false)
  const [dateKey, setDateKey] = useState<number>(0)
  const [guestCount, setGuestCount] = useState<number>(1)
  const [searchValue, setSearchValue] = useState<string>("")
  const [specialCode, setSpecialCode] = useState<string>("")
  const [refresh, setRefresh] = useState<any>(new Date().getTime())
  const [error, setError] = useState<DefaultErrors>(initialErrors)
  const [selectedType, setSelectedType] = useState<string>("check_in")
  const [showHotelListing, setShowHotelListing] = useState<boolean>(false)
  const [participatingHotels, setParticipatingHotels] = useState<any[]>([])
  const [expandGuestRoomCount, setExpandGuestRoomCount] = useState<boolean>(false)
  const [hotelInformation, setHotelInformation] = useState<HotelInformation | null>(null)
  const [roomsCount, setRoomsCount] = useState([{ id: 1, adults: 1, child: 0, room: "ROOM", isSelected: false }])
  const [guestInformation, setGuestInformation] = useState<any>({
    adult: 1,
    child: 0,
    text: "1 Adult, 0 Child - 1 Room",
  })
  const [date, setDate] = useState<any>([
    dayjs(getTomorrowDate()),
    dayjs(lengthOfStay ? addDaysToDate(getTomorrowDate(), lengthOfStay) : getDayAfterTomorrowDate()),
  ])

  const getAddButtonState = () => {
    // for Coupon Code
    if (cugType === CouponCugType) {
      return error?.specialCode || roomsCount?.length > 1 || isGinger
    } else if (cugType === TravelAgencyCugType) {
      // for Travel Agency Code
      return error?.specialCode || isGinger
    } else {
      // for Other Codes
      return error?.specialCode
    }
  }

  useEffect(() => {
    if (isHotelSpecificOfferDetailsPage) {
      setHotelInformation((prev: any) => ({
        ...prev,
        hotelName: propertyStore?.propertyData?.hotelName,
        hotelId: propertyStore?.propertyData?.hotelId,
        brandName: propertyStore?.propertyData?.brandName,
        hotelType: propertyStore?.propertyData?.searchTaxonomies?.hotelType,
        hotelAddress: propertyStore?.propertyData?.hotelAddress,
        synxisHotelId: propertyStore?.propertyData?.searchTaxonomies?.synxisHotelId,
        identifier: propertyStore?.propertyData?.identifier,
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    hotelRouteIndex,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    offerStore?.offersData?.hotels?.participatingHotels,
  ])

  const isGinger = hotelInformation?.brandName?.toLowerCase() === GINGER_BRAND_NAME?.toLowerCase()

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
      setDate([pickedDate?.[0], addDaysToDate(pickedDate?.[0], lengthOfStay ? lengthOfStay : 1)])
      setSelectedType("check_out")
      setOpen(true)
    } else if (
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
  }

  const startDate = dateFormatConverter(date[0])
  const endDate = dateFormatConverter(date[1])

  useEffect(() => {
    async function fetchData() {
      const allParticipatingHotelsData: any = []
      if (!isHotelSpecificOfferDetailsPage) {
        offerStore?.offersData?.hotels?.map((val: any) => {
          val?.participatingHotels.map((hotel: any) => {
            allParticipatingHotelsData.push({ ...hotel })
          })
        })
      }

      let collectedData =
        Object?.keys(offerStore?.offersData)?.length > 0
          ? isHotelSpecificOfferDetailsPage
            ? offerStore?.offersData?.hotels?.participatingHotels
            : allParticipatingHotelsData
          : offerStore?.vouchersData?.participatingHotels || []
      setParticipatingHotels(
        collectedData?.length > 0 ? collectedData?.filter((item: any) => item) : await fetchAllHotels(),
      )
    }
    fetchData()
  }, [isHotelSpecificOfferDetailsPage, offerStore])

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

  //?Analytics Event
  const handleHotelBooking = (navigateURL: any) => {
    const presentDate = new Date()
    const checkInDate = new Date(startDate)
    global?.window?.localStorage?.setItem("hotelJourneyPageType", "unwindWoyagePage")
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
        hotelName: hotelInformation?.hotelName,
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
      hotelInformation?.identifier || "",
      endDate,
      startDate,
      roomsCount,
      "",
      offerStore?.offersData?.promoCode || offerStore?.vouchersData?.promoCode,
      offerStore?.offersData?.rateCode,
      cugType === TravelAgencyCugType ? specialCode : "",
      cugType === CouponCugType ? specialCode : "",
      hotelInformation?.synxisHotelId,
    )
    if (offerStore?.offersData?.memberSpecific && !isCustomerLoggedIn) {
      localStorage?.setItem("gotoAfterLogin", `${URL}`)
      localStorage?.setItem("gotoAfterLoginType", PathType?.external)
      navigate(ROUTES?.WITHOUTSEO_FOR_ROUTING?.SSO?.LOGIN, PathType?.dialog)
    } else {
      await CrossSiteNavigation({
        url: offerStore?.vouchersData?.iscomplementary ? `${URL}${window?.location?.search?.slice(1)}` : URL,
        loggedIn: isCustomerLoggedIn,
        userStore,
      })
    }
  }

  //* API Call
  const handleBooking = async () => {
    updateGuestDetails({
      data: roomsCount,
    })
    let tempUserEnteredPayload: any = {
      title: "Special Offer Code",
      index: offerStore?.offersData?.rateCode
        ? null
        : offerStore?.offersData?.promoCode || offerStore?.vouchersData?.promoCode
        ? 5
        : null,
      agentId: null,
      promoCode: (offerStore?.offersData?.promoCode || offerStore?.vouchersData?.promoCode) ?? null,
      couponCode: null,
      rateCode: null,
    }
    if (cugType === CouponCugType) {
      tempUserEnteredPayload = {
        ...tempUserEnteredPayload,
        title: "Coupon Code",
        index: 6, //coupon code index
        couponCode: specialCode,
      }
    } else if (cugType === TravelAgencyCugType) {
      tempUserEnteredPayload = {
        ...tempUserEnteredPayload,
        title: "Travel Agency Code",
        index: 2, //Travel agency index
        agentId: specialCode,
      }
    } else if (cugType === CorporateAccessCugType) {
      tempUserEnteredPayload = {
        ...tempUserEnteredPayload,
        title: "Corporate Access Code",
        index: 1, //corporate access index
        promoCode: specialCode,
      }
    }
    setUserEnteredPromoCode(tempUserEnteredPayload)

    if (offerStore?.vouchersData?.iscomplementary) {
      setIsSelectedComplimentaryVoucher(true)
    }
    setCheckAvailabilityPayload(
      guestInformation?.child,
      guestInformation?.adult,
      roomsCount?.length,
      endDate,
      startDate,
      hotelInformation?.hotelId,
      fetchRateFilter() || undefined,
      global?.window?.localStorage?.getItem("userTier") || undefined,
      offerStore?.vouchersData?.promoCode ? false : true,
      offerStore?.offersData?.rateCode,
      offerStore?.offersData?.promoCode || offerStore?.vouchersData?.promoCode,
      cugType === CouponCugType ? specialCode : "",
      cugType === TravelAgencyCugType ? specialCode : "",
      offerStore?.vouchersData?.promoCode ? true : false,
      false,
      offerStore?.offersData?.memberType,
    )
    let navigateURL = `${ROUTES?.WITHOUTSEO_FOR_ROUTING?.BOOKING?.CART}?`
    if (hotelInformation?.brandName?.toLocaleLowerCase() !== "taj" && hotelInformation?.brandName) {
      handleRedirection()
    } else {
      if (hotelInformation?.hotelId) {
        navigateURL = `${navigateURL}` + `hotelId=${hotelInformation?.hotelId}`
      }
      if (lengthOfStay) {
        navigateURL = `${navigateURL}` + `&minLOS=${lengthOfStay}`
      }
      if (offerStore?.offersData?.title) {
        navigateURL =
          `${navigateURL}` +
          `&offerName=${offerStore?.offersData?.title}` +
          `${isHotelSpecificOfferDetailsPage ? "" : "&isFromOLP=true"}`
      }
      if (offerStore?.vouchersData?.promoCode) {
        navigateURL = `${navigateURL}` + `&isFromVoucher=true&voucherPromoCode=${offerStore?.vouchersData?.promoCode}`
      }
      if (offerStore?.offersData?.rateCode) {
        navigateURL = `${navigateURL}` + `&offerRateCode=${offerStore?.offersData?.rateCode}`
      }
      if (offerStore?.offersData?.promoCode) {
        if (cugType === CorporateAccessCugType) {
          navigateURL = `${navigateURL}` + `&offerPromoCode=${specialCode}`
        } else {
          navigateURL = `${navigateURL}` + `&offerPromoCode=${offerStore?.offersData?.promoCode}`
        }
      }
      if (cugType === VoucherCugType) {
        navigateURL = `${navigateURL}` + `&cugOfferType=${cugType}`
      }
      if (offerStore?.offersData?.memberType) {
        navigateURL = `${navigateURL}` + `&memberOfferType=${offerStore?.offersData?.memberType}`
      }
      if (offerStore?.vouchersData?.iscomplementary) {
        navigateURL = `${navigateURL}` + `&isComplementaryVoucher=${offerStore?.vouchersData?.iscomplementary}`
      }
      if (isCUGOffer) {
        navigateURL = `${navigateURL}` + `&isCUGOffer=${true}`
      }
      if (tempUserEnteredPayload?.title) {
        navigateURL = `${navigateURL}` + `&sc=${tempUserEnteredPayload?.title}`
      }
      if (offerStore?.offersData?.memberSpecific && !isCustomerLoggedIn) {
        localStorage?.setItem("gotoAfterLogin", `${navigateURL}`)
        navigate(ROUTES?.WITHOUTSEO_FOR_ROUTING?.SSO?.LOGIN, PathType?.dialog)
      } else {
        navigate(navigateURL)
        handleHotelBooking(navigateURL)
      }
    }
  }

  const handleSpecialCode = (e: any) => {
    const { name, value } = e?.target
    // const specialCodeRegex = /^[A-Za-z0-9]+$/
    // if (value?.length === 0 || specialCodeRegex?.test(value)) {
    setSpecialCode(value)
    setError((prev: DefaultErrors) => ({
      ...prev,
      specialCode: value?.length === 0,
    }))
    // }
  }
  const checkInvalidFields = () => {
    setError((prev: any) => ({
      ...prev,
      specialCode: isCugAvailable ? specialCode?.length === 0 : false,
      search:
        prev?.search ||
        hotelInformation?.hotelName === undefined ||
        hotelInformation?.hotelName === null ||
        hotelInformation?.hotelName?.length === 0,
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
    if (
      view === "month" &&
      hotelInformation?.hotelId &&
      hotelInformation?.hotelId?.toLocaleLowerCase() !== "null" &&
      hotelInformation?.hotelId?.toLocaleLowerCase() !== null &&
      hotelInformation?.brandName?.toLowerCase() === "taj"
    ) {
      if (hasBothDates) {
        return null
      } else {
        getCalendarData(startDate, endDate, true)
      }
    }
  }

  const getCalendarData = async (startDate: any, endDate: any, update: boolean) => {
    const calendarPayload = {
      hotelId: hotelInformation?.hotelId,
      startDate: dateFormatConverter(startDate),
      endDate: dateFormatConverter(endDate),
      onlyCheckRequested: "true",
      rateFilter: fetchRateOnlyFilter(),
      lengthOfStay: lengthOfStay || 1,
      rateCode: offerStore?.offersData?.rateCode,
      promoCode:
        cugType === CorporateAccessCugType
          ? specialCode
          : offerStore?.offersData?.promoCode || offerStore?.vouchersData?.promoCode,
      promoType: offerStore?.offersData?.promoCode || offerStore?.vouchersData?.promoCode ? "promotion" : null,
      agentId: null,
      agentType: null,
    }
    update ? updateCalenderViewData(calendarPayload) : setCalenderViewData(calendarPayload)
  }

  useEffect(() => {
    if (hotelInformation?.hotelId) {
      clearCalenderViewData()
      getCalendarData(
        firstDateOfSelectedMonth(new Date(date?.[0])) || getTodayDate(),
        AddNumberOfDays(firstDateOfSelectedMonth(new Date(date?.[0])) || getTodayDate(), 62),
        false,
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotelInformation?.hotelId, userTier])

  const keypadCloseForExpandGuestRoom = () => {
    if (document?.activeElement instanceof HTMLInputElement) {
      document?.activeElement.blur()
    }
  }

  useEffect(() => {
    const body = document?.body?.style
    const headerElementNav = document?.getElementById("main__Header_nav")
    const documentWidth = document.documentElement.clientWidth
    const scrollbarWidth = Math.abs(global?.window?.innerWidth - documentWidth)
    if (showHotelListing) {
      body.paddingRight = `${scrollbarWidth}px`
      if (headerElementNav) {
        headerElementNav.style.paddingRight = `${scrollbarWidth}px`
      }
      body.overflow = "hidden"
    } else {
      body.overflow = "auto"
      body.paddingRight = "0"
      if (headerElementNav) {
        headerElementNav.style.paddingRight = "0"
      }
    }
  }, [showHotelListing])

  return (
    <>
      {!offerStore?.offersData?.hideBookNowWidget && (
        <Box
          ref={calendarRef}
          aria-label="BookAStayDefaultCardComponent"
          sx={{
            padding: isMobile ? aesthetic?.padding?.mobile : aesthetic?.padding?.desktop,
          }}>
          <BookAStayCardComponentBox $mobile={isMobile}>
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
                      setShowHotelListing(true)
                    }}
                    onClose={() => {
                      setShowHotelListing(false)
                    }}
                    disableClearable={searchValue?.length === 0}
                    onInput={(event: any) => handleHotelSearch(event, setHotelInformation, setError)}
                    onChange={(event: any, newValue: any) => {
                      handleHotelSearch(event, setHotelInformation, setError, newValue, setUserEnteredPromoCode)
                    }}
                    popupIcon={<ExpandMoreIcon />}
                    sx={{
                      width: "100%",
                      "& .MuiAutocomplete-inputRoot": {
                        paddingRight: "0vw!important",
                      },
                    }}
                    disabled={isHotelSpecificOfferDetailsPage ? true : false}
                    noOptionsText={"No results found for your search"}
                    value={hotelInformation}
                    getOptionLabel={(option: any) => option?.hotelName}
                    options={
                      participatingHotels?.length > 0
                        ? hotelInformation == null || hotelInformation?.hotelName?.length === 0
                          ? getListWithBrandSorting(participatingHotels)
                          : getListWithBrandSorting(participatingHotels)
                        : []
                    }
                    PaperComponent={({ children }: any) => (
                      <Paper
                        sx={{
                          borderRadius: 0,
                          boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
                          backgroundColor: theme?.palette?.background.default,
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
                          endAdornment: hotelInformation?.hotelName && hotelInformation?.hotelName?.length > 0 && (
                            <>
                              {isHotelSpecificOfferDetailsPage ? (
                                <></>
                              ) : (
                                <InputAdornment position="end">
                                  <Box component={"div"} onClick={() => handleSearchClose()}>
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
                    calendarWidth={isMobile ? MobilePxToVw(476) : DesktopPxToVw(1158)}
                    sx={{
                      "@media (max-width: 640px)": {
                        "& .react-calendar": {
                          padding: `${MobilePxToVw(30)} ${MobilePxToVw(10)} !important`,
                        },
                      },
                    }}
                    calendarIcon={<CalenderIcon sx={{ width: isMobile ? "2.656vw" : "0.833vw" }} />}
                    showDoubleView={isMobile ? false : true}
                    isCalendarLoading={isCalendarLoading && open && hotelInformation?.hotelId}
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
                      hotelInformation?.hotelId && (
                        <CustomDateTileComponent
                          leads={leads}
                          date={date}
                          key={dateKey}
                          lengthOfStay={lengthOfStay}
                          isComplementary={offerStore?.vouchersData?.iscomplementary}
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
                          !isCalendarLoading &&
                          selectedType === "check_in" &&
                          hotelInformation?.hotelId)
                      )
                    }}
                    focusSelectedMonth={true}
                    renderComponent={
                      <Stack
                        alignItems={"center"}
                        flexDirection={"row"}
                        onClick={() => setOpen(!open)}
                        columnGap={DesktopPxToVw(10)}>
                        <Typography
                          whiteSpace={"nowrap"}
                          color={theme.palette.neuPalette.Seventeen}
                          onClick={() => setSelectedType("check_in")}
                          variant={isMobile ? "m-body-l" : "body-l"}>
                          {date?.[0] ? formatDateWithMON(date?.[0]) : "Check in"}
                        </Typography>
                        <StyledDivider sx={{ width: `${DesktopPxToVw(30)} !important` }} />
                        <Typography
                          whiteSpace={"nowrap"}
                          color={theme.palette.neuPalette.hexSeventeen}
                          onClick={() => setSelectedType("check_out")}
                          variant={isMobile ? "m-body-l" : "body-l"}>
                          {date?.[1] ? formatDateWithMON(date?.[1]) : "Check out"}
                        </Typography>
                      </Stack>
                    }
                  />
                </DatePickerContainer>
                {error?.date && (
                  <Box position={"relative"} width={"100%"}>
                    <ErrorDisplayTypography position={"absolute"}>
                      {BookAStayErrorMessages?.DATE}
                    </ErrorDisplayTypography>
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
                    <InputAdornment position="end">
                      <ArrowBox>
                        {expandGuestRoomCount ? <KeyboardArrowUpOutlined /> : <KeyboardArrowDownOutlined />}
                      </ArrowBox>
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
                      isComplementary={offerStore?.vouchersData?.iscomplementary}
                      cugType={cugType}
                    />
                  </GuestRoomContainer>
                )}
              </FullBox>
            </FieldsContainer>
            {isCugAvailable && (
              <Stack width={"100%"} alignItems={"center"} mt={isMobile ? MobilePxToVw(25) : DesktopPxToVw(40)}>
                <InputTextField
                  variant="standard"
                  disabled={specialCode?.length > 0 ? getAddButtonState() : false}
                  sx={{
                    width: isMobile ? "100%" : "22.604vw",
                    "& input": {
                      WebkitBoxShadow: `0 0 0 50px ${theme?.palette?.background?.paper} inset !important`,
                    },
                    "& .MuiFormHelperText-root": {
                      fontWeight: "400 !important",
                    },
                  }}
                  placeholder={getPlaceHolder(cugType || "")}
                  name={cugType}
                  value={specialCode}
                  helperText={
                    isGinger && cugType === CouponCugType
                      ? CONSTANTS?.COUPON_CODE_ERROR_MESSAGE
                      : isGinger && cugType === TravelAgencyCugType
                      ? CONSTANTS?.TRAVEL_AGENCY_ERROR_MESSAGE
                      : error?.specialCode
                      ? `Please enter valid ${getPlaceHolder(cugType || "")?.toLowerCase()}`
                      : ""
                  }
                  onChange={handleSpecialCode}
                />
              </Stack>
            )}
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
                      hotelInformation?.hotelName &&
                      (isCugAvailable ? specialCode && !error?.specialCode : true) &&
                      hotelInformation?.hotelName?.length > 0
                    )
                      handleBooking()
                    else {
                      checkInvalidFields()
                    }
                  }}
                  url={primaryAction?.url}
                  isActionButtonType={true}
                  title={
                    offerStore?.offersData?.memberSpecific && !isCustomerLoggedIn
                      ? CONSTANTS?.LOGIN_JOIN
                      : primaryAction?.title
                  }
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
      )}
    </>
  )
}

export default observer(BookAStayDefaultCardComponent)
