import React, { useContext, useEffect, useMemo, useState } from "react"
import formData from "./formData.json"
import dynamic from "next/dynamic"
import * as FormStyles from "./styles"
import { useRouter } from "next/router"
import { observer } from "mobx-react-lite"
import { theme } from "../../../lib/theme"
import { UserStore } from "../../../store"
import { quantityFiledType } from "./types"
import { CONSTANTS } from "../../constants"
import { useMobileCheck } from "../../../utils/isMobilView"
import { ButtonTickIcon } from "../../../utils/customIcons"
import { useLoggedIn } from "../../../utils/hooks/useLoggedIn"
import getGiftCardDetails from "../../../utils/fetchGiftCardDetails"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import phoneNumberVerifier from "../../../utils/phone-number-verifier"
import { RestrictSpecialChar } from "../../../utils/restrictSpecialChar"
import { ERROR_MESSAGES, TOOL_TIP_ICON, gcConstants } from "./constants"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import TextfieldValidator from "../../../utils/validations/TextfieldValidator"
import { PincodeServiceability } from "../../../utils/pincode-serviceability"
import manageGCStore from "../../../features/giftCard/store/pageStore/manageGC.store"
import AccountStore from "../../../features/my-account/store/pageStore/account.store"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import GiftCardStore from "../../../features/giftCard/store/globalStore/gift-card.store"
import {
  Box,
  Stack,
  styled,
  Tooltip,
  IconButton,
  Typography,
  TooltipProps,
  tooltipClasses,
  ClickAwayListener,
} from "@mui/material"
const CustomTextField = dynamic(() => import("../../hoc/textField/custom-text-field"))
const CountryCodeDropdown = dynamic(() => import("../../../utils/CountryCodeDropdown"))
const CustomAutoCompleteComponent = dynamic(() => import("../../custom-auto-complete.component"))
const CustomDropDown = dynamic(() => import("../../hoc/CustomDropDown").then((module) => module.CustomDropDown))
const CustomCheckBox = dynamic(() =>
  import("../../hoc/CustomCheckBox/Checkbox").then((module) => module.CustomCheckBox),
)

const EnterDetailsForm = (props: any) => {
  const isMobile = useMobileCheck()
  const pageContext = useContext(PageContext)
  const IHCLContexts = useContext(IHCLContext)
  const initialDisableValues = {
    receiverFirstName: false,
    receiverLastName: false,
    receiverEmail: false,
    receiverCountryCode: false,
    receiverMobile: false,
    senderFirstName: false,
    senderLastName: false,
    senderEmail: false,
    senderCountryCode: false,
    senderMobile: false,
    receiverAddress: false,
    senderAddress: false,
    receiverPinCode: false,
    senderPinCode: false,
    receiverCity: false,
    senderCity: false,
    senderState: false,
    receiverState: false,
    senderCountry: false,
  }
  const [userData, setUserData] = useState<any>()

  const [shouldDisable, setShouldDisable] = useState<any>(initialDisableValues)

  const accountStore = pageContext?.getPageStore(PAGE_STORES.ACCOUNT_STORES.myAccountStore) as AccountStore
  const giftCardFormDetailsStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.giftCardStore) as GiftCardStore

  const giftCardManageStore = pageContext?.getPageStore(PAGE_STORES?.giftCardManageCard) as manageGCStore

  const formValues: any = giftCardFormDetailsStore?.formValues
  const updateFormValues = giftCardFormDetailsStore?.updateFormValues
  //global user store
  const userStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const router = useRouter()
  const [receiverCountryOpenToolTip, setReceiverCountryOpenToolTip] = useState<boolean>(false)
  const [cardSku, setCardSku] = useState<any>()
  const [isValid, setIsValid] = useState<boolean>(false)
  const [isEditFormData, setIsEditFormData] = useState<boolean>(true)
  const [receiverCountryCode, setReceiverCountryCode] = useState<string>("+91")
  const [senderCountryCode, setSenderCountryCode] = useState<string>("+91")
  const [additionalReceiverCountryCode, setAdditionalReceiverCountryCode] = useState<string>("+91")
  const [countryList, setCountryList] = useState<Array<string>>([])
  const [stateList, setStateList] = useState<Array<string>>([])
  const [cityList, setCityList] = useState<Array<string>>([])
  const [receiverStateList, setReceiverStateList] = useState<Array<string>>([])
  const [receiverCityList, setReceiverCityList] = useState<Array<string>>([])
  const [senderMobileCode, setSenderMobileCode] = useState<string>("IN")

  const isLoggedIn = useLoggedIn()
  const formErrors = giftCardFormDetailsStore?.formErrors
  const updateFormErrors: any = giftCardFormDetailsStore?.updateFormErrors

  const ErrorMessage = giftCardFormDetailsStore?.errorMessages
  const updateErrorMessage: any = giftCardFormDetailsStore?.updateErrorMessage

  const gcFormErrors: any = giftCardFormDetailsStore?.gcEmptyFormErrors
  const updateGCEmptyFormErrors: any = giftCardFormDetailsStore?.updateGCEmptyFormErrors

  const [selfPurchase, setSelfPurchase] = useState<boolean>(formValues?.selfPurchase)
  const isEdit = router.query.editing === "true"
  const [cardDetail, setCardDetail] = useState<{
    customPricing: boolean
    minPrice: number
    maxPrice: number
    charCount: number
    maxQuantity: number
  }>({
    customPricing: false,
    minPrice: 0,
    maxPrice: 0,
    charCount: 100,
    maxQuantity: 5,
  })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchCart = async () => {
    await giftCardFormDetailsStore?.gcFetchCart()
  }

  useEffect(() => {
    const updateSteps: any = JSON.parse(JSON.stringify(giftCardFormDetailsStore?.buyingJourneySteps))
    updateSteps[1].selected = true
    updateSteps[1].completed = false
    updateSteps[2].selected = false
    updateSteps[2].completed = false
    updateSteps[3].selected = false
    giftCardFormDetailsStore?.updateBuyingJourneySteps(updateSteps)

    getCountryList()
    if (!!formValues?.quantity && !isEdit) {
      updateFormValues({
        ...formValues,
        [gcConstants.quantity]: "",
      })
    }
    if (!!formValues?.amount && !isEdit) {
      updateFormValues({
        ...formValues,
        [gcConstants.amount]: "",
      })
    }
    if (!isEdit) {
      setSelfPurchase(false)
      if (!isLoggedIn) {
        updateFormValues({
          ...formValues,
          [gcConstants.amount]: "",
          [gcConstants.quantity]: "",
          [gcConstants.senderFirstName]: "",
          [gcConstants.senderLastName]: "",
          [gcConstants.senderEmail]: "",
          [gcConstants.senderMobile]: "",
          [gcConstants.senderAddress]: "",
          [gcConstants.senderPinCode]: "",
          [gcConstants.senderCountry]: "India",
          [gcConstants.senderState]: "",
          [gcConstants.senderCity]: "",
          [gcConstants.receiverFirstName]: "",
          [gcConstants.receiverLastName]: "",
          [gcConstants.receiverEmail]: "",
          [gcConstants.receiverMobile]: "",
          [gcConstants.receiverAddress]: "",
          [gcConstants.receiverPinCode]: "",
          [gcConstants.receiverCountry]: "India",
          [gcConstants.receiverState]: "",
          [gcConstants.receiverCity]: "",
          [gcConstants.customMessage]: "",
          [gcConstants.sendEmail]: true,
          [gcConstants.sendSMSAndWhatsApp]: false,
          [gcConstants.additionalReceiverMobile]: "",
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useMemo(() => {
    if (isEdit) {
      giftCardFormDetailsStore?.updateIsButtonDisabled(false), fetchCart()
      const updateSteps: any = JSON.parse(JSON.stringify(giftCardFormDetailsStore?.buyingJourneySteps))
      updateSteps[1].selected = true
      updateSteps[1].completed = false
      updateSteps[2].selected = false
      updateSteps[3].selected = false
      giftCardFormDetailsStore?.updateBuyingJourneySteps(updateSteps)
    }
    if (!isEdit && giftCardFormDetailsStore?.buyingJourneySteps?.[1]?.selected) {
      giftCardFormDetailsStore?.updateIsButtonDisabled(false)
      giftCardFormDetailsStore?.updateTcCheck(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit])

  const formValidation = (isFormValid: any, field: any) => {
    updateFormErrors({ ...formErrors, [field]: !isFormValid })
  }

  useEffect(() => {
    giftCardFormDetailsStore?.updateGCFormDetails(
      isValid,
      formValues,
      parseInt(formValues?.amount) * parseInt(formValues?.quantity),
      Number(formValues?.quantity),
      cardSku,
      receiverCountryCode,
      senderCountryCode,
      additionalReceiverCountryCode,
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues, isValid, giftCardFormDetailsStore, cardSku])

  const validateSelfPurchaseErrors = () => {
    const commonConditions =
      formValues?.receiverFirstName?.length > 2 &&
      formValues?.receiverLastName?.length > 0 &&
      formValues?.receiverEmail?.length > 3 &&
      formValues?.amount &&
      formValues?.receiverMobile?.length === 10 &&
      formValues?.customMessage?.length > 3 &&
      formValues?.quantity?.length > 0

    if (isPhysicalGIftCard) {
      return (
        commonConditions &&
        formValues?.pinCode?.length === 6 &&
        formValues?.receiverState?.length > 1 &&
        formValues?.receiverCity?.length > 1 &&
        formValues?.receiverAddress?.length > 1
      )
    } else {
      return commonConditions
    }
  }

  const validatePurchaseErrors = () => {
    const commonConditions =
      formValues?.receiverFirstName?.length > 2 &&
      formValues?.receiverLastName?.length > 0 &&
      formValues?.receiverEmail?.length > 3 &&
      formValues?.senderFirstName?.length > 2 &&
      formValues?.senderLastName?.length > 0 &&
      formValues?.senderEmail?.length > 3 &&
      formValues?.amount &&
      formValues?.senderMobile?.length === 10 &&
      formValues?.receiverMobile?.length === 10 &&
      formValues?.customMessage?.length > 3 &&
      formValues?.quantity?.length > 0

    if (isPhysicalGIftCard) {
      return (
        commonConditions &&
        formValues?.pinCode?.length === 6 &&
        formValues?.receiverState?.length > 1 &&
        formValues?.receiverCity?.length > 1 &&
        formValues?.receiverAddress?.length > 1
      )
    } else {
      return commonConditions
    }
  }

  useEffect(() => {
    giftCardManageStore?.showRedeemAndPayment && giftCardManageStore?.updateShowRedeemAndPayment(false)
    giftCardManageStore?.activeAccordion !== null && giftCardManageStore?.updateActiveAccordion(null)
    if (selfPurchase) {
      const selfError = validateSelfPurchaseErrors()
      setIsValid(selfError)
    } else {
      const Error = validatePurchaseErrors()
      setIsValid(Error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formErrors,
    isValid,
    formValues?.receiverFirstName?.length,
    formValues?.receiverLastName?.length,
    formValues?.receiverEmail?.length,
    formValues?.senderFirstName?.length,
    formValues?.senderLastName?.length,
    formValues?.senderEmail?.length,
    formValues?.amount,
    formValues?.senderMobile?.length,
    formValues?.receiverMobile?.length,
    formValues?.customMessage?.length,
    formValues?.quantity?.length,
    formValues?.pinCode?.length,
    formValues?.receiverState?.length,
    formValues?.receiverCity?.length,
    formValues?.receiverAddress?.length,
    selfPurchase,
  ])

  useEffect(() => {
    if (router?.query?.sku) {
      const data = getGiftCardDetails(router?.query?.sku)
      data.then((data: any) => {
        const isCustomPriceCheck = Number(data?.[0]?.maxPrice) - Number(data?.[0]?.minPrice)
        setCardDetail({
          ...cardDetail,
          customPricing: isCustomPriceCheck !== 0 ? false : true,
          minPrice: Number(data?.[0]?.minPrice),
          maxPrice: Number(data?.[0]?.maxPrice),
          maxQuantity: Number(data?.[0]?.giftCardQuantity),
        })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router?.query])

  const handleChangeForm = (event: any) => {
    !giftCardFormDetailsStore?.isUserTouchedForm && giftCardFormDetailsStore?.updateIsUserTouchedForm(true)
    const { name, value } = event.target
    const { status, errorMsg, fieldName } = TextfieldValidator(name, value, {
      ...cardDetail,
      isPhysicalGIftCard,
    })

    if (name === gcConstants.senderMobile) {
      const isVerified = phoneNumberVerifier(senderMobileCode, value)
      updateErrorMessage({
        ...ErrorMessage,
        [fieldName]: !isVerified ? errorMsg : "",
      })
      if (senderCountryCode === "+91") {
        updateFormErrors({
          ...formErrors,
          [fieldName]: !(value?.length === 10 && value?.[0] > 5),
        })
        updateFormValues({
          ...formValues,
          [name]: value,
        })
      } else {
        updateFormErrors({ ...formErrors, [fieldName]: !isVerified })
        updateFormValues({
          ...formValues,
          [name]: value,
        })
      }
      return
    }

    if (name === gcConstants.customMessage) {
      if (/\d/.test(value)) {
        if (value?.length > 0) {
          updateGCEmptyFormErrors({ ...gcFormErrors, customMessage: false })
        } else {
          updateGCEmptyFormErrors({ ...gcFormErrors, customMessage: true })
        }
        updateFormErrors({
          ...formErrors,
          [gcConstants.customMessage]: true,
        })

        updateErrorMessage({ ...ErrorMessage, [fieldName]: errorMsg })
        updateFormValues({
          ...formValues,
          [name]: value,
        })
        formValidation(status, name)
      } else {
        if (value?.length > 0) {
          updateGCEmptyFormErrors({ ...gcFormErrors, customMessage: false })
        }
        updateFormErrors({
          ...formErrors,
          [gcConstants.customMessage]: false,
        })
        updateErrorMessage({ ...ErrorMessage, [fieldName]: errorMsg })
        updateFormValues({
          ...formValues,
          [name]: value,
        })
      }
      return
    }
    updateErrorMessage({ ...ErrorMessage, [fieldName]: errorMsg })
    updateFormValues({
      ...formValues,
      [name]: value,
    })
    formValidation(status, name)
    if (name === gcConstants.receiverState || name === gcConstants.receiverCity) {
      if (formValues?.receiverState !== value || formValues?.receiverCity !== value) {
        updateFormValues({
          ...formValues,
          [gcConstants.receiverPinCode]: "",
        })
      }
    }
  }
  const isNonIndian: boolean = formValues?.senderCountry ? formValues?.senderCountry?.toLowerCase() !== "india" : false

  const handlePinCode = async (event: any, sender: boolean) => {
    const { name, value } = event.target
    const { fieldName } = TextfieldValidator(name, value, {
      cardDetail,
      isPhysicalGIftCard,
    })
    updateGCEmptyFormErrors({ ...gcFormErrors, fieldName: false })
    updateFormValues({ ...formValues, [name]: value })

    if (value?.length === 6) {
      const response = await PincodeServiceability(value)
      if (!response?.error) {
        updateFormErrors({ ...gcFormErrors, [fieldName]: false })
        if (sender) {
          formValues?.[gcConstants.senderState]?.toLowerCase() !== response?.state?.toLowerCase() &&
            updateFormValues({
              ...formValues,
              [gcConstants.senderState]: response?.state,
            })
          formValues?.[gcConstants.senderCity].toLowerCase() !== response?.city?.toLowerCase() &&
            updateFormValues({
              ...formValues,
              [gcConstants.senderCity]: response?.city,
            })
          formValues?.[gcConstants.senderCountry]?.toLowerCase() !== response?.country?.toLowerCase() &&
            updateFormValues({
              ...formValues,
              [gcConstants.senderCountry]: response?.country,
            })
        } else {
          formValues?.[gcConstants.receiverState]?.toLowerCase() !== response?.state?.toLowerCase() &&
            updateFormValues({
              ...formValues,
              [gcConstants.receiverState]: response?.state,
            })
          formValues?.[gcConstants.receiverCity].toLowerCase() !== response?.city?.toLowerCase() &&
            updateFormValues({
              ...formValues,
              [gcConstants.receiverCity]: response?.city,
            })
        }
      } else {
        updateGCEmptyFormErrors({ ...gcFormErrors, [fieldName]: false })

        if (isNonIndian) {
          updateFormErrors({ ...gcFormErrors, [fieldName]: false })
        } else updateFormErrors({ ...gcFormErrors, [fieldName]: true })
        updateErrorMessage({
          ...ErrorMessage,
          [fieldName]: ERROR_MESSAGES?.PIN_CODE,
        })
      }
    } else {
      if (value?.length < 6) {
        if (isNonIndian) {
          updateFormErrors({ ...gcFormErrors, [fieldName]: false })
        } else updateFormErrors({ ...gcFormErrors, [fieldName]: true })

        setStateList(() => [])
        updateErrorMessage({ ...ErrorMessage, [fieldName]: "" })
        if (sender && !isNonIndian) {
          updateFormValues({
            ...formValues,
            [gcConstants.senderCity]: "",
            [gcConstants.senderState]: "",
            [gcConstants.senderCountry]: "",
          })
        } else {
          updateFormValues({
            ...formValues,
            [gcConstants.receiverCity]: "",
            [gcConstants.receiverState]: "",
          })
        }
      }
    }
  }

  const quantityFiled: quantityFiledType = []

  // creates an array of dynamically elements based on quantity

  Array.from(Array(Number(cardDetail?.maxQuantity || 5)).keys())?.map((key) => {
    const temp: any = String(key + 1)
    quantityFiled.push(temp)
  })
  const CountryLists = ["India"]
  const getCountryList = async () => {
    const countryList: any = await accountStore.getCountries()
    if (countryList?.data?.length > 0) {
      getStates("India")
      setCountryList(() => countryList?.data)
    }
  }
  const getStates = async (country: string) => {
    const states: any = await accountStore.getStates(country)
    setStateList(() => states?.data)
  }
  const getCity = async (state: string) => {
    const cities: any = await accountStore.getCities(state)
    setCityList(() => cities?.data)
  }
  const getReceiverStates = async (country: string) => {
    const states: any = await accountStore.getStates(country)
    setReceiverStateList(() => states?.data)
  }
  const getReceiverCity = async (state: string) => {
    const cities: any = await accountStore.getCities(state)
    setReceiverCityList(() => cities?.data)
  }
  const GCquantity: any = quantityFiled
  const isFixedPrice = cardDetail?.maxPrice - cardDetail?.minPrice === 0
  const captureCheckBoxValues = (e: any) => {
    updateFormValues({ ...formValues, [e.target.name]: e.target.checked })
  }

  const loggedInAddressDetails = userData?.addresses?.filter((data: any) => data?.isPrimary === "true")

  useEffect(() => {
    const { sku } = router.query
    setCardSku(sku)
  }, [router.query])

  const checkAmountValidation = (EnteredAmount: any) => {
    const { status, errorMsg, fieldName } = TextfieldValidator(gcConstants.amount, EnteredAmount, cardDetail)
    updateErrorMessage({ ...ErrorMessage, [fieldName]: errorMsg })
    updateFormValues({
      ...formValues,
      [gcConstants.amount]: isFixedPrice ? cardDetail?.minPrice : EnteredAmount,
    })
    formValidation(status, gcConstants.amount)
  }

  useEffect(() => {
    cardDetail?.minPrice && cardDetail?.maxPrice && checkAmountValidation(formValues?.amount)

    if (cardDetail?.customPricing) {
      updateFormValues({
        ...formValues,
        [gcConstants.amount]: cardDetail?.minPrice,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues?.amount, cardDetail?.minPrice, cardDetail?.maxPrice, isFixedPrice])

  useMemo(() => {
    if (isLoggedIn && !isEdit) {
      // commented this state as clients dont want it disable fields
      // setShouldDisable((prev: any) => ({
      //   ...prev,
      //   [gcConstants.senderFirstName]: !!userData?.nameDetails?.firstName,
      //   [gcConstants.senderLastName]: !!userData?.nameDetails?.lastName,
      //   [gcConstants.senderEmail]: !!userData?.primaryEmailId,
      //   senderCountryCode: !!userData?.primaryMobile?.isdCode,
      //   [gcConstants.senderMobile]: !!userData?.primaryMobile?.phoneNumber,
      //   [gcConstants.senderAddress]: !!loggedInAddressDetails?.[0]?.house || !!loggedInAddressDetails?.[0]?.addressLine,
      //   [gcConstants.senderState]: !!loggedInAddressDetails?.[0]?.state,
      //   [gcConstants.senderCity]: !!loggedInAddressDetails?.[0]?.cityTown,
      //   [gcConstants.senderPinCode]: !!loggedInAddressDetails?.[0]?.pinCode,
      //   [gcConstants.senderCountry]: !!loggedInAddressDetails?.[0]?.country,
      // }))
      updateFormValues({
        ...formValues,
        [gcConstants.senderFirstName]: userData?.nameDetails?.firstName,
        [gcConstants.senderLastName]: userData?.nameDetails?.lastName,
        [gcConstants.senderEmail]: userData?.primaryEmailId,
        [gcConstants.senderMobile]: userData?.primaryMobile?.phoneNumber,
        [gcConstants.senderCountry]: loggedInAddressDetails?.[0]?.country
          ? loggedInAddressDetails?.[0]?.country
          : "India",
        [gcConstants.senderAddress]:
          loggedInAddressDetails?.[0]?.house || loggedInAddressDetails?.[0]?.addressLine
            ? `${loggedInAddressDetails?.[0]?.house ?? ""} ${loggedInAddressDetails?.[0]?.addressLine ?? ""}`
            : formValues.senderAddress
            ? formValues.senderAddress
            : "",
        [gcConstants.senderState]: loggedInAddressDetails?.[0]?.state
          ? loggedInAddressDetails?.[0]?.state
          : formValues?.senderState
          ? formValues?.senderState
          : "",
        [gcConstants.senderCity]: loggedInAddressDetails?.[0]?.cityTown
          ? loggedInAddressDetails?.[0]?.cityTown
          : formValues?.senderCity
          ? formValues?.senderCity
          : "",
        [gcConstants.senderPinCode]: loggedInAddressDetails?.[0]?.pinCode
          ? loggedInAddressDetails?.[0]?.pinCode
          : formValues?.senderPinCode
          ? formValues?.senderPinCode
          : "",
      })
      setSenderCountryCode(userData?.primaryMobile?.isdCode || "+91")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, userData])

  useMemo(() => {
    if (isLoggedIn) {
      let address: any
      !userData && userStore?.getUserData().then((data: any) => setUserData(data?.data))
      const email = userData?.primaryEmailId

      if (selfPurchase) {
        if (isEdit && isEditFormData) {
          setIsEditFormData(false)
        } else {
          updateFormValues({
            ...formValues,
            [gcConstants.receiverFirstName]: userData?.nameDetails?.firstName,
            [gcConstants.senderFirstName]: userData?.nameDetails?.firstName,
            [gcConstants.receiverLastName]: userData?.nameDetails?.lastName,
            [gcConstants.senderLastName]: userData?.nameDetails?.lastName,
            [gcConstants.receiverEmail]: email,
            [gcConstants.receiverMobile]:
              userData?.primaryMobile?.isdCode == "+91" ? userData?.primaryMobile?.phoneNumber : "",
            [gcConstants.additionalReceiverMobile]: userData?.primaryMobile?.phoneNumber,
            [gcConstants.receiverAddress]: isNonIndian
              ? ""
              : address?.[0]?.house || address?.[0]?.addressLine
              ? `${address?.[0]?.house} ${address?.[0]?.addressLine}`
              : formValues.senderAddress
              ? formValues.senderAddress
              : "",
            [gcConstants.receiverState]: isNonIndian
              ? ""
              : address?.[0]?.state
              ? address?.[0]?.state
              : formValues?.senderState
              ? formValues?.senderState
              : "",
            [gcConstants.receiverCity]: isNonIndian
              ? ""
              : address?.[0]?.cityTown
              ? address?.[0]?.cityTown
              : formValues?.senderCity
              ? formValues?.senderCity
              : "",
            [gcConstants.receiverCountry]: address?.[0]?.country ? address?.[0]?.country : "India",
            [gcConstants.receiverPinCode]: isNonIndian
              ? ""
              : address?.[0]?.pinCode
              ? address?.[0]?.pinCode
              : formValues?.senderPinCode
              ? formValues?.senderPinCode
              : "",
            [gcConstants.senderAddress]:
              address?.[0]?.house || address?.[0]?.addressLine
                ? `${address?.[0]?.house} ${address?.[0]?.addressLine}`
                : formValues.senderAddress
                ? formValues.senderAddress
                : "",
            [gcConstants.senderState]: address?.[0]?.state
              ? address?.[0]?.state
              : formValues?.senderState
              ? formValues?.senderState
              : "",
            [gcConstants.senderCity]: address?.[0]?.cityTown
              ? address?.[0]?.cityTown
              : formValues?.senderCity
              ? formValues?.senderCity
              : "",
            [senderCountryCode]: address?.[0]?.country ? address?.[0]?.country : "India",
            [gcConstants.senderPinCode]: address?.[0]?.pinCode
              ? address?.[0]?.pinCode
              : formValues?.senderPinCode
              ? formValues?.senderPinCode
              : "",
            [gcConstants.customMessage]: "",
            [gcConstants.smsSend]: false,
            [gcConstants.sendEmail]: true,
            [gcConstants.sendSMSAndWhatsApp]: false,
            selfPurchase,
          })
        }
      } else {
        if (isEdit && isEditFormData) {
          setIsEditFormData(false)
        } else {
          updateFormValues({
            ...formValues,
            [gcConstants.receiverFirstName]: "",
            [gcConstants.receiverLastName]: "",
            [gcConstants.senderEmail]: email,
            [gcConstants.receiverEmail]: "",
            [gcConstants.senderMobile]: userData?.primaryMobile?.phoneNumber,
            [gcConstants.receiverMobile]: "",
            [gcConstants.additionalReceiverMobile]: "",
            [gcConstants.receiverPinCode]: "",
            [gcConstants.receiverAddress]: "",
            [gcConstants.receiverState]: "",
            [gcConstants.receiverCity]: "",
            [gcConstants.customMessage]: "",
            [gcConstants.senderFirstName]: userData?.nameDetails?.firstName,
            [gcConstants.senderLastName]: userData?.nameDetails?.lastName,
            [gcConstants.smsSend]: false,
            [gcConstants.sendEmail]: true,
            [gcConstants.sendSMSAndWhatsApp]: false,
            selfPurchase,
          })
        }
      }
    }

    Object?.keys(formValues).forEach((key: string) => {
      if (gcFormErrors[key] !== undefined) {
        gcFormErrors[key] = false
      }
    })

    giftCardFormDetailsStore?.resetGCFormErrors && giftCardFormDetailsStore?.resetGCFormErrors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, selfPurchase, isEdit, isEditFormData])

  const emptyGcErrors = giftCardFormDetailsStore?.gcEmptyFormErrors

  const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: isMobile ? "64.688vw" : "21.563vw",
      backgroundColor: theme?.palette?.neuPalette?.hexSixteen,
      color: theme?.palette?.neuPalette?.hexSeventeen,
      padding: isMobile ? "1.563vw 3.750vw 1.875vw" : "0.521vw 1.250vw 0.625vw",
    },
  })
  const isPhysicalGIftCard = giftCardFormDetailsStore?.GCThemeData?.isPhysicalGIftCard

  const PortableText = IHCLContexts!.PortableText

  const inputStylesProps = {
    "& .MuiInputBase-input": {
      paddingLeft: DesktopPxToVw(18),
      "@media (max-width: 640px)": {
        paddingLeft: `${MobilePxToVw(18)} !important`,
      },
    },
    "& .MuiFormLabel-root": {
      paddingLeft: DesktopPxToVw(24),
      "@media (max-width: 640px)": {
        paddingLeft: `${MobilePxToVw(24)} !important`,
      },
    },
  }

  const inputFieldSenderStateInputStyles = {
    width: isMobile ? "100%" : DesktopPxToVw(290),
    "& .MuiFormControl-root": {
      paddingBottom: isMobile ? "0vw !important" : "unset",
    },
    "& .MuiInputBase-root .MuiInput-input": {
      fontSize: isMobile ? MobilePxToVw(24) : DesktopPxToVw(18),
      fontWeight: 300,
    },
    "& input::placeholder": {
      fontSize: isMobile ? MobilePxToVw(24) : DesktopPxToVw(18),
      fontWeight: 300,
    },
    "& .MuiFormLabel-root": {
      fontSize: isMobile ? MobilePxToVw(24) : DesktopPxToVw(18),
    },
  }

  return (
    <FormStyles.GiftcardEnterDetailsMainWrapper $isMobile={isMobile}>
      <Typography variant={isMobile ? "m-heading-s" : "heading-s"} id={"enter-details"}>
        {props?.content?.[0]?.title}
      </Typography>
      <FormStyles.AmountAndQtyBox>
        <CustomTextField
          required
          fontSize={isMobile ? MobilePxToVw(24) : DesktopPxToVw(18)}
          onInput={(e: any) => {
            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 6)
          }}
          showAdornment
          type="tel"
          value={!(formValues?.amount === 0) ? (isNaN(Number(formValues?.amount)) ? "" : formValues?.amount) : ""}
          onKeyDown={RestrictSpecialChar}
          name={gcConstants.amount}
          variant="standard"
          error={
            (formErrors[gcConstants.amount] && formValues?.amount?.length > 0) ||
            (emptyGcErrors[gcConstants.amount] && !formValues.amount)
          }
          onChange={(e: any) => {
            handleChangeForm(e)
          }}
          disabled={isFixedPrice}
          placeholder={props?.items?.[0]?.labelText}
          helperText={
            formErrors?.[gcConstants.amount] && formValues?.amount?.length > 0
              ? ErrorMessage[gcConstants.amount]
              : emptyGcErrors[gcConstants.amount] && !formValues.amount
              ? props?.items?.[0]?.errorText
              : ""
          }
          width={isMobile ? "100%" : DesktopPxToVw(510)}
          fontWeight={300}
        />
        <FormStyles.GiftCardQuantityInputFieldWrapper
          $isMobile={isMobile}
          $quantityErrorMessage={
            (formErrors[gcConstants.quantity] && formValues?.quantity?.length > 0) ||
            (emptyGcErrors[gcConstants.quantity] && formValues?.quantity?.length === 0)
          }>
          <CustomDropDown
            fontSize={isMobile ? MobilePxToVw(24) : DesktopPxToVw(18)}
            fontWeight={300}
            scroll
            openingDelay={350}
            label={props?.items?.[1]?.labelText}
            placeHolder={props?.items?.[1]?.labelText}
            data={GCquantity}
            value={(formValues?.quantity && formValues?.quantity) || ""}
            marginBottom={"0vw !important"}
            minWidth={isMobile ? MobilePxToVw(190) : DesktopPxToVw(210)}
            onChange={(event: any) => {
              updateFormValues({
                ...formValues,
                quantity: event.target.value,
              })
              updateFormErrors({
                ...formErrors,
                quantity: event.target.value?.length === 0,
              })
            }}
            selectMarginTop={isMobile ? `0 !important` : `11px !important`}
          />
          {((formErrors[gcConstants.quantity] && formValues.quantity.length > 0) ||
            (emptyGcErrors[gcConstants.quantity] && formValues.quantity.length === 0)) && (
            <FormStyles.ErrorMessageTypography
              sx={{
                margin: isMobile ? "1vw 0vw 0vw !important" : "0vw",
              }}
              variant={isMobile ? "m-body-xs" : "body-xs"}>
              {props?.items?.[1]?.errorText}
            </FormStyles.ErrorMessageTypography>
          )}
        </FormStyles.GiftCardQuantityInputFieldWrapper>
      </FormStyles.AmountAndQtyBox>
      <FormStyles.CustomerDetailsDataWrapper $isMobile={isMobile}>
        <Typography variant={isMobile ? "m-heading-s" : "heading-s"}>{props?.content?.[1]?.title}</Typography>
        <Box>
          <FormStyles.GiftCardPrimaryBox $isMobile={isMobile}>
            <CustomTextField
              required
              fontSize={isMobile ? MobilePxToVw(24) : DesktopPxToVw(18)}
              width={"100%"}
              fontWeight={300}
              showAdornment
              name={gcConstants.senderFirstName}
              value={formValues.senderFirstName}
              disabled={shouldDisable.senderFirstName}
              error={
                formErrors[gcConstants.senderFirstName] ||
                (emptyGcErrors?.[gcConstants.senderFirstName] && !formValues.senderFirstName)
              }
              placeholder={props?.items?.[2]?.labelText}
              helperText={
                (formErrors[gcConstants.senderFirstName] && props?.items?.[2]?.errorText) ||
                (emptyGcErrors[gcConstants.senderFirstName] &&
                  !formValues.senderFirstName &&
                  props?.items?.[2]?.errorText)
              }
              onChange={(e: any) => handleChangeForm(e)}
              InputLabelProps={{
                shrink: formValues?.senderFirstName ? true : false,
              }}
            />
            <CustomTextField
              required
              fontSize={isMobile ? MobilePxToVw(24) : DesktopPxToVw(18)}
              width={"100%"}
              fontWeight={300}
              showAdornment
              name={gcConstants.senderLastName}
              value={formValues.senderLastName}
              disabled={shouldDisable.senderLastName}
              error={
                formErrors[gcConstants.senderLastName] ||
                (emptyGcErrors[gcConstants.senderLastName] && !formValues.senderLastName)
              }
              placeholder={props?.items?.[3]?.labelText}
              helperText={
                (formErrors[gcConstants.senderLastName] && props?.items?.[3]?.errorText) ||
                (emptyGcErrors[gcConstants.senderLastName] &&
                  !formValues.senderLastName &&
                  props?.items?.[3]?.errorText)
              }
              onChange={(e: any) => handleChangeForm(e)}
              InputLabelProps={{
                shrink: formValues?.senderLastName ? true : false,
              }}
            />
          </FormStyles.GiftCardPrimaryBox>
          <FormStyles.GiftCardSecondaryWrapper
            sx={{ gap: isMobile ? MobilePxToVw(35) : DesktopPxToVw(40) }}
            $isMobile={isMobile}
            id={"sender-details"}>
            <CustomTextField
              required
              fontSize={isMobile ? MobilePxToVw(24) : DesktopPxToVw(18)}
              width={"50%"}
              fontWeight={300}
              showAdornment
              name={gcConstants.senderEmail}
              value={formValues.senderEmail}
              disabled={shouldDisable.senderEmail}
              error={
                formErrors[gcConstants.senderEmail] ||
                (emptyGcErrors[gcConstants.senderEmail] && !formValues.senderEmail)
              }
              placeholder={props?.items?.[4]?.labelText}
              helperText={
                (formErrors[gcConstants.senderEmail] && props?.items?.[4]?.errorText) ||
                (emptyGcErrors[gcConstants.senderEmail] && !formValues.senderEmail && props?.items?.[4]?.errorText)
              }
              onChange={(e: any) => handleChangeForm(e)}
              InputLabelProps={{
                shrink: formValues?.senderEmail ? true : false,
              }}
            />
            <FormStyles.SenderMobileWrapperContent $isMobile={isMobile}>
              <FormStyles.CountryCodeDropdownBox>
                <CountryCodeDropdown
                  onSelectChange={() => {
                    updateFormErrors({
                      ...formErrors,
                      [gcConstants.senderMobile]: false,
                    })
                    updateFormValues({
                      ...formValues,
                      [gcConstants.senderMobile]: "",
                    })
                  }}
                  isDisable={shouldDisable.senderCountryCode}
                  fontSize={isMobile ? MobilePxToVw(20) : DesktopPxToVw(18)}
                  iconStyle={{
                    " & .MuiSvgIcon-root": {
                      marginBottom: `0 !important`,
                    },
                  }}
                  scroll
                  dropdownStyle={{
                    marginLeft: isMobile ? MobilePxToVw(60) : DesktopPxToVw(170),
                    width: isMobile ? MobilePxToVw(500) : DesktopPxToVw(450),
                  }}
                  countryCode={senderCountryCode}
                  setUserCode={setSenderMobileCode}
                  setCountryCode={setSenderCountryCode}
                />
                <CustomTextField
                  required
                  fontSize={isMobile ? MobilePxToVw(24) : DesktopPxToVw(18)}
                  width={"100%"}
                  fontWeight={300}
                  inputFieldStyles={inputStylesProps}
                  disabled={shouldDisable.senderMobile}
                  showAdornment
                  type="tel"
                  onInput={(e: any) => {
                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                  }}
                  variant="standard"
                  placeholder={props?.items?.[5]?.labelText}
                  value={isNaN(Number(formValues.senderMobile)) ? "" : formValues.senderMobile}
                  name={gcConstants.senderMobile}
                  error={
                    formErrors[gcConstants.senderMobile] ||
                    (emptyGcErrors[gcConstants.senderMobile] && !formValues.senderMobile)
                  }
                  onChange={(e: any) => {
                    handleChangeForm(e)
                    giftCardFormDetailsStore?.updateAdditionalReceiverMobile(e.target.value)
                  }}
                  InputLabelProps={{
                    shrink: formValues?.senderMobile ? true : false,
                  }}
                />
              </FormStyles.CountryCodeDropdownBox>
              {((formErrors[gcConstants.senderMobile] && formValues.senderMobile.length > 0) ||
                (emptyGcErrors[gcConstants.senderMobile] && !formValues.senderMobile)) && (
                <FormStyles.ErrorMessageTypography variant={isMobile ? "m-body-xs" : "body-xs"}>
                  {props?.items?.[5]?.errorText}
                </FormStyles.ErrorMessageTypography>
              )}
              {isPhysicalGIftCard && props?.content?.[4]?.content && (
                <FormStyles.PortableTextContentFontWrapper pt={1} $isMobile={isMobile}>
                  <PortableText blocks={props?.content?.[4]?.content} />
                </FormStyles.PortableTextContentFontWrapper>
              )}
            </FormStyles.SenderMobileWrapperContent>
          </FormStyles.GiftCardSecondaryWrapper>
          <FormStyles.GiftCardReceiverAddressWrapper
            $pincodeError={formValues.pinCode?.length > 1 && formValues.pinCode?.length != 6}
            $isMobile={isMobile}>
            <CustomTextField
              fontSize={isMobile ? MobilePxToVw(24) : DesktopPxToVw(18)}
              width={"100%"}
              fontWeight={300}
              multiline
              showAdornment
              rows={isMobile ? 2 : 1}
              disabled={shouldDisable.senderAddress}
              variant="standard"
              placeholder={props?.items?.[6]?.labelText}
              value={formValues.senderAddress}
              name={gcConstants.senderAddress}
              error={
                (formErrors[gcConstants.senderAddress] && formValues.senderAddress?.length > 0) ||
                (emptyGcErrors[gcConstants.senderAddress] && !formValues.senderAddress)
              }
              helperText={
                (formErrors[gcConstants.senderAddress] &&
                  formValues.senderAddress.length > 0 &&
                  props?.items?.[6]?.errorText) ||
                (emptyGcErrors[gcConstants.senderAddress] && !formValues.senderAddress && props?.items?.[6]?.errorText)
              }
              onChange={(e: any) => handleChangeForm(e)}
              inputFieldStyles={{
                textarea: {
                  height: isMobile ? `${MobilePxToVw(36)} !important` : "unset",
                },
              }}
            />
            <CustomTextField
              fontSize={isMobile ? MobilePxToVw(24) : DesktopPxToVw(18)}
              width={"100%"}
              fontWeight={300}
              disabled={shouldDisable.senderPinCode}
              showAdornment
              type="tel"
              value={isNaN(Number(formValues?.senderPinCode)) ? "" : formValues?.senderPinCode}
              onKeyDown={RestrictSpecialChar}
              onInput={(e: any) => {
                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 6)
              }}
              placeholder={props?.items?.[7]?.labelText}
              name={gcConstants.senderPinCode}
              error={formErrors.senderPinCode && formValues.senderPinCode}
              helperText={formErrors.senderPinCode && formValues.senderPinCode && props?.items?.[7]?.errorText}
              onChange={(e: any) => handlePinCode(e, true)}
            />
          </FormStyles.GiftCardReceiverAddressWrapper>
          <FormStyles.GiftCardStateContentWrapper
            $isMobile={isMobile}
            rowGap={isMobile ? `${MobilePxToVw(15)} !important` : ""}
            pt={isMobile ? `${MobilePxToVw(15)} !important` : `${DesktopPxToVw(11)} !important`}>
            <CustomAutoCompleteComponent
              disabled={shouldDisable.senderCountry}
              disableClearable={formValues?.senderCountry?.length === 0 ? true : false}
              sx={{
                width: isMobile ? "100%" : DesktopPxToVw(290),
                "& .MuiFormControl-root": {
                  paddingBottom: isMobile ? "0vw !important" : "unset",
                },
                "& .MuiInputBase-root .MuiInput-input": {
                  fontSize: isMobile ? MobilePxToVw(24) : DesktopPxToVw(18),
                  fontWeight: 300,
                },
                "& .MuiInputLabel-root": {
                  fontSize: isMobile ? MobilePxToVw(24) : `${DesktopPxToVw(18)} !important`,
                },
                "& input::placeholder": {
                  fontSize: isMobile ? MobilePxToVw(24) : `${DesktopPxToVw(18)} !important`,
                  fontWeight: 300,
                },
                "& .MuiSvgIcon-root": {
                  color: theme?.palette?.neuPalette?.hexSeventeen,
                  opacity: shouldDisable.senderCountry ? 0.5 : 1,
                  width: isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
                  height: "auto",
                },
                ".MuiFormLabel-root": {
                  fontSize: isMobile ? MobilePxToVw(24) : `${DesktopPxToVw(18)} !important`,
                },
              }}
              noOptionsText={countryList?.length === 0 ? "Please wait fetching country list..." : ""}
              value={formValues?.senderCountry}
              options={countryList || []}
              onChange={(event: any, newValue: any) => {
                updateFormErrors({ ...gcFormErrors, senderPinCode: newValue?.toLowerCase() === "india" })

                updateFormValues({
                  ...formValues,
                  senderState: "",
                  senderCity: "",
                  senderCountry: newValue as string,
                }),
                  updateGCEmptyFormErrors({
                    ...gcFormErrors,
                    senderPinCode: isPhysicalGIftCard ? true : false,
                  })
                setStateList(() => [])
                getStates(newValue)
              }}
              renderInput={(params: any) => (
                <FormStyles.AutoCompleteInput
                  {...params}
                  disabled={shouldDisable.senderCountry}
                  value={formValues?.senderCountry}
                  variant="standard"
                  label={props?.items?.[8]?.labelText}
                  placeholder={props?.items?.[8]?.labelText}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                  error={formErrors[gcConstants.senderCountry]}
                />
              )}
              getOptionLabel={(option: any) => option}
            />
            {/* states */}
            <CustomAutoCompleteComponent
              disabled={shouldDisable.senderState}
              disableClearable={formValues?.senderState?.length === 0 ? true : false}
              noOptionsText={
                !formValues?.senderCountry
                  ? "Please select country first"
                  : stateList?.length === 0
                  ? "Please wait fetching states list..."
                  : ""
              }
              value={formValues?.senderState}
              options={(formValues?.senderCountry && stateList) || []}
              sx={{
                ...inputFieldSenderStateInputStyles,
                "& .MuiSvgIcon-root": {
                  color: theme?.palette?.neuPalette?.hexSeventeen,
                  opacity: shouldDisable.senderState ? 0.5 : 1,
                  width: isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
                  height: "auto",
                },
              }}
              onChange={(event: any, newValue: any) => {
                updateFormValues({
                  ...formValues,
                  senderState: newValue,
                  senderCity: isNonIndian ? formValues?.senderCity : "",
                  senderPinCode: isNonIndian ? formValues?.senderPinCode : "",
                })
                updateGCEmptyFormErrors({
                  ...gcFormErrors,
                  senderPinCode: isPhysicalGIftCard ? true : false,
                })
                setCityList(() => [])
                getCity(newValue)
              }}
              renderInput={(params: any) => (
                <FormStyles.AutoCompleteInput
                  {...params}
                  disabled={shouldDisable.senderState}
                  variant="standard"
                  label={props?.items?.[9]?.labelText}
                  placeholder={props?.items?.[9]?.labelText}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                  error={
                    formErrors[gcConstants.senderState] ||
                    (emptyGcErrors[gcConstants.senderState] && !formValues?.senderState)
                  }
                  helperText={
                    (formErrors[gcConstants.senderState] &&
                      formValues.senderState.length > 0 &&
                      props?.items?.[9]?.errorText) ||
                    (emptyGcErrors[gcConstants.senderState] && !formValues?.senderState && props?.items?.[9]?.errorText)
                  }
                />
              )}
              getOptionLabel={(option: any) => option}
            />
            <CustomAutoCompleteComponent
              disabled={shouldDisable.senderCity}
              sx={{
                ...inputFieldSenderStateInputStyles,
                "& .MuiSvgIcon-root": {
                  color: theme?.palette?.neuPalette?.hexSeventeen,
                  opacity: shouldDisable.senderCity ? 0.5 : 1,
                  width: isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
                  height: "auto",
                },
              }}
              value={formValues?.senderCity}
              disableClearable={formValues?.senderCity?.length === 0 ? true : false}
              noOptionsText={
                !formValues?.senderState
                  ? "Please select state first"
                  : cityList?.length === 0
                  ? "Please wait fetching cities list..."
                  : ""
              }
              options={formValues?.senderState && cityList ? cityList : []}
              onChange={(event: any, newValue: any) => {
                updateFormValues({
                  ...formValues,
                  senderCity: newValue,
                  senderPinCode: isNonIndian ? formValues?.senderPinCode : "",
                })
                updateGCEmptyFormErrors({
                  ...gcFormErrors,
                  senderPinCode: isPhysicalGIftCard ? true : false,
                })
              }}
              renderInput={(params: any) => (
                <FormStyles.AutoCompleteInput
                  {...params}
                  disabled={shouldDisable.senderCity}
                  variant="standard"
                  label={props?.items?.[10]?.labelText}
                  placeholder={props?.items?.[10]?.labelText}
                  helperText={
                    emptyGcErrors[gcConstants.senderCity] &&
                    !formValues?.[gcConstants.senderCity] &&
                    props?.items?.[10]?.errorText
                  }
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                  error={
                    formErrors[gcConstants.senderCity] ||
                    (emptyGcErrors[gcConstants.senderCity] && !formValues?.senderCity)
                  }
                />
              )}
              getOptionLabel={(option: any) => option}
            />
          </FormStyles.GiftCardStateContentWrapper>
        </Box>
      </FormStyles.CustomerDetailsDataWrapper>
      <Box
        sx={{
          paddingTop: isMobile ? `0` : `${DesktopPxToVw(60)}`,
        }}>
        <Box>
          <FormStyles.TitleTextWrapper>
            <FormStyles.ReceiverDetailsTitleTextWrapper $isMobile={isMobile}>
              <Typography
                sx={{ paddingTop: isMobile ? MobilePxToVw(55) : 0 }}
                variant={isMobile ? "m-heading-s" : "heading-s"}>
                {props?.content?.[2]?.title}
              </Typography>
              {isLoggedIn && (
                <Stack
                  flexDirection={isMobile ? "column" : "row"}
                  alignItems={isMobile ? "flex-start" : "center"}
                  columnGap={DesktopPxToVw(20)}
                  rowGap={isMobile ? MobilePxToVw(20) : "unset"}
                  pt={isMobile ? `${MobilePxToVw(35)}` : ""}>
                  <Typography
                    variant={isMobile ? "m-body-l" : "body-s"}
                    sx={{
                      color: theme?.palette?.neuPalette?.hexSeventeen,
                    }}>
                    {CONSTANTS?.PURCHASE_TEXT}
                  </Typography>
                  <FormStyles.PurchaseForBox>
                    <FormStyles.StyledButton
                      sx={{ width: "60%" }}
                      $active={!selfPurchase}
                      name={gcConstants.amount}
                      onClick={() => {
                        giftCardFormDetailsStore?.resetGCFormErrors && giftCardFormDetailsStore?.resetGCFormErrors()
                        setSelfPurchase(false)
                      }}
                      startIcon={
                        !selfPurchase && (
                          <ButtonTickIcon
                            sx={{
                              width: isMobile ? MobilePxToVw(30) : DesktopPxToVw(30),
                            }}
                          />
                        )
                      }>
                      {CONSTANTS?.SOMEONE_ELSE}
                    </FormStyles.StyledButton>
                    <FormStyles.StyledButton
                      sx={{ width: "40%" }}
                      startIcon={
                        selfPurchase && (
                          <ButtonTickIcon
                            sx={{
                              width: isMobile ? MobilePxToVw(30) : DesktopPxToVw(30),
                            }}
                          />
                        )
                      }
                      $active={selfPurchase}
                      name={gcConstants.amount}
                      onClick={() => {
                        giftCardFormDetailsStore?.resetGCFormErrors && giftCardFormDetailsStore?.resetGCFormErrors()
                        setSelfPurchase(true)
                      }}>
                      {CONSTANTS?.MYSELF}
                    </FormStyles.StyledButton>
                  </FormStyles.PurchaseForBox>
                </Stack>
              )}
            </FormStyles.ReceiverDetailsTitleTextWrapper>
          </FormStyles.TitleTextWrapper>
        </Box>
        <Box>
          <FormStyles.GiftCardPrimaryBox
            $isMobile={isMobile}
            sx={{
              paddingTop: isMobile ? MobilePxToVw(17) : DesktopPxToVw(18),
            }}>
            <CustomTextField
              required
              fontSize={isMobile ? MobilePxToVw(24) : DesktopPxToVw(18)}
              width={"100%"}
              fontWeight={300}
              showAdornment
              name={gcConstants.receiverFirstName}
              value={formValues.receiverFirstName}
              disabled={shouldDisable.receiverFirstName}
              error={
                formErrors[gcConstants.receiverFirstName] ||
                (emptyGcErrors[gcConstants.receiverFirstName] &&
                  !formValues.receiverFirstName &&
                  props?.items?.[11]?.errorText)
              }
              placeholder={props?.items?.[11]?.labelText}
              helperText={
                (formErrors[gcConstants.receiverFirstName] &&
                  formValues.receiverFirstName.length > 0 &&
                  props?.items?.[11]?.errorText) ||
                (emptyGcErrors[gcConstants.receiverFirstName] &&
                  !formValues.receiverFirstName &&
                  props?.items?.[11]?.errorText)
              }
              onChange={(e: any) => handleChangeForm(e)}
              InputLabelProps={{
                shrink: formValues?.receiverFirstName ? true : false,
              }}
            />
            <CustomTextField
              required
              fontSize={isMobile ? MobilePxToVw(24) : DesktopPxToVw(18)}
              width={"100%"}
              fontWeight={300}
              showAdornment
              name={gcConstants.receiverLastName}
              value={formValues.receiverLastName}
              disabled={shouldDisable.receiverLastName}
              error={
                formErrors[gcConstants.receiverLastName] ||
                (emptyGcErrors[gcConstants.receiverLastName] &&
                  !formValues.receiverLastName &&
                  props?.items?.[12]?.errorText)
              }
              placeholder={props?.items?.[12]?.labelText}
              helperText={
                (formErrors[gcConstants.receiverLastName] &&
                  formValues.receiverLastName.length > 0 &&
                  ErrorMessage[gcConstants.receiverLastName]) ||
                (emptyGcErrors[gcConstants.receiverLastName] &&
                  !formValues.receiverLastName &&
                  props?.items?.[12]?.errorText)
              }
              onChange={(e: any) => handleChangeForm(e)}
              InputLabelProps={{
                shrink: formValues?.receiverLastName ? true : false,
              }}
            />
          </FormStyles.GiftCardPrimaryBox>
          <FormStyles.GiftCardReceiverFormSecondaryWrapper $isMobile={isMobile}>
            <CustomTextField
              required
              fontSize={isMobile ? MobilePxToVw(24) : DesktopPxToVw(18)}
              width={"50%"}
              fontWeight={300}
              showAdornment
              name={gcConstants.receiverEmail}
              value={formValues.receiverEmail}
              disabled={shouldDisable.receiverEmail}
              error={
                formErrors[gcConstants.receiverEmail] ||
                (emptyGcErrors[gcConstants.receiverEmail] && !formValues.receiverEmail)
              }
              placeholder={props?.items?.[13]?.labelText}
              helperText={
                (formErrors[gcConstants.receiverEmail] &&
                  formValues.receiverEmail.length > 0 &&
                  props?.items?.[13]?.errorText) ||
                (emptyGcErrors[gcConstants.receiverEmail] && !formValues.receiverEmail && props?.items?.[13]?.errorText)
              }
              onChange={(e: any) => handleChangeForm(e)}
              InputLabelProps={{
                shrink: formValues?.receiverEmail ? true : false,
              }}
            />
            <FormStyles.ReceiverCountryCodeWrapperContent $isMobile={isMobile}>
              <FormStyles.CountryCodeDropdownBox>
                <CountryCodeDropdown
                  fontSize={isMobile ? MobilePxToVw(20) : DesktopPxToVw(18)}
                  iconStyle={{
                    " & .MuiSvgIcon-root": {
                      marginBottom: `0 !important`,
                    },
                  }}
                  isDisable
                  dropdownStyle={{
                    marginLeft: isMobile ? MobilePxToVw(60) : DesktopPxToVw(170),
                    width: isMobile ? MobilePxToVw(500) : DesktopPxToVw(450),
                  }}
                  countryCode={receiverCountryCode}
                  setCountryCode={setReceiverCountryCode}
                />
                <CustomTextField
                  required
                  fontSize={isMobile ? MobilePxToVw(24) : DesktopPxToVw(18)}
                  width={"100%"}
                  fontWeight={300}
                  inputFieldStyles={inputStylesProps}
                  disabled={shouldDisable.receiverMobile}
                  showAdornment
                  type="tel"
                  onInput={(e: any) => {
                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                  }}
                  variant="standard"
                  placeholder={props?.items?.[14]?.labelText}
                  value={isNaN(Number(formValues.receiverMobile)) ? "" : formValues.receiverMobile}
                  name={gcConstants.receiverMobile}
                  error={
                    formErrors[gcConstants.receiverMobile] ||
                    (emptyGcErrors[gcConstants.receiverMobile] && !formValues.receiverMobile)
                  }
                  onChange={(e: any) => {
                    handleChangeForm(e)
                    giftCardFormDetailsStore?.updateAdditionalReceiverMobile(e.target.value)
                  }}
                  InputLabelProps={{
                    shrink: formValues?.receiverMobile ? true : false,
                  }}
                />
              </FormStyles.CountryCodeDropdownBox>
              {((formErrors[gcConstants.receiverMobile] && formValues.receiverMobile.length > 0) ||
                (emptyGcErrors[gcConstants.receiverMobile] && !formValues.receiverMobile)) && (
                <FormStyles.ErrorMessageTypography variant={isMobile ? "m-body-xs" : "body-xs"}>
                  {props?.items?.[14]?.errorText}
                </FormStyles.ErrorMessageTypography>
              )}
              <Box>{isPhysicalGIftCard && <Typography pt={1}>{props?.[0]?.errorText}</Typography>}</Box>
            </FormStyles.ReceiverCountryCodeWrapperContent>
          </FormStyles.GiftCardReceiverFormSecondaryWrapper>

          <FormStyles.GiftCardReceiverAddressWrapper
            $pincodeError={formValues.pinCode?.length > 1 && formValues.pinCode?.length != 6}
            $isMobile={isMobile}
            sx={{
              paddingTop: isMobile ? MobilePxToVw(14) : DesktopPxToVw(8),
            }}
            id={"receiver-details"}>
            <CustomTextField
              required={isPhysicalGIftCard}
              fontSize={isMobile ? MobilePxToVw(24) : DesktopPxToVw(18)}
              width={isMobile ? "100%" : DesktopPxToVw(620)}
              fontWeight={300}
              multiline
              showAdornment
              rows={isMobile ? 2 : 1}
              disabled={shouldDisable?.receiverAddress}
              variant="standard"
              placeholder={props?.items?.[15]?.labelText}
              value={formValues.receiverAddress}
              name={gcConstants.receiverAddress}
              error={
                (formErrors[gcConstants.receiverAddress] && formValues.receiverAddress?.length > 0) ||
                (emptyGcErrors[gcConstants.receiverAddress] && !formValues.receiverAddress)
              }
              helperText={
                (formErrors[gcConstants.receiverAddress] &&
                  formValues.receiverAddress.length > 0 &&
                  props?.items?.[15]?.errorText) ||
                (emptyGcErrors[gcConstants.receiverAddress] &&
                  !formValues.receiverAddress &&
                  props?.items?.[15]?.errorText)
              }
              onChange={(e: any) => handleChangeForm(e)}
              inputFieldStyles={{
                textarea: {
                  height: isMobile ? `${MobilePxToVw(36)} !important` : "unset",
                },
              }}
            />
            <CustomTextField
              fontSize={isMobile ? MobilePxToVw(24) : DesktopPxToVw(18)}
              width={isMobile ? "100%" : DesktopPxToVw(290)}
              fontWeight={300}
              disabled={shouldDisable?.receiverPinCode}
              showAdornment
              type="tel"
              value={isNaN(Number(formValues?.receiverPinCode)) ? "" : formValues?.receiverPinCode}
              onKeyDown={RestrictSpecialChar}
              onInput={(e: any) => {
                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 6)
              }}
              required={isPhysicalGIftCard}
              placeholder={props?.items?.[16]?.labelText}
              name={gcConstants.receiverPinCode}
              error={
                (formValues.receiverPinCode?.length > 1 && formValues.receiverPinCode?.length != 6) ||
                (gcFormErrors.receiverPinCode && !formValues.receiverPinCode)
              }
              helperText={
                ((formValues.receiverPinCode?.length > 1 && formValues.receiverPinCode?.length != 6) ||
                  formErrors[gcConstants.receiverPinCode] ||
                  (gcFormErrors.receiverPinCode && !formValues.receiverPinCode)) &&
                props?.items?.[16]?.errorText
              }
              onChange={(e: any) => handlePinCode(e, false)}
            />
          </FormStyles.GiftCardReceiverAddressWrapper>
          <FormStyles.GiftCardStateContentWrapper
            $isMobile={isMobile}
            sx={{
              paddingTop: isMobile ? MobilePxToVw(14) : DesktopPxToVw(16),
            }}>
            <CustomAutoCompleteComponent
              disabled
              options={CountryLists || []}
              onChange={(event: any, newValue: any) => {
                updateFormValues({
                  ...formValues,
                  receiverState: "",
                  receiverCountry: newValue as string,
                })
              }}
              value={"India"}
              getOptionLabel={(option: any) => option}
              sx={{
                "& .MuiFormControl-root": {
                  paddingBottom: isMobile ? "0vw !important" : "unset",
                },
                width: isMobile ? "100%" : DesktopPxToVw(290),
                "& .MuiInputBase-root .MuiInput-input": {
                  fontSize: isMobile ? MobilePxToVw(24) : DesktopPxToVw(18),
                  fontWeight: 300,
                },
                "& .MuiInputLabel-root": {
                  fontSize: isMobile ? MobilePxToVw(24) : DesktopPxToVw(18),
                },
                ".MuiInputBase-root": { alignItems: "center !important" },
              }}
              renderInput={(params: any) => (
                <ClickAwayListener onClickAway={() => setReceiverCountryOpenToolTip(false)}>
                  <FormStyles.AutoCompleteInput
                    {...params}
                    InputProps={{
                      ...params.inputProps,
                      endAdornment: (
                        <>
                          {isMobile ? (
                            <CustomWidthTooltip
                              arrow
                              disableFocusListener
                              disableHoverListener
                              disableTouchListener
                              PopperProps={{
                                disablePortal: true,
                                sx: {
                                  "& .MuiTooltip-arrow": {
                                    color: theme?.palette?.neuPalette?.hexSixteen,
                                  },
                                },
                              }}
                              open={receiverCountryOpenToolTip}
                              placement={"top-start"}
                              title={
                                <Typography
                                  sx={{
                                    "& *": {
                                      fontSize: MobilePxToVw(18),
                                    },
                                  }}>
                                  {props?.content?.[5]?.content && (
                                    <FormStyles.PortableTextContentFontWrapper $isMobile={isMobile}>
                                      <PortableText blocks={props?.content?.[5]?.content} />
                                    </FormStyles.PortableTextContentFontWrapper>
                                  )}
                                </Typography>
                              }>
                              <IconButton
                                sx={{
                                  cursor: "pointer",
                                  padding: `${MobilePxToVw(3)} ${MobilePxToVw(8)}`,
                                }}>
                                <Box
                                  loading="lazy"
                                  component="img"
                                  src={TOOL_TIP_ICON}
                                  onClick={() => setReceiverCountryOpenToolTip(true)}
                                />
                              </IconButton>
                            </CustomWidthTooltip>
                          ) : (
                            <CustomWidthTooltip
                              arrow
                              PopperProps={{
                                sx: {
                                  "& .MuiTooltip-arrow": {
                                    color: theme?.palette?.neuPalette?.hexSixteen,
                                  },
                                },
                              }}
                              open={receiverCountryOpenToolTip}
                              placement={"top"}
                              title={
                                <Typography
                                  sx={{
                                    "& *": {
                                      fontSize: DesktopPxToVw(18),
                                    },
                                  }}>
                                  {props?.content?.[5]?.content && (
                                    <FormStyles.PortableTextContentFontWrapper $isMobile={isMobile}>
                                      <PortableText blocks={props?.content?.[5]?.content} />
                                    </FormStyles.PortableTextContentFontWrapper>
                                  )}
                                </Typography>
                              }>
                              <IconButton
                                sx={{
                                  cursor: "pointer",
                                  padding: `${DesktopPxToVw(3)} ${DesktopPxToVw(8)}`,
                                }}>
                                <Box
                                  loading="lazy"
                                  component="img"
                                  src={TOOL_TIP_ICON}
                                  onMouseOver={() => setReceiverCountryOpenToolTip(true)}
                                  onMouseLeave={() => setReceiverCountryOpenToolTip(false)}
                                />
                              </IconButton>
                            </CustomWidthTooltip>
                          )}
                        </>
                      ),
                    }}
                    required={isPhysicalGIftCard}
                    label={props?.items?.[17]?.labelText}
                    variant="standard"
                    error={formErrors[gcConstants.quantity]}
                    placeholder={props?.items?.[17]?.labelText}
                  />
                </ClickAwayListener>
              )}
            />
            {/* states */}
            <CustomAutoCompleteComponent
              disabled={shouldDisable.receiverState}
              noOptionsText={
                !formValues?.receiverCountry
                  ? "Please select country first"
                  : receiverStateList?.length === 0
                  ? "Please wait fetching states list..."
                  : ""
              }
              value={formValues?.receiverState}
              disableClearable={formValues?.receiverState?.length === 0 ? true : false}
              options={(formValues?.receiverCountry && receiverStateList) || []}
              sx={{
                ...inputFieldSenderStateInputStyles,
                "& .MuiSvgIcon-root": {
                  color: theme?.palette?.neuPalette?.hexSeventeen,
                  opacity: selfPurchase ? 0.5 : 1,
                  width: isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
                  height: "auto",
                },
              }}
              onOpen={() => getReceiverStates("India")}
              onChange={(event: any, newValue: any) => {
                updateFormValues({
                  ...formValues,
                  receiverState: newValue,
                  receiverCity: "",
                  receiverPinCode: "",
                })
                updateGCEmptyFormErrors({
                  ...gcFormErrors,
                  receiverPinCode: isPhysicalGIftCard ? true : false,
                })
                setReceiverCityList(() => [])
                getReceiverCity(newValue)
              }}
              renderInput={(params: any) => (
                <FormStyles.AutoCompleteInput
                  {...params}
                  disabled={shouldDisable.receiverState}
                  required={isPhysicalGIftCard}
                  variant="standard"
                  label={props?.items?.[18]?.labelText}
                  placeholder={props?.items?.[18]?.labelText}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                  error={
                    formErrors[gcConstants.receiverState] ||
                    (emptyGcErrors[gcConstants.receiverState] && !formValues?.receiverState)
                  }
                  helperText={
                    (formErrors[gcConstants.receiverState] &&
                      formValues.receiverState.length > 0 &&
                      props?.items?.[18]?.errorText) ||
                    (emptyGcErrors[gcConstants.receiverState] &&
                      !formValues?.receiverState &&
                      props?.items?.[18]?.errorText)
                  }
                />
              )}
              getOptionLabel={(option: any) => option}
            />
            <CustomAutoCompleteComponent
              disabled={shouldDisable.receiverCity}
              sx={{
                ...inputFieldSenderStateInputStyles,
                "& .MuiSvgIcon-root": {
                  color: theme?.palette?.neuPalette?.hexSeventeen,
                  opacity: selfPurchase ? 0.5 : 1,
                  width: isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
                  height: "auto",
                },
              }}
              value={formValues?.receiverCity}
              disableClearable={formValues?.receiverCity?.length === 0 ? true : false}
              noOptionsText={
                !formValues?.receiverState
                  ? "Please select state first"
                  : receiverCityList?.length === 0
                  ? "Please wait fetching cities list..."
                  : ""
              }
              options={formValues?.receiverState && receiverCityList ? receiverCityList : []}
              onOpen={() => getReceiverCity(formValues?.receiverState)}
              onChange={(event: any, newValue: any) => {
                updateFormValues({
                  ...formValues,
                  receiverCity: newValue,
                  receiverPinCode: "",
                })
                updateGCEmptyFormErrors({
                  ...gcFormErrors,
                  receiverPinCode: isPhysicalGIftCard ? true : false,
                })
              }}
              renderInput={(params: any) => (
                <FormStyles.AutoCompleteInput
                  {...params}
                  disabled={shouldDisable.receiverCity}
                  required={isPhysicalGIftCard}
                  variant="standard"
                  label={props?.items?.[19]?.labelText}
                  placeholder={props?.items?.[19]?.labelText}
                  helperText={
                    emptyGcErrors[gcConstants.receiverCity] &&
                    !formValues?.receiverCity &&
                    props?.items?.[19]?.errorText
                  }
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                  error={
                    formErrors[gcConstants.receiverCity] ||
                    (emptyGcErrors[gcConstants.receiverCity] && !formValues?.receiverCity)
                  }
                />
              )}
              getOptionLabel={(option: any) => option}
            />
          </FormStyles.GiftCardStateContentWrapper>
          <FormStyles.YourMessageContainerWrapper $isMobile={isMobile}>
            <Typography variant={isMobile ? "m-body-l" : "body-s"}>{props?.items?.[20]?.labelText}</Typography>
            <FormStyles.AutoSizeTextArea
              minRows={2.6}
              maxRows={2.6}
              name={gcConstants.customMessage}
              sx={{
                background: "none",
                "& .MuiInputBase-root": {
                  fontSize: isMobile ? MobilePxToVw(24) : DesktopPxToVw(18),
                  fontWeight: 300,
                },
              }}
              value={formValues.customMessage}
              onChange={(e: any) => e.target.value?.length <= 180 && handleChangeForm(e)}
            />
            <FormStyles.CharactersTypography
              $formValuesLength={formValues?.customMessage?.length > 100}
              variant={isMobile ? "m-body-sl" : "body-s"}
              $isMobile={isMobile}>
              {`(${formValues?.customMessage?.length}/${CONSTANTS.TEXT_AREA_CHARACTER_LIMIT})`}
            </FormStyles.CharactersTypography>
            {(emptyGcErrors[gcConstants.customMessage] ||
              (formErrors[gcConstants.customMessage] && formValues.customMessage?.length > 0)) && (
              <FormStyles.ErrorMessageTypography variant={isMobile ? "m-body-xs" : "body-xs"}>
                {props?.items?.[20]?.errorText}
              </FormStyles.ErrorMessageTypography>
            )}
          </FormStyles.YourMessageContainerWrapper>
        </Box>
      </Box>
      {!isPhysicalGIftCard && (
        <FormStyles.CustomerDetailsDataWrapper $isMobile={isMobile}>
          <FormStyles.AdditionalDeliveryContainer $selfPurchase={selfPurchase}>
            <FormStyles.SectionTitle variant={isMobile ? "m-heading-s" : "heading-s"}>
              {props?.content?.[3]?.title}
            </FormStyles.SectionTitle>
            <FormStyles.AdditionalSubText variant={isMobile ? "m-body-xs" : "body-xs"} $isMobile={isMobile}>
              <PortableText blocks={props?.content?.[3]?.content?.[0]} />
            </FormStyles.AdditionalSubText>
            <FormStyles.GiftCardCheckBoxTextWrapper $isMobile={isMobile}>
              <FormStyles.CustomCheckBoxWrapper>
                {/* Send By Email Check Box is commented as per client Requirement */}
                {/* <FormStyles.CustomCheckBoxContent sx={{ minWidth: "10.06vw" }}>
                <CustomCheckBox
                  onChange={captureCheckBoxValues}
                  checked={formValues.sendEmail}
                  name={gcConstants.sendEmail}
                  isCheckBoxDisabled
                />
                <Typography variant={isMobile ? "m-body-sl" : "body-s"}>
                  {isMobile ? formData?.mobileSendEmail : formData?.formEmail}
                </Typography>
              </FormStyles.CustomCheckBoxContent> */}
                <FormStyles.CustomCheckBoxContent sx={{ minWidth: "10.06vw" }}>
                  <CustomCheckBox
                    onChange={captureCheckBoxValues}
                    checked={formValues.sendSMSAndWhatsApp}
                    name={gcConstants.sendSMSAndWhatsApp}
                  />
                  <Typography variant={isMobile ? "m-body-sl" : "body-s"}>
                    {isMobile ? formData?.mobileSendSMSAndWhatsApp : formData?.formSMSAndWhatsApp}
                  </Typography>
                </FormStyles.CustomCheckBoxContent>
              </FormStyles.CustomCheckBoxWrapper>
              <FormStyles.AdditionalReceiverCountryContent $isMobile={isMobile}>
                <FormStyles.CountryCodeDropdownBox sx={{ justifyContent: isMobile ? "unset" : "center" }}>
                  <CountryCodeDropdown
                    fontSize={isMobile ? MobilePxToVw(20) : DesktopPxToVw(18)}
                    iconStyle={{
                      " & .MuiSvgIcon-root": {
                        marginBottom: `0 !important`,
                      },
                    }}
                    isDisable
                    dropdownStyle={{
                      marginLeft: isMobile ? MobilePxToVw(60) : DesktopPxToVw(170),
                      width: isMobile ? MobilePxToVw(500) : DesktopPxToVw(450),
                    }}
                    countryCode={additionalReceiverCountryCode}
                    setCountryCode={setAdditionalReceiverCountryCode}
                  />
                  <CustomTextField
                    required
                    fontSize={isMobile ? MobilePxToVw(24) : DesktopPxToVw(18)}
                    width={"50%"}
                    fontWeight={300}
                    disabled={true}
                    showAdornment
                    type="tel"
                    onInput={(e: any) => {
                      e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                    }}
                    variant="standard"
                    placeholder={props?.items?.[21]?.labelText}
                    value={
                      selfPurchase
                        ? formValues?.receiverMobile
                        : isNaN(Number(formValues?.receiverMobile))
                        ? ""
                        : formValues?.receiverMobile
                    }
                    name={gcConstants.additionalReceiverMobile}
                    error={!selfPurchase && formErrors[gcConstants.additionalReceiverMobile]}
                    onChange={(e: any) => handleChangeForm(e)}
                    inputFieldStyles={inputStylesProps}
                    InputLabelProps={{
                      shrink: formValues?.receiverMobile ? true : false,
                    }}
                  />
                </FormStyles.CountryCodeDropdownBox>
              </FormStyles.AdditionalReceiverCountryContent>
            </FormStyles.GiftCardCheckBoxTextWrapper>
          </FormStyles.AdditionalDeliveryContainer>
        </FormStyles.CustomerDetailsDataWrapper>
      )}
    </FormStyles.GiftcardEnterDetailsMainWrapper>
  )
}

export default observer(EnterDetailsForm)
