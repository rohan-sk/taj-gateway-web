import React, { useState, useEffect, useRef } from "react"
import Slider from "react-slick"
import dynamic from "next/dynamic"
import { useTheme } from "@mui/system"
import "slick-carousel/slick/slick.css"
import { urlFor } from "../../lib-sanity"
import "slick-carousel/slick/slick-theme.css"
import { Box, Divider, MenuItem, SelectChangeEvent, Typography } from "@mui/material"
import prevImage from "../../public/taj-gold-left-arrow.svg"
import nextImage from "../../public/taj-gold-right-arrow.svg"
import { CommonCarouselStyles } from "../hoc/carousal-component-styles"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { DescriptionTypo, StyledTitle } from "./styles/tabs-in-carousal"
import { useMobileCheck } from "../../utils/isMobilView"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { aestheticItems } from "../types"
import { useRouter } from "next/router"
const CustomNextArrow = dynamic(() => import("../hoc/custom-arrows").then((module) => module.CustomNextArrow))
const CustomPrevArrow = dynamic(() => import("../hoc/custom-arrows").then((module) => module.CustomPrevArrow))

interface dataItems {
  props: itemsProps[]
  largeVariant: string
  initialSlide: number | undefined
  aesthetic: any
  preRenderItemsCount: number
}
interface itemsProps {
  title: string
  urlType: string
  description: string
}

export type titleTypeDeclaration = {
  title: string
}

const WebTabsCarousel = ({ props, initialSlide, largeVariant, aesthetic, preRenderItemsCount }: dataItems) => {
  const isMobile = useMobileCheck()
  const theme = useTheme()
  const navigate = useAppNavigation()
  const router = useRouter()

  const [settings, setSettings] = useState<object>({
    dots: false,
    arrows: true,
    infinite: true,
    centerMode: true,
    swipeToSlide: true,
    speed: 500,
    initialSlide: initialSlide,
    slidesToShow: preRenderItemsCount ? preRenderItemsCount : props?.length >= 5 ? 5 : props?.length,
    slidesToScroll: 1,
    className: "center",
    // centerPadding: "30px",
    focusOnSelect: true,
    prevArrow: (
      <CustomPrevArrow
        cssData={{
          left: "-5.7vw",
          width: "3.125vw",
          height: "3.125vw",
          borderRadius: "50%",
          boxShadow: " -6px 10px 24px rgba(0, 0, 0, 0.1)",
          background: `url(${prevImage?.src}), no-repeat`,
        }}
      />
    ),
    nextArrow: (
      <CustomNextArrow
        cssData={{
          right: "-5.7vw",
          width: "3.125vw",
          height: "3.125vw",
          borderRadius: "50%",
          boxShadow: " -6px 10px 24px rgba(0, 0, 0, 0.1)",
          background: `url(${nextImage?.src}), no-repeat`,
        }}
      />
    ),
  })
  const sliderRef = useRef<any>(null)

  const goToCenter = (index: any) => {
    sliderRef.current && sliderRef.current?.slickGoTo(index)
  }
  useEffect(() => {
    const currentUrl = router?.query?.pid ? router?.query?.pid?.[0] : ""
    const selectedIndex = Array?.isArray(props) ? props?.findIndex((item: any) => `/${currentUrl}` === item?.url) : 0
    setSettings((previousSettings) => ({
      ...previousSettings,
      initialSlide: selectedIndex,
    }))
    goToCenter(selectedIndex)
  }, [props, router.query.pid])
  const listItems = props?.map((item: titleTypeDeclaration) => item?.title)
  const [value, setValue] = useState<string>(listItems?.[1])
  const handleChange = (event: SelectChangeEvent<any>) => {
    setValue(event.target.value)
  }

  return (
    <Box
      sx={{
        padding: isMobile ? aesthetic?.padding?.mobile : aesthetic?.padding?.desktop,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: aesthetic?.backgroundColor?.hex,
      }}>
      <Box
        sx={{
          ".slick-slide": {
            padding: "0vw 1.50vw",
            margin: "1.25vw 0",
            textAlign: "center",
          },
          ".slick-track": {
            display: "flex",
            alignItems: "center",
          },
          ".slick-center .centeredBox": {
            width: "100%",
            padding: "3.333vw 1.302vw",
            borderRight: "none",
            backgroundColor: theme?.palette?.ihclPalette?.hexOne,
            boxShadow: "-0.313vw 0.521vw 1.25vw rgba(0, 0, 0, 0.1)",
          },
          ".slick-arrow": {
            "&::before": {
              content: "none",
            },
          },
        }}>
        <Slider {...settings} ref={sliderRef}>
          {props?.map((item: any, index: number) => (
            <Box
              key={index}
              onClick={() => item?.url && navigate(item?.url)}
              className="centeredBox"
              sx={{
                cursor: "pointer",
                width: "17.188vw",
                alignItems: "center",
                flexDirection: "column",
                display: "flex !important",
                justifyContent: "center",
                padding: "3.333vw 1.302vw",
              }}>
              {item?.logo?.asset?._ref && (
                <Box
                  alt={`${item?.title}-img`}
                  loading="lazy"
                  component={"img"}
                  className="centerImg"
                  mb={isMobile ? "0vw" : item?.title || item?.description ? "1.667vw" : "0"}
                  sx={{ cursor: "pointer" }}
                  src={urlFor(item?.logo?.asset?._ref).url()}
                  onClick={() => navigate(item?.url)}
                />
              )}
              {item?.title && (
                <StyledTitle
                  className="centerText"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  variant={isMobile ? "m-heading-xs" : "heading-xs"}
                  $mobile={isMobile}>
                  {item?.title}
                </StyledTitle>
              )}
              {item?.description && (
                <Typography textAlign={"center"} variant={"body-ml"} sx={{ lineHeight: "140%" }}>
                  {item?.description}
                </Typography>
              )}
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  )
}

export default WebTabsCarousel
