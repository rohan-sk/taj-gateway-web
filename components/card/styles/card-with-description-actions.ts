import styled from "@emotion/styled"
import { Card } from "@mui/material"
import { Box } from "@mui/system"
import { theme } from "../../../lib/theme"

export const CTAContentBox = styled(Box)(() => ({
  display: "flex",
  gap: "3%",
  justifyContent: "center",
  paddingBottom: "6%",
}))

export const CtaDescriptionBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "10.63vw",
  border: `0.05vw solid ${theme?.palette?.ihclPalette?.hexTwo}`,
  gap: "1.66vw",
}))

export const CardWithDescriptionCard = styled(Card)(() => ({
  "&.MuiCard-root": { borderRadius: "0", boxShadow: "none" },
  background: "transparent",
}))
