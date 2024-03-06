import React from "react"
import { ActionProps, ImageProps } from "../types"
import dynamic from "next/dynamic"
import { urlFor } from "../../lib-sanity"
import { useMobileCheck } from "../../utils/isMobilView"
import { Box, Typography, useTheme } from "@mui/material"
import { RightAlignedTitleCtaLinkBox } from "./styles/card-with-right-aligned-content-for-mSite"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))

type CardWithRightAlignedTitleProps = {
  title: string
  image: ImageProps
  largeImage: ImageProps
  ctaLabel: string
  url: string
  urlType: string
  _type: string
  primaryAction: ActionProps
  description: string
  parentProps: any
  gridSize?: number
}

const CardWithRightAlignedTitleAndCTA = ({
  title,
  image,
  largeImage,
  ctaLabel,
  url,
  urlType,
  primaryAction,
  description,
  gridSize = 2,
}: CardWithRightAlignedTitleProps) => {
  const theme = useTheme()
  const isMobile = useMobileCheck()
  const cardImage = isMobile ? image?.asset?._ref : largeImage?.asset?._ref
  const { getOptimizeImageUrl } = useImageUtility()

  return (
    <Box aria-label={"card-with-right-title"} position={"relative"}>
      {cardImage && (
        <Box
          alt={(isMobile ? image?.altText : largeImage?.altText) || "img"}
          component="img"
          width="100%"
          src={urlFor(cardImage).url()}
        />
      )}
      <RightAlignedTitleCtaLinkBox
        sx={{ width: "95%" }}
        $isMobile={isMobile}
        $ctaLabel={Boolean(ctaLabel || description)}>
        {title && (
          <Typography
            variant={isMobile ? "m-heading-xs" : "heading-xs"}
            sx={{
              color: theme?.palette?.text?.primary,
              letterSpacing: "-0.06em",
            }}>
            {title}
          </Typography>
        )}
        {description && (
          <Box sx={{ marginTop: "0.63vw" }}>
            <Typography variant="body-ml">{description}</Typography>
          </Box>
        )}
        {(ctaLabel || primaryAction?.title) && (
          <Box mt={"0.8vw"}>
            <RenderActionItem
              url={url}
              title={ctaLabel}
              navigationType={urlType}
              variant={"link-m"}
              isActionButtonType={false}
            />
            {primaryAction?.title && (
              <RenderActionItem
                url={primaryAction?.url}
                title={primaryAction?.title}
                navigationType={primaryAction?.urlType}
                variant={primaryAction?.variant}
                isActionButtonType={false}
              />
            )}
          </Box>
        )}
      </RightAlignedTitleCtaLinkBox>
    </Box>
  )
}

export default CardWithRightAlignedTitleAndCTA
