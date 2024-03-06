import styled from "@emotion/styled"
import { theme } from "../../../lib/theme"
import { SquareSharp } from "@mui/icons-material"
import { Box, Divider, ListItem, Typography } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const VideoBox = styled(Box)(() => ({
  height: "100%",
  position: "relative",
}))
export const CardStyledDivider = styled(Divider)(() => ({
  margin: 0.7,
  opacity: "0.4",
  width: "0.052vw",
  background: theme?.palette?.ihclPalette?.hexSeventeen,
}))

export const PlayPauseButtonBox = styled(Box)(() => ({
  top: "45%",
  left: "45%",
  display: "flex",
  width: "3.125vw",
  height: "3.125vw",
  cursor: "pointer",
  borderRadius: "50%",
  position: "absolute",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(19, 19, 15, 0.8)",
}))

export const CardContentParentBox = styled(
  Box,
  transientProps,
)<{ $title: string }>(({ $title }) => ({
  gap: "0.7vw",
  display: "flex",
  marginTop: $title != (null || undefined) ? "2.08vw" : "0vw",

  "@media (max-width: 640px)": {
    gap: "3.28vw",
    marginTop: "5.5vw",
  },
}))

export const CardContentChildrenBox = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: $isMobile ? MobilePxToVw(35) : DesktopPxToVw(40), // this gap is taken from global template for both web and M-site pages
}))

export const SubTitleBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "flex-start",
}))

export const InclusionTitle = styled(Typography)(() => ({
  fontWeight: 700,
  paddingTop: DesktopPxToVw(20),
  "@media (max-width:640px)": {
    paddingTop: MobilePxToVw(20),
  },
}))

export const ListItemBulletText = styled(ListItem)(() => ({
  display: "flex",
  alignItems: "flex-start",
  padding: `${DesktopPxToVw(5)} 0`,
  "@media (max-width:640px)": {
    padding: `${MobilePxToVw(10)} 0`,
  },
}))
export const BulletContainer = styled(Box)(() => ({
  minHeight: DesktopPxToVw(24),
  display: "flex",
  alignItems: "center",
  "@media(max-width:640px)": {
    minHeight: MobilePxToVw(24),
  },
}))
export const StyledDivider = styled(Divider)(() => ({
  height: "1%",
  width: "2.083vw",
  marginTop: "0.8vw",
  background: theme?.palette?.text?.primary,
  "@media (max-width: 640px)": {
    width: "6.56vw",
    marginTop: "2.16vw",
  },
}))

export const StyledBulletIcon = styled(SquareSharp)(() => ({
  color: theme?.palette?.ihclPalette?.hexTwo,
  width: "0.625vw",
  height: "0.625vw",
  marginRight: "0.45vw",
  transform: "rotate(45deg)",
  "@media (max-width: 640px)": {
    width: "1.875vw",
    height: "1.875vw",
    marginRight: "3.125vw",
  },
}))

export const DescriptionTypo = styled(Typography)(() => ({
  lineHeight: "140%",
  WebkitBoxOrient: "vertical",
  // minHeight: DesktopPxToVw(90),
}))

export const LocationTypo = styled(Typography)(() => ({
  color: "#AD8B3A",
  paddingLeft: DesktopPxToVw(5),
  fontWeight: 300,
  fontSize: "1.146vw",
  cursor: "pointer",
  "@media(max-width:640px)": {
    paddingLeft: MobilePxToVw(5),
    fontSize: MobilePxToVw(24),
  },
}))

export const ActionContentBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  "@media(max-width:640px)": {
    marginTop: "3.125vw",
  },
}))

export const RichTextValueTypography = styled(
  Typography,
  transientProps,
)<{
  $highlightColor?: boolean | undefined
}>(({ $highlightColor }) => ({
  fontWeight: $highlightColor ? "300" : "700",
  paddingLeft: "0.3vw",
  color: $highlightColor ? theme?.palette?.ihclPalette?.hexTwo : theme?.palette?.text?.primary,
  "@media (max-width: 640px)": {
    marginTop: "1vw",
    fontWeight: "300",
  },
}))

export const RichTextBox = styled(
  Box,
  transientProps,
)<{
  $maxLength?: boolean | undefined
}>(({ $maxLength }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  minHeight: $maxLength ? `${DesktopPxToVw(92)}` : `${DesktopPxToVw(40)}`,
}))

export const CenterFlexBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-start",
}))

export const ParameterMapWrappingContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}))
export const SpecificationsContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}))

export const HighLightsBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  marginTop: "0.521vw",
  "@media(max-width:640px)": {
    marginTop: "-2.15vw",
  },
}))

export const CenterBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
}))
