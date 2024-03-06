import { theme } from "../../../lib/theme"
import { SquareSharp } from "@mui/icons-material"
import DesktopPxToVw from "../../../utils/DesktopFontCalc"
import { styled, Stack, Box, Typography } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"


export const ContentStack = styled(Stack)(() => ({
  height: "100%",
  padding: "0vw 4.271vw",
  justifyContent: "center",
  background: theme.palette.background.default,
}))

export const RichTextBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  minHeight: `${DesktopPxToVw(92)}`,
  paddingTop: `${DesktopPxToVw(26)}`,
}))


export const RichTextValueTypography = styled(
  Typography,
  transientProps
)<{
  $highlightColor?: boolean | undefined
}>(({ $highlightColor }) => ({
  fontWeight: "300",
  fontSize: "1.146vw",
  paddingLeft: "1.08vw",
  color: $highlightColor
    ? theme?.palette?.neuPalette?.hexTwo
    : theme?.palette?.text?.primary,
  "@media (max-width: 640px)": {
    marginTop: "1vw",
    paddingLeft: "0.8vw",
  },
}))


export const HighlightsWrapper = styled(Box)(() => ({
  display: "flex",
  marginTop: DesktopPxToVw(5),
  alignItems: "baseLine",
}))

export const SquareSharpWrapper = styled(
  SquareSharp,
  transientProps
)<{ $textColor: any }>(({ $textColor }) => ({
  color: $textColor ? $textColor : theme?.palette?.neuPalette?.hexTwo,
  width: "0.625vw",
  height: "0.625vw",
  marginRight: "0.45vw",
  transform: "rotate(45deg)",
}))

export const DescriptionContentWrapper:any = styled(
  Typography,
  transientProps
)<{ $textColor: any }>(({ $textColor }) => ({
  marginTop: DesktopPxToVw(20),
  color: $textColor ? $textColor : theme?.palette?.neuPalette?.hexSeventeen,
}))
