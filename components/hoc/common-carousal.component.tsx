import Slider from "react-slick"
import { Box } from "@mui/material"
import React, { useState } from "react"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { CommonCarouselStyles } from "./carousal-component-styles"

export interface CarouselProps {
  items: any[]
  toggle?: boolean
  position?: number
  Component: Function
  isVertical?: boolean
  settings: settingsProps
}
interface settingsProps {
  speed?: number
  arrows?: boolean
  autoplay?: boolean
  infinite?: boolean
  centerMode?: boolean
  initialSlide?: number
  slidesToShow?: number
  autoplaySpeed?: number
  slidesToScroll?: number
}
const defaultSettings = {
  arrows: false,
  autoplay: false,
  infinite: false,
  centerMode: false,
  speed: 500,
  initialSlide: 0,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplaySpeed: 2000,
}
function CommonCarousel({
  items,
  settings = defaultSettings,
  Component,
  position,
  toggle,
}: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <Box width={"100%"}>
      <CommonCarouselStyles>
        <Slider {...settings}>
          {items?.map((item: any, index: number) => {
            return (
              <Component
                {...item}
                key={index}
                items={items}
                toggle={toggle}
                dataSet={index}
                position={position}
                activeIndex={activeIndex}
                itemsLength={items?.length}
                setActiveIndex={setActiveIndex}
              />
            )
          })}
        </Slider>
      </CommonCarouselStyles>
    </Box>
  )
}
export default CommonCarousel
