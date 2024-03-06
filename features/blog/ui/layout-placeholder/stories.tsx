import React, { useContext } from "react"
import { Box } from "@mui/material"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"

function Stories(props: any) {
  const context = useContext(IHCLContext)
  const { cardMobileVariant, cardLargeVariant, heading, aesthetic, contentType, isMobileComponentFullWidth } = props

  return (
    <Box>
      {context?.renderComponent("card", {
        title: heading,
        variant: cardMobileVariant,
        largeVariant: cardLargeVariant,
        cardAesthetics: aesthetic,
        blogStoriesCardContentType: contentType,
        componentFullWidth: isMobileComponentFullWidth,
      })}
    </Box>
  )
}

export default Stories
