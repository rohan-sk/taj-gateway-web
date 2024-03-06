import { theme } from "../../../lib/theme"
import { Box, TextField, styled } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const MainStayContentWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: $isMobile ? MobilePxToVw(40) : DesktopPxToVw(40),
}))

export const MainStayContentContainer = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: $isMobile ? MobilePxToVw(40) : DesktopPxToVw(40),
}))

export const InputTextField = styled(
  TextField,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  "& .MuiInputBase-input ": {
    fontWeight: 300,
    lineHeight: "150%",
    fontStyle: "normal",
    fontFamily: "Inter",
    color: theme?.palette?.ihclPalette?.hexSeventeen,
    fontSize: $isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
  },
  input: {
    "&::placeholder": {
      opacity: 1,
      fontWeight: 300,
      lineHeight: "150%",
      fontStyle: "normal",
      fontFamily: "Inter",
      color: theme?.palette?.ihclPalette?.hexSeventeen,
      fontSize: $isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
    },
  },
}))

export const InputEmailTextField = styled(
  TextField,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  "& .MuiInputBase-input ": {
    fontWeight: 300,
    lineHeight: "150%",
    fontStyle: "normal",
    fontFamily: "Inter",
    color: theme?.palette?.ihclPalette?.hexSeventeen,
    fontSize: $isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
  },
  input: {
    "&::placeholder": {
      opacity: 1,
      fontWeight: 300,
      lineHeight: "150%",
      fontStyle: "normal",
      fontFamily: "Inter",
      color: theme?.palette?.ihclPalette?.hexSeventeen,
      fontSize: $isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
    },
  },
}))

export const MainCustomCheckBoxContainer = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: $isMobile ? "flex-start" : "center",
  justifyContent: "center",
}))

export const BlockContentWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  "& span": {
    fontSize: $isMobile ? MobilePxToVw(18) : DesktopPxToVw(18),
  },
  "& span span": {
    fontSize: $isMobile ? `${MobilePxToVw(18)} !important` : DesktopPxToVw(18),
  },
  paddingRight: $isMobile ? MobilePxToVw(30) : "unset",
}))
