import { theme } from "../../../lib/theme"
import { Box, Button, Divider, Stack, Typography } from "@mui/material"
import styled from "@emotion/styled"
import { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { transaction } from "mobx"
import { transientProps } from "../../../utils/transientProps"

export const DropDownBox = styled(Box)(() => ({
  display: "flex",
  gap: "1.5625vw",
  alignItems: "center",
}))

export const TitleStack = styled(Stack)(() => ({
  gap: "3.125vw",
  flexDirection: "row",
  marginTop: "3.125vw",
  alignItems: "center",
  justifyContent: "center",
}))

export const ParentBox = styled(Box)(() => ({
  bottom: 0,
  zIndex: "9",
  width: "100%",
  position: "fixed",
  background: theme?.palette?.background?.paper,
}))

export const TitleDivider = styled(Divider)(() => ({
  width: "6.250vw",
  height: "0.156vw",
  background: theme.palette.neuPalette.hexSeventeen,
}))

export const BottomSheetBox = styled(Box)(() => ({
  display: "flex",
  height: "12.5vw",
  alignItems: "center",
  justifyContent: "center",
  background: theme?.palette?.background?.paper,
}))

export const PriceDetailsMainBox = styled(Box)(() => ({
  width: "100%",
  padding: "5.78vw 2.35vw 0vw 2.35vw",
  background: theme?.palette?.neuPalette?.hexOne,
  boxShadow: "-6px 10px 32px rgba(0, 0, 0, 0.15)",
  maxHeight: "50vh",
  overflowY: "scroll",
  zIndex: 999,
  position: "absolute",
  bottom: "0",
}))

export const ParentBottomBox = styled(Box)(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-between",
}))

export const ChildBottomBox = styled(Box)(() => ({
  width: "100%",
  padding: "0vw 7.8125vw",
  display: "flex",
  justifyContent: "space-between",
  marginTop: MobilePxToVw(20),
}))

export const TypographyEpicureTitle = styled(Typography)(() => ({
  fontFamily: "Inter",
  fontSize: MobilePxToVw(22),
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "140%",
}))

export const TypographyEpicureCost = styled(Typography)(() => ({
  fontFamily: "Inter",
  fontSize: MobilePxToVw(20),
  fontStyle: "normal",
  fontWeight: "300",
  lineHeight: "140%",
}))

export const BottomBoxEpicure = styled(Box)(() => ({
  padding: "0vw 5.47vw 5.47vw 5.47vw",
  display: "flex",
  flexDirection: "column",
  rowGap: MobilePxToVw(6),
}))

export const BoxShowPrice = styled(
  Box,
  transientProps
)<{ showPrice?: boolean }>(({ showPrice }) => ({
  transform: showPrice ? "rotate(180deg)" : "rotate(0deg)",
  paddingTop: showPrice ? "0vw" : MobilePxToVw(4),
}))

export const BoxNeuCoins = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  paddingBottom: "0.8vw",
  justifyContent: "space-between",
}))
