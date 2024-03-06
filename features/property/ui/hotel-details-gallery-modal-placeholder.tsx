import React, { Fragment, useEffect, useState } from "react"
import { useMobileCheck } from "../../../utils/isMobilView"
import dynamic from "next/dynamic"
import { useImageUtility } from "../../../utils/hooks/useImageUtility"
import Slider from "react-slick"
import { Box, Grid, Typography } from "@mui/material"
import { CommonCarouselStyles } from "../../../components/hoc/carousal-component-styles"
import {
  TitleTypo,
  TitleTypoDataBox,
  ChildCarouselImageBox,
  CarouselPaginationTypo,
  SelectedImageBox,
  ChildCarouselBox,
  ContentBox,
  TitleTypography,
} from "../../../components/GalleryCarousel/styles"
import prevImage from "../../../public/taj-gold-left-arrow.svg"
import nextImage from "../../../public/taj-gold-right-arrow.svg"
const CustomNextArrow = dynamic(() =>
  import("../../../components/hoc/custom-arrows").then((module) => module.CustomNextArrow),
)
const CustomPrevArrow = dynamic(() =>
  import("../../../components/hoc/custom-arrows").then((module) => module.CustomPrevArrow),
)
import { theme } from "../../../lib/theme"
import { urlFor } from "../../../lib-sanity"
import ModalStore from "../../../store/global/modal.store"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { fetchHotelGalleryData } from "../../../utils/fetchRoomData"
import { useRouter } from "next/router"
import { hotelRoute } from "./constants"

const HotelDetailsGalleryImageCarousel = (props: any) => {
  const isMobile = useMobileCheck()
  const { getOptimizeImageUrl } = useImageUtility()
  const modalStore = ModalStore.getInstance()
  const initialSlide = modalStore?.currentIndex
  const [selectedIndex, setSelectedIndex] = useState<number>(initialSlide)
  const [activeHoverCard, setActiveHoverCard] = useState<boolean>(false)
  const [mainSliderReference, setMainSliderReference] = useState<Slider>()
  const [bottomSliderReference, setBottomSliderReference] = useState<Slider>()
  const [ImagesData, setImagesData] = useState<any>(modalStore?.propertyData)
  const router = useRouter()
  const bottomCarouselLengthCheck = isMobile ? ImagesData?.length < 5 : ImagesData?.length < 6
  useEffect(() => {
    async function fetchHotelData() {
      const routerArr = router?.asPath?.split("/")
      const hotelRouteIndex = routerArr?.findIndex((route: any) => route === hotelRoute)
      let response = await fetchHotelGalleryData(
        hotelRouteIndex > -1 ? routerArr?.[hotelRouteIndex + 1] : undefined,
        "hotelGallery",
      )
      if (response) {
        if (response?.hotelGallery?.mediaDetails?.length > 0) {
          let collatedData = response?.hotelGallery?.mediaDetails?.map((item: any, index: number) => item?.media).flat()
          setImagesData(collatedData)
        }
      }
    }
    if (modalStore?.propertyData?.length === undefined) {
      fetchHotelData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const settings = {
    infinite: true,
    swipeToSlide: true,
    arrows: isMobile ? false : true,
    speed: 500,
    initialSlide: initialSlide,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          arrows: false,
          infinite: true,
          swipeToSlide: true,
          speed: 500,
          initialSlide: initialSlide,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: (
      <CustomNextArrow
        //* if infinite: false uncomment this
        // isNext={selectedIndex < ImagesData?.length - 1}
        cssData={{
          right: DesktopPxToVw(80),
          width: "3.125vw",
          height: "3.125vw",
          background: `url(${nextImage?.src}) no-repeat`,
        }}
      />
    ),
    prevArrow: (
      <CustomPrevArrow
        //* if infinite: false uncomment this
        // isPrev={selectedIndex > 0}
        cssData={{
          left: DesktopPxToVw(80),
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
    infinite: true,
    swipeToSlide: true,
    speed: 500,
    initialSlide: initialSlide,
    slidesToScroll: 1,
    slidesToShow: ImagesData?.length < 6 ? ImagesData?.length : 6,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          arrows: false,
          infinite: true,
          swipeToSlide: true,
          speed: 500,
          initialSlide: initialSlide,
          slidesToShow: ImagesData?.length < 5 ? ImagesData?.length : 5,
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
      {ImagesData?.length && (
        <Grid>
          <CommonCarouselStyles
            sx={{
              "& .slick-track": {
                width: isMobile ? "max-content !important" : "",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            }}>
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
                {ImagesData?.length > 0 &&
                  ImagesData?.map((item: any, index: number) => {
                    return (
                      <Fragment key={index}>
                        {item?.asset?._ref && (
                          <SelectedImageBox
                            key={index}
                            sx={{
                              padding: isMobile ? "0vw 3.125vw" : "0vw",
                            }}>
                            <Box
                              sx={{ position: "relative", margin: "0 auto", width: "fit-content" }}
                              onMouseLeave={() => setActiveHoverCard(false)}
                              onMouseEnter={() => setActiveHoverCard(true)}>
                              <Box
                                loading="lazy"
                                component="img"
                                alt={item?.altText || `gallery-image`}
                                width={"100%"}
                                height={isMobile ? "100%" : "59.2vh"}
                                sx={{
                                  objectFit: "contain",
                                  margin: "0 auto",
                                  position: "relative",
                                }}
                                src={getOptimizeImageUrl(urlFor(item?.asset?._ref).url(), 1)}
                              />
                              {/* Temporarily commenting the below hover code , as it is required in later phase  . */}
                              {/* {item?.altText && activeHoverCard && (
                                <ContentBox>
                                  {(item?.title || item?.altText) && (
                                    <TitleTypography variant={isMobile ? "m-heading-xs" : "heading-xs"}>
                                      {item?.title || item?.altText}
                                    </TitleTypography>
                                  )}
                                </ContentBox>
                              )} */}
                            </Box>
                          </SelectedImageBox>
                        )}
                        {isMobile ? (
                          <Box mt={"5vw"} sx={{ textAlign: "center" }} p={"0vw 3.125vw"}>
                            <Typography
                              variant={"m-heading-xs"}
                              sx={{
                                color: theme?.palette?.ihclPalette?.hexEleven,
                              }}>
                              {item?.title}
                            </Typography>
                          </Box>
                        ) : (
                          <TitleTypoDataBox>
                            <TitleTypo
                              variant={isMobile ? "m-heading-xs" : "heading-xs"}
                              sx={{
                                color: theme?.palette?.ihclPalette?.hexOne,
                              }}>
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
          <ChildCarouselBox>
            <Box
              width={"100%"}
              sx={{
                position: isMobile ? "absolute" : "relative",
                bottom: isMobile ? MobilePxToVw(30) : "unset",
                maxWidth: isMobile ? "100%" : DesktopPxToVw(780),
              }}>
              <CommonCarouselStyles
                sx={{
                  "& .slick-slide": {
                    width: "auto !important",
                  },
                  "& .slick-track": {
                    width: isMobile ? "max-content !important" : "",
                    display: bottomCarouselLengthCheck ? "flex !important" : "block !important",
                    justifyContent: bottomCarouselLengthCheck ? "center !important" : "flex-start !important",
                  },
                }}>
                <Slider
                  {...secondSettings}
                  asNavFor={mainSliderReference}
                  ref={(slider2: any) => setBottomSliderReference(slider2)}>
                  {ImagesData?.length > 0 &&
                    ImagesData?.map((item: any, index: number) => {
                      return (
                        <Fragment key={index}>
                          {item?.asset?._ref && (
                            <Box
                              key={index}
                              onClick={() => {
                                clickHandler(index), setSelectedIndex(index)
                              }}>
                              <ChildCarouselImageBox>
                                <Box
                                  loading="lazy"
                                  component="img"
                                  alt={item?.altText || `gallery-image`}
                                  width={isMobile ? MobilePxToVw(117) : DesktopPxToVw(121)}
                                  height={isMobile ? MobilePxToVw(90) : DesktopPxToVw(88)}
                                  sx={{
                                    cursor: "pointer",
                                    border:
                                      selectedIndex === index
                                        ? isMobile
                                          ? `0.156vw solid ${theme?.palette?.ihclPalette?.hexTwo}`
                                          : `0.08vw solid ${theme?.palette?.ihclPalette?.hexTwo}`
                                        : "",
                                    padding: DesktopPxToVw(3),
                                  }}
                                  src={getOptimizeImageUrl(
                                    urlFor(item?.asset?._ref).url(),
                                    secondSettings.slidesToShow,
                                  )}
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
                {selectedIndex + 1} / {ImagesData?.length}
              </CarouselPaginationTypo>
            </Box>
          </ChildCarouselBox>
        </Grid>
      )}
    </Box>
  )
}

export default HotelDetailsGalleryImageCarousel
