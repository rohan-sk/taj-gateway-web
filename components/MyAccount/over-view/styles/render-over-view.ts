import { Box, Button, Grid, Typography, styled } from "@mui/material"
import { theme } from "../../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { transientProps } from "../../../../utils/transientProps"

export const TitleWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  // marginBottom: "2.083vw",
}))

export const MobileViewAll = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "5vw",
}))

// Need to update the styles with theme and font sizes to vw
export const NoBookingsSection = styled(
  Box,
  transientProps
)<{ $mobile: boolean }>(({ $mobile }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: $mobile ? `${MobilePxToVw(20)} 0vw` : `${DesktopPxToVw(17)} 0vw`,
  margin: `${DesktopPxToVw(24)} 0 ${DesktopPxToVw(100)}`,
  "@media (max-width:640px)": {
    margin: `${MobilePxToVw(35)} 0 ${MobilePxToVw(55)}`,
  },
  background: theme.palette.background.paper,
}))

export const NoBookingsSectionText = styled(
  Typography,
  transientProps
)<{ $mobile: boolean }>(({ $mobile }) => ({
  fontSize: $mobile ? MobilePxToVw(24) : DesktopPxToVw(24),
  lineHeight: "140%",
  textAlign: "center",
  letterSpacing: "-0.05em",
  fontFamily: theme?.palette?.font?.primaryFontFamily,
  fontStyle: "normal",
  color: "#45443F",
}))

export const OverViewSectionsTitle = styled(Typography)(() => ({
  fontSize: "2.083vw",
  lineHeight: "110%",
  textAlign: "center",
  letterSpacing: "-0.05em",
  fontFamily: theme?.palette?.font?.primaryFontFamily,
  fontStyle: "normal",
  color: "#45443F",
  fontWeight: "400px",
  "@media (max-width:640px)": {
    fontSize: "5vw",
  },
}))

export const ButtonWrapper = styled(Grid)(() => ({
  justifyContent: "center",
  margin: "5.469vw 0vw 4.750vw",
}))

export const ViewMoreButton = styled(Button)(() => ({
  width: "37.188vw",
  padding: "2.5vw 0vw",
  letterSpacing: "1.8px",
}))
