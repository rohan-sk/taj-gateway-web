import { theme } from "../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { transientProps } from "../../../utils/transientProps"
import { LocalizationProviderBox } from "./booking-flow-header"
import { CalendarMonth, ExpandLess, ExpandMore, Search } from "@mui/icons-material"
import { AccordionDetails, AccordionSummary, Box, Button, Divider, Stack, Typography, styled } from "@mui/material"

export const PaddingBox = styled(Box)(() => ({
  gap: "0.313vw",
  padding: "2.061vw 2.061vw 1.823vw 2.061vw",
  display: "flex",
  flexDirection: "column",
}))
export const HotelsContainer = styled(Stack)(() => ({
  maxHeight: DesktopPxToVw(220),
  overflowY: "auto",
  "@media (max-width:640px)": {
    maxHeight: MobilePxToVw(220),
  },
}))
export const CenterPaddingBox = styled(Box)(() => ({
  padding: "0.89vw 0vw 0vw 0vw",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "1.094vw",
}))
export const DefaultStyleBox = styled(Box)(() => ({
  "&>*": {
    position: "static!important",
    boxShadow: "0 0 0 0 rgba(0,0,0,0)!important",
    width: "100%!important",
    mozBoxShadow: "0 0 0 0 rgba(0,0,0,0)!important",
    webkitBoxShadow: "0 0 0 0 rgba(0,0,0,0)!important",
    padding: "0vw!important",
    //as we using this in book a menu please check while updating height
    maxHeight: "14.4vw !important",
  },
}))
export const CenterPaddingColorBox = styled(Box)(() => ({
  backgroundColor: theme?.palette?.background?.paper,
  gap: "1.2vw",
  padding: "0.92vw 2.011vw",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
}))
export const CustomAccordionSummary = styled(AccordionSummary)(() => ({
  width: "100%",
  padding: "0vw",
  minHeight: "2.135vw !important",
  background: theme?.palette?.background?.paper,
  borderBottom: `1px solid ${theme?.palette?.neuPalette?.hexTwelve}`,
  "&.Mui-expanded": {
    minHeight: "3.135vw",
  },
  "& .MuiAccordionSummary-content ": {
    margin: "0 !important",
  },
}))

export const CenterFlexBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  alignItems: "center",
}))
export const CustomAccordionDetails = styled(AccordionDetails)(() => ({
  width: "19.792vw",
  overflowY: "auto",
  top: DesktopPxToVw(68),
  maxHeight: DesktopPxToVw(278),
  padding: "0.44vw 1.563vw 1.563vw",
  position: "absolute",
  background: theme?.palette?.background?.default,
  "::-webkit-scrollbar-thumb": {
    borderRadius: "0.313vw",
    background: theme?.palette?.neuPalette?.hexTwelve,
  },
}))

export const FlexStartBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "0.521vw",
}))

export const AlignEndBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "end",
  justifyContent: "space-between",
  borderBottom: `1px solid ${theme?.palette?.neuPalette?.hexEleven}`,
}))

export const ErrorTypography = styled(Typography)(() => ({
  color: "red",
  paddingTop: DesktopPxToVw(10),
  fontSize: DesktopPxToVw(16),
  margin: "0 auto",
  "@media (max-width: 640px)": {
    fontSize: MobilePxToVw(16),
    paddingTop: MobilePxToVw(10),
  },
}))

export const DateTypography = styled(Typography)(() => ({
  whiteSpace: "nowrap",
  fontWeight: 300,
}))

export const AddButton = styled(Button)(() => ({
  width: "4.95vw",
  height: "2.604vw",
  color: theme?.palette?.neuPalette?.hexOne,
  background: theme?.palette?.neuPalette?.hexSeventeen,
  "&.Mui-disabled": {
    color: "darkGray",
  },
  " &:hover": {
    color: theme?.palette?.neuPalette?.hexOne,
    background: theme?.palette?.neuPalette?.hexSeventeen,
  },
}))

export const LocalizationProviderBoxStyle = styled(LocalizationProviderBox)(
  () => ({
    width: "18.15vw",
    padding: "0!important",
    gap: "0.883vw",
  })
)

export const DividerStyle = styled(Divider)(() => ({
  width: "6%",
  height: "0.052vw",
  background: theme?.palette?.text?.primary,
  opacity: 0.5,
}))
export const FullDividerStyle = styled(Divider)(() => ({
  width: "100%",
  background: theme?.palette?.neuPalette?.hexTwelve,
  opacity: 0.5,
}))
export const CalendarMonthStyle = styled(CalendarMonth)(() => ({
  color: theme?.palette?.neuPalette?.hexTwelve,
  opacity: 0.8,
}))
export const MarginTopBox = styled(Box)(() => ({
  padding: " 0 1.042vw",
  marginTop: "1.042vw",
}))
export const TitleTypography = styled(Typography)(() => ({
  fontWeight: 300,
  cursor: "pointer",
  fontSize: "1.146vw",
  lineHeight: "1.719vw",
  margin: "1.042vw 0vw",
  fontFamily: "Inter",
}))

export const MainBox = styled(Box)(() => ({
  backgroundColor: theme?.palette?.background?.default,
  width: "29.896vw",
}))
export const SearchIcon = styled(Search)(() => ({
  color: theme?.palette?.neuPalette?.hexSeventeen,
  opacity: 0.8,
}))
export const ExpandMoreIcon = styled(ExpandMore)(() => ({
  color: theme?.palette?.neuPalette?.hexSeventeen,
  opacity: 0.6,
}))
export const ExpandLessIcon = styled(ExpandLess)(() => ({
  color: theme?.palette?.neuPalette?.hexSeventeen,
  opacity: 0.6,
}))
export const StyledButton = styled(Button)(() => ({
  height: "3.1443vw",
  textTransform: "uppercase",
  width: "11.28vw",
  letterSpacing: DesktopPxToVw(0.6),
}))
export const SpanBox = styled(Box)(() => ({
  cursor: "pointer",
  color: theme?.palette?.neuPalette?.hexTwo,
}))
export const CheckBox = styled(Box)(() => ({
  border: `0.052vw solid ${theme?.palette?.neuPalette?.hexTwo}`,
  width: "1.354vw",
  height: "1.354vw",
  padding: "0.156vw 0vw 0vw 0.166vw",
}))
export const OfferBox = styled(Box)(() => ({
  border: `1px solid ${theme?.palette?.neuPalette?.hexTwo}`,
  height: "2.604vw",
  padding: "0vw 1.042vw 0vw 1.042vw",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}))

export const StackStyle = styled(
  Stack,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  backgroundColor: `${theme?.palette?.neuPalette?.hexOne}`,
  textAlign: "center",
  width: $isMobile ? "unset" : "50%",
  margin: "0 auto",
  padding: $isMobile ? MobilePxToVw(80) : DesktopPxToVw(80),
  position: $isMobile ? "unset" : "relative",
}))
export const DateBoxRange = styled(
  Box,
  transientProps,
)<{ $isMobile?: boolean }>(({ $isMobile }) => ({
  display: "flex",
  gap: $isMobile ? MobilePxToVw(20) : DesktopPxToVw(40),
  justifyContent: "center",
  flexDirection: $isMobile ? "column" : "row",
  bottom: $isMobile ? MobilePxToVw(50) : "unset",
  position: $isMobile ? "absolute" : "unset",
}))
export const TypographyChildTitle = styled(
  Typography,
  transientProps,
)<{ $isMobile?: boolean }>(({ $isMobile }) => ({
  position: $isMobile ? "absolute" : "unset",
  bottom: $isMobile ? "55%" : "unset",
  width: $isMobile ? "75%" : "unset",
}))

export const TypographyChild = styled(
  Typography,
  transientProps,
)<{ $isMobile?: boolean }>(({ $isMobile }) => ({
  position: $isMobile ? "absolute" : "unset",
  bottom: $isMobile ? "50%" : "",
  width: $isMobile ? "60%" : "",
}))
export const StackChild = styled(
  Box,
  transientProps,
)<{ $isMobile?: boolean }>(({ $isMobile }) => ({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  gap: $isMobile ? MobilePxToVw(20) : DesktopPxToVw(40),
}))
export const OfferTypography = styled(Typography)(() => ({
  color: theme?.palette?.neuPalette?.hexTwo,
  textTransform: "uppercase",
}))
export const FlexBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
}))

export const SearchResultBox = styled(Box)(() => ({
  width: "100%",
  height: "auto",
  padding: "0.5vw 1vw",
  boxShadow: "-6px 10px 24px 0px rgba(0, 0, 0, 0.10)",
}))

export const SearchMenuList = styled(Box)(() => ({
  width: DesktopPxToVw(353),
  height: "auto",
  padding: DesktopPxToVw(20),
  boxShadow: "-6px 10px 24px 0px rgba(0, 0, 0, 0.10)",
  background: theme.palette.background.default,
  position: "absolute",
  top: DesktopPxToVw(60),
  left: 0,
  zIndex: 99,
}))
export const DeleteModalTitle = styled(
  Typography,
  transientProps,
)<{ $isMobile?: boolean }>(({ $isMobile }) => ({
  position: $isMobile ? "absolute" : "unset",
  bottom: $isMobile ? "60%" : "unset",
  width: $isMobile ? "85%" : "unset",
}))
export const DeleteModalSubTitle = styled(
  Typography,
  transientProps,
)<{ $isMobile?: boolean }>(({ $isMobile }) => ({
  position: $isMobile ? "absolute" : "unset",
  bottom: $isMobile ? "55%" : "",
  width: $isMobile ? "80%" : "",
}))

export const BookingBoxes = {
  PaddingBox,
  CenterPaddingBox,
  DefaultStyleBox,
  CenterPaddingColorBox,
  CenterFlexBox,
  FlexStartBox,
  AlignEndBox,
  MainBox,
  SpanBox,
  CheckBox,
  OfferBox,
  DateBoxRange,
  FlexBox,
  StackChild,
  SearchResultBox,
  SearchMenuList,
}
export const BookingTypography = {
  ErrorTypography,
  DateTypography,
  TitleTypography,
  TypographyChildTitle,
  TypographyChild,
  DeleteModalTitle,
  DeleteModalSubTitle,
}
export const BookingStack = {
  HotelsContainer,
  StackStyle,
}
export const BookingButtom = {
  AddButton,
  StyledButton,
}
