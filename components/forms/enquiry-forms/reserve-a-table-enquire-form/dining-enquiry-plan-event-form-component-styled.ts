import styled from "@emotion/styled"
import { theme } from "../../../../lib/theme"
import { transientProps } from "../../../../utils/transientProps"
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Typography,
} from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"

export const MainContainer = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  textAlign: "center",
  padding: $isMobile ? "0vw 12.813vw 10.313vw" : "3.646vw 6.406vw 1.563vw",
}))

export const TextFieldsContainer = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexDirection: "column",
  gap: $isMobile ? "6.25vw" : "1.927vw",
  marginTop: $isMobile ? "9.375vw" : "2.448vw",
}))

export const TextFieldsWrapperBox = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  gap: $isMobile ? "6.25vw" : "2.083vw",
  display: "flex",
  flexDirection: $isMobile ? "column" : "row",
}))

export const TextFieldsSecondWrapperBox = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  gap: $isMobile ? "6.25vw" : "1.823vw",
  display: "flex",
  flexDirection: $isMobile ? "column-reverse" : "row",
  alignItems: "flex-start",
}))

export const PlanEventSecondDataContainer = styled(Box)(() => ({
  gap: "0.521vw",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  padding: "1.563vw 6.406vw 1.823vw",
  backgroundColor: theme?.palette?.background?.paper,
}))

export const StyledTextField = styled(TextField)(() => ({
  "& .MuiInputBase-input ": {
    fontFamily: "Inter",
    fontSize: DesktopPxToVw(24),
    color: theme?.palette?.neuPalette?.hexTwelve,
    "@media (max-width: 640px)": {
      height: "4.2vw",
      fontSize: "3.75vw",
    },
  },
  "& .MuiFormHelperText-root": {
    fontSize: DesktopPxToVw(18),
    color: theme?.palette?.neuPalette?.hexTwentyOne,
    "@media (max-width: 640px)": {
      fontSize: "2.75vw",
    },
  },
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      opacity: 1,
      fontSize: DesktopPxToVw(24),
      color: theme?.palette?.neuPalette?.hexTwelve,
      fontWeight: 300,
      fontStyle: "normal",
      fontFamily: "Inter",
      lineHeight: "150%",
      "@media (max-width: 640px)": {
        width: "55.625vws",
        fontSize: "3.75vw",
      },
    },
  },
}))

export const DescriptionTextField = styled(TextField)(() => ({
  "& .MuiInputBase-input ": {
    fontFamily: "Inter",
    fontSize: DesktopPxToVw(24),
    lineHeight: "140%",
    color: theme?.palette?.neuPalette?.hexSeventeen,
    "@media (max-width: 640px)": {
      height: "4.2vw",
      fontSize: "3.75vw",
    },
  },
  "& .MuiFormHelperText-root": {
    color: theme?.palette?.neuPalette?.hexTwentyOne,
    fontSize: DesktopPxToVw(18),
    "@media (max-width: 640px)": {
      fontSize: "2.75vw",
    },
  },
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      opacity: 1,
      fontSize: DesktopPxToVw(24),
      color: theme?.palette?.neuPalette?.hexSeventeen,
      fontWeight: 300,
      fontStyle: "normal",
      fontFamily: "Inter",
      lineHeight: "150%",
      "@media (max-width: 640px)": {
        width: "55.625vws",
        fontSize: "3.75vw",
      },
    },
  },
}))

export const MobileNumberContainerBox = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  width: $isMobile ? "100%" : "19.167vw",
  flexDirection: "column",
}))

export const GustDropDownInputLabel = styled(InputLabel)(() => ({
  lineHeight: "1.35vw",
  fontSize: DesktopPxToVw(24),
  fontFamily: "Inter",
  fontWeight: 300,
  color: theme?.palette?.neuPalette?.hexSeventeen,
  "@media (max-width: 640px)": {
    fontSize: "3.75vw",
    lineHeight: "4.35vw",
  },
}))

export const GustDropDownSelect = styled(
  Select,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  fontSize: $isMobile ? "3.75vw" : "1.25vw",
  fontWeight: 300,
  fontFamily: "Inter",
  width: "30.156vw",
  lineHeight: "2vw",
  "& .MuiSelect-select": {
    "&:focus": {
      backgroundColor: $isMobile
        ? theme?.palette?.background?.paper
        : theme?.palette?.background?.default,
    },
  },
  "@media (max-width: 640px)": {
    width: "74.375vw",
    fontSize: "3.75vw",
    lineHeight: "4.4vw",
  },
}))

export const DatePickerTextField = styled(TextField)(() => ({
  width: "30.156vw",
  fontSize: DesktopPxToVw(24),
  marginTop: "0.833vw",
  "@media (max-width: 640px)": {
    width: "100%",
    fontSize: "3.75vw",
    height: "4vw",
    marginBottom: "3vw",
  },
  "& .MuiIconButton-root": {
    right: "1vw",
  },
  "& .Mui-error": {
    color: `${theme?.palette?.text?.primary} !important`,
  },
  "& .Mui-error:before": {
    borderBottomColor: `${theme?.palette?.text?.primary} !important`,
  },
  "& .MuiInput-input": {
    fontSize: DesktopPxToVw(24),
    "@media (max-width: 640px)": {
      fontSize: "3.75vw",
      height: "5vw",
    },
  },
  "&  .MuiFormHelperText-root": {
    color: `${theme?.palette?.neuPalette?.hexTwentyOne} !important`,
    fontSize: DesktopPxToVw(18),
  },
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      fontWeight: 500,
      opacity: 1,
      fontSize: DesktopPxToVw(24),
      color: theme?.palette?.neuPalette?.hexSeventeen,
      "@media (max-width: 640px)": {
        fontSize: "3.75vw",
        lineHeight: "4.8vw",
      },
    },
  },
}))

export const DescribeEventTypography = styled(
  Typography,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  paddingBottom: $isMobile ? "4.688vw" : "1.042vw",
  color: theme?.palette?.neuPalette.hexSeventeen,
  fontSize: $isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
}))

export const MobileNumberErrorTextTypography = styled(Typography)(() => ({
  zIndex: 1,
  marginTop: "0.1vw",
  position: "relative",
  alignSelf: "self-start",
  color: theme?.palette?.neuPalette?.hexTen,
  fontSize: DesktopPxToVw(18),
  "@media (max-width: 640px)": {
    marginTop: "1vw",
    fontSize: "2.45vw",
  },
}))

export const MainWrapperContainer = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  backgroundColor: $isMobile
    ? theme?.palette?.background?.paper
    : theme?.palette?.background?.default,
}))

export const PlaneEventPhoneNumberField = styled(TextField)(() => ({
  width: "24vw",
  "@media (max-width: 640px)": {
    width: "52vw",
    margin: "auto",
  },
  "& .MuiInputBase-input ": {
    fontFamily: "Inter",
    fontSize: DesktopPxToVw(24),
    "@media (max-width: 640px)": {
      paddingLeft: "2vw",
      fontSize: "3.750vw !important",
    },
  },
  "& .MuiFormHelperText-root": {
    fontSize: DesktopPxToVw(18),
    color: theme?.palette?.neuPalette?.hexTwentyOne,
  },
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      opacity: 1,
      color: "black",
      fontWeight: 400,
      fontSize: DesktopPxToVw(24),
      "@media (max-width: 640px)": {
        fontSize: "3.750vw !important",
      },
    },
  },
}))

export const StyledFormControl = styled(FormControl)(() => ({
  textAlign: "start",
  fontFamily: "Inter",
  fontWeight: 300,
  fontSize: DesktopPxToVw(24),
  "& .MuiSelect-select": {
    "&:focus": {
      backgroundColor: "transparent",
    },
  },
  "& label": {
    transform: "scale(1) translate(0, 0)",
    textAlign: "start",
    fontFamily: "Inter",
    fontWeight: 300,
    fontSize: "1.25vw",
    "@media (max-width:640px)": {
      fontSize: "3.75vw",
    },
    "&.Mui-focused, &.MuiInputLabel-shrink": {
      transform: "scale(0.75) translate(0, -1.2em)",
    },
  },
  "& .MuiInputBase-root": {
    height: "2.083vw",
    "@media (max-width:640px)": {
      height: "6.25vw",
    },
  },
  "& label+div": {
    margin: "0vw",
  },

  "& .MuiFormLabel-root.MuiInputLabel-root": {
    transition:
      "cubic-bezier(0.0, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,max-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
  },

  "& .MuiSelect-select.MuiInputBase-input.MuiInput-input": {
    minHeight: "unset",
    textAlign: "start",
    fontFamily: "Inter",
    fontWeight: 300,
    fontSize: "1.25vw",
    "@media (max-width:640px)": {
      fontSize: "3.75vw",
    },
  },
}))

export const DatePickerWrapper = styled(Box)(() => ({
  width: "unset",
  "& .MuiFormControl-root.MuiTextField-root": {
    marginTop: "0vw",
  },
  "& .MuiInputBase-input": {
    paddingBottom: "0.05vw",
  },
  "@media (max-width:640px)": {
    width: "100%",
  },
}))

export const EventPlanFormOverFlowWrapper = styled(Box)(() => ({
  width: "fit-content",
  "@media (max-width:640px)": {
    width: "100%",
    marginTop: "10.516vw",
    marginBottom: "5.47vw",
  },
}))
