import styled from "@emotion/styled"
import { Typography } from "@mui/material"
import { Box } from "@mui/system"

export const BoxContainer: any = styled(Box)(() => ({
  display: "flex",
  border: "1px solid #80807e",
  margin: "25px 0px",
}))

export const DescriptionBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}))

export const TitleTypography = styled(Typography)(() => ({
  color: "#fff",
  margin: "8px 0px",
  fontWeight: 300,
}))

export const TitleDescBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "0px 70px",
}))
