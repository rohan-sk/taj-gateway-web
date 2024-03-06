import React, { useContext, useRef } from "react"
import Slider from "react-slick"
import dynamic from "next/dynamic"
import { Box } from "@mui/material"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useMobileCheck } from "../../utils/isMobilView"
const CustomNextArrow = dynamic(() => import("../hoc/custom-arrows").then((module) => module.CustomNextArrow))
const CustomPrevArrow = dynamic(() => import("../hoc/custom-arrows").then((module) => module.CustomPrevArrow))
import { CommonCarouselStyles } from "../hoc/carousal-component-styles"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { ICONS } from "../constants"
import { getListWithScoreAndBrandSorting } from "../../utils/getListWithPriorityAndBrandSorting"

const GroupCarousalWithArrows = ({ props, parentProps }: any) => {
  const context = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  const imgRef: any = useRef(null)
  const imgElements = imgRef.current?.getElementsByTagName("img")
  const imgHeights: number[] = []
  if (imgElements) {
    Array?.from(imgElements).forEach((item: any) => {
      item.onload = () => {
        const height = item?.clientHeight
        imgHeights.push(height)
      }
    })
  }
  const maxImgHeight = Math.max(...imgHeights)
  const arrowPosition = maxImgHeight / 2 || 0
  const settings = {
    centerMode: false,
    arrows: isMobile ? false : true,
    autoplay: isMobile ? true : false,
    infinite: props?.length > 3 ? true : false,
    speed: 650,
    initialSlide: 0,
    autoplaySpeed: 3000,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: isMobile ? 1.1 : 1,
    prevArrow: (
      <CustomPrevArrow
        items={props}
        cssData={{
          top: arrowPosition > 0 ? `${arrowPosition}px` : "45%",
          left: "4.16vw",
          width: "3.125vw",
          height: "3.125vw",
          borderRadius: "50%",
          background: `url(${ICONS?.TRANSPARENT_ARROW_LEFT}) no-repeat`,
        }}
      />
    ),
    nextArrow: (
      <CustomNextArrow
        items={props}
        cssData={{
          top: arrowPosition > 0 ? `${arrowPosition}px` : "45%",
          right: "4.16vw",
          width: "3.125vw",
          height: "3.125vw",
          borderRadius: "50%",
          background: `url(${ICONS?.TRANSPARENT_ARROW_RIGHT}) no-repeat`,
        }}
      />
    ),
  }

  return (
    <Box sx={{ width: "100%" }} ref={imgRef}>
      <CommonCarouselStyles
        sx={{
          ".slick-slider": {
            overflow: "hidden",
          },
          ".slick-slide": {
            padding: "0 1.04vw",
          },
          ".slick-list": {
            margin: "0 -8.04vw",
          },
          ".slick-track": {
            marginBottom: "0.729vw",
          },
        }}>
        <Slider {...settings}>
          {getListWithScoreAndBrandSorting(props)?.map((item: any, index: number) => (
            <Box key={index}>
              {context?.renderComponent(
                item?._type,
                { ...item, gridSize: settings?.slidesToShow },
                { index, parentProps },
              )}
            </Box>
          ))}
        </Slider>
      </CommonCarouselStyles>
    </Box>
  )
}

export default GroupCarousalWithArrows
