import styled from "@emotion/styled"
import { Box, Typography } from "@mui/material"
import { theme } from "../../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"

export const BorderedCardWrapper = styled(Box)(() => ({
  border: `1px solid ${theme?.palette?.ihclPalette?.hexSixteen}`,
  marginBottom: "1.1vw",
  padding: "1.823vw 1.563vw 1.042vw",
  minHeight: "13.177vw",
  marginTop: DesktopPxToVw(35),
  "@media (max-width:640px)": {
    minHeight: "unset",
    margin: "5.469vw 0vw 0vw",
    padding: "5.469vw 5.469vw 0vw",
  },
}))
export const BoldSubfieldTitleTypography = styled(Typography)(() => ({
  fontFamily: "Inter",
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  fontSize: "0.729vw",
  fontWeight: "700",
  lineHeight: "1.042vw",
  letterSpacing: "0em",
}))

export const MainContainer = styled(Box)(() => ({
  margin: "0 auto",
  "@media (max-width:640px)": {
    padding: "10.938vw 7.813vw 17.188vw",
  },
}))
export const InnerCardGrid = styled(Box)(() => ({
  display: "grid",
  gap: "1.563vw",
  gridTemplateColumns: "13.906vw 1fr",
  "@media (max-width:640px)": {
    gridTemplateColumns: "1fr",
    gap: "4.688vw",
  },
}))

export const BoldTitle = styled(Typography)(() => ({
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  fontFamily: "Inter",
  fontSize: DesktopPxToVw(14),
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "140%",
  marginBottom: "0.312vw",
  "@media (max-width:640px)": {
    fontSize: MobilePxToVw(14),
    marginBottom: "1.719vw",
  },
}))
export const ColumnFlexBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}))
export const DetailsCurrencyContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "row",
  "@media (max-width:640px)": {
    flexDirection: "column",
    gap: "3.125vw",
  },
}))

export const DatesContainer = styled(Box)(() => ({
  display: "flex",
  gap: "3.906vw",
  justifyContent: "start",
  marginBottom: "0.931vw",
  "@media (max-width:640px)": {
    gap: "3.125vw",
    justifyContent: "space-evenly",
  },
}))
export const ActionsContainer = styled(Box)(() => ({
  display: "flex",
  gap: "0.521vw",
  margin: "0.942vw 0vw 0vw",
  "@media (max-width:640px)": {
    margin: "5.169vw 0vw",
  },
}))
export const ComplementaryAddOnFlex = styled(Box)(() => ({
  display: "flex",
  gap: "0.521vw",
  justifyContent: "space-between",
  margin: "0.521vw 0",
  flexWrap: "wrap",
  //Temporarily commented
  // display: "grid",

  // gridTemplateColumns: "11.458vw 1fr 9.101vw",
  // gridTemplateAreas: `"name email mobile"`,
  // gridTemplateRows: "auto",
  // justifyContent: "space-between",
  // marginBottom: "0.6vw",
  // columnGap: "0.541vw",
  // "@media(max-width:640px)": {
  //   gridTemplateRows: "auto",
  //   gridTemplateColumns: "1fr 28.75vw",
  //   columnGap: "1.563vw",
  //   rowGap: "1.563vw",
  //   gridTemplateAreas: `"name mobile"
  //               "email email"`,
  // },
}))
export const CoinBalance = styled(Typography)(() => ({
  fontSize: DesktopPxToVw(18),
  fontWeight: 300,
  fontFamily: "Inter",
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  fontStyle: "normal",
  lineHeight: "140%",
  "@media (max-width :640px)": {
    fontSize: MobilePxToVw(14),
    fontWeight: 700,
  },
}))
export const TitleTypography = styled(Typography)(() => ({
  paddingBottom: "0.521vw",
  "@media(max-width:640px)": {
    paddingBottom: "3.281vw",
  },
}))

export const TitleBox = styled(Box)(() => ({
  margin: "1.042vw 2vw 0vw 2.083vw",
  width: "93%",
  borderBottom: `1px solid ${theme?.palette?.ihclPalette?.hexSixteen}`,
  "@media(max-width:640px)": {
    width: "85%",
    margin: "3.125vw 0vw 0vw 6.250vw",
    paddingBottom: "3.281vw",
  },
}))
