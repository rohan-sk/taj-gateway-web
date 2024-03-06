import { CONSTANTS } from "../constants"
import { urlFor } from "../../lib-sanity"
import dynamic from "next/dynamic"
import { Box, Typography } from "@mui/material"
import React, { useContext, useState } from "react"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../utils/isMobilView"
import { ImageProps, parameterMapItems } from "../types"
import { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { ActionProps, VideoProps, aestheticItems } from "../types"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  ContentWrapperBox,
  ActionButtonsContainer,
  ContentTitleTypography,
  MediaWrapperContentBox,
  ParameterMapWrapperContainer,
  ActionWrapperButtonContainer,
} from "./styles/media-with-content-component.styles"
import { VideoSEOScript } from "../../utils/VideoSEOScript"
const VideoPlayerModal = dynamic(() => import("../modal/video-player-modal.component"))
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
const CustomReadMore = dynamic(() => import("../hoc/CustomReadMore"))

type childrenItem = {
  text: string
  _type: string
}
type singleContentItem = {
  style: string
  _type: string
  children: childrenItem[]
}
interface MediaCardWithSmallImageProps {
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
const MediaCardWithSmallImage = ({
  url,
  image,
  title,
  urlType,
  content,
  ctaLabel,
  aesthetic,
  largeImage,
  description,
  largeVariant,
  parameterMap,
  primaryAction,
  singleContent,
  charactersLimit,
  secondaryAction,
  videoAsset,
}: MediaCardWithSmallImageProps) => {
  const isMobile = useMobileCheck()
  const { cardPadding, cardBackgroundColor } = useAesthetics(aesthetic?._ref)
  const [open, setOpen] = useState<boolean>(false)
  const [video, setVideo] = useState<string>("")
  const handleModelClose = () => setOpen(false)
  const Context = useContext(IHCLContext)
  const PortableText = Context!.PortableText

  const [more, setMore] = useState<number>(charactersLimit ?? CONSTANTS?.ITEM_DESCRIPTION_CHARACTER_LIMIT)
  const rightMediaSmallImage = largeVariant === "businessServices.card.right-media-left-content-in-between-variable-gap"
  const leftMediaSmallImage = largeVariant === "businessServices.card.left-media-right-content-in-between-variable-gap"

  return (
    <Box
      sx={{
        padding: isMobile
          ? cardPadding?.mobile || aesthetic?.padding?.mobile
          : cardPadding?.desktop || aesthetic?.padding?.desktop,
        backgroundColor: cardBackgroundColor || aesthetic?.backgroundColor?.hex,
      }}>
      <MediaWrapperContentBox
        sx={{
          flexDirection: isMobile
            ? "column-reverse"
            : rightMediaSmallImage
            ? "row !important"
            : leftMediaSmallImage
            ? "row-reverse !important"
            : "row",
        }}
        $isMobile={isMobile}>
        <ContentWrapperBox $isMobile={isMobile} $justifyContent={leftMediaSmallImage && singleContent}>
          <Box>
            {title && (
              <ContentTitleTypography variant={isMobile ? "m-heading-m" : "heading-m"} $isMobile={isMobile}>
                {title}
              </ContentTitleTypography>
            )}
            {content &&
              content?.map((item: any, idx: number) => (
                <PortableText
                  blocks={item?.content?.map((item: any) => ({ ...item, variant: isMobile ? "m-body-sl" : "body-ml" }))}
                  variant={isMobile ? "m-body-sl" : "body-ml"}
                  key={idx}
                />
              ))}
          </Box>
          {parameterMap && parameterMap?.[0]?.key !== CONSTANTS?.SPECIAL_TITLE && (
            <ParameterMapWrapperContainer $isMobile={isMobile}>
              {parameterMap?.map((item: parameterMapItems, index: number) => (
                <Box key={index}>
                  {item?.key === CONSTANTS?.PRICE ? (
                    <>
                      {item?.value && (
                        <Typography variant={isMobile ? "m-heading-m" : "heading-m"}>₹ {item?.value}</Typography>
                      )}
                    </>
                  ) : (
                    <>
                      {item?.value && (
                        <Typography
                          variant={isMobile ? "m-body-l" : "body-ml"}
                          sx={{
                            fontSize: isMobile ? MobilePxToVw(22) : DesktopPxToVw(22),
                          }}>
                          {item?.key}: <b>{item?.value}</b>
                        </Typography>
                      )}
                    </>
                  )}
                </Box>
              ))}
            </ParameterMapWrapperContainer>
          )}
          {description && (
            <Box>
              <Typography
                variant={isMobile ? "m-body-l" : "body-ml"}
                sx={{
                  fontSize: isMobile ? MobilePxToVw(22) : DesktopPxToVw(22),
                }}>
                {description.length > more ? (
                  <>
                    <CustomReadMore
                      length={more}
                      variant={isMobile ? "m-body-l" : "body-ml"}
                      textStyles={{
                        fontSize: isMobile ? MobilePxToVw(22) : DesktopPxToVw(22),
                      }}>
                      {description}
                    </CustomReadMore>
                  </>
                ) : (
                  description
                )}
              </Typography>
            </Box>
          )}
          {(primaryAction?.title || secondaryAction?.title || ctaLabel) && (
            <ActionWrapperButtonContainer $isMobile={isMobile}>
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
                    width: DesktopPxToVw(700),
                    height: leftMediaSmallImage && singleContent ? DesktopPxToVw(700) : DesktopPxToVw(480),
                  }}
                  src={urlFor(largeImage?.asset?._ref).url()}
                />
              )}
        </Box>
        <VideoSEOScript {...videoAsset} />
        {open && <VideoPlayerModal videoUrl={video} handleModalOpen={open} handleModalClose={handleModelClose} />}
      </MediaWrapperContentBox>
      {singleContent && (
        <Box sx={{ paddingTop: singleContent ? DesktopPxToVw(80) : "0vw" }}>
          {singleContent &&
            singleContent?.map((item: singleContentItem, idx: number) => (
              <Box sx={{ paddingBottom: isMobile ? "1.563vw" : "0.521vw" }} key={idx}>
                <PortableText blocks={item} />
              </Box>
            ))}
        </Box>
      )}
    </Box>
  )
}

export default MediaCardWithSmallImage
