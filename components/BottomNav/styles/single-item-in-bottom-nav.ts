import { theme } from "../../../lib/theme"
import { Box, styled } from "@mui/material"

export const CheckRatesMainBox = styled(Box)(() => ({
  bottom: -2,
  width: "100%",
  position: "fixed",
  padding: "2.82vw 6.981vw ",
  backgroundColor: theme?.palette?.ihclPalette?.hexOne,
  display: "flex",
  flexDirection: "row",
  gap: "2.644vw",
  zIndex: 2,
}))
