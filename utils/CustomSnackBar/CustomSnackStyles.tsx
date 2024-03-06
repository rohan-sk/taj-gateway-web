import { Box, Stack, Typography, Snackbar, styled } from "@mui/material"
import { theme } from "../../lib/theme"

export const SnackBarGrid = styled(Snackbar)<{
  topWeb: string
  topMob: string
  $position: any
  $width: any
}>(({ topWeb, topMob, $position }) => ({
  backgroundColor: theme?.palette?.ihclPalette?.hexTwentyTwo,
  position: $position,
  color: theme?.palette?.ihclPalette?.hexEighteen,
  width: "30vw",
  margin: "auto",
  top: `${topWeb} !important`,
  borderRadius: "0.4vw",
  "@media (max-width: 640px)": {
    top: `${topMob} !important`,
    width: "60vw",
    borderRadius: "1vw",
  },
}))

export const AlertBox = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  padding: "1vw",
  display: "flex",
  flexDirection: "row",
  boxShadow: "0pvw 0pvw 0.2vw",
  justifyContent: "space-between",
  alignItems: "center",
  color: theme?.palette?.ihclPalette?.hexOne,
  "@media (max-width: 640px)": {
    padding: "2vw",
  },
}))

export const ToastText = styled(Typography)(() => ({
  fontSize: "1.2vw",
  margin: "0px auto",
  "@media (max-width: 640px)": {
    fontSize: "3.750vw",
  },
}))

export const FlexBox = styled(Stack)(() => ({
  flexDirection: "row",
  alignItems: "center",
  columnGap: "10px",
  "@media (max-width: 640px)": {
    columnGap: "5px",
  },
}))
