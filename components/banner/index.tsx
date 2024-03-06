import React from "react"
import dynamic from "next/dynamic"
import { useMobileCheck } from "../../utils/isMobilView"
const HeroBannerEpicureComponent = dynamic(
  () => import("./hero-banner-epicure.component")
)
const MobileHeroBannerEpicure = dynamic(
  () => import("./mobile-hero-banner-epicure.component")
)

const HeroBanner = dynamic(() => import("./hero-banner.component"))
const MobileHeroBanner = dynamic(() => import("./mobile-hero-banner.component"))
const HotelDetailBannerPlaceholder = dynamic(
  () => import("../../features/property/ui/hotel-details-banner")
)
const PageNotFoundBanner = dynamic(
  () => import("./page-not-found-banner.component")
)

export const RenderBannerComponent = (props: any) => {
  const isMobile = useMobileCheck()
  const variant = props?.largeVariant

  switch (variant) {
    case "hero-banner":
      return isMobile ? (
        <MobileHeroBanner {...props} />
      ) : (
        <HeroBanner {...props} />
      )
    case "image-hider":
      return isMobile ? (
        <MobileHeroBanner {...props} />
      ) : (
        <HeroBanner {...props} />
      )
    case "banner-with-action":
      return isMobile ? (
        <MobileHeroBanner {...props} />
      ) : (
        <HeroBanner {...props} />
      )
    case "search-result-banner":
      return isMobile ? (
        <MobileHeroBanner {...props} />
      ) : (
        <HeroBanner {...props} />
      )
    case "gift-card-personalize-banner":
      return isMobile ? (
        <MobileHeroBanner {...props} />
      ) : (
        <HeroBanner {...props} dynamicGCBanner />
      )
    case "fullscreen-banner-image-width":
      return isMobile ? (
        <MobileHeroBanner {...props} />
      ) : (
        <HeroBanner {...props} />
      )
    case "image-without-gradient":
      return isMobile ? (
        <MobileHeroBanner {...props} />
      ) : (
        <HeroBanner {...props} />
      )
    case "hero-banner-dynamic-image-description-slide":
      return isMobile ? (
        <MobileHeroBannerEpicure {...props} />
      ) : (
        <HeroBannerEpicureComponent {...props} />
      )
    case "hero-banner-layout-placeholder":
      return <HotelDetailBannerPlaceholder {...props} />
    case "page-not-found":
      return <PageNotFoundBanner {...props} />
    default:
      return <></>
  }
}
