import { theme } from "../../../../lib/theme"
import {
  Box,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { transientProps } from "../../../../utils/transientProps"

export const MainGrid = styled(Grid)(() => ({
  width: "fit-content",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: DesktopPxToVw(26),
  "@media (max-width: 640px)": {
    gap: MobilePxToVw(35),
    justifyContent: "center",
    alignItems: "center",
  },
}))

export const StyledDateRangePicker = styled(TextField)(() => ({
  "& .MuiInput-input": {
    fontSize: "1.2vw",
  },
  "& .Mui-error": {
    color: `${theme?.palette?.neuPalette?.hexSeventeen} !important`,
  },
  "& .MuiFormLabel-root": {
    fontSize: "1.35vw",
    fontWeight: 300,
    color: theme?.palette?.neuPalette?.hexSeventeen,
  },
}))

export const TextFieldWrapper = styled(Grid)(() => ({
  display: "flex",
  gap: "2vw",
  alignItems: "self-starts",
  borderBottom: `1px solid${theme?.palette?.neuPalette?.hexTwelve}`,
  marginBottom: "2vw",
}))

export const EndDateTextField = styled(TextField)(() => ({
  "& .Mui-error": {
    color: `${theme?.palette?.neuPalette?.hexSeventeen} !important`,
  },
  "& .MuiInput-input": {
    fontSize: "1.2vw",
    color: theme?.palette?.neuPalette?.hexSeventeen,
  },
  "& .MuiFormLabel-root": {
    fontSize: "1.35vw",
    fontWeight: 300,
    color: theme?.palette?.neuPalette?.hexSeventeen,
    paddingLeft: "0.6vw",
  },
}))

export const DatesWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  gap: DesktopPxToVw(40),
}))

export const StyledDivider = styled(Divider)(() => ({
  width: "1.563vw",
  height: "0.06vw",
  background: theme.palette.neuPalette.hexTwelve,
  "@media (max-width: 640px)": {
    width: MobilePxToVw(30),
    height: "1px",
  },
}))

export const ButtonsWrapper = styled(Box)(() => ({
  display: "flex",
  marginLeft: "10.2vw",
  marginBottom: "2vw",
  justifyContent: "center",
}))

export const ParentStack = styled(
  Stack,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  lineHeight: "150%",
  flexDirection: $isMobile ? "column" : "row",
  alignItems: "center",
  gap: $isMobile ? MobilePxToVw(22) : DesktopPxToVw(101),
}))

export const DatesStack = styled(
  Stack,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  width: $isMobile ? MobilePxToVw(476) : DesktopPxToVw(432),
  flexDirection: "row",
  justifyContent: "space-between",
  position: "relative",
  lineHeight: "150%",
  paddingBottom: $isMobile ? MobilePxToVw(8) : DesktopPxToVw(8),
  borderBottom: `1px solid ${theme.palette.neuPalette.hexSeventeen}`,
}))

export const CalendarBox = styled(Box)(() => ({
  width: "100%",
  position: "relative",
}))

export const CalendarTextStack = styled(
  Stack,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  alignItems: "center",
  flexDirection: "row",
  columnGap: $isMobile ? MobilePxToVw(20) : DesktopPxToVw(20),
}))

export const DatesText = styled(
  Typography,
  transientProps
)<{ $color: string }>(({ $color }) => ({
  whiteSpace: "nowrap",
  color: $color,
}))

export const CalendarStack = styled(
  Stack,
  transientProps
)(() => ({
  width: "100%",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "space-between",
}))

export const SelectedRooms = styled(Box)(() => ({
  border: `1px solid ${theme?.palette?.neuPalette?.hexTwenty}`,
  padding: DesktopPxToVw(40),
  "@media (max-width: 640px)": {
    padding: `${MobilePxToVw(35)} ${MobilePxToVw(32)}`,
  },
}))

export const TitleWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
}))

export const BoldText = styled(Typography)(() => ({
  fontWeight: 300,
  whiteSpace: "nowrap",
  "@media (max-width: 640px)": {
    fontWeight: 700,
  },
}))
