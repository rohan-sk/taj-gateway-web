import Slider from "react-slick"
import dynamic from "next/dynamic"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Box } from "@mui/material"
import prevImage from "../../public/taj-gold-left-arrow.svg"
import nextImage from "../../public/taj-gold-right-arrow.svg"
import { CommonCarouselStyles } from "../hoc/carousal-component-styles"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { useCallback, useContext, useState } from "react"
const CustomNextArrow = dynamic(() => import("../hoc/custom-arrows").then((module) => module.CustomNextArrow))
const CustomPrevArrow = dynamic(() => import("../hoc/custom-arrows").then((module) => module.CustomPrevArrow))

type CarouselWithFourCardsType = {
  props: CarouselWithFourCardItems[]
}
type CarouselWithFourCardItems = {
  item: any
  _type: string
  index: number
}

const CarouselWithFourCards = ({ props }: CarouselWithFourCardsType) => {
  const [maxheight, setMaxheight] = useState<number>(0)

  const context = useContext(IHCLContext)

  const setTitleHeight = useCallback((height: any) => {
    setMaxheight((prevValue: any) => (prevValue > height ? prevValue : height))
  }, [])

  const settings = {
    arrows: true,
    infinite: true,
    swipeToSlide: true,
    speed: 800,
    initialSlide: 0,
    slidesToScroll: 1,
    slidesToShow: 4,
    prevArrow: (
      <CustomPrevArrow
        cssData={{
          top: "40%",
          left: "-8.3vw",
          width: DesktopPxToVw(60),
          height: DesktopPxToVw(60),
          background: `url(${prevImage?.src}) no-repeat`,
          backgroundSize: "auto",
        }}
      />
    ),
    nextArrow: (
      <CustomNextArrow
        cssData={{
          top: "40%",
          right: "-8.3vw",
          width: DesktopPxToVw(60),
          height: DesktopPxToVw(60),
          background: `url(${nextImage?.src}) no-repeat`,
        }}
      />
    ),
  }

  return (
    <Box sx={{ padding: "0vw 12.5vw" }}>
      <CommonCarouselStyles
        sx={{
          ".slick-list": {
            margin: "0 -1.04vw",
          },
          ".slick-slide": {
            padding: "0 1.04vw",
          },
        }}>
        <Slider {...settings}>
          {props?.map((item: CarouselWithFourCardItems, index: number) => (
            <Box key={index}>
              {context?.renderComponent(item?._type, { ...item, setTitleHeight, maxheight }, index)}
            </Box>
          ))}
        </Slider>
      </CommonCarouselStyles>
    </Box>
  )
}
export default CarouselWithFourCards
