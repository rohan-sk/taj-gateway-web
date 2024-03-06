import React from "react"
import { theme } from "../../lib/theme"
import { Stack, Typography } from "@mui/material"
import { useMobileCheck } from "../../utils/isMobilView"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import {
  HighlightsBox,
  HighlightContainer,
  DescriptionContainer,
  HighlightsBulletIcon,
  HighlightsDescriptionTypo,
} from "./styles/card-with-highlights-styles"
type CardWithHighlightsProps = {
  _type: string
  urlType: string
  variant: string
  highlights: any
  description: string
  largeVariant: string
  alignmentVariant: string
  isMultiBlockContent: boolean
}

const CardWithHighlights = ({ variant, highlights, description, largeVariant }: any) => {
  const isMobile = useMobileCheck()
  return (
    <HighlightsBox aria-label={isMobile ? variant : largeVariant}>
      {(highlights || description) && (
        <Stack flexDirection="column" rowGap={isMobile ? MobilePxToVw(10) : DesktopPxToVw(21)}>
          {highlights &&
            highlights?.map((item: any, index: number) => (
              <HighlightContainer className="hide-box highlights" key={index}>
                <HighlightsBulletIcon />
                <Typography
                  variant={isMobile ? "m-heading-xs" : "heading-xs"}
                  sx={{
                    color: theme?.palette?.ihclPalette?.hexSeventeen,
                  }}>
                  {typeof item === typeof "" ? item : item?.term}
                </Typography>
              </HighlightContainer>
            ))}
          {description && (
            <DescriptionContainer>
              <HighlightsDescriptionTypo variant={isMobile ? "m-body-sl" : "body-ml"}>
                {description}
              </HighlightsDescriptionTypo>
            </DescriptionContainer>
          )}
        </Stack>
      )}
    </HighlightsBox>
  )
}

export default CardWithHighlights
