import { styled } from "@mui/system"
import { theme } from "../../../lib/theme"
import { Box, Typography } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"

export const CardContentWrappingBox = styled(Box)(() => ({
  position: "relative",
  padding: "5.469vw 6.25vw",
}))

export const CardTitleTypography = styled(
  Typography,
  transientProps,
)<{ $fontColor: string }>(({ $fontColor }) => ({
  lineHeight: "110%",
  letterSpacing: "-0.05em",
  color: $fontColor ? $fontColor : theme?.palette?.ihclPalette?.hexSeventeen,
}))

export const CardSubTitleTypography = styled(
  Typography,
  transientProps,
)<{ $fontColor: string }>(({ $fontColor }) => ({
  lineHeight: "140%",
  letterSpacing: "0.1em",
  color: $fontColor ? $fontColor : theme?.palette?.ihclPalette?.hexSeventeen,
}))
