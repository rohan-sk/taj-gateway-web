import { ActionProps, ImageProps, PathType } from "../types"

interface parameterMapInterface {
  url: string
  value: string
}

interface itemsInterface {
  tabLinks: any
  largeImage: ImageProps
  title: string
}

interface dataInterface {
  title: string
  parameterMap: parameterMapInterface[]
  items: itemsInterface[]
}

export interface InitialScreenInterface {
  props: {
    data: dataInterface[]
  }
}

export type formErrorInterface = {
  memberShipNo: boolean
  senderMobile?: {
    senderMobile: boolean
  }
  senderEmail?: {
    senderEmail: boolean
  }
}

export type formErrorMessageInterface = {
  senderEmail: string
  memberShipNo: string
  senderMobile: string
}

export interface TabsComponentInterface {
  value: number
  variant: string
  tabsData: parameterMapInterface[]
  parameterMap: parameterMapInterface[]
  setValue: Function
  image: any
}

export interface OtpComponentInterface {
  otp: string
  invalidOtp: boolean
  setIsInvalidOtp: Function
  setOtp: Function
  VerifyHandler?: Function
  resendOtp?: any
  sysprops?: any
}
interface ItemsInterface {
  largeImage: ImageProps
  title: string
}
interface dataInterface {
  parameterMap: parameterMapInterface[]
  title: string
}
export interface loginFormInterface {
  data: dataInterface[]
}

interface childrenInterface {
  text: string
}
interface singleContentInterface {
  children: childrenInterface[]
}
export interface LoginFormInterface {
  props: {
    _type: any
    items: any
    label: string
    type: any
    logo: ImageProps
    content: singleContentInterface[]
    title: string
    subTitle: string
    parameterMap: parameterMapInterface[]
    primaryAction: ActionProps
    secondaryAction: ActionProps
    singleContent: singleContentInterface[]
    imageAsset: ImageProps
  }
}

interface TabItemsInterface {
  _type: string
  primaryAction: ActionProps
  singleContent: singleContentInterface[]
  title: string
}
interface TabsInterface {
  tabData: TabItemsInterface[]
  title: string
  tabItems: TabItemsInterface[]
}
export interface TabsComponentInterface {
  image: any
  tabs: TabsInterface[]
  title: string
}

interface OTPScreenItemsInterface {
  title: string
  subtitle: string
  description: string
  parameterMap: parameterMapInterface[]
  primaryAction: ActionProps
  secondaryAction: ActionProps
}
export interface OTPScreenInterface {
  data: {
    _type: string;
    Type: string
    handleClose: Function
    subtitle: string
    description: string
    parameterMap: parameterMapInterface[]
    primaryAction: ActionProps
    secondaryAction: ActionProps
    title: string
  }
  variant?: "string" | undefined
}

interface LoginFormItemsInterface {
  map: any
  image: ImageProps
  tabs: TabsInterface[]
  title: string
}
export interface LoginFormWithMultipleTabsInterface {
  data: {
    logo: ImageProps
    items: LoginFormItemsInterface | any
    title: string
  }
}

export interface SignUpInterface {
  largeImage: ImageProps
  parameterMap: parameterMapInterface[]
  title: string
  items: any
  logo:ImageProps
}
interface childrenInterface {
  text: string
}
interface ContentsInterface {
  children: childrenInterface[]
}
interface contentInterface {
  content: ContentsInterface[]
}
export interface AuthenticationCardAction {
  props: {
    primaryAction: {
      urlType: any
      checkBox: PathType | undefined
      title: string
      url: string
      variant: string
    }
    parameterMap: parameterMapInterface[]
    content: contentInterface[]
  }
}

export interface ThankYouScreenInterface {
  PrimaryAction: {
    urlType: any
    checkBox: PathType | undefined
    title: string
    url: string
    variant: string
  }
  secondaryAction: {
    urlType: any
    checkBox: PathType | undefined
    title: string
    url: string
    variant: string
  }
  title: string
  largeImage: ImageProps
  subtitle: string
}

export interface CardInterface {
  largeImage: ImageProps
  title: string
}

export interface SelectItemsInterface {
  title: string
}
export interface SelectCountryInterface {
  country: string
}
export interface SelectStateInterface {
  state?: string
  city?: string
}

export interface PasswordScreenInterface {
  title: string
  subTitle: string
  imageAsset: { largeImage: ImageProps }
  primaryAction: {
    urlType: PathType
    title: string
    url: string
    variant: string
  }
  parameterMap: parameterMapInterface[]
  ctaLabel: string
  url: string
  urlType: string
  secondaryAction: {
    urlType: string
    title: string
    url: string
    variant: string
  }
}

interface TabsItemsInterface {
  parameterMap?: parameterMapInterface[]
  primaryAction: {
    urlType: string
    title: string
    url: string
    variant: string
  }
  subTitle?: string
  urlType?: string
  _key?: string
  _type?: string
  identifiers?: string | undefined
}

export interface TabsMapComponent {
  tabItems: TabsItemsInterface[]
  title: string
  identifier?: string | undefined
  _key?: string
  _type?: string
}

interface ItemsInterface {
  largeImage: ImageProps
  title: string
  urlType: string
  _key: string
  _type: string
}
export interface TabsDataInterface {
  items: ItemsInterface[]
  logo: ImageProps
  primaryAction: {
    urlType: string
    title: string
    url: string
    variant: string
  }
  secondaryAction: {
    urlType: string
    title: string
    url: string
    variant: string
  }
  subTitle: string
  _key: string
  _type: string
}

interface arrayInterface {
  title: string
}
export interface MSiteInterface {
  apiError: boolean
  setApiError: any
  select: {
    gender: string
    title: string
  }
  handleSelectedValue: any
  salutations: arrayInterface[]
  values: {
    confirmEmail: string
    senderEmail: string
    senderFirstName: string
    userLastName: string
    senderMobile: string
  }
  errors: {
    confirmEmail: boolean
    dob: boolean
    senderEmail: boolean
    senderFirstName: boolean
    userLastName: boolean
    senderMobile: boolean
  }
  errorMessage: {
    confirmEmail: string
    senderEmail: string
    senderFirstName: string
    userLastName: string
    senderMobile: string
  }
  setErrorMessage: Function
  setErrors: Function
  handleChangeForm: any
  CalenderIcon: any
  handleDatePicker: any
  getDateBefore18Years: any
  gender: arrayInterface[]
  defaultEmail: boolean
  countryCode: string
  setCountryCode: Function
  defaultPhone: boolean
  open: boolean
  setOpen: Function
  date: any
  fieldsData:any
}
