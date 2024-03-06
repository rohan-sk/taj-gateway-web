import styled from "@emotion/styled"
import { theme } from "../../../../lib/theme"
import { Box, Divider, Stack, Typography } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"

export const DateDivider = styled(Divider)(() => ({
  opacity: "0.5",
  width: "1.563vw",
  height: "0.052vw",
  margin: "0vw 1.042vw",
  "@media (max-width: 640px)": {
    width: MobilePxToVw(30),
  },
  background: theme?.palette?.ihclPalette?.hexTwelve,
}))

export const CancelPolicyTypography = styled(Typography)(() => ({
  lineHeight: "140%",
  maxWidth: DesktopPxToVw(690),
  "@media (max-width: 640px)": {
    maxWidth: "unset",
  },
}))

export const BoldTypography = styled(Typography)(() => ({
  fontWeight: 700,
}))

export const PackageNameStack = styled(Stack)(() => ({
  alignItems: "center",
  marginTop: "0.365vw",
  flexDirection: "row",
  justifyContent: "space-between",
}))

export const CancelPolicyStack = styled(Stack)(() => ({
  gap: "3.75vw",
  flexDirection: "row",
  justifyContent: "flex-end",
  "@media (max-width: 640px)": {
    width: "100%",
    flexDirection: "column",
    marginBottom: MobilePxToVw(20),
    gap: MobilePxToVw(20),
  },
}))

export const DynamicStack = styled(Stack)(() => ({
  flexDirection: "column",
  "@media (max-width: 640px)": {
    justifyContent: "space-between",
    flexDirection: "row",
  },
}))

export const CancelPolicyMainStack = styled(Stack)(() => ({
  gap: "5.990vw",
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: "0.625vw",
  "@media (max-width: 640px)": {
    marginTop: MobilePxToVw(20),
    gap: "0vw",
  },
}))

export const DateStack = styled(Stack)(() => ({
  alignItems: "center",
  flexDirection: "row",
  columnGap: DesktopPxToVw(20),
  "@media (max-width: 640px)": {
    columnGap: MobilePxToVw(20),
  },
}))

export const RefundAmountLabelTypography = styled(Typography)(() => ({
  fontWeight: 700,
  whiteSpace: "nowrap",
  marginBottom: "0.417vw",
}))

export const PayableAmountTypography = styled(Typography)(() => ({
  textAlign: "end",
  color: theme?.palette?.ihclPalette?.hexTwo,
}))

export const RoomDetailsBox = styled(Box)(() => ({
  display: "flex",

  "@media (max-width: 640px)": {
    flexDirection: "column",
  },
}))
