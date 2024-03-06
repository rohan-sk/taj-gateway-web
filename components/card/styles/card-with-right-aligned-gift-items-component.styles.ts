import styled from "@emotion/styled"
import { theme } from "../../../lib/theme"
import { Box, Divider, Typography } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"

export const CardWrappingTotalContentBox = styled(
  Box,
  transientProps,
)<{ $padding: any; $isMobile: boolean }>(({ $padding, $isMobile }) => ({
  display: "flex",
  padding: $padding,
  gap: $isMobile ? "4.688vw" : "4.167vw",
  flexDirection: $isMobile ? "column" : "row",
  alignItems: $isMobile ? "center" : "flex-start",
}))

export const HorizontalDivider = styled(
  Divider,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  margin: $isMobile ? "3.125vw 0vw" : `1.042vw 0vw`,
  backgroundColor: theme?.palette?.ihclPalette?.hexTwelve,
}))

export const ParameterMapWithDescriptionWrappingBox = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  alignItems: "center",
  gap: $isMobile ? "1.094vw" : "0.365vw",
}))

export const ParameterMapKeyValueTypography = styled(Typography)(() => ({
  color: theme?.palette?.ihclPalette?.hexTwo,
  fontStyle: "normal",
  lineHeight: "140%",
}))
