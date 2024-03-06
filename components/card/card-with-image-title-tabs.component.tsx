import React, { useContext } from "react"
import { urlFor } from "../../lib-sanity"
import { Box, Typography } from "@mui/material"
import { useMobileCheck } from "../../utils/isMobilView"
import { ImageProps, RichTextItems, singleContentInterface } from "../types"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"

import {
  LogoImageContentBox,
  SingleContentTitleBox,
  ImageAssetWrapperBox,
  CardWithTitleTabsWrapper,
  CardWithTitleTabsTypography,
  CardWithDescriptionTabsWrapper,
  CardWithImageTitleTabsComponentBox,
} from "./styles/card-with-two-secondary-cta"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
interface cardWithImageTitleTabsComponentProps {
  _type: string
  title: string
  urlType: string
  variant: string
  logo: ImageProps
  image?: ImageProps
  description?: string
  parentProps?: { index: number; isCustomOddIndex: boolean }
  largeVariant: string
  largeImage?: ImageProps
  content: RichTextItems[]
  alignmentVariant: string
  isComponentFullWidth: boolean
  showBulletForSubTitle: boolean
  singleContent: singleContentInterface[]
}
const CardWithImageTitleTabsComponent = ({
  logo,
  image,
  title,
  content,
  variant,
  largeImage,
  description,
  largeVariant,
  parentProps,
}: cardWithImageTitleTabsComponentProps) => {
  const isMobile = useMobileCheck()
  const Context = useContext(IHCLContext)
  return (
    <>
      <CardWithImageTitleTabsComponentBox aria-label={isMobile ? variant : largeVariant} $isMobile={isMobile}>
        {logo?.asset?._ref && (
          <LogoImageContentBox>
            <Box alt={logo?.altText || `-img`} component={"img"} src={urlFor(logo?.asset?._ref).url()} />
          </LogoImageContentBox>
        )}
        {image?.asset?._ref && largeImage?.asset?._ref && (
          <ImageAssetWrapperBox>
            <Box
              alt="media"
              component="img"
              src={urlFor(isMobile ? image?.asset?._ref : largeImage?.asset?._ref).url()}
            />
          </ImageAssetWrapperBox>
        )}
        {content && (
          <SingleContentTitleBox
            sx={{
              "& div h3": {
                fontSize: isMobile ? MobilePxToVw(18) : DesktopPxToVw(18),
                fontFamily: "inter",
                fontWeight: 300,
              },
            }}>
            {content?.map((item: RichTextItems, index: number) => (
              <>
                {Context?.renderComponent(item._type, {
                  ...item,
                })}
              </>
            ))}
          </SingleContentTitleBox>
        )}
        {title && (
          <CardWithTitleTabsWrapper $isMobile={isMobile} $isCustomOddIndex={parentProps?.isCustomOddIndex}>
            <CardWithTitleTabsTypography variant={isMobile ? "m-heading-xs" : "heading-xs"}>
              {title}
            </CardWithTitleTabsTypography>
          </CardWithTitleTabsWrapper>
        )}
        {description && (
          <CardWithDescriptionTabsWrapper
            className="card-description"
            $isMobile={isMobile}
            $isCustomOddIndex={parentProps?.isCustomOddIndex}>
            <Typography variant={isMobile ? "m-body-s" : "body-s"} sx={{ textAlign: "center" }}>
              {description}
            </Typography>
          </CardWithDescriptionTabsWrapper>
        )}
      </CardWithImageTitleTabsComponentBox>
    </>
  )
}

export default CardWithImageTitleTabsComponent
