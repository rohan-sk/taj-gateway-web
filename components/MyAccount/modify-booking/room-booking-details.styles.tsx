import { Box, Grid, Typography, styled } from "@mui/material"
import { theme } from "../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const GridWrapper = styled(Grid)(() => ({
  width: "100%",
  backgroundColor: theme?.palette?.background?.paper,
  padding: DesktopPxToVw(40),
  marginTop: DesktopPxToVw(40),
  "@media (max-width: 640px)": {
    width: "unset",
    margin: `${MobilePxToVw(35)} ${MobilePxToVw(35)} 0`,
    padding: `${MobilePxToVw(35)} ${MobilePxToVw(50)}`,
  },
}))

export const CheckInBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: DesktopPxToVw(10),
  "@media (max-width: 640px)": {
    width: "100%",
    gap: MobilePxToVw(10),
  },
}))

export const ColumnBox = styled(Box)(() => ({
  minWidth: DesktopPxToVw(208),
  "@media (max-width: 640px)": {
    minWidth: "unset",
    display: "flex",
    flexBasis: "50%"
  },
}))

export const TextTypography = styled(Typography)(() => ({
  fontWeight: 400,
  whiteSpace: "nowrap"
}))
