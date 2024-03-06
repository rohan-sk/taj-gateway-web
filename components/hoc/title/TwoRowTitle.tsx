import React from "react"
import styled from "@emotion/styled"
import { Typography } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"
import { theme } from "../../../lib/theme"

export const ComponentTitle = styled(
  Typography,
  transientProps
)<{
  $color: any
  $givenWidth: any
  $fontSize?: string
  $isMobile?: boolean
  $lineHeight?: string
  $dividerWidth?: string
  component?: React.ElementType
}>(({ $color, $givenWidth, $fontSize, $dividerWidth, $lineHeight, $isMobile }) => ({
  margin: "0",
  color: $color,
  textAlign: "left",
  fontWeight: "400",
  alignItems: "flex-start",
  letterSpacing: "-0.05em",
  fontFamily: theme?.palette?.font?.primaryFontFamily,
  width: $isMobile ? "90%" : $givenWidth ?? "27.6vw",
  lineHeight: $lineHeight ?? "120%",
  fontSize: $isMobile ? "7.5vw" : $fontSize ?? "3.23vw",
  "&:before": {
    content: '""',
    display: "inline-block",
    verticalAlign: "middle",
    width: $isMobile ? "6.25vw" : $dividerWidth ?? "4.166vw",
    borderBottom: `1px solid ${$color}`,
  },
  ":not(:empty)::before ": {
    marginRight: "2.083vw",
  },
}))

const TwoRowTitle = ({
  title,
  color,
  width,
  fontSize,
  dividerWidth,
  isMobile,
  lineHeight,
  mobileFontSize,
  headingElementForCard
}: any) => {
  return (
    <ComponentTitle
      component={headingElementForCard || "h3"}
      $color={color}
      $givenWidth={width}
      $fontSize={fontSize}
      $isMobile={isMobile}
      $lineHeight={lineHeight}
      $dividerWidth={dividerWidth}>
      {title}
    </ComponentTitle>
  )
}

export default TwoRowTitle
