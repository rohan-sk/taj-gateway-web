import { ActionProps } from "../../../types"

export interface initialValuesTypes {
  Date: string
  Name: string
  Email: string
  address: string
  companyName: string
  GuestNumber: string
  senderMobile: string
  customMessage: string
}

export interface initialErrorsTypes {
  Date: boolean
  Name: boolean
  Email: boolean
  address: boolean
  GuestNumber: boolean
  companyName: boolean
  senderMobile: boolean
  customMessage: boolean
}

export interface DiningEnquiryPlanEventFormProps {
  items: any
  content: any
  _key: string
  metadata: any
  title: string
  _type: string
  variant: string
  singleContent: any
  parentProps: number
  largeVariant: string
  PrimaryAction: ActionProps
  secondaryAction: ActionProps
}