import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useState } from "react"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { Box } from "@mui/material"
import { fetchHighlightedCardDataWithIdentifier } from "../../../utils/fetchRoomData"
import { useRouter } from "next/router"
import { hotelRoute, offersRoute } from "./constants"
import { GLOBAL_STORES } from "../../../utils/Constants"
import OffersStore from "../../../store/global/offers.store"
import {
  DestinationStore,
  PropertyStore,
  RestaurantStore,
  BrandRestaurantStore,
  HolidayStore,
  HamperStore,
} from "../../../store"
import GCStore from "../../gc/store/pageStore/gc.store"
import LoyaltyGlobalStore from "../../loyalty/store/globalStore/loyalty-global-store"
import BlogStore from "../../blog/store/blog.store"

const HotelDetailBannerPlaceholder = ({ contentType, ...rest }: any) => {
  const ihclContext = useContext(IHCLContext)
  const [title, setTitle] = useState<any>()
  const [componentData, setComponentData] = useState<any>()
  const router: any = useRouter()
  const offerStore = ihclContext?.getGlobalStore(GLOBAL_STORES.offerStore) as OffersStore
  const restaurantStore = ihclContext?.getGlobalStore(GLOBAL_STORES.restaurantStore) as RestaurantStore
  const destinationStore = ihclContext?.getGlobalStore(GLOBAL_STORES.destinationStore) as DestinationStore
  const propertyStore = ihclContext?.getGlobalStore(GLOBAL_STORES.propertyStore) as PropertyStore
  const blogStore = ihclContext?.getGlobalStore(GLOBAL_STORES.blogStore) as BlogStore
  const epicureGlobalStore = ihclContext?.getGlobalStore(GLOBAL_STORES.loyaltyGlobalStore) as LoyaltyGlobalStore

  const routerArr = router?.asPath?.split("/")
  const hotelRouteIndex = routerArr?.findIndex((route: any) => route === hotelRoute)
  const isHotelSpecificOfferDetailsPage = hotelRouteIndex === 1 && routerArr?.[hotelRouteIndex + 2] === offersRoute
  const brandRestaurantStore = ihclContext?.getGlobalStore(GLOBAL_STORES.brandRestaurantStore) as BrandRestaurantStore
  const holidayStore: any = ihclContext?.getGlobalStore(GLOBAL_STORES.holidayStore) as HolidayStore
  const hamperStore: any = ihclContext?.getGlobalStore(GLOBAL_STORES.hamperStore) as HamperStore
  const gcStore: any = ihclContext?.getGlobalStore(GLOBAL_STORES.gcStore) as GCStore

  const fullBannerVariant = [
    "destinationsHotels",
    "destinationsHighlights",
    "destinationsDining",
    "destinationsSpa",
    "destinationsExperiences",
    "countryDestinations",
    "destinationsHolidays",
    "hotelOverview",
  ]

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
        if (
          contentType === "hotelWellness" ||
          contentType === "hotelRooms" ||
          contentType === "hotelOffers" ||
          contentType === "hotelEventVenues" ||
          contentType === "hotelSignatureDining" ||
          contentType === "hotelGallery" ||
          contentType === "hotelAttractions" ||
          contentType === "hotelExperiences"
        ) {
          setComponentData(value?.bannerImage?.[0]?.imageAsset)
          setTitle(response?.hotelBannerTitle)
        }
      }
    }
    if (contentType === "hotelOverview") {
      setComponentData(propertyStore?.propertyData?.hotelOverview?.bannerImage?.[0]?.imageAsset)
      setTitle(propertyStore?.propertyData?.hotelBannerTitle)
    } else if (contentType === "offers") {
      const globalBannerImage = offerStore?.offersData?.displayGlobal
        ? offerStore?.offersData?.banner?.[0]?.imageAsset
        : null
      const hotelBannerImage = offerStore?.offersData?.hotels?.banner?.[0]?.imageAsset
        ? offerStore?.offersData?.hotels?.banner?.[0]?.imageAsset
        : globalBannerImage
      const propertyBannerImage = propertyStore?.propertyData?.overview?.bannerImage?.[0]?.imageAsset
        ? propertyStore?.propertyData?.overview?.bannerImage?.[0]?.imageAsset
        : globalBannerImage || hotelBannerImage
      const finalBannerImage = isHotelSpecificOfferDetailsPage
        ? hotelBannerImage || propertyBannerImage
        : offerStore?.offersData?.banner?.[0]?.imageAsset
      setComponentData(finalBannerImage)
      setTitle(offerStore?.offersData?.offerBannerTitle)
    } else if (contentType === "restaurantOverview") {
      setComponentData(restaurantStore?.restaurantData?.[0]?.bannerImage?.[0]?.imageAsset)
      setTitle(restaurantStore?.restaurantData?.[0]?.bannerTitle)
    } else if (contentType === "destinationsHotels") {
      setComponentData(destinationStore?.destinationData?.[0]?.hotelsTab?.bannerImage?.[0]?.imageAsset)
      setTitle(destinationStore?.destinationData?.[0]?.bannerTitle)
    } else if (contentType === "destinationsHighlights") {
      setComponentData(destinationStore?.destinationData?.[0]?.aboutDestination?.bannerImage?.[0]?.imageAsset)
      setTitle(destinationStore?.destinationData?.[0]?.bannerTitle)
    } else if (contentType === "destinationsDining") {
      setComponentData(destinationStore?.destinationData?.[0]?.diningTab?.bannerImage?.[0]?.imageAsset)
      setTitle(destinationStore?.destinationData?.[0]?.bannerTitle)
    } else if (contentType === "destinationsSpa") {
      setComponentData(destinationStore?.destinationData?.[0]?.spaTab?.bannerImage?.[0]?.imageAsset)
      setTitle(destinationStore?.destinationData?.[0]?.bannerTitle)
    } else if (contentType === "brandRestaurants") {
      setComponentData(brandRestaurantStore?.brandRestaurantData?.bannerImage?.[0]?.imageAsset)
      setTitle(brandRestaurantStore?.brandRestaurantData?.bannerTitle)
    } else if (contentType === "destinationsExperiences") {
      setComponentData(destinationStore?.destinationData?.[0]?.experiencesTab?.bannerImage?.[0]?.imageAsset)
      setTitle(destinationStore?.destinationData?.[0]?.bannerTitle)
    } else if (contentType === "holidayOffers") {
      setComponentData(holidayStore?.holidayData?.bannerInfo?.bannerImage?.[0]?.imageAsset)
      setTitle(holidayStore?.holidayData?.bannerInfo?.sectionTitle)
    } else if (contentType === "countryDestinations") {
      setComponentData(destinationStore?.destinationData?.[0]?.bannerInfo?.bannerImage?.[0]?.imageAsset)
      setTitle(destinationStore?.destinationData?.[0]?.bannerInfo?.sectionTitle)
    } else if (contentType === "destinationsHolidays") {
      setComponentData(destinationStore?.destinationData?.[0]?.holidaysTab?.bannerImage?.[0]?.imageAsset)
      setTitle(destinationStore?.destinationData?.[0]?.bannerTitle)
    } else if (contentType === "hamperDetails") {
      setComponentData(hamperStore?.hamperData?.[0]?.hamperTab?.bannerImage?.imageAsset)
      setTitle(hamperStore?.hamperData?.[0]?.bannerTitle)
    } else if (contentType === "epicure") {
      setComponentData({
        _type: "imageAsset",
        imageInfo: epicureGlobalStore?.epicurePageData?.bannerDetails?.imageInfo,
        logo: epicureGlobalStore?.epicurePageData?.bannerDetails?.logo,
      })
      setTitle(epicureGlobalStore?.epicurePageData?.bannerDetails?.title)
    } else if (contentType === "blogArticle") {
      setComponentData(blogStore?.blogData?.bannerImage?.[0]?.imageAsset)
      setTitle(blogStore?.blogData?.bannerTitle)
    } else if (contentType === "gcContent") {
      setComponentData({
        _type: "imageAsset",
        largeImage: [
          {
            ...gcStore?.gcData?.bannerImage?.largeImage,
            _key: "ec871e85e4d2",
            _type: "image",
          },
        ],
        image: [
          {
            ...(gcStore?.gcData?.bannerImage?.smallImage ?? undefined),
            _key: "ec871e85e4d2sd",
            _type: "image",
          },
        ],
      })
      setTitle(gcStore?.gcData?.title)
    } else if (contentType === "blogListing") {
      setComponentData(blogStore?.blogListingData?.bannerImage?.[0]?.imageAsset)
      setTitle(blogStore?.blogListingData?.bannerTitle)
    } else {
      fetchHotelData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])
  const LoopingHotelsData = isHotelSpecificOfferDetailsPage
    ? offerStore?.offersData?.hotels?.participatingHotels
    : offerStore?.offersData?.hotels?.[0]?.participatingHotels
  let bannerData = {
    ...rest,
    imageAsset: componentData,
    largeVariant: fullBannerVariant?.includes(contentType)
      ? "fullscreen-banner-image-width"
      : contentType === "epicure"
      ? "hero-banner-dynamic-image-description-slide"
      : "hero-banner",
    title: { ...title, headingElement: rest?.title?.headingElement },
    headingElement: rest?.title?.headingElement,
    variant: fullBannerVariant?.includes(contentType)
      ? "fullscreen-banner-image-width"
      : contentType === "restaurantOverview"
      ? "banner-with-action"
      : rest.variant,
    singleContent:
      contentType === "restaurantOverview"
        ? restaurantStore?.restaurantData?.[0]?.hotelDetailDiningPage?.bannerDiningInfo
        : "",
    subTitle:
      contentType === "offers" && router?.query?.slug
        ? LoopingHotelsData?.filter((obj: any) => {
            return obj?.identifier === router?.query?.pid
          })?.[0]?.hotelName
        : contentType === "restaurantOverview"
        ? restaurantStore?.restaurantData?.[0]?.hotelDetailDiningPage?.bannerSubTitle
        : contentType === "gcContent"
        ? gcStore?.gcData?.heroSubtitle
        : contentType === "epicure"
        ? epicureGlobalStore?.epicurePageData?.bannerDetails?.subTitle
        : "",
    imageInfo: contentType === "epicure" ? componentData?.imageInfo || [] : [],
    logo: contentType === "epicure" ? epicureGlobalStore?.epicurePageData?.bannerDetails?.logo || [] : [],
  }

  return <Box>{ihclContext?.renderComponent(rest?._type, bannerData)}</Box>
}

export default observer(HotelDetailBannerPlaceholder)
