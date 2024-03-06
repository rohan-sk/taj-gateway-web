import { theme } from "../../../../lib/theme"
import { Box, Stack, Button, styled, Accordion, AccordionDetails, AccordionSummary } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"

export const MainAccordion = styled(Accordion)(() => ({
  boxShadow: "unset",
  padding: "2.083vw 3.125vw",
  "&.Mui-expanded": {
    margin: "0vw",
    padding: "2.083vw 3.125vw",
    marginTop: "2.083vw !important",
    "@media (max-width: 640px)": {
      padding: "6.250vw 3vw",
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
}))

export const MainAccordionSummary = styled(AccordionSummary)(() => ({
  padding: "0vw",
  alignItems: "flex-start",
  "& .MuiAccordionSummary-content": {
    margin: "0vw",
  },
}))

export const MainContainer = styled(Stack)(() => ({
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
}))

export const TitleAndSubTitleWrapper = styled(Box)(() => ({
  display: "block",
  flexDirection: "initial",
  "@media (max-width: 640px)": {
    display: "flex",
    flexDirection: "column",
  },
}))

export const AccordionSummaryContainer = styled(Stack)(() => ({
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "space-between",
}))

export const CenterAlign = styled(Box)(() => ({
  width: "100%",
  textAlign: "center",
  marginTop: DesktopPxToVw(40),
  "@media (max-width: 640px)": {
    marginTop: MobilePxToVw(40),
  },
}))
