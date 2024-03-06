import styled from "@emotion/styled"
import { Divider, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { theme } from "../../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { transientProps } from "../../../../utils/transientProps"

export const GCText = styled(
  Typography,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  fontSize: $isMobile ? MobilePxToVw(14) : DesktopPxToVw(14),
  fontFamily: "Inter",
  lineHeight: "140%",
}))

export const GCTextValue = styled(GCText)(({ $isMobile }) => ({
  paddingTop: DesktopPxToVw(5),
  fontSize: $isMobile ? MobilePxToVw(22) : DesktopPxToVw(14),
}))

export const FlexBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
}))

export const BalanceBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  float: "right",
}))

export const GCBox = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexDirection: $isMobile ? "column" : "row",
  border: `1px solid ${theme?.palette?.ihclPalette?.hexNineteen}`,
  marginTop: DesktopPxToVw(35),
  marginBottom: DesktopPxToVw(35),
  padding: DesktopPxToVw(35),
  gap: DesktopPxToVw(30),
}))

export const HeaderBox = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  backgroundColor: theme?.palette?.background?.paper,
  width: $isMobile ? "100%" : "33.1%",
  display: "flex",
  justifyContent: "space-between",
  padding: "20px",
  alignItems: "center",
}))

export const GCDetailsBox = styled(FlexBox)(() => ({
  paddingTop: DesktopPxToVw(10),
  justifyContent: "unset",
  gap: DesktopPxToVw(15),
}))

export const ActionButton = styled(
  Typography,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  paddingTop: DesktopPxToVw(10),
  color: theme?.palette?.ihclPalette?.hexTwo,
  textDecoration: "underline  1px",
  fontSize: $isMobile ? MobilePxToVw(18) : DesktopPxToVw(18),
}))

export const StyledDivider = styled(Divider)(() => ({
  paddingTop: DesktopPxToVw(10),
}))

export const GCFlexBox = styled(
  FlexBox,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  alignItems: $isMobile ? "center" : "baseline",
  flexDirection: $isMobile ? "column" : "row",
  justifyContent: $isMobile ? "center" : "space-between",
}))

export const GCHeaderWrapperBox = styled(Box)(() => ({
  display: "flex",
  paddingTop: DesktopPxToVw(35),
  gap: DesktopPxToVw(3),
  flexWrap: "wrap",
  flexDirection: "row-reverse",
}))
export const NoGiftCardsText = styled(Typography)(() => ({
  textAlign: "center",
  paddingTop: DesktopPxToVw(75),
}))

export const LoadMoreContainer = styled(Box)(() => ({
  justifyContent: "center",
  display: "flex",
  paddingBottom: "2vw",
}))
