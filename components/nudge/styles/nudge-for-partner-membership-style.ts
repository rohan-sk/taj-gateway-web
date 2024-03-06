import styled from "@emotion/styled"
import { Grid } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw from "../../../utils/DesktopFontCalc"
import { theme } from "../../../lib/theme"

export const NudgeBoxWrapper = styled(
  Grid,
  transientProps,
)<{ $padding?: any }>(({ $padding }) => ({
  textAlign: "center",
  border: `${DesktopPxToVw(1)} solid  ${theme?.palette?.ihclPalette?.hexTwo}`,
  margin: $padding ? $padding?.desktop : "0vw",
  padding: "4.167vw 0vw",
  "@media (max-width: 640px)": {
    padding: "12.500vw 0vw",
    margin: $padding ? $padding?.mobile : "0vw",
  },
}))

export const RenderActionItemGrid = styled(Grid)(() => ({
  margin: "2% 0%",
  display: "flex",
  justifyContent: "center",
}))
