import { styled } from "@mui/system"
import { Stack } from "@mui/material"
import { theme } from "../../../lib/theme"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const EGiftCardOrderStatusContainer = styled(
  Stack,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  backgroundColor: $isMobile ? theme?.palette?.ihclPalette?.hexOne : theme?.palette?.ihclPalette?.hexTwentyNine,
  flexDirection: "column",
  alignItems: "center",
  rowGap: $isMobile ? MobilePxToVw(10) : DesktopPxToVw(10),
  padding: $isMobile ? MobilePxToVw(40) : DesktopPxToVw(40),
}))
