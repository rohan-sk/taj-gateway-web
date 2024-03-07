import styled from "@emotion/styled"
import { theme } from "../../../lib/theme"
import { Box, Typography } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const MediaWrapperContentBox = styled(
  Box,
  transientProps,
)<{
  $isMobile: boolean
}>(({ $isMobile }) => ({
  display: "flex",
  flexWrap: $isMobile ? "wrap" : "nowrap",
  gap: $isMobile ? MobilePxToVw(55) : DesktopPxToVw(163),
}))

export const ContentWrapperBox = styled(
  Box,
  transientProps,
)<{
  $isMobile: boolean
  $justifyContent?: any
  $leftMedia?: boolean
}>(({ $isMobile, $justifyContent, $leftMedia }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: $justifyContent ? "flex-start" : "center",
  gap: $isMobile
    ? $leftMedia
      ? MobilePxToVw(20)
      : MobilePxToVw(35)
    : $leftMedia
    ? DesktopPxToVw(20)
    : DesktopPxToVw(40),
  width: "100%",
}))

export const ContentTitleTypography = styled(
  Typography,
  transientProps,
)<{
  $isMobile: boolean
  $isHeroTitleFont?: boolean
  $textColor?: any
  component?: React.ElementType
}>(({ $isMobile, $isHeroTitleFont, $textColor }) => ({
  paddingTop: DesktopPxToVw(100),
  "&:before": {
    content: '""',
    display: "inline-block",
    verticalAlign: "middle",
    width: $isMobile ? "6.25vw" : $isHeroTitleFont ? DesktopPxToVw(80) : DesktopPxToVw(40),
    backgroundColor: $textColor ? $textColor : theme?.palette?.ihclPalette?.hexSeventeen,
    borderBottom: $textColor ? `1px solid ${$textColor}` : `1px solid ${theme?.palette?.ihclPalette?.hexSeventeen}`,
  },
  ":not(:empty)::before ": {
    marginRight: $isMobile
      ? $isHeroTitleFont
        ? MobilePxToVw(40)
        : MobilePxToVw(20)
      : $isHeroTitleFont
      ? DesktopPxToVw(40)
      : DesktopPxToVw(20),
  },
}))

export const ActionWrapperButtonContainer = styled(
  Box,
  transientProps,
)<{
  $isMobile: boolean
}>(({ $isMobile }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: $isMobile ? "row-reverse" : "row",
}))

export const ButtonsCTAContainer = styled(
  Box,
  transientProps,
)<{
  $isMobile: boolean
  $isSingleCTA: boolean
  $leftMedia?: boolean
}>(({ $isMobile, $isSingleCTA, $leftMedia }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: $isMobile ? ($isSingleCTA ? "row" : "row-reverse") : "row",
  marginTop: $isMobile ? ($leftMedia ? MobilePxToVw(16) : 0) : 0,
}))

export const ActionButtonsContainer = styled(
  Box,
  transientProps,
)<{
  $isMobile: boolean
}>(({ $isMobile }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: $isMobile ? "row-reverse" : "row",
  gap: $isMobile ? MobilePxToVw(20) : DesktopPxToVw(20),
  justifyContent: $isMobile ? "space-between" : "unset",
  width: $isMobile ? "-webkit-fill-available" : "unset",
}))

export const ActionButtonsWrapper = styled(
  Box,
  transientProps,
)<{
  $isMobile: boolean
  $isSinglePrimary: boolean
  $isFromCarousal: boolean
}>(({ $isMobile, $isSinglePrimary, $isFromCarousal }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: $isMobile && !$isFromCarousal ? "row-reverse" : "row",
  gap: $isMobile ? MobilePxToVw(20) : DesktopPxToVw(20),
  justifyContent: $isMobile ? ($isSinglePrimary ? "center" : "space-between") : "unset",
  width: $isMobile ? "-webkit-fill-available" : "unset",
}))

export const ParameterMapWrapperContainer = styled(
  Box,
  transientProps,
)<{
  $isMobile: boolean
}>(({ $isMobile }) => ({
  gap: $isMobile ? MobilePxToVw(27) : DesktopPxToVw(27),
  display: "flex",
  flexDirection: "column",
}))

export const ImageActionWrapperBox = styled(
  Box,
  transientProps,
)<{
  $isMobile: boolean
}>(({ $isMobile }) => ({
  display: "flex",
  gap: $isMobile ? "5.156vw" : "2.083vw",
}))

export const MainMediaWrapperContentBox = styled(
  Box,
  transientProps,
)<{
  $isMobile: boolean
}>(({ $isMobile }) => ({
  display: "flex",
  flexWrap: $isMobile ? "wrap" : "nowrap",
  gap: $isMobile ? MobilePxToVw(55) : DesktopPxToVw(124),
  alignItems: "flex-start",
}))
