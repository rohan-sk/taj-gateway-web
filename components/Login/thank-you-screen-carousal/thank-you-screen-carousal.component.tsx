import React, { useContext } from "react"
import { useMobileCheck } from "../../../utils/isMobilView"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { Box } from "@mui/material"
import { MobileCarousalStylesWrapper } from "./thank-you-screen-carousal.style"
import { CarouselProgressiveBarStyles } from "../../hoc/custom-carousal-dots-styles"
import Slider from "react-slick"
import { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { CustomNextArrow, CustomPrevArrow } from "../../hoc/custom-arrows"
import nextImage from "../../../public/taj-gold-right-arrow.svg"
import prevImage from "../../../public/taj-gold-left-arrow.svg"
import { CommonCarouselStyles } from "../../hoc/carousal-component-styles"

const ThankYouScreenCarousal = ({ props }: any) => {
  const context = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    autoplay: false,
    centerMode: false,
    speed: 1000,
    initialSlide: 1,
    slidesToShow: props?.length < 3 ? props?.length : 3,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    prevArrow: (
      <CustomPrevArrow
        cssData={{
          top: "50%",
          left: "4.167vw",
          width: "3.125vw",
          height: "3.125vw",
          background: `url(${prevImage?.src}) no-repeat`,
          borderRadius: "50%",
          boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
        }}
      />
    ),
    nextArrow: (
      <CustomNextArrow
        cssData={{
          top: "50%",
          right: "4.167vw",
          width: "3.125vw",
          height: "3.125vw",
          background: `url(${nextImage?.src}) no-repeat`,
          borderRadius: "50%",
          boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
        }}
      />
    ),
    responsive: [
      {
        breakpoint: 650,
        settings: {
          dots: true,
          arrows: false,
          infinite: true,
          autoplay: false,
          swipeToSlide: true,
          speed: 500,
          initialSlide: 0,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <Box sx={{ marginTop: "-2vw" }}>
      {isMobile ? (
        <MobileCarousalStylesWrapper
          $inactiveDotWidth={`${MobilePxToVw(400 / props?.length - 1)}`}
          $backGroundColor={true}>
          <CarouselProgressiveBarStyles $login={false} $marginTopProp={"5vw"}>
            <Slider {...settings}>
              {props?.map((item: any, index: number) => (
                <Box key={index}>
                  {context?.renderComponent(item?._type, item, index)}
                </Box>
              ))}
            </Slider>
          </CarouselProgressiveBarStyles>
        </MobileCarousalStylesWrapper>
      ) : (
        <CommonCarouselStyles
          sx={{
            ".slick-list": {
              width: "74vw",
              margin: "auto",
              display: "block",
              alignItems: "self-end",
            },
            ".slick-slider .slick-track, .slick-slider .slick-list": {
              display: "flex",
              alignItems: "self-start",
            },
          }}>
          <Slider {...settings}>
            {props?.map((item: any, index: number) => (
              <Box key={index}>
                {context?.renderComponent(item?._type, item, { fromSSO: true })}
              </Box>
            ))}
          </Slider>
        </CommonCarouselStyles>
      )}
    </Box>
  )
}

export default ThankYouScreenCarousal
