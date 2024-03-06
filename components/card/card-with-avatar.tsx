import React from "react"
import { ImageProps } from "../types"
import { Box, Typography } from "@mui/material"
import { urlFor } from "../../lib-sanity"
import { useMobileCheck } from "../../utils/isMobilView"
import { MainBox, MainBoxStyle, TitleOneBox, QuoteBoxStyle } from "./styles/card-with-avatar-styles"
import { theme } from "../../lib/theme"
import { ICONS } from "../constants"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"

type CardWithAvatarProps = {
  title: string
  description: string
  largeImage: ImageProps
  subTitle: string
  isMultiBlockContent: boolean
  image: ImageProps
  props: any
}

export default function AvatarCard({ title, description, largeImage, subTitle, image, props }: CardWithAvatarProps) {
  const isMobile = useMobileCheck()
  const webImage = largeImage?.asset?._ref
  const mobileImage = image?.asset?._ref

  return (
    <MainBox $isMobile={isMobile}>
      {(mobileImage || webImage) && (
        <Box
          alt={(isMobile ? image?.altText : largeImage?.altText) || "img"}
          width={"70%"}
          component={"img"}
          src={urlFor(isMobile ? mobileImage : webImage).url()}
          style={{
            position: "relative",
            left: "50%",
            transform: `translate(-50%, ${isMobile ? `12.188vw` : `4.063vw`})`,
          }}
        />
      )}
      <MainBoxStyle $isMobile={isMobile}>
        <TitleOneBox>
          {title && (
            <Typography
              variant={isMobile ? "m-heading-xs" : "heading-xs"}
              sx={{ color: theme?.palette?.ihclPalette?.hexTwo }}>
              {title}
            </Typography>
          )}
          {subTitle && <Typography variant={isMobile ? "m-body-s" : "body-xs"}>{subTitle}</Typography>}
        </TitleOneBox>
        {description && (
          <QuoteBoxStyle
            $isMobile={isMobile}
            sx={{
              fontSize: `${isMobile ? "3.46vw" : "1.14vw"}`,
              marginTop: "0.521vw",
              paddingLeft: "0.521vw",
            }}>
            <Box
              alt={"img"}
              sx={{
                display: "inline!important",
                position: "relative",
                top: isMobile ? "1.563vw" : "0.531vw",
                width: isMobile ? MobilePxToVw(53) : DesktopPxToVw(53),
              }}
              component={"img"}
              src={ICONS?.QUOTE_ICON}
            />
            {description}
          </QuoteBoxStyle>
        )}
      </MainBoxStyle>
    </MainBox>
  )
}
