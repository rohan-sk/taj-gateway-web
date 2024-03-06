import styled from "@emotion/styled"
import { Box } from "@mui/material"
import { theme } from "../../../lib/theme"
import DesktopPxToVw from "../../../utils/DesktopFontCalc"

export const NudgeContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "2.6vw",
  padding: "4.17vw 5.44vw ",
  border: `${DesktopPxToVw(1)} solid  ${theme?.palette?.ihclPalette?.hexTwo}`,
  "@media (max-width: 640px)": {
    gap: "8.594vw",
    flexDirection: "column",
    padding: "5.469vw 4.37vw",
  },
}))

export const TitleContentTypographyBox = styled(Box)(() => ({
  marginBottom: DesktopPxToVw(14),
  "@media (max-width: 640px)": {
    textAlign: "center",
    marginBottom: "2.188vw",
  },
}))

export const DescriptionContentTypographyBox = styled(Box)(() => ({
  marginBottom: DesktopPxToVw(20),
  "@media (max-width: 640px)": {
    textAlign: "center",
    marginBottom: "5.469vw",
  },
}))

export const PrimarySecondaryActionWrappingBox = styled(Box)(() => ({
  "@media (max-width: 640px)": {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}))
