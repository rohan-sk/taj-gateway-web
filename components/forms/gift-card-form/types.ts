export type giftCard = {
  amount: string
  quantity: string
  receiverFirstName: string
  receiverLastName: string
  receiverEmail: string
  receiverMobile: string
  additionalReceiverMobile: string
  customMessage: string
  smsSend: boolean
  whatsappSend: boolean
  senderFirstName: string
  senderLastName: string
  senderEmail: string
  senderMobile: string
  receiverAddress: string
  senderAddress: string
  receiverPinCode: string
  receiverState: string
  receiverCity: string
  receiverCountry: string
  senderPinCode: string
  senderState: string
  senderCity: string
  senderCountry: string
  selfPurchase: boolean
  sendEmail: boolean
  sendSMSAndWhatsApp: boolean
}

export type giftCardErrorFields = {
  amount: boolean
  quantity: boolean
  receiverFirstName: boolean
  receiverLastName: boolean
  receiverEmail: boolean
  receiverMobile: boolean
  additionalReceiverMobile: boolean
  customMessage: boolean
  smsSend: boolean
  whatsappSend: boolean
  senderFirstName: boolean
  senderLastName: boolean
  senderEmail: boolean
  senderMobile: boolean
  receiverAddress: boolean
  senderAddress: boolean
  receiverPinCode: boolean
  senderPinCode: boolean
  receiverCountry: boolean
  sendEmail: boolean
  sendSMSAndWhatsApp: boolean
}
export type giftCardEmptyErrorFields = {
  amount: boolean
  quantity: boolean
  receiverFirstName: boolean
  receiverLastName: boolean
  receiverEmail: boolean
  receiverMobile: boolean
  receiverCountry: boolean
  receiverState: boolean
  receiverCity: boolean
  receiverAddress: boolean
  senderAddress: boolean
  receiverPinCode: boolean
  customMessage: boolean
  senderFirstName: boolean
  senderLastName: boolean
  senderEmail: boolean
  senderMobile: boolean
  senderPinCode: boolean
}

export type giftCardErrorPlaceholders = {
  amount: string
  quantity: string
  receiverFirstName: string
  receiverLastName: string
  receiverEmail: string
  receiverMobile: string
  additionalReceiverMobile: string
  customMessage: string
  smsSend: string
  whatsappSend: string
  senderFirstName: string
  senderLastName: string
  senderEmail: string
  senderMobile: string
  receiverAddress: string
  senderAddress: string
  receiverPinCode: string
  receiverCountry: string
  sendEmail: string
  sendSMSAndWhatsApp: string
}

export type quantityField = {
  title?: string
}
export type quantityFiledType = [quantityField?]
