import { styled } from "@mui/system"
import { theme } from "../../../lib/theme"
import { Box, Divider } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const RenderComponentContainer = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean; $showDivider: boolean }>(({ $isMobile, $showDivider }) => ({
  "&>div": {
    gap: $showDivider ? "0.885vw" : "",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
}))

export const VerticalDivider = styled(Divider)(() => ({
  margin: `${DesktopPxToVw(0)} ${DesktopPxToVw(20)}`,
  backgroundColor: `${theme?.palette?.ihclPalette?.hexSeventeen}40`,
}))

export const HorizontalDivider = styled(Divider)(() => ({
  margin: `${DesktopPxToVw(50)} ${DesktopPxToVw(0)}`,
  backgroundColor: theme?.palette?.ihclPalette?.hexTwelve,
}))

export const MobileHorizontalDivider = styled(Divider)(() => ({
  margin: `${MobilePxToVw(40)} ${MobilePxToVw(0)}`,
  backgroundColor: theme?.palette?.ihclPalette?.hexTwelve,
}))

export const RenderComponentContentWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean; $showDivider: boolean; $fourItems: boolean }>(({ $isMobile, $showDivider, $fourItems }) => ({
  "&>div": {
    gap: $showDivider ? "0.885vw" : "",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  "& .package-images": {
    width: !$showDivider ? ($isMobile ? "100%" : $fourItems ? DesktopPxToVw(310) : DesktopPxToVw(364)) : "auto",
    height: !$showDivider ? ($isMobile ? "100%" : $fourItems ? DesktopPxToVw(172) : DesktopPxToVw(200)) : "auto",
  },
  "& .package-image-container": {
    maxWidth: !$showDivider
      ? $isMobile
        ? "auto"
        : $fourItems
        ? `${DesktopPxToVw(310)}`
        : `${DesktopPxToVw(364)}`
      : "auto",
  },
  "& .package-icon-title": {
    marginTop: $isMobile ? ($showDivider ? MobilePxToVw(17) : MobilePxToVw(30)) : $showDivider ? 0 : DesktopPxToVw(30),
  },
}))
