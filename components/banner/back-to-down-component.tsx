import React from "react"
import { Box } from "@mui/material"
import { ICONS } from "../constants"

const GoToDown = () => {
  const scrollDown = () => {
    window.scrollBy(0, 600)
  }

  return (
    <Box onClick={() => scrollDown()} sx={{ cursor: "pointer" }}>
      <Box
        alt={`scroll-to-top-icon`}
        width={"3.125vw"}
        height={"3.125vw"}
        component={"img"}
        src={ICONS?.SCROLL_DOWN}
        sx={{ marginTop: "2.86vw", objectFit: "contain" }}
      />
    </Box>
  )
}
export default GoToDown
