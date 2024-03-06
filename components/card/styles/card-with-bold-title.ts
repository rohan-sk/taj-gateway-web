import styled from "@emotion/styled"
import { theme } from "../../../lib/theme"
import { Box, Typography } from "@mui/material"

export const MainBox = styled(Box)(() => ({
  marginBottom: "11vw",
}))

export const ContentBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  color: theme?.palette?.text?.primary,
}))

export const TitleTypo = styled(Typography)(() => ({
  lineHeight: "120%",
  marginTop: "7.8125vw",
}))

export const DescriptionTypo = styled(Typography)(() => ({
  lineHeight: "120%",
  marginTop: "3.125vw",
}))
