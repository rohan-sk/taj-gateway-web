import { useState, Fragment } from "react"
import Slider from "react-slick"
import dynamic from "next/dynamic"
import { theme } from "../../lib/theme"
import { observer } from "mobx-react-lite"
import { Box, Stack, Typography } from "@mui/material"
import { getVideoUrl, urlFor } from "../../lib-sanity"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../utils/isMobilView"
import { HeaderSubTitle } from "./styles/mobile-hero-banner"
import { CommonCarouselStyles } from "../hoc/carousal-component-styles"
const CustomNextArrow = dynamic(() => import("../hoc/custom-arrows").then((module) => module.CustomNextArrow))
const CustomPrevArrow = dynamic(() => import("../hoc/custom-arrows").then((module) => module.CustomPrevArrow))

import { ContentBox, TopGradientBox, BottomGradientBox, BannerTitleLargeLogoWrappingBox, PointerBox } from "./styles"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
import { ICONS } from "../constants"
import VideoSEOScript from "../../utils/VideoSEOScript"

const HeroBannerMultiLineTitle = dynamic(() => import("../hoc/title/hero-banner-multi-line-title.component"))

type SliderData = {
  image: any[]
  largeImage: any[]
  subTitle: any[]
  title: any[]
}

const HeroBannerEpicure = (props: any) => {
  const isMobile = useMobileCheck()
  const { getOptimizeImageUrl } = useImageUtility()
  const cmsVideoUrl = props?.videoAsset?.videoPlay?.asset
  const cdnVideoUrl = props?.videoAsset?.videoUrl
  const isBannerWthAction = props?.variant === "banner-with-action"
  const sliderData: SliderData = props?.imageInfo?.reduce(
    (acc: any, item: any) => {
      return {
        image: [...acc?.image, item?.image],
        largeImage: [...acc?.largeImage, item?.largeImage],
        subTitle: [...acc?.subTitle, item?.subTitle],
        title: [...acc?.title, item?.sectionTitle],
      }
    },
    { image: [], largeImage: [], subTitle: [], title: [] },
  )
  const bannerImage = isMobile ? sliderData?.image : sliderData?.largeImage
  const sliderSubTitleData = sliderData?.subTitle
  const [skuDetails, setSkuDetails] = useState<any>()
  const [muteVideo, setMuteVideo] = useState<boolean>(true)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const GiftCardBanner = skuDetails?.bannerImage

  const sliderTitle = sliderData?.title?.[activeIndex] || props?.title

  const hideBanner = props?.variant === "image-hider"
  const fullScreenImageWidth = props?.variant === "fullscreen-banner-image-width"
  const hideBottomGradient = props?.largeVariant === "image-without-gradient"

  const settings = {
    arrows: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    swipeToSlide: true,
    initialSlide: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (oldIndex: number, currentIndex: number) => {
      setActiveIndex(currentIndex)
    },
    prevArrow: (
      <CustomPrevArrow
        cssData={{
          top: "45%",
          left: "4.5vw",
          width: "3.125vw",
          height: "3.125vw",
          background: `url(${ICONS?.TRANSPARENT_ARROW_LEFT}) no-repeat`,
          borderRadius: "50%",
          boxShadow: "-0.31vw 0.52vw 1.25vw rgba(0, 0, 0, 0.1)",
        }}
      />
    ),
    nextArrow: (
      <CustomNextArrow
        cssData={{
          top: "45%",
          right: "4.5vw",
          width: "3.125vw",
          height: "3.125vw",
          background: `url(${ICONS?.TRANSPARENT_ARROW_RIGHT}) no-repeat`,
          borderRadius: "50%",
          boxShadow: "-0.31vw 0.52vw 1.25vw rgba(0, 0, 0, 0.1)",
        }}
      />
    ),
  }

  return (
    <>
      <Box
        sx={{
          position: "relative",
        }}>
        <Box
          sx={{
            position: "relative",
          }}>
          {props?.mediaType === "video" ? (
            <Box sx={{ minWidth: "100%", margin: "auto" }}>
              <VideoSEOScript {...props?.videoAsset} />
              <video width={"100%"} loop={true} autoPlay={true} muted={muteVideo}>
                {(cmsVideoUrl || cdnVideoUrl) && (
                  <source src={cmsVideoUrl ? getVideoUrl(cmsVideoUrl) : cdnVideoUrl} type="video/mp4" />
                )}
              </video>
            </Box>
          ) : (
            bannerImage && (
              <>
                <Box width={"100%"}>
                  <CommonCarouselStyles>
                    <Slider {...settings}>
                      {bannerImage?.map((item: any, index: number) => (
                        <Fragment key={index}>
                          {fullScreenImageWidth ? (
                            <Box
                              display={"block"}
                              width={"100%"}
                              height={"100vh"}
                              className="hero-banner"
                              sx={{
                                backgroundImage: `url(${getOptimizeImageUrl(urlFor(item?.asset?._ref)?.url(), 1)} )`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                              }}></Box>
                          ) : (
                            <Box key={index} display={"block!important"}>
                              <Box
                                sx={{
                                  visibility: hideBanner ? "hidden" : "visible",
                                }}
                                display={"block"}
                                alt={`-img`}
                                width={"100%"}
                                height={"100%"}
                                loading="lazy"
                                component={GiftCardBanner?.largeImage?.altText || item?.altText || "img"}
                                src={
                                  props?.dynamicGCBanner
                                    ? GiftCardBanner?.largeImage?.asset?._ref &&
                                      getOptimizeImageUrl(urlFor(GiftCardBanner?.largeImage?.asset?._ref)?.url(), 1)
                                    : item?.asset?._ref && getOptimizeImageUrl(urlFor(item?.asset?._ref).url(), 1)
                                }
                              />
                            </Box>
                          )}
                        </Fragment>
                      ))}
                    </Slider>
                  </CommonCarouselStyles>
                </Box>
              </>
            )
          )}
          {!hideBanner && (
            <PointerBox>
              <TopGradientBox />
              {!hideBottomGradient && <BottomGradientBox $gradient={props?.aesthetic?.componentBottomGradient} />}
            </PointerBox>
          )}
        </Box>
        {sliderTitle && (
          <ContentBox
            $searchFieldIsNotAllowed={props?.searchFieldVariant! == undefined ? true : false}
            sx={{
              display: isBannerWthAction ? "block" : "flex",
              justifyContent: "space-between",
              flexDirection: props?.subTitle ? "column" : "",
            }}>
            <Box sx={{ width: "100%" }}>
              {(sliderTitle || props?.alignmentVariant || props?.largeImage?.asset?._ref) && (
                <BannerTitleLargeLogoWrappingBox $isNormalVariant={props?.alignmentVariant === "normal" ? true : false}>
                  {props?.alignmentVariant !== "normal" ? (
                    <Stack flexDirection={"column"} alignItems={"start"}>
                      {(sliderTitle || props?.alignmentVariant) && (
                        <HeroBannerMultiLineTitle
                          title={sliderTitle}
                          headingElement={props?.title?.headingElement}
                          aesthetic={props?.aesthetic}
                        />
                      )}
                      {(props?.subTitle || props?.dynamicGCBanner || sliderSubTitleData?.[activeIndex]) && (
                        <HeaderSubTitle
                          $isNormalVariant={props?.alignmentVariant === "normal" ? true : false}
                          variant="heading-xs"
                          $marginLeft={sliderTitle?.desktopTitle?.length > 1 ? 0 : DesktopPxToVw(120)}>
                          {skuDetails?.heroSubtitle || props?.subTitle || sliderSubTitleData?.[activeIndex]}
                        </HeaderSubTitle>
                      )}
                    </Stack>
                  ) : (
                    <Stack flexDirection={"column"} alignItems={"center"}>
                      {(sliderTitle || props?.alignmentVariant) && (
                        <Typography
                          color={theme?.palette?.neuPalette?.hexOne}
                          lineHeight={"120%"}
                          whiteSpace={"nowrap"}
                          variant={isMobile ? "m-heading-l" : "heading-l"}>
                          {isMobile ? sliderTitle?.mobileTitle || sliderTitle?.desktopTitle : sliderTitle?.desktopTitle}
                        </Typography>
                      )}
                      {props?.subTitle && (
                        <HeaderSubTitle
                          $isNormalVariant={props?.alignmentVariant === "normal" ? true : false}
                          variant="heading-xs"
                          $marginLeft={DesktopPxToVw(55)}>
                          {props?.subTitle}
                        </HeaderSubTitle>
                      )}
                    </Stack>
                  )}
                  {(props?.largeImage?.asset?._ref || props?.logo?.largeImage?.[0]?.asset?._ref) && (
                    <Box
                      alt={
                        props?.largeImage?.asset?._ref
                          ? props?.largeImage?.altText
                          : props?.logo?.largeImage?.[0]?.asset?._ref
                          ? props?.logo?.largeImage?.[0]?.altText || `banner-img`
                          : `banner-img`
                      }
                      height={"100%"}
                      loading={"lazy"}
                      component={"img"}
                      src={urlFor(props?.logo?.largeImage?.[0]?.asset?._ref || props?.largeImage?.asset?._ref)?.url()}
                    />
                  )}
                </BannerTitleLargeLogoWrappingBox>
              )}
            </Box>
          </ContentBox>
        )}
      </Box>
    </>
  )
}

export default observer(HeroBannerEpicure)
