import styled from "@emotion/styled"
import { Box, Divider, Paper, Typography } from "@mui/material"
import { theme } from "../../../lib/theme"
import DesktopPxToVw from "../../../utils/DesktopFontCalc"
import { transientProps } from "../../../utils/transientProps"
export const ContainerBox = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  position: "relative",
  // marginBottom: $isMobile ? "10vw" : "",
}))

export const StyledTestimonialPaper = styled(Paper)(() => ({
  width: "23.542vw",
  padding: "2.083vw",
  wordWrap: "break-word",
  boxShadow: "-6px 10px 24px 0px rgba(0, 0, 0, 0.1)",
  marginBottom:"40px",
  borderRadius: "0vw!important",
  backgroundColor: theme?.palette?.background?.default,
  "@media (max-width: 640px)": {
    width: "74.375vw",
    padding: "6.250vw 8.438vw",
  },
}))

export const AvatarContainer = styled(Box)(() => ({
  display: "flex",
  gap: "1.042vw",
  alignItems: "center",
  "@media (max-width: 640px)": { gap: "3.125vw" },
}))

export const DescriptionBox = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  right: 0,
  bottom: 0,
  transform: "translate(5.4%,-6%)",
  width: $isMobile ? "80%" : "95%",
  boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
  background: theme?.palette?.background?.default,
  padding: $isMobile ? "5.31vw 5.46vw" : "1.45vw  0.93vw 1.19vw",
}))
export const StyledDivider = styled(Divider)(() => ({
  margin: `${DesktopPxToVw(15)} 0vw`,
  backgroundColor: "#45443f73",
  "@media (max-width:640px)": {
    margin: "1.563vw 0px 3.125vw",
  },
}))

export const SmallTitle = styled(Typography)(() => ({
  color: "#45443F",
}))

export const PriceTitle = styled(Typography)(() => ({
  fontSize: DesktopPxToVw(22),
  color: theme?.palette?.neuPalette?.hexTwo,
}))
export const FlexBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}))
export const DescriptionContainer = styled(Box)(() => ({
  paddingLeft: DesktopPxToVw(65),
  width: "50%",
}))
export const ComponentBox = styled(Box)(() => ({
  display: "flex",
}))

export const HighlightsContentBox = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  right: 0,
  bottom: 0,
  transform: "translate(5.4%,-6%)",
  width: "95%",
  boxShadow: "-0.313vw 0.521vw 1.25vw rgba(0, 0, 0, 0.1)",
  background: theme?.palette?.background?.default,
  padding: $isMobile ? "5.31vw 5.46vw" : "1.45vw  0.93vw 1.19vw",
}))

export const ParameterMapDescriptionWrapperBox = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  gap: $isMobile ? "1.094vw" : "0.365vw",
  display: "flex",
  alignItems: "baseline",
}))
