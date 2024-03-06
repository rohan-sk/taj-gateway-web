import { useContext, useEffect } from "react"
import { groq } from "next-sanity"
import { Stack } from "@mui/system"
import dynamic from "next/dynamic"
import { observer } from "mobx-react-lite"
import { getClient } from "../../lib-sanity"
import { GAStore, UserStore } from "../../store"
import { Grid, Typography, Box } from "@mui/material"
import { UseAddress } from "../../utils/hooks/useAddress"
import { useMobileCheck } from "../../utils/isMobilView"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { CardSummaryProps } from "./types/gift-card-summary"
import formData from "../forms/gift-card-form/formData.json"
import { GLOBAL_STORES, PAGE_STORES } from "../../utils/Constants"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import GiftCardStore from "../../features/giftCard/store/globalStore/gift-card.store"
import {
  SummaryContainer,
  CustomerDetailsWrapper,
  GiftCardSummeryFieldTitle,
  GiftCardReceiverData,
} from "./styles/gift-card-summary"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { handleGCPurchase } from "../../utils/analytics/events/Ecommerce/GC-Journey/purchase-gc"
import GiftCardConfirmationPageStore from "../../features/giftCard/store/pageStore/GCConfirmationPage.store"
const LoadingSpinner = dynamic(() => import("../../utils/SpinnerComponent"))

const GiftCardSummaryComponent = ({
  aesthetic,
  parameterMap,
  printPage = false,
  downloadPagePDF = false,
}: CardSummaryProps) => {
  const { cardPadding } = useAesthetics(aesthetic?._ref || aesthetic?._id)
  const isMobile = useMobileCheck()
  const context = useContext(IHCLContext)
  const pageContext = useContext(PageContext)

  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore

  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore

  const GCFormDetailsStore = context?.getGlobalStore(GLOBAL_STORES.giftCardStore) as GiftCardStore
  const giftCardConfirmationPageStore = pageContext?.getPageStore(
    PAGE_STORES.GIFTCARD_STORES.giftCardConfirmationPageStore,
  ) as GiftCardConfirmationPageStore

  const SingleGCDetails = giftCardConfirmationPageStore?.paymentConfirmationResponse?.giftCard?.[0]
  const cardDetails = giftCardConfirmationPageStore?.paymentConfirmationResponse

  const address = UseAddress(userStore)
  const dataLayer = MemberDataLayer(userStore, gaStoreData)

  const isPhysicalGiftCard = GCFormDetailsStore?.GCThemeData?.isPhysicalGIftCard
  const giftCardType = isPhysicalGiftCard ? "Physical-gift card" : "E-gift card"

  const fetchEGCDetails = async (sku: string | string[] | null) => {
    const query = groq`*[_type == "giftCardsDetails" && sku == "${sku}"]`
    await getClient(true)
      .fetch(query)
      .then((data) => {
        if (data?.length > 0) {
          GCFormDetailsStore?.updateGCThemeData(data?.[0])
        }
      })
  }

  useEffect(() => {
    fetchEGCDetails(SingleGCDetails?.sku)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SingleGCDetails?.sku])

  const PurchaseOrderNumber = giftCardConfirmationPageStore?.paymentConfirmationResponse?.purchaseOrderNo

  const response = giftCardConfirmationPageStore?.paymentConfirmationResponse

  const constructUserAddress = () => {
    let addressLine1 = cardDetails?.receiverAddress?.addressLine1
    let addressLine2 = cardDetails?.receiverAddress?.addressLine2
    let city = cardDetails?.receiverAddress?.city
    let state = cardDetails?.receiverAddress?.state
    let pinCode = cardDetails?.receiverAddress?.pinCode
    let country = cardDetails?.receiverAddress?.country

    return `${addressLine1 && addressLine1}${addressLine1 && ","} ${city && city}${city && ","} ${state && state}${
      state && ","
    } ${pinCode && pinCode}${pinCode && ","} ${country && country}`
  }

  //? gift card purchase checkout analytics
  useEffect(
    () => {
      PurchaseOrderNumber && handleGCPurchase("purchase", dataLayer, address, GCFormDetailsStore, response)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [PurchaseOrderNumber],
  )

  useEffect(() => {
    sessionStorage?.removeItem("gcPurchaseStartPath")

    //? Using to clear the orderId from session storage
    const handleForwardAndBackwardButtonClick = () => {
      sessionStorage?.removeItem("gcOrderId")
    }
    const handlePageRefresh = () => {
      sessionStorage?.removeItem("gcOrderId")
    }
    global?.window?.addEventListener("popstate", handleForwardAndBackwardButtonClick)
    global?.window?.addEventListener("beforeunload", handlePageRefresh)
    return () => {
      global?.window?.removeEventListener("popstate", handleForwardAndBackwardButtonClick)
      global?.window?.removeEventListener("beforeunload", handlePageRefresh)
    }
  }, [])

  return (
    <>
      {giftCardConfirmationPageStore.loading ? (
        <LoadingSpinner />
      ) : (
        <SummaryContainer $padding={cardPadding} aria-label="gc-confirmation-screen">
          <Box>
            {giftCardConfirmationPageStore?.paymentConfirmationResponse?.giftCard ? (
              <>
                <CustomerDetailsWrapper $isMobile={isMobile}>
                  <Stack
                    flexDirection="row"
                    alignItems="flex-end"
                    gap={DesktopPxToVw(40)}
                    width={"100%"}
                    justifyContent={isMobile ? "space-between" : "none"}>
                    <Stack gap={isMobile ? MobilePxToVw(10) : DesktopPxToVw(10)}>
                      <GiftCardSummeryFieldTitle
                        variant={isMobile ? "m-body-s" : "body-s"}
                        $printPage={printPage}
                        $isMobile={isMobile}
                        $downloadPagePDF={downloadPagePDF}>
                        {parameterMap?.[0]?.key}
                      </GiftCardSummeryFieldTitle>
                      <Typography
                        variant={isMobile ? "m-heading-m" : "heading-m"}
                        fontSize={
                          isMobile
                            ? MobilePxToVw(46)
                            : printPage
                            ? isMobile
                              ? "6vw"
                              : "2.917vw"
                            : downloadPagePDF
                            ? isMobile
                              ? "6vw"
                              : "3.1vw"
                            : DesktopPxToVw(46)
                        }>
                        {PurchaseOrderNumber}
                      </Typography>
                    </Stack>
                  </Stack>
                  {(parameterMap?.[13]?.value || parameterMap?.[14]?.value) && (
                    <Stack width={"100%"} gap={isMobile ? MobilePxToVw(10) : DesktopPxToVw(10)}>
                      <Stack
                        flexDirection={"row"}
                        columnGap={isMobile ? MobilePxToVw(30) : DesktopPxToVw(20)}
                        rowGap={isMobile ? MobilePxToVw(20) : DesktopPxToVw(20)}
                        flexWrap={"wrap"}>
                        {isPhysicalGiftCard
                          ? parameterMap?.[13]?.value && (
                              <GiftCardSummeryFieldTitle
                                variant={isMobile ? "m-heading-xs" : "heading-xs"}
                                sx={{ lineBreak: "anywhere" }}
                                $printPage={printPage}
                                $isMobile={isMobile}
                                $downloadPagePDF={downloadPagePDF}>
                                {parameterMap?.[13]?.value}
                              </GiftCardSummeryFieldTitle>
                            )
                          : parameterMap?.[14]?.value && (
                              <GiftCardSummeryFieldTitle
                                variant={isMobile ? "m-heading-xs" : "heading-xs"}
                                sx={{ lineBreak: "anywhere" }}
                                $printPage={printPage}
                                $isMobile={isMobile}
                                $downloadPagePDF={downloadPagePDF}>
                                {parameterMap?.[14]?.value}
                              </GiftCardSummeryFieldTitle>
                            )}
                      </Stack>
                    </Stack>
                  )}
                  <Grid
                    container
                    width={"100%"}
                    rowGap={isMobile ? MobilePxToVw(20) : "unset"}
                    columnGap={isMobile ? "unset" : DesktopPxToVw(20)}>
                    <Grid
                      lg={3.88}
                      md={3.88}
                      sm={isMobile ? (printPage || downloadPagePDF ? 3.88 : 12) : 3.88}
                      xs={printPage || downloadPagePDF ? 3.88 : 12}>
                      <Stack gap={isMobile ? MobilePxToVw(10) : DesktopPxToVw(10)}>
                        <GiftCardSummeryFieldTitle
                          variant={isMobile ? "m-body-s" : "body-s"}
                          $printPage={printPage}
                          $isMobile={isMobile}
                          $downloadPagePDF={downloadPagePDF}>
                          {parameterMap?.[2]?.key}
                        </GiftCardSummeryFieldTitle>
                        <GiftCardReceiverData
                          variant={isMobile ? "m-heading-xs" : "heading-xs"}
                          sx={{ lineBreak: "anywhere" }}
                          $printPage={printPage}
                          $isMobile={isMobile}
                          $downloadPagePDF={downloadPagePDF}>
                          {cardDetails?.receiverFirstName}
                        </GiftCardReceiverData>
                      </Stack>
                    </Grid>
                    <Grid
                      lg={3.88}
                      md={3.88}
                      sm={isMobile ? (printPage || downloadPagePDF ? 3.88 : 12) : 3.88}
                      xs={printPage || downloadPagePDF ? 3.88 : 12}>
                      <Stack gap={isMobile ? MobilePxToVw(10) : DesktopPxToVw(10)}>
                        <GiftCardSummeryFieldTitle
                          variant={isMobile ? "m-body-s" : "body-s"}
                          $printPage={printPage}
                          $isMobile={isMobile}
                          $downloadPagePDF={downloadPagePDF}>
                          {parameterMap?.[3]?.key}
                        </GiftCardSummeryFieldTitle>
                        <GiftCardReceiverData
                          variant={isMobile ? "m-heading-xs" : "heading-xs"}
                          sx={{ lineBreak: "anywhere" }}
                          $printPage={printPage}
                          $isMobile={isMobile}
                          $downloadPagePDF={downloadPagePDF}>
                          {cardDetails?.receiverLastName}
                        </GiftCardReceiverData>
                      </Stack>
                    </Grid>
                    <Grid
                      lg={3.88}
                      md={3.88}
                      sm={isMobile ? (printPage || downloadPagePDF ? 3.88 : 12) : 3.88}
                      xs={printPage || downloadPagePDF ? 3.88 : 12}>
                      <Stack gap={isMobile ? MobilePxToVw(10) : DesktopPxToVw(10)}>
                        <GiftCardSummeryFieldTitle
                          variant={isMobile ? "m-body-s" : "body-s"}
                          $printPage={printPage}
                          $isMobile={isMobile}
                          $downloadPagePDF={downloadPagePDF}>
                          {parameterMap?.[4]?.key}
                        </GiftCardSummeryFieldTitle>
                        <GiftCardReceiverData
                          variant={isMobile ? "m-heading-xs" : "heading-xs"}
                          sx={{ lineBreak: "anywhere" }}
                          $printPage={printPage}
                          $isMobile={isMobile}
                          $downloadPagePDF={downloadPagePDF}>
                          {cardDetails?.email}
                        </GiftCardReceiverData>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    width={"100%"}
                    rowGap={isMobile ? MobilePxToVw(20) : "unset"}
                    columnGap={isMobile ? "unset" : DesktopPxToVw(20)}>
                    <Grid
                      lg={3.88}
                      md={3.88}
                      sm={isMobile ? (printPage || downloadPagePDF ? 3.88 : 12) : 3.88}
                      xs={printPage || downloadPagePDF ? 3.88 : 12}>
                      <Stack gap={isMobile ? MobilePxToVw(10) : DesktopPxToVw(10)}>
                        <GiftCardSummeryFieldTitle
                          variant={isMobile ? "m-body-s" : "body-s"}
                          $printPage={printPage}
                          $isMobile={isMobile}
                          $downloadPagePDF={downloadPagePDF}>
                          {parameterMap?.[5]?.key}
                        </GiftCardSummeryFieldTitle>
                        <GiftCardReceiverData
                          variant={isMobile ? "m-heading-xs" : "heading-xs"}
                          $printPage={printPage}
                          $isMobile={isMobile}
                          $downloadPagePDF={downloadPagePDF}>
                          {cardDetails?.receiverPhoneNumber}
                        </GiftCardReceiverData>
                      </Stack>
                    </Grid>
                    {cardDetails?.deliveryMethods?.smsAndWhatsApp === true && (
                      <Grid
                        lg={3.88}
                        md={3.88}
                        sm={isMobile ? (printPage || downloadPagePDF ? 3.88 : 6) : 3.88}
                        xs={printPage || downloadPagePDF ? 3.88 : 6}>
                        <Stack gap={isMobile ? MobilePxToVw(10) : DesktopPxToVw(10)}>
                          <GiftCardSummeryFieldTitle
                            variant={isMobile ? "m-body-s" : "body-s"}
                            $printPage={printPage}
                            $isMobile={isMobile}
                            $downloadPagePDF={downloadPagePDF}>
                            {parameterMap?.[6]?.key}
                          </GiftCardSummeryFieldTitle>
                          <Stack flexDirection="column">
                            {cardDetails?.deliveryMethods?.smsAndWhatsApp === true && (
                              <GiftCardReceiverData
                                variant={isMobile ? "m-heading-xs" : "heading-xs"}
                                $printPage={printPage}
                                $isMobile={isMobile}
                                $downloadPagePDF={downloadPagePDF}>
                                {isMobile ? formData?.mobileSendSMSAndWhatsApp : formData?.sendSMSAndWhatsApp}
                              </GiftCardReceiverData>
                            )}
                            {cardDetails?.deliveryMethods?.whatsApp === false &&
                              cardDetails?.deliveryMethods?.sms === false && (
                                <Typography
                                  textAlign={"center"}
                                  mr={DesktopPxToVw(200)}
                                  variant={isMobile ? "m-heading-xs" : "heading-xs"}>
                                  -
                                </Typography>
                              )}
                          </Stack>
                        </Stack>
                      </Grid>
                    )}
                    <Grid
                      lg={3.88}
                      md={3.88}
                      sm={isMobile ? (printPage || downloadPagePDF ? 3.88 : 6) : 3.88}
                      xs={printPage || downloadPagePDF ? 3.88 : 6}>
                      <Stack gap={isMobile ? MobilePxToVw(15) : DesktopPxToVw(10)}>
                        <GiftCardSummeryFieldTitle
                          variant={isMobile ? "m-body-s" : "body-s"}
                          $printPage={printPage}
                          $isMobile={isMobile}
                          $downloadPagePDF={downloadPagePDF}>
                          {parameterMap?.[7]?.key}
                        </GiftCardSummeryFieldTitle>
                        <GiftCardReceiverData
                          variant={isMobile ? "m-heading-xs" : "heading-xs"}
                          $printPage={printPage}
                          $isMobile={isMobile}
                          $downloadPagePDF={downloadPagePDF}>
                          {cardDetails?.deliveryMethods?.phone}
                        </GiftCardReceiverData>
                        {!cardDetails?.deliveryMethods?.phone && (
                          <Typography
                            textAlign={"center"}
                            mr={DesktopPxToVw(300)}
                            variant={isMobile ? "m-heading-xs" : "heading-xs"}>
                            -
                          </Typography>
                        )}
                      </Stack>
                    </Grid>
                  </Grid>
                  <Grid container width={"100%"} rowGap={isMobile ? MobilePxToVw(20) : "unset"}>
                    <Grid
                      lg={3.88}
                      md={3.88}
                      sm={isMobile ? (printPage || downloadPagePDF ? 3.88 : 12) : 3.88}
                      xs={printPage || downloadPagePDF ? 3.88 : 12}
                      columnGap={isMobile ? "unset" : DesktopPxToVw(20)}>
                      <Stack gap={isMobile ? MobilePxToVw(10) : DesktopPxToVw(10)}>
                        <GiftCardSummeryFieldTitle
                          variant={isMobile ? "m-body-s" : "body-s"}
                          $printPage={printPage}
                          $isMobile={isMobile}
                          $downloadPagePDF={downloadPagePDF}>
                          {parameterMap?.[8]?.key}
                        </GiftCardSummeryFieldTitle>
                        <GiftCardReceiverData
                          variant={isMobile ? "m-heading-xs" : "heading-xs"}
                          $printPage={printPage}
                          $isMobile={isMobile}
                          $downloadPagePDF={downloadPagePDF}>
                          {cardDetails?.paymentMethod?.length ? (
                            cardDetails?.paymentMethod
                          ) : (
                            <Typography
                              textAlign={"center"}
                              mr={DesktopPxToVw(200)}
                              variant={isMobile ? "m-heading-xs" : "heading-xs"}>
                              -
                            </Typography>
                          )}
                        </GiftCardReceiverData>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Stack width={"100%"} gap={isMobile ? MobilePxToVw(10) : DesktopPxToVw(10)}>
                    <GiftCardSummeryFieldTitle
                      variant={isMobile ? "m-body-s" : "body-s"}
                      $printPage={printPage}
                      $isMobile={isMobile}
                      $downloadPagePDF={downloadPagePDF}>
                      {parameterMap?.[12]?.key}
                    </GiftCardSummeryFieldTitle>
                    <GiftCardReceiverData
                      variant={isMobile ? "m-heading-xs" : "heading-xs"}
                      sx={{
                        lineBreak: "anywhere",
                      }}
                      $printPage={printPage}
                      $isMobile={isMobile}
                      $downloadPagePDF={downloadPagePDF}>
                      {constructUserAddress()}
                    </GiftCardReceiverData>
                  </Stack>
                </CustomerDetailsWrapper>
              </>
            ) : (
              <Typography>{giftCardConfirmationPageStore?.paymentConfirmationResponse?.message || ""}</Typography>
            )}
          </Box>
        </SummaryContainer>
      )}
    </>
  )
}

export default observer(GiftCardSummaryComponent)
