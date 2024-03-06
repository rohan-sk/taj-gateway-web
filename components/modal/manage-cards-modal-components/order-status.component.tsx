import { CONSTANTS } from "../../constants"
import React, { useRef, useState, useEffect } from "react"
import { Box, Stack, Typography } from "@mui/material"
import { useMobileCheck } from "../../../utils/isMobilView"
import LoadingSpinner from "../../../utils/SpinnerComponent"
import RenderActionItem from "../../hoc/actions/action-items-ui"
import OrderStatusDetails from "./order-status-details.component"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import TextfieldValidator from "../../../utils/validations/TextfieldValidator"
import GiftCardOrderStatusDetails from "./e-gift-card-order-statusdetails.component"
import manageGCStore from "../../../features/giftCard/store/pageStore/manageGC.store"
import { receiverEmail, orderRefNumber } from "../../forms/gift-card-form/constants"
import { BalanceContainer } from "../styles/manage-card.styles"
import {
  OrderStatusActionPropsWrapper,
  OrderStatusContentWrapper,
  OrderStatusDescriptionWrapper,
} from "../styles/order-status-details.component-styles"
import CustomTextField from "../../hoc/textField/custom-text-field"
import { theme } from "../../../lib/theme"
import { ActionProps, parameterMapItems, singleContentInterface } from "../../types"

interface OrderStatusType {
  PrimaryAction: ActionProps
  secondaryAction: ActionProps
  parameterMap?: parameterMapItems[]
  description: string
  items: any
  content: singleContentInterface[]
}
const OrderStatusComponent = ({ description, items, PrimaryAction, secondaryAction, content }: OrderStatusType) => {
  const [message, setMessage] = useState<any>()
  const [wrongMsg, setWrongMsg] = useState<any>()
  const [orderStatusLevel, setOrderStatusLevel] = useState<number | null>()

  const [orderId, setOrderId] = useState<any | null>()
  const [trackingNumber, setTrackingNumber] = useState<any | null>()
  const [orderStatus, setOrderStatus] = useState<any | null>()
  const [orderTrackingURL, setOrderTrackingURL] = useState<any | null>()
  const [dueDate, setDueDate] = useState<any | null>()
  const [loader, setLoader] = useState<boolean>(false)
  const [isCardType, setIsCardType] = useState<string | null>()
  const isMobile = useMobileCheck()

  const [formValues, setFormValues] = useState<any>({
    [receiverEmail]: "",
    [orderRefNumber]: "",
  })
  const [ErrorMessage, setErrorMessage] = useState<any>({
    [receiverEmail]: "",
    [orderRefNumber]: "",
  })
  const [formErrors, setFormErrors] = useState<any>({
    [receiverEmail]: false,
    [orderRefNumber]: false,
  })
  const isButtonDisable =
    formValues?.[receiverEmail]?.length > 3 &&
    formValues?.[orderRefNumber]?.length > 3 &&
    !formErrors?.[orderRefNumber] &&
    !formErrors?.[receiverEmail]

  const formValidation = (isFormValid: any, name: any) => {
    setFormErrors({ ...formErrors, [name]: !isFormValid })
  }
  const manageGC = new manageGCStore()
  const handleChangeForm = (event: any) => {
    setMessage(null)
    setOrderId(null)
    setDueDate(null)
    setWrongMsg(null)
    setIsCardType(null)
    setOrderStatus(null)
    setTrackingNumber(null)
    setOrderStatusLevel(null)
    setOrderTrackingURL(null)
    const { name, value } = event.target

    const { status, errorMsg, fieldName } = TextfieldValidator(name, value)

    setErrorMessage((prev: any) => {
      return {
        ...prev,
        [fieldName]: errorMsg,
      }
    })
    if (name == "orderRefNumber") {
      const sanitizedValue = value.replace(/[^\w\s]/g, "")
      setFormValues((prev: any) => {
        return {
          ...prev,
          [name]: sanitizedValue,
        }
      })
      formValidation(sanitizedValue?.length >= 3, name)
    } else {
      setFormValues((prev: any) => {
        return {
          ...prev,
          [name]: event?.target?.value,
        }
      })
      formValidation(status, name)
    }
  }
  const handleReset = () => {
    setWrongMsg(null)
    setOrderStatusLevel(null)
    setOrderTrackingURL(null)
    setOrderStatus(null)
    setTrackingNumber(null)
    setOrderId(null)
    setIsCardType(null)
    setFormErrors({
      [receiverEmail]: false,
      [orderRefNumber]: false,
    })
    setFormValues({
      [receiverEmail]: "",
      [orderRefNumber]: "",
    })
  }
  const fetchOrderStatus = (event: any) => {
    event?.preventDefault()
    setWrongMsg("")
    setMessage("")

    if (!isButtonDisable) {
      return
    }

    try {
      setLoader(true)
      manageGC
        .GCOrderStatus(formValues?.[orderRefNumber])
        .then((res) => {
          setOrderStatusLevel(res?.data?.orderStatusIdentifier)
          setOrderId(res?.data?.orderId)
          setTrackingNumber(res?.data?.trackingNumber)
          setOrderStatus(res?.data?.orderStatus)
          setOrderTrackingURL(res?.data?.orderTrackingURL)
          setMessage(res?.data?.status)
          setDueDate(res?.data?.dueDate)
          setIsCardType(res?.data?.cardType)
          if (!res?.data?.status?.message) {
            setWrongMsg(res?.message)
          } else {
            setWrongMsg("")
          }
        })
        .catch((err) => {
          console.error(err)
        })
    } catch (error) {
      console.error(error)
    } finally {
      setLoader(false)
    }
  }
  const boxRef: any = useRef(null)
  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollIntoView({
        block: "center",
        inline: "nearest",
        behavior: "smooth",
      })
    }
  }, [isCardType])

  return (
    <Box className="tab-order-status" aria-label="order-status-component">
      {loader && <LoadingSpinner />}
      <OrderStatusContentWrapper className="tab-panel-box-container" $isMobile={isMobile}>
        <OrderStatusDescriptionWrapper className="order-status-description" $isMobile={isMobile}>
          <Typography variant={isMobile ? "m-body-sl" : "body-s"}>{description}</Typography>
        </OrderStatusDescriptionWrapper>
        <form
          style={{
            textAlign: "center",
            width: "100%",
          }}
          className="my-account-order-form"
          onSubmit={fetchOrderStatus}>
          <Stack
            sx={{
              paddingBottom: isMobile ? "unset" : DesktopPxToVw(40),
            }}
            rowGap={isMobile ? MobilePxToVw(11) : DesktopPxToVw(40)}
            columnGap={isMobile ? MobilePxToVw(35) : DesktopPxToVw(40)}
            width={"100%"}
            flexDirection={isMobile ? "column" : "row"}
            justifyContent="center">
            <Stack
              width={isMobile ? "100%" : DesktopPxToVw(330)}
              sx={{
                display: "flex",
              }}>
              <CustomTextField
                className="order-input-fields"
                width={isMobile ? "100%" : DesktopPxToVw(330)}
                labelFontSize={isMobile ? MobilePxToVw(22) : DesktopPxToVw(18)}
                showAdornment
                placeholder={items?.[0]?.labelText}
                variant="standard"
                value={formValues?.orderRefNumber}
                name={orderRefNumber}
                required
                error={formErrors.orderRefNumber || formValues?.orderRefNumber.length < 0}
                onChange={(e: any) => {
                  handleChangeForm(e)
                }}
                helperText={formErrors?.orderRefNumber && ErrorMessage?.orderRefNumber}
                autoComplete="off"
                $isMobile={isMobile}
              />
            </Stack>

            <Stack
              width={isMobile ? "100%" : DesktopPxToVw(330)}
              sx={{
                display: "flex",
              }}>
              <CustomTextField
                className="order-input-fields"
                width={isMobile ? "100%" : DesktopPxToVw(330)}
                labelFontSize={isMobile ? MobilePxToVw(22) : DesktopPxToVw(18)}
                showAdornment
                placeholder={items?.[1]?.labelText}
                name={receiverEmail}
                required
                error={formErrors?.receiverEmail || formValues?.receiverEmail.length < 0}
                onChange={(e: any) => {
                  handleChangeForm(e)
                }}
                value={formValues?.receiverEmail}
                helperText={formErrors?.receiverEmail && ErrorMessage?.receiverEmail}
                autoComplete="off"
                type="email"
                variant="standard"
                $isMobile={isMobile}
              />
            </Stack>
          </Stack>
          <OrderStatusActionPropsWrapper $isMobile={isMobile}>
            <RenderActionItem
              isDisable={isButtonDisable}
              isDisableRippleEffect
              type
              url=""
              variant={PrimaryAction?.variant}
              navigationType="internal"
              isActionButtonType={true}
              title={PrimaryAction?.title}
            />

            <RenderActionItem
              url={""}
              title={secondaryAction?.title}
              navigationType={undefined}
              variant={secondaryAction?.variant}
              isActionButtonType={true}
              onClick={handleReset}
            />
          </OrderStatusActionPropsWrapper>
        </form>
        {!!wrongMsg && (
          <BalanceContainer>
            <Typography variant={isMobile ? "m-body-l" : "body-l"} color={theme?.palette?.neuPalette?.hexTwentyOne}>
              {wrongMsg}
            </Typography>
          </BalanceContainer>
        )}
      </OrderStatusContentWrapper>
      {(orderStatusLevel || orderStatus || orderId || message || trackingNumber || dueDate || orderTrackingURL) &&
        isCardType === CONSTANTS?.PHYSICAL_GIFT_CARD && (
          <Box
            ref={boxRef}
            pt={isMobile ? `${MobilePxToVw(35)}` : `${DesktopPxToVw(35)}`}
            className={"order-status-data"}>
            <OrderStatusDetails
              OrderStatus={message}
              orderStatusLevel={orderStatusLevel}
              orderStatus={orderStatus}
              orderId={orderId}
              dueDate={dueDate}
              orderTrackingURL={orderTrackingURL}
              trackingNumber={trackingNumber}
            />
          </Box>
        )}
      {isCardType === CONSTANTS?.E_GIFT_CARD && (
        <Box ref={boxRef}>
          <GiftCardOrderStatusDetails content={content} />
        </Box>
      )}
    </Box>
  )
}

export default OrderStatusComponent
