import { ImageProps } from "../types"
import { CONSTANTS } from "../constants"
import dynamic from "next/dynamic"
import { theme } from "../../lib/theme"
import { urlFor } from "../../lib-sanity"
import { Box, Typography } from "@mui/material"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { MobilePxToVw } from "../../utils/DesktopFontCalc"
import React, { useEffect, useRef, useState } from "react"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
import {
  CardContentWrapper,
  HighlightsWrapper,
  SquareSharpWrapper,
} from "./styles/card-with-equal-width-for-media-and-content-m-site-component-styles"
const CustomReadMore = dynamic(() => import("../hoc/CustomReadMore"))
const TwoRowTitle = dynamic(() => import("../hoc/title/TwoRowTitle"))

type CardWithEqualWidthForMediaAndMSiteContentType = {
  url?: any
  content: any
  urlType?: any
  title: string
  ctaLabel?: any
  richText?: any
  aesthetic?: any
  highlights?: any
  subTitle: string
  variant?: string
  image: ImageProps
  gridSize?: number
  titleColor: string
  primaryAction?: any
  description: string
  largeVariant?: string
  largeImage: ImageProps
  charactersLimit?: number
  ctaLabelAction?: Function
  onPrimaryClick?: Function
  maxheight?: any
  setTitleHeight?: Function
}

const CardWithEqualWidthForMediaAndContentMSiteComponent = ({
  title,
  image,
  subTitle,
  aesthetic,
  highlights,
  description,
  gridSize = 2,
  charactersLimit,
  maxheight,
  setTitleHeight,
}: CardWithEqualWidthForMediaAndMSiteContentType) => {
  const { getOptimizeImageUrl } = useImageUtility()
  const { textColor, cardBackgroundColor } = useAesthetics(aesthetic?._ref)
  const titleElementRef = useRef<HTMLElement | null>(null)
  const titleHeight = titleElementRef?.current?.getBoundingClientRect()?.height
  const [more, setMore] = useState<number>(
    charactersLimit ? charactersLimit : CONSTANTS?.ITEM_DESCRIPTION_MOBILE_LIMIT
  )

  useEffect(() => {
    if (setTitleHeight && titleHeight && maxheight < titleHeight) {
      setTitleHeight(titleHeight)
    }
  }, [maxheight, setTitleHeight, titleHeight])

  return (
    <Box
      aria-label="card-with-equal-width-for-media-and-content-m-site"
      position={"relative"}>
      {image?.asset?._ref && (
        <Box
          width={"100%"}
          height={"100%"}
          component="img"
          alt={image?.altText || "card-Image"}
          sx={{ objectFit: "contain" }}
          src={getOptimizeImageUrl(urlFor(image?.asset?._ref).url(), gridSize)}
        />
      )}
      <CardContentWrapper
        className="content-box"
        $cardBackgroundColor={cardBackgroundColor}>
        {title && (
          <Box
            ref={titleElementRef}
            sx={{
              height: maxheight ? maxheight : "auto",
            }}>
            <TwoRowTitle
              title={title}
              width={"100%"}
              lineHeight={"110%"}
              dividerWidth={"6.25vw"}
              fontSize={MobilePxToVw(24)}
              color={textColor ? textColor : theme?.palette?.text?.primary}
            />
          </Box>
        )}
        {subTitle && (
          <Box marginTop={MobilePxToVw(20)}>
            <Typography
              variant="m-body-sl"
              sx={{
                color: textColor ? textColor : theme?.palette?.text?.primary,
              }}>
              {subTitle}
            </Typography>
          </Box>
        )}
        {description && (
          <Box marginTop={MobilePxToVw(20)}>
            <CustomReadMore
              textStyles={{
                color: textColor
                  ? textColor
                  : theme?.palette?.neuPalette?.hexSeventeen,
              }}
              length={more}
              variant={"m-body-sl"}>
              {description}
            </CustomReadMore>
          </Box>
        )}
        {highlights && (
          <Box marginTop={MobilePxToVw(20)}>
            {highlights?.map((item: any, index: number) => (
              <HighlightsWrapper key={index}>
                <SquareSharpWrapper $textColor={textColor} />
                <Typography
                  variant="m-body-s"
                  sx={{
                    color: textColor
                      ? textColor
                      : theme?.palette?.text?.primary,
                  }}>
                  {typeof item === typeof "" ? item : item?.term}
                </Typography>
              </HighlightsWrapper>
            ))}
          </Box>
        )}
      </CardContentWrapper>
    </Box>
  )
}

export default CardWithEqualWidthForMediaAndContentMSiteComponent
