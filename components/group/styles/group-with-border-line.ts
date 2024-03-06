import { theme } from "../../../lib/theme"
import { Grid, styled } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"

export const GridContainer = styled(Grid)(() => ({
  rowGap: "3.125vw",
  padding: "2.86vw 6.97vw",
  justifyContent: "space-between"
}))
