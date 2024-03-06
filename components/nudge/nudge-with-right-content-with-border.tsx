import React from "react"
import { urlFor } from "../../lib-sanity"
import { Box, Typography } from "@mui/material"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import { useAesthetics } from "../../utils/fetchAsthetics"
import RenderActionItem from "../hoc/actions/action-items-ui"
import { ActionProps, aestheticItems, ImageProps } from "../types"
import {
  NudgeContainer,
  TitleContentTypographyBox,
  DescriptionContentTypographyBox,
  PrimarySecondaryActionWrappingBox,
} from "./styles/nudge-card-with-image-styles"
import { useMobileCheck } from "../../utils/isMobilView"
import { theme } from "../../lib/theme"

interface NudgeCardWithImageProps {
  title: string
  _type: string
  image: ImageProps
  description: string
  largeImage: ImageProps
  aesthetic: aestheticItems
  PrimaryAction: ActionProps
  secondaryAction: ActionProps
}

const NudgeCardWithImage = ({
  image,
  title,
  aesthetic,
  largeImage,
  description,
  PrimaryAction,
  secondaryAction,
}: NudgeCardWithImageProps) => {
  const isMobile = useMobileCheck()
  const { cardPadding } = useAesthetics(aesthetic?._ref)

  return (
    <Box
      sx={{
        margin: isMobile
          ? cardPadding?.mobile || aesthetic?.padding?.mobile
          : cardPadding?.desktop || aesthetic?.padding?.desktop,
      }}>
      <NudgeContainer>
        {isMobile ? (
          <>
            {image?.asset?._ref && (
              <Box
                alt={`-img`}
                component={"img"}
                sx={{ width: "100%", height: "auto" }}
                src={urlFor(image?.asset?._ref).url()}
              />
            )}
          </>
        ) : (
          <>
            {largeImage?.asset?._ref && (
              <Box
                alt={`-img`}
                component={"img"}
                sx={{ width: DesktopPxToVw(378) }}
                src={urlFor(largeImage?.asset?._ref).url()}
              />
            )}
          </>
        )}

        <Box>
          {title && (
            <TitleContentTypographyBox>
              <Typography
                variant={isMobile ? "m-heading-s" : "heading-s"}
                sx={{ color: theme?.palette?.ihclPalette?.hexSeventeen }}>
                {title}
              </Typography>
            </TitleContentTypographyBox>
          )}
          {description && (
            <DescriptionContentTypographyBox>
              <Typography variant={isMobile ? "m-body-l" : "body-ml"}>{description}</Typography>
            </DescriptionContentTypographyBox>
          )}
          {(PrimaryAction?.title || secondaryAction?.title) && (
            <PrimarySecondaryActionWrappingBox>
              {PrimaryAction?.title && (
                <Box sx={{ marginBottom: isMobile ? "" : DesktopPxToVw(35) }}>
                  <RenderActionItem
                    buttonStyles={{ letterSpacing: "0.15em" }}
                    url={PrimaryAction?.url}
                    isActionButtonType={false}
                    title={PrimaryAction?.title}
                    variant={PrimaryAction?.variant}
                    navigationType={PrimaryAction?.urlType}
                  />
                </Box>
              )}
              {secondaryAction?.title && (
                <RenderActionItem
                  isActionButtonType={true}
                  url={secondaryAction?.url}
                  title={secondaryAction?.title}
                  variant={secondaryAction?.variant}
                  buttonStyles={{ letterSpacing: "0.1em" }}
                  navigationType={secondaryAction?.urlType}
                />
              )}
            </PrimarySecondaryActionWrappingBox>
          )}
        </Box>
      </NudgeContainer>
    </Box>
  )
}

export default NudgeCardWithImage
