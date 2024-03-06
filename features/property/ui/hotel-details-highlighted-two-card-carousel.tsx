import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useState } from "react"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"

import { Box } from "@mui/material"
import {
  fetchHighlightedCardDataWithIdentifier,
  fetchHighlightedCardDataWithParticipatingHotels,
  fetchRestaurantsDataWithCity,
  fetchTajNewOpeningsData,
} from "../../../utils/fetchRoomData"
import { useRouter } from "next/router"
import { hotelRoute, restaurantsRoute } from "./constants"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { PropertyStore, RestaurantStore, UserStore } from "../../../store"
import { useMobileCheck } from "../../../utils/isMobilView"
import fetchOtherBrandRestaurants from "../../../utils/fetchOtherBrandRestaurants"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import { CONTENT_TYPE, externalNavigation } from "../../../components/constants"
import { CrossSiteNavigation } from "../../../utils/sso/cross-site-navigation"
import { useLoggedIn } from "../../../utils/hooks/useLoggedIn"
import ModalStore from "../../../store/global/modal.store"

const PROPERTYHIGLIGHTEDTWOCARDCAROUSEL = ({
  title,
  heading,
  aesthetic,
  contentType,
  cardActionType,
  charactersLimit,
  alignmentVariant,
  cardLargeVariant,
  isHidden = false,
  groupLargeVariant,
  cardMobileVariant,
  groupMobileVariant,
  cardCharactersLimit,
  mobileCharactersLimit,
  headingElementForCard,
  mobileCardCharactersLimit,
  isComponentFullWidth = false,
  isMobileComponentFullWidth = false,
}: any) => {
  const router: any = useRouter()
  const ihclContext = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  const propertyStore = ihclContext?.getGlobalStore(GLOBAL_STORES?.propertyStore) as PropertyStore
  const restaurantStore = ihclContext?.getGlobalStore(GLOBAL_STORES.restaurantStore) as RestaurantStore
  const userStore = ihclContext?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const isLogin = useLoggedIn()
  const modalStore = ModalStore.getInstance()
  const navigate = useAppNavigation()
  const [titleSection, setTitleSection] = useState<any>()
  const [componentData, setComponentData] = useState<any>()
  const [componentItemData, setComponentItemsData] = useState<any>()
  const [groupData, setGroupData] = useState<any>()

  let ctaActionData = cardActionType?.find((action: any) => action?.actionType === "ctaLabel")?.ctaLabel

  const lowerCaseComparison = (contentTypeArray: string[]): boolean => {
    return contentTypeArray?.some((item: string) => item?.toLowerCase() === contentType?.toLowerCase())
  }

  useEffect(() => {
    async function fetchHotelData() {
      const routerArr = router?.asPath?.split("/")
      const hotelRouteIndex = routerArr.findIndex((route: any) => route === hotelRoute)

      let response = lowerCaseComparison([CONTENT_TYPE?.RESTAURANT_OVERVIEW])
        ? await fetchRestaurantsDataWithCity(restaurantStore?.restaurantData?.[0]?.city)
        : lowerCaseComparison([CONTENT_TYPE?.HOTEL_SIGNATURE_DINING])
          ? await fetchHighlightedCardDataWithParticipatingHotels(propertyStore?.propertyData?._id)
          : await fetchHighlightedCardDataWithIdentifier(
              hotelRouteIndex > -1 ? routerArr?.[hotelRouteIndex + 1] : undefined,
              contentType,
            )
      if (response) {
        let { [contentType]: value } = response
        if (lowerCaseComparison([CONTENT_TYPE?.HOTEL_ATTRACTIONS])) {
          setComponentData(value)
          setComponentItemsData(value?.attractionDetails)
          setTitleSection(value?.sectionTitle)
        } else if (lowerCaseComparison([CONTENT_TYPE?.HOTEL_EVENT_VENUES])) {
          setComponentData(value?.perfectEventSection)
          setComponentItemsData(value?.perfectEventSection?.perfectEvent)
          setTitleSection(value?.perfectEventSection?.sectionTitle)
        } else if (lowerCaseComparison([CONTENT_TYPE?.HOTEL_SIGNATURE_DINING])) {
          setComponentData(propertyStore?.propertyData?.hotelSignatureDining)
          let arr = response?.filter((value: any) => value.thumbnail !== null)
          setComponentItemsData(arr)
          setTitleSection(propertyStore?.propertyData?.hotelSignatureDining?.sectionTitle)
        } else if (lowerCaseComparison([CONTENT_TYPE?.RESTAURANT_OVERVIEW])) {
          setComponentData(restaurantStore?.restaurantData[0]?.hotelDetailDiningPage?.locationBasedRestaurants)
          let arr = response?.filter((value: any) => value.thumbnail !== null)
          setComponentItemsData(arr)
          setTitleSection({
            desktopTitle: [`${title?.desktopTitle?.[0]}`, `in ${restaurantStore?.restaurantData[0]?.city}`],
          })
        } else if (lowerCaseComparison([CONTENT_TYPE?.HOTEL_ROOMS])) {
          setComponentData(value)
          setComponentItemsData(value?.roomsList)
          setTitleSection(value?.sectionTitle)
        }
      }
    }
    async function fetchBrandRestaurantsData() {
      let response = await fetchOtherBrandRestaurants("")
      if (response) {
        setComponentData({ ...componentData, description: heading })
        setTitleSection(title)
        setComponentItemsData(response)
      }
    }
    async function fetchTajNewOpenings() {
      let response = await fetchTajNewOpeningsData(true, !lowerCaseComparison([CONTENT_TYPE?.OPENING_SOON_TAJ]))
      if (response) {
        setComponentItemsData(response)
        setTitleSection(title)
        setComponentData(response)
      }
    }
    async function fetchNonTajNewOpenings() {
      let response = await fetchTajNewOpeningsData(false, !lowerCaseComparison([CONTENT_TYPE?.OPENING_SOON_NON_TAJ]))
      if (response) {
        setComponentItemsData(response)
        setTitleSection(title)
        setComponentData(response)
      }
    }
    if (lowerCaseComparison([CONTENT_TYPE?.BRAND_RESTAURANTS])) {
      fetchBrandRestaurantsData()
    } else if (lowerCaseComparison([CONTENT_TYPE?.NEW_TAJ_OPENINGS, CONTENT_TYPE?.OPENING_SOON_TAJ])) {
      fetchTajNewOpenings()
    } else if (lowerCaseComparison([CONTENT_TYPE?.NEW_NON_TAJ_OPENINGS, CONTENT_TYPE?.OPENING_SOON_NON_TAJ])) {
      fetchNonTajNewOpenings()
    } else {
      fetchHotelData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentType, router])

  useEffect(
    () => {
      setGroupData(
        lowerCaseComparison([CONTENT_TYPE?.HOTEL_SIGNATURE_DINING, CONTENT_TYPE?.RESTAURANT_OVERVIEW])
          ? {
              items: componentItemData?.map((item: any, index: any) => {
                let specifications = [
                  {
                    key: "Cuisine",
                    value: item?.hotelDetailDiningPage?.restaurantAvailability
                      ?.find((itemSet: any) => itemSet.title?.toLowerCase() === "cuisine")
                      ?.list?.map((val: any) => val.item)
                      ?.toString(),
                  },
                  {
                    key: "Opening hours",
                    value: item?.openingHours?.toString(),
                  },
                  {
                    keyType: "image",
                    imageAsset: {},
                    value: item?.hotelDetailDiningPage?.restaurantAvailability
                      ?.find((itemSet: any) => itemSet.title?.toLowerCase() === "e-mail")
                      ?.list?.map((val: any) => val.item)
                      ?.toString(),
                  },
                  {
                    key: "Phone",
                    keyType: "image",
                    imageAsset: {},
                    value: item?.hotelDetailDiningPage?.restaurantContact?.phone?.[0]?.mobile,
                  },
                ]
                // remove the e-mail section 
                let filteredSpecifications = specifications.filter((spec: any) => {
                  return !(spec.value && spec.value.includes("@"))
                })

                return {
                  ...item,
                  sectionTitle: titleSection,
                  title: item?.title,
                  description: item?.thumbnailDescription,
                  ctaLabel: ctaActionData?.title,
                  urlType: ctaActionData?.urlType,
                  url: `/${hotelRoute}/${
                    contentType === "restaurantOverview"
                      ? item?.participatingHotels?.identifier
                      : propertyStore?.propertyData?.identifier
                  }/${restaurantsRoute}/${item?.identifier}`,
                  largeVariant: cardLargeVariant,
                  variant: cardMobileVariant,
                  _type: "card",
                  largeImage: item?.thumbnail?.[0]?.imageAsset?.largeImage?.[0],
                  image: item?.thumbnail?.[0]?.imageAsset?.image?.[0],
                  parameterMap: contentType === "hotelSignatureDining" ? filteredSpecifications : specifications,
                  galleryImages:
                    item?.restaurantGallery?.flatMap((item: any) => item?.images)?.length < 1 ||
                    item?.restaurantGallery?.flatMap((item: any) => item?.images)?.length === undefined
                      ? [
                          isMobile
                            ? item?.thumbnail?.[0]?.imageAsset?.image?.[0]
                            : item?.thumbnail?.[0]?.imageAsset?.largeImage?.[0],
                        ]
                      : item?.restaurantGallery?.flatMap((item: any) => item?.images),
                  isFromProperty: true,
                  primaryAction:
                    cardActionType?.length > 0
                      ? {
                          ...cardActionType?.find((action: any) => action?.actionType === "primaryAction")
                            ?.primaryAction,
                          url:
                            contentType === "restaurantOverview"
                              ? `/${hotelRoute}/${
                                  contentType === "restaurantOverview"
                                    ? item?.participatingHotels?.identifier
                                    : propertyStore?.propertyData?.identifier
                                }/${restaurantsRoute}/${item?.identifier}`
                              : cardActionType?.find((action: any) => action?.actionType === "primaryAction")
                                  ?.primaryAction?.url,
                        }
                      : {},
                  secondaryAction:
                    cardActionType?.length > 0
                      ? cardActionType?.find((action: any) => action?.actionType === "secondaryAction")?.secondaryAction
                      : {},
                  headingElementForCard: headingElementForCard,
                }
              }),
              charactersLimit: isMobile ? mobileCardCharactersLimit : cardCharactersLimit,
              largeVariant: groupLargeVariant,
              variant: groupMobileVariant,
              isComponentFullWidth: isComponentFullWidth,
              isMobileComponentFullWidth: isMobileComponentFullWidth,
              title: { ...titleSection, headingElement: title?.headingElement },
              singleGroupContent: componentData?.enrichedDescription,
              alignmentVariant,
              subTitle: componentData?.description,
              aesthetic: aesthetic,
              isHidden: isHidden,
            }
          : lowerCaseComparison([CONTENT_TYPE?.BRAND_RESTAURANTS])
            ? {
                items: componentItemData?.map((item: any, index: any) => {
                  return {
                    ...item,
                    sectionTitle: title,
                    title: item?.title,
                    description: item?.description,
                    ctaLabel: ctaActionData?.title,
                    urlType: ctaActionData?.urlType,
                    url: `/${restaurantsRoute}/${item?.identifier}`,
                    largeVariant: cardLargeVariant,
                    variant: cardMobileVariant,
                    _type: "card",
                    largeImage: item?.thumbnail?.[0]?.imageAsset?.largeImage?.[0],
                    image: item?.thumbnail?.[0]?.imageAsset?.image?.[0],
                    galleryImages: item?.gallery,
                    isFromProperty: contentType === "hotelSignatureDining" ? true : false,
                    primaryAction:
                      cardActionType?.length > 0
                        ? {
                            ...cardActionType?.find((action: any) => action?.actionType === "primaryAction")
                              ?.primaryAction,
                            url: `/${restaurantsRoute}/${item?.identifier}`,
                          }
                        : {},
                    secondaryAction:
                      cardActionType?.length > 0
                        ? cardActionType?.find((action: any) => action?.actionType === "secondaryAction")
                            ?.secondaryAction
                        : {},
                    headingElementForCard: headingElementForCard,
                  }
                }),
                charactersLimit: isMobile ? mobileCardCharactersLimit : cardCharactersLimit,
                largeVariant: groupLargeVariant,
                variant: groupMobileVariant,
                isComponentFullWidth: isComponentFullWidth,
                isMobileComponentFullWidth: isMobileComponentFullWidth,
                title: { ...titleSection, headingElement: title?.headingElement },
                alignmentVariant,
                subTitle: componentData?.description,
                aesthetic: aesthetic,
                isHidden: isHidden,
              }
            : lowerCaseComparison([CONTENT_TYPE?.NEW_NON_TAJ_OPENINGS, CONTENT_TYPE?.OPENING_SOON_NON_TAJ])
              ? {
                  items:
                    componentItemData?.length > 0
                      ? componentItemData?.map((item: any, index: any) => {
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
                              navigate(`/hotels/${item?.identifier}`)
                            }
                          }

                          const onPrimaryClick = async () => {
                            await modalStore?.setPropertyData({
                              title: item?.hotelName,
                              largeImage: item?.thumbnail?.largeImage?.[0],
                              image: item?.thumbnail?.image?.[0],
                              description: item?.description,
                              email: item?.contact?.email,
                              phone: item?.contact?.phone,
                              highlights: item?.hotelHighlights?.highlightDetails,
                              address: `${item?.hotelAddress?.addressLine1 ? item?.hotelAddress?.addressLine1 : ""}${
                                item?.hotelAddress?.city ? item?.hotelAddress?.city + ", " : ""
                              }${item?.hotelAddress?.state ? item?.hotelAddress?.state + ", " : ""}${
                                item?.hotelAddress?.pincode ? " - " + item?.hotelAddress?.pincode : ""
                              }`,
                              brandName: item?.brandName,
                              identifier: item?.identifier,
                              isBookNowButtonEnable: !lowerCaseComparison([CONTENT_TYPE?.OPENING_SOON_NON_TAJ]),
                            })

                            navigate(
                              lowerCaseComparison([CONTENT_TYPE?.OPENING_SOON_NON_TAJ])
                                ? cardActionType?.find((action: any) => action?.actionType === "ctaLabel")?.ctaLabel
                                    ?.url
                                : cardActionType?.find((action: any) => action?.actionType === "primaryAction")
                                    ?.primaryAction?.url,
                              lowerCaseComparison([CONTENT_TYPE?.OPENING_SOON_NON_TAJ])
                                ? cardActionType?.find((action: any) => action?.actionType === "ctaLabel")?.ctaLabel
                                    ?.urlType
                                : cardActionType?.find((action: any) => action?.actionType === "primaryAction")
                                    ?.primaryAction?.urlType,
                            )
                          }
                          return {
                            ...item,
                            title: item?.hotelName,
                            parameterMap: lowerCaseComparison([CONTENT_TYPE?.OPENING_SOON_NON_TAJ])
                              ? [{ key: "", value: "Opening Soon" }]
                              : [],
                            description: item?.description,
                            ctaLabel: ctaActionData?.title,
                            urlType: ctaActionData?.urlType,
                            url: `${ctaActionData?.url}/${item?.identifier}`,
                            largeVariant: cardLargeVariant,
                            variant: cardMobileVariant,
                            _type: "card",
                            largeImage: item?.thumbnail?.largeImage?.[0],
                            image: item?.thumbnail?.image?.[0],
                            charactersLimit: isMobile ? mobileCardCharactersLimit : cardCharactersLimit,
                            roomModalDetails: {
                              title: item?.basicInfo?.title,
                              description: item?.basicInfo?.description,
                              itemData: item?.roomModalDetails,
                            },
                            isFromProperty: true,
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
                            onCtaClick: lowerCaseComparison([CONTENT_TYPE?.OPENING_SOON_NON_TAJ])
                              ? onPrimaryClick
                              : onCtaClick,
                            onPrimaryClick: onPrimaryClick,
                          }
                        })
                      : [],
                  charactersLimit: isMobile ? mobileCharactersLimit : charactersLimit,
                  largeVariant: groupLargeVariant,
                  variant: groupMobileVariant,
                  isComponentFullWidth: isComponentFullWidth,
                  isMobileComponentFullWidth: isMobileComponentFullWidth,
                  title: { ...titleSection, headingElement: title?.headingElement },
                  alignmentVariant: alignmentVariant,
                  subTitle: componentData?.description,
                  aesthetic: aesthetic,
                  isHidden: isHidden,
                }
              : lowerCaseComparison([CONTENT_TYPE?.NEW_TAJ_OPENINGS, CONTENT_TYPE?.OPENING_SOON_TAJ])
                ? {
                    items:
                      componentItemData?.length > 0
                        ? componentItemData?.map((item: any, index: any) => {
                            const onCtaClick = async () => {
                              await modalStore?.setPropertyData({
                                title: item?.hotelName,
                                largeImage: item?.thumbnail?.largeImage?.[0],
                                image: item?.thumbnail?.image?.[0],
                                email: item?.contact?.email,
                                phone: item?.contact?.phone,
                                highlights: item?.hotelHighlights?.highlightDetails,
                                address: `${item?.hotelAddress?.addressLine1 ? item?.hotelAddress?.addressLine1 : ""}${
                                  item?.hotelAddress?.city ? item?.hotelAddress?.city + ", " : ""
                                }${item?.hotelAddress?.state ? item?.hotelAddress?.state + ", " : ""}${
                                  item?.hotelAddress?.pincode ? " - " + item?.hotelAddress?.pincode : ""
                                }`,
                                brandName: item?.brandName,
                                identifier: item?.identifier,

                                isBookNowButtonEnable: !lowerCaseComparison([CONTENT_TYPE?.OPENING_SOON_TAJ]),
                              })
                              navigate(
                                lowerCaseComparison([CONTENT_TYPE?.NEW_TAJ_OPENINGS])
                                  ? `${ctaActionData?.url}/${item?.identifier}`
                                  : `${ctaActionData?.url}`,
                                ctaActionData?.urlType,
                              )
                            }

                            return {
                              onCtaClick,
                              contentType,
                              title: item?.hotelName,
                              ctaLabel: ctaActionData?.title,
                              urlType: ctaActionData?.urlType,
                              url: `${ctaActionData?.url}`,
                              largeVariant: cardLargeVariant,
                              variant: cardMobileVariant,
                              _type: "card",
                              largeImage: item?.thumbnail?.largeImage?.[0],
                              image: item?.thumbnail?.image?.[0],
                              primaryAction:
                                cardActionType?.length > 0
                                  ? {
                                      ...cardActionType?.find((action: any) => action?.actionType === "primaryAction")
                                        ?.primaryAction,
                                      url: `/${
                                        cardActionType?.find((action: any) => action?.actionType === "primaryAction")
                                          ?.primaryAction?.url
                                      }?hotelId=${item?.hotelId}`,
                                    }
                                  : {},
                              charactersLimit: isMobile ? mobileCardCharactersLimit : cardCharactersLimit,
                            }
                          })
                        : [],
                    charactersLimit: isMobile ? mobileCharactersLimit : charactersLimit,
                    largeVariant: groupLargeVariant,
                    variant: groupMobileVariant,
                    isComponentFullWidth: isComponentFullWidth,
                    isMobileComponentFullWidth: isMobileComponentFullWidth,
                    title: { ...titleSection, headingElement: title?.headingElement },
                    alignmentVariant: alignmentVariant,
                    heading: heading,
                    subTitle: componentData?.description,
                    aesthetic: aesthetic,
                    isHidden: isHidden,
                  }
                : {
                    items: componentItemData?.map((item: any, index: any) => {
                      let primaryAction = cardActionType?.find(
                        (action: any) => action?.actionType === "primaryAction",
                      )?.primaryAction

                      const onPrimaryClick = async () => {
                        if (lowerCaseComparison([CONTENT_TYPE?.HOTEL_ROOMS])) {
                          navigate(
                            propertyStore?.propertyData?.hotelId
                              ? `${primaryAction?.url}?hotelId=${propertyStore?.propertyData?.hotelId}&roomCode=${item?.roomCode}`
                              : primaryAction?.url,
                            primaryAction?.urlType,
                          )
                        } else {
                          navigate(primaryAction?.url, primaryAction?.urlType)
                        }
                      }
                      return {
                        ...item,
                        title: item?.basicInfo?.title,
                        description: item?.basicInfo?.description,
                        ctaLabel: ctaActionData?.title,
                        urlType: ctaActionData?.urlType,
                        url: lowerCaseComparison([CONTENT_TYPE?.HOTEL_SIGNATURE_DINING])
                          ? item?.url
                          : ctaActionData?.url,
                        largeVariant: cardLargeVariant,
                        variant: cardMobileVariant,
                        _type: "card",
                        onPrimaryClick: onPrimaryClick,
                        largeImage: item?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0],
                        image: item?.basicInfo?.media?.[0]?.imageAsset?.image?.[0],
                        parameterMap: item?.basicInfo?.specifications,
                        galleryImages: item?.basicInfo?.media,
                        charactersLimit: isMobile ? mobileCardCharactersLimit : cardCharactersLimit,
                        roomModalDetails: {
                          primaryAction: {
                            url: propertyStore?.propertyData?.hotelId
                              ? `${primaryAction?.url}?hotelId=${propertyStore?.propertyData?.hotelId}&roomCode=${item?.roomCode}`
                              : primaryAction?.url,
                            urlType: primaryAction?.urlType,
                          },
                          title: item?.basicInfo?.title,
                          description: item?.basicInfo?.description,
                          itemData: item?.roomModalDetails,
                        },
                        isFromProperty: lowerCaseComparison([
                          CONTENT_TYPE?.HOTEL_ROOMS,
                          CONTENT_TYPE?.HOTEL_SIGNATURE_DINING,
                        ]),
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
                      }
                    }),
                    charactersLimit: isMobile ? mobileCharactersLimit : charactersLimit,
                    largeVariant: groupLargeVariant,
                    variant: groupMobileVariant,
                    isComponentFullWidth: isComponentFullWidth,
                    isMobileComponentFullWidth: isMobileComponentFullWidth,
                    title: { ...titleSection, headingElement: title?.headingElement },
                    singleGroupContent: componentData?.enrichedDescription,
                    alignmentVariant,
                    subTitle: componentData?.description,
                    aesthetic: aesthetic,
                    isHidden: isHidden,
                  },
      )
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [componentItemData],
  )

  return <Box>{groupData?.items?.length > 0 && ihclContext?.renderComponent("group", groupData)}</Box>
}

export default observer(PROPERTYHIGLIGHTEDTWOCARDCAROUSEL)
