export interface SelectedRoomDetailsType {
  roomId: number
  roomName: string
  roomPrice: string
}

export interface CurrentStepperTypes {
  stepName: string
}

export interface BookingsMainContentTypes {
  cases: CasesItems[]
  defaultCase: string
}

export interface CasesItems {}

export interface roomsAvailabilityTypes {
  error: boolean
  availabilityResponse: any

  // {} | undefined
}
export interface destinationAvailabilityTypes {
  error: boolean
  availabilityResponse: any
}
