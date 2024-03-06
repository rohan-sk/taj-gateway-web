import { Box, styled } from "@mui/material"

export const MapContainer = styled(Box)(() => ({
  width: "75vw",
  height: "41.667vw",
  "&>div": {
    position: "static!important",
  },
  "@media (max-width:640px)": {
    width: "100vw",
    height: "100vh",
  },
}))
export const CenterAligner = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
}))
