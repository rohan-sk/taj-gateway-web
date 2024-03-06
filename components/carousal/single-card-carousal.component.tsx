/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react"
import Slider from "react-slick"
import { Box, Typography } from "@mui/material"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useMobileCheck } from "../../utils/isMobilView"
import { CarouselProgressiveBarStyles } from "../hoc/custom-carousal-dots-styles"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { StyledTypography } from "./styles/tabs-in-carousal"
import { MobileCarousalStylesWrapper } from "./styles/common-styles"
import { MobilePxToVw } from "../../utils/DesktopFontCalc"

const SingleCardCarousal = ({ props, parameterMap }: any) => {
  const context = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  const [login, setLogin] = useState<boolean>(false)
  useEffect(() => {
    {
      props?.map((item: any, index: number) => {
        if (item?.variant === "authentication.card.image-with-title") {
          setLogin(true)
        } else {
          setLogin(false)
        }
      })
    }
  }, [])
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    centerMode: false,
    speed: 1000,
    initialSlide: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,

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
          slidesToShow: login ? 2 : 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <Box
      sx={{
        width: "100%",
        mb: isMobile ? "6.25vw" : "",
        padding: isMobile && login ? "0vw 1.2vw" : "",
      }}>
      {isMobile && parameterMap?.value && (
        <StyledTypography>{parameterMap?.value}</StyledTypography>
      )}
      {isMobile ? (
        <MobileCarousalStylesWrapper
          $inactiveDotWidth={`${MobilePxToVw(400 / props?.length)}`}
          $backGroundColor={true}
          sx={{
            ".slick-slide": {
              padding: "0 0.781vw",
            },
          }}>
          <CarouselProgressiveBarStyles $login={login}>
            <Slider {...settings}>
              {props
                ?.filter((prop: any) => !prop?.isHidden)
                ?.map((item: any, index: number) => (
                  <Box key={index}>
                    {context?.renderComponent(item?._type, item, {
                      index,
                      fromCarousal: true,
                    })}
                  </Box>
                ))}
            </Slider>
          </CarouselProgressiveBarStyles>
        </MobileCarousalStylesWrapper>
      ) : (
        <Slider {...settings}>
          {props
            ?.filter((prop: any) => !prop?.isHidden)
            ?.map((item: any, index: number) => (
              <Box key={index}>
                {context?.renderComponent(item?._type, item, {
                  index,
                  fromCarousal: true,
                })}
              </Box>
            ))}
        </Slider>
      )}
    </Box>
  )
}

export default SingleCardCarousal
