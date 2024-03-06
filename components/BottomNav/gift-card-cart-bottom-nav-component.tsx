import React, { useContext, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import { CONSTANTS } from "../constants"
import { observer } from "mobx-react-lite"
import Pluralize from "../../utils/pluralize"
import { KeyboardArrowUp } from "@mui/icons-material"
import { KeyboardArrowDown } from "@mui/icons-material"
import { ActionProps, parameterMapItems } from "../types"
import { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { GLOBAL_STORES, PAGE_STORES } from "../../utils/Constants"
import { Box, Typography, SwipeableDrawer, Stack } from "@mui/material"
import manageGCStore from "../../features/giftCard/store/pageStore/manageGC.store"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import GiftCardStore from "../../features/giftCard/store/globalStore/gift-card.store"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import {
  GiftCardMainTitleContent,
  GiftCardCartAmountWrapper,
  GiftCardNavigationMainWrapper,
  GiftCardNavigationButtonWrapper,
  GiftCardMainTitleContentDivider,
  GiftCardNavigationContentWrapper,
  GiftCardCartTotalPriceDataWrapper,
  GiftCardNavigationOpenContentWrapper,
  GiftCardNavigationOpenSubtitleWrapper,
  GiftCardNavigationOpenPriceContentWrapper,
} from "./styles/gift-card-cart-bottom-nav-component-styles"
import { currency2DecimalSymbol, numberFormatWithoutSymbol } from "../../utils/currency"
import { useLoggedIn } from "../../utils/hooks/useLoggedIn"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))

interface GiftCardCartBottomNavComponentProps {
  _key: string
  _type: string
  title: string
  variant: string
  subtitle: string
  primaryAction: ActionProps
  secondaryAction: ActionProps
  parameterMap: parameterMapItems[]
}
const GiftCardCartBottomNavComponent = ({
  title,
  subtitle,
  parameterMap,
  primaryAction,
}: GiftCardCartBottomNavComponentProps) => {
  const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false)
  const router = useRouter()
  const isLoggedIn = useLoggedIn()

  const IHCLContexts = useContext(IHCLContext)
  const pageContext = useContext(PageContext)

  const GCStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.giftCardStore) as GiftCardStore

  const giftCardManageStore = pageContext?.getPageStore(PAGE_STORES?.giftCardManageCard) as manageGCStore
  const currentPage = router?.query?.pid?.[1]
  const formValues: any = GCStore?.formValues

  const cardAmount: number = Number(
    GCStore?.buyingJourneySteps?.[1]?.selected
      ? formValues?.amount
      : GCStore?.cartDetails?.items?.giftCardDetails?.[0]?.amount || 0,
  )
  const cardQty: number = Number(
    GCStore?.buyingJourneySteps?.[1]?.selected ? formValues?.quantity : GCStore?.cartDetails?.items?.quantity || 0,
  )
  const totalPrice: number = cardAmount * cardQty
  const giftCardName: any = GCStore?.GCThemeData?.title?.desktopTitle?.toString()?.replaceAll(",", " ")
  const handleBottomSheet = () => setOpenBottomSheet(!openBottomSheet)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenBottomSheet(newOpen)
  }

  const handleOpenPayment = async () => {
    if (GCStore?.isButtonDisabled) {
      setOpenBottomSheet(!openBottomSheet)
      return
    } else {
      GCStore?.updateIsButtonDisabled(!GCStore?.isButtonDisabled), setOpenBottomSheet(!openBottomSheet)
    }

    if (giftCardManageStore?.showRedeemAndPayment) {
      return
    }

    const updateSteps: any = JSON.parse(JSON.stringify(GCStore?.buyingJourneySteps))
    updateSteps[2].selected = false
    updateSteps[2].completed = true
    updateSteps[3].selected = true
    GCStore?.updateBuyingJourneySteps(updateSteps)
    const response = await GCStore?.createGCOrder()
    giftCardManageStore?.updateOrderId(response?.data?.orderId)

    // Add a new query parameter
    const updatedQuery = {
      orderId: response?.data?.orderId,
      sku: router?.query?.sku as string,
    }

    // Create a new URL with the updated query parameters
    const updatedUrl = `${window.location?.pathname}?${new URLSearchParams(updatedQuery).toString()}`
    // Update the browser URL
    window.history.replaceState({}, "", updatedUrl)
    giftCardManageStore?.updateActiveAccordion(isLoggedIn ? 0 : 1)
    giftCardManageStore?.updateShowRedeemAndPayment(true)
  }

  const fetchCart = async () => {
    await GCStore?.gcFetchCart()
  }
  useMemo(() => {
    const isCartEmpty = Object.keys(GCStore?.cartDetails).length === 0
    if (isCartEmpty && GCStore?.buyingJourneySteps?.[2]?.selected) {
      fetchCart()
      const updateSteps: any = JSON.parse(JSON.stringify(GCStore?.buyingJourneySteps))
      updateSteps[1].selected = false
      updateSteps[1].completed = true
      updateSteps[2].selected = true
      updateSteps[3].selected = false
      GCStore?.updateBuyingJourneySteps(updateSteps)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [GCStore?.cartDetails, GCStore?.buyingJourneySteps?.[2]?.selected])

  useEffect(() => {
    if (!GCStore?.buyingJourneySteps?.[3]?.selected) {
      GCStore.cartDetails = {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Box>
      <GiftCardNavigationMainWrapper aria-label="GiftCardCartBottomNavigation">
        <GiftCardNavigationContentWrapper onClick={handleBottomSheet}>
          <GiftCardNavigationButtonWrapper>
            <Typography variant="m-heading-xs">{`VIEW SELECTED CARDS (${cardQty})`}</Typography>
            <KeyboardArrowUp />
          </GiftCardNavigationButtonWrapper>
        </GiftCardNavigationContentWrapper>
        <SwipeableDrawer
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          anchor="bottom"
          open={openBottomSheet}
          transitionDuration={{ enter: 600, exit: 800 }}
          PaperProps={{
            sx: { flex: 1, height: "100%" },
          }}>
          <GiftCardNavigationOpenContentWrapper>
            <GiftCardNavigationOpenSubtitleWrapper onClick={handleBottomSheet}>
              <Typography variant="m-heading-xs">{`${subtitle} (${cardQty})`}</Typography>
              {<KeyboardArrowDown />}
            </GiftCardNavigationOpenSubtitleWrapper>
          </GiftCardNavigationOpenContentWrapper>
          <>
            <GiftCardMainTitleContent>
              <GiftCardMainTitleContentDivider />
              <Typography variant="m-heading-s" sx={{ fontSize: MobilePxToVw(38) }}>
                {title}
              </Typography>
              <GiftCardMainTitleContentDivider />
            </GiftCardMainTitleContent>
            {/* bottom------------ */}
            <GiftCardNavigationOpenPriceContentWrapper>
              {!!cardAmount && !!cardQty && !!giftCardName && (
                <GiftCardCartAmountWrapper width={"100%"} p={`0 ${MobilePxToVw(50)}`} marginTop={MobilePxToVw(20)}>
                  <Typography variant="m-body-sl" fontWeight={700}>
                    {giftCardName}
                  </Typography>
                  <Typography variant="m-body-m" whiteSpace={"nowrap"}>
                    {`${currency2DecimalSymbol(cardAmount || 0)} x ${isNaN(cardQty) ? 0 : cardQty || 0}`}
                  </Typography>
                </GiftCardCartAmountWrapper>
              )}
              <GiftCardCartTotalPriceDataWrapper>
                <Stack p={`0 ${MobilePxToVw(36.5)} ${MobilePxToVw(35)}`} rowGap={`${MobilePxToVw(12)}`}>
                  {Boolean(totalPrice || GCStore?.cartDetails?.priceSummary?.totalPrice) && (
                    <GiftCardCartAmountWrapper>
                      <Typography variant="m-body-m">{parameterMap?.[0]?.key}</Typography>
                      <Typography variant="m-body-m">
                        {GCStore?.buyingJourneySteps?.[1]?.selected
                          ? currency2DecimalSymbol(totalPrice || 0)
                          : currency2DecimalSymbol(GCStore?.cartDetails?.priceSummary?.totalPrice || 0)}
                      </Typography>
                    </GiftCardCartAmountWrapper>
                  )}
                  {!!GCStore?.cartDetails?.priceSummary?.neuCoins && !GCStore?.buyingJourneySteps?.[1]?.selected && (
                    <GiftCardCartAmountWrapper>
                      <Typography variant="m-body-m">
                        {`${
                          Pluralize(CONSTANTS?.NEU_COIN, GCStore?.cartDetails?.priceSummary?.neuCoins, false)?.split(
                            " ",
                          )?.[1]
                        } ${CONSTANTS?.REDEEMED}`}
                      </Typography>
                      <Typography variant="m-body-m">
                        {GCStore?.cartDetails?.priceSummary?.neuCoins
                          ? `- ${numberFormatWithoutSymbol(GCStore?.cartDetails?.priceSummary?.neuCoins)}`
                          : 0}
                      </Typography>
                    </GiftCardCartAmountWrapper>
                  )}
                  {(currentPage || GCStore?.cartDetails?.priceSummary?.totalPayableAmount) && (
                    <GiftCardCartAmountWrapper>
                      <Typography variant="m-body-m" sx={{ fontWeight: 700 }}>
                        {parameterMap?.[2]?.key}
                      </Typography>
                      <Typography variant="m-body-l" sx={{ fontWeight: 700 }}>
                        {GCStore?.cartDetails?.priceSummary?.totalPayableAmount &&
                        !GCStore?.buyingJourneySteps?.[1]?.selected
                          ? currency2DecimalSymbol(
                              isNaN(GCStore?.cartDetails?.priceSummary?.totalPayableAmount)
                                ? 0
                                : GCStore?.cartDetails?.priceSummary?.totalPayableAmount,
                            )
                          : GCStore?.buyingJourneySteps?.[1]?.selected
                          ? currency2DecimalSymbol(isNaN(totalPrice) ? 0 : totalPrice)
                          : 0}
                      </Typography>
                    </GiftCardCartAmountWrapper>
                  )}
                </Stack>
                {GCStore?.buyingJourneySteps?.[2]?.selected && GCStore?.isChecked && (
                  <RenderActionItem
                    isActionButtonType={true}
                    url={""}
                    title={primaryAction?.title}
                    variant={"light-contained"}
                    onClick={() => handleOpenPayment()}
                    navigationType={""}
                    buttonStyles={{
                      minWidth: "100%",
                      letterSpacing: MobilePxToVw(4),
                      fontSize: `${MobilePxToVw(20)} !important`,
                    }}
                  />
                )}
              </GiftCardCartTotalPriceDataWrapper>
            </GiftCardNavigationOpenPriceContentWrapper>
          </>
        </SwipeableDrawer>
      </GiftCardNavigationMainWrapper>
    </Box>
  )
}

export default observer(GiftCardCartBottomNavComponent)
