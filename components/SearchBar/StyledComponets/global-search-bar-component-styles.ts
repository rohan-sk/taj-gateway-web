import styled from "@emotion/styled"
import { Box, Paper } from "@mui/material"
import { theme } from "../../../lib/theme"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw from "../../../utils/DesktopFontCalc"

export const GlobalSearchBarPaper: any = styled(Paper)(() => ({
  padding: "0vw",
  display: "flex",
  alignItems: "center",
  "&.MuiPaper-root": {
    borderRadius: "0vw",
    height: "3.6vw",
  },
}))

export const GlobalSearchBarSearchIconBox: any = styled(Box)(() => ({
  height: "1.25vw",
  width: "1.25vw",
  marginLeft: "1.35vw",
}))

export const GlobalSearchBarMicIconBox: any = styled(Box)(() => ({
  height: "1.4vw",
  width: "1.04vw",
  cursor: "pointer",
  marginRight: "1.35vw",
}))

export const SearchBackgroundBox: any = styled(
  Box,
  transientProps,
)<{ $background?: string }>(({ $background }) => ({
  height: "3.6vw",
  width: "3.6vw",
  cursor: "pointer",
  display: "grid",
  borderRadius: "100%",
  placeItems: "center",
  margin: "0 auto",
  background: $background ? $background : theme?.palette?.neuPalette?.hexTwo,
}))

export const SearchImageBox: any = styled(
  Box,
  transientProps,
)(() => ({
  maxWidth: DesktopPxToVw(28),
  maxHeight: DesktopPxToVw(28),
}))