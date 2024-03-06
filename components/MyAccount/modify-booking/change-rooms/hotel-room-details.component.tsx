import React, { useState } from "react"
import { urlFor } from "../../../../lib-sanity"
import { PathType } from "../../../../types"
import Pluralize from "../../../../utils/pluralize"
import { KeyboardArrowDownSharp } from "@mui/icons-material"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { formatDateWithMON } from "../../../../utils/getDate"
import ModalStore from "../../../../store/global/modal.store"
import { MinusIcon, PlusIcon } from "../../../../utils/customIcons"
import { currency2DecimalSymbol } from "../../../../utils/currency"
import { useAppNavigation } from "../../../../utils/NavigationUtility"
import { CustomCheckBox } from "../../../hoc/CustomCheckBox/Checkbox"
import { BOOKING_CONSTANT } from "../../../../features/booking/constants"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { Box, Stack, Divider, Typography, ClickAwayListener } from "@mui/material"
import {
  MainBox,
  RoomImage,
  MainStack,
  DatesStack,
  CheckBoxStack,
  PackageDetailsBox,
  BoldLabelTypography,
  DropDownStack,
  DropDownMenuStack,
  MenuStack,
} from "./styles/hotel-room-details"
import { StyledDivider } from "./edit-rooms-styles"
import constants from "./modify-constants.json"
import { CONSTANTS } from "../../../constants"
interface HotelRoomsInterface {
  index: number
  roomDetails: any
  selectedRooms: any
  selectedRoomsData: any
  setSelectedRooms: Function
  setSelectedRoomsData: Function
}

const HotelRoomsDetails = ({
  index,
  roomDetails,
  selectedRooms,
  setSelectedRooms,
  selectedRoomsData,
  setSelectedRoomsData,
}: HotelRoomsInterface) => {
  const isMobile = useMobileCheck()
  const modalStore = ModalStore.getInstance()
  const navigate = useAppNavigation()
  const [isEdit, setIsEdit] = useState(false)
  const [open, setOpen] = useState(false)
  const [adults, setAdults] = useState(roomDetails?.adult)
  const [children, setChildren] = useState(roomDetails?.children)
  const minAdultCount = 1
  const minChildCount = 0
  const maxAdultCount = 7
  const maxChildCount = 7
  const handleChange = (index: number) => {
    //* adding and removing the selected room constants
    //* handling the multiple rooms selection
    if (selectedRooms?.[index]) {
      selectedRooms[index] = false
      setSelectedRooms([...selectedRooms])
      const newArray = selectedRoomsData?.filter((item: any) => item?.confirmationId !== roomDetails?.confirmationId)
      setSelectedRoomsData(newArray)
    } else {
      selectedRooms[index] = true
      setSelectedRooms([...selectedRooms])
      setSelectedRoomsData([...selectedRoomsData, roomDetails])
    }
  }

  const handleGuestsChange = (guest: string, value: number) => {
    selectedRooms[index] = true
    setSelectedRooms([...selectedRooms])
    let temp = roomDetails
    temp[guest] = value
    selectedRoomsData
      ? setSelectedRoomsData([
          ...selectedRoomsData?.filter((item: any) => item?.confirmationId !== roomDetails?.confirmationId),
          temp,
        ])
      : setSelectedRoomsData([temp])
    guest == "adult" ? setAdults(value) : setChildren(value)
  }

  return (
    <Box aria-label="HotelRoomsDetails">
      <MainBox>
        <CheckBoxStack>
          <CustomCheckBox
            withBorder
            onChange={() => {
              handleChange(index)
            }}
            checked={selectedRooms?.[index]}
            key={String(selectedRooms?.[index])}
          />
          <Typography variant={isMobile ? "m-body-m" : "body-m"}>{`Room ${roomDetails?.roomNumber}`}</Typography>
        </CheckBoxStack>
      </MainBox>
      <MainStack>
        <Stack flexDirection={"row"} columnGap={MobilePxToVw(20)}>
          {roomDetails?.roomImgUrl && (
            <RoomImage alt="room-img" component={"img"} src={urlFor(roomDetails?.roomImgUrl)?.url()} />
          )}
          {isMobile && (
            <Typography variant={isMobile ? "m-body-l" : "body-l"} sx={{ fontWeight: 700 }}>
              {roomDetails?.roomName}
            </Typography>
          )}
        </Stack>
        <>
          <Box width="100%">
            <Stack
              flexDirection={"column"}
              pb={isMobile ? MobilePxToVw(20) : DesktopPxToVw(20)}
              rowGap={isMobile ? MobilePxToVw(10) : DesktopPxToVw(10)}>
              {!isMobile && (
                <Typography mb={DesktopPxToVw(10)} variant={isMobile ? "m-body-l" : "body-l"} sx={{ fontWeight: 700 }}>
                  {roomDetails?.roomName}
                </Typography>
              )}
              <Stack flexDirection={isMobile ? "column" : "row"} columnGap={DesktopPxToVw(130)}>
                <Box>
                  <BoldLabelTypography variant={isMobile ? "m-body-s" : "body-s"}>
                    {constants?.currentDates}
                  </BoldLabelTypography>
                  <DatesStack>
                    {roomDetails?.checkIn && (
                      <Typography lineHeight={"150%"} variant={isMobile ? "m-body-m" : "body-m"}>
                        {formatDateWithMON(roomDetails?.checkIn)}
                      </Typography>
                    )}
                    <StyledDivider />
                    {roomDetails?.checkOut && (
                      <Typography lineHeight={"150%"} variant={isMobile ? "m-body-m" : "body-m"}>
                        {formatDateWithMON(roomDetails?.checkOut)}
                      </Typography>
                    )}
                  </DatesStack>
                </Box>
                {/* Guests */}
                <ClickAwayListener onClickAway={() => setOpen(false)}>
                  <Stack
                    mt={isMobile ? MobilePxToVw(20) : 0}
                    flexDirection={"column"}
                    rowGap={isEdit ? 0 : isMobile ? MobilePxToVw(10) : DesktopPxToVw(5)}>
                    <BoldLabelTypography variant={isMobile ? "m-body-s" : "body-s"}>
                      {constants?.guests}
                    </BoldLabelTypography>
                    {isEdit || isMobile ? (
                      <Stack flexDirection={"column"} position={"relative"}>
                        <DropDownStack onClick={() => setOpen((prev: any) => !prev)}>
                          <Typography
                            variant={
                              isMobile ? "m-body-l" : "body-l"
                            }>{`${Pluralize(CONSTANTS?.ADULT, adults, false)}${children ? ` - ${Pluralize(CONSTANTS?.CHILD, children, false)}` : ""}`}</Typography>
                          <Box
                            sx={{
                              transform: open ? "rotate(180deg)" : "rotate(0deg)",
                            }}>
                            <KeyboardArrowDownSharp />
                          </Box>
                        </DropDownStack>
                        {open && (
                          <DropDownMenuStack>
                            <MenuStack>
                              <MinusIcon
                                onClick={() => adults > minAdultCount && handleGuestsChange("adult", adults - 1)}
                                sx={{
                                  width: isMobile ? "3.125vw" : DesktopPxToVw(20),
                                  height: isMobile ? "3.125vw" : DesktopPxToVw(20),
                                  cursor: adults > minAdultCount ? "pointer" : "default",
                                }}
                              />
                              <Typography variant={isMobile ? "m-body-l" : "body-l"}>
                                {Pluralize(CONSTANTS?.ADULT, adults, false)}
                              </Typography>
                              <PlusIcon
                                onClick={() => adults < maxAdultCount && handleGuestsChange("adult", adults + 1)}
                                sx={{
                                  width: isMobile ? "3.125vw" : DesktopPxToVw(20),
                                  height: isMobile ? "3.125vw" : DesktopPxToVw(20),
                                  cursor: adults < maxAdultCount ? "pointer" : "default",
                                  opacity: adults < maxAdultCount ? 1 : 0.3,
                                }}
                              />
                            </MenuStack>
                            <Divider></Divider>
                            <MenuStack>
                              <MinusIcon
                                onClick={() => children > minChildCount && handleGuestsChange("children", children - 1)}
                                sx={{
                                  width: isMobile ? "3.125vw" : DesktopPxToVw(20),
                                  height: isMobile ? "3.125vw" : DesktopPxToVw(20),
                                  cursor: children > minChildCount ? "pointer" : "default",
                                }}
                              />
                              <Typography variant={isMobile ? "m-body-l" : "body-l"}>
                                {children ? Pluralize(CONSTANTS?.CHILD, children, false) : `${children} ${CONSTANTS?.CHILD}`}
                              </Typography>
                              <PlusIcon
                                onClick={() => children < maxChildCount && handleGuestsChange("children", children + 1)}
                                sx={{
                                  width: isMobile ? "3.125vw" : DesktopPxToVw(20),
                                  height: isMobile ? "3.125vw" : DesktopPxToVw(20),
                                  cursor: children < maxChildCount ? "pointer" : "default",
                                  opacity: children < maxChildCount ? 1 : 0.3,
                                }}
                              />
                            </MenuStack>
                          </DropDownMenuStack>
                        )}
                      </Stack>
                    ) : (
                      <Stack
                        flexDirection={"row"}
                        alignItems={"center"}
                        columnGap={isMobile ? MobilePxToVw(20) : DesktopPxToVw(20)}>
                        {roomDetails?.checkIn && (
                          <Typography lineHeight={"150%"} variant={isMobile ? "m-body-m" : "body-m"}>
                            {`${Pluralize(CONSTANTS?.ADULT, adults, false)}${children ? ` - ${Pluralize(CONSTANTS?.CHILD, children, false)}` : ""}`}
                          </Typography>
                        )}
                        <Typography
                          variant={isMobile ? "m-link-m" : "link-m"}
                          onClick={() => {
                            setIsEdit(true)
                          }}>
                          {constants?.edit}
                        </Typography>
                      </Stack>
                    )}
                  </Stack>
                </ClickAwayListener>
              </Stack>
              <Box mt={isMobile ? MobilePxToVw(20) : DesktopPxToVw(10)}>
                <BoldLabelTypography variant={isMobile ? "m-body-s" : "body-s"}>
                  {constants?.package}
                </BoldLabelTypography>
                <PackageDetailsBox mt={0}>
                  <Typography variant={isMobile ? "m-body-m" : "body-m"}>{roomDetails?.packageName}</Typography>
                  <Typography variant={isMobile ? "m-body-l" : "body-l"}>
                    {currency2DecimalSymbol(roomDetails?.price, roomDetails?.currency)}
                  </Typography>
                </PackageDetailsBox>
              </Box>
              <Typography
                m={0}
                variant={isMobile ? "m-text-link" : "link-m"}
                onClick={() => {
                  modalStore?.setPropertyData({
                    title: roomDetails?.modifyBooking?.packageName || roomDetails?.packageName,
                    cancellationPolicy:
                      roomDetails?.modifyBooking?.cancelPolicyDescription || roomDetails?.cancelPolicyDescription,
                    guaranteePolicy:
                      roomDetails?.modifyBooking?.bookingPolicyDescription || roomDetails?.bookingPolicyDescription,
                    price: roomDetails?.modifyBooking?.price || roomDetails?.price,
                    shortDescription: roomDetails?.modifyBooking?.description || roomDetails?.description,
                    longDescription:
                      roomDetails?.modifyBooking?.detailedDescription || roomDetails?.detailedDescription,
                    currencyCode: roomDetails?.currency,
                  })
                  navigate("/hotel-rooms/rate-detail", PathType?.dialog)
                }}>
                {isMobile ? BOOKING_CONSTANT?.RATE_DETAILS : BOOKING_CONSTANT?.CANCELLATION_POLICY}
              </Typography>
            </Stack>
          </Box>
        </>
      </MainStack>
    </Box>
  )
}

export default HotelRoomsDetails
