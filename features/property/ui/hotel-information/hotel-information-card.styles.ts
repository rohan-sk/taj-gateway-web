import { Box, Divider, Grid, Typography, styled } from "@mui/material"
import { theme } from "../../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"

export const ValueTypography = styled(Typography)(() => ({
  fontSize: "1.146vw",
  fontFamily: "supreme",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "140%",
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  "@media (max-width:640px)": {
    fontSize: "3.48vw",
  },
}))

export const IconCell = styled(Box)(() => ({
  flexGrow: "0",
  flexShrink: "0",
  width: "auto",
  height: "1.604vw",
  display: "flex",
  alignItems: "center",
  "@media (max-width:640px)": {
    width: "4.219vw",
    marginTop: "0vw",
    height: "4.813vw",
  },
}))

export const ItemTitleContainer = styled(Box)(() => ({
  width: "100%",
  marginBottom: "0.5vw",
  "@media (max-width:640px)": {
    marginBottom: "3.125vw",
  },
}))
export const ItemContainer = styled(Grid)(() => ({
  width: "100%",
  paddingBottom: "0.5vw",
  borderBottom: `1px solid ${theme?.palette?.ihclPalette?.hexFive}20`,
  "@media (max-width:640px)": {
    paddingBottom: "6.25vw",
  },
}))
export const SubGrid = styled(Grid)(() => ({
  paddingBottom: "0.729vw",
  borderBottom: `1px solid ${theme?.palette?.ihclPalette?.hexFive}20`,
  "@media (max-width:640px)": {
    // paddingBottom: "6.25vw",
    marginBottom: "4.668vw",
  },
}))
export const ItemTitleTypography = styled(Box)(() => ({
  fontSize: "0.729vw",
  color: theme?.palette?.ihclPalette?.hexTwelve,
  fontFamily: "supreme",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "150%",
  letterSpacing: "0.036vw",
  "@media (max-width:640px)": {
    fontSize: "2.5vw",
  },
}))
export const SeparatorWrapper = styled(Box)(() => ({
  paddingLeft: "calc(50% - 1px)",
  height: "100%",
}))
export const StyledSeparator = styled(Divider)(() => ({
  background: `${theme?.palette?.ihclPalette?.hexFive}20`,
  width: "1px",
}))

export const CenterGrid = styled(Grid)(() => ({
  border: `1px solid ${theme?.palette?.ihclPalette?.hexFive}20`,
  borderWidth: "0px  1px",
  "@media (max-width:640px)": {
    borderWidth: "0px",
  },
}))
export const ItemValueContainer = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  gap: "0.729vw",
  "@media (max-width:640px)": {
    gap: "1.875vw",
  },
}))
export const FullBox = styled(Box)(() => ({
  width: "100%",
}))
export const ValueCell = styled(Box)(() => ({
  flexGrow: 1,
  flexShrink: 1,
}))

export const PaddedGrid = styled(Grid)(() => ({
  paddingBottom: "0.729vw",
}))
