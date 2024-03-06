import React, { useState } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Box, Grid, Typography } from "@mui/material"

import prevImage from "../../../public/taj-grey-left-arrow.png"
import nextImage from "../../../public/taj-grey-right-arrow.png"
import {
  SixCardCommonCarouselContentBox,
  MobileCarousalStylesWrapper,
} from "../../../components/carousal/styles/six-cards-carousal"
import { CommonCarouselStyles } from "../../../components/hoc/carousal-component-styles"

const CustomPrevArrow = dynamic(() =>
  import("../../../components/hoc/custom-arrows").then((module) => module.CustomPrevArrow),
)
const CustomNextArrow = dynamic(() =>
  import("../../../components/hoc/custom-arrows").then((module) => module.CustomNextArrow),
)
import { theme } from "../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../../utils/isMobilView"
import { CardBox, CityImageBox, ImageBox } from "../../../components/card/styles/card-with-title"
import { urlFor } from "../../../lib-sanity"
import { useImageUtility } from "../../../utils/hooks/useImageUtility"
import { CONSTANTS } from "../../../components/constants"
import { StyledExpandMoreButton } from "../../../components/group/styles/common-styled-components"
import { ExpandMoreIconStyled } from "../../../components/group/styles/group-with-filter-cards"
import { CardsBox, ActionGrid, ActionBox } from "../../../components/hoc/CommonMsiteModalAlignment/ModalPropItemStyles"
import { StyledExpandMoreIcon } from "./styles/hotel-details-gallery-group-styles"
import dynamic from "next/dynamic"

const DestinationOffersCityCardCarousel = (props: any) => {
  const { getOptimizeImageUrl } = useImageUtility()
  let numberOfCards = CONSTANTS?.SIX
  const [countToShowCards, setCountToShowCards] = useState(numberOfCards)

  const isMobile = useMobileCheck()

  const settings = {
    dots: isMobile ? true : false,
    arrows: isMobile ? false : true,
    infinite: true,
    swipeToSlide: true,
    speed: 600,
    centerMode: isMobile ? true : false,
    initialSlide: isMobile ? 0.5 : 0,
    slidesToShow: isMobile
      ? props?.items?.length > 2
        ? 2
        : props?.items?.length
      : props?.items?.length > 6
      ? 6
      : props?.items?.length,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 641,
        settings: {
          slidesToShow: props?.items?.length > 3 ? 3 : props?.items?.length,
        },
      },
      {
        breakpoint: 421,
        settings: {
          slidesToShow: props?.items?.length > 2 ? 2 : props?.items?.length,
        },
      },
    ],
    prevArrow: (
      <CustomPrevArrow
        cssData={{
          top: props?.items?.[0]?.slidesToDisplay ? "33%" : "40%",
          left: props?.items?.[0]?.slidesToDisplay ? "-2.6%" : "-11.2%",
          width: "3.125vw",
          height: "3.125vw",
          borderRadius: "50%",
          boxShadow: " -6px 10px 24px rgba(0, 0, 0, 0.1)",
          background: `url(${prevImage?.src}), no-repeat`,
          objectFit: "contain",
        }}
      />
    ),
    nextArrow: (
      <CustomNextArrow
        cssData={{
          top: props?.items?.[0]?.slidesToDisplay ? "36%" : "40%",
          right: props?.items?.[0]?.slidesToDisplay ? "-3.8%" : "-11.2%",
          width: "5.125vw",
          height: "5.125vw",
          borderRadius: "50%",
          background: `url(${nextImage?.src}), no-repeat`,
        }}
      />
    ),
  }

  return (
    <SixCardCommonCarouselContentBox>
      {!isMobile && (
        <MobileCarousalStylesWrapper
          $backGroundColor={theme?.palette?.ihclPalette?.hexSeventeen}
          $inactiveDotWidth={`${MobilePxToVw(400 / props?.items?.length - 1)}`}>
          <CommonCarouselStyles
            sx={{
              ".slick-list": {
                margin: "0 -1.04vw",
              },
              ".slick-track": {
                display: props?.items?.length <= 6 ? "flex" : "",
                justifyContent: "center !important",
              },
              ".slick-slide": {
                padding: "0 1.046vw",
                width: props?.items?.length <= 6 ? "fit-content !important" : "",
              },
              "@media (max-width: 640px)": {
                "& .slick-slide .content": {
                  display: "none",
                  width: "initial",
                },
                "& .slick-active .content": {
                  display: "flex",
                },
                "& .slick-dots li.slick-active button": {
                  opacity: "1",
                  width: MobilePxToVw(80),
                  height: MobilePxToVw(2),
                  background: theme?.palette?.ihclPalette?.hexSeventeen,
                },
                "& .slick-dots button": {
                  width: "15.625vw",
                  height: " 0.3125vw",
                },
                "& .slick-slide .content-box": {
                  marginBottom: "3.75vw",
                },
              },
            }}>
            <Slider {...settings}>
              {props?.items?.map((item: any, index: number) => (
                <Box key={index}>
                  {item?.thumbnail && (
                    <CardBox
                      sx={{
                        textAlign: "center",
                        backgroundColor: index === props?.activeSlide ? theme?.palette?.ihclPalette?.hexTwo : "",
                      }}
                      onClick={() => props?.setActiveSlide(index)}>
                      <CityImageBox>
                        <Box
                          alt={`-img`}
                          width={"100%"}
                          height={"100%"}
                          loading="lazy"
                          component={"img"}
                          src={getOptimizeImageUrl(
                            urlFor(
                              isMobile
                                ? item?.thumbnail?.[0]?.imageAsset?.image?.[0]?.asset?._ref
                                : item?.thumbnail?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref,
                            ).url(),
                            4,
                          )}
                        />
                      </CityImageBox>
                      <Typography
                        variant={isMobile ? "m-body-s" : "body-s"}
                        sx={{
                          marginBottom: DesktopPxToVw(12),
                          color:
                            index === props?.activeSlide
                              ? theme?.palette?.ihclPalette?.hexOne
                              : theme?.palette?.ihclPalette?.hexSeventeen,
                        }}>
                        {item?.name?.toUpperCase()}
                      </Typography>
                    </CardBox>
                  )}
                </Box>
              ))}
            </Slider>
          </CommonCarouselStyles>
        </MobileCarousalStylesWrapper>
      )}
      {isMobile && (
        <>
          <Grid
            container
            rowGap={isMobile ? "4.844vw" : "2.083vw"}
            justifyContent={"center"}
            columnGap={isMobile ? "9.688vw" : "2.083vw"}
            sx={{ marginTop: "3.125vw" }}>
            {props?.items?.slice(0, countToShowCards)?.map((item: any, index: number) => (
              <Grid key={index} item md={5} sm={5} xs={4}>
                <CardsBox
                  sx={{
                    cursor: "pointer",
                    position: isMobile ? "unset" : "relative",
                  }}
                  onClick={() => props?.setActiveSlide(index)}>
                  <>
                    {item?.thumbnail?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref && (
                      <Box
                        width={"100%"}
                        height={"auto"}
                        loading="lazy"
                        component="img"
                        alt="award-image"
                        sx={{ objectFit: "contain" }}
                        src={getOptimizeImageUrl(
                          urlFor(item?.thumbnail?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref)?.url(),
                          3,
                        )}
                      />
                    )}
                  </>
                </CardsBox>
                <Typography
                  textAlign="center"
                  sx={{
                    paddingBottom: MobilePxToVw(12),
                    paddingTop: MobilePxToVw(12),
                    color:
                      index === props?.activeSlide
                        ? theme?.palette?.ihclPalette?.hexOne
                        : theme?.palette?.ihclPalette?.hexSeventeen,
                    backgroundColor: index === props?.activeSlide ? theme?.palette?.ihclPalette?.hexTwo : "",
                  }}>
                  {item?.name?.toUpperCase()}
                </Typography>
              </Grid>
            ))}
          </Grid>

          {props?.items?.length > countToShowCards && (
            <ActionGrid item lg={12} xl={12} sx={{ padding: "4.12vw 0 6.12vw 0" }}>
              <StyledExpandMoreButton
                variant="light-outlined"
                endIcon={
                  <StyledExpandMoreIcon
                    sx={{
                      height: "3.875vw",
                    }}
                  />
                }
                onClick={() => {
                  setCountToShowCards(countToShowCards + 1)
                }}>
                {CONSTANTS?.LOAD_MORE}
              </StyledExpandMoreButton>
            </ActionGrid>
          )}
        </>
      )}
    </SixCardCommonCarouselContentBox>
  )
}

export default DestinationOffersCityCardCarousel
