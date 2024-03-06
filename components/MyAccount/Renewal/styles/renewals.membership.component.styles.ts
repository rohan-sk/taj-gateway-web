import styled from "@emotion/styled"
import { Box, Typography } from "@mui/material"
import { theme } from "../../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { transientProps } from "../../../../utils/transientProps"

export const BorderedCardWrapper = styled(Box)(() => ({
  border: `1px solid ${theme?.palette?.neuPalette?.hexSixteen}`,
  padding: "2.123vw 1.563vw 0vw",
  minHeight: "13.177vw",
  "@media (max-width:640px)": {
    minHeight: "unset",
    padding: "5vw 5.469vw 0vw",
  },
}))
export const InnerCardGrid = styled(Box)(() => ({
  display: "grid",
  gap: "1.563vw",
  gridTemplateColumns: "13.906vw 1fr",
  "@media (max-width:640px)": {
    gridTemplateColumns: "1fr",
    gap: "3.438vw",
  },
}))
export const PriceButtonMainBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  alignItems: "end",
  gap: DesktopPxToVw(10),
  "@media(max-width:640px)": {
    flexDirection: "initial",
    alignItems: "initial",
    gap: "0vw",
  },
}))

export const DetailsCurrencyContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "row",
  margin: "1.563vw 0vw",
  "@media (max-width:640px)": {
    flexDirection: "column",
    gap: "3.125vw",
  },
}))

export const DatesContainer = styled(Box)(() => ({
  display: "flex",
  gap: "3.906vw",
  justifyContent: "start",
  marginBottom: "0.931vw",
  "@media (max-width:640px)": {
    gap: "3.125vw",
    justifyContent: "space-evenly",
  },
}))
export const ColumnFlexBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}))
export const BoldTitle = styled(Typography)(() => ({
  color: theme?.palette?.neuPalette?.hexSeventeen,
  fontFamily: "Inter",
  fontSize: DesktopPxToVw(14),
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "140%",
  marginBottom: "0.312vw",
  "@media (max-width:640px)": {
    fontSize: MobilePxToVw(14),
    marginBottom: "1.719vw",
  },
}))
export const BoldSubfieldTitleTypography = styled(Typography)(() => ({
  fontFamily: "Inter",
  color: theme?.palette?.neuPalette?.hexSeventeen,
  fontSize: "0.729vw",
  fontWeight: "700",
  lineHeight: "1.042vw",
  letterSpacing: "0em",
}))
export const CoinBalance = styled(Typography)(() => ({
  fontSize: DesktopPxToVw(18),
  fontWeight: 300,
  fontFamily: "Inter",
  color: theme?.palette?.neuPalette?.hexSeventeen,
  fontStyle: "normal",
  lineHeight: "140%",
  "@media (max-width :640px)": {
    fontSize: MobilePxToVw(14),
    fontWeight: 700,
  },
}))

export const InnerBoxCard = styled(
  Box,
  transientProps
)<{ $isMobile?: boolean }>(({ $isMobile }) => ({
  width: $isMobile ? MobilePxToVw(476) : DesktopPxToVw(270),
  height: $isMobile ? MobilePxToVw(317) : DesktopPxToVw(180),
}))

export const TypographyRenewalPrice = styled(
  Typography,
  transientProps
)<{ $isMobile?: boolean }>(({ $isMobile }) => ({
  textDecoration: "line-through",
  fontSize: $isMobile ? MobilePxToVw(22) : DesktopPxToVw(22),
  color: theme?.palette?.neuPalette?.hexTwelve,
}))

export const DiscountBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "end",
}))

export const ColumnFlexBoxChild = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  width: DesktopPxToVw(160),
  "@media (max-width: 640px)": {
  width:"100%"
  },
}))