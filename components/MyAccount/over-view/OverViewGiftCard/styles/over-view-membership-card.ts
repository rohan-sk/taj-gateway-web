import { Accordion, AccordionDetails, Box, Button, styled } from "@mui/material"
import { theme } from "../../../../../lib/theme"
import { transientProps } from "../../../../../utils/transientProps"

export const MemberShipCardWrapper = styled(
  Box,
  transientProps
)<{ $isMobile: boolean; $isChamber: boolean }>(({ $isMobile, $isChamber }) => ({
  border: `1px solid ${theme?.palette?.neuPalette?.hexSixteen}`,
  padding: $isMobile ? "3.125vw 4.6685vw" : "1.042vw  1.563vw",
  backgroundColor: $isChamber ? "rgba(173, 139, 58, 0.10)" : "",
}))

export const SpacerBox = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  marginBottom: $isMobile ? "3.125vw" : "1.024vw",
}))

export const StyledAccordion = styled(Accordion)(() => ({
  marginBottom: "8.594vw",
  background: theme?.palette?.background?.default,
  boxShadow: "unset",
  position: "unset",
  transition: "unset",

  "&.Mui-expanded": {
    margin: "0px!important",
    background: theme?.palette?.background?.default,
  },
  "& .MuiSvgIcon-root": {
    opacity: "unset",
  },
  "& .MuiAccordionDetails-root": {
    padding: 0,
  },
  "& .MuiAccordionSummary-content ": {
    margin: 0,
  },
  "& .MuiButtonBase-root.MuiAccordionSummary-root.MuiAccordionSummary-gutters":
    {
      padding: "0px",
      minHeight: "unset",
    },
  "& .MuiAccordionSummary-content.Mui-expanded.MuiAccordionSummary-contentGutters":
    {
      margin: "0px!important",
    },
}))

export const StyledAccordionDetails = styled(
  AccordionDetails,
  transientProps
)<{ $mobile: boolean }>(({ $mobile }) => ({
  marginBottom: $mobile ? "8.594vw" : "",
}))

export const OverviewLoadMoreButton = styled(Button)(() => ({
  borderColor: `${theme?.palette?.neuPalette?.hexTwo}!important`,
  color: `${theme?.palette?.neuPalette?.hexTwo}`,
  width: "37.188vw",
  padding: "2.5vw 0vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "1.563vw",
  "@media (max-width:640px)": {
    marginTop: "5.469vw",
  },
}))
