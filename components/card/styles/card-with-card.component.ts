import { Box, Typography, styled } from "@mui/material"
import { theme } from "../../../lib/theme"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const CardText = styled(Typography)(() => ({
  fontFamily: theme?.palette?.font?.primaryFontFamily,
  letterSpacing: "-0.05em",
  margin: "0.31vw 0vw",
  color: theme?.palette?.neuPalette?.hexSeventeen,
  "@media(max-width:640px)": {
    whiteSpace: "nowrap",
  },
}))

export const TaxText = styled(Typography)(() => ({
  opacity: 1,
  "@media(max-width:640px)": {
    opacity: 0.7,
  },
}))

export const BoxWrapper = styled(Box)(() => ({
  textAlign: "center",
  margin: "auto",
  cursor: "pointer",
  paddingTop: "2vw",
}))

export const ComparisonBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  marginTop: `${DesktopPxToVw(80)}`,
  "@media (max-width: 640px)": {
    margin: `${MobilePxToVw(80)} ${MobilePxToVw(0)}`,
  },
}))

export const BoxRenewal = styled(
  Box,
  transientProps
)<{ $renewal: boolean }>(({ $renewal }) => ({
  display: "flex",
  gap: "1vw",
  alignItems: $renewal ? "end" : "center",
}))

export const BoxRenewalSub = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: DesktopPxToVw(15),
  "@media(max-width:640px)": {
    gap: MobilePxToVw(15),
  },
}))
