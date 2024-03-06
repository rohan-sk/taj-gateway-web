import { Box, Divider, Stack, Typography, styled } from "@mui/material"
import { theme } from "../../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { transientProps } from "../../../../utils/transientProps"

export const CommentsWrapper = styled(
  Box,
  transientProps,
)<{ $padding: string; $bgcolor: string }>(({ $padding, $bgcolor }) => {
  return {
    padding: $padding,
    background: $bgcolor,
  }
})

export const TableOfContentWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  padding: $isMobile ? `${MobilePxToVw(60)} ${MobilePxToVw(83)}` : `${DesktopPxToVw(60)} ${DesktopPxToVw(40)}`,
  background: theme?.palette?.ihclPalette?.hexTwentyNine,
  marginTop: $isMobile ? MobilePxToVw(40) : DesktopPxToVw(40),
  marginBottom: $isMobile ? `${MobilePxToVw(40)}` : `${DesktopPxToVw(40)}`,
}))

export const TableHeader = styled(
  Stack,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  borderColor: theme?.palette?.text?.primary,
  alignItems: "center",
  flexDirection: "row",
  alignContent: "center",
  justifyContent: "flex-start",
  borderBottom: `1px solid ${theme?.palette?.ihclPalette?.hexSixteen}`,
  borderWidth: "1px",
  paddingBottom: $isMobile ? `${MobilePxToVw(30)}` : `${DesktopPxToVw(30)}`,
}))

export const TableBody = styled(
  Stack,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: $isMobile ? `${MobilePxToVw(30)}` : `${DesktopPxToVw(30)}`,
}))

export const TableRow = styled(
  Stack,
  transientProps,
)<{ $isMobile: boolean; $index: number }>(({ $isMobile, $index }) => ({
  flex: $isMobile ? "0 calc(100%)" : "0 1 calc(50%)",
  flexDirection: "row",
  marginTop: $isMobile
    ? $index > 0
      ? MobilePxToVw(20)
      : MobilePxToVw(0)
    : $index > 1
    ? DesktopPxToVw(20)
    : DesktopPxToVw(0),
}))

export const RowContentCount = styled(
  Typography,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  fontWeight: 700,
  lineHeight: "140%",
  fontSize: $isMobile ? MobilePxToVw(22) : DesktopPxToVw(22),
  paddingRight: $isMobile ? `${MobilePxToVw(8)}` : `${DesktopPxToVw(8)}`,
}))

export const CustomDivider = styled(
  Divider,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  height: "2%",
  width: $isMobile ? `${MobilePxToVw(40)}` : "2.437vw",
  borderColor: theme?.palette?.text?.primary,
}))

export const BlogHeaderWrapper = styled(
  Stack,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  rowGap: $isMobile ? "0.9957vh" : "1.4224vh",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0px",
}))

export const ThemeListingWrapper = styled(
  Stack,
  transientProps,
)<{ $isMobile: boolean; $padding: { desktop: string; mobile: string } }>(({ $isMobile, $padding }) => ({
  padding: $isMobile ? $padding?.mobile : $padding?.desktop,
}))
