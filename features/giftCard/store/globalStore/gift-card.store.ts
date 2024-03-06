import { makeAutoObservable, runInAction } from "mobx"
import { handler as createGCOrder } from "../../api/handlers/createGCOrder.service"
import { handler as GCFetchOrderAPI } from "../../api/handlers/gift-card-fetch-order.service"
import { gcConstants } from "../../../../components/forms/gift-card-form/constants"

import {
  giftCard,
  giftCardEmptyErrorFields,
  giftCardErrorFields,
  giftCardErrorPlaceholders,
} from "../../../../components/forms/gift-card-form/types"
export class GiftCardStore {
  giftCardDetails: any = {
    EGiftCardTheme: "",
  }

  reloadGcDetails: any = {
    orderId: "",
  }

  isFormValid: true | false = false
  giftCardAmount: number = 0
  data: any = []
  quantity: number = 0
  sku: any = ""
  GCThemeData: any = {}
  GCThemeBannerImage: any = {}
  countryCodes: any = {}
  createOrderLoading: boolean = false
  addToCartLoading: boolean = false
  addToCartData: any = {}
  isChecked: boolean = false
  isButtonDisabled: boolean = false
  isUserTouchedForm: boolean = false
  buyingJourneySteps: any = [
    {
      selected: true,
      completed: true,
    },
    {
      selected: true,
      completed: false,
    },
    {
      selected: false,
      completed: false,
    },
    {
      selected: false,
      completed: false,
    },
  ]
  cartDetails: any = {}

  errorMessages = {
    [gcConstants.amount]: "",
    [gcConstants.quantity]: "",
    [gcConstants.receiverFirstName]: "",
    [gcConstants.receiverLastName]: "",
    [gcConstants.receiverEmail]: "",
    [gcConstants.receiverMobile]: "",
    [gcConstants.additionalReceiverMobile]: "",
    [gcConstants.customMessage]: "",
    [gcConstants.smsSend]: "",
    [gcConstants.whatsappSend]: "",
    [gcConstants.senderFirstName]: "",
    [gcConstants.senderLastName]: "",
    [gcConstants.senderEmail]: "",
    [gcConstants.senderMobile]: "",
    [gcConstants.receiverAddress]: "",
    [gcConstants.senderAddress]: "",
    [gcConstants.receiverPinCode]: "",
    [gcConstants.receiverState]: "",
    [gcConstants.receiverCity]: "",
    [gcConstants.receiverCountry]: "",
    [gcConstants.senderPinCode]: "",
    [gcConstants.senderState]: "",
    [gcConstants.senderCity]: "",
    [gcConstants.senderCountry]: "",
    [gcConstants.sendEmail]: "",
    [gcConstants.sendSMSAndWhatsApp]: "",
  }

  formErrors = {
    [gcConstants.amount]: false,
    [gcConstants.quantity]: false,
    [gcConstants.receiverFirstName]: false,
    [gcConstants.receiverLastName]: false,
    [gcConstants.receiverEmail]: false,
    [gcConstants.receiverMobile]: false,
    [gcConstants.additionalReceiverMobile]: false,
    [gcConstants.customMessage]: false,
    [gcConstants.smsSend]: false,
    [gcConstants.whatsappSend]: false,
    [gcConstants.senderFirstName]: false,
    [gcConstants.senderLastName]: false,
    [gcConstants.senderEmail]: false,
    [gcConstants.senderMobile]: false,
    [gcConstants.receiverAddress]: false,
    [gcConstants.senderAddress]: false,
    [gcConstants.receiverPinCode]: false,
    [gcConstants.receiverState]: false,
    [gcConstants.receiverCity]: false,
    [gcConstants.receiverCountry]: false,
    [gcConstants.senderPinCode]: false,
    [gcConstants.senderState]: "",
    [gcConstants.senderCity]: "",
    [gcConstants.senderCountry]: "",
    [gcConstants.sendEmail]: false,
    [gcConstants.sendSMSAndWhatsApp]: false,
  }

  gcEmptyFormErrors = {
    [gcConstants.amount]: false,
    [gcConstants.quantity]: false,
    [gcConstants.receiverFirstName]: false,
    [gcConstants.receiverLastName]: false,
    [gcConstants.receiverEmail]: false,
    [gcConstants.receiverMobile]: false,
    [gcConstants.receiverCountry]: false,
    [gcConstants.receiverState]: false,
    [gcConstants.receiverCity]: false,
    [gcConstants.senderPinCode]: false,
    [gcConstants.senderState]: false,
    [gcConstants.senderCity]: false,
    [gcConstants.senderCountry]: false,
    [gcConstants.receiverAddress]: false,
    [gcConstants.senderAddress]: false,
    [gcConstants.receiverPinCode]: false,
    [gcConstants.customMessage]: false,
    [gcConstants.senderFirstName]: false,
    [gcConstants.senderLastName]: false,
    [gcConstants.senderEmail]: false,
    [gcConstants.senderMobile]: false,
  }

  formValues = {
    [gcConstants.amount]: "",
    [gcConstants.quantity]: "",
    [gcConstants.receiverFirstName]: "",
    [gcConstants.receiverLastName]: "",
    [gcConstants.receiverEmail]: "",
    [gcConstants.receiverMobile]: "",
    [gcConstants.additionalReceiverMobile]: "",
    [gcConstants.customMessage]: "",
    [gcConstants.smsSend]: false,
    [gcConstants.whatsappSend]: false,
    [gcConstants.senderFirstName]: "",
    [gcConstants.senderLastName]: "",
    [gcConstants.senderEmail]: "",
    [gcConstants.senderMobile]: "",
    [gcConstants.receiverAddress]: "",
    [gcConstants.senderAddress]: "",
    [gcConstants.receiverPinCode]: "",
    [gcConstants.receiverState]: "",
    [gcConstants.receiverCity]: "",
    [gcConstants.receiverCountry]: "India",
    [gcConstants.senderPinCode]: "",
    [gcConstants.senderState]: "",
    [gcConstants.senderCity]: "",
    [gcConstants.senderCountry]: "India",
    selfPurchase: false,
    [gcConstants.sendEmail]: true,
    [gcConstants.sendSMSAndWhatsApp]: false,
  }
  constructor() {
    makeAutoObservable(this)
  }

  updateEGiftCardTheme(theme: string) {
    runInAction(() => {
      this.giftCardDetails.EGiftCardTheme = theme
    })
  }

  updateTcCheck = async (isChecked: boolean) => {
    runInAction(() => {
      this.isChecked = isChecked
    })
  }
  updateIsButtonDisabled = async (isButtonDisabled: boolean) => {
    runInAction(() => {
      this.isButtonDisabled = isButtonDisabled
    })
  }

  updateReloadGcDetails(orderId: string) {
    runInAction(() => {
      this.reloadGcDetails.orderId = orderId
    })
  }
  updateIsUserTouchedForm = async (isUserTouchedForm: boolean) => {
    runInAction(() => {
      this.isUserTouchedForm = isUserTouchedForm
    })
  }
  updateFormValues = async ({
    amount,
    quantity,
    receiverFirstName,
    receiverLastName,
    receiverEmail,
    receiverMobile,
    additionalReceiverMobile,
    customMessage,
    smsSend = false,
    whatsappSend = false,
    senderFirstName,
    senderLastName,
    senderEmail,
    senderMobile,
    receiverAddress,
    senderAddress,
    receiverPinCode,
    receiverState,
    receiverCity,
    receiverCountry = "India",
    senderPinCode,
    senderState,
    senderCity,
    senderCountry = "India",
    selfPurchase,
    sendEmail = false,
    sendSMSAndWhatsApp = false,
  }: giftCard) => {
    runInAction(() => {
      this.formValues[gcConstants.amount] = amount
      this.formValues[gcConstants.quantity] = quantity ?? 0
      this.formValues[gcConstants.receiverFirstName] = receiverFirstName
      this.formValues[gcConstants.receiverLastName] = receiverLastName
      this.formValues[gcConstants.receiverEmail] = receiverEmail
      this.formValues[gcConstants.receiverMobile] = receiverMobile
      this.formValues[gcConstants.additionalReceiverMobile] = additionalReceiverMobile
      this.formValues[gcConstants.customMessage] = customMessage
      this.formValues[gcConstants.smsSend] = smsSend
      this.formValues[gcConstants.whatsappSend] = whatsappSend
      this.formValues[gcConstants.senderLastName] = senderLastName
      this.formValues[gcConstants.senderFirstName] = senderFirstName
      this.formValues[gcConstants.senderEmail] = senderEmail
      this.formValues[gcConstants.senderMobile] = senderMobile
      this.formValues[gcConstants.receiverAddress] = receiverAddress
      this.formValues[gcConstants.senderAddress] = senderAddress
      this.formValues[gcConstants.receiverPinCode] = receiverPinCode
      this.formValues[gcConstants.receiverCountry] = receiverCountry
      this.formValues[gcConstants.receiverState] = receiverState
      this.formValues[gcConstants.receiverCity] = receiverCity
      this.formValues[gcConstants.senderPinCode] = senderPinCode
      this.formValues[gcConstants.senderCountry] = senderCountry
      this.formValues[gcConstants.senderState] = senderState
      this.formValues[gcConstants.senderCity] = senderCity
      this.formValues.selfPurchase = selfPurchase
      this.formValues[gcConstants.sendEmail] = sendEmail
      this.formValues[gcConstants.sendSMSAndWhatsApp] = sendSMSAndWhatsApp
    })
  }
  updateAdditionalReceiverMobile = async (mobile: string) => {
    runInAction(() => {
      this.formValues[gcConstants.additionalReceiverMobile] = mobile
    })
  }

  updateGCEmptyFormErrors = async ({
    amount,
    quantity,
    receiverFirstName,
    receiverLastName,
    receiverEmail,
    receiverMobile,
    receiverCountry,
    receiverState,
    receiverCity,
    receiverAddress,
    senderAddress,
    receiverPinCode,
    customMessage,
    senderFirstName,
    senderLastName,
    senderEmail,
    senderMobile,
    senderPinCode,
  }: giftCardEmptyErrorFields) => {
    runInAction(() => {
      this.gcEmptyFormErrors[gcConstants.amount] = amount
      this.gcEmptyFormErrors[gcConstants.quantity] = quantity
      this.gcEmptyFormErrors[gcConstants.receiverFirstName] = receiverFirstName
      this.gcEmptyFormErrors[gcConstants.receiverLastName] = receiverLastName
      this.gcEmptyFormErrors[gcConstants.receiverEmail] = receiverEmail
      this.gcEmptyFormErrors[gcConstants.receiverMobile] = receiverMobile
      this.gcEmptyFormErrors[gcConstants.receiverCountry] = receiverCountry
      this.gcEmptyFormErrors[gcConstants.receiverState] = receiverState
      this.gcEmptyFormErrors[gcConstants.receiverCity] = receiverCity
      this.gcEmptyFormErrors[gcConstants.receiverAddress] = receiverAddress
      this.gcEmptyFormErrors[gcConstants.senderAddress] = senderAddress
      this.gcEmptyFormErrors[gcConstants.receiverPinCode] = receiverPinCode
      this.gcEmptyFormErrors[gcConstants.customMessage] = customMessage
      this.gcEmptyFormErrors[gcConstants.senderFirstName] = senderFirstName
      this.gcEmptyFormErrors[gcConstants.senderLastName] = senderLastName
      this.gcEmptyFormErrors[gcConstants.senderEmail] = senderEmail
      this.gcEmptyFormErrors[gcConstants.senderMobile] = senderMobile
      this.gcEmptyFormErrors[gcConstants.senderPinCode] = senderPinCode
    })
  }

  updateFormErrors = async ({
    amount,
    quantity,
    receiverFirstName,
    receiverLastName,
    receiverEmail,
    receiverMobile,
    additionalReceiverMobile,
    customMessage,
    smsSend,
    whatsappSend,
    senderFirstName,
    senderLastName,
    senderEmail,
    senderMobile,
    receiverAddress,
    senderAddress,
    receiverPinCode,
    senderPinCode,
    receiverCountry,
    sendEmail,
    sendSMSAndWhatsApp,
  }: giftCardErrorFields) => {
    runInAction(() => {
      this.formErrors[gcConstants.amount] = amount
      this.formErrors[gcConstants.quantity] = quantity
      this.formErrors[gcConstants.receiverFirstName] = receiverFirstName
      this.formErrors[gcConstants.receiverLastName] = receiverLastName
      this.formErrors[gcConstants.receiverEmail] = receiverEmail
      this.formErrors[gcConstants.receiverMobile] = receiverMobile
      this.formErrors[gcConstants.additionalReceiverMobile] = additionalReceiverMobile
      this.formErrors[gcConstants.customMessage] = customMessage
      this.formErrors[gcConstants.smsSend] = smsSend
      this.formErrors[gcConstants.whatsappSend] = whatsappSend
      this.formErrors[gcConstants.senderLastName] = senderLastName
      this.formErrors[gcConstants.senderFirstName] = senderFirstName
      this.formErrors[gcConstants.senderEmail] = senderEmail
      this.formErrors[gcConstants.senderMobile] = senderMobile
      this.formErrors[gcConstants.receiverAddress] = receiverAddress
      this.formErrors[gcConstants.senderAddress] = senderAddress
      this.formErrors[gcConstants.receiverPinCode] = receiverPinCode
      this.formErrors[gcConstants.senderPinCode] = senderPinCode
      this.formErrors[gcConstants.receiverCountry] = receiverCountry
      this.formErrors[gcConstants.sendEmail] = sendEmail
      this.formErrors[gcConstants.sendSMSAndWhatsApp] = sendSMSAndWhatsApp
    })
  }

  updateErrorMessage = async ({
    amount,
    quantity,
    receiverFirstName,
    receiverLastName,
    receiverEmail,
    receiverMobile,
    additionalReceiverMobile,
    customMessage,
    smsSend,
    whatsappSend,
    senderFirstName,
    senderLastName,
    senderEmail,
    senderMobile,
    receiverAddress,
    senderAddress,
    receiverPinCode,
    receiverCountry,
    sendEmail,
    sendSMSAndWhatsApp,
  }: giftCardErrorPlaceholders) => {
    runInAction(() => {
      this.errorMessages[gcConstants.amount] = amount
      this.errorMessages[gcConstants.quantity] = quantity
      this.errorMessages[gcConstants.receiverFirstName] = receiverFirstName
      this.errorMessages[gcConstants.receiverLastName] = receiverLastName
      this.errorMessages[gcConstants.receiverEmail] = receiverEmail
      this.errorMessages[gcConstants.receiverMobile] = receiverMobile
      this.errorMessages[gcConstants.additionalReceiverMobile] = additionalReceiverMobile
      this.errorMessages[gcConstants.customMessage] = customMessage
      this.errorMessages[gcConstants.smsSend] = smsSend
      this.errorMessages[gcConstants.whatsappSend] = whatsappSend
      this.errorMessages[gcConstants.senderLastName] = senderLastName
      this.errorMessages[gcConstants.senderFirstName] = senderFirstName
      this.errorMessages[gcConstants.senderEmail] = senderEmail
      this.errorMessages[gcConstants.senderMobile] = senderMobile
      this.errorMessages[gcConstants.receiverAddress] = receiverAddress
      this.errorMessages[gcConstants.senderAddress] = senderAddress
      this.errorMessages[gcConstants.receiverPinCode] = receiverPinCode
      this.errorMessages[gcConstants.receiverCountry] = receiverCountry
      this.errorMessages[gcConstants.sendEmail] = sendEmail
      this.errorMessages[gcConstants.sendSMSAndWhatsApp] = sendSMSAndWhatsApp
    })
  }

  updateGCFormDetails = async (
    isFormValid: boolean,
    formValues: any,
    giftCardAmount: number,
    giftQuantity: number,
    sku: string,
    receiverCountryCode: string,
    senderCountryCode: string,
    additionalReceiverCountryCode: string,
  ) => {
    runInAction(() => {
      this.isFormValid = isFormValid
      this.data = formValues
      this.giftCardAmount = giftCardAmount
      this.quantity = giftQuantity
      this.sku = sku
      this.countryCodes.receiverCountryCode = receiverCountryCode
      this.countryCodes.senderCountryCode = senderCountryCode
      this.countryCodes.additionalReceiverCountryCode = additionalReceiverCountryCode
    })
  }
  updateGCThemeData = async (theme: any) => {
    runInAction(() => {
      this.GCThemeData = theme
    })
  }

  updateBuyingJourneySteps = async (stepsObj: any) => {
    runInAction(() => {
      this.buyingJourneySteps = stepsObj
    })
  }

  updateGCThemeBanner = async (theme: any) => {
    runInAction(() => {
      this.GCThemeBannerImage = theme
    })
  }
  updateCartDetails = async (details: any) => {
    runInAction(() => {
      this.cartDetails = details
    })
  }
  resetGCFormDetails = () => {
    this.isFormValid = false
    this.data = []
    this.giftCardAmount = 0
  }
  resetGCFormErrors = async () => {
    runInAction(() => {
      this.formErrors[gcConstants.receiverFirstName] = false
      this.formErrors[gcConstants.receiverLastName] = false
      this.formErrors[gcConstants.receiverEmail] = false
      this.formErrors[gcConstants.receiverMobile] = false
      this.formErrors[gcConstants.customMessage] = false
      this.formErrors[gcConstants.smsSend] = false
      this.formErrors[gcConstants.whatsappSend] = false
      this.formErrors[gcConstants.senderFirstName] = false
      this.formErrors[gcConstants.senderLastName] = false
      this.formErrors[gcConstants.senderEmail] = false
      this.formErrors[gcConstants.senderMobile] = false
      this.formErrors[gcConstants.receiverAddress] = false
      this.formErrors[gcConstants.senderAddress] = false
      this.formErrors[gcConstants.receiverPinCode] = false
      this.formErrors[gcConstants.receiverState] = false
      this.formErrors[gcConstants.receiverCity] = false
      this.formErrors[gcConstants.receiverCountry] = false
      this.formErrors[gcConstants.sendEmail] = false
      this.formErrors[gcConstants.sendSMSAndWhatsApp] = false
    })
  }
  createGCOrder = async () => {
    try {
      this.createOrderLoading = true
      const response = await createGCOrder.CreateGCOrder()
      if (response?.status === 200) {
        window?.sessionStorage?.setItem("gcOrderId", response?.data?.orderId)
        this.createOrderLoading = false
        return response
      } else {
        this.createOrderLoading = false
        return { error: true, data: response }
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log("error")
    }
  }

  balanceEnquiry = async (payload: any) => {
    try {
      const response = await createGCOrder.GCBalanceEnquire(payload)
      if (response?.status === 200) {
        return response
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log("error")
    }
  }

  gcAddToCart = async (payload: any) => {
    try {
      this.addToCartLoading = true
      const response = await createGCOrder.addToCart(payload)
      if (response?.status === 200) {
        this.addToCartLoading = false
        this.cartDetails = response?.data
        return { error: false, data: response?.data }
      } else {
        this.addToCartLoading = false
        return { error: true, data: response?.data }
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log("error")
    }
  }

  gcFetchCart = async () => {
    try {
      const response = await createGCOrder.fetchCart()
      if (response?.status === 200) {
        this.addToCartLoading = false
        this.cartDetails = response?.data
        let details = response?.data
        ;(this.formValues[gcConstants.amount] = details?.items?.giftCardDetails?.[0]?.amount),
          (this.formValues[gcConstants.quantity] = details?.items?.quantity),
          (this.quantity = details?.items?.quantity),
          (this.formValues[gcConstants.receiverFirstName] = details?.items?.receiverDetails?.firstName),
          (this.formValues[gcConstants.receiverLastName] = details?.items?.receiverDetails?.lastName),
          (this.formValues[gcConstants.receiverEmail] = details?.items?.receiverDetails?.email),
          (this.formValues[gcConstants.receiverMobile] = details?.items?.receiverDetails?.phone?.split(" ")[1]),
          this.formValues[gcConstants.additionalReceiverMobile],
          (this.formValues[gcConstants.customMessage] = details?.items?.receiverDetails?.message),
          (this.formValues[gcConstants.senderFirstName] = details?.items?.senderDetails?.firstName),
          (this.formValues[gcConstants.senderLastName] = details?.items?.senderDetails?.lastName),
          (this.formValues[gcConstants.senderEmail] = details?.items?.senderDetails?.email),
          (this.formValues[gcConstants.senderMobile] = details?.items?.senderDetails?.phone?.split(" ")[1]),
          (this.formValues[gcConstants.receiverAddress] = details?.items?.receiverAddress?.addressLine1),
          (this.formValues[gcConstants.senderAddress] = details?.items?.senderAddress?.addressLine1),
          (this.formValues[gcConstants.receiverPinCode] = details?.items?.receiverAddress?.pinCode),
          (this.formValues[gcConstants.receiverState] = details?.items?.receiverAddress?.state),
          (this.formValues[gcConstants.receiverCity] = details?.items?.receiverAddress?.city),
          (this.formValues[gcConstants.receiverCountry] = details?.items?.receiverAddress?.country),
          (this.formValues[gcConstants.senderPinCode] = details?.items?.senderAddress?.pinCode),
          (this.formValues[gcConstants.senderState] = details?.items?.senderAddress?.state),
          (this.formValues[gcConstants.senderCity] = details?.items?.senderAddress?.city),
          (this.formValues[gcConstants.senderCountry] = details?.items?.senderAddress?.country),
          (this.formValues.selfPurchase = details?.items?.isMySelf),
          (this.formValues[gcConstants.sendEmail] = details?.items?.deliveryMethods?.email),
          (this.formValues[gcConstants.sendSMSAndWhatsApp] = details?.items?.deliveryMethods?.smsAndWhatsApp),
          (this.formValues[gcConstants.additionalReceiverMobile] =
            details?.items?.deliveryMethods?.phone?.split(" ")[1])
        return { error: false, data: response?.data }
      } else {
        return { error: true, data: response?.data }
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log("error")
    }
  }

  GCFetchOrderAPI = async (orderID: string | null) => {
    try {
      const response = await GCFetchOrderAPI.apiCall(orderID)
      return response
    } catch (error) {
      // eslint-disable-next-line
      console.log("error")
    }
  }
}

export default GiftCardStore
