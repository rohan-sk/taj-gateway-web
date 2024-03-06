import { styled } from "@mui/system"
import { theme } from "../../../lib/theme"
import { Box, Divider } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const HotelDataCardContentBox = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  width: "97%",
  background: theme?.palette?.neuPalette?.hexOne,
  top: $isMobile ? "-7.5vw" : "-2.656vw",
  float: "right",
  display: "flex",
  position: "relative",
  alignSelf: "flex-end",
  flexDirection: "column",
  padding: $isMobile ? "5.469vw" : "1.146vw 2.083vw 1.406vw 1.563vw", // this padding took from global template for m-site
  boxShadow: "-0.313vw 0.521vw 1.25vw rgba(0, 0, 0, 0.1)",
}))

export const HorizontalDividerLine = styled(
  Divider,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  opacity: 0.4,
  margin: $isMobile ? "2.656vw 0vw" : "0.781vw 0vw",
  background: theme?.palette?.neuPalette?.hexTwelve,
}))

export const ActionButtonsWrappingBox = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  marginTop: $isMobile ? "8.594vw" : "1.146vw",
  flexDirection: $isMobile ? "row-reverse" : "row",
  alignItems: "center",
  justifyContent: "space-between",
}))

export const ActionItemsBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: "space-between",
  flexDirection: 'row',
  marginTop: DesktopPxToVw(24),
  minHeight: DesktopPxToVw(61),
  '@media (max-width:640px)': {
    flexDirection: 'row-reverse',
    marginTop: MobilePxToVw(24),
    minHeight: MobilePxToVw(61)
  }
}))
