import { theme } from "../../../lib/theme"
import { styled, Box, Divider, Typography, Button } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"

export const ParentBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  marginBottom: "2.96vw",
  justifyContent: "space-between",

  "@media (max-width: 640px)": {
    marginBottom: "5.469vw", // padding took from global template
    flexDirection: "column",
    alignItems: "flex-start",
  },
}))

export const ContentBox = styled(Box)(() => ({
  gap: "2.083vw",
  display: "flex",
  alignItems: "center",

  "@media (max-width: 640px)": {
    flexDirection: "column",
    alignItems: "center",
    gap: "5.469vw", // padding took from global template for m-site
  },
}))

export const SocialContentSubTitleTypography = styled(Typography)(() => ({
  maxWidth: "45%",
  overflow: "hidden",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  color: theme?.palette?.text?.primary,

  "@media (max-width: 640px)": {
    maxWidth: "100%",
    overflow: "hidden",
    WebkitLineClamp: 3,
    lineHeight: "140%",
    textAlign: "center",
    display: "-webkit-box",
  },
}))

export const VerticalDivider = styled(Divider)(() => ({
  opacity: 0.4,
  height: "3vw",
  width: "0.055vw",
  alignSelf: "center",
  background: theme?.palette?.text?.primary,
}))

export const SubTitleText = styled(
  Typography,
  transientProps
)<{ $centerVariant: boolean }>(({ $centerVariant }) => ({
  textAlign: $centerVariant ? "center" : "left",
  marginTop: $centerVariant ? "0vw" : "2.8vw",
  fontSize: "1.146vw",
  "@media (max-width: 640px)": {
    fontSize: "3.438vw",
  },
}))

export const SocialContentPrimaryActionButton = styled(Button)(() => ({
  gap: "0.625vw",
  whiteSpace: "nowrap",
  letterSpacing: "0.1em",
  "&:hover": {
    color: theme?.palette?.neuPalette?.hexOne,
    background: theme?.palette?.neuPalette?.hexTwo,
  },

  "@media (max-width: 640px)": {
    margin: "auto",
    display: "flex",
    marginTop: "5vw",
    gap: "1.625vw",
  },
}))
