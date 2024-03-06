import { theme } from "../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { Box, Divider, Tab, Tabs, styled } from "@mui/material"

export const ManageGiftCardsWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "row",
  marginBottom: DesktopPxToVw(35),
  "@media (max-width: 640px)": {
    flexDirection: "column",
    marginBottom: MobilePxToVw(0),
  },
}))

export const VerticalTabsDivider = styled(Divider)(() => ({
  margin: `${DesktopPxToVw(20)} ${DesktopPxToVw(20)}`,
  backgroundColor: theme?.palette?.ihclPalette?.hexTwelve,
  height: DesktopPxToVw(30),
  "@media (max-width: 640px)": {
    margin: `${MobilePxToVw(30)} ${MobilePxToVw(16)}`,
    height: MobilePxToVw(30),
  },
}))

export const ManageGiftCardsTabsWrapper = styled(Tabs)(() => ({
  display: "flex",
  flexDirection: "row",
  "& .MuiTabs-indicator": {
    display: "none",
  },
}))

export const GiftCardsTabContent = styled(Tab)(() => ({
  padding: 0,
  fontWeight: 300,
  lineHeight: "140%",
  fontFamily: "Inter",
  fontSize: DesktopPxToVw(22),
  minHeight: DesktopPxToVw(48),
  "@media (max-width: 640px)": {
    fontSize: MobilePxToVw(22),
    padding: `${MobilePxToVw(35)} 0vw`,
    minHeight: MobilePxToVw(48),
  },
}))

export const VerticalDivider = styled(Divider)(() => ({
  margin: `${DesktopPxToVw(20)} ${DesktopPxToVw(20)}`,
  backgroundColor: theme?.palette?.ihclPalette?.hexTwelve,
  height: DesktopPxToVw(30),
  "@media (max-width: 640px)": {
    margin: `${MobilePxToVw(30)} ${MobilePxToVw(20)}`,
    height: MobilePxToVw(30),
  },
}))
