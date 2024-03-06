import React, { Fragment, useContext, useEffect, useRef } from "react"
import EpicureTabsSelectableButtonsComponent from "./epicure-tabs-selectable-buttons.component"
import { useMobileCheck } from "../../../utils/isMobilView"
import { AccordionDetails, Box, Grid, Stack } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import LoyaltyStore from "../store/pageStore/loyalty.store"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { observer } from "mobx-react-lite"
import RenderActionItem from "../../../components/hoc/actions/action-items-ui"
import { useLoggedIn } from "../../../utils/hooks/useLoggedIn"
import { ROUTES } from "../../../utils/routes"
import { PathType } from "../../../types"
import { ExpandMoreIcon } from "../../../components/header/styles/booking-menu"
import LoyaltyGlobalStore from "../store/globalStore/loyalty-global-store"
import { currency2DecimalSymbol } from "../../../utils/currency"
import { useMembershipType } from "../../../utils/hooks/useMembershipType"
import {
  BoxDefaultChild,
  BoxDefaultParent,
  BoxTotalPrice,
  DefaultColorEpicure,
  MainAccordion,
  MainAccordionSummary,
} from "./render-epicure-payment-tabs.styles"

const RenderEpicureSelectableTabs = ({ props }: any) => {
  const { LOYALTY } = ROUTES
  const accordionRef = useRef<any>(null)
  const isMobile = useMobileCheck()
  const pageContext = useContext(PageContext)
  const context = useContext(IHCLContext)
  const isLoggedIn = useLoggedIn()

  //global loyalty store
  const { epicureCardData } = context?.getGlobalStore(GLOBAL_STORES.loyaltyGlobalStore) as LoyaltyGlobalStore

  //page loyalty store
  const loyaltyPageStore: any = pageContext?.getPageStore(
    PAGE_STORES.LOYALTY_STORES.loyaltyEpicureCardsStore,
  ) as LoyaltyStore

  const memberShipPurchaseType = useMembershipType(epicureCardData)

  const navigationUrl = `${global?.window?.location?.origin}${LOYALTY?.LOYALTY_PURCHASE_CONFIRMATION}?programType=${memberShipPurchaseType}`

  const priceSummary = loyaltyPageStore?.epcTenderModeDetails?.data?.priceSummary

  const totalPrice: any = Number(priceSummary?.neuCoins) > 0 && Number(priceSummary?.totalPayableAmount) === 0

  useEffect(() => {
    if (accordionRef?.current) {
      accordionRef.current.scrollIntoView({
        block: "center",
        inline: "nearest",
        behavior: "smooth",
      })
    }
  }, [])
  return (
    <Grid aria-label="RenderEpicureSelectableTabs">
      <EpicureTabsSelectableButtonsComponent props={props} />
      {props?.tabs?.[0]?.tabItems?.map((item: any, index: number) => {
        return (
          <Fragment key={index}>
            {(!isLoggedIn
              ? index !== 0 && loyaltyPageStore?.epcOrderId
              : totalPrice && loyaltyPageStore?.epcOrderId
              ? index === 0
              : loyaltyPageStore?.epcOrderId) && (
              <Box
                ref={accordionRef}
                aria-label="generic accordion component"
                sx={{
                  margin: isMobile ? `${MobilePxToVw(40)} ${MobilePxToVw(50)}` : `${DesktopPxToVw(40)} 0px`,
                }}>
                <MainAccordion
                  disableGutters
                  expanded={index === loyaltyPageStore?.activeAccordion}
                  className="redeem-card">
                  <MainAccordionSummary
                    expandIcon={
                      loyaltyPageStore?.activeAccordion === index && <ExpandMoreIcon style={{ fontSize: "25px" }} />
                    }
                    onClick={() => {
                      loyaltyPageStore?.activeAccordion === index
                        ? loyaltyPageStore?.updateActiveAccordion(null)
                        : loyaltyPageStore?.updateActiveAccordion(index)
                    }}>
                    <Stack sx={{ width: "100%" }}>
                      <BoxDefaultParent>
                        <BoxDefaultChild>
                          <DefaultColorEpicure variant={isMobile ? "m-heading-s" : "heading-s"}>
                            {item?.title}
                          </DefaultColorEpicure>
                          <DefaultColorEpicure variant={isMobile ? "m-body-s" : "body-s"}>
                            {(loyaltyPageStore?.activeAccordion !== index && index === 1) || index === 0
                              ? item?.subtitle
                              : ""}
                          </DefaultColorEpicure>
                          {index === 1 && (
                            <DefaultColorEpicure variant={isMobile ? "m-body-s" : "body-s"}>
                              {item?.parameterMap?.[0]?.value} &nbsp;
                              {loyaltyPageStore?.epcTenderModeDetails?.data?.priceSummary?.neuCoins
                                ? currency2DecimalSymbol(Number(loyaltyPageStore?.totalAmountPayable))
                                : currency2DecimalSymbol(Number(epicureCardData?.totalPayableAmount))}
                            </DefaultColorEpicure>
                          )}
                        </BoxDefaultChild>
                        {item?.primaryAction?.title && loyaltyPageStore?.activeAccordion !== index && (
                          <RenderActionItem
                            isActionButtonType={item?.primaryAction?.variant === "link" ? false : true}
                            url={""}
                            title={
                              item?.title.toLowerCase() === "redeem" && Number(priceSummary?.neuCoins) > 0
                                ? item?.secondaryAction?.title
                                : item?.primaryAction?.title
                            }
                            variant={item?.primaryAction?.variant}
                            navigationType={item?.primaryAction?.urlType}
                            buttonStyles={{
                              width: isMobile ? MobilePxToVw(215) : DesktopPxToVw(213),
                              letterSpacing: "0.1em",
                              whiteSpace: "nowrap",
                            }}
                          />
                        )}
                      </BoxDefaultParent>
                    </Stack>
                  </MainAccordionSummary>
                  <AccordionDetails sx={{ padding: "0vw", height: "fit-Content" }}>
                    {context!.renderComponent(item._type, item, index)}
                  </AccordionDetails>
                </MainAccordion>
              </Box>
            )}
          </Fragment>
        )
      })}
      {totalPrice && (
        <BoxTotalPrice>
          <RenderActionItem
            isActionButtonType={true}
            title={"CONTINUE TO CONFIRM"}
            variant={"light-contained"}
            url={navigationUrl}
            navigationType={PathType?.internal}
            isButtonChevron={true}
            buttonStyles={{
              minWidth: "9.79vw",
              letterSpacing: "0.1em",
              padding: "2vw",
              fontSize: DesktopPxToVw(18),
            }}
            onClick={() => {
              global?.window?.sessionStorage?.setItem("order_id", loyaltyPageStore?.epcOrderId)
              global?.window?.location?.assign(navigationUrl)
            }}
          />
        </BoxTotalPrice>
      )}
    </Grid>
  )
}

export default observer(RenderEpicureSelectableTabs)
