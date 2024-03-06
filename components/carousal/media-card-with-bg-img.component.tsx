import Slider from "react-slick"
import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import "slick-carousel/slick/slick.css"
import { urlFor } from "../../lib-sanity"
import "slick-carousel/slick/slick-theme.css"
import { useMobileCheck } from "../../utils/isMobilView"
import { Box, Card, CardMedia, Typography } from "@mui/material"
import { CommonCarouselStyles } from "../hoc/carousal-component-styles"
import {
  ContentBox,
  ActionItemBox,
  TopGradientBox,
  BottomGradientBox,
} from "./styles/media-card-with-bg-image-carousal"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
import { theme } from "../../lib/theme"
import { ICONS } from "../constants"
const CustomNextArrow = dynamic(() => import("../hoc/custom-arrows").then((module) => module.CustomNextArrow))
const CustomPrevArrow = dynamic(() => import("../hoc/custom-arrows").then((module) => module.CustomPrevArrow))
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
const CustomReadMore = dynamic(() => import("../hoc/CustomReadMore"))

const MediaCardWithBgImageCarousal = ({ props }: any) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [loadedBgImgs, setLoadedBgImgs] = useState<string[]>([])

  const { getOptimizeImageUrl } = useImageUtility()
  const isMobile = useMobileCheck()
  const settings = {
    arrows: true,
    infinite: true,
    autoplay: false,
    centerMode: false,
    speed: 600,
    initialSlide: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: (
      <CustomPrevArrow
        cssData={{
          left: "-8.8vw",
          width: "3.125vw",
          height: "3.125vw",
          borderRadius: "50%",
          background: `url(${ICONS?.TRANSPARENT_ARROW_LEFT}) no-repeat`,
        }}
      />
    ),
    nextArrow: (
      <CustomNextArrow
        cssData={{
          right: "-8.8vw",
          width: "3.125vw",
          height: "3.125vw",
          borderRadius: "50%",
          background: `url(${ICONS?.TRANSPARENT_ARROW_RIGHT}) no-repeat`,
        }}
      />
    ),
    afterChange: (sliderIndex: number) => setActiveIndex(sliderIndex),
    responsive: [
      {
        breakpoint: 600,
        settings: {
          arrows: false,
        },
      },
    ],
  }

  useEffect(() => {
    const preloadedImages: HTMLImageElement[] = props?.map((image: any) => {
      const imgUrl =
        image?.largeImage?.asset?._ref && getOptimizeImageUrl(urlFor(image?.largeImage?.asset?._ref)?.url(), 1)
      const img = new Image()
      img.src = imgUrl || ""
      return img
    })

    Promise.all(preloadedImages?.map((image) => new Promise((resolve) => (image.onload = resolve)))).then(() =>
      setLoadedBgImgs(preloadedImages?.map((image) => image.src)),
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  return (
    <Box
      width={"100%"}
      sx={{
        position: "relative",
        background:
          props[activeIndex]?.backgroundImage?.asset?._ref &&
          `url(
            ${loadedBgImgs[activeIndex] || ""}
              ) , linear-gradient(180deg, rgba(81, 81, 81, 0) 0%, rgba(0, 0, 0, 0.9) 0%) `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <TopGradientBox $gradientColor={"linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(95, 95, 95, 0.1) 100%)"} />
      <BottomGradientBox $gradientColor="linear-gradient(180deg, rgba(95, 95, 95, 0) 0%, rgba(0, 0, 0, 0.9) 100%)" />
      <Box sx={{ padding: "7.65vw 12.5vw 6.45vw 12.5vw" }}>
        <CommonCarouselStyles
          sx={{
            ".slick-slide": {
              background: "none",
              padding: "0 1px",
            },
          }}>
          <Slider {...settings}>
            {props?.map((item: any, index: number) => (
              <Box
                key={index}
                onChange={() => {
                  setActiveIndex(index)
                }}>
                <Card
                  elevation={0}
                  sx={{
                    display: "flex",
                    backgroundColor: "unset !important",
                    flexDirection: "row",
                    "&.MuiCard-root": { borderRadius: "0" },
                    "@media(max-width: 600px)": {
                      display: "flex",
                      flexDirection: "column",
                      width: "max-content",
                    },
                  }}>
                  {item?.largeImage?.asset && (
                    <CardMedia
                      alt="media"
                      loading="lazy"
                      component="img"
                      sx={{
                        height: "100%",
                        objectFit: "cover",
                        width: isMobile ? "100%" : "50%",
                      }}
                      src={getOptimizeImageUrl(urlFor(item?.largeImage?.asset?._ref).url(), 2)}
                    />
                  )}
                  <ContentBox sx={{ background: theme?.palette?.ihclPalette?.hexOne }}>
                    {item?.title && <Typography variant="heading-s">{item?.title}</Typography>}
                    {item?.description && (
                      <CustomReadMore variant="body-ml" length={item?.charactersLimit || 150}>
                        {item?.description}
                      </CustomReadMore>
                    )}
                    {item?.primaryAction?.url && (
                      <ActionItemBox>
                        <RenderActionItem
                          isActionButtonType={false}
                          url={item?.primaryAction?.url}
                          title={item?.primaryAction?.title}
                          navigationType={item?.primaryAction?.url}
                          variant={item?.primaryAction?.variant ?? "link-m"}
                        />
                      </ActionItemBox>
                    )}
                  </ContentBox>
                </Card>
              </Box>
            ))}
          </Slider>
        </CommonCarouselStyles>
      </Box>
    </Box>
  )
}

export default MediaCardWithBgImageCarousal
