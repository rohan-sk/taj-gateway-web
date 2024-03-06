import React, { useContext, useState } from "react"
import { useRouter } from "next/router"
import { theme } from "../../../lib/theme"
import { observer } from "mobx-react-lite"
import { ROUTES } from "../../../utils/routes"
import { BOOKING_CONSTANT } from "../constants"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { useMobileCheck } from "../../../utils/isMobilView"
import { Box, Button, Grid, Stack, Typography } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import BookingFlowGlobalStore from "../store/globalStore/booking.flow.store"
import TextfieldValidator from "../../../utils/validations/TextfieldValidator"
import CustomTextField from "../../../components/hoc/textField/custom-text-field"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { Expiry, firstName, NumberOnCard } from "../../../components/forms/gift-card-form/constants"

const PayAtHotelForInternationalBooking = () => {
  const router = useRouter()
  const isMobile = useMobileCheck()
  const context: any = useContext(IHCLContext)

  const bookingFlowGlobalStore = context?.getGlobalStore(
    GLOBAL_STORES?.bookingFlowStore
  ) as BookingFlowGlobalStore

  const { orderDetails, clearOrderResponse, setUpdatePaymentType } = bookingFlowGlobalStore

  const customerHash: any =
    global?.localStorage?.getItem("customerHash") ||
    global?.localStorage?.getItem("guestCustomerHash")

  const initialValues = { NumberOnCard: "", Expiry: "", firstName: "" }
  const errorMessage = {
    [Expiry]: "Enter valid date",
    [firstName]: "Please Enter A Valid Card Holder Name",
    [NumberOnCard]: "Please Enter Valid Card Number",
  }

  const [expiryDate, setExpiryDate] = useState<string>("")
  const [error, setError] = useState<boolean | any>(false)
  const [formValues, setFormValues] = useState<any>(initialValues)
  const [expiryDateError, setExpiryDateError] = useState<boolean | any>(false)
  const [ErrorMessage, setErrorMessage] = useState<any>({
    [Expiry]: "",
    [firstName]: "",
    [NumberOnCard]: "",
  })

  const isDisableButton =
    (error?.firstName && formValues?.firstName !== "") ||
    (error?.NumberOnCard &&
      formValues?.NumberOnCard?.length !== 19 &&
      formValues?.NumberOnCard !== "") ||
    (expiryDateError && expiryDate !== "") ||
    expiryDate?.length < 5 ||
    formValues?.firstName?.length < 3 ||
    formValues?.NumberOnCard?.length < 16

  const formValidation = (isFormValid: any, id: any) => {
    setError({ ...error, [id]: !isFormValid })
  }

  const handleCardName = (e: any) => {
    const { name, value } = e.target
    const { status, errorMsg, fieldName } = TextfieldValidator(name, value)
    setErrorMessage((prev: any) => {
      return {
        ...prev,
        [fieldName]: errorMsg,
      }
    })
    setFormValues((prev: any) => {
      return {
        ...prev,
        [fieldName]: value,
      }
    })
    formValidation(status, name)
  }

  const handleCardNumber = (event: any) => {
    let CardNumber = event?.target?.value
    const { status, errorMsg, fieldName } = TextfieldValidator(event?.target?.name, CardNumber)
    if (CardNumber > 19) {
      CardNumber = CardNumber.substr(0, 19)
    }
    const inputVal = CardNumber?.replace(/ /g, "")
    let inputNumbersOnly = inputVal?.replace(/\D/g, "")
    if (inputNumbersOnly?.length >= 16) {
      inputNumbersOnly = inputNumbersOnly
        .replace(/[`~!$%^@*()_|+\=?;:'"<>\{\}\[\]\\]/gi, "")
        .substr(0, 16)
    }
    const splits = inputNumbersOnly?.match(/.{1,4}/g)
    let spacedNumber = ""
    if (splits) {
      spacedNumber = splits?.join(" ")
    }
    if (spacedNumber.slice(0, 1) !== "0") {
      setErrorMessage((prev: any) => {
        return {
          ...prev,
          [fieldName]: errorMsg,
        }
      })
      setFormValues((prev: any) => {
        return {
          ...prev,
          [event.target.name]: spacedNumber?.trim(),
        }
      })
      formValidation(status, event?.target?.name)
    }
  }

  const handleExpiryDate = (event: any) => {
    const inputValue = event?.target?.value
    const cleanedValue = inputValue?.replace(/\D/g, "")?.slice(0, 4)

    if (cleanedValue?.length >= 2) {
      setExpiryDate(
        cleanedValue?.substring(0, 2) +
          `${cleanedValue?.substring(2) && "/"}` +
          cleanedValue?.substring(2)
      )
    } else {
      setExpiryDate(cleanedValue)
    }

    const currentMonth = new Date().getMonth() + 1
    const currentYear = new Date().getFullYear() % 100
    const year = parseInt(cleanedValue?.substring(2), 10)
    const month = parseInt(cleanedValue?.substring(0, 2), 10)

    const isValid =
      month >= 1 &&
      month <= 12 &&
      year >= currentYear &&
      (year > currentYear || month >= currentMonth)

    setExpiryDateError(!isValid)
  }

  const handleCreateBooking = async () => {
    await setUpdatePaymentType({
      cardNo: formValues?.NumberOnCard,
      nameOnCard: formValues?.firstName,
      expiryDate: expiryDate,
      customerHash: customerHash,
      orderId: orderDetails?.orderDetailsResponse?.orderId,
      paymentType: BOOKING_CONSTANT?.PAY_AT_HOTEL,
    })
    router?.push(`${global?.window?.location?.origin}${ROUTES?.BOOKING?.CONFIRMED_PAGE}`)
    orderDetails?.error === false && clearOrderResponse()
  }

  return (
    <Grid container mt={isMobile ? MobilePxToVw(20) : DesktopPxToVw(30)}>
      <Grid item xs={12} sm={12} lg={4} xl={4}>
        <Box>
          <Typography
            component="div"
            variant={isMobile ? "m-body-sl" : "body-ml"}
            sx={{
              fontWeight: 700,
              color: theme.palette.neuPalette.hexTwo,
              textAlign: isMobile ? "center" : "default",
              padding: isMobile ? `0 0 ${MobilePxToVw(30)} 0` : `0 0 0 ${DesktopPxToVw(12)}`,
              borderLeft: isMobile
                ? ""
                : `${DesktopPxToVw(8)} solid ${theme.palette.neuPalette.hexTwo}`,
            }}>
            CREDIT / DEBIT CARD
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} lg={8} xl={8}>
        <Box>
          <Typography variant={isMobile ? "m-heading-xs" : "heading-xs"}>
            ENTER DEBIT / CREDIT CARD DETAILS
          </Typography>
          <Stack sx={{ gap: DesktopPxToVw(10) }}>
            <CustomTextField
              type="text"
              name={firstName}
              variant="standard"
              label={"Name on card*"}
              value={formValues?.firstName}
              onChange={(e: any) => handleCardName(e)}
              error={error?.firstName && formValues?.firstName !== ""}
              l
              helperText={
                error?.firstName && formValues?.firstName !== "" && errorMessage?.[firstName]
              }
            />
            <CustomTextField
              type="text"
              variant="standard"
              name={NumberOnCard}
              label={"Card Number*"}
              error={
                error?.NumberOnCard &&
                formValues?.NumberOnCard?.length !== 19 &&
                formValues?.NumberOnCard !== ""
              }
              value={formValues?.NumberOnCard}
              inputProps={{
                maxLength: 19,
              }}
              onChange={(e: any) => handleCardNumber(e)}
              helperText={
                error?.NumberOnCard &&
                formValues?.NumberOnCard?.length !== 19 &&
                formValues?.NumberOnCard !== "" &&
                errorMessage?.[NumberOnCard]
              }
            />
            <CustomTextField
              id="expiry"
              error={expiryDateError && expiryDate !== ""}
              value={expiryDate}
              variant="standard"
              onChange={handleExpiryDate}
              inputProps={{ maxLength: 5 }}
              label="Expiration Date (MM/YY*)"
              helperText={
                expiryDateError && expiryDate !== ""
                  ? "Invalid MM/YY format"
                  : ""
              }
            />
          </Stack>
          <Button
            disabled={isDisableButton}
            variant="light-contained"
            sx={{
              width: isMobile ? "100%" : "auto",
              mt: isMobile ? MobilePxToVw(30) : DesktopPxToVw(30),
            }}
            onClick={handleCreateBooking}>
            CONFIRM
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default observer(PayAtHotelForInternationalBooking)
