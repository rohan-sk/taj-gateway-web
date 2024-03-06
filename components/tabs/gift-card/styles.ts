import { theme } from "../../../lib/theme"
import { transientProps } from "../../../utils/transientProps"
import { Box, Divider, Tab, Tabs, styled } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const CustomTab = styled(Tab)(() => ({
  fontSize: "0.94vw",
  fontWeight: 300,
  padding: `0vw ${DesktopPxToVw(0)} ${DesktopPxToVw(25)} !important`,
  margin: `0vw ${DesktopPxToVw(52)} !important`,
  whiteSpace: "nowrap",
  color: theme?.palette?.text?.primary,
  "@media (max-width: 640px)": {
    fontSize: "2.8vw !important",
    whiteSpace: "nowrap",
    padding: `0vw ${MobilePxToVw(0)} ${MobilePxToVw(25)} !important`,
    minWidth: MobilePxToVw(90),
  },
}))

export const MainBoxWrapper = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "& .MuiTabs-flexContainer ": {
    justifyContent: "center",
  },
}))

export const CustomTabDivider = styled(
  Divider,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  bottom: 0,
  width: "100%",
  position: "absolute",
  backgroundColor: theme?.palette?.neuPalette?.rgbaOne,
  height: $isMobile ? MobilePxToVw(2.8) : DesktopPxToVw(2.8),
}))

export const CustomTabsContentWrapper = styled(
  Tabs,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  width: $isMobile ? "100%" : "unset",
  justifyContent: `space-between !important`,
  "& .MuiTab-root.Mui-selected": {
    color: theme?.palette?.neuPalette?.hexTwo,
  },
  ".MuiTabs-indicator": {
    height: $isMobile ? MobilePxToVw(2.8) : DesktopPxToVw(2.8),
  },
}))

export const ManageGiftCardTabContentWrapper = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  overflowY: "auto",
  maxHeight: $isMobile ? "60vh" : "55vh",
  "::-webkit-scrollbar": {
    display: "none",
  },
}))
