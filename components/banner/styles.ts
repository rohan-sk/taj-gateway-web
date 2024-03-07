import styled from "@emotion/styled"
import { theme } from "../../lib/theme"
import { transientProps } from "../../utils/transientProps"
import { Box, Divider, InputBase, TextField, Typography, Button } from "@mui/material"
import DesktopPxToVw from "../../utils/DesktopFontCalc"

export const PointerBox = styled(Box)(() => ({
  pointerEvents: "none",
}))
export const TopGradientBox = styled(
  Box,
  transientProps,
)<{ $gradient?: any }>(({ $gradient }) => ({
  top: "0",
  width: "100%",
  height: "34%",
  position: "absolute",
  pointerEvents: "none",
  background: $gradient ? $gradient : "unset",
  "@media (max-width: 640px)": {
    pointerEvents: "none",
  },
}))

export const BottomGradientBox = styled(
  Box,
  transientProps,
)<{ $isIos?: boolean; $gradient?: any }>(({ $isIos, $gradient }) => ({
  bottom: "0vw",
  width: "100%",
  height: "66%",
  position: "absolute",
  pointerEvents: "none",
  background: $isIos ? "" : $gradient ? $gradient : "unset",
  "@media (max-width: 640px)": {
    pointerEvents: "none",
  },
}))
export const TextFieldBox = styled(TextField)(() => ({
  flex: 1,
  minWidth: "17vw",
  color: theme?.palette?.text?.primary,
  padding: "0px 30px",
  fontSize: "1.55vw",
}))

export const TypographyStyle = styled(Typography)(() => ({
  fontSize: "1.25vw",
  cursor: "pointer",
  fontFamily: "supreme",
  color: theme?.palette?.text?.primary,
}))

export const StyledDivider = styled(Divider)(() => ({
  margin: 0.7,
  width: "1px",
  opacity: "0.4",
  background: theme?.palette?.text?.primary,
}))

export const DateBox = styled(Box)(() => ({
  ml: 1,
  flex: 1,
  display: "flex",
  minWidth: "14vw",
  cursor: "pointer",
  alignItems: "center",
  justifyContent: "center",
}))

export const DateBoxDivider = styled(Divider)(() => ({
  opacity: 0.5,
  width: "1.56vw",
  margin: "0vw 0.73vw",
  background: theme?.palette?.text?.primary,
}))

export const VolumeControlButtonBox = styled(Box)(() => ({
  padding: "1%",
  color: theme?.palette?.ihclPalette?.hexOne,
  opacity: "0.7",
  display: "flex",
  width: "3.125vw",
  height: "3.125vw",
  cursor: "pointer",
  borderRadius: "50%",
  alignItems: "center",
  backgroundColor: theme?.palette?.ihclPalette?.hexEleven,
  justifyContent: "center",
}))

export const BottomItemsBox = styled(Box)(() => ({
  bottom: "2.1vw",
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  position: "absolute",
}))

export const SearchIconParentBox = styled(Box)(() => ({
  margin: "0 auto",
}))

export const ContentBox = styled(
  Box,
  transientProps,
)<{ $searchFieldIsNotAllowed?: boolean }>(({ $searchFieldIsNotAllowed }) => ({
  width: "100%",
  position: "absolute",
  padding: "0vw 12.5vw",
  alignItems: "flex-end",
  bottom: $searchFieldIsNotAllowed ? "3.35vw" : "8.83vw",
}))

export const FocusTitleBox = styled(Box)(() => ({
  gap: "5%",
  display: "flex",
  alignItems: "center",
}))

export const TitleDivider = styled(Divider)(() => ({
  height: "1px",
  width: "4.16vw",
  backgroundColor: theme?.palette?.ihclPalette?.hexOne,
}))
export const TitleTypo = styled(
  Typography,
  transientProps,
)<{ $isTwoRowTitle: boolean }>(({ $isTwoRowTitle }) => ({
  width: $isTwoRowTitle ? "43%" : "100%",
  alignItems: "flex-start",
  fontFamily: theme?.palette?.font?.primaryFontFamily,
  textAlign: "left",
  color: theme?.palette?.ihclPalette?.hexOne,
  fontSize: "3.23vw",
  lineHeight: "120%",
  fontWeight: "400",
  letterSpacing: "-0.05em",
  "&:before": {
    content: '""',
    borderBottom: "1px solid #fff",
    display: "inline-block",
    width: "80px",
    verticalAlign: "middle",
  },
  ":not(:empty)::before ": {
    marginRight: "35px",
  },
}))
export const TitleTypography = styled(Typography)(() => ({
  color: theme?.palette?.ihclPalette?.hexOne,
  lineHeight: "120%",
  whiteSpace: "nowrap",
}))
export const SearchText = styled(Typography)(() => ({
  color: theme?.palette?.ihclPalette?.hexOne,
  lineHeight: "120%",
  padding: "1vw 0vw 0vw 7.5vw",
  "@media (max-width: 649px)": {
    //fix for demo need to update later
    padding: "1vw 0vw 0vw 15.5vw",
  },
}))
export const BannerActionBox = styled(Box)(() => ({
  display: "flex",
  cursor: "pointer",
  flexDirection: "row",
  paddingTop: "1.71vw",
  alignItems: "center",
}))

export const MUIStyledDivider = styled(Divider)(() => ({
  alignItems: "center",
  width: DesktopPxToVw(25),
  margin: "0px 0px",
  background: theme?.palette?.primary?.main,
  opacity: 0.5,
  position: "relative",
  right: "0.5vw",
  bottom: "5px",
  "@media (max-width: 1600px)": {
    right: "0vw",
  },
}))

export const LocalizationProviderBox = styled(Box)(() => ({
  display: "flex",
  cursor: "pointer",
  alignItems: "center",
  minWidth: `15.185vw`,
  justifyContent: "space-around",
}))

export const GlobalSearchPlaceHolderInputBase = styled(InputBase)(() => ({
  marginLeft: "0.41vw",
  flex: 1,
  color: theme?.palette?.text?.primary,
  fontSize: "1.25vw",
  input: {
    cursor: "pointer",
    "&::placeholder": {
      opacity: 1,
    },
  },
}))

export const SelectCountryTypography = styled(Typography)(() => ({
  fontSize: "0.93vw",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
}))

export const ReserveNowButtonAndContentWrapper = styled(Box)(() => ({
  display: "flex",
  marginLeft: "6.25vw",
  marginTop: "30px",
}))

export const HeroBannerButtonStyled = styled(Button)(() => ({
  height: "3.68vw",
  minWidth: "9.55vw",
  fontSize: "0.93vw",
}))

export const ReserveNowButton = styled(HeroBannerButtonStyled)(() => ({}))
export const BookNowButton = styled(HeroBannerButtonStyled)(() => ({
  borderRadius: "10em",
}))

export const StyledInputBase = styled(InputBase)(() => ({
  flex: 1,
  input: {
    cursor: "pointer",
    marginLeft: "0.67vw",
    fontSize: DesktopPxToVw(24),
    "&::placeholder": {
      color: theme?.palette?.ihclPalette?.hexSeventeen,
      opacity: 1,
    },
  },
  "& .MuiInputBase-input.Mui-disabled": {
    fontWeight: 300,
    fontSize: "1.25vw",
    lineHeight: "150%",
    fontFamily: "supreme",
    WebkitTextFillColor: theme?.palette?.text?.primary,
  },
}))
export const BannerTitleLargeLogoWrappingBox = styled(
  Box,
  transientProps,
)<{ $isNormalVariant: boolean }>(({ $isNormalVariant }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: $isNormalVariant ? "center" : "space-between",
  alignItems: "flex-end",
}))
