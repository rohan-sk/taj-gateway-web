import { ActionProps } from "../types"
import { theme } from "../../lib/theme"
import dynamic from "next/dynamic"
import { RichTextItems } from "../types"
import { urlFor } from "../../lib-sanity"
import React, { useContext } from "react"
import { parameterMapItems } from "../types"
import { ImageProps, aestheticItems } from "../types"
import { Box, Grid, Typography } from "@mui/material"
import { useMobileCheck } from "../../utils/isMobilView"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  HorizontalDivider,
  CardWrappingTotalContentBox,
  ParameterMapKeyValueTypography,
  ParameterMapWithDescriptionWrappingBox,
} from "./styles/card-with-right-aligned-gift-items-component.styles"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))

interface CardWithRightAlignedGiftItemsComponentProps {
  content: any
  _key: string
  _type: string
  variant: string
  urlType: string
  subTitle: string
  image: ImageProps
  highLights: string
  parentProps: number
  description: string
  largeVariant: string
  largeImage: ImageProps
  richText: RichTextItems[]
  aesthetic: aestheticItems
  primaryAction: ActionProps
  showDividerForTitle: boolean
  isMultiBlockContent: boolean
  isComponentFullWidth: boolean
  showBulletForSubTitle: boolean
  parameterMap: parameterMapItems[]
}
const CardWithRightAlignedGiftItemsComponent = ({
  image,
  content,
  subTitle,
  aesthetic,
  largeImage,
  description,
  parameterMap,
  primaryAction,
}: CardWithRightAlignedGiftItemsComponentProps) => {
  const isMobile = useMobileCheck()
  const Context = useContext(IHCLContext)
  const PortableText = Context!.PortableText
  const { cardPadding } = useAesthetics(aesthetic?._ref)
  const cardImage = isMobile && image?.asset?._ref ? image?.asset?._ref : largeImage?.asset?._ref

  return (
    <CardWrappingTotalContentBox $padding={isMobile ? cardPadding?.mobile : cardPadding?.desktop} $isMobile={isMobile}>
      {cardImage && (
        <Box>
          {isMobile
            ? image?.asset?._ref && (
                <Box
                  component={"img"}
                  alt={image?.altText || "img"}
                  sx={{ width: "100%", height: "100%" }}
                  src={urlFor(image?.asset?._ref).url()}
                />
              )
            : largeImage?.asset?._ref && (
                <Box
                  component="img"
                  sx={{
                    width: DesktopPxToVw(700),
                    height: DesktopPxToVw(480),
                  }}
                  alt={largeImage?.altText || `img`}
                  src={urlFor(largeImage?.asset?._ref).url()}
                />
              )}
        </Box>
      )}
      <Box sx={{ color: theme?.palette?.text?.primary, flexGrow: "1" }}>
        {subTitle && (
          <Typography sx={{ fontStyle: "normal" }} variant={isMobile ? "m-body-l" : "body-ml"}>
            {subTitle}
          </Typography>
        )}
        <HorizontalDivider $isMobile={isMobile} />
        {content && (
          <Grid container spacing={1}>
            {content?.map((content: any, index: number) => (
              <Box key={index}>
                <PortableText blocks={content?.content} item={index} />
              </Box>
            ))}
          </Grid>
        )}
        <HorizontalDivider $isMobile={isMobile} />
        {(parameterMap || description) && (
          <>
            {parameterMap?.map((item: parameterMapItems, index: number) => (
              <ParameterMapWithDescriptionWrappingBox key={index} $isMobile={isMobile}>
                <Typography sx={{ fontStyle: "normal" }} variant={isMobile ? "m-body-l" : "body-ml"}>
                  <b> {item?.key}</b> :
                </Typography>
                <ParameterMapKeyValueTypography variant={isMobile ? "m-heading-s" : "heading-s"}>
                  {item?.value}
                </ParameterMapKeyValueTypography>
                {description && (
                  <Typography sx={{ fontStyle: "normal" }} variant={isMobile ? "m-body-l" : "body-ml"}>
                    {description}
                  </Typography>
                )}
              </ParameterMapWithDescriptionWrappingBox>
            ))}
          </>
        )}
        {primaryAction?.title && (
          <RenderActionItem
            url={primaryAction?.url}
            isActionButtonType={true}
            title={primaryAction?.title}
            variant={primaryAction?.variant}
            navigationType={primaryAction?.urlType}
            buttonStyles={{
              fontStyle: "normal",
              marginTop: isMobile ? "3.125vw" : "1.042vw",
            }}
          />
        )}
      </Box>
    </CardWrappingTotalContentBox>
  )
}

export default CardWithRightAlignedGiftItemsComponent
