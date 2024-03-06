import { theme } from "../../../lib/theme"
import { Box, styled, Typography } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const ContentBox = styled(
  Box,
  transientProps
)<{ $isActionAvailable?: boolean }>(({ $isActionAvailable }) => ({
  width: "96%",
  position: "relative",
  float: "right",
  marginTop: MobilePxToVw(-50),
  background: theme?.palette?.neuPalette?.hexOne,
  boxShadow: "-6px 10px 24px 0px rgba(0, 0, 0, 0.1)",
  padding: "5.469vw", // this padding took from global template
  "@media (max-width:640px)": {
    boxShadow: "-0.938vw 1.563vw 2.1vw 0vw rgba(0, 0, 0, 0.1)",
    marginBottom: "3.8vw",
    marginRight: "-0.1vw",
  },
}))
export const ActionBoxWrapper = styled(Box)(() => ({
  display: "flex",
  marginTop: "7.34vw",
  justifyContent: "space-between",
  "@media (max-width: 640px)": {
    marginTop: MobilePxToVw(33),
  },
}))

export const ChipTextTextMainBox = styled(Box)(() => ({
  display: "flex",
  marginBottom: "4.80vw",
  gap: "2.34vw",
}))

export const ChipTextTextBox = styled(Box)(() => ({
  padding: "1.25vw 2.5vw",
  border: `${DesktopPxToVw(1)} solid ${theme?.palette?.neuPalette?.hexTwo}`,
}))

export const HighlightTextBox = styled(Box)(() => ({
  display: "flex",
  marginTop: "3.1vw",
  alignItems: "baseLine",
  "@media (max-width:640px)": {
    width: "100%",
  },
}))

export const RichTextBox = styled(Box)(() => ({
  display: "flex",
  marginTop: DesktopPxToVw(1),
  color: theme?.palette?.text?.primary,
}))

export const RichTextValueTypo = styled(Typography)(() => ({
  fontWeight: 700,
  marginLeft: DesktopPxToVw(1),
}))

export const MarginTopBox = styled(Box)(() => ({
  marginTop: "2.34vw",
  "@media (max-width:640px)": {
    marginTop: MobilePxToVw(35),
  },
}))
export const FullWidthBox = styled(Box)(() => ({
  width: "100%",
}))

export const ActionBox = styled(Box)(() => ({
  display: "flex",
  marginTop: "7.34vw",
  justifyContent: "space-between",
  "@media (max-width: 640px)": {
    marginTop: "4.219vw",
  },
}))

export const FlexDirectionColumnBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}))

export const ActionItemsMainBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  // flexDirection: "column",
}))

export const ActionItemsInnerBox = styled(Box)(() => ({
  width: "100%",
  // display: "flex",
  // justifyContent: "center",
}))

export const RightAlignedTitleBox = styled(
  Box,
  transientProps
)<{ $isMobile: boolean; $ctaLabel: string }>(({ $isMobile, $ctaLabel }) => ({
  position: "relative",
  marginBottom: $ctaLabel ? "6.2vw" : "",
}))

export const RightAlignedTitleCtaLinkBox = styled(
  Box,
  transientProps
)<{ $isMobile: boolean; $ctaLabel: boolean }>(({ $isMobile, $ctaLabel }) => ({
  position: "relative",
  marginTop: $isMobile ? MobilePxToVw(-56) : DesktopPxToVw(-52),
  float: "right",
  width: $isMobile ? "80%" : "95%",
  boxShadow: `-0.3vw 0.52vw 1.25vw rgba(0, 0, 0, 0.1)`,
  background: theme?.palette?.background?.default,
  padding: $isMobile
    ? "5.31vw 5.46vw"
    : $ctaLabel
    ? "1.250vw 1.354vw 0.885vw 1.354vw"
    : "1.406vw 1.406vw 0.990vw 1.406vw",
  marginBottom: MobilePxToVw(15),
}))

export const BothActionButtonsWrapperBox = styled(Box)(() => ({
  display: "flex",
  gap: "2.813vw",
}))

export const ParameterMapWrappingBox = styled(Box)(() => ({
  display: "flex",
  marginTop: "2.813vw",
}))

export const MarginTopDescriptionBox = styled(
  Box,
  transientProps
)<{ $haveHighlights?: boolean }>(({ $haveHighlights }) => ({
  marginTop: "2.34vw",
  "@media (max-width:640px)": {
    marginTop: MobilePxToVw($haveHighlights ? 10 : 15),
  },
}))
