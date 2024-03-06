import { Box, styled } from "@mui/material"

export const GridBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  paddingTop: "0px",
  "@media (max-width: 640px)": {
    paddingTop: "20px",
  },
}))
