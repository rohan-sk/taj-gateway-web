import { ImageProps } from "../types"
import { theme } from "../../lib/theme"
import { urlFor } from "../../lib-sanity"
import { Box, Typography } from "@mui/material"
import { CardBox, CustomDivider } from "./styles/card-with-img-content"
import { CardWithImgContentBox } from "./styles/card-with-img-content-styles"
interface cardWithImgContentProps {
  title: string
  _type: string
  urlType: string
  mediaType: string
  parentProps?: any
  description: string
  largeVariant: string
  largeImage: ImageProps
  charactersLimit: number
  alignmentVariant: string
}

const CardWithImgContent = ({
  title,
  largeImage,
  parentProps,
  description,
  alignmentVariant,
}: cardWithImgContentProps) => {
  const hyphenTitle = alignmentVariant === "preceding-hyphen-title"
  return (
    <CardWithImgContentBox $parentProps={parentProps}>
      {largeImage?.asset?._ref && (
        <Box
          alt={largeImage?.altText || "media"}
          component={"img"}
          width={"100%"}
          sx={{
            objectFit: "contain",
          }}
          src={urlFor(largeImage?.asset?._ref).url()}
        />
      )}
      {(title || description) && (
        <Box>
          {title && (
            <CardBox>
              {hyphenTitle && <CustomDivider />}
              <Typography variant="heading-m" sx={{ color: theme?.palette?.ihclPalette?.hexOne }}>
                {title}
              </Typography>
            </CardBox>
          )}
          {description && (
            <Box mb={"4.167vw"}>
              <Typography variant="body-ml" sx={{ color: theme?.palette?.ihclPalette?.hexOne }}>
                {description}
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </CardWithImgContentBox>
  )
}

export default CardWithImgContent
