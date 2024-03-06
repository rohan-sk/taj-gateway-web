import styled from "@emotion/styled"
import { theme } from "../../../lib/theme"
import { KeyboardArrowDown } from "@mui/icons-material"
import DesktopPxToVw from "../../../utils/DesktopFontCalc"
import { transientProps } from "../../../utils/transientProps"
import { Divider, Box, Button, Typography, Stack, TextField, CircularProgress } from "@mui/material"

const BlackColor = theme?.palette?.ihclPalette?.hexSeventeen

export const MainBox = styled(Stack)(() => ({
  color: BlackColor,
  padding: "0.75vw 0vw 0.73vw 0vw ",
}))

export const FieldsContainer = styled(Box)(() => ({
  padding: `${DesktopPxToVw(15)} 0 ${DesktopPxToVw(14)} 0`,
}))
export const LogoBox = styled(Box)(() => ({
  width: DesktopPxToVw(67),
  height: "3.07vw",
  cursor: "pointer",
  margin: "0vw 5.78vw 0vw 3.23vw",
}))

export const BookingMainBox = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  height: "3.17vw",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.573vw 1.4vw 0.67vw 1.145vw",
  border: `0.05vw solid ${theme?.palette?.ihclPalette?.hexTwo}`,
}))

export const StyledVerticalDivider = styled(Divider)(() => ({
  opacity: "0.6",
  width: "0.05vw",
  color: BlackColor,
  background: BlackColor,
}))

export const StyledHorizontalDivider = styled(Divider)(() => ({
  opacity: 0.5,
  width: "1.56vw",
  margin: "0vw 0.52vw",
  background: theme?.palette?.primary?.main,
}))

export const BottomDivider = styled(Divider)(() => ({
  opacity: 0.2,
  width: "100%",
  height: "0.05vw",
  background: theme?.palette?.ihclPalette?.hexTwo,
}))

export const LocalizationProviderBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  width: DesktopPxToVw(340),
  justifyContent: "space-between",
}))

export const FlexBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
}))

export const SpecialCodeMainBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  position: "relative",
}))

export const SpecialCodeDropDownBox = styled(Box)(() => ({
  zIndex: 9999,
  top: "3.2vw",
  right: "-9.2vw",
  width: "19.8vw",
  padding: "1.56vw",
  position: "absolute",
  background: theme?.palette?.background?.default,
  boxShadow: "-2px 3px 15px -8px rgba(0,0,0,0.75)",
}))

export const ColumnDirectionBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}))

export const SpecialCodeDropDownDivider = styled(Divider)(() => ({
  height: "0.05vw",
  margin: "1.04vw 0vw",
  background: theme?.palette?.ihclPalette?.hexSixteen,
}))

export const SpecialCodeStack = styled(Stack)(() => ({
  flexDirection: "row",
  alignItems: "center",
  marginTop: "1.042vw",
  padding: "0.521vw 1.042vw",
  justifyContent: "space-between",
  border: `0.052vw solid ${theme?.palette?.ihclPalette?.hexTwo}`,
}))

export const CheckBox = styled(Box)(() => ({
  display: "flex",
  marginTop: "1.145vw",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "center",
}))

export const TermsTypography = styled(Typography)(() => ({
  fontWeight: 300,
  fontSize: "0.833vw",
  whiteSpace: "nowrap",
  lineHeight: "1.145vw",
  fontFamily: "supreme",
}))

export const TermsLinkTypography = styled(Typography)(() => ({
  fontWeight: 300,
  cursor: "pointer",
  marginLeft: "0.2vw",
  fontSize: "0.833vw",
  whiteSpace: "nowrap",
  lineHeight: "1.145vw",
  fontFamily: "supreme",
  color: theme?.palette?.ihclPalette?.hexTwo,
}))

export const AddButton = styled(Button)(() => ({
  width: "5.05vw",
  height: "2.6vw",
  padding: "0.625vw 1.35vw",
  color: theme?.palette?.ihclPalette?.hexOne,
  background: theme?.palette?.ihclPalette?.hexSeventeen,
  "&.Mui-disabled": {
    color: "darkGray",
  },
  " &:hover": {
    color: theme?.palette?.ihclPalette?.hexOne,
    background: theme?.palette?.ihclPalette?.hexSeventeen,
  },
}))

export const AccountTypography = styled(Typography)(() => ({
  fontWeight: 400,
  cursor: "pointer",
  color: theme?.palette?.ihclPalette?.hexTwo,
}))

export const InputTextField = styled(TextField)(() => ({
  width: "100%",
  justifyContent: "flex-end",
  "& input": {
    fontSize: DesktopPxToVw(22),
  },
}))

export const ProfileBox = styled(Box)(() => ({
  gap: "0.73vw",
  display: "flex",
  cursor: "pointer",
  textAlign: "center",
  alignItems: "center",
  justifyContent: "center",
}))

export const BookingMainSearchButton = styled(Button)(() => ({
  letterSpacing: "1.8px",
  maxWidth: DesktopPxToVw(164),
}))

export const SpecialCodeWrapperTypography = styled(Typography)(() => ({
  cursor: "pointer",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  WebkitBoxOrient: "vertical",
  maxWidth: DesktopPxToVw(133),
  marginRight: DesktopPxToVw(34),
}))

export const StyledArrow = styled(
  KeyboardArrowDown,
  transientProps,
)<{ $isDropDownOpened: boolean }>(({ $isDropDownOpened }) => ({
  cursor: "pointer",
  transitionDuration: "0.8s",
  transitionProperty: "transform",
  transform: $isDropDownOpened ? "rotate(180deg)" : "rotate(0deg)",
}))

export const StyledArrowBox = styled(
  Box,
  transientProps,
)<{ $isDropDownOpened: boolean }>(({ $isDropDownOpened }) => ({
  cursor: "pointer",
  transitionDuration: "0.2s",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transitionProperty: "transform",
  transform: $isDropDownOpened ? "rotate(180deg)" : "rotate(0deg)",
}))

export const SearchLoader = styled(CircularProgress)(() => ({
  right: 0,
  position: "absolute",
  top: DesktopPxToVw(11),
  width: "1.2vw !important",
  height: "1.2vw !important",
}))
