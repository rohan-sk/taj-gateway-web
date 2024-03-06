import styled from "@emotion/styled"
import { Box } from "@mui/material"

export const ImageCarousalCardWithContentBox = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  gap: "6.5vw",
  alignItems: "center",
  "@media (max-width: 640px)": {
    flexDirection: "column",
    gap: "5.469vw",
  },
}))

export const MainGrid = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "1fr 44.948vw",
  columnGap: "6.458vw",
  alignItems: "center",
  "@media (max-width:640px)": {
    gridTemplateColumns: "100%",
    rowGap: "6.25vw",
  },
}))
