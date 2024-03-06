import { Box, Divider } from "@mui/material"
import React from "react"
import { theme } from "../../lib/theme"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { useMobileCheck } from "../../utils/isMobilView"

const DividerComponent = (props: any) => {
  const { cardPadding, cardBackgroundColor } = useAesthetics(
    props?.aesthetic?._ref
  )
  const isMobile = useMobileCheck()
  return (
    <Box
      aria-label="divider-component"
      className="divider"
      sx={{
        background: cardBackgroundColor,
        padding: cardPadding
          ? isMobile
            ? cardPadding?.mobile
            : cardPadding?.desktop
          : "0",
      }}>
      <Divider
        sx={{
          width: props?.isFullWidth ? "100%" : "18vw",
          borderColor: props?.color?.hex
            ? props?.color?.hex
            : theme?.palette?.text?.primary,
        }}
      />
    </Box>
  )
}

export default DividerComponent
