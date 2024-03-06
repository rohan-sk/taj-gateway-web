import React from "react"
import { theme } from "../../lib/theme"
import dynamic from "next/dynamic"
import { urlFor } from "../../lib-sanity"
import { CardMedia, Typography } from "@mui/material"
import { useMobileCheck } from "../../utils/isMobilView"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
import { ImageProps, VideoProps, ActionProps, parameterMapItems } from "../types"
import { ContentWrapper, MainContentWrapper } from "./styles/card-with-media-and-content-inside-pop-up-model"
const CustomReadMore = dynamic(() => import("../hoc/CustomReadMore"))

interface CardWithMediaAndContentInsidePopUpModelProps {
  url: string
  _key: string
  content: any
  _type: string
  title: string
  metadata: any
  aesthetic: any
  variant: string
  urlType: string
  ctaLabel: string
  parentProps: any
  mediaType: string
  image: ImageProps
  gridSize?: number
  singleContent: any
  description: string
  largeVariant: string
  largeImage: ImageProps
  viewEventCallback: any
  videoAsset?: VideoProps
  charactersLimit: number
  isHeroTitleFont: boolean
  alignmentVariant?: string
  primaryAction: ActionProps
  headingElementForCard?: any
  secondaryAction: ActionProps
  parameterMap?: parameterMapItems[]
}
const CardWithMediaAndContentInsidePopUpModel = ({
  title,
  image,
  aesthetic,
  largeImage,
  description,
  largeVariant,
  gridSize = 2,
  charactersLimit,
}: CardWithMediaAndContentInsidePopUpModelProps) => {
  const isMobile = useMobileCheck()
  const { getOptimizeImageUrl } = useImageUtility()
  const { cardPadding, textColor, cardBackgroundColor } = useAesthetics(aesthetic?._ref)
  const titleTextColor = aesthetic?.titleColor?.hex
  const cardLevelPadding = isMobile ? aesthetic?.padding?.mobile : aesthetic?.padding?.desktop
  const cardLevelBackgroundColor = aesthetic?.backgroundColor?.hex
  const rightMediaLeftContent = largeVariant === "ihcl.core.card.with-right-media-left-content-inside-model"

  return (
    <MainContentWrapper
      $isMobile={isMobile}
      $rightMediaLeftContent={rightMediaLeftContent}
      $cardLevelPadding={cardLevelPadding}
      $staticCardLevelPadding={cardPadding}
      $cardLevelBackgroundColor={cardLevelBackgroundColor}
      $staticCardLevelBackgroundColor={cardBackgroundColor}>
      {(isMobile ? image?.asset?._ref : largeImage?.asset?._ref) && (
        <CardMedia
          alt={(isMobile ? image?.altText : largeImage?.altText) || "media"}
          component="img"
          sx={{
            height: "100%",
            objectFit: "cover",
            width: isMobile ? "100%" : "50%",
          }}
          src={getOptimizeImageUrl(urlFor(isMobile ? image?.asset?._ref : largeImage?.asset?._ref).url(), gridSize)}
        />
      )}
      <ContentWrapper $isMobile={isMobile}>
        {title && (
          <Typography
            component={"div"}
            variant={isMobile ? "m-heading-s" : "heading-s"}
            sx={{
              color: textColor
                ? textColor
                : titleTextColor
                ? titleTextColor
                : theme?.palette?.ihclPalette?.hexSeventeen,
            }}>
            {title}
          </Typography>
        )}
        {description && (
          <CustomReadMore
            variant={isMobile ? "m-body-sl" : "body-s"}
            length={charactersLimit}
            textStyles={{
              color: textColor
                ? textColor
                : titleTextColor
                ? titleTextColor
                : theme?.palette?.ihclPalette?.hexSeventeen,
            }}>
            {description}
          </CustomReadMore>
        )}
      </ContentWrapper>
    </MainContentWrapper>
  )
}

export default CardWithMediaAndContentInsidePopUpModel
