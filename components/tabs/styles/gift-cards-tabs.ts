import { theme } from "../../../lib/theme"
import { Box, Divider, styled, Typography } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"

export const MainBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  padding: "4.375vw 7.344vw 4.21vw 8.906vw",
  borderBottom: `0.052vw solid ${theme?.palette?.neuPalette?.hexSeven}`,
}))

export const VerticalDivider = styled(Divider)(() => ({
  width: "0.052vw",
  margin: "0vw 2.969vw",
  backgroundColor: theme?.palette?.neuPalette?.hexSeven,
}))

export const TabTypography = styled(
  Typography,
  transientProps
)<{ $isHighlighted?: boolean }>(({ $isHighlighted }) => ({
  whiteSpace: "nowrap",
  lineHeight: "4.688vw",
  letterSpacing: "0.05em",
  fontWeight: $isHighlighted ? 700 : 300,
  color: theme?.palette?.neuPalette?.hexSeventeen,
}))
