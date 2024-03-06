import { Box } from "@mui/material"
import styled from "@emotion/styled"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const MainContainer = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexDirection: "column",
  gap: $isMobile ? MobilePxToVw(40) : DesktopPxToVw(40),
}))

export const ActionPropsWrapper = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: $isMobile ? "column" : "row",
  gap: $isMobile ? MobilePxToVw(40) : DesktopPxToVw(20),
}))

export const ShareIconsContentWrapper = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: $isMobile ? MobilePxToVw(20) : DesktopPxToVw(20),
}))
