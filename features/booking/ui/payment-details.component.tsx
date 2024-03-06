import React, { useContext, useEffect, useState, useRef } from "react"
import { useRouter } from "next/router"
import { observer } from "mobx-react-lite"
import { theme } from "../../../lib/theme"
import { ROUTES } from "../../../utils/routes"
import { CONSTANTS } from "../../../components/constants"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useMobileCheck } from "../../../utils/isMobilView"
import { currency2DecimalSymbol } from "../../../utils/currency"
import BookingsFlowStore from "../store/pageStore/booking.store"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import { Typography, Stack, AccordionDetails, Box } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import BookingFlowGlobalStore from "../store/globalStore/booking.flow.store"
import RenderActionItem from "../../../components/hoc/actions/action-items-ui"
import {
  MainAccordion,
  MainAccordionSummary,
  AccordionSummaryContainer,
  TitleAndSubTitleWrapper,
  CenterAlign,
} from "./styles/payment-component"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"

const PaymentDetails = (props: any) => {
  const { title, subtitle } = props
  const router = useRouter()
  const isMobile = useMobileCheck()
  const paymentSDKRef: any = useRef(null)
  const context: any = useContext(IHCLContext)
  const pageContext: any = useContext(PageContext)

  const { BOOKING } = ROUTES

  const [temp, setTemp] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Authorization", global?.window.localStorage.getItem("accessToken") || "")

  const bookingFlowGlobalStore = context?.getGlobalStore(
    GLOBAL_STORES?.bookingFlowStore
  ) as BookingFlowGlobalStore
  const bookingFlowPageStore = pageContext?.getPageStore(
    PAGE_STORES?.bookingFlowStore
  ) as BookingsFlowStore

  const {
    cartDetails,
    orderDetails,
    initiatePaymentSDK,
    clearOrderResponse,
    terminatePaymentSDK,
    setInitiatePaymentSDK,
    setTerminatePaymentSDK,
    countryCurrencyCode,
    setIsSelectedComplimentaryVoucher,
  } = bookingFlowGlobalStore

  const amountToPay = cartDetails?.cartDetailsResponse?.paymentSummary?.totalPayableAmount
  const currencyCode = countryCurrencyCode
    ? countryCurrencyCode
    : cartDetails?.cartDetailsResponse?.items?.[0]?.hotel?.[0]?.room?.[0]?.currency

  const handleAccordion = () => {
    if (initiatePaymentSDK) {
      temp.terminate()
      setInitiatePaymentSDK(false)
    } else {
      setInitiatePaymentSDK(true)
      handleScroll()
    }
  }

  const handleScroll = () => {
    if (paymentSDKRef?.current) {
      paymentSDKRef?.current?.scrollIntoView({
        block: "center",
        inline: "start",
        behavior: "smooth",
      })
    }
  }

  function hyperCallbackHandler(eventData: any) {
    try {
      if (eventData) {
        const eventJSON = typeof eventData === "string" ? JSON.parse(eventData) : eventData
        const event = eventJSON.event
        //* Check for event key
        if (event == "initiate_result") {
          //*Handle initiate result here
        } else if (event == "process_result") {
          //*Handle process result here
        } else if (event == "user_event") {
          //*Handle Payment Page events
        } else {
          console.log("Unhandled event", event, " Event data", eventData)
        }
      } else {
        console.log("No data received in event", eventData)
      }
    } catch (error) {
      console.log("Error in hyperSDK response", error)
    }
  }

  useEffect(() => {
    setTemp(new global.window.HyperServices())
  }, [])

  useEffect(() => {
    async function fetchInitiateData() {
      var requestOptions: any = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          customerHash:
            localStorage.getItem("customerHash") || localStorage.getItem("guestCustomerHash"),
          mobileNo: bookingFlowPageStore?.guestFormDetails?.phoneNumber,
          emailAddress: bookingFlowPageStore?.guestFormDetails?.email,
        }),
        redirect: "follow",
      }

      var requestOptions1: any = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          orderId: orderDetails?.orderDetailsResponse?.orderId,
          returnUrl: `${global?.window?.location?.origin}${BOOKING?.CONFIRMED_PAGE}`,
        }),
        redirect: "follow",
      }
      setIsLoading(true)
      fetch(`${process.env.NEXT_PUBLIC_PAYMENTS_BASE_API_URL}initiate-sdk`, requestOptions)
        .then((response) => response.text())
        .then(async (result) => {
          await temp?.initiate(JSON.parse(result), hyperCallbackHandler)
          await fetch(
            `${process.env.NEXT_PUBLIC_PAYMENTS_BASE_API_URL}fetch-order`,
            requestOptions1
          )
            .then((response) => response.text())
            .then((result) => {
              temp.process(JSON.parse(result))
              setTimeout(() => {
                setIsLoading(false)
              }, 2000)
            })
            .catch((error) => console.log("error", error))
        })
        .catch((error) => {
          console.log("error", error)
          setIsLoading(false)
        })
    }
    if (
      initiatePaymentSDK &&
      temp?.initiateTriggered === false &&
      orderDetails?.orderDetailsResponse?.orderId &&
      cartDetails?.cartDetailsResponse?.payableAmount !== 0
    ) {
      fetchInitiateData()
    }
    if (
      initiatePaymentSDK &&
      orderDetails?.orderDetailsResponse?.orderId &&
      cartDetails?.cartDetailsResponse?.payableAmount === 0
    ) {
      router?.push(`${global?.window?.location?.origin}${BOOKING?.CONFIRMED_PAGE}`)
      setIsSelectedComplimentaryVoucher(false)
      clearOrderResponse()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [temp?.initiateTriggered, orderDetails?.orderDetailsResponse, initiatePaymentSDK])

  //* using to collapse the Payment accordion, if it it in open expanded state
  useEffect(() => {
    if (terminatePaymentSDK) {
      temp.terminate()
      setTerminatePaymentSDK(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terminatePaymentSDK])

  return (
    <>
      <Box
        ref={paymentSDKRef}
        aria-label="PaymentDetails"
        sx={{
          margin: isMobile ? "6.250vw 7.813vw 14.063vw 7.813vw" : "default",
        }}>
        {amountToPay !== 0 ? (
          <MainAccordion disableGutters expanded={initiatePaymentSDK} onChange={handleAccordion}>
            <MainAccordionSummary
              expandIcon={initiatePaymentSDK && <ExpandMoreIcon style={{ fontSize: "20px" }} />}>
              <AccordionSummaryContainer
                sx={{ width: isMobile ? "100%" : initiatePaymentSDK ? "61%" : "100%" }}>
                <TitleAndSubTitleWrapper sx={{ maxWidth: isMobile ? "60%" : "40%" }}>
                  <Typography
                    sx={{ color: theme?.palette?.text?.primary }}
                    variant={isMobile ? "m-heading-s" : "heading-s"}>
                    {title}
                  </Typography>
                  {!initiatePaymentSDK && (
                    <Typography variant={isMobile ? "m-body-sl" : "body-ml"} marginTop={"0.521vw"}>
                      {subtitle}
                    </Typography>
                  )}
                  {isMobile && (
                    <Stack
                      sx={{
                        mt: MobilePxToVw(5),
                        flexDirection: "row",
                        gap: MobilePxToVw(12),
                        justifyContent: "space-between",
                      }}>
                      <Typography variant={"m-body-m"}>{CONSTANTS?.TOTAL_TO_PAY}</Typography>
                      <Typography variant={"m-body-m"}>
                        {currency2DecimalSymbol(amountToPay || 0, currencyCode)}
                      </Typography>
                    </Stack>
                  )}
                </TitleAndSubTitleWrapper>
                {!isMobile && (
                  <Stack sx={{ justifyContent: "center" }}>
                    <Typography variant={"body-ml"}>{CONSTANTS?.TOTAL_TO_PAY}</Typography>
                    <Typography variant={"body-ml"}>
                      {currency2DecimalSymbol(amountToPay || 0, currencyCode)}
                    </Typography>
                  </Stack>
                )}
                {!initiatePaymentSDK && (
                  <RenderActionItem
                    url={""}
                    isActionButtonType={true}
                    title={props?.primaryAction?.title || CONSTANTS?.PAY_NOW}
                    buttonStyles={{
                      minWidth: isMobile ? MobilePxToVw(160) : DesktopPxToVw(197),
                    }}
                    navigationType={props?.primaryAction?.urlType}
                    variant={props?.primaryAction?.variant}
                  />
                )}
              </AccordionSummaryContainer>
            </MainAccordionSummary>
            <AccordionDetails sx={{ padding: "0vw" }}>
              <div id="merchantViewId" />
            </AccordionDetails>
          </MainAccordion>
        ) : (
          <CenterAlign>
            <RenderActionItem
              url={""}
              onClick={handleAccordion}
              isActionButtonType={true}
              title={CONSTANTS?.CONTINUE_TO_CONFIRM}
              buttonStyles={{
                minWidth: isMobile ? MobilePxToVw(160) : DesktopPxToVw(197),
              }}
              navigationType={props?.primaryAction?.urlType}
              variant={props?.primaryAction?.variant}
            />
          </CenterAlign>
        )}
      </Box>
    </>
  )
}

export default observer(PaymentDetails)
