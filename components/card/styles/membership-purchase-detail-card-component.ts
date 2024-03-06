import styled from "@emotion/styled"
import { Grid, Box } from "@mui/material"
import { theme } from "../../../lib/theme"

export const CustomSubGridStyle = styled(Grid)(() => ({
  padding: "1.72vw 0 0 0.521vw ",
  fontFamily: theme?.palette?.font?.primaryFontFamily,
  color: theme?.palette?.primary?.main,
  "@media (max-width:640px)": {},
}))

export const CustomMainGridStyle = styled(Grid)(() => ({
  background: theme?.palette?.background?.paper,
  maxWidth: "75vw",
  width: "100%",
  margin: "3.750vw 0 2.083vw 0",
  paddingLeft: "1.563vw",
  paddingBottom: "2.083vw",
  "@media (max-width:640px)": {
    padding: "3.12vw 6.25vw",
    margin: 0,
    maxWidth: "unset",
  },
}))

export const FlexEndBoxStyle = styled(Box)(() => ({
  display: "flex",
  alignItems: "flex-end",
  gap: "2.083vw",
}))
