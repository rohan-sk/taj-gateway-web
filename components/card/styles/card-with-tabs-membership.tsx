import { styled } from "@mui/system"
import { theme } from "../../../lib/theme"
import { Box, CardMedia, Divider, Grid, Typography } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { transientProps } from "../../../utils/transientProps"

export const MembershipGridWrapper = styled(Grid)(() => ({
  display: " flex",
  flexDirection: "column",
}))

export const MembershipWrapper = styled(Grid)(() => ({
  zIndex: "1",
  top: "4.4vw",
  display: "flex",
  position: "sticky",
  paddingTop: "0.833vw",
  background: `${theme?.palette?.ihclPalette?.hexOne}`,
  justifyContent: "center",
  columnGap: DesktopPxToVw(30),

  "@media (max-width: 640px)": {
    top: "15.625vw",
    paddingTop: "0vw",
    columnGap: "normal",
    justifyContent: "space-between",
  },
}))

export const MembershipCardBox = styled(Box)(() => ({
  position: "relative",
}))

export const CardMediaStyles: any = styled(CardMedia)(() => ({
  width: "12.760vw",
  objectFit: "contain",

  "@media (max-width: 640px)": {
    width: "19.594vw",
  },
}))

export const GoldColorDivider = styled(Divider)(() => ({
  opacity: 0.5,
  width: "100%",
  height: "0.104vw",
  margin: "0 0 1.875vw 0vw",
  backgroundColor: theme?.palette?.ihclPalette?.hexTwo,

  "@media (max-width: 640px)": {
    height: "0.313vw",
    margin: "0vw 0vw 4.688vw 0vw",
  },
}))

export const PortableTextContainer = styled(
  Box,
  transientProps,
)<{ $mobile: boolean }>(({ $mobile }) => ({
  display: "flex",
  justifyContent: $mobile ? "center" : "start",
  marginTop: $mobile ? MobilePxToVw(20) : DesktopPxToVw(20),
  "& span": {
    fontSize: $mobile ? `${MobilePxToVw(22)}!important` : `${DesktopPxToVw(22)}!important`,
  },
}))

export const AshColorDivider = styled(Divider)(() => ({
  opacity: 0.5,
  width: "100%",
  height: "0.104vw",
  margin: "1.875vw 0vw",
  backgroundColor: theme?.palette?.ihclPalette?.hexTwelve,

  "@media (max-width: 640px)": {
    height: "0.313vw",
    margin: "3.125vw 0vw 3.906vw 0vw",
  },
}))

export const MembershipTitle = styled(Typography)(() => ({
  left: "10%",
  position: "absolute",
  color: theme?.palette?.ihclPalette?.hexOne,
}))

export const MemberShipParentGrid = styled(Grid)(() => ({
  alignItems: "center",
  "@media (max-width: 640px)": {
    textAlign: "center",
  },
}))

export const MemberShipDetailsGrid = styled(Grid)(() => ({
  textAlign: "center",
  alignItems: "center",
  "@media (max-width: 640px)": {
    alignItems: "start",
  },
}))

export const MembershipContentWrapper = styled(Grid)(() => ({
  textAlign: "center",
}))

export const CenterAlignedFullFlex = styled(Box)(() => ({
  height: "100%",
  display: "flex",
  textAlign: "center",
  alignItems: "center",
  justifyContent: "center",
}))
