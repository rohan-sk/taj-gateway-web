import { ActionProps } from "../../../types"

export interface SpecialOccasionEnquireFormProps {
  items: any
  content: any
  _key: string
  title: string
  metadata: any
  _type: string
  variant: string
  singleContent: any
  parentProps: number
  description: string
  largeVariant: string
  charactersLimit?: number
  PrimaryAction: ActionProps
  secondaryAction: ActionProps
  isMultiBlockContent: boolean
}

export interface valuesInterface {
  Name: string
  Email: string
  Mobile: string
  additionalEvents: string
  describeYourEvent: string
}
export interface errorMessagesInterface {
  Name: string
  Email: string
  Mobile: string
  additionalEvents: string
  describeYourEvent: string
}
export interface ErrorsInterface {
  Name: boolean
  Email: boolean
  Mobile: boolean
  additionalEvents: boolean
  describeYourEvent: boolean
}

export type SpecialEnquireDisableFields = {
  Name: boolean
  Email: boolean
  Mobile: boolean
  CountryCodeValue: boolean
}
