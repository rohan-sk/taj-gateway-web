import { makeAutoObservable, runInAction } from "mobx"
import { handler as EpicureCreateOrderAPI } from "../../api/handlers/epicure-create-order.service"
import { handler as EpicureAddToCartAPI } from "../../api/handlers/epicure-add-to-cart.service"
import { handler as EpicureFetchCartAPI } from "../../api/handlers/epicure-fetch-cart.service"
import { handler as EpicureEmptyCartAPI } from "../../api/handlers/epicure-empty-cart.service"
import { handler as EpicureAddTenderModeAPI } from "../../api/handlers/epicure-add-tender-mode.service"
import { handler as EpicureRemoveTenderModeAPI } from "../../api/handlers/epicure-delete-tender-mode.service"
import { handler as EpicureFetchOrderAPI } from "../../api/handlers/epicure-fetch-order.service"
import { handler as EpicureMergeCartAPI } from "../../api/handlers/epicure-merge-cart.service"
import { CurrentStepperTypes } from "../types"

export default class LoyaltyStore {
  loading: boolean = false
  isFormValid: boolean = false
  isAddOnCardEnable: boolean = false
  totalAmount: number = 0
  disableForm: boolean = false
  acceptedTermsAndPolicy: boolean = false
  apiError: string = ""

  currentStepper: CurrentStepperTypes = {
    stepName: "DETAILS",
  }

  formData = {
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    dateOfBirth: "",
    address: "",
    country: "",
    state: "",
    city: "",
    pinCode: "",
    gstNo: "",
    countryCode: "",
  }

  vouchers = {
    voucherCode: "",
    voucherPin: 0,
  }

  EmptyVoucherErrors = {
    voucherCode: false,
    voucherPin: false,
  }

  emptyFormErrors = {
    title: false,
    firstName: false,
    lastName: false,
    email: false,
    mobile: false,
    address: false,
    country: false,
    state: false,
    city: false,
    pinCode: false,
    dateOfBirth: false,
  }

  emptyAddOnFormErrors = {
    addOnTitle: false,
    addOnFirstName: false,
    addOnLastName: false,
    addOnEmail: false,
    addOnMobile: false,
    dateOfBirth: false,
  }

  addOnCardData = {
    addOnTitle: "",
    addOnFirstName: "",
    addOnLastName: "",
    addOnEmail: "",
    addOnMobile: "",
    dateOfBirth: "",
    addOnCountryCode: "",
  }

  EpicureLoyalty = {
    type: "",
    price: 0,
  }

  epcOrderId: string = ""
  showRedeemAndPayment: boolean = false
  activeAccordion: number | null = 0

  //* Using these boolean values to handle the payment sdk's
  initiatePaymentSDK: boolean = false
  terminatePaymentSDK: boolean = false
  totalAmountPayable: number = 0
  epcTenderModeDetails: any = {}

  constructor() {
    makeAutoObservable(this)
  }

  updateApiError = async (error: string) => {
    runInAction(() => {
      this.apiError = error
    })
  }

  updateTermsAndPolicyCheck = async (termsCheck: boolean) => {
    runInAction(() => {
      this.acceptedTermsAndPolicy = termsCheck
    })
  }

  updateCurrentStepper = async (currentStepper: CurrentStepperTypes) => {
    runInAction(() => {
      this.currentStepper = currentStepper
    })
  }

  updateDisableForm = async (disableUserForm: boolean) => {
    runInAction(() => {
      this.disableForm = disableUserForm
    })
  }

  setInitiatePaymentSDK = (isInitiated: boolean) => {
    runInAction(() => {
      this.initiatePaymentSDK = isInitiated
    })
  }
  setTotalAmount = (amount: number) => {
    runInAction(() => {
      this.totalAmount = amount
    })
  }
  setTotalAmountPayable = (amount: number) => {
    runInAction(() => {
      this.totalAmountPayable = amount
    })
  }

  setTerminatePaymentSDK = (isTerminated: boolean) => {
    runInAction(() => {
      this.terminatePaymentSDK = isTerminated
    })
  }

  updateEpcTenderModeDetails = async (data: any) => {
    runInAction(() => {
      this.epcTenderModeDetails = data
    })
  }
  updateEpcOrderId(orderId: string) {
    runInAction(() => {
      this.epcOrderId = orderId
    })
  }

  clearEpcOrderId = async () => {
    runInAction(() => {
      this.epcOrderId = ""
    })
  }

  updateActiveAccordion = async (accordionIndex: any) => {
    runInAction(() => {
      this.activeAccordion = accordionIndex
    })
  }

  updateShowRedeemAndPayment = async (change: boolean) => {
    runInAction(() => {
      this.showRedeemAndPayment = change
    })
  }

  resetGCFormDetails = () => {
    this.isFormValid = false
  }

  updateIsFormValid = async (userFormValid: boolean) => {
    runInAction(() => {
      this.isFormValid = userFormValid
    })
  }

  updateIsAddOnCardEnable = async (userSelected: boolean) => {
    runInAction(() => {
      this.isAddOnCardEnable = userSelected
    })
  }

  updateVouchers = async (userEnteredVouchersCode: string, userEnteredVouchersPin: number) => {
    runInAction(() => {
      this.vouchers.voucherCode = userEnteredVouchersCode
      this.vouchers.voucherPin = userEnteredVouchersPin
    })
  }

  updateVoucherCodeErrors = async (userEnteredVouchersCode: boolean) => {
    runInAction(() => {
      this.EmptyVoucherErrors.voucherCode = userEnteredVouchersCode
    })
  }

  updateVoucherPinErrors = async (userEnteredVouchersPin: boolean) => {
    runInAction(() => {
      this.EmptyVoucherErrors.voucherPin = userEnteredVouchersPin
    })
  }

  updateFormData = async (
    userEnteredTitle: string,
    userEnteredFirstName: string,
    userEnteredLastName: string,
    userEnteredEmail: string,
    userEnteredMobile: string,
    userEnteredDateOfBirth: string,
    userEnteredAddress: string,
    userEnteredCountry: string,
    userEnteredState: string,
    userEnteredCity: string,
    userEnteredPinCode: string,
    userEnteredGstNo: string,
    userEnteredCountryCode: string,
  ) => {
    runInAction(() => {
      this.formData.title = userEnteredTitle
      this.formData.firstName = userEnteredFirstName
      this.formData.lastName = userEnteredLastName
      this.formData.email = userEnteredEmail
      this.formData.mobile = userEnteredMobile
      this.formData.dateOfBirth = userEnteredDateOfBirth
      this.formData.address = userEnteredAddress
      this.formData.country = userEnteredCountry
      this.formData.state = userEnteredState
      this.formData.city = userEnteredCity
      this.formData.pinCode = userEnteredPinCode
      this.formData.gstNo = userEnteredGstNo
      this.formData.countryCode = userEnteredCountryCode
    })
  }

  updateEmptyFormErrors = async (
    userTitle: boolean,
    userFirstName: boolean,
    userLastName: boolean,
    userEmail: boolean,
    userMobile: boolean,
    userAddress: boolean,
    userCountry: boolean,
    userState: boolean,
    userCity: boolean,
    userPinCode: boolean,
    userDob: boolean,
  ) => {
    runInAction(() => {
      this.emptyFormErrors.title = userTitle
      this.emptyFormErrors.firstName = userFirstName
      this.emptyFormErrors.lastName = userLastName
      this.emptyFormErrors.email = userEmail
      this.emptyFormErrors.mobile = userMobile
      this.emptyFormErrors.address = userAddress
      this.emptyFormErrors.country = userCountry
      this.emptyFormErrors.state = userState
      this.emptyFormErrors.city = userCity
      this.emptyFormErrors.pinCode = userPinCode
      this.emptyFormErrors.dateOfBirth = userDob
    })
  }

  updateEmptyAddOnFormErrors = async (
    userAddOnTitle: boolean,
    userAddOnFirstName: boolean,
    userAddOnLastName: boolean,
    userAddOnEmail: boolean,
    userAddOnMobile: boolean,
    userAddOnDob: boolean,
  ) => {
    runInAction(() => {
      this.emptyAddOnFormErrors.addOnTitle = userAddOnTitle
      this.emptyAddOnFormErrors.addOnFirstName = userAddOnFirstName
      this.emptyAddOnFormErrors.addOnLastName = userAddOnLastName
      this.emptyAddOnFormErrors.addOnEmail = userAddOnEmail
      this.emptyAddOnFormErrors.addOnMobile = userAddOnMobile
      this.emptyAddOnFormErrors.dateOfBirth = userAddOnDob
    })
  }

  updateCardData = async (
    userEnteredAddOnTitle: string,
    userEnteredAddOnFirstName: string,
    userEnteredAddOnLastName: string,
    userEnteredAddOnEmail: string,
    userEnteredAddOnMobile: string,
    userEnteredAddOnDateOfBirth: string,
    userEnteredAddOnCountryCode: string,
  ) => {
    runInAction(() => {
      this.addOnCardData.addOnTitle = userEnteredAddOnTitle
      this.addOnCardData.addOnFirstName = userEnteredAddOnFirstName
      this.addOnCardData.addOnLastName = userEnteredAddOnLastName
      this.addOnCardData.addOnEmail = userEnteredAddOnEmail
      this.addOnCardData.addOnMobile = userEnteredAddOnMobile
      this.addOnCardData.dateOfBirth = userEnteredAddOnDateOfBirth
      this.addOnCardData.addOnCountryCode = userEnteredAddOnCountryCode
    })
  }

  updateCardDetails = async (userSelectedCardType: string) => {
    runInAction(() => {
      this.EpicureLoyalty.type = userSelectedCardType
    })
  }

  EpicureCreateOrderAPI = async (payload: any) => {
    this.loading = true
    try {
      const response = await EpicureCreateOrderAPI.apiCall(payload)
      localStorage.setItem("journey", "loyalty")
      this.loading = false
      return response
    } catch (error) {
      // eslint-disable-next-line
      this.loading = false
      console.log("error")
    }
  }

  EpicureAddTenderMode = async (payload: any) => {
    try {
      const response = await EpicureAddTenderModeAPI.apiCall(payload)
      localStorage.setItem("journey", "loyalty")
      this.loading = false
      return response
    } catch (error) {
      // eslint-disable-next-line
      console.log("error")
      this.loading = false
    }
  }

  EpicureRemoveTenderMode = async (payload: any) => {
    this.loading = true
    try {
      const response = await EpicureRemoveTenderModeAPI.apiCall(payload)
      localStorage.setItem("journey", "loyalty")
      this.loading = false
      return response
    } catch (error) {
      // eslint-disable-next-line
      console.log("error")
      this.loading = false
    }
  }

  EpicureAddToCartAPI = async (payload: any) => {
    this.loading = true
    try {
      const response = await EpicureAddToCartAPI.apiCall(payload)
      localStorage.setItem("journey", "loyalty")
      this.loading = false
      return response
    } catch (error) {
      // eslint-disable-next-line
      console.log("error")
      this.loading = false
    }
  }

  EpicureFetchCartAPI = async () => {
    this.loading = true
    try {
      const response = await EpicureFetchCartAPI.apiCall()
      this.loading = false
      return response
    } catch (error) {
      // eslint-disable-next-line
      console.log("error")
      this.loading = false
    }
  }

  EpicureFetchOrderAPI = async (orderID: string) => {
    this.loading = true
    try {
      const response = await EpicureFetchOrderAPI.apiCall(orderID)
      this.loading = false
      return response
    } catch (error) {
      // eslint-disable-next-line
      console.log("error")
      this.loading = false
    }
  }

  EpicureEmptyCartAPI = async () => {
    this.loading = true
    try {
      const response = await EpicureEmptyCartAPI.apiCall()
      this.loading = false
      return response
    } catch (error) {
      // eslint-disable-next-line
      console.log("error")
      this.loading = false
    }
  }

  EpicureMergeCartAPI = async () => {
    this.loading = true
    try {
      const response = await EpicureMergeCartAPI.apiCall()
      this.loading = false
      return response
    } catch (error) {
      // eslint-disable-next-line
      console.log("error")
      this.loading = false
    }
  }
}
