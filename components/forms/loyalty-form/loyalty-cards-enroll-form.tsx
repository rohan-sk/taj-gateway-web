import {
  EpicureCardEnrollFormUI,
  AddOnCard,
  data,
  useLoggedIn,
  DefaultValuesInterface,
  InitialValuesInterface,
  cardsWithCardInterface,
  formDisableInitialValues,
  initialErrorInterface,
  initialSelectStateInterface,
  Box,
  Grid,
  Tooltip,
  TooltipProps,
  Typography,
  styled,
  tooltipClasses,
  pinCode,
  address,
  addOnFirstName,
  receiverMobile,
  useContext,
  useEffect,
  useRef,
  useState,
  TextfieldValidator,
  LoyaltyStore,
  GetDefaultValue,
  theme,
  UserStore,
  observer,
  useMobileCheck,
  GLOBAL_STORES,
  PAGE_STORES,
  useRouter,
  PageContext,
  IHCLContext,
  PincodeServiceability,
  LoyaltyGlobalStore,
  GridContainerWrapper,
  formatDateEnGB,
  formatDateWithHyphen,
  EpicureFormInitialValues,
  EpicureCheckboxValidations,
} from "./epicure-imports.component"

const LoyaltyCardsEnrollForm = ({ props, parentProps }: cardsWithCardInterface) => {
  const pageContext = useContext(PageContext)
  const IHCLContexts = useContext(IHCLContext)
  const isLogin = useLoggedIn()

  //global user store
  const userStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore

  // loyalty page store
  const loyaltyEnrollStore = pageContext?.getPageStore(
    PAGE_STORES.LOYALTY_STORES.loyaltyEpicureCardsStore,
  ) as LoyaltyStore

  //global loyalty store
  const epicureGlobalStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.loyaltyGlobalStore) as LoyaltyGlobalStore

  const [userData, setUserData] = useState<any>()
  const [date, setDate] = useState<string>("")
  const [formDate, setFormDate] = useState<string>("")
  const [addOnFormDate, setAddOnFormDate] = useState<string>("")
  const [addOnDate, setAddOnDate] = useState<string>("")
  const [openForm, setOpenForm] = useState<boolean>(false)
  const [ErrorMessage, setErrorMessage] = useState<string>()
  const [countryCode, setCountryCode] = useState<string>("+91")
  const [addOnCountryCode, setAddOnCountryCode] = useState<string>("+91")
  const [invalidPinCode, setInvalidPinCode] = useState<boolean>(false)
  const [voucherCode, setVoucherCode] = useState<string>("")
  const [voucherPin, setVoucherPin] = useState<any>()
  const [open, setOpen] = useState<boolean>(false)
  const [openToolTip, setOpenToolTip] = useState<boolean>(false)
  const [clusterItem, setClusterItem] = useState<boolean>(false)
  const [disableForm, setDisableForm] = useState<boolean>(false)
  const [errors, setErrors] = useState<initialErrorInterface>(EpicureFormInitialValues?.INITIAL_ERRORS)
  const [loyaltyOpen, setLoyaltyOpen] = useState<initialSelectStateInterface>(
    EpicureFormInitialValues?.INITIAL_SELECT_STATE,
  )
  const [select, setSelect] = useState<DefaultValuesInterface>(EpicureFormInitialValues?.DEFAULT_VALUES)
  const [values, setValues] = useState<InitialValuesInterface>(EpicureFormInitialValues?.INITIAL_VALUES)
  const [disable, setDisable] = useState<formDisableInitialValues>(EpicureFormInitialValues?.INITIAL_STATES)
  const [duplicateValueError, setDuplicateValueError] = useState<{
    duplicateMobile: boolean
    duplicateEmail: boolean
  }>({ duplicateMobile: false, duplicateEmail: false })

  const [terms, setTerms] = useState<boolean>(false)
  const { updateCurrentStepper } = loyaltyEnrollStore

  const customerHash = global?.localStorage?.getItem("customerHash")
  const isMobile = useMobileCheck()
  const router = useRouter()
  const boxRef: any = useRef(null)
  const isBank = epicureGlobalStore?.epicureCardData?.isBankUrl
  const isShareholder = epicureGlobalStore?.epicureCardData?.isShareHolder
  const scrollRef = useRef<any>(null)
  const PaymentStepper = loyaltyEnrollStore?.currentStepper?.stepName === "PAYMENT"
  const orderId: any = global?.window?.sessionStorage?.getItem("order_id") || ""
  const membershipType = "Corporate"

  //  updating terms and conditions checkbox state
  useEffect(() => {
    loyaltyEnrollStore?.updateTermsAndPolicyCheck(terms)
  }, [loyaltyEnrollStore, terms])

  // fetch order API when user creates order and re-loads page
  useEffect(() => {
    const fetchOrder = async () => {
      const response = await loyaltyEnrollStore?.EpicureFetchOrderAPI(orderId)
      if (!response?.error) {
        const userLoyaltyData = response?.data?.orderLineItems?.[0]?.loyalty
        updateCurrentStepper({ stepName: "PAYMENT" })
        loyaltyEnrollStore.updateEpcOrderId(response?.data?.orderId)
        loyaltyEnrollStore.setTotalAmountPayable(response?.data?.payableAmount)
        const convertedDate =
          GetDefaultValue(userLoyaltyData?.membershipDetails?.user?.date_of_birth) &&
          formatDateWithHyphen(userLoyaltyData?.membershipDetails?.user?.date_of_birth)
        const convertedAddOnDate =
          GetDefaultValue(userLoyaltyData?.memberCardDetails?.addOnCardDetails?.dateOfBirth) &&
          formatDateWithHyphen(userLoyaltyData?.memberCardDetails?.addOnCardDetails?.dateOfBirth)

        setSelect((prev: any) => {
          return {
            ...prev,
            title: userLoyaltyData?.membershipDetails?.user?.salutation ?? "",
            state: userLoyaltyData?.memberCardDetails?.extra_data?.state ?? "",
            city: userLoyaltyData?.memberCardDetails?.extra_data?.domicile ?? "",
            addOnTitle: userLoyaltyData?.memberCardDetails?.addOnCardDetails?.title ?? "",
          }
        }),
          setValues((prev: any) => {
            return {
              ...prev,
              firstName: userLoyaltyData?.membershipDetails?.user?.first_name ?? "",
              lastName: userLoyaltyData?.membershipDetails?.user?.last_name ?? "",
              senderEmail: userLoyaltyData?.membershipDetails?.user?.email ?? "",
              receiverMobile: userLoyaltyData?.membershipDetails?.mobile ?? "",
              address: userLoyaltyData?.membershipDetails?.user?.address ?? "",
              gstNo: userLoyaltyData?.memberCardDetails?.extra_data?.gstNumber ?? "",
              pinCode: userLoyaltyData?.membershipDetails?.user?.pincode ?? "",
              addOnFirstName: userLoyaltyData?.memberCardDetails?.addOnCardDetails?.firstName ?? "",
              addOnLastName: userLoyaltyData?.memberCardDetails?.addOnCardDetails?.lastName ?? "",
              addOnEmail: userLoyaltyData?.memberCardDetails?.addOnCardDetails?.email ?? "",
              addOnMobile: userLoyaltyData?.memberCardDetails?.addOnCardDetails?.mobile ?? "",
            }
          }),
          GetDefaultValue(userLoyaltyData?.membershipDetails?.user?.date_of_birth) &&
            setFormDate(userLoyaltyData?.membershipDetails?.user?.date_of_birth)
        GetDefaultValue(userLoyaltyData?.membershipDetails?.user?.date_of_birth) && setDate(convertedDate)
        setAddOnFormDate(convertedAddOnDate ?? "")
        if (userLoyaltyData?.memberCardDetails?.addOnCardDetails?.firstName) {
          setOpenForm(true)
        }
        if (!response?.error) {
          loyaltyEnrollStore?.updateActiveAccordion(isLogin ? 0 : 1)
          setTerms(!terms)
          loyaltyEnrollStore?.updateShowRedeemAndPayment(true)
          loyaltyEnrollStore?.updateEpcOrderId(response?.data?.orderId)
        }
        if (userLoyaltyData?.gravityVoucherPin) {
          setVoucherPin(userLoyaltyData?.gravityVoucherPin)
        }
        if (userLoyaltyData?.gravityVoucherCode) {
          let gravityVoucherCode = userLoyaltyData?.gravityVoucherCode

          // Remove any existing spaces and non-digit characters
          gravityVoucherCode = gravityVoucherCode.replace(/\D/g, "")

          // Add a space every 4 digits
          const splits = gravityVoucherCode?.match(/.{1,4}/g)
          let spacedNumber = ""
          if (splits) {
            spacedNumber = splits?.join(" ")
          }
          if (spacedNumber.slice(0, 1) !== "0") {
            setVoucherCode(spacedNumber)
          }
        }
      } else {
        updateCurrentStepper({ stepName: "DETAILS" })
        loyaltyEnrollStore.updateEpcOrderId("")
        global?.window?.sessionStorage?.removeItem("order_id")
      }
    }
    if (orderId) {
      fetchOrder()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // disable form if order is created
  useEffect(() => {
    if (PaymentStepper) {
      loyaltyEnrollStore?.updateDisableForm(true)
      setDisableForm(true)
    } else {
      loyaltyEnrollStore?.updateDisableForm(false)
      setDisableForm(false)
    }
  }, [PaymentStepper, loyaltyEnrollStore])

  // Storing Add on card data
  useEffect(() => {
    const isAddOn = props?.items?.filter((item: any) => {
      return item?.clusterItems?.[0] && item?.clusterItems?.[0]
    })
    if (isAddOn?.[0]?.clusterItems?.[0]?.isForm) {
      setClusterItem(isAddOn?.[0]?.clusterItems?.[0]?.isForm)
    }
  }, [props?.items])

  // pre-populating the form data for logged-in user
  useEffect(() => {
    if (!loyaltyEnrollStore?.epcOrderId) {
      setSelect((prev: any) => {
        return {
          ...prev,
          country: data?.countryList[0]?.country,
        }
      })
      if (
        (customerHash || userStore?.userDetails?.userHash) &&
        (values?.firstName === "" || values?.senderEmail === "" || values?.receiverMobile === "") &&
        !orderId
      ) {
        const convertedDate = GetDefaultValue(userData?.dob) && formatDateEnGB(userData?.dob)
        let address: any
        let isIndianUser: any
        address = userData?.addresses?.filter((data: any) => data?.isPrimary === "true")
        isIndianUser =
          (address?.[0]?.country !== undefined && address?.[0]?.country?.toLowerCase() === "india") ||
          userData?.primaryMobile?.isdCode === "+91"
            ? true
            : false
        if (
          (address?.[0]?.country?.toLowerCase() === "india" || userData?.primaryMobile?.isdCode === "+91") &&
          address?.[0]?.pinCode?.length < 6
        ) {
          setErrors((prev: any) => {
            return {
              ...prev,
              [pinCode]: true,
            }
          })
        }
        setValues((prev: any) => {
          return {
            ...prev,
            firstName: userData?.nameDetails?.firstName,
            lastName: userData?.nameDetails?.lastName,
            senderEmail: userData?.primaryEmailId,
            receiverMobile: isIndianUser ? userData?.primaryMobile?.phoneNumber : "",
            pinCode: isIndianUser ? address?.[0]?.pinCode : "",
            address: isIndianUser ? address?.[0]?.addressLine : "",
          }
        })
        userData?.primaryMobile?.isdCode !== null &&
          userData?.primaryMobile?.isdCode !== undefined &&
          setSelect((prev: any) => {
            return {
              ...prev,
              title:
                userData?.nameDetails?.salutation?.split(".")[0] ||
                global?.window?.localStorage?.getItem("userSalutation"),
              state: isIndianUser ? address?.[0]?.state : "",
              city: isIndianUser ? address?.[0]?.cityTown : "",
            }
          })
        GetDefaultValue(userData?.dob) && setFormDate(convertedDate)
        GetDefaultValue(userData?.dob) && setDate(userData?.dob)
        setDisable((prev: any) => {
          return {
            ...prev,
            disableSalutation:
              userData?.nameDetails?.salutation !== null && userData?.nameDetails?.salutation !== undefined
                ? true
                : false,
            disableFirstName:
              userData?.nameDetails?.firstName?.length > 0 &&
              userData?.nameDetails?.firstName?.toLowerCase() !== "undefined"
                ? true
                : false,
            disableLastName:
              userData?.nameDetails?.lastName?.length > 0 &&
              userData?.nameDetails?.lastName?.toLowerCase() !== "undefined"
                ? true
                : false,
            disableEmail:
              userData?.primaryEmailId?.length > 0 && userData?.primaryEmailId?.toLowerCase() !== "undefined"
                ? true
                : false,
            disablePhone: userData?.primaryMobile?.phoneNumber?.length > 0 && isIndianUser ? true : false,
            disableDob: convertedDate ? true : false,
            // Made Address editable as per new requirement
            // disableAddress: address?.[0]?.addressLine?.length > 0 ? true : false,
            // disableCountry: true,
            // disableState: address?.[0]?.state?.length > 0 ? true : false,
            // disableCity: address?.[0]?.cityTown?.length > 0 ? true : false,
            // disablePinCode: address?.[0]?.pinCode?.length > 0 ? true : false,
          }
        })
      }
    }
  }, [customerHash, userData, date, userStore?.userDetails?.userHash, orderId, loyaltyEnrollStore?.epcOrderId, values])

  // storing user data in useState
  useEffect(() => {
    if (customerHash || userStore?.userDetails?.userHash) {
      userStore?.getUserData().then((data: any) => {
        setUserData(data?.data)
      })
    }
  }, [customerHash, userStore])

  // handling scroll in cart page
  useEffect(() => {
    userStore?.setPersonalDetailsFormRef(scrollRef)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // add-on card form enabling
  useEffect(() => {
    if (openForm) {
      loyaltyEnrollStore?.updateIsAddOnCardEnable(true)
    } else {
      loyaltyEnrollStore?.updateIsAddOnCardEnable(false)
    }
  }, [loyaltyEnrollStore, openForm])

  // Updating form data in store
  useEffect(() => {
    loyaltyEnrollStore?.showRedeemAndPayment && loyaltyEnrollStore?.updateShowRedeemAndPayment(false)
    loyaltyEnrollStore?.updateFormData(
      select?.title,
      values?.firstName,
      values?.lastName,
      values?.senderEmail,
      values?.receiverMobile,
      formDate,
      values?.address,
      select?.country,
      select?.state,
      select?.city,
      values?.pinCode,
      values?.gstNo,
      countryCode,
    )
    loyaltyEnrollStore?.updateCardData(
      select?.addOnTitle,
      values?.addOnFirstName,
      values?.addOnLastName,
      values?.addOnEmail,
      values?.addOnMobile,
      addOnDate,
      addOnCountryCode,
    )
  }, [addOnCountryCode, addOnDate, countryCode, formDate, loyaltyEnrollStore, select, values])

  // updating form validations in store
  useEffect(() => {
    if (!openForm) {
      if (
        select?.title?.length > 0 &&
        select?.title !== "null" &&
        values?.firstName?.length > 0 &&
        !errors?.firstName &&
        values?.lastName?.length > 0 &&
        !errors?.lastName &&
        values?.senderEmail?.length > 5 &&
        !errors?.senderEmail &&
        values?.receiverMobile?.length > 9 &&
        !errors?.receiverMobile &&
        date &&
        values?.address?.length > 2 &&
        !errors?.address &&
        select?.country &&
        select?.state &&
        select?.city &&
        values?.pinCode?.length > 4 &&
        !errors?.pinCode &&
        !invalidPinCode &&
        (isShareholder || isBank ? voucherPin?.toString()?.length > 5 : true) &&
        (isShareholder || isBank ? voucherCode?.length > 15 : true)
      ) {
        loyaltyEnrollStore?.updateIsFormValid(true)
      } else {
        loyaltyEnrollStore?.updateIsFormValid(false)
      }
    }
    if (openForm) {
      if (
        select?.title?.length > 0 &&
        select?.title !== "null" &&
        values?.firstName?.length > 0 &&
        !errors?.firstName &&
        values?.lastName?.length > 0 &&
        !errors?.lastName &&
        values?.senderEmail?.length > 5 &&
        !errors?.senderEmail &&
        values?.receiverMobile?.length > 9 &&
        !errors?.receiverMobile &&
        date &&
        values?.address?.length > 2 &&
        !errors?.address &&
        select?.country &&
        select?.state &&
        select?.city &&
        values?.pinCode?.length > 4 &&
        !errors?.pinCode &&
        select?.addOnTitle &&
        values?.addOnFirstName?.length > 2 &&
        values?.addOnLastName?.length > 1 &&
        values?.addOnEmail?.length > 6 &&
        values?.addOnMobile?.length > 9 &&
        addOnDate &&
        !duplicateValueError?.duplicateEmail &&
        !duplicateValueError?.duplicateMobile &&
        !invalidPinCode &&
        (isShareholder || isBank ? voucherCode?.length > 15 : true) &&
        (isShareholder || isBank ? voucherPin?.toString()?.length > 5 : true)
      ) {
        loyaltyEnrollStore?.updateIsFormValid(true)
      } else {
        loyaltyEnrollStore?.updateIsFormValid(false)
      }
    }
  }, [
    addOnDate,
    date,
    errors?.address,
    errors?.firstName,
    errors?.lastName,
    errors?.pinCode,
    errors?.receiverMobile,
    errors?.senderEmail,
    loyaltyEnrollStore,
    openForm,
    select,
    values,
    duplicateValueError?.duplicateEmail,
    duplicateValueError?.duplicateMobile,
    isShareholder,
    voucherCode?.length,
    voucherPin,
    invalidPinCode,
    isBank,
    loyaltyEnrollStore?.isFormValid,
  ])

  // updating voucher details in store
  useEffect(() => {
    const formattedVoucherCode = voucherCode.replace(/\s+/g, "")
    if (voucherCode || voucherPin) {
      loyaltyEnrollStore?.updateVouchers(formattedVoucherCode, voucherPin)
    }
  }, [loyaltyEnrollStore, voucherCode, voucherPin])

  const formValidation = (isFormValid: any, id: any) => {
    setErrors({ ...errors, [id]: !isFormValid })
  }

  const handleChange = (event: any) => {
    const { name, value } = event?.target
    const { status, errorMsg } = TextfieldValidator(name, value)
    const validPattern = /^[A-Za-z0-9\s\-,.\/]*$/
    setErrorMessage(errorMsg)
    if (name == receiverMobile || name === "addOnMobile") {
      const result = value.slice(0, 10)
      const phoneNumber = isNaN(result) ? "" : result
      setValues((prev: any) => {
        return {
          ...prev,
          [name]: phoneNumber,
        }
      })
      formValidation(status, name)
    } else if (name == address) {
      if (validPattern.test(value)) {
        setValues((prev: any) => {
          return {
            ...prev,
            [name]: value,
          }
        })
        formValidation(status, name)
      }
    } else {
      setValues((prev: any) => {
        return {
          ...prev,
          [name]: value,
        }
      })
      formValidation(status, name)
    }
  }

  const handleSelectedValue = (event: any, loyaltyKey: string) => {
    const { name, value } = event.target
    setLoyaltyOpen({ ...loyaltyOpen, [loyaltyKey]: false })
    if (name === "city" && values?.pinCode?.length > 5 && select?.city !== value) {
      setValues((prev: any) => {
        return {
          ...prev,
          [pinCode]: "",
        }
      })
    }
    if (name === "state" && select?.state !== value) {
      setValues((prev: any) => {
        return {
          ...prev,
          [pinCode]: "",
        }
      })
      setSelect((prev: any) => {
        return {
          ...prev,
          city: "",
        }
      })
    }
    setSelect((prev: any) => {
      return {
        ...prev,
        [name]: value as string,
      }
    })
  }

  const loyaltyType = (type: string) => {
    scrollRef?.current?.scrollIntoView({
      block: "center",
      inline: "nearest",
      behavior: "smooth",
    })
    setTimeout(() => {
      setLoyaltyOpen({ ...loyaltyOpen, [type]: true })
    }, 400)
  }

  const handleDatePicker = (newValue: any) => {
    const newDate = new Date(newValue)
    const formattedDate = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate()
    const formattedMoth = newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1
    setDate(newValue)
    setFormDate(`${formattedDate}/${formattedMoth}/${newDate.getFullYear()}`)
  }

  const handleAddOnDatePicker = (newValue: any) => {
    const newDate = new Date(newValue)
    const formattedNewDate = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate()
    const formattedMoth = newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1
    setAddOnFormDate(newValue)
    setAddOnDate(`${formattedNewDate}/${formattedMoth}/${newDate.getFullYear()}`)
  }

  const handleVouchers = (event: any) => {
    const { name, value } = event?.target
    if (name === "voucherCode" && value.length <= 19) {
      let inputValue = value

      // Remove any existing spaces and non-digit characters
      inputValue = inputValue.replace(/\D/g, "")

      // Add a space every 4 digits
      const splits = inputValue?.match(/.{1,4}/g)
      let spacedNumber = ""
      if (splits) {
        spacedNumber = splits?.join(" ")
      }
      if (spacedNumber.slice(0, 1) !== "0") {
        setVoucherCode(spacedNumber)
      }
    }
    if (name === "voucherPin" && /^\d*$/.test(value) && value.length <= 6) {
      setVoucherPin(value)
    }
  }

  const handlePincode = async (event: any) => {
    const { name, value } = event.target
    const { status, errorMsg } = TextfieldValidator(name, value)
    setErrorMessage(errorMsg)
    setValues((prev: any) => {
      return {
        ...prev,
        [name]: value,
      }
    })
    if (value?.length === 6) {
      const response = await PincodeServiceability(value)
      if (
        response?.country !== undefined &&
        response?.pincode !== undefined &&
        response?.state !== undefined &&
        response?.city !== undefined &&
        response?.country?.toLowerCase() === "india" &&
        !response?.error
      ) {
        setInvalidPinCode(false)
        select?.state?.toLowerCase() !== response?.state?.toLowerCase() &&
          setSelect((prev: any) => {
            return { ...prev, state: response?.state }
          })
        select?.city?.toLowerCase() !== response?.city?.toLowerCase() &&
          setSelect((prev: any) => {
            return { ...prev, city: response?.city }
          })
      } else {
        setErrors((prev: any) => {
          return {
            ...prev,
            [pinCode]: true,
          }
        })
        setInvalidPinCode(true)
      }
    }
    formValidation(status, name)
  }

  const handleToolTip = () => {
    setOpenToolTip(!openToolTip)
  }

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

  const emptyFieldErrors = loyaltyEnrollStore?.emptyFormErrors

  const handleScroll = () => {
    if (boxRef.current) {
      const elementTop = boxRef.current.getBoundingClientRect().top
      const offset = isMobile ? 100 : 80 // Adjust this offset as needed
      window.scrollTo({
        top: elementTop + window.scrollY - offset,
        behavior: "smooth", // You can use 'auto' or 'smooth'
      })
    }
  }
  // handling scroll inside the form
  useEffect(() => {
    open && handleScroll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // iphone
  useEffect(() => {
    const handleLoad = () => {
      if (isMobile) {
        if (router?.asPath?.includes("#loyaltyForm")) {
          global?.window.scrollBy(0, 0)
        }
      }
    }
    router?.isReady && handleLoad()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router?.isReady, isMobile])

  return (
    <GridContainerWrapper
      sx={{
        border: isMobile ? "none" : "1px solid #acaba8",
        margin: isMobile ? "8.344vw 8.344vw 4vw 8.344vw" : "",
      }}
      aria-label="loyalty-enroll-form">
      <Box sx={{ paddingBottom: isMobile ? "1.875vw" : "1vw" }}>
        <Typography variant={isMobile ? "m-heading-m" : "heading-s"}>{props?.title}</Typography>
        <br />
        <Typography variant={isMobile ? "m-body-sxl" : "body-s"} sx={{ marginBottom: "2vw" }}>
          {props?.subtitle}
        </Typography>
      </Box>
      {/* Primary Form UI */}
      <>
        <EpicureCardEnrollFormUI
          setErrors={setErrors}
          props={props}
          formDate={formDate}
          isBank={isBank}
          date={date}
          membershipType={membershipType}
          scrollRef={scrollRef}
          disable={disable}
          loyaltyOpen={loyaltyOpen}
          loyaltyType={loyaltyType}
          setLoyaltyOpen={setLoyaltyOpen}
          select={select}
          emptyFieldErrors={emptyFieldErrors}
          handleSelectedValue={handleSelectedValue}
          values={values}
          errors={errors}
          handleChange={handleChange}
          countryCode={countryCode}
          setCountryCode={setCountryCode}
          CustomWidthTooltip={CustomWidthTooltip}
          openToolTip={openToolTip}
          setOpenToolTip={setOpenToolTip}
          handleToolTip={handleToolTip}
          handleScroll={handleScroll}
          ErrorMessage={ErrorMessage}
          voucherCode={voucherCode}
          loyaltyEnrollStore={loyaltyEnrollStore}
          handleVouchers={handleVouchers}
          voucherPin={voucherPin}
          setOpenForm={setOpenForm}
          openForm={openForm}
          clusterItem={clusterItem}
          invalidPinCode={invalidPinCode}
          handlePincode={handlePincode}
          handleDatePicker={handleDatePicker}
          boxRef={boxRef}
          setOpen={setOpen}
          open={open}
          disableForm={disableForm}
          setSelect={setSelect}
        />
      </>
      {/* add on card UI */}
      {openForm && (
        <Grid>
          <AddOnCard
            disableForm={disableForm}
            select={select}
            values={values}
            addOnFirstName={addOnFirstName}
            errors={errors}
            handleChange={handleChange}
            handleSelectedValue={handleSelectedValue}
            loyaltyOpen={loyaltyOpen}
            setLoyaltyOpen={setLoyaltyOpen}
            handleAddOnDatePicker={handleAddOnDatePicker}
            addOnFormDate={addOnFormDate}
            addOnCountryCode={addOnCountryCode}
            setAddOnCountryCode={setAddOnCountryCode}
            primaryEmail={values?.senderEmail}
            primaryPhoneNumber={values?.receiverMobile}
            duplicateValueError={duplicateValueError}
            setDuplicateValueError={setDuplicateValueError}
            props={props?.items?.[14]?.clusterItems?.[0]?.items?.[0]}
          />
        </Grid>
      )}
      <EpicureCheckboxValidations
        disableForm={disableForm}
        props={props}
        parentProps={parentProps}
        userStore={userStore}
        bankUrl={isShareholder || isBank}
        terms={terms}
        setTerms={setTerms}
      />
    </GridContainerWrapper>
  )
}
export default observer(LoyaltyCardsEnrollForm)
