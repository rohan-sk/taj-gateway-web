import { Box } from "@mui/material"
import styled from "@emotion/styled"
import { theme } from "../../lib/theme"
import { transientProps } from "../transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../DesktopFontCalc"

export const MainContainer = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  height: "100vh",
  display: $isMobile ? "unset" : "flex",
  flexDirection: $isMobile ? "unset" : "column",
  justifyContent: $isMobile ? "unset" : "center",
  backgroundColor: $isMobile
    ? theme?.palette?.background?.default
    : theme?.palette?.background?.paper,
  padding: $isMobile
    ? 0
    : `${DesktopPxToVw(287)} ${DesktopPxToVw(487)} ${DesktopPxToVw(332)}`,
}))

export const ContentWrapper = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  backgroundColor: theme?.palette?.background?.default,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  height: $isMobile ? "100vh" : "unset",
  justifyContent: $isMobile ? "center" : "unset",
  gap: $isMobile ? MobilePxToVw(40) : DesktopPxToVw(24),
  boxShadow: $isMobile ? "unset" : "-6px 10px 24px 0px rgba(0, 0, 0, 0.10)",
  padding: $isMobile
    ? `0vw ${MobilePxToVw(82)}`
    : `${DesktopPxToVw(106)} ${DesktopPxToVw(73)} ${DesktopPxToVw(122)}`,
}))
