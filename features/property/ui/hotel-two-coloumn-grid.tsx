import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useState } from "react"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { Box } from "@mui/material"
import { fetchHotelSpecificOffersData, fetchTajNewOpeningsData } from "../../../utils/fetchRoomData"
import { useRouter } from "next/router"
import { DestinationStore, PropertyStore } from "../../../store"
import { GLOBAL_STORES } from "../../../utils/Constants"
import {
  addDaysToDate,
  dateFormatConverter,
  formatDateWithMON,
  getDayAfterTomorrowDate,
  getTomorrowDate,
} from "../../../utils/getDate"
import { useMobileCheck } from "../../../utils/isMobilView"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import { LOGIN_NAVIGATION } from "../../../components/forms/gift-card-form/constants"
import { PathType } from "../../../types"
import { useLoggedIn } from "../../../utils/hooks/useLoggedIn"
import { hotelRoute, offersRoute } from "./constants"
import fetchDestinationHotels from "../../../utils/fetchDestinationHotel"
import ModalStore from "../../../store/global/modal.store"
import BookingFlowGlobalStore from "../../booking/store/globalStore/booking.flow.store"
import { CONSTANTS } from "../../../components/constants"

const TwoColoumnGridLayoutPlaceholder = ({
  cardLargeVariant,
  groupLargeVariant,
  aesthetic,
  contentType,
  charactersLimit,
  cardCharactersLimit,
  mobileCharactersLimit,
  mobileCardCharactersLimit,
  cardActionType,
  groupMobileVariant,
  cardMobileVariant,
  alignmentVariant,
  isComponentFullWidth = false,
  isMobileComponentFullWidth = false,
  title,
  headingElementForCard,
  isHidden = false,
}: any) => {
  const router: any = useRouter()
  const isLoggedIn = useLoggedIn()
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const ihclContext = useContext(IHCLContext)
  const [sectionTitle, setTitle] = useState<any>()
  const [heading, setHeading] = useState<any>()
  const [componentData, setComponentData] = useState<any>()
  const [componentItemData, setComponentItemsData] = useState<any>()
  let ctaActionData = cardActionType?.find((action: any) => action?.actionType === "ctaLabel")?.ctaLabel
  const [groupData, setGroupData] = useState<any>()
  const propertyStore: any = ihclContext?.getGlobalStore(GLOBAL_STORES.propertyStore) as PropertyStore
  const destinationStore = ihclContext?.getGlobalStore(GLOBAL_STORES.destinationStore) as DestinationStore
  const bookingFlowGlobalStore = ihclContext?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore
  const modalStore = ModalStore.getInstance()

  useEffect(() => {
    async function fetchHotelData() {
      let response = await fetchHotelSpecificOffersData(
        propertyStore?.propertyData?._id || undefined,
        "holidayOffer != true",
      )
      if (response) {
        setComponentItemsData(response?.filter((item: any) => item?.hotels?.thumbnail !== null))
        setTitle(propertyStore?.propertyData?.hotelOffers?.sectionTitle)
        setComponentData({
          ...componentData,
          description: propertyStore?.propertyData?.hotelOffers?.description,
        })
      }
    }

    async function fetchTajNewOpenings() {
      let response = await fetchTajNewOpeningsData(true, contentType === "openingSoonTaj" ? false : true)
      if (response) {
        setComponentItemsData(response)
        setTitle(title)
        setComponentData(response)
      }
    }

    async function fetchCountryDestinationHotels(country: string) {
      let response = await fetchDestinationHotels(country)
      if (response) {
        setComponentItemsData(response)
        setTitle(destinationStore?.destinationData?.[0]?.hotelsTab?.sectionTitle)
        setComponentData(destinationStore?.destinationData?.[0]?.hotelsTab)
      }
    }

    if (contentType === "hotelOffers") {
      fetchHotelData()
    } else if (contentType === "countryDestinations") {
      fetchCountryDestinationHotels(destinationStore?.destinationData?.[0]?.name?.toLowerCase())
    } else if (contentType === "newTajOpenings" || contentType === "openingSoonTaj") {
      fetchTajNewOpenings()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])
  useEffect(
    () => {
      setGroupData({
        items:
          contentType === "newTajOpenings" || contentType === "openingSoonTaj"
            ? componentItemData?.length > 0
              ? componentItemData?.map((item: any, index: any) => {
                  const onCtaClick = async () => {
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
                      isBookNowButtonEnable: contentType === "openingSoonTaj" ? false : true,
                    })

                    navigate(
                      contentType === "newTajOpenings"
                        ? `${ctaActionData?.url}/${item?.identifier}`
                        : `${ctaActionData?.url}`,
                      ctaActionData?.urlType,
                    )
                  }

                  let content = [
                    {
                      content: [
                        {
                          code: `<head> <style> @media (max-width: 1920px) { p { margin-block-start: 0px; margin-block-end: 0px; } 
                    .main-div { display: flex; flex-direction: column; gap:0.703vw; } .address-div { display: flex; align-items: center; gap: 0.7031vw !important; }
                     .hotel-information { display: flex; gap: 2.0833vw !important; align-items: center; /* margin-top: 13.5px; */ }.phone-number-field { display: flex; align-items: center; gap: 0.625vw !important; } 
                      .address-styles { font-family: supreme; font-size: 0.9375vw !important; font-style: normal; font-weight: 300; line-height: 140%; color: #45443f; } 
                      .phone-number-styles { font-family: supreme; font-size: 0.9375vw !important; font-style: normal; font-weight: 300; line-height: 140%; color: #45443f; }
                      .email-filed-styles { color: #ad8b3a; font-family: supreme; font-size: 0.9375vw !important; font-style: normal; font-weight: 300; line-height: 140%; } 
                      .location-icon { width: 0.724vw; height: 1.0417vw; } .phone-icon { width: 0.9896vw; height: 0.9896vw; } .email-icon { width: 0.8854vw; height: 0.6927vw; } } 
                      @media (max-width: 640px) { .address-main-div { max-width: 69vw !important; overflow: hidden !important; } .main-div{ gap:2.109vw; } 
                      .address-styles { white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important; } 
                      .email-filed-styles { max-width: 31vw; white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important; }
                       .address-div { gap: 1.9531vw !important; } .hotel-information { gap: 6.25vw !important; } .address-styles { font-size: 2.8125vw !important; }
                        .phone-number-styles { font-size: 2.8125vw !important; } .email-filed-styles { font-size: 2.8125vw !important; } .location-icon { width: 2.1719vw; height: 3.1250vw; }
                         .phone-icon { width: 2.9688vw; height: 2.9688vw; } .email-icon { width: 2.6563vw; height: 2.0781vw; } } </style></head> <body> <div class="main-div"> 
                          <div class="address-div"> <img class="location-icon" src="https://cdn.sanity.io/images/ocl5w36p/production/e417be521de93d569bf75b60e1b76ff2c48cabbd-14x21.png" alt="" />
                           <div class="address-main-div"> <p class="address-styles">
                     ${item?.hotelAddress?.addressLine1},${item?.hotelAddress?.city},${item?.hotelAddress?.state}-${
                            item?.hotelAddress?.pincode
                          } </p> </div> </div> <div class="hotel-information"> 
                     <div class="phone-number-field"> <img class="phone-icon" src="https://cdn.sanity.io/images/ocl5w36p/production/458a236e8838a9d09a0fc4725e34cd0b272f656d-19x19.png" alt="" />
                      <p class="phone-number-styles"><a ${isMobile ? `href="tel:${item?.contact?.phone}"` : ""}>${
                            item?.contact?.phone
                          }</a></p> </div> <div class="phone-number-field"> 
                      <img class="email-icon" src="https://cdn.sanity.io/images/ocl5w36p/production/42dc03ca57de5cbdf4087aade080eb3364d12bef-16x13.png" alt="" /> 
                      <p class="email-filed-styles"><a href="mailto:${item?.contact?.email}">${
                            item?.contact?.email
                          }</a></p> </div> </div> </div> </body>`,
                          _type: "code",
                          language: "html",
                        },
                      ],
                      _type: "blockSection",
                    },
                  ]

                  return {
                    ...item,
                    onCtaClick,
                    contentType,
                    title: item?.hotelName,
                    description: item?.description,
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
                    content: content,
                  }
                })
              : []
            : contentType === "countryDestinations"
            ? componentItemData?.map((item: any, index: any) => {
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
                  image: item?.[0]?.image?.imageAsset?.image?.[0],
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
                      : cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction,
                  headingElementForCard: headingElementForCard,
                  charactersLimit: isMobile ? mobileCardCharactersLimit : cardCharactersLimit,
                }
              })
            : componentItemData?.map((item: any, index: any) => {
                let primaryActionUrl = `${
                  cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction?.url
                }?`
                if (propertyStore?.propertyData?.hotelId) {
                  primaryActionUrl = `${primaryActionUrl}` + `hotelId=${propertyStore?.propertyData?.hotelId}`
                }
                if (item?.title) {
                  primaryActionUrl = `${primaryActionUrl}` + `&offerName=${item?.title}`
                }
                if (item?.rateCode) {
                  primaryActionUrl = `${primaryActionUrl}` + `&offerRateCode=${item?.rateCode}`
                }
                if (item?.promoCode) {
                  primaryActionUrl = `${primaryActionUrl}` + `&offerPromoCode=${item?.promoCode}`
                }
                if (item?.lengthOfStay && Number(item?.lengthOfStay) > 1) {
                  primaryActionUrl = `${primaryActionUrl}` + `&minLOS=${item?.lengthOfStay}`
                }

                const onPrimaryClick = async () => {
                  if (!isLoggedIn && item?.memberSpecific) {
                    navigate(LOGIN_NAVIGATION, PathType?.dialog)
                  } else {
                    bookingFlowGlobalStore?.setGuestBookingSchedule(
                      dateFormatConverter(getTomorrowDate()),
                      dateFormatConverter(
                        item?.lengthOfStay
                          ? addDaysToDate(getTomorrowDate(), Number(item?.lengthOfStay))
                          : getDayAfterTomorrowDate(),
                      ),
                    )
                    navigate(primaryActionUrl, item?.primaryAction?.urlType)
                  }
                }

                return {
                  ...item,
                  contentType,
                  sectionTitle: sectionTitle,
                  title: item?.title,
                  description: item?.displayGlobal
                    ? item?.description
                    : item?.hotels?.thumbnailDescription || item?.hotels?.description || item?.description,
                  ctaLabel: ctaActionData?.title,
                  urlType: ctaActionData?.urlType,
                  url:
                    contentType === "hotelOffers"
                      ? `/${hotelRoute}/${propertyStore?.propertyData?.identifier}/${offersRoute}/${item?.identifier}`
                      : ctaActionData?.url,
                  largeVariant: cardLargeVariant,
                  variant: cardMobileVariant,
                  _type: "card",
                  largeImage: item?.displayGlobal
                    ? item?.thumbnail?.[0]?.imageAsset?.largeImage?.[0]
                    : item?.hotels?.thumbnail?.[0]?.imageAsset?.largeImage?.[0] ||
                      item.thumbnail?.[0]?.imageAsset?.largeImage?.[0],
                  image: item?.displayGlobal
                    ? item?.thumbnail?.[0]?.imageAsset?.image?.[0]
                    : item?.hotels?.thumbnail?.[0]?.imageAsset?.image?.[0] ||
                      item?.thumbnail?.[0]?.imageAsset?.image?.[0],
                  specificationTags:
                    contentType === "hotelOffers"
                      ? []
                      : (item?.displayGlobal ? item?.inclusions : item?.hotels?.inclusions || item?.inclusions)
                          ?.slice(0, 2)
                          ?.map((tag: any, index: any) => {
                            return {
                              tag: tag?.basicInfo?.title,
                            }
                          }),
                  onPrimaryClick,
                  primaryAction:
                    cardActionType?.length > 0
                      ? contentType === "hotelOffers"
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
                        : cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction
                      : {},
                  secondaryAction:
                    cardActionType?.length > 0
                      ? cardActionType?.find((action: any) => action?.actionType === "secondaryAction")?.secondaryAction
                      : {},
                  parameterMap: [
                    {
                      key: "Validity",
                      keyType: "string",
                      value: item?.displayGlobal
                        ? item?.globalValidThroughYear
                          ? "Round the Year"
                          : item?.globalValidityDates?.[0]?.toDate
                          ? `${
                              item?.globalValidityDates?.[0]?.fromDate
                                ? formatDateWithMON(item?.globalValidityDates?.[0]?.fromDate)
                                : "Till "
                            } ${item?.globalValidityDates?.[0]?.fromDate ? " - " : ""}${formatDateWithMON(
                              item?.globalValidityDates?.[0]?.toDate,
                            )}`
                          : "No Restrictions"
                        : item?.validThroughYear
                        ? "Round the Year"
                        : item?.validityDates?.[0]?.toDate
                        ? `${
                            item?.validityDates?.[0]?.fromDate
                              ? formatDateWithMON(item?.validityDates?.[0]?.fromDate)
                              : "Till "
                          }${item?.validityDates?.[0]?.fromDate ? " - " : ""}${formatDateWithMON(
                            item?.validityDates?.[0]?.toDate,
                          )}`
                        : "No Restrictions",
                    },
                  ],
                  headingElementForCard: headingElementForCard,
                  isFromProperty: true,
                  charactersLimit: isMobile ? mobileCardCharactersLimit : cardCharactersLimit,
                }
              }),
        charactersLimit: isMobile ? mobileCharactersLimit : charactersLimit,
        largeVariant: groupLargeVariant,
        variant: groupMobileVariant,
        isComponentFullWidth: isComponentFullWidth,
        isMobileComponentFullWidth: isMobileComponentFullWidth,
        title: { ...sectionTitle, headingElement: title?.headingElement },
        alignmentVariant: alignmentVariant,
        heading: heading,
        subTitle: componentData?.description,
        aesthetic: aesthetic,
        isHidden: isHidden,
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [componentItemData],
  )

  return <Box>{groupData?.items?.length > 0 && ihclContext?.renderComponent("group", groupData)}</Box>
}

export default observer(TwoColoumnGridLayoutPlaceholder)
