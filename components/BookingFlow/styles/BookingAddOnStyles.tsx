import styled from "@emotion/styled"
import { theme } from "../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import {
  Box,
  Checkbox,
  Accordion,
  Typography,
  AccordionDetails,
} from "@mui/material"

const goldColor = theme?.palette?.neuPalette?.hexTwo
// Main Accordion Styles
export const AddonsTitleText = styled(Typography)(() => ({
  fontWeight: 400,
  fontFamily: theme?.palette?.font?.primaryFontFamily,
  letterSpacing: "-0.05em",
  fontSize: DesktopPxToVw(32),
  color: theme?.palette?.neuPalette?.hexSeventeen,
}))

export const AddOnsContentWrapper = styled(Box)(() => ({
  marginTop: "1.04vw",
  border: `${DesktopPxToVw(1)} solid ${theme?.palette?.neuPalette?.rgbaThree}`,
  padding: `${DesktopPxToVw(60)} ${DesktopPxToVw(60)} ${DesktopPxToVw(
    40
  )} ${DesktopPxToVw(60)}`,
}))

// Inner Room Styles
export const InnerRoomAccordion = styled(Accordion)(() => ({
  boxShadow: "none",
  borderRadius: "0vw",
  margin: `${DesktopPxToVw(30)} 0`,
  ":first-of-type": { borderRadius: "0vw" },
  ":before": { backgroundColor: theme?.palette?.neuPalette?.rgbaTwo },
  "@media (max-width: 640px)": { margin: `${MobilePxToVw(20)} 0` },
}))

export const InnerRoomAccordionTitle = styled(Typography)(() => ({
  fontWeight: 300,
  fontSize: DesktopPxToVw(18),
  color: theme?.palette?.neuPalette?.hexSeventeen,
}))

export const InnerRoomAccordionDetails = styled(AccordionDetails)(() => ({
  padding: `${DesktopPxToVw(20)} 0 0 0`,
  backgroundColor: theme?.palette?.neuPalette?.hexOne,
}))

export const InnerRoomSubItemBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  borderBottom: `${DesktopPxToVw(1)} solid ${theme?.palette?.neuPalette?.hexSixteen}`,
}))

export const CheckBoxAndDescriptionWrapper = styled(Box)(() => ({
  display: "flex",
}))

export const EachRoomDescriptionWrapper = styled(Box)(() => ({
  paddingLeft: DesktopPxToVw(16),
}))

export const EachRoomDescriptionItemTitle = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: DesktopPxToVw(22),
  color: theme?.palette?.neuPalette?.hexSeventeen,
}))

export const EachRoomDescriptionItemDescription = styled(Typography)(() => ({
  fontWeight: 300,
  fontSize: DesktopPxToVw(18),
  margin: `${DesktopPxToVw(5)} 0`,
  color: theme?.palette?.neuPalette?.hexSeventeen,
}))

export const EachRoomDescriptionItemButton = styled(Typography)(() => ({
  fontWeight: 300,
  color: goldColor,
  cursor: "pointer",
  display: "inline-block",
  textDecoration: "underline",
  fontSize: DesktopPxToVw(16),
  marginBottom: DesktopPxToVw(24),
}))

export const EachRoomDescriptionItemPrice = styled(Typography)(() => ({
  fontWeight: 300,
  whiteSpace: "nowrap",
  fontSize: DesktopPxToVw(20),
  color: theme?.palette?.neuPalette?.hexSeventeen,
}))

export const EachRoomDescriptionItemCheckbox = styled(Checkbox)(() => ({
  color: goldColor,
  width: DesktopPxToVw(30),
  height: DesktopPxToVw(30),
  "&.Mui-checked": {
    color: goldColor,
  },
  "&&:hover": {
    backgroundColor: "transparent",
  },
}))

export const InnerRoomSubItemsButton = styled(Typography)(() => ({
  display: "flex",
  fontSize: DesktopPxToVw(18),
  margin: `${DesktopPxToVw(20)} auto ${DesktopPxToVw(10)} auto`,
}))
