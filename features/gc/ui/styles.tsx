import styled from "@emotion/styled"
import { Box } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { transientProps } from "../../../utils/transientProps"

export const RenderActionButtonBox = styled(
  Box,
  transientProps
)<{ $isMobile?: boolean }>(({ $isMobile }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: $isMobile ? MobilePxToVw(55) : DesktopPxToVw(80),
}))

export const PortableTextBox = styled(
  Box,
  transientProps
)<{ $isMobile?: boolean }>(({ $isMobile }) => ({
  padding: `0vw ${DesktopPxToVw(80)}`,
  textAlign: "center",
  marginTop: $isMobile ? MobilePxToVw(55) : DesktopPxToVw(80),
}))
