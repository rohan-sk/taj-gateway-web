import { Accordion, AccordionSummary, Box, Typography, styled } from "@mui/material"
import { theme } from "../../lib/theme"
import DesktopPxToVw from "../../utils/DesktopFontCalc"

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
  background: theme?.palette?.ihclPalette?.hexOne,
  border: `0.052vw solid ${theme?.palette?.ihclPalette?.hexSixteen}`,

  "@media (max-width: 640px)": {
    padding: "6.250vw 5vw",
  },
  "& .redeem-card": {
    background: `${theme?.palette?.ihclPalette?.hexOne} !important`,

    border: `0.052vw solid ${theme?.palette?.ihclPalette?.hexSixteen} !important`,
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

export const TitleSubTitleWrapper = styled(Box)(() => ({
  display: "block",
  flexDirection: "row",
  "@media (max-width: 640px)": {
    display: "flex",
    flexDirection: "column",
  },
}))
