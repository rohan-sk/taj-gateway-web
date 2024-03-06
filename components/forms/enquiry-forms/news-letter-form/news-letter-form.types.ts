import {
  City,
  Country,
  State,
  senderEmail,
  senderFirstName,
  senderLastName,
} from "../../gift-card-form/constants"

export type Values = {
  salutation: string
  [senderFirstName]: string
  [senderLastName]: string
  [senderEmail]: string
  [Country]: string
  [State]: string
  [City]: string
  check: boolean
  recaptcha: boolean
}
export type Errors = {
  salutation: boolean
  [senderFirstName]: boolean
  [senderLastName]: boolean
  [senderEmail]: boolean
  [Country]: boolean
  [State]: boolean
  [City]: boolean
  recaptcha: boolean
}

export type ErrorMessages = {
  salutation: string
  [senderFirstName]: string
  [senderLastName]: string
  [senderEmail]: string
  [Country]: string
  [State]: string
  [City]: string
}

export type Disable = {
  salutation: boolean
  [senderFirstName]: boolean
  [senderLastName]: boolean
  [senderEmail]: boolean
  [Country]: boolean
  [State]: boolean
  [City]: boolean
}
