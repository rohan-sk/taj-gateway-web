import { Box, Grid, Typography, styled } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { theme } from "../../../lib/theme"

export const MainBox = styled(Box)(() => ({
  "@media (max-width:640px)": {
    padding: "0vw 0vw 4.688vw",
  },
}))

export const MainGrid = styled(Grid)(() => ({
  "@media (max-width:640px)": {
    width: "100%",
    margin: 0,
  },
}))

export const GridWrapper = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  "@media (max-width:640px)": {
    margin: "0vw",
    paddingBottom: MobilePxToVw(20),
  },
}))

export const RoomDetailsText = styled(Typography)(() => ({
  fontWeight: 700,
  lineHeight: "140%",
  marginBottom: DesktopPxToVw(5),
  "@media (max-width:640px)": {
    marginTop: "6.25vw",
    marginBottom: "1.25vw",
  },
}))

export const HotelText = styled(Typography)(() => ({
  fontWeight: 700,
  lineHeight: "140%",
  marginBottom: DesktopPxToVw(5),
  "@media (max-width:640px)": {
    marginBottom: MobilePxToVw(8),
  },
}))

export const RoomBookingNumber = styled(Typography)(() => ({
  lineHeight: DesktopPxToVw(22),
  "@media (max-width:640px)": {
    lineHeight: "3.5vw",
  },
}))

export const BookingNumber = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: DesktopPxToVw(16),
  lineHeight: DesktopPxToVw(22),
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  "@media (max-width:640px)": {
    fontSize: "2.5vw",
    lineHeight: "3.5vw",
  },
}))

export const Package = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: DesktopPxToVw(14),
  lineHeight: DesktopPxToVw(20),
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  "@media (max-width:640px)": {
    fontSize: "2.5vw",
    lineHeight: "3.5vw",
  },
}))
export const Policy = styled(Typography)(() => ({
  marginTop: MobilePxToVw(2),
  "@media (max-width:640px)": {
    marginTop: MobilePxToVw(7),
  },
}))

export const RoomDetailsContainer = styled(Box)(() => ({
  display: "flex",
  gap: "0.2vw",
  marginBottom: DesktopPxToVw(20),
  "@media (max-width:640px)": {
    marginBottom: "0vw",
  },
}))
export const CheckInCheckOUtContainer = styled(Box)(() => ({
  display: "flex",
  gap: "0.2vw",
  "@media (max-width:640px)": {
    marginBottom: "0vw",
  },
}))

export const TextWrapper = styled(Typography)(() => ({
  lineHeight: DesktopPxToVw(35),
  "@media (max-width:640px)": {
    lineHeight: "3.5vw",
  },
}))
