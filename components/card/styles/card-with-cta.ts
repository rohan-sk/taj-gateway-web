import styled from "@emotion/styled"
import { Box, Card } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const ParentBox = styled(Box)(() => ({
  position: "relative",
}))

export const ContentBox = styled(Box)(() => ({
  width: "70%",
  position: "relative",
  float: "right",
  marginTop: DesktopPxToVw(-50),
  marginBottom: DesktopPxToVw(8), // Bottom shadow to visible
  padding: "1.25vw 1.354vw 0.885vw 1.354vw", // as per QOU global style rules (margins & paddings)
  boxShadow: "-6px 10px 24px 0px rgba(0, 0, 0, 0.10)",
  "@media (max-width: 641px)": {
    width: "85%",
    marginTop: MobilePxToVw(-74),
    marginBottom: MobilePxToVw(24), // Bottom shadow to visible
    padding: "5.313vw 4.53vw", // This padding took from global template
    boxShadow: "-5px -6px 36px 0px rgba(0, 0, 0, 0.10)",
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
  },
}))
