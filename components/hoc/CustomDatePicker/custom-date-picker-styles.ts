import { Box, Typography, styled } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { theme } from "../../../lib/theme"

export const CustomCalendarWrapper = styled(
  Box,
  transientProps,
)<{
  $mobile: boolean
  $width: string
  $isDateExists: any
  $renderComponent: any
  $isDouble: any
  $isCalendarLoading?: any
}>(({ $mobile, $width, $isDateExists, $renderComponent, $isDouble, $isCalendarLoading }) => ({
  position: "relative",
  input: {
    "&::placeholder": {
      fontSize: DesktopPxToVw(24),
      color: theme?.palette?.ihclPalette?.hexSeventeen,
      fontWeight: 300,
      "@media (max-width: 640px)": {
        fontSize: MobilePxToVw(24),
      },
    },
  },
  "& .react-calendar__tile": {
    color: `${theme?.palette?.ihclPalette?.hexSeventeen}`,
  },
  "& .react-calendar__tile:disabled": {
    backgroundColor: "transparent",
    opacity: "0.4",
  },
  "& .react-calendar": {
    marginTop: $isDouble ? DesktopPxToVw(23) : $mobile ? MobilePxToVw(10) : DesktopPxToVw(10),
    width: `${$width} !important`,
    position: "relative",
    zIndex: 999,
    padding: $mobile ? MobilePxToVw(40) : `${DesktopPxToVw(40)} ${DesktopPxToVw(20)} ${DesktopPxToVw(20)}`,
    border: "none",
    background: `${theme.palette.background.default} !important`,
    boxShadow: "-6px 10px 24px 0px rgba(0, 0, 0, 0.10)",
  },
  "& .react-calendar::before": {
    content: $isCalendarLoading ? '"Finding best rates..."' : '""',
    fontSize: $mobile ? MobilePxToVw(26) : DesktopPxToVw(32),
    fontWeight: 500,
    color: theme.palette.ihclPalette.hexSeventeen,
    position: "absolute",
    left: "50%",
    bottom: "45%",
    whiteSpace: "nowrap !important",
    transform: "translate(-50%,-50%)",
    "@media (max-width: 640px)": {
      bottom: "35%",
    },
  },
  "& .react-date-picker__calendar--open": {
    width: "fit-content",
    zIndex: 999,
    inset: `${DesktopPxToVw(30)} 0 0 0 !important`,
    transform: $isDouble ? "translateX(-20%)" : "unset",
    "@media (max-width: 640px)": {
      inset: `${MobilePxToVw(30)} 0 0 0 !important`,
    },
  },
  "& .react-date-picker__inputGroup__month::placeholder": {
    visibility: "hidden",
  },
  "& .react-date-picker__calendar-button": {
    padding: "0 !important",
    zIndex: "9 !important",
  },
  "& .react-calendar__tile--active": {
    background: `${theme.palette.ihclPalette.hexTwo} !important`,
    "& abbr": {
      color: `${theme.palette.ihclPalette.hexOne} !important`,
    },
    "& p": {
      textDecoration: "none !important",
      color: theme.palette.ihclPalette.hexOne,
      fontFamily: "Inter",
      fontWeight: 300,
      lineHeight: "140% ",
    },
  },
  "& .react-calendar__tile--now": {
    background: "unset",
  },
  "& .react-calendar__tile--range": {
    background: `${theme.palette.ihclPalette.hexTwo} !important`,
    "& abbr": {
      color: `${theme.palette.ihclPalette.hexOne} !important`,
    },
    "& p": {
      color: theme.palette.ihclPalette.hexOne,
    },
  },
  "& .react-date-picker__wrapper": {
    fontSize: DesktopPxToVw(24),
    width: "100%",
    border: "none",
    background: "transparent",
    outline: "none !important",
    fontWeight: 400,
    "@media (max-width: 640px)": {
      fontSize: MobilePxToVw(24),
    },
  },
  "& .react-date-picker__inputGroup__divider": {
    display: "none",
  },
  "& .react-calendar__tile--hasActive": {
    background: "transparent",
  },
  "& .react-date-picker__inputGroup__input": {
    background: theme.palette.background.default,
    border: "none !important",
    outline: "none !important",
    opacity: $renderComponent ? "0 !important" : "unset",
  },
  "& .react-date-picker--enabled": {
    width: "100% !important",
  },
  "& .react-calendar__navigation__label": {
    color: theme.palette.ihclPalette.hexSeventeen,
    fontFamily: theme?.palette?.font?.primaryFontFamily,
    fontSize: $mobile ? MobilePxToVw(24) : DesktopPxToVw(24),
    fontWeight: 400,
    lineHeight: "140% ",
    display: $isDouble ? "flex" : "unset",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  "& .react-calendar__navigation__label__divider": {
    display: $isDouble ? "none" : "unset",
  },
  "& abbr": {
    textDecoration: "none !important",
    color: theme.palette.ihclPalette.hexSeventeen,
    fontFamily: "Inter",
    fontSize: $mobile ? MobilePxToVw(18) : DesktopPxToVw(18),
    fontWeight: 300,
    lineHeight: "140% ",
  },
  "& p": {
    textDecoration: "none !important",
    color: theme.palette.ihclPalette.hexSeventeen,
    fontFamily: "Inter",
    fontWeight: 300,
    lineHeight: "140% ",
  },
  "& .react-calendar__month-view__weekdays__weekday": {
    width: `${$mobile ? MobilePxToVw(70) : DesktopPxToVw(70)} !important`,
    height: `${$mobile ? MobilePxToVw(60) : DesktopPxToVw(60)} !important`,
    padding: $mobile
      ? `${MobilePxToVw(16)} ${MobilePxToVw(20)}  ${MobilePxToVw(13)}`
      : `${DesktopPxToVw(13)} ${DesktopPxToVw(10)} ${DesktopPxToVw(11)}`,
  },
  "& .react-calendar__month-view__days": {
    "& button": {
      width: `${$mobile ? MobilePxToVw(70) : DesktopPxToVw(70)} !important`,
      minHeight: `${$mobile ? MobilePxToVw(60) : DesktopPxToVw(60)} !important`,
      padding: $mobile
        ? `${MobilePxToVw(16)} ${MobilePxToVw(20)}  ${MobilePxToVw(13)}`
        : `${DesktopPxToVw(13)} ${DesktopPxToVw(10)} ${DesktopPxToVw(11)}`,
    },
  },
  "& .react-calendar__month-view__days__day--neighboringMonth": {
    visibility: "hidden" /* Hide the neighboring month dates */,
  },
}))

export const StyledText = styled(
  Box,
  transientProps,
)<{ $zIndex: boolean }>(({ $zIndex }) => ({
  position: "absolute",
  bottom: "50%",
  transform: "translateY(50%)",
  zIndex: $zIndex ? "unset" : 9,
}))
