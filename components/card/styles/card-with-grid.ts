import { theme } from "../../../lib/theme"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { Box, CardMedia, Grid, styled, Stack, Typography } from "@mui/material"

export const MainGridWrapper = styled(Grid)(() => ({
  display: " flex",
  flexDirection: "column",
  margin: "2vw 0vw",
}))
export const MediaWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "end",
  width: "100%",
}))
export const GridWrapper = styled(Grid)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "23.438vw",
  padding: "1.563vw 0vw",
  "@media (max-width: 640px)": {
    width: "40vw",
    padding: "3.750vw 0vw",
  },
}))

export const CardMediaStyled: any = styled(CardMedia)(() => ({
  objectFit: "contain",
}))

export const GridTitleWrapper = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "1.563vw 0vw",
  "@media (max-width: 600px)": {
    padding: "3.750vw 0vw",
  },
}))

export const GridContentWrapper = styled(Grid)(() => ({
  textAlign: "left",
}))

export const LoadMoreWrapper = styled(Grid)(() => ({
  marginTop: DesktopPxToVw(21),
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
}))

export const GridChildContainer = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "self-end",
  marginTop:"3.854vw",
}))

export const BoxWrapper = styled(Stack)(() => ({
  flexDirection: "column",
  textAlign: "center",
  justifyContent: "center",
  width: "10.417vw",

  "@media (max-width:640px)": {
    width: "18.75vw",
  },
}))

export const DynamicStack = styled(
  Stack,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  margin: "0 auto",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  padding: $isMobile ? "2.656vw 3.375vw" : "0vw",
  border: $isMobile ? `2px solid ${theme.palette.neuPalette.hexTwo}` : "none",
  width: $isMobile ? "42.813vw" : "unset",
  whiteSpace: $isMobile ? "nowrap" : "normal",
}))

export const SingleRowGrid = styled(Box)(() => ({
  display: "grid",
  width: "100%",
  gridTemplateColumns: `1fr 10.417vw 10.417vw`,
  columnGap: "2.604vw",
  padding: "1.563vw 0vw",
  "@media (max-width:640px)": {
    gridTemplateColumns: `1fr 18.906vw 18.906vw`,
    padding: "3.75vw 0vw",
    columnGap: "2.5vw",
  },
}))

export const ButtonTypography = styled(Typography)(() => ({
  textDecoration: "underline",
  "@media (max-width:640px)": {
    textDecoration: "none",
    fontWeight: 700,
    letterSpacing: "0.281vw",
  },
}))

export const MainMediaWrapperContainer = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  zIndex: 1,
  position: "sticky",
  top: $isMobile ? MobilePxToVw(100) : DesktopPxToVw(90),
}))

export const MediaContent = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "end",
  backgroundColor: theme?.palette?.neuPalette?.hexOne,
  borderBottom: `2px solid ${theme.palette.neuPalette.hexTwo}`,
}))
