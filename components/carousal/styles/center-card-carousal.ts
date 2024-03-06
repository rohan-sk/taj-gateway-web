import styled from "@emotion/styled"
import { Box, Typography } from "@mui/material"
import { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { theme } from "../../../lib/theme"

export const ContentBox = styled(Box)(() => ({
  bottom: "5vw",
  color: theme?.palette?.background?.default,
  display: "flex",
  alignItems: "center",
  position: "absolute",
  flexDirection: "column",
  padding: `0px ${MobilePxToVw(39)}`,
}))

export const DescriptionTypo = styled(Typography)(() => ({
  textAlign: "center",
  marginTop: "2.65vw",
}))
