import React, { useState } from "react"
import { Box, Button } from "@mui/material"
import { BOOKING_CONSTANT } from "../constants"
import RedeemGiftCard from "./redeem-gift-card.component"

const RedeemMultipleGiftCards = () => {
  const [state, setState] = useState(false)

  return (
    <>
      {state && <RedeemGiftCard />}
      <Box
        onClick={() => {
          setState(true)
        }}>
        <Button
          variant="light-outlined"
          sx={{ fontWeight: 700, marginTop: "1.0416vw", width: "20vw" }}>
          {BOOKING_CONSTANT.ADD_ANOTHER_GIFT_CARD}
        </Button>
      </Box>
    </>
  )
}

export default RedeemMultipleGiftCards
