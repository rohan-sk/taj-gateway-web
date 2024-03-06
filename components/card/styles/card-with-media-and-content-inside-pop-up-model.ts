import styled from "@emotion/styled"
import { Box } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const MainContentWrapper = styled(
  Box,
  transientProps
)<{
  $isMobile: boolean
  $cardLevelPadding: any
  $staticCardLevelPadding: any
  $cardLevelBackgroundColor: any
  $rightMediaLeftContent: boolean
  $staticCardLevelBackgroundColor: any
}>(
  ({
    $isMobile,
    $cardLevelPadding,
    $rightMediaLeftContent,
    $staticCardLevelPadding,
    $cardLevelBackgroundColor,
    $staticCardLevelBackgroundColor,
  }) => ({
    display: "flex",
    rowGap: $isMobile ? MobilePxToVw(55) : "unset",
    flexDirection: $isMobile
      ? "column"
      : $rightMediaLeftContent
      ? "row-reverse"
      : "row",
    padding: $cardLevelPadding
      ? $cardLevelPadding
      : $isMobile
      ? $staticCardLevelPadding?.mobile
      : $staticCardLevelPadding?.desktop,
    backgroundColor: $cardLevelBackgroundColor
      ? $cardLevelBackgroundColor
      : $staticCardLevelBackgroundColor,
  })
)

export const ContentWrapper = styled(
  Box,
  transientProps
)<{
  $isMobile: boolean
}>(({ $isMobile }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  rowGap: $isMobile ? MobilePxToVw(35) : DesktopPxToVw(18),
  padding: $isMobile ? `0 ${MobilePxToVw(82)}` : `0 ${DesktopPxToVw(90)}`,
}))
