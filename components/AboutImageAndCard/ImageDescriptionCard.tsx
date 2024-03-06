import React from "react"
import dynamic from "next/dynamic"
import { urlFor } from "../../lib-sanity"
import { Typography, Box } from "@mui/material"
import { useMobileCheck } from "../../utils/isMobilView"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { PortableText } from "../../lib/portable-text-serializers"
import { ActionProps, aestheticItems, ImageProps, PathType, singleContentInterface } from "../types"
import { TitleDividerStyle } from "../card/styles/semi-image-with-overlapped-content.styles"
import { DescriptionCardContainerBox, ImageDescriptionCardContainer } from "./AboutUsStyles"
import { ActionContentBox } from "../card/styles/card-with-desc"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
import { useImageUtility } from "../../utils/hooks/useImageUtility"

interface ImageDescriptionCardProps {
  title: string
  _type: string
  urlType: PathType
  subTitle: string
  mediaType: string
  image: ImageProps
  description: string
  largeVariant: string
  largeImage: ImageProps
  aesthetic: aestheticItems
  backgroundImage: ImageProps
  url: string
  ctaLabel: string
  primaryAction?: ActionProps
  secondaryAction?: ActionProps
  singleContent: singleContentInterface[]
}
const ImageDescriptionCard = ({
  title,
  image,
  subTitle,
  aesthetic,
  largeImage,
  description,
  singleContent,
  ctaLabel,
  secondaryAction,
  primaryAction,
}: ImageDescriptionCardProps) => {
  const isMobile = useMobileCheck()
  const { getOptimizeImageUrl } = useImageUtility()
  const { cardPadding } = useAesthetics(aesthetic?._ref)
  return (
    <Box
      sx={{
        padding: isMobile ? cardPadding?.mobile : cardPadding?.desktop,
      }}>
      <ImageDescriptionCardContainer $mobile={isMobile}>
        <DescriptionCardContainerBox $mobile={isMobile}>
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
          {singleContent && (
            <Box>
              <Typography
                variant="m-body-s"
                sx={{
                  "& span": {
                    fontSize: isMobile ? "3.438vw" : "1.146vw",
                  },
                }}>
                <PortableText blocks={singleContent} />
              </Typography>
            </Box>
          )}
          {(primaryAction?.title || ctaLabel) && (
            <ActionContentBox
              className="hide-box"
              flexDirection={isMobile ? (typeof primaryAction?.title === typeof "" ? "row-reverse" : "row") : "row"}>
              {primaryAction?.title && (
                <RenderActionItem
                  isActionButtonType={primaryAction?.variant === "link" ? false : true}
                  url={(primaryAction?.url as string) || ""}
                  title={primaryAction?.title}
                  variant={primaryAction?.variant}
                  navigationType={primaryAction?.urlType}
                  buttonStyles={{
                    minWidth: primaryAction?.urlType === "dialog" ? "9.45vw" : "9.79vw",
                    letterSpacing: "0.1em",
                  }}
                />
              )}
              {secondaryAction?.title && (
                <RenderActionItem
                  isActionButtonType={false}
                  url={(secondaryAction?.url as string) || ""}
                  title={secondaryAction?.title}
                  variant={secondaryAction?.variant}
                  navigationType={secondaryAction?.urlType}
                />
              )}
            </ActionContentBox>
          )}
        </DescriptionCardContainerBox>
        {isMobile
          ? image?.asset?._ref && (
              <Box
                alt={image?.altText || `-img`}
                component={"img"}
                width={"100%"}
                height={"100%"}
                src={getOptimizeImageUrl(urlFor(image?.asset?._ref).url(), 1)}
              />
            )
          : largeImage?.asset?._ref && (
              <Box
                alt={largeImage?.altText || `-img`}
                component={"img"}
                width={"68.594vw"}
                src={getOptimizeImageUrl(urlFor(largeImage?.asset?._ref).url(), 1)}
              />
            )}
      </ImageDescriptionCardContainer>
    </Box>
  )
}

export default ImageDescriptionCard
