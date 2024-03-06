import { theme } from "../../lib/theme"
import { Checkbox, styled } from "@mui/material"

export const YellowBorderCheckbox = styled(Checkbox)({
  width: "1.354vw",
  height: "1.354vw",
  borderRadius: "unset",
  color: "transparent",
  "&.Mui-checked": {
    borderRadius: "unset",
    color: theme.palette.ihclPalette.hexTwo,
  },
  "& .MuiSvgIcon-root": {
    border: `0.05vw solid ${theme?.palette.ihclPalette.hexTwo}`,
  },
})
