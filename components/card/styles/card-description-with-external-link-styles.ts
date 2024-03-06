import { Box } from "@mui/material"
import styled from "@emotion/styled"
import { theme } from "../../../lib/theme"
import { transientProps } from "../../../utils/transientProps"

export const MainContainer = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  gap: $isMobile ? "2.5vw" : "0.521vw",
  textAlign: "center",
  margin: $isMobile ? "0 12.812vw 4.688vw" : "",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  padding: $isMobile ? "4.375vw 11.875vw 6.094vw" : "1.458vw 6.406vw 1.823vw",
  backgroundColor: theme?.palette?.background?.paper,
}))
