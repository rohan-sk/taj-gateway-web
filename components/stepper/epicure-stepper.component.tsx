import React, { useCallback, useContext, useEffect, useRef } from "react"
import { CONSTANTS } from "../constants"
import { observer } from "mobx-react-lite"
import { useMobileCheck } from "../../utils/isMobilView"
import { StepperItems } from "./types"
import { Box, Step, Stepper, Typography } from "@mui/material"
import { GLOBAL_STORES, PAGE_STORES } from "../../utils/Constants"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import LoyaltyStore from "../../features/loyalty/store/pageStore/loyalty.store"
import { TICK_ICON } from "../forms/gift-card-form/constants"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import LoyaltyGlobalStore from "../../features/loyalty/store/globalStore/loyalty-global-store"
import {
  MainBox,
  TitleBox,
  StyledButton,
  TitleDivider,
  StepperConnector,
  TitleWrapper,
} from "../BookingFlow/styles/epicure-stepper.styles"
import { useLoggedIn } from "../../utils/hooks/useLoggedIn"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"

const EpicureStepper = (props: any) => {
  const isMobile = useMobileCheck()
  const pageContext = useContext(PageContext)
  const context = useContext(IHCLContext)
  const parentRef = useRef<any>(null)
  const isLoggedIn = useLoggedIn()
  const guestCustomerHash = global?.window?.localStorage?.getItem("guestCustomerHash")

  const epicurePageStore = pageContext?.getPageStore(
    PAGE_STORES.LOYALTY_STORES.loyaltyEpicureCardsStore,
  ) as LoyaltyStore

  const epicureGlobalStore = context?.getGlobalStore(GLOBAL_STORES.loyaltyGlobalStore) as LoyaltyGlobalStore

  const { currentStepper, formData, epcOrderId } = epicurePageStore

  const orderId = epcOrderId || global?.window?.sessionStorage?.getItem("order_id")

  useEffect(() => {
    const handleEpicureDetails = async () => {
      const response = await epicureGlobalStore?.EpicureFetchCartAPI()
      if (!response?.error) {
        await epicureGlobalStore?.updateEpicureCardData(
          response?.data?.items?.epicureDetails.bankName,
          response?.data?.items?.epicureDetails.isBankUrl,
          response?.data?.items?.epicureDetails.isShareHolder,
          response?.data?.items?.epicureDetails.isTata,
          response?.data?.items?.epicureDetails.memberShipPurchaseType,
          response?.data?.items?.epicureDetails.epicureType,
          response?.data?.priceSummary?.neuCoins,
          response?.data?.priceSummary?.price,
          response?.data?.priceSummary?.tax,
          response?.data?.priceSummary?.totalPayableAmount,
          response?.data?.priceSummary?.discountPrice,
          response?.data?.priceSummary?.discountPercent,
          response?.data?.priceSummary?.discountTax,
        )
        epicurePageStore?.setTotalAmountPayable(response?.data?.priceSummary?.totalPayableAmount)
      }
    }
    if (!epicureGlobalStore?.epicureCardData?.price && !epicurePageStore?.epcOrderId) {
      handleEpicureDetails()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [epicureGlobalStore, epicurePageStore?.epcOrderId])

  const handleMergeCart = useCallback(async () => {
    const response: any = await epicurePageStore?.EpicureMergeCartAPI()
    if (!response?.error) {
      global?.window?.localStorage?.removeItem("guestCustomerHash")
    }
  }, [epicurePageStore])

  useEffect(() => {
    if (isLoggedIn && guestCustomerHash !== null && !orderId) {
      handleMergeCart()
    }
  }, [guestCustomerHash, handleMergeCart, isLoggedIn, orderId])

  return (
    <>
      <TitleBox aria-label="BookFlowSteps" ref={parentRef}>
        <TitleWrapper>
          <TitleDivider />
          <Typography variant={isMobile ? "m-heading-s" : "heading-m"}>{props?.title}</Typography>
          <TitleDivider />
        </TitleWrapper>
      </TitleBox>
      <MainBox>
        <Box
          sx={{
            margin: "0vw 2vw",
            overflowX: "auto",
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}>
          <Stepper connector={<StepperConnector />}>
            {props?.stepperItems?.map((item: StepperItems, index: number) =>
              item.type === CONSTANTS.DYNAMIC ? (
                [formData]?.map((childItem: any, index: number) => (
                  <Step
                    key={index}
                    sx={{
                      padding: "0vw",
                    }}
                    id={`step-${index + 1}`}>
                    <StyledButton
                      key={index}
                      variant="outlined"
                      disableRipple={true}
                      $isSelected={childItem?.isSelected}
                      disabled={
                        (currentStepper?.stepName == "DETAILS" && index === 0) ||
                        (currentStepper?.stepName == "PAYMENT" && (index === 0 || index === 1))
                      }
                      endIcon={
                        currentStepper?.stepName == "DETAILS" && index === 0 ? (
                          //  eslint-disable-next-line @next/next/no-img-element
                          <img src={TICK_ICON} alt="Image" />
                        ) : currentStepper?.stepName == "PAYMENT" && (index === 0 || index === 1) ? (
                          //  eslint-disable-next-line @next/next/no-img-element
                          <img src={TICK_ICON} alt="Image" />
                        ) : (
                          ""
                        )
                      }></StyledButton>
                  </Step>
                ))
              ) : (
                <Step
                  key={index}
                  sx={{
                    padding: "0vw",
                  }}
                  id="reservation">
                  <StyledButton
                    sx={{ marginBottom: "6px" }}
                    key={index}
                    variant="outlined"
                    disableRipple={true}
                    disabled={
                      (currentStepper?.stepName == "DETAILS" && index === 0) ||
                      (currentStepper?.stepName == "PAYMENT" && (index === 0 || index === 1))
                    }
                    $isSelected={currentStepper.stepName === item.title}
                    endIcon={
                      currentStepper?.stepName == "DETAILS" && index === 0 ? (
                        //  eslint-disable-next-line @next/next/no-img-element
                        <img
                          style={{
                            width: isMobile ? MobilePxToVw(23) : DesktopPxToVw(23),
                            height: isMobile ? MobilePxToVw(23) : DesktopPxToVw(23),
                          }}
                          src={TICK_ICON}
                          alt="Image"
                        />
                      ) : currentStepper?.stepName == "PAYMENT" && (index === 0 || index === 1) ? (
                        //  eslint-disable-next-line @next/next/no-img-element
                        <img
                          style={{
                            width: isMobile ? MobilePxToVw(23) : DesktopPxToVw(23),
                            height: isMobile ? MobilePxToVw(23) : DesktopPxToVw(23),
                          }}
                          src={TICK_ICON}
                          alt="Image"
                        />
                      ) : (
                        ""
                      )
                    }>
                    {item.title}
                  </StyledButton>
                </Step>
              ),
            )}
          </Stepper>
        </Box>
      </MainBox>
    </>
  )
}

export default observer(EpicureStepper)
