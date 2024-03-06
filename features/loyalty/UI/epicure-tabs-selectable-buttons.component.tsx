import { Button } from "@mui/material"
import React, { useContext, useState } from "react"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { observer } from "mobx-react-lite"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import LoyaltyStore from "../store/pageStore/loyalty.store"
import { useMobileCheck } from "../../../utils/isMobilView"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import LoyaltyGlobalStore from "../store/globalStore/loyalty-global-store"
import { useRouter } from "next/router"
import { UserStore } from "../../../store"
import { ErrorMessageTypography } from "../../../components/Login/Styles/tabs.styles"
import { useLoggedIn } from "../../../utils/hooks/useLoggedIn"
import dynamic from "next/dynamic"
const Loader = dynamic(() => import("../../../utils/SpinnerComponent"))

const EpicureTabsSelectableButtons = ({ props }: any) => {
  const { tabs, subTitle } = props

  const [loader, setLoader] = useState<boolean>(false)
  const [checkBoxError, setCheckBoxError] = useState<boolean>(false)
  const [apiError, setApiError] = useState<boolean>(false)
  const [apiErrorMessage, setApiErrorMessage] = useState<string>("")
  const context = useContext(IHCLContext)
  const pageContext = useContext(PageContext)
  const router = useRouter()
  const isMobile = useMobileCheck()
  const isLogin = useLoggedIn()
  const paymentURL = props?.tabs?.[0]?.tabItems?.[1]?.primaryAction?.url
  const paymentBankURL = props?.tabs?.[0]?.tabItems?.[1]?.secondaryAction?.url
  const bankName = global?.window?.localStorage?.getItem("bankName")
  const epicurePageStore: any = pageContext?.getPageStore(
    PAGE_STORES.LOYALTY_STORES.loyaltyEpicureCardsStore,
  ) as LoyaltyStore

  //global loyalty store
  const { epicureCardData } = context?.getGlobalStore(GLOBAL_STORES.loyaltyGlobalStore) as LoyaltyGlobalStore

  //global user store
  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore

  const { updateCurrentStepper, EpicureCreateOrderAPI, currentStepper } = epicurePageStore

  const EpicureCreateOrderPayload: any = {
    mobile: epicurePageStore?.formData.mobile,
    gender: epicurePageStore?.formData?.title?.toLowerCase() === "mr" ? "male" : "female",
    salutation: epicurePageStore?.formData.title,
    country: epicurePageStore?.formData.country,
    dateOfBirth: epicurePageStore?.formData.dateOfBirth,
    address: epicurePageStore?.formData.address,
    pinCode: epicurePageStore?.formData.pinCode,
    gstNumber: epicurePageStore?.formData.gstNo,
    extraData: {
      city: epicurePageStore?.formData.city,
      state: epicurePageStore?.formData.state,
      countryCode: epicurePageStore?.formData?.countryCode,
      gravityVoucherCode: epicurePageStore?.vouchers?.voucherCode ? epicurePageStore?.vouchers?.voucherCode : "",
      gravityVoucherPin: epicurePageStore?.vouchers?.voucherPin ? epicurePageStore?.vouchers?.voucherPin : "",
    },
    user: {
      firstName: epicurePageStore?.formData.firstName,
      lastName: epicurePageStore?.formData.lastName,
      email: epicurePageStore?.formData.email,
    },
    addOnCardDetails: {
      obtainAddOnCard: false,
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      dateOfBirth: "",
      mobileCountryCode: "",
    },
    agreedTnc: epicurePageStore?.acceptedTermsAndPolicy,
  }

  const epicureAddonCardPayload: any = {
    mobile: epicurePageStore?.formData.mobile,
    gender: epicurePageStore?.formData?.title?.toLowerCase() === "mr" ? "male" : "female",
    salutation: epicurePageStore?.formData.title,
    country: epicurePageStore?.formData.country,
    dateOfBirth: epicurePageStore?.formData.dateOfBirth,
    address: epicurePageStore?.formData.address,
    pinCode: epicurePageStore?.formData.pinCode,
    gstNumber: epicurePageStore?.formData.gstNo,
    extraData: {
      city: epicurePageStore?.formData.city,
      state: epicurePageStore?.formData.state,
      countryCode: epicurePageStore?.formData?.countryCode,
      gravityVoucherCode: epicurePageStore?.vouchers?.voucherCode ? epicurePageStore?.vouchers?.voucherCode : "",
      gravityVoucherPin: epicurePageStore?.vouchers?.voucherPin ? epicurePageStore?.vouchers?.voucherPin : "",
    },
    user: {
      firstName: epicurePageStore?.formData.firstName,
      lastName: epicurePageStore?.formData.lastName,
      email: epicurePageStore?.formData.email,
    },
    addOnCardDetails: {
      obtainAddOnCard: true,
      title: epicurePageStore?.addOnCardData?.addOnTitle,
      firstName: epicurePageStore?.addOnCardData?.addOnFirstName,
      lastName: epicurePageStore?.addOnCardData?.addOnLastName,
      email: epicurePageStore?.addOnCardData?.addOnEmail,
      mobile: epicurePageStore?.addOnCardData?.addOnMobile,
      dateOfBirth: epicurePageStore?.addOnCardData?.dateOfBirth,
      mobileCountryCode: epicurePageStore?.addOnCardData?.addOnCountryCode,
    },
    agreedTnc: epicurePageStore?.acceptedTermsAndPolicy,
  }

  const createEpicureOrder = async () => {
    let finalPayload: any
    //old order id with addon card
    if (epicurePageStore?.epcOrderId?.length > 0 && epicurePageStore?.isAddOnCardEnable) {
      finalPayload = {
        orderId: epicurePageStore?.epcOrderId,
        ...epicureAddonCardPayload,
      }
    }
    //old order id without on card
    else if (epicurePageStore?.epcOrderId?.length > 0 && !epicurePageStore?.isAddOnCardEnable) {
      finalPayload = {
        orderId: epicurePageStore?.epcOrderId,
        ...EpicureCreateOrderPayload,
      }
    }
    //new order id with addon card
    else if (!(epicurePageStore?.epcOrderId?.length > 0) && epicurePageStore?.isAddOnCardEnable) {
      finalPayload = epicureAddonCardPayload
    }
    //new order id without addon card
    else if (!(epicurePageStore?.epcOrderId?.length > 0) && !epicurePageStore?.isAddOnCardEnable) {
      finalPayload = EpicureCreateOrderPayload
    }
    setLoader(true)

    const response: any = await epicurePageStore?.EpicureCreateOrderAPI(JSON.stringify(finalPayload))
    // for non logged in user
    if (global?.window?.localStorage?.getItem("customerHash") === null) {
      global?.window?.localStorage?.setItem("guestCustomerHash", response?.data?.customerHash)
    }
    if (!response?.error) {
      if (epicurePageStore && Number(epicureCardData?.totalPayableAmount) === 0 && epicureCardData?.isBankUrl) {
        global?.window?.sessionStorage?.setItem("order_id", response?.data?.orderId)
        response?.data?.orderId && (await router?.push(`${paymentBankURL}?programType=bank&order_id=${response?.data?.orderId}&bankName=${bankName}`))
        global?.window?.localStorage?.removeItem("bankName")
        setLoader(false)
      } else if (epicurePageStore && Number(epicureCardData?.totalPayableAmount) === 0) {
        global?.window?.sessionStorage?.setItem("order_id", response?.data?.orderId)
        response?.data?.orderId && (await router?.push(`${paymentURL}`))
        setLoader(false)
      } else {
        updateCurrentStepper({ stepName: "PAYMENT" })
        epicurePageStore?.updateShowRedeemAndPayment(true)
        global?.window?.sessionStorage?.setItem("order_id", response?.data?.orderId)
        epicurePageStore?.updateEpcOrderId(response?.data?.orderId)
        epicurePageStore?.updateActiveAccordion(isLogin ? 0 : 1)
        setLoader(false)
      }
    } else {
      setApiErrorMessage(
        (!!response?.data?.data && response?.data?.data) ||
          (!!response?.data?.data?.extraData && response?.data?.data?.extraData) ||
          (!!response?.data?.statusCode?.description && response?.data?.statusCode?.description) ||
          "",
      )
      setLoader(false)
      setApiError(true)
    }
  }

  const handleEpcErrors = () => {
    const loyaltyFormData: any = epicurePageStore?.formData
    let loyaltyEmptyFormErrors: any = epicurePageStore?.emptyFormErrors
    let loyaltyFormErrors = { ...loyaltyEmptyFormErrors }
    const loyaltyAddOnCardData = epicurePageStore?.addOnCardData
    let loyaltyEmptyAddOnCardErrors: any = epicurePageStore?.emptyAddOnFormErrors
    let loyaltyAddonErrors = { ...loyaltyEmptyAddOnCardErrors }

    Object?.entries(loyaltyFormData)?.forEach(([key, value]) => {
      if (!value) {
        loyaltyFormErrors[key] = true
      } else {
        loyaltyFormErrors[key] = false
      }
      if (!loyaltyFormData?.dateOfBirth) {
        loyaltyFormErrors.dateOfBirth = true
      } else {
        loyaltyFormErrors.dateOfBirth = false
      }
    })
    if (epicurePageStore?.isAddOnCardEnable) {
      Object?.entries(loyaltyAddOnCardData)?.forEach(([key, value]) => {
        if (!value) {
          loyaltyAddonErrors[key] = true
        } else {
          loyaltyAddonErrors[key] = false
        }
      })
    }

    if (epicureCardData?.isBankUrl || epicureCardData?.isShareHolder || epicureCardData?.isTata) {
      if (epicurePageStore?.vouchers?.voucherCode?.length < 15) {
        epicurePageStore?.updateVoucherCodeErrors(true)
      } else {
        epicurePageStore?.updateVoucherCodeErrors(false)
      }
      if (epicurePageStore?.vouchers?.voucherPin?.toString()?.length > 5) {
        epicurePageStore?.updateVoucherPinErrors(false)
      } else {
        epicurePageStore?.updateVoucherPinErrors(true)
      }
    }

    epicurePageStore?.updateEmptyFormErrors(
      loyaltyFormErrors?.title,
      loyaltyFormErrors?.firstName,
      loyaltyFormErrors?.lastName,
      loyaltyFormErrors?.email,
      loyaltyFormErrors?.mobile,
      loyaltyFormErrors?.address,
      loyaltyFormErrors?.country,
      loyaltyFormErrors?.state,
      loyaltyFormErrors?.city,
      loyaltyFormErrors?.pinCode,
      loyaltyFormErrors?.dateOfBirth,
    )
    epicurePageStore?.updateEmptyAddOnFormErrors(
      loyaltyAddonErrors?.addOnTitle,
      loyaltyAddonErrors?.addOnFirstName,
      loyaltyAddonErrors?.addOnLastName,
      loyaltyAddonErrors?.addOnEmail,
      loyaltyAddonErrors?.addOnMobile,
      loyaltyAddonErrors?.dateOfBirth,
    )
    if (
      epicurePageStore?.isAddOnCardEnable
        ? loyaltyFormErrors?.title ||
          loyaltyFormErrors?.firstName ||
          loyaltyFormErrors?.lastName ||
          loyaltyFormErrors?.email ||
          loyaltyFormErrors?.mobile ||
          loyaltyFormErrors?.address ||
          loyaltyFormErrors?.country ||
          loyaltyFormErrors?.state ||
          loyaltyFormErrors?.city ||
          loyaltyFormErrors?.pinCode ||
          loyaltyFormErrors?.dob ||
          loyaltyAddonErrors?.addOnTitle ||
          loyaltyAddonErrors?.addOnFirstName ||
          loyaltyAddonErrors?.addOnLastName ||
          loyaltyAddonErrors?.addOnEmail ||
          loyaltyAddonErrors?.addOnMobile ||
          loyaltyAddonErrors?.dateOfBirth ||
          ((epicureCardData?.isBankUrl || epicureCardData?.isShareHolder || epicureCardData?.isTata) &&
            (epicurePageStore?.EmptyVoucherErrors?.voucherCode ||
              epicurePageStore?.vouchers?.voucherCode?.length < 16 ||
              epicurePageStore?.EmptyVoucherErrors?.voucherPin ||
              epicurePageStore?.vouchers?.voucherPin?.toString()?.length < 6)) ||
          !epicurePageStore?.isFormValid
        : loyaltyFormErrors?.title ||
          loyaltyFormErrors?.firstName ||
          loyaltyFormErrors?.lastName ||
          loyaltyFormErrors?.email ||
          loyaltyFormErrors?.mobile ||
          loyaltyFormErrors?.address ||
          loyaltyFormErrors?.country ||
          loyaltyFormErrors?.state ||
          loyaltyFormErrors?.city ||
          loyaltyFormErrors?.pinCode ||
          loyaltyFormErrors?.dob ||
          !loyaltyFormData?.dateOfBirth ||
          ((epicureCardData?.isBankUrl || epicureCardData?.isShareHolder || epicureCardData?.isTata) &&
            (epicurePageStore?.EmptyVoucherErrors?.voucherCode ||
              epicurePageStore?.vouchers?.voucherCode?.length < 16 ||
              epicurePageStore?.EmptyVoucherErrors?.voucherPin ||
              epicurePageStore?.vouchers?.voucherPin?.toString()?.length < 6)) ||
          !epicurePageStore?.isFormValid
    ) {
      !isMobile &&
        userStore?.personalDetailsFormRef &&
        userStore?.personalDetailsFormRef?.current?.scrollIntoView({
          block: "center",
          inline: "nearest",
          behavior: "smooth",
        })
      if (!epicurePageStore?.acceptedTermsAndPolicy) {
        setCheckBoxError(true)
      }
    } else {
      // create a new order
      if (epicurePageStore?.acceptedTermsAndPolicy) {
        setCheckBoxError(false)
        epicurePageStore?.setTotalAmountPayable(Number(epicurePageStore?.totalAmountPayable))
        createEpicureOrder()
      } else {
        setCheckBoxError(true)
      }
    }
  }
  return (
    <>
      {loader && <Loader />}
      {checkBoxError && currentStepper?.stepName === "DETAILS" && !epicurePageStore?.acceptedTermsAndPolicy && (
        <ErrorMessageTypography m={isMobile ? "0vw 10vw" : ""}>{subTitle}</ErrorMessageTypography>
      )}
      {(apiError || epicurePageStore?.apiError) && currentStepper?.stepName === "DETAILS" && (
        <ErrorMessageTypography m={isMobile ? "0vw 10vw" : ""}>
          {apiErrorMessage || epicurePageStore?.apiError}
        </ErrorMessageTypography>
      )}
      <Button
        sx={{
          margin: isMobile ? "2vw 8.344vw 14.063vw 8.344vw" : "2vw 0vw 0vw 0vw",
          width: isMobile ? MobilePxToVw(157) : DesktopPxToVw(157),
          fontFamily: "Inter",
          fontSize: DesktopPxToVw(18),
          fontWeight: 700,
          textTransform: "uppercase",
          padding: "0vw !important",
        }}
        disabled={currentStepper?.stepName === "PAYMENT"}
        variant={currentStepper?.stepName === "PAYMENT" ? "light-contained" : "light-outlined"}
        onClick={() => handleEpcErrors()}>
        {tabs?.[0]?.title}
      </Button>
    </>
  )
}

export default observer(EpicureTabsSelectableButtons)
