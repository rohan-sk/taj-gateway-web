import { theme } from "../../../lib/theme"
import { styled, Box, Typography } from "@mui/material"

export const MainBox = styled(Box)(() => ({
  display: "flex",
  textAlign: "center",
  alignItems: "center",
  flexDirection: "column",

  "@media (max-width: 640px)": {
    maxWidth: "100%",
    margin: "0 3.125vw",
  },
}))

export const TitleBox = styled(Box)(() => ({
  marginTop: "38px",
  "@media (max-width: 640px)": {
    marginTop: "8.43vw",
  },
}))
export const TitleTypo = styled(Typography)(() => ({
  lineHeight: "140%",
  color: theme?.palette?.text?.primary,

  "@media (max-width: 640px)": {
    margin: "0vw",
    lineHeight: "5.25vw",
  },
}))
export const DescriptionTypo = styled(Typography)(() => ({
  maxWidth: "95%",
  lineHeight: "140%",
  color: theme?.palette?.text?.primary,
  padding: "0 2vw",
  "@media (max-width: 640px)": {
    maxWidth: "100%",
    lineHeight: "3.93vw",
    margin: "2.81vw 6.25vw 0vw 6.25vw",
  },
}))
