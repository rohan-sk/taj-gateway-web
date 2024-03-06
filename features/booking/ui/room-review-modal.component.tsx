import React, { useContext } from "react"
import { theme } from "../../../lib/theme"
import { observer } from "mobx-react-lite"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { useMobileCheck } from "../../../utils/isMobilView"
import { CONSTANTS, ICONS } from "../../../components/constants"
import { Box, Button, Modal, Stack, Typography } from "@mui/material"
import BookingFlowGlobalStore from "../store/globalStore/booking.flow.store"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  MainBox,
  InnerBox,
  MainStack,
  LogoStack,
  ButtonsStack,
  ContentStack,
  CloseTextStack,
} from "./styles/room-review-modal"

const RoomReviewModalAfterLogin = ({ props, openModal, handleClose, userTier }: any) => {
  const isMobile = useMobileCheck()
  const context: any = useContext(IHCLContext)

  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore

  const roomsAvailableInCart = bookingFlowGlobalStore?.cartDetails?.cartDetailsResponse?.items?.length > 0
  const { emptyUserCart, clearOrderResponse } = bookingFlowGlobalStore

  const handleNo = async () => {
    await emptyUserCart()
    clearOrderResponse()
    handleClose()
  }
  const MobileView = () => {
    return (
      <MainStack>
        <LogoStack>
          <Box alt={`taj-logo`} component={"img"} width={"16.719vw"} height={"14.766vw"} src={ICONS.TAJ_GOLD_LOGO} />
          <Box
            component={"img"}
            width={"5.781vw"}
            alt={"close-icon"}
            height={"5.781vw"}
            onClick={handleClose}
            src={ICONS.CLOSE_GOLD_ICON}
          />
        </LogoStack>
        <Stack margin="auto">
          <ContentStack>
            {props?.title && <Typography variant="m-heading-s">{props?.title}</Typography>}
            <>
              {(props?.subtitle || props?.description) && (
                <Stack gap={MobilePxToVw(20)}>
                  {props?.subtitle && (
                    <Typography variant="m-body-sl" textAlign="center">
                      {props?.subtitle}{" "}
                      {global?.window?.localStorage?.getItem("chambersMemberTier")?.toLocaleLowerCase() ===
                      "chambersglobal"
                        ? "Global Chambers Program"
                        : userTier && <b>{`Taj Inner Circle ${userTier} Tier.`}</b>}
                    </Typography>
                  )}
                  {roomsAvailableInCart && props?.description && (
                    <Typography variant="m-body-sl" textAlign="center">
                      {props?.description}
                    </Typography>
                  )}
                </Stack>
              )}
            </>
          </ContentStack>
          {roomsAvailableInCart ? (
            <ButtonsStack>
              <Button variant={props?.PrimaryAction?.variant} onClick={handleClose}>
                {props?.PrimaryAction?.title}
              </Button>
              <Button
                variant={props?.secondaryAction?.variant}
                onClick={() => {
                  handleNo()
                }}>
                {props?.secondaryAction?.title}
              </Button>
            </ButtonsStack>
          ) : (
            <ButtonsStack>
              <Button
                variant={props?.secondaryAction?.variant}
                onClick={() => {
                  handleNo()
                }}>
                {CONSTANTS?.CONTINUE_2}
              </Button>
            </ButtonsStack>
          )}
        </Stack>
      </MainStack>
    )
  }
  const DesktopView = () => {
    return (
      <>
        <CloseTextStack>
          <Typography
            variant="body-m"
            fontWeight={700}
            onClick={handleClose}
            sx={{
              cursor: "pointer",
              color: theme?.palette?.ihclPalette?.hexOne,
            }}>
            {CONSTANTS?.CLOSE}
          </Typography>
          <Box
            component="img"
            src={ICONS?.CLOSE_WHITE_ICON}
            onClick={handleClose}
            sx={{ height: "0.938vw", width: "0.938vw", cursor: "pointer" }}
          />
        </CloseTextStack>
        <MainBox>
          <InnerBox>
            {props?.title && <Typography variant="heading-s">{props?.title}</Typography>}
            {(props?.subtitle || props?.description) && (
              <Stack gap={DesktopPxToVw(20)}>
                {props?.subtitle && (
                  <Typography variant="body-ml" textAlign="center">
                    {props?.subtitle}{" "}
                    {global?.window?.localStorage?.getItem("chambersMemberTier")?.toLocaleLowerCase() ===
                    "chambersglobal"
                      ? "Global Chambers Program"
                      : userTier && <b>{`Taj Inner Circle ${userTier} Tier.`}</b>}
                  </Typography>
                )}
                {roomsAvailableInCart && props?.description && (
                  <Typography variant="body-ml" textAlign="center">
                    {props?.description}
                  </Typography>
                )}
              </Stack>
            )}
            {roomsAvailableInCart ? (
              <ButtonsStack>
                <Button
                  variant={props?.PrimaryAction?.variant}
                  onClick={() => {
                    handleNo()
                  }}>
                  {props?.PrimaryAction?.title}
                </Button>
                <Button variant={props?.secondaryAction?.variant} onClick={handleClose}>
                  {props?.secondaryAction?.title}
                </Button>
              </ButtonsStack>
            ) : (
              <ButtonsStack>
                <Button variant={props?.secondaryAction?.variant} onClick={handleClose}>
                  {CONSTANTS?.CONTINUE_2}
                </Button>
              </ButtonsStack>
            )}
          </InnerBox>
        </MainBox>
      </>
    )
  }

  return (
    <>
      <Modal
        open={openModal}
        sx={{
          backdrop: {
            sx: {
              opacity: 0.98,
              backgroundColor: theme?.palette?.ihclPalette?.rgbaSeven,
            },
          },
        }}>
        <Box>
          <Box
            sx={{
              top: "50%",
              left: "50%",
              position: "absolute",
              transform: "translate(-50%, -50%)",
              width: isMobile ? "100%" : "unset",
              height: isMobile ? "100%" : "unset",
            }}>
            {isMobile ? <MobileView /> : <DesktopView />}
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default observer(RoomReviewModalAfterLogin)
