import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Box } from "@mui/material"
import { useState, useEffect, useContext } from "react"
import { CommonCarouselStyles } from "../hoc/carousal-component-styles"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"

const CarouselWithOneHighlightedCard = ({ props }: any) => {
  const slidesToDisplay = 1
  const [activeIndex, setActiveIndex] = useState(1)
  const context = useContext(IHCLContext)

  const settings = {
    arrows: false,
    infinite: true,
    autoplay: true,
    swipeToSlide: true,
    speed: 800,
    initialSlide: 1,
    slidesToScroll: 1,
    slidesToShow: 1.06,
    afterChange: (sliderIndex: number) => setActiveIndex(sliderIndex),
  }

  useEffect(() => {
    if (slidesToDisplay % 2 !== 0) {
      global?.window?.document
        ?.getElementsByClassName("slick-active")
        ?.[slidesToDisplay]?.classList?.remove("slick-active")
    }
  }, [activeIndex])

  return (
    <Box width={"100%"}>
      <CommonCarouselStyles
        sx={{
          ".slick-slide": {
            opacity: "0.4",
          },
          ".slick-active": {
            opacity: "1",
          },
        }}
      >
        <Slider {...settings}>
          {props?.map((item: any, index: number) => (
            <Box key={index}>
              {context?.renderComponent(item._type, item, index)}
            </Box>
          ))}
        </Slider>
      </CommonCarouselStyles>
    </Box>
  )
}
export default CarouselWithOneHighlightedCard
