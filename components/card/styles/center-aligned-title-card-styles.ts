import { theme } from "../../../lib/theme"
import { Box, Divider, styled } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const CenterAlignedTitleCardContainer = styled(
  Box,
  transientProps
)<{ $margin: any }>(({ $margin }) => ({
  gap: "2.083vw",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: `${DesktopPxToVw(60)} ${DesktopPxToVw(240)}`,
  margin: $margin?.padding?.desktop ? $margin?.padding?.desktop : "0vw",
  background: theme?.palette?.background?.paper,
  "@media (max-width: 640px)": {
    padding: `${MobilePxToVw(60)} ${MobilePxToVw(72)}`,
    gap: "6.25vw",
    margin: $margin?.padding?.mobile ? $margin?.padding?.mobile : "0vw",
  },
}))

export const CardTitleBox = styled(Box)(() => ({
  gap: "1.042vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
}))

export const CardTitleDivider = styled(Divider)(() => ({
  height: "2%",
  width: "2.083vw",
  background: theme?.palette?.text?.primary,
  "@media (max-width: 640px)": { width: "6.250vw" },
}))

export const CardDescriptionBox = styled(Box)(() => ({
  textAlign: "center",
}))

export const ActionButtonBox = styled(Box)(() => ({
  gap: "1.042vw",
  display: "flex",
  justifyContent: "center",
  "@media (max-width: 640px)": {
    gap: "3.125vw",
    flexDirection: "row-reverse",
  },
}))
