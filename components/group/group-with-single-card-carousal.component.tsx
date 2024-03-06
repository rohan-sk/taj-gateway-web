import React, { useContext } from "react"
import Slider from "react-slick"
import { Box } from "@mui/material"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import prevImage from "../../public/taj-gold-left-arrow.svg"
import nextImage from "../../public/taj-gold-right-arrow.svg"
const CustomNextArrow =  dynamic(() => import("../hoc/custom-arrows").then((module) => module.CustomNextArrow))
const CustomPrevArrow =  dynamic(() => import("../hoc/custom-arrows").then((module) => module.CustomPrevArrow))
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  CommonCarouselStyles,
  CommonCarouselContainerBox,
} from "../hoc/carousal-component-styles"
import dynamic from "next/dynamic"
import { ICONS } from "../constants"

type GroupWithSingleCardCarousalProps = {
  props: GroupWithSingleCardCarousalItems[]
  variant?: string
}
type GroupWithSingleCardCarousalItems = {
  _type: string
}

const GroupWithSingleCardCarousal = ({
  props,
  variant,
}: GroupWithSingleCardCarousalProps) => {
  const context = useContext(IHCLContext)

  const settings = {
    arrows: true,
    infinite: true,
    autoplay: false,
    swipeToSlide: false,
    speed: 800,
    initialSlide: 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: (
      <CustomPrevArrow
        cssData={{
          top: "50%",
          left: "-8.3vw",
          width: "3.125vw",
          height: "3.125vw",
          borderRadius:
            variant ===
            "details.group.equally-occupied-section-with-text-bg-color"
              ? ""
              : "50%",
          background: `url(${
            variant ===
            "details.group.equally-occupied-section-with-text-bg-color"
              ? ICONS?.TRANSPARENT_ARROW_LEFT
              : prevImage?.src
          }) `,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      />
    ),
    nextArrow: (
      <CustomNextArrow
        cssData={{
          top: "50%",
          right: "-8.3vw",
          width: "3.125vw",
          height: "3.125vw",
          borderRadius:
            variant ===
            "details.group.equally-occupied-section-with-text-bg-color"
              ? ""
              : "50%",

          background: `url(${
            variant ===
            "details.group.equally-occupied-section-with-text-bg-color"
              ? ICONS?.TRANSPARENT_ARROW_RIGHT
              : nextImage?.src
          })`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      />
    ),
  }

  return (
    <>
      <CommonCarouselContainerBox>
        <CommonCarouselStyles
          sx={{
            ".slick-slide": {
              padding: "0 0.05vw",
            },
            ".slick-list": {
              margin: "0 -0.05vw",
            },
            ".slick-track": {
              display: "flex",
              alignItems: "center",
              background: "transparent",
            },
            ".slick-slider": {
              webkitUserSelect: "text",
              mozUserSelect: "text",
              msUserSelect: "text",
              userSelect: "text",
            },
          }}>
          <Slider {...settings}>
            {props
              ?.filter((prop: any) => !prop?.isHidden)
              ?.map((item: GroupWithSingleCardCarousalItems, index: number) => (
                <Box key={index}>
                  {context?.renderComponent(item?._type, item, index)}
                </Box>
              ))}
          </Slider>
        </CommonCarouselStyles>
      </CommonCarouselContainerBox>
    </>
  )
}

export default GroupWithSingleCardCarousal
