import styled from "@emotion/styled"
import { theme } from "../../../lib/theme"
import { Box, Button, Typography } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"
import { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const MainBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  width: "fit-content",
  marginBottom: "1.04vw",
  borderRadius: "2.1875vw",
  padding: "0.26vw 0.3125vw",
  background: theme?.palette?.background?.paper,

  "@media (max-width: 640px)": {
    borderRadius: "6.5625vw",
    padding: "0.78125vw 0.9375vw",
  },
}))

export const StyledButton = styled(
  Button,
  transientProps
)<{ $numberOfTabs: number }>(({ $numberOfTabs }) => ({
  fontWeight: 400,
  height: "3.125vw",
  width: "16.667vw",
  lineHeight: "140%",
  fontSize: "1.041vw",
  borderRadius: "1.822vw",
  fontFamily: theme?.palette?.font?.primaryFontFamily,
  letterSpacing: "-0.05em",
  padding: "0.83vw 2.083vw",
  boxShadow: "0px 10px 24px rgba(0, 0, 0, 0.1)",
  color: theme?.palette?.neuPalette?.hexTwo,
  background: theme?.palette?.neuPalette?.hexOne,
  "&:hover": {
    color: theme?.palette?.neuPalette?.hexTwo,
    background: theme?.palette?.neuPalette?.hexOne,
  },

  "@media (max-width: 640px)": {
    width: MobilePxToVw(270),
    height: "9.375vw",
    fontSize: "2.8125vw",
    borderRadius: "5.46vw",
    padding: "3.28vw 0vw 2.1875vw",
    boxShadow: "none",
  },
}))
export const ButtonTypo = styled(
  Typography,
  transientProps
)<{ $numberOfTabs: number }>(({ $numberOfTabs }) => ({
  cursor: "pointer",
  width: "16.667vw",
  textAlign: "center",
  color: theme?.palette?.text?.primary,

  "@media (max-width: 640px)": {
    width: MobilePxToVw(270),
  },
}))

export const ToggleWrapper = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  position: "relative",
  maxWidth: $isMobile ? MobilePxToVw(540) : "unset",
  margin: $isMobile
    ? `${MobilePxToVw(30)} ${MobilePxToVw(50)} ${MobilePxToVw(40)}`
    : "unset",
}))
