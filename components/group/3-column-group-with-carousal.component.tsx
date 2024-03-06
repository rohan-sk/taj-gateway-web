import React, { useContext } from "react"
import Slider from "react-slick"
import { Box } from "@mui/material"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"

const ThreeColumnGroupWithCarousal = ({ props }: any) => {
  const context = useContext(IHCLContext)
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    swipeToSlide: false,
    speed: 1000,
    initialSlide: 0,
    slidesToScroll: 1,
    slidesToShow: 1.05,
    autoplaySpeed: 3000,
  }

  return (
    <>
      <Box sx={{ width: "100%", margin: "auto" }}>
        <Slider {...settings}>
          {props?.map((item: any, index: number) => (
            <Box key={index}>
              {context?.renderComponent(item?._type, item, index)}
            </Box>
          ))}
        </Slider>
      </Box>
    </>
  )
}

export default ThreeColumnGroupWithCarousal
