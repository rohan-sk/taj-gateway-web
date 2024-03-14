import styled from "@emotion/styled"
import { Box, Card } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { theme } from "../../../lib/theme"

export const ParentBox = styled(Box)(() => ({
  position: "relative",
}))

export const ContentBox = styled(Box)(() => ({
  width: "70%",
  position: "absolute",
  float: "right",
  marginTop: DesktopPxToVw(-100),
  padding: "1.04vw 1.354vw 1.04vw 2.08vw", // as per QOU global style rules (margins & paddings)
  backgroundColor: theme?.palette?.secondary?.main,
  bottom: 0,
  right: 0,
  borderTopLeftRadius: "2em",
  "@media (max-width: 641px)": {
    width: "85%",
    marginTop: MobilePxToVw(-74),
    marginBottom: MobilePxToVw(24), // Bottom shadow to visible
    padding: "5.313vw 4.53vw", // This padding took from global template
  },
}))

export const ActionBox = styled(Box)(() => ({
  display: "flex",
  marginTop: "5px",
  alignItems: "center",
  "@media (max-width: 641px)": {
    marginTop: "1.10vw",
  },
  cursor: "pointer",
}))

export const CardMediaImageContent = styled(Card)(() => ({
  cursor: "pointer",
  "&.MuiCard-root": {
    borderRadius: "0",
    boxShadow: "none",
    backgroundColor: "transparent",
  },
}))
