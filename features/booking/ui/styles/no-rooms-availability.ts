import styled from "@emotion/styled"
import { theme } from "../../../../lib/theme"
import { Box, Divider, Stack, Typography } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { transientProps } from "../../../../utils/transientProps"

export const MainStack = styled(Stack)(() => ({
  position: "relative",
  margin: "0 auto",
  height: DesktopPxToVw(767),
  width: DesktopPxToVw(1194),
  background: theme?.palette?.background?.default,
  "@media (max-width: 640px)": {
    width: "100%",
  },
}))

export const TitleStack = styled(Stack)(() => ({
  textAlign: "center",
  gap: DesktopPxToVw(20),
  margin: `${DesktopPxToVw(60)} 0`,
  "@media (max-width: 640px)": {
    gap: MobilePxToVw(25),
    margin: `0 0 ${MobilePxToVw(60)} 0`,
  },
}))

export const HotelCardStack = styled(Stack)(() => ({
  margin: "0 auto",
  flexDirection: "row",
  gap: DesktopPxToVw(40),
  width: DesktopPxToVw(930),
  minHeight: DesktopPxToVw(160),
  "@media (max-width: 640px)": {
    gap: MobilePxToVw(35),
    width: MobilePxToVw(473),
    minHeight: MobilePxToVw(160),
  },
}))

export const DescriptionTypography = styled(Typography)(() => ({
  margin: "0 auto",
  maxWidth: DesktopPxToVw(650),
  "@media (max-width: 640px)": {
    maxWidth: MobilePxToVw(450),
  },
}))

export const StyledDivider = styled(
  Divider,
  transientProps,
)<{ customMargin?: string }>(({ customMargin }) => ({
  //Added custom margin prop to handle box shadow effect on the last card
  background: theme.palette.ihclPalette.hexSixteen,
  height: DesktopPxToVw(1),
  width: DesktopPxToVw(930),
  margin: customMargin ? customMargin : `${DesktopPxToVw(20)} auto`,
  "@media (max-width: 640px)": {
    height: MobilePxToVw(1),
    width: MobilePxToVw(476),
    margin: customMargin ? customMargin : `${MobilePxToVw(20)} auto`,
  },
}))

export const ShadeBox = styled(Box)(() => ({
  position: "absolute",
  height: DesktopPxToVw(200),
  bottom: 0,
  width: "100%",
  pointerEvents: "none",
  background: `linear-gradient(180deg, rgba(255, 255, 255, 0.00) 25.88%, ${theme.palette.ihclPalette.hexOne} 96.53%)`,
  "@media (max-width: 640px)": {
    display: "none",
  },
}))

export const ScrollBox = styled(Box)(() => ({
  overflowY: "scroll",
  height: DesktopPxToVw(500),
  paddingBottom: DesktopPxToVw(50),
  "@media (max-width: 640px)": {
    height: MobilePxToVw(700),
  },
}))

export const ContentStack = styled(Stack)(() => ({
  justifyContent: "space-between",
  gap: DesktopPxToVw(30),
  flex: 2.42,
  "@media (max-width: 640px)": {
    gap: MobilePxToVw(17),
  },
}))
