import { PathType, singleContentInterface } from "../../types"

export interface PersonalDetailsInterface {
  title: string
  parameterMap: {
    key: string
    value: string
  }
  singleContent: singleContentInterface[]
  content: any
  urlType: PathType
  url: string
}

export interface UserDataInterface {
  salutation: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  gender: string
  dob: string
  nationality: string
  isEmailVerified: string
  addresses: any
}

export interface PlaceholderInterface {
  salutations: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dob: string
  gender: string
  address: string
  country: string
}

export interface AddressInterface {
  addressLine: string
  city: string
  state: string
  country: string
  pinCode: string
}

interface tabsInterface {
  title: string
  tabItems: any
}

export interface AccountTabsInterface {
  variant: string
  title: string
  _key: string
  tabs: tabsInterface[]
}

export interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}
