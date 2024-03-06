import { Box, Grid, styled, Select, MenuItem, TextField, FormControl, FormHelperText } from "@mui/material"
import { theme } from "../../../../lib/theme"
import CloseIcon from "@mui/icons-material/Close"
import { transientProps } from "../../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"

export const MainBox = styled(
  Box,
  transientProps,
)<{ $quantityErrorMessage: any }>(({ $quantityErrorMessage }) => ({
  backgroundColor: theme?.palette?.background?.paper,
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "2vw",
  padding: $quantityErrorMessage ? `${DesktopPxToVw(20)} ${DesktopPxToVw(40)} ${DesktopPxToVw(50)}` : "1.042vw 2.083vw",
  "@media (max-width:640px)": {
    gap: "3.438vw",
    backgroundColor: theme?.palette?.background?.default,
    padding: "3.125vw",
    alignItems: "start",
  },
}))

export const KhazanaQuantityWrapper = styled(Box)(() => ({
  width: "6.416vw",
  flexGrow: 0,
  flexShrink: 0,
  "& input": {
    fontWeight: 300,
    paddingTop: "0vw!important",
    "@media (max-width:640px)": {
      width: "27.183vw",
    },
    "&::placeholder": {
      fontWeight: "300 !important",
      color: theme?.palette?.ihclPalette?.hexSeventeen,
    },
  },
  height: "2.083vw",
  "@media (max-width:640px)": {
    height: "6.25vw",
    width: "27.183vw!important",
    "&>*": {
      width: "100%",
    },
  },
  "& textarea": {
    fontWeight: 300,
    "&::placeholder": {
      fontWeight: "300 !important",
      color: theme?.palette?.ihclPalette?.hexSeventeen,
      opacity: 1,
    },
  },
  "& .MuiFormControl-root.MuiTextField-root": {
    padding: "0vw!important",
  },
  "&>*": {
    height: "100%",
  },
  "& .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-colorPrimary.MuiInputBase-formControl.MuiInputBase-multiline":
    {
      height: "100%",
    },
}))

export const FormsWrapper = styled(Box)(() => ({
  display: "flex",
  flexGrow: 1,
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
  gap: DesktopPxToVw(40),
  "@media (max-width:640px)": { flexDirection: "column", gap: "6.25vw" },
}))

export const QuantityWrapper = styled(Box)(() => ({
  width: "6.416vw",
  flexShrink: 0,
  flexGrow: 0,
  height: "2.083vw",
  "@media (max-width:640px)": {
    height: "6.25vw",
    width: "27.183vw!important",
    "&>*": {
      width: "100%",
    },
  },
  "& textarea": {
    fontWeight: 300,
    "&::placeholder": {
      fontWeight: 300,
      color: theme?.palette?.ihclPalette?.hexSeventeen,
      opacity: 1,
    },
  },
  "& .MuiFormControl-root.MuiTextField-root": {
    padding: "0vw!important",
  },
  "&>*": {
    height: "100%",
  },
  "& .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-colorPrimary.MuiInputBase-formControl.MuiInputBase-multiline":
    {
      height: "100%",
    },
}))

export const StyledMenuItem = styled(MenuItem)(() => ({
  fontFamily: "Inter",
  fontSize: "0.938vw",
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  fontWeight: 300,
  lineHeight: "140%",
  "@media (max-width:640px)": {
    fontSize: "3.75vw",
  },
}))

export const ProductMenuItem = styled(
  MenuItem,
  transientProps,
)<{
  $mobile: boolean
}>(({ $mobile }) => ({
  display: "flex",
  justifyContent: "space-between",
  fontFamily: "Inter",
  fontSize: $mobile ? "2.813vw" : "1.35vw",
}))

export const IconsWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "end",
  alignItems: "center",
  margin: `${DesktopPxToVw(16)} 0vw ${DesktopPxToVw(36)}`,
  cursor: "pointer",
  width: "9vw",
  float: "right",
  "@media (max-width:640px)": {
    width: "20.625vw",
    margin: `${MobilePxToVw(20)} 0vw ${MobilePxToVw(35)}`,
  },
}))
export const KhazanaFormControl = styled(FormControl)(() => ({
  "& .Mui-disabled": {
    "&::before, &::after": {
      borderBottomStyle: "solid",
    },
  },
  width: "38.75vw",
  height: "2.083vw",
  "@media (max-width:640px)": {
    width: "100%",
    height: "6.25vw",
  },
  "&>*": {
    height: "100%",
  },
  input: {
    height: "100%",
  },
  "&>label": {
    color: theme?.palette?.ihclPalette?.hexSeventeen,
    fontWeight: 300,
    fontFamily: "Inter",
    fontSize: `1.25vw !important`,
    position: "absolute",
    top: "50%",
    lineHeight: "140%",
    transform: "translateY(-50%)!important",
    "@media (max-width:640px)": {
      fontSize: "3.75vw!important",
    },
  },
  "& .MuiSelect-select": {
    "&:focus": {
      backgroundColor: "transparent!important",
    },
  },
  "& .MuiTypography-root": {
    fontSize: "1.25vw!important",
    "@media (max-width:640px)": {
      fontSize: "3.75vw!important",
    },
  },
  "& .MuiSvgIcon-root": { height: "100%", marginBottom: "unset" },
  "& .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-colorPrimary.MuiInputBase-formControl": {
    marginTop: "0px",
  },
  "& .MuiSelect-select.MuiSelect-standard.MuiInputBase-input.MuiInput-input": {
    padding: 0,
    fontSize: "1.25vw!important",
    "@media (max-width:640px)": {
      fontSize: "3.75vw !important",
    },
  },
}))

export const StyledSelect = styled(Select)(() => ({
  width: "22.917vw",
  lineHeight: "1.4vw",
  fontSize: "1.25vw!important",
  "@media (max-width:640px)": {
    width: "100%",
    fontSize: "3.75vw!important",
  },
  "& .MuiBox-root": {
    display: "none",
  },
  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
    "&:focus": {
      backgroundColor: theme?.palette?.background?.default,
    },
  },
}))

export const QuantityField = styled(TextField)(() => ({
  width: "8vw",
  "@media (max-width: 640px)": {
    width: "50vw",
    fontWeight: "300",
  },
  "& .MuiInputBase-input ": {
    fontFamily: "Inter",
    color: theme?.palette?.ihclPalette?.hexSeventeen,
    fontSize: DesktopPxToVw(24),
    "@media (max-width: 640px)": {
      height: "4.2vw",
      fontSize: "3.75vw",
      marginBottom: "2px !important",
      paddingBottom: "0 !important",
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
      fontWeight: 400,
      opacity: 1,
      fontSize: DesktopPxToVw(24),
      "@media (max-width: 640px)": {
        fontSize: "3.75vw",
      },
    },
  },
}))

export const HamperFormControl = styled(FormControl)(() => ({
  "& .Mui-disabled": {
    "&::before, &::after": {
      borderBottomStyle: "solid !important",
    },
  },
  height: DesktopPxToVw(40),
  "@media (max-width:640px)": {
    width: "100%",
    height: "6.25vw",
  },
  "&>*": {
    height: "100%",
  },
  input: {
    height: "100%",
  },
  "&>label": {
    color: theme?.palette?.ihclPalette?.hexSeventeen,
    fontWeight: 300,
    fontFamily: "Inter",
    fontSize: `${DesktopPxToVw(24)}!important`,
    position: "absolute",
    top: "50%",
    lineHeight: "140%",
    transform: "translateY(-50%)!important",
    "@media (max-width:640px)": {
      fontSize: "3.75vw!important",
      fontWeight: "300",
    },
  },
  "& .MuiSelect-select": {
    "&:focus": {
      backgroundColor: "transparent!important",
    },
  },
  "& .MuiTypography-root": {
    fontSize: "1.25vw!important",
    "@media (max-width:640px)": {
      fontSize: "3.75vw!important",
    },
  },
  "& .MuiSvgIcon-root": {
    height: "100%",
    marginBottom: "unset",
    top: "unset",
    color: theme?.palette?.ihclPalette?.hexSeventeen,
  },
  "& .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-colorPrimary.MuiInputBase-formControl": {
    marginTop: "0px",
  },
  "& .MuiSelect-select.MuiSelect-standard.MuiInputBase-input.MuiInput-input": {
    padding: 0,
    fontSize: "1.25vw!important",
    "@media (max-width:640px)": {
      fontSize: "3.75vw !important",
      color: `${theme?.palette?.ihclPalette?.hexSeventeen} !important`,
      fontWeight: 300,
    },
  },
}))

export const GridWrapper = styled(Grid)(() => ({
  backgroundColor: theme?.palette?.background?.paper,
}))

export const AsyaProductOuterGridWrapper = styled(
  Grid,
  transientProps,
)<{ $mobile: boolean }>(({ $mobile }) => ({
  padding: $mobile ? "3.125vw 3.125vw 4.668vw 3.125vw" : "1.024vw 2.083vw",
  backgroundColor: $mobile ? theme?.palette?.background?.default : theme?.palette?.background?.paper,
}))

export const AsyaProductContainer = styled(Box)(() => ({
  display: "flex",
  gap: "2.083vw",
}))

export const AsyaFieldsContainer = styled(
  Box,
  transientProps,
)<{ $mobile: boolean }>(({ $mobile }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "end",
  gap: $mobile ? "3.438vw" : "2.083vw",
  flexDirection: $mobile ? "column" : "row",
  width: "100%",
}))

export const SizeQuantityContainer = styled(
  Box,
  transientProps,
)<{ $mobile: boolean }>(({ $mobile }) => ({
  display: "flex",
  gap: $mobile ? "6.25vw" : "2.083vw",
  alignItems: "end",
  width: $mobile ? "100%" : "14.167vw",
}))

export const StyledSizeFieldSelect = styled(
  Select,
  transientProps,
)<{ $mobile: boolean }>(({ $mobile }) => ({
  width: $mobile ? "27.183vw" : "6.146vw",
  paddingBottom: $mobile ? MobilePxToVw(14) : DesktopPxToVw(14),
  fontSize: "24px",
}))

export const StyledCloseIcon = styled(
  CloseIcon,
  transientProps,
)<{ $mobile: boolean }>(({ $mobile }) => ({
  fontSize: $mobile ? "4.469vw" : "2vw",
  marginTop: $mobile ? "0.781vw" : "",
  fontWeight: 200,
  cursor: "pointer",
}))

export const AsyaFormControl = styled(FormControl)(() => ({
  height: DesktopPxToVw(40),
  "@media (max-width:640px)": {
    width: "100%",
    height: "6.25vw",
  },
  "&>*": {
    height: "100%",
  },
  input: {
    height: "100%",
  },
  "&>label": {
    color: theme?.palette?.ihclPalette?.hexSeventeen,
    fontWeight: 300,
    fontFamily: "Inter",
    fontSize: `${DesktopPxToVw(24)}!important`,
    position: "absolute",
    top: "50%",
    lineHeight: "140%",
    transform: "translateY(-50%)!important",
    "@media (max-width:640px)": {
      fontSize: "3.75vw!important",
    },
  },
  "& .MuiSelect-select": {
    "&:focus": {
      backgroundColor: "transparent!important",
    },
  },
  "& .MuiTypography-root": {
    fontSize: "1.25vw!important",
    "@media (max-width:640px)": {
      fontSize: "3.75vw!important",
    },
  },
  "& .MuiSvgIcon-root": { height: "100%", marginBottom: "unset" },
  "& .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-colorPrimary.MuiInputBase-formControl": {
    marginTop: "0px",
  },
  "& .MuiSelect-select.MuiSelect-standard.MuiInputBase-input.MuiInput-input": {
    padding: 0,
    fontSize: "1.25vw!important",
    "@media (max-width:640px)": {
      fontSize: "3.75vw !important",
    },
  },
}))

export const TextAreaWrapper = styled(Box)(() => ({
  width: "100%",
  paddingTop: "0vw!important",
  "& .MuiFormControl-root.MuiTextField-root": {
    width: "100%!important",
  },
  "& textarea, & .MuiInputBase-root &>*": {
    width: "100%!important",
    minHeight: "2.5vw",
    letterSpacing: "1px",
    lineHeight: "140%",
    "@media(max-width:640px)": {
      width: "100%!important",
      minHeight: "10vw",
    },
  },
}))

export const StyledErrorMessage = styled(FormHelperText)(() => ({
  textAlign: "start",
  fontSize: `${DesktopPxToVw(18)}!important`,
  fontFamily: "Inter",
  fontWeight: 300,
  color: theme?.palette?.ihclPalette?.hexTwentyOne,
  alignSelf: "self-start",
  "& .MuiTypography-root": {
    fontSize: "0.625vw!important",
  },
  "@media (max-width: 640px)": {
    fontSize: `${MobilePxToVw(18)}!important`,
  },
}))
