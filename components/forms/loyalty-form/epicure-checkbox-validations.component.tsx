import useStorage from "../../../utils/useStorage"
import {
  Grid,
  Box,
  CustomCheckBox,
  PortableText,
  useRouter,
  useMobileCheck,
  PageContext,
  LoyaltyStore,
  observer,
  LoadingSpinner,
  IHCLContext,
  LoyaltyGlobalStore,
  BoxCustom,
  GAStore,
  UseAddress,
  MemberDataLayer,
  handleEpicureBeginCheckout,
  useLoggedIn,
  useContext,
  useEffect,
  useState,
  GLOBAL_STORES,
  PAGE_STORES,
  MobilePxToVw,
  DesktopPxToVw,
} from "./epicure-imports.component"

const EpicureCheckboxValidations = ({ props, parentProps, userStore, disableForm, terms, setTerms }: any) => {
  const [loader, setLoader] = useState<boolean>(false)
  const router = useRouter()
  const isMobile = useMobileCheck()
  const pageContext = useContext(PageContext)
  const context = useContext(IHCLContext)
  const isLogin = useLoggedIn()
  const epicurePageStore: any = pageContext?.getPageStore(
    PAGE_STORES.LOYALTY_STORES.loyaltyEpicureCardsStore,
  ) as LoyaltyStore

  //global loyalty store
  const { epicureCardData } = context?.getGlobalStore(GLOBAL_STORES.loyaltyGlobalStore) as LoyaltyGlobalStore
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const address = UseAddress(userStore)
  const dataLayer = MemberDataLayer(userStore, gaStoreData)
  const { getItem } = useStorage()
  const isUserLoggedIn: any = global?.localStorage?.getItem("customerHash")
  const { updateCurrentStepper } = epicurePageStore
  const bankName = global?.window?.localStorage?.getItem("bankName")
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
    agreedTnc: terms,
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
    agreedTnc: terms,
  }

  const createEpicureOrder = async () => {
    setLoader(true)
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

    const response: any = await epicurePageStore?.EpicureCreateOrderAPI(JSON.stringify(finalPayload))
    // for non logged in user
    if (global?.window?.localStorage?.getItem("customerHash") === null) {
      global?.window?.localStorage?.setItem("guestCustomerHash", response?.data?.customerHash)
    }
    if (!response?.error) {
      if (!terms) {
        setTerms(!terms)
      }
      if (epicurePageStore && Number(epicureCardData?.totalPayableAmount) === 0 && epicureCardData?.isBankUrl) {
        global?.window?.sessionStorage?.setItem("order_id", response?.data?.orderId)
        response?.data?.orderId &&
          (await router?.push(
            `${props?.PrimaryAction?.url}?programType=bank&order_id=${response?.data?.orderId}&bankName=${bankName}`,
          ))
        global?.window?.localStorage?.removeItem("bankName")
        setLoader(false)
      } else if (epicurePageStore && Number(epicureCardData?.totalPayableAmount) === 0) {
        global?.window?.sessionStorage?.setItem("order_id", response?.data?.orderId)
        response?.data?.orderId && (await router?.push(`${props?.secondaryAction?.url}`))
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
      epicurePageStore?.updateApiError(
        (!!response?.data?.data && response?.data?.data) ||
          (!!response?.data?.data?.extraData && response?.data?.data?.extraData) ||
          (!!response?.data?.statusCode?.description && response?.data?.statusCode?.description) ||
          "",
      )
      setLoader(false)
    }
  }

  const handleEpcErrors = () => {
    const loyaltyFormData = epicurePageStore?.formData
    const loyaltyEmptyFormErrors: any = epicurePageStore?.emptyFormErrors
    const loyaltyFormErrors = { ...loyaltyEmptyFormErrors }
    const loyaltyAddOnCardData = epicurePageStore?.addOnCardData
    const loyaltyEmptyAddOnCardErrors: any = epicurePageStore?.emptyAddOnFormErrors
    const loyaltyAddonErrors = { ...loyaltyEmptyAddOnCardErrors }

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
    } else if (terms) {
      // create a new order
      epicurePageStore?.setTotalAmountPayable(Number(epicurePageStore?.totalAmountPayable))
      createEpicureOrder()
      handleEpicureBeginCheckout(
        "begin_checkout",
        dataLayer,
        address,
        parentProps,
        epicureCardData,
        getItem,
        isUserLoggedIn,
      )
    }
  }

  useEffect(() => {
    handleEpicureBeginCheckout("view_cart", dataLayer, address, parentProps, epicureCardData, getItem, isUserLoggedIn)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTerms = () => {
    setTerms(!terms)
  }

  useEffect(() => {
    if (terms && !epicurePageStore?.epcOrderId) {
      handleEpcErrors()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terms])

  return (
    <Grid aria-label="EpicureCheckboxValidations">
      {loader && <LoadingSpinner />}
      <BoxCustom
        sx={{
          alignItems: "center",
          gap: isMobile ? MobilePxToVw(20) : DesktopPxToVw(0),
          margin: isMobile ? "0VW 3.425vw 0vw 0vw" : "0vw 0vw 2vw 0vw",
        }}>
        <CustomCheckBox
          isCheckBoxDisabled={disableForm}
          withBorder={true}
          checked={terms}
          onChange={() => handleTerms()}
          name={"terms"}
        />
        <Box>
          {props?.items?.[13]?.content?.map((item: any, idx: number) => (
            <PortableText blocks={item} key={idx} />
          ))}
        </Box>
      </BoxCustom>
    </Grid>
  )
}

export default observer(EpicureCheckboxValidations)
