import styled from "@emotion/styled"
import { theme } from "../../../lib/theme"
import { ChevronRight } from "@mui/icons-material"
import { Box, Switch, Typography } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const StyledChevronRight = styled(
  ChevronRight,
  transientProps,
)<{ $bgColor?: string }>(({ $bgColor }) => ({
  height: "auto",
  width: "1.2vw",
  color: $bgColor ?? theme?.palette?.ihclPalette?.hexTwo,
  "@media (max-width: 640px)": {
    width: "3vw",
  },
}))

export const MediaCardSubTitleTypography = styled(
  Typography,
  transientProps,
)<{ $textColor?: string }>(({ $textColor }) => ({
  padding: " 1.05vw 0vw 0.65vw 0vw ",
  color: $textColor ? $textColor : theme?.palette?.text?.primary,
}))

export const PrimaryActionBox = styled(Box)(() => ({
  width: "100%",
  marginTop: "2.083vw",
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "space-between",
  "@media (max-width: 640px)": {
    marginTop: "5.46vw",
    flexDirection: "row-reverse",
    justifyContent: "center",
  },
}))

export const CtaLabelBox = styled(Box)(() => ({
  display: "flex",
  cursor: "pointer",
  alignItems: "center",
}))

export const MediaCardComponentContainerBox = styled(
  Box,
  transientProps,
)<{ $alignItems?: any; $cardMediaGap?: any }>(({ $alignItems, $cardMediaGap }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  gap: $cardMediaGap ? "8.490vw" : "6.5vw",
  alignItems: $alignItems ? "flex-start" : "center",
}))

export const TwoRowTitleBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}))

export const MediaCardDescriptionTypography = styled(
  Typography,
  transientProps,
)<{ $textColor?: string }>(({ $textColor }) => ({
  marginTop: "0.95vw",
  lineHeight: "140%",
  color: $textColor ? $textColor : theme?.palette?.text?.primary,
  "@media (max-width: 640px)": {
    marginTop: "2.1875vw",
  },
}))

export const MediaCardComponentTotalContainerBox = styled(
  Box,
  transientProps,
)<{
  $aesthetic: any
  $cardPadding: any
  $isMobile: boolean
  $isVariantCheck: any
  $cardBackgroundColor: any
}>(({ $aesthetic, $cardPadding, $isMobile, $isVariantCheck, $cardBackgroundColor }) => ({
  padding: $aesthetic ? $cardPadding : "0vw",
  flexDirection: $isMobile ? "column" : $isVariantCheck ? "row-reverse" : "row",
  background: $cardBackgroundColor,
}))

export const LargeImageOrVideoBox = styled(
  Box,
  transientProps,
)<{
  $isMobile: boolean
}>(({ $isMobile }) => ({
  width: $isMobile ? "100%" : "45vw",
}))

export const HighLightsInMediaCardBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "0.729vw",
  paddingTop: "0.781vw",
}))

export const PrimarySecondaryWrappingBox = styled(Box)(() => ({
  display: "flex",
  gap: "1.042vw",
  alignItems: "center",
  flexDirection: "row",
  "@media (max-width: 640px)": {
    gap: "2.344vw",
    justifyContent: "start",
    flexDirection: "row-reverse",
  },
}))
export const FlexBox = styled(Box)(() => ({
  display: "flex",
}))

export const MediaCardContentContainer = styled(Box)(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}))

export const AntSwitch = styled(Switch)(() => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "red" : "#AD8B3A",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#D7D5CF" : "#D7D5CF",
    boxSizing: "border-box",
  },
}))

export const CardBrasserieTextUnderlineSingleContentWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  "& span": {
    fontWeight: 700,
    fontSize: $isMobile ? MobilePxToVw(24) : DesktopPxToVw(28),
    "& span": { color: theme?.palette?.ihclPalette?.hexTwo },
  },
}))

export const CardBrasserieTextUnderlineSingleContentContainer = styled(Box)(() => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  alignContent: "center",
  flexDirection: "column",
  rowGap: DesktopPxToVw(10),
}))

export const CardBrasserieTextUnderlineImageContainer = styled(Box)(() => ({ width: "fit-content", display: "flex" }))
