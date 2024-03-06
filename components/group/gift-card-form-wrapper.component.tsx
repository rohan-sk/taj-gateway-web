import React, { useContext, useEffect, useState } from "react"
import { Box } from "@mui/material"
import { theme } from "../../lib/theme"
import { useRouter } from "next/router"
import { observer } from "mobx-react-lite"
import RenderActionItem from "../hoc/actions/action-items-ui"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  receiverFirstName,
  receiverLastName,
  receiverEmail,
  receiverMobile,
  amount,
  quantity,
  receiverState,
  receiverCity,
  receiverAddress,
  senderFirstName,
  senderLastName,
  senderEmail,
  senderMobile,
  receiverPinCode,
} from "../forms/gift-card-form/constants"
import { useMobileCheck } from "../../utils/isMobilView"
import { GAStore, UserStore } from "../../store"
import { UseAddress } from "../../utils/hooks/useAddress"
import { GLOBAL_STORES, PAGE_STORES } from "../../utils/Constants"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import manageGCStore from "../../features/giftCard/store/pageStore/manageGC.store"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import GiftCardStore from "../../features/giftCard/store/globalStore/gift-card.store"
import { ErrorMessageTitle, RenderActionsButtonsBox } from "../forms/gift-card-form/styles"
import { handleGCAddToCart } from "../../utils/analytics/events/Ecommerce/GC-Journey/add-to-cart-gc"
import useStorage from "../../utils/useStorage"
import { useLoggedIn } from "../../utils/hooks/useLoggedIn"

const GiftCardFormWrapperComponent = ({ props: { items, primaryAction, secondaryAction } }: any) => {
  const router: any = useRouter()
  const isMobile = useMobileCheck()
  const context = useContext(IHCLContext)
  const pageContext = useContext(PageContext)
  const isLoggedIn = useLoggedIn()
  const { getItem } = useStorage()
  const [error, setError] = useState<string>("")
  const [currentPage, setCurrentPage] = useState<string>("")
  const isUserLoggedIn: any = global?.localStorage?.getItem("customerHash")
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const GCStore = context?.getGlobalStore(GLOBAL_STORES.giftCardStore) as GiftCardStore
  const giftCardManageStore = pageContext?.getPageStore(PAGE_STORES?.giftCardManageCard) as manageGCStore

  const handleErrorScroll = (element: any) => {
    if (element) {
      element?.scrollIntoView({
        block: "center",
        behavior: "smooth",
        inline: "center",
      })
    }
  }

  const address = UseAddress(UserStore)
  const dataLayer = MemberDataLayer(UserStore, gaStoreData)

  const handleAddToCart = async () => {
    let response
    const AddToCartPayload: any = {
      self: GCStore?.formValues?.selfPurchase,
      deliveryMethods: {
        phone: GCStore?.data?.additionalReceiverMobile
          ? `${GCStore?.countryCodes?.additionalReceiverCountryCode} ${GCStore?.data?.additionalReceiverMobile}`
          : "",
        email: GCStore?.data?.sendEmail,
        smsAndWhatsApp: GCStore?.data?.sendSMSAndWhatsApp,
      },
      giftCardDetails: {
        amount: GCStore?.data?.amount,
        quantity: GCStore?.formValues?.quantity,
        sku: GCStore?.sku,
        type: "giftcard",
        theme: !GCStore?.GCThemeData?.isPhysicalGIftCard
          ? GCStore?.GCThemeData?.name || global?.window?.localStorage.getItem("theme")
          : "",
      },
      receiverAddress: {
        addressLine1: GCStore?.data?.receiverAddress,
        addressLine2: "", // removed as it was duplicating in confirmation page
        city: GCStore?.data?.receiverCity,
        country: GCStore?.data?.receiverCountry,
        pinCode: GCStore?.data?.receiverPinCode,
        state: GCStore?.data?.receiverState,
      },
      senderAddress: {
        addressLine1: GCStore?.data?.senderAddress,
        addressLine2: "", // removed as it was duplicating in confirmation page
        city: GCStore?.data?.senderCity,
        country: GCStore?.data?.senderCountry,
        pinCode: GCStore?.data?.senderPinCode,
        state: GCStore?.data?.senderState,
      },
      receiverDetails: {
        email: GCStore?.data?.receiverEmail,
        firstName: GCStore?.data?.receiverFirstName,
        lastName: GCStore?.data?.receiverLastName,
        message: GCStore?.data?.customMessage,
        phone: `${GCStore?.countryCodes?.receiverCountryCode} ${GCStore?.data?.receiverMobile}`,
      },
      senderDetails: {
        email: GCStore?.data?.senderEmail,
        firstName: GCStore?.data?.senderFirstName,
        lastName: GCStore?.data?.senderLastName,
        phone: `${GCStore?.countryCodes?.senderCountryCode} ${GCStore?.data?.senderMobile}`,
      },
    }

    if (GCStore) {
      response = await GCStore?.gcAddToCart(AddToCartPayload)
      // for non logged in user
      if (global?.window?.localStorage.getItem("customerHash") === null) {
        global?.window?.localStorage.setItem("guestCustomerHash", response?.data?._id)
      }
    }

    if (!response?.error) {
      const updateSteps: any = JSON.parse(JSON.stringify(GCStore?.buyingJourneySteps))
      updateSteps[1].selected = false
      updateSteps[1].completed = true
      updateSteps[2].selected = true
      updateSteps[3].selected = false
      GCStore?.updateBuyingJourneySteps(updateSteps)

      router.push({
        pathname: primaryAction?.url,
        query: { sku: GCStore?.sku },
      })

      // handleGcBeginCheckOut(response?.data)
    } else {
      setError(response?.data)
    }
  }

  const handleGCErrorsAndAddToCart = () => {
    const gcFormaData: any = GCStore?.formValues
    const isPhysicalGIftCard = GCStore?.GCThemeData?.isPhysicalGIftCard
    setError("")

    const gcFormErrors: any = GCStore?.gcEmptyFormErrors
    const formErrors: any = GCStore?.formErrors
    let gcError: boolean = false

    const requiredFieldsForPhysical = [
      receiverFirstName,
      receiverLastName,
      receiverEmail,
      receiverMobile,
      amount,
      quantity,
      receiverPinCode,
      receiverState,
      receiverCity,
      receiverAddress,
      senderFirstName,
      senderLastName,
      senderEmail,
      senderMobile,
    ]
    const requiredFieldsForE = [
      receiverFirstName,
      receiverLastName,
      receiverEmail,
      receiverMobile,
      amount,
      quantity,
      senderFirstName,
      senderLastName,
      senderEmail,
      senderMobile,
    ]
    const errorEnterFormDetails =
      gcFormErrors?.amount || gcFormErrors?.quantity || formErrors?.amount || formErrors?.quantity

    const errorSenderFormDetails =
      gcFormErrors?.senderFirstName ||
      gcFormErrors?.senderLastName ||
      gcFormErrors?.senderEmail ||
      gcFormErrors?.senderMobile ||
      formErrors?.senderFirstName ||
      formErrors?.senderLastName ||
      formErrors?.senderEmail ||
      formErrors?.senderMobile ||
      formErrors?.senderAddress ||
      formErrors?.senderPinCode ||
      formErrors?.senderState ||
      formErrors?.senderCity

    const errorReceiverFormDetails =
      gcFormErrors?.receiverFirstName ||
      gcFormErrors?.receiverLastName ||
      gcFormErrors?.receiverEmail ||
      gcFormErrors?.receiverMobile ||
      formErrors?.receiverFirstName ||
      formErrors?.receiverLastName ||
      formErrors?.receiverEmail ||
      formErrors?.receiverMobile ||
      formErrors?.receiverAddress ||
      formErrors?.receiverPinCode ||
      formErrors?.receiverState ||
      formErrors?.receiverCity ||
      formErrors?.customMessage

    Object.entries(gcFormaData).forEach(() => {
      if (isPhysicalGIftCard) {
        requiredFieldsForPhysical.forEach((key: string) => {
          if (!gcFormaData[key]) {
            gcError = true
            gcFormErrors[key] = true
          } else if (formErrors[key]) {
            gcError = true
          } else {
            gcFormErrors[key] = false
          }
        })
      } else {
        requiredFieldsForE.forEach((key: string) => {
          if (!gcFormaData[key]) {
            gcError = true
            gcFormErrors[key] = true
          } else if (formErrors[key]) {
            gcError = true
          } else {
            gcFormErrors[key] = false
          }
        })
      }
    })

    if (gcError || formErrors?.customMessage) {
      if (errorEnterFormDetails) {
        const element = document.getElementById("enter-details")
        handleErrorScroll(element)
      } else if (errorSenderFormDetails) {
        const element = document.getElementById("sender-details")
        handleErrorScroll(element)
      } else if (errorReceiverFormDetails) {
        const element = document.getElementById("receiver-details")
        handleErrorScroll(element)
      } else {
        global?.window?.scrollTo(0, isMobile ? 1200 : 600)
      }
    } else {
      giftCardManageStore?.setTotalAmountPayable(Number(gcFormaData[amount]) * Number(gcFormaData[quantity]))
      handleAddToCart()
      handleGCAddToCart(
        "add_to_cart",
        dataLayer,
        address,
        GCStore,
        isUserLoggedIn,
        getItem,
        primaryAction?.title,
        primaryAction?.url,
        primaryAction?.urlType,
      )
    }
  }
  useEffect(() => {
    if (Array.isArray(router?.query?.pid)) {
      const currentPage = router?.query?.pid?.[1]
      setCurrentPage(currentPage)
    }
  }, [router?.query?.pid])

  return (
    <>
      <Box
        sx={{
          border: isMobile ? "unset" : `1px solid ${theme?.palette?.neuPalette?.hexTwenty} `,
        }}>
        {items?.map((item: any, index: number) => {
          return <Box key={index}>{context?.renderComponent(item?._type, item)}</Box>
        })}
      </Box>
      {error && (
        <ErrorMessageTitle sx={{ textAlign: "center", mb: "2vw", mt: "0vw" }}>
          {typeof error === "string" ? error : JSON?.stringify(error)}
        </ErrorMessageTitle>
      )}

      {(primaryAction?.title || secondaryAction?.title) && (
        <RenderActionsButtonsBox $isMobile={isMobile} $isCurrentPage={currentPage.toLowerCase() === "review"}>
          <RenderActionItem
            // isDisable={!isDisable}
            isActionButtonType={true}
            url=""
            title={primaryAction?.title}
            onClick={() => {
              handleGCErrorsAndAddToCart()
            }}
            variant={primaryAction?.variant}
            navigationType={primaryAction?.urlType}
            buttonStyles={{
              minWidth: "9.79vw",
              letterSpacing: "0.1em",
              marginTop: isMobile ? MobilePxToVw(55) : DesktopPxToVw(60),
              // backgroundColor:
              //   GCFormDetailsStore?.isChecked && isDisable ? "red" : "auto",
            }}
          />
        </RenderActionsButtonsBox>
      )}
    </>
  )
}

export default observer(GiftCardFormWrapperComponent)
