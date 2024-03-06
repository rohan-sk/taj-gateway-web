import React from "react"
import { Box, Typography } from "@mui/material"
import { MainBox, TitleTypography } from "./styles/subscription-success-nudge"
import { useMobileCheck } from "../../utils/isMobilView"

type SubscriptionSuccessType = {
  title: string
  description: string
}

const SubscriptionSuccess = ({
  title,
  description,
}: SubscriptionSuccessType) => {
  const isMobile = useMobileCheck()
  return (
    <MainBox>
      <TitleTypography variant={isMobile ? "m-heading-m" : "heading-m"}>
        {title}
      </TitleTypography>
      <Typography
        variant={isMobile ? "m-body-l" : "body-m"}
        sx={{ lineHeight: "140%" }}
      >
        {description}
      </Typography>
    </MainBox>
  )
}

export default SubscriptionSuccess
