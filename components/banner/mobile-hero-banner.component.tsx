import React, { Fragment, useContext, useEffect, useRef, useState } from "react"
import Slider from "react-slick"
import dynamic from "next/dynamic"
import { ICONS } from "../constants"
import { theme } from "../../lib/theme"
import { getVideoUrl, urlFor } from "../../lib-sanity"
import { Box, Typography } from "@mui/material"
import { useMobileCheck } from "../../utils/isMobilView"
import { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { GALLERY_IMAGE } from "../forms/gift-card-form/constants"
import { BottomGradientBox, SearchText, TopGradientBox } from "./styles"
import { ActionProps, ImageProps, aestheticItems, singleContentInterface } from "../types"
import { CarouselProgressiveBarStyles } from "../hoc/custom-carousal-dots-styles"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  TitleBox,
  ActionBox,
  GalleryTypo,
  BottomContentBox,
  ScrollDownArrowBox,
  MobileHeroBannerContentBox,
  SubTitleInHeroBannerTypography,
} from "./styles/mobile-hero-banner"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
import { ROUTES } from "../../utils/routes"
import VideoSEOScript from "../../utils/VideoSEOScript"

const HeroBannerMultiLineTitle = dynamic(() => import("../hoc/title/hero-banner-multi-line-title.component"))

interface MobileHeroBannerProps {
  _key: string
  title: any
  _type: string
  subTitle: string
  mediaType: string
  largeVariant: string
  imageAsset: ImageProps
  largeImage: ImageProps
  isGuestSearch: boolean
  shortImage: ImageProps
  chatBotImage: ImageProps
  alignmentVariant: string
  primaryAction: ActionProps
  searchFieldVariant?: string
  doesBannerContainsFeaturedLogo: boolean
  singleContent: singleContentInterface[]
  hideBanner: boolean
  variant?: string
  headingElement?: any
  aesthetic: aestheticItems
  videoAsset: any
}

export type ImageItems = {
  altText: string
  asset: { _ref: string }
}
const MobileHeroBanner = ({
  title,
  subTitle,
  imageAsset,
  shortImage,
  primaryAction,
  alignmentVariant,
  singleContent,
  variant,
  mediaType,
  headingElement,
  aesthetic,
  videoAsset,
}: MobileHeroBannerProps) => {
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const Context = useContext(IHCLContext)
  const screenWidthRef = useRef<any>(null)
  const PortableText = Context!.PortableText
  const cdnVideoUrl = videoAsset?.mobileVideoUrl || videoAsset?.videoUrl
  const hideBanner = variant === "image-hider"
  const cmsVideoUrl = videoAsset?.videoPlay?.asset
  const { getOptimizeImageUrl } = useImageUtility()
  const fullScreenImageWidth = variant === "fullscreen-banner-image-width"
  const hideBottomGradient = variant === "image-without-gradient"
  const isHomepage = global?.window?.location?.pathname === ROUTES?.HOMEPAGE

  const [muteVideo, setMuteVideo] = useState<boolean>(true)
  const [checkScreenWidth, setCheckScreenWidth] = useState<any>(0)
  const [searchTerm, setSearchTerm] = useState<string | null>("")
  const [carousalItemCount, setCarousalItemCount] = useState<number>(imageAsset?.image ? imageAsset?.image?.length : 1)

  useEffect(() => {
    if (imageAsset?.image?.length !== carousalItemCount && imageAsset?.image?.length > 0) {
      setCarousalItemCount(imageAsset?.image?.length)
    }
  }, [carousalItemCount, imageAsset])

  useEffect(() => {
    if (global?.window !== undefined) {
      let urlParams = new URLSearchParams(global?.window?.location?.search)
      setSearchTerm(urlParams?.get("query"))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setCheckScreenWidth(screenWidthRef?.current?.clientWidth)
  }, [screenWidthRef, checkScreenWidth])

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    swipeToSlide: true,
    autoplaySpeed: 5000,
    initialSlide: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
  }

  return (
    <MobileHeroBannerContentBox ref={screenWidthRef} aria-label="MobileHeroBanner">
      {mediaType === "video" ? (
        <Box sx={{ minWidth: "100%", margin: "auto" }}>
          <VideoSEOScript {...videoAsset} />
          <video
            width={"100%"}
            loop={true}
            autoPlay={true}
            playsInline
            muted={muteVideo}
            style={{ width: "100%", height: "94vh", objectFit: "cover" }}>
            {(cmsVideoUrl || cdnVideoUrl) && (
              <source src={cmsVideoUrl ? getVideoUrl(cmsVideoUrl) : cdnVideoUrl} type="video/mp4" />
            )}
          </video>
        </Box>
      ) : (
        <Box width={"100%"}>
          <CarouselProgressiveBarStyles
            $inactiveDotWidth={`${MobilePxToVw(500 / carousalItemCount)}`}
            sx={{
              ".slick-dots": {
                zIndex: 2,
                marginTop: 0,
                position: "absolute",
                bottom: MobilePxToVw(54),
              },
              ".slick-dots li.slick-active button": {
                height: MobilePxToVw(2),
                width: checkScreenWidth / carousalItemCount,
                backgroundColor: `${theme?.palette?.neuPalette?.hexOne} !important`,
              },
              ".slick-dots li button": {
                opacity: 0.5,
                backgroundColor: theme?.palette?.neuPalette?.hexOne,
                width: "100%",
              },
            }}>
            <Slider {...settings}>
              {imageAsset?.image?.map((item: ImageItems, index: number) => (
                <Fragment key={index}>
                  {fullScreenImageWidth ? (
                    <Box display={"block"} width={"100%"} height={"100vh"} className="hero-banner">
                      <Box
                        component={"img"}
                        src={`${getOptimizeImageUrl(urlFor(item?.asset?._ref)?.url(), 1)}`}
                        alt={item?.altText || `banner Image`}
                        style={{
                          width: "100%",
                          height: "100vh",
                          objectFit: "cover",
                          top: 0,
                          left: 0,
                        }}
                      />
                    </Box>
                  ) : (
                    <Box
                      key={index}
                      sx={{
                        display: "block !important",
                      }}>
                      <Box
                        sx={{
                          visibility: hideBanner ? "hidden" : "visible",
                        }}
                        display={"block !important"}
                        alt={item?.altText || `banner-img`}
                        width={"100%"}
                        height={"100%"}
                        loading={"lazy"}
                        component={"img"}
                        src={item?.asset?._ref && getOptimizeImageUrl(urlFor(item?.asset?._ref)?.url(), 1)}
                      />
                    </Box>
                  )}
                </Fragment>
              ))}
            </Slider>
          </CarouselProgressiveBarStyles>
        </Box>
      )}
      <BottomContentBox>
        {shortImage?.asset?._ref && (
          <Box
            alt={shortImage?.altText || `banner-img`}
            maxWidth={"60%"}
            loading={"lazy"}
            component={"img"}
            src={getOptimizeImageUrl(urlFor(shortImage?.asset?._ref).url(), 1)}
            sx={{
              marginLeft: "8.43vw",
              // here margin bottom is taken averagely for all components
              marginBottom: isMobile ? MobilePxToVw(15) : "5.781vw",
              "@media(max-width:600px)": {
                maxWidth: "60%",
              },
            }}
          />
        )}
        {title && (
          <TitleBox $isHomePage={isHomepage}>
            {/* <TitleTypo variant="m-heading-l">{title}</TitleTypo> */}
            {alignmentVariant !== "normal" ? (
              <HeroBannerMultiLineTitle title={title} headingElement={headingElement} aesthetic={aesthetic} />
            ) : (
              <Typography
                color={theme?.palette?.neuPalette?.hexOne}
                lineHeight={"120%"}
                whiteSpace={"nowrap"}
                component={headingElement || "h2"}
                variant={isMobile ? "m-heading-l" : "heading-l"}>
                {isMobile ? title?.mobileTitle || title?.desktopTitle : title?.desktopTitle}
              </Typography>
            )}

            <Box mt={"3.125vw"}>
              <SubTitleInHeroBannerTypography variant="m-heading-s">{subTitle}</SubTitleInHeroBannerTypography>
            </Box>
            {searchTerm && <SearchText variant={isMobile ? "m-heading-s" : "heading-s"}>{searchTerm}</SearchText>}
            {singleContent && (
              <Box
                sx={{
                  mt: "2.813vw",
                  "> span": {
                    color: theme?.palette?.neuPalette?.hexOne,
                  },
                }}>
                {singleContent?.map((content: string | {}, idx: number) => (
                  <PortableText blocks={content} key={idx} />
                ))}
              </Box>
            )}
          </TitleBox>
        )}
        {isHomepage && (
          <ScrollDownArrowBox>
            <Box
              loading={"lazy"}
              component="img"
              src={ICONS?.BANNER_SCROLL_DOWN}
              alt="arrow"
              sx={{
                color: theme?.palette?.neuPalette?.hexOne,
                height: "3.7vw",
                width: "3.593vw",
                objectFit: "contain",
                pointerEvents: "auto",
              }}
              onClick={() => {
                window.scrollBy(0, 800)
              }}
            />
          </ScrollDownArrowBox>
        )}
        {primaryAction?.title && (
          <ActionBox
            onClick={() => {
              navigate(primaryAction?.url, primaryAction?.urlType)
            }}>
            <Box
              alt={"gallery-button"}
              loading={"lazy"}
              component="img"
              src={GALLERY_IMAGE}
              sx={{ height: "9.531vw", width: "9.688vw", objectFit: "contain" }}
            />
            <GalleryTypo variant="m-heading-xs" sx={{ fontWeight: 700 }}>
              {primaryAction?.title}
            </GalleryTypo>
          </ActionBox>
        )}
      </BottomContentBox>
      {!hideBanner && (
        <>
          <TopGradientBox $gradient={aesthetic?.componentTopGradient} />
          {!hideBottomGradient && <BottomGradientBox $gradient={aesthetic?.componentBottomGradient} />}
        </>
      )}
    </MobileHeroBannerContentBox>
  )
}

export default MobileHeroBanner
