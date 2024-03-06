import {
  City,
  dateOfBirth,

} from "../../modal/constants"
import {
  GSTNo,
  address,
  isIHCLLoyaltyMember,
  pinCode,
  senderEmail,
  senderFirstName,
  senderLastName,
  senderMobile,
  Country,
  State,
  countryCodeValue,
} from "../gift-card-form/constants"

export type Company = {
  [senderFirstName]: string
  [senderMobile]: string
  [senderEmail]: string
  [address]: string
  [Country]: string
  [City]: string
  [State]: string
  [pinCode]: string
  [GSTNo]: string
}
export type CompanyErrors = {
  [senderFirstName]: boolean
  [senderMobile]: boolean
  [senderEmail]: boolean
  [address]: boolean
  [Country]: boolean
  [State]: boolean
  [City]: boolean
  [pinCode]: boolean
  [GSTNo]: boolean
  reCaptcha: boolean
}
export type CompanyErrorMessages = {
  [senderFirstName]: string
  [senderMobile]: string
  [senderEmail]: string
  [address]: string
  [Country]: string
  [State]: string
  [City]: string
  [pinCode]: string
  [GSTNo]: string
}
export type Member = {
  id: number | null
  [senderFirstName]: string
  [senderLastName]: string
  [senderMobile]: string
  [address]: string
  [Country]: string
  [State]: string
  [City]: string
  [pinCode]: string
  [dateOfBirth]: string
  [senderEmail]: string
  [isIHCLLoyaltyMember]: boolean
  [countryCodeValue]: string
  open: boolean
}
export type MemberErrors = {
  [senderFirstName]: boolean
  [senderLastName]: boolean
  [senderMobile]: boolean
  [address]: boolean
  [Country]: boolean
  [State]: boolean
  [City]: boolean
  [pinCode]: boolean
  [dateOfBirth]: boolean
  [senderEmail]: boolean
}
export type MemberErrorMessages = {
  [senderFirstName]: string
  [senderLastName]: string
  [senderMobile]: string
  [address]: string
  [Country]: string
  [State]: string
  [City]: string
  [pinCode]: string
  [dateOfBirth]: string
  [senderEmail]: string
}
export type currentCompanyCheckingField = {
  name: string
  value: string
}
export type currentMemberCheckingField = {
  name: string
  value: string
  currentMemberId: number
}

export type MemberPropsType = {
  memberData: any
  members: Member[]
  setMembers: Function
  memberErrors: MemberErrors[]
  setMemberErrors: Function
  isNotInitialClick: boolean
  countryList: string[]
  handleScroll?: Function
  scrollRef?:any
}

export type SingleMemberPropsType = {
  memberId: number
  members: Member[]
  setMembers: Function
  memberErrors: MemberErrors[]
  setMemberErrors: Function
  currentMember: Member,
  isNotInitialClick: boolean,
  countryList: string[]
  memberData: any
  handleScroll?: Function
}

export type FieldChange = {
  [Country]: boolean
  [State]: boolean
}