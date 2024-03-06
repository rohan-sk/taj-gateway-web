import React, { useContext, useEffect, useRef, useState } from "react"
import dayjs from "dayjs"
import dynamic from "next/dynamic"
import { theme } from "../../lib/theme"
import { observer } from "mobx-react-lite"
import { ROUTES } from "../../utils/routes"
import Pluralize from "../../utils/pluralize"
import { CONSTANTS, ICONS } from "../constants"
import { GLOBAL_STORES } from "../../utils/Constants"
import { useMobileCheck } from "../../utils/isMobilView"
import fetchRateFilter from "../../utils/fetchRateFilter"
import OffersStore from "../../store/global/offers.store"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { useAppNavigation } from "../../utils/NavigationUtility"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { ActionProps, aestheticItems, parameterMapItems } from "../types"
import {
  getTomorrowDate,
  formatDateWithMON,
  dateFormatConverter,
  differenceInDays,
  getTodayDate,
  getPreviousDate,
  addDaysToDate,
  getDayAfterTomorrowDate,
} from "../../utils/getDate"
import { ExpandMoreIcon } from "../header/styles/booking-menu"
import { CalenderIcon, CloseIcon, SearchIcon } from "../../utils/customIcons"
import { ErrorDisplayTypography } from "../forms/business-form/business-sme-form"
import { KeyboardArrowDown, KeyboardArrowDownOutlined } from "@mui/icons-material"
import { BookAStayErrorMessages, Error_icon } from "../forms/gift-card-form/constants"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  Box,
  Input,
  Paper,
  Select,
  Stack,
  Typography,
  Autocomplete,
  InputAdornment,
  ClickAwayListener,
} from "@mui/material"
import { holidaysRoute, hotelRoute, offersRoute } from "../../features/property/ui/constants"
import BookingFlowGlobalStore from "../../features/booking/store/globalStore/booking.flow.store"
import { groq } from "next-sanity"
import { useRouter } from "next/router"
import { getClient } from "../../lib-sanity"
import { getCookie } from "../../utils/cookie"
import { triggerEvent } from "../../utils/analytics"
import ModalStore from "../../store/global/modal.store"
import { useLoggedIn } from "../../utils/hooks/useLoggedIn"
import AddNumberOfDays from "../../utils/addDaysToGivenDate"
import { GAStore, PropertyStore, UserStore } from "../../store"
import getNonTajBrandCrossURL from "../../utils/getCrossBrandURL"
import { PAGE_LANG, TAJ_HOTELS } from "../../utils/analytics/constants"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
import fetchRateOnlyFilter from "../../utils/fetchRateOnlyFilterForCalendar"
import { CrossSiteNavigation } from "../../utils/sso/cross-site-navigation"
import {
  BookAStayCardComponentBox,
  FieldsContainer,
  GuestRoomContainer,
  AutoCompleteInput,
  DatePickerContainer,
  BookAStayCardTitleBox,
  BookAStayCardTitleDivider,
} from "./styles/book-a-stay-default-card.styles"
import {
  NewsLetterMenuItem,
  NewsLetterFormControl,
  NewsLetterStyledLabel,
} from "../forms/enquiry-forms/news-letter-form/news-letter-form.styles"
import { StyledDivider } from "../banner/styles"
import { FullBox } from "../MyAccount/booking-history/booking-styles"
import { ColumnFlexBox } from "../forms/enquiry-forms/khazana-enquiry-form/khazana-enquiry-form.styles"
import { getListWithBrandSorting } from "../../utils/getListWithBrandSorting"
import { getSortedData } from "../../utils/getSortedData"

const BasicModal = dynamic(() => import("../hoc/modal/modal"))
const LoadingSpinner = dynamic(() => import("../../utils/SpinnerComponent"))
const GuestRoomComponent = dynamic(() => import("../banner/guestRooms/GuestRoomComponent"))
const CustomDatePickerComponent = dynamic(() => import("../hoc/CustomDatePicker/custom-date-picker.component"))
const CustomDateTileComponent = dynamic(() => import("../hoc/CustomDatePicker/custom-date-tile.component"))
const BookingDateRangeLimitCardComponent = dynamic(() => import("./booking-date-range-limit.card.component"))
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))

interface BookAStayCardComponentProps {
  url: string
  title: string
  _type: string
  urlType: string
  ctaLabel: string
  largeVariant: string
  alignmentVariant: string
  aesthetic: aestheticItems
  primaryAction: ActionProps
  isMultiBlockContent: boolean
  parameterMap: parameterMapItems[]
  variant: string
  singleContent?: any
}

interface DefaultErrors {
  search: boolean
  date: boolean
  package: boolean
}

const initialErrors: DefaultErrors = {
  search: false,
  date: false,
  package: false,
}

export interface HotelInformation {
  hotelName: string
  hotelId: string
  brandName: string
  city: string
  synxisHotelId: string
  country: string
  state: string
  pincode: string
  hotelType: string
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

export const handleHotelSearch = (event: any, setHotelInformation: any, setError: any, newValue?: any) => {
  const { name, value } = event?.target
  if (newValue && newValue?.hotelName?.length > 0) {
    setHotelInformation((prev: any) => ({
      ...prev,
      hotelName: newValue?.hotelName,
      hotelId: newValue?.hotelId,
      brandName: newValue?.brandName,
      city: newValue?.hotelAddress?.city,
      synxisHotelId: newValue?.searchTaxonomies?.synxisHotelId,
      country: newValue?.hotelAddress?.country,
      state: newValue?.hotelAddress?.state,
      pincode: newValue?.hotelAddress?.pincode,
      hotelType: newValue?.searchTaxonomies?.hotelType,
      identifier: newValue?.identifier,
    }))
  } else {
    setHotelInformation((prev: any) => ({
      ...prev,
      hotelName: value,
      hotelId: "",
      brandName: "",
      city: "",
      synxisHotelId: "",
      country: "",
      state: "",
      pincode: "",
      hotelType: "",
      identifier: "",
    }))
  }
  setError((prev: any) => ({
    ...prev,
    search: newValue ? newValue?.hotelName?.length === 0 : value?.length === 0,
  }))
}

function CardWithDynamicFormOffers({
  title,
  aesthetic,
  parameterMap,
  primaryAction,
  alignmentVariant,
  variant,
  largeVariant,
  singleContent,
}: BookAStayCardComponentProps) {
  const router = useRouter()
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const isCustomerLoggedIn = useLoggedIn()
  const context: any = useContext(IHCLContext)
  const PortableText = context!.PortableText
  const modalStore = ModalStore.getInstance()
  const { cardPadding } = useAesthetics(aesthetic?._ref)

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
    userEnteredPromoCode,
  } = bookingFlowGlobalStore

  const scrollRef = useRef<any>()
  const routerArr = router?.asPath?.split("/")
  const userTier = global?.window?.localStorage?.getItem("userTier")
  const hotelRouteIndex = routerArr?.findIndex((route: any) => route === hotelRoute)
  const holidaysRouteIndex = routerArr?.findIndex((route: any) => route === holidaysRoute)
  const isHotelSpecificOfferDetailsPage = hotelRouteIndex === 1 && routerArr?.[hotelRouteIndex + 2] === offersRoute
  const isHolidaysLp =
    (holidaysRouteIndex === 1 && !offerStore?.selectedOfferData?.isFromExperiences) ||
    offerStore?.selectedOfferData?.selectedOfferType === "holidayPackage"

  //* states
  const [open, setOpen] = useState<boolean>(false)
  const [dateKey, setDateKey] = useState<number>(0)
  const [packages, setPackages] = useState<any>([])
  const [loader, setLoader] = useState<boolean>(false)
  const [userPackage, setUserPackage] = useState<any>(offerStore?.selectedOfferData?.userSelectedPackage || [])
  const [guestCount, setGuestCount] = useState<number>(1)
  const [searchValue, setSearchValue] = useState<string>("")
  const [refresh, setRefresh] = useState<any>(new Date().getTime())
  const [error, setError] = useState<DefaultErrors>(initialErrors)
  const [selectedType, setSelectedType] = useState<string>("check_in")
  const [participatingHotels, setParticipatingHotels] = useState<any[]>([])
  const [expandGuestRoomCount, setExpandGuestRoomCount] = useState<boolean>(false)
  const [openDateExceededModal, setOpenDateExceededModal] = useState<boolean>(false)
  const [hotelInformation, setHotelInformation] = useState<HotelInformation | null>(null)
  const [selectedMultipackageOfferData, setSelectedMultipackageOfferData] = useState<any>()
  const [roomsCount, setRoomsCount] = useState([{ id: 1, adults: 1, child: 0, room: "ROOM", isSelected: false }])
  const lengthOfStay = offerStore?.selectedOfferData?.lengthOfStay || userPackage?.lengthOfStay || 1
  const [guestInformation, setGuestInformation] = useState<any>({
    adult: 1,
    child: 0,
    text: "1 Adult, 0 Child - 1 Room",
  })
  const [date, setDate] = useState<any>([
    dayjs(getTomorrowDate()),
    dayjs(lengthOfStay ? addDaysToDate(getTomorrowDate(), lengthOfStay) : getDayAfterTomorrowDate()),
  ])
  const [activeStartDate, setActiveStartDate] = useState<any>(new Date(getTomorrowDate()))
  const selectedPackageOffer = async (identifier?: string | undefined) => {
    const query = groq`*[_type == "offerPackages" && identifier == "${identifier}"] { title,packageType,identifier,promoCode,rateCode,lengthOfStay,"hotels":hotels[]{participatingHotels[] | order(hotelName asc) | order(coalesce(score, -1) desc) ->{hotelName,score,hotelId,brandName,identifier,hotelAddress->,searchTaxonomies->{hotelType,synxisHotelId}}}}[0]`
    let data
    await getClient(true)
      .fetch(query)
      .then((res) => {
        data = res
        const removeDuplicateHotels = (arr: any) => {
          const uniqueIds: any = []
          const unique = arr?.filter((element: any) => {
            const isDuplicate = uniqueIds?.includes(element?.identifier)
            if (!isDuplicate) {
              uniqueIds.push(element?.identifier)
              return true
            }
            return false
          })
          return unique
        }
        const participatingHotelsData: any = []
        res?.hotels?.map((val: any) => {
          val?.participatingHotels?.map((hotel: any) => {
            participatingHotelsData.push({ ...hotel })
          })
        })
        setParticipatingHotels(removeDuplicateHotels(getListWithBrandSorting(participatingHotelsData)) || [])
        setSelectedMultipackageOfferData(res)
      })
      .catch((err) => {
        data = err
      })
    return data
  }

  //?sets theme data for multi theme when user selects theme at group level
  useEffect(() => {
    if (offerStore?.selectedOfferData?.userSelectedPackage?.inclusionIdentifier) {
      selectedPackageOffer(offerStore?.selectedOfferData?.userSelectedPackage?.inclusionIdentifier)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePackageChange = (e: any) => {
    const { name, value } = e?.target
    setUserPackage(value)
    !isHolidaysLp && setHotelInformation(() => null)
    selectedPackageOffer(value?.inclusionIdentifier || "")
    setError((prev: any) => ({
      ...prev,
      package: value?.title?.length === 0,
    }))
  }

  useEffect(() => {
    if (isHotelSpecificOfferDetailsPage) {
      setHotelInformation((prev: any) => ({
        ...prev,
        hotelName: propertyStore?.propertyData?.hotelName,
        hotelId: propertyStore?.propertyData?.hotelId,
        brandName: propertyStore?.propertyData?.brandName,
        identifier: propertyStore?.propertyData?.identifier,
      }))
    } else if (isHolidaysLp) {
      setHotelInformation((prev: any) => ({
        ...prev,
        hotelName: offerStore?.selectedOfferData?.hotelInformation?.hotelName,
        hotelId: offerStore?.selectedOfferData?.hotelInformation?.hotelId,
        brandName: offerStore?.selectedOfferData?.hotelInformation?.brandName,
        city: offerStore?.selectedOfferData?.hotelInformation?.city,
        country: offerStore?.selectedOfferData?.hotelInformation?.country,
        pincode: offerStore?.selectedOfferData?.hotelInformation?.pincode,
        state: offerStore?.selectedOfferData?.hotelInformation?.state,
        hotelType: offerStore?.selectedOfferData?.hotelInformation?.hotelType,
        synxisHotelId: offerStore?.selectedOfferData?.hotelInformation?.synxisHotelId,
        hotelCode: offerStore?.selectedOfferData?.hotelInformation?.hotelCode,
        identifier: offerStore?.selectedOfferData?.hotelInformation?.identifier,
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotelRouteIndex, offerStore?.offersData?.hotels?.participatingHotels])

  const keypadCloseForExpandGuestRoom = () => {
    if (document.activeElement instanceof HTMLInputElement) {
      document.activeElement.blur()
    }
  }

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
    if (selectedType === "check_out") {
      setActiveStartDate(new Date(checkInDate))
      setOpen(false)
    }
  }

  const startDate = dateFormatConverter(date[0])
  const endDate = dateFormatConverter(date[1])

  useEffect(() => {
    setGuestInformation((prev: any) => guestTextGenerator(roomsCount))
  }, [roomsCount])

  const handleRedirection = async (promoCode: string, rateCode: string) => {
    const URL = getNonTajBrandCrossURL(
      hotelInformation?.brandName || "",
      hotelInformation?.identifier || "",
      endDate,
      startDate,
      roomsCount,
      "",
      promoCode,
      rateCode,
    )
    await CrossSiteNavigation({
      url: URL,
      loggedIn: isCustomerLoggedIn,
      userStore,
    })
  }

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
    global?.window?.localStorage?.setItem("hotelJourneyPageType", "offerPage")
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
        offerName: offerStore?.selectedOfferData?.title || "",
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
        country: hotelInformation?.country ? hotelInformation?.country : "",
        city: hotelInformation?.city ? hotelInformation?.city : "",
        hotelName: hotelInformation?.hotelName,
        hotelCode: hotelInformation?.synxisHotelId ? hotelInformation?.synxisHotelId : "",
        hotelType: hotelInformation?.hotelType ? hotelInformation?.hotelType : "",
        hotelCountry: hotelInformation?.country ? hotelInformation?.country : "",
        hotelCity: hotelInformation?.city ? hotelInformation?.city : "",
        hotelState: hotelInformation?.state ? hotelInformation?.state : "",
        hotelPinCode: hotelInformation?.pincode ? hotelInformation?.pincode : "",
        hotelbrand: hotelInformation?.brandName ? hotelInformation?.brandName : "",
        roomName: "",
        roomOffer: "",
        bunglowCode: "",
        clientId: getCookie("_ga")?.slice(6),
        pageTitle: navigateURL?.replaceAll("/", "").toUpperCase(),
        pageURL: `${global?.window?.location.origin}` + `${navigateURL}`,
        // item_type: props?._type,
        // widget_type: props?._type,
        pageSection: title,
        widget_title: title,
        pageHierarchy: JSON.parse(
          `["${TAJ_HOTELS}",` +
            `"${PAGE_LANG}",` +
            `"${hotelInformation?.brandName || ""}",` +
            `"${navigateURL?.replaceAll("/", "").toUpperCase()}"]`,
        ),
        location: hotelInformation?.city ? hotelInformation?.city : "",
        outbound: primaryAction?.urlType == "internal" ? false : true,
        theme: userPackage?.title ? userPackage?.title : "",
        holidayType:
          offerStore?.selectedOfferData?.selectedTab === undefined ? "ALL" : offerStore?.selectedOfferData?.selectedTab,
      },
    })
  }

  const handleModelClose = () => setOpenDateExceededModal(false)

  //* API Call
  const handleBooking = async () => {
    setLoader(() => true)
    updateGuestDetails({
      data: roomsCount,
    })
    setUserEnteredPromoCode({
      title: "Special Offer Code",
      index:
        offerStore?.selectedOfferData?.rateCode || selectedMultipackageOfferData?.rateCode
          ? null
          : offerStore?.selectedOfferData?.promoCode || selectedMultipackageOfferData?.promoCode
          ? 5
          : null,
      agentId: null,
      promoCode: offerStore?.selectedOfferData?.promoCode || selectedMultipackageOfferData?.promoCode || null,
      couponCode: null,
      rateCode: null,
    })
    setCheckAvailabilityPayload(
      guestInformation?.child,
      guestInformation?.adult,
      roomsCount?.length,
      endDate,
      startDate,
      hotelInformation?.hotelId,
      fetchRateFilter() || undefined,
      global?.window?.localStorage?.getItem("userTier") || undefined,
      true,
      offerStore?.selectedOfferData?.rateCode || selectedMultipackageOfferData?.rateCode,
      offerStore?.selectedOfferData?.promoCode || selectedMultipackageOfferData?.promoCode,
      "",
      "",
      false,
      false,
      offerStore?.selectedOfferData?.memberOfferType,
    )
    openDateExceededModal && setOpenDateExceededModal(false)
    let navigateURL = `${ROUTES?.WITHOUTSEO_FOR_ROUTING?.BOOKING?.CART}?`
    if (hotelInformation?.brandName?.toLocaleLowerCase() !== "taj" && hotelInformation?.brandName) {
      handleRedirection(
        offerStore?.selectedOfferData?.promoCode || selectedMultipackageOfferData?.promoCode,
        offerStore?.selectedOfferData?.rateCode || selectedMultipackageOfferData?.rateCode,
      )
      setLoader(() => false)
    } else {
      if (hotelInformation?.hotelId) {
        navigateURL = `${navigateURL}` + `hotelId=${hotelInformation?.hotelId}`
      }
      if (offerStore?.selectedOfferData?.title && !isHolidaysLp) {
        navigateURL = `${navigateURL}` + `&offerName=${offerStore?.selectedOfferData?.title}` + "&isFromOLP=true"
      }
      if (offerStore?.selectedOfferData?.memberOfferType) {
        navigateURL = `${navigateURL}` + `&memberOfferType=${offerStore?.selectedOfferData?.memberOfferType}`
      }
      if (offerStore?.selectedOfferData?.rateCode || selectedMultipackageOfferData?.rateCode) {
        navigateURL =
          `${navigateURL}` +
          `&offerRateCode=${
            selectedMultipackageOfferData?.rateCode
              ? selectedMultipackageOfferData?.rateCode
              : offerStore?.selectedOfferData?.rateCode
          }`
      }
      if (offerStore?.selectedOfferData?.promoCode || selectedMultipackageOfferData?.promoCode) {
        navigateURL =
          `${navigateURL}` +
          `&offerPromoCode=${offerStore?.selectedOfferData?.promoCode || selectedMultipackageOfferData?.promoCode}`
      }
      if (lengthOfStay) {
        navigateURL = `${navigateURL}` + `&minLOS=${lengthOfStay}`
      }
      if (isHolidaysLp) {
        navigateURL = `${navigateURL}&journeyFrom=HOLIDAYS`
      }
      if (userEnteredPromoCode?.promoCode) {
        navigateURL = `${navigateURL}` + `&sc=${userEnteredPromoCode?.title}`
      }
      modalStore?.visibility && modalStore?.setVisibility(false)
      setLoader(() => false)
      navigate(navigateURL)
      handleHotelBooking(navigateURL)
    }
  }
  const isSinglePackage = offerStore?.selectedOfferData?.selectedOfferType === "singlePackage"

  const checkInvalidFields = () => {
    setError((prev: any) => ({
      ...prev,
      search:
        prev?.search ||
        hotelInformation?.hotelName === undefined ||
        hotelInformation?.hotelName === null ||
        hotelInformation?.hotelName?.length === 0 ||
        hotelInformation?.brandName?.length === 0,
      date: !(startDate?.length > 0 && endDate?.length > 0 && date[0] && date[1]),
      package: isSinglePackage ? false : userPackage?.title ? userPackage?.title?.length === 0 : true,
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

  //? used to update calendar view
  const handleView = ({ view, activeStartDate, action }: any) => {
    if (activeStartDate <= new Date()) {
      setActiveStartDate(new Date())
    } else {
      setActiveStartDate(activeStartDate)
    }
    const startDate = activeStartDate
    const endDate = AddNumberOfDays(activeStartDate, 62)
    const hasDate = (date: any) => leads.some((obj: any) => obj?.arrivalDate == dateFormatConverter(date))
    const hasBothDates = hasDate(startDate) && hasDate(getPreviousDate(endDate))
    if (view === "month" && action !== "onChange") {
      if (hasBothDates && hotelInformation?.hotelId) {
        return null
      } else {
        getCalendarData(startDate, endDate, true)
      }
    }
  }
  const handleScroll = () => {
    if (scrollRef?.current && !open) {
      const offset = 150
      if (isMobile) {
        const elementTop = scrollRef.current?.getBoundingClientRect()?.top

        const parentElement = global?.document?.getElementById("book-a-stay-modal")
        if (elementTop >= 0) {
          parentElement?.scrollTo({
            top: elementTop + offset,
            behavior: "smooth",
          })
        }
      } else {
        setTimeout(() => {
          const parentElement = global?.document?.getElementById("book-a-stay-modal")
          const elementTop = scrollRef.current?.getBoundingClientRect().top
          parentElement?.scrollTo({
            top: elementTop + offset,
            behavior: "smooth",
          })
        }, 100)
      }
    }

    if (isMobile) {
      if (global?.window?.document?.activeElement instanceof HTMLInputElement) {
        global?.window?.document.activeElement.blur()
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
      rateCode: isSinglePackage ? offerStore?.selectedOfferData?.rateCode : selectedMultipackageOfferData?.rateCode,
      promoCode: isSinglePackage ? offerStore?.selectedOfferData?.promoCode : selectedMultipackageOfferData?.promoCode,
      promoType:
        offerStore?.selectedOfferData?.promoCode || selectedMultipackageOfferData?.promoCode ? "promotion" : null,
      agentId: null,
      agentType: null,
    }
    update ? updateCalenderViewData(calendarPayload) : setCalenderViewData(calendarPayload)
  }

  useEffect(() => {
    if (hotelInformation?.hotelId) {
      clearCalenderViewData()
      getCalendarData(getTodayDate(), AddNumberOfDays(getTodayDate(), 62), false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    hotelInformation?.hotelId,
    userTier,
    selectedMultipackageOfferData?.rateCode,
    selectedMultipackageOfferData?.promoCode,
  ])

  useEffect(() => {
    if (isSinglePackage) {
      setParticipatingHotels(offerStore?.selectedOfferData?.participatingHotels)
    } else {
      setPackages(getSortedData(offerStore?.selectedOfferData?.packages, (item: any) => item?.basicInfo?.title || ""))
    }
  }, [isHotelSpecificOfferDetailsPage, isSinglePackage, offerStore])

  useEffect(() => {
    if (userPackage?.lengthOfStay)
      setDate([
        dayjs(getTomorrowDate()),
        dayjs(
          userPackage?.lengthOfStay
            ? addDaysToDate(getTomorrowDate(), userPackage?.lengthOfStay)
            : getDayAfterTomorrowDate(),
        ),
      ])
  }, [userPackage])

  return (
    <>
      {loader && <LoadingSpinner />}
      <Box
        ref={scrollRef}
        aria-label="CardWithDynamicFormOffers"
        sx={{
          background: isMobile ? theme?.palette?.background?.paper : theme?.palette?.background?.default,
          padding: `${isMobile ? cardPadding?.mobile : cardPadding?.desktop}`,
          "@media (max-width:640px)": {
            maxHeight: "100%",
            overflowY: "auto",
            minHeight: "100%",
          },
          paddingBottom: !isMobile && open ? "11vw" : isMobile ? "10.313vw" : "3.125vw", //adding padding bottom when calender is open
        }}>
        <BookAStayCardComponentBox $mobile={isMobile} $isOffersCard={true}>
          {title && (
            <BookAStayCardTitleBox
              $mobile={isMobile}
              sx={{
                flexDirection: isMobile ? "column" : "row",
                width: isMobile ? "100%" : "unset",
                columnGap: isMobile ? "initial" : "0.417vw!important",
              }}>
              {withHyphens && !isMobile && <BookAStayCardTitleDivider />}
              <Typography
                sx={{
                  lineHeight: "140%",
                  textAlign: "center",
                }}
                variant={isMobile ? "m-heading-s" : "heading-s"}>
                {`${offerStore?.selectedOfferData?.title ? offerStore?.selectedOfferData?.title : ""} ${
                  offerStore?.selectedOfferData?.title && "-"
                }` + (title ? title : "")}
              </Typography>
              {withHyphens && !isMobile && <BookAStayCardTitleDivider />}
            </BookAStayCardTitleBox>
          )}

          {!isSinglePackage && (
            <Stack alignItems={"center"} mb={isMobile ? MobilePxToVw(35) : DesktopPxToVw(40)} width={"100%"}>
              <Stack width={isMobile ? "100% !important" : DesktopPxToVw(434)}>
                <NewsLetterFormControl
                  variant={"standard"}
                  sx={{
                    width: "100%",
                  }}>
                  <NewsLetterStyledLabel>{"Select Package"}</NewsLetterStyledLabel>
                  <Select
                    sx={{
                      width: "100%",
                    }}
                    label={"Select Package"}
                    aria-label={"Select Package"}
                    value={userPackage}
                    name={"package"}
                    onChange={handlePackageChange}
                    MenuProps={{
                      PaperProps: {
                        elevation: 0,
                        sx: {
                          maxHeight: 300,
                          backgroundColor: theme?.palette?.background?.default,
                          borderRadius: "0",
                          boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
                        },
                      },
                    }}
                    onClose={() => {
                      setTimeout(() => {
                        ;(document?.activeElement as HTMLElement)?.blur()
                      }, 0)
                    }}
                    IconComponent={(props) =>
                      false ? (
                        <InputAdornment position="end">
                          <Box component="img" src={Error_icon} alt="Expand Image" />
                        </InputAdornment>
                      ) : (
                        <KeyboardArrowDown
                          {...props}
                          sx={{
                            color: theme?.palette?.ihclPalette?.hexSeventeen,
                            fontWeight: 300,
                          }}
                        />
                      )
                    }>
                    {packages
                      ?.sort((a: any, b: any) => a?.title?.localeCompare(b?.title))
                      ?.map((item: any, index: number) => (
                        <NewsLetterMenuItem key={index} value={item}>
                          {item?.title}
                        </NewsLetterMenuItem>
                      ))}
                  </Select>
                </NewsLetterFormControl>
                {error?.package && <ErrorDisplayTypography>{"Please select a package."}</ErrorDisplayTypography>}
              </Stack>
            </Stack>
          )}
          <FieldsContainer>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Autocomplete
                  disableClearable={searchValue?.length === 0}
                  onInput={(event: any) => {
                    setError((prev: any) => ({
                      ...prev,
                      package: isSinglePackage ? false : userPackage?.title ? userPackage?.title?.length === 0 : true,
                    }))
                    handleHotelSearch(event, setHotelInformation, setError)
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
                    "& .Mui-disabled": {
                      "&:before": {
                        borderBottomStyle: "solid !important",
                      },
                    },
                  }}
                  disabled={isHotelSpecificOfferDetailsPage || isHolidaysLp ? true : false}
                  noOptionsText={"No results found for your search"}
                  value={hotelInformation}
                  getOptionLabel={(option: any) => option.hotelName}
                  options={
                    participatingHotels?.length > 0
                      ? hotelInformation == null || hotelInformation?.hotelName?.length === 0
                        ? participatingHotels
                        : participatingHotels
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
                            {isHotelSpecificOfferDetailsPage || isHolidaysLp ? (
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
                    <Stack position={"relative"}>
                      <ErrorDisplayTypography
                        sx={{
                          marginBottom: isMobile ? "1.563vw" : "0.541vw",
                          position: "absolute",
                        }}>
                        {BookAStayErrorMessages?.HOTEL}
                      </ErrorDisplayTypography>
                    </Stack>
                  )}
                </Box>
              </Box>
            </Box>
            <ColumnFlexBox sx={{ width: "100%" }}>
              <Box onClick={() => handleScroll()}>
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
                      zIndex={false}
                      showDoubleView={isMobile ? false : true}
                      selectRange={true}
                      onCalendarOpen={() => {
                        setOpen(true), keypadCloseForExpandGuestRoom()
                      }}
                      isCalendarLoading={isCalendarLoading && open && hotelInformation?.hotelId}
                      onCalendarClose={() => {
                        setRefresh(`${new Date().getTime()}`)
                      }}
                      activeStartDate={activeStartDate}
                      allowPartialRange
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
                          onClick={() => setOpen(true)}
                          columnGap={DesktopPxToVw(10)}>
                          <Typography
                            whiteSpace={"nowrap"}
                            onClick={() => setSelectedType("check_in")}
                            color={theme.palette.ihclPalette.Seventeen}
                            variant={isMobile ? "m-body-l" : "body-l"}>
                            {date?.[0] ? formatDateWithMON(date?.[0]) : "Check in"}
                          </Typography>
                          <StyledDivider sx={{ width: `${DesktopPxToVw(30)} !important` }} />
                          <Typography
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
                </ClickAwayListener>
                {error?.date && (
                  <Box position={"relative"} width={"100%"}>
                    <ErrorDisplayTypography position={"absolute"}>
                      {BookAStayErrorMessages?.DATE}
                    </ErrorDisplayTypography>
                  </Box>
                )}
              </Box>
            </ColumnFlexBox>
            <FullBox
              sx={{ display: "flex", flexDirection: "column" }}
              onClick={() => setExpandGuestRoomCount(!expandGuestRoomCount)}>
              <Input
                inputProps={{
                  style: {
                    fontWeight: 300,
                    fontSize: isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
                    fontFamily: "supreme",
                  },
                }}
                sx={{ width: isMobile ? "100%" : "17.708vw" }}
                onClick={(e: any) => setExpandGuestRoomCount((prev: boolean) => !prev)}
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
                  />
                </GuestRoomContainer>
              )}
            </FullBox>
          </FieldsContainer>

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
                    hotelInformation?.hotelName?.length > 0 &&
                    hotelInformation?.brandName &&
                    hotelInformation?.brandName?.length > 0 &&
                    (isSinglePackage ? true : userPackage?.title && !error?.package)
                  ) {
                    const isDayLimitExceeded = differenceInDays(date?.[0], date?.[1]) > 10
                    if (isDayLimitExceeded) {
                      setOpenDateExceededModal(true)
                    } else {
                      handleBooking()
                    }
                  } else {
                    checkInvalidFields()
                  }
                }}
                url={primaryAction?.url}
                isActionButtonType={true}
                title={primaryAction?.title}
                variant={primaryAction?.variant}
                navigationType={primaryAction?.urlType}
                buttonStyles={{
                  letterSpacing: "0.1em",
                }}
              />
            </Box>
          )}
        </BookAStayCardComponentBox>
        {singleContent && (
          <Box
            sx={{
              textAlign: "center",
              bottom: isMobile ? MobilePxToVw(40) : "unset",
              padding: isMobile ? "0vw 20.938vw" : "initial",
              mt: isMobile ? MobilePxToVw(40) : DesktopPxToVw(80),
              position: isMobile ? (expandGuestRoomCount ? "relative" : "absolute") : "relative",
            }}>
            <PortableText blocks={singleContent} />
          </Box>
        )}
      </Box>
      {openDateExceededModal && (
        <BasicModal
          width={"100%"}
          height={"100%"}
          open={openDateExceededModal}
          handleClose={handleModelClose}
          webCloseIcon={ICONS?.CLOSE_WHITE_ICON}
          ModalCloseButtonColor={theme?.palette?.ihclPalette?.hexOne}
          ModalCloseButtonStyles={{
            right: "25vw",
            marginBottom: "1.563vw",
          }}
          Component={
            <BookingDateRangeLimitCardComponent handleClose={handleModelClose} handleCheckRates={handleBooking} />
          }
        />
      )}
    </>
  )
}

export default observer(CardWithDynamicFormOffers)
