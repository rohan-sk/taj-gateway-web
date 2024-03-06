import { theme } from "../../../lib/theme"
import { styled, Box, Divider, Tab, Tabs } from "@mui/material"

export const MainBox = styled(Box)(() => ({
  width: "100%",
  position: "relative",
}))

export const StyledTab = styled(Tab)(() => ({
  padding: "0vw",
  fontWeight: "300",
  lineHeight: "150%",
  fontSize: "0.9375vw",
  fontFamily: "Inter",
  textTransform: "uppercase",
  color: theme?.palette?.text?.primary,
  minWidth: "auto",
}))

export const StyledTabs = styled(Tabs)(() => ({
  minHeight: "unset",
  "& .MuiTab-root.Mui-selected": {
    color: theme?.palette?.neuPalette?.hexTwo,
  },
  "& .MuiTabs-flexContainer": {
    padding: "1.4583vw 0.3vw 1.3021vw 0vw",
    alignItems: "center",
    justifyContent: "center",
  },
  "& button": {
    lineHeight: "100%",
    minHeight: "unset",
  },
}))

export const StyledDivider = styled(Divider)(() => ({
  bottom: 0,
  width: "100%",
  height: "0.11vw",
  position: "absolute",
  backgroundColor: theme?.palette?.neuPalette?.rgbaOne,
  // color:`${theme?.palette?.neuPalette?.hexSeventeen}20`
}))
