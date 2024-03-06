import { Box } from "@mui/system"
import { ImageProps } from "../types"
import dynamic from "next/dynamic"
import React, { useContext } from "react"
import { urlFor } from "../../lib-sanity"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { ImageContentBox } from "./styles/card-with-img-content"
import { useMobileCheck } from "../../utils/isMobilView"
import { ImageCarousalCardWithContentBox } from "./styles/image-carousel-card-with-left-content.component.styles"
import Slider from "react-slick"
import { CarouselProgressiveBarStyles } from "../hoc/custom-carousal-dots-styles"
import { MobileCarousalStylesWrapper } from "../carousal/styles/common-styles"
import { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { ICONS } from "../constants"
const CommonCarousel = dynamic(() => import("../hoc/common-carousal.component"))
const CustomNextArrow = dynamic(() =>
import("../hoc/custom-arrows").then((module) => module.CustomNextArrow)
)
const CustomPrevArrow = dynamic(() =>
import("../hoc/custom-arrows").then((module) => module.CustomPrevArrow)
)

interface ImageAssetItems {
  image: ImageProps[]
  largeImage: ImageProps[]
}
interface ImageCarouselCardWithLeftContentProps {
  _type: string
  urlTyp: string
  mediaType: string
  singleContent: any
  largeVariant: string
  imageAsset: ImageAssetItems
  isMultiBlockContent: boolean
}

const ImageCarouselCardWithLeftContent = (
  props: ImageCarouselCardWithLeftContentProps
) => {
  const isMobile = useMobileCheck()
  const Context = useContext(IHCLContext)
  const PortableText = Context!.PortableText

  const settings = {
    arrows: isMobile? false:true,
    infinite: true,
    autoplay: false,
    swipeToSlide: true,
    initialSlide: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: isMobile?true:false,
    centerPadding: isMobile?"10%":"unset",
    centerMode: isMobile?true:false,

    prevArrow: (
      <CustomPrevArrow
        cssData={{
          top: "12.55vw",
          left: "2.1vw",
          width: "3.125vw",
          height: "3.125vw",
          background: `url(${ICONS?.TRANSPARENT_ARROW_LEFT}) no-repeat`,
          borderRadius: "50%",
          boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
        }}
      />
    ),
    nextArrow: (
      <CustomNextArrow
        cssData={{
          top: "12.55vw",
          right: "2.1vw",
          width: "3.125vw",
          height: "3.125vw",
          background: `url(${ICONS?.TRANSPARENT_ARROW_RIGHT}) no-repeat`,
          borderRadius: "50%",
          boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
        }}
      />
    ),
  }

  return (
    <ImageCarousalCardWithContentBox>
      <Box sx={{ padding: isMobile ? "0vw 8.906vw 7.031vw 8.906vw" : "0vw",
    "span":{
      fontSize: isMobile?"3.438vw !important":"1.146vw !important"
    } }}>
        <PortableText blocks={props?.singleContent} />
      </Box>
      {isMobile ? (
        <>
          {props?.imageAsset?.image && (
            <Box sx={{ width: "100vw" }}>
              <MobileCarousalStylesWrapper
                $inactiveDotWidth={`${MobilePxToVw(400 / props?.imageAsset?.image?.length - 1)}`}>
                <CarouselProgressiveBarStyles
                  sx={{
                    ".slick-slide": {
                      padding: "0 2.3vw",
                    },
                    ".slick-active": {
                      "& .MuiButton-root": {
                        display: "inherit",
                      },
                    },
                    ".slick-active .hide-box": {
                      display: "flex ",
                    },
                    "@media (max-width: 640px)": {
                      ".slick-slide .content": {
                        display: "none",
                      },
                      ".slick-active .content": {
                        display: "flex",
                      },
                    },
                  }}>
                  <Slider {...settings}>
                    {props?.imageAsset?.image?.map((item: any, index: number) => (
                      <Box key={index} sx={{ width: "100%", height: "100%" }}>
                        <Box
                          alt={item?.altText || `-img`}
                          width={"100%"}
                          height={"100%"}
                          component={"img"}
                          src={urlFor(item?.asset?._ref).url()}
                        />
                      </Box>
                    ))}
                  </Slider>
                </CarouselProgressiveBarStyles>
              </MobileCarousalStylesWrapper>
            </Box>
          )}
        </>
      ) : (
        <>
          {props?.imageAsset?.largeImage && (
            <Box width={"45vw"}>
              <CommonCarousel
                settings={settings}
                items={props?.imageAsset?.largeImage}
                Component={ImageContent}
              />
            </Box>
          )}
        </>
      )}
    </ImageCarousalCardWithContentBox>
  )
}

const ImageContent = (props: ImageProps) => {
  return (
    <>
      {props?.asset?._ref && (
        <ImageContentBox>
          <Box
            alt={props?.altText || "-img"}
            component={"img"}
            sx={{
              objectFit: "fill",
            }}
            src={urlFor(props?.asset?._ref && props?.asset?._ref).url()}
          />
        </ImageContentBox>
      )}
    </>
  )
}

export default ImageCarouselCardWithLeftContent