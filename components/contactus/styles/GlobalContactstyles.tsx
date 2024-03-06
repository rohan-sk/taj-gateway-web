import styled from "@emotion/styled"
import { theme } from "../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import { Box, Radio, Button, TextField, Typography, FormControlLabel, Stack } from "@mui/material"

export const RadioButton = styled(Radio)(() => ({
  color: theme?.palette?.ihclPalette?.hexTwelve,
  padding: "0vw",
  "&.Mui-checked": {
    color: theme?.palette?.ihclPalette?.hexTwo,
  },
  "& .MuiSvgIcon-root": {
    fontSize: "1.458vw",
    "@media (max-width:640px)": {
      width: "4.688vw",
      height: "4.688vw",
    },
  },
}))

export const FlexBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "baseline",
  justifyContent: "space-between",
  "@media (max-width: 640px)": {
    flexDirection: "column",
  },
}))

export const SubtitleBox = styled(Box)(() => ({
  margin: "0vw 0vw 1.9vw 0vw ",
  textAlign: "center",
}))

export const ContactDetailsBox = styled(Box)(() => ({
  padding: "0vw 25vw",
  textAlign: "center",
}))

export const CountryName = styled(Typography)(() => ({
  fontSize: "1.1340vw",
  fontWeight: "700",
  lineHeight: "140%",
  fontFamily: "Inter",
  fontStyle: "normal",
  color: theme?.palette?.text?.primary,
}))

export const CountryPhone = styled(Typography)(() => ({
  fontSize: "1.1340vw",
  fontWeight: "300",
  lineHeight: "140%",
  fontFamily: "Inter",
  fontStyle: "normal",
  color: theme?.palette?.text?.primary,
}))

export const SubmitButton = styled(Button)(() => ({
  margin: `${DesktopPxToVw(35)} auto`,
  display: "flex",
}))

export const SubTitle = styled(Typography)(() => ({
  color: theme?.palette?.text?.primary,
  fontSize: "1.14vw",
}))

export const CenterAlignItemsBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",

  "@media (max-width: 640px)": {
    flexDirection: "column",
    alignItems: "unset",
  },
}))

export const FilterStack = styled(Stack)(() => ({
  flexDirection: "row",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "baseline",
  "@media (max-width:640px)": {
    alignItems: "start",
    flexDirection: "column",
    gap: MobilePxToVw(35),
  },
}))
export const LocationTextField = styled(TextField)(() => ({
  marginRight: "5.677vw",
  width: "22.083vw",
  "& input::placeholder": {
    fontSize: "1.25vw",
    color: theme?.palette?.text?.primary,
  },
  "@media (max-width: 640px)": {
    width: "74.375vw",
    "& input::placeholder": {
      fontSize: "3.750vw",
    },
  },
}))

export const InputTextField = styled(TextField)(() => ({
  width: "100%",
  height: "2.083vw",
  input: {
    padding: "0vw",
  },
  "& input": {
    "&::placeholder": {
      opacity: 1,
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
  "label + .MuiInputBase-root.MuiInput-root ": {
    marginTop: "0vw",
  },
}))

export const SaleOfficeFormControlLabel = styled(FormControlLabel)(() => ({
  paddingRight: "1.927vw",
  gap: "0.938vw",
  margin: "0",
  fontSize: "12.14vw",
  "@media (max-width: 640px)": {
    paddingRight: "7.031vw",
  },
}))

export const ViewMapLocationBox = styled(Box)(() => ({
  height: "1.45vw",
  width: "1.45vw",
}))

export const ViewMapLocationOnIcon = styled(LocationOnIcon)(() => ({
  color: theme?.palette?.text?.primary,
}))

export const ViewMapContainerBox = styled(Box)(() => ({
  display: "flex",
  cursor: "pointer",
  gap: "0.521vw",
  "@media (max-width:640px)": {
    gap: "4.521vw",
  },
}))
export const ContactDetailBox = styled(Box)(() => ({
  padding: "0vw 25vw",
  textAlign: "center",
  "@media (max-width:640px)": {
    padding: "0vw 12.813vw",
  },
}))
export const BorderBox = styled(Box)(() => ({
  borderBottom: `1px solid ${theme?.palette?.ihclPalette?.hexTwelve}`,
}))
export const MainBox = styled(Box)(() => ({
  padding: "1.615vw 0vw",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "@media (max-width:640px)": {
    padding: "3.125vw 0vw",
  },
}))
export const TitleTypography = styled(Typography)(() => ({
  fontWeight: 700,
  textAlign: "initial",
  width: "15.625vw",
  "@media(max-width:640px)": {
    width: "43.750vw",
  },
}))
export const ValueTypography = styled(Typography)(() => ({
  fontWeight: 300,
}))
