import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useState } from "react"
import { Box, Typography } from "@mui/material"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { DestinationStore } from "../../../../store"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import { formatDateWithMON } from "../../../../utils/getDate"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { fetchDestinationSpaHotel } from "../../../../utils/fetchDestinationSpaHotels"
import { hotelRoute } from "../../../property/ui/constants"
import SearchFilter from "../searchComponent/SearchFilter"
import fetchDestinationHotels from "../../../../utils/fetchDestinationHotel"
import { LOGIN_NAVIGATION } from "../../../../components/forms/gift-card-form/constants"
import { useLoggedIn } from "../../../../utils/hooks/useLoggedIn"
import { useAppNavigation } from "../../../../utils/NavigationUtility"
import { PathType } from "../../../../types"
const MultiRowTitle = dynamic(() => import("../../../../components/hoc/title/multi-row-title"))
import { getFilterStringCheck } from "../../../../utils/getFilterStringCheck"
import DesktopPxToVw from "../../../../utils/DesktopFontCalc"
import { getListWithBrandSorting } from "../../../../utils/getListWithBrandSorting"
import fetchLuxurySpas from "../../../../utils/fetchLuxurySpas"
import { useAesthetics } from "../../../../utils/fetchAsthetics"
import ModalStore from "../../../../store/global/modal.store"
import { CONSTANTS } from "../../../../components/constants"

const TwoColoumnGridLayoutPlaceholderDestination = ({
  cardLargeVariant,
  aesthetic,
  contentType,
  charactersLimit,
  cardCharactersLimit,
  mobileCharactersLimit,
  mobileCardCharactersLimit,
  cardActionType,
  parameterMap,
  filterAlignment,
  cardMobileVariant,
  alignmentVariant,
  title,
  isComponentFullWidth = false,
  isMobileComponentFullWidth = false,
  headingElementForCard,
  heading,
  errorText,
}: any) => {
  const { cardPadding } = useAesthetics(aesthetic?._ref)
  const router: any = useRouter()
  const isMobile = useMobileCheck()
  const isLoggedIn = useLoggedIn()
  const navigate = useAppNavigation()
  const ihclContext = useContext(IHCLContext)
  const [compTitle, setTitle] = useState<any>()
  const [componentData, setComponentData] = useState<any>()
  const [componentItemData, setComponentItemsData] = useState<any>()
  let ctaActionData = cardActionType?.find((action: any) => action?.actionType === "ctaLabel")?.ctaLabel
  const [groupData, setGroupData] = useState<any>()
  const [fetchResponse, setFetchResponse] = useState<any>()
  const destinationStore = ihclContext?.getGlobalStore(GLOBAL_STORES.destinationStore) as DestinationStore
  const modalStore = ModalStore?.getInstance()
  const [facets, setFacets] = useState<any>({})
  const [searchFilters, setSearchFilters] = useState<any>(
    contentType === "jWellnessLuxurySpa"
      ? { city: "", therapy: "" }
      : contentType === "countryDestinations"
      ? { city: "", hotel: "" }
      : {
          city: "",
        },
  )
  const { selectedCountry, setSelectedDestinationFilter, nonTajDestinationsHotelsCount } = destinationStore

  //clearing the city search state for every tab switch in the destination landing page
  useEffect(() => {
    if (contentType !== "countryDestinations" && searchFilters?.city !== "") {
      setSearchFilters((prev: any) => ({ ...prev, city: "" }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentType, selectedCountry])

  useEffect(() => {
    if (contentType === "jWellnessLuxurySpa") {
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
    }
  }, [contentType, fetchResponse])

  const getKey: any = (index: number, filters: any): string => {
    return filters ? Object?.keys(filters)?.[index] : ""
  }
  useEffect(() => {
    async function fetchData() {
      const mapString = destinationStore?.destinationData?.[0]?.participatingHotels?.map((obj: any) => {
        return `participatingHotels[]._ref match "${obj?._id}"`
      })
      const experiencesMapString = destinationStore?.destinationData?.[0]?.participatingHotels?.map((obj: any) => {
        return `_ref match "${obj?._id}"`
      })
      let response = await fetchDestinationSpaHotel(mapString?.join("||"), experiencesMapString?.join("||"))
      if (response) {
        setComponentItemsData(response?.filter((item: any) => item?.spasAvailable !== false))
        setTitle(destinationStore?.destinationData?.[0]?.spaTab?.sectionTitle)
        setComponentData({
          ...componentData,
          description: destinationStore?.destinationData?.[0]?.spaTab?.description,
        })
      }
    }

    async function fetchCountryDestinationHotels(country: string) {
      let response = await fetchDestinationHotels(country)
      if (response) {
        setFetchResponse(response)
        setComponentItemsData(response)
        setTitle(destinationStore?.destinationData?.[0]?.hotelsTab?.sectionTitle)
        setComponentData(destinationStore?.destinationData?.[0]?.hotelsTab)
      }
    }

    async function fetchWellnessLuxurySpaHotels() {
      let response = await fetchLuxurySpas()
      if (response) {
        setFetchResponse(response)
        setComponentItemsData(response)
        setTitle(title)
        setComponentData({
          ...componentData,
          description: heading,
        })
      }
    }

    if (contentType === "destinationsSpa") {
      fetchData()
    } else if (contentType === "countryDestinations") {
      fetchCountryDestinationHotels(destinationStore?.destinationData?.[0]?.name?.toLowerCase())
    } else if (contentType === "allDestinations") {
      let arr: any = []
      destinationStore?.destinationData?.map((val: any) => {
        const resultSet = val?.participatingHotels?.map((obj: any) => {
          return {
            ...obj,
            destinationIdentifier: val?.identifier,
            city: val?.city,
          }
        })
        arr = resultSet?.length > 0 ? arr.concat(resultSet) : arr
      })
      const tajFilteredList: any = arr?.filter((obj: any) => obj.brandName === "Taj")
      setFetchResponse(removeDuplicateHotels(tajFilteredList?.filter((item: any) => item?.image !== null)))
      setComponentItemsData(removeDuplicateHotels(tajFilteredList?.filter((item: any) => item?.image !== null)))
      setTitle(title)
    } else if (contentType === "jWellnessLuxurySpa") {
      fetchWellnessLuxurySpaHotels()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, destinationStore])

  const removeDuplicateHotels = (arr: any) => {
    const uniqueIds: any = []
    const unique = arr.filter((element: any) => {
      const isDuplicate = uniqueIds.includes(element.identifier)
      if (!isDuplicate) {
        uniqueIds.push(element.identifier)
        return true
      }
      return false
    })
    return unique
  }

  useEffect(() => {
    if (parameterMap?.length > 0) {
      if (contentType === "allDestinations") {
        setSelectedDestinationFilter(searchFilters?.city)
      }
      if (contentType === "countryDestinations") {
        const searchQueryFilter =
          searchFilters?.city && searchFilters?.city !== ""
            ? fetchResponse.filter((val: any) => {
                return getFilterStringCheck(val?.hotelAddress?.city)?.includes(
                  getFilterStringCheck(searchFilters?.city),
                )
              })
            : fetchResponse
        const searchHotelQueryFilter =
          searchFilters?.hotel && searchFilters?.hotel !== ""
            ? searchQueryFilter.filter((val: any) => {
                return getFilterStringCheck(val?.hotelName)?.includes(getFilterStringCheck(searchFilters?.hotel))
              })
            : searchQueryFilter
        setComponentItemsData(searchHotelQueryFilter ? [...searchHotelQueryFilter] : [])
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
        setComponentItemsData(searchHotelQueryFilter ? [...searchHotelQueryFilter] : [])
      } else {
        const searchQueryFilter =
          searchFilters?.city && searchFilters?.city !== ""
            ? fetchResponse.filter((val: any) => {
                return (
                  getFilterStringCheck(val?.city)?.includes(getFilterStringCheck(searchFilters?.city)) ||
                  getFilterStringCheck(val?.hotelAddress?.state)?.includes(getFilterStringCheck(searchFilters?.city)) ||
                  val?.hotelDestination?.some((item: string) =>
                    getFilterStringCheck(item)?.includes(getFilterStringCheck(searchFilters?.city)),
                  )
                )
              })
            : fetchResponse
        setComponentItemsData(searchQueryFilter ? [...searchQueryFilter] : [])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFilters, fetchResponse, parameterMap?.length])

  useEffect(
    () => {
      setGroupData({
        items:
          contentType === "countryDestinations"
            ? componentItemData?.length > 0
              ? getListWithBrandSorting(
                  componentItemData?.map((item: any, index: any) => {
                    let primaryActionUrl = `${
                      cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction?.url
                    }?`
                    if (item?.hotelId) {
                      primaryActionUrl = `${primaryActionUrl}` + `hotelId=${item?.hotelId}`
                    }
                    const onPrimaryClick = async () => {
                      if (!isLoggedIn && item?.memberSpecific) {
                        navigate(LOGIN_NAVIGATION, PathType?.dialog)
                      } else {
                        navigate(primaryActionUrl, item?.primaryAction?.urlType)
                      }
                    }
                    return {
                      ...item,
                      contentType,
                      title: item?.hotelName,
                      description: item?.hotelDescription,
                      ctaLabel: ctaActionData?.title,
                      urlType: ctaActionData?.urlType,
                      url: `/${hotelRoute}/${item?.identifier}`,
                      largeVariant: cardLargeVariant,
                      variant: cardMobileVariant,
                      _type: "card",
                      largeImage: item?.image?.[0]?.imageAsset?.largeImage?.[0],
                      image: item?.image?.[0]?.imageAsset?.image?.[0],
                      onPrimaryClick,
                      primaryAction:
                        cardActionType?.length > 0
                          ? {
                              ...cardActionType?.find((action: any) => action?.actionType === "primaryAction")
                                ?.primaryAction,
                              title: item?.memberSpecific
                                ? !isLoggedIn
                                  ? CONSTANTS?.LOGIN_JOIN
                                  : cardActionType?.find((action: any) => action?.actionType === "primaryAction")
                                      ?.primaryAction?.title
                                : cardActionType?.find((action: any) => action?.actionType === "primaryAction")
                                    ?.primaryAction?.title,
                            }
                          : cardActionType?.find((action: any) => action?.actionType === "primaryAction")
                              ?.primaryAction,
                      headingElementForCard: headingElementForCard,
                      charactersLimit: isMobile ? mobileCardCharactersLimit : cardCharactersLimit,
                    }
                  }),
                )
              : []
            : contentType === "jWellnessLuxurySpa"
            ? getListWithBrandSorting(componentItemData)?.map((item: any, index: any) => {
                return {
                  ...item,
                  title: item?.hotelName,
                  description: item?.hotelDescription,
                  ctaLabel: ctaActionData?.title,
                  urlType: ctaActionData?.urlType,
                  url: `${ctaActionData?.url}${item?.identifier}`,
                  largeVariant: cardLargeVariant,
                  variant: cardMobileVariant,
                  _type: "card",
                  largeImage: item?.image?.[0]?.imageAsset?.largeImage?.[0],
                  image: item?.image?.[0]?.imageAsset?.image?.[0],
                  specificationTags: item?.inclusions?.slice(0, 2)?.map((tag: any, index: any) => {
                    return {
                      tag: tag?.basicInfo?.title,
                    }
                  }),
                  primaryAction:
                    cardActionType?.length > 0
                      ? {
                          ...cardActionType?.find((action: any) => action?.actionType === "primaryAction")
                            ?.primaryAction,
                          url: `/${hotelRoute}/${item?.identifier}`,
                        }
                      : {},
                  isFromProperty: true,
                  headingElementForCard: headingElementForCard,
                  highLights: item?.inclusions?.[0]?.basicInfo?.description,
                  charactersLimit: isMobile ? mobileCardCharactersLimit : cardCharactersLimit,
                }
              })
            : getListWithBrandSorting(componentItemData)
                ?.filter((city: any) =>
                  contentType === "allDestinations" && selectedCountry?.toLowerCase() !== "all"
                    ? city?.hotelAddress?.country?.toLowerCase() === selectedCountry?.toLowerCase()
                    : city,
                )
                ?.map((item: any, index: any) => {
                  const onPrimaryClick = async () => {
                    if (contentType === "destinationsSpa") {
                      modalStore?.setPropertyData({
                        hotelId: item?.hotelId || "",
                        hotelName: item?.hotelName || "",
                        identifier: item?.identifier || "",
                      })
                    }
                    const primaryActionData =
                      cardActionType?.length > 0
                        ? contentType === "allDestinations"
                          ? {
                              ...cardActionType?.find((action: any) => action?.actionType === "primaryAction")
                                ?.primaryAction,
                              url: `/${
                                cardActionType?.find((action: any) => action?.actionType === "primaryAction")
                                  ?.primaryAction?.url
                              }?hotelId=${item?.hotelId}`,
                            }
                          : contentType === "destinationsSpa"
                          ? {
                              ...cardActionType?.find((action: any) => action?.actionType === "primaryAction")
                                ?.primaryAction,
                            }
                          : {}
                        : {}

                    navigate(primaryActionData?.url, primaryActionData?.urlType)
                  }
                  return {
                    ...item,
                    title: item?.hotelName,
                    description: item?.hotelDescription,
                    ctaLabel: ctaActionData?.title,
                    urlType: ctaActionData?.urlType,
                    url: `${ctaActionData?.url}${item?.identifier}`,
                    largeVariant: cardLargeVariant,
                    variant: cardMobileVariant,
                    onPrimaryClick: onPrimaryClick,
                    _type: "card",
                    ctaLabelAlignment: contentType === "allDestinations" ? "center" : "",
                    largeImage:
                      contentType === "allDestinations"
                        ? item?.image?.[0]?.imageAsset?.largeImage?.[0]
                        : contentType === "destinationsSpa"
                        ? item?.hotelOverview?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0]
                        : item?.hotelOverview?.bannerImage?.[0]?.imageAsset?.largeImage?.[0],
                    image:
                      contentType === "allDestinations"
                        ? item?.image?.[0]?.imageAsset?.image?.[0]
                        : contentType === "destinationsSpa"
                        ? item?.hotelOverview?.basicInfo?.media?.[0]?.imageAsset?.image?.[0]
                        : item?.hotelOverview?.bannerImage?.[0]?.imageAsset?.image?.[0],
                    specificationTags: item?.inclusions?.slice(0, 2)?.map((tag: any, index: any) => {
                      return {
                        tag: tag?.basicInfo?.title,
                      }
                    }),
                    primaryAction:
                      cardActionType?.length > 0
                        ? contentType === "allDestinations"
                          ? {
                              ...cardActionType?.find((action: any) => action?.actionType === "primaryAction")
                                ?.primaryAction,
                              url: `/${
                                cardActionType?.find((action: any) => action?.actionType === "primaryAction")
                                  ?.primaryAction?.url
                              }?hotelId=${item?.hotelId}`,
                            }
                          : contentType !== "destinationsSpa"
                          ? {
                              ...cardActionType?.find((action: any) => action?.actionType === "primaryAction")
                                ?.primaryAction,
                              url: `/${hotelRoute}/${item?.identifier}`,
                            }
                          : cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction
                        : {},
                    parameterMap: item?.validityDates?.[0]?.fromDate
                      ? [
                          {
                            key: "Validity",
                            keyType: "string",
                            value:
                              item?.validityDates?.[0]?.fromDate && item?.validityDates?.[0]?.toDate
                                ? `${formatDateWithMON(item?.validityDates?.[0]?.fromDate)} -  ${formatDateWithMON(
                                    item?.validityDates?.[0]?.toDate,
                                  )}`
                                : "Round the Year",
                          },
                        ]
                      : [],
                    isFromProperty: true,
                    headingElementForCard: headingElementForCard,
                    highLights: item?.inclusions?.[0]?.basicInfo?.description,
                    charactersLimit: isMobile ? mobileCardCharactersLimit : cardCharactersLimit,
                  }
                }),
        charactersLimit: isMobile ? mobileCharactersLimit : charactersLimit,
        largeVariant: "details.group.group-with-2-column-cards-grid",
        variant: "details.group.group-with-2-column-cards-grid",
        isComponentFullWidth: isComponentFullWidth,
        isMobileComponentFullWidth: isMobileComponentFullWidth,
        title:
          contentType === "countryDestinations" || contentType === "jWellnessLuxurySpa"
            ? ""
            : { ...compTitle, headingElement: title?.headingElement },
        alignmentVariant: alignmentVariant,
        subTitle:
          contentType === "countryDestinations" || contentType === "jWellnessLuxurySpa"
            ? ""
            : componentData?.description,
        aesthetic: aesthetic,
        preRenderItemsCount: contentType === "destinationsSpa" ? 2 : undefined,
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [componentItemData, selectedCountry],
  )

  const getFilterComponent = () => {
    return (
      <SearchFilter
        filters={parameterMap}
        filterAlignment={filterAlignment}
        setSearchFilters={setSearchFilters}
        searchFilters={searchFilters}
        facets={facets}
        getKey={getKey}
        margin="0px"
      />
    )
  }

  return (
    <Box>
      {(contentType === "countryDestinations" || contentType === "jWellnessLuxurySpa") && (
        <Box
          sx={{
            padding: cardPadding
              ? isMobile
                ? cardPadding?.mobile
                : cardPadding?.desktop
              : isMobile
              ? "0 8.215vw 2vw"
              : "0vw 12.5vw",
          }}>
          <MultiRowTitle
            title={{
              ...compTitle,
              headingElement: title?.headingElement,
            }}
            subTitle={componentData?.description}
            aesthetic={aesthetic}
            charactersLimit={charactersLimit}
            alignmentVariant={alignmentVariant}
            isComponentFullWidth={false}
            isMobileComponentFullWidth={false}
          />
        </Box>
      )}
      {parameterMap?.length > 0 &&
        (fetchResponse?.filter((city: any) =>
          contentType === "allDestinations"
            ? selectedCountry?.toLowerCase() === "all"
              ? true
              : city?.hotelAddress?.country?.toLowerCase() === selectedCountry?.toLowerCase()
            : city,
        )?.length > 0 ||
          contentType === "jWellnessLuxurySpa") && (
          <Box
            sx={{
              padding: isMobile ? "0 12.5vw 2vw" : "0vw 12.5vw",
            }}>
            {getFilterComponent()}
          </Box>
        )}

      {(contentType === "allDestinations"
        ? groupData?.items?.length < 1 && nonTajDestinationsHotelsCount <= 0
        : groupData?.items?.length < 1) && contentType !== "destinationsSpa" ? (
        <Box
          sx={{
            margin: `${DesktopPxToVw(30)} auto`,
            padding: isMobile ? "0 8.215vw 2vw" : "0vw 12.5vw",
          }}>
          <Typography variant={isMobile ? "m-heading-xs" : "body-l"}>{errorText}</Typography>
        </Box>
      ) : (
        <>{ihclContext?.renderComponent("group", groupData)}</>
      )}
    </Box>
  )
}

export default observer(TwoColoumnGridLayoutPlaceholderDestination)
