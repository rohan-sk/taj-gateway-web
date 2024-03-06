import styled from "@emotion/styled"
import { Typography, Box, Grid } from "@mui/material"
import { theme } from "../../../lib/theme"

export const ProductPurchaseBoxStyle = styled(Box)(() => ({
  width: "100%",
  maxWidth: "75vw",
  border: `0.05vw solid ${theme?.palette?.neuPalette?.hexSixteen}`,
  "@media (max-width:640px)": {
    border: "none",
    maxWidth: "unset",
  },
}))

export const BoldTypography = styled(Typography)(() => ({
  fontWeight: 700,
}))

export const FlexGapCenterBoxStyle = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "2.083vw",
}))
export const GridBottomSpacer = styled(Grid)(() => ({
  marginBottom: "4.688vw",
}))
