import styled from "@emotion/styled"
import { theme } from "../../../lib/theme"
import { Box, Typography } from "@mui/material"

export const NavigationWithTwoContentBox = styled(Box)(() => ({
  bottom: 0,
  gap: "2.344vw",
  display: "flex",
  position: "fixed",
  padding: "2.813vw 5.781vw 2.656vw 5.938vw",
  backgroundColor: theme?.palette?.ihclPalette?.hexOne,
}))

export const NavigationFirstActionContentBox = styled(Box)(() => ({
  display: "flex",
  width: "51.25vw",
  height: "10.156vw",
  justifyContent: "center",
  padding: "2.813vw 0vw 2.656vw",
  color: theme?.palette?.ihclPalette?.hexTwo,
  border: `1px solid ${theme?.palette?.ihclPalette?.hexTwo}`,
}))

export const ActionButtonTitleTypography = styled(Typography)(() => ({
  fontWeight: 700,
  lineHeight: "150%",
  fontStyle: "normal",
  letterSpacing: "0.1em",
}))

export const NavigationSecondActionContentBox = styled(Box)(() => ({
  display: "flex",
  width: "34.688vw",
  height: "10.156vw",
  justifyContent: "center",
  padding: "2.813vw 0vw 2.656vw",
  color: theme?.palette?.ihclPalette?.hexOne,
  backgroundColor: theme?.palette?.ihclPalette?.hexTwo,
}))
