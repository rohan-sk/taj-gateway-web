import { theme } from "../../../../lib/theme"
import { transientProps } from "../../../../utils/transientProps"
import { styled, Box, Typography, Stack, Divider } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"

export const MainStack = styled(Stack)(() => ({
  width: "100%",
  flexDirection: "row",
  marginBottom: "2.083vw",
  border: `1px solid ${theme?.palette?.neuPalette?.hexSixteen}`,
  "@media (max-width:640px)": {
    flexDirection: "column",
    marginBottom: "5.469vw",
  },
}))

export const VoucherImage: any = styled(Box)(() => ({
  width: DesktopPxToVw(360),
  objectFit: "cover",
  "@media (max-width:640px)": {
    width: "100%",
    height: MobilePxToVw(323),
  },
}))

export const ContentBox = styled(Box)(() => ({
  width: "100%",
  padding: "1.041vw 1.563vw",
  "@media (max-width:640px)": {
    padding: "5vw 5vw 5.469vw",
  },
}))

export const LoadMoreStack = styled(Stack)(() => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: DesktopPxToVw(60),
  "@media (max-width:640px)": {
    marginBottom: MobilePxToVw(40),
  },
}))

export const ChipBoxesContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "start",
  gap: "0.521vw",
  marginBottom: "1.042vw",
  flexWrap: "wrap",
  "@media (max-width:640px)": {
    gap: "1.563vw",
    marginBottom: "3.125vw",
  },
}))
export const ChipLabelsBox = styled(Box)(() => ({
  width: "fit-content",
  padding: "0.313vw 0.833vw",
  border: `0.052vw solid ${theme?.palette?.neuPalette?.hexTwo}`,
}))

export const DateRedeemStack = styled(Stack)(() => ({
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: "0.677vw",
  "@media (max-width:640px)": {
    marginTop: "3.125vw",
    marginBottom: "3.125vw",
  },
}))

export const DateStack = styled(Stack)(() => ({
  flexDirection: "row",

  "@media (max-width:640px)": {
    flexDirection: "column",
    gap: "1.563vw",
  },
}))
export const DateLabel = styled(Typography)(() => ({
  fontSize: "0.833vw",
  fontWeight: 300,
  "@media (max-width:640px)": {
    fontWeight: 700,
    fontSize: "2.188vw",
  },
}))
export const DateText = styled(Typography)(() => ({
  fontSize: "0.833vw",
  fontWeight: 700,
  "@media (max-width:640px)": {
    fontWeight: 300,
    fontSize: "3.438vw",
  },
}))
export const HorizontalDivider = styled(Divider)(() => ({
  width: "100%",
  height: "0.052vw",
  margin: "1.042vw 0vw",
  backgroundColor: theme?.palette?.neuPalette?.hexSeven,
}))

export const DescriptionTypography = styled(Typography)(() => ({
  overflow: "hidden",
  WebkitLineClamp: 2,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  lineHeight: "140%",
  fontWeight: 300,
}))

export const ActionItemsStack = styled(
  Stack,
  transientProps
)<{ $isRedeemable: boolean }>(({ $isRedeemable }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: $isRedeemable ? "space-between" : "flex-end",
  "@media (max-width:640px)": {
    paddingTop: "2.344vw",
    justifyContent: "spaceBetween",
  },
}))

export const UserActionsStack = styled(Stack)(() => ({
  display:"flex",
  flexDirection: "row",
  "@media (max-width:640px)": {
    gap:"20vw",  // added gap for my account voucher issue
    width: "100%",
    justifyContent: "space-Between",
    paddingRight:"18.14vw"
  },
}))

export const IconsStack = styled(Stack)(() => ({
  gap: "0.521vw",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "start",
  "@media (max-width:640px)": {
    gap: "2.15vw",
  },
}))

export const ShareTypography = styled(Typography)(() => ({
  fontSize: "0.833vw",
  "@media (max-width:640px)": {
    fontSize: "2.813vw",
    letterSpacing:"0.231vw"
  }
}))

export const VerticalDivider = styled(Divider)(() => ({
  width: "0.055vw",
  height: "1.042vw",
  margin: "0vw 0.521vw",
  backgroundColor: theme?.palette?.neuPalette?.hexTwelve,
}))

export const Icon: any = styled(Box)(() => ({
  width: "0.833vw",
  height: "0.833vw",
  "@media (max-width:640px)": {
    width: "3.75vw",
    height: "auto",
  },
}))
