import React from "react"
import { observer } from "mobx-react-lite"
import { Typography } from "@mui/material"
import DesktopPxToVw from "../../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../../utils/isMobilView"
import { ButtonsStack, MainStack, StyledButton } from "./styles/session-expiring-alert"

const SessionExpiryAlert = ({ handleModalClose, data, marginTop }: any) => {
  const isMobile = useMobileCheck()

  const getMarginTop = () => {
    if (marginTop && isMobile) {
      return `${(marginTop / 640) * 100 + 6.1}vw`
    } else return "auto"
  }

  return (
    <MainStack sx={{ height: marginTop ? `calc(50% - ${getMarginTop()})` : "auto" }}>
      {data?.title && (
        <Typography
          variant={isMobile ? "m-heading-s" : "heading-s"}
          sx={{ p: isMobile ? 0 : `0 ${DesktopPxToVw(30)}` }}>
          {data?.title}
        </Typography>
      )}
      {data?.subTitle && <Typography variant={isMobile ? "m-body-sl" : "body-ml"}>{data?.subTitle}</Typography>}
      <ButtonsStack>
        {data?.primaryAction && (
          <StyledButton onClick={handleModalClose} variant="light-contained">
            {data?.primaryAction}
          </StyledButton>
        )}
      </ButtonsStack>
    </MainStack>
  )
}

export default observer(SessionExpiryAlert)
