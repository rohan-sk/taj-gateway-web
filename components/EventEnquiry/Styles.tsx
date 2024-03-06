import styled from "@emotion/styled"
import { Box, Button, TextField } from "@mui/material"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import { theme } from "../../lib/theme"

export const BoxWrapper = styled(Box)(() => ({
  textAlign: "center",
  width: "60%",
  backgroundColor: "#FFFF",
  margin: "auto",
  padding: "4% 4% 2% 4%",
  "@media(max-width: 800px)": {
    width: "80%",
  },
}))
export const ColumnFlexBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  "&>*": {
    width: "100%",
  },
}))
export const SBFlex = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  gap: "15px",
  margin: "2.448vw 0",
}))

export const DateTextField = styled(TextField)(() => ({
  width: "33vw",
  fontSize: DesktopPxToVw(24),
  marginRight: "2vw",
  "& .MuiIconButton-root , & .MuiInput-root": {
    right: "1vw",
    color: "red",
  },
  "& .Mui-error": {
    color: `${theme?.palette?.text?.primary} `,
  },
  "& .Mui-error:before": {
    borderBottomColor: `${theme?.palette?.text?.primary} `,
  },
  "& .MuiInput-input": {
    fontSize: DesktopPxToVw(240),
    color: "red!important",
  },
  "&  .MuiFormHelperText-root": {
    color: `${theme?.palette?.neuPalette?.hexTwentyOne}`,
    fontSize: DesktopPxToVw(18),
  },
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      fontWeight: 500,
      opacity: 1,
      fontSize: DesktopPxToVw(24),
      color: theme?.palette?.neuPalette?.hexSeventeen,
    },
  },
}))
export const MobileNumberInput = styled(TextField)(() => ({
  input: {
    fontSize: DesktopPxToVw(24),
    alignSelf: "flex-end",
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      fontWeight: 500,
      opacity: 1,
      color: theme?.palette?.neuPalette?.hexSeventeen,
      fontSize: DesktopPxToVw(24),
    },
  },
}))

export const TextFieldsWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
}))

export const StyledField = styled(TextField)(() => ({
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: "black",
      fontWeight: 500,
      opacity: 1,
    },
  },
}))

export const MobileNumberField = styled(TextField)(() => ({
  width: "30%",
  color: "black",
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
  },
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: "black",
      fontWeight: 500,
      opacity: 1,
    },
  },
}))

export const SubmitButton = styled(Button)(() => ({
  fontWeight: 700,
  width: "165px",
  lineHeight: "1.30vw",
  fontFamily: "Inter",
  textAlign: "center",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  "&:hover": {
    color: "#FFFFFF",
    background: "#AD8B3A",
  },
  margin: "4% 0%",
}))
