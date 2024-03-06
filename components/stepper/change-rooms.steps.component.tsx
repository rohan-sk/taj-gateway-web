import React, { useContext, useEffect } from "react"
import { CONSTANTS, ICONS } from "../constants"
import { observer } from "mobx-react-lite"
import { useMobileCheck } from "../../utils/isMobilView"
import { BookFlowStepsTypes, StepperItems } from "./types"
import { Box, Step, Stepper, Typography } from "@mui/material"
import { GLOBAL_STORES, PAGE_STORES } from "../../utils/Constants"
import BookingsFlowStore from "../../features/booking/store/pageStore/booking.store"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import BookingFlowGlobalStore from "../../features/booking/store/globalStore/booking.flow.store"
import {
  MainBox,
  TitleBox,
  StyledButton,
  TitleDivider,
  StepperConnector,
} from "../BookingFlow/styles/stepper-button"
import { UserStore } from "../../store"
import { MobilePxToVw } from "../../utils/DesktopFontCalc"

const BookFlowSteps = (props: BookFlowStepsTypes) => {
  const isMobile = useMobileCheck()
  const pageContext = useContext(PageContext)
  const context: any = useContext(IHCLContext)

  const bookingFlowPageStore = pageContext?.getPageStore(
    PAGE_STORES?.bookingFlowStore
  ) as BookingsFlowStore

  const { currentStepper, updateCurrentStepper } = bookingFlowPageStore

  const bookingFlowGlobalStore = context?.getGlobalStore(
    GLOBAL_STORES?.bookingFlowStore
  ) as BookingFlowGlobalStore

  const userStore = context?.getGlobalStore(GLOBAL_STORES?.userStore) as UserStore

  const { stepperDetails, updateStepperDetails, setModifyCheckAvailability, isModifiedSuccess } =
    bookingFlowGlobalStore

  const isConfirmationTab = currentStepper?.stepName?.toLowerCase() === "confirm"

  useEffect(() => {
    const nextRoom = stepperDetails?.data?.filter((room: any) => room?.modified === false)?.[0]?.id
    nextRoom && setModifyCheckAvailability()
    if (stepperDetails?.data?.every((room: any) => room?.modified) && isMobile) {
      updateCurrentStepper({ stepName: "CONFIRM" })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepperDetails?.data])

  useEffect(() => {
    if (
      userStore?.userDetails?.userHash !== "" &&
      global?.window?.localStorage.getItem("guestCustomerHash")
    ) {
      bookingFlowGlobalStore?.mergeCart()
    }
  }, [bookingFlowGlobalStore, userStore?.userDetails?.userHash])

  const handleScroll = (element: any) => {
    if (element) {
      element?.scrollIntoView({
        block: "center",
        behavior: "smooth",
        inline: "center",
      })
    }
  }

  useEffect(() => {
    if (currentStepper?.stepName?.toLowerCase() == "confirm") {
      const element = document.getElementById("confirm")
      handleScroll(element)
    } else {
      const nextRoom = stepperDetails?.data?.filter((room: any) => room?.modified === false)?.[0]
        ?.id
      const element = document.getElementById(`step-${nextRoom}`)
      handleScroll(element)
    }
  }, [stepperDetails?.data, currentStepper])

  const handleClick = (step: any) => {
    const isSelectedRoom = stepperDetails?.data?.map((item: any) =>
      item?.id === step?.id
        ? { ...item, isSelected: true, modified: false }
        : { ...item, isSelected: false }
    )
    updateStepperDetails({ data: isSelectedRoom })
    updateCurrentStepper({ stepName: "ROOM" })
    setModifyCheckAvailability()
  }

  return (
    <>
      <TitleBox>
        <TitleDivider />
        <Typography variant={isMobile ? "m-heading-s" : "heading-m"}>{props?.title}</Typography>
        <TitleDivider />
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
          <Stepper
            connector={<StepperConnector />}
            sx={{
              marginBottom: "0.5vw",
              marginLeft: isMobile ? stepperDetails?.data?.length > 1 ? "1vw" : "0" : "",
              justifyContent: isMobile ? stepperDetails?.data?.length > 1 ? "flex-start" : "center" : "center",
            }}>
            {props?.stepperItems?.map((item: StepperItems, index: number) =>
              item.type === CONSTANTS.DYNAMIC ? (
                stepperDetails?.data?.map((childItem: any, index: number) => (
                  <Step key={index} sx={{ padding: "0vw" }} id={`step-${index + 1}`}>
                    <StyledButton
                      key={index}
                      variant="outlined"
                      disableRipple={true}
                      $isSelected={childItem?.isSelected}
                      endIcon={
                        childItem?.modified ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={ICONS?.BUTTON_GRAY_TICK} alt="" />
                        ) : (
                          ""
                        )
                      }>
                      {isConfirmationTab
                        ? `${childItem?.room} ${childItem?.id}`
                        : `SELECT ${childItem?.room} ${childItem?.id}`}
                    </StyledButton>
                  </Step>
                ))
              ) : (
                <Step key={index} sx={{ padding: "0vw" }} id="confirm">
                  <StyledButton
                    key={index}
                    variant="outlined"
                    disableRipple={true}
                    $isSelected={currentStepper?.stepName?.toLowerCase() === "confirm"}>
                    {isMobile ? CONSTANTS?.PAYMENT : item?.title}
                  </StyledButton>
                </Step>
              )
            )}
            {/* for scroll effect */}
            {isMobile && stepperDetails?.data?.length > 1 && (
              <Step>
                <Box width={MobilePxToVw(200)}></Box>
              </Step>
            )}
          </Stepper>
        </Box>
      </MainBox>
    </>
  )
}

export default observer(BookFlowSteps)
