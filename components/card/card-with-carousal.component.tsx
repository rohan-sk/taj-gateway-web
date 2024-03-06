import React from "react"
import Slider from "react-slick"
import { urlFor } from "../../lib-sanity"
import { Box, Typography } from "@mui/material"
import { CommonCarouselStyles } from "../hoc/carousal-component-styles"

type CardWithCarousalProps = {
  title: string
  description: string
  carouselImages: carouselImagesItem[]
}
type carouselImagesItem = {
  altText: string
  asset: {
    _ref: string
  }
}

export const CardWithCarousal = (props: CardWithCarousalProps) => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    initialSlide: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    pauseOnDotsHover: true,
  }

  return (
    <Box>
      <CommonCarouselStyles sx={{ width: "96%", marginLeft: "auto" }}>
        <Slider {...settings}>
          {props?.carouselImages?.map((item: carouselImagesItem, index: number) => (
            <>
              {item?.asset?._ref && (
                <Box
                  key={index}
                  alt={item?.altText || "-image"}
                  component={"img"}
                  width={"100%"}
                  height={"100%"}
                  src={urlFor(item?.asset?._ref).url()}
                />
              )}
            </>
          ))}
        </Slider>
      </CommonCarouselStyles>
      <Box sx={{ margin: "2vw 0vw" }}>
        {props?.title && <Typography variant="heading-xs">{props?.title}</Typography>}
        {props?.description && <Typography variant="body-s">{props?.description}</Typography>}
      </Box>
    </Box>
  )
}
export default CardWithCarousal
