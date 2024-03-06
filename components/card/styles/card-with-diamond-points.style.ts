import { Box, Card, styled, Typography } from "@mui/material"
import { theme } from "../../../lib/theme"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw from "../../../utils/DesktopFontCalc"

export const ContentBox = styled(
  Box,
  transientProps,
)<{ $padding: string; $isMobile: boolean }>(({ $padding, $isMobile }) => ({
  width: $isMobile ? "85%" : "97%",
  background: theme?.palette?.ihclPalette?.hexOne,
  marginTop: DesktopPxToVw(-20),
  float: "right",
  display: "flex",
  position: "relative",
  alignSelf: "flex-end",
  flexDirection: "column",
  boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
  padding: $padding ? "1.82vw 1.56vw" : "2.083vw",
  marginBottom: DesktopPxToVw(20),
}))

export const ActionBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  // justifyContent: "space-between !important",
}))

export const DescriptionBox = styled(
  Box,
  transientProps,
)<{ $minHeight: boolean; $isMobile: boolean }>(({ $minHeight, $isMobile }) => ({
  top: "-24%",
  gap: "1.2vw",
  float: "right",
  display: "flex",
  minHeight: $minHeight ? "13.3vw" : "",
  position: "relative",
  alignSelf: "flex-end",
  flexDirection: "column",
  transform: "translateY(50%)",
  padding: "1.3vw 1.6vw 1.97vw 1.6vw",
  width: $isMobile ? "85%" : "90%",
  background: theme?.palette?.ihclPalette?.hexOne,
  boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
}))

export const CtaLabelBox = styled(Box)(() => ({
  display: "flex",
  cursor: "pointer",
  alignItems: "center",
}))

export const ImageCard = styled(Card)(() => ({
  "&.MuiCard-root": { borderRadius: "0" },
}))

export const DescriptionCard = styled(Typography)(() => ({
  // maxHeight: "4.68vw",
  marginTop: "0.62vw ",
}))

export const RichTextBox = styled(Typography)(() => ({
  display: "flex",
  marginTop: "0.55vw",
  alignItems: "center",
}))

export const PrimaryAndSecondaryActionBox = styled(Box)(() => ({
  display: "flex",
  gap: "1.04vw",
  alignItems: "center",
}))

export const ChipTextTextWrapBox = styled(Box)(() => ({
  display: "flex",
  gap: "0.833vw",
}))

export const ChipTextButtonBox = styled(Box)(() => ({
  padding: "0.313vw 0.833vw",
  border: `${DesktopPxToVw(1)} solid ${theme?.palette?.ihclPalette?.hexTwo}`,
}))

export const TitleChipTextWrapBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "space-between",
}))

export const TitleWithComma = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
}))

export const SubTitleBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "flex-start",
}))

export const ContentTextBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  fontSize: "0.94vw",
  gap: "0.3vw",
  "@media(max-width:640px)": {
    gap: "1.563vw",
  },
}))
