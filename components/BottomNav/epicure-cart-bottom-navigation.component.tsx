import React, { useContext, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { observer } from "mobx-react-lite"
import { ROUTES } from "../../utils/routes"
import { KeyboardArrowUp } from "@mui/icons-material"
import { KeyboardArrowDown } from "@mui/icons-material"
import { useLoggedIn } from "../../utils/hooks/useLoggedIn"
import Cart from "../BookingFlow/Json/cart.summary.card.json"
import { GLOBAL_STORES, PAGE_STORES } from "../../utils/Constants"
import { Box, Stack, Typography, SwipeableDrawer } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import LoyaltyStore from "../../features/loyalty/store/pageStore/loyalty.store"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
import { EPICURE_BOTTOM_NAV_CONSTANTS } from "../../features/loyalty/UI/constants"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import LoyaltyGlobalStore from "../../features/loyalty/store/globalStore/loyalty-global-store"
import { FlexBox, BoldTypo, TaxLabelBox, RoomPriceDetailsWrapper } from "../BookingFlow/styles/cart-summary-card"
import {
  currency2DecimalSymbol,
  currencyWithNoDecimalsWithMinus,
  formatCurrencyWithMinusOnlyIndia,
} from "../../utils/currency"
import {
  BottomBoxEpicure,
  BottomSheetBox,
  BoxNeuCoins,
  ChildBottomBox,
  DropDownBox,
  ParentBottomBox,
  ParentBox,
  PriceDetailsMainBox,
  TitleDivider,
  TitleStack,
  TypographyEpicureCost,
  TypographyEpicureTitle,
} from "./styles/epicure-cart-bottom-navigation"

const EpicureCartBottomNavigation = (props: any) => {
  const { LOYALTY } = ROUTES
  const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false)
  const [discountText, setDiscountText] = useState<string>("")
  const isLoggedIn = useLoggedIn()
  const pageContext = useContext(PageContext)
  const context = useContext(IHCLContext)
  const router = useRouter()

  const loyaltyEnrollStore = pageContext?.getPageStore(
    PAGE_STORES.LOYALTY_STORES.loyaltyEpicureCardsStore,
  ) as LoyaltyStore

  //global loyalty store
  const epicureGlobalStore = context?.getGlobalStore(GLOBAL_STORES.loyaltyGlobalStore) as LoyaltyGlobalStore

  const navigationUrl = `${global?.window?.location?.origin}${LOYALTY?.LOYALTY_PURCHASE_CONFIRMATION}`
  const priceSummary = loyaltyEnrollStore?.epcTenderModeDetails?.data?.priceSummary

  const totalPrice: any = Number(priceSummary?.neuCoins) > 0 && Number(priceSummary?.totalPayableAmount) === 0

  useEffect(() => {
    props?.bottomNavigationItems?.[0]?.parameterMap?.map((item: any) => {
      if (item?.value !== undefined) {
        if (item?.key?.toLowerCase() === "shareholder" && epicureCardData?.isShareHolder) {
          setDiscountText(item?.value)
        } else if (item?.key?.toLowerCase() === "tata" && epicureCardData?.isTata) {
          setDiscountText(item?.value)
        } else if (
          item?.key?.toLowerCase() === "renewal" &&
          epicureCardData?.memberShipPurchaseType?.toLowerCase() === "renewal"
        ) {
          setDiscountText(item?.value)
        }
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleBottomSheet = () => setOpenBottomSheet(!openBottomSheet)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenBottomSheet(newOpen)
  }

  const handlePayNow = () => {
    if (loyaltyEnrollStore?.epcOrderId || global?.window?.sessionStorage?.getItem("order_id")) {
      setOpenBottomSheet(false)
      loyaltyEnrollStore?.updateActiveAccordion(isLoggedIn ? 0 : 1)
    } else {
      setOpenBottomSheet(false)
    }
  }
  const isRenewal = epicureGlobalStore?.epicureCardData?.memberShipPurchaseType?.toLowerCase() === "renewal"
  const epicureCardData = epicureGlobalStore?.epicureCardData

  return (
    <Box aria-label="EpicureCartBottomNavigation">
      <ParentBox>
        <BottomSheetBox onClick={handleBottomSheet}>
          <DropDownBox>
            <Typography variant="m-heading-xs">{EPICURE_BOTTOM_NAV_CONSTANTS?.viewRoom}</Typography>
            <KeyboardArrowUp />
          </DropDownBox>
        </BottomSheetBox>
        <SwipeableDrawer
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          anchor="bottom"
          open={openBottomSheet}
          transitionDuration={{ enter: 600, exit: 800 }}
          PaperProps={{
            sx: { flex: 1, height: "100%" },
          }}>
          <BottomSheetBox>
            <DropDownBox onClick={handleBottomSheet}>
              <Typography variant="m-heading-xs">{`${props?.bottomNavigationItems?.[0]?.subtitle} (1)`}</Typography>
              {<KeyboardArrowDown />}
            </DropDownBox>
          </BottomSheetBox>
          <>
            <TitleStack>
              <TitleDivider />
              <Typography variant="m-heading-s" sx={{ fontSize: "5.938vw" }}>
                {props?.bottomNavigationItems?.[0]?.title}
              </Typography>
              <TitleDivider />
            </TitleStack>
            <ParentBottomBox>
              <ChildBottomBox>
                <TypographyEpicureTitle>{EPICURE_BOTTOM_NAV_CONSTANTS?.epicurePrivilege}</TypographyEpicureTitle>
                <TypographyEpicureCost>
                  {currency2DecimalSymbol(Number(epicureCardData?.price) ?? 0)}
                </TypographyEpicureCost>
              </ChildBottomBox>
              <PriceDetailsMainBox>
                <BottomBoxEpicure>
                  <FlexBox
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}>
                    <Typography variant="m-body-m">
                      {props?.bottomNavigationItems?.[0]?.parameterMap?.[0]?.key}
                    </Typography>
                    <Typography variant="m-body-m">
                      {currency2DecimalSymbol(Number(epicureGlobalStore?.epicureCardData?.price) ?? 0)}
                    </Typography>
                  </FlexBox>
                  {!!epicureCardData?.discountAmount &&
                    (isRenewal || epicureCardData?.isShareHolder || epicureCardData?.isTata) && (
                      <FlexBox
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}>
                        {!!epicureCardData?.discountPercentage && (
                          <Typography variant="m-body-m">
                            {`${discountText}  (${epicureCardData?.discountPercentage}%)`}
                          </Typography>
                        )}
                        {epicureGlobalStore?.epicureCardData?.discountAmount && (
                          <Typography variant="m-body-m">
                            {formatCurrencyWithMinusOnlyIndia(
                              Number(epicureGlobalStore?.epicureCardData?.discountAmount) ?? 0,
                            )}
                          </Typography>
                        )}
                      </FlexBox>
                    )}
                  <>
                    <FlexBox
                      sx={{
                        marginBottom: `0vw`,
                      }}>
                      {!!epicureCardData?.discountAmount && !!epicureCardData?.price && (
                        <Typography variant="m-body-m">
                          {props?.bottomNavigationItems?.[0]?.parameterMap?.[2]?.key}
                        </Typography>
                      )}
                      {!!epicureCardData?.discountAmount && !!epicureCardData?.price && (
                        <Typography variant="m-body-m">
                          {currency2DecimalSymbol(
                            Number(epicureCardData?.price) - Number(epicureCardData?.discountAmount),
                          )}
                        </Typography>
                      )}
                    </FlexBox>
                    {/* second one */}
                    <FlexBox
                      sx={{
                        marginBottom: `0vw`,
                      }}>
                      <TaxLabelBox>
                        <Typography variant="m-body-m">{Cart?.taxLabel}</Typography>
                      </TaxLabelBox>
                      <Typography variant="m-body-m">
                        {currency2DecimalSymbol(Number(epicureCardData?.tax) - Number(epicureCardData?.discountTax))}
                      </Typography>
                    </FlexBox>
                    {isLoggedIn &&
                      (!!loyaltyEnrollStore?.epcTenderModeDetails?.data?.priceSummary?.neuCoins ||
                        !!epicureCardData?.neuCoins) && (
                        <Stack rowGap={DesktopPxToVw(5)}>
                          <RoomPriceDetailsWrapper>
                            <BoxNeuCoins>
                              <Typography variant={"m-body-m"}>
                                {props?.bottomNavigationItems?.[0]?.parameterMap?.[3]?.key}
                              </Typography>
                              <Typography variant={"m-body-m"}>
                                {!!loyaltyEnrollStore?.epcTenderModeDetails?.data?.priceSummary?.neuCoins
                                  ? `${currencyWithNoDecimalsWithMinus(
                                      loyaltyEnrollStore?.epcTenderModeDetails?.data?.priceSummary?.neuCoins ?? 0,
                                    )}`
                                  : `${currencyWithNoDecimalsWithMinus(epicureCardData?.neuCoins) ?? 0}`}
                              </Typography>
                            </BoxNeuCoins>
                          </RoomPriceDetailsWrapper>
                        </Stack>
                      )}
                  </>
                  <FlexBox
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}>
                    <BoldTypo variant="m-body-m">{props?.bottomNavigationItems?.[0]?.parameterMap?.[5]?.key}</BoldTypo>
                    <BoldTypo variant="m-body-l">
                      {loyaltyEnrollStore?.epcTenderModeDetails?.data?.priceSummary?.neuCoins !== undefined
                        ? currency2DecimalSymbol(Number(loyaltyEnrollStore?.totalAmountPayable) ?? 0)
                        : currency2DecimalSymbol(Number(epicureCardData?.totalPayableAmount) ?? 0)}
                    </BoldTypo>
                  </FlexBox>
                </BottomBoxEpicure>
                <Box sx={{ paddingBottom: MobilePxToVw(10) }}>
                  <RenderActionItem
                    isActionButtonType={true}
                    url={""}
                    title={props?.bottomNavigationItems?.[0]?.primaryAction?.title}
                    variant={"light-contained"}
                    navigationType={""}
                    buttonStyles={{
                      minWidth: "100%",
                      letterSpacing: MobilePxToVw(4),
                    }}
                    onClick={() => {
                      if (totalPrice) {
                        global?.window?.sessionStorage?.setItem("order_id", loyaltyEnrollStore?.epcOrderId)
                        router?.push(navigationUrl)
                      } else {
                        handlePayNow()
                      }
                    }}
                  />
                </Box>
              </PriceDetailsMainBox>
            </ParentBottomBox>
          </>
        </SwipeableDrawer>
      </ParentBox>
    </Box>
  )
}

export default observer(EpicureCartBottomNavigation)
