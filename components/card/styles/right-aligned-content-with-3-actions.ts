import styled from "@emotion/styled"
import { SaveAlt } from "@mui/icons-material"
import { Box, Typography } from "@mui/material"
import { theme } from "../../../lib/theme"
import { transientProps } from "../../../utils/transientProps"

export interface isMobile {
  isMobile: boolean
}

export const ContentBox = styled(Box)(() => ({
  float: "right",
  display: "flex",
  minHeight: "10.82vw",
  position: "relative",
  alignSelf: "flex-end",
  flexDirection: "column",
  justifyContent: "space-evenly",
  boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
  width: "35.41vw",
  top: "-2.35vw",
  right: "-0.5px",
  background: theme?.palette?.neuPalette?.hexOne,
  padding: "1.563vw",
  "@media only screen and (max-width: 600px)": {
    width: "90%",
    top: "-6vw",
  },
}))

export const RichTextBox = styled(Box)(() => ({
  display: "flex",
  margin: "0.40vw 0vw 0.80vw 0vw",
  justifyContent: "space-between",
}))

export const ParentActionBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "space-between",
}))

export const InnerActionBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}))

export const DescriptionTypo = styled(Typography)(() => ({
  overflow: "hidden",
  marginTop: "0.9vw",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 3,
  display: "-webkit-box !important",
  color: theme?.palette?.text?.primary,
  "@media only screen and (max-width: 640px)": {
    WebkitLineClamp: 6,
  },
}))

export const BrochureSaveAlt = styled(
  SaveAlt,
  transientProps
)<{ $isMobile?: boolean }>(({ $isMobile }) => ({
  color: theme?.palette?.neuPalette?.hexTwo,
  height: $isMobile ? "3.125vw" : "1.04vw",
  width: $isMobile ? "3.125vw" : "1.04vw",
}))

export const ContentBoxActionWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  paddingTop: "1.146vw",
}))

export const ActionButtonsWrapperBox = styled(Box)(() => ({
  display: "flex",
  gap: "2.813vw",
}))
