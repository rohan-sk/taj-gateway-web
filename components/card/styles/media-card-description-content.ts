import styled from "@emotion/styled"
import { Box } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { theme } from "../../../lib/theme"

export const MediaDescriptionWrapper = styled(
  Box,
  transientProps,
)<{
  $isMobile: boolean
}>(({ $isMobile }) => ({
  display: "flex",
  overflowY: "auto",
  alignItems: "center",
  flexDirection: "column",
  backgroundColor: theme?.palette?.neuPalette?.hexOne,
  maxHeight: $isMobile ? "unset" : DesktopPxToVw(515),
  margin: $isMobile ? "unset" : `0 ${DesktopPxToVw(480)}`,
  padding: $isMobile
    ? `${MobilePxToVw(50)} ${MobilePxToVw(82)} 0`
    : `${DesktopPxToVw(47)} ${DesktopPxToVw(40)} ${DesktopPxToVw(40)}`,
}))
