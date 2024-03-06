import styled from "@emotion/styled"
import { Box, Divider } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { theme } from "../../../lib/theme"
import { transientProps } from "../../../utils/transientProps"

export const ImageWithOverlappedContentContainer = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  position: "relative",
  flexDirection: "row-reverse",
  paddingTop: DesktopPxToVw(70),
}))

export const CardWithContentDataCard = styled(Box)(() => ({
  top: "0vw",
  left: "0vw",
  gap: "1.875vw",
  display: "flex",
  position: "absolute",
  padding: `0vw 6.406vw`,
  flexDirection: "column",
  justifyContent: "center",
  width: DesktopPxToVw(823),
  minHeight: DesktopPxToVw(534),
  backgroundColor: theme?.palette?.ihclPalette?.hexOne,
  boxShadow: "-0.313vw 0.521vw 1.25vw rgba(0, 0, 0, 0.1)",
}))

export const TitleDividerStyle = styled(
  Divider,
  transientProps,
)<{ $mobile: boolean }>(({ $mobile }) => ({
  bottom: 16,
  marginRight: "5%",
  position: "relative",
  display: "inline-block",
  width: $mobile ? MobilePxToVw(40) : DesktopPxToVw(40),
  height: DesktopPxToVw(1),
  backgroundColor: theme?.palette?.ihclPalette?.hexSeventeen,
}))
