import styled from "@emotion/styled"
import { Stack } from "@mui/material"
import { theme } from "../../../lib/theme"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const BrasserieDescriptionWrapper = styled(
  Stack,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  "&>span": {
    fontWeight: 450,
    color: theme?.palette?.ihclPalette?.hexThirtyThree,
    fontSize: $isMobile ? MobilePxToVw(16) : DesktopPxToVw(16),
    lineHeight: $isMobile ? MobilePxToVw(23) : DesktopPxToVw(23),
  },
}))
