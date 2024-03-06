import { theme } from "../../../../lib/theme"
import DesktopPxToVw from "../../../../utils/DesktopFontCalc"
import { transientProps } from "../../../../utils/transientProps"
import { Box, TextField, styled } from "@mui/material"

export const MainBox = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  textAlign: "center",
  bottom: $isMobile ? "0vw" : "unset",
  position: $isMobile ? "absolute" : "static",
  margin: $isMobile ? "0vw" : "0.833vw 12.5vw 0vw",
  boxShadow: $isMobile ? "none" : `-6px 10px 24px rgba(0, 0, 0, 0.1)`,
  height: $isMobile ? "147vw" : "unset",
  overflowY: "auto",
}))

export const SpecialOccasionMainBox = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  textAlign: "center",
  bottom: $isMobile ? "0vw" : "unset",
  margin: $isMobile ? "24vw 0vw 0vw" : "1.563vw 12.5vw 0vw",
  boxShadow: $isMobile ? "unset" : `-6px 10px 24px rgba(0, 0, 0, 0.1)`,
  maxHeight: $isMobile ? "unset" : "100%",
  overflowY: $isMobile ? "unset" : "auto",
}))
export const OccasionContainer = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  backgroundColor: $isMobile ? theme?.palette?.background?.paper : theme?.palette?.background?.default,
  padding: $isMobile ? "0vw 12.813vw 8.594vw" : "2.865vw 6.406vw 2.083vw",
}))

export const BoxWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexDirection: "column",
  gap: $isMobile ? "5.469vw" : "1.823vw",
  paddingTop: $isMobile ? "5.469vw" : "2.083vw",
}))

export const DescriptionWrapperBox = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  backgroundColor: $isMobile ? theme?.palette?.background?.default : theme?.palette?.background?.paper,
  padding: $isMobile ? "8.594vw 12.813vw" : "1.25vw 4.531vw",
}))

export const StyledTextField = styled(TextField)(() => ({
  "& .MuiInputBase-root.MuiInput-root": {
    "&::before": {
      borderBottomStyle: "solid!important",
    },
  },
  "& .MuiInputBase-input ": {
    fontFamily: "supreme",
    fontSize: DesktopPxToVw(24),
    fontWeight: 300,
    color: theme?.palette?.ihclPalette?.hexSeventeen,
    "@media (max-width: 640px)": {
      fontWeight: 300,
      height: "4.2vw",
      width: "100%",
      fontSize: "3.75vw",
    },
  },
  "@media (max-width: 640px)": {
    "& .MuiFormControl-root.MuiTextField-root": {
      width: "100%!important",
    },
  },
  "& .MuiFormHelperText-root": {
    color: theme?.palette?.ihclPalette?.hexTwentyOne,
    fontSize: DesktopPxToVw(18),
    "@media (max-width: 640px)": {
      fontSize: "2.75vw",
      width: "100%",
    },
  },
  input: {
    width: "100%",
    fontWeight: 300,
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      opacity: 1,
      fontWeight: 300,
      lineHeight: "150%",
      fontStyle: "normal",
      fontFamily: "supreme",
      fontSize: DesktopPxToVw(24),
      color: theme?.palette?.ihclPalette?.hexSeventeen,
      "@media (max-width: 640px)": {
        fontSize: "3.75vw",
        fontWeight: 300,
      },
    },
  },
}))

export const MobileNumberContainer = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexDirection: "column",
  width: $isMobile ? "100%" : "18.521vw",
}))

export const CheckBoxContainer = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  marginTop: $isMobile ? "5.469vw" : "1.563vw",
  alignItems: $isMobile ? "flex-start" : "center",
}))

export const SpecialOccasionGrid = styled(
  Box,
  transientProps,
)<{ $webWidths: string }>(({ $webWidths }) => ({
  display: "grid",
  gridTemplateColumns: $webWidths,
  alignItems: "start",
  columnGap: "2.083vw",
  marginBottom: "1.563vw",
  "@media (max-width:640px)": {
    marginBottom: "5.469vw",
    gridTemplateColumns: "1fr",
    rowGap: "5.469vw",
    gridTemplateRows: "1fr 1fr 1fr",
  },
}))

export const PhoneNumberContainer = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
}))

export const SpecialOccasionMultilineField = styled(TextField)(() => ({
  "& .MuiInputBase-input ": {
    fontFamily: "supreme",
    fontSize: DesktopPxToVw(24),
    lineHeight: "140%",
    minHeight: "2.856vw!important",
    fontWeight: 300,
    color: theme?.palette?.ihclPalette?.hexSeventeen,
    "@media (max-width: 640px)": {
      minHeight: "8.594vw!important",
      fontSize: "3.75vw",
      fontWeight: 300,
    },
  },
  "& .MuiFormHelperText-root": {
    color: theme?.palette?.ihclPalette?.hexTwentyOne,
    fontSize: DesktopPxToVw(18),
    "@media (max-width: 640px)": {
      fontSize: "2.75vw",
    },
  },
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      opacity: 1,
      fontWeight: 300,
      lineHeight: "150%",
      fontStyle: "normal",
      fontFamily: "supreme",
      fontSize: DesktopPxToVw(24),
      color: theme?.palette?.ihclPalette?.hexSeventeen,
      "@media (max-width: 640px)": {
        fontSize: "3.75vw",
        fontWeight: 300,
      },
    },
  },
}))

export const FullBox = styled(Box)(() => ({
  width: "100%",
}))
