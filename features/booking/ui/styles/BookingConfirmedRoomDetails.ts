import styled from "@emotion/styled"
import { theme } from "../../../../lib/theme"
import { Box, Divider, Stack, Typography } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { transientProps } from "../../../../utils/transientProps"

export const MainBox = styled(Box)(() => ({
  padding: "2.08vw",
  marginTop: DesktopPxToVw(25),
  border: `1px solid ${theme?.palette?.ihclPalette?.hexSixteen} `,

  "@media (max-width: 640px)": {
    margin: "9.375vw 0 0",
    padding: "6.250vw 5vw",
    border: `0.156vw solid ${theme?.palette?.ihclPalette?.hexSixteen} `,
  },
}))

export const StyledImage: any = styled(Box)(() => ({
  width: "18.23vw",
  height: "14.583vw",

  "@media (max-width: 640px)": {
    width: "74.375vw",
    height: "43.594vw",
    marginBottom: "6.250vw",
  },
}))

export const StatusBox = styled(Box)(() => ({
  display: "flex",
  margin: "1.04vw 0vw",
  justifyContent: "space-between",
  padding: "0.54vw 0.78vw 0.44vw 0.78vw",
  color: theme?.palette?.text?.primary,
  background: theme?.palette?.background?.paper,

  "@media (max-width: 640px)": {
    margin: "3.125vw 0vw",
    padding: "1.328vw 2.031vw 1.328vw 2.031vw",
  },
}))

export const BoldTypography = styled(Typography)(() => ({
  fontWeight: 700,
}))

export const DetailsBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  "@media (max-width: 640px)": {
    marginTop: "1.406vw",
    alignItems: "center",
  },
}))

export const PriceDetailsMainBox = styled(Box)(() => ({
  display: "flex",
  color: theme?.palette?.text?.primary,
  alignItems: "flex-end",
  "@media (max-width: 640px)": {
    flexDirection: "column-reverse",
    justifyContent: "center",
    alignItems: "center",
    rowGap: MobilePxToVw(35),
  },
}))

export const PriceDetailsBox = styled(Box)(() => ({
  gap: "8vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  "@media (max-width: 640px)": {
    marginBottom: "1.875vw",
  },
}))
export const PriceContainer = styled(Box)(() => ({
  gap: "8vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}))

export const FlexBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}))

export const ButtonsBox = styled(Box)(() => ({
  gap: "1.04vw",
  display: "flex",
  marginTop: "1.04vw",
  justifyContent: "flex-end",
  position: "relative",
  "@media (max-width: 640px)": {
    gap: "3.125vw",
    marginTop: "9.844vw",
    justifyContent: "center",
    flexWrap: "wrap",
  },
}))

export const DynamicText = styled(
  Typography,
  transientProps,
)<{ $isSmall: boolean; $isSmallSize?: boolean }>(({ $isSmall, $isSmallSize }) => ({
  fontWeight: $isSmall ? 300 : 700,
  whiteSpace: "nowrap",
  fontSize: $isSmall ? DesktopPxToVw(20) : $isSmallSize ? DesktopPxToVw(20) : DesktopPxToVw(22),
  "@media (max-width: 640px)": {
    fontSize: $isSmall ? MobilePxToVw(20) : $isSmallSize ? MobilePxToVw(20) : MobilePxToVw(22),
  },
}))

export const StyledDivider = styled(Divider)(() => ({
  height: "0.05vw",
  marginTop: "1.04vw",
  background: theme?.palette?.ihclPalette?.hexTwelve,

  "@media (max-width: 640px)": {
    marginTop: "0vw",
    height: "0.156vw",
    margin: "3.125vw 0vw",
  },
}))

export const ContentMainBox = styled(Box)(() => ({
  width: "100%",
  marginLeft: "2.08vw",
  color: theme?.palette?.text?.primary,
  "@media (max-width: 640px)": {
    marginLeft: "0vw",
  },
}))

export const LabelBoldTypography = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: "0.72vw",
  marginTop: "1.04vw",
  lineHeight: "1.02vw",
  fontFamily: "Inter",
  "@media (max-width: 640px)": {
    marginTop: MobilePxToVw(20),
    fontSize: "2.5vw",
    lineHeight: "140%",
  },
}))

export const PrintImage: any = styled(Box)(() => ({
  width: "1.145vw",
  height: "1.145vw",

  "@media (max-width: 640px)": {
    width: "3.438vw",
    height: "3.438vw",
  },
}))

export const ShareImage: any = styled(Box)(() => ({
  width: "1.145vw",
  height: "1.145vw",

  "@media (max-width: 640px)": {
    width: "4.063vw",
    height: "3.438vw",
  },
}))

export const TaxLabelStack = styled(Stack)(() => ({
  columnGap: "0.35vw",
  flexDirection: "row",
  alignItems: "center",
}))

export const ContentWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  backgroundColor: theme?.palette?.background?.default,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  width: $isMobile ? "100%" : DesktopPxToVw(946),
  height: $isMobile ? "100vh" : "unset",
  justifyContent: $isMobile ? "center" : "unset",
  textAlign: "center",
  margin: "0 auto",
  gap: $isMobile ? MobilePxToVw(40) : DesktopPxToVw(24),
  boxShadow: $isMobile ? "unset" : "-6px 10px 24px 0px rgba(0, 0, 0, 0.10)",
  padding: $isMobile ? `0vw ${MobilePxToVw(75)}` : `${DesktopPxToVw(80)} ${DesktopPxToVw(73)}`,
}))
