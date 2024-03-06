import { ImageProps, PathType } from "../../types"

interface titles {
  title: string
}

interface itemsType {
  content: any
  clusterItems: any
  isForm: boolean
  items: any
  labelText: string
}
interface props {
  title: string
  subtitle: string
  primaryAction: {
    urlType: PathType
    title: string
    url: string
    variant: string
  }
  items: itemsType[]
  content: []
  highLights: any
  isComponentFullWidth: boolean
  largeImage: ImageProps
  largeVariant: string
  showBulletForSubTitle: boolean
  showDividerForTitle: boolean
  subTitle: string
  url: string
  urlType: string
  _key: string
  _type: string
}
export interface cardsWithCardInterface {
  props: any
  parentProps?: any
  isLoyalty?: boolean
}

export interface AddOnCardInterface {
  props: any
  disableForm: boolean
  addOnFormDate: string
  setAddOnCountryCode: Function
  addOnCountryCode: string
  primaryEmail: string
  primaryPhoneNumber: string
  duplicateValueError: {
    duplicateEmail: boolean
    duplicateMobile: boolean
  }
  setDuplicateValueError: Function
  select: {
    addOnTitle: string
    title: string
  }
  loyaltyOpen: any
  setLoyaltyOpen: any
  values: {
    addOnFirstName: string
    addOnLastName: string
    addOnEmail: string
    addOnMobile: string
  }
  addOnFirstName: string
  errors: {
    addOnFirstName: boolean
    addOnLastName: boolean
    addOnEmail: boolean
    addOnMobile: boolean
  }
  handleChange: any
  handleSelectedValue: any
  handleAddOnDatePicker: any
}

export interface InitialValuesInterface {
  firstName: string
  lastName: string
  senderEmail: string
  receiverMobile: string
  address: string
  gstNo: string
  pinCode: string
  addOnFirstName: string
  addOnLastName: string
  addOnEmail: string
  addOnMobile: string
}

export interface DefaultValuesInterface {
  country: string
  city: string
  state: string
  title: string
  addOnTitle: string
}

export interface epicureCardInterface {
  setOpenToolTip: any
  disableForm: boolean
  props: any
  formDate: any
  isBank: boolean
  date: any
  open: boolean
  membershipType: string
  scrollRef: any
  disable: any
  loyaltyOpen: any
  loyaltyType: any
  setLoyaltyOpen: Function
  select: any
  emptyFieldErrors: any
  handleSelectedValue: any
  values: any
  errors: any
  handleChange: any
  countryCode: string
  setCountryCode: Function
  CustomWidthTooltip: any
  openToolTip: boolean
  handleToolTip: Function
  handleScroll: Function
  ErrorMessage: any
  voucherCode: any
  loyaltyEnrollStore: any
  handleVouchers: any
  voucherPin: string
  setOpenForm: any
  openForm: boolean
  clusterItem: any
  invalidPinCode: boolean
  handlePincode: any
  handleDatePicker: any
  boxRef: any
  setOpen: any
  setSelect: any
  setErrors: any
}

export interface formDisableInitialValues {
  disableEmail: boolean
  disablePhone: boolean
  disableDob: boolean
  disableAddress: boolean
  disableCountry: boolean
  disableState: boolean
  disableCity: boolean
  disablePinCode: boolean
  disableSalutation: boolean
  disableFirstName: boolean
  disableLastName: boolean
}

export interface initialErrorInterface {
  firstName: boolean
  lastName: boolean
  senderEmail: boolean
  receiverMobile: boolean
  address: boolean
  gstNo: boolean
  pinCode: boolean
  addOnFirstName: boolean
  addOnLastName: boolean
  addOnEmail: boolean
  addOnMobile: boolean
}

export interface initialSelectStateInterface {
  salutation: boolean
  country: boolean
  state: boolean
  city: boolean
  addOnSalutation: boolean
}

export interface epicureCardAddressInterface {
  values: InitialValuesInterface
  select: DefaultValuesInterface
  disableForm: boolean
  errors: initialErrorInterface
  disable: formDisableInitialValues
  emptyFieldErrors: any
  handleChange: any
  loyaltyOpen: initialSelectStateInterface
  setLoyaltyOpen: Function
  loyaltyType: any
  CustomWidthTooltip: any
  setOpenToolTip: any
  openToolTip: boolean
  handleToolTip: Function
  handleSelectedValue: any
  invalidPinCode: boolean
  handlePincode: any
  setSelect: any
  voucherCode: string
  voucherPin: any
  handleVouchers: any
  clusterItem: any
  openForm: boolean
  setOpenForm: any
  epicureGlobalStore: any
  loyaltyEnrollStore: any
  props: any
}
