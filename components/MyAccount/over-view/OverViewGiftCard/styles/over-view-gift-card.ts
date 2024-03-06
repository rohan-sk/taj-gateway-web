import { styled, Typography, Box } from "@mui/material"
import { theme } from "../../../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../../../utils/DesktopFontCalc"
import { transientProps } from "../../../../../utils/transientProps"
import { Mobile } from "../../../../modal/constants"

export const GiftCardBoxWrapper = styled(
  Box,
  transientProps,
)<{ $mobile: boolean }>(({ $mobile }) => ({
  border: `1px solid ${theme?.palette?.ihclPalette?.hexTwentyFive}`,
  padding: $mobile ? MobilePxToVw(33) : DesktopPxToVw(30),
  height: "unset!important",
}))

export const GCODetailsContainer = styled(
  Box,
  transientProps,
)<{ $minHeight: number; $marginBottom: number; $mobile: boolean }>(({ $minHeight, $marginBottom, $mobile }) => ({
  minHeight: $mobile ? MobilePxToVw($minHeight) : DesktopPxToVw($minHeight),
  marginBottom: $mobile ? MobilePxToVw($marginBottom) : DesktopPxToVw($marginBottom),
}))

export const GCODetailsDetailsSpacerContainer = styled(
  Box,
  transientProps,
)<{
  $mobile: boolean
}>(({ $mobile }) => ({
  padding: $mobile ? `${MobilePxToVw(32)} 0vw ${MobilePxToVw(20)}` : `${DesktopPxToVw(27)} 0vw`,
}))

export const ExpireTypography = styled(
  Typography,
  transientProps,
)<{ $mobile: boolean }>(({ $mobile }) => ({
  fontWeight: $mobile ? 700 : 300,
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  fontSize: $mobile ? MobilePxToVw(14) : DesktopPxToVw(16),
  fontFamily: "Inter",
  lineHeight: "140%",
  fontStyle: "normal",
}))

export const DateTypography = styled(
  Typography,
  transientProps,
)<{ $mobile: boolean }>(({ $mobile }) => ({
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  fontWeight: $mobile ? 300 : 700,
  fontSize: $mobile ? MobilePxToVw(22) : DesktopPxToVw(16),
  fontFamily: "Inter",
  lineHeight: "140%",
  fontStyle: "normal",
}))
