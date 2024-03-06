import React from "react"
import { useState, useEffect, useRef, useContext, Fragment } from "react"
import { observer } from "mobx-react-lite"
import { CONSTANTS } from "../../constants"
import Pluralize from "../../../utils/pluralize"
import { useMobileCheck } from "../../../utils/isMobilView"
import { Typography, Box, ClickAwayListener, Stack, IconButton } from "@mui/material"
import { CloseIcon, MinusIcon, PlusIcon } from "../../../utils/customIcons"
import {
  CloseIconBox,
  CountContainer,
  NeedMoreRoomBox,
  VerticalDivider,
  RoomBoxContainer,
  ConfirmContainer,
  AddRoomTypography,
  GuestRoomPopUpBox,
} from "./GuestRoomStyles"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import BookingFlowGlobalStore from "../../../features/booking/store/globalStore/booking.flow.store"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { OffersStore } from "../../../store"
import { useRouter } from "next/router"

const GuestRoomComponent = ({
  top,
  right,
  zIndex,
  roomsCount,
  setGuestCount,
  setRoomsCount,
  setExpandGuestRoomCount,
  isComplementary = false,
  cugType = "",
  maxRoomsCount = 5,
  isSEB = false,
}: any) => {
  const context: any = useContext(IHCLContext)
  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore
  const offerStore = context?.getGlobalStore(GLOBAL_STORES.offerStore) as OffersStore
  const { userEnteredPromoCode } = bookingFlowGlobalStore
  const router = useRouter()
  const isCUGOffer = offerStore?.offersData?.offerType?.toLowerCase() === "cug" || router?.query?.isCUGOffer === "true"
  const isMobile = useMobileCheck()
  const listRef: any = useRef(null)
  const [noOfRooms, setNoOfRooms] = useState(roomsCount)
  const roomsLength = noOfRooms?.length
  const maxRoomsCountAllowed = isCUGOffer || isSEB ? 3 : maxRoomsCount
  const maxAdults = isComplementary ? 2 : 7
  const maxAdultsWithoutChild = isComplementary ? 2 : 7
  const maxChildren = isComplementary ? 2 : 7
  const maxGuestsPerRoom = 14
  const isCouponCodeApplied = userEnteredPromoCode?.couponCode || cugType?.toLowerCase() === "coupon"

  const updateAdults = (index: number, job: string) => {
    let tempGuests = [...noOfRooms]
    const currentRoom = noOfRooms[index]
    const maxAdultAllowed = maxGuestsPerRoom - currentRoom?.child
    const maxAdultCount = currentRoom?.child === 0 ? maxAdultsWithoutChild : maxAdults
    let updatedRoom: any = {}
    switch (job) {
      case "remove":
        updatedRoom = {
          ...currentRoom,
          adults: currentRoom.adults > CONSTANTS?.ONE ? currentRoom.adults - 1 : 1,
        }
        break
      case "add":
        if (isComplementary || isCouponCodeApplied) {
          updatedRoom = {
            ...currentRoom,
            adults: currentRoom.adults < maxAdultCount ? currentRoom.adults + 1 : maxAdultCount,
          }
        } else {
          if (noOfRooms?.length < maxRoomsCountAllowed) {
            if (currentRoom?.adults === Math?.min(maxAdultAllowed, maxAdultCount) && false) {
              //add false to implement 7+7 logic
              setNoOfRooms((prev: any) => [
                ...prev,
                {
                  id: noOfRooms?.length + 1,
                  adults: 1,
                  child: 0,
                  room: "ROOM",
                  isSelected: false,
                },
              ])
              return
            } else {
              updatedRoom = {
                ...currentRoom,
                adults:
                  currentRoom.adults < Math?.min(maxAdultAllowed, maxAdultCount)
                    ? currentRoom.adults + 1
                    : Math?.min(maxAdultAllowed, maxAdultCount),
              }
            }
          } else {
            updatedRoom = {
              ...currentRoom,
              adults:
                currentRoom.adults < Math?.min(maxAdultAllowed, maxAdultCount)
                  ? currentRoom.adults + 1
                  : Math?.min(maxAdultAllowed, maxAdultCount),
            }
          }
        }
        break
      default:
        break
    }

    tempGuests.splice(index, 1, updatedRoom)
    setNoOfRooms(tempGuests)
  }

  const updateChild = (index: number, job: string) => {
    let tempGuests = [...noOfRooms]
    const currentRoom = noOfRooms[index]
    let updatedRoom: any = {}
    const maxChildAllowed = maxGuestsPerRoom - currentRoom?.adults
    switch (job) {
      case "remove":
        updatedRoom = {
          ...currentRoom,
          child: currentRoom.child > CONSTANTS?.ONE ? currentRoom.child - 1 : 0,
        }
        break
      case "add":
        if (
          !isComplementary &&
          !isCouponCodeApplied &&
          noOfRooms?.length < maxRoomsCountAllowed &&
          (currentRoom?.child === maxChildAllowed || (currentRoom?.child === 0 && currentRoom?.adults === 3)) &&
          false
        ) {
          //add false to implement 7+7 logic
          if (currentRoom?.child === maxChildAllowed) {
            setNoOfRooms((prev: any) => [
              ...prev,
              {
                id: noOfRooms.length + 1,
                adults: 1,
                child: 1,
                room: "ROOM",
                isSelected: false,
              },
            ])
          } else if (currentRoom?.child === 0 && currentRoom?.adults === 3) {
            const modifiedRooms = noOfRooms?.map((room: any) => {
              if (room?.id === currentRoom?.id) {
                return {
                  id: currentRoom?.id,
                  adults: 2,
                  child: 0,
                  room: "ROOM",
                  isSelected: false,
                }
              } else {
                return room
              }
            })
            setNoOfRooms([
              ...modifiedRooms,
              {
                id: noOfRooms?.length + 1,
                adults: 1,
                child: 1,
                room: "ROOM",
                isSelected: false,
              },
            ])
          }
          return
        }
        if (isComplementary) {
          updatedRoom = {
            ...currentRoom,
            child: currentRoom.child < maxChildren ? currentRoom.child + 1 : maxChildren,
          }
        } else {
          updatedRoom = {
            ...currentRoom,
            child:
              currentRoom?.child >= maxChildAllowed
                ? maxChildAllowed
                : currentRoom?.child >= maxChildren
                ? maxChildren
                : currentRoom?.child + 1,
          }
        }
        break
      default:
        break
    }

    tempGuests.splice(index, 1, updatedRoom)
    setNoOfRooms(tempGuests)
  }
  const removeRoom = (index: number) => {
    let allRooms = [...noOfRooms]
    allRooms.length > CONSTANTS?.ONE && allRooms.splice(index, 1)
    let updateRooms = allRooms?.map((item, idx) => {
      return {
        ...item,
        id: idx + 1,
      }
    })
    setNoOfRooms(updateRooms)
  }

  useEffect(() => {
    setRoomsCount(noOfRooms)
    let gCount = 0
    noOfRooms?.map((room: any) => {
      gCount += room.adults
      gCount += room.child
    })
    setGuestCount(gCount)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noOfRooms])

  const handleClose = () => {
    setExpandGuestRoomCount && setExpandGuestRoomCount(false)
  }

  //* Using to auto scroll the add room CTA label
  useEffect(() => {
    if (listRef?.current) {
      listRef.current.scrollTop = listRef?.current?.scrollHeight
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomsLength, isMobile])

  return (
    <ClickAwayListener onClickAway={handleClose} mouseEvent="onClick" touchEvent={false}>
      <GuestRoomPopUpBox
        ref={listRef}
        sx={{
          top: top,
          right: right,
          zIndex: zIndex,
        }}
        onClick={(e: any) => {
          e.stopPropagation()
        }}>
        {noOfRooms?.map((item: any, index: number) => {
          return (
            <Fragment key={index}>
              <CloseIconBox>
                <Typography variant={isMobile ? "m-body-sl" : "body-ml"} fontWeight={"bold"}>
                  Room {index + 1}
                </Typography>
                {index !== 0 && (
                  <IconButton
                    disableRipple
                    onClick={() => {
                      removeRoom(index)
                    }}>
                    <CloseIcon
                      sx={{
                        width: isMobile ? "2.5vw" : "0.521vw",
                        height: isMobile ? "2.5vw" : "0.547vw",
                      }}
                    />
                  </IconButton>
                )}
              </CloseIconBox>
              <RoomBoxContainer>
                <CountContainer>
                  <MinusIcon
                    onClick={() => updateAdults(index, "remove")}
                    sx={{
                      width: isMobile ? "3.125vw" : "1.042vw",
                      height: isMobile ? "3.125vw" : "1.042vw",
                      cursor: item?.adults > 1 ? "pointer" : "default",
                    }}
                  />
                  <Typography variant={isMobile ? "m-body-l" : "body-l"}>
                    {Pluralize("Adult", item?.adults, false)}
                  </Typography>
                  <PlusIcon
                    onClick={() => updateAdults(index, "add")}
                    sx={{
                      width: isMobile ? "3.125vw" : "1.042vw",
                      height: isMobile ? "3.125vw" : "1.042vw",
                      cursor:
                        item?.child == 0
                          ? item?.adults < maxAdultsWithoutChild
                            ? "pointer"
                            : "default"
                          : item?.adults < maxAdults
                          ? "pointer"
                          : "default",
                      opacity: item?.adults < maxAdults ? 1 : 0.3,
                    }}
                  />
                </CountContainer>
                <VerticalDivider orientation="vertical" flexItem />
                <CountContainer>
                  <MinusIcon
                    onClick={() => updateChild(index, "remove")}
                    sx={{
                      width: isMobile ? "3.125vw" : "1.042vw",
                      height: isMobile ? "3.125vw" : "1.042vw",
                      cursor: item?.child > 0 ? "pointer" : "default",
                    }}
                  />
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant={isMobile ? "m-body-l" : "body-l"}>
                      {item?.child <= 1 ? `${item?.child} Child` : `${item?.child} Children`}
                    </Typography>
                    <br />
                    <Typography variant={isMobile ? "m-body-s" : "body-s"}>(0 - 12 yrs)</Typography>
                  </Box>
                  <PlusIcon
                    onClick={() => updateChild(index, "add")}
                    sx={{
                      width: isMobile ? "3.125vw" : "1.042vw",
                      height: isMobile ? "3.125vw" : "1.042vw",
                      cursor: item?.child < maxChildren ? "pointer" : "default",
                      opacity: item?.child < maxChildren ? 1 : 0.3,
                    }}
                  />
                </CountContainer>
              </RoomBoxContainer>
            </Fragment>
          )
        })}
        {!isComplementary && !isCouponCodeApplied && (
          <ConfirmContainer>
            {noOfRooms.length < maxRoomsCountAllowed ? (
              <AddRoomTypography
                variant={isMobile ? "m-text-link" : "link-m"}
                onClick={() => {
                  setNoOfRooms([
                    ...noOfRooms,
                    {
                      id: noOfRooms.length + 1,
                      adults: 1,
                      child: 0,
                      room: "ROOM",
                      isSelected: false,
                    },
                  ])
                }}>
                {CONSTANTS?.ADD_MORE_ROOMS}
              </AddRoomTypography>
            ) : (
              <NeedMoreRoomBox>
                <Typography variant={isMobile ? "m-body-s" : "body-s"}>
                  {` Need ${maxRoomsCountAllowed + 1} rooms or more? `}
                </Typography>
                <Stack sx={{ flexDirection: "row", alignItems: "baseline" }}>
                  <Typography variant={isMobile ? "m-body-s" : "body-s"}>Contact</Typography>
                  <a href={`mailto:RESERVATIONS@TAJHOTELS.COM`}>
                    <Typography
                      variant={isMobile ? "m-text-link" : "link-m"}
                      sx={{ cursor: "pointer", fontWeight: 400, ml: "0.5vw" }}>
                      {CONSTANTS?.WEBSITE}
                    </Typography>
                  </a>
                </Stack>
              </NeedMoreRoomBox>
            )}
          </ConfirmContainer>
        )}
      </GuestRoomPopUpBox>
    </ClickAwayListener>
  )
}

export default observer(GuestRoomComponent)
