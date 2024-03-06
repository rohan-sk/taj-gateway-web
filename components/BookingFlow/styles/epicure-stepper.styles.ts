import styled from "@emotion/styled"
import { theme } from "../../../lib/theme"
import { Box, Button, Divider, Typography } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

const grayColor = theme?.palette?.neuPalette?.hexSixteen
const goldColor = theme?.palette?.neuPalette?.hexTwo

export const MainBox = styled(Box)(() => ({
  padding: "2.083vw 0vw",
  background: theme?.palette?.neuPalette?.linearGradientThree,
  display: "flex",
  justifyContent: "center",
  "@media (max-width: 640px)": {
    padding: "6.72vw 0vw 4.6875vw 0vw",
  },
}))

export const TitleBox = styled(Box)(() => ({
  gap: "1.56vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  alignContent: "flex-start",
  marginTop: DesktopPxToVw(72),
  "@media (max-width: 640px)": {
    marginTop: MobilePxToVw(30),
  },
}))
export const TitleWrapper = styled(TitleBox)(() => ({
  "@media (max-width: 640px)": {
    marginTop: MobilePxToVw(100),
  },
}))

export const TitleDivider = styled(Divider)(() => ({
  width: "3.125vw",
  height: "0.0525vw",
  background: theme?.palette?.text?.primary,

  "@media (max-width: 640px)": {
    width: "6.25vw",
    height: "0.15625vw",
  },
}))

export const TitleTypography = styled(Typography)(() => ({
  textAlign: "center",
  marginTop: "2.8125vw",
}))

export const StyledButton = styled(
  Button,
  transientProps
)<{ $isSelected?: boolean }>(({ $isSelected }) => ({
  fontWeight: 400,
  height: "3.125vw",
  lineHeight: "140%",
  fontSize: "1.041vw",
  borderRadius: "2.083vw",
  fontFamily: theme?.palette?.font?.primaryFontFamily,
  letterSpacing: "-0.05em",
  padding: "1.3vw 2.083vw 0.98vw 2.083vw",
  cursor: "initial",
  color: $isSelected ? goldColor : theme?.palette?.neuPalette?.hexSeventeen,
  border: $isSelected
    ? `0.10vw solid ${goldColor}`
    : `0.052vw solid ${grayColor}`,
  "&:hover": {
    color: $isSelected ? goldColor : theme?.palette?.neuPalette?.hexSeventeen,
    border: $isSelected
      ? `0.10vw solid ${goldColor}`
      : `0.052vw solid ${grayColor}`,
  },
  "&.Mui-disabled": {
    color: theme?.palette?.neuPalette?.hexSeventeen,
  },

  "@media (max-width: 640px)": {
    height: "9.53vw",
    lineHeight: "140%",
    fontSize: "3.125vw",
    whiteSpace: "nowrap",
    borderRadius: "9.375vw",
    padding: "2.96vw 6.25vw 2.1875vw 6.25vw",
  },
}))

export const StepperConnector = styled(Divider)(() => ({
  height: "0.052vw",
  width: "1.5625vw",
  background: grayColor,
  "@media (max-width: 640px)": {
    width: "1.875vw",
    height: "0.15625vw",
  },
}))
