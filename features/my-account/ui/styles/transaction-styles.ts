import { theme } from "../../../../lib/theme"
import { InputLabel, Select, styled } from "@mui/material"

export const FilterSelect = styled(Select)(() => ({
  width: "12vw",
  fontWeight: 300,
  marginRight: "2vw",
  fontSize: "0.938vw",
  fontFamily: "Inter",
}))

export const StyledInputLabel = styled(InputLabel)(() => ({
  fontWeight: 300,
  fontSize: "0.938vw",
  color: theme?.palette?.ihclPalette?.hexEleven,
}))
