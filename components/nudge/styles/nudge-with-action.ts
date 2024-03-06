import { theme } from "../../../lib/theme"
import { styled, Box } from "@mui/material"
import DesktopPxToVw from "../../../utils/DesktopFontCalc"
import { transientProps } from "../../../utils/transientProps"

export const ParentBox = styled(Box)(() => ({
  gap: "2.083vw",
  display: "flex",
  padding: "1.56vw 0",
  alignItems: "center",
  justifyContent: "center",

  "@media (max-width: 640px)": {
    gap: "3.75vw",
    padding: "7.18vw 0",
    flexDirection: "column",
  },
}))

export const TwoLinksContainerBox = styled(
  Box,
  transientProps
)<{ $cardPadding: any; $cardBackgroundColor: any }>(
  ({ $cardPadding, $cardBackgroundColor }) => ({
    padding: $cardPadding,
    backgroundColor: $cardBackgroundColor,
  })
)

export const TwoLinksContentBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: DesktopPxToVw(32),
  flexDirection: "column",
  padding: "4.90vw",
  backgroundColor: theme?.palette?.neuPalette?.hexOne,
  "@media (max-width: 640px)": {
    gap: "4.531vw",
    padding: "8.90vw 7.50vw",
  },
}))

export const ActionButtonsBox = styled(Box)(() => ({
  display: "flex",
  gap: DesktopPxToVw(45),
}))

export const BackGroundColorParentBox = styled(
  Box,
  transientProps
)<{ $cardPadding: any; $cardBackgroundColor: string }>(
  ({ $cardPadding, $cardBackgroundColor }) => ({
    padding: $cardPadding ? $cardPadding : "0vw",
    background: $cardBackgroundColor ?? theme?.palette?.primary?.main,
  })
)

export const BackGroundColorContentBox = styled(Box)(() => ({
  gap: "1.823vw",
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  "@media (max-width: 640px)": { flexDirection: "column", gap: "3.75vw" },
}))
