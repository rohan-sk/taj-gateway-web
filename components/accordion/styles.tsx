import styled from "@emotion/styled"
import { theme } from "../../lib/theme"
import { Accordion, Typography } from "@mui/material"
import MUIAccordion from "@mui/material/Accordion"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"

export const MUIAccordionStyled = styled(MUIAccordion)(() => ({
  backgroundColor: theme?.palette?.neuPalette?.hexone,
  "&.MuiAccordion-root:before": {
    backgroundColor: "unset",
  },
  "& .MuiAccordionSummary-content": {
    margin: "1.875vw 0vw", // Provided average 36px spacing in web
  },
  "& .MuiAccordionDetails-root": {
    padding: "0vw 0vw 1.823vw 0vw",
  },
  "@media (max-width: 640px)": {
    "& .MuiAccordionSummary-content": {
      margin: "7.813vw 0vw 7.344vw",
    },
    "& .MuiAccordionSummary-root": {
      alignItems: "flex-start",
    },
    "& .MuiAccordionSummary-expandIconWrapper": {
      margin: "7.813vw 0vw 7.344vw",
    },
    "& .MuiAccordionDetails-root": {
      padding: "0vw 0vw 6.250vw 0vw",
    },
  },
}))

export const StyledAccordion = styled(Accordion)(() => ({
  "& .MuiAccordionDetails-root": {
    padding: "0vw",
  },
  "& .MuiCollapse-wrapper": {
    marginTop: DesktopPxToVw(32),
    "@media (max-width:640px)": {
      marginTop: MobilePxToVw(28),
    },
  },
  padding: `${DesktopPxToVw(30)} 0vw`,
  "@media (max-width:640px)": {
    padding: `${MobilePxToVw(48)} 0vw`,
  },
  "& .MuiButtonBase-root.MuiAccordionSummary-root": {
    alignItems: "start",
  },
  border: `1px solid ${theme?.palette?.neuPalette?.hexSeventeen}20!important`,
  borderWidth: " 1px 0px 1px!important",
  "&::before": {
    content: "none",
    bgColor: "unset",
  },
  "& .MuiAccordionSummary-content": {
    margin: "0vw",
  },
  "& .MuiAccordionSummary-root": {
    padding: "0vw",
    minHeight: "auto",
    background: theme.palette.background.default,
    gap: DesktopPxToVw(24),
    "@media (max-width:640px)": {
      gap: MobilePxToVw(24),
    },
  },

  background: theme.palette.background.default,
}))

export const AccordionTitle = styled(Typography)(() => ({
  lineHeight: "140%",
  paddingRight: "7.29vw",
  margin: "0",
  "@media (max-width: 640px)": {
    paddingRight: MobilePxToVw(6),
  },
}))
