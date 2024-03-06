import { theme } from "../../../lib/theme"
import { transientProps } from "../../../utils/transientProps"
import { Box, Divider, Stack, Typography, styled } from "@mui/material"

export const MainStack = styled(
  Stack,
  transientProps
)<{ $verticalImage: boolean; $leftMedia: boolean; $bgColor: string }>(
  ({ $verticalImage, $leftMedia, $bgColor }) => ({
    alignItems: "center",
    justifyContent: "center",
    background: $bgColor ?? $bgColor,
    gap: $verticalImage ? "4.167vw" : "2.083vw",
    flexDirection: $leftMedia ? "row-reverse" : "row",
  })
)

export const StyledImage: any = styled(
  Box,
  transientProps
)<{ $verticalImage: boolean }>(({ $verticalImage }) => ({
  height: "100%",
  objectFit: "fill",
  width: $verticalImage ? "30.208vw" : "36.458vw",
}))

export const ImageStack = styled(
  Box,
  transientProps
)<{ $leftMedia: boolean }>(({ $leftMedia }) => ({
  display: "flex",
  flexDirection: $leftMedia ? "row-reverse" : "row",
}))

export const DividerStack = styled(
  Stack,
  transientProps
)<{ $leftMedia: boolean }>(({ $leftMedia }) => ({
  alignItems: "center",
  flexDirection: $leftMedia ? "row-reverse" : "row",
}))

export const StyledLine: any = styled(
  Divider,
  transientProps
)<{ $verticalImage: boolean; $fontColor: string }>(({ $verticalImage, $fontColor }) => ({
  height: "0.104vw",
  width: $verticalImage ? "8.854vw" : "4.688vw ",
  background: $fontColor ?? theme?.palette?.text?.primary,
}))

export const DividerBullet = styled(
  Box,
  transientProps
)<{ $fontColor: string }>(({ $fontColor }) => ({
  width: "1.031vw",
  height: "1.031vw",
  transform: "rotate(45deg)",
  background: $fontColor ?? theme?.palette?.text?.primary,
}))

export const DescriptionTypography: any = styled(
  Typography,
  transientProps
)<{ $fontColor: string }>(({ $fontColor }) => ({
  marginTop: "1.042vw",
  color: $fontColor ?? theme?.palette?.text?.primary,
}))
