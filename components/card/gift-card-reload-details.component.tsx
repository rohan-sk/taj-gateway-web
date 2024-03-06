import dayjs from "dayjs"
import { useContext, useEffect } from "react"
import dynamic from "next/dynamic"
import { theme } from "../../lib/theme"
import { observer } from "mobx-react-lite"
import { parameterMapItems } from "../types"
import { GAStore, UserStore } from "../../store"
import { Box, Grid, Typography } from "@mui/material"
import { currencyPrettier } from "../../utils/currency"
import { formatDateWithMON } from "../../utils/getDate"
import { useMobileCheck } from "../../utils/isMobilView"
import { UseAddress } from "../../utils/hooks/useAddress"
import { GridBox } from "./styles/gift-card-reload-details"
import { GLOBAL_STORES, PAGE_STORES } from "../../utils/Constants"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import ReloadGiftCardPageStore from "../../features/giftCard/store/pageStore/reloadGC.store"
import { handleGCReloadPurchase } from "../../utils/analytics/events/Ecommerce/GC-Journey/reload-purchase-gc"
const LoadingSpinner = dynamic(() => import("../../utils/SpinnerComponent"))
interface metadataItems {
  title: string
  _type: string
  identifier: string
}
interface GiftCardReloadDetailsProps {
  _key?: string
  _type?: string
  variant?: string
  parentProps?: number
  metadata?: metadataItems
  parameterMap?: parameterMapItems[]
  printPage?: boolean
  downloadPagePDF?: boolean
}
const GiftCardReloadDetails = ({
  parameterMap,
  printPage = false,
  downloadPagePDF = false,
}: GiftCardReloadDetailsProps) => {
  const isMobile = useMobileCheck()
  const pageContextUse = useContext(PageContext)
  const GiftCardReloadPageStore = pageContextUse?.getPageStore(
    PAGE_STORES?.GIFTCARD_STORES?.reloadGiftCardStore,
  ) as ReloadGiftCardPageStore

  const reloadGCResponse = GiftCardReloadPageStore?.paymentConfirmationResponse
  const reloadedGiftCard = reloadGCResponse?.giftCard?.[0]

  const context = useContext(IHCLContext)

  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore

  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore

  const address = UseAddress(userStore)
  const dataLayer = MemberDataLayer(userStore, gaStoreData)
  //gift card puchase checkout analytics
  useEffect(
    () => {
      reloadGCResponse &&
        reloadGCResponse?.priceTotal &&
        handleGCReloadPurchase("purchase", dataLayer, address, reloadGCResponse, reloadedGiftCard)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reloadGCResponse],
  )
  return (
    <Box
      sx={{
        backgroundColor: theme?.palette?.background?.paper,
        padding: isMobile ? MobilePxToVw(40) : DesktopPxToVw(40),
      }}
      aria-label="gift-card-reload-details-component">
      {reloadedGiftCard === undefined && <LoadingSpinner />}
      <Grid container>
        <Grid md={3} sm={isMobile ? 9 : 3} xs={12}>
          {reloadGCResponse?.purchaseOrderNo && (
            <GridBox>
              <Typography
                variant={isMobile ? "m-body-s" : "body-s"}
                fontSize={
                  printPage
                    ? isMobile
                      ? "1.8vw"
                      : "1.458vw"
                    : downloadPagePDF
                    ? isMobile
                      ? "2.7vw"
                      : "1.458vw"
                    : "auto"
                }>
                {parameterMap?.[0]?.value}
              </Typography>
              <Typography
                variant={isMobile ? "m-heading-m" : "heading-m"}
                fontSize={
                  printPage ? (isMobile ? "5vw" : "2.917vw") : downloadPagePDF ? (isMobile ? "7vw" : "2.917vw") : "auto"
                }>
                {reloadGCResponse?.purchaseOrderNo}
              </Typography>
            </GridBox>
          )}
        </Grid>
      </Grid>
      <Grid container sx={{ paddingTop: DesktopPxToVw(40) }}>
        <Grid
          md={3}
          sm={isMobile ? (printPage || downloadPagePDF ? 3 : 12) : 3}
          lg={3}
          xs={printPage || downloadPagePDF ? 3 : 12}>
          {reloadedGiftCard?.giftCardNumber && (
            <GridBox>
              <Typography
                variant={isMobile ? "m-body-s" : "body-s"}
                fontSize={
                  printPage
                    ? isMobile
                      ? "1.8vw"
                      : "1.458vw"
                    : downloadPagePDF
                    ? isMobile
                      ? "2.7vw"
                      : "1.458vw"
                    : "auto"
                }>
                {parameterMap?.[1]?.value}
              </Typography>
              <Typography
                variant={isMobile ? "m-heading-xs" : "heading-xs"}
                fontSize={
                  printPage
                    ? isMobile
                      ? "2vw"
                      : "1.771vw"
                    : downloadPagePDF
                    ? isMobile
                      ? "3.5vw"
                      : "1.771vw"
                    : "auto"
                }>
                {`${reloadedGiftCard?.giftCardNumber?.slice(0, 4)}-${reloadedGiftCard?.giftCardNumber?.slice(
                  4,
                  8,
                )}-${reloadedGiftCard?.giftCardNumber?.slice(8, 12)}-${reloadedGiftCard?.giftCardNumber?.slice(12)}`}
              </Typography>
            </GridBox>
          )}
        </Grid>
        <Grid
          md={3}
          sm={isMobile ? (printPage || downloadPagePDF ? 3 : 12) : 3}
          lg={3}
          xs={printPage || downloadPagePDF ? 3 : 12}>
          {reloadedGiftCard?.amount && (
            <GridBox>
              <Typography
                variant={isMobile ? "m-body-s" : "body-s"}
                fontSize={
                  printPage
                    ? isMobile
                      ? "1.8vw"
                      : "1.458vw"
                    : downloadPagePDF
                    ? isMobile
                      ? "2.7vw"
                      : "1.458vw"
                    : "auto"
                }>
                {parameterMap?.[2]?.value}
              </Typography>
              <Typography
                variant={isMobile ? "m-heading-xs" : "heading-xs"}
                fontSize={
                  printPage
                    ? isMobile
                      ? "2vw"
                      : "1.771vw"
                    : downloadPagePDF
                    ? isMobile
                      ? "3.5vw"
                      : "1.771vw"
                    : "auto"
                }>
                {/* to convert time into (HH:MM AM/PM) */}
                {`${formatDateWithMON(reloadedGiftCard?.createdOn)} ${dayjs(reloadedGiftCard?.createdOn).format(
                  "h:mm A",
                )}`}
              </Typography>
            </GridBox>
          )}
        </Grid>
        <Grid
          md={3}
          sm={isMobile ? (printPage || downloadPagePDF ? 3 : 12) : 3}
          lg={3}
          xs={printPage || downloadPagePDF ? 3 : 12}>
          {reloadGCResponse?.priceTotal && (
            <GridBox>
              <Typography
                variant={isMobile ? "m-body-s" : "body-s"}
                fontSize={
                  printPage
                    ? isMobile
                      ? "1.8vw"
                      : "1.458vw"
                    : downloadPagePDF
                    ? isMobile
                      ? "2.7vw"
                      : "1.458vw"
                    : "auto"
                }>
                {parameterMap?.[3]?.value}
              </Typography>
              <Typography
                variant={isMobile ? "m-heading-xs" : "heading-xs"}
                fontSize={
                  printPage
                    ? isMobile
                      ? "2vw"
                      : "1.771vw"
                    : downloadPagePDF
                    ? isMobile
                      ? "3.5vw"
                      : "1.771vw"
                    : "auto"
                }>
                {currencyPrettier(reloadGCResponse?.priceTotal)}
              </Typography>
            </GridBox>
          )}
        </Grid>
        <Grid
          md={3}
          sm={isMobile ? (printPage || downloadPagePDF ? 3 : 12) : 3}
          lg={3}
          xs={printPage || downloadPagePDF ? 3 : 12}>
          {reloadGCResponse?.cardNumber && (
            <GridBox>
              <Typography
                variant={isMobile ? "m-body-s" : "body-s"}
                fontSize={
                  printPage
                    ? isMobile
                      ? "1.8vw"
                      : "1.458vw"
                    : downloadPagePDF
                    ? isMobile
                      ? "2.7vw"
                      : "1.458vw"
                    : "auto"
                }>
                {parameterMap?.[4]?.value}
              </Typography>
              <Typography
                variant={isMobile ? "m-heading-xs" : "heading-xs"}
                fontSize={
                  printPage
                    ? isMobile
                      ? "2vw"
                      : "1.771vw"
                    : downloadPagePDF
                    ? isMobile
                      ? "3.5vw"
                      : "1.771vw"
                    : "auto"
                }>
                {currencyPrettier(reloadedGiftCard?.amount)}
              </Typography>
            </GridBox>
          )}
        </Grid>
      </Grid>
      <Grid container sx={{ paddingTop: DesktopPxToVw(40) }}>
        <Grid
          md={3}
          sm={isMobile ? (printPage || downloadPagePDF ? 3 : 12) : 3}
          lg={3}
          xs={printPage || downloadPagePDF ? 3 : 12}>
          {reloadGCResponse?.paymentMethod && (
            <GridBox>
              <Typography
                variant={isMobile ? "m-body-s" : "body-s"}
                fontSize={
                  printPage
                    ? isMobile
                      ? "1.8vw"
                      : "1.458vw"
                    : downloadPagePDF
                    ? isMobile
                      ? "2.7vw"
                      : "1.458vw"
                    : "auto"
                }>
                {parameterMap?.[5]?.value}
              </Typography>
              <Typography
                variant={isMobile ? "m-heading-xs" : "heading-xs"}
                fontSize={
                  printPage
                    ? isMobile
                      ? "2vw"
                      : "1.771vw"
                    : downloadPagePDF
                    ? isMobile
                      ? "3.5vw"
                      : "1.771vw"
                    : "auto"
                }>
                {reloadGCResponse?.paymentMethod}
              </Typography>
            </GridBox>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default observer(GiftCardReloadDetails)
