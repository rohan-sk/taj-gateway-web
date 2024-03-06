import { Box, Typography, styled } from "@mui/material"
import { theme } from "../../../lib/theme"

export const GradientMainBox = styled(Box)(() => ({
  position: "absolute",
  width: "74%",
  bottom: "0vw",
  right: "0vw",
  background: "linear-gradient(91deg, rgba(19, 19, 15, 0.45) 0%, rgba(0,0,0,0.7) 49.13%)",
  height: "97.5%",
  marginBottom: "4px",
}))

export const ContentBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  flexDirection: "row",
  padding: "2.135vw 0vw 0vw 0vw",
  gap: "2.188vw",
}))
export const TitleTypography = styled(Typography)(() => ({
  color: `${theme?.palette?.ihclPalette?.hexOne}`,
  marginBottom: "0.677vw",
}))
export const DescriptionTypography = styled(Typography)(() => ({
  color: `${theme?.palette?.ihclPalette?.hexOne}`,
}))
export const MobileDescriptionBox = styled(Box)({
  width: "58.75vw",
  textAlign: "center",
})
export const MobileGradientBox = styled(Box)({
  position: "absolute",
  bottom: "0.625vw",
  background: "linear-gradient(180deg, rgba(19, 19, 15, 0) 4.2%, rgba(15, 15, 12) 35.5%)",
  width: "100%",
  height: "75%",
})

export const MobileContentBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "14.063vw",
})
