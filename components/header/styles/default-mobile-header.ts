import { theme } from "../../../lib/theme"
import { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { transientProps } from "../../../utils/transientProps"
import { Box, Button, Divider, Typography, styled } from "@mui/material"

export const MainBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
}))

export const IconsBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}))

export const HamburgerBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

export const ImageBoxWrapper: any = styled(
  Box,
  transientProps,
)<{
  $showDropDownMenu: boolean
  $isMobile: boolean
}>(({ $showDropDownMenu, $isMobile }) => ({
  cursor: "pointer",
  objectFit: "contain",
  width: $showDropDownMenu ? "3.48vw" : "5.20vw",
  height: $showDropDownMenu ? ($isMobile ? "9.34375vw" : "3.125vw") : $isMobile ? "9.34375vw" : "4.58vw",
}))

export const HeaderMainBox = styled(Box)(() => ({
  display: "flex",
  position: "relative",
  flexDirection: "column",
  zIndex: 999,
}))

export const SearchMainBox = styled(
  Box,
  transientProps,
)<{ $isSafari?: boolean }>(({ $isSafari }) => ({
  zIndex: 1,
  width: "100%",
  display: "flex",
  height: "12.5vw",
  position: "fixed",
  alignItems: "center",
  marginTop: $isSafari ? "-5vw" : "15.625vw",
  justifyContent: "space-between",
  color: theme?.palette?.neuPalette?.hexTwelve,
  background: theme?.palette?.background?.default,
}))

export const HotelNameTypography = styled(Typography)(() => ({
  display: "block",
  overflow: "hidden",
  fontSize: "3.750vw",
  whiteSpace: "nowrap",
  lineHeight: "5.625vw",
  textOverflow: "ellipsis",
  maxWidth: MobilePxToVw(370),
}))

export const DateAndGuestTypography = styled(Typography)(() => ({
  lineHeight: "150%",
  whiteSpace: "nowrap",
  letterSpacing: "-0.05em",
}))

export const CenterItemsBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}))

export const DateDivider = styled(Divider)(() => ({
  width: "2vw",
  height: "0.156vw",
  background: theme?.palette?.neuPalette?.hexTwelve,
}))

export const GuestDetailsDivider = styled(Divider)(() => ({
  width: "0.156vw",
  height: "2.656vw",
  margin: "0vw 1.563vw",
  background: theme?.palette?.neuPalette?.hexTwelve,
}))

export const SearchButton = styled(Button)(() => ({
  width: "29.063vw",
  height: "12.5vw !important",
}))
