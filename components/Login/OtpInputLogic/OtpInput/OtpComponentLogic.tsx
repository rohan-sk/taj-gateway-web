import OTPInput from "."
import { OtpBox, StyledBox } from "../../Styles/OtpStyled"
import { OtpComponentInterface } from "../../login-form.types"
import { OTP_FIELDS_LENGTH } from "../../../constants"

export const OtpComponentLogic = (props: OtpComponentInterface) => {
  const { setOtp, VerifyHandler, resendOtp } = props

  return (
    <StyledBox>
      <OtpBox component="form" sx={{ ...props?.sysprops }}>
        <OTPInput
          autoFocus
          isNumberInput
          length={OTP_FIELDS_LENGTH}
          onChangeOTP={(otp) => setOtp(otp)}
          VerifyHandler={VerifyHandler}
          resendOtp={resendOtp}
        />
      </OtpBox>
    </StyledBox>
  )
}
