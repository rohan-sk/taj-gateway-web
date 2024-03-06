import React from "react"
import { ImageProps } from "../types"
import { useMobileCheck } from "../../utils/isMobilView"
import { Box, Typography } from "@mui/material"
import { CardMediaImageContent } from "./styles/card-with-cta"
import { Router, useRouter } from "next/router"
import { urlFor } from "../../lib-sanity"
import { theme } from "../../lib/theme"
import { StyledChevronRight } from "./styles/common-styles"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { CONSTANTS } from "../constants"
import { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { ContentBoxWrapper, CtaLabelBox, ParentBoxWrapper } from "./styles/card-with-title-cta-for-msite-style"

type CardWithTitleCtaForMsiteProps = {
  title: string
  ctaLabel: string
  url: string
  urlType: any
  image: ImageProps
  largeImage: ImageProps
  variant: string
}

const CardWithTitleCtaForMsite = ({ title, ctaLabel, url, urlType, variant, image }: CardWithTitleCtaForMsiteProps) => {
  const navigate = useAppNavigation()
  const router = useRouter()

  const cardImage = image?.asset?._ref
  const isContent = cardImage || title || ctaLabel

  const handleClick = (url: string) => {
    url && router?.push(url)
  }
  return (
    <>
      {isContent && (
        <ParentBoxWrapper aria-label={variant}>
          <CardMediaImageContent onClick={() => handleClick(url)}>
            <Box alt={image?.altText || "media"} component={"img"} src={urlFor(cardImage).url()} />
          </CardMediaImageContent>
          <ContentBoxWrapper>
            {title && (
              <Typography
                variant={"m-heading-xs"}
                sx={{
                  color: theme?.palette?.text?.primary,
                }}>
                {title}
              </Typography>
            )}
            {ctaLabel && (
              <CtaLabelBox>
                <Typography
                  variant="m-link-m"
                  sx={{ letterSpacing: "1.8px" }}
                  onClick={() => {
                    navigate(url, urlType)
                  }}>
                  {ctaLabel}
                </Typography>
                {urlType !== CONSTANTS?.DIALOG && <StyledChevronRight />}
              </CtaLabelBox>
            )}
          </ContentBoxWrapper>
        </ParentBoxWrapper>
      )}
    </>
  )
}

export default CardWithTitleCtaForMsite
