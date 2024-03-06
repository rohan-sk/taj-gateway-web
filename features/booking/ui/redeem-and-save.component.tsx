import React, { useContext, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { observer } from "mobx-react-lite"
import { AccordionDetails, Box } from "@mui/material"
import { useMobileCheck } from "../../../utils/isMobilView"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { useLoggedIn } from "../../../utils/hooks/useLoggedIn"
import BookingsFlowStore from "../store/pageStore/booking.store"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import BookingFlowGlobalStore from "../store/globalStore/booking.flow.store"
import RenderActionItem from "../../../components/hoc/actions/action-items-ui"
import { DefaultColor } from "../../../components/BookingFlow/styles/redeem-save"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import { MainAccordion, MainContainer, MainAccordionSummary, TitleAndSubTitleWrapper } from "./styles/payment-component"

const RedeemVoucher = dynamic(() => import("./redeem-voucher.component"))
const LoadingSpinner = dynamic(() => import("../../../utils/SpinnerComponent"))

/**
 *  Todo, Redeem voucher feature have to add in MVP-2
 ** Redeem voucher was removed as this feature was not required in MVP-1
 */

const RedeemAndSave = (props: any) => {
  const { title, items, parameterMap, isHidden = false, primaryAction = {} } = props
  const isMobile = useMobileCheck()
  const isUserLoggedIn = useLoggedIn()
  const pageContext = useContext(PageContext)
  const context: any = useContext(IHCLContext)

  const bookingFlowPageStore = pageContext?.getPageStore(PAGE_STORES?.bookingFlowStore) as BookingsFlowStore
  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore

  const { guestFormDetails } = bookingFlowPageStore
  const { loading, setInitiatePaymentSDK, initiatePaymentSDK, setTerminatePaymentSDK } = bookingFlowGlobalStore

  const [wrongMsg, setWrongMsg] = useState<string>("")
  const [continueButtonClicked, setContinueButtonClicked] = useState<boolean>(false)
  const [expandedAccordion, setExpandedAccordion] = useState<boolean>(isUserLoggedIn)

  const handleAccordion = () => {
    if (initiatePaymentSDK && !expandedAccordion) {
      setInitiatePaymentSDK(false)
      setTerminatePaymentSDK(true)
    }
    setExpandedAccordion(!expandedAccordion)
  }

  useEffect(() => {
    if (
      guestFormDetails?.firstName?.length > 0 &&
      guestFormDetails?.lastName?.length > 0 &&
      guestFormDetails?.email?.length > 0 &&
      guestFormDetails?.phoneNumber?.length > 0
    ) {
      bookingFlowPageStore?.updateFormValidation(false)
    } else {
      bookingFlowPageStore?.updateFormValidation(true)
    }
  }, [
    bookingFlowPageStore,
    guestFormDetails?.phoneNumber?.length,
    guestFormDetails?.email?.length,
    guestFormDetails?.firstName?.length,
    guestFormDetails?.lastName?.length,
  ])

  //* using to collapse the redeem and save accordion, if it it in open expanded state
  useEffect(() => {
    if (initiatePaymentSDK && expandedAccordion) {
      handleAccordion()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initiatePaymentSDK])

  useEffect(() => {
    isUserLoggedIn && setExpandedAccordion(isUserLoggedIn)
  }, [isUserLoggedIn])

  return (
    <>
      {!isHidden && (
        <>
          {loading && <LoadingSpinner />}
          <Box
            aria-label="RedeemAndSave"
            sx={{
              margin: isMobile ? "0vw 7.813vw" : "default",
            }}>
            <MainAccordion disableGutters expanded={expandedAccordion} onChange={handleAccordion}>
              <MainAccordionSummary expandIcon={expandedAccordion && <ExpandMoreIcon style={{ fontSize: "20px" }} />}>
                <MainContainer sx={{ alignItems: "center" }}>
                  <TitleAndSubTitleWrapper>
                    <DefaultColor variant={isMobile ? "m-heading-s" : "heading-s"}>{title}</DefaultColor>
                    <DefaultColor
                      variant={isMobile ? "m-body-sl" : "body-ml"}
                      sx={{ marginTop: isMobile ? "1.57vw" : "0.52vw" }}>
                      {isUserLoggedIn
                        ? parameterMap && parameterMap?.[0]?.value
                        : parameterMap && parameterMap?.[1]?.value}
                    </DefaultColor>
                  </TitleAndSubTitleWrapper>
                  {!expandedAccordion && (
                    <RenderActionItem
                      url={""}
                      isActionButtonType={true}
                      title={primaryAction?.title}
                      variant={primaryAction?.variant}
                      navigationType={primaryAction?.urlType}
                      buttonStyles={{
                        whiteSpace: "nowrap",
                        minWidth: isMobile ? MobilePxToVw(100) : "auto",
                      }}
                    />
                  )}
                </MainContainer>
              </MainAccordionSummary>
              <AccordionDetails sx={{ padding: "0vw", height: "fit-Content" }}>
                <>
                  {items?.map((item: any) =>
                    context?.renderComponent(item?._type, {
                      ...item,
                      wrongMsg,
                      setWrongMsg,
                      continueButtonClicked,
                    }),
                  )}
                </>
              </AccordionDetails>
            </MainAccordion>
          </Box>
        </>
      )}
    </>
  )
}

export default observer(RedeemAndSave)
