import { theme } from "../../../lib/theme"
import { Box, styled, Typography } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw from "../../../utils/DesktopFontCalc"

export const TitleTypo = styled(Typography)(() => ({
  width: "80%",
  opacity: 0.9,
  textAlign: "left",
  lineHeight: "120%",
  letterSpacing: "-0.05em",
  alignItems: "flex-start",
  color: theme?.palette?.neuPalette?.hexOne,
  "&:before": {
    content: '""',
    width: "12.5vw",
    display: "inline-block",
    verticalAlign: "middle",
    borderBottom: `1px solid ${theme?.palette?.neuPalette?.hexOne}`,
  },
  ":not(:empty)::before ": {
    marginRight: "5.45vw",
  },
}))

export const BottomContentBox = styled(Box)(() => ({
  bottom: "0",
  zIndex: "1",
  width: "100%",
  position: "absolute",
  pointerEvents: "none",
}))

export const TitleBox = styled(
  Box,
  transientProps
)<{ $isHomePage: boolean }>(({ $isHomePage }) => ({
  marginLeft: "8.43vw",
  pointerEvents: "none",
  maxWidth: $isHomePage ? "74%" : "75%",
  marginBottom: $isHomePage ? "" : "10.538vw",
}))

export const ScrollDownArrowBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  margin: "6.71vw 0vw 8.75vw 0vw",
}))

export const ActionBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  pointerEvents: "auto",
  margin: "5vw 0vw 12.96vw 8.43vw",
}))

export const GalleryTypo = styled(Typography)(() => ({
  lineHeight: "150%",
  marginLeft: "4.5vw",
  fontFamily: "Inter",
  letterSpacing: "0.15em",
  color: theme?.palette?.neuPalette?.hexOne,
}))

export const HeaderSubTitle = styled(
  Typography,
  transientProps
)<{ $marginLeft: any; $isNormalVariant?: boolean }>(
  ({ $marginLeft, $isNormalVariant }) => ({
    color: theme?.palette?.neuPalette?.hexOne,
    alignSelf: $isNormalVariant ? "center" : "flex-start",
    marginLeft: $marginLeft ? $marginLeft : DesktopPxToVw(0),
  })
)

export const SubTitleInHeroBannerTypography = styled(Typography)(() => ({
  lineHeight: "140%",
  fontStyle: "normal",
  color: theme?.palette?.neuPalette?.hexOne,
}))

export const MobileHeroBannerContentBox = styled(Box)(() => ({
  display: "flex",
  position: "relative",
}))
