import { Box, styled, TextField, Typography } from "@mui/material"
import { theme } from "../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const InputBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  marginTop: "3.12vw",
  marginBottom: "2.18vw",
  alignItems: "self-end",
  width: "90%",
  "@media (max-width: 640px)": {
    width: "100%",
    margin: "8.59vw 0vw 7.81vw 0vw",
  },
}))
export const CheckBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: "2.23vw",
  alignItems: "center",
  "@media (max-width: 640px)": {
    marginBottom: "6.25vw",
    alignItems: "baseline",
  },
  "& .portableText span": {
    fontSize: `${DesktopPxToVw(18)} !important`,
    "@media (max-width: 640px)": {
      fontSize: `${MobilePxToVw(18)} !important`,
    },
  },
}))

export const TitleBox = styled(Box)(() => ({
  position: "absolute",
  bottom: "1.5vw",
  left: "0.625vw",
  "@media (max-width: 640px)": {
    bottom: "1vw",
    left: "1.406vw",
  },
}))

export const TitleTypo = styled(Typography)(() => ({
  position: "relative",
  bottom: "10vh",
  left: "6vw",
  color: theme?.palette?.ihclPalette?.hexOne,
}))
export const GridContainer: any = styled(Box)(() => ({
  textAlign: "center",
  position: "relative",
  marginBottom: "5vw",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  "@media (max-width: 640px)": {
    padding: "7.81vw 4.68vw",
    border: `1px solid ${theme?.palette?.ihclPalette?.hexTwo}`,
  },
}))

export const TitleTypography = styled(Typography)(() => ({
  textAlign: "center",
  color: theme?.palette?.text?.primary,
}))

export const MobileNumberField = styled(TextField)(() => ({
  width: "100%",
  "& .MuiInputBase-input": {
    paddingLeft: "1vw",
    fontSize: DesktopPxToVw(24),
    "@media (max-width: 640px)": {
      fontSize: "3.70vw",
      paddingLeft: "0vw",
    },
  },
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
  },
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: theme?.palette?.ihclPalette?.hexSeventeen,
      fontWeight: 300,
      opacity: 1,
    },
  },
}))

export const BoxComponent: any = styled(Box)(() => ({
  objectFit: "fill",
  position: "relative",
}))

export const StyledImageBox: any = styled(Box)(() => ({
  cursor: "pointer",
  objectFit: "cover",
  borderRadius: DesktopPxToVw(20),
  "@media (max-width: 640px)": {
    borderRadius: MobilePxToVw(16),
  },
}))

export const LoginBoxWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  "@media (max-width: 640px)": {
    padding: "7.81vw 4.68vw",
    border: `1px solid ${theme?.palette?.ihclPalette?.hexTwo}`,
  },
}))

export const TitleWrapper = styled(Box)(() => ({
  position: "absolute",
  maxWidth: "26.98vw",
  height: "100%",
  left: 0,
  padding: "3.125vw 2.604vw 2.083vw",
  color: theme?.palette?.ihclPalette?.hexTwentyNine,
  "@media (max-width: 640px)": {
    maxWidth: "85%",
    padding: "5.469vw 5.469vw 3.125vw",
  },
}))

export const SubTitleTypography = styled(Typography)(() => ({
  color: theme?.palette?.ihclPalette?.hexTwentyNine,
  fontWeight: 700,
  marginBottom: "0.521vw",
  "@media (max-width: 640px)": {
    marginBottom: "1.563vw",
  },
}))

export const DescriptionTypography = styled(Typography)(() => ({
  marginBottom: "1.56vw",
  display: "block",
  lineHeight: "150%",
  "@media (max-width: 640px)": {
    marginBottom: "5.469vw",
  },
}))

export const CarouselBoxWrapper = styled(Box)<{ $border: boolean }>(({ $border }) => ({
  border: $border ? `2px solid ${theme?.palette?.ihclPalette?.hexTwo}` : "none",
  padding: "0.52vw",
  borderRadius: DesktopPxToVw(26),
  "@media (max-width: 640px)": {
    borderRadius: MobilePxToVw(20),
  },
}))

export const CarouselTitle = styled(Typography)(() => ({
  marginTop: DesktopPxToVw(10),
  color: theme?.palette?.ihclPalette?.hexTwentyNine,
  letterSpacing: "-0.05em",
  "@media (max-width: 640px)": {
    marginTop: MobilePxToVw(10),
  },
}))

export const HighlightsTitle = styled(Typography)(() => ({
  color: theme?.palette?.ihclPalette?.hexTwentyNine,
  marginTop: DesktopPxToVw(10),
  "@media (max-width: 640px)": {
    marginTop: MobilePxToVw(7),
  },
}))

export const StyledTypography = styled(Typography)(() => ({
  paddingLeft: "0.66vw",
  color: theme?.palette?.ihclPalette?.hexTwentyNine,
}))
