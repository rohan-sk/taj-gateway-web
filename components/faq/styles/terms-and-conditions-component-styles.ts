import { styled } from "@mui/system"
import { theme } from "../../../lib/theme"
import DesktopPxToVw from "../../../utils/DesktopFontCalc"
import { transientProps } from "../../../utils/transientProps"
import { KeyboardArrowDownOutlined } from "@mui/icons-material"
import { Accordion, AccordionDetails, Box, Typography } from "@mui/material"

export const TitleWrapperContainer = styled(Box)(() => ({
  cursor: "pointer",
  display: "flex",
}))

export const TitleWrapperTypography = styled(Typography)(() => ({
  fontWeight: 400,
  color: theme?.palette?.neuPalette?.hexTwo,
}))

export const ContentArrowDirectionWrapper = styled(
  KeyboardArrowDownOutlined,
  transientProps
)<{ $showDescription: boolean }>(({ $showDescription }) => ({
  marginLeft: DesktopPxToVw(10),
  transitionDuration: "0.3s",
  transitionProperty: "transform",
  color: theme?.palette?.neuPalette?.hexTwo,
  transform: $showDescription ? "rotate(180deg)" : "rotate(0deg)",
}))

export const ContentAccordion = styled(Accordion)(() => ({
  "& .MuiAccordionSummary-root": {
    padding: "0vw",
    minHeight: "auto",
    background: theme.palette.background.default,
  },
}))

export const PortableTextAccordionDetailsContainer = styled(AccordionDetails)(
  () => ({
    padding: "0vw",
    paddingBottom: "2.865vw",
    background: theme.palette.background.default,
  })
)
export const PortableTextAccordionDetailsOffersContainer = styled(
  AccordionDetails
)(() => ({
  padding: "0vw",
  paddingBottom: "0.865vw",
  background: theme.palette.background.default,
}))
