import React from "react"
import { Box, Typography } from "@mui/material"
import { useMobileCheck } from "../../utils/isMobilView"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { MediaDescriptionWrapper } from "./styles/media-card-description-content"
import PortableTextReadMore from "../hoc/PortableTextReadMore"

interface MediaWithDescriptionContentComponentProps {
  title: string
  description: string
  enrichedDescription?: any
}
const MediaCardDescriptionContent = ({
  title,
  description,
  enrichedDescription,
}: MediaWithDescriptionContentComponentProps) => {
  const isMobile = useMobileCheck()
  return (
    <MediaDescriptionWrapper $isMobile={isMobile}>
      {title && (
        <Typography textAlign={"center"} component={"div"} variant={isMobile ? "m-heading-s" : "heading-xs"}>
          {title}
        </Typography>
      )}
      {description && (
        <Typography
          component={"div"}
          textAlign={"justify"}
          variant={isMobile ? "m-body-sxl" : "body-s"}
          mt={isMobile ? MobilePxToVw(20) : DesktopPxToVw(20)}>
          {description}
        </Typography>
      )}
      {enrichedDescription && (
        <Box textAlign={"justify"} mt={isMobile ? MobilePxToVw(20) : DesktopPxToVw(20)}>
          <PortableTextReadMore variant={isMobile ? "m-body-sxl" : "body-s"}>
            {enrichedDescription}
          </PortableTextReadMore>
        </Box>
      )}
    </MediaDescriptionWrapper>
  )
}

export default MediaCardDescriptionContent
