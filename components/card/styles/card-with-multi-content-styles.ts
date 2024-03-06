import { Box, Typography, styled } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { theme } from "../../../lib/theme"

export const BlogContentText = styled(
  Typography,
  transientProps
)<{ $isMobile: boolean, $isHeadingElement: boolean, $isFirstItem: any }>(
  ({ $isMobile, $isHeadingElement, $isFirstItem }) => ({
    lineHeight: $isHeadingElement ? $isMobile ? `${MobilePxToVw(33.6)}` : DesktopPxToVw(33.6) : "140%",
    textAlign: "center",
    paddingTop: $isFirstItem ? '0vw' : $isMobile ? `${MobilePxToVw(40)}` : `${DesktopPxToVw(40)}`,
    paddingLeft: $isMobile ? `${MobilePxToVw(83)}` : "0",
    paddingRight: $isMobile ? `${MobilePxToVw(83)}` : "0",
  })
)

export const BlogBlockContent = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  paddingLeft: $isMobile ? `${MobilePxToVw(83)}` : "0",
  paddingRight: $isMobile ? `${MobilePxToVw(83)}` : "0",
  "& p": {
    fontSize: $isMobile ? `${MobilePxToVw(22)}` : `${DesktopPxToVw(22)}`,
    fontStyle: "normal",
    fontWeight: 300,
    color: theme.palette.neuPalette.hexSeventeen,
    lineHeight: "140%",
    textAlign: $isMobile ? "center" : "initial",
    "&>a": {
      color: theme.palette.neuPalette.hexTwo,
    },
  },
}))
