import styled from "@emotion/styled"
import { theme } from "../../../../lib/theme"
import { Box, Divider, Stack, Typography } from "@mui/material"
import { transientProps } from "../../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"

export const MainBox = styled(Box)(() => ({
  padding: "2.083vw",
  margin: "3.125vw 0vw",
  border: `1px solid ${theme?.palette?.ihclPalette?.hexSixteen}`,
  "@media (max-width: 640px)": {
    margin: "5.469vw 0vw",
    padding: "5.469vw 5vw ",
  },
}))

export const ItemsCenterBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}))

export const AlignItemsCenterBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",

  "@media (max-width: 640px)": {
    gap: "3.125vw",
    textAlign: "center",
    flexDirection: "column",
  },
}))

export const RoomSelectionBarBox = styled(Box)(() => ({
  padding: "0.521vw 1.042vw ",
  margin: "1.302vw 0vw 1.042vw 0vw",
  background: theme?.palette?.background?.paper,

  "@media (max-width: 640px)": {
    padding: "1.563vw",
    margin: `${MobilePxToVw(40)} 0vw ${MobilePxToVw(20)}`,
  },
}))

export const BottomDivider = styled(Divider)(() => ({
  width: "100%",
  opacity: "0.5",
  height: "0.052vw",
  marginTop: "2.083vw",
  background: theme?.palette?.ihclPalette?.hexTwelve,
}))

export const ButtonsStack = styled(Stack)(() => ({
  gap: "2.083vw",
  marginTop: "3.125vw",
  flexDirection: "row",
  justifyContent: "center",

  "@media (max-width: 640px)": {
    gap: "3.2vw",
    marginTop: "7.031vw",
  },
}))

export const RefundPriceDetailsStack = styled(Stack)(() => ({
  textAlign: "center",
  marginTop: "2.083vw",
  flexDirection: "row",
  justifyContent: "space-evenly",
}))

export const AmountWrapper = styled(
  Typography,
  transientProps,
)<{ $color?: string }>(({ $color }) => ({
  fontSize: "2.083vw",
  color: $color ? $color : theme?.palette?.text?.primary,
  "@media (max-width: 640px)": {
    fontSize: "3.438vw",
  },
}))

export const TotalAmount = styled(Typography)(() => ({
  fontSize: "2.083vw",
  color: theme?.palette?.ihclPalette?.hexTwo,

  "@media (max-width: 640px)": {
    fontSize: "3.438vw",
  },
}))

export const DeductionAmount = styled(Stack)(() => ({
  width: "30vw",
  margin: "0 auto",
  textAlign: "center",
  marginTop: "2.083vw",

  "@media (max-width: 640px)": {
    width: "100%",
    marginTop: "0vw",
  },
}))

export const ContentStack = styled(Stack)(() => ({
  width: "39vw",
  margin: "auto",
  textAlign: "center",

  "@media (max-width: 640px)": {
    width: "96%",
  },
}))

export const RoomImageBox: any = styled(Box)(() => ({
  width: "auto",
  height: "7.35vw",
  marginRight: "2vw",

  "@media (max-width: 640px)": {
    height: "23.438vw",
    marginRight: "3.125vw",
  },
}))

export const AmountDivider = styled(Divider)(() => ({
  opacity: "0.4",
  height: "0.156vw",
  margin: "2.188vw 0vw 3.125vw 0vw ",
  background: theme?.palette?.text?.primary,
}))

export const AmountStack = styled(Stack)(() => ({
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}))

export const WrapperCustomCheckBox = styled(
  Stack,
  transientProps,
)<{ $isMobile: boolean; $isChecked: boolean }>(({ $isMobile, $isChecked }) => ({
  flexDirection: "row",
  alignItems: "center",
  m: $isMobile ? `${MobilePxToVw(35)} ${MobilePxToVw(30)}` : "0vw",
  "& span": {
    fontSize: $isMobile ? `${MobilePxToVw(18)} !important` : `${DesktopPxToVw(22)} !important`,
  },
  "& .custom-check-box": {
    padding: $isMobile ? "auto" : $isChecked ? "auto" : 0,
    justifyContent: $isMobile ? "auto" : $isChecked ? "center" : "flex-start",
    marginRight: $isMobile ? MobilePxToVw(20) : $isChecked ? "none" : DesktopPxToVw(11),
  },
}))
