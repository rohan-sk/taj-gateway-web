import { theme } from "../../../../lib/theme"
import { styled, Stack, Divider, InputLabel, Box, FormControl, Typography, MenuItem } from "@mui/material"
import { transientProps } from "../../../../utils/transientProps"

export const VoucherSectionContainer = styled(Box)(() => ({
  width: "100%",
  "@media (max-width:640px)": {
    padding: "0vw 7.813vw",
  },
}))
export const VoucherSectionMainContainer = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: $isMobile ? "unset" : "flex",
  alignItems: $isMobile ? "unset" : "center",
  flexDirection: $isMobile ? "unset" : "row",
}))
export const VoucherTitleContainer = styled(Box)(() => ({
  textAlign: "start",
  width: "100%",
  "@media (max-width:640px)": {
    textAlign: "center",
  },
}))

export const VoucherTitleTypography = styled(Typography)(() => ({
  fontSize: "2.083vw",
  "@media (max-width:640px)": {
    fontSize: "5vw",
  },
}))
export const FilterStack = styled(Stack)(() => ({
  flexDirection: "row",
  alignItems: "center",
  margin: "0vw 0vw 1.37vw 0vw",
  justifyContent: "space-between",
  "@media (max-width:640px)": {
    flexDirection: "column",
    margin: "10.968vw 0vw 5.871vw",
    gap: "5.469vw",
  },
}))

export const VerticalDivider = styled(Divider)(() => ({
  width: "0.055vw",
  height: "1.563vw",

  backgroundColor: theme?.palette?.ihclPalette?.hexTwelve,
  "@media (max-width:640px)": {
    height: "5vw",
  },
}))

export const DropDownsStack = styled(Stack)(() => ({
  gap: "2.083vw",
  flexDirection: "row",
  marginBottom: "1.8229vw",
  justifyContent: "flex-end",
  "@media (max-width:640px)": {
    width: "100%",
    justifyContent: "space-between",
    gap: "4.219vw",
    // marginBottom: "5.469vw",
  },
}))

export const StyledInputLabel = styled(InputLabel)(() => ({
  fontWeight: 300,
  fontSize: "0.938vw",
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  "@media (max-width:640px)": {
    fontSize: "3.75vw",
  },
}))

export const TabsContainerStack = styled(Stack)(() => ({
  flexDirection: "row",
  gap: "1.042vw",
  width: "100%",
  justifyContent: "end",
  "@media (max-width:640px)": {
    gap: "3.125vw",
    justifyContent: "center",
  },
}))

export const VoucherFormControl = styled(FormControl)(() => ({
  textAlign: "start",
  fontFamily: "supreme",
  fontWeight: 300,
  fontSize: "0.93vw",
  "@media (max-width:640px)": {
    fontSize: "3.75vw",
  },
  "& .MuiSelect-select": {
    "&:focus": {
      backgroundColor: "transparent",
    },
  },
  "& label": {
    transform: "scale(1) translate(0, 0.4em)",
    textAlign: "start",
    fontFamily: "supreme",
    fontWeight: 300,
    fontSize: "0.93vw",
    paddingRight: "1.25vw",
    "@media (max-width:640px)": {
      fontSize: "3.75vw",
      transform: "scale(1) translate(0, 0em)",
      paddingRight: "3.75vw",
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
    fontFamily: "supreme",
    fontWeight: 300,
    fontSize: "0.93vw",
    lineHeight: "140%",
    "@media (max-width:640px)": {
      fontSize: "3.75vw",
      lineHeight: "140%",
    },
  },
}))

export const VoucherFilterMenuItem = styled(MenuItem)(() => ({
  fontFamily: "supreme",
  fontWeight: "300",
  fontSize: "0.938vw",
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  "@media (max-width:640px)": {
    fontSize: "3.438vw",
  },
}))
