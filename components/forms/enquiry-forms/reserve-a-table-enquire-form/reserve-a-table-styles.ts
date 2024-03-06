import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography, styled } from "@mui/material"
import { fonts, theme } from "../../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"

export const NameField = styled(TextField)(() => ({
  "& .MuiInputBase-root.MuiInput-root": {
    "&::before": {
      borderBottomStyle: "solid!important",
    },
  },
  "& .MuiInputBase-input ": {
    fontFamily: "supreme",
    fontSize: DesktopPxToVw(24),
    "@media (max-width: 640px)": {
      height: "4.2vw",
      fontSize: "3.75vw",
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
      color: theme?.palette?.ihclPalette?.hexSeventeen,
      fontFamily: "supreme",
      fontWeight: 300,
      opacity: 1,
      fontSize: DesktopPxToVw(24),
      "@media (max-width: 640px)": {
        fontSize: "3.75vw",
      },
    },
  },
}))

export const PhoneNumberField = styled(TextField)(() => ({
  "& .MuiInputBase-root.MuiInput-root": {
    "&::before": {
      borderBottomStyle: "solid!important",
    },
  },
  "& .MuiInputBase-input ": {
    fontFamily: "supreme",
    fontSize: DesktopPxToVw(24),
    "@media (max-width: 640px)": {
      fontSize: "3.750vw !important",
      paddingLeft: "2vw",
    },
  },
  "& .MuiFormHelperText-root": {
    color: theme?.palette?.ihclPalette?.hexTwentyOne,
    fontSize: DesktopPxToVw(18),
  },
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: theme?.palette?.ihclPalette?.hexSeventeen,
      fontFamily: "supreme",
      fontWeight: 400,
      opacity: 1,
      fontSize: DesktopPxToVw(24),
      "@media (max-width: 640px)": {
        fontSize: "3.750vw !important",
      },
    },
  },
}))

export const EmailField = styled(TextField)(() => ({
  "& .MuiInputBase-root.MuiInput-root": {
    "&::before": {
      borderBottomStyle: "solid!important",
    },
  },
  "& .MuiInputBase-input ": {
    fontFamily: "supreme",
    fontSize: DesktopPxToVw(24),
    "@media (max-width: 640px)": {
      fontSize: "3.750vw !important",
    },
  },
  "& .MuiFormHelperText-root": {
    color: theme?.palette?.ihclPalette?.hexTwentyOne + "!important",
    fontSize: DesktopPxToVw(18),
    fontWeight: 300,
    "@media (max-width: 640px)": {
      fontSize: "2.75vw",
    },
  },
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: theme?.palette?.ihclPalette?.hexSeventeen,
      fontFamily: "supreme",
      fontWeight: 400,
      opacity: 1,
      fontSize: DesktopPxToVw(24),
      "@media (max-width: 640px)": {
        fontSize: "3.750vw !important",
      },
    },
  },
}))

export const StyledBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "self-end",
  marginBottom: "1.4vw",
}))

export const MobileNumberWrapper = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  alignItems: "self-end",
  "@media (max-width: 640px)": {
    alignItems: "self-end",
    "& .MuiInputBase-input": {
      paddingLeft: "0vw",
    },
    "& .MuiInputBase-root.MuiInput-root": {
      minWidth: "0vw",
    },
    "& .MuiSvgIcon-root": {
      right: "0vw",
      top: "1.875vw",
    },
    "& .MuiInputBase-root": {
      paddingBottom: "0vw",
    },
  },
}))

export const ErrorMessageTypography = styled(Typography)(() => ({
  textAlign: "start",
  fontSize: `${DesktopPxToVw(18)}!important`,
  fontFamily: fonts?.body,
  fontWeight: 300,
  color: theme?.palette?.ihclPalette?.hexTwentyOne,
  alignSelf: "self-start",
  "@media (max-width: 640px)": {
    fontSize: "2.8vw!important",
  },
}))

export const DateTextField = styled(TextField)(() => ({
  width: "100%",
  fontSize: DesktopPxToVw(24),
  lineHeight: "2.083vw",
  "@media (max-width: 640px)": {
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
  },
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      fontWeight: 500,
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

export const StyledInputLabel = styled(InputLabel)(() => ({
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  fontSize: DesktopPxToVw(24),
  lineHeight: "1.5em",
  top: "50%",
  transform: "translateY(-50%)",
  "@media (max-width: 640px)": {
    fontSize: "3.45vw",
  },
}))

export const MainGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
  padding: "2.865vw 6.406vw 2.083vw",
  width: "75%",
  background: theme?.palette?.background?.default,
  boxShadow: "-6px 10px 24px 0px rgba(0,0,0,0.1)",
  margin: "0 auto",
  color: theme?.palette?.background?.default,
  "@media (max-width: 640px)": {
    boxShadow: "unset",
    background: theme?.palette?.background?.paper,
    width: "100%",
    padding: "7.469vw 12.813vw 5.469vw",
  },
}))

export const SelectGuestList = styled(Select)(() => ({
  lineHeight: "100%",
  fontSize: "1.35vw",
  "@media (max-width: 640px)": {
    fontSize: MobilePxToVw(24),
  },
}))

export const SelectTimeSlots = styled(Select)(() => ({
  marginRight: "2vw",
  fontSize: "1.35vw",
  lineHeight: "2.083vw",
}))

export const StyledMenuItem = styled(MenuItem)(() => ({
  fontFamily: "supreme",
}))

export const ButtonWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "2vw 0vw",
}))

export const StyledFormControl = styled(FormControl)(() => ({
  height: "2.083vw",
  position: "relative",
  "& .MuiSelect-select": {
    marginBottom: "10px",
  },
  "& .MuiInputBase-root.MuiInput-root": {
    margin: "0vw!important",
  },
  "& .MuiSelect-select.MuiSelect-standard": {
    margin: "0vw!important",
    padding: "0vw!important",
  },
  input: {
    fontFamily: "supreme",
    fontWeight: 300,
    color: theme?.palette?.ihclPalette?.hexSeventeen,
    "&, &::placeholder": {
      background: "transparent!important",
      fontSize: "1.25vw",
    },
  },
  "@media (max-width: 640px)": {
    "& .MuiSelect-select": {
      marginBottom: "20px",
    },
  },
}))

export const ColumnFlexBox = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
}))
