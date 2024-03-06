import styled from "@emotion/styled"
import { theme } from "../../../lib/theme"
import { Box, Button, Divider } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"

export const MainBox = styled(
  Box,
  transientProps
)<{ $padding: string; $bgColor: string }>(({ $padding, $bgColor }) => ({
  padding: $padding,
  background: $bgColor,
  display: "flex",
  textAlign: "center",
  alignItems: "center",
  flexDirection: "column",
}))

export const TitleBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
}))

export const StyledButton = styled(Button)(() => ({
  marginTop: "6.250vw",
  height: "10.938vw !important",
}))

export const ImageBox: any = styled(Box)(() => ({
  objectFit: "contain",
  marginTop: "8.594vw",
}))

export const TitleDivider: any = styled(Divider)(() => ({
  width: "6.25vw",
  height: "0.156vw",
  background: theme?.palette?.text?.primary,
}))
