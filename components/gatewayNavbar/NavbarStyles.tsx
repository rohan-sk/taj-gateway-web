import styled from "@emotion/styled"
import { AppBar } from "@mui/material"
import { transientProps } from "../../utils/transientProps"
import { theme } from "../../lib/theme"

export const GateWayAppBar = styled(
  AppBar,
  transientProps,
)<{ $colorChange: boolean }>(({ $colorChange }) => ({
  backgroundColor: $colorChange ? theme?.palette?.ihclPalette?.hexOne : "transparent",
  height: "109px",
  justifyContent: "center",
  alignItems: "center",

  "@media (max-width: 640px)": {
    backgroundColor: "black",
    webkitBoxShadow: "0px 3px 98px 70px rgba(0,0,0,0.9)",
    mozBoxShadow: "  0px 3px 98px 70px rgba(0,0,0,0.9)",
    boxShadow: "0px 3px 98px 70px rgba(0,0,0,0.9)",
  },
}))
