import { urlFor } from "../../lib-sanity"
import { CONSTANTS } from "../constants"
import dynamic from "next/dynamic"
import { RichTextItems, parameterMapItems } from "../types"
import { ActionProps, ImageProps } from "../types"
import React, { useContext, useState } from "react"
import { useMobileCheck } from "../../utils/isMobilView"
import { Box, CardMedia, Typography } from "@mui/material"
import {
  ActionButtonsWrappingBox,
  HorizontalDividerLine,
  HotelDataCardContentBox,
} from "./styles/card-with-right-aligned-hotel-data-content.styles"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
const CustomReadMore = dynamic(() => import("../hoc/CustomReadMore"))
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))

interface CardWithRightAlignedHotelDataContentProps {
  url: string
  content: any
  _key: string
  title: string
  _type: string
  urlType: string
  variant: string
  ctaLabel: string
  image: ImageProps
  mediaType: string
  description: string
  parentProps: number
  largeVariant: string
  largeImage: ImageProps
  charactersLimit?: number
  primaryAction: ActionProps
  isMultiBlockContent: Boolean
  parameterMap: parameterMapItems[]
}
const CardWithRightAlignedHotelDataContent = ({
  url,
  title,
  content,
  urlType,
  ctaLabel,
  largeImage,
  description,
  parameterMap,
  primaryAction,
  charactersLimit,
}: CardWithRightAlignedHotelDataContentProps) => {
  const isMobile = useMobileCheck()
  const Context = useContext(IHCLContext)
  const [more, setMore] = useState<number>(charactersLimit ?? CONSTANTS?.ITEM_DESCRIPTION_CHARACTER_LIMIT)
  return (
    <Box>
      {largeImage?.asset?._ref && (
        <CardMedia alt={largeImage?.altText || "media"} component="img" src={urlFor(largeImage?.asset?._ref)?.url()} />
      )}
      <HotelDataCardContentBox $isMobile={isMobile}>
        {title && <Typography variant={isMobile ? "m-heading-xs" : "heading-xs"}>{title}</Typography>}
        {parameterMap && (
          <Box
            sx={{
              mt: parameterMap?.[0]?.key ? (isMobile ? "5.469vw" : "0.573vw") : "",
            }}>
            {parameterMap?.map((item: parameterMapItems, index: number) => (
              <Box key={index}>
                <Typography variant={isMobile ? "m-body-l" : "body-s"}>
                  {item?.key}
                  <b> {item?.value}</b>
                </Typography>
              </Box>
            ))}
          </Box>
        )}
        {description && (
          <Typography
            variant={isMobile ? "m-body-l" : "body-ml"}
            className="hide-box"
            mt={isMobile ? "5.469vw" : "0.573vw"}>
            {description.length > more ? (
              <CustomReadMore length={more} variant={isMobile ? "m-body-l" : "body-ml"}>
                {description}
              </CustomReadMore>
            ) : (
              description
            )}
          </Typography>
        )}
        <HorizontalDividerLine $isMobile={isMobile} />
        {content?.length > 0 && (
          <Box my={isMobile ? "1.875vw" : "0.521vw"}>
            {content?.map((item: RichTextItems, index: number) => (
              <>
                {Context?.renderComponent(item._type, {
                  ...item,
                })}
              </>
            ))}
          </Box>
        )}
        <ActionButtonsWrappingBox $isMobile={isMobile}>
          {primaryAction?.title && (
            <RenderActionItem
              url={primaryAction?.url}
              isActionButtonType={true}
              title={primaryAction?.title}
              variant={primaryAction?.variant}
              navigationType={primaryAction?.urlType}
              buttonStyles={{
                letterSpacing: "0.1em",
                lineHeight: "140%",
              }}
            />
          )}
          {ctaLabel && (
            <RenderActionItem
              url={url}
              title={ctaLabel}
              variant={"link-m"}
              navigationType={urlType}
              isActionButtonType={false}
            />
          )}
        </ActionButtonsWrappingBox>
      </HotelDataCardContentBox>
    </Box>
  )
}

export default CardWithRightAlignedHotelDataContent
