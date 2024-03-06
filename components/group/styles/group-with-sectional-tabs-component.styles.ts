import styled from "@emotion/styled"
import { Divider } from "@mui/material"
import { theme } from "../../../lib/theme"
import { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const HorizontalDividerStyle = styled(Divider)(() => ({
  opacity: 0.2,
  width: "100%",
  height: "0.156vw",
  marginTop: MobilePxToVw(35), // this gap taken from global template (avg gap)
  background: theme?.palette?.ihclPalette?.hexSeventeen,
}))

export const VerticalDividerStyle = styled(Divider)(() => ({
  opacity: 0.2,
  height: "100%",
  width: "0.052vw",
  background: theme?.palette?.ihclPalette?.hexSeventeen,
}))
