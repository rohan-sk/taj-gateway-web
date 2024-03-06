import React, { useContext } from "react"
import { theme } from "../../lib/theme"
import dynamic from "next/dynamic"
import { urlFor } from "../../lib-sanity"
import { Box, Typography } from "@mui/material"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../utils/isMobilView"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  ImageProps,
  ActionProps,
  aestheticItems,
  parameterMapItems,
} from "../types"
import {
  PortableItem,
  StyledDivider,
  StyledTypography,
  ComponentContainer,
  DescriptionContainer,
  PrimaryActionWrappingBox,
  ContentDataContainer,
} from "./styles/card-with-hotel-details"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))

type CardWithHotelDetailsProps = {
  content: any
  title: string
  urlType: string
  subTitle: string
  image: ImageProps
  largeImage: ImageProps
  aesthetic: any
  primaryAction: ActionProps
  isMultiBlockContent: boolean
  isComponentFullWidth: boolean
  parameterMap: parameterMapItems[]
  headingElementForCard: any
}

const CardWithHotelDetailsComponent = ({
  image,
  title,
  content,
  subTitle,
  aesthetic,
  largeImage,
  parameterMap,
  primaryAction,
  headingElementForCard
}: CardWithHotelDetailsProps) => {
  const isMobile = useMobileCheck()
  const Context = useContext(IHCLContext)
  const PortableText = Context!.PortableText
  const cardImage = isMobile ? image?.asset?._ref : largeImage?.asset?._ref
  const { cardPadding, cardBackgroundColor } = useAesthetics(aesthetic?._ref)

  return (
    <ComponentContainer
      $isComponentFullWidth={
        isMobile ? cardPadding?.mobile || aesthetic?.padding?.mobile : cardPadding?.desktop || aesthetic?.padding?.desktop
      }
      $cardBackgroundColor={cardBackgroundColor || aesthetic?.backgroundColor?.hex}>
      <DescriptionContainer>
        {subTitle && (
          <StyledTypography variant={isMobile ? "m-body-l" : "body-ml"} $mobilePaddingBottom={"3.125vw"} $paddingBottom={18}>
            {subTitle}
          </StyledTypography>
        )}
        {title && (
          <Typography
            sx={{
              paddingBottom: DesktopPxToVw(11),
              fontWeight: 300,
              color: theme?.palette?.neuPalette?.hexSeventeen,
              "@media (max-width:640px)": {
                paddingBottom: "2.2vw",
              }
            }}
            component={headingElementForCard || "h3"} variant={isMobile ? "m-heading-s" : "heading-s"}>
            {title}
          </Typography>
        )}
        {parameterMap && (
          <Box sx={{ marginBottom: parameterMap ? isMobile ? "2.213vw" : DesktopPxToVw(20) : "" }}>
            {parameterMap?.map((item: parameterMapItems, index: number) => (
              <Box key={index}>
                <Typography variant={isMobile ? "m-body-s" : "body-s"}>
                  {item?.key} <b> {item?.value}</b>
                </Typography>
              </Box>
            ))}
          </Box>
        )}
        <StyledDivider />
        {content && (
          <ContentDataContainer $isMobile={isMobile}>
            {/* this section needs to revalidated since it is using PortableText */}
            {content?.map((content: any, index: number) => (
              <PortableItem key={index}>
                <PortableText blocks={content?.content} key={index} />
              </PortableItem>
            ))}
          </ContentDataContainer>
        )}
        {primaryAction?.title && (
          <PrimaryActionWrappingBox>
            <RenderActionItem
              url={primaryAction?.url}
              title={primaryAction?.title}
              navigationType={primaryAction?.urlType}
              variant={primaryAction?.variant}
              isActionButtonType={true}
              buttonStyles={{
                letterSpacing: "0.1em",
              }}
            />
          </PrimaryActionWrappingBox>
        )}
      </DescriptionContainer>
      {cardImage && (
        <Box>
          {isMobile
            ? image?.asset?._ref && (
                <Box
                  alt={image?.altText || "-img"}
                  component={"img"}
                  sx={{ width: "100%", height: "100%" }}
                  src={urlFor(image?.asset?._ref).url()}
                />
              )
            : largeImage?.asset?._ref && (
                <Box
                  alt={largeImage?.altText || `-img`}
                  component="img"
                  sx={{
                    width: DesktopPxToVw(700),
                    height: DesktopPxToVw(480),
                  }}
                  src={urlFor(largeImage?.asset?._ref).url()}
                />
              )}
        </Box>
      )}
    </ComponentContainer>
  )
}

export default CardWithHotelDetailsComponent
