import styled from "@emotion/styled"
import { theme } from "../../../../lib/theme"
import { Box, Divider, Typography } from "@mui/material"
import { transientProps } from "../../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"

export const HorizontalDividerOne = styled(
  Divider,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  opacity: 0.2,
  backgroundColor: theme?.palette?.ihclPalette?.hexSeventeen,
  margin: $isMobile ? `${MobilePxToVw(40)} 0vw` : `${DesktopPxToVw(20)} 0vw`,
}))

export const ScrollableContentWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  overflowY: "scroll",
  flexDirection: "column",
  gap: $isMobile ? MobilePxToVw(40) : DesktopPxToVw(24),
  height: $isMobile ? MobilePxToVw(400) : DesktopPxToVw(395),
  "&::-webkit-scrollbar-thumb": {
    borderRadius: DesktopPxToVw(6),
    backgroundColor: theme?.palette?.ihclPalette?.hexSeven,
  },
  "&::-webkit-scrollbar": {
    width: DesktopPxToVw(5),
  },
}))

export const ScrollableDescriptionTitleTypography = styled(Typography)(() => ({
  opacity: 0.5,
  fontWeight: 700,
  color: theme?.palette?.ihclPalette?.hexEleven,
}))

export const ScrollableDescriptionContentWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexDirection: "column",
  gap: $isMobile ? MobilePxToVw(30) : DesktopPxToVw(24),
}))

export const HorizontalSecondDivider = styled(
  Divider,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  opacity: 0.2,
  backgroundColor: theme?.palette?.ihclPalette?.hexSeventeen,
  margin: $isMobile ? `0vw 0vw ${MobilePxToVw(17)} 0vw` : `${DesktopPxToVw(22)} 0vw ${DesktopPxToVw(40)}`,
}))

export const ActionButtonsWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexDirection: $isMobile ? "row-reverse" : "unset",
}))

export const ActionPropsButtonContainer = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "flex-end",
  flexDirection: $isMobile ? "column" : "row",
  gap: $isMobile ? MobilePxToVw(10) : DesktopPxToVw(20),
}))

export const ActionPropsDetailsWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: $isMobile ? "center" : "flex-end",
}))

export const CurrencyTitleTypography = styled(
  Typography,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  fontWeight: 400,
  fontSize: $isMobile ? MobilePxToVw(32) : DesktopPxToVw(32),
}))

export const VerticalDivider = styled(Divider)(() => ({
  margin: `0vw ${DesktopPxToVw(40)}`,
  backgroundColor: theme?.palette?.ihclPalette?.hexSixteen,
}))
