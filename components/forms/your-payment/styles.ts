import styled from "@emotion/styled"
import { theme } from "../../../lib/theme"
import { transientProps } from "../../../utils/transientProps"
import { Grid, TextField, Typography, Box, Select, MenuItem } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
export const SubTitleTypography = styled(Typography)(() => ({
  width: "50%",
  color: theme?.palette?.text?.primary,
  paddingTop: DesktopPxToVw(73),
}))

export const PaymentContainer = styled(
  Grid,
  transientProps,
)<{ $memberShipTypes: string | undefined }>(({ $memberShipTypes }) => ({
  backgroundColor: $memberShipTypes ? theme?.palette?.background?.paper : theme?.palette?.ihclPalette?.hexOne,
  padding: "0vw 12.5vw 0vw 12.5vw",
  "@media (max-width: 640px)": {
    padding: "0",
    margin: "0vw",
  },
}))

export const PromoCodeInput = styled(TextField)(() => ({
  input: {
    fontSize: DesktopPxToVw(24),
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      fontWeight: 300,
      fontSize: DesktopPxToVw(24),
      opacity: 1,
      color: theme?.palette?.ihclPalette?.hexSeventeen,
    },
  },
  width: "23.59vw",
  color: theme?.palette?.ihclPalette?.hexEleven,
  paddingRight: "2vw",
  marginLeft: "5vw",
  "@media (max-width: 640px)": {
    paddingTop: MobilePxToVw(30),
    marginLeft: "0vw",
    width: "100%",
    input: {
      fontSize: MobilePxToVw(24),
      "&::placeholder": {
        fontSize: MobilePxToVw(24),
      },
    },
  },
}))

export const GiftCardBox = styled(Grid)(() => ({
  paddingTop: "5.4vw",
  backgroundColor: theme?.palette?.background?.paper,
}))

export const PriceText = styled(
  Box,
  transientProps,
)<{ $memberShipTypes: string | undefined }>(({ $memberShipTypes }) => ({
  display: "flex",
  alignItems: "center",
  marginTop: DesktopPxToVw(30),
  backgroundColor: $memberShipTypes ? theme?.palette?.ihclPalette?.hexOne : theme?.palette?.background?.paper,
  justifyContent: "center",
  padding: DesktopPxToVw(17),
  "@media (max-width: 640px)": {
    padding: MobilePxToVw(17),
    marginTop: MobilePxToVw(30),
    justifyContent: "space-between",
  },
}))

export const FlexBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  paddingBottom: DesktopPxToVw(33),
}))
export const GridBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-start",
  "@media (max-width: 640px)": {
    marginTop: MobilePxToVw(30),
    justifyContent: "space-between !important",
  },
}))
export const TCBox = styled(Box)(() => ({
  display: "flex",
  padding: " 2vw 0vw",
  justifyContent: "center",
  gap: DesktopPxToVw(20),
  alignItems: "center",
  "@media (max-width: 640px)": {
    margin: `${MobilePxToVw(30)} 0vw`,
    gap: MobilePxToVw(25),
  },
}))

export const NeuBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  "@media (max-width: 640px)": {
    justifyContent: "center",
    marginTop: MobilePxToVw(30),
  },
}))

export const ChidGrid = styled(Grid)(() => ({
  paddingLeft: "40px",
  "@media (max-width: 640px)": {
    paddingLeft: "0px",
  },
}))
export const NeuCoinFlexBox = styled(Grid)(() => ({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  flexDirection: "row",
  "@media (max-width: 640px)": {
    flexDirection: "column",
  },
}))

export const NueCoinContainer = styled(Box)(() => ({
  border: `1px solid ${theme?.palette?.ihclPalette?.hexTwenty}`,
  padding: DesktopPxToVw(40),
  width: "100%",
  "@media (max-width: 640px)": {
    paddingLeft: "0px",
    padding: MobilePxToVw(27),
  },
}))

export const SelectCard = styled(Select)(() => ({
  "& .MuiSelect-select": {
    "&:focus": {
      backgroundColor: theme?.palette?.background?.default,
    },
  },
  fontFamily: "supreme",
  fontSize: DesktopPxToVw(24),
  fontStyle: "normal",
  fontWeight: 300,
  lineHeight: DesktopPxToVw(30),
  "&:before": {
    borderBottom: "none !important",
  },
  "&:after": {
    borderBottom: "none !important",
  },
  "@media (max-width: 640px)": {
    lineHeight: MobilePxToVw(28),
    fontSize: MobilePxToVw(24),
  },
}))

export const CardMenuItem = styled(MenuItem)(() => ({
  fontFamily: "supreme",
  fontSize: DesktopPxToVw(24),
  fontStyle: "normal",
  fontWeight: 300,
  lineHeight: "150%",
  "@media (max-width: 640px)": {
    fontSize: MobilePxToVw(24),
  },
}))
