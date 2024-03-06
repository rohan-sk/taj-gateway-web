import { theme } from "../../../lib/theme"
import { KeyboardArrowDownOutlined } from "@mui/icons-material"
import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, styled } from "@mui/material"

export const TitleStack = styled(Stack)(() => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
}))

export const StyledDownArrow: any = styled(KeyboardArrowDownOutlined)(() => ({
  marginLeft: "0.781vw",
  transitionDuration: "0.3s",
  transitionProperty: "transform",
}))

export const StyledAccordionDetails = styled(AccordionDetails)(() => ({
  padding: "0vw",
  // paddingBottom: "2.865vw",
  background: theme.palette.background.default,
  "@media(max-width:640px)":{
    paddingBottom:"2.865vw"
  }
}))

export const StyledAccordion = styled(Accordion)(() => ({
  "& .MuiAccordionSummary-root": {
    padding: "0vw",
    minHeight: "auto",
    background: theme.palette.background.default,
  },
  background: theme.palette.background.default,
}))
