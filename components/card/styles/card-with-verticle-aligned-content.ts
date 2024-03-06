import styled from "@emotion/styled"
import { Box, Card, Typography } from "@mui/material"

export const ImageCard = styled(Card)(() => ({
  "&.MuiCard-root": { borderRadius: "0" },
}))

export const DescriptionCard = styled(Typography)(() => ({
  maxHeight: "4.68vw",
}))

export const ActionBox = styled(Box)(() => ({
  width: "100%",
  marginTop: "2.083vw",
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "space-between",
  "@media (max-width: 640px)": {
    marginTop: "5.46vw",
    flexDirection: "row-reverse",
    justifyContent: "center",
  },
}))

export const PrimaryAndSecondaryActionBox = styled(Box)(() => ({
  display: "flex",
  gap: "1.04vw",
  alignItems: "center",
}))

export const CtaLabelBox = styled(Box)(() => ({
  display: "flex",
  cursor: "pointer",
  alignItems: "center",
}))
