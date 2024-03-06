import React from "react"
import { Button, Typography } from "@mui/material"
import { useMobileCheck } from "../../../utils/isMobilView"
import { MainStack } from "./styles/no-rooms-available-at-payment-init"

const ErrorModal = ({ title, subTitle, primaryAction, actionHandler }: any) => {
  const isMobile = useMobileCheck()

  return (
    <MainStack>
      {title && <Typography variant={isMobile ? "m-heading-s" : "heading-s"}>{title?.toUpperCase()}</Typography>}
      <Typography variant={isMobile ? "m-body-sl" : "body-ml"} sx={{ maxWidth: isMobile ? "100%" : "85%" }}>
        {subTitle}
      </Typography>
      <Button variant="light-contained" onClick={actionHandler}>
        {primaryAction}
      </Button>
    </MainStack>
  )
}

export default ErrorModal
