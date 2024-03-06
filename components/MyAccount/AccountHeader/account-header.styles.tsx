import { theme } from "../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { transientProps } from "../../../utils/transientProps"
import { Box, Grid, Stack, Typography, styled } from "@mui/material"

export const BoxWrapper = styled(Box)(() => ({
  width: "7vw",
  height: "7vw",
  display: "flex",
  padding: `${DesktopPxToVw(10)} ${DesktopPxToVw(20)}`,
  alignItems: "center",
  borderRadius: "0.5vw",
  flexDirection: "column",
  backgroundColor: theme?.palette?.background?.default,
  justifyContent: "space-around",
  cursor: "pointer",
  gap: DesktopPxToVw(23),
  "@media (max-width: 640px)": {
    width: "18vw",
    height: "auto",
    padding: "1.563vw 3.125vw 0.93vw 3.125vw",
    borderRadius: MobilePxToVw(10),
    backgroundColor: theme?.palette?.background?.default,
    gap: "0vw",
  },
}))

export const ChildGridContainer = styled(Grid)(() => ({
  display: "flex",
  gap: 2,
}))

export const GridContainer: any = styled(Grid)(() => ({
  display: "flex",
  width: "74.8vw",
  marginTop: "2vw",
  alignItems: "center",

  "@media (max-width: 640px)": {
    width: "100%",
    display: "grid",
    marginTop: "0vw",
  },
}))

export const MembershipDetailsStack = styled(Stack)(() => ({
  flexDirection: "row",
  justifyContent: "flex-start",

  "@media (max-width: 640px)": {
    justifyContent: "center",
  },
}))

export const ACHighlightsStack = styled(Stack)(() => ({
  flexDirection: "row",
  columnGap: "2.083vw",
  justifyContent: "flex-end",

  "@media (max-width: 640px)": {
    justifyContent: "center",
  },
}))

export const StyledImage: any = styled(Box)(() => ({
  marginRight: DesktopPxToVw(40),
}))

export const TabWrapper = styled(
  Typography,
  transientProps
)<{ $index: boolean }>(({ $index }) => ({
  color: $index
    ? theme?.palette?.neuPalette?.hexTwo
    : theme?.palette?.neuPalette?.hexSeventeen,
  cursor: "pointer",
}))

export const ContentBox = styled(
  Box,
  transientProps
)<{ $select: boolean }>(({ $select }) => ({
  display: $select ? "block" : "none",

  "@media (max-width: 640px)": {
    display: $select ? "flex" : "none",
    marginTop: MobilePxToVw(24),
    flexDirection: "column",
  },
}))

export const CountLabelTypography = styled(Typography)(() => ({
  whiteSpace: "nowrap",
}))
