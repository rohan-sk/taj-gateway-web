import { ImageProps } from "../types"
import React, { useState, useEffect, useRef } from "react"
import { theme } from "../../lib/theme"
import dynamic from "next/dynamic"
import { CONSTANTS } from "../constants"
import { urlFor } from "../../lib-sanity"
import { Box, CardMedia, Typography } from "@mui/material"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { ImageCard } from "./styles/card-with-right-aligned-content"
import {
  CardTitleTypography,
  CardContentWrappingBox,
  CardSubTitleTypography,
} from "./styles/card-with-border-line-content-component.styles"
const CustomReadMore = dynamic(() => import("../hoc/CustomReadMore"))

interface CardWithBorderLineContentProps {
  _key: string
  _type: string
  title: string
  urlType: string
  variant: string
  aesthetic?: any
  subTitle: string
  mediaType: string
  image: ImageProps
  parentProps: number
  description: string
  largeVariant: string
  charactersLimit?: number
  leftOrRightImage: boolean
  maxheight: any
  setTitleHeight: Function
  setSubTitleHeight: Function
  subTitleMaxHeight: any
}
const CardWithBorderLineContentComponent = ({
  image,
  title,
  subTitle,
  aesthetic,
  description,
  charactersLimit,
  maxheight,
  setTitleHeight,
  setSubTitleHeight,
  subTitleMaxHeight,
}: CardWithBorderLineContentProps) => {
  const [more, setMore] = useState<number>(
    charactersLimit ? charactersLimit : CONSTANTS?.ITEM_DESCRIPTION_CHARACTER_LIMIT,
  )
  const { textColor } = useAesthetics(aesthetic?._ref)
  const titleElementRef = useRef<HTMLElement | null>(null)
  const titleHeight = titleElementRef?.current?.getBoundingClientRect()?.height
  const subTitleElementRef = useRef<HTMLElement | null>(null)
  const subTitleHeight = subTitleElementRef?.current?.getBoundingClientRect()?.height || 0

  useEffect(() => {
    if (setTitleHeight && titleHeight && maxheight < titleHeight) {
      setTitleHeight(titleHeight)
    }
  }, [maxheight, setTitleHeight, titleHeight])

  useEffect(() => {
    if (setSubTitleHeight && subTitleMaxHeight && subTitleMaxHeight < subTitleHeight) {
      setSubTitleHeight(subTitleHeight)
    }
  }, [subTitleMaxHeight, setSubTitleHeight, subTitleHeight])

  return (
    <Box sx={{ border: `1px solid ${theme?.palette?.ihclPalette?.hexOne}` }}>
      {image?.asset?._ref && (
        <ImageCard>
          <CardMedia
            alt={image?.altText || "media"}
            component="img"
            width={"100%"}
            height={"100%"}
            src={urlFor(image?.asset?._ref)?.url()}
          />
        </ImageCard>
      )}
      <CardContentWrappingBox>
        {title && (
          <Box ref={titleElementRef}>
            <CardTitleTypography variant="m-heading-s" $fontColor={textColor}>
              {title}
            </CardTitleTypography>
          </Box>
        )}
        {subTitle && (
          <Box mt={"5.469vw"} ref={subTitleElementRef} sx={{ height: maxheight ? maxheight : "auto" }}>
            <CardSubTitleTypography variant="m-body-sxl" $fontColor={textColor}>
              {subTitle}
            </CardSubTitleTypography>
          </Box>
        )}
        {description && (
          <Box mt={"5.469vw"}>
            <Typography
              variant="m-body-l"
              sx={{
                color: textColor ? textColor : theme?.palette?.ihclPalette?.hexSeventeen,
              }}>
              {description.length > more ? (
                <CustomReadMore
                  length={more}
                  variant={"m-body-ml"}
                  customReadMoreColor={textColor ? textColor : theme?.palette?.ihclPalette?.hexTwo}
                  textStyles={{
                    color: textColor ? textColor : theme?.palette?.ihclPalette?.hexSeventeen,
                  }}>
                  {description}
                </CustomReadMore>
              ) : (
                description
              )}
            </Typography>
          </Box>
        )}
      </CardContentWrappingBox>
    </Box>
  )
}

export default CardWithBorderLineContentComponent
