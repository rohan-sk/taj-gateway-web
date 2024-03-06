import { theme } from "../../../lib/theme"
import { Box, styled, Typography, Select } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const ContentBox = styled(Box)(() => ({
  gap: "1.5vw",
  margin: "2.6vw 0",
  alignItems: "center",
  flexDirection: "column",
  display: "flex !important",
  justifyContent: "center",
}))

export const DescriptionTypo = styled(Typography)(() => ({
  textAlign: "center",
  margin: "0.521vw 0vw",
}))

export const StyledTitle = styled(
  Typography,
  transientProps
)<{ $mobile: boolean }>(({ $mobile }) => ({
  textAlign: "center",
  maxWidth: $mobile ? "20.313vw" : "100%",
  color: theme?.palette?.neuPalette?.hexSeventeen,
}))

export const DropdownItemText = styled(Typography)(() => ({
  width: "50%",
  display: "flex",
  height: "13.75vw",
  fontSize: "3.75vw",
  alignItems: "center",
  justifyContent: "center",
  color: theme?.palette?.neuPalette?.hexTwo,
  boxShadow: "2px 3px 15px 2px rgba(0, 0, 0, 0.1)",
}))

export const DropdownContentWrapper: any = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}))

export const DropdownSelectWrapper: any = styled(Select)(() => ({
  height: "13.75vw",
  fontSize: "3.75vw",
  boxShadow: "none",
  padding: "0px",
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
  "& .MuiSelect-iconOutlined": { display: "none" },
}))

export const StyledTypography = styled(Typography)(() => ({
  marginBottom: "5.469vw",
  marginTop: "1.563vw",
  fontSize: "3.750vw",
  fontFamily: theme?.palette?.font?.primaryFontFamily,
  lineHeight: "140%",
  letterSpacing: "-1.2px",
  textTransform: "uppercase",
  color: theme?.palette?.neuPalette?.hexSeventeen,
  fontWeight: 400,
}))

export const TabsMainContainer: any = styled(Box)(() => ({
  padding: "0 1.50vw",
  margin: "1.25vw 0vw 1.25vw 0vw",
  display: "flex !important",
  justifyContent: "center",
  "@media (max-width:640px)": {
    marginBottom: MobilePxToVw(24),
  },
}))
export const WeddingTabsMainContainer: any = styled(Box)(() => ({
  cursor: "pointer",
  padding: "0 1.50vw",
  alignItems: "center",
  flexDirection: "column",
  display: "flex",
  justifyContent: "center",
  "@media (max-width:640px)": {
    marginBottom: MobilePxToVw(24),
  },
}))
