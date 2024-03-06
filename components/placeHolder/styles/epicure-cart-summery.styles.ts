import {
  AccordionDetails,
  Box,
  Grid,
  Stack,
  Typography,
  styled,
} from "@mui/material"
import DesktopPxToVw from "../../../utils/DesktopFontCalc"
import { theme } from "../../../lib/theme"

export const PriceWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  margin: DesktopPxToVw(4),
}))

export const MainGridEpicure = styled(Grid)(() => ({
  border: `0.052vw solid ${theme?.palette?.neuPalette?.hexTwo}`,
  zIndex: 1,
  top: "5.521vw",
  display: "flex",
  position: "sticky",
  flexDirection: "column",
  color: theme?.palette?.text?.primary,
  animation: "500ms ease-in-out 0s normal none 1 running fadeInDown",
}))

export const StackCardType = styled(Stack)(() => ({
  cursor: "pointer",
  fontFamily: "Inter",
  fontSize: DesktopPxToVw(18),
  fontWeight: 700,
}))

export const BoxShowDetails = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: DesktopPxToVw(4),
}))

export const TypographyPriceCart = styled(Typography)(() => ({}))

export const TypographyTaxFees = styled(Typography)(() => ({}))

export const AccordionDetailsEpicure = styled(AccordionDetails)(() => ({
  padding: "0vw",
  marginTop: "0vw",
}))

export const TypographyTotalEpicure = styled(Typography)(() => ({
  paddingRight: "0.2vw",
}))

export const TypographySummery = styled(Typography)(() => ({
  fontWeight: 700,
}))

export const MainEpicureBox = styled(Box)(() => ({
  margin: `${DesktopPxToVw(20)}`,
}))
