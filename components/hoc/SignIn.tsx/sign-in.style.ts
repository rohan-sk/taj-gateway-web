import { theme } from "../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { transientProps } from "../../../utils/transientProps"
import { Box, TextField, Typography, styled } from "@mui/material"

export const MainBoxWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}))

export const BoxWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "self-end",
  "@media (max-width: 640px)": {
    width: "100%",
  },
}))

export const TermsAndContritionWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: $isMobile ? "flex-start" : "center",
}))

export const StyledInputField: any = styled(TextField)(() => ({
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      fontFamily: "supreme",
      fontSize: DesktopPxToVw(24),
      fontStyle: "normal",
      fontWeight: 300,
      lineHeight: "150%",
      paddingLeft: "0vw !important",
      opacity: 1,
      color: theme?.palette?.ihclPalette?.hexSeventeen,
    },
    "&:-webkit-autofill": {
      WebkitBoxShadow: `0 0 0 50px ${theme?.palette?.ihclPalette?.hexOne} inset !important`,
    },
  },
  "& .MuiInputBase-input": {
    fontFamily: "supreme",
    fontSize: DesktopPxToVw(24),
    fontStyle: "normal",
    fontWeight: 300,
    lineHeight: "150%",
    paddingLeft: DesktopPxToVw(20),
  },
  "@media (max-width: 640px)": {
    width: "100%",
    input: {
      "&::placeholder": {
        fontSize: "3.750vw",
        paddingLeft: "0vw !important",
      },
    },
    "& .MuiInputBase-input": {
      fontSize: "3.750vw !important",
      padding: `${MobilePxToVw(0.2)} 0vw!important`,
    },
  },
}))

export const ErrorMessageTypography = styled(Typography)(() => ({
  margin: "0.6vw 0vw 0vw 0vw",
  color: `${theme?.palette?.ihclPalette?.hexTwentyOne}!important`,
}))

export const ErrorMessageTypographyWrapper = styled(Box)(() => ({
  marginBottom: "2.188vw",
  paddingTop: "1vw",
  "@media (max-width:640px)": {
    marginBottom: "5.469vw",
  },
}))
export const StyledInputFieldWrapper = styled(Box)(() => ({
  flexGrow: 1,
  flexShrink: 1,
  "& input": {
    "&::placeholder": {
      paddingLeft: "0.08vw!important",
    },
  },
  "@media (max-width:640px)": {
    "& input": {
      "&::placeholder": {
        paddingLeft: "1vw!important",
      },
    },
  },
}))
