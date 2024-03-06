import styled from "@emotion/styled"
import { Box, Divider } from "@mui/material"
import { theme } from "../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { transientProps } from "../../utils/transientProps"

export const ImageCardContainer = styled(Box)(() => ({
  display: "grid",
  position: "relative",
}))
export const DividerStyle = styled(Divider)(() => ({
  width: DesktopPxToVw(40),
  height: DesktopPxToVw(1),
  backgroundColor: theme?.palette?.neuPalette?.hexSeventeen,
  display: "inline-block",
  position: "relative",
  bottom: 16,
}))

export const DescriptionContainer = styled(
  Box,
  transientProps,
)<{ $variant: boolean; $mobile: boolean }>(({ $variant, $mobile }) => ({
  width: $mobile ? "79.375vw" : "42.865vw",
  minHeight: $mobile ? "78.125vw" : DesktopPxToVw(534),

  boxShadow: "-0.313vw 0.521vw 1.250vw rgba(0, 0, 0, 0.1)",
  right: $variant ? "" : $mobile ? "-0.5%" : "0",
  top: $variant ? "-15%" : $mobile ? "72.5%" : "20%",
  backgroundColor: theme?.palette?.neuPalette?.hexOne,
  position: "absolute",

  alignItems: "flex-start",

  padding: $mobile ? "7.813vw" : `5.833vw 6.406vw`,
  gap: DesktopPxToVw(40),
}))

export const ImageDescriptionCardContainer = styled(
  Box,
  transientProps,
)<{ $mobile: boolean }>(({ $mobile }) => ({
  width: "100%",
  display: "flex",
  position: "relative",
  flexDirection: "row",
  paddingBottom: $mobile ? MobilePxToVw(319) : DesktopPxToVw(70),
}))

export const DescriptionCardContainerBox = styled(
  Box,
  transientProps,
)<{ $mobile: boolean }>(({ $mobile }) => ({
  bottom: "0vw",
  right: "0vw",
  gap: $mobile ? MobilePxToVw(35) : "1.875vw",
  display: "flex",
  position: "absolute",
  padding: $mobile ? `7.656vw 6.250vw 7.344vw 8.125vw` : `0vw 6.406vw`,
  flexDirection: "column",
  justifyContent: "center",
  width: $mobile ? MobilePxToVw(508) : DesktopPxToVw(823),
  minHeight: $mobile ? MobilePxToVw(500) : DesktopPxToVw(534),
  backgroundColor: theme?.palette?.neuPalette?.hexOne,
  boxShadow: "-0.313vw 0.521vw 1.25vw rgba(0, 0, 0, 0.1)",
}))
