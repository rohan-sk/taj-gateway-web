import styled from "@emotion/styled"
import { theme } from "../../../lib/theme"
import { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { Box, Button, Divider, Stack, Typography } from "@mui/material"

export const ParentBox = styled(Box)(() => ({
  bottom: 0,
  zIndex: "9",
  width: "100%",
  position: "fixed",
  background: theme?.palette?.background?.paper,
}))

export const BottomSheetBox = styled(Box)(() => ({
  display: "flex",
  height: "12.5vw",
  alignItems: "center",
  justifyContent: "center",
  background: theme?.palette?.background?.paper,
}))

export const DropDownBox = styled(Box)(() => ({
  display: "flex",
  gap: "1.5625vw",
  alignItems: "center",
}))

export const DropDownChildrenBox = styled(Box)(() => ({
  width: "100%",
  maxHeight: "60vh",
  overflow: "scroll",
  background: theme?.palette?.background?.paper,
  "::-webkit-scrollbar-track": {
    backgroundColor: "transparent !important"
  }
}))

export const CartRemoveLink = styled(Typography)(() => ({
  fontWeight: 300,
  cursor: "pointer",
  paddingTop: "1.1vw",
}))

export const SelectedRoomTypography = styled(Typography)(() => ({
  maxWidth: "95%",
  lineHeight: "140%",
  padding: "2.5vw 0vw",
}))

export const PriceDetailsMainBox = styled(Box)(() => ({
  // height: "auto",
  // position: "sticky",
  width: "100%",
  padding: "5.78vw 2.35vw 0vw 2.35vw",
  background: theme?.palette?.neuPalette?.hexOne,
  boxShadow: "-6px 10px 32px rgba(0, 0, 0, 0.15)",
  maxHeight:"50vh",
 overflowY: "scroll",
 zIndex:999,
 position:"absolute",
 bottom:"0",
}))

export const PayNowButton = styled(Button)(() => ({
  width: "100%",
  marginBottom: "2.66vw",
  height: "10.15vw !important",
}))

export const TitleStack = styled(Stack)(() => ({
  gap: "3.125vw",
  flexDirection: "row",
  marginTop: "3.125vw",
  alignItems: "center",
  justifyContent: "center",
}))

export const TitleDivider = styled(Divider)(() => ({
  width: "6.250vw",
  height: "0.156vw",
  background: theme.palette.neuPalette.hexSeventeen,
}))

export const RoomTaxesDetailsMobileWrapper = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-end",
  justifyContent: "space-between",
}))

export const RoomTaxesTitleMobileWrapper = styled(Stack)(() => ({
  flexDirection: "column",
  alignItems: "flex-start",
  rowGap: MobilePxToVw(5),
}))
