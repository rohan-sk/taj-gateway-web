import { Accordion, AccordionSummary, Typography, styled } from "@mui/material"
import DesktopPxToVw from "../../../utils/DesktopFontCalc"
import { theme } from "../../../lib/theme"
import { Box } from "@mui/system"
import { transientProps } from "../../../utils/transientProps"

export const MainAccordion = styled(Accordion)(() => ({
  boxShadow: "unset",
  padding: `${DesktopPxToVw(40)} ${DesktopPxToVw(40)}`,
  "&.Mui-expanded": {
    margin: "0vw",
    padding: `${DesktopPxToVw(40)} ${DesktopPxToVw(40)} ${DesktopPxToVw(30)}}`,
    marginTop: "2.083vw !important",

    "@media (max-width: 640px)": {
      padding: "6.250vw 5vw",
    },
  },
  "&.MuiAccordion-root:before": {
    height: "unset",
  },
  marginTop: "2.083vw",
  background: theme?.palette?.neuPalette?.hexOne,
  border: `0.052vw solid ${theme?.palette?.neuPalette?.hexSixteen}`,

  "@media (max-width: 640px)": {
    padding: "6.250vw 5vw",
  },
  "& .redeem-card": {
    background: `${theme?.palette?.neuPalette?.hexOne} !important`,

    border: `0.052vw solid ${theme?.palette?.neuPalette?.hexSixteen} !important`,
  },
}))

export const MainAccordionSummary = styled(AccordionSummary)(() => ({
  padding: "0vw",
  alignItems: "center",
  "& .MuiAccordionSummary-content": {
    margin: "0vw",
  },
}))

export const DefaultColor = styled(Typography)(() => ({
  color: theme?.palette?.text?.primary,
}))

export const BoxDefaultParent = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
}))

export const BoxDefaultChild = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  "@media (max-width: 640px)": {
    padding: "2vw",
  },
}))

export const DefaultColorEpicure = styled(Typography)(() => ({
  color: theme?.palette?.text?.primary,
  alignSelf: "start",
}))

export const BoxTotalPrice = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  margin: "2vw 0vw",
  "@media (max-width: 640px)": {
    margin: "6vw 0vw",
  },
}))
