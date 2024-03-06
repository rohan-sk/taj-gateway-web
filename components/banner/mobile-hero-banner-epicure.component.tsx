import Slider from "react-slick"
import dynamic from "next/dynamic"
import { ICONS } from "../constants"
import { theme } from "../../lib/theme"
import { getVideoUrl, urlFor } from "../../lib-sanity"
import { Box, Typography } from "@mui/material"
import { useMobileCheck } from "../../utils/isMobilView"
import { MobilePxToVw } from "../../utils/DesktopFontCalc"
import React, { Fragment, useContext, useEffect, useRef, useState } from "react"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { GALLERY_IMAGE } from "../forms/gift-card-form/constants"
import { BottomGradientBox, SearchText, TopGradientBox } from "./styles"
import { ActionProps, ImageProps, aestheticItems, singleContentInterface } from "../types"
import { CarouselProgressiveBarStyles } from "../hoc/custom-carousal-dots-styles"
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
  imageInfo: any
  logo: any
}

export type ImageItems = {
  altText: string
  asset: { _ref: string }
}

type SliderData = {
  image: any[]
  largeImage: any[]
  subTitle: any[]
  title: any[]
}
const MobileHeroBannerEpicure = ({
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
  imageInfo,
  logo,
}: MobileHeroBannerProps) => {
  const fullScreenImageWidth = variant === "fullscreen-banner-image-width"
  const isMobile = useMobileCheck()
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [searchTerm, setSearchTerm] = useState<string | null>("")
  const [carousalItemCount, setCarousalItemCount] = useState<number>(imageAsset?.image ? imageAsset?.image?.length : 1)
  const sliderData: SliderData = imageInfo?.reduce(
    (acc: any, item: any) => {
      return {
        image: [...acc?.image, item?.image],
        subTitle: [...acc?.subTitle, item?.subTitle],
        title: [...acc?.title, item?.sectionTitle],
      }
    },
    { image: [], subTitle: [], title: [] },
  )
  const bannerImage = sliderData?.image || imageAsset?.image

  const sliderSubTitleData = sliderData?.subTitle?.[activeIndex] || subTitle
  const sliderTitle = sliderData?.title?.[activeIndex] || title
  const cmsVideoUrl = videoAsset?.videoPlay?.asset
  const cdnVideoUrl = videoAsset?.videoUrl
  const hideBanner = variant === "image-hider"
  const { getOptimizeImageUrl } = useImageUtility()
  useEffect(() => {
    if (bannerImage?.length !== carousalItemCount && bannerImage?.length > 0) {
      setCarousalItemCount(bannerImage?.length)
    }
  }, [carousalItemCount, bannerImage])

  useEffect(() => {
    if (global?.window !== undefined) {
      let urlParams = new URLSearchParams(global?.window?.location?.search)
      setSearchTerm(urlParams?.get("query"))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const navigate = useAppNavigation()

  const isHomepage = global?.window?.location?.pathname === ROUTES?.HOMEPAGE
  const screenWidthRef = useRef<any>(null)
  const [checkScreenWidth, setCheckScreenWidth] = useState<any>(0)
  const [muteVideo, setMuteVideo] = useState<boolean>(true)

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
    beforeChange: (oldIndex: number, currentIndex: number) => {
      setActiveIndex(currentIndex)
    },
  }

  return (
    <MobileHeroBannerContentBox ref={screenWidthRef}>
      {mediaType === "video" ? (
        <Box sx={{ minWidth: "100%", margin: "auto" }}>
          <VideoSEOScript {...videoAsset} />
          <video width={"100%"} loop={true} autoPlay={true} muted={muteVideo}>
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
                backgroundColor: `${theme?.palette?.ihclPalette?.hexOne} !important`,
              },
              ".slick-dots li button": {
                opacity: 0.5,
                backgroundColor: theme?.palette?.ihclPalette?.hexOne,
                width: "100%",
              },
            }}>
            <Slider {...settings}>
              {bannerImage?.map((item: ImageItems, index: number) => (
                <Fragment key={index}>
                  {fullScreenImageWidth ? (
                    <Box
                      display={"block"}
                      width={"100%"}
                      height={"100vh"}
                      className="hero-banner"
                      sx={{
                        backgroundImage: `url(
                        ${getOptimizeImageUrl(urlFor(item?.asset?._ref)?.url(), 1)} )`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}></Box>
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
        <Box sx={{ position: "absolute", right: "0", bottom: MobilePxToVw(300) }}>
          {logo?.image?.[0]?.asset?._ref && (
            <Box
              alt={logo?.image?.[0]?.altText || `banner-img`}
              height={"100%"}
              loading={"lazy"}
              component={"img"}
              src={urlFor(logo?.image?.[0]?.asset?._ref)?.url()}
            />
          )}
        </Box>
        {sliderTitle && (
          <TitleBox $isHomePage={isHomepage}>
            {/* <TitleTypo variant="m-heading-l">{sliderTitle}</TitleTypo> */}
            {alignmentVariant !== "normal" ? (
              <HeroBannerMultiLineTitle title={sliderTitle} headingElement={headingElement} aesthetic={aesthetic} />
            ) : (
              <Typography
                color={theme?.palette?.ihclPalette?.hexOne}
                lineHeight={"120%"}
                whiteSpace={"nowrap"}
                component={headingElement || "h2"}
                variant={isMobile ? "m-heading-l" : "heading-l"}>
                {isMobile ? sliderTitle?.mobileTitle || title?.desktopTitle : sliderTitle?.desktopTitle}
              </Typography>
            )}

            <Box mt={"3.125vw"}>
              <SubTitleInHeroBannerTypography variant="m-heading-s">
                {sliderSubTitleData}
              </SubTitleInHeroBannerTypography>
            </Box>
            {searchTerm && <SearchText variant={isMobile ? "m-heading-s" : "heading-s"}>{searchTerm}</SearchText>}
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
                color: theme?.palette?.ihclPalette?.hexOne,
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
          <TopGradientBox />
          <BottomGradientBox $gradient={aesthetic?.componentBottomGradient} />
        </>
      )}
    </MobileHeroBannerContentBox>
  )
}

export default MobileHeroBannerEpicure
