import React from "react"
import { ActionProps } from "../types"
import { Box, Typography } from "@mui/material"
import { useMobileCheck } from "../../utils/isMobilView"
import dynamic from "next/dynamic"
import { MainContainer } from "./styles/card-description-with-external-link-styles"
import { theme } from "../../lib/theme"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))

interface CardDescriptionWithExternalLink {
  _key: string
  _type: string
  metadata: any
  variant: string
  urlType: string
  description: string
  parentProps: number
  largeVariant: string
  isHeroTitleFont: boolean
  primaryAction: ActionProps
  isMultiBlockContent: boolean
}
const CardDescriptionWithExternalLink = ({
  description,
  primaryAction,
}: CardDescriptionWithExternalLink) => {
  const isMobile = useMobileCheck()
  return (
    <MainContainer
      $isMobile={isMobile}
      sx={{
        border: isMobile
          ? `1px solid ${theme?.palette?.neuPalette?.hexTwo}`
          : "",
      }}>
      {description && (
        <Typography
          variant={isMobile ? "m-body-m" : "body-ml"}
          fontSize={isMobile ? "3.438vw" : "1.146vw"}>
          {description}
        </Typography>
      )}
      {primaryAction?.title && (
        <RenderActionItem
          url={primaryAction?.url}
          title={primaryAction?.title}
          navigationType={primaryAction?.urlType}
          variant={primaryAction?.variant}
          isActionButtonType={primaryAction?.variant === "link" ? false : true}
          buttonImgStyles={{
            margin: isMobile ? "8vw 0vw" : "2vw 0vw",
          }}
        />
      )}
    </MainContainer>
  )
}

export default CardDescriptionWithExternalLink
