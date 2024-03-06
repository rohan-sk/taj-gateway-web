import React, { Fragment, useContext } from "react"
import { ActionProps, ImageProps, RichTextItems } from "../types"
import dynamic from "next/dynamic"
import { theme } from "../../lib/theme"
import { urlFor } from "../../lib-sanity"
import { Box, Grid, Typography } from "@mui/material"
import { useMobileCheck } from "../../utils/isMobilView"
import {
  ContentStack,
  RichTextBox,
  RichTextValueTypography,
  HighlightsWrapper,
  SquareSharpWrapper,
  DescriptionContentWrapper,
} from "./styles/card-with-equal-width-for-media-and-content"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { ActionContentBox } from "./styles/card-with-desc"
import { useAppNavigation } from "../../utils/NavigationUtility"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
const TwoRowTitle = dynamic(() => import("../hoc/title/TwoRowTitle"))

type CardWithEqualWidthForMediaAndContentType = {
  content: any
  title: string
  image: ImageProps
  titleColor: string
  description: string
  largeImage: ImageProps
  largeVariant?: string
  variant?: string
  richText?: any
  primaryAction?: any
  ctaLabel?: any
  onPrimaryClick?: Function
  ctaLabelAction?: Function
  url?: any
  urlType?: any
  aesthetic?: any
  highlights?: any
  subTitle: string
  headingElementForCard?: string
}

const CardWithEqualWidthForMediaAndContent = ({
  title,
  image,
  content,
  largeImage,
  description,
  richText,
  primaryAction,
  ctaLabel,
  onPrimaryClick,
  ctaLabelAction,
  url,
  urlType,
  aesthetic,
  highlights,
  subTitle,
  headingElementForCard,
}: CardWithEqualWidthForMediaAndContentType) => {
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const { textColor, cardBackgroundColor } = useAesthetics(aesthetic?._ref)
  const Context = useContext(IHCLContext)
  const PortableText = Context!.PortableText

  const mobileImage = image?.asset?._ref
  const webImage = largeImage?.asset?._ref

  return (
    <Grid container>
      <Grid item lg={6} xl={6}>
        {(isMobile ? mobileImage : webImage) && (
          <Box
            alt={(isMobile ? image?.altText : largeImage?.altText) || "img"}
            component="img"
            width={"100%"}
            height={"100%"}
            sx={{ cursor: "pointer" }}
            src={urlFor(isMobile ? mobileImage : webImage).url()}
          />
        )}
      </Grid>
      <Grid item lg={6} xl={6}>
        <ContentStack
          sx={{
            backgroundColor: cardBackgroundColor ? cardBackgroundColor : theme?.palette?.ihclPalette?.hexOne,
          }}>
          {title && (
            <TwoRowTitle
              title={title}
              width={"100%"}
              lineHeight={"110%"}
              dividerWidth={isMobile ? "6.25vw" : "2vw"}
              fontSize={DesktopPxToVw(48)}
              headingElementForCard={headingElementForCard}
              color={textColor ? textColor : theme?.palette?.text?.primary}
            />
          )}
          {subTitle && (
            <DescriptionContentWrapper component="div" variant="body-ml" $textColor={textColor}>
              {subTitle}
            </DescriptionContentWrapper>
          )}
          {description && (
            <DescriptionContentWrapper component="div" variant="body-ml" $textColor={textColor}>
              {description}
            </DescriptionContentWrapper>
          )}
          {highlights && (
            <Box marginTop={DesktopPxToVw(20)}>
              {highlights?.map((item: any, index: number) => (
                <HighlightsWrapper key={index}>
                  <SquareSharpWrapper $textColor={textColor} />
                  <Typography
                    variant="body-s"
                    sx={{
                      color: textColor ? textColor : theme?.palette?.text?.primary,
                    }}>
                    {typeof item === typeof "" ? item : item?.term}
                  </Typography>
                </HighlightsWrapper>
              ))}
            </Box>
          )}
          {content?.length > 0 &&
            content?.map((data: any, index: number) => (
              <Fragment key={index}>
                {data?.title && (
                  <Typography variant="heading-s" mb="0.938vw">
                    {data?.title}
                  </Typography>
                )}
                <Box sx={{ mb: "1vw" }}>
                  <PortableText blocks={data?.content} key={index} />
                </Box>
              </Fragment>
            ))}
          {richText?.length > 0 && (
            <RichTextBox className="hide-box">
              {richText?.map((item: RichTextItems, index: number) => (
                <Box key={index} display={"flex"} alignContent={"center"} sx={{ paddingBottom: DesktopPxToVw(15) }}>
                  <Typography variant={"body-m"} display={"flex"} alignContent={"center"}>
                    {item?.richTextKey}
                  </Typography>
                  <RichTextValueTypography
                    $highlightColor={item?.highlightColor}
                    sx={{
                      color: item?.highlightColor ? "#AD8B3A" : "initial",
                    }}>
                    {item?.richTextValue}
                  </RichTextValueTypography>
                </Box>
              ))}
            </RichTextBox>
          )}
          {(primaryAction?.title || ctaLabel) && (
            <ActionContentBox
              className="hide-box"
              flexDirection={
                isMobile ? (typeof (primaryAction?.title && ctaLabel) === typeof "" ? "row-reverse" : "row") : "row"
              }>
              <RenderActionItem
                isActionButtonType={primaryAction?.variant === "link" ? false : true}
                url={primaryAction?.url}
                title={primaryAction?.title}
                variant={primaryAction?.variant}
                navigationType={primaryAction?.urlType}
                onClick={() => {
                  onPrimaryClick ? onPrimaryClick() : navigate(primaryAction?.url, primaryAction?.urlType)
                }}
                buttonStyles={{
                  minWidth: primaryAction?.urlType === "dialog" ? "9.45vw" : "9.79vw",
                  letterSpacing: "0.1em",
                }}
              />
              <RenderActionItem
                url={url}
                title={ctaLabel}
                isActionButtonType={false}
                navigationType={urlType}
                variant={isMobile ? "m-text-link" : "link-m"}
                onClick={() => {
                  if (ctaLabelAction) {
                    ctaLabelAction()
                  } else {
                    navigate(url, urlType)
                  }
                }}
                iconStyles={{
                  color: textColor ? `${textColor} !important` : theme?.palette?.ihclPalette?.hexTwo,
                }}
                linkStyles={{
                  color: textColor ? textColor : theme?.palette?.ihclPalette?.hexTwo,
                }}
                buttonStyles={{
                  letterSpacing: isMobile ? "0.281vw" : "unset",
                }}
              />
            </ActionContentBox>
          )}
        </ContentStack>
      </Grid>
    </Grid>
  )
}

export default CardWithEqualWidthForMediaAndContent
