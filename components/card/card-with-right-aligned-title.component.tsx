import React, { useEffect, useRef } from "react"
import { ActionProps, ImageProps } from "../types"
import dynamic from "next/dynamic"
import { urlFor } from "../../lib-sanity"
import { useMobileCheck } from "../../utils/isMobilView"
import { Box, Typography, useTheme } from "@mui/material"
import { RightAlignedTitleBox, RightAlignedTitleCtaLinkBox } from "./styles/card-with-right-aligned-content-for-mSite"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
import { useAppNavigation } from "../../utils/NavigationUtility"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
const CustomReadMore = dynamic(() => import("../hoc/CustomReadMore"))

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
  charactersLimit?: any
  gridSize?: number
  cardActionType: any
  headingElementForCard?: any
  maxheight: number
  setTitleHeight?: Function
}

const getCardAction = (cardActionType: any, actionType: string) => {
  if (Array?.isArray(cardActionType) === false) {
    return {}
  }
  const index = cardActionType?.findIndex((item: any) => item?.actionType === actionType)
  return index === -1 ? {} : cardActionType?.[index]
}

const CardWithRightAlignedTitle = ({
  title,
  image,
  largeImage,
  ctaLabel,
  url,
  urlType,
  primaryAction,
  cardActionType,
  description,
  charactersLimit,
  gridSize = 4,
  headingElementForCard,
  maxheight,
  setTitleHeight,
}: CardWithRightAlignedTitleProps) => {
  const theme = useTheme()
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const { getOptimizeImageUrl } = useImageUtility()
  const cardImage = isMobile ? image?.asset?._ref : largeImage?.asset?._ref
  const imageAction = getCardAction(cardActionType, "emptyLink")?.emptyLink

  const titleElementRef = useRef<HTMLElement | null>(null)
  const titleHeight = titleElementRef?.current?.getBoundingClientRect()?.height

  useEffect(() => {
    if (setTitleHeight && titleHeight && maxheight < titleHeight) {
      setTitleHeight(titleHeight)
    }
  }, [maxheight, setTitleHeight, titleHeight])

  return (
    <Box aria-label={"rectangle-card-with-right-aligned-title-aspect-ratio-2:4"} position={"relative"}>
      {cardImage && (
        <Box
          alt={(isMobile ? image?.altText : largeImage?.altText) || "img"}
          component={"img"}
          width="100%"
          sx={{
            cursor: imageAction?.url ? "pointer" : "",
          }}
          onClick={() => {
            imageAction?.url && navigate(imageAction?.url, imageAction?.urlType)
          }}
          src={getOptimizeImageUrl(urlFor(cardImage).url(), gridSize)}
        />
      )}
      <RightAlignedTitleCtaLinkBox $isMobile={isMobile} $ctaLabel={Boolean(ctaLabel || description)}>
        {title && (
          <Typography
            ref={titleElementRef}
            variant={isMobile ? "m-heading-xs" : "heading-xs"}
            component={headingElementForCard || "h3"}
            sx={{
              color: theme?.palette?.text?.primary,
              letterSpacing: "-0.06em",
              height: maxheight ? maxheight : "auto",
            }}>
            {title}
          </Typography>
        )}
        {description && (
          <CustomReadMore
            textStyles={{ marginTop: "0.63vw" }}
            variant={isMobile ? "m-body-ml" : "body-ml"}
            length={charactersLimit}>
            {description}
          </CustomReadMore>
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

export default CardWithRightAlignedTitle
