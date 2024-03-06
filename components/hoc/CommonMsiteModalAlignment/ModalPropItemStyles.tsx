import styled from "@emotion/styled"
import { Typography, Box, Button, Grid } from "@mui/material"
import { theme } from "../../../lib/theme"
import { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const ButtonsBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: theme?.palette?.ihclPalette?.hexTwo,
  padding: `${MobilePxToVw(16)} ${MobilePxToVw(36)}`,
  "&:hover": {
    backgroundColor: theme?.palette?.ihclPalette?.hexTwo,
  },
  margin: `0 ${MobilePxToVw(80)} !important`,
  "@media(max-width:640px)": {
    margin: `0 ${MobilePxToVw(0)} !important`,
  },
}))

export const MsiteStyledButton = styled(Button)(() => ({
  padding: "0 !important",
  height: "auto !important",
  letterSpacing: "0.06em",
  fontWeight: 700,
  color: theme?.palette?.ihclPalette?.hexOne,
  backgroundColor: theme?.palette?.ihclPalette?.hexTwo,
  "&:hover": {
    color: theme?.palette?.ihclPalette?.hexOne,
    backgroundColor: theme?.palette?.ihclPalette?.hexTwo,
  },
  "@media(max-width:640px)": {
    letterSpacing: "0.281vw",
  },
}))

export const CardsBox = styled(Box)(() => ({
  display: "flex",
  marginTop: "3.54vw",
  alignItems: "center",
  flexDirection: "column",
}))

export const ItemActionBox = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "center",
}))

export const ActionGrid = styled(ItemActionBox)(() => ({
  marginTop: "2.1vw",
}))

export const ActionBox = styled(ItemActionBox)(() => ({
  cursor: "pointer",
}))

export const ModalHeadingText = styled(Typography)(() => ({
  fontFamily: theme?.palette?.font?.primaryFontFamily,
  letterSpacing: "-0.05em",
  color: theme?.palette?.ihclPalette?.hexTwo,
}))

export const ModalTitleText = styled(ModalHeadingText)(() => ({
  fontSize: "7.5vw",
  padding: "11.72vw 0 0 0",
}))

export const ModalSubTitleText = styled(ModalHeadingText)(() => ({
  fontSize: "5vw",
  margin: "3.12vw 0 6.25vw 0",
}))

export const ModalContentBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  borderBottom: `2px solid ${theme?.palette?.ihclPalette?.rgbaOne}`,
}))

export const TitlesAndItemsCount = styled(Typography)(() => ({
  fontSize: "4.06vw",
  lineHeight: "320%",
  color: theme?.palette?.ihclPalette?.hexTwo,
}))

export const ButtonImageGapGrid = styled(Grid)<{ $paddingTop?: number }>(({ $paddingTop }) => ({
  paddingTop: $paddingTop ? `${MobilePxToVw($paddingTop)}` : `${MobilePxToVw(8)}`,
}))

export const PropItemTitles = styled(TitlesAndItemsCount)(() => ({}))
export const PropItemsCount = styled(TitlesAndItemsCount)(() => ({}))
