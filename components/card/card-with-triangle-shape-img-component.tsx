import React from "react"
import { theme } from "../../lib/theme"
import { urlFor } from "../../lib-sanity"
import { Box, Typography } from "@mui/material"
import { ImageProps, aestheticItems } from "../types"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { MainWrapper, ContentWrapper } from "./styles/card-with-triangle-shapeImg-component-style"
interface cardWithTriangleShapeImgComponentProps {
  _key: string
  title: string
  _type: string
  metadata: any
  variant: string
  urlType: string
  subTitle: string
  mediaType: string
  image: ImageProps
  description: string
  largeVariant: string
  parentProps?: number
  largeImage: ImageProps
  aesthetic: aestheticItems
  isMultiBlockContent: boolean
}
function CardWithTriangleShapeImgComponent({
  largeImage,
  parentProps,
  title,
  subTitle,
  aesthetic,
}: cardWithTriangleShapeImgComponentProps) {
  const { textColor } = useAesthetics(aesthetic?._ref)
  return (
    <MainWrapper $even={((parentProps || 0) + 1) % 2 === 0} $parentProps={parentProps === 3 || parentProps === 2}>
      {largeImage?.asset?._ref && (
        <Box>
          <Box
            alt={largeImage?.altText || "-image"}
            component={"img"}
            width={"100%"}
            height={"26.082vw"}
            src={urlFor(largeImage?.asset?._ref).url()}
          />
        </Box>
      )}
      <ContentWrapper sx={{ textAlign: "center" }}>
        {title && (
          <Box>
            <Typography
              variant="heading-s"
              sx={{
                color: textColor ? textColor : theme?.palette?.ihclPalette?.hexSeventeen,
              }}>
              {title}
            </Typography>
          </Box>
        )}
        {subTitle && (
          <Box>
            <Typography
              variant="body-xxs"
              sx={{
                color: textColor ? textColor : theme?.palette?.ihclPalette?.hexSeventeen,
              }}>
              {subTitle}
            </Typography>
          </Box>
        )}
      </ContentWrapper>
    </MainWrapper>
  )
}

export default CardWithTriangleShapeImgComponent
