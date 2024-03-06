import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useState } from "react"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { Box } from "@mui/material"
import { fetchHighlightedCardDataWithIdentifier } from "../../../utils/fetchRoomData"
import { useRouter } from "next/router"
import { hotelRoute } from "./constants"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { PropertyStore, RestaurantStore } from "../../../store"
import { getVideoUrl } from "../../../lib-sanity"
import { useMobileCheck } from "../../../utils/isMobilView"

const HotelCardWithLeftMediaRightContent = ({
  cardLargeVariant,
  groupLargeVariant,
  aesthetic,
  contentType,
  groupMobileVariant,
  cardMobileVariant,
  charactersLimit,
  cardCharactersLimit,
  mobileCharactersLimit,
  mobileCardCharactersLimit,
  cardActionType,
  alignmentVariant,
  isComponentFullWidth = false,
  isMobileComponentFullWidth = false,
  headingElementForCard,
  title,
  isHidden = false,
}: any) => {
  const router: any = useRouter()
  const isMobile = useMobileCheck()
  const [groupData, setGroupData] = useState<any>()
  const ihclContext = useContext(IHCLContext)
  const restaurantStore = ihclContext?.getGlobalStore(GLOBAL_STORES.restaurantStore) as RestaurantStore
  const { propertyData } = ihclContext?.getGlobalStore(GLOBAL_STORES.propertyStore) as PropertyStore
  const [sectionTitle, setTitle] = useState<any>()
  const [componentData, setComponentData] = useState<any>()
  const [componentItemData, setComponentItemsData] = useState<any>()
  const [brochureData, setBrochureData] = useState<string>()
  let ctaActionData = cardActionType?.find((action: any) => action?.actionType === "ctaLabel")?.ctaLabel
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
        if (contentType === "hotelWellness") {
          if (value?.spaDetails?.basicInfo) {
            setComponentData(value?.spaDetails)
            setComponentItemsData([value?.spaDetails?.basicInfo])
            setTitle(value?.spaDetails?.sectionTitle)
            if (response?.hotelDocuments?.length > 0) {
              let brochureUrl = response?.hotelDocuments?.filter(
                (item: any) => item?.identifier === "Spa-brochure",
              )?.[0]
              if (brochureUrl?.file?.asset?._ref) {
                setBrochureData(getVideoUrl(brochureUrl?.file?.asset?._ref))
              }
            }
          }
        } else if (contentType === "hotelExperiences") {
          setComponentData(value)
          value?.signatureExperience && setComponentItemsData([value?.signatureExperience])
          setTitle(value?.sectionTitle)
        }
      }
    }
    if (contentType === "restaurantOverview") {
      setComponentData(restaurantStore?.restaurantData?.[0]?.hotelDetailDiningPage?.restaurantInfo)
      setComponentItemsData(
        restaurantStore?.restaurantData?.[0]?.hotelDetailDiningPage?.restaurantInfo?.basicInfo?.media,
      )
      setTitle(restaurantStore?.restaurantData?.[0]?.hotelDetailDiningPage?.restaurantInfo?.sectionTitle)
    } else if (contentType === "retaurantPrivateDining") {
      setComponentData(restaurantStore?.restaurantData?.[0]?.hotelDetailDiningPage?.privateDiningInfo?.diningInfo)
      setComponentItemsData(
        restaurantStore?.restaurantData?.[0]?.hotelDetailDiningPage?.privateDiningInfo?.diningInfo?.media,
      )
      setTitle(restaurantStore?.restaurantData?.[0]?.hotelDetailDiningPage?.privateDiningInfo?.diningInfo?.title)
    } else if (contentType === "hotelOverview") {
      if (propertyData?.hotelOverview?.basicInfo?.media?.length > 0) {
        setComponentData(propertyData?.hotelOverview)
        setComponentItemsData([propertyData?.hotelOverview?.basicInfo])
        setTitle(propertyData?.hotelOverview?.sectionTitle)
      }
    } else {
      fetchHotelData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  useEffect(() => {
    setGroupData(
      contentType === "retaurantPrivateDining"
        ? {
            items: componentItemData?.map((item: any, index: any) => {
              return {
                ...item,
                title: componentData?.title,
                description: componentData?.description,
                largeVariant: cardLargeVariant,
                _type: "card",
                singleContent:
                  restaurantStore?.restaurantData?.[0]?.hotelDetailDiningPage?.privateDiningInfo?.contactInfo,
                largeImage: item?.imageAsset?.largeImage?.[0],
                image: item?.imageAsset?.image?.[0] || item?.imageAsset?.largeImage?.[0],
                isHeroTitleFont: false,
                mediaType: item?.mediaType,
                variant: cardMobileVariant,
                videoAsset: item?.mediaType === "video" ? item?.videoAsset : {},
                primaryAction:
                  cardActionType?.length > 0
                    ? cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction
                    : {},
                secondaryAction:
                  cardActionType?.length > 0
                    ? cardActionType?.find((action: any) => action?.actionType === "secondaryAction")?.secondaryAction
                    : {},
                ctaLabel: ctaActionData?.title,
                urlType: ctaActionData?.urlType,
                url: ctaActionData?.url,
                charactersLimit: isMobile ? mobileCardCharactersLimit : cardCharactersLimit,
                headingElementForCard: headingElementForCard,
              }
            }),
            charactersLimit: isMobile ? mobileCharactersLimit : charactersLimit,
            largeVariant: groupLargeVariant,
            variant: groupMobileVariant,
            isComponentFullWidth: isComponentFullWidth,
            isMobileComponentFullWidth: isMobileComponentFullWidth,
            alignmentVariant: alignmentVariant,
            aesthetic: componentData?.media?.length > 0 ? aesthetic : "",
            isHidden: isHidden,
          }
        : contentType === "restaurantOverview"
        ? {
            items: componentItemData?.map((item: any, index: any) => {
              return {
                ...item,
                title: componentData?.basicInfo?.title,
                description: componentData?.basicInfo?.description,
                largeVariant: cardLargeVariant,
                _type: "card",
                largeImage: item?.imageAsset?.largeImage?.[0],
                image: item?.imageAsset?.image?.[0] || item?.imageAsset?.largeImage?.[0],
                isHeroTitleFont: false,
                mediaType: item?.mediaType,
                variant: cardMobileVariant,
                videoAsset: item?.mediaType === "video" ? item?.videoAsset : {},
                primaryAction:
                  cardActionType?.length > 0
                    ? cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction
                    : {},
                secondaryAction:
                  cardActionType?.length > 0
                    ? cardActionType?.find((action: any) => action?.actionType === "secondaryAction")?.secondaryAction
                    : {},
                ctaLabel: ctaActionData?.title,
                urlType: ctaActionData?.urlType,
                url: ctaActionData?.url,
                charactersLimit: isMobile ? mobileCardCharactersLimit : cardCharactersLimit,
                headingElementForCard: headingElementForCard,
              }
            }),
            charactersLimit: isMobile ? mobileCharactersLimit : charactersLimit,
            largeVariant: groupLargeVariant,
            variant: groupMobileVariant,
            isComponentFullWidth: isComponentFullWidth,
            isMobileComponentFullWidth: isMobileComponentFullWidth,
            title: { ...sectionTitle, headingElement: title?.headingElement },
            alignmentVariant: alignmentVariant,
            subTitle: componentData?.description,
            aesthetic: componentItemData?.length > 0 || sectionTitle?.desktopTitle?.length > 0 ? aesthetic : "",
            isHidden: isHidden,
          }
        : {
            items: componentItemData?.map((item: any, index: any) => {
              return {
                ...item,
                largeVariant: cardLargeVariant,
                _type: "card",
                largeImage: item?.media?.[0]?.imageAsset?.largeImage?.[0],
                image: item?.media?.[0]?.imageAsset?.image?.[0],
                isHeroTitleFont: false,
                mediaType: item?.media?.[0]?.mediaType,
                variant: cardMobileVariant,
                videoAsset: item?.media?.[0]?.mediaType === "video" ? item?.media?.[0]?.videoAsset : {},
                primaryAction:
                  cardActionType?.length > 0 && item?.media?.length > 0
                    ? cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction
                    : {},
                secondaryAction:
                  cardActionType?.length > 0 && item?.media?.length > 0
                    ? cardActionType?.find((action: any) => action?.actionType === "secondaryAction")?.secondaryAction
                    : {},
                ctaLabel:
                  contentType === "hotelWellness" ? (brochureData ? ctaActionData?.title : "") : ctaActionData?.title,
                urlType: ctaActionData?.urlType,
                url: contentType === "hotelWellness" ? (brochureData ? brochureData : "") : ctaActionData?.url,
                charactersLimit: isMobile ? mobileCardCharactersLimit : cardCharactersLimit,
                headingElementForCard: headingElementForCard,
              }
            }),
            charactersLimit: isMobile ? mobileCharactersLimit : charactersLimit,
            largeVariant: groupLargeVariant,
            variant: groupMobileVariant,
            isComponentFullWidth: isComponentFullWidth,
            isMobileComponentFullWidth: isMobileComponentFullWidth,
            title: { ...sectionTitle, headingElement: title?.headingElement },
            alignmentVariant: alignmentVariant,
            subTitle: componentData?.description,
            singleGroupContent: componentData?.enrichedDescription,
            aesthetic:
              componentItemData?.[0]?.media?.length > 0 || sectionTitle?.desktopTitle?.length > 0 ? aesthetic : "",
            isHidden: isHidden,
          },
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentItemData, sectionTitle, contentType])
  return <Box>{ihclContext?.renderComponent("group", groupData)}</Box>
}

export default observer(HotelCardWithLeftMediaRightContent)
