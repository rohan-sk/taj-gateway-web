import { Box } from "@mui/material"
import styled from "@emotion/styled"
import { transientProps } from "../../../utils/transientProps"

export const MainWrapper = styled(
  Box,
  transientProps
)<{ $parentProps: boolean; $even: boolean }>(({ $parentProps, $even }) => ({
  display: "flex",
  cursor: "pointer",
  alignItems: "center",
  transition: "transform 200ms",
  justifyContent: "center",
  height: $parentProps ? "13.021vw" : "",
  padding: $parentProps ? "" : $even ? "0vw 3vw 0vw 0vw" : "0vw 0vw 0vw 3vw",
  "&:hover": {
    transform: 'scale(1.15)',
  },
}))

export const ContentWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  position: "absolute",
  flexDirection: "column",
}))
