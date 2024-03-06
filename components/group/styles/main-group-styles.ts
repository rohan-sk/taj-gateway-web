import styled from "@emotion/styled"
import { Box } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const LogoWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  paddingBottom: DesktopPxToVw(30),
  "@media (max-width: 640px)": {
    paddingBottom: MobilePxToVw(30),
  },
}))
