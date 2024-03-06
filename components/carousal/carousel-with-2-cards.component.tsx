import Slider from "react-slick"
import dynamic from "next/dynamic"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Box } from "@mui/material"
import prevImage from "../../public/taj-gold-left-arrow.svg"
import nextImage from "../../public/taj-gold-right-arrow.svg"
const CustomNextArrow = dynamic(() =>
import("../hoc/custom-arrows").then((module) => module.CustomNextArrow)
)
const CustomPrevArrow = dynamic(() =>
import("../hoc/custom-arrows").then((module) => module.CustomPrevArrow)
)
import { CommonCarouselStyles } from "../hoc/carousal-component-styles"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { useContext } from "react"

type CarouselWithTwoCardsType = {
  props: CarouselWithTwoCardItems[]
}
type CarouselWithTwoCardItems = {
  item: any
  _type: string
  index: number
}

const CarouselWithTwoCards = ({ props }: CarouselWithTwoCardsType) => {
  const context = useContext(IHCLContext)

  const settings = {
    arrows: true,
    infinite: props?.length > 2 ? true : false,
    swipeToSlide: true,
    speed: 800,
    initialSlide: 0,
    slidesToScroll: 1,
    slidesToShow: 2,
    prevArrow: (
      <CustomPrevArrow
        cssData={{
          top: "30%",
          left: "-8.333vw", // This padding took from global template 80px from end.
          width: "3.125vw", // width is 60px
          height: "3.125vw", // height is 60px
          background: `url(${prevImage?.src}) no-repeat`,
          backgroundSize: "auto",
        }}
      />
    ),
    nextArrow: (
      <CustomNextArrow
        cssData={{
          top: "30%",
          right: "-8.333vw", // This padding took from global template 80px from end.
          width: "3.125vw", // width is 60px
          height: "3.125vw", // height is 60px
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
          ".description": {
            "@media (max-width: 640px)": {
              minHeight: "unset",
            },
          },
        }}>
        <Slider {...settings}>
          {props?.map((item: CarouselWithTwoCardItems, index: number) => (
            <Box key={index}>
              {context?.renderComponent(item?._type, item, index)}
            </Box>
          ))}
        </Slider>
      </CommonCarouselStyles>
    </Box>
  )
}
export default CarouselWithTwoCards
