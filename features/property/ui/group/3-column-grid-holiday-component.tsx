import { useRouter } from "next/router"
import { useAesthetics } from "../../../../utils/fetchAsthetics"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { Box } from "@mui/system"
import { observer } from "mobx-react-lite"
import { useContext, useState, useEffect } from "react"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import SearchFilter from "../../../destination/ui/searchComponent/SearchFilter"
import { hotelRoute, offersRoute } from "../constants"
import { fetchHolidaysTabs } from "../../../../utils/fetchHolidaysTabs"
import { fetchTabsVariants } from "../../../../utils/fetchTabsVariants"
import {
  fetchDestinationsHolidayThemePackages,
  fetchHolidayThemePackages,
} from "../../../../utils/fetchHolidayThemePackages"
import {
  fetchDestinationHolidaysExperiences,
  fetchHolidaysExperiences,
} from "../../../../utils/fetchHolidayExperiences"
import { fetchDestinationHolidayAllTabData, fetchHolidayAllTabData } from "../../../../utils/fetchHolidayAllTabData"
import { useAppNavigation } from "../../../../utils/NavigationUtility"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import { DestinationStore, HolidayStore, OffersStore, UserStore } from "../../../../store"
import { fetchDestinationHolidayTabs } from "../../../../utils/fetchDestinationHolidayTabs"
import MultiRowTitle from "../../../../components/hoc/title/multi-row-title"
import { getFilterStringCheck } from "../../../../utils/getFilterStringCheck"
import { groq } from "next-sanity"
import { getClient } from "../../../../lib-sanity"
import { externalNavigation } from "../../../../components/constants"
import { CrossSiteNavigation } from "../../../../utils/sso/cross-site-navigation"
import { useLoggedIn } from "../../../../utils/hooks/useLoggedIn"
import { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import getNonTajBrandCrossURL from "../../../../utils/getCrossBrandURL"
import {
  addDaysToDate,
  dateFormatConverter,
  formatDateEnGB,
  formatDateWithHyphen,
  getDayAfterTomorrowDate,
  getTomorrowDate,
} from "../../../../utils/getDate"
import dayjs from "dayjs"
import BookingFlowGlobalStore from "../../../booking/store/globalStore/booking.flow.store"

const ThreeColumnGridHolidays = ({
  aesthetic,
  contentType,
  cardActionType,
  charactersLimit,
  alignmentVariant,
  cardMobileVariant,
  cardAlignmentVariant,
  cardLargeVariant,
  parameterMap,
  filterAlignment,
  title,
  headingElementForCard,
  cardCharactersLimit,
  mobileCardCharactersLimit,
}: any) => {
  const navigate = useAppNavigation()
  let ctaActionData = cardActionType?.find((action: any) => action?.actionType === "ctaLabel")?.ctaLabel
  const isLogin = useLoggedIn()
  const isMobile = useMobileCheck()
  const router = useRouter()
  const ihclContext = useContext(IHCLContext)
  const destinationStore = ihclContext?.getGlobalStore(GLOBAL_STORES.destinationStore) as DestinationStore
  const offerStore = ihclContext?.getGlobalStore(GLOBAL_STORES?.offerStore) as OffersStore
  const userStore = ihclContext?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const holidayStore: any = ihclContext?.getGlobalStore(GLOBAL_STORES.holidayStore) as HolidayStore
  const bookingFlowGlobalStore = ihclContext?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore

  const [componentItemData, setComponentItemsData] = useState<any>()
  const [fetchResponse, setFetchResponse] = useState<any>()
  const [groupData, setGroupData] = useState<any>()

  const [facets, setFacets] = useState<any>({ destination: [], theme: [] })
  const [componentTitle, setComponentTitle] = useState(title)
  const [componentDescription, setComponentDescription] = useState("")
  const [searchFilters, setSearchFilters] = useState<any>({
    destination: "",
    theme: "",
  })
  const [themeType, setThemeType] = useState<any>()
  const [themes, setThemes] = useState<any>([])
  const [selectedType, setSelectedType] = useState(0)
  const [tabData, setTabsData] = useState<any>()
  const [selectedMultipackageOfferData, setSelectedMultipackageOfferData] = useState<any>()

  const { setSelectedHolidayTab, selectedHolidayTab, setSelectedHolidayFilter, selectedHolidayFilter } = holidayStore

  useEffect(() => {
    const itemsData = Array?.isArray(componentItemData) ? componentItemData : []
    if ((contentType === "holidayOffers" || contentType === "holidayOffersNonIHCL") && Array?.isArray(itemsData)) {
      switch (contentType) {
        case "holidayOffers":
          destinationStore?.setTajDestinationsHotelsCount(itemsData?.length)
          break
        case "holidayOffersNonIHCL":
          destinationStore?.setNonTajDestinationsHotelsCount(itemsData?.length)
          break
        default:
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    componentItemData,
    contentType,
    destinationStore?.nonTajDestinationsHotelsCount,
    destinationStore?.tajDestinationsHotelsCount,
  ])

  useEffect(() => {
    const fetchData = async () => {
      const offerMapString = destinationStore?.destinationData?.[0]?.participatingHotels?.map((obj: any) => {
        return `hotels[].participatingHotels[]._ref match "${obj?._id}"`
      })
      const participatingOffersMapString = destinationStore?.destinationData?.[0]?.participatingHotels?.map(
        (obj: any) => {
          return `participatingHotels[]._ref match "${obj?._id}"`
        },
      )
      const data: any =
        contentType === "holidayOffers" || contentType === "holidayOffersNonIHCL"
          ? await fetchHolidaysTabs()
          : await fetchDestinationHolidayTabs(offerMapString?.join("||"), participatingOffersMapString?.join("||"))
      if (
        data?.tabs?.length > 0 &&
        (contentType === "holidayOffers" ||
          contentType === "destinationHolidayOffers" ||
          contentType === "holidayOffersNonIHCL")
      ) {
        setThemes(data?.tabs)
      }
    }
    if (
      contentType === "holidayOffers" ||
      contentType === "destinationHolidayOffers" ||
      contentType === "holidayOffersNonIHCL"
    ) {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentType, router])
  const removeDuplicates = (arr: any, keys: any) => {
    return arr?.filter(
      (
        (s) => (o: any) =>
          ((k) => !s?.has(k) && s?.add(k))(keys.map((k: any) => o?.[k])?.join("|"))
      )(new Set()),
    )
  }

  useEffect(() => {
    const fetchData = async () => {
      const offerMapString = destinationStore?.destinationData?.[0]?.participatingHotels?.map((obj: any) => {
        return `hotels[].participatingHotels[]._ref match "${obj?._id}"`
      })
      const IDMatch = destinationStore?.destinationData?.[0]?.participatingHotels?.map((obj: any) => {
        return `@->._id match "${obj?._id}"`
      })
      const participatingOffersMapString = destinationStore?.destinationData?.[0]?.participatingHotels?.map(
        (obj: any) => {
          return `participatingOffers[]->.hotels[].participatingHotels[]._ref match "${obj?._id}"`
        },
      )
      if (themes?.length > 0 && themes[selectedType]?.identifier && themes[selectedType]?.type === "theme") {
        const data: any =
          contentType === "destinationHolidayOffers"
            ? await fetchDestinationsHolidayThemePackages(
                themes[selectedType]?.identifier,
                offerMapString?.join("||"),
                IDMatch?.join("||"),
              )
            : contentType === "holidayOffersNonIHCL"
            ? await fetchHolidayThemePackages(themes[selectedType]?.identifier, `!= "taj"`)
            : await fetchHolidayThemePackages(themes[selectedType]?.identifier, `== "taj"`)
        setComponentItemsData(data?.[0]?.participatingHotels)
        setFetchResponse(data?.[0]?.participatingHotels)
        setSearchFilters({ destination: "", theme: "" })
        setThemeType("theme")
      } else if (
        themes?.length > 0 &&
        themes[selectedType]?.identifier &&
        themes[selectedType]?.type === "experience"
      ) {
        const data: any =
          contentType === "destinationHolidayOffers"
            ? await fetchDestinationHolidaysExperiences(
                themes[selectedType]?.identifier,
                participatingOffersMapString?.join("||"),
                IDMatch?.join("||"),
              )
            : contentType === "holidayOffersNonIHCL"
            ? await fetchHolidaysExperiences(themes[selectedType]?.identifier, `!= "taj"`)
            : await fetchHolidaysExperiences(themes[selectedType]?.identifier, `== "taj"`)
        let hotels: any = []
        setSearchFilters({ destination: "", theme: "" })
        data?.[0]?.themes?.map?.((obj: any) => {
          hotels = [
            ...hotels,
            ...obj?.participatingHotels?.filter((hotelData: any) => {
              return obj?.comparingHotels?.findIndex((val: any) => val?.identifier === hotelData?.identifier) > -1
            }),
          ]
        })
        setComponentItemsData(removeDuplicates(hotels, ["hotelId", "identifier"]))
        setFetchResponse(data?.[0])
        setThemeType("experience")
      } else if (
        themes?.length > 0 &&
        themes[selectedType]?.identifier &&
        themes[selectedType]?.type?.toLowerCase() === "all"
      ) {
        const data: any =
          contentType == "destinationHolidayOffers"
            ? await fetchDestinationHolidayAllTabData(offerMapString?.join("||"), IDMatch?.join("||"))
            : contentType === "holidayOffersNonIHCL"
            ? await fetchHolidayAllTabData(`!= "taj"`)
            : await fetchHolidayAllTabData(`== "taj"`)
        setComponentDescription(destinationStore?.destinationData?.[0]?.holidaysTab?.description)
        setComponentTitle(destinationStore?.destinationData?.[0]?.holidaysTab?.sectionTitle)
        setComponentItemsData(removeDuplicates(data?.participatingHotels, ["hotelId", "identifier"]))
        setFetchResponse(removeDuplicates(data?.participatingHotels, ["hotelId", "identifier"]))
        setSearchFilters({ destination: "", theme: "" })
        setThemeType("all")
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType, themes])

  useEffect(() => {
    if (contentType !== "holidayOffersNonIHCL" && contentType !== "destinationHolidayOffers") {
      setSelectedHolidayTab(selectedType)
    }
    if (contentType === "holidayOffersNonIHCL" && selectedHolidayTab > -1) {
      setSelectedType(selectedHolidayTab)
    }
  }, [contentType, selectedHolidayTab, selectedType, setSelectedHolidayTab])

  useEffect(() => {
    if (themes[selectedType]?.type === "experience") {
      let themeArr = fetchResponse?.themes?.map(({ title }: any) => title)
      setFacets({
        ...facets,
        theme: themeArr?.length > 0 ? themeArr : [],
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchResponse])

  const getKey: any = (index: number, filters: any): string => {
    return filters ? Object?.keys(filters)?.[index] : ""
  }

  const selectedPackageOffer = async (hotel_ref?: string | undefined) => {
    const query = groq`*[_type == "offerPackages" && offerType != "cug" && holidayOffer == true && hotels[].participatingHotels[]._ref match "${hotel_ref}"]{
      "inclusionIdentifier":identifier,lengthOfStay,
        title}`
    let data
    await getClient(true)
      .fetch(query)
      .then((res) => {
        data = res
        // setParticipatingHotels(res?.hotels?.[0]?.participatingHotels)
        setSelectedMultipackageOfferData(res)
        return res
      })
      .catch((err) => {
        data = err
      })
    return data
  }

  const getHotelDetailUrl = (item: any) => {
    const brand = item?.brandName?.toUpperCase()
    const navUrl = externalNavigation[brand]
    if (item?.brandName?.toLowerCase() !== "taj") {
      return `${navUrl}/${item?.identifier}/${offersRoute}?`
    } else if (themes[selectedType]?.type === "theme") {
      return `/${hotelRoute}/${item?.identifier}/${offersRoute}/${themes[selectedType]?.identifier}?journeyFrom=HOLIDAYS`
    } else {
      return `/${hotelRoute}/${item?.identifier}/${offersRoute}?journeyFrom=HOLIDAYS#hotelHolidays`
    }
  }

  useEffect(() => {
    setGroupData({
      items:
        componentItemData?.length > 0
          ? componentItemData?.map((item: any, index: any) => {
              const ctaLabelAction = () => {
                const brand = item?.brandName?.toUpperCase()
                const navUrl = externalNavigation[brand]
                if (item?.brandName?.toLowerCase() !== "taj") {
                  CrossSiteNavigation({
                    url: `${navUrl}/${item?.identifier}/${offersRoute}?`,
                    loggedIn: isLogin,
                    userStore,
                  })
                } else if (themes[selectedType]?.type === "theme") {
                  navigate(
                    `/${hotelRoute}/${item?.identifier}/${offersRoute}/${themes[selectedType]?.identifier}?journeyFrom=HOLIDAYS`,
                  )
                } else {
                  navigate(`/${hotelRoute}/${item?.identifier}/${offersRoute}?journeyFrom=HOLIDAYS#hotelHolidays`)
                }
              }
              const onPrimaryClick = async () => {
                const primaryActionData =
                  cardActionType?.length > 0
                    ? cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction
                    : {}

                const handleRedirection = async () => {
                  const URL = await getNonTajBrandCrossURL(
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
                    offerStore?.offersData?.promoCode,
                    offerStore?.offersData?.rateCode,
                  )
                  await CrossSiteNavigation({
                    url: URL,
                    loggedIn: isLogin,
                    userStore,
                  })
                }
                const emptyActionData =
                  cardActionType?.length > 0
                    ? cardActionType?.find((action: any) => action?.actionType === "emptyLink")?.emptyLink
                    : {}
                if (themes[selectedType]?.type?.toLowerCase() === "theme") {
                  if (item?.brandName?.toLocaleLowerCase() !== "taj" && item?.brandName) {
                    handleRedirection()
                  } else {
                    let themeOffersNavigateURL = `${primaryActionData?.url}?hotelId=${item?.hotelId}&isFromOLP=true&journeyFrom=HOLIDAYS`
                    if (themes[selectedType]?.rateCode) {
                      themeOffersNavigateURL =
                        `${themeOffersNavigateURL}` + `&offerRateCode=${themes[selectedType]?.rateCode}`
                    }
                    if (themes[selectedType]?.promoCode) {
                      themeOffersNavigateURL =
                        `${themeOffersNavigateURL}` + `&offerPromoCode=${themes[selectedType]?.promoCode}`
                    }
                    if (themes[selectedType]?.lengthOfStay) {
                      themeOffersNavigateURL =
                        `${themeOffersNavigateURL}` + `&minLOS=${themes[selectedType]?.lengthOfStay}`
                      bookingFlowGlobalStore?.setGuestBookingSchedule(
                        dateFormatConverter(getTomorrowDate()),
                        dateFormatConverter(
                          themes[selectedType]?.lengthOfStay
                            ? addDaysToDate(getTomorrowDate(), Number(themes[selectedType]?.lengthOfStay))
                            : getDayAfterTomorrowDate(),
                        ),
                      )
                    }

                    navigate(themeOffersNavigateURL, primaryActionData?.urlType)
                  }
                } else {
                  const data = await selectedPackageOffer(item?._id)
                  const packages = data || selectedMultipackageOfferData
                  await offerStore?.setSelectedOfferTitle({
                    title: item.hotelName,
                    rateCode: item?.rateCode,
                    promoCode: packages ? "" : item?.promoCode,
                    participatingHotels: [],
                    selectedOfferType: "holidayPackage",
                    packages: packages,
                    hotelInformation: {
                      hotelName: item.hotelName,
                      hotelId: item?.hotelId,
                      brandName: item?.brandName,
                      city: item?.hotelAddress?.city,
                      country: item?.hotelAddress?.country,
                      pincode: item?.hotelAddress?.pincode,
                      state: item?.hotelAddress?.state,
                      hotelType: item?.hotelType,
                      synxisHotelId: item?.synxisHotelId,
                      hotelCode: item?.hotelCode,
                      identifier: item?.identifier,
                    },
                    selectedTab: tabData?.items?.[selectedType]?.title,
                    userSelectedPackage: packages?.find((item: any) => item?.title === searchFilters?.theme),
                  })
                  navigate(emptyActionData?.url, emptyActionData?.urlType)
                }
              }
              return {
                ...item,
                title: item?.hotelName,
                description: item?.hotelDescription,
                alignmentVariant: cardAlignmentVariant,
                variant: cardMobileVariant,
                largeVariant: cardLargeVariant,
                url: getHotelDetailUrl(item),
                _type: "card",
                primaryAction:
                  cardActionType?.length > 0
                    ? cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction
                    : {},
                ctaLabelAction,
                ctaLabel: ctaActionData?.title,
                urlType: ctaActionData?.urlType,
                largeImage: item?.thumbnail?.[0]?.imageAsset?.largeImage?.[0],
                image: item?.thumbnail?.[0]?.imageAsset?.image?.[0],
                isFromProperty: true,
                headingElementForCard: headingElementForCard,
                onPrimaryClick,
                selectedTab: tabData?.items?.[selectedType]?.title,
                selectedTheme: searchFilters?.theme,
                charactersLimit: isMobile ? mobileCardCharactersLimit : cardCharactersLimit,
              }
            })
          : [],
      charactersLimit: charactersLimit,
      largeVariant: "ihcl.core.group.group-with-3-column-cards-grid",
      variant: "ihcl.core.group.group-with-3-column-cards-grid",
      isComponentFullWidth: true,
      subTitle: "",
      isMobileComponentFullWidth: true,
      alignmentVariant: alignmentVariant,
      title: contentType !== "destinationHolidayOffers" ? title : "",
      aesthetic,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentItemData])

  useEffect(() => {
    let hotels: any = []
    if (
      (parameterMap?.length > 0 &&
        themes[selectedType]?.type === "experience" &&
        (contentType === "holidayOffers" || contentType === "destinationHolidayOffers")) ||
      (contentType === "holidayOffersNonIHCL" && themes[selectedType]?.type === "experience")
    ) {
      fetchResponse?.themes?.map?.((obj: any) => {
        hotels = [
          ...hotels,
          ...obj?.participatingHotels?.filter((hotelData: any) => {
            return obj?.comparingHotels?.findIndex((val: any) => val?.identifier === hotelData?.identifier) > -1
          }),
        ]
      })
      const arr = removeDuplicates(hotels, ["hotelId", "identifier"])
      const searchQueryFilter =
        searchFilters?.theme && searchFilters?.theme !== ""
          ? fetchResponse?.themes
              ?.filter((val: any) => {
                return val?.title?.toLowerCase() === searchFilters?.theme?.toLowerCase()
              })?.[0]
              ?.participatingHotels?.filter((hotelData: any) => {
                return (
                  fetchResponse?.themes
                    ?.filter((val: any) => {
                      return val?.title?.toLowerCase() === searchFilters?.theme?.toLowerCase()
                    })?.[0]
                    ?.comparingHotels?.findIndex((val: any) => val?.identifier === hotelData?.identifier) > -1
                )
              })
          : arr
      const filterCheck =
        searchFilters?.destination && searchFilters?.destination !== ""
          ? searchQueryFilter?.filter((val: any) => {
              return getFilterStringCheck(val?.hotelName)?.includes(getFilterStringCheck(searchFilters?.destination))
            })
          : searchQueryFilter

      setComponentItemsData(filterCheck)
    } else if (
      (parameterMap?.length > 0 &&
        themes[selectedType]?.type !== "experience" &&
        (contentType === "holidayOffers" || contentType === "destinationHolidayOffers")) ||
      (contentType === "holidayOffersNonIHCL" && themes[selectedType]?.type !== "experience")
    ) {
      const searchQueryFilter =
        searchFilters?.destination && searchFilters?.destination !== ""
          ? fetchResponse?.filter((val: any) => {
              return getFilterStringCheck(val?.hotelName)?.includes(getFilterStringCheck(searchFilters?.destination))
            })
          : fetchResponse
      setComponentItemsData(searchQueryFilter)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFilters, fetchResponse, contentType])

  useEffect(() => {
    if (contentType === "holidayOffers") {
      setSelectedHolidayFilter(searchFilters)
    }
    if (contentType === "holidayOffersNonIHCL") {
      setSearchFilters(selectedHolidayFilter)
    }
  }, [contentType, searchFilters, setSelectedHolidayFilter, selectedHolidayFilter])

  const getFilterComponent = () => {
    return (
      <SearchFilter
        filters={themes[selectedType]?.type !== "experience" ? [parameterMap?.[0]] : parameterMap}
        filterAlignment={filterAlignment}
        setSearchFilters={setSearchFilters}
        searchFilters={searchFilters}
        facets={facets}
        getKey={getKey}
      />
    )
  }

  useEffect(() => {
    if (themes?.length > 0) {
      setTabsData(fetchTabsVariants(themes, setSelectedType))
    }
  }, [themes])

  return (
    <Box
      sx={{
        display: contentType === "holidayOffersNonIHCL" ? (groupData?.items?.length > 0 ? "block" : "none") : "block",
        background: aesthetic?.backgroundColor?.hex,
        padding:
          contentType === "destinationHolidayOffers"
            ? `5.45vw  ${isMobile ? MobilePxToVw(82) : "0"}`
            : contentType === "holidayOffers" || contentType === "holidayOffersNonIHCL"
            ? `5.45vw  ${isMobile ? "12.8vw" : "0"}`
            : "5.45vw 0",
      }}>
      {contentType === "destinationHolidayOffers" && (
        <Box>
          <MultiRowTitle
            title={{
              ...componentTitle,
              headingElement: title?.headingElement,
            }}
            charactersLimit={charactersLimit}
            aesthetic={aesthetic}
            subTitle={componentDescription}
            alignmentVariant={alignmentVariant}
            isComponentFullWidth={true}
            isMobileComponentFullWidth={false}
            isFilterAvailable={parameterMap?.length > 0}
          />
        </Box>
      )}
      {(contentType === "holidayOffers" || contentType === "destinationHolidayOffers") &&
        ihclContext?.renderComponent("group", tabData)}
      {themeType === "experience" && parameterMap?.length > 0 && (
        <Box
          sx={{
            padding: isMobile ? "12vw 0 2vw" : "0vw 12.5vw",
          }}>
          {getFilterComponent()}
        </Box>
      )}
      {themeType !== "experience" && parameterMap?.length > 0 && (
        <Box
          sx={{
            padding: isMobile ? "12vw 0 2vw" : "0vw 12.5vw",
          }}>
          {getFilterComponent()}
        </Box>
      )}

      {contentType === "holidayOffers" &&
        !(destinationStore?.tajDestinationsHotelsCount < 1 && destinationStore?.nonTajDestinationsHotelsCount > 0) &&
        ihclContext?.renderComponent("group", groupData)}
      {contentType === "holidayOffersNonIHCL" &&
        destinationStore?.nonTajDestinationsHotelsCount > 0 &&
        ihclContext?.renderComponent("group", groupData)}
      {contentType !== "holidayOffers" &&
        contentType !== "holidayOffersNonIHCL" &&
        ihclContext?.renderComponent("group", groupData)}
    </Box>
  )
}

export default observer(ThreeColumnGridHolidays)
