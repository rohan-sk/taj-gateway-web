import { Box, styled } from "@mui/material"
import { theme } from "../../../lib/theme"

export const AutocompleteWrapper = styled(Box)(() => ({
  borderBottom: `1px solid ${theme.palette.ihclPalette.hexTwelve}`,
  display: "flex",
  flexDirection: "row",
}))
