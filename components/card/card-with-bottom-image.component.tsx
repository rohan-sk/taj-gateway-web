import React, { useState } from "react"
import { theme } from "../../lib/theme"
import dynamic from "next/dynamic"
import { urlFor } from "../../lib-sanity"
import { Box, Stack, Typography } from "@mui/material"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { KeyboardArrowRightSharp } from "@mui/icons-material"
import { ActionProps, ImageProps, PathType, aestheticItems } from "../types"
import {
  MainBox,
  ActionBox,
  TitleTypography,
  PrimaryActionBox,
  ActionImageBox,
} from "./styles/card-with-bottom-image"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../utils/isMobilView"
import { CONSTANTS } from "../constants"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
const CustomReadMore = dynamic(() => import("../hoc/CustomReadMore"))


type CardWithBottomImageProps = {
  title: string
  ctaLabel: string
  image: ImageProps
  description: string
  aesthetic: aestheticItems
  primaryAction: ActionProps
  secondaryAction: ActionProps
  url: string
  urlType: any
  charactersLimit?: any
}

const CardWithBottomImage = ({
  title,
  image,
  ctaLabel,
  aesthetic,
  description,
  primaryAction,
  secondaryAction,
  url,
  urlType,
  charactersLimit,
}: CardWithBottomImageProps) => {
  const { cardPadding, cardBackgroundColor } = useAesthetics(
    aesthetic?._ref || aesthetic?._id
  )
  const navigate = useAppNavigation()
  const isMobile = useMobileCheck()
  const { getOptimizeImageUrl } = useImageUtility()
  const [more, setMore] = useState(
    charactersLimit ?? CONSTANTS?.ITEM_DESCRIPTION_CHARACTER_LIMIT
  )
  return (
    <MainBox $padding={cardPadding?.mobile} $bgColor={cardBackgroundColor}>
      {title && (
        <TitleTypography variant="m-heading-m">{title}</TitleTypography>
      )}
      {description && (
        <Typography
          variant={"m-body-sl"}
          className="hide-box"
          sx={{
            mt: "2.656vw",
            color: theme?.palette?.neuPalette?.hexSeventeen,
          }}>
          {description.length > more ? (
            <CustomReadMore length={more} variant={"m-body-sl"}>
              {description}
            </CustomReadMore>
          ) : (
            description
          )}
        </Typography>
      )}
      {ctaLabel && (
        <ActionBox
          onClick={() => {
            navigate(url, urlType)
          }}>
          <Typography variant="m-text-link" sx={{ letterSpacing: "1.8px" }}>
            {ctaLabel}
          </Typography>
          {!(urlType === PathType.dialog) && (
            <KeyboardArrowRightSharp
              sx={{ color: theme?.palette?.neuPalette?.hexTwo }}
            />
          )}
        </ActionBox>
      )}

      <ActionImageBox>
        {primaryAction?.image?.asset?._ref && (
          <Box
            width={"45%"}
            height={"100%"}
            component="img"
            sx={{ marginTop: "5.46vw" }}
            alt={primaryAction?.image?.altText || `-img`}
            onClick={() => navigate(primaryAction?.url, primaryAction?.urlType)}
            src={urlFor(primaryAction?.image?.asset?._ref).url()}
          />
        )}
        {secondaryAction?.image?.asset?._ref && (
          <Box
            onClick={() =>
              navigate(secondaryAction?.url, secondaryAction?.urlType)
            }
            width={"45%"}
            height={"100%"}
            component="img"
            sx={{ marginTop: "5.46vw" }}
            alt={secondaryAction?.image?.altText || `img`}
            src={urlFor(secondaryAction?.image?.asset?._ref).url()}
          />
        )}
      </ActionImageBox>
      {image?.asset?._ref && (
        <Box
          width={"100%"}
          alt={image?.altText || "-img"}
          height={"100%"}
          component="img"
          sx={{ marginTop: "8.750vw" }}
          src={getOptimizeImageUrl(urlFor(image?.asset?._ref).url(), 1)}
        />
      )}
      {primaryAction?.title && (
        <PrimaryActionBox>
          <RenderActionItem
            url={primaryAction?.url}
            isActionButtonType={true}
            title={primaryAction?.title}
            variant={primaryAction?.variant}
            navigationType={primaryAction?.urlType}
          />
        </PrimaryActionBox>
      )}
    </MainBox>
  )
}

export default CardWithBottomImage
