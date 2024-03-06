import React, { useEffect, useRef, useState } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import dynamic from "next/dynamic"
import { urlFor } from "../../lib-sanity"
import { Typography, Box, Card, useTheme } from "@mui/material"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { StyledChevronRight } from "../card/styles/common-styles"
import { CommonCarouselStyles } from "../hoc/carousal-component-styles"
import { NextArrow, PrevArrow } from "../hoc/actions/transparent-arrows"
import {
  ActionBox,
  CardContentBox,
  ImageBox,
  TitleBox,
} from "./styles/multi-cards-with-bg-image"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { CONSTANTS } from "../constants"
import { useMobileCheck } from "../../utils/isMobilView"
import { GoldColorNextIcon, GoldColorPrevIcon } from "../../utils/customIcons"
const CustomReadMore = dynamic(() => import("../hoc/CustomReadMore"))
const MultiRowTitle = dynamic(() => import("../hoc/title/multi-row-title"))

const MultiCardsCarousalWithGoldColorText = ({ props, padding }: any) => {
  const theme = useTheme()
  const navigate = useAppNavigation()
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [nextArrowTitle, setNextArrowTitle] = useState<string>("")
  const [prevArrowTitle, setPrevArrowTitle] = useState<string>("")
  const recViewRef = useRef()
  const isMobile = useMobileCheck()
  if (props?.viewEventCallback) {
    props?.viewEventCallback(props, recViewRef)
  }
  const settings = {
    arrows: true,
    infinite: true,
    swipeToSlide: true,
    speed: 600,
    initialSlide: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
    prevArrow: (
      <PrevArrow
        prevArrowTitle={prevArrowTitle}
        titleColor={theme?.palette?.neuPalette?.hexTwo}
        GoldColorPrevIcon={GoldColorPrevIcon}
        data={props}
      />
    ),
    nextArrow: (
      <NextArrow
        nextArrowTitle={nextArrowTitle}
        titleColor={theme?.palette?.neuPalette?.hexTwo}
        GoldColorNextIcon={GoldColorNextIcon}
        data={props}
      />
    ),
    afterChange: (sliderIndex: number) => setActiveIndex(sliderIndex),
  }
  useEffect(() => {
    setNextArrowTitle(
      activeIndex == props?.items?.length - 1
        ? props?.items?.[0]?.title
        : props?.items?.[activeIndex + 1]?.title
    )
    setPrevArrowTitle(
      activeIndex == 0
        ? props?.items?.[props?.items?.length - 1]?.title
        : props?.items?.[activeIndex - 1]?.title
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex])

  const getSide = (activeIndex: number, index: number) => {
    const length = props?.items?.length
    if (activeIndex === index) {
      return "center"
    } else if (activeIndex === 0) {
      if (index === length - 1) {
        return "left"
      } else {
        return "right"
      }
    } else if (activeIndex === length - 1) {
      if (index === 0) {
        return "right"
      } else {
        return "left"
      }
    } else if (index < activeIndex) {
      return "left"
    } else {
      return "right"
    }
  }

  return (
    <Box
      aria-label="multi-carousel-with-img-bg"
      ref={recViewRef}
      sx={{
        width: "100%",
        position: "relative",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        padding: padding?.desktop,
      }}>
      <TitleBox sx={{ paddingTop: "0vw" }}>
        <MultiRowTitle {...props} />
      </TitleBox>
      <Box>
        <CommonCarouselStyles
          sx={{
            ".slick-active .in-active-box": {
              border: "none",
              filter: "none",
            },
          }}>
          <Slider {...settings}>
            {props?.items?.map((item: any, index: number) => {
              let cardBackgroundColor
              let textColor
              if (item?.aesthetic?._ref) {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const response = useAesthetics(item?.aesthetic?._ref)
                cardBackgroundColor = response?.cardBackgroundColor
                textColor = response?.textColor
              }

              return (
                <Box
                  key={index}
                  sx={{
                    borderImage:
                      getSide(activeIndex, index) === "center"
                        ? "unset"
                        : getSide(activeIndex, index) === "left"
                        ? "linear-gradient(270deg, #AD8B3A, rgba(255, 255, 255, 0) 50%) 1 / 1.5px"
                        : getSide(activeIndex, index) === "right"
                        ? "linear-gradient(90deg, #AD8B3A, rgba(255, 255, 255, 0) 50%) 1 / 1.5px"
                        : "unset",
                  }}>
                  <Card
                    key={index}
                    sx={{
                      margin: "auto 2.083vw !important",
                      "&.MuiCard-root": {
                        minHeight: "34.1vw",
                        width: "49.271vw",
                        borderRadius: "0",
                        boxShadow: "none",
                        border:
                          index === activeIndex ? "1px solid #FEFEFE" : "unset",
                        backgroundColor:
                          cardBackgroundColor ??
                          theme?.palette?.background?.default,
                        opacity: index === activeIndex ? "1" : "0",
                        WebkitTransition: "opacity .3s linear",
                      },
                    }}>
                    {item?.largeImage?.asset?._ref && (
                      <ImageBox>
                        <Box
                          alt="image"
                          loading="lazy"
                          component="img"
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transform:
                              index === activeIndex ? "scale(1.2)" : "unset",
                            WebkitTransition: "transform .3s ease-in-out",
                            MozTransition: "transform .3s ease-in-out",
                            msTransition: "transform .3s ease-in-out",
                          }}
                          src={urlFor(item?.largeImage?.asset?._ref).url()}
                        />
                      </ImageBox>
                    )}
                    <CardContentBox>
                      {item?.title && (
                        <Typography
                          variant="heading-xs"
                          color={textColor ?? theme?.palette?.text?.primary}>
                          {item?.title}
                        </Typography>
                      )}
                      {item?.description && (
                        <Typography
                          variant={isMobile ? "m-body-sl" : "body-ml"}
                          sx={{
                            color: textColor
                              ? textColor
                              : theme?.palette?.neuPalette?.hexSeventeen,
                          }}>
                          {item?.description.length >
                          CONSTANTS?.ITEM_DESCRIPTION_CHARACTER_LIMIT ? (
                            <>
                              <CustomReadMore
                                length={
                                  CONSTANTS?.ITEM_DESCRIPTION_CHARACTER_LIMIT
                                }
                                variant={isMobile ? "m-body-l" : "body-ml"}>
                                {item?.description}
                              </CustomReadMore>
                            </>
                          ) : (
                            item?.description
                          )}
                        </Typography>
                      )}
                      {item?.primaryAction?.url && (
                        <ActionBox
                          onClick={() =>
                            navigate(
                              item?.primaryAction?.url,
                              item?.primaryAction?.urlType
                            )
                          }>
                          <Typography
                            variant="link-m"
                            sx={{ letterSpacing: "0.1em" }}>
                            {item?.primaryAction?.title}
                          </Typography>
                          <StyledChevronRight />
                        </ActionBox>
                      )}
                    </CardContentBox>
                  </Card>
                </Box>
              )
            })}
          </Slider>
        </CommonCarouselStyles>
      </Box>
    </Box>
  )
}
export default MultiCardsCarousalWithGoldColorText
