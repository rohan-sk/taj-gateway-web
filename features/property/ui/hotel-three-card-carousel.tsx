import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useState, useRef } from "react"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { useRouter } from "next/router"
import { Box } from "@mui/material"
import {
  fetchHighlightedCardDataWithIdentifier,
  fetchHotelSpecificOffersData,
  fetchWellnessOffersData,
} from "../../../utils/fetchRoomData"
import { hotelRoute, offersRoute } from "./constants"
import { useMobileCheck } from "../../../utils/isMobilView"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { OffersStore, PropertyStore } from "../../../store"
import { useLoggedIn } from "../../../utils/hooks/useLoggedIn"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import { LOGIN_NAVIGATION } from "../../../components/forms/gift-card-form/constants"
import { PathType } from "../../../types"
import useIntersection from "./useInterSection"
import { addDaysToDate, dateFormatConverter, getDayAfterTomorrowDate, getTomorrowDate } from "../../../utils/getDate"
import BookingFlowGlobalStore from "../../booking/store/globalStore/booking.flow.store"

const ThreeCardCarousellayoutPlaceHolder = ({
  cardLargeVariant,
  groupLargeVariant,
  aesthetic,
  contentType,
  charactersLimit,
  cardActionType,
  alignmentVariant,
  cardAlignmentVariant,
  cardCharactersLimit,
  mobileCharactersLimit,
  mobileCardCharactersLimit,
  groupMobileVariant,
  cardMobileVariant,
  isComponentFullWidth = false,
  isMobileComponentFullWidth = false,
  subContentType,
  title,
  heading,
  headingElementForCard,
  isHidden = false,
}: any) => {
  const navigate = useAppNavigation()
  const isLoggedIn = useLoggedIn()
  const router: any = useRouter()
  const isMobile = useMobileCheck()
  const ihclContext = useContext(IHCLContext)
  const [sectiontitle, setTitle] = useState<any>()
  const [headingElement, setHeading] = useState<any>()
  const [componentData, setComponentData] = useState<any>()
  const [componentItemData, setComponentItemsData] = useState<any>()
  const targetRef = useRef<HTMLDivElement>(null)
  const urlFragment = router.asPath.split("#")[1]
  const inViewport = useIntersection(targetRef, "500px")
  const [groupData, setGroupData] = useState<any>()
  let ctaActionData = cardActionType?.find((action: any) => action?.actionType === "ctaLabel")?.ctaLabel
  const propertyStore = ihclContext?.getGlobalStore(GLOBAL_STORES?.propertyStore) as PropertyStore
  const offerStore = ihclContext?.getGlobalStore(GLOBAL_STORES?.offerStore) as OffersStore
  const bookingFlowGlobalStore = ihclContext?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore

  useEffect(() => {
    async function fetchHotelData() {
      const routerArr = router?.asPath?.split("/")
      const hotelRouteIndex = routerArr?.findIndex((route: any) => route === hotelRoute)
      let response =
        contentType === "hotelHolidays"
          ? await fetchHotelSpecificOffersData(propertyStore?.propertyData?._id || undefined, "holidayOffer == true")
          : (contentType === "hotelExclusiveOffersRooms" ||
              contentType === "hotelExclusiveOffersDining" ||
              contentType === "hotelExclusiveOffersWellness") &&
            hotelRouteIndex > -1
          ? await fetchHotelSpecificOffersData(propertyStore?.propertyData?._id || undefined, "holidayOffer != true")
          : contentType === "hotelExclusiveOffersWellness" && hotelRouteIndex < 0
          ? await fetchWellnessOffersData("holidayOffer != true")
          : await fetchHighlightedCardDataWithIdentifier(
              hotelRouteIndex > -1 ? routerArr?.[hotelRouteIndex + 1] : undefined,
              contentType,
            )
      if (response) {
        let { [contentType]: value } = response
        if (contentType === "hotelAwards") {
          setComponentData(value)
          setComponentItemsData(value?.awardDetails)
          setTitle(value?.sectionTitle)
          setHeading(value?.heading)
        } else if (contentType === "hotelWellness") {
          let { [subContentType]: sectionData } = value
          if (sectionData?.signatureTreatmentDetails?.length > 0) {
            setComponentData(sectionData)
            setComponentItemsData(sectionData?.signatureTreatmentDetails)
            setTitle(sectionData?.sectionTitle)
            setHeading(sectionData?.heading)
          }
        } else if (contentType === "hotelExclusiveOffersWellness" && response?.length > 0) {
          setComponentData(
            propertyStore?.propertyData?.hotelExclusiveOffersWellness || {
              ...componentData,
              description: heading,
            },
          )
          setComponentItemsData(response)
          setTitle(propertyStore?.propertyData?.hotelExclusiveOffersWellness?.sectionTitle || title)
        } else if (contentType === "hotelExclusiveOffersRooms" && response?.length > 0) {
          setComponentData(propertyStore?.propertyData?.hotelExclusiveOffersRooms)
          setComponentItemsData(response)
          setTitle(propertyStore?.propertyData?.hotelExclusiveOffersRooms?.sectionTitle)
        } else if (contentType === "hotelExclusiveOffersDining" && response?.length > 0) {
          setComponentData(propertyStore?.propertyData?.hotelExclusiveOffersDining)
          setComponentItemsData(response)
          setTitle(propertyStore?.propertyData?.hotelExclusiveOffersDining?.sectionTitle)
        } else if (contentType === "hotelHolidays") {
          setComponentData(propertyStore?.propertyData?.hotelHolidays)
          setComponentItemsData(response?.filter((val: any) => val?.thumbnail !== null))
          setTitle(propertyStore?.propertyData?.hotelHolidays?.sectionTitle)
        }
      }
    }
    if (contentType === "hotelHighlights") {
      setComponentData(propertyStore?.propertyData?.hotelHighlights)
      setComponentItemsData(propertyStore?.propertyData?.hotelHighlights?.highlightDetails)
      setTitle(propertyStore?.propertyData?.hotelHighlights?.sectionTitle)
      setHeading(propertyStore?.propertyData?.hotelHighlights?.heading)
    } else {
      fetchHotelData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  const targetElement = targetRef?.current
  useEffect(() => {
    if (urlFragment && targetElement) {
      if (contentType === "hotelHolidays") {
        const offset = 100 // Adjust this offset as needed
        setTimeout(() => {
          const elementTop = targetElement?.getBoundingClientRect()?.top || 100
          window.scrollTo({
            top: elementTop + global?.window?.scrollY - offset,
            behavior: "smooth", // You can use 'auto' or 'smooth'
          })
        }, 1500)
      }
    }
  }, [contentType, urlFragment, targetElement])

  useEffect(
    () => {
      setGroupData({
        items: componentItemData?.map((item: any, index: any) => {
          const primaryActionData =
            cardActionType?.length > 0
              ? cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction
              : {}
          let primaryActionUrl = `${primaryActionData?.url}?`
          if (
            (contentType === "hotelExclusiveOffersRooms" ||
              contentType === "hotelExclusiveOffersDining" ||
              contentType === "hotelExclusiveOffersWellness" ||
              contentType === "hotelHolidays") &&
            item?.packageType === "singlePackage"
          ) {
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
            bookingFlowGlobalStore?.setGuestBookingSchedule(
              dateFormatConverter(getTomorrowDate()),
              dateFormatConverter(
                item?.lengthOfStay
                  ? addDaysToDate(getTomorrowDate(), Number(item?.lengthOfStay))
                  : getDayAfterTomorrowDate(),
              ),
            )
          }

          const onPrimaryClick = async () => {
            if (contentType === "hotelHolidays") {
              bookingFlowGlobalStore?.setGuestBookingSchedule(
                dateFormatConverter(getTomorrowDate()),
                dateFormatConverter(
                  item?.lengthOfStay
                    ? addDaysToDate(getTomorrowDate(), Number(item?.lengthOfStay))
                    : getDayAfterTomorrowDate(),
                ),
              )
              navigate(`${primaryActionUrl}&journeyFrom=HOLIDAYS`, primaryActionData?.urlType)
              return
            }
            if (!isLoggedIn && item?.memberSpecific) {
              navigate(LOGIN_NAVIGATION, PathType?.dialog)
            } else {
              const routerArr = router?.asPath?.split("/")
              const hotelRouteIndex = routerArr?.findIndex((route: any) => route === hotelRoute)
              if (contentType === "hotelExclusiveOffersWellness" && hotelRouteIndex < 0) {
                await offerStore?.setSelectedOfferTitle({
                  title: item.title,
                  rateCode: item?.rateCode,
                  promoCode: item?.promoCode,
                  participatingHotels: item?.participatingHotels || [],
                  selectedOfferType: item?.packageType,
                  packages: item?.packages,
                  lengthOfStay: item?.lengthOfStay,
                })
              }
              bookingFlowGlobalStore?.setGuestBookingSchedule(
                dateFormatConverter(getTomorrowDate()),
                dateFormatConverter(
                  item?.lengthOfStay
                    ? addDaysToDate(getTomorrowDate(), Number(item?.lengthOfStay))
                    : getDayAfterTomorrowDate(),
                ),
              )
              navigate(primaryActionUrl, primaryActionData?.urlType)
            }
          }
          return contentType === "hotelExclusiveOffersRooms" ||
            contentType === "hotelExclusiveOffersDining" ||
            contentType === "hotelExclusiveOffersWellness"
            ? {
                ...item,
                title: item?.title,
                description: item?.displayGlobal ? item?.description : item?.hotels?.description || item?.description,
                ctaLabel: ctaActionData?.title,
                urlType: ctaActionData?.urlType,
                url: propertyStore?.propertyData?.identifier
                  ? `/${hotelRoute}/${propertyStore?.propertyData?.identifier}/${offersRoute}/${item?.identifier}`
                  : `/offers/${item?.identifier}`,
                largeVariant: cardLargeVariant,
                _type: "card",
                largeImage: item?.displayGlobal
                  ? item?.thumbnail?.[0]?.imageAsset?.largeImage?.[0]
                  : item?.hotels?.thumbnail?.[0]?.imageAsset?.largeImage?.[0] ||
                    item?.thumbnail?.[0]?.imageAsset?.largeImage?.[0],
                image: item?.displayGlobal
                  ? item?.thumbnail?.[0]?.imageAsset?.image?.[0]
                  : item?.hotels?.thumbnail?.[0]?.imageAsset?.image?.[0] ||
                    item?.thumbnail?.[0]?.imageAsset?.image?.[0],
                highlights: [],
                primaryAction:
                  cardActionType?.length > 0
                    ? cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction
                    : {},
                secondaryAction:
                  cardActionType?.length > 0
                    ? cardActionType?.find((action: any) => action?.actionType === "secondaryAction")?.secondaryAction
                    : {},
                alignmentVariant: cardAlignmentVariant,
                variant: cardMobileVariant,
                headingElementForCard: headingElementForCard,
                onPrimaryClick,
              }
            : contentType === "hotelHolidays"
            ? {
                ...item,
                title: item?.title,
                subTitle: item?.hotels?.hotelName,
                description: item?.hotels?.thumbnailDescription || item?.hotels?.description,
                ctaLabel: ctaActionData?.title,
                urlType: ctaActionData?.urlType,
                url: `/${hotelRoute}/${propertyStore?.propertyData?.identifier}/${offersRoute}/${item?.identifier}`,
                largeVariant: cardLargeVariant,
                _type: "card",
                largeImage: item?.hotels?.thumbnail?.[0]?.imageAsset?.largeImage?.[0],
                image: item?.hotels?.thumbnail?.[0]?.imageAsset?.image?.[0],
                highlights: [],
                primaryAction:
                  cardActionType?.length > 0
                    ? cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction
                    : {},
                secondaryAction:
                  cardActionType?.length > 0
                    ? cardActionType?.find((action: any) => action?.actionType === "secondaryAction")?.secondaryAction
                    : {},
                alignmentVariant: cardAlignmentVariant,
                variant: cardMobileVariant,
                headingElementForCard: headingElementForCard,
                charactersLimit: cardCharactersLimit,
                onPrimaryClick,
              }
            : {
                ...item,
                title: item?.basicInfo?.title,
                description: item?.basicInfo?.description,
                ctaLabel: ctaActionData?.title,
                urlType: ctaActionData?.urlType,
                url: ctaActionData?.url,
                largeVariant: cardLargeVariant,
                _type: "card",
                largeImage: item?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0],
                image: item?.basicInfo?.media?.[0]?.imageAsset?.image?.[0],
                parameterMap: item?.basicInfo?.specifications,
                highLights: item?.highlights,
                primaryAction:
                  cardActionType?.length > 0
                    ? cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction
                    : {},
                secondaryAction:
                  cardActionType?.length > 0
                    ? cardActionType?.find((action: any) => action?.actionType === "secondaryAction")?.secondaryAction
                    : {},
                alignmentVariant: cardAlignmentVariant,
                variant: cardMobileVariant,
                charactersLimit: isMobile ? mobileCardCharactersLimit : cardCharactersLimit,
                headingElementForCard: headingElementForCard,
              }
        }),
        charactersLimit: isMobile ? mobileCharactersLimit : charactersLimit,
        largeVariant: groupLargeVariant,
        isComponentFullWidth: isComponentFullWidth,
        isMobileComponentFullWidth: isMobileComponentFullWidth,
        title: { ...sectiontitle, headingElement: title?.headingElement },
        alignmentVariant: alignmentVariant,
        heading: headingElement,
        subTitle: componentData?.description,
        variant: groupMobileVariant,
        aesthetic: aesthetic,
        isHidden: isHidden,
      })
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [componentItemData],
  )
  return (
    <Box id={contentType} ref={targetRef}>
      {groupData?.items?.length > 0 && ihclContext?.renderComponent("group", groupData)}
    </Box>
  )
}

export default observer(ThreeCardCarousellayoutPlaceHolder)
