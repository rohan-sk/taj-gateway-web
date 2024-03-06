import styled from "@emotion/styled"
import { Box, Typography } from "@mui/material"
import { theme } from "../../../lib/theme"
import { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const SearchBookingActionWrapperContentBox = styled(Box)(() => ({
  bottom: MobilePxToVw(-1),
  display: "flex",
  position: "fixed",
  justifyContent: "space-between",
  zIndex: "10",
  borderTop: `2px solid ${theme?.palette?.neuPalette?.hexSeventeen}30`,
}))

export const PrimaryActionWrapperContentBox = styled(Box)(() => ({
  backgroundColor: theme?.palette?.neuPalette?.hexTwo,
  width: "34.063vw",
  height: "12.188vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingRight: "0.9vw",
}))

export const NavigationButtonTitleTypography = styled(Typography)(() => ({
  fontWeight: 700,
  lineHeight: "140%",
  letterSpacing: " 0.1em",
  color: theme?.palette?.neuPalette?.hexSeventeen,
}))

export const TwoActionButtonsWrapperContentBox = styled(Box)(() => ({
  backgroundColor: theme?.palette?.neuPalette?.hexOne,
  width: "34.063vw",
  height: "12.188vw",
  display: "flex",
  alignItems: "center",
  padding: "4.219vw 5.625vw 3.594vw",
}))

export const PrimaryActionButtonTitleTypography = styled(Typography)(() => ({
  fontWeight: 700,
  lineHeight: "140%",
  letterSpacing: " 0.1em",
  color: theme?.palette?.neuPalette?.hexOne,
}))
