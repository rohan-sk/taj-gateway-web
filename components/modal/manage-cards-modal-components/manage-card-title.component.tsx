import { Typography } from "@mui/material"
import React from "react"
import { theme } from "../../../lib/theme"
import { TitleContainer } from "../styles/manage-card.styles"

const ManageCardTitleComponent = () => {
  return (
    <TitleContainer>
      <Typography variant="body-s">
        To view your card balance enter the 16 digit card number and the 6 digit
        security code (Pin) on the back of your gift card.
      </Typography>
    </TitleContainer>
  )
}

export default ManageCardTitleComponent
