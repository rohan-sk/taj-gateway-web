import React, { useState } from "react"
import { useMobileCheck } from "../../utils/isMobilView"
import { urlFor } from "../../lib-sanity"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
import { Box } from "@mui/material"
import { MainBox, ContentBox, TitleTypography, ImageBox } from "./styles/card-title-on-hover.component"
import { ImageProps } from "../types"

interface CardTitleOnHoverComponentProps {
  title: string
  largeImage: ImageProps
  image: ImageProps
  variant: string
  largeVariant: string
  videoThumbnail: any
  _type: string
  asset?: any
  altText?: string
  onClick?: Function
}

const CardTitleOnHoverComponent = (props: CardTitleOnHoverComponentProps) => {
  const { title, image, largeImage, variant, largeVariant, videoThumbnail, _type, asset, altText, onClick } = props
  const isMobile = useMobileCheck()
  const { getOptimizeImageUrl } = useImageUtility()
  const [activeHoverCard, setActiveHoverCard] = useState<boolean>(false)
  const cardImage = (isMobile ? image?.asset?._ref : largeImage?.asset?._ref) || asset?._ref
  const isContentAvailable = title || altText

  return (
    <MainBox
      onClick={() => {
        onClick && onClick()
      }}
      aria-label={isMobile ? variant : largeVariant}
      onMouseLeave={() => setActiveHoverCard(false)}
      onMouseEnter={() => setActiveHoverCard(true)}>
      {_type === "videoAsset" ? (
        <Box
          alt={altText || "video-thumbnail"}
          loading="lazy"
          component="img"
          width={"100%"}
          height={"100%"}
          sx={{ cursor: "pointer" }}
          src={videoThumbnail?.asset?._ref && urlFor(videoThumbnail?.asset?._ref).url()}
        />
      ) : (
        <ImageBox
          sx={{ backgroundImage: `url(${getOptimizeImageUrl(urlFor(cardImage)?.url(), 3)})` }}
          aria-label={altText || "hotel-gallery"}
        />
      )}
      {/* Temporarily commenting the below hover code , as it is required in later phase  .
      {/* {activeHoverCard && !isMobile && isContentAvailable && (
        <ContentBox>
          {(title || altText) && (
            <TitleTypography variant={isMobile ? "m-heading-xs" : "heading-xs"}>{title || altText}</TitleTypography>
          )}
        </ContentBox>
      )} */}
    </MainBox>
  )
}

export default CardTitleOnHoverComponent
