import { theme } from "../../../lib/theme"
import { ArrowBackIos } from "@mui/icons-material"
import { Box, styled, Typography } from "@mui/material"

export const TitleTypography = styled(Typography)(() => ({
  opacity: "0.4",
  fontSize: "7.81vw",
  whiteSpace: "nowrap",
  lineHeight: "9.35vw",
  color: theme?.palette?.neuPalette?.hexOne,

  "@media (max-width: 640px)": {
    lineHeight: "120%",
    fontSize: "23.43vw",
  },
}))

export const ContentBox404 = styled(Box)(() => ({
  top: "29% ",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  flexDirection: "column",

  "@media (max-width: 640px)": {
    top: "42.81vw",
  },
}))

export const PageNotFoundContainerBox = styled(Box)(() => ({
  display: "flex",
  position: "relative",
  justifyContent: "center",
}))

export const PageNotFoundSubTitleTypography = styled(Typography)(() => ({
  width: "30.31vw",
  lineHeight: "120%",
  textAlign: "center",
  color: theme?.palette?.neuPalette?.hexOne,

  "@media (max-width: 640px)": {
    width: "69.3vw",
    lineHeight: "110%",
  },
}))

export const BannerActionBox = styled(Box)(() => ({
  display: "flex",
  cursor: "pointer",
  flexDirection: "row",
  paddingTop: "1.71vw",
  alignItems: "center",

  "@media (max-width: 640px)": {
    paddingTop: "7.18vw",
  },
}))

export const ActionItemTypography = styled(Typography)(() => ({
  lineHeight: "140%",
  color: theme?.palette?.neuPalette?.hexOne,
}))

export const BackToHomePageArrowBackIos = styled(ArrowBackIos)(() => ({
  width: "auto",
  height: "0.78vw",
  color: theme?.palette?.neuPalette?.hexOne,

  "@media (max-width: 640px)": {
    height: "1.40vw",
  },
}))
