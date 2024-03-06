import React, { useContext, useEffect, useState } from "react"
import { Typography } from "@mui/material"
import { useMobileCheck } from "../../../utils/isMobilView"
import BookingsFlowStore from "../store/pageStore/booking.store"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import BookingFlowGlobalStore from "../store/globalStore/booking.flow.store"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import { MainStack, ButtonsStack, StyledButton } from "./styles/no-rooms-available-at-payment-init"

const NoRoomsAvailabilityAlertAtPaymentINIT = ({ handleModalClose, data }: any) => {
  const { title, subTitle, subTitleForNoRoom, primaryAction, secondaryAction } = data
  const isMobile = useMobileCheck()
  const context: any = useContext(IHCLContext)
  const pageContext: any = useContext(PageContext)

  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore

  const bookingFlowPageStore = pageContext?.getPageStore(PAGE_STORES?.bookingFlowStore) as BookingsFlowStore
  const {
    cartDetails,
    orderDetails,
    emptyUserCart,
    updateGuestDetails,
    clearOrderResponse,
    removeMultipleRoomsAtPaymentINIT,
  } = bookingFlowGlobalStore

  const { setIsUserCreatedOrder, setUserSelectedTCCheckBoxToPay } = bookingFlowPageStore

  const [roomsToRemove, setRoomsToRemove] = useState<any>()
  const unAvailableRoomNumbers = orderDetails?.orderDetailsResponse?.errorMessage
  const selectedRooms = cartDetails?.cartDetailsResponse?.items?.[0]?.hotel?.[0]?.room

  const handleClear = async () => {
    await emptyUserCart()
    clearOrderResponse()
    setIsUserCreatedOrder(false)
    setUserSelectedTCCheckBoxToPay(false)
    handleModalClose()
  }
  const handelRemoveUnAvailableRooms = async () => {
    const res = await removeMultipleRoomsAtPaymentINIT(roomsToRemove)
    if (!res?.data?.error) {
      const availableRooms = res?.data?.cartDetails?.items?.[0]?.hotel?.[0]?.room?.map((room: any) => {
        return {
          id: room?.roomNumber,
          adults: room?.adult,
          child: room?.children,
          room: "ROOM",
          isSelected: false,
        }
      })
      updateGuestDetails({ data: availableRooms })
    }
    handleModalClose()
  }

  //? using to filter the rooms which are not available in the inventory and removing them from cart
  useEffect(() => {
    let roomsToClearFromCart = unAvailableRoomNumbers?.map((roomNumber: any) => {
      let unAvailableRooms = selectedRooms
        ?.filter((room: any) => room?.roomNumber === roomNumber)
        ?.map((item: any) => {
          return {
            roomId: item?.roomNumber,
            roomType: item?.roomType,
            packageCode: item?.packageCode,
            roomNumber: item?.roomNumber,
          }
        })
      return unAvailableRooms?.[0]
    })
    setRoomsToRemove(roomsToClearFromCart)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartDetails?.cartDetailsResponse, orderDetails?.orderDetailsResponse])

  return (
    <MainStack>
      <Typography variant={isMobile ? "m-heading-s" : "heading-s"}>{title}</Typography>
      <Typography variant={isMobile ? "m-body-sl" : "body-ml"}>
        {unAvailableRoomNumbers?.length !== selectedRooms?.length ? subTitle : subTitleForNoRoom}
      </Typography>
      <ButtonsStack>
        <StyledButton onClick={handleClear} variant="light-contained">
          {primaryAction}
        </StyledButton>
        {unAvailableRoomNumbers?.length !== selectedRooms?.length && (
          <StyledButton variant="light-outlined" onClick={handelRemoveUnAvailableRooms}>
            {secondaryAction}
          </StyledButton>
        )}
      </ButtonsStack>
    </MainStack>
  )
}

export default NoRoomsAvailabilityAlertAtPaymentINIT
