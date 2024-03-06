import Slider from "react-slick"
import dynamic from "next/dynamic"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Box } from "@mui/material"
import prevImage from "../../public/white-left-arrow.png"
import nextImage from "../../public/white-right-arrow.png"
import { CommonCarouselStyles } from "../hoc/carousal-component-styles"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { useContext, useRef, useState, useEffect, useCallback } from "react"
const CustomNextArrow = dynamic(() => import("../hoc/custom-arrows").then((module) => module.CustomNextArrow))
const CustomPrevArrow = dynamic(() => import("../hoc/custom-arrows").then((module) => module.CustomPrevArrow))

const CarouselWithTwoHighlightedCards = ({ props }: any) => {
  const context = useContext(IHCLContext)
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
  const [maxheight, setMaxheight] = useState<number>(0)
  const [descriptionMaxheight, setDescriptionMaxheight] = useState<number>(0)
  const containerRef = useRef(null)

  const setTitleHeight = useCallback((height: any) => {
    setMaxheight((prevValue: any) => (prevValue > height ? prevValue : height))
  }, [])
  const setDescriptionHeight = useCallback((height: any) => {
    setDescriptionMaxheight((prevValue: any) => (prevValue > height ? prevValue : height))
  }, [])

  const settings = {
    arrows: true,
    infinite: props?.length > 2 ? true : false,
    centerMode: true,
    swipeToSlide: true,
    speed: 800,
    initialSlide: 0,
    slidesToScroll: 1,
    centerPadding: "12.5%",
    slidesToShow: 2,
    prevArrow: (
      <CustomPrevArrow
        cssData={{
          top: arrowPosition > 0 ? `${arrowPosition}px` : "37%",
          left: "10.9vw",
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
          top: arrowPosition > 0 ? `${arrowPosition}px` : "37%",
          right: "10.5vw",
          width: "3.125vw",
          height: "3.125vw",
          background: `url(${nextImage?.src}) no-repeat`,
          borderRadius: "50%",
          boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
        }}
      />
    ),
  }

  return (
    <Box width={"100%"} ref={imgRef}>
      <CommonCarouselStyles
        sx={{
          ".slick-slider": {
            overflow: "hidden",
          },
          ".slick-list": {
            margin: "0 -1.04vw",
          },
          ".slick-slide": {
            opacity: "0.4",
            padding: "0 1.04vw",
          },
          ".slick-active": {
            opacity: "1",
          },
          "& .slick-active .hide-box": {
            display: "flex !important",
          },
          ".slick-active + .slick-active ~ .slick-slide ": {
            opacity: "0.4",
            "& .hide-box": {
              display: "none!important",
            },
          },
          "& .hide-box": {
            display: "none!important",
          },

          ".slick-slide .title-box": {
            minHeight: "2.60vw",
            display: "flex",
            justifyContent: "flex-start",
          },
        }}>
        <Slider {...settings} ref={containerRef}>
          {props?.map((item: any, index: number) => (
            <Box key={index}>
              {context?.renderComponent(
                item?._type,
                {
                  ...item,
                  gridSize: settings?.slidesToShow,
                  setTitleHeight,
                  maxheight,
                  setDescriptionHeight,
                  descriptionMaxheight,
                },
                index,
              )}
            </Box>
          ))}
        </Slider>
      </CommonCarouselStyles>
    </Box>
  )
}
export default CarouselWithTwoHighlightedCards
