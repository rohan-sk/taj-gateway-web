import { Box, Grid, InputLabel, MenuItem, Select, TextField, Typography, styled } from "@mui/material"
import { fonts, theme } from "../../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"

export const MainGridWrapper = styled(Grid)(() => ({
  backgroundColor: theme?.palette?.background?.default,
  boxShadow: `-6px 10px 24px rgba(0, 0, 0, 0.1)`,
  margin: "1.042vw 12.500vw 0vw",
  padding: "3.125vw 4vw 0vw 4vw",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxHeight: "100%",
  overflowY: "auto",
  "@media (max-width: 640px)": {
    boxShadow: "unset",
    margin: "auto",
    overflowY: "unset",
    alignItems: "center",
    padding: "11.250vw 12.813vw",
    backgroundColor: theme?.palette?.background?.paper,
  },
}))
export const MobileNumberWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "self-end",
  paddingTop: "0.1vw",
  "& .MuiInputLabel-root": {
    paddingTop: "0.3vw!important",
  },
  "@media (max-width: 640px)": {
    margin: "1.563vw 0vw",
    paddingTop: "0vw",
    alignItems: "self-end",
    "& .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-colorPrimary": {
      minWidth: "0vw",
      paddingTop: "0vw",
    },
    "& input, & label": {
      paddingLeft: "3.75vw!important",
    },

    "& .MuiSvgIcon-root": {
      right: "0vw",
    },
  },
}))

export const NameField = styled(TextField)(() => ({
  "& .MuiInputBase-root.MuiInput-root": {
    "&::before": {
      borderBottomStyle: "solid!important",
    },
  },
  width: "21.354vw",
  marginRight: "2vw",
  "@media (max-width: 640px)": {
    width: "100%",
    margin: "1.563vw 0vw",
    "& input": {
      WebkitTextFillColor: `${theme?.palette?.ihclPalette?.hexSeventeen} !important`,
    },
  },
  "& .MuiInputBase-input ": {
    fontFamily: "Inter",
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
    color: theme?.palette?.ihclPalette?.hexSeventeen,
    fontWeight: 300,
    fontSize: DesktopPxToVw(24),
    opacity: 1,
    "&::placeholder": {
      opacity: 1,
      fontSize: DesktopPxToVw(24),
      fontWeight: 300,
      color: theme?.palette?.ihclPalette?.hexSeventeen,
    },
  },
  "& .MuiInputLabel-root": {
    textOverflow: "ellipsis !important",
    color: theme?.palette?.ihclPalette?.hexSeventeen,
    fontWeight: 300,
    lineHeight: "1vw",
    opacity: 1,
    fontSize: DesktopPxToVw(24),
    "@media (max-width: 640px)": {
      width: "55.625vws",
      lineHeight: "4vw",
      fontSize: "3.75vw",
    },
  },
}))

export const PhoneNumberField = styled(TextField)(() => ({
  "& .MuiInputBase-root.MuiInput-root": {
    "&::before": {
      borderBottomStyle: "solid!important",
    },
  },
  width: "10vw",
  "@media (max-width:640)": {
    width: "100%",
    "& input": {
      WebkitBoxShadow: `0 0 0 50px ${theme?.palette?.ihclPalette?.hexTwentyNine} inset !important`,
      WebkitTextFillColor: `${theme?.palette?.ihclPalette?.hexSeventeen} !important`,
    },
  },
  marginRight: "2vw",
  "@media (max-width: 640px)": {
    width: "100%",
    margin: "0vw",
  },
  "& .MuiInputBase-input ": {
    fontFamily: "Inter",
    fontSize: DesktopPxToVw(24),
    paddingLeft: "0.6vw",

    "@media (max-width: 640px)": {
      fontSize: "3.750vw !important",
      paddingLeft: "2vw",
    },
  },
  "& .MuiFormHelperText-root": {
    color: theme?.palette?.ihclPalette?.hexTwentyOne,
    fontSize: DesktopPxToVw(18),
  },
  "& .MuiInputLabel-root": {
    lineHeight: "1vw",
    textOverflow: "ellipsis !important",
    color: theme?.palette?.ihclPalette?.hexSeventeen,
    fontWeight: 300,
    opacity: 1,
    fontSize: DesktopPxToVw(24),
    paddingLeft: "0.4vw",
    "@media (max-width: 640px)": {
      fontSize: "3.750vw !important",
      lineHeight: "4vw",
    },
  },
}))

export const EmailField = styled(TextField)(() => ({
  "& .MuiInputBase-root.MuiInput-root": {
    "&::before": {
      borderBottomStyle: "solid!important",
    },
  },
  width: "21.354vw",
  marginRight: "2vw",
  "@media (max-width: 640px)": {
    width: "100%",
    margin: "1.563vw 0vw",
  },
  "& .MuiInputBase-input ": {
    fontFamily: "Inter",
    fontSize: DesktopPxToVw(24),
    "@media (max-width: 640px)": {
      fontSize: "3.750vw !important",
    },
  },
  "& .MuiFormHelperText-root": {
    color: theme?.palette?.ihclPalette?.hexTwentyOne,
    fontSize: DesktopPxToVw(18),
    "@media (max-width: 640px)": {
      fontSize: "2.75vw",
    },
  },
  "& .MuiInputLabel-root": {
    lineHeight: "1vw",
    textOverflow: "ellipsis !important",
    color: theme?.palette?.ihclPalette?.hexSeventeen,
    fontWeight: 300,
    opacity: 1,
    fontSize: DesktopPxToVw(24),
    "@media (max-width: 640px)": {
      fontSize: "3.750vw !important",
      lineHeight: "4vw",
    },
  },
}))

export const ErrorMessageTypography = styled(Typography)(() => ({
  color: theme?.palette?.ihclPalette?.hexTwentyOne,
  fontSize: DesktopPxToVw(18),
  alignSelf: "self-start",
  "@media (max-width: 640px)": {
    fontSize: "2.75vw",
    lineHeight: "4vw !important",
  },
}))

export const StyledInputLabel = styled(InputLabel)(() => ({
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  fontWeight: 300,
  fontFamily: fonts?.body,
  fontSize: DesktopPxToVw(24),
  "@media (max-width: 640px)": {
    fontSize: "3.45vw",
  },
}))

export const DateTextField = styled(TextField)(() => ({
  width: "33vw",
  fontSize: DesktopPxToVw(24),
  marginRight: "2vw",
  "@media (max-width: 640px)": {
    width: "74.375vw",
    fontSize: "3.75vw",
    margin: "3vw 0vw",
    lineHeight: "4vw !important",
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
      lineHeight: "4vw !important",
    },
  },
  "&  .MuiFormHelperText-root": {
    color: `${theme?.palette?.ihclPalette?.hexTwentyOne} !important`,
    fontSize: DesktopPxToVw(18),
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
        lineHeight: "4vw !important",
      },
    },
  },
}))

export const StyledMenuItem = styled(MenuItem)(() => ({
  fontFamily: "Inter",
  fontSize: "1.250vw",
  "@media (max-width: 640px)": {
    fontSize: "3.750vw",
  },
}))

export const InputText = styled(TextField)(() => ({
  width: "22.96vw",
  "& .MuiInput-input": {
    fontSize: DesktopPxToVw(24),
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
      opacity: 1,
      fontWeight: 300,
      fontSize: DesktopPxToVw(24),
      textOverflow: "ellipsis !important",
      color: theme?.palette?.ihclPalette?.hexSeventeen,
    },
  },

  "@media (max-width: 640px)": {
    "&  .MuiFormHelperText-root": {
      fontSize: MobilePxToVw(18),
    },
    width: "100%",
    padding: `${MobilePxToVw(15)} 0vw `,
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

export const ReadMoreWrapper = styled(Box)(() => ({
  padding: " 20px 0vw",
  backgroundColor: theme?.palette?.background?.paper,
  width: "100%",
  textAlign: "center",
}))

export const DatePickerWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "self-end",
  marginLeft: "2vw",
  marginTop: "-1vw",
}))

export const SelectIncredibleJourney = styled(Select)(() => ({
  width: "19.6vw",
  lineHeight: "1vw",
  fontSize: "1.250vw",
  fontFamily: "Inter",
  "& .MuiSelect-select": {
    "&:focus": {
      backgroundColor: theme?.palette?.background?.default,
    },
  },
  "@media (max-width: 640px)": {
    width: "74.375vw",
    fontSize: "3.75vw",
    lineHeight: "4.8vw",
    margin: "4vw 0vw",
  },
}))

export const NameFieldsWrapper = styled(Box)(() => ({
  display: "grid",
  padding: "0vw 2vw",
  gridTemplateColumns: `1fr 1fr 1fr`,
  gap: DesktopPxToVw(40),
  alignSelf: "end",
  "@media (max-width: 640px)": {
    padding: "0vw",
    width: "100%",
    display: "flex",
    alignSelf: "center",
    gap: MobilePxToVw(40),
    flexDirection: "column",
  },
}))

export const SelectDropDownWrapper = styled(Box)(() => ({
  margin: "1vw 0vw",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  "@media (max-width: 640px)": {
    flexDirection: "column",
  },
}))

export const DateWrapper = styled(Box)(() => ({
  display: "flex",
  alignSelf: "end",
  alignItems: "end",
  marginBottom: "1vw",
  margin: "0.6vw 0.4vw 1vw 0vw",
  flexDirection: "row",
  "@media (max-width: 640px)": {
    flexDirection: "column",
    alignItems: "center",
  },
}))

export const CheckBoxWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  "@media (max-width: 640px)": {
    flexDirection: "column",
  },
}))

export const BlockTextWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  margin: "0.6vw 2vw 0vw 0vw",
  "@media (max-width: 640px)": {
    margin: "2vw 0vw 4vw 0vw",
    alignItems: "flex-start",
  },
}))

export const CitySelect = styled(Select)(() => ({
  width: "30.052vw",
  lineHeight: "1vw",
  "&.Mui-disabled": {
    "&:before": {
      borderBottomStyle: "outset !important",
    },
  },
  fontSize: DesktopPxToVw(24),
  "& .MuiSelect-select": {
    "&:focus": {
      backgroundColor: theme?.palette?.background?.default,
    },
  },
  "@media (max-width: 640px)": {
    width: "74.375vw",
    lineHeight: "4vw",
    fontSize: MobilePxToVw(24),
  },
}))

export const CountryState = styled(Select)(() => ({
  width: "30.052vw",
  "&.Mui-disabled": {
    "&:before": {
      borderBottomStyle: "outset !important",
    },
  },
  marginRight: "2vw",
  lineHeight: "2vw",
  fontSize: DesktopPxToVw(24),
  "& .MuiSelect-select": {
    "&:focus": {
      backgroundColor: theme?.palette?.background?.default,
    },
  },
  "@media (max-width: 640px)": {
    width: "74.375vw",
    lineHeight: "4vw",
    marginRight: "0vw",
    marginBottom: "3vw",
    fontSize: MobilePxToVw(24),
    "& input": {
      WebkitBoxShadow: `0 0 0 50px ${theme?.palette?.ihclPalette?.hexTwentyNine} inset !important`,
      WebkitTextFillColor: `${theme?.palette?.ihclPalette?.hexSeventeen} !important`,
    },
  },
}))
