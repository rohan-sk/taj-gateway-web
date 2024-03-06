import React, { useContext, useEffect, useState, useRef } from "react"
import { observer } from "mobx-react-lite"
import { ROUTES } from "../../../utils/routes"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import { useMobileCheck } from "../../../utils/isMobilView"
import { AccordionDetails, Box } from "@mui/material"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { MainAccordion } from "../../../features/booking/ui/styles/payment-component"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import LoyaltyStore from "../../../features/loyalty/store/pageStore/loyalty.store"
import manageGCStore from "../../../features/giftCard/store/pageStore/manageGC.store"
import GiftCardStore from "../../../features/giftCard/store/globalStore/gift-card.store"
import LoyaltyGlobalStore from "../../../features/loyalty/store/globalStore/loyalty-global-store"
import { useMembershipType } from "../../../utils/hooks/useMembershipType"

const PaymentDetails = (props: any) => {
  const { title, subtitle } = props
  const isMobile = useMobileCheck()
  const paymentSDKRef: any = useRef(null)
  const pageContext = useContext(PageContext)
  const context = useContext(IHCLContext)

  const { GIFT_CARD, WITHOUTSEO_FOR_ROUTING, LOYALTY } = ROUTES

  const [temp, setTemp] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append(
    "Authorization",
    global?.window.localStorage.getItem("accessToken") || ""
  )

  const giftCardManageStore = pageContext?.getPageStore(
    PAGE_STORES?.giftCardManageCard
  ) as manageGCStore

  const loyaltyEnrollStore = pageContext?.getPageStore(
    PAGE_STORES.LOYALTY_STORES.loyaltyEpicureCardsStore,
  ) as LoyaltyStore

  //global loyalty store
  const { epicureCardData } = context?.getGlobalStore(GLOBAL_STORES.loyaltyGlobalStore) as LoyaltyGlobalStore

  const memberShipPurchaseType = useMembershipType(epicureCardData)

  const epicureReturnUrl = memberShipPurchaseType
    ? `${global?.window?.location?.origin}${LOYALTY?.LOYALTY_PURCHASE_CONFIRMATION}?programType=${memberShipPurchaseType}`
    : `${global?.window?.location?.origin}${LOYALTY?.LOYALTY_PURCHASE_CONFIRMATION}`

  const GCStore = context?.getGlobalStore(GLOBAL_STORES.giftCardStore) as GiftCardStore

  const handleAccordion = () => {
    if (giftCardManageStore?.initiatePaymentSDK) {
      temp.terminate()
      giftCardManageStore?.setInitiatePaymentSDK(false)
    } else {
      giftCardManageStore?.setInitiatePaymentSDK(true)
      handleScroll()
    }
  }

  const handleScroll = () => {
    if (paymentSDKRef?.current) {
      paymentSDKRef?.current?.scrollIntoView({
        block: "start",
        inline: "start",
        behavior: "smooth",
      })
    }
  }

  // Get the current URL's search parameters
  const searchParams = new URLSearchParams(window.location.search)

  // Access a specific query parameter
  const orderIdFromURL = searchParams.get("orderId")

  function hyperCallbackHandler(eventData: any) {
    try {
      if (eventData) {
        const eventJSON =
          typeof eventData === "string" ? JSON.parse(eventData) : eventData
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // for gift card purchase payment
  useEffect(() => {
    async function fetchInitiateData() {
      var requestOptions: any = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          customerHash: localStorage.getItem("customerHash")
            ? localStorage.getItem("customerHash")
            : localStorage.getItem("guestCustomerHash"),
          mobileNo: GCStore?.formValues?.senderMobile || "",
          emailAddress: GCStore?.formValues?.senderEmail || "",
        }),
        redirect: "follow",
      }

      var requestOptions1: any = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          orderId: orderIdFromURL,
          returnUrl: `${global?.window?.location?.origin}${GIFT_CARD?.PURCHASE_SUCCESS}`,
        }),
        redirect: "follow",
      }
      setIsLoading(true)
      fetch(
        `${process.env.NEXT_PUBLIC_PAYMENTS_BASE_API_URL}initiate-sdk`,
        requestOptions
      )
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
      orderIdFromURL &&
      giftCardManageStore?.activeAccordion == 1 &&
      !temp?.initiateTriggered &&
      GCStore?.cartDetails?.priceSummary?.totalPayableAmount !== 0
    ) {
      fetchInitiateData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    temp?.initiateTriggered,
    orderIdFromURL,
    giftCardManageStore?.activeAccordion,
  ])

  // for epicure purchase payment
  useEffect(() => {
    async function fetchInitiateData() {
      var requestOptions: any = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          customerHash: localStorage.getItem("customerHash")
            ? localStorage.getItem("customerHash")
            : localStorage.getItem("guestCustomerHash"),
          mobileNo: loyaltyEnrollStore?.formData?.mobile || "",
          emailAddress: loyaltyEnrollStore?.formData?.email || "",
        }),
        redirect: "follow",
      }

      var requestOptions1: any = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          orderId: loyaltyEnrollStore?.epcOrderId,
          returnUrl: epicureReturnUrl,
        }),
        redirect: "follow",
      }
      setIsLoading(true)
      fetch(
        `${process.env.NEXT_PUBLIC_PAYMENTS_BASE_API_URL}initiate-sdk`,
        requestOptions
      )
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
      loyaltyEnrollStore?.epcOrderId &&
      loyaltyEnrollStore?.activeAccordion == 1 &&
      !temp?.initiateTriggered &&
      Number(epicureCardData?.totalPayableAmount) !== 0
    ) {
      fetchInitiateData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    temp?.initiateTriggered,
    loyaltyEnrollStore?.epcOrderId,
    loyaltyEnrollStore?.activeAccordion,
  ])

  //* using to collapse the Payment accordion, if it it in open expanded state
  useEffect(() => {
    if (giftCardManageStore?.terminatePaymentSDK) {
      temp.terminate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [giftCardManageStore?.terminatePaymentSDK])

  useEffect(() => {
    if (
      giftCardManageStore?.gcTenderModeDetails?.data?.payableAmount === 0 &&
      giftCardManageStore?.gcTenderModeDetails?.data?.orderId &&
      giftCardManageStore?.activeAccordion === 1
    ) {
      global?.window?.location?.assign(
        `${WITHOUTSEO_FOR_ROUTING?.GIFT_CARD?.PURCHASE_SUCCESS}?order_id=${giftCardManageStore?.gcTenderModeDetails?.data?.orderId}`
      )
      giftCardManageStore?.clearOrderId()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    giftCardManageStore?.gcTenderModeDetails?.data,
    giftCardManageStore?.initiatePaymentSDK,
  ])

  return (
    <Box
      aria-label="PaymentDetails"
      sx={{
        margin: isMobile ? "0vw" : "default",
      }}>
      <MainAccordion
        sx={{ padding: "0 !important" }}
        disableGutters
        expanded={giftCardManageStore?.initiatePaymentSDK}
        onChange={handleAccordion}>
        <AccordionDetails sx={{ padding: "0vw" }}>
          <div id="merchantViewId" ref={paymentSDKRef} />
        </AccordionDetails>
      </MainAccordion>
    </Box>
  )
}

export default observer(PaymentDetails)
