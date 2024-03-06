import styled from "@emotion/styled"
import { theme } from "../../../lib/theme"
import { Box, Grid, Stack, Typography } from "@mui/material"

export const ConfirmDetailsBox = styled(Box)(() => ({
  display: "flex",
  padding: "2.08vw",
  flexDirection: "column",
  justifyContent: "space-between",
  background: theme?.palette?.background?.paper,
}))

export const TitleTypography = styled(Typography)(() => ({
  color: theme?.palette?.text?.primary,
}))

export const DetailsTypography = styled(Typography)(() => ({
  marginTop: "0.5208vw",
  color: theme?.palette?.text?.primary,
}))

export const DetailsBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  color: theme?.palette?.text?.primary,
}))

export const DefaultTypography = styled(Typography)(() => ({
  color: theme?.palette?.text?.primary,
}))

export const BookingStatusBox = styled(Box)(() => ({
  width: "15.15vw",
}))

export const ItineraryNumber = styled(Typography)(() => ({
  lineHeight: "2.60vw",
}))

export const RoomTypeTypography = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: "1.25vw",
  lineHeight: "1.56vw",
  fontFamily: "Inter",
  color: theme?.palette?.text?.primary,
}))

export const GuestDetailsTypography = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: "0.72vw",
  marginTop: "1.04vw",
  lineHeight: "1.02vw",
  fontFamily: "Inter",
}))

export const PackageTypography = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: "0.72vw",
  marginTop: "1.04vw",
  fontFamily: "Inter",
}))

export const DetailsViewTypography = styled(Typography)(() => ({
  cursor: "pointer",
  marginTop: "0.3125vw",
  textDecorationLine: "underline",
  color: theme?.palette?.neuPalette?.hexTwo,
}))

export const PriceTypography = styled(Typography)(() => ({
  fontWeight: 300,
  fontSize: "0.98vw",
  marginTop: "1.145vw",
  color: theme?.palette?.text?.primary,
}))

export const TotalTypography = styled(Typography)(() => ({
  fontWeight: 700,
  color: theme?.palette?.text?.primary,
}))


export const EllipsesTypography = styled(Typography)(() => ({
  overflow: "hidden",
  whiteSpace: "nowrap",
  marginTop: "0.5208vw",
  textOverflow: "ellipsis",
  color: theme?.palette?.text?.primary,

  "@media (max-width:640px)": {
    marginTop: "1.563vw",
  },
}))

//msite styled components

export const MainBox = styled(Box)(() => ({
  padding: "6.25vw 5vw",
  background: theme?.palette?.background?.paper,
}))

export const GridItem = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}))

export const GridContainer = styled(Grid)(() => ({
  marginTop: "4.688vw",
}))

export const MarginTopStack = styled(Stack)(() => ({
  marginTop: "4.688vw",
}))

export const MarginTopTypography = styled(Typography)(() => ({
  marginTop: "1.563vw",
  color: theme?.palette?.text?.primary,
}))
