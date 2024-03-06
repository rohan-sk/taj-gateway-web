import { Box, styled } from "@mui/material"

export const VideoPlayerBox = styled(Box)(() => ({
  height: "41.40vw",
  position: "relative",
  padding: "0vw 12.5vw",

  "@media (max-width: 640px)": {
    padding: "0vw",
    height: "79.68vw",
  },
}))
