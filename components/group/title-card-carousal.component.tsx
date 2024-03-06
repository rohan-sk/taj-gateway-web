import React, { useContext, useEffect, useCallback, useRef, useState } from "react"
import dynamic from "next/dynamic"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Box, Grid } from "@mui/material"
import prevImage from "../../public/taj-gold-left-arrow.svg"
import nextImage from "../../public/taj-gold-right-arrow.svg"
const CustomNextArrow = dynamic(() => import("../hoc/custom-arrows").then((module) => module.CustomNextArrow))
const CustomPrevArrow = dynamic(() => import("../hoc/custom-arrows").then((module) => module.CustomPrevArrow))
import { CommonCarouselStyles } from "../hoc/carousal-component-styles"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { ActionButtonWrapperContainer } from "../../features/property/ui/styles/hotel-room-model-component-styles"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
import { useMobileCheck } from "../../utils/isMobilView"

const CarousalWithTitleCard = ({ props, largeVariant, characterLimitForItemDescription, groupActionType }: any) => {
  const context = useContext(IHCLContext)
  const imgRef: any = useRef(null)
  const isLargeVariant = largeVariant === "details.group.3-card-carousel-with-center-aligned-carousel-icons"
  const imgElements = imgRef.current?.getElementsByTagName("img")
  const [imgHeights, setImgHeights] = useState<any>([])
  useEffect(() => {
    if (imgElements) {
      Array.from(imgElements).forEach((item: any) => {
        item.onload = () => {
          const height = item?.clientHeight
          setImgHeights((prevImgHeights: any) => [...prevImgHeights, height])
        }
      })
    }
  }, [imgElements])
  const maxImgHeight = Math.max(...imgHeights)
  const arrowPosition = maxImgHeight / 2 || 0
  const isMobile = useMobileCheck()
  const settings = {
    arrows: true,
    infinite: props?.length > 3 ? true : false,
    autoplay: false,
    swipeToSlide: false,
    speed: 800,
    initialSlide: 0,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: (
      <CustomPrevArrow
        cssData={{
          top: isLargeVariant || arrowPosition === 0 ? "45%" : `${arrowPosition}px`,
          left: "-8.3vw",
          width: "3.125vw",
          height: "3.125vw",
          borderRadius: "50%",
          background: `url(${prevImage?.src}) no-repeat`,
        }}
      />
    ),
    nextArrow: (
      <CustomNextArrow
        cssData={{
          top: isLargeVariant || arrowPosition === 0 ? "45%" : `${arrowPosition}px`,
          right: "-8.3vw",
          width: "3.125vw",
          height: "3.125vw",
          borderRadius: "50%",
          background: `url(${nextImage?.src}) no-repeat`,
        }}
      />
    ),
  }

  const [maxheight, setMaxheight] = useState<number>(0)
  const [maxParameterHeight, setMaxParameterHeight] = useState<number>(0)
  const containerRef = useRef(null)
  const setTitleHeight = useCallback((height: any) => {
    setMaxheight((prevValue: any) => (prevValue > height ? prevValue : height))
  }, [])

  const setParameterContainerHeight = useCallback((height: any) => {
    setMaxParameterHeight((prevValue: any) => (prevValue > height ? prevValue : height))
  }, [])

  return (
    <>
      <Box sx={{ width: "100%", padding: "0vw 12.5vw" }} ref={imgRef}>
        <CommonCarouselStyles
          sx={{
            ".slick-slide": {
              padding: "0 1.05vw",
            },
            ".slick-list": {
              margin: "0 -1.04vw",
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
                    setParameterContainerHeight,
                    maxParameterHeight,
                  },
                  index,
                )}
              </Box>
            ))}
          </Slider>
        </CommonCarouselStyles>
        {groupActionType?.[0]?.primaryAction?.title && (
          <Grid
            container
            justifyContent={"center"}
            gap={"1.823vw"}
            sx={{
              marginTop: "2.083vw",
              paddingBottom: isMobile ? "4.688vw" : "",
            }}>
            {groupActionType?.[0]?.primaryAction?.title && (
              <ActionButtonWrapperContainer $isMobile={isMobile}>
                <RenderActionItem
                  isActionButtonType={true}
                  url={groupActionType?.[0]?.primaryAction?.url}
                  title={groupActionType?.[0]?.primaryAction?.title}
                  variant={groupActionType?.[0]?.primaryAction?.variant}
                  navigationType={groupActionType?.[0]?.primaryAction?.urlType}
                  buttonStyles={{
                    lineHeight: "140%",
                    letterSpacing: "1.8px",
                  }}
                />
              </ActionButtonWrapperContainer>
            )}
          </Grid>
        )}
      </Box>
    </>
  )
}

export default CarousalWithTitleCard
