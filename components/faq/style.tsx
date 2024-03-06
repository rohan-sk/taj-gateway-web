import styled from "@emotion/styled"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material"
import { theme } from "../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"

interface TitleSchema {
  isTitle: string
}

export const FAQContentBox = styled(Box)(({ isTitle }: TitleSchema) => ({
  // borderTop: `2px solid ${theme?.palette?.neuPalette?.hexNine}`,
  marginTop: isTitle ? "2vw" : "1.2vw",
}))

export const AccordionContainer = styled(Box)(() => ({
  width: "100%",
  "& svg": {
    fontSize: "1.1vw",
    "@media(max-width:640px)": {
      fontSize: "4vw",
    },
  },
}))
export const FaqItemStyle = styled(Box)(() => ({
  "& figure": {
    padding: "1rem",
    margin: 0,
  },
  "& img": {
    height: "100%",
    width: "100%",
    objectFit: "cover",
  },
  ul: {
    marginBottom: "0px !important",
  },
}))

export const StyledAccordionSummary = styled(AccordionSummary)(() => ({
  minHeight: "unset!important",
  margin: "1.667vw 0vw 1.458vw",
  "& .MuiAccordionSummary-content.Mui-expanded": {
    margin: "1.667vw 0vw 1.25vw",
  },
}))

export const AccordionStyle = styled(Accordion)(() => ({
  width: "100%",
  background: "none",
  margin: "0px !important",
  borderBottom: `1px solid ${theme?.palette?.neuPalette?.rgbaOne}`,
  "&:before": {
    display: "none",
  },
  "& .MuiAccordionSummary-root": {
    padding: "0",
  },
  "& .MuiAccordionSummary-content": {
    margin: `${DesktopPxToVw(32)} 0`,
  },
  "@media (max-width: 640px)": {
    "& .MuiAccordionSummary-content": {
      margin: `${MobilePxToVw(32)} 0`,
    },
  },
}))
export const MapAccordionDetailsStyled = styled(AccordionDetails)(() => ({
  maxWidth: "90%",
  padding: "0 0 1vw 0",
}))

export const MapCallingBox = styled(Box)(() => ({
  zIndex: 0,
  height: "100%", // or you can use height: '100vh'
  filter: "grayscale(0)",
  "@media (max-width: 640px)": {
    minHeight: MobilePxToVw(388),
  },
}))

export const TitleBoxStyled = styled(Box)(() => ({
  display: "flex",
}))
