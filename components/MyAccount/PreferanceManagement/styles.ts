import { Box, Button, Input, Paper, styled, Typography } from "@mui/material"
import { theme } from "../../../lib/theme"
import DesktopPxToVw from "../../../utils/DesktopFontCalc"

export const BorderBox = styled(Box)(() => ({
  padding: `${DesktopPxToVw(50)} ${DesktopPxToVw(30)}`,
  border: `1px solid ${theme?.palette?.neuPalette?.hexSeventeen}`,
  marginTop: DesktopPxToVw(35),
}))

export const PreferenceBox = styled(Paper)(() => ({
  padding: DesktopPxToVw(30),
  borderRadius: "0",
  display: "flex",
  alignItems: "center",
  gap: DesktopPxToVw(10),
  width: "100%",
}))

export const PreferredButton = styled(Button)(() => ({
  padding: DesktopPxToVw(20),
  fontWeight: 300,
}))
export const PreferenceButton = styled(Button)(() => ({
  border: `1.5px solid ${theme?.palette?.neuPalette?.hexSeventeen}`,
  padding: DesktopPxToVw(20),
  fontWeight: 300,
  color: theme?.palette?.neuPalette?.hexSeventeen,
}))

export const AddFiltersBox = styled(Box)(() => ({
  float: "right",
  display: "flex",
  alignItems: "baseline",
  gap: DesktopPxToVw(10),
  marginBottom: DesktopPxToVw(40),
}))
export const AddFiltersText = styled(Typography)(() => ({
  letterSpacing: "0.1em",
  color: theme?.palette?.neuPalette?.hexTwo,
  textDecoration: "underline  1px",
  cursor: "pointer",
}))

export const FiltersInputBox = styled(Typography)(() => ({
  width: "100%",
  paddingTop: DesktopPxToVw(35),
}))

export const FilterSuggestionBox = styled(Typography)(() => ({
  display: "flex",
  gap: DesktopPxToVw(15),
  flexWrap: "wrap",
  paddingTop: DesktopPxToVw(15),
}))
export const SearchInput = styled(Input)(() => ({
  "& .MuiInput-input": {
    fontSize: DesktopPxToVw(24),
  },

  input: {
    "&::placeholder": {
      fontWeight: 300,
      opacity: 0.8,
      fontSize: DesktopPxToVw(24),
      color: theme?.palette?.neuPalette?.hexSeventeen,
    },
  },
}))
