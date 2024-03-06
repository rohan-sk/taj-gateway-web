import { Box, Button, Divider, Stack, Typography, styled } from "@mui/material"
import { theme } from "../../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { transientProps } from "../../../../utils/transientProps"

export const MainBox = styled(Box)(() => ({
  border: ` 1px solid ${theme?.palette?.ihclPalette?.hexTwelve}`,
  padding: "2.083vw",
  "@media (max-width: 640px)": {
    padding: MobilePxToVw(40),
  },
}))

export const ChangesDates = styled(Box)(() => ({
  display: "flex",
  borderBottom: `1px solid ${theme?.palette?.ihclPalette?.hexTwelve}`,
  paddingBottom: "1vw",
  paddingTop: "0.8vw",
  justifyContent: "space-between",
  "@media (max-width: 640px)": {
    paddingBottom: MobilePxToVw(20),
    paddingTop: MobilePxToVw(20),
  },
}))

export const StyledDivider = styled(Divider)(() => ({
  width: "1.563vw",
  display: "flex",
  alignSelf: "center",
  "@media (max-width: 640px)": {
    width: MobilePxToVw(20),
  },
}))

export const PriceTypography = styled(
  Typography,
  transientProps,
)<{ $isGreen?: boolean }>(({ $isGreen }) => ({
  lineHeight: "140%",
  color: $isGreen ? theme?.palette?.ihclPalette?.hexTwentyEight : theme?.palette?.ihclPalette?.hexTwo,
}))

export const ButtonWrapper = styled(Button)(() => ({
  width: DesktopPxToVw(293),
  height: DesktopPxToVw(61),
  "@media (max-width: 640px)": {
    width: MobilePxToVw(293),
    height: MobilePxToVw(61),
  },
}))

export const StyledRow = styled(Stack)(() => ({
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
  paddingBottom: DesktopPxToVw(14),
  marginTop: DesktopPxToVw(12),
  "@media (max-width: 640px)": {
    paddingBottom: MobilePxToVw(14),
    marginTop: MobilePxToVw(12),
  },
}))
