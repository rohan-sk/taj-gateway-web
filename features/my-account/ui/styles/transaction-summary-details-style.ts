import styled from "@emotion/styled"
import { theme } from "../../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { Box, Grid, MenuItem, Pagination, TextField, Typography } from "@mui/material"

export const PlaceholderTitle = styled(Typography)(() => ({
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  paddingBottom: DesktopPxToVw(35),
  "@media (max-width: 640px)": {
    paddingBottom: MobilePxToVw(35),
  },
}))

export const ClaimMissingPointsTypography = styled(Typography)(() => ({
  float: "right",
  cursor: "pointer",
  marginTop: "-1.8vw",
  "@media (max-width: 640px)": {
    paddingBottom: MobilePxToVw(40),
  },
}))

export const FilterMainGrid = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "end",
  alignItems: "self-end",
  marginBottom: "1.823vw",
  "@media (max-width: 640px)": {
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "self-start",
  },
}))

export const FilterWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "baseline",
}))

export const SortWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
}))

export const StyledMenu = styled(MenuItem)(() => ({
  fontFamily: "supreme",
  fontSize: "1.35vw",
}))

export const BookingTabsWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "self-end",
}))

export const FlexBox = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
}))

export const StyledPagination: any = styled(Pagination)(() => ({
  "& .Mui-selected": {
    fontWeight: 700,
    color: theme?.palette?.ihclPalette?.hexTwo,
    backgroundColor: `${theme?.palette?.background?.default} !important`,
  },
}))

export const DateTextField = styled(TextField)(() => ({
  width: "14vw",
  fontSize: DesktopPxToVw(18),
  "@media (max-width: 640px)": {
    width: "35vw",
    fontSize: MobilePxToVw(24),
    height: "4vw",
  },
  "& .MuiIconButton-root": {
    right: "1vw",
    padding: "0vw !important",
  },
  "& .Mui-error": {
    color: `${theme?.palette?.text?.primary} !important`,
  },
  "& .Mui-error:before": {
    borderBottomColor: `${theme?.palette?.text?.primary} !important`,
  },
  "& .MuiInput-input": {
    fontSize: DesktopPxToVw(18),
    "@media (max-width: 640px)": {
      fontSize: MobilePxToVw(24),
      height: "5vw",
    },
  },
  "&  .MuiFormHelperText-root": {
    color: `${theme?.palette?.ihclPalette?.hexTwentyOne} !important`,
    fontSize: DesktopPxToVw(18),
    "@media (max-width:640px)": {
      fontSize: "2.5vw",
    },
  },
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      fontWeight: 300,
      fontSize: DesktopPxToVw(18),
      opacity: 1,
      color: theme?.palette?.ihclPalette?.hexFour,
      "@media (max-width: 640px)": {
        fontSize: MobilePxToVw(24),
        lineHeight: "4.8vw",
      },
    },
  },
}))
