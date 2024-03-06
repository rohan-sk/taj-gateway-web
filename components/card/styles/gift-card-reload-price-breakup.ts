import styled from "@emotion/styled"
import { theme } from "../../../lib/theme"
import { Accordion, Typography, Box, Grid, Divider, Stack } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { transientProps } from "../../../utils/transientProps"

export const BoldTypography = styled(Typography)(() => ({
  fontWeight: 700,
}))

export const ButtonBoxStyle = styled(Box)(() => ({
  display: "flex",
  justifyContent: "end",
  gap: DesktopPxToVw(20),
  letterSpacing: "0.1em",
  paddingTop: DesktopPxToVw(40),
  "& .MuiButtonBase-root": {
    padding: `${DesktopPxToVw(18)} ${DesktopPxToVw(36)}`,
    letterSpacing: DesktopPxToVw(1.6),
  },
  "@media (max-width:640px)": {
    gap: MobilePxToVw(10),
    justifyContent: "center",
    flexWrap: "wrap",
    paddingTop: MobilePxToVw(45),
    "& .MuiButtonBase-root": {
      padding: `${MobilePxToVw(18)} ${MobilePxToVw(25)}`,
      letterSpacing: MobilePxToVw(1.6),
    },
  },
}))
export const StyledSeparator = styled(Divider)(() => ({
  height: "2px",
  background: theme?.palette?.neuPalette?.hexTwelve,
  width: "100%",
  marginBottom: "4.688vw",
}))
export const CustomAccordionStyle = styled(Accordion)(() => ({
  boxShadow: "none",
  background: "inherit",
  "@media (max-width:640px)": {},
  "&:before": {
    display: "none",
  },
  "& .MuiAccordionSummary-content.MuiAccordionSummary-contentGutters": {
    margin: 0,
  },
  "& .MuiButtonBase-root.MuiAccordionSummary-root.MuiAccordionSummary-gutters":
    {
      minHeight: "unset",
    },
}))

export const FieldsGrid = styled(Grid)(() => ({
  alignItems: "center",
  marginBottom: "1.024vw",
  "@media (max-width:640px)": {
    marginBottom: "3.125vw",
  },
}))

export const MarginBox = styled(Box)(() => ({
  marginTop: "3.125vw",
  marginBottom: "2.10vw",
  marginRight: "1vw",
}))
export const SummaryTypography = styled(Box)(() => ({
  "@media (max-width:640px)": {
    fontWeight: 700,
    fontSize: "3.75vw",
    fontFamily: "Inter",
    lineHeight: "5.469vw",
  },
}))
export const GridRightTextAligner = styled(Grid)(() => ({
  textAlign: "end",
}))

export const ReloadGiftCardShareWrapper = styled(Stack, transientProps)<{$isMobile:boolean}>(({$isMobile}) => ({
  "& .MuiButtonBase-root": {
    gap: $isMobile ? MobilePxToVw(10) : DesktopPxToVw(20),
    ".MuiBox-root": {
      width: $isMobile ? MobilePxToVw(22) : DesktopPxToVw(22),
      height: $isMobile ? MobilePxToVw(22) : DesktopPxToVw(22),
    },
  },
}))