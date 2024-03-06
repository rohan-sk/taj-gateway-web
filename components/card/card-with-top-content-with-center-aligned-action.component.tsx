import React from "react"
import { urlFor } from "../../lib-sanity"
import dynamic from "next/dynamic"
import { Stack, Typography } from "@mui/material"
import { useMobileCheck } from "../../utils/isMobilView"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { ActionProps, ImageProps, aestheticItems } from "../types"
import { MainBox, ImageBox, TitleBox, TitleDivider } from "./styles/card-with-top-content-with-center-aligned-action"
import { MobilePxToVw } from "../../utils/DesktopFontCalc"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))

type CardWithTopContentWithCenterActionProps = {
  title: string
  variant: string
  image: ImageProps
  description: string
  largeVariant: string
  aesthetic: aestheticItems
  primaryAction: ActionProps
  secondaryAction: ActionProps
}

const CardWithTopContentWithCenterAction = ({
  title,
  image,
  variant,
  aesthetic,
  description,
  primaryAction,
  largeVariant,
  secondaryAction,
}: CardWithTopContentWithCenterActionProps) => {
  const isMobile = useMobileCheck()
  const { cardPadding, cardBackgroundColor } = useAesthetics(aesthetic?._ref || aesthetic?._id)
  return (
    <MainBox
      $padding={cardPadding?.mobile}
      $bgColor={cardBackgroundColor}
      aria-label={isMobile ? variant : largeVariant}>
      <TitleBox>
        <TitleDivider
          sx={{
            marginRight: "6.250vw",
          }}
        />
        <Typography variant="m-heading-m">{title}</Typography>
        <TitleDivider
          sx={{
            marginLeft: "6.250vw",
          }}
        />
      </TitleBox>
      <Typography variant="m-body-sl" mt={"2.188vw"}>
        {description}
      </Typography>

      <Stack flexDirection={"row"} columnGap={MobilePxToVw(20)}>
        {primaryAction?.title && (
          <RenderActionItem
            url={primaryAction?.url}
            isActionButtonType={true}
            title={primaryAction?.title}
            variant={primaryAction?.variant}
            navigationType={primaryAction?.urlType}
            buttonStyles={{
              letterSpacing: "0.1em",
              marginTop: "6.250vw",
              height: "10.938vw !important",
            }}
          />
        )}

        {secondaryAction?.title && (
          <RenderActionItem
            url={secondaryAction?.url}
            isActionButtonType={true}
            title={secondaryAction?.title}
            variant={secondaryAction?.variant}
            navigationType={secondaryAction?.urlType}
            buttonStyles={{
              letterSpacing: "0.1em",
              marginTop: "6.250vw",
              height: "10.938vw !important",
            }}
          />
        )}
      </Stack>

      {image?.asset?._ref && (
        <ImageBox
          alt={image?.altText || `-img`}
          width={"100%"}
          height={"100%"}
          component="img"
          src={urlFor(image?.asset?._ref).url()}
        />
      )}
    </MainBox>
  )
}

export default CardWithTopContentWithCenterAction
