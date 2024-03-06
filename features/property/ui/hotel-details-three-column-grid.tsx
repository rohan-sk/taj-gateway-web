import React, { useContext, useEffect, useState } from "react"
import { Box } from "@mui/material"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { hotelRoute } from "./constants"
import { observer } from "mobx-react-lite"
import { useMobileCheck } from "../../../utils/isMobilView"
import {
  AllIHCLHotelsData,
  HotelTypeData,
  fetchHighlightedCardDataWithIdentifier,
  fetchMeetingsData,
} from "../../../utils/fetchRoomData"
import CAPACITY_DATA from "../../../utils/meetings-capacity-range.json"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
const MultiRowTitle = dynamic(() => import("../../../components/hoc/title/multi-row-title"))
const VenueSearchFilter = dynamic(() => import("./venues-search-filter"))
import ModalStore from "../../../store/global/modal.store"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import { PathType } from "../../../types"
import { getListWithBrandSorting } from "../../../utils/getListWithBrandSorting"
import { CONTENT_TYPE, externalNavigation } from "../../../components/constants"
import { CrossSiteNavigation } from "../../../utils/sso/cross-site-navigation"
import { UserStore } from "../../../store"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { useLoggedIn } from "../../../utils/hooks/useLoggedIn"
import { staticHamperData } from "../../../utils/fetchHampers"
import { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import getNonTajBrandCrossURL from "../../../utils/getCrossBrandURL"
import { formatDateEnGB, formatDateWithHyphen, getDayAfterTomorrowDate, getTomorrowDate } from "../../../utils/getDate"
import dayjs from "dayjs"

type DefaultFacets = {
  seating_style: any[]
  capacity: any[]
}
type MeetingsFacets = {
  hotel_name: any[]
  seating_style: any[]
  capacity: any[]
  // event: any[]
}
type DefaultFilters = {
  seating_style: string
  capacity: string
}
type HotelEventFilters = {
  seating_style: string
  capacity: string
}
type MeetingsFilters = {
  hotel_name: string
  seating_style: string
  capacity: string
  // event: string
}
const defaultFacets: DefaultFacets = {
  seating_style: [],
  capacity: [],
}
const meetingsFacets: MeetingsFacets = {
  hotel_name: [],
  seating_style: [],
  capacity: [],
  // event: [],
}
const weddingFacets = {
  hotel_name: [],
  theme: [],
  capacity: [],
}
const hotelTypeFacets = {
  hotel_name: [],
}
const allHotelsFacets = {
  hotel_name: [],
  hotel_type: [],
}
const defaultFilters: DefaultFilters = {
  seating_style: "",
  capacity: "",
}
const hotelEventFilters: HotelEventFilters = {
  seating_style: "",
  capacity: "",
}

const hotelTypeFilters = {
  hotel_name: "",
}
const meetingsFilters: MeetingsFilters = {
  hotel_name: "",
  // event: "",
  seating_style: "",
  capacity: "",
}
const hamperFilters = {
  hotel_name: "",
}

const weddingFilters = {
  hotel_name: "",
  theme: "",
  capacity: "",
}

const allHotelsFilters = {
  hotel_name: "",
  hotel_type: "",
}

const getFilter = (contentType: string): object => {
  switch (contentType) {
    case CONTENT_TYPE?.ALL_EVENTS_VENUES:
      return meetingsFilters
    case CONTENT_TYPE?.WEDDING_VENUES:
      return weddingFilters
    case CONTENT_TYPE?.HOTEL_EVENT_VENUES:
      return hotelEventFilters
    case CONTENT_TYPE?.PALACES:
      return hotelTypeFilters
    case CONTENT_TYPE?.RESORTS:
      return hotelTypeFilters
    case CONTENT_TYPE?.HOTELS:
      return hotelTypeFilters
    case CONTENT_TYPE?.SAFARIS:
      return hotelTypeFilters
    case CONTENT_TYPE?.NON_IHCL_PALACES:
      return hotelTypeFilters
    case CONTENT_TYPE?.NON_IHCL_RESORTS:
      return hotelTypeFilters
    case CONTENT_TYPE?.NON_IHCL_HOTELS:
      return hotelTypeFilters
    case CONTENT_TYPE?.NON_IHCL_SAFARIS:
      return hotelTypeFilters
    case CONTENT_TYPE?.HAMPERS:
      return hamperFilters
    case CONTENT_TYPE?.ALL_IHCL_HOTELS:
      return allHotelsFilters
    default:
      return defaultFilters
  }
}

const getFacets = (contentType: string): object => {
  switch (contentType) {
    case CONTENT_TYPE?.ALL_EVENTS_VENUES:
      return meetingsFacets
    case CONTENT_TYPE?.WEDDING_VENUES:
      return weddingFacets
    case CONTENT_TYPE?.HOTEL_EVENT_VENUES:
      return defaultFacets
    case CONTENT_TYPE?.PALACES:
      return hotelTypeFacets
    case CONTENT_TYPE?.RESORTS:
      return hotelTypeFacets
    case CONTENT_TYPE?.HOTELS:
      return hotelTypeFacets
    case CONTENT_TYPE?.SAFARIS:
      return hotelTypeFacets
    case CONTENT_TYPE?.NON_IHCL_PALACES:
      return hotelTypeFacets
    case CONTENT_TYPE?.NON_IHCL_RESORTS:
      return hotelTypeFacets
    case CONTENT_TYPE?.NON_IHCL_HOTELS:
      return hotelTypeFacets
    case CONTENT_TYPE?.NON_IHCL_SAFARIS:
      return hotelTypeFacets
    case CONTENT_TYPE?.ALL_IHCL_HOTELS:
      return allHotelsFacets
    default:
      return defaultFacets
  }
}

//utility to remove duplicates in array and sort (ASCENDING)
const removeDuplicatesAndSort = (arr: any, sortType?: string): any[] => {
  if (Array?.isArray(arr) && arr?.length > 0) {
    let unique: any = []
    arr?.forEach((element: any) => {
      if (element && !unique?.includes(element)) {
        unique?.push(element)
      }
    })
    return sortType === "number" ? unique?.sort((a: any, b: any) => b - a) : unique?.sort()
  } else {
    return []
  }
}

const HotelDetailsThreeColumnGrid = ({
  cardLargeVariant,
  groupLargeVariant,
  subtitle,
  description,
  aesthetic,
  contentType,
  charactersLimit,
  filterAlignment,
  cardCharactersLimit,
  parameterMap,
  mobileCharactersLimit,
  mobileCardCharactersLimit,
  cardActionType,
  isMobileComponentFullWidth,
  isComponentFullWidth,
  alignmentVariant,
  cardAlignmentVariant,
  groupMobileVariant,
  cardMobileVariant,
  title,
  tabsConfig,
  headingElementForCard,
  isHidden = false,
  cardAesthetic,
}: any) => {
  const modalStore = ModalStore?.getInstance()
  const navigate = useAppNavigation()
  const router: any = useRouter()
  const isMobile = useMobileCheck()
  const ihclContext = useContext(IHCLContext)
  const isLogin = useLoggedIn()

  const [sectionTitle, setTitle] = useState<any>()
  const [componentData, setComponentData] = useState<any>()
  const [componentItemData, setComponentItemsData] = useState<any>()
  const [filteredData, setFilteredData] = useState<any>([])
  const [tabBasedFilteredData, setTabBasedFilteredData] = useState<any>([{}])
  const [facets, setFacets] = useState<any>(getFacets(contentType))
  const [searchFilters, setSearchFilters] = useState<any>(getFilter(contentType))
  const [enableTabs, setEnableTabs] = useState<boolean>(tabsConfig?.enabled || false)
  const [selectedTab, setSelectedTab] = useState(0)
  const [tabs, setTabs] = useState<any[]>([])
  let ctaActionData = cardActionType?.find((action: any) => action?.actionType === "ctaLabel")?.ctaLabel

  const getKey: any = (index: number, filters: any): string => {
    return filters ? Object?.keys(filters)?.[index] : ""
  }

  const userStore = ihclContext?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore

  //setting up group items data based on contentType
  const getItemData = (item: any) => {
    let hotelsData: any = []
    if (contentType === CONTENT_TYPE?.HAMPERS) {
      hotelsData = componentItemData?.map((item: any) => ({
        email: item?.email || "",
        hotelName: item?.hotelName || "",
        phone: item?.phone || "",
        title: item?.title || "",
        hamperId: item?.hamperId || "",
      }))
    }
    let primaryAction =
      cardActionType?.length > 0
        ? cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction
        : {}
    let secondaryAction =
      cardActionType?.length > 0
        ? cardActionType?.find((action: any) => action?.actionType === "secondaryAction")?.secondaryAction
        : {}
    if (contentType === CONTENT_TYPE?.WEDDING_VENUES) {
      const onCtaClick = async () => {
        navigate(`${ctaActionData?.url}/${item?.identifier}/meetings-and-event-venues`)
      }
      return {
        ...item,
        ctaLabelAction: onCtaClick,
        primaryAction,
        alignmentVariant: cardAlignmentVariant,
        secondaryAction:
          cardActionType?.length > 0
            ? cardActionType?.find((action: any) => action?.actionType === "secondaryAction")?.secondaryAction
            : {},
        mediaType: item?.basicInfo?.media?.[0]?.mediaType,
        ctaLabel: ctaActionData?.title,
        urlType: ctaActionData?.urlType,
        largeVariant: cardLargeVariant,
        variant: cardMobileVariant,
        _type: "card",
        largeImage: item?.thumbnail?.largeImage?.[0],
        image: item?.thumbnail?.image?.[0],
        videoAsset: item?.basicInfo?.media?.[0]?.videoAsset ? item?.basicInfo?.media?.[0]?.videoAsset : {},
        headingElementForCard: headingElementForCard,
        parameterMap: item?.specifications,
        title: item?.hotelName,
        description: item?.hotelDescription,
        highLights: item?.highlights,
        charactersLimit: isMobile ? mobileCardCharactersLimit : cardCharactersLimit,
      }
    } else if (
      contentType === CONTENT_TYPE?.PALACES ||
      contentType === CONTENT_TYPE?.RESORTS ||
      contentType === CONTENT_TYPE?.SAFARIS ||
      contentType === CONTENT_TYPE?.HOTELS ||
      contentType === CONTENT_TYPE?.NON_IHCL_PALACES ||
      contentType === CONTENT_TYPE?.NON_IHCL_RESORTS ||
      contentType === CONTENT_TYPE?.NON_IHCL_SAFARIS ||
      contentType === CONTENT_TYPE?.NON_IHCL_HOTELS ||
      contentType == CONTENT_TYPE?.ALL_IHCL_HOTELS
    ) {
      const handleRedirection = async () => {
        const URL = getNonTajBrandCrossURL(
          item?.brandName || "",
          item?.identifier || "",
          formatDateWithHyphen(formatDateEnGB(dayjs(getDayAfterTomorrowDate()))),
          formatDateWithHyphen(formatDateEnGB(dayjs(getTomorrowDate()))),
          [
            {
              id: 1,
              adults: 1,
              child: 0,
              room: "ROOM",
              isSelected: false,
            },
          ],
          "",
          "",
          "",
        )
        await CrossSiteNavigation({
          url: URL,
          loggedIn: isLogin,
          userStore,
        })
      }

      const onCtaClick = async () => {
        const brand = item?.brandName?.toUpperCase()
        const navUrl = externalNavigation[brand]
        if (item?.brandName?.toLowerCase() !== "taj") {
          CrossSiteNavigation({
            url: `${navUrl}/${item?.identifier}?`,
            loggedIn: isLogin,
            userStore,
          })
        } else {
          navigate(`${ctaActionData?.url}/${item?.identifier}`)
        }
      }
      const onPrimaryClick = async () => {
        let primaryActionUrl = `${
          cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction?.url
        }?`

        if (item?.brandName?.toLocaleLowerCase() !== "taj" && item?.brandName) {
          handleRedirection()
        } else if (item?.hotelId) {
          primaryActionUrl = `${primaryActionUrl}` + `hotelId=${item?.hotelId}`
          navigate(primaryActionUrl, item?.primaryAction?.urlType)
        }
      }
      return {
        ...item,
        largeImage: item?.thumbnail?.largeImage?.[0],
        image: item?.thumbnail?.image?.[0],
        title: item?.hotelName,
        mediaType: "image",
        highLights: item?.highlights,
        description: contentType === CONTENT_TYPE?.HOTELS ? "" : item?.description,
        largeVariant: cardLargeVariant,
        variant: cardMobileVariant,
        alignmentVariant: cardAlignmentVariant,
        headingElementForCard: headingElementForCard,
        primaryAction,
        secondaryAction,
        onPrimaryClick,
        ctaLabel: ctaActionData?.title,
        ctaLabelAction: onCtaClick,
        charactersLimit: isMobile ? mobileCardCharactersLimit : cardCharactersLimit,
        _type: "card",
        aesthetic: cardAesthetic,
      }
    } else if (contentType === CONTENT_TYPE?.ALL_EVENTS_VENUES) {
      const onCtaClick = async () => {
        navigate(`${ctaActionData?.url}/${item?.identifier}/meetings-and-event-venues`)
      }
      return {
        ...item,
        primaryAction,
        alignmentVariant: cardAlignmentVariant,
        secondaryAction:
          cardActionType?.length > 0
            ? cardActionType?.find((action: any) => action?.actionType === "secondaryAction")?.secondaryAction
            : {},
        mediaType: item?.basicInfo?.media?.[0]?.mediaType,
        ctaLabel: ctaActionData?.title,
        urlType: ctaActionData?.urlType,
        largeVariant: cardLargeVariant,
        variant: cardMobileVariant,
        _type: "card",
        ctaLabelAction: onCtaClick,
        largeImage: item?.thumbnail?.largeImage?.[0],
        image: item?.thumbnail?.image?.[0],
        videoAsset: item?.basicInfo?.media?.[0]?.videoAsset ? item?.basicInfo?.media?.[0]?.videoAsset : {},
        headingElementForCard: headingElementForCard,
        parameterMap: item?.specifications,
        title: item?.hotelName,
        description: item?.hotelDescription,
        charactersLimit: isMobile ? mobileCardCharactersLimit : cardCharactersLimit,
      }
    } else if (contentType === CONTENT_TYPE?.HAMPERS) {
      const primaryAction =
        cardActionType?.length > 0
          ? cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction
          : {}
      const onPrimaryClick = async () => {
        await modalStore?.setPropertyData({
          isStaticHamper: true,
          hotelName: item?.hotelName || "",
          hotelId: item?.identifier || "",
          destination: item?.city || "",
          email: item?.email || "",
          phone: item?.phone || "",
          signatureHamper: item?.title || "",
          hotelsData: hotelsData,
        })
        navigate(primaryAction?.url, primaryAction?.urlType)
      }
      return {
        ...item,
        onPrimaryClick,
        primaryAction,
        secondaryAction,
        charactersLimit: isMobile ? mobileCardCharactersLimit : cardCharactersLimit,
        headingElementForCard: headingElementForCard,
        largeImage: item?.thumbnail?.[0]?.largeImage,
        image: item?.thumbnail?.[0]?.image,
        ctaLabel: ctaActionData?.title,
        urlType: ctaActionData?.urlType,
        url: ctaActionData?.url,
        alignmentVariant: cardAlignmentVariant,
        largeVariant: cardLargeVariant,
        variant: cardMobileVariant,
        _type: "card",
      }
    } else {
      return {
        ...item,
        primaryAction,
        alignmentVariant: cardAlignmentVariant,
        secondaryAction,
        mediaType: item?.basicInfo?.media?.[0]?.mediaType,
        ctaLabel: ctaActionData?.title,
        urlType: ctaActionData?.urlType,
        url: ctaActionData?.url,
        largeVariant: cardLargeVariant,
        variant: cardMobileVariant,
        _type: "card",
        largeImage: item?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0],
        image: item?.basicInfo?.media?.[0]?.imageAsset?.image?.[0],
        videoAsset: item?.basicInfo?.media?.[0]?.videoAsset ? item?.basicInfo?.media?.[0]?.videoAsset : {},
        headingElementForCard: headingElementForCard,
        parameterMap: item?.specifications,
        title: item?.basicInfo?.title,
        description: item?.basicInfo?.description,
        subTitle:
          contentType === CONTENT_TYPE?.ALL_EVENTS_VENUES
            ? item?.participatingHotels?.hotelName
            : item?.basicInfo?.subTitle,
        highLights: item?.highlights,
        charactersLimit: isMobile ? mobileCardCharactersLimit : cardCharactersLimit,
        roomModalDetails: {
          title: item?.basicInfo?.title,
          description: item?.venueModalDetails?.description,
          itemData: item?.venueModalDetails,
          contentType: contentType,
          primaryAction: {
            url:
              contentType === CONTENT_TYPE?.HOTEL_EVENT_VENUES
                ? primaryAction?.url
                : componentData?.hotelId
                ? `/bookings/landing-page?hotelId=${componentData?.hotelId}`
                : primaryAction?.url,
            urlType: contentType === CONTENT_TYPE?.HOTEL_EVENT_VENUES ? primaryAction?.urlType : PathType?.internal,
          },
        },
      }
    }
  }

  useEffect(() => {
    if (tabs?.length > 0 && enableTabs && contentType === CONTENT_TYPE?.HAMPERS) {
      const currentSelectedTab = selectedTab ? selectedTab : 0
      const currentTab = tabs?.[currentSelectedTab]?.title?.toLowerCase()
      if (currentTab?.toLowerCase() === "all") {
        setFilteredData(componentItemData)
        setTabBasedFilteredData(componentItemData)
      } else {
        const tabBasedFilteredData = componentItemData?.filter(
          (item: any) => item?.city?.toLowerCase() === currentTab?.toLowerCase(),
        )
        setFilteredData(tabBasedFilteredData)
        setTabBasedFilteredData(tabBasedFilteredData)
      }
      //clearing filter for every tab switching when tabs are enabled
      setSearchFilters(hamperFilters)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentItemData, selectedTab, enableTabs, isMobile])

  useEffect(() => {
    if (tabsConfig?.enableTabs) {
      setEnableTabs(true)
    } else {
      setEnableTabs(false)
    }
  }, [tabsConfig?.enableTabs])

  useEffect(() => {
    if (contentType === CONTENT_TYPE?.HAMPERS && enableTabs) {
      setSelectedTab(0)
      setSearchFilters(hamperFilters)
    }
  }, [contentType, isMobile, enableTabs])

  let itemData = (
    (parameterMap?.length > 0 ? getListWithBrandSorting(filteredData) : getListWithBrandSorting(componentItemData)) ||
    []
  )?.map((item: any, index: any) => {
    return getItemData(item)
  })
  let groupData = {
    aesthetic: { titleColor: aesthetic?.titleColor },
    items: itemData,
    parameterMap: parameterMap,
    charactersLimit: isMobile ? mobileCharactersLimit : charactersLimit,
    largeVariant: groupLargeVariant,
    variant: groupMobileVariant,
    isHidden: isHidden,
  }
  //setting up groq data based on contentType
  useEffect(() => {
    async function fetchHotelData() {
      const routerArr = router?.asPath?.split("/")
      const hotelRouteIndex = routerArr?.findIndex((route: any) => route === hotelRoute)

      let response = await fetchHighlightedCardDataWithIdentifier(
        hotelRouteIndex > -1 ? routerArr?.[hotelRouteIndex + 1] : undefined,
        contentType,
      )

      if (response) {
        let { [contentType]: value } = response
        if (contentType === CONTENT_TYPE?.HOTEL_HOLIDAYS) {
          setComponentData(value)
          setComponentItemsData(value?.holidayDetails)
          setTitle(value?.sectionTitle)
        } else if (contentType === CONTENT_TYPE?.HOTEL_EVENT_VENUES) {
          setComponentData({
            ...value?.eventVenues,
            hotelId: response?.hotelId || "",
          })
          setComponentItemsData(value?.eventVenues?.eventVenueDetails)
          setFilteredData(value?.eventVenues?.eventVenueDetails)
          setTitle(value?.eventVenues?.sectionTitle)
        } else if (contentType === CONTENT_TYPE?.HOTEL_EXPERIENCES) {
          setComponentData(value?.experienceDetails)
          setComponentItemsData(value?.experienceDetails)
          setTitle(value?.experienceDetails?.sectionTitle)
        }
      }
    }

    const fetchMeetings = async () => {
      let response = await fetchMeetingsData()
      if (response) {
        setTitle(title)
        if (Array?.isArray(response)) {
          setComponentItemsData(response)
          setFilteredData(response)
        }
      }
    }
    const fetchHampersData = async () => {
      let response = await staticHamperData()
      if (response) {
        setTitle(title)
        const hotelData = response?.participatingHotels
        if (Array?.isArray(hotelData)) {
          setComponentItemsData(hotelData)
          setFilteredData(hotelData)
          setTabBasedFilteredData(hotelData)
          let cities = ["All", ...removeDuplicatesAndSort(hotelData?.map((item: any) => item?.city)?.flat())]
          setTabs(
            cities?.map((item: any) => ({
              title: item?.toUpperCase(),
              handleProperty: (tabIndex: any) => {
                setSelectedTab(() => tabIndex)
              },
            })),
          )
        }
      }
    }

    const fetchHotelType = async (type: string = CONTENT_TYPE?.PALACES) => {
      let response = await HotelTypeData(type, `lower(brandName) == "taj"`)
      if (response) {
        setTitle(title)
        if (Array?.isArray(response)) {
          setComponentItemsData(response)
          setFilteredData(response)
        }
      }
    }
    const fetchNonIHCLHotelType = async (type: string = CONTENT_TYPE?.PALACES) => {
      let response = await HotelTypeData(type, `lower(brandName) != "taj"`)
      if (response) {
        setTitle(title)
        if (Array?.isArray(response)) {
          setComponentItemsData(response)
          setFilteredData(response)
        }
      }
    }
    const fetchAllIHCLHotelsData = async () => {
      let response = await AllIHCLHotelsData()
      if (response) {
        setTitle(title)
        if (Array?.isArray(response)) {
          setComponentItemsData(response)
          setFilteredData(response)
        }
      }
    }
    if (contentType === CONTENT_TYPE?.ALL_EVENTS_VENUES || contentType === CONTENT_TYPE?.WEDDING_VENUES) {
      fetchMeetings()
    } else if (
      contentType === CONTENT_TYPE?.PALACES ||
      contentType === CONTENT_TYPE?.HOTELS ||
      contentType === CONTENT_TYPE?.SAFARIS ||
      contentType === CONTENT_TYPE?.RESORTS
    ) {
      fetchHotelType(contentType)
    } else if (
      contentType === CONTENT_TYPE?.NON_IHCL_PALACES ||
      contentType === CONTENT_TYPE?.NON_IHCL_RESORTS ||
      contentType === CONTENT_TYPE?.NON_IHCL_SAFARIS ||
      contentType === CONTENT_TYPE?.NON_IHCL_HOTELS
    ) {
      fetchNonIHCLHotelType(contentType?.split("NonIHCL")?.[1])
    } else if (
      contentType === CONTENT_TYPE?.HOTEL_EXPERIENCES ||
      contentType === CONTENT_TYPE?.HOTEL_EVENT_VENUES ||
      contentType === CONTENT_TYPE?.HOTEL_HOLIDAYS
    ) {
      fetchHotelData()
    } else if (contentType === CONTENT_TYPE?.HAMPERS) {
      fetchHampersData()
    } else if (contentType === CONTENT_TYPE?.ALL_IHCL_HOTELS) {
      fetchAllIHCLHotelsData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, isMobile])
  //setting up facets/dropdown data based on contentType
  useEffect(() => {
    if (parameterMap?.length > 0) {
      if (contentType === CONTENT_TYPE?.HOTEL_EVENT_VENUES) {
        setFacets(() => ({
          seating_style: removeDuplicatesAndSort(componentItemData?.map((item: any) => item?.seatingStyles)?.flat()),
          capacity: CAPACITY_DATA,
        }))
      } else if (
        contentType === CONTENT_TYPE?.PALACES ||
        contentType === CONTENT_TYPE?.SAFARIS ||
        contentType === CONTENT_TYPE?.HOTELS ||
        contentType === CONTENT_TYPE?.RESORTS
      ) {
        setFacets(() => ({
          hotel_name: removeDuplicatesAndSort(componentItemData?.map((item: any) => item?.hotelName)),
        }))
      } else if (contentType == CONTENT_TYPE?.ALL_IHCL_HOTELS) {
        setFacets((prev: any) => ({
          ...prev,
          hotel_type: removeDuplicatesAndSort(componentItemData?.map((item: any) => item?.hotelType)),
        }))
      } else if (contentType === CONTENT_TYPE?.ALL_EVENTS_VENUES) {
        setFacets(() => ({
          hotel_name: removeDuplicatesAndSort(componentItemData?.map((item: any) => item?.hotelName)),
          // event: removeDuplicatesAndSort(
          //   componentItemData?.map((item: any) => item?.eventType)
          // ),
          seating_style: removeDuplicatesAndSort(componentItemData?.map((item: any) => item?.seatingStyles)?.flat()),
          capacity: CAPACITY_DATA,
        }))
      } else if (contentType === CONTENT_TYPE?.WEDDING_VENUES) {
        setFacets(() => ({
          hotel_name: removeDuplicatesAndSort(componentItemData?.map((item: any) => item?.hotelName)),
          theme: removeDuplicatesAndSort(componentItemData?.map((item: any) => item?.themes)),
          capacity: CAPACITY_DATA,
        }))
      } else {
      }
    }
  }, [componentItemData, contentType, parameterMap, isMobile])

  //filters
  const getFilterComponent = () => {
    return (
      <>
        <VenueSearchFilter
          originalData={contentType === CONTENT_TYPE?.HAMPERS ? tabBasedFilteredData : componentItemData}
          setFilteredData={setFilteredData}
          filteredData={filteredData}
          filters={parameterMap}
          filterAlignment={filterAlignment}
          setSearchFilters={setSearchFilters}
          searchFilters={searchFilters}
          facets={facets}
          getKey={getKey}
          title={title}
          sectionTitle={sectionTitle}
          aesthetic={cardAesthetic}
        />
      </>
    )
  }
  return (
    <Box
      sx={{
        padding: isMobile ? aesthetic?.padding?.mobile || "" : aesthetic?.padding?.desktop || "",
        background: aesthetic?.gradient || aesthetic?.backgroundColor?.hex,
      }}>
      <MultiRowTitle
        isMobileComponentFullWidth={isMobileComponentFullWidth}
        charactersLimit={isMobile ? mobileCharactersLimit : charactersLimit}
        variant={groupMobileVariant}
        isComponentFullWidth={isComponentFullWidth}
        title={{ ...sectionTitle, headingElement: title?.headingElement }}
        alignmentVariant={alignmentVariant}
        subTitle={contentType === CONTENT_TYPE?.HAMPERS ? description || "" : componentData?.description}
        aesthetic={aesthetic}
        singleGroupContent={componentData?.enrichedDescription}
      />
      {enableTabs &&
        ihclContext?.renderComponent("group", {
          ...{
            largeVariant: "ihcl.core.group.multi-static-with-tabs",
            variant: "ihcl.core.group.option-selector-popup-modal",
            items: tabs,
            _type: "group",
            isHidden: false,
            headingElementForTab: tabsConfig?.headingElementForTab,
            aesthetic: {
              padding: {
                desktop: "0vw",
                mobile: `0vw 0vw ${MobilePxToVw(55)}`,
              },
            },
            disablePaddings: true,
            setParentIndex: (currentIndex: any) => {
              if (isMobile) {
                setSelectedTab(currentIndex)
              }
            },
          },
        })}
      {parameterMap?.length > 0 && (
        <Box
          sx={{
            padding: isMobile ? (isMobileComponentFullWidth ? "0 8.215vw 2vw" : "initial") : "initial",
          }}>
          {getFilterComponent()}
        </Box>
      )}
      {ihclContext?.renderComponent("group", {
        ...groupData,
      })}
    </Box>
  )
}

export default observer(HotelDetailsThreeColumnGrid)
