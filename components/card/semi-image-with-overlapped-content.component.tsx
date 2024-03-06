import React from "react"
import { urlFor } from "../../lib-sanity"
import { Box, Typography } from "@mui/material"
import { useMobileCheck } from "../../utils/isMobilView"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { ImageProps, aestheticItems, singleContentInterface } from "../types"
import {
  TitleDividerStyle,
  CardWithContentDataCard,
  ImageWithOverlappedContentContainer,
} from "./styles/semi-image-with-overlapped-content.styles"
import { useImageUtility } from "../../utils/hooks/useImageUtility"

interface SemiImageWithOverlappedContentProps {
  title: string
  _type: string
  urlType: string
  subTitle: string
  mediaType: string
  image: ImageProps
  description: string
  largeVariant: string
  largeImage: ImageProps
  aesthetic: aestheticItems
  backgroundImage: ImageProps
  singleContent: singleContentInterface[]
}
const SemiImageWithOverlappedContent = ({
  title,
  image,
  subTitle,
  aesthetic,
  largeImage,
  description,
}: SemiImageWithOverlappedContentProps) => {
  const isMobile = useMobileCheck()
  const { getOptimizeImageUrl } = useImageUtility()
  const { cardPadding } = useAesthetics(aesthetic?._ref)
  return (
    <Box
      sx={{
        padding: isMobile ? cardPadding?.mobile : cardPadding?.desktop,
      }}>
      <ImageWithOverlappedContentContainer>
        <CardWithContentDataCard>
          {title && (
            <Box>
              <Typography variant={isMobile ? "m-heading-m" : "heading-m"}>
                <TitleDividerStyle $mobile={isMobile} />
                {title}
              </Typography>
            </Box>
          )}

          {subTitle && <Typography variant={isMobile ? "m-body-l" : "body-l"}>{subTitle}</Typography>}
          {description && <Typography variant={isMobile ? "m-body-l" : "body-ml"}>{description}</Typography>}
        </CardWithContentDataCard>
        {isMobile
          ? image?.asset?._ref && (
              <Box
                alt={image?.altText || `-img`}
                component={"img"}
                src={getOptimizeImageUrl(urlFor(image?.asset?._ref).url(), 1)}
              />
            )
          : largeImage?.asset?._ref && (
              <Box
                alt={largeImage?.altText || `-img`}
                component={"img"}
                width={"36.458vw"}
                style={{
                  float: "right",
                }}
                src={getOptimizeImageUrl(urlFor(largeImage?.asset?._ref).url(), 1)}
              />
            )}
      </ImageWithOverlappedContentContainer>
    </Box>
  )
}

export default SemiImageWithOverlappedContent
