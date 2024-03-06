import React, { useState } from "react"
import { theme } from "../../../lib/theme"
import { BOOKING_CONSTANT } from "../constants"
import { useMobileCheck } from "../../../utils/isMobilView"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import TextfieldValidator from "../../../utils/validations/TextfieldValidator"
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined"
import { GCNumber, GCPin } from "../../../components/forms/gift-card-form/constants"
import { Box, Input, Button, IconButton, Typography, FormControl, InputAdornment } from "@mui/material"
import {
  RedeemBox,
  GetOtpButton,
  DefaultColor,
  InputsFieldBox,
  InputTextField,
  ColorTypography,
  InputsFieldVerify,
  RedeemAllTypography,
  InnerRoomAccordionDetail,
} from "../../../components/BookingFlow/styles/redeem-save"

const RedeemVoucher = () => {
  const isMobile = useMobileCheck()
  const { VERIFY, GET_OTP, remove, voucherNumber } = BOOKING_CONSTANT

  const [getOTP, seGetOTP] = useState<boolean>(false)
  const [enteredOTP, setEnteredOTP] = useState<any>()
  const [userBalance, setUserBalance] = useState<any>("0")
  const [verifiedOTP, setVerifiedOTP] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<Boolean>(false)
  const [formValues, setFormValues] = useState<any>({
    [GCNumber]: "",
    [GCPin]: "",
  })
  const [ErrorMessage, setErrorMessage] = useState<any>({
    [GCNumber]: "",
    [GCPin]: "",
  })
  const [formErrors, setFormErrors] = useState<any>({
    [GCNumber]: false,
    [GCPin]: false,
  })

  const formValidation = (isFormValid: any, id: any) => {
    setFormErrors({ ...formErrors, [id]: !isFormValid })
  }

  const handleShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  const handleChangeForm = (event: any) => {
    const { name, value } = event.target
    const { status, errorMsg, fieldName } = TextfieldValidator(name, value)
    setErrorMessage((prev: any) => {
      return {
        ...prev,
        [fieldName]: errorMsg,
      }
    })
    setFormValues((prev: any) => {
      return {
        ...prev,
        [name]: event?.target?.value,
      }
    })
    formValidation(status, name)
  }

  return (
    <>
      <InnerRoomAccordionDetail>
        {!verifiedOTP && (
          <InputsFieldBox $textFieldErrors={false}>
            <InputTextField
              name={GCNumber}
              variant="standard"
              placeholder={"0000 0000 0000 0000"}
              value={formValues.CardNumber}
              inputProps={{ maxLength: 16 }}
              onChange={(e) => handleChangeForm(e)}
              helperText={formErrors[GCNumber] && formValues[GCNumber].length < 16 && ErrorMessage[GCNumber]}
            />
            <FormControl variant="standard" sx={{ width: isMobile ? "22.188vw" : "9.37vw" }}>
              <Input
                name={GCPin}
                value={formValues.cardPin}
                inputProps={{ maxLength: 6 }}
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleShowPassword}
                      aria-label="toggle password visibility"
                      onMouseDown={handleMouseDownPassword}>
                      {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                }
                onChange={(e) => handleChangeForm(e)}
                error={formErrors[GCPin] && formValues[GCPin].length < 6 && ErrorMessage[GCPin]}
              />
            </FormControl>
            <GetOtpButton
              variant="light-contained"
              disabled={formErrors?.GCNumber === false && formErrors?.GCPin === false ? false : true}
              onClick={() => {
                alert("Implementation is in pending")
              }}>
              {GET_OTP}
            </GetOtpButton>
          </InputsFieldBox>
        )}
        {getOTP && !verifiedOTP && (
          <>
            <InputsFieldVerify>
              <Input
                sx={{ width: "12.70vw" }}
                placeholder={"Enter OTP"}
                inputProps={{ maxLength: 6 }}
                id="standard-adornment-password"
                onChange={(e) => setEnteredOTP(e?.target?.value)}
              />
              <Button
                variant="light-contained"
                onClick={() => {
                  setVerifiedOTP(true)
                }}
                sx={{ width: "7.65vw" }}
                disabled={enteredOTP?.length == 6 ? false : true}>
                {VERIFY}
              </Button>
            </InputsFieldVerify>
            <Box sx={{ marginTop: "1.04vw" }}>
              <Typography>Resend code in 30 secs</Typography>
            </Box>
          </>
        )}
      </InnerRoomAccordionDetail>
      {verifiedOTP && (
        <InnerRoomAccordionDetail>
          <RedeemBox>
            <DefaultColor variant="body-s">
              {voucherNumber} <b> {"000000000000000000"} </b> successfully applied
            </DefaultColor>
            <Typography
              variant="link-m"
              onClick={() => {
                alert("Need to implement the remove functionality")
              }}>
              {remove}
            </Typography>
          </RedeemBox>
          <RedeemBox
            sx={{
              padding: "1.04vw 1.30vw",
              background: theme?.palette?.ihclPalette?.hexEighteen,
            }}>
            <ColorTypography variant="body-ml">{"10% Discount applied"}</ColorTypography>
            <ColorTypography variant="body-ml">₹ {userBalance}</ColorTypography>
          </RedeemBox>
        </InnerRoomAccordionDetail>
      )}
    </>
  )
}

export default RedeemVoucher
