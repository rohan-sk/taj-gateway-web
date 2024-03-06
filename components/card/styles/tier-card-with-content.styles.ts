import { Box, Grid, styled } from "@mui/material"

export const GridContainerWrapper = styled(Grid)(() => ({
  display: " flex",
  flexDirection: "column",
  margin: "5% 0%",
}))

export const GridItemWrapper = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: "2vw",
}))

export const StyledImage: any = styled(Box)(() => ({
  objectFit: "contain",
  width: "13vw",
  marginRight: "1vw",
}))

export const StyledGrid = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "space-between",
}))
