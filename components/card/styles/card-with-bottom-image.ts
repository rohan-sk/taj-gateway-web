import styled from "@emotion/styled"
import { theme } from "../../../lib/theme"
import { Box, Typography } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"
import { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const MainBox: any = styled(
  Box,
  transientProps
)<{ $padding: string; $bgColor: string }>(({ $padding, $bgColor }) => ({
  display: "flex",
  flexDirection: "column",
  padding: $padding,
  background: $bgColor,
}))

export const TitleTypography = styled(Typography)(() => ({
  lineHeight: "9vw",
  color: theme?.palette?.neuPalette?.hexSeventeen,
  "&:before": {
    content: '""',
    width: "6.250vw",
    display: "inline-block",
    verticalAlign: "middle",
    borderBottom: `1px solid ${theme?.palette?.neuPalette?.hexSeventeen}`,
  },

  ":not(:empty)::before ": {
    marginRight: "2.083vw",
  },
}))

export const ActionBox = styled(Box)(() => ({
  display: "flex",
  marginTop: "3.906vw",
  alignItems: "center",
  flexDirection: "row",
}))

export const PrimaryActionBox = styled(Box)(() => ({
  display: "flex",
  marginTop: "8.56vw",
  justifyContent: "center",
}))
export const ActionImageBox = styled(Box)(() => ({
  display: "flex",
  gap: MobilePxToVw(45),
  justifyContent: "center",
}))
