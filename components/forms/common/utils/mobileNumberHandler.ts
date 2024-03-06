import phoneNumberVerifier from "../../../../utils/phone-number-verifier"

export const handleMobileNumber = (
  event: any,
  userCode: any,
  countryCode: any,
  setState: Function,
  key: string,
  setError: Function,
) => {
  const value = `${event?.target?.value || ""}`
  const length = value?.length
  const isVerified = !!value ? phoneNumberVerifier(userCode, Number(value)) : false
  if (countryCode === "+91") {
    length <= 10 && Number(value[0]) > 5
      ? setState((prev: any) => ({ ...prev, [key]: Math.max(0, parseInt(value)).toString().slice(0, 10) }))
      : length == 0 && setState((prev: any) => ({ ...prev, [key]: "" }))
  } else {
    length <= 14 && Number(value[0]) >= 0
      ? setState((prev: any) => ({ ...prev, [key]: value.toString().slice(0, 14) }))
      : length === 0 && setState((prev: any) => ({ ...prev, [key]: "" }))
  }
  setError((prev: any) => ({ ...prev, [key]: isVerified ? false : true }))
}
