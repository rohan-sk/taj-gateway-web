import { styled } from "@mui/system"
import { theme } from "../../../lib/theme"
import { Box, Button, TextField, Typography } from "@mui/material"

export const MainBox = styled(Box)(() => ({
  width: "75vw",
  display: "flex",
  margin: "0vw auto",
  flexDirection: "column",
  padding: "2.90vw 6.40vw",
  boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
  background: theme?.palette?.background?.default,
}))

export const PrimaryFieldsBox = styled(Box)(() => ({
  display: "flex",
  flexWrap: "wrap",
  paddingRight: "2vw",
}))

export const SecondaryFieldsBox = styled(Box)(() => ({
  padding: "2.083vw 1.56vw 1.04vw 1.56vw",
  background: theme?.palette?.background?.paper,
}))

export const TitleTypography = styled(Typography)(() => ({
  textAlign: "center",
  marginBottom: "2.45vw",
}))

export const StyledTextField = styled(TextField)(() => ({
  paddingRight: "2vw",
  minWidth: "17.34vw",
  input: {
    padding: "0vw",
    fontWeight: 300,
    fontSize: "1.25vw",
    lineHeight: "1.875vw",
    paddingBottom: "0.21vw",
    color: theme?.palette?.text?.primary,
    borderBottom: `0.10vw solid ${theme?.palette?.ihclPalette?.hexTwelve}`,

    "&::placeholder": {
      opacity: 1,
      textOverflow: "ellipsis !important",
    },
  },
}))

export const EnquireButton = styled(Button)(() => ({
  width: "8.6vw",
  margin: "0 auto",
  marginTop: "2vw",
}))

export const DefaultStyleBox = styled(Box)(() => ({
  "&>*": {
    width: "inherit",
    boxShadow: "0 0 0 0 rgba(0,0,0,0)!important",
    mozBoxShadow: "0 0 0 0 rgba(0,0,0,0)!important",
    webkitBoxShadow: "0 0 0 0 rgba(0,0,0,0)!important",
    padding: "0vw!important",
  },
}))
