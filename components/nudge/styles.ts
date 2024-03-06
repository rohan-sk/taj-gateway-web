import styled from "@emotion/styled"
import { Grid } from "@mui/material"
import { theme } from "../../lib/theme"
import { Box, Checkbox } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { transientProps } from "../../utils/transientProps"

export const ParentGrid = styled(
  Grid,
  transientProps,
)(() => ({
  textAlign: "center",
  border: `${DesktopPxToVw(1)} solid  ${theme?.palette?.ihclPalette?.hexTwo}`,
  //demo purposes only
  padding: "2.167vw 0vw",
  "@media (max-width: 640px)": {
    padding: `0vw 0vw ${MobilePxToVw(40)}`,
  },
}))
export const MainBox = styled(Box)(() => ({
  padding: "7.56vw 0",
  alignItems: "center",
  justifyContent: "center",
}))
export const ContainerBox = styled(Box)(() => ({
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "white",
}))
export const CustomCheckBox = styled(Checkbox)(() => ({
  "& .MuiSvgIcon-root": { fontSize: 28 },
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  width: DesktopPxToVw(35),
  height: DesktopPxToVw(35),
  "&.Mui-checked": {
    color: theme?.palette?.ihclPalette?.hexTwo,
    width: DesktopPxToVw(35),
    height: DesktopPxToVw(35),
  },
}))

export const LinkRenderActionItemGrid = styled(Grid)(() => ({
  margin: "2% 0%",
  display: "flex",
  justifyContent: "center",
}))

export const MarginBox = styled(Box)(() => ({
  marginBottom: DesktopPxToVw(32),
}))

export const OutlineContainer = styled(
  Box,
  transientProps,
)<{ $isContent: boolean }>(({ $isContent }) => ({
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  border: `1px solid ${theme?.palette?.ihclPalette?.hexTwo}`,
  padding: $isContent ? "2.083vw 0vw 2.604vw" : "3.125vw 0vw",
  "@media (max-width:640px)": {
    padding: "6.25vw",
  },
}))

export const ContentCenterAligner = styled(Box)(() => ({
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  border: `1px solid ${theme?.palette?.ihclPalette?.hexTwo}`,
  padding: "2.083vw 0vw",
  "@media (max-width:640px)": {
    padding: "6.25vw",
  },
}))
export const ActionButtonsContainer = styled(
  Box,
  transientProps,
)<{ $marginTopRequired?: boolean }>(({ $marginTopRequired }) => ({
  marginTop: $marginTopRequired ? DesktopPxToVw(32) : 0,
  display: "flex",
  justifyContent: "center",
  gap: DesktopPxToVw(17),
  "@media (max-width:640px)": {
    flexDirection: "column",
    gap: MobilePxToVw(17),
    alignItems: "center",
    marginTop: $marginTopRequired ? MobilePxToVw(32) : 0,
  },
}))

export const CtaBoxContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  marginTop: DesktopPxToVw(40),
  "@media (max-width:640px)": {
    marginTop: MobilePxToVw(55),
  },
}))
