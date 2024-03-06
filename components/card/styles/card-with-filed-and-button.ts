import styled from "@emotion/styled"
import { Card, Divider, Box, Grid, Typography } from "@mui/material"
import { theme } from "../../../lib/theme"

export const BoxContainer: any = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
}))
export const ContentBox: any = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))
export const ButtonBox: any = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
}))
export const GridContainer = styled(Grid)(() => ({
  border: `1px solid ${theme?.palette?.ihclPalette?.hexEleven}`,
  margin: "auto",
  display: "grid",
  justifyItems: "center",
  background: theme?.palette?.background?.paper,
}))
export const CustomDivider = styled(Divider)(() => ({
  height: "0.8vw",
  width: "4.16vw",
  background: theme?.palette?.text?.primary,
}))
