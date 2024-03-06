import { CONSTANTS } from "../constants"
import React, { useState } from "react"
import dynamic from "next/dynamic"
import { urlFor } from "../../lib-sanity"
import { Box, Typography } from "@mui/material"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../utils/isMobilView"
import { ImageProps, parameterMapItems } from "../types"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { ActionProps, VideoProps, aestheticItems } from "../types"
import {
  ContentWrapperBox,
  ActionButtonsContainer,
  MainMediaWrapperContentBox,
  ActionWrapperButtonContainer,
} from "./styles/media-with-content-component.styles"
import VideoSEOScript from "../../utils/VideoSEOScript"
const VideoPlayerModal = dynamic(() => import("../modal/video-player-modal.component"))
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
const CustomReadMore = dynamic(() => import("../hoc/CustomReadMore"))

interface MediaCardWithMagazineImageProps {
  url: string
  _key: string
  content: any
  _type: string
  title: string
  metadata: any
  variant: string
  urlType: string
  ctaLabel: string
  mediaType: string
  image: ImageProps
  singleContent: any
  parentProps: number
  description: string
  largeVariant: string
  largeImage: ImageProps
  viewEventCallback: any
  videoAsset?: VideoProps
  charactersLimit: number
  isHeroTitleFont: boolean
  aesthetic: aestheticItems
  primaryAction: ActionProps
  secondaryAction: ActionProps
  parameterMap?: parameterMapItems[]
}
const MediaCardWithMagazineImage = ({
  url,
  image,
  title,
  urlType,
  ctaLabel,
  aesthetic,
  largeImage,
  description,
  parameterMap,
  primaryAction,
  charactersLimit,
  secondaryAction,
  videoAsset,
}: MediaCardWithMagazineImageProps) => {
  const isMobile = useMobileCheck()
  const { cardPadding } = useAesthetics(aesthetic?._ref)
  const [open, setOpen] = useState<boolean>(false)
  const [video, setVideo] = useState<string>("")
  const handleModelClose = () => setOpen(false)

  const [more, setMore] = useState<number>(charactersLimit ?? CONSTANTS?.ITEM_DESCRIPTION_CHARACTER_LIMIT)
  return (
    <Box
      sx={{
        padding: isMobile ? cardPadding?.mobile : cardPadding?.desktop,
      }}>
      <MainMediaWrapperContentBox
        sx={{
          flexDirection: isMobile ? "column-reverse" : "row-reverse",
        }}
        $isMobile={isMobile}>
        <ContentWrapperBox $isMobile={isMobile}>
          {title && (
            <Box>
              <Typography variant={isMobile ? "m-heading-m" : "heading-s"}>{title}</Typography>
            </Box>
          )}
          {description && (
            <Box>
              <Typography variant={isMobile ? "m-body-l" : "body-s"}>
                {description.length > more ? (
                  <>
                    <CustomReadMore length={more} variant={isMobile ? "m-body-l" : "body-s"}>
                      {description}
                    </CustomReadMore>
                  </>
                ) : (
                  description
                )}
              </Typography>
            </Box>
          )}
          {parameterMap && (
            <Box>
              {parameterMap?.map((item: parameterMapItems, index: number) => (
                <Box key={index}>
                  <Typography variant={isMobile ? "m-body-l" : "body-s"}>
                    {item?.value ? (
                      <>
                        {item?.key}:<b> {item?.value}</b>
                      </>
                    ) : (
                      <>
                        <b>{item?.key}</b>
                      </>
                    )}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
          {(primaryAction?.title || secondaryAction?.title || ctaLabel) && (
            <ActionWrapperButtonContainer
              $isMobile={isMobile}
              sx={{
                alignSelf: isMobile
                  ? !!primaryAction?.title && !!secondaryAction?.title === false && !!ctaLabel === false
                    ? "flex-end"
                    : "center"
                  : "auto",
              }}>
              {(primaryAction?.title || secondaryAction?.title) && (
                <ActionButtonsContainer $isMobile={isMobile}>
                  {primaryAction?.title && (
                    <RenderActionItem
                      url={primaryAction?.url}
                      isActionButtonType={true}
                      title={primaryAction?.title}
                      variant={primaryAction?.variant}
                      navigationType={primaryAction?.urlType}
                      buttonStyles={{
                        lineHeight: "140%",
                        letterSpacing: DesktopPxToVw(1.8),
                      }}
                    />
                  )}
                  {secondaryAction?.title && (
                    <RenderActionItem
                      url={secondaryAction?.url}
                      isActionButtonType={true}
                      title={secondaryAction?.title}
                      variant={secondaryAction?.variant}
                      navigationType={secondaryAction?.urlType}
                      buttonStyles={{
                        lineHeight: "140%",
                        letterSpacing: DesktopPxToVw(1.8),
                      }}
                    />
                  )}
                </ActionButtonsContainer>
              )}
              {ctaLabel && (
                <RenderActionItem
                  url={url}
                  title={ctaLabel}
                  navigationType={urlType}
                  isActionButtonType={false}
                  variant={isMobile ? "m-text-link" : "link-m"}
                />
              )}
            </ActionWrapperButtonContainer>
          )}
        </ContentWrapperBox>
        <Box sx={{ width: "100%" }}>
          {isMobile
            ? image?.asset?._ref && (
                <Box
                  alt={image?.altText || `-img`}
                  component="img"
                  sx={{ width: "100%", height: "100%" }}
                  src={urlFor(image?.asset?._ref).url()}
                />
              )
            : largeImage?.asset?._ref && (
                <Box
                  alt={largeImage?.altText || `-img`}
                  component="img"
                  sx={{
                    width: DesktopPxToVw(863),
                    height: DesktopPxToVw(585),
                  }}
                  src={urlFor(largeImage?.asset?._ref).url()}
                />
              )}
        </Box>
        <VideoSEOScript {...videoAsset} />
        {open && <VideoPlayerModal videoUrl={video} handleModalOpen={open} handleModalClose={handleModelClose} />}
      </MainMediaWrapperContentBox>
    </Box>
  )
}

export default MediaCardWithMagazineImage
