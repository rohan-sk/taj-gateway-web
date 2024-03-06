import { Divider, Typography, Box, styled } from "@mui/material"
import DesktopPxToVw from "../../../utils/DesktopFontCalc"
import { transientProps } from "../../../utils/transientProps"
import { theme } from "../../../lib/theme"

export const DescriptionContainer = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
}))

export const StyledDivider = styled(Divider)(() => ({
  backgroundColor: theme?.palette?.neuPalette?.hexSixteen,
  width: "100%",
}))

export const PortableContainer = styled(Box)(() => ({
  paddingTop: "0.5vw",
}))

export const PortableItem = styled(Box)(() => ({
  display: "flex",
  alignItems: "baseline",
  padding: "0.4vw 0vw",
}))

export const StyledTypography = styled(
  Typography,
  transientProps
)<{ $mobilePaddingBottom: string,$paddingBottom: number }>(({ $mobilePaddingBottom, $paddingBottom }) => ({
  paddingBottom: DesktopPxToVw($paddingBottom),
  fontWeight: 300,
  color: theme?.palette?.neuPalette?.hexSeventeen,
  "@media (max-width:640px)": {
    paddingBottom: $mobilePaddingBottom,
  },
}))

export const ComponentContainer = styled(
  Box,
  transientProps
)<{ $isComponentFullWidth: any; $cardBackgroundColor: any }>(
  ({ $isComponentFullWidth, $cardBackgroundColor }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: DesktopPxToVw(80),
    padding: $isComponentFullWidth ? $isComponentFullWidth : "0vw",
    backgroundColor: $cardBackgroundColor ?? theme?.palette?.background?.paper,
    "@media (max-width: 640px)": {
      gap: "6.25vw",
      flexDirection: "column",
      padding: $isComponentFullWidth ? $isComponentFullWidth?.mobile : "0vw",
    },
  })
)

export const PrimaryActionWrappingBox = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",
  marginTop: DesktopPxToVw(35),
  "@media (max-width: 640px)": {
    alignItems: "flex-end",
    marginTop: "4.688vw",
  },
}))

export const ContentDataContainer = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  color: theme?.palette?.text?.primary,
  paddingTop: $isMobile ? "2.813vw" : "1.042vw",
}))
