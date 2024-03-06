import { theme } from "../../lib/theme"
import { CONSTANTS } from "../constants"
import dynamic from "next/dynamic"
import { urlFor } from "../../lib-sanity"
import { Box, Typography } from "@mui/material"
import React, { useState } from "react"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../utils/isMobilView"
import { useAesthetics } from "../../utils/fetchAsthetics"
import {
  ContentWrapperBox,
  ContentTitleTypography,
  MainMediaWrapperContentBox,
} from "../card/styles/media-with-content-component.styles"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
import VideoSEOScript from "../../utils/VideoSEOScript"
const CustomReadMore = dynamic(() => import("../hoc/CustomReadMore"))
const VideoPlayerModal = dynamic(() => import( "../modal/video-player-modal.component"))

const WeddingTabsCarousalItems = ({ props, selectedIndex }: any) => {
  const isMobile = useMobileCheck()
  const [open, setOpen] = useState<boolean>(false)
  const [video, setVideo] = useState<string>("")
  const handleModelClose = () => setOpen(false)
  const gridSize = CONSTANTS?.TWO
  const videoUrl = props?.videoAsset?.videoPlay?.asset?._ref
  const videoThumbnail = props?.videoAsset?.videoThumbnail?.asset?._ref
  const { getOptimizeImageUrl } = useImageUtility()
  const { cardPadding, textColor, cardBackgroundColor } = useAesthetics(
    props?.aesthetic?._ref
  )
  const [more, setMore] = useState<number>(
    props?.charactersLimit ?? CONSTANTS?.ITEM_DESCRIPTION_CHARACTER_LIMIT
  )
  //   const rightMedia =
  //     props?.largeVariant ===
  //     "details.card.card-with-right-media-left-content-aspect-ratio-2:4"
  const leftMedia =
    props?.largeVariant ===
    "details.card.card-with-left-media-right-content-aspect-ratio-2:4"
  const rightHalfMedia =
    props?.largeVariant ===
    "details.card.card-with-left-media-right-content-aspect-ratio-2:2"

  return (
    <>
      {props?.items?.[0]?.tabs?.[selectedIndex]?.tabItems?.map(
        (item: any, index: number) => (
          <Box
            key={index}
            sx={{
              padding: isMobile ? cardPadding?.mobile : cardPadding?.desktop,
              backgroundColor: cardBackgroundColor,
            }}>
            <MainMediaWrapperContentBox
              sx={{
                flexDirection: isMobile
                  ? "column-reverse"
                  : leftMedia
                  ? "row"
                  : "row-reverse",
              }}
              $isMobile={isMobile}>
              <ContentWrapperBox
                $isMobile={isMobile}
                sx={{
                  padding: isMobile
                    ? `0vw ${MobilePxToVw(20)} 0vw ${MobilePxToVw(70)}`
                    : "auto",
                }}>
                {item?.title && (
                  <Box>
                    {isMobile ? (
                      <Typography
                        variant={
                          item?.alignmentVariant ===
                            "regular-title-variable-font-size" && isMobile
                            ? "m-heading-s"
                            : isMobile
                            ? "m-heading-m"
                            : item?.isHeroTitleFont
                            ? "heading-l"
                            : "heading-m"
                        }
                        sx={{
                          color: textColor
                            ? textColor
                            : theme?.palette?.neuPalette?.hexSeventeen,
                        }}>
                        {item?.title}
                      </Typography>
                    ) : (
                      <ContentTitleTypography
                        variant={
                          item?.alignmentVariant ===
                            "regular-title-variable-font-size" && isMobile
                            ? "m-heading-s"
                            : isMobile
                            ? "m-heading-m"
                            : item?.isHeroTitleFont
                            ? "heading-l"
                            : "heading-m"
                        }
                        $isMobile={isMobile}
                        $textColor={textColor}
                        sx={{
                          color: textColor
                            ? textColor
                            : theme?.palette?.neuPalette?.hexSeventeen,
                        }}>
                        {item?.title}
                      </ContentTitleTypography>
                    )}
                  </Box>
                )}
                {item?.description && (
                  <Box>
                    <Typography
                      variant={isMobile ? "m-body-sl" : "body-ml"}
                      sx={{
                        color: textColor
                          ? textColor
                          : theme?.palette?.neuPalette?.hexSeventeen,
                      }}>
                      <CustomReadMore
                        length={more}
                        variant={isMobile ? "m-body-sl" : "body-ml"}
                        textStyles={{
                          color: textColor
                            ? textColor
                            : theme?.palette?.neuPalette?.hexSeventeen,
                        }}>
                        {item?.description}
                      </CustomReadMore>
                    </Typography>
                  </Box>
                )}
              </ContentWrapperBox>
              <Box sx={{ width: "100%" }}>
                {item?.mediaType === "video" ? (
                  <Box
                    alt="img"
                    loading="lazy"
                    component="img"
                    sx={{
                      cursor: "pointer",
                      width: isMobile ? "100%" : DesktopPxToVw(863),
                      height: isMobile ? "100%" : DesktopPxToVw(480),
                    }}
                    src={videoThumbnail && urlFor(videoThumbnail).url()}
                    onClick={() => {
                      videoUrl && setVideo(videoUrl), setOpen(true)
                    }}
                  />
                ) : isMobile ? (
                  item?.image?.asset?._ref && (
                    <Box
                    loading="lazy"
                      component="img"
                      sx={{ width: "100%", height: "100%" }}
                      src={getOptimizeImageUrl(
                        urlFor(item?.image?.asset?._ref).url(),
                        gridSize
                      )}
                    />
                  )
                ) : (
                  item?.largeImage?.asset?._ref && (
                    <Box
                    loading="lazy"
                      component="img"
                      sx={{
                        width: DesktopPxToVw(rightHalfMedia ? 650 : 863),
                      }}
                      src={getOptimizeImageUrl(
                        urlFor(item?.largeImage?.asset?._ref).url(),
                        gridSize
                      )}
                    />
                  )
                )}
              </Box>
              <VideoSEOScript {...props?.videoAsset}/>
              {open && (
                <VideoPlayerModal
                  videoUrl={video}
                  handleModalOpen={open}
                  handleModalClose={handleModelClose}
                />
              )}
            </MainMediaWrapperContentBox>
          </Box>
        )
      )}
    </>
  )
}

export default WeddingTabsCarousalItems
