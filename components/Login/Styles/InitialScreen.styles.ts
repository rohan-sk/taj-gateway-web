import { Box, Grid, Typography, styled } from "@mui/material"
import { theme } from "../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { transientProps } from "../../../utils/transientProps"

export const MainGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  overflow: "auto",
  justifyContent: "center",
  alignItems: "center",
}))

export const CheckBoxWrapper = styled(
  Box,
  transientProps,
)<{ $error?: boolean }>(({ $error }) => ({
  display: "flex",
  justifyContent: "center",
  margin: $error ? "0.8vw 0vw 2.6vw 0vw" : "2.813vw 0vw 2.6vw 0vw",
  alignItems: "center",
  "@media (max-width: 640px)": {
    gap: "0.8vw",
    margin: "6vw 4.063vw 5.8VW 5vw",
    display: "flex",
    textAlign: "left",
  },
}))

export const CheckBoxContainer = styled(Box)(() => ({
  "@media (max-width: 640px)": {
    alignSelf: "flex-start",
  },
}))

export const TermsAndConditions = styled(Typography)(() => ({
  paddingLeft: "1vw",
  alignSelf: "center",
  "@media (max-width: 640px)": {
    textAlign: "left",
    paddingLeft: "2vw",
  },
}))

//FourCardGrid Styles

export const ImageBoxWrapper = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "auto auto",
  justifyContent: "center",
  "@media (max-width: 640px)": {
    display: "flex",
  },
}))

export const ContentWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "@media (max-width: 640px)": {
    width: "fit-content",
    alignItems: "start",
  },
}))

export const StyledTitle = styled(Typography)(() => ({
  lineHeight: "1.4vw",
  textAlign: "start",
  width: "14vw",
  margin: "0.677vw 0vw 1.4vw 0vw",
  alignSelf: "start",
  paddingLeft: "0.7vw",
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  "@media (max-width: 640px)": {
    lineHeight: "4vw",
    width: "34vw",
    paddingLeft: "0vw",
  },
}))

export const StyledCheckBox = styled(Box)(() => ({
  display: "flex",
  width: DesktopPxToVw(890),
  margin: "2vw 0vw",
  alignItems: "normal",
  "@media (max-width: 640px)": {
    width: "76vw",
    margin: "4vw 0vw 5.4vw 0vw",
    gap: "1vw",
  },
}))

export const StyledBox = styled(Box)(() => ({
  marginTop: "2vw",
  display: "flex",
  width: DesktopPxToVw(890),
  alignItems: "normal",
  "@media (max-width: 640px)": {
    width: "76vw",
    marginTop: "1.4vw",
    gap: "1vw",
  },
}))

export const ErrorMessages = styled(Typography)(() => ({
  color: theme?.palette?.ihclPalette?.hexThirtyTwo,
  fontWeight: 300,
  fontSize: DesktopPxToVw(18),
  paddingTop: "0.2vw",
  marginTop: "0vw",
  "@media (max-width: 640px)": {
    fontSize: MobilePxToVw(18),
    marginTop: "4.4vw",
  },
}))

export const TabsWrapper = styled(Grid)(() => ({
  backgroundColor: theme?.palette?.background?.default,
  // marginRight: "2vw",
}))

export const CheckboxWrapper = styled(Box)(() => ({
  width: "2vw",
  marginRight: "1.1vw",
  "@media (max-width: 640px)": {
    margin: "0vw 6vw 0vw 0vw",
  },
}))

export const ImageWrapper = styled(Grid)(() => ({
  display: "grid",
  gridTemplateColumns: "auto auto",
  justifyContent: "center",
  padding: "4vw 6vw",
  backgroundColor: theme?.palette?.background?.paper,
  margin: "5% 0%",
}))
