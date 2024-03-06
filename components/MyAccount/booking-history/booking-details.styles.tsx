import { Box, FormControl, Grid, MenuItem, Typography, styled } from "@mui/material"
import { theme } from "../../../lib/theme"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const FilterWrapper = styled(Box)(() => ({
  display: "flex",
  width: "100%",
  alignItems: "baseline",
  "@media(max-width:640px)": {
    justifyContent: "center",
  },
}))

export const BookingTitle = styled(Typography)(() => ({
  fontSize: "2.083vw",
  "@media (max-width:640px)": {
    fontSize: "5vw",
  },
}))

export const BookingTabsWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "self-end",
}))

export const TabsContainer = styled(Box)(() => ({
  display: "flex",
  gap: "0.8vw",
  justifyContent: "end",
  marginRight: "1.042vw",
  marginBottom: "1.823vw",
  width: "100%",
  "@media (max-width:640px)": {
    justifyContent: "center",
    margin: "0vw 0vw 5.469vw 0vw",
    gap: MobilePxToVw(20),
  },
}))

export const StyledBookingTabs = styled(
  Typography,
  transientProps,
)<{ $index: boolean }>(({ $index }) => ({
  cursor: "pointer",
  color: $index ? theme?.palette?.ihclPalette?.hexTwo : theme?.palette?.ihclPalette?.hexSeventeen,
}))

export const StyledMenu = styled(MenuItem)(() => ({
  fontFamily: "Inter",
  fontSize: "0.938vw",
  "@media (max-width:640px)": {
    fontSize: "3.438vw",
  },
}))

export const SortWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  justifyContent: "end",
  "@media (max-width:640px)": {
    width: "33.906vw",
    gap: "1.863vw",
  },
}))

export const SortContainer = styled(Typography)(() => ({
  fontWeight: 300,
  "@media (max-width:640px)": {
    whiteSpace: "nowrap",
  },
}))

export const ArrowsContainer = styled(Box)(() => ({
  display: "flex",
  gap: "0.26vw",
  marginLeft: DesktopPxToVw(20),
  "@media (max-width:640px)": {
    gap: "0.781vw",
  },
}))
export const SortAndFilterContainer = styled(Box)(() => ({
  display: "flex",
  width: "100%",
}))

export const FilterMainGrid = styled(Box)(() => ({
  display: "flex",
  alignItems: "baseline",
  width: "100%",
  gap: "2.083vw",
  justifyContent: "end",
  "@media (max-width:640px)": {
    justifyContent: "space-between",
    gap: "5.938vw",
    marginBottom: "6.25vw",
  },
}))

export const StyledFormControl = styled(FormControl)(() => ({
  textAlign: "start",
  fontFamily: "Inter",
  fontWeight: 300,
  fontSize: DesktopPxToVw(18),
  "& .MuiSelect-select": {
    "&:focus": {
      backgroundColor: "transparent",
    },
  },
  "& label": {
    transform: "scale(1) translate(0, 0)",
    textAlign: "start",
    fontFamily: "Inter",
    fontWeight: 300,
    fontSize: DesktopPxToVw(18),
    "@media (max-width:640px)": {
      fontSize: "3.75vw",
    },
    "&.Mui-focused, &.MuiInputLabel-shrink": {
      transform: "scale(0.75) translate(0, -1.2em)",
    },
  },
  "& .MuiInputBase-root": {
    height: "2.083vw",
    "@media (max-width:640px)": {
      height: "6.25vw",
    },
  },
  "& label+div": {
    margin: "0vw",
  },

  "& .MuiFormLabel-root.MuiInputLabel-root": {
    transition:
      "cubic-bezier(0.0, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,max-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
  },

  "& .MuiSelect-select.MuiInputBase-input.MuiInput-input": {
    minHeight: "unset",
    textAlign: "start",
    fontFamily: "Inter",
    fontWeight: 300,
    fontSize: DesktopPxToVw(18),
    lineHeight: "140%",
    "@media (max-width:640px)": {
      fontSize: "3.75vw",
      lineHeight: "140%",
    },
  },
}))
