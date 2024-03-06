import { theme } from "../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import {
  Box,
  Grid,
  Select,
  styled,
  InputLabel,
  Typography,
  Stack,
} from "@mui/material"
import { transientProps } from "../../../utils/transientProps"

export const BookingsWrapper = styled(Grid)(() => ({
  border: `1px solid ${theme?.palette?.neuPalette?.hexTwenty}`,
  margin: "2vw 0vw",
  display: "flex",
  width: "100%",
  paddingRight: "1.563vw",
  "@media (max-width:640px)": {
    margin: "0vw 0vw 5.469vw 0vw",
    paddingRight: "0vw",
  },
}))

export const GridContainer = styled(Grid)(() => ({
  margin: "auto",
}))

export const ContentWrapper = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: theme?.palette?.background?.paper,
  marginTop: DesktopPxToVw(20),
  padding: DesktopPxToVw(10),
  "@media (max-width:640px)": {
    marginTop: 0,
    alignItems: "flex-start",
    padding: `${MobilePxToVw(20)} ${MobilePxToVw(30)}`,
  },
}))

export const BoxWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "start",
  alignItems: "baseline",
  gap: "0.4vw",
}))
export const FlexDirectionToggler = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  columnGap: DesktopPxToVw(8),
  "@media (max-width:640px)": {
    alignItems: "start",
    columnGap: MobilePxToVw(8),
    flexDirection: "column",
  },
}))

export const TextTypography = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: DesktopPxToVw(18),
}))
export const BoldText = styled(
  Typography,
  transientProps
)<{ $isWrap?: boolean }>(({ $isWrap }) => ({
  fontWeight: 700,
  whiteSpace: $isWrap ? "pre-wrap" : "nowrap",
}))

export const HotelDetailsWrapper = styled(Typography)(() => ({
  display: "flex",
  justifyContent: "space-between",
}))
export const FullBox = styled(Box)(() => ({
  width: "100%",
}))
export const TitleBoxWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  "@media (max-width:640px)": {
    flexDirection: "column",
  },
}))

export const HotelName = styled(Typography)(() => ({
  fontSize: DesktopPxToVw(24),
  textTransform: "uppercase",
  color: theme?.palette?.neuPalette?.hexSeventeen,
  "@media (max-width:640px)": {
    fontSize: MobilePxToVw(24),
  },
}))

export const ArrowBox = styled(Box)(() => ({
  cursor: "pointer",
  width: DesktopPxToVw(24),
  "@media (max-width:640px)": {
    width: MobilePxToVw(24),
  },
}))

export const RoomsDetailsContainer = styled(Box)(() => ({
  lineHeight: "1.883vw",
  marginBottom: DesktopPxToVw(5),
  width: "100%",
}))

export const RoomDetails = styled(Typography)(() => ({
  fontSize: DesktopPxToVw(18),
  "@media (max-width:640px)": {
    fontSize: MobilePxToVw(18),
  },
}))

export const FlexContainer = styled(Box)(() => ({
  display: "flex",
  width: "100%",
}))

export const PriceWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "end",
  width: "100%",
  flexDirection: "column",
  rowGap: DesktopPxToVw(6),
  "@media(max-width:640px)": {
    alignItems: "start",
    margin: "3.125vw 0vw",
  },
}))

export const AmountTypography = styled(Typography)(() => ({
  textAlign: "end",
  fontSize: DesktopPxToVw(18),
  color: theme?.palette?.neuPalette?.hexSeventeen,
  "@media (max-width:640px)": {
    fontSize: "2.188vw",
  },
}))

export const AmountText = styled(Typography)(() => ({
  letterSpacing: "-0.09vw !important",
  lineHeight: "1.883vw",
  fontSize: DesktopPxToVw(32),
  "@media (max-width:640px)": {
    lineHeight: "6.5vw",
    fontSize: MobilePxToVw(32),
  },
}))

export const DetailsContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-start",
  columnGap: DesktopPxToVw(6),
}))

export const BoxContainer = styled(Box)(() => ({
  display: "flex",
  gap: DesktopPxToVw(6),
  alignItems: "center",
}))

export const StackContainer = styled(Stack)(() => ({
  gap: DesktopPxToVw(10),
  flexDirection: "row",
  alignItems: "center",
  "@media (max-width:640px)": {
    gap: MobilePxToVw(10),
  },
}))

export const StatusText = styled(
  Typography,
  transientProps
)<{ $check: boolean }>(({ $check }) => ({
  color: $check
    ? theme?.palette?.neuPalette?.hexTwentyOne
    : theme?.palette?.neuPalette?.hexTwentyFour,
  fontWeight: 700,
  fontSize: "0.938vw",
  lineHeight: "140%",
  "@media (max-width:640px)": {
    fontSize: "2.813vw",
  },
}))

export const InlineText = styled(Typography)(() => ({
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  maxWidth: DesktopPxToVw(200),
  "@media (max-width:640px)": {
    maxWidth: MobilePxToVw(200),
  },
}))

export const GuestTitle = styled(Typography)(() => ({
  fontSize: DesktopPxToVw(14),
  marginBottom: DesktopPxToVw(8),
  fontWeight: 700,
  color: theme?.palette?.neuPalette?.hexSeventeen,
  "@media (max-width:640px)": {
    fontSize: MobilePxToVw(14),
    display: "block",
    marginBottom: MobilePxToVw(8),
  },
}))

export const UserDataContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: DesktopPxToVw(10),
  lineBreak: "anywhere",
  "@media (max-width:640px)": {
    gap: MobilePxToVw(10),
  },
}))

export const BookingDetailsGrid = styled(Box)(() => ({
  marginTop: DesktopPxToVw(10),
  display: "grid",
  gridTemplateColumns: "2.5fr 1fr",
  "@media (max-width:640px)": {
    marginTop: MobilePxToVw(20),
    gridTemplateColumns: "100%",
    justifyContent: "start",
  },
}))
export const HotelGuestInfoContainer = styled(
  Box,
  transientProps
)<{ $isPartiallyCancelled:boolean }>(({$isPartiallyCancelled}) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: $isPartiallyCancelled?"unset":"space-around",
  rowGap: $isPartiallyCancelled?DesktopPxToVw(13): DesktopPxToVw(6),
  "@media (max-width:640px)": {
    rowGap: MobilePxToVw(6),
    justifyContent: "space-between"
  },
}))

export const PriceStatusContainer = styled(Box)(() => ({
  marginTop: "0.1vw",
  display: "flex",
  width: "100%",
  flexDirection: "column",
}))
export const GuestDetailsGrid = styled(Box)(() => ({
  display: "gird",
  marginTop: DesktopPxToVw(20),
  gridTemplateColumns: "1fr",
  paddingBottom: DesktopPxToVw(10),
  "@media (max-width:640px)": {
    marginTop: "0vw",
    paddingBottom: "3.125vw",
  },
}))
export const GuestDetails = styled(Stack)(() => ({
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
  "@media(max-width:640px)": {
    alignItems: "flex-start",
  },
}))

export const DetailsStack = styled(Stack)(() => ({
  width: "100%",
  flexDirection: "row",
  columnGap: DesktopPxToVw(80),
  "@media (max-width:640px)": {
    flexDirection: "column",
    rowGap: MobilePxToVw(10),
  },
}))

export const StyledInputLabel = styled(InputLabel)(() => ({
  color: theme?.palette?.neuPalette?.hexEleven,
  fontSize: "0.938vw",
  fontWeight: 300,
  position: "absolute",
  top: 5,
  "@media (max-width:640px)": {
    top: 0,
  },
}))

export const FilterSelect = styled(Select)(() => ({
  fontFamily: "Inter",
  fontSize: "0.938vw",
  fontWeight: 300,
  "@media (max-width:640px)": {
    fontSize: "3.75vw",
  },
}))

export const StyledImages: any = styled(Box)(() => ({
  height: "0.9vw",
  width: "1vw",
  "@media (max-width:640px)": {
    height: "4.063vw",
    width: "auto",
  },
}))

export const UserOptions = styled(Stack)(() => ({
  margin: "1.042vw 0vw",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "0.521vw",
  "@media (max-width:640px)": {
    margin: "5.469vw 0vw",
    justifyContent: "space-between",
    gap: "0vw",
  },
}))

export const MobileViewDetailsContainer = styled(
  Box,
  transientProps
)<{ $onView: boolean }>(({ $onView }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: $onView ? "start" : "end",
}))

export const RoomDetailsSection = styled(Box)(() => ({
  width: "100%",
  margin: "1.563vw 0vw",
  display: "flex",
  flexDirection: "column",
  gap: "1.563vw",
  "@media (max-width:640px)": {
    margin: "0vw",
    padding: "0vw 5vw",
    gap: "5.469vw",
  },
}))
export const UserOptionsContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "0.541vw",
  cursor: "pointer",
  "@media (max-width:640px)": {
    marginTop: "3.125vw",
    width: "50%",
    gap: "2.563vw",
  },
}))

export const IconsWrapper = styled(Typography)(() => ({
  fontSize: "0.833vw",
  letterSpacing: "0.05vw",
  fontWeight: 400,
  whiteSpace: "nowrap",
  "@media (max-width:640px)": {
    fontSize: "2.5vw",
  },
}))

export const UserOptionText = styled(Typography)(() => ({
  fontSize: "0.833vw",
  letterSpacing: "0.05vw",
  fontWeight: 400,
  whiteSpace: "nowrap",
  "@media (max-width:640px)": {
    fontSize: "2.813vw",
    letterSpacing: "0.281vw",
  },
}))

export const ModifyBooking = styled(IconsWrapper)(() => ({}))

export const IconsBoxContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}))

export const DefaultText = styled(Typography)(() => ({
  textAlign: "center",
  marginTop: "4vw",
}))

export const ViewAllLink = styled(Typography)(() => ({
  float: "right",
  marginTop: "-3.4vw",
  cursor: "pointer",
}))

export const MobileCenteredViewAllLink = styled(Typography)(() => ({
  fontSize: "2.5vw",
  cursor: "pointer",
}))

export const LoadMoreStack = styled(Stack)(() => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
}))

export const ModalBox = styled(Box)(() => ({
  top: "50%",
  left: "50%",
  width: "fit-content",
  position: "absolute",
  transform: "translate(-50%, -50%)",
  boxShadow: "-6px 10px 24px 0px rgba(0, 0, 0, 0.10)",
}))
