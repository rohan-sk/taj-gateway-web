import { theme } from "../../../../lib/theme"
import { Box, TableCell, Typography, styled } from "@mui/material"
import DesktopPxToVw from "../../../../utils/DesktopFontCalc"

export const BorderBox = styled(Box)(() => ({
  padding: "2.19vw 1.563vw 2.708vw 1.563vw",
  border: `1px solid ${theme?.palette?.ihclPalette?.hexSixteen}`,
}))

export const FlexBox = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
}))

export const TableHeadCell = styled(TableCell)(() => ({
  padding: "0vw",
  paddingBottom: "1.042vw",
  borderBottom: `0.026vw solid ${theme?.palette?.ihclPalette?.hexSixteen}`,
}))

export const TableBodyCell = styled(TableCell)(() => ({
  padding: "0vw",
}))
export const HeroTableCell = styled(Typography)(() => ({
  backgroundColor: theme?.palette?.ihclPalette?.hexTwentyNine,
  width: "100%",
  display: "grid",
  minHeight: DesktopPxToVw(41),
  alignItems: "center",
}))
