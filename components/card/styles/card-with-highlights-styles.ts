import styled from "@emotion/styled"
import { theme } from "../../../lib/theme"
import { Box, Typography } from "@mui/material"
import { SquareSharp } from "@mui/icons-material"

export const HighlightsBox = styled(Box)(() => ({
  gap: "0.57vw",
  display: "flex",
  "@media (max-width: 640px)": {
    gap: "3.125vw",
  },
}))

export const HighlightsDescriptionTypo = styled(Typography)(() => ({
  marginTop: "2.1vw",
  overflow: "hidden",
  WebkitLineClamp: 3,
  minHeight: "4.7vw",
  WebkitBoxOrient: "vertical",
  "@media (max-width: 640px)": {
    marginTop: "1.56vw ",
  },
}))

export const HighlightsStyledBulletIcon = styled(SquareSharp)(() => ({
  color: theme?.palette?.neuPalette?.hexTwo,
  width: "0.625vw",
  height: "0.625vw",
  marginRight: "0.45vw",
  transform: "rotate(45deg)",
  "@media (max-width: 640px)": {
    width: "1.875vw",
    height: "1.875vw",
    marginRight: "0vw",
  },
}))

export const HighlightsBulletIcon = styled(Box)(() => ({
  backgroundColor: theme?.palette?.neuPalette?.hexTwo,
  width: "0.417vw",
  height: "0.417vw",
  transform: "rotate(45deg)",
  "@media (max-width: 640px)": {
    width: "1.875vw",
    height: "1.875vw",
    marginRight: "0vw",
  },
}))

export const DescriptionContainer = styled(Box)(() => ({
  marginLeft: "0.867vw",
  "@media (max-width:640px)": {
    marginLeft: "5vw",
  },
}))

export const HighlightContainer = styled(Box)(() => ({
  display: "flex",
  gap: "0.45vw",
  alignItems: "center",
  "@media (max-width:640px)": {
    gap: "3.125vw",
  },
}))
