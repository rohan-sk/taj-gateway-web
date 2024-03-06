import React, { useContext } from "react"
import Slider from "react-slick"
import dynamic from "next/dynamic"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Box } from "@mui/material"

import prevImage from "../../public/taj-grey-left-arrow.png"
import nextImage from "../../public/taj-grey-right-arrow.png"

import { CommonCarouselStyles } from "../hoc/carousal-component-styles"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  MobileCarousalStylesWrapper,
  SixCardCommonCarouselContentBox,
} from "./styles/six-cards-carousal"
import { useMobileCheck } from "../../utils/isMobilView"
import { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { theme } from "../../lib/theme"
import { useBrowserCheck } from "../../utils/hooks/useBrowserCheck"
const CustomNextArrow = dynamic(() =>
import("../hoc/custom-arrows").then((module) => module.CustomNextArrow)
)
const CustomPrevArrow = dynamic(() =>
import("../hoc/custom-arrows").then((module) => module.CustomPrevArrow)
)

const SixCardsCarousal = (props: any) => {
  const context = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  const { isIos } = useBrowserCheck()

  const settings = {
    dots: isMobile ? true : false,
    arrows: isMobile ? false : true,
    infinite: true,
    swipeToSlide: true,
    speed: 600,
    centerMode: isMobile ? true : false,
    initialSlide: isMobile ? 0.5 : 0,
    slidesToShow: isMobile
      ? props?.items?.length > 2
        ? 2
        : props?.items?.length
      : props?.items?.[0]?.slidesToDisplay
      ? props?.items?.length > props?.items?.[0]?.slidesToDisplay
        ? props?.items?.[0]?.slidesToDisplay
        : props?.items?.length
      : props?.items?.length > 6
      ? 6
      : props?.items?.length,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 641,
        settings: {
          slidesToShow: props?.items?.length > 3 ? 3 : props?.items?.length,
        },
      },
      {
        breakpoint: 421,
        settings: {
          slidesToShow: props?.items?.length > 2 ? 2 : props?.items?.length,
        },
      },
    ],
    prevArrow: (
      <CustomPrevArrow
        cssData={{
          top: props?.items?.[0]?.slidesToDisplay ? "33%" : "40%",
          left: props?.items?.[0]?.slidesToDisplay ? "-2.6%" : "-11.2%",
          width: "3.125vw",
          height: "3.125vw",
          borderRadius: "50%",
          boxShadow: " -6px 10px 24px rgba(0, 0, 0, 0.1)",
          background: `url(${prevImage?.src}), no-repeat`,
          objectFit: "contain",
        }}
      />
    ),
    nextArrow: (
      <CustomNextArrow
        cssData={{
          top: props?.items?.[0]?.slidesToDisplay ? "36%" : "40%",
          right: props?.items?.[0]?.slidesToDisplay ? "-3.8%" : "-11.2%",
          width: "5.125vw",
          height: "5.125vw",
          borderRadius: "50%",
          background: `url(${nextImage?.src}), no-repeat`,
        }}
      />
    ),
  }

  return (
    <SixCardCommonCarouselContentBox>
      <MobileCarousalStylesWrapper
        $backGroundColor={theme?.palette?.neuPalette?.hexSeventeen}
        $inactiveDotWidth={`${MobilePxToVw(400 / props?.length - 1)}`}>
        <CommonCarouselStyles
          sx={{
            ".slick-list": {
              margin: isIos ? "0vw" : "0 -1.04vw",
            },
            ".slick-track": {
              display: props?.items?.length <= 6 ? "flex" : "",
              justifyContent: "center !important",
            },
            ".slick-slide": {
              padding: isMobile ? `0 ${MobilePxToVw(10)}` : "0 1.04vw",
              width: props?.items?.length <= 6 ? "fit-content !important" : "",
            },
            "@media (max-width: 640px)": {
              "& .slick-slide .content": {
                display: "none",
                width: "initial",
              },
              "& .slick-active .content": {
                display: "flex",
              },
              "& .slick-dots li.slick-active button": {
                opacity: "1",
                width: MobilePxToVw(80),
                height: MobilePxToVw(2),
                background: theme?.palette?.neuPalette?.hexSeventeen,
              },
              "& .slick-dots button": {
                width: "15.625vw",
                height: " 0.3125vw",
              },
              "& .slick-slide .content-box": {
                marginBottom: "3.75vw",
              },
            },
          }}>
          <Slider {...settings}>
            {props?.items?.map((item: any, index: number) => (
              <Box key={index}>
                {context?.renderComponent(
                  item?._type,
                  {
                    ...item,
                    title: item?.title
                      ? item?.title?.toUpperCase()
                      : item?.title,
                    gridSize: settings?.slidesToShow,
                  },
                  index
                )}
              </Box>
            ))}
          </Slider>
        </CommonCarouselStyles>
      </MobileCarousalStylesWrapper>
    </SixCardCommonCarouselContentBox>
  )
}

export default SixCardsCarousal
