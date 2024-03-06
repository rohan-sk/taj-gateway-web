import {
  GSTNo,
  customMessage,
  pinCode,
  senderEmail,
  senderFirstName,
  senderMobile,
  amount,
  OnlyNumber,
  ERROR_MESSAGES,
  GCError,
  GCPinErr,
  addressError,
  cityError,
  CustomAmountRange,
  reloadAmountError,
  orderRefNumber,
  itineraryRefId,
  Expiry,
  onlyName,
  senderLastName,
} from "../../components/forms/gift-card-form/constants"
import {
  EmailFields,
  MobileFields,
  nameFields,
  PinCodeFields,
  GSTNoFields,
  memberShipID,
  GiftCardAmount,
  GiftCardNumber,
  GiftCardPin,
  Address,
  City,
  GCReloadBalance,
  UserName,
  TextArea,
  OrderId,
  ConfirmationNumber,
  ItineraryId,
  CompanyNameField,
  firstNameFields,
  lastNameFields,
} from "../Constants"

export const TextfieldValidator = (name: string, value: string, additionalInfo?: any) => {
  let status: boolean | null | RegExpMatchArray = false
  const firstNameCheck = firstNameFields.includes(name)
  const lastNameCheck = lastNameFields.includes(name)
  const namesCheck = nameFields.includes(name)
  const emailCheck = EmailFields.includes(name)
  const mobileCheck = MobileFields.includes(name)
  const userNameCheck = UserName?.includes(name)
  const address = Address.includes(name)
  const city = City.includes(name)
  const pinCodeCheck = PinCodeFields.includes(name)
  const GSTNumberFieldsCheck = GSTNoFields.includes(name)
  const memberShipNumber = memberShipID.includes(name)
  const GCAmount = GiftCardAmount.includes(name)
  const GCNumber = GiftCardNumber.includes(name)
  const GCPin = GiftCardPin.includes(name)
  const GCReloadAmount = GCReloadBalance.includes(name)
  const textArea = TextArea.includes(name)
  const OrderID = OrderId.includes(name)
  const ItineraryID = ItineraryId.includes(name)
  const CompanyName = CompanyNameField?.includes(name)

  let errorMsg: string | undefined = ""

  // the cases should be only boolean values

  switch (true) {
    case namesCheck:
      status = value.length > 0 && value.match(/^[a-zA-Z ]{0,50}$/)
      errorMsg = getErrorMessage(onlyName)
      break
    case firstNameCheck:
      status = value.length > 0 && value.match(/^[a-zA-Z ]{0,50}$/)
      errorMsg = getErrorMessage(senderFirstName)
      break
    case lastNameCheck:
      status = value.length > 0 && value.match(/^[a-zA-Z ]{0,50}$/)
      errorMsg = getErrorMessage(senderLastName)
      break
    case userNameCheck:
      status = value.length > 0 && value.match(/^[a-zA-Z ]{0,50}$/)
      errorMsg = getErrorMessage(senderFirstName)
      break
    case emailCheck:
      status = value.length > 3 && value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) //regex for email
      errorMsg = getErrorMessage(senderEmail)
      break
    case customMessage == name:
      if (additionalInfo?.charCount) {
        status = value.length >= 3 && value.match(/^[a-zA-Z ]{0,500}$/)
      } else {
        status = value.length >= 3 && value.match(/^[a-zA-Z ]{0,50}$/)
      }
      break
    case mobileCheck:
      if (additionalInfo?.countryCode === "+91") {
        const regex = /^[0]?[6789]\d{9}$/ //regex valid mobile number and for only numbers and Indian numbers starting from 6
        status = regex.test(value) && value.length === 10 && value.length <= 10
      } else {
        const regex = /^[0-9]+$/ //regex for only numbers
        status = regex.test(value)
      }
      errorMsg = getErrorMessage(senderMobile)
      break
    case pinCodeCheck:
      status = value.length === 6 && value.match(/^[0-9]*$/)
      errorMsg = getErrorMessage(pinCode)
      break
    case GSTNumberFieldsCheck:
      var regex = /^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/
      status = value.length > 0 ? regex.test(value) : true
      errorMsg = getErrorMessage(GSTNo)
      break
    case memberShipNumber:
      var regex = /^[A-Za-z0-9 ]+$/ //to test for special characters
      status = regex.test(value)
      errorMsg = getErrorMessage(GSTNo)
      break
    case GCAmount:
      if (additionalInfo?.customPricing) {
        status =
          Number(value) > 0 && Number(value) >= additionalInfo.minPrice && Number(value) <= additionalInfo.maxPrice
        errorMsg = getErrorMessage(CustomAmountRange, additionalInfo)
      }
      if (additionalInfo === "fromClaimCoins") {
        var regex = /^[0-9 ]+$/ //regex for only numbers and spaces
        status = regex.test(value)
        errorMsg = getErrorMessage("validAmount")
      } else {
        if (Number(value) > 0) {
          var regex = /^[0-9]+$/ //regex for only numbers
          status = regex.test(value)
          status = additionalInfo.minPrice <= Number(value) && Number(value) <= additionalInfo.maxPrice
          errorMsg = getErrorMessage(CustomAmountRange, additionalInfo)
        }
      }
      break
    case GCNumber:
      var regex = /^[0-9 ]+$/ //regex for only numbers and spaces
      status = regex.test(value) && value.length === 19
      errorMsg = getErrorMessage(GCError)
      break
    case address:
      var regex = /^[a-zA-Z0-9\s,'-\/]*$/
      status = regex.test(value) && value.length <= 280
      errorMsg = getErrorMessage(addressError)
      break
    case city:
      var regex = /^[a-zA-Z ]*$/ //regex for only alphabets
      status = regex.test(value)
      errorMsg = getErrorMessage(cityError)
      break
    case GCPin:
      status = value.length === 6
      errorMsg = getErrorMessage(GCPinErr)
      break
    case GCReloadAmount:
      status = Number(value) >= 500 && Number(value) <= 25000
      errorMsg = getErrorMessage(reloadAmountError)
      break
    case textArea:
      status = value.length > 0 ? value.length >= 3 && value.match(/^[a-zA-Z0-9 ]{0,500}$/) : true
      errorMsg = getErrorMessage(reloadAmountError)
      break
    case OrderID:
      var regex = /^[A-Za-z0-9 ]+$/ //to test for special characters
      status =
        additionalInfo === "fromClaimCoins"
          ? regex.test(value) && value.length <= 15 && value.length >= 9
          : value.length > 4
      errorMsg =
        additionalInfo === "fromClaimCoins" ? getErrorMessage(ConfirmationNumber) : getErrorMessage(orderRefNumber)
      break
    case ItineraryID:
      var regex = /^[a-zA-Z0-9\-]+$/ // regex to test alpha numeric excluding all special characters except "-"
      status = regex.test(value)
      errorMsg = getErrorMessage(itineraryRefId)
      break
    case CompanyName:
      var regex = /^[0-9A-Za-z\s]+$|^$/ // regex to test alpha numeric and white-space excluding all special characters except
      status = regex.test(value)
      errorMsg = getErrorMessage(senderFirstName)
      break
    case name === Expiry:
      status = value.length < 5
      errorMsg = getErrorMessage(Expiry)
      break
    default:
      break
  }
  return { status: !!status, errorMsg, fieldName: name }
}

const getErrorMessage = (name: string, additionalInfo?: any) => {
  switch (name) {
    case onlyName:
      return ERROR_MESSAGES?.ERROR_NAME
    case senderFirstName:
      return ERROR_MESSAGES?.FIRST_NAME
    case senderLastName:
      return ERROR_MESSAGES?.LAST_NAME
    case senderEmail:
      return ERROR_MESSAGES?.EMAIL
    case senderMobile:
      return ERROR_MESSAGES?.PHONE_NUMBER
    case pinCode:
      return ERROR_MESSAGES?.PIN_CODE
    case GSTNo:
      return ERROR_MESSAGES?.GST_NO
    case amount:
      return ERROR_MESSAGES?.AMOUNT_EXCEED_MESSAGE
    case OnlyNumber:
      return ERROR_MESSAGES?.ONLY_NUMBERS
    case GCError:
      return ERROR_MESSAGES?.GC_ERROR
    case GCPinErr:
      return ERROR_MESSAGES?.GC_PIN_ERROR
    case addressError:
      return ERROR_MESSAGES?.AddressError
    case cityError:
      return ERROR_MESSAGES?.cityError
    case CustomAmountRange:
      return additionalInfo.minPrice !== undefined && additionalInfo.maxPrice !== undefined
        ? `${ERROR_MESSAGES?.SELECT_AMOUNT_BETWEEN} ${additionalInfo.minPrice} to ${additionalInfo.maxPrice}`
        : ""
    case reloadAmountError:
      return ERROR_MESSAGES?.RELOAD_GC_AMOUNT
    case orderRefNumber:
      return ERROR_MESSAGES?.ORDER_ID_ERROR
    case ConfirmationNumber:
      return ERROR_MESSAGES?.VALID_CONFIRMATION_NUMBER
    case "validAmount":
      return ERROR_MESSAGES?.VALID_AMOUNT
    case itineraryRefId:
      return ERROR_MESSAGES?.ITINERARY_ID_ERROR
    case Expiry:
      return ERROR_MESSAGES?.Expiry
  }
}
export default TextfieldValidator
