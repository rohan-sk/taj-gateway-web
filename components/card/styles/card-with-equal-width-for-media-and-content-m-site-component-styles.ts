import styled from "@emotion/styled"
import { Box } from "@mui/material"
import { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { transientProps } from "../../../utils/transientProps"
import { theme } from "../../../lib/theme"
import { SquareSharp } from "@mui/icons-material"

export const CardContentWrapper = styled(
  Box,
  transientProps,
)<{ $cardBackgroundColor: any }>(({ $cardBackgroundColor }) => ({
  marginTop: MobilePxToVw(-22),
  background: $cardBackgroundColor ? $cardBackgroundColor : theme?.palette?.ihclPalette?.hexOne,
  width: "96%",
  float: "right",
  padding: "5.469vw",
  position: "relative",
  marginBottom: "3.8vw",
  boxShadow: "-0.938vw 1.563vw 2.1vw 0vw rgba(0, 0, 0, 0.1)",
}))

export const HighlightsWrapper = styled(Box)(() => ({
  display: "flex",
  width: "100%",
  marginTop: MobilePxToVw(5),
  alignItems: "baseLine",
}))

export const SquareSharpWrapper = styled(
  SquareSharp,
  transientProps,
)<{ $textColor: any }>(({ $textColor }) => ({
  width: "1.875vw",
  height: "1.875vw",
  marginRight: "3.125vw",
  transform: "rotate(45deg)",
  color: $textColor ? $textColor : theme?.palette?.ihclPalette?.hexTwo,
}))
