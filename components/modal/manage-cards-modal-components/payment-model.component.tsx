import React, { useContext, useEffect, useState } from "react"
import { ModelContainer } from "../styles/manage-card.styles"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../../utils/Constants"
import GiftCardStore from "../../../features/giftCard/store/globalStore/gift-card.store"
import { ROUTES } from "../../../utils/routes"
import { useLoggedIn } from "../../../utils/hooks/useLoggedIn"

const PaymentModelComponent = () => {
  const [temp, setTemp] = useState<any>()
  const isUserLoggedIn = useLoggedIn()

  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append(
    "Authorization",
    global?.window.localStorage.getItem("accessToken") || ""
  )

  const Context = useContext(IHCLContext)
  const { GIFT_CARD } = ROUTES
  const giftCardGlobalStore = Context?.getGlobalStore(
    GLOBAL_STORES?.giftCardStore
  ) as GiftCardStore

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
      var initSdkOptions: any = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          customerHash: localStorage.getItem("customerHash")
            ? localStorage.getItem("customerHash")
            : localStorage.getItem("guestCustomerHash"),
          mobileNo: giftCardGlobalStore?.formValues?.senderMobile || "",
          emailAddress: giftCardGlobalStore?.formValues?.senderEmail || "",
        }),
      }

      var fetchOrderOptions: any = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          orderId: giftCardGlobalStore?.reloadGcDetails?.orderId,
          returnUrl: `${global?.window?.location?.origin}${GIFT_CARD?.RELOAD_CONFIRMATION}`,
        }),
      }
      fetch(
        `${process.env.NEXT_PUBLIC_PAYMENTS_BASE_API_URL}initiate-sdk`,
        initSdkOptions
      )
        .then((response) => response.text())
        .then(async (result) => {
          await temp?.initiate(JSON.parse(result), hyperCallbackHandler)
          await fetch(
            `${process.env.NEXT_PUBLIC_PAYMENTS_BASE_API_URL}fetch-order`,
            fetchOrderOptions
          )
            .then((response) => response.text())
            .then((result) => {
              temp.process(JSON.parse(result))
              setTimeout(() => {}, 2000)
            })
            .catch((error) => console.log("error", error))
        })
        .catch((error) => {
          console.log("error", error)
        })
    }
    if (
      giftCardGlobalStore?.reloadGcDetails?.orderId &&
      !temp?.initiateTriggered
    ) {
      fetchInitiateData()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [temp?.initiateTriggered, giftCardGlobalStore?.reloadGcDetails?.orderId])

  return (
    <ModelContainer>
      <div id="merchantViewId" style={{ width: "100%", overflowY: "auto" }} />
    </ModelContainer>
  )
}

export default PaymentModelComponent
