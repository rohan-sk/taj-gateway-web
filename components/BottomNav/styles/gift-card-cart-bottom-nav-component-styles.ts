import styled from "@emotion/styled"
import { theme } from "../../../lib/theme"
import { Box, Divider, Stack } from "@mui/material"
import { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const GiftCardNavigationMainWrapper = styled(Box)(() => ({
  bottom: 0,
  zIndex: "9",
  width: "100%",
  position: "fixed",
  background: theme?.palette?.background?.paper,
}))

export const GiftCardNavigationContentWrapper = styled(Box)(() => ({
  display: "flex",
  height: "12.5vw",
  alignItems: "center",
  justifyContent: "center",
  background: theme?.palette?.background?.paper,
}))

export const GiftCardNavigationButtonWrapper = styled(Box)(() => ({
  display: "flex",
  gap: "1.5625vw",
  cursor: "pointer",
  alignItems: "center",
}))

export const GiftCardNavigationOpenContentWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: theme?.palette?.background?.paper,
}))

export const GiftCardNavigationOpenSubtitleWrapper = styled(Box)(() => ({
  display: "flex",
  gap: "1.5625vw",
  cursor: "pointer",
  alignItems: "center",
  height: MobilePxToVw(81),
}))

export const GiftCardMainTitleContent = styled(Stack)(() => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginTop: MobilePxToVw(20),
  columnGap: MobilePxToVw(20),
}))

export const GiftCardMainTitleContentDivider = styled(Divider)(() => ({
  width: MobilePxToVw(40),
  height: MobilePxToVw(1),
  background: theme?.palette?.neuPalette?.hexSeventeen,
}))

export const GiftCardNavigationOpenPriceContentWrapper = styled(Box)(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-between",
}))

export const GiftCardCartTotalPriceDataWrapper = styled(Box)(() => ({
  bottom: "0",
  zIndex: 999,
  width: "100%",
  maxHeight: "50vh",
  overflowY: "scroll",
  position: "absolute",
  background: theme?.palette?.neuPalette?.hexOne,
  boxShadow: "-6px 10px 32px rgba(0, 0, 0, 0.15)",
  padding: `${MobilePxToVw(35)} ${MobilePxToVw(15)} ${MobilePxToVw(15)}`,
}))

export const GiftCardCartAmountWrapper = styled(Stack)(() => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}))
