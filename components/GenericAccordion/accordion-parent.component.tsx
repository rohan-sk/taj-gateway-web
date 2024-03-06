import dynamic from "next/dynamic"
import React, { useContext } from "react"
import { GLOBAL_STORES, PAGE_STORES } from "../../utils/Constants"
import { observer } from "mobx-react-lite"
import { useLoggedIn } from "../../utils/hooks/useLoggedIn"
import LoyaltyStore from "../../features/loyalty/store/pageStore/loyalty.store"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import manageGCStore from "../../features/giftCard/store/pageStore/manageGC.store"
import { Box, Button } from "@mui/material"
import { useMobileCheck } from "../../utils/isMobilView"
import { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import GiftCardStore from "../../features/giftCard/store/globalStore/gift-card.store"
import { ROUTES } from "../../utils/routes"
import { useRouter } from "next/router"
const AccordionWrapperComponent = dynamic(() => import("./accordion-wrapper.component"))

function AccordionParent(props: any) {
  const { GIFT_CARD, WITHOUTSEO_FOR_ROUTING, LOYALTY } = ROUTES

  const pageContext = useContext(PageContext)
  const context: any = useContext(IHCLContext)
  const router = useRouter()

  const giftCardManageStore = pageContext?.getPageStore(PAGE_STORES?.giftCardManageCard) as manageGCStore

  const loyaltyEnrollStore = pageContext?.getPageStore(
    PAGE_STORES.LOYALTY_STORES.loyaltyEpicureCardsStore,
  ) as LoyaltyStore

  const GCGlobalStore = context?.getGlobalStore(GLOBAL_STORES.giftCardStore) as GiftCardStore

  const isLoggedIn = useLoggedIn()
  const isMobile = useMobileCheck()
  let store = giftCardManageStore || loyaltyEnrollStore

  const getConditionalComponent = (index: number, item: any, store: any) => {
    switch (index) {
      case 0:
        return (
          <>
            {store?.showRedeemAndPayment && isLoggedIn && (store?.epcOrderId || store?.giftCardOrderId) && (
              <AccordionWrapperComponent
                key={index}
                item={item}
                open={index === store?.activeAccordion}
                index={index}
                activeAccordion={store?.activeAccordion}
                setActiveAccordion={store?.updateActiveAccordion}
              />
            )}
          </>
        )
      case 1:
        return (
          <>
            {GCGlobalStore?.cartDetails?.priceSummary?.totalPayableAmount === 0 ? (
              <Box display={"flex"} justifyContent={"center"}>
                <Button
                  variant="light-contained"
                  onClick={() => {
                    router?.push(
                      `${global?.window?.location?.origin}${WITHOUTSEO_FOR_ROUTING?.GIFT_CARD?.PURCHASE_SUCCESS}?order_id=${giftCardManageStore?.giftCardOrderId}`,
                    )
                  }}>
                  CONTINUE TO CONFIRM
                </Button>
              </Box>
            ) : (
              store?.showRedeemAndPayment &&
              (store?.epcOrderId || store?.giftCardOrderId) && (
                <AccordionWrapperComponent
                  key={index}
                  item={item}
                  open={index === store?.activeAccordion}
                  index={index}
                  activeAccordion={store?.activeAccordion}
                  setActiveAccordion={store?.updateActiveAccordion}
                />
              )
            )}
          </>
        )

      default:
        return (
          <AccordionWrapperComponent
            key={index}
            item={item}
            open={index === store?.activeAccordion}
            index={index}
            activeAccordion={store?.activeAccordion}
            setActiveAccordion={store?.updateActiveAccordion}
          />
        )
    }
  }
  return (
    <Box pb={store?.showRedeemAndPayment ? (isMobile ? MobilePxToVw(50) : 0) : 0}>
      {props?.items?.map((item: any, index: any) => (
        <>{!item?.isHidden && getConditionalComponent(index, item, store)}</>
      ))}
    </Box>
  )
}

export default observer(AccordionParent)
