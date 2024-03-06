import styled from "@emotion/styled"
import { Box, Divider, Paper, Tab, Typography } from "@mui/material"
import { theme } from "../../../lib/theme"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const ParentBox = styled(Box)(() => ({
  margin: "0 auto",
  minWidth: "62.5vw",
  "@media (max-width: 640px)": {
    minWidth: "100%",
    height: "100%",
    background: theme?.palette?.background?.default,
  },
}))

export const SearchBarPaper = styled(Paper)(() => ({
  minHeight: "3.64vw",
  display: "flex",
  padding: "0.052vw 0.052vw",
  alignItems: "center",
  "&.MuiPaper-root": {
    borderRadius: "0vw",
    marginBottom: "0.26vw",
    boxShadow: "-0.313vw 0.521vw 1.250vw rgba(0, 0, 0, 0.1)",
  },
  "@media (max-width: 640px)": { minHeight: "12.5vw" },
}))
export const TabsShadowWrapper = styled(Box)(() => ({
  boxShadow: "-0.313vw 0.521vw 1.250vw rgba(0, 0, 0, 0.1)",
  "@media (max-width:640px)": {
    boxShadow: "unset",
  },
}))
export const CustomTab = styled(Tab)(() => ({
  padding: "0vw",
  fontWeight: "400",
  fontSize: "0.93vw",
  paddingTop: "0.78vw",
  textTransform: "none",
  paddingBottom: "0.93vw",
  backgroundColor: theme?.palette?.background?.paper,
  "@media (max-width: 640px)": {
    fontSize: MobilePxToVw(17),
    backgroundColor: theme?.palette?.background?.default,
  },
}))

export const ShadeBox = styled(Box)(() => ({
  position: "absolute",
  height: DesktopPxToVw(100),
  bottom: 0,
  width: "100%",
  pointerEvents: "none",
  background: `linear-gradient(180deg, rgba(255, 255, 255, 0.00) 25.88%, ${theme.palette.ihclPalette.hexOne} 96.53%)`,
  // "@media (max-width: 640px)": {
  //   display: "none",
  // },
}))

export const TabPanelParentBox = styled(Box)(() => ({
  height: "50vh",
  overflowY: "scroll",
  "::-webkit-scrollbar": {
    width: "0.20vw",
  },
  "::-webkit-scrollbar-thumb": {
    borderRadius: "0.313vw",
    background: theme?.palette?.ihclPalette?.hexSeventeen,
  },
  "@media (max-width: 640px)": {
    height: "84vh",
    padding: "0vw 12.813vw",
    overflowY: "auto",
    "::-webkit-scrollbar": {
      width: "1.25vw",
    },
    "::-webkit-scrollbar-thumb": {
      borderRadius: "0.938vw",
    },
  },
}))

export const StyledDivider = styled(Divider)(() => ({
  height: "0.052vw",
  opacity: "0.4",
  margin: "1.6vw 0",
  backgroundColor: theme?.palette?.ihclPalette?.hexSeventeen,
}))

export const FlexBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}))

export const StyledTypography = styled(Typography)(() => ({
  cursor: "pointer",
  padding: "0.52vw 2.5vw",
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  "&:hover": {
    background: "rgba(69, 68, 63, 0.1)",
  },
  "@media (max-width: 640px)": { padding: "1.563vw 0vw", fontSize: "3.75vw" },
}))

export const ActionBox = styled(Box)(() => ({
  display: "flex",
  padding: "2vw 0",
  alignItems: "center",
  justifyContent: "center",
}))

export const GlobalSearchIconImageBox: any = styled(Box)(() => ({
  height: "1.30vw",
  width: "1.30vw",
  marginLeft: "1.35vw",
  "@media (max-width: 640px)": {
    width: "3.594vw",
    height: "3.438vw",
    marginLeft: "3.344vw",
  },
}))

export const GlobalMicIconImageBox: any = styled(Box)(() => ({
  height: "1.4vw",
  width: "1.04vw",
  marginRight: "1.35vw",
  cursor: "pointer",
  "@media (max-width: 640px)": {
    width: "3.125vw",
    height: "4.219vw",
    marginRight: "4.141vw",
  },
}))

export const GlobalSearchIconSecondImageBox: any = styled(Box)(() => ({
  height: "3.33vw",
  width: "3.33vw",
  marginBottom: "1.4vw",
  opacity: 0.4,
  "@media (max-width: 640px)": {
    width: "9.844vw",
    height: "9.844vw",
  },
}))

export const SearchResultsDestinationTypography = styled(
  Typography,
  transientProps,
)<{ $isMarginTopRequired: boolean }>(({ $isMarginTopRequired }) => ({
  opacity: "0.6",
  fontWeight: "400",
  padding: `${$isMarginTopRequired ? "2.6vw" : "0.52vw"} 2.5vw 0.52vw`,
  "@media (max-width: 640px)": { padding: "6.25vw 0vw 1.563vw" },
}))

export const BackArrowIconSecondImageBox: any = styled(Box)(() => ({
  width: MobilePxToVw(9),
  height: MobilePxToVw(18),
}))

export const NoResultsFoundBox = styled(Box)(() => ({
  padding: "2.8vw 7vw",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}))

export const ResultNotFoundTypography = styled(Typography)(() => ({
  fontWeight: 700,
  marginBottom: "0.8vw",
  textAlign: "center",
}))

export const HotelDataBorderDivider = styled(
  Divider,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  margin: $isMobile
    ? `${MobilePxToVw(30)} 0vw 0vw`
    : `${DesktopPxToVw(30)} ${DesktopPxToVw(40)} ${DesktopPxToVw(30)} ${DesktopPxToVw(46)} !important`,
  height: "0.052vw",
  opacity: "0.4",
  backgroundColor: theme?.palette?.ihclPalette?.hexSeventeen,
}))
