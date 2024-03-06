import styled from "@emotion/styled"
import { Box, Button, Grid, Typography } from "@mui/material"
import { ChevronRight } from "@mui/icons-material"
import { theme } from "../../../lib/theme"

export const ButtonsBox = styled(Box)(() => ({
  display: "flex",
  flexWrap: "wrap",
  // marginBottom: "2.5vw",
  justifyContent: "center",
}))

export const StyledButton = styled(Button)(() => ({
  width: "auto",
  margin: "0.53vw 0.53vw",
  padding: "0.93vw 1.87vw",
  letterSpacing: "0.06em",
}))

export const ChevronRightIconStyled = styled(ChevronRight)(() => ({
  width: "auto",
  color: theme?.palette?.ihclPalette?.hexTwo,
}))

export const ExpandMoreIconStyled = styled(ChevronRightIconStyled)(() => ({
  transform: "rotate(90deg)",
}))

export const CardsBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
}))

export const ActionGrid = styled(Grid)(() => ({
  display: "flex",
  marginTop: "4.167vw",
  justifyContent: "center",
}))

export const ActionBox = styled(Box)(() => ({
  display: "flex",
  cursor: "pointer",
  justifyContent: "center",
  alignItems: "center",
}))

export const ModalHeadingText = styled(Typography)(() => ({
  fontFamily: theme?.palette?.font?.primaryFontFamily,
  letterSpacing: "-0.05em",
  color: theme?.palette?.ihclPalette?.hexTwo,
}))

export const AlternateAllLinksWrappingBox = styled(Box)(() => ({
  display: "flex",
  marginTop: "2.604vw",
  justifyContent: "center",
}))

export const TitleMainBox = styled(Box)(() => ({
  position: "absolute",
  bottom: "0",
  padding: "0vw 0vw 1.024vw",
  width: "100%",
  background: "linear-gradient(180deg, rgba(81, 81, 81, 0.00) 0%, rgba(0,0,0,0.7) 70%)",
  height: "50%",
  display: "flex",
  alignItems: "end",
  justifyContent: "center",
  "@media(max0width:640px)": {
    position: "unset",
  },
}))
