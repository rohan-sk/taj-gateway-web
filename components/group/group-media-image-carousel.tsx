import React, { Fragment, useState } from "react"
import Slider from "react-slick"
import dynamic from "next/dynamic"
import { theme } from "../../lib/theme"
import { urlFor } from "../../lib-sanity"
import { Box, Grid, Typography } from "@mui/material"
import { useMobileCheck } from "../../utils/isMobilView"
import { CommonCarouselStyles } from "../hoc/carousal-component-styles"
const CustomNextArrow = dynamic(() => import("../hoc/custom-arrows").then((module) => module.CustomNextArrow))
const CustomPrevArrow = dynamic(() => import("../hoc/custom-arrows").then((module) => module.CustomPrevArrow))
import {
  TitleTypo,
  TitleTypoDataBox,
  ChildCarouselMainBox,
  ChildCarouselImageBox,
  ParentCarouselImageBox,
  CarouselPaginationTypo,
} from "../GalleryCarousel/styles"
import prevImage from "../../public/taj-gold-left-arrow.svg"
import nextImage from "../../public/taj-gold-right-arrow.svg"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"

const MediaImageCarousel = ({ props }: any) => {
  const isMobile = useMobileCheck()

  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [mainSliderReference, setMainSliderReference] = useState<Slider>()
  const [bottomSliderReference, setBottomSliderReference] = useState<Slider>()

  const settings = {
    infinite: true,
    swipeToSlide: true,
    arrows: isMobile ? false : true,
    speed: 500,
    initialSlide: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          arrows: false,
          infinite: false,
          swipeToSlide: true,
          speed: 500,
          initialSlide: 0,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: (
      <CustomNextArrow
        cssData={{
          right: "4.167vw",
          width: "3.125vw",
          height: "3.125vw",
          background: `url(${nextImage?.src}) no-repeat`,
        }}
      />
    ),
    prevArrow: (
      <CustomPrevArrow
        cssData={{
          left: "4.167vw",
          width: "3.125vw",
          height: "3.125vw",
          background: `url(${prevImage?.src}) no-repeat`,
        }}
      />
    ),
    afterChange: (sliderIndex: number) => {
      setSelectedIndex(sliderIndex)
    },
  }
  const secondSettings = {
    arrows: false,
    infinite: false,
    swipeToSlide: true,
    speed: 500,
    initialSlide: 0,
    slidesToScroll: 1,
    slidesToShow: isMobile ? 5 : 11,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          arrows: false,
          infinite: false,
          swipeToSlide: true,
          speed: 500,
          initialSlide: 0,
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
    ],
  }

  const clickHandler = (index: number) => {
    mainSliderReference?.slickGoTo(index, true)
  }
  return (
    <Box maxHeight={isMobile ? "unset" : "95vh"}>
      <Grid>
        <CommonCarouselStyles>
          <Box
            width="100%"
            sx={{
              position: isMobile ? "absolute" : "relative",
              top: isMobile ? "50%" : "unset",
              transform: isMobile ? "translateY(-50%)" : "unset",
            }}>
            <Slider
              {...settings}
              asNavFor={bottomSliderReference}
              ref={(slider1: any) => {
                setMainSliderReference(slider1)
              }}>
              {props?.map((item: any, index: number) => {
                let largeImage = item?.isFromProperty
                  ? item?.imageAsset?.largeImage?.[0]?.asset?._ref
                  : item?.largeImage?.asset?._ref
                let smallImage = item?.isFromProperty
                  ? item?.imageAsset?.image?.[0]?.asset?._ref
                  : item?.image?.asset?._ref
                return (
                  <Fragment key={index}>
                    {(largeImage || smallImage) && (
                      <ParentCarouselImageBox
                        key={index}
                        sx={{
                          padding: isMobile ? "0vw 3.125vw" : "0vw",
                        }}>
                        <Box
                          loading="lazy"
                          component="img"
                          alt={`-image`}
                          width={isMobile ? "100%" : "unset"}
                          height={isMobile ? "100%" : "59.2vh"}
                          sx={{
                            objectFit: "fill",
                            margin: "0 auto",
                            "@media (max-width: 1440px)": {
                              maxHeight: isMobile ? MobilePxToVw(620) : DesktopPxToVw(620),
                            },
                          }}
                          src={urlFor(isMobile ? smallImage : largeImage).url()}
                        />
                      </ParentCarouselImageBox>
                    )}
                    {isMobile ? (
                      <Box mt={"5vw"} sx={{ textAlign: "center" }} p={"0vw 3.125vw"}>
                        <Typography variant={"m-heading-xs"} sx={{ color: theme?.palette?.ihclPalette?.hexEleven }}>
                          {item?.title}
                        </Typography>
                      </Box>
                    ) : (
                      <TitleTypoDataBox>
                        <TitleTypo
                          variant={isMobile ? "m-heading-xs" : "heading-xs"}
                          sx={{ color: theme?.palette?.ihclPalette?.hexOne }}>
                          {item?.title}
                        </TitleTypo>
                      </TitleTypoDataBox>
                    )}
                  </Fragment>
                )
              })}
            </Slider>
          </Box>
        </CommonCarouselStyles>
        <ChildCarouselMainBox>
          <Box
            width={"100%"}
            sx={{
              position: isMobile ? "absolute" : "relative",
              bottom: isMobile ? MobilePxToVw(30) : "unset",
            }}>
            <CommonCarouselStyles>
              <Slider
                {...secondSettings}
                asNavFor={mainSliderReference}
                ref={(slider2: any) => setBottomSliderReference(slider2)}>
                {props?.map((item: any, index: number) => {
                  let largeImage = item?.isFromProperty
                    ? item?.imageAsset?.largeImage?.[0]?.asset?._ref
                    : item?.largeImage?.asset?._ref
                  let smallImage = item?.isFromProperty
                    ? item?.imageAsset?.image?.[0]?.asset?._ref
                    : item?.image?.asset?._ref
                  return (
                    <Fragment key={index}>
                      {(largeImage || smallImage) && (
                        <Box
                          key={index}
                          onClick={() => {
                            clickHandler(index), setSelectedIndex(index)
                          }}>
                          <ChildCarouselImageBox>
                            <Box
                              loading="lazy"
                              component="img"
                              alt={`-image`}
                              width={"100%"}
                              height={"100%"}
                              sx={{
                                cursor: "pointer",
                                objectFit: "fill",
                                border:
                                  selectedIndex === index
                                    ? isMobile
                                      ? `0.156vw solid ${theme?.palette?.ihclPalette?.hexTwo}`
                                      : `0.08vw solid ${theme?.palette?.ihclPalette?.hexTwo}`
                                    : "",
                              }}
                              src={urlFor(isMobile ? smallImage : largeImage).url()}
                            />
                          </ChildCarouselImageBox>
                        </Box>
                      )}
                    </Fragment>
                  )
                })}
              </Slider>
            </CommonCarouselStyles>
            <CarouselPaginationTypo variant={isMobile ? "m-heading-xs" : "heading-xs"}>
              {selectedIndex + 1} / {props?.length}
            </CarouselPaginationTypo>
          </Box>
        </ChildCarouselMainBox>
      </Grid>
    </Box>
  )
}

export default MediaImageCarousel
