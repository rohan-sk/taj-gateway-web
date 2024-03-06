import { theme } from "../../../lib/theme"
import ExpandMore from "@mui/icons-material/ExpandMore"
import { styled, Box, Grid, Button, Typography, Zoom } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { transientProps } from "../../../utils/transientProps"

export const LoadMoreActionBox = styled(Box)(() => ({
  display: "flex",
  cursor: "pointer",
}))

export const LoadMoreActionGrid = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "center",
}))

export const StyledExpandMoreButton = styled(Button, transientProps)<{ $color?: any }>(({ $color }) => ({
  "& .MuiButton-endIcon": { margin: 0, marginLeft: "1vw" },
  color: $color || theme?.palette?.neuPalette?.hexTwo
}))

export const StyledExpandMoreIcon = styled(ExpandMore, transientProps)<{ $color?: any }>(({ $color }) => ({
  width: "auto",
  height: "1.2vw",
  color: $color || theme?.palette?.neuPalette?.hexTwo,
}))

export const SearchDropDownBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "flex-end",
  flexDirection: "row",
  gap: "0.78vw",

  "@media (max-width: 640px)": {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: "8.06vw 0 14.06vw 0",
  },
}))

export const ImageTitleTypo = styled(Typography)(() => ({
  display: "flex",
  fontSize: "3.75vw",
  alignItems: "center",
  letterSpacing: "-0.05em",
  fontFamily: theme?.palette?.font?.primaryFontFamily,
  justifyContent: "center",
  margin: "3.91vw 0 6.87vw 0",
  color: theme?.palette?.primary?.main,
}))

export const BookingFlowGrid = styled(Grid)(() => ({
  justifyContent: "space-between",
  margin: `${DesktopPxToVw(60)} 0vw ${DesktopPxToVw(70)}`,

  "@media (max-width: 640px)": {
    margin: "0vw",
    justifyContent: "center",
  },
}))

export const ParameterMapWrappingBox = styled(Box)(() => ({
  display: "flex",
  paddingBottom: "3.125vw",
  flexDirection: "row",
  gap: "2.083vw",
}))

export const TextFieldWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  margin: "0vw 0vw 3.6vw 0vw",
  "@media(max-width:640px)": {
    margin: "-1vw 0vw 3.6vw 0vw",
  },
}))

export const TextFieldStyled = styled(Box)(() => ({
  margin: "0vw 0vw 4vw",
}))

export const parameterMapWrappingBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "end",
  height: "fit-content",
}))

export const MinHeightWrapper = styled(Box)(() => ({
  ".description": {
    minHeight: DesktopPxToVw(90),
  },
  "@media (max-width: 640px)": {
    ".description": {
      minHeight: "unset",
    },
  },
}))

export const GroupFilterWrappingBox = styled(Box)(() => ({
  display: "flex",
  paddingBottom: "3.125vw",
  flexDirection: "row",
  gap: "2.083vw",
  "@media(max-width:640px)": {
    paddingBottom: "8.594vw",
    justifyContent: "center",
    gap: "5.469vw",
  },
}))

export const LoadMoreActionButtonWrapper = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "center",
  marginTop: MobilePxToVw(57),
}))

export const AestheticContainer = styled(
  Box,
  transientProps
)<{ $padding?: any, $backgroundColor?: any }>(({ $padding, $backgroundColor }) => ({
  padding: $padding || 0,
  backgroundColor: $backgroundColor
}))

export const AestheticTypography = styled(Typography, transientProps)<{ $color?: any }>(({ $color = "" }) => ({
  color: $color
}))

export const ZoomInAnimationWrapper = styled(Zoom)(() => ({
  transitionDelay: "200ms"
}))

export const SearchFilterContainer = styled(Box, transientProps)<{ $filterAlignment: any }>(({ $filterAlignment = 'end' }) => ({
  width: "100%",
  display: 'flex',
  justifyContent: $filterAlignment,
  paddingBottom: "3.125vw",
  '@media (max-width:640px)': {
    paddingBottom: "8.594vw",
  }
}))