import styled from "@emotion/styled"
import { FormControl, Grid, MenuItem, Stack, Tab, Tabs, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { fonts, theme } from "../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { transientProps } from "../../../utils/transientProps"

export const TellUsAboutYourStayTextField = styled(TextField)(() => ({
  "& textarea, & textarea::placeholder": {
    color: theme?.palette?.ihclPalette?.hexSeventeen,
    lineHeight: "140%",
    fontSize: DesktopPxToVw(24),
    "@media (max-width: 640px)": {
      fontSize: "3.75vw",
    },
  },
}))

export const FeedbackInputFieldGrid = styled(Grid)(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "2.08vw",
  marginBottom: "1.563vw",
  "@media(max-width: 640px)": {
    display: "flex",
    flexDirection: "column",
    gap: "7.031vw",
    marginBottom: "7.031vw",
  },
}))

export const FieldsGrid = styled(Box)(() => ({
  display: "grid",
  alignItems: "start",
  gridTemplateColumns: "repeat(2, 1fr)",
  marginBottom: "1.563vw",
  gap: "2.08vw",
  "@media(max-width: 640px)": {
    display: "flex",
    flexDirection: "column",
    gap: "7.031vw",
    marginBottom: "7.031vw",
  },
}))

export const CountryCodeDropdownBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "flex-end",
  "& .MuiSvgIcon-root": {
    marginBottom: "0.3vw",
  },
  "& .MuiSelect-select:has(img)": {
    display: "flex",
    alignItems: "baseline",
    "&>span": {
      margin: "0vw",
    },
  },
  "@media (max-width:640px)": {
    height: "6.25vw",
    "& .MuiFormControl-root.MuiTextField-root": {
      marginBottom: "0px!important",
      padding: "0vw",
    },
    "& .MuiSvgIcon-root": {
      right: "0vw",
      marginBottom: "0vw",
    },
    "& .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-colorPrimary": {
      minWidth: "fit-content!important",
    },
  },
}))

export const CheckBoxErrorStack = styled(Stack)(() => ({
  width: "100%",
  alignItems: "center",
  marginTop: "1.5vw",
  gap: DesktopPxToVw(5),
  "@media(max-width:640px)": {
    gap: MobilePxToVw(5),
    marginTop: "7.188vw",
  },
}))
export const ErrorMessageTypography = styled(Typography)(() => ({
  fontSize: `${DesktopPxToVw(18)} !important`,
  fontFamily: fonts?.body,
  fontWeight: 300,
  color: theme?.palette?.ihclPalette?.hexTwentyOne,
  "@media (max-width: 640px)": {
    fontSize: "2.813vw !important",
  },
}))
export const TermsConditionsBox = styled(Box)(() => ({
  display: "flex",
  gap: "1.13vw",
  alignItems: "center",
  justifyContent: "center",
}))

export const DateTextField = styled(TextField)(() => ({
  width: "23.594vw",
  fontSize: DesktopPxToVw(24),
  marginRight: "2vw",
  "@media (max-width: 640px)": {
    width: "100%",
    fontSize: "3.75vw",
    height: "4vw",
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
    color: `${theme?.palette?.ihclPalette?.hexTwentyOne} !important`,
    fontSize: DesktopPxToVw(18),
    "@media (max-width: 640px)": {
      fontSize: "2.75vw",
    },
  },
  "& .MuiInputLabel-root": {
    textOverflow: "ellipsis !important",
    color: theme?.palette?.ihclPalette?.hexSeventeen,
    fontWeight: 300,
    opacity: 1,
    fontSize: DesktopPxToVw(24),
    "@media (max-width: 640px)": {
      fontSize: "3.75vw",
    },
  },
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      fontWeight: 300,
      opacity: 1,
      fontSize: DesktopPxToVw(24),
      color: theme?.palette?.ihclPalette?.hexSeventeen,
      "@media (max-width: 640px)": {
        fontSize: "3.75vw",
        lineHeight: "4.8vw",
      },
    },
  },
}))

export const StyledTabs = styled(Tabs)(() => ({
  "& .MuiTab-root.Mui-selected": {
    color: theme?.palette?.ihclPalette?.hexTwo,
  },
  "& .MuiTabs-flexContainer": {
    justifyContent: "center",
    gap: DesktopPxToVw(50),
  },
}))

export const StyledTab = styled(Tab)(() => ({
  color: theme?.palette?.text?.primary,
  gap: DesktopPxToVw(83),
  fontSize: DesktopPxToVw(18),
  fontWeight: 300,
  padding: `0vw 0vw ${DesktopPxToVw(26.5)} !important`,
  margin: "0 auto",
}))

export const FeedbackFormControl = styled(FormControl)(() => ({
  textAlign: "start",
  fontFamily: "Inter",
  fontWeight: 300,
  fontSize: "1.25vw",
  "@media (max-width:640px)": {
    fontSize: "3.75vw",
  },
  "& .MuiSelect-select": {
    "&:focus": {
      backgroundColor: "transparent",
    },
  },
  "& label": {
    transform: "scale(1) translate(0, 0em)",
    textAlign: "start",
    fontFamily: "Inter",
    fontWeight: 300,
    fontSize: "1.25vw",
    paddingRight: "1.25vw",
    "@media (max-width:640px)": {
      fontSize: "3.75vw",
      transform: "scale(1) translate(0, 0em)",
      paddingRight: "3.75vw",
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
    lineHeight: "140%",
    "@media (max-width:640px)": {
      fontSize: "3.75vw",
      lineHeight: "140%",
    },
  },
}))
export const FeedbackMenuItem = styled(MenuItem)(() => ({
  fontWeight: 300,
  fontSize: "0.938vw",
  fontFamily: "Inter",
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  padding: "0.417vw 0vw 0.417vw 2.083vw",
  "@media (max-width:640px)": {
    fontWeight: 300,
    fontSize: "2.813vw",
    padding: "1.563vw 0vw 1.563vw 3.125vw",
    color: theme?.palette?.ihclPalette?.hexSeventeen,
  },
}))

export const InputText = styled(TextField)(() => ({
  width: "100%",
  "& .MuiInput-input": {
    fontSize: DesktopPxToVw(24),
    fontWeight: "300 !important",
    lineHeight: "140%",
  },
  "& .MuiFormHelperText-root": {
    fontSize: DesktopPxToVw(18),
    fontFamily: "Inter !important",
    color: theme?.palette?.ihclPalette?.hexTwentyOne,
  },

  input: {
    fontFamily: "Inter",
    fontWeight: 300,
    color: theme?.palette?.ihclPalette?.hexSeventeen,
    "&::placeholder": {
      fontFamily: "Inter",
      opacity: 1,
      fontWeight: "300 !important",
      fontSize: DesktopPxToVw(24),
      textOverflow: "ellipsis !important",
      color: theme?.palette?.ihclPalette?.hexSeventeen,
    },
  },

  "@media (max-width: 640px)": {
    width: "100%",
    "&  .MuiFormHelperText-root": {
      fontSize: MobilePxToVw(18),
    },
    "& .MuiInput-input": {
      fontSize: "3.750vw",
    },
    input: {
      "&::placeholder": {
        textOverflow: "ellipsis !important",
        fontWeight: 300,
        opacity: 1,
        fontSize: "3.750vw",
      },
    },
  },
}))

export const StayDateContainer = styled(
  Box,
  transientProps,
)<{ $isOpen?: boolean; $isDouble?: any }>(({ $isOpen, $isDouble }) => ({
  minWidth: DesktopPxToVw(371),
  "@media (max-width:640px)": {
    minHeight: "6.25vw",
    minWidth: "100%",
  },

  "& .styledText": {
    width: "100%",
    height: "100%",
    zIndex: "0",
  },
  "& .react-calendar": {
    marginTop: "1.4vw",
    "@media (max-width:640px)": {
      marginTop: "1.3vw !important",
    },
  },
  "& .react-date-picker": {
    height: "100%",
    alignItems: "center",
  },
  "& .react-date-picker__calendar--closed": {
    display: $isOpen ? "block" : "none",
    width: "fit-content",
    zIndex: 999,
    inset: `${DesktopPxToVw(30)} 0 0 0 !important`,
    transform: $isDouble ? "translateX(-20%)" : "unset",
    "@media (max-width: 640px)": {
      inset: `${MobilePxToVw(30)} 0 0 0 !important`,
    },
  },
}))
