import React, { Fragment, useContext, useEffect } from "react"
import { Box } from "@mui/material"
import { urlFor } from "../lib-sanity"
import { useRouter } from "next/router"
import { GLOBAL_STORES, PAGE_STORES } from "../utils/Constants"
import { IHCLContext } from "../PresentationalComponents/lib/prepare-ihcl-context"
import { PageContext } from "../PresentationalComponents/lib/prepare-page-context"
import ReloadGiftCardPageStore from "../features/giftCard/store/pageStore/reloadGC.store"
import BookingFlowGlobalStore from "../features/booking/store/globalStore/booking.flow.store"
import LoyaltyConfirmationPageStore from "../features/loyalty/store/pageStore/loyaltyConfirmation.store"
import BookingConfirmationPageStore from "../features/booking/store/pageStore/booking.confirmation.store"
import GiftCardConfirmationPageStore from "../features/giftCard/store/pageStore/GCConfirmationPage.store"
import { useAppNavigation } from "../utils/NavigationUtility"
import { PathType } from "../types"

const PageComponent = (props: any) => {
  const { items, viewEventCallback, isMobile } = props
  const router = useRouter()
  const context = useContext(IHCLContext)
  const pageContextUse = useContext(PageContext)
  const pageBackgroundImage = isMobile ? props?.mobileBackgroundImage : props?.backgroundImage
  const navigate = useAppNavigation()
  const currentUrl = router.asPath
  const { pathUrl, redirectionType } = router.query
  const giftCardConfirmationPageStore = pageContextUse?.getPageStore(
    PAGE_STORES.GIFTCARD_STORES.giftCardConfirmationPageStore,
  ) as GiftCardConfirmationPageStore
  const bookingConfirmationPageStore = pageContextUse?.getPageStore(
    PAGE_STORES.BOOKING_STORES.bookingConfirmationPageStore,
  ) as BookingConfirmationPageStore
  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore
  const loyaltyConfirmationStore = pageContextUse?.getPageStore(
    PAGE_STORES.LOYALTY_STORES.loyaltyConfirmationStore,
  ) as LoyaltyConfirmationPageStore
  const GiftCardReloadPageStore = pageContextUse?.getPageStore(
    PAGE_STORES?.GIFTCARD_STORES?.reloadGiftCardStore,
  ) as ReloadGiftCardPageStore

  const getOrderIdFromSessionStorage = (key: string) => global?.window?.sessionStorage?.getItem(key)

  useEffect(() => {
    if (giftCardConfirmationPageStore && getOrderIdFromSessionStorage("gcOrderId")) {
      giftCardConfirmationPageStore?.confirmGCOrder(getOrderIdFromSessionStorage("gcOrderId") || "")
    } else if (bookingConfirmationPageStore && getOrderIdFromSessionStorage("bookingOrderId")) {
      bookingConfirmationPageStore?.bookingConfirmOrder(getOrderIdFromSessionStorage("bookingOrderId") || "")
      bookingFlowGlobalStore?.clearCartResponse()
      bookingFlowGlobalStore?.clearOrderResponse()
    } else if (loyaltyConfirmationStore && getOrderIdFromSessionStorage("order_id")) {
      loyaltyConfirmationStore?.confirmLoyaltyOrder(getOrderIdFromSessionStorage("order_id") || "")
    } else if (GiftCardReloadPageStore && getOrderIdFromSessionStorage("gcOrderId")) {
      GiftCardReloadPageStore?.reloadGCBalance(getOrderIdFromSessionStorage("gcOrderId") || "")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [global?.window?.location?.search, router?.isReady, router?.query])

  useEffect(() => {
    if (pathUrl) navigate(currentUrl as string, redirectionType as PathType)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathUrl])

  return (
    <Box
      sx={{
        width: "100%",
        height: props?.BackgroundColor?.hex ? "auto" : "100%",
        backgroundImage: pageBackgroundImage
          ? pageBackgroundImage?.asset?._ref
            ? `url(${urlFor(pageBackgroundImage?.asset?._ref)?.url()})`
            : "unset"
          : "",
        backgroundRepeat: "no-repeat",
        backgroundColor: props?.BackgroundColor?.hex,
        backgroundSize: props?.BackgroundColor?.hex ? "contain" : "cover",
        backgroundPosition: props?.BackgroundColor?.hex ? "top" : "center",
        position: "relative",
      }}>
      {items?.map((item: any, index: number) => {
        return (
          <Fragment key={index}>
            {context?.renderComponent(item._type, {
              ...item,
              viewEventCallback,
              pageBackgroundImage,
              isMobile,
            })}
          </Fragment>
        )
      })}
    </Box>
  )
}

export default PageComponent
