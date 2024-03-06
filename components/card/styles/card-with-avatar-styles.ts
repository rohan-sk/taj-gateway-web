import { Box, styled } from "@mui/material"
import { theme } from "../../../lib/theme"
import { transientProps } from "../../../utils/transientProps"

export const MainBoxStyle = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  borderTop: `0.208vw solid ${theme?.palette?.ihclPalette?.hexTwo}`,
  borderBottom: `0.208vw solid ${theme?.palette?.ihclPalette?.hexTwo}`,
  borderLeft: $isMobile ? `0.104vw solid ${theme?.palette?.ihclPalette?.hexTwo}` : `none`,
  borderRight: $isMobile ? `0.104vw solid ${theme?.palette?.ihclPalette?.hexTwo}` : `none`,
  borderWidth: $isMobile ? "0.625vw 0.156vw" : "0.208vw 0.052vw 0.208vw 0.052vw",
  padding: $isMobile ? "18.75vw 8.828vw 9.375vw" : "6.25vw 2.943vw 3.125vw",
  backgroundColor: "white",
  textAlign: "center",
}))
export const QuoteBoxStyle = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  paddingTop: $isMobile ? "3.750vw" : "1.950vw",
}))
export const MainBox = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  width: $isMobile ? "70.93vw" : "23.64vw",
  backgrounColor: "lightgrey",
}))

export const TitleOneBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}))
