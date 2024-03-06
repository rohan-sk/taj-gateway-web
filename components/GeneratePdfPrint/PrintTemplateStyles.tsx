import { styled, Box, Grid, Button, Typography, Stack } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { theme } from "../../lib/theme"
import { transientProps } from "../../utils/transientProps"

export const BoldTypography = styled(
  Typography,
  transientProps,
)<{ $isIos?: boolean; $print?: boolean }>(({ $isIos, $print }) => ({
  fontWeight: 700,
  fontSize: DesktopPxToVw(18),
  "@media (max-width:640px)": {
    fontSize: $isIos ? "11px" : MobilePxToVw(18),
  },
}))

export const LogoAndText = styled(
  Box,
  transientProps,
)<{ $isIos?: boolean; $print?: boolean; $isMobile?: boolean }>(({ $isIos, $print, $isMobile }) => ({
  display: "flex",
  alignItems: "end",
  margin: `0px 0px ${DesktopPxToVw(40)} 0px`,
  justifyContent: "space-between",
  "@media (max-width:640px)": {
    margin: $isIos && $print ? `0px 0px 1.25em 0px` : `0px 0px 20px 0px`,
  },
}))

export const PageBreak = styled(Box)(() => ({
  pageBreakAfter: "always",
}))

export const BookingStatusTextWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}))

export const BookingStatusText = styled(
  Typography,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  fontSize: DesktopPxToVw(30),
  fontWeight: 300,
  margin: "0px",
  "@media (max-width:640px)": {
    fontSize: $isIos ? "14px" : MobilePxToVw(30),
  },
}))

export const BookingStatusTextTwo = styled(
  BookingStatusText,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  fontWeight: 700,
  margin: `0px 0px 0px ${DesktopPxToVw(5)}`,
  "@media (max-width:640px)": {
    margin: $isIos ? "0px 0px 0px 4px" : `0px 0px 0px ${MobilePxToVw(5)}`,
  },
}))

export const VerticalLine = styled(
  Typography,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  height: DesktopPxToVw(30),
  width: DesktopPxToVw(2),
  margin: `0px ${DesktopPxToVw(30)}`,
  backgroundColor: theme?.palette?.ihclPalette?.hexTwelve,
  "@media (max-width:640px)": {
    margin: $isIos ? "0px 15px" : `0px ${MobilePxToVw(30)}`,
    width: $isIos ? "1px" : MobilePxToVw(2),
    height: $isIos ? "15px" : MobilePxToVw(30),
  },
}))

export const BannerTitleAndLine = styled(Box)(() => ({
  margin: "0px",
  display: "flex",
  top: "54%",
  left: "7%",
  alignItems: "center",
  position: "absolute",
}))

export const TitleHyphen = styled(Typography)(() => ({
  height: DesktopPxToVw(1),
  width: DesktopPxToVw(80),
  margin: `0px ${DesktopPxToVw(40)} 0px 0px`,
  backgroundColor: theme?.palette?.ihclPalette?.hexOne,
}))

export const BannerTitle = styled(
  Typography,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  color: theme?.palette?.ihclPalette?.hexOne,
  margin: "0px",
  fontFamily: theme?.palette?.font?.primaryFontFamily,
  fontSize: DesktopPxToVw(80),
  fontWeight: 400,
  letterSpacing: "-4px",
  "@media (max-width:640px)": {
    fontSize: $isIos ? "40px" : MobilePxToVw(80),
  },
}))

export const ContactWrapper = styled(
  Grid,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  display: "grid",
  gridTemplateColumns: "48% 52%",
  margin: `${DesktopPxToVw(40)} 0px`,
  paddingBottom: DesktopPxToVw(20),
  borderBottom: `1px solid ${theme?.palette?.ihclPalette?.hexTwelve}`,
  "@media (max-width:640px)": {
    margin: $isIos ? "20px 0px" : `${MobilePxToVw(40)} 0px`,
    paddingBottom: $isIos ? "10px" : MobilePxToVw(20),
  },
}))

export const ContactText = styled(
  Typography,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  fontSize: DesktopPxToVw(40),
  fontWeight: 700,
  textTransform: "uppercase",
  "@media (max-width:640px)": {
    fontSize: $isIos ? "20px" : MobilePxToVw(40),
  },
}))

export const ContactInfoTextThree = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}))

export const ContactInfoTextTwo = styled(ContactInfoTextThree)(() => ({
  margin: `${DesktopPxToVw(20)} 0px`,
  alignItems: "center",
}))

export const ContactInfoTextOne = styled(ContactInfoTextThree)(() => ({
  margin: `${DesktopPxToVw(20)} 0px 0px 0px`,
  display: "flex",
  alignItems: "start",
}))

export const IconDescription = styled(
  Typography,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  fontSize: DesktopPxToVw(36),
  fontWeight: 300,
  margin: `0px 0px 0px ${DesktopPxToVw(20)}`,
  fontFamily: "Inter",
  "@media (max-width:640px)": {
    fontSize: $isIos ? "18px" : MobilePxToVw(36),
  },
}))

export const CheckInCheckOutText = styled(Box)(() => ({
  textAlign: "end",
}))
export const ItineraryWrapper = styled(
  Box,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  alignSelf: "flex-end",
  marginTop: DesktopPxToVw(40),
  paddingBottom: DesktopPxToVw(40),
  borderBottom: `1px solid ${theme?.palette?.ihclPalette?.hexSeventeen}`,
  "@media (max-width:640px)": {
    marginTop: $isIos ? "20px" : MobilePxToVw(40),
    paddingBottom: $isIos ? "20px" : MobilePxToVw(40),
  },
}))
export const MembershipBlock = styled(Box)(() => ({
  textAlign: "end",
  display: "flex",
  alignItems: "baseline",
  justifyContent: "flex-end",
}))

export const MembershipNumber = styled(
  Typography,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  fontWeight: 700,
  marginLeft: DesktopPxToVw(10),
  fontSize: DesktopPxToVw(36),
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  fontFamily: theme?.palette?.font?.primaryFontFamily,
  "@media (max-width:640px)": {
    fontSize: $isIos ? "18px" : MobilePxToVw(36),
    marginLeft: $isIos ? "5px" : MobilePxToVw(10),
  },
}))

export const ITNumberWrapper = styled(
  Box,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  display: "inline-block",
  textAlign: "center",
  padding: `${DesktopPxToVw(24)} ${DesktopPxToVw(70)}`,
  marginBottom: DesktopPxToVw(30),
  border: `1px solid ${theme?.palette?.ihclPalette?.hexSeventeen}`,
  "@media (max-width:640px)": {
    padding: $isIos ? "24px 50px" : `${MobilePxToVw(24)} ${MobilePxToVw(70)}`,
    marginBottom: $isIos ? "15px" : MobilePxToVw(30),
  },
}))

export const ITNumberText = styled(
  Typography,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  fontSize: DesktopPxToVw(30),
  fontWeight: 300,
  margin: "0px",
  fontFamily: "Inter",
  "@media (max-width:640px)": {
    fontSize: $isIos ? "15px" : MobilePxToVw(30),
  },
}))

export const ITNumber = styled(
  Typography,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  fontFamily: theme?.palette?.font?.primaryFontFamily,
  fontSize: DesktopPxToVw(66),
  fontWeight: 400,
  margin: `${DesktopPxToVw(10)} 0px 0px 0px`,
  // letterSpacing: "-3.3px",
  "@media (max-width:640px)": {
    fontSize: $isIos ? "22px" : MobilePxToVw(66),
    margin: $isIos ? "5px 0px 0px 0px" : `${MobilePxToVw(10)} 0px 0px 0px`,
  },
}))

export const CheckInCheckOutWrapper = styled(
  Box,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  display: $isIos ? "grid" : "flex",
  justifyContent: $isIos ? "" : "flex-end",
}))

export const CheckInTextOne = styled(
  Typography,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  fontSize: DesktopPxToVw(32),
  fontWeight: 300,
  margin: "0px",
  fontFamily: "Inter",
  "@media (max-width:640px)": {
    fontSize: $isIos ? "10px" : MobilePxToVw(32),
  },
}))
export const CheckInTextOneBooking = styled(
  Typography,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  fontSize: $isIos ? "12px" : DesktopPxToVw(32),
  fontWeight: 300,
  margin: "0px",
  fontFamily: "Inter",
  "@media (max-width:640px)": {
    fontSize: $isIos ? "12px" : MobilePxToVw(32),
    justifyContent: $isIos ? "end" : "",
  },
}))

export const CheckInTextTwoBooking = styled(
  Typography,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  fontSize: $isIos ? "12px" : DesktopPxToVw(32),
  fontWeight: 700,
  textTransform: "uppercase",
  "@media (max-width:640px)": {
    fontSize: $isIos ? "12px" : MobilePxToVw(32),
    justifyContent: $isIos ? "end" : "",
  },
}))
export const CheckInTextTwo = styled(
  Typography,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  fontSize: DesktopPxToVw(36),
  fontWeight: 700,
  textTransform: "uppercase",
  "@media (max-width:640px)": {
    fontSize: $isIos ? "10px" : MobilePxToVw(32),
  },
}))

export const CheckInVerticalLine = styled(Typography)(() => ({
  height: DesktopPxToVw(44),
  width: DesktopPxToVw(1),
  margin: `0px ${DesktopPxToVw(20)}`,
  backgroundColor: theme?.palette?.ihclPalette?.hexSeventeen,
}))

export const VerticalDivider = styled(Typography)(() => ({
  height: DesktopPxToVw(2),
  width: "100%",
  display: "block",
  clear: "both",
  backgroundColor: theme?.palette?.ihclPalette?.hexSeventeen,
}))

export const GuestDetailsWrapper = styled(
  Grid,
  transientProps,
)<{ $isIos?: boolean; $isPrint: boolean }>(({ $isIos, $isPrint }) => ({
  display: "grid",
  margin: `${DesktopPxToVw(40)} 0px ${DesktopPxToVw(80)}`,
  gridTemplateColumns: $isPrint ? ($isIos ? "25% 25% 25% 25%" : "35% 20% 25% 20%") : "35% 20% 25% 20%",
}))

export const GuestDetailsHeading = styled(
  Typography,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  fontSize: DesktopPxToVw(30),
  fontWeight: 300,
  margin: "0px",
  "@media (max-width:640px)": {
    fontSize: $isIos ? "13px" : MobilePxToVw(30),
  },
}))

export const GuestDetailsList = styled(
  Typography,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  fontFamily: theme?.palette?.font?.primaryFontFamily,
  fontSize: DesktopPxToVw(37),
  fontWeight: 400,
  margin: `${DesktopPxToVw(22)} 0px 0px 0px`,
  letterSpacing: "-1px",
  textTransform: "uppercase",
  wordBreak: "break-all",
  maxWidth: "100%",
  "@media (max-width:640px)": {
    fontSize: $isIos ? "16px" : MobilePxToVw(37),
    margin: $isIos ? "11px 0px 0px 0px" : `${MobilePxToVw(22)} 0px 0px 0px`,
  },
}))

export const RoomDetailsWrapper = styled(Box)(() => ({
  border: `1px solid ${theme?.palette?.ihclPalette?.hexSeventeen}`,
  padding: `${DesktopPxToVw(16)} ${DesktopPxToVw(40)} ${DesktopPxToVw(46)} ${DesktopPxToVw(40)}`,
}))

export const BookedRoomNumber = styled(Box)(() => ({
  display: "flex",
  marginBottom: DesktopPxToVw(16),
  justifyContent: "space-between",
}))

export const RoomNumber = styled(
  Typography,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  margin: "0px",
  fontSize: DesktopPxToVw(36),
  fontWeight: 300,
  "@media (max-width:640px)": {
    fontSize: $isIos ? "18px" : MobilePxToVw(36),
  },
}))

export const CancelationPolicyText = styled(RoomNumber)(() => ({
  fontSize: DesktopPxToVw(30),
}))

export const BookedNumberText = styled(
  RoomNumber,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  fontSize: $isIos ? "15px " : DesktopPxToVw(30),
}))

export const RoomNumberID = styled(
  Typography,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  fontSize: DesktopPxToVw(36),
  fontWeight: 700,
  margin: `0px 0px 0px ${DesktopPxToVw(5)}`,
  textTransform: "uppercase",
  "@media (max-width:640px)": {
    fontSize: $isIos ? "18px" : MobilePxToVw(36),
  },
}))

export const RoomDescription = styled(Box)(() => ({
  display: "flex",
  gap: DesktopPxToVw(30),
  marginLeft: DesktopPxToVw(38),
  flexDirection: "column",
  justifyContent: "space-between",
}))

export const BorderBox = styled(
  Box,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  borderBottom: `1px solid ${theme?.palette?.ihclPalette?.hexSeventeen}`,
  borderTop: `1px solid ${theme?.palette?.ihclPalette?.hexSeventeen}`,
  padding: $isIos ? "20px 0 40px" : `${DesktopPxToVw(20)} 0px ${DesktopPxToVw(40)}`,
}))

export const TotalRoomDetails = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}))

export const RoomDescriptionHeading = styled(
  Typography,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  fontSize: DesktopPxToVw(30),
  fontWeight: 700,
  textTransform: "uppercase",
  "@media (max-width:640px)": {
    fontSize: $isIos ? "15px" : MobilePxToVw(30),
  },
}))

export const RoomDescriptionHeadingOne = styled(
  RoomDescriptionHeading,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  fontSize: DesktopPxToVw(36),
  textTransform: "initial",
  "@media (max-width:640px)": {
    fontSize: $isIos ? "18px" : MobilePxToVw(36),
  },
}))

export const TopBorderBox = styled(
  Stack,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  borderTop: `1px solid ${theme?.palette?.ihclPalette?.hexSeventeen}`,
  marginTop: DesktopPxToVw(20),
  paddingTop: DesktopPxToVw(10),
  "@media (max-width:640px)": {
    marginTop: $isIos ? "10px" : MobilePxToVw(20),
    paddingTop: $isIos ? "5px" : MobilePxToVw(10),
  },
}))

export const RoomDescriptionHeadingTwo = styled(RoomDescriptionHeading)(() => ({}))

export const RoomDescriptionHeadingThree = styled(RoomDescriptionHeading)(() => ({}))

export const RoomDescriptionText = styled(
  RoomDescriptionHeadingOne,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  fontWeight: 300,
  fontSize: $isIos ? "15px" : "",
}))

export const RoomDescriptionPrice = styled(RoomDescriptionText)(() => ({
  textTransform: "uppercase",
  listStyle: "none",
  whiteSpace: "nowrap",
}))

export const ListTextItems = styled(
  "li",
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  fontSize: DesktopPxToVw(36),
  fontWeight: 300,
  margin: `${DesktopPxToVw(10)} 0px`,
  "@media (max-width:640px)": {
    fontSize: $isIos ? "18px" : MobilePxToVw(36),
  },
}))

export const OrderedListTextItems = styled(ListTextItems)(() => ({
  fontSize: DesktopPxToVw(26),
}))

export const TotalPriceAndText = styled(
  ListTextItems,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  listStyle: "none",
  whiteSpace: "nowrap",
  margin: `${DesktopPxToVw(30)} 0 0`,
  lineHeight: "140%",
}))

export const FinalPriceAndText = styled(
  Typography,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  fontSize: DesktopPxToVw(36),
  fontWeight: 700,
  whiteSpace: "nowrap",
  margin: `${DesktopPxToVw(30)} 0px 0px 0px`,
  "@media (max-width:640px)": {
    fontSize: $isIos ? "22px" : MobilePxToVw(36),
  },
}))

export const DynamicPriceAndText = styled(
  Typography,
  transientProps,
)<{ $isIos?: boolean; $isSmall: boolean }>(({ $isIos, $isSmall }) => ({
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  fontSize: $isSmall ? DesktopPxToVw(36) : DesktopPxToVw(36),
  fontWeight: $isSmall ? 300 : 700,
  whiteSpace: "nowrap",
  margin: `${DesktopPxToVw(30)} 0px 0px 0px`,
  "@media (max-width:640px)": {
    fontSize: $isIos ? ($isSmall ? MobilePxToVw(20) : "22px") : $isSmall ? MobilePxToVw(36) : MobilePxToVw(36),
  },
}))

export const BoldText = styled(
  Typography,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  fontSize: DesktopPxToVw(50),
  fontWeight: 700,
  whiteSpace: "nowrap",
  margin: `${DesktopPxToVw(30)} 0px 0px 0px`,
  "@media (max-width:640px)": {
    fontSize: $isIos ? "22px" : MobilePxToVw(50),
  },
}))
export const BalanceLabel = styled(
  Typography,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  fontSize: DesktopPxToVw(36),
  fontWeight: 700,
  marginTop: DesktopPxToVw(30),
  "@media (max-width:640px)": {
    fontSize: $isIos ? "25px" : MobilePxToVw(36),
  },
}))
export const NewBalanceWrapper = styled(Box)(() => ({
  display: "flex",
  minWidth: "40%",
  justifyContent: "space-between",
}))

export const PriceUnderline = styled(Typography)(() => ({
  width: DesktopPxToVw(624),
  float: "right",
  height: DesktopPxToVw(4),
  backgroundColor: "#333",
}))

export const FinalPriceWrapperBox = styled(
  Box,
  transientProps,
)<{ $isIos?: boolean; $isPrint?: boolean; isMobile?: boolean }>(({ $isIos, $isPrint, isMobile }) => ({
  display: "flex",
  flexShrink: 0,
  justifyContent: isMobile || $isIos ? "end" : "space-between",
}))

export const FinalPriceBox = styled(Box)(() => ({
  textAlign: "end",
  margin: `0px 0px 0px ${DesktopPxToVw(110)}`,
}))

export const CancelationPolicyBox = styled(Box)(() => ({
  display: "flex",
  gap: "10%",
  margin: `${DesktopPxToVw(40)} 0px 0px 0px`,
}))

export const BookingButton = styled(
  Button,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  width: "40%",
  height: DesktopPxToVw(90),
  color: theme?.palette?.ihclPalette?.hexOne,
  fontSize: DesktopPxToVw(30),
  fontWeight: 700,
  border: "none",
  letterSpacing: DesktopPxToVw(3),
  borderRadius: "0px",
  backgroundColor: theme?.palette?.ihclPalette?.hexTwo,
  "&:hover": {
    border: "none",
    backgroundColor: theme?.palette?.ihclPalette?.hexTwo,
  },
  "@media (max-width:640px)": {
    fontSize: $isIos ? "15px" : MobilePxToVw(30),
  },
}))

export const GiftCardNumber = styled(Button)(() => ({
  backgroundColor: "lightgray",
  // fontSize: DesktopPxToVw(30),
}))

export const GiftDetailsWrapper = styled(
  Grid,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  display: "grid",
  margin: `${DesktopPxToVw(40)} 0px`,
  gridTemplateColumns: " 25% 25% auto",
  "@media (max-width:640px)": {
    margin: $isIos ? "40px 0px" : `${MobilePxToVw(40)} 0px`,
  },
}))

export const GiftCardDetailsWrapper = styled(
  Grid,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  display: "grid",
  margin: `${DesktopPxToVw(40)} 0px`,
  gridTemplateColumns: "28% 29% 28%",
  "@media (max-width:640px)": {
    gridTemplateColumns: $isIos ? "29% 31% 28%" : "28% 31% 28%",
  },
}))

export const GiftCardReloadWrapper = styled(
  Grid,
  transientProps,
)<{ $isIos?: boolean; $isMobile?: boolean; $isPrint?: boolean }>(({ $isIos, $isMobile, $isPrint }) => ({
  display: "grid",
  margin: `${DesktopPxToVw(40)} 0px`,
  gridTemplateColumns: $isPrint ? "54% 23% 23%" : "50% 25% 25%",
  "@media (max-width:640px)": {
    margin: $isIos ? "30px 0px" : `${MobilePxToVw(40)} 0px`,
    gridTemplateColumns: $isMobile || $isIos ? "46% 27% 27%" : "54% 23% 23%",
  },
}))

export const EpicurePurchaseWrapper = styled(
  Grid,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  display: "grid",
  margin: `${DesktopPxToVw(40)} 0px`,
  gridTemplateColumns: "25% 25% 25% 25%",
  "@media (max-width:640px)": {
    margin: $isIos ? "20px 0px" : `${MobilePxToVw(40)} 0px`,
    gridTemplateColumns: $isIos ? "25% 25% 25% 25%" : "25% 25% 25% 25%",
  },
}))

export const EpicurePurchaseWrapperPage = styled(
  Grid,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  display: "grid",
  margin: `${DesktopPxToVw(40)} 0px`,
  gridTemplateColumns: "30% 30% 20% 20%",
  "@media (max-width:640px)": {
    margin: $isIos ? "20px 0px" : `${MobilePxToVw(40)} 0px`,
    gridTemplateColumns: $isIos ? "25% 25% 25% 25%" : "25% 25% 25% 25%",
  },
}))

export const GiftDetailsPaymentWrapper = styled(Grid)(() => ({
  display: "grid",
  margin: `${DesktopPxToVw(40)} 0px`,
  gridTemplateColumns: "32% 32%  30% 20%",
}))

export const EpicurePaymentWrapper = styled(
  Grid,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  display: "grid",
  margin: `${DesktopPxToVw(40)} 0px`,
  gridTemplateColumns: "25% 25% 35%",
  "@media (max-width:640px)": {
    margin: $isIos ? "40px 0" : `${MobilePxToVw(40)} 0px`,
  },
}))

export const GiftCardPaymentWrapper = styled(Grid)(() => ({
  display: "grid",
  margin: `${DesktopPxToVw(40)} 0px`,
  gridTemplateColumns: "28% 28%  28% 20%",
}))

export const GiftTable = styled(
  Box,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  width: "100%",
  border: `1px solid #45443f`,
  padding: `${DesktopPxToVw(16)} ${DesktopPxToVw(40)} ${DesktopPxToVw(40)}`,
  "@media (max-width:640px)": {
    padding: $isIos ? "12px 40px 40px" : `${MobilePxToVw(16)} ${MobilePxToVw(40)} ${MobilePxToVw(40)}`,
  },
}))

export const GiftTableHeading = styled(
  Box,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  display: "grid",
  gridTemplateColumns: "46% 16% 18% 20%",
  padding: `${DesktopPxToVw(3)} ${DesktopPxToVw(6)}`,
  borderBottom: `1px solid ${theme?.palette?.ihclPalette?.hexSeventeen}`,
  // "@media (max-width:640px)": {
  //   padding: $isIos ? "3px 6px" : `${MobilePxToVw(3)} ${MobilePxToVw(6)}`,
  // },
}))

export const GiftTableTitle = styled(
  "li",
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  listStyle: "none",
  padding: "1rem",
  display: "flex",
  alignItems: "center",
  fontFamily: "Inter",
  fontSize: DesktopPxToVw(36),
  fontWeight: 300,
  "@media (max-width:640px)": {
    fontSize: $isIos ? "14px" : MobilePxToVw(36),
  },
}))

export const GiftTableTitleTotal = styled(
  "li",
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  listStyle: "none",
  padding: "1rem",
  display: "flex",
  alignItems: "baseline",
  fontFamily: "Inter",
  fontSize: DesktopPxToVw(36),
  fontWeight: 300,
  "@media (max-width:640px)": {
    fontSize: $isIos ? "14px" : MobilePxToVw(36),
  },
}))

export const GiftImgTitle = styled(GiftTableTitle)(() => ({
  display: "flex",
  alignItems: "center",
}))

export const GiftTableTotal = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "250px 250px",
  paddingBottom: "4px",
}))

export const TotalPriceUnderLine = styled(Box)(() => ({
  width: DesktopPxToVw(665),
  float: "right",
  height: DesktopPxToVw(4),
  backgroundColor: "#333",
}))

export const GreetingContainer = styled(
  Box,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: DesktopPxToVw(10),
  margin: DesktopPxToVw(16),
  "@media (max-width:640px)": {
    gap: $isIos ? "5px" : MobilePxToVw(10),
    margin: $isIos ? "8px" : MobilePxToVw(16),
  },
}))
export const GreetingCard = styled(Box)(() => ({
  borderRadius: "5px",
}))

export const GreetingTo = styled(Box)(() => ({
  color: "black",
  fontWeight: "500",
  display: "inline",
}))

export const GreetingMessage = styled(Box)(() => ({
  marginTop: "20px",
}))

export const GreetingAuthor = styled(Box)(() => ({
  position: "absolute",
  bottom: "10px",
  right: "30px",
  color: "black",
  fontWeight: "500",
}))

export const PrintContainer = styled(
  Box,
  transientProps,
)<{ $isIos?: boolean; $print?: boolean }>(({ $isIos, $print }) => ({
  padding: $print && $isIos ? "0vw" : `${DesktopPxToVw(65)} ${DesktopPxToVw(100)}`,
  width: $isIos ? "100%" : DesktopPxToVw(1920),

  "@media (max-width:640px)": {
    padding: $print ? "0vw" : $isIos ? "30px 60px" : `${MobilePxToVw(40)} ${MobilePxToVw(80)}`,
    width: $isIos ? "100%" : MobilePxToVw(1920),
  },
}))

export const ThreeColumnWrapper = styled(
  Box,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  display: "grid",
  margin: `${DesktopPxToVw(40)} 0px`,
  gridTemplateColumns: "34% 34% 34%",
  "@media (max-width:640px)": {
    margin: $isIos ? "20px 0px" : `${MobilePxToVw(40)} 0px`,
  },
}))

export const DateInfoWrapper = styled(
  Box,
  transientProps,
)<{
  $showBorder: boolean
  $isIos?: boolean
}>(({ $showBorder, $isIos }) => ({
  display: "flex",
  flexDirection: "column",
  gap: DesktopPxToVw(10),
  borderRight: $showBorder ? `1px solid ${theme?.palette?.ihclPalette?.hexSeventeen}` : "0px",
  marginRight: $showBorder ? DesktopPxToVw(34) : 0,
  "@media (max-width:640px)": {
    gap: $isIos ? "5px" : MobilePxToVw(10),
    marginRight: $isIos ? "12px" : MobilePxToVw(34),
  },
}))

const BasicSizeStyles = styled(
  Typography,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  fontSize: DesktopPxToVw(26),
  lineHeight: DesktopPxToVw(39),
  fontFamily: "Inter",
  "@media (max-width:640px)": {
    fontSize: $isIos ? "13px" : MobilePxToVw(26),
    lineHeight: $isIos ? "20px" : MobilePxToVw(39),
  },
}))
export const DateHeaderText = styled(BasicSizeStyles)(() => ({
  color: "#8b8a84",
  fontWeight: 400,
}))

export const FlexCenter = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}))

const CommonTextStyles = styled(
  Typography,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  fontSize: DesktopPxToVw(36),
  fontFamily: "Inter",
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  lineHeight: DesktopPxToVw(50.4),
  "@media (max-width:640px)": {
    fontSize: $isIos ? "18px" : MobilePxToVw(36),
    lineHeight: $isIos ? "25.2px" : MobilePxToVw(50.4),
  },
}))

export const DateText = styled(CommonTextStyles)(() => ({
  fontWeight: 700,
}))

export const Description = styled(CommonTextStyles)(() => ({
  fontWeight: 300,
  margin: `${DesktopPxToVw(60)} 0`,
  fontSize: DesktopPxToVw(36),
  "@media (max-width:640px)": {
    margin: `${MobilePxToVw(60)} 0`,
    fontSize: MobilePxToVw(36),
  },
}))
export const TermsAndConditionsText = styled(CommonTextStyles)(() => ({
  fontWeight: 300,
}))
export const TermsAndConditionsWrapper = styled(
  Box,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  paddingTop: DesktopPxToVw(60),
  borderTop: `1px solid ${theme?.palette?.ihclPalette?.hexSeventeen}`,
  "@media (max-width:640px)": {
    PaddingTop: $isIos ? "30px" : MobilePxToVw(60),
  },
}))

export const TermsAndConditions = styled(BasicSizeStyles)(() => ({
  fontWeight: 300,
  color: theme?.palette?.ihclPalette?.hexSeventeen,
}))

export const GCPurchaseOrderNumberWrapper = styled(
  Box,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  display: "inline-block",
  textAlign: "center",
  padding: `${DesktopPxToVw(24)} ${DesktopPxToVw(70)}`,
  border: `1px solid ${theme?.palette?.ihclPalette?.hexSeventeen}`,
  "@media (max-width:640px)": {
    padding: $isIos ? "24px 50px" : `${MobilePxToVw(24)} ${MobilePxToVw(70)}`,
    marginBottom: $isIos ? "15px" : MobilePxToVw(30),
  },
}))

export const GcReceiverDetailsList = styled(
  Typography,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  fontFamily: theme?.palette?.font?.primaryFontFamily,
  fontSize: DesktopPxToVw(40),
  fontWeight: 400,
  marginTop: `${DesktopPxToVw(20)}`,
  letterSpacing: "-1px",
  textTransform: "uppercase",
  lineHeight: "110%",
  "@media (max-width:640px)": {
    fontSize: $isIos ? "16px" : MobilePxToVw(40),
    margin: $isIos ? "11px 0px 0px 0px" : `${MobilePxToVw(20)} 0px 0px 0px`,
  },
}))

export const GCPurchaseOrderNumberMainWrapper = styled(
  Box,
  transientProps,
)<{ $isIos?: boolean }>(({ $isIos }) => ({
  alignSelf: "flex-end",
  margin: `${DesktopPxToVw(40)} 0`,
  paddingBottom: DesktopPxToVw(40),
  borderBottom: `1px solid ${theme?.palette?.ihclPalette?.hexSeventeen}`,
  "@media (max-width:640px)": {
    marginTop: $isIos ? "20px" : MobilePxToVw(40),
    paddingBottom: $isIos ? "20px" : MobilePxToVw(40),
  },
}))
