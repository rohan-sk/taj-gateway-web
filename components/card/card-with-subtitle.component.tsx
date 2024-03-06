import { Typography, Box } from "@mui/material"
import { urlFor } from "../../lib-sanity"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import { ImageProps } from "../types"

type CardWithSubTitleProps = {
  largeImage: ImageProps
  title: string
}

export const CardWithSubTitle = ({ largeImage, title }: CardWithSubTitleProps) => {
  return (
    <Box>
      <Box
        alt={largeImage?.altText || `-img`}
        width={"100%"}
        height={"100%"}
        component={"img"}
        src={largeImage?.asset?._ref && urlFor(largeImage?.asset?._ref).url()}
      />
      <Typography variant="heading-xs" sx={{ pt: DesktopPxToVw(28) }}>
        {title}
      </Typography>
    </Box>
  )
}
