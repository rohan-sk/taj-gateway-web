import { theme } from "../../../lib/theme"
import { Box, Divider, Tab, Tabs, styled } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const MainContentWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  padding: $isMobile ? 0 : `0vw ${DesktopPxToVw(130)}`,
}))

export const MainContentTitleWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: $isMobile ? MobilePxToVw(20) : DesktopPxToVw(20),
  marginBottom: $isMobile ? MobilePxToVw(40) : DesktopPxToVw(40),
}))

export const MainContentTabsWrapper = styled(
  Tabs,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  width: $isMobile ? MobilePxToVw(460) : DesktopPxToVw(460),
  marginBottom: $isMobile ? MobilePxToVw(60) : DesktopPxToVw(45),
  "& .MuiTabs-flexContainer": {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
}))

export const TabsHorizontalBar = styled(Divider)(() => ({
  bottom: 0,
  width: "100%",
  position: "absolute",
  ".MuiDivider-root": {
    width: "100%",
  },
  backgroundColor: theme?.palette?.ihclPalette?.rgbaOne,
  height: DesktopPxToVw(2.8),
  "@media (max-width: 640px)": {
    height: MobilePxToVw(2.8),
  },
}))

export const MainContentTabContainer = styled(
  Tab,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  opacity: 1,
  fontWeight: 500,
  lineHeight: "150%",
  fontFamily: "Inter",
  fontSize: $isMobile ? MobilePxToVw(18) : DesktopPxToVw(18),
  padding: $isMobile ? `0vw ${MobilePxToVw(20)} ${MobilePxToVw(25)}` : `0vw ${DesktopPxToVw(20)} ${DesktopPxToVw(25)}`,
}))

export const SubtitleContentWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  alignItems: "center",
  columnGap: $isMobile ? "unset" : DesktopPxToVw(7),
}))
