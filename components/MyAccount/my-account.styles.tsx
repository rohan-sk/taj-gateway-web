import { theme } from "../../lib/theme"
import { KeyboardArrowDown } from "@mui/icons-material"
import { transientProps } from "../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { Box, Divider, Grid, Stack, Typography, styled } from "@mui/material"

export const BoxWrapper = styled(Box)(() => ({
  gap: 24,
  display: "flex",
  textAlign: "center",
  paddingBottom: "1vw",
  alignItems: "center",
  justifyContent: "center",

  "@media (max-width: 640px)": {
    gap: "3.750vw",
    paddingBottom: "5.47vw",
  },
}))

export const LogoutBottomDivider = styled(Divider)(() => ({
  width: "74.5vw",
  background: theme?.palette?.ihclPalette?.hexSixteen,
  borderColor: theme?.palette?.ihclPalette?.hexSixteen,

  "@media (max-width: 640px)": {
    width: "84.4vw",
    opacity: "0.9",
    height: "0.156vw",
  },
}))

export const GridWrapper = styled(Grid)(() => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
}))

export const UserName = styled(Typography)(() => ({
  fontWeight: 700,
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  textTransform: "uppercase",
  color: theme.palette.text.primary,
}))

export const BoxContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  padding: "1.771vw 3.125vw 1.823vw 3.125vw",
}))

export const MainBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  width: DesktopPxToVw(330),

  "@media (max-width: 640px)": {
    width: "100%",
  },
}))

export const StyledTabs = styled(Grid)(() => ({
  marginTop: "0",
  "& .MuiTabs-indicator": {
    display: "none",
  },
}))

export const TabBox = styled(
  Box,
  transientProps,
)<{ $index: boolean }>(({ $index }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: $index ? `${theme?.palette?.ihclPalette?.hexTwo}1a` : "", //added 1a for opacity
  margin: `0`,
}))

export const StyledTab = styled(
  Grid,
  transientProps,
)<{ $index: boolean }>(({ $index }) => ({
  opacity: $index ? 1 : 0.9,
  fontWeight: $index ? 700 : 300,
  padding: $index ? DesktopPxToVw(10) : `${DesktopPxToVw(10)} 0`,
  color: $index ? theme?.palette?.ihclPalette?.hexTwo : theme?.palette?.ihclPalette?.hexSeventeen,
  fontSize: DesktopPxToVw(22),
  cursor: "pointer",
}))

export const StyledImage: any = styled(Box)(() => ({
  width: "0.5vw",
  height: "1vw",
  marginRight: DesktopPxToVw(10),
}))

export const TabTitle = styled(Typography)(() => ({
  fontWeight: 700,
  margin: `${DesktopPxToVw(30)} 0`,
  fontFamily: "supreme",
  fontSize: DesktopPxToVw(22),
  lineHeight: "140%",
  color: theme?.palette?.ihclPalette?.hexSeventeen,
}))

export const PlaceholderTitle = styled(Typography)(() => ({
  fontSize: "2vw",
  color: theme?.palette?.ihclPalette?.hexSeventeen,
}))

export const FlexBoxWrapper = styled(Box)(() => ({
  display: "flex",
  marginTop: "2vw",
  gap: DesktopPxToVw(60),

  "@media (max-width: 640px)": {
    gap: "0vw",
    marginTop: "0vw",
    flexDirection: "column",
  },
}))

export const GridBoxWrapper = styled(Box)(() => ({
  display: "grid",
  marginTop: "2vw",
  gap: DesktopPxToVw(60),
  gridTemplateColumns: "22.8% 73.5%",
  "@media (max-width: 640px)": {
    gap: "0vw",
    display: "flex",
    marginTop: "0vw",
    flexDirection: "column",
  },
}))

export const BackButtonWrapper = styled(Box)(() => ({
  display: "flex",
  gap: "0.6vw",
  alignItems: "center",
  margin: `${DesktopPxToVw(20)} 0`,
  cursor: "pointer",
  width: "4vw",
  "@media (max-width: 640px)": {
    margin: `${MobilePxToVw(20)} 0`,
  },
}))

export const HorizontalDivider = styled(Divider)(() => ({
  width: "100%",
  height: "0.15vw",
  backgroundColor: theme?.palette?.ihclPalette?.hexSeven,
}))

export const TabListBox = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  height: "13.281vw",
  flexDirection: "row",
  alignItems: "center",
  paddingLeft: "7.813vw",
}))

export const MoreLabelTypography = styled(Typography)(() => ({
  lineHeight: "150%",
  whiteSpace: "nowrap",
  letterSpacing: MobilePxToVw(1),
  color: theme?.palette?.text?.primary,
}))

export const TabTypography = styled(Typography)(() => ({
  lineHeight: "150%",
  overflow: "hidden",
  whiteSpace: "nowrap",
  maxWidth: "34.375vw",
  textOverflow: "ellipsis",
  letterSpacing: MobilePxToVw(1),
}))

export const VerticalDivider = styled(Divider)(() => ({
  opacity: "0.4",
  height: "3.75vw",
  width: "0.158vw",
  margin: "0vw 2.969vw",
  backgroundColor: theme?.palette?.text?.primary,
}))

export const StyledDownArrow = styled(KeyboardArrowDown)(() => ({
  color: theme?.palette?.text?.primary,
  marginLeft: MobilePxToVw(5),
}))

export const RowStack = styled(Stack)(() => ({
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  "@media (max-width: 640px)": {
    width: "auto",
  },
}))
