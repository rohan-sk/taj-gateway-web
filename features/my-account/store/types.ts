export type cancelOrderPayloadType = {
  hotelId: string
  orderId: string | any
  cancelReason?: string
  cancelType: string
  room: roomItems[]
  isFullCancellation: boolean
}

type roomItems = {
  roomNumber: number
}
