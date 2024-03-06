export type GuestDetailsType = {
  data: GuestDetailItemsType[]
}

export type StepperDetailsType = {
  data: StepperItemType[]
}

export type GuestDetailItemsType = {
  id: number
  room: string
  adults: number
  child: number
  isSelected: boolean
}
export type StepperItemType = {
  isCorporate: any
  package: any
  id: number
  hotelId: string
  numRooms: number
  room: string
  startDate: any
  endDate: any
  adults: number
  child: number
  rateCode: any
  isSelected: boolean
  modified: boolean
  rateFilter: any
  memberTier: any
  promoCode: any
  promoType: any
  couponCode: any
  agentId: any
}

export interface guestBookingScheduleType {
  userCheckInDate: string
  userCheckOutDate: string
}

export type CreateOrderPayloadType = {
  email: string
  title: string
  gender: string
  phoneNo: string
  lastName: string
  firstName: string
  GSTNumber: string
  salutation: string
  countryCode: string
  membershipNo: string
  memberShipType: string
  specialRequest: string
  paymentMethod: string
  agreedTnc: boolean
  agreedPrivacyPolicy: boolean
  voucherPin: string
  voucherNumber: string
}

export type AddTenderModeType = {
  type: string
  orderId: string
  tenderMode: string
  tenderModeDetails: TenderModeItems[]
}

export type TenderModeItems = {
  amount: number
  cardPin: string
  cardNumber: string
}

export type DeleteTenderModesType = {
  type: string
  orderId: string
  amount: number
  cardNumber: string
  tenderMode: string
}

export interface RemoveCartPayload {
  roomId: string
  roomType: string
  roomNumber: number
  packageCode: string
}