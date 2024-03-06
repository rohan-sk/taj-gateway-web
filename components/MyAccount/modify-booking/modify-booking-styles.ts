import { theme } from "../../../lib/theme"
import { Box, Button, Divider, Stack, Typography, styled } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { transientProps } from "../../../utils/transientProps"

export const BoxWrapper = styled(Box)(() => ({
  border: `1px solid ${theme?.palette?.ihclPalette?.hexTwenty}`,
  padding: DesktopPxToVw(40),
  margin: `${DesktopPxToVw(40)} 0 ${DesktopPxToVw(60)}`,
  "@media (max-width: 640px)": {
    margin: `${MobilePxToVw(35)} ${MobilePxToVw(50)}`,
    padding: `${MobilePxToVw(40)} ${MobilePxToVw(32)}`,
  },
}))

export const AlternateLinks = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  flexDirection: "row",
  gap: DesktopPxToVw(20),
  paddingBottom: DesktopPxToVw(12),
  "@media (max-width: 640px)": {
    flexWrap: "wrap",
    gap: MobilePxToVw(20),
    paddingBottom: MobilePxToVw(20),
  },
}))

export const BookingInfo = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: theme?.palette?.background?.paper,
  marginTop: DesktopPxToVw(22),
  marginBottom: DesktopPxToVw(20),
  padding: `${DesktopPxToVw(10)} ${DesktopPxToVw(15)}`,
  "@media (max-width: 640px)": {
    marginTop: MobilePxToVw(20),
    marginBottom: MobilePxToVw(20),
    padding: MobilePxToVw(10),
  },
}))

export const BookingPriceWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "end",
  flexDirection: "column",
  "@media (max-width: 640px)": {
    width: "100%",
    alignItems: "center",
  },
}))

export const ButtonWrapper = styled(Box)(() => ({
  position: "absolute",
  cursor: "pointer",
  marginBottom: DesktopPxToVw(20),
  "@media (max-width: 640px)": {
    paddingTop: MobilePxToVw(35),
  },
}))

export const StyledBox = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: DesktopPxToVw(10),
  "@media (max-width: 640px)": {
    gap: MobilePxToVw(10),
  },
}))

export const TaxesWrapper = styled(Typography)(() => ({
  textDecoration: "underline",
  lineHeight: "140%",
  cursor: "pointer",
}))

export const TotalAmount = styled(Typography)(() => ({
  fontWeight: 700,
  lineHeight: "140%",
}))

export const DynamicAmount = styled(
  Typography,
  transientProps,
)<{ $isSmall: boolean; $isSmallSize?: boolean }>(({ $isSmall, $isSmallSize }) => ({
  fontWeight: $isSmall ? 300 : 700,
  whiteSpace: "nowrap",
  lineHeight: "140%",
  fontSize: $isSmallSize ? DesktopPxToVw(20) : DesktopPxToVw(22),
  "@media (max-width: 640px)": {
    fontSize: $isSmallSize ? MobilePxToVw(20) : MobilePxToVw(22),
  },
}))

export const BoldTypographyLabel = styled(Typography)(() => ({
  fontWeight: 700,
  lineHeight: "140%",
}))

export const BoldTypographyValue = styled(Typography)(() => ({
  fontWeight: 700,
  lineHeight: "140%",
  textAlign: "end",
}))

export const AmountTypography = styled(Typography)(() => ({
  textAlign: "end",
}))

export const TotalPriceTypography = styled(Typography)(() => ({
  fontWeight: 700,
  lineHeight: "140%",
  textAlign: "end",
}))

export const PriceWrapper = styled(Box)(() => ({
  width: DesktopPxToVw(606),
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  "@media (max-width: 640px)": {
    width: "100%",
  },
}))

export const ButtonsBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "end",
  gap: DesktopPxToVw(20),
  marginTop: DesktopPxToVw(20),
  width: "100%",
  "@media (max-width: 640px)": {
    justifyContent: "center",
    gap: MobilePxToVw(20),
    marginTop: 0,
    padding: `${MobilePxToVw(35)} 0`,
    flexWrap: "wrap",
  },
}))

export const StyledButtons = styled(Button)(() => ({
  gap: DesktopPxToVw(16),
  padding: `${DesktopPxToVw(18)} ${DesktopPxToVw(36)}`,
  lineHeight: "140%",
  letterSpacing: "1.8px",
  "@media (max-width: 640px)": {
    gap: MobilePxToVw(16),
    padding: `${MobilePxToVw(18)} ${MobilePxToVw(36)}`,
  },
}))

export const HotelNameDivider = styled(Divider)(() => ({
  width: "4.167vw",
  height: "0.06vw",
  background: theme.palette.ihclPalette.hexOne,
}))

export const HotelNameStack = styled(Stack)(() => ({
  bottom: 0,
  gap: "1.042vw",
  flexDirection: "row",
  position: "absolute",
  alignItems: "center",
  margin: "0vw 0vw  3.125vw 3.438vw",
}))
