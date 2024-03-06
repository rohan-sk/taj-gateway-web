import { Select, styled, Typography } from "@mui/material"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import DesktopPxToVw, { MobilePxToVw } from "./DesktopFontCalc"
import { theme } from "../lib/theme"
import { transientProps } from "./transientProps"

export const CountryTitle = styled(Typography)(() => ({
  margin: "1vw 0.2vw 0.3vw 0.4vw",
  position: "relative",
  bottom: "0.4vw",
  "@media (max-width: 640px)": {
    fontSize: "3.750vw !important",
  },
}))
export const CustomSelect = styled(
  Select,
  transientProps,
)<{ $backgroundColorProp?: string }>(({ $backgroundColorProp }) => ({
  "@media (max-width: 640px)": {
    minWidth: "22vw",
    paddingBottom: "1.6vw",
    height: "6.5vw",
  },
  "&.Mui-disabled": {
    "&:before": {
      borderBottomStyle: "outset !important",
    },
  },
  "& .MuiSelect-select": {
    padding: "0px !important",
    backgroundColor: $backgroundColorProp ? $backgroundColorProp : theme?.palette?.ihclPalette?.hexOne,
    "&:focus": {
      backgroundColor: $backgroundColorProp ? $backgroundColorProp : theme?.palette?.background?.default,
    },
    "@media (max-width: 640px)": {
      display: "flex",
      alignItems: "center",
    },
  },
}))

export const CustomArrowIcon = styled(KeyboardArrowDownIcon)(() => ({
  position: "relative",
  top: "10px",
  transform: "translateY(-50%)",
  "@media (max-width: 640px)": {
    right: "36px",
    top: "12px",
  },
  "@media (max-width: 500px)": {
    right: "3px",
  },
}))
export const CountryCodeArrowIcon = styled(KeyboardArrowDownIcon)(() => ({
  cursor: "pointer",
  width: DesktopPxToVw(24),
  "@media (max-width:640px)": {
    width: MobilePxToVw(24),
  },
}))
