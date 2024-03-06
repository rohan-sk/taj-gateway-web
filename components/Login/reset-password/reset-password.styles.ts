import { Box, TextField, styled } from "@mui/material"
import DesktopPxToVw from "../../../utils/DesktopFontCalc"
import { theme } from "../../../lib/theme"

export const PasswordTextField = styled(TextField)(() => ({
  width: "36.458vw",
  margin: "1vw 0vw",
  fontWeight: 300,
  fontFamily: "supreme",
  "@media (max-width: 640px)": {
    width: "84.375vw",
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
    color: `${theme?.palette?.ihclPalette?.hexThirtyTwo} !important`,
    fontWeight: 300,
    fontSize: DesktopPxToVw(18),
    "@media (max-width: 640px)": {
      fontSize: "2.75vw",
    },
  },
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: theme?.palette?.ihclPalette?.hexSeventeen,
      fontWeight: 300,
      opacity: 1,
      fontSize: DesktopPxToVw(24),
      "@media (max-width: 640px)": {
        fontSize: "3.75vw",
      },
    },
  },
}))

export const ImagesContainer = styled(Box)(() => ({
  display: "flex",
  gap: "2vw",
  alignItems: "end",
  justifyContent: "center",
  margin: "1.4vw 0vw 2.4vw 0vw",
  "@media (max-width: 640px)": {
    margin: "0vw 0vw 10vw 0vw",
  },
}))
