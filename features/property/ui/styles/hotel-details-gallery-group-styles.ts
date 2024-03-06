import { fonts, theme } from "../../../../lib/theme"
import { ExpandMore } from "@mui/icons-material"
import { Box, Button, Divider, Grid, styled } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { transientProps } from "../../../../utils/transientProps"

export const MobileGalleryButtonContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
}))

export const GalleryButtonWrapper = styled(Button)(() => ({
  color: theme?.palette?.neuPalette?.hexOne,
  backgroundColor: theme?.palette?.neuPalette?.hexTwo,
  " &:hover": {
    backgroundColor: theme?.palette?.neuPalette?.hexTwo,
  },
  "&.Mui-disabled": {
    color: theme?.palette?.neuPalette?.hexTwelve,
    backgroundColor: theme?.palette?.neuPalette?.hexSixteen,
  },
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "140%",
  letterSpacing: "1.8px",
  fontFamily: "Inter",
  fontSize: MobilePxToVw(18),
}))

export const LoadMoreGridContainer = styled(
  Grid,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: $isMobile ? MobilePxToVw(15) : DesktopPxToVw(20),
}))

export const LoadMoreButtonContainer = styled(
  Button,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  minWidth: "37.188vw",
  letterSpacing: $isMobile ? "0.281vw" : "unset",
  "& .MuiButton-endIcon": { margin: 0, marginLeft: "1vw" },
}))

export const StyledExpandMoreIcon = styled(ExpandMore)(() => ({
  height: "3.875vw",
  width: "auto",
  color: theme?.palette?.neuPalette?.hexTwo,
}))

export const LoadMoreWrapper = styled(Box)(() => ({
  display: "flex",
  cursor: "pointer",
}))

export const StyledGalleryExpandMoreIcon = styled(ExpandMore)(() => ({
  color: `${theme?.palette?.neuPalette?.hexOne}`,
  height: "3.875vw",
  width: "auto",
}))
// beneficiaries and inclusions component styles
export const TitleBoxwrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean; $isSingleItem?: boolean }>(({ $isMobile, $isSingleItem = false }) => ({
  display: "flex",
  gap: $isMobile ? MobilePxToVw(10) : DesktopPxToVw(10),
  alignItems: "center",
  justifyContent: $isSingleItem ? "center" : "initial",
  textAlign: $isSingleItem ? "center" : "initial",
  marginBottom: $isSingleItem ? ($isMobile ? MobilePxToVw(40) : DesktopPxToVw(40)) : "",
}))

export const PortableTextBoxWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean; $isSingleItem?: boolean }>(({ $isMobile, $isSingleItem = false }) => ({
  paddingLeft: $isSingleItem ? "0vw" : $isMobile ? MobilePxToVw(32) : DesktopPxToVw(46),
  "&>ul>li": {
    fontWeight: 300,
    fontSize: $isMobile ? MobilePxToVw(22) : DesktopPxToVw(22),
    lineHeight: $isMobile ? "140%" : "1.56vw",
    fontFamily: fonts?.body,
    color: theme?.palette?.neuPalette?.hexSeventeen,
  },
  "&, & *": {
    textAlign: $isSingleItem ? "center !important" : "initial",
  },
}))
export const HorizontalDivider = styled(
  Divider,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  height: "2%",
  width: $isMobile ? MobilePxToVw(40) : DesktopPxToVw(61),
  borderColor: theme?.palette?.neuPalette?.hexSeventeen,
}))
