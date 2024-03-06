import React, { useContext, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { OtpTimer } from "../Login/OtpTimer"
import { Box, Typography } from "@mui/material"
import { GLOBAL_STORES } from "../../utils/Constants"
import { useMobileCheck } from "../../utils/isMobilView"
import { PLACEHOLDERS } from "../forms/gift-card-form/constants"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import BookingFlowGlobalStore from "../../features/booking/store/globalStore/booking.flow.store"

const TimeCounter = ({ count, render }: any) => {
  const [counter, setCounter] = useState<number>(count || 60)

  const isMobile = useMobileCheck()
  const timerCount = OtpTimer(counter)
  const context: any = useContext(IHCLContext)

  const bookingFlowGlobalStore = context?.getGlobalStore(
    GLOBAL_STORES?.bookingFlowStore
  ) as BookingFlowGlobalStore

  useEffect(() => {
    if (render) {
      let timer: any
      if (counter > 0) {
        timer = setInterval(() => setCounter(counter - 1), 1000)
        bookingFlowGlobalStore?.setTimeRemaining(counter)
      } else {
        bookingFlowGlobalStore?.timeRemaining !== 0 &&
          bookingFlowGlobalStore?.setTimeRemaining(0)
      }
      return () => clearInterval(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter, render])

  return (
    <Box sx={{ marginBottom: isMobile ? "4vw" : "1.042vw" }}>
      <Typography variant={isMobile ? "m-body-s" : "body-s"}>
        {PLACEHOLDERS?.TIMER_VAL} &nbsp;
        <b>{`${timerCount?.displayMins}:${timerCount?.displaySecs}`}</b>
      </Typography>
    </Box>
  )
}

export default observer(TimeCounter)
