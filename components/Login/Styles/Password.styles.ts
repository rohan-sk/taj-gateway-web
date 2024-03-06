import { Box, Button, Grid, TextField, Typography, styled } from "@mui/material"
import { theme } from "../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const GridContainer = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}))

export const TitleTypography = styled(Typography)(() => ({
  margin: "3.333vw 0vw 1.302vw 0vw",
  "@media (max-width: 640px)": {
    margin: "9.375vw 0vw 4vw 0vw",
  },
}))

export const SubTitleTypography = styled(Typography)(() => ({
  marginBottom: "2vw",
  "@media (max-width: 640px)": {
    marginBottom: "9.375vw",
  },
}))

export const GridWrapper = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "space-between",
}))

export const BoxWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  alignSelf: "normal",
  margin: "auto",
}))

export const CheckboxWrapper = styled(Box)(() => ({
  display: "flex",
  marginRight: "13.875vw",
  alignItems: "center",
  gap: "0.6vw",
  "@media (max-width: 640px)": {
    marginRight: "10.313vw",
    gap: "2vw",
  },
}))

export const RememberMeTypography = styled(Typography)(() => ({
  alignItems: "center",
}))

export const StyledTypography = styled(Typography)(() => ({
  color: theme?.palette?.neuPalette?.hexTwo,
}))

export const LoginWithOtpButton = styled(Button)(() => ({
  width: "11vw",
  marginRight: "2vw",
}))

export const LoginButton = styled(Button)(() => ({
  width: "8vw",
}))

export const StyledTextField: any = styled(TextField)(() => ({
  width: "36.458vw",
  paddingTop: "0.5vw",
  "@media (max-width: 640px)": {
    padding: "0vw",
    alignItems: "center",
    width:MobilePxToVw(540)
  },
  "&  .MuiFormHelperText-root": {
    color: `${theme?.palette?.neuPalette?.hexThirtyTwo} !important`,
    fontSize: DesktopPxToVw(18),
    "@media (max-width: 640px)": {
      fontSize: "3.750vw !important",
    },
  },

  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: theme?.palette?.neuPalette?.hexEleven,
      fontWeight: 300,
      opacity: 0.8,
      fontSize: "1.2vw",
      "@media (max-width: 640px)": {
        fontSize: "3.750vw !important",
        fontWeight: 300,
      },
    },
  },
  "& .MuiInputBase-input": {
    fontSize: "1.1vw !important",
    "@media (max-width: 640px)": {
      fontSize: "3.750vw !important",
      width: "78vw",
    },
  },
}))

export const ButtonsWrapper = styled(Box)(() => ({
  "@media (max-width: 640px)": {
    display: "flex",
    flexDirection: "column-reverse",
    margin: "auto",
  },
}))
