import { CardMedia, Grid, styled, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { theme } from "../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { transientProps } from "../../../utils/transientProps"

export const PreviewContainer = styled(Box)(() => ({
  backgroundColor: theme.palette?.neuPalette?.hexOne,
}))

export const MessageBox = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  position: "absolute",
  top: 0,
  padding: $isMobile
    ? `${MobilePxToVw(42)} ${MobilePxToVw(43)} ${MobilePxToVw(
        34
      )} ${MobilePxToVw(39)}`
    : "2.34vw 2.39vw 2.03vw 2.18vw",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
}))
export const SenderBox = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  position: "absolute",
  bottom: $isMobile ? MobilePxToVw(34) : DesktopPxToVw(39),
  right: $isMobile ? MobilePxToVw(43) : DesktopPxToVw(46),
}))

export const CardBox = styled(
  Grid,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  gap: $isMobile ? MobilePxToVw(30) : "2.05vw",
  justifyContent: "center",
}))

export const CtaActionTypography = styled(Typography)(() => ({
  display: "flex",
  alignItems: "center",
  color: theme?.palette?.neuPalette?.hexTwo,
}))

export const CustomMessage = styled(Box)(() => ({
  minHeight: "28vh",
  paddingTop: "2.12vw",
}))
export const PurchaseDetailsContainer = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "2vw",
}))
