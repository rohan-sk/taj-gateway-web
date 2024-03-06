import React from "react"
import { Box } from "@mui/material"
import { ScrollUpButtonBox, ScrollUpImageBox } from "./styles"
import { ICONS } from "../constants"

const BackToTopButton = () => {
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <ScrollUpButtonBox aria-label="top-btn" onClick={() => scrollUp()}>
      <ScrollUpImageBox>
        <Box
        loading="lazy"
          component="img"
          alt="back2top"
          src={ICONS?.UP_ARROW}
          sx={{
            width: "100%",
            height: "100%",
          }}
        />
      </ScrollUpImageBox>
    </ScrollUpButtonBox>
  )
}
export default BackToTopButton
