import { Box, Divider, Grid, Stack, styled, Typography } from "@mui/material"
import { theme } from "../../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { transientProps } from "../../../../utils/transientProps"
import { isMobile } from "../../styles/right-aligned-content-with-3-actions"
import { SquareSharp } from "@mui/icons-material"

export const CardContainer = styled(Box)(() => ({
  border: `1px solid #45443F`,
  display: "flex",
  marginBottom: "2vw",
  height: "auto",
  marginTop: DesktopPxToVw(27),
}))

export const SearchResultContainer = styled(Box)(() => ({}))

export const ActionBtnContainer = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean; $restaurants: boolean }>(({ $isMobile, $restaurants }) => ({
  display: "flex",
  width: "100%",
  marginBottom: DesktopPxToVw(24),
  padding: $isMobile ? "2.656vw 4.688vw" : "",
  justifyContent: $restaurants ? "flex-end" : "space-between",
}))

export const StyledTitle = styled(Typography)(() => ({
  color: `${theme?.palette?.ihclPalette?.hexSeventeen}`,
}))

export const NameAddressContainer = styled(Box)(() => ({
  display: "flex",
  paddingBottom: DesktopPxToVw(14),
  width: DesktopPxToVw(700),
  "@media (max-width:640px)": {
    flexDirection: "column",
  },
}))

export const ContactContainer = styled(Box)(() => ({
  display: "flex",
  padding: "0.72vw 0",
}))

export const RatePriceBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
}))

export const DescriptionBox = styled(Box)(() => ({
  width: DesktopPxToVw(719),
}))

export const HighlightsBox = styled(Box)(() => ({
  padding: "0.72vw 0",
}))

export const OPerationsBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  width: "60%",
}))
export const IconWrapper = styled(Box)(() => ({
  display: "flex",
  minHeight: "1.313vw",
  alignItems: "center",
  "@media (max-width:640px)": {
    marginTop: MobilePxToVw(2.5),
  },
}))

export const IconTitleBox = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  gap: $isMobile ? MobilePxToVw(15) : DesktopPxToVw(15),
  alignItems: "center",
}))

export const MailTitle = styled(
  Typography,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  fontWeight: 300,
  lineHeight: "140%",
  color: theme?.palette?.ihclPalette?.hexTwo,
  cursor: "pointer",
  paddingLeft: $isMobile ? MobilePxToVw(8) : "",
}))

export const TypographyMobile = styled(
  Typography,
  transientProps,
)<{ $isMobile?: boolean }>(({ $isMobile }) => ({
  fontWeight: 300,
  lineHeight: "140%",
  color: theme?.palette?.ihclPalette?.hexTwo,
  cursor: "pointer",
  paddingLeft: $isMobile ? MobilePxToVw(8) : "",
}))

export const FilterContainer: any = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  // justifyContent: "space-between",
  flexWrap: "wrap",
  alignItems: "flex-start",
  margin: "3.12vw 0vw",
  gap: "2.083vw",
  marginBottom: $isMobile ? "7.031vw" : "3.118vw",
  marginTop: $isMobile ? "7.031vw" : "3.4vw",
}))
export const FilterGridContainer = styled(Grid)(() => ({
  margin: "3.12vw 0vw",
  justifyContent: "space-between",
}))

export const MainGrid = styled(
  Grid,
  transientProps,
)<{ $isMobile: boolean }>(($isMobile) => ({
  marginBottom: "2.083vw",
  border: $isMobile
    ? `1px solid ${theme?.palette?.ihclPalette?.hexTwelve}`
    : `1px solid ${theme?.palette?.ihclPalette?.hexSeventeen}40`,
  "@media (max-width:640px)": { marginBottom: "12.5vw" },
}))

export const CommonSpaceGrid = styled(
  Grid,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  marginBottom: `${$isMobile ? "2.185vw" : "0.729vw"}`,
}))

export const HotelDetailsGrid = styled(
  Grid,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  marginBottom: `${$isMobile ? "2.185vw" : "0.313vw"}`,
}))
export const SearchDetailsGrid = styled(
  Grid,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }: any) => ({
  padding: $isMobile ? "6.25vw 4.688vw 2.656vw" : "2.083vw 2.083vw 1.0415vw 1.927vw ",
  "@media (max-width:640px)": {
    position: "relative",
    bottom: "5px", //this media query will needs to be remove if we get images properly from backend
  },
}))

export const DetailsTypography = styled(Typography)(() => ({
  color: theme?.palette?.ihclPalette?.hexSeventeen,
}))

export const FullDivider = styled(
  Divider,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  width: "100%",
  background: `${theme?.palette?.ihclPalette?.hexSeventeen}40`,
  marginBottom: `${$isMobile ? "2.188vw" : "0.79vw"}`,
}))

export const IconContainer = styled(Box)(() => ({
  height: "0.938vw",
}))

export const AminityContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: DesktopPxToVw(24),
  "@media (max-width:640px)": {
    minHeight: MobilePxToVw(24),
  },
}))

export const Aminity = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  gap: "0.938vw",
  "@media (max-width:640px)": {
    gap: "2.813vw",
  },
}))
export const Diamond = styled(SquareSharp)(() => ({
  color: theme?.palette?.ihclPalette?.hexTwo,
  width: DesktopPxToVw(10),
  height: DesktopPxToVw(10),
  transform: "rotate(45deg)",

  "@media (max-width: 640px)": {
    width: MobilePxToVw(10),
    height: MobilePxToVw(10),
  },
}))
export const IconResponsiveWrapper = styled(Box)(() => ({
  width: "0.938vw",
  height: "0.938vw",
  "@media (max-width:640px)": {
    width: "2.656vw",
    height: "2.656vw",
  },
}))
export const Dot = styled(Box)(() => ({
  borderRadius: "100%",
  marginLeft: "0.5vw",
  background: theme?.palette?.ihclPalette?.hexSeventeen,
  width: "0.417vw",
  height: "0.417vw",
  "@media (max-width:640px)": {
    width: "0.938vw",
    height: "0.938vw",
  },
}))

export const NoResultTypography = styled(Typography)(() => ({
  fontFamily: "supreme",
  fontSize: DesktopPxToVw(22),
  fontStyle: "normal",
  fontWeight: 300,
  lineHeight: "140%",
  maxWidth: "30vw",
  "@media (max-width:640px)": {
    fontSize: MobilePxToVw(22),
    maxWidth: "90%",
  },
}))

export const NoResultContainer = styled(Box)(() => ({
  margin: "3.125vw 0vw 5.729vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  color: theme.palette.ihclPalette.hexTwelve,
  textAlign: "center",
  width: "100%",
  border: `1px solid var(--grey-40, ${theme.palette.ihclPalette.hexTwelve})`,
  "@media max-width:640px": {
    margin: "9.375vw 0vw 14.063vw",
  },
}))
