import { Box } from "@mui/material"
import { styled } from "@mui/system"

export const AmountAndQtyBox = styled(Box)(() => ({
  gap: "1.927vw",
  display: "flex",
  alignItems: "unset",
  "@media (max-width: 640px)": {
    gap: "5.391vw",
  },
}))
