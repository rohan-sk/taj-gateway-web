import { theme } from "../../../../../lib/theme"
import { Box, Stack, Typography, styled, Divider } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../../../utils/DesktopFontCalc"

export const MainBox = styled(Box)(() => ({
  display: "flex",
  padding: "0.4vw 1vw",
  margin: "1vw 0vw 1.4vw 0vw",
  backgroundColor: theme?.palette?.background?.paper,
  "@media (max-width: 640px)": {
    padding: MobilePxToVw(10),
    margin: `${MobilePxToVw(20)} 0`,
  },
}))

export const MainStack = styled(Stack)(() => ({
  height: "100%",
  gap: "2.031vw",
  flexDirection: "row",
  "@media (max-width: 640px)": {
    flexDirection: "column",
    rowGap: MobilePxToVw(20),
  },
}))

export const DropDownStack = styled(Stack)(() => ({
  cursor: "pointer",
  flexDirection: "row",
  alignItems: "center",
  width: DesktopPxToVw(305),
  justifyContent: "space-between",
  borderBottom: `1px solid ${theme.palette.ihclPalette.hexTwelve}`,
  "@media (max-width: 640px)": {
    width: "100%",
  },
}))

export const DropDownMenuStack = styled(Stack)(() => ({
  width: DesktopPxToVw(305),
  position: "absolute",
  boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
  backgroundColor: theme.palette.background.default,
  top: "100%",
  flexDirection: "column",
  padding: `${DesktopPxToVw(20)} ${DesktopPxToVw(30)}`,
  rowGap: DesktopPxToVw(20),
  "@media (max-width: 640px)": {
    width: "100%",
    padding: MobilePxToVw(20),
    rowGap: MobilePxToVw(20),
  },
}))

export const MenuStack = styled(Stack)(() => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}))

export const CheckBoxStack = styled(Stack)(() => ({
  flexDirection: "row",
  alignItems: "center",
}))

export const RoomImage: any = styled(Box)(() => ({
  width: "9.219vw",
  height: "7.375vw",
  "@media (max-width: 640px)": {
    width: MobilePxToVw(190),
    height: MobilePxToVw(150),
  },
}))

export const PackageDetailsBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: DesktopPxToVw(10),
  "@media (max-width: 640px)": {
    marginTop: MobilePxToVw(5),
  },
}))

export const DatesStack = styled(Stack)(() => ({
  flexDirection: "row",
  alignItems: "center",
  margin: `${DesktopPxToVw(5)} 0`,
  gap: DesktopPxToVw(20),
  "@media (max-width: 640px)": {
    gap: MobilePxToVw(20),
    margin: `${MobilePxToVw(5)} 0`,
  },
}))

export const BoldLabelTypography = styled(Typography)(() => ({
  fontWeight: 700,
  lineHeight: "140%",
}))

export const PriceDivider = styled(Divider)(() => ({
  width: "100%",
  height: "0.06vw",
  background: theme.palette.ihclPalette.hexTwelve,
}))
