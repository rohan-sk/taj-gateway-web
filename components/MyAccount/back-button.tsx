import React from "react"
import { Typography } from "@mui/material"
import { BackButtonWrapper } from "./my-account.styles"
import { useMobileCheck } from "../../utils/isMobilView"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"

const BackButton = (props: any) => {
  const isMobile = useMobileCheck()
  return (
    <BackButtonWrapper
      onClick={() => {
        window?.history?.back(), props?.beforeChange && props?.beforeChange()
      }}>
      <ArrowBackIosIcon sx={{ fontSize: "small" }} />
      <Typography variant={isMobile ? "m-body-m" : "body-s"}>Back</Typography>
    </BackButtonWrapper>
  )
}

export default BackButton
