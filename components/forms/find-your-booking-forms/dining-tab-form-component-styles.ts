import { theme } from "../../../lib/theme"
import { transientProps } from "../../../utils/transientProps"
import { Box, TextField, Typography, styled } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const MainContentWrapper = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: $isMobile ? MobilePxToVw(40) : DesktopPxToVw(40),
}))

export const MainContainer = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: $isMobile ? MobilePxToVw(40) : DesktopPxToVw(40),
}))

export const InputTextFieldWrapper = styled(
  TextField,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  "& .MuiInputBase-input ": {
    fontWeight: 300,
    lineHeight: "150%",
    fontStyle: "normal",
    fontFamily: "Inter",
    color: theme?.palette?.neuPalette?.hexSeventeen,
    fontSize: $isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
  },
  input: {
    "&::placeholder": {
      opacity: 1,
      fontWeight: 300,
      lineHeight: "150%",
      fontStyle: "normal",
      fontFamily: "Inter",
      color: theme?.palette?.neuPalette?.hexSeventeen,
      fontSize: $isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
    },
  },
}))

export const InputMobileTextFieldContainer = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  width: $isMobile ? "100%" : DesktopPxToVw(700),
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-end",
}))

export const InputMobileTextFieldWrapper = styled(
  TextField,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  "& .MuiInputBase-input ": {
    fontWeight: 300,
    lineHeight: "150%",
    fontStyle: "normal",
    fontFamily: "Inter",
    paddingLeft: $isMobile ? MobilePxToVw(0) : DesktopPxToVw(45),
    color: theme?.palette?.neuPalette?.hexSeventeen,
    fontSize: $isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
  },
  input: {
    "&::placeholder": {
      opacity: 1,
      fontWeight: 300,
      lineHeight: "150%",
      fontStyle: "normal",
      fontFamily: "Inter",
      color: theme?.palette?.neuPalette?.hexSeventeen,
      fontSize: $isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
    },
  },
}))

export const BlockContentWrapper = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: $isMobile ? "flex-start" : "center",
  justifyContent: "center",
}))

export const BlockContentContainer = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  "& span": {
    fontSize: $isMobile ? MobilePxToVw(18) : DesktopPxToVw(18),
  },
  "& span span": {
    fontSize: $isMobile ? `${MobilePxToVw(18)} !important` : DesktopPxToVw(18),
  },
  paddingRight: $isMobile ? MobilePxToVw(30) : "unset",
}))

export const MobileErrorMessage = styled(Typography)(() => ({
  margin: "1vw 0vw 0vw 0vw",
  color: `${theme?.palette?.neuPalette?.hexTwentyOne}!important`,
}))
