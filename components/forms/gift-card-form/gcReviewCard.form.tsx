import { useContext, useEffect } from "react"
import { observer } from "mobx-react-lite"
import Divider from "@mui/material/Divider"
import { urlFor } from "../../../lib-sanity"
import { parameterMapItems } from "../../types"
import { Box, Typography } from "@mui/material"
import { useMobileCheck } from "../../../utils/isMobilView"
import { FormBox, GcReviewCardFormCustomMessageBox } from "./styles"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import GiftCardStore from "../../../features/giftCard/store/globalStore/gift-card.store"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import GiftCardConfirmationPageStore from "../../../features/giftCard/store/pageStore/GCConfirmationPage.store"
import { PortableText } from "../../../lib/portable-text-serializers"
import { manageGCStore, useLoggedIn } from "../loyalty-form/epicure-imports.component"

type GcReviewCardFormData = {
  title?: string
  logo?: {
    asset: {
      _ref: string
      _type: string
    }
  }
  parameterMap?: parameterMapItems[]
  giftCardReviewDescription?: parameterMapItems[]
  content: any
}

const GcReviewCardForm = ({ logo, parameterMap, giftCardReviewDescription, content }: GcReviewCardFormData) => {
  const isMobile = useMobileCheck()
  const IHCLContexts = useContext(IHCLContext)
  const pageContext = useContext(PageContext)
  const isLoggedIn = useLoggedIn()

  const giftCardFormDetailsStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.giftCardStore) as GiftCardStore
  

  const giftCardConfirmationPageStore = pageContext?.getPageStore(
    PAGE_STORES.GIFTCARD_STORES.giftCardConfirmationPageStore,
  ) as GiftCardConfirmationPageStore

  const giftCardManageStore = pageContext?.getPageStore(PAGE_STORES?.giftCardManageCard) as manageGCStore

  const senderDetails = giftCardFormDetailsStore?.cartDetails?.items?.senderDetails || {}
  const receiverDetails = giftCardFormDetailsStore?.cartDetails?.items?.receiverDetails || {}

  const { firstName: senderFirstName, lastName: senderLastName } = senderDetails
  const { firstName: receiverFirstName, lastName: receiverLastName } = receiverDetails

  // Get the current URL's search parameters
  const searchParams = new URLSearchParams(global?.window?.location?.search)

  // Access a specific query parameter
  const orderIdFromURL: any = searchParams?.get("orderId")

  useEffect(() => {
    const updateSteps: any = JSON.parse(JSON.stringify(giftCardFormDetailsStore?.buyingJourneySteps))
    updateSteps[1].selected = false
    updateSteps[1].completed = true
    updateSteps[2].selected = true
    updateSteps[2].completed = false
    updateSteps[3].selected = false

    giftCardFormDetailsStore?.updateBuyingJourneySteps(updateSteps)

    // fetch order api when refresh page
    const fetchOrder = async () => {
      const priceSummary = {
        neuCoins: "",
        totalPayableAmount: "",
        totalPrice: "",
      }
      const items = {
        quantity: "",
        giftCardDetails: [],
      }
      const response = await giftCardFormDetailsStore?.GCFetchOrderAPI(orderIdFromURL)
      if (response?.data) {

        priceSummary.neuCoins = response?.data?.paymentDetails?.transaction_1?.[1]?.txnNetAmount ?? ""
        priceSummary.totalPayableAmount = response?.data?.payableAmount ?? ""

        priceSummary.totalPrice = response?.data?.gradTotal ?? ""
        items.quantity = response?.data?.orderLineItems?.[0]?.giftCard?.quantity ?? ""
        items.giftCardDetails = response?.data?.orderLineItems?.[0]?.giftCard?.giftCardDetails

        giftCardFormDetailsStore?.updateTcCheck(!giftCardFormDetailsStore?.isChecked)
        giftCardFormDetailsStore?.updateIsButtonDisabled(!giftCardFormDetailsStore?.isButtonDisabled)
        const updateSteps: any = JSON?.parse(JSON?.stringify(giftCardFormDetailsStore?.buyingJourneySteps))
        updateSteps[2].selected = false
        updateSteps[2].completed = true
        updateSteps[3].selected = true
        giftCardFormDetailsStore?.updateBuyingJourneySteps(updateSteps)

        giftCardManageStore?.updateOrderId(orderIdFromURL)
        giftCardManageStore?.updateActiveAccordion(isLoggedIn ? 0 : 1)
        giftCardManageStore?.updateShowRedeemAndPayment(true)

        giftCardFormDetailsStore?.updateCartDetails({ ...giftCardFormDetailsStore.cartDetails, priceSummary, items })

      }
    }

    if (orderIdFromURL) {
      fetchOrder()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const confirmationReceiverFirstName = giftCardConfirmationPageStore?.paymentConfirmationResponse?.receiverFirstName
  const confirmationReceiverLastName = giftCardConfirmationPageStore?.paymentConfirmationResponse?.receiverLastName
  const confirmationReceiverMessage = giftCardConfirmationPageStore?.paymentConfirmationResponse?.giftCard?.[0]?.message

  return (
    <>
      <FormBox
        sx={{
          margin: isMobile
            ? `0`
            : giftCardConfirmationPageStore
              ? `${DesktopPxToVw(40)} ${DesktopPxToVw(60)}`
              : `${DesktopPxToVw(60)} ${DesktopPxToVw(60)} 0`,
        }}
        aria-label="gc-review-card-form">
        {giftCardFormDetailsStore?.GCThemeData?.isPhysicalGIftCard ? (
          <PortableText blocks={content?.[0]?.content?.[0]} />
        ) : (
          <PortableText blocks={content?.[1]?.content?.[0]} />
        )}

        {isMobile && (
          <Box sx={{ marginTop: MobilePxToVw(36) }}>
            <Divider />
          </Box>
        )}
        {logo?.asset?._ref && (
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Box
              sx={{
                margin: isMobile ? `${MobilePxToVw(40)} 0 0` : `${DesktopPxToVw(80)} 0 ${DesktopPxToVw(10)}`,
              }}
              width={isMobile ? MobilePxToVw(176) : DesktopPxToVw(176)}
              height={isMobile ? MobilePxToVw(133) : DesktopPxToVw(133)}
              alt="media"
              component="img"
              src={urlFor(logo?.asset?._ref).url()}
            />
          </Box>
        )}
        <Box
          sx={{
            margin: isMobile ? `0 ${MobilePxToVw(45)} ${MobilePxToVw(32)}` : "",
          }}>
          <Typography variant={isMobile ? "m-body-sxl" : "body-ml"} sx={{ fontWeight: "700", paddingTop: "1vw" }}>
            {`Dear ${confirmationReceiverFirstName ? confirmationReceiverFirstName : receiverFirstName ?? ""} ${
              confirmationReceiverLastName ? confirmationReceiverLastName : receiverLastName ?? ""
            }`}
          </Typography>

          <Box padding={isMobile ? `${MobilePxToVw(30)} 0 0` : "1.5625vw 0vw 2.1875vw 0vw"}>
            {giftCardFormDetailsStore?.GCThemeData?.previewCardHolderMessage?.map((message: any, index: number) => (
              <Typography key={index} variant={isMobile ? "m-body-s" : "body-s"}>
                {index === 0 ? `${message} ${senderFirstName ?? ""} ${senderLastName ?? ""}.` : message}
              </Typography>
            ))}
          </Box>
        </Box>
        {(confirmationReceiverMessage || receiverDetails?.message) && (
          <GcReviewCardFormCustomMessageBox $isMobile={isMobile}>
            <Typography sx={{ wordBreak: "break-all" }} variant={isMobile ? "m-body-s" : "body-s"} fontWeight={700}>
              {confirmationReceiverMessage ? confirmationReceiverMessage : receiverDetails?.message}
            </Typography>
          </GcReviewCardFormCustomMessageBox>
        )}
      </FormBox>
    </>
  )
}

export default observer(GcReviewCardForm)
