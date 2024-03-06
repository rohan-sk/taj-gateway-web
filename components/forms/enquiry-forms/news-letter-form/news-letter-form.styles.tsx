import { Box, FormControl, InputLabel, MenuItem, TextField, Typography, Select, styled } from "@mui/material"
import DesktopPxToVw from "../../../../utils/DesktopFontCalc"
import { fonts, theme } from "../../../../lib/theme"
import { transientProps } from "../../../../utils/transientProps"

export const SalutationSelect = styled(Select)(() => ({
  "&.Mui-disabled": {
    "&:before": {
      borderBottomStyle: "outset !important",
    },
  },
}))

export const FormFieldsContainer = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "auto",
  rowGap: "2.083vw",
  marginBottom: "2.083vw",
  "@media (max-width:640px)": {
    marginBottom: "9.375vw",
    rowGap: "4.688vw",
  },
}))
export const NewsLetterTitleContainer = styled(Box)(() => ({
  textAlign: "center",
  marginBottom: "2.083vw",
  "@media (max-width:640px)": {
    marginBottom: "9.375vw",
  },
}))
export const CommonGird = styled(
  Box,
  transientProps,
)<{ $webWidths?: string; $mobileWidths?: string }>(({ $webWidths, $mobileWidths }) => ({
  display: "grid",
  alignItems: "start",
  gridTemplateColumns: $webWidths || "1fr",
  columnGap: "2.083vw",
  "@media (max-width:640px)": {
    gridTemplateRows: "auto",
    columnGap: "6.25vw",
    rowGap: "4.688vw",
    gridTemplateColumns: $mobileWidths || "100%",
  },
}))

export const FirstRow = styled(
  Box,
  transientProps,
)<{ $webWidths?: string; $mobileWidths?: string }>(({ $webWidths, $mobileWidths }) => ({
  display: "grid",
  alignItems: "start",
  gridTemplateColumns: $webWidths || "1fr",
  gridTemplateRows: "auto",
  gridTemplateAreas: `"salutation firstName lastName"`,
  columnGap: "2.083vw",
  "@media (max-width:640px)": {
    gridTemplateRows: "auto",
    columnGap: "6.05vw",
    rowGap: "4.668vw",
    gridTemplateColumns: "23.5vw 1fr",
    gridTemplateAreas: `
    "salutation firstName"
    "lastName lastName"
    `,
  },
}))
export const NewsLetterFormContainer = styled(Box)(() => ({
  margin: "1.719vw auto 0vw",
  width: DesktopPxToVw(1200),
  boxShadow: "-6px 10px 24px 0px rgba(0,0,0,0.1)",
  maxHeight: "100%",
  overflowY: "auto",
  padding: "3.125vw 4.063vw",
  background: theme?.palette?.background?.default,
  "@media (max-width:640px)": {
    height: "100vh",
    width: "100%",
    overflowY: "unset",
    margin: "35vw 0vw 0vw",
    padding: "0 12.813vw",
    boxShadow: "unset",
    background: theme?.palette?.background?.default,
  },
}))

export const NewsLetterFormControl = styled(FormControl)(() => ({
  textAlign: "start",
  fontFamily: "Inter",
  fontWeight: 300,
  fontSize: "1.25vw",
  "@media (max-width:640px)": {
    fontSize: "3.75vw",
  },
  "& .Mui-disabled": {
    "&:before": {
      borderBottomStyle: "solid !important",
    },
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

export const NewsLetterStyledLabel = styled(InputLabel)(() => ({
  fontFamily: "Inter",
  fontSize: "1.25vw",
  fontStyle: "normal",
  fontWeight: 300,
  lineHeight: "150%",
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  "@media (max-width:640px)": {
    fontSize: "3.75vw",
  },
}))

export const NewsLetterMenuItem = styled(MenuItem)(() => ({
  fontWeight: 300,
  fontSize: "0.938vw",
  fontFamily: "Inter",
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  padding: "0.417vw 2.083vw 0.417vw 2.083vw",
  "@media (max-width:640px)": {
    fontWeight: 300,
    fontSize: "2.813vw",
    padding: "1.563vw 3.125vw 1.563vw 3.125vw",
    color: theme?.palette?.ihclPalette?.hexSeventeen,
  },
}))

export const NewsletterSelectContainer = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  textAlign: "start",
}))

export const InputTextField = styled(TextField)(() => ({
  width: "100%",
  height: "2.083vw",
  input: {
    padding: "0vw",
  },
  "& .MuiInputBase-root.MuiInput-root": {
    "&::before": {
      borderBottomStyle: "solid!important",
    },
  },
  "& input": {
    "&::placeholder": {
      opacity: 1,
    },
  },
  "& label": {
    transform: "scale(1) translate(0, 0.1vw)",
    "@media (max-width:640px)": {
      transform: "scale(1) translate(0, 0.4vw)",
    },
    "& .Mui-error": {
      color: theme?.palette?.ihclPalette?.hexThirtyTwo,
    },
  },
  "&, & input": {
    height: "2.083vw",
    "@media (max-width:640px)": {
      height: "6.25vw",
    },
  },
  "& input, & label": {
    fontFamily: "Inter",
    fontWeight: 300,
    fontSize: "1.25vw",
    color: theme?.palette?.ihclPalette?.hexSeventeen,
    opacity: 1,
    "@media (max-width:640px)": {
      fontFamily: "Inter",
      fontWeight: 300,
      fontSize: "3.75vw",
    },
  },
  "& .MuiFormHelperText-root": {
    fontFamily: "Inter !important",
    fontWeight: 300,
    color: theme?.palette?.ihclPalette?.hexThirtyTwo,
    fontSize: `${DesktopPxToVw(18)}!important`,
    "@media (max-width:640px)": {
      fontSize: "2.8vw!important",
    },
  },
  "label + .MuiInputBase-root.MuiInput-root ": {
    marginTop: "0vw",
  },
  "& .MuiInputLabel-shrink.MuiInputLabel-standard": {
    transition:
      "cubic-bezier(0.0, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,max-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
  },
  "& .MuiInputLabel-shrink": {
    transform: "scale(0.75) translate(0, -1.2em)",
  },
}))

export const ErrorMessageTypography = styled(Typography)(() => ({
  textAlign: "start",
  fontSize: `${DesktopPxToVw(18)}!important`,
  fontFamily: fonts?.body,
  fontWeight: 300,
  color: `${theme?.palette?.ihclPalette?.hexThirtyTwo} !important`,
  "@media (max-width: 640px)": {
    fontSize: "2.8vw!important",
  },
}))

export const ActionItemContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: "0.541vw",
  textAlign: "center",
  "@media (max-width:640px)": {
    gap: "3.125vw",
  },
}))

export const MainContainer = styled(Box)(() => ({
  padding: "0vw",
  maxHeight: "100%",
  overflowY: "auto",
  "@media (max-width:640px)": {
    // padding: "5vw 12.813vw",
  },
}))

export const StatusContainer = styled(
  Box,
  transientProps,
)<{
  $isPrimaryAvailable: boolean
}>(({ $isPrimaryAvailable }) => ({
  padding: $isPrimaryAvailable ? "6.927vw 0vw 4.617vw " : "6.927vw 12.813vw 4.617vw",

  "@media (max-width:640px)": {
    padding: "5vw 12.813vw",
  },
}))

export const TitleContainer = styled(
  Box,
  transientProps,
)<{ $isPrimaryAvailable: boolean }>(({ $isPrimaryAvailable }) => ({
  margin: "0 auto",
  width: "20.833vw",
  textAlign: "center",
  marginBottom: $isPrimaryAvailable ? "1.146vw" : "2.188vw",
  "@media (max-width:640px)": {
    width: "100%",
    marginBottom: "3.125vw",
  },
}))

export const DescriptionBox = styled(Box)(() => ({
  background: theme?.palette?.background?.paper,
  textAlign: "center",
  padding: "2.76vw 3.646vw 2.240vw",
  "@media (max-width:640px)": {
    position: "fixed",
    bottom: "0vw",
    width: "100%",
    background: theme?.palette?.ihclPalette?.hexTwentyNine,
    padding: "7.95vw 7.813vw 5.313vw",
  },
}))
