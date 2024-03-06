import {
  orderRefNumber,
  senderEmail,
  senderFirstName,
  senderMobile,
  amount,
} from "../../../../components/forms/gift-card-form/constants"
import { PAGE_STORES } from "../../../../utils/Constants"
import AccountStore from "../../store/pageStore/account.store"

export const validateErrorsAndSubmit = async (
  forStay: string,
  formValues: any,
  stayDate: any,
  setStayDate: any,
  setFormErrors: any,
  setErrorMessage: any,
  formErrors: any,
  stayHotelName: any,
  pageContextUse: any,
  setRequestSuccess: any,
  setOpenCalender: any,
  setFormValues: any,
  initialFormValues: any,
  setStayHotelName: any,
  setOtherHotelName: any,
  otherHotelName: any,
  setReservationStayDate: any,
  setDocument: any,
  document: any,
  ErrorMessage: any,
  receiverCountryCode: string,
  reservationDate: any,
  setIsFormSubmit:Function
) => {
  let payloadRequest: any
  const accountStore = pageContextUse?.getPageStore(
    PAGE_STORES.ACCOUNT_STORES.myAccountStore
  ) as AccountStore

  let isValid = false
    const isDocExists = Boolean(document)
  if (forStay === "forStay") {
    if (
      !formValues?.[senderFirstName] ||
      !formValues?.[orderRefNumber] ||
      (!!formValues?.[orderRefNumber] &&
        (formValues?.[orderRefNumber]?.length < 9 ||
          formValues?.[orderRefNumber]?.length > 15)) ||
      stayDate?.length === 0 ||
      !stayHotelName || !stayHotelName?.name || !stayHotelName?.brand_name ||
      !formValues?.[senderEmail] ||
      !formValues?.[senderMobile] ||
      (JSON.parse(formValues?.havePhysicalCopy) == true
        ? !document
        : !formValues?.[amount] || Number(formValues?.[amount]) <= 0)
    ) {
            const isAmountExists =
        JSON.parse(formValues?.havePhysicalCopy) == false
          ? !formValues?.[amount] || Number(formValues?.[amount]) <= 0
          : false

      setFormErrors({
        ...formErrors,
        senderFirstName: !formValues?.[senderFirstName],
        orderRefNumber:
          formValues?.[orderRefNumber]?.length < 9 ||
          formValues?.[orderRefNumber]?.length > 15,
        stayDate: stayDate?.length === 0,
        hotelName: !stayHotelName || !stayHotelName?.name || !stayHotelName?.brand_name,
        senderEmail: formErrors?.senderEmail,
        senderMobile: formValues?.[senderMobile]?.length < 10,
        document: isDocExists,
        amount: isAmountExists,
      })
      setErrorMessage({
        senderFirstName: !formValues?.[senderFirstName]
          ? "Please enter your name."
          : "",
        stayDate: stayDate?.length === 0 ? "Please enter your stay dates." : "",
        orderRefNumber:
          formValues?.[orderRefNumber]?.length < 9 ||
          formValues?.[orderRefNumber]?.length > 15
            ? "Please enter confirmation / invoice number."
            : "",
        hotelName: "Please choose the hotel.",
        senderEmail: formErrors?.senderEmail
          ? "Please enter your email."
          : "",
        senderMobile:
          formValues?.[senderMobile]?.length < 10
            ? "Please enter your mobile number."
            : "",
        document: isDocExists ? "Please upload the file." : "",
        amount: isAmountExists
          ? "Please enter the amount spent during the stay."
          : "",
      })
      window.scroll(0, 400)
      return
    } else {
      isValid = true
      setFormErrors({
        ...formErrors,
        senderFirstName: false,
        orderRefNumber: false,
        stayDate: false,
        hotelName: false,
        senderEmail: false,
        senderMobile: false,
        otherHotelName: false,
        document: false,
      })
    }
    payloadRequest = {
      typeOfClaim: "STAY",
      info: {
        hotelName: stayHotelName?.name,
        checkIn: String(stayDate?.[0]?.toLocaleDateString("en-GB")),
        checkOut: String(stayDate?.[1]?.toLocaleDateString("en-GB")),
      },
      customerName: formValues?.[senderFirstName],
      mobile: receiverCountryCode + formValues?.[senderMobile],
      email: formValues?.[senderEmail],
      confirmationNumber: formValues?.[orderRefNumber],
      doHaveACopyOfReceipt: isDocExists,
      billAmount: parseFloat(formValues?.[amount]),
    }
  } else {
    if (
      !formValues?.[senderFirstName] ||
      !otherHotelName?.name ||
      !formValues?.[senderEmail] ||
      !formValues?.[senderMobile] ||
      (JSON.parse(formValues?.havePhysicalCopy) == true
        ? !document
        : !formValues?.[amount] || Number(formValues?.[amount]) <= 0)
    ) {
       const isDocExists = Boolean(document)

      const isAmountExists =
        JSON.parse(formValues?.havePhysicalCopy) == false
          ? !formValues?.[amount] || Number(formValues?.[amount]) <= 0
          : false

      setFormErrors({
        ...formErrors,
        senderFirstName: !formValues?.[senderFirstName],
        otherHotelName: !otherHotelName?.name,
        senderEmail: formErrors?.senderEmail,
        senderMobile: formValues?.[senderMobile]?.length < 10,
        document: isDocExists,
        amount: isAmountExists,
      })
      setErrorMessage({
        senderFirstName: !formValues?.[senderFirstName]
          ? "Please enter a valid Name"
          : "",
        stayDate: stayDate?.length === 0 ? "Please enter a valid dates" : "",
        otherHotelName: "Please enter a Hotel name",
        senderEmail: formErrors?.senderEmail
          ? "Please enter a valid Email address"
          : "",
        senderMobile:
          formValues?.[senderMobile]?.length < 10
            ? "Please enter a valid Mobile number"
            : "",
        document: isDocExists ? "Please select the file" : "",
        amount: isAmountExists
          ? "Please enter the amount spent during the stay"
          : "",
      })
      window.scroll(0, 400)
      return
    } else {
      isValid = true
      setFormErrors({
        ...formErrors,
        senderFirstName: false,
        orderRefNumber: false,
        stayDate: false,
        hotelName: false,
        senderEmail: false,
        senderMobile: false,
        otherHotelName: false,
        document: false,
      })
    }

    payloadRequest = {
      typeOfClaim: "OTHERS",
      info: {
        hotelName: otherHotelName?.name,
        venueName: formValues?.venueName,
        dateOfReservation: reservationDate,
        time: formValues?.approximateTime,
      },
      customerName: formValues?.[senderFirstName],
      mobile: receiverCountryCode + formValues?.[senderMobile],
      email: formValues?.[senderEmail],
      confirmationNumber: formValues?.[orderRefNumber],
      doHaveACopyOfReceipt: isDocExists,
      billAmount: parseFloat(formValues?.[amount]),
    }
  }
  let formData: any = {
    payload: "",
    file: "",
  }

  // return

  formData.payload = JSON.stringify(payloadRequest)
  formData.file = document

  let response
  setOpenCalender({
    checkInCheckOut: false,
    reservation: false,
  })
  setStayHotelName(null)
  setOtherHotelName(null)
  if (isValid) {
        response = await accountStore?.claimMissingNeuCoins(formData)
    setRequestSuccess(!response?.error?true:false)
    setIsFormSubmit(true)
    global?.window?.scrollBy(0, -400)
    setFormValues(initialFormValues)
    setStayDate(() => [])
    setDocument(null)
    setReservationStayDate("")
  }
}
