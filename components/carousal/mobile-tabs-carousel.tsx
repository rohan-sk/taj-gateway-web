import React, { useState, useEffect, useRef } from "react"
import Slider from "react-slick"
import { useTheme } from "@mui/system"
import "slick-carousel/slick/slick.css"
import { urlFor } from "../../lib-sanity"
import "slick-carousel/slick/slick-theme.css"
import { Box, Stack, Typography } from "@mui/material"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { aestheticItems } from "../types"
import { useRouter } from "next/router"

interface dataItems {
  props: itemsProps[]
  largeVariant: string
  initialSlide: number | undefined
  aesthetic: aestheticItems
}
interface itemsProps {
  title: string
  urlType: string
  description: string
}

export type titleTypeDeclaration = {
  title: string
}

const MobileTabsCarousel = ({
  props,
  initialSlide = 1,
  aesthetic,
}: dataItems) => {
  const theme = useTheme()
  const navigate = useAppNavigation()
  const [activeIndex, setActiveIndex] = useState(initialSlide)
  const router = useRouter()

  const settings = {
    dots: false,
    infinite: true,
    centerMode: true,
    swipeToSlide: true,
    initialSlide: initialSlide,
    slidesToShow: 2.4,
    slidesToScroll: 1,
    centerPadding: MobilePxToVw(55),
  }

  const sliderRef = useRef<any>(null)

  const goToCenter = (index: any) => {
    sliderRef.current && sliderRef.current?.slickGoTo(index)
  }

  useEffect(() => {
    const currentUrl = router?.query?.pid ? router?.query?.pid?.[0] : ""
    const selectedIndex = Array?.isArray(props)
      ? props?.findIndex((item: any) => `/${currentUrl}` === item?.url)
      : 0
    setActiveIndex(selectedIndex)
    goToCenter(selectedIndex)
  }, [props, router?.query?.pid])

  const handleChange = (index: number, url: string): void => {
    setActiveIndex(index)
    url && navigate(url)
  }

  return (
    <Box
      width={"100%"}
      py={MobilePxToVw(35)}
      sx={{
        overflowX: "hidden",
        "& .slick-slide": {
          display: "flex !important",
          width: "40.313vw !important",
        },

        "& .slick-track": {
          width: "100%",
          display: "flex",
          alignItems: "center",
        },
      }}
    >
      <Slider {...settings} ref={sliderRef}>
        {props?.map((item: any, index: number) => (
          <Box
            key={index}
            width={"40.313vw"}
            p={"5vw 4.063vw"}
            onClick={() => handleChange(index, item?.url)}
            className="centeredBox"
            sx={{
              cursor: "pointer",
              backgroundColor: index === activeIndex ? "#fff" : "transparent",
              boxShadow:
                index === activeIndex
                  ? "2px 3px 15px 2px rgba(0, 0, 0, 0.10)"
                  : "transparent",
            }}
          >
            <Stack
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              rowGap={"1.667vw"}
            >
              {item?.logo?.asset?._ref && (
                <Box
                  alt={"mob-tabs"}
                  component={"img"}
                  maxWidth={"100%"}
                  sx={{ cursor: "pointer" }}
                  src={urlFor(item?.image?.asset?._ref).url()}
                  onClick={() => navigate(item?.url)}
                />
              )}
              <Typography variant={"m-heading-xs"}>{item?.title}</Typography>
              {item?.description && (
                <Typography
                  textAlign={"center"}
                  variant="m-body-s"
                  sx={{ lineHeight: "140%" }}
                >
                  {item?.description}
                </Typography>
              )}
            </Stack>
          </Box>
        ))}
      </Slider>
    </Box>
  )
}

export default MobileTabsCarousel
