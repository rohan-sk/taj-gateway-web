import styled from "@emotion/styled"
import { Box } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw from "../../../utils/DesktopFontCalc"

export const TopGradientBox = styled(
  Box,
  transientProps
)<{ $gradientColor: string }>(({ $gradientColor }) => ({
  bottom: "50%",
  height: "50%",
  width: "100%",
  position: "absolute",
  background:
    $gradientColor ??
    "linear-gradient(180deg, rgba(0, 0, 0, 0.9) 30%, rgba(95, 95, 95, 0) 100%)",
}))
export const GradientBox = styled(
  Box,
  transientProps
)<{ $gradientColor: string }>(({ $gradientColor }) => ({
  top: "0px",
  height: "100%",
  width: "100%",
  position: "absolute",
  background:
    $gradientColor ??
    "linear-gradient(180deg, rgba(0, 0, 0, 0.9) 30%, rgba(95, 95, 95, 0) 100%)",
}))

export const BottomGradientBox = styled(
  Box,
  transientProps
)<{ $gradientColor: string }>(({ $gradientColor }) => ({
  top: "25%",
  height: "75%",
  width: "100%",
  position: "absolute",
  background:
    $gradientColor ??
    "linear-gradient(180deg, rgba(0, 0, 1, 0) 20%, rgba(0, 0, 0, 0.7) 100%)",
}))

export const ContentBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  padding: "0vw 7.448vw", // Global padding
  justifyContent: "center",
  gap: DesktopPxToVw(25),
  "@media(max-width: 600px)": {
    width: "100%",
    padding: "2%",
  },
}))

export const ActionItemBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  alignContent: "center",
}))
