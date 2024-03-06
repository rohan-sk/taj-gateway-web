import { Box, Step, Stepper } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import { StepperConnector, StyledButton } from "./styles/stepper-cards.group.component.style"
import { useMobileCheck } from "../../utils/isMobilView"
import GiftCardDynamicTitle from "./GiftCardDynamicTitle"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES, PAGE_STORES } from "../../utils/Constants"
import GiftCardStore from "../../features/giftCard/store/globalStore/gift-card.store"
import { observer } from "mobx-react-lite"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { TICK_ICON } from "../forms/gift-card-form/constants"
import { fetchAlertDialogData } from "../../utils/fetchAlertDialogData"
const BasicModal = dynamic(() => import("../hoc/modal/modal"))
import { ICONS } from "../constants"
import { theme } from "../../lib/theme"
const DataClearanceDialog = dynamic(() => import("../../components/forms/loyalty-form/data-clearance-modal-component"))
import dynamic from "next/dynamic"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import manageGCStore from "../../features/giftCard/store/pageStore/manageGC.store"
import { useLoggedIn } from "../../utils/hooks/useLoggedIn"

const StepperCardsGroupComponent = ({ props }: any) => {
  const isMobile = useMobileCheck()
  const isLoggedIn = useLoggedIn()

  const IHCLContexts = useContext(IHCLContext)
  const pageContext = useContext(PageContext)

  const [steps, setSteps] = useState<any>([])
  const [scrollStep, setScrollStep] = useState<number>(2)
  const [modalData, setModalData] = useState<any>({})
  const [cartClearance, setCartClearance] = useState(false)

  const GCStore: any = IHCLContexts?.getGlobalStore(GLOBAL_STORES.giftCardStore) as GiftCardStore
  const giftCardManageStore = pageContext?.getPageStore(PAGE_STORES?.giftCardManageCard) as manageGCStore

  const { buyingJourneySteps } = GCStore || {}

  const handleScroll = (element: any) => {
    if (element) {
      element?.scrollIntoView({
        block: "center",
        behavior: "smooth",
        inline: "center",
      })
    }
  }
  const handleRenderSteps = () => {
    const temp: any = []
    for (let index = 0; index < props?.items.length; index++) {
      const buyingJourneyStep = GCStore?.buyingJourneySteps[index]
      const propElement = props?.items[index]

      temp.push(
        <Step key={index} sx={{ padding: "0vw" }} id={`step-${index + 1}`}>
          <StyledButton
            sx={{
              display: "flex",
              alignItems: isMobile ? "flex-start" : "center",
              "& .MuiButton-endIcon": {
                marginLeft: isMobile ? MobilePxToVw(10) : DesktopPxToVw(9),
              },
            }}
            key={index}
            variant="outlined"
            disableRipple={true}
            $isSelected={buyingJourneyStep?.selected}
            endIcon={
              buyingJourneyStep?.completed && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  style={{
                    width: isMobile ? MobilePxToVw(23) : DesktopPxToVw(23),
                    height: "100%",
                  }}
                  src={TICK_ICON}
                  alt="Image"
                />
              )
            }
            disabled={buyingJourneyStep?.completed}>
            {propElement?.title}
          </StyledButton>
        </Step>,
      )
    }

    return temp
  }
  useEffect(() => {
    const updatedSteps = handleRenderSteps()
    setSteps(updatedSteps)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buyingJourneySteps, buyingJourneySteps[3].selected])

  useEffect(() => {
    if (isMobile) {
      buyingJourneySteps?.map((step: { selected: boolean; completed: boolean }, index: number) => {
        if (step.selected && !step.completed) {
          setScrollStep(index + 1)
        }
      })
      const element = document.getElementById(`step-${scrollStep}`)
      handleScroll(element)
    }
  }, [buyingJourneySteps, scrollStep, isMobile])
  useEffect(() => {
    if (isLoggedIn && global?.window?.localStorage?.getItem("guestCustomerHash") !== null) {
      giftCardManageStore?.GCMergeCart()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])

  return (
    <div>
      <>
        <GiftCardDynamicTitle {...props} />
        <Box
          sx={{
            margin: "0vw 2vw",
            overflowX: "auto",
            display: isMobile ? "flex" : "block",
            flexDirection: "row",
            justifyContent: "flex-start",
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}>
          <Stepper
            connector={<StepperConnector />}
            sx={{
              marginBottom: "0.5vw",
              marginLeft: isMobile ? "1vw" : "0",
              justifyContent: isMobile ? "center" : "center",
            }}>
            {steps}
          </Stepper>
        </Box>
      </>
    </div>
  )
}

export default observer(StepperCardsGroupComponent)
