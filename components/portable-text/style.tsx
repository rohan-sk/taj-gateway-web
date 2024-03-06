import styled from "@emotion/styled"
import { Box, Divider } from "@mui/material"
import { theme } from "../../lib/theme"

export const DividerStyle = styled(Divider)(() => ({
  background: theme?.palette?.ihclPalette?.hexNine,
  marginBottom: "4.16vw",
}))

export const LinkBox = styled(Box)(() => ({
  color: theme?.palette?.text?.primary,
  textAlign: "left",
}))
