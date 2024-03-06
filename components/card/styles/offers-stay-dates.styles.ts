import { Box, Divider, Typography, styled } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"
import { theme } from "../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const MainContainer = styled(
  Box,
  transientProps,
)<{ $isBottomBorder: boolean }>(({ $isBottomBorder }) => ({
  border: $isBottomBorder ? `1px solid ${theme?.palette?.ihclPalette?.hexSeventeen}20` : "",
  borderWidth: "0 0 1px",
  width: "fit-content",
  maxWidth: "100%",
  display: "flex",
  paddingBottom: $isBottomBorder ? DesktopPxToVw(20) : "0vw",
  "@media (max-width:640px)": {
    flexDirection: "column",
    border: "unset",
    width: "100%",
    borderWidth: "unset",
    paddingBottom: "0vw",
  },
}))

export const DateCell = styled(
  Box,
  transientProps,
)<{ $isLastItem?: boolean; $isSingle: boolean }>(({ $isLastItem, $isSingle }) => ({
  width: $isSingle ? "fit-content" : "25vw",
  display: "flex",
  gap: "0.521vw",
  flexDirection: "column",
  "@media (max-width:640px)": {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "33.594vw 1fr",
    gap: "1.563vw",
    marginBottom: $isLastItem ? "" : "3.125vw",
    paddingBottom: "3.125vw",
    border: `1px solid ${theme?.palette?.ihclPalette?.hexSeventeen}20`,
    borderWidth: "0 0 1px",
  },
}))

export const DateTitleContainer = styled(Box)(() => ({
  width: "100%",
}))

export const DateTitleTypography = styled(Typography)(() => ({
  fontFamily: "Inter",
  fontSize: DesktopPxToVw(14),
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "150%",
  letterSpacing: "0.07rem",
  "@media (max-width:640px)": {
    fontSize: MobilePxToVw(22),
    fontWeight: 700,
    letterSpacing: "initial",
    lineHeight: "140%",
  },
}))
export const DateItem = styled(Box)(() => ({
  display: "flex",
  width: "100%",
  alignItems: "center",
  gap: DesktopPxToVw(12),
  "@media (max-width:640px)": {
    alignItems: "start",
    gap: MobilePxToVw(10),
  },
}))

export const IconCell = styled(Box)(() => ({
  width: DesktopPxToVw(22),
  display: "flex",
  "@media (max-width:640px)": {
    height: "4.813vw",
    width: MobilePxToVw(22),
    alignItems: "center",
  },
}))
export const DatesContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  "@media (max-width:640px)": {
    width: "100%",
    gap: MobilePxToVw(10),
  },
}))
export const DateTypography = styled(Typography)(() => ({
  fontFamily: "Inter",
  fontSize: DesktopPxToVw(22),
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "140%",
  "@media (max-width:640px)": {
    fontSize: MobilePxToVw(22),
    fontWeight: 300,
  },
}))

export const StyledDivider = styled(Divider)(() => ({
  width: "1px",
  marginRight: "1.042vw",
  backgroundColor: `${theme?.palette?.ihclPalette?.hexSeventeen}20`,
  "@media (max-width:640px)": {
    marginRight: "0vw",
  },
}))
