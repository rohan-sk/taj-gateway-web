import { theme } from "../../../lib/theme"
import { Box, styled, Typography } from "@mui/material"

export const ContentBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  padding: "8.43vw 6.09vw 8.56vw 6.09vw",
 
}))

export const DescriptionTypo = styled(Typography)(() => ({
  lineHeight: "140%",
  marginTop: "1.87vw",
  color: theme?.palette?.text?.primary,
}))

export const ActionItemBox = styled(Box)(() => ({
  display: "flex",
  marginTop: "4.21vw",
}))
