import { Box, Grid, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import {
  ActionItemFlexContainer,
  BulkGridContainer,
  ContentContainerGrid,
  MobileCarousalStylesWrapper,
  TitleTypographyWrapper,
} from "../modal/styles/manage-card.styles"
import { urlFor } from "../../lib-sanity"
import { ImageContentBox } from "./styles/card-with-img-content"
import { useMobileCheck } from "../../utils/isMobilView"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { ICONS } from "../constants"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
const CommonCarousel = dynamic(() => import("../hoc/common-carousal.component"))
const CustomNextArrow = dynamic(() =>
import("../hoc/custom-arrows").then((module) => module.CustomNextArrow)
)
const CustomPrevArrow = dynamic(() =>
import("../hoc/custom-arrows").then((module) => module.CustomPrevArrow)
)

const ImageContent = (props: any) => {
  return (
    <>
      {props?.asset?._ref && (
        <ImageContentBox>
          <Box
            component={props?.altText || "img"}
            sx={{
              objectFit: "fill",
              width: "100%",
              height: "100%",
            }}
            src={urlFor(props?.asset?._ref && props?.asset?._ref).url()}
          />
        </ImageContentBox>
      )}
    </>
  )
}

const CardWithGazeboExperienceModal = (props: any) => {
  const [carousalItemCount, setCarousalItemCount] = useState<number>(
    props?.imageAsset?.image ? props?.imageAsset?.image?.length : 1
  )
  useEffect(() => {
    if (
      props?.imageAsset?.image?.length !== carousalItemCount &&
      props?.imageAsset?.image?.length > 0
    ) {
      setCarousalItemCount(props?.imageAsset?.image?.length)
    }
  }, [carousalItemCount, props])
  const isMobile = useMobileCheck()
  const initialCarouselSettings = {
    dots: isMobile,
    arrows: !isMobile,
    infinite: true,
    autoplay: false,
    swipeToSlide: true,
    initialSlide: 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: (
      <CustomPrevArrow
        cssData={{
          top: "12.55vw",
          left: "2.1vw",
          width: "3.125vw",
          height: "3.125vw",
          background: `url(${ICONS?.TRANSPARENT_ARROW_LEFT}) no-repeat`,
          borderRadius: "50%",
          boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
        }}
      />
    ),
    nextArrow: (
      <CustomNextArrow
        cssData={{
          top: "12.55vw",
          right: "2.1vw",
          width: "3.125vw",
          height: "3.125vw",
          background: `url(${ICONS?.TRANSPARENT_ARROW_RIGHT}) no-repeat`,
          borderRadius: "50%",
          boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
        }}
      />
    ),
  }

  return (
    <>
      <BulkGridContainer
        sx={{
          padding: "0vw",
          width: isMobile ? "100%" : "initial",
        }}>
        <Grid container>
          {isMobile && (
            <Grid xs={12} sm={12}>
              <TitleTypographyWrapper>
                <Typography variant="m-heading-s"> {props.title}</Typography>
              </TitleTypographyWrapper>
            </Grid>
          )}
          <Grid xs={12} sm={isMobile ? 12 : 6} md={6} lg={6} xl={6}>
            <MobileCarousalStylesWrapper
              $inactiveDotWidth={`${MobilePxToVw(
                320 / carousalItemCount - 1
              )}`}>
              <CommonCarousel
                settings={initialCarouselSettings}
                items={
                  isMobile
                    ? props?.imageAsset?.image
                    : props?.imageAsset?.largeImage
                }
                Component={ImageContent}
              />
            </MobileCarousalStylesWrapper>
          </Grid>
          <ContentContainerGrid
            xs={12}
            sm={isMobile ? 12 : 6}
            md={6}
            lg={6}
            xl={6}>
            {!isMobile && (
              <Box sx={{ marginBottom: "1.024vw" }}>
                <Typography variant="heading-m"> {props.title}</Typography>
              </Box>
            )}
            <Box sx={{ marginBottom: isMobile ? "5vw" : "1.302vw" }}>
              <Typography
                variant={isMobile ? "m-body-l" : "body-ml"}
                fontSize={isMobile ? MobilePxToVw(22) : DesktopPxToVw(22)}>
                {props.description}
              </Typography>
            </Box>
            <ActionItemFlexContainer>
              <RenderActionItem
                url={props.primaryAction?.url}
                title={props.primaryAction?.title}
                variant={props.primaryAction?.variant}
                navigationType={props.primaryAction?.urlType}
                isActionButtonType={true}
              />
            </ActionItemFlexContainer>
          </ContentContainerGrid>
        </Grid>
      </BulkGridContainer>
    </>
  )
}

export default CardWithGazeboExperienceModal
