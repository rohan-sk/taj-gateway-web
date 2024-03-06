import styled from "@emotion/styled"
import { Box, Stack, Typography } from "@mui/material"
import DesktopPxToVw from "../../../../utils/DesktopFontCalc"
import { theme } from "../../../../lib/theme"

export const MainContainer = styled(Box)(() => ({
  margin: "0 auto",
  "@media (max-width:640px)": {
    padding: "10.938vw 7.813vw 17.188vw",
  },
}))
export const TitleMainStack = styled(Stack)(() => ({
  justifyContent: "initial",
  textAlign: "start",
  marginBottom: DesktopPxToVw(35),
  "@media(max-width:640px)": {
    justifyContent: "center",
    textAlign: "center",
    marginBottom: "0vw",
  },
}))
export const TitleBox = styled(Box)(() => ({
  margin: "1.042vw 2vw 0vw 2.083vw",
  width: "93%",
  borderBottom: `1px solid ${theme?.palette?.neuPalette?.hexSixteen}`,
  "@media(max-width:640px)": {
    width: "85%",
    margin: "3.125vw 0vw 5.469vw 6.250vw",
    paddingBottom: "3.281vw",
  },
}))
export const TitleTypography = styled(Typography)(() => ({
  paddingBottom: "0.521vw",
  "@media(max-width:640px)": {
    paddingBottom: "3.281vw",
  },
}))

export const TypographyRenewalTitle = styled(Typography)(() => ({
  fontSize: "2.083vw", 
  lineHeight: "140%" ,
  "@media (max-width:640px)": {
  fontSize: "5vw",
  },
}))

export const BoxTier = styled(Box)(() => ({
  border: `1px solid ${theme?.palette?.neuPalette?.hexSixteen}`,
  "&>div": {},
  marginBottom: "2vw",
  "@media (max-width:640px)": {
 MarginTop: "5.469vw",
  },
}))