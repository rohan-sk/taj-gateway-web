import styled from "@emotion/styled"
import { Box, Typography } from "@mui/material"
import { theme } from "../../../lib/theme"
export const RichTextLoadMoreBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  margin: "1.04vw auto",
  cursor: "pointer",
  marginTop: "3.9vw",
}))

export const RichTextLoadMoreTypography = styled(Typography)(() => ({
  color: theme?.palette?.ihclPalette?.hexTwo,
  textAlign: "center",
}))
