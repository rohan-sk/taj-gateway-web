import React, { useEffect, useState } from "react"
import { OtpTimer } from "../../OtpTimer"
import { Typography } from "@mui/material"
import { useMobileCheck } from "../../../../utils/isMobilView"
import {
  ERROR_MESSAGES,
  PLACEHOLDERS,
} from "../../../forms/gift-card-form/constants"

interface counterInterface {
  setOtpExpired: Function
  mobileTitle: string
  items: any
  activeCounter: boolean
  setActiveCounter: Function
  setOtpLink: Function
  reSetCounter: boolean
  setReSetCounter: Function
}

const MobileOtpTimer = ({
  setOtpExpired,
  mobileTitle,
  items,
  activeCounter,
  setActiveCounter,
  setOtpLink,
  reSetCounter,
  setReSetCounter,
}: counterInterface) => {
  const [counter, setCounter] = useState<number>(180)
  const isMobile = useMobileCheck()
  const finalValue = OtpTimer(counter)

  useEffect(() => {
    const timer: any =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000)
    return () => clearInterval(timer)
  }, [counter])

  useEffect(() => {
    if (counter === 0) {
      setActiveCounter(false)
      setOtpExpired(ERROR_MESSAGES?.OTP_EXPIRED)
    } else if (!activeCounter) {
      setCounter(180)
    } else {
      setOtpExpired("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter])

  useEffect(() => {
    if (counter < 120) {
      setOtpLink(true)
    }
    if (reSetCounter) {
      setCounter(180)
      setOtpLink(false)
      setReSetCounter(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter, reSetCounter])

  return (
    <Typography
      variant={isMobile ? "m-body-m" : "body-s"}
      sx={{
        margin: isMobile
          ? !mobileTitle
            ? "5vw 0vw 6vw 0vw"
            : "6vw 0vw 4vw 0vw"
          : "1vw 0vw 0.6vw 0vw",
      }}>
      {items?.description} &nbsp;
      {finalValue?.displayMins !== "00"
        ? `${finalValue?.displayMins} :  ${finalValue?.displaySecs}`
        : finalValue?.displaySecs}
      &nbsp;
      {PLACEHOLDERS?.SECS}
    </Typography>
  )
}

export default MobileOtpTimer
