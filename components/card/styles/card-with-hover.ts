import styled from "@emotion/styled"
import { Box, Grid } from "@mui/material"

export const ContentBox = styled(Box)(() => ({
  opacity: `${0.85} !important`,
  width: "100%",
  display: "flex",
  textAlign: "center",
  height: "100%",
  alignItems: "center",
  padding: "0vw 2.125vw",
  flexDirection: "column",
  justifyContent: "center",
}))

export const GridItem = styled(Grid)(() => ({
  height: "auto",
  display: "flex",
  cursor: "default",
  alignItems: "flex-end",
  justifyContent: "center",
  borderRight: "1px solid #FFFFFF",
}))

export const ActionItemBox = styled(Box)(() => ({
  display: "flex",
  marginTop: "1.25vw",
  alignItems: "center",
  cursor: "pointer",
}))
