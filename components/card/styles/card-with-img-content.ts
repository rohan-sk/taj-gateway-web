import styled from "@emotion/styled"
import { Card, Divider, Grid } from "@mui/material"
import { Box } from "@mui/system"
import { theme } from "../../../lib/theme"

export const BoxContainer = styled(Box)(() => ({
  background: `linear-gradient(180deg, ${theme?.palette?.neuPalette?.hexSeventeen} 0%, ${theme?.palette?.neuPalette?.hexThree} 100%)`,
}))

export const GridContainer = styled(Grid)(() => ({
  display: "flex",
}))

export const CardContainer = styled(Card)(({ index }: any) => ({
  display: "flex",
  "&.MuiCard-root": { borderRadius: "0" },
  background: "rgba(0, 0, 0, 0)",
  flexDirection: index % 2 ? "column-reverse" : "column",
  marginTop: index === 1 ? "18%" : "",
}))

export const CardBox = styled(Box)(() => ({
  display: "flex",
  padding: "4.167vw 0vw 1.406vw 0vw",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  gap: "0.781vw",
}))

export const ContentBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}))

export const CustomDivider = styled(Divider)(() => ({
  height: "0.052vw",
  position: "relative",
  width: "2.083vw",
  marginTop: "1.563vw",
  background: theme?.palette?.neuPalette?.hexOne,
}))

export const ImageContentBox = styled(Box)(() => ({
  width: "45vw",
  height: "25vw",
  "@media (max-width:640px)": {
    width: "100%",
    height: "69.375vw",
  },
}))
