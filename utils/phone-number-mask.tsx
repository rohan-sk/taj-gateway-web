const PhoneNumberMask = (phoneNumber: string) => {
  const maskedPhone =
    phoneNumber?.slice(0, 0) + " *** *** *" + Number(phoneNumber?.slice(7))
  return maskedPhone
}

export default PhoneNumberMask

export const maskNumbers = (inputNumber: any) => {
  const lastThreeDigits = inputNumber.slice(-3)
  const phoneNumber = inputNumber.slice(0, -3)
  const masked = phoneNumber
    .replace(/\d/g, "*")
    .replace(/(.{3})/g, "$1 ")
    .trim()
  return masked + lastThreeDigits
}

export const MaskedCardNumber = (cardNumber: any) => {
  const lastDigits = cardNumber.slice(-4)
  const maskedNumber = `${cardNumber.substring(0, 2)}-XXXX-XXXX-${lastDigits}`

  return maskedNumber
}
