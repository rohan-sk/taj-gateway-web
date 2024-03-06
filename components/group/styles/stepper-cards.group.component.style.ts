import { Box, Button, Divider, styled } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { theme } from "../../../lib/theme"
import { transientProps } from "../../../utils/transientProps"

const grayColor = theme?.palette?.ihclPalette?.hexSixteen
const goldColor = theme?.palette?.ihclPalette?.hexTwo

export const StepperConnector = styled(Divider)(() => ({
  height: "0.052vw",
  width: "1.5625vw",
  background: grayColor,

  "@media (max-width: 640px)": {
    width: "1.875vw",
    height: "0.15625vw",
  },
}))

export const StyledButton = styled(
  Button,
  transientProps,
)<{ $isSelected?: boolean }>(({ $isSelected }) => ({
  fontWeight: 400,
  height: "3.125vw",
  lineHeight: "140%",
  minWidth: "12.5vw",
  fontSize: "1.041vw",
  borderRadius: "2.083vw",
  fontFamily: theme?.palette?.font?.primaryFontFamily,
  letterSpacing: "-0.05em",
  padding: "0.99vw 2.083vw 0.98vw 2.083vw",
  color: $isSelected ? goldColor : theme?.palette?.ihclPalette?.hexSeventeen,
  border: $isSelected ? `0.10vw solid ${goldColor}` : `0.052vw solid ${grayColor}`,
  "&:hover": {
    color: $isSelected ? goldColor : theme?.palette?.ihclPalette?.hexSeventeen,
    border: $isSelected ? `0.10vw solid ${goldColor}` : `0.052vw solid ${grayColor}`,
  },
  "&.Mui-disabled": {
    color: theme?.palette?.ihclPalette?.hexSeventeen,
  },

  "@media (max-width: 640px)": {
    height: "9.53vw",
    lineHeight: "140%",
    minWidth: "37.96vw",
    fontSize: "3.125vw",
    whiteSpace: "nowrap",
    borderRadius: "9.375vw",
    padding: "2.96vw 6.25vw 2.1875vw 6.25vw",
  },
}))
