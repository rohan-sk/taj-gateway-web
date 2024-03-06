import { observer } from "mobx-react-lite"
import React, { useContext, useState, useEffect } from "react"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { Box, Stack } from "@mui/material"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import { BrandRestaurantStore, DestinationStore, HamperStore, UserStore } from "../../../../store"
import MultiRowTitle from "../../../../components/hoc/title/multi-row-title"
import { useRouter } from "next/router"
import { fetchDestinationRestaurants } from "../../../../utils/fetchDestinationRestaurants"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { fetchDestinationExperiences } from "../../../../utils/fetchDestinationExperiences"
import { hotelRoute, restaurantsRoute } from "../../../property/ui/constants"
import { fetchDestinationSignatureTreatments } from "../../../../utils/fetchDestinationSignatureTreatments"
import SearchFilter from "../searchComponent/SearchFilter"
import fetchRestaurants from "../../../../utils/fetchRestaurants"
import { CONTACT_MAIL_ICON, CONTACT_PHONE_ICON } from "../../../../components/forms/gift-card-form/constants"
import { getFilterStringCheck } from "../../../../utils/getFilterStringCheck"
import { externalNavigation } from "../../../../components/constants"
import { useLoggedIn } from "../../../../utils/hooks/useLoggedIn"
import { PathType } from "../../../../types"
import fetchParnterPrograms from "../../../../utils/fetchParnterPrograms"
import fetchLuxurySpas from "../../../../utils/fetchLuxurySpas"
import { getListWithBrandSorting } from "../../../../utils/getListWithBrandSorting"
import { useAppNavigation } from "../../../../utils/NavigationUtility"
import ModalStore from "../../../../store/global/modal.store"
import { handler as searchListing } from "../../../search/api/handlers/searchListing.service"
import useLocation from "../../../../utils/hooks/useLocation"
import getNonTajBrandCrossURL from "../../../../utils/getCrossBrandURL"
import {
  formatDateEnGB,
  formatDateWithHyphen,
  getDayAfterTomorrowDate,
  getTomorrowDate,
} from "../../../../utils/getDate"
import dayjs from "dayjs"
import { CrossSiteNavigation } from "../../../../utils/sso/cross-site-navigation"

const DESTINATIONHIGHLIGHTSCARDCAROUSEL = ({
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
  groupMobileVariant,
  mobileCardCharactersLimit,
  cardCharactersLimit,
  title,
  heading,
  headingElementForCard,
  mobileCharactersLimit,
}: any) => {
  const getLocation = useLocation()
  const cardBackgroundColor = aesthetic?.backgroundColor?.hex
  let ctaActionData = cardActionType?.find((action: any) => action?.actionType === "ctaLabel")?.ctaLabel
  const isLogin = useLoggedIn()
  const isMobile = useMobileCheck()
  const router: any = useRouter()
  const modalStore = ModalStore?.getInstance()
  const navigate = useAppNavigation()
  const ihclContext = useContext(IHCLContext)
  const destinationStore = ihclContext?.getGlobalStore(GLOBAL_STORES.destinationStore) as DestinationStore
  const brandRestaurantStore = ihclContext?.getGlobalStore(GLOBAL_STORES.brandRestaurantStore) as BrandRestaurantStore
  const userStore = ihclContext?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const hamperStore = ihclContext?.getGlobalStore(GLOBAL_STORES.hamperStore) as HamperStore
  const { selectedCountry, selectedDestinationFilter, setNonTajDestinationsHotelsCount } = destinationStore
  const { setSelectedHamperInfo } = hamperStore
  const [componentItemData, setComponentItemsData] = useState<any>()
  const [compTitle, setTitle] = useState<any>("")
  const [subTitle, setSubtitle] = useState<any>("")
  const [alignment, setAlignment] = useState<any>("")
  const [fetchResponse, setFetchResponse] = useState<any>()
  const [groupData, setGroupData] = useState<any>()
  const [facets, setFacets] = useState<any>(
    contentType === "clubVistaraAirlinesPartners" ? { hotel_type: [] } : { hotel_name: [] },
  )
  const [searchFilters, setSearchFilters] = useState<any>(
    contentType === "allRestaurants"
      ? {
          hotel_search: router?.query?.destination ?? "",
          restaurant_search: router?.query?.restaurant_brand ?? "",
          cuisine_search: router?.query?.restaurant_cuisine ?? "",
        }
      : contentType === "clubVistaraAirlinesPartners" ||
          contentType === "khazanaShoppingPartner" ||
          contentType === "hotelProgramsChambers" ||
          contentType === "hotelProgramsHampers" ||
          contentType === "hamperDetails"
        ? {
            destination: "",
            hotel_type: "",
          }
        : contentType === "jWellnessLuxurySpa"
          ? { city: "", therapy: "" }
          : {
              hotel_name: "",
              q: "",
            },
  )

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

  useEffect(() => {
    const fetchData = async () => {
      if (contentType === "allRestaurants") {
        let response = await fetchRestaurants()
        if (String(getLocation?.latitude) !== "null") {
          const resp = await searchListing.apiCall({
            category: "restaurant",
            distance: 200,
            latitude: String(getLocation?.latitude),
            longitude: String(getLocation?.longitude),
            q: "nearbyRestaurants",
          })
          response.sort((initial: any, compare: any) => {
            const indexA = resp?.data?.findIndex((obj: any) => obj.restaurant_identifier === initial.identifier)
            const indexB = resp?.data?.findIndex((obj: any) => obj.restaurant_identifier === compare.identifier)
            if (indexA === -1) return 1 // Move unmatched elements to the end
            if (indexB === -1) return -1 // Move unmatched elements to the end
            return indexA - indexB // Sort based on the index in resp
          })

          setComponentItemsData(response)
          setFetchResponse(response)
          setSearchFilters({
            hotel_search: router?.query?.destination ?? "",
            restaurant_search: router?.query?.restaurant_brand ?? "",
            cuisine_search: router?.query?.restaurant_cuisine ?? "",
          })
        } else {
          setComponentItemsData(response)
          setFetchResponse(response)
          setSearchFilters({
            hotel_search: router?.query?.destination ?? "",
            restaurant_search: router?.query?.restaurant_brand ?? "",
            cuisine_search: router?.query?.restaurant_cuisine ?? "",
          })
        }
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getLocation, contentType, router])

  useEffect(() => {
    async function fetchData() {
      const mapString = destinationStore?.destinationData?.[0]?.participatingHotels?.map((obj: any) => {
        return `participatingHotels[]._ref match "${obj?._id}"`
      })
      const experiencesMapString = destinationStore?.destinationData?.[0]?.participatingHotels?.map((obj: any) => {
        return `_ref match "${obj?._id}"`
      })
      let response: any =
        contentType === "clubVistaraAirlinesPartners"
          ? await fetchParnterPrograms("club-vistara")
          : contentType === "khazanaShoppingPartner"
            ? await fetchParnterPrograms("khazana")
            : contentType === "hotelProgramsChambers"
              ? await fetchParnterPrograms("chambers")
              : contentType === "hotelProgramsHampers"
                ? await fetchParnterPrograms("hampers")
                : contentType === "destinationsSpa"
                  ? await fetchDestinationSignatureTreatments(
                      mapString?.join("||"),
                      experiencesMapString?.join("||"),
                      destinationStore?.destinationData?.[0]?.identifier,
                    )
                  : contentType === "destinationsExperiences"
                    ? await fetchDestinationExperiences(
                        mapString?.join("||"),
                        experiencesMapString?.join("||"),
                        destinationStore?.destinationData?.[0]?.identifier,
                      )
                    : contentType === "jWellnessLuxurySpa"
                      ? await fetchLuxurySpas()
                      : await fetchDestinationRestaurants(mapString?.join("||"))
      if (response) {
        if (contentType === "allRestaurants") {
        } else if (contentType === "destinationsDining") {
          setComponentItemsData(response)
          setFetchResponse(response)
        } else if (contentType === "destinationsExperiences") {
          setTitle(destinationStore?.destinationData?.[0]?.experiencesTab?.sectionTitle)
          setSubtitle(destinationStore?.destinationData?.[0]?.experiencesTab?.description)
          setAlignment("center")
          setComponentItemsData(response)
          setFetchResponse(response)
        } else if (contentType === "destinationsSpa") {
          setTitle(destinationStore?.destinationData?.[0]?.treatments?.sectionTitle)
          setSubtitle(destinationStore?.destinationData?.[0]?.treatments?.description)
          setAlignment("regular")
          setFetchResponse(response)
          setComponentItemsData(response)
        } else if (contentType === "clubVistaraAirlinesPartners") {
          setTitle("")
          setSubtitle("")
          setAlignment("regular")
          setFetchResponse(response)
          setComponentItemsData(response)
        } else if (
          contentType === "khazanaShoppingPartner" ||
          contentType === "hotelProgramsChambers" ||
          contentType === "hotelProgramsHampers"
        ) {
          setTitle(title)
          setSubtitle(heading)
          setAlignment("regular")
          setFetchResponse(response)
          setComponentItemsData(response)
        } else if (contentType === "jWellnessLuxurySpa") {
          setFetchResponse(response)
          setComponentItemsData(response)
          setTitle(title)
          setAlignment("regular")
          setSubtitle(heading)
        }
      }
    }
    if (contentType === "destinationsHighlights") {
      setTitle(destinationStore?.destinationData?.[0]?.highlights?.sectionTitle)
      setSubtitle(destinationStore?.destinationData?.[0]?.highlights?.description)
      setComponentItemsData(destinationStore?.destinationData?.[0]?.highlights?.highlightDetails)
      setFetchResponse(destinationStore?.destinationData?.[0]?.highlights?.highlightDetails)
      setAlignment("regular")
    } else if (contentType === "allDestinations") {
      let arr: any = []
      destinationStore?.destinationData?.map((val: any) => {
        const resultSet = val?.participatingHotels?.length > 0 ? val?.participatingHotels : []
        arr = resultSet?.length > 0 ? arr.concat(resultSet) : arr
      })
      const tajFilteredList: any = arr?.filter((obj: any) => obj?.brandName !== "Taj")
      setTitle(title)
      setAlignment(alignmentVariant)
      setComponentItemsData(removeDuplicateHotels(tajFilteredList)?.filter((item: any) => item?.image !== null))
      setFetchResponse(removeDuplicateHotels(tajFilteredList)?.filter((item: any) => item?.image !== null))
    } else if (contentType === "brandRestaurantsIntro") {
      setTitle(brandRestaurantStore?.brandRestaurantData?.introSection?.sectionTitle)
      setSubtitle(brandRestaurantStore?.brandRestaurantData?.introSection?.description)
      setAlignment(alignmentVariant)
      setComponentItemsData(brandRestaurantStore?.brandRestaurantData?.introSection?.highlightDetails)
      setFetchResponse(brandRestaurantStore?.brandRestaurantData?.introSection?.highlightDetails)
    } else if (contentType === "brandRestaurantsLocations") {
      setTitle(title)
      setAlignment(alignmentVariant)
      setSubtitle(brandRestaurantStore?.brandRestaurantData?.locationsSection?.description)
      setComponentItemsData(
        brandRestaurantStore?.brandRestaurantData?.participatingRestaurants?.filter(
          (item: any) => item?.image !== null,
        ),
      )
      setFetchResponse(
        brandRestaurantStore?.brandRestaurantData?.participatingRestaurants?.filter(
          (item: any) => item?.image !== null,
        ),
      )
    } else if (contentType === "hamperDetails") {
      setTitle(title)
      setAlignment(alignmentVariant)
      setSubtitle(heading)
      setComponentItemsData(hamperStore?.hamperData?.[0]?.participatingHotels)
      setFetchResponse(hamperStore?.hamperData?.[0]?.participatingHotels)
    } else if (
      contentType === "destinationsDining" ||
      contentType === "destinationsExperiences" ||
      contentType === "destinationsSpa" ||
      contentType === "allRestaurants" ||
      contentType === "clubVistaraAirlinesPartners" ||
      contentType === "khazanaShoppingPartner" ||
      contentType === "jWellnessLuxurySpa" ||
      contentType === "hotelProgramsChambers" ||
      contentType === "hotelProgramsHampers"
    ) {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentType, router])

  useEffect(() => {
    if (selectedDestinationFilter !== null && fetchResponse?.length > 0) {
      setComponentItemsData(
        selectedDestinationFilter
          ? fetchResponse.filter((val: any) => {
              return (
                getFilterStringCheck(val?.hotelAddress?.city)?.includes(
                  getFilterStringCheck(selectedDestinationFilter),
                ) ||
                getFilterStringCheck(val?.hotelAddress?.state)?.includes(
                  getFilterStringCheck(selectedDestinationFilter),
                ) ||
                val?.hotelDestination?.some((item: string) =>
                  getFilterStringCheck(item)?.includes(getFilterStringCheck(selectedDestinationFilter)),
                )
              )
            })
          : fetchResponse,
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDestinationFilter])

  useEffect(() => {
    if (contentType === "allDestinations") {
      let arr: any = []
      destinationStore?.destinationData?.map((val: any) => {
        const resultSet = val?.participatingHotels?.length > 0 ? val?.participatingHotels : []
        arr = resultSet?.length > 0 ? arr.concat(resultSet) : arr
      })
      const tajFilteredList: any = arr?.filter((obj: any) => obj?.brandName !== "Taj")
      setFetchResponse(
        selectedCountry?.toLowerCase() === "all"
          ? tajFilteredList?.filter((item: any) => item?.image !== null)
          : tajFilteredList
              ?.filter((item: any) => item?.image !== null)
              ?.filter((city: any) => city?.hotelAddress?.country?.toLowerCase() === selectedCountry?.toLowerCase()),
      )
    }
  }, [contentType, destinationStore?.destinationData, selectedCountry])

  const removeDuplicates = (arr: any) => {
    return arr?.filter((item: any, index: number) => item && arr?.indexOf(item) === index)
  }

  useEffect(() => {
    if (contentType === "clubVistaraAirlinesPartners") {
      let hotelArr = fetchResponse?.map(({ hotelType }: any) => hotelType)
      let hotelFacets = removeDuplicates(hotelArr)
      setFacets({
        hotel_type: hotelFacets,
      })
    } else if (contentType === "jWellnessLuxurySpa") {
      setFacets({
        therapy: [
          "Signature Experiences",
          "Spa Indulgences",
          "Indian Therapies",
          "Body Scrubs and Wraps",
          "Indian Aromatherapies",
          "Beauty and Facials",
          "Ayurveda Therapies",
          "Yoga & Meditation",
        ],
      })
    } else if (contentType === "allRestaurants") {
      let hotelArr = fetchResponse?.map(({ hotelType }: any) => hotelType)
      let cuisineArr = fetchResponse
        ?.filter((item: any) => item?.cuisines && item?.cuisines?.length > 0)
        ?.map((item: any) => item?.cuisines)
      let hotelFacets = removeDuplicateHotels(hotelArr)
      let cuisineFacets = removeDuplicates(cuisineArr?.flat())
      setFacets((prev: any) => ({
        hotel_name: hotelFacets,
        cuisine_search: cuisineFacets,
      }))
    } else {
      let hotelArr = fetchResponse?.map(({ hotelName }: any) => hotelName)
      let hotelFacets = removeDuplicates(hotelArr)
      setFacets({
        hotel_name: hotelFacets,
      })
    }
  }, [contentType, fetchResponse])

  useEffect(() => {
    if (parameterMap?.length > 0) {
      if (contentType === "allRestaurants") {
        const searchQueryFilter =
          searchFilters?.hotel_search && searchFilters?.hotel_search !== ""
            ? fetchResponse?.filter((val: any) => {
                return (
                  getFilterStringCheck(val?.participatingHotels?.[0]?.hotelName)?.includes(
                    getFilterStringCheck(searchFilters?.hotel_search),
                  ) || getFilterStringCheck(val?.city)?.includes(getFilterStringCheck(searchFilters?.hotel_search))
                )
              })
            : fetchResponse
        const restaurantFilter =
          searchFilters?.restaurant_search && searchFilters?.restaurant_search !== ""
            ? searchQueryFilter?.filter((val: any) => {
                return getFilterStringCheck(val?.title)?.includes(
                  getFilterStringCheck(searchFilters?.restaurant_search),
                )
              })
            : searchQueryFilter
        const cuisineFilter =
          searchFilters?.cuisine_search && searchFilters?.cuisine_search !== ""
            ? restaurantFilter?.filter(
                (val: any) => Array?.isArray(val?.cuisines) && val?.cuisines?.includes(searchFilters?.cuisine_search),
              )
            : restaurantFilter
        setComponentItemsData(cuisineFilter ? [...cuisineFilter] : [])
      } else if (
        contentType === "clubVistaraAirlinesPartners" ||
        contentType === "khazanaShoppingPartner" ||
        contentType === "hotelProgramsChambers" ||
        contentType === "hotelProgramsHampers" ||
        contentType === "hamperDetails"
      ) {
        const searchQueryFilter =
          searchFilters?.destination && searchFilters?.destination !== ""
            ? fetchResponse?.filter((val: any) => {
                return (
                  getFilterStringCheck(val?.hotelName)?.includes(getFilterStringCheck(searchFilters?.destination)) ||
                  getFilterStringCheck(val?.city)?.includes(getFilterStringCheck(searchFilters?.destination))
                )
              })
            : fetchResponse
        const hotelFilter =
          searchFilters?.hotel_type && searchFilters?.hotel_type !== ""
            ? searchQueryFilter.filter((val: any) => {
                return val?.hotelType?.toLowerCase() === searchFilters?.hotel_type?.toLowerCase()
              })
            : searchQueryFilter
        setComponentItemsData(hotelFilter ? [...hotelFilter] : [])
      } else if (contentType === "jWellnessLuxurySpa") {
        const searchQueryFilter =
          searchFilters?.city && searchFilters?.city !== ""
            ? fetchResponse.filter((val: any) => {
                return (
                  getFilterStringCheck(val?.hotelAddress?.city)?.includes(getFilterStringCheck(searchFilters?.city)) ||
                  getFilterStringCheck(val?.hotelName)?.includes(getFilterStringCheck(searchFilters?.city))
                )
              })
            : fetchResponse
        const searchHotelQueryFilter =
          searchFilters?.therapy && searchFilters?.therapy !== ""
            ? searchQueryFilter.filter((val: any) => {
                return val?.[searchFilters?.therapy?.toLowerCase()?.replace(/ /g, "_")] === true
              })
            : searchQueryFilter
        setComponentItemsData(searchHotelQueryFilter?.length > 0 ? [...searchHotelQueryFilter] : [])
      } else {
        const searchQueryFilter =
          searchFilters?.q && searchFilters?.q !== ""
            ? fetchResponse?.filter((val: any) => {
                return contentType === "destinationsDining"
                  ? getFilterStringCheck(val?.title?.[0])?.includes(getFilterStringCheck(searchFilters?.q)) ||
                      getFilterStringCheck(val?.cuisine)?.includes(
                        getFilterStringCheck(searchFilters?.q?.toLowerCase()),
                      )
                  : getFilterStringCheck(val?.basicInfo?.title)?.includes(getFilterStringCheck(searchFilters?.q))
              })
            : fetchResponse

        const hotelFilter =
          searchFilters?.hotel_name && searchFilters?.hotel_name !== "" && searchFilters?.hotel_name?.length > 2
            ? searchQueryFilter.filter((val: any) => {
                return contentType === "brandRestaurantsLocations"
                  ? getFilterStringCheck(val?.title)?.includes(getFilterStringCheck(searchFilters?.hotel_name))
                  : val?.hotelName === searchFilters?.hotel_name
              })
            : searchQueryFilter

        setComponentItemsData(hotelFilter ? [...hotelFilter] : [])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFilters, fetchResponse])

  const getIcons = (item: any) => {
    return item === "phone" ? (
      <Box component={"img"} src={CONTACT_PHONE_ICON} alt="phone-icon" />
    ) : (
      <Box component={"img"} src={CONTACT_MAIL_ICON} alt="mail-icon" />
    )
  }

  const getKey: any = (index: number, filters: any): string => {
    return filters ? Object?.keys(filters)?.[index] : ""
  }

  useEffect(() => {
    const onPrimaryClick = (item: any) => {
      return async () => {
        const primaryAction = cardActionType?.find(
          (action: any) => action?.actionType === "primaryAction",
        )?.primaryAction
        modalStore?.setPropertyData({
          hotelId: item?.hotelId || "",
          hotelName: item?.hotelName || "",
          phone: item?.hotelContact?.phone || [],
          email: item?.hotelContact?.email || [],
          identifier: item?.identifier || "",
        })
        if (contentType === "hamperDetails") {
          const data = {
            hamperSet: hamperStore?.hamperData?.[0]?.hamperSet?.map(({ title }: any) => {
              return title
            }),
            participatingHotels: hamperStore?.hamperData?.[0]?.participatingHotels,
            hotelInformation: {
              hotelId: item?.hotelId || "",
              hotelName: item?.hotelName || "",
              phone: item?.contact?.phone ? [item?.contact?.phone] : [],
              email: item?.contact?.email ? [item?.contact?.email] : [],
              identifier: item?.identifier || "",
            },
          }
          await setSelectedHamperInfo(data)
        }
        const navigationUrl =
          contentType === "jWellnessLuxurySpa" || contentType === "hamperDetails"
            ? primaryAction?.url
            : `/${hotelRoute}/${item?.identifier}`
        navigate(navigationUrl, primaryAction?.urlType)
      }
    }
    setGroupData(
      contentType === "allRestaurants"
        ? {
            items: componentItemData?.map((item: any, index: any) => {
              let arr = []
              // if (item?.contact?.email?.length > 0) {
              //   const filteredArr = item?.contact?.email.filter((val: any) => {
              //     return val?.type?.toLowerCase() === "business"
              //   })
              //   if (filteredArr?.length > 0) {
              //     arr.push({
              //       richTextKey: getIcons("email"),
              //       richTextValue: filteredArr?.[0]?.email,
              //       highlightColor: true,
              //     })
              //   }
              // }
              if (item?.contact?.phone?.length > 0) {
                const filteredArr = item?.contact?.phone.filter((val: any) => {
                  return val?.type?.toLowerCase() === "business"
                })
                if (filteredArr?.length > 0) {
                  arr.push({
                    richTextKey: getIcons("phone"),
                    richTextValue: filteredArr?.[0]?.mobile,
                    highlightColor: true,
                    identifier: "contact-info",
                  })
                }
              }
              return {
                ...item,
                title: item?.bannerTitle?.desktopTitle?.join(" "),
                description: item?.thumbnailDescription,
                alignmentVariant: cardAlignmentVariant,
                variant: cardMobileVariant,
                largeVariant: cardLargeVariant,
                _type: "card",
                richText: [...arr],
                parameterMap: Array?.isArray(item?.cuisines)
                  ? [{ key: "Cuisine", value: item?.cuisines?.join(", ") }]
                  : [],
                ctaLabel: ctaActionData?.title,
                urlType: ctaActionData?.urlType,
                url: `/${hotelRoute}/${item?.participatingHotels?.[0]?.identifier}/${restaurantsRoute}/${item?.identifier}`,
                subTitle: item?.participatingHotels?.[0]?.hotelName,
                largeImage: item?.thumbnail?.[0]?.imageAsset?.largeImage?.[0],
                image: item?.thumbnail?.[0]?.imageAsset?.image?.[0],
                isFromProperty: true,
                headingElementForCard: headingElementForCard,
                charactersLimit: isMobile ? mobileCardCharactersLimit : cardCharactersLimit,
                contentType,
              }
            }),
            charactersLimit: isMobile ? mobileCharactersLimit : charactersLimit,
            largeVariant: "ihcl.core.group.group-with-3-column-cards-grid",
            variant: "ihcl.core.group.group-with-3-column-cards-grid",
            isComponentFullWidth: true,
            isMobileComponentFullWidth: true,
            alignmentVariant: alignmentVariant,
            aesthetic: aesthetic,
          }
        : contentType === "jWellnessLuxurySpa" ||
            contentType === "hotelProgramsChambers" ||
            contentType === "hotelProgramsHampers" ||
            contentType === "hamperDetails"
          ? {
              items: getListWithBrandSorting(componentItemData)?.map((item: any, index: any) => {
                return {
                  ...item,
                  title: item?.hotelName,
                  description: item?.hotelDescription,
                  ctaLabel: ctaActionData?.title,
                  urlType: ctaActionData?.urlType,
                  url:
                    contentType === "jWellnessLuxurySpa"
                      ? `${ctaActionData?.url}${item?.identifier}/j-wellness-circle`
                      : `${ctaActionData?.url}${item?.identifier}`,
                  largeVariant: cardLargeVariant,
                  variant: cardMobileVariant,
                  alignmentVariant: cardAlignmentVariant,
                  _type: "card",
                  largeImage: item?.image?.[0]?.imageAsset?.largeImage?.[0],
                  image: item?.image?.[0]?.imageAsset?.image?.[0],
                  specificationTags: item?.inclusions?.slice(0, 2)?.map((tag: any, index: any) => {
                    return {
                      tag: tag?.basicInfo?.title,
                    }
                  }),
                  onPrimaryClick: () => {
                    onPrimaryClick(item)()
                  },
                  primaryAction:
                    cardActionType?.length > 0
                      ? {
                          ...cardActionType?.find((action: any) => action?.actionType === "primaryAction")
                            ?.primaryAction,
                          url:
                            contentType === "jWellnessLuxurySpa"
                              ? cardActionType?.find((action: any) => action?.actionType === "primaryAction")
                                  ?.primaryAction?.url
                              : `/${hotelRoute}/${item?.identifier}`,
                        }
                      : {},
                  isFromProperty: true,
                  headingElementForCard: headingElementForCard,
                  highLights: item?.inclusions?.[0]?.basicInfo?.description,
                  charactersLimit: isMobile ? mobileCardCharactersLimit : cardCharactersLimit,
                }
              }),
              charactersLimit: isMobile ? mobileCharactersLimit : charactersLimit,
              largeVariant: "ihcl.core.group.group-with-3-column-cards-grid",
              variant: "ihcl.core.group.group-with-3-column-cards-grid",
              isComponentFullWidth: true,
              isMobileComponentFullWidth: true,
              alignmentVariant: alignmentVariant,
              aesthetic: aesthetic,
            }
          : contentType === "khazanaShoppingPartner"
            ? {
                items: componentItemData?.map((item: any, index: any) => {
                  let arr = []
                  if (item?.contact?.email) {
                    arr.push({
                      richTextKey: "",
                      richTextValue: item?.contact?.email,
                    })
                  }
                  const brand = item?.brandName?.toUpperCase()
                  const navUrl = externalNavigation[brand]
                  let cbrUrl = `${navUrl}/${item?.identifier}/`
                  return {
                    ...item,
                    title: item?.hotelName,
                    locationDescription: `${
                      item?.hotelAddress?.addressLine1 ? `${item?.hotelAddress?.addressLine1},` : ""
                    } ${item?.hotelAddress?.city ? `${item?.hotelAddress?.city},` : ""} ${
                      item?.hotelAddress?.state ? `${item?.hotelAddress?.state},` : ""
                    }  ${item?.hotelAddress?.pincode ? `${item?.hotelAddress?.pincode}` : ""}`,
                    locationText: "View map",
                    richText: [...arr],
                    subTitle: `Phone: ${item?.contact?.phone}`,
                    lat: item?.hotelAddress?.latitude,
                    long: item?.hotelAddress?.longitude,
                    alignmentVariant: cardAlignmentVariant,
                    variant: cardMobileVariant,
                    largeVariant: cardLargeVariant,
                    _type: "card",
                    ctaLabel: ctaActionData?.title,
                    urlType: item?.brandName?.toLowerCase() !== "taj" ? PathType?.external : PathType?.internal,
                    url:
                      item?.brandName?.toLowerCase() !== "taj"
                        ? cbrUrl
                        : contentType === "clubVistaraAirlinesPartners"
                          ? `${ctaActionData?.url}${item?.identifier}`
                          : `/${hotelRoute}/${item?.hotelIdentifier}`,
                    largeImage: item?.image?.[0]?.imageAsset?.largeImage?.[0],
                    image: item?.image?.[0]?.imageAsset?.image?.[0],
                    isFromProperty: true,
                    primaryAction:
                      cardActionType?.length > 0
                        ? cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction
                        : {},
                    secondaryAction:
                      cardActionType?.length > 0
                        ? cardActionType?.find((action: any) => action?.actionType === "secondaryAction")
                            ?.secondaryAction
                        : {},
                    headingElementForCard: headingElementForCard,
                    charactersLimit: isMobile ? mobileCardCharactersLimit : cardCharactersLimit,
                  }
                }),
                charactersLimit: isMobile ? mobileCharactersLimit : charactersLimit,
                largeVariant: "ihcl.core.group.group-with-3-column-cards-grid",
                variant: "ihcl.core.group.group-with-3-column-cards-grid",
                isComponentFullWidth: true,
                isMobileComponentFullWidth: true,
                alignmentVariant: alignmentVariant,
                preRenderItemsCount: 3,
                aesthetic: aesthetic,
              }
            : contentType === "allDestinations" || contentType === "clubVistaraAirlinesPartners"
              ? {
                  items: removeDuplicateHotels(componentItemData)
                    ?.filter((city: any) =>
                      contentType === "allDestinations" && selectedCountry?.toLowerCase() === "all"
                        ? city?.hotelAddress?.country !== null
                        : contentType === "allDestinations" && selectedCountry
                          ? city?.hotelAddress?.country?.toLowerCase() === selectedCountry?.toLowerCase()
                          : city,
                    )
                    ?.map((item: any, index: any) => {
                      const brand = item?.brandName?.toUpperCase()
                      const navUrl = externalNavigation[brand]
                      let cbrUrl = `${navUrl}/${item?.identifier}/`
                      let primaryButtonUrl = `${navUrl}/${item?.identifier}/${
                        brand === "AMA" ? "accommodations" : brand === "GINGER" ? "rooms" : "rooms-and-suites"
                      }`
                      // Need to build the login logic
                      //if (item?.brandName?.toLowerCase() !== "taj") {
                      // if (isLogin) {
                      //   let authCode: any = userStore?.generateAuthCodeApi()
                      //   if (authCode?.error === false) {
                      //     cbrUrl = `${cbrUrl}?authCode=${authCode?.data?.authCode}&codeVerifier=apple`
                      //   }
                      // }
                      // }
                      return {
                        ...item,
                        title: item?.hotelName,
                        description: item?.hotelDescription,
                        alignmentVariant: cardAlignmentVariant,
                        variant: cardMobileVariant,
                        largeVariant: cardLargeVariant,
                        _type: "card",
                        ctaLabel: ctaActionData?.title,
                        urlType: item?.brandName?.toLowerCase() !== "taj" ? PathType?.external : PathType?.internal,
                        url:
                          item?.brandName?.toLowerCase() !== "taj"
                            ? cbrUrl
                            : contentType === "clubVistaraAirlinesPartners"
                              ? `${ctaActionData?.url}${item?.identifier}`
                              : `/${hotelRoute}/${item?.hotelIdentifier}`,
                        largeImage: item?.image?.[0]?.imageAsset?.largeImage?.[0],
                        image: item?.image?.[0]?.imageAsset?.image?.[0],
                        isFromProperty: true,
                        primaryAction:
                          cardActionType?.length > 0
                            ? contentType === "allDestinations"
                              ? {
                                  ...cardActionType?.find((action: any) => action?.actionType === "primaryAction")
                                    ?.primaryAction,
                                  url: primaryButtonUrl,
                                }
                              : cardActionType?.find((action: any) => action?.actionType === "primaryAction")
                                  ?.primaryAction
                            : {},
                        secondaryAction:
                          cardActionType?.length > 0
                            ? cardActionType?.find((action: any) => action?.actionType === "secondaryAction")
                                ?.secondaryAction
                            : {},
                        headingElementForCard: headingElementForCard,
                        charactersLimit: isMobile ? mobileCardCharactersLimit : cardCharactersLimit,
                        onPrimaryClick: async () => {
                          if (contentType === "allDestinations") {
                            let primaryActionUrl = `${
                              cardActionType?.find((action: any) => action?.actionType === "primaryAction")
                                ?.primaryAction?.url
                            }?`

                            if (item?.brandName?.toLocaleLowerCase() !== "taj" && item?.brandName) {
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
                                "",
                                "",
                              )
                              await CrossSiteNavigation({
                                url: URL,
                                loggedIn: isLogin,
                                userStore,
                              })
                            } else if (item?.hotelId) {
                              primaryActionUrl = `${primaryActionUrl}` + `hotelId=${item?.hotelId}`
                              navigate(primaryActionUrl, item?.primaryAction?.urlType)
                            }
                          } else {
                            let primaryData = cardActionType?.find(
                              (action: any) => action?.actionType === "primaryAction",
                            )?.primaryAction
                            navigate(primaryData?.url, primaryData?.urlType)
                          }
                        },
                      }
                    }),
                  charactersLimit: isMobile ? mobileCharactersLimit : charactersLimit,
                  largeVariant: "ihcl.core.group.group-with-3-column-cards-grid",
                  variant: "ihcl.core.group.group-with-3-column-cards-grid",
                  isComponentFullWidth: true,
                  isMobileComponentFullWidth: true,
                  alignmentVariant: alignmentVariant,
                  aesthetic: aesthetic,
                }
              : contentType === "destinationsDining" || contentType === "brandRestaurantsLocations"
                ? {
                    items: componentItemData?.map((item: any, index: any) => {
                      let arr = []

                      if (
                        item?.contact?.email?.length > 0 &&
                        contentType !== "brandRestaurantsLocations" &&
                        contentType !== "destinationsDining"
                      ) {
                        const filteredArr = item?.contact?.email.filter((val: any) => {
                          return val?.type?.toLowerCase() === "business"
                        })
                        if (filteredArr?.length > 0) {
                          arr.push({
                            identifier: "email",
                            richTextKey: getIcons("email"),
                            richTextValue: filteredArr?.[0]?.email,
                            highlightColor: true,
                          })
                        }
                      }
                      if (item?.contact?.phone?.length > 0) {
                        const filteredArr = item?.contact?.phone.filter((val: any) => {
                          return val?.type?.toLowerCase() === "business"
                        })
                        if (filteredArr?.length > 0) {
                          arr.push({
                            identifier: "contact-info",
                            richTextKey: getIcons("phone"),
                            richTextValue: filteredArr?.[0]?.mobile,
                          })
                        }
                      }
                      return {
                        ...item,
                        title: item?.title,
                        subTitle: item?.hotelName,
                        description: contentType === "brandRestaurantsLocations" ? "" : item?.description,

                        alignmentVariant: cardAlignmentVariant,
                        variant: cardMobileVariant,
                        largeVariant: cardLargeVariant,
                        _type: "card",
                        richText: [...arr],
                        ctaLabel: ctaActionData?.title,
                        urlType: ctaActionData?.urlType,
                        url: `/${hotelRoute}/${item?.hotelIdentifier}/${restaurantsRoute}/${item?.identifier}`,
                        largeImage: item?.image?.[0]?.imageAsset?.largeImage?.[0],
                        image: item?.image?.[0]?.imageAsset?.image?.[0],
                        isFromProperty: true,
                        highLights: item?.highlights?.[0],
                        parameterMap:
                          contentType === "brandRestaurantsLocations"
                            ? []
                            : item?.cuisine
                              ? [{ key: "Cuisine", value: item?.cuisine }]
                              : [],
                        primaryAction:
                          cardActionType?.length > 0
                            ? cardActionType?.find((action: any) => action?.actionType === "primaryAction")
                                ?.primaryAction
                            : {},
                        secondaryAction:
                          cardActionType?.length > 0
                            ? cardActionType?.find((action: any) => action?.actionType === "secondaryAction")
                                ?.secondaryAction
                            : {},
                        headingElementForCard: headingElementForCard,
                        charactersLimit: isMobile ? mobileCardCharactersLimit : cardCharactersLimit,
                      }
                    }),
                    charactersLimit: isMobile ? mobileCharactersLimit : charactersLimit,
                    largeVariant: "ihcl.core.group.group-with-3-column-cards-grid",
                    variant: "ihcl.core.group.group-with-3-column-cards-grid",
                    isComponentFullWidth: true,
                    isMobileComponentFullWidth: true,
                    alignmentVariant: alignmentVariant,
                    aesthetic: aesthetic,
                  }
                : contentType === "destinationsExperiences" || contentType === "destinationsSpa"
                  ? {
                      items: componentItemData?.map((item: any, index: any) => {
                        return {
                          ...item,
                          title: item?.basicInfo?.title,
                          subTitle: item?.hotelName,
                          description: item?.basicInfo?.description,
                          alignmentVariant: cardAlignmentVariant,
                          variant: cardMobileVariant,
                          largeVariant: cardLargeVariant,
                          _type: "card",
                          largeImage: item?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0],
                          image: item?.basicInfo?.media?.[0]?.imageAsset?.image?.[0],
                          isFromProperty: true,
                          parameterMap: item?.basicInfo?.specifications,
                          highLights: item?.highlights?.[0],
                          primaryAction:
                            cardActionType?.length > 0
                              ? {
                                  ...cardActionType?.find((action: any) => action?.actionType === "primaryAction")
                                    ?.primaryAction,
                                  url: `/${hotelRoute}/${item?.identifier}`,
                                }
                              : {},
                          ctaLabel:
                            cardActionType?.length > 0
                              ? cardActionType?.find((action: any) => action?.actionType === "ctaLabel")?.ctaLabel
                                  ?.title
                              : "",
                          headingElementForCard: headingElementForCard,
                          charactersLimit: isMobile ? mobileCardCharactersLimit : cardCharactersLimit,
                        }
                      }),
                      charactersLimit: isMobile ? mobileCharactersLimit : charactersLimit,
                      largeVariant: "ihcl.core.group.group-with-3-column-cards-grid",
                      variant: "ihcl.core.group.group-with-3-column-cards-grid",
                      isComponentFullWidth: true,
                      isMobileComponentFullWidth: true,
                      alignmentVariant: alignmentVariant,
                      aesthetic: aesthetic,
                    }
                  : {
                      items: componentItemData?.map((item: any, index: any) => {
                        return {
                          ...item,
                          title: item?.basicInfo?.title,
                          alignmentVariant: cardAlignmentVariant,
                          variant: cardMobileVariant,
                          largeVariant: cardLargeVariant,
                          _type: "card",
                          largeImage: item?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0],
                          image:
                            contentType === "destinationsHighlights"
                              ? item?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0]
                              : item?.basicInfo?.media?.[0]?.imageAsset?.image?.[0],
                          isFromProperty: true,
                          highLights: item?.highlights?.[0],
                          primaryAction:
                            cardActionType?.length > 0
                              ? cardActionType?.find((action: any) => action?.actionType === "primaryAction")
                                  ?.primaryAction
                              : {},
                          secondaryAction:
                            cardActionType?.length > 0
                              ? cardActionType?.find((action: any) => action?.actionType === "secondaryAction")
                                  ?.secondaryAction
                              : {},
                          headingElementForCard: headingElementForCard,
                          charactersLimit: isMobile ? mobileCardCharactersLimit : cardCharactersLimit,
                        }
                      }),
                      charactersLimit: isMobile ? mobileCharactersLimit : charactersLimit,
                      largeVariant: "ihcl.core.group.group-with-3-column-cards-grid",
                      variant:
                        contentType === "brandRestaurantsIntro" || contentType === "destinationsHighlights"
                          ? "details.group.center-card-carousel"
                          : "ihcl.core.group.group-with-3-column-cards-grid",
                      isComponentFullWidth: true,
                      isMobileComponentFullWidth: true,
                      alignmentVariant: alignmentVariant,
                      aesthetic: aesthetic,
                    },
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry, componentItemData])

  const getFilterComponent = () => {
    return (
      <SearchFilter
        filters={parameterMap}
        filterAlignment={filterAlignment}
        setSearchFilters={setSearchFilters}
        searchFilters={searchFilters}
        facets={facets}
        getKey={getKey}
      />
    )
  }
  useEffect(() => {
    if (contentType === "allDestinations") {
      setNonTajDestinationsHotelsCount(componentItemData?.length)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentItemData?.length, contentType, selectedDestinationFilter])

  return (
    <>
      {((contentType !== "allDestinations" && fetchResponse?.length > 0) ||
        (fetchResponse?.length > 0 &&
          (selectedDestinationFilter === null || selectedDestinationFilter === "") &&
          contentType === "allDestinations") ||
        (contentType === "allDestinations" &&
          selectedDestinationFilter !== null &&
          selectedDestinationFilter !== "" &&
          componentItemData?.length > 0)) && (
        <Box
          sx={{
            background: cardBackgroundColor,
            padding: isMobile ? "14vw 0" : "4.7vw 0",
          }}>
          <Box>
            <MultiRowTitle
              title={{ ...compTitle, headingElement: title?.headingElement }}
              charactersLimit={charactersLimit}
              aesthetic={aesthetic}
              subTitle={subTitle}
              alignmentVariant={alignment}
              isComponentFullWidth={true}
              isMobileComponentFullWidth={true}
              isFilterAvailable={parameterMap?.length > 0}
            />
          </Box>
          {parameterMap?.length > 0 && (
            <Box sx={{ padding: isMobile ? "0 12.5vw" : "0vw 12.5vw" }}>{getFilterComponent()}</Box>
          )}
          {ihclContext?.renderComponent("group", groupData)}
        </Box>
      )}
    </>
  )
}

export default observer(DESTINATIONHIGHLIGHTSCARDCAROUSEL)
