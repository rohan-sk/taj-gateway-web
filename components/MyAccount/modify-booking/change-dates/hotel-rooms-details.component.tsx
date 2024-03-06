import React, { useState } from "react"
import dynamic from "next/dynamic"
import { theme } from "../../../../lib/theme"
import { urlFor } from "../../../../lib-sanity"
import { formatDateWithMON } from "../../../../utils/getDate"
import { Box, Button, Stack, Typography } from "@mui/material"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { currency2DecimalSymbol, formatCurrencyWithMinus, formatCurrencyWithPlus } from "../../../../utils/currency"
import { CustomCheckBox } from "../../../hoc/CustomCheckBox/Checkbox"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import {
  MainBox,
  RoomImage,
  MainStack,
  DatesStack,
  PriceDivider,
  CheckBoxStack,
  PackageDetailsBox,
  BoldLabelTypography,
} from "./styles/hotel-room-details"
import { StyledDivider } from "./edit-rooms-styles"
import data from "./booking-json.json"

const NewSelectedDateComponent = dynamic(() => import("./new-selected-dates.component"))

interface HotelRoomsInterface {
  endDate: any
  index: number
  startDate: any
  roomsData: any
  selectedRooms: any
  selectedRoomsData: any
  setSelectedRooms: Function
  latestRoomsAvailability: any
  roomsNewPrice: any
  setRoomsNewPrice: Function
  setSelectedRoomsData: Function
  getOldPrice: Function
  isModifiedSuccess: any
  checkedDates?: boolean
  isComplementary?: any
  complementaryBasePrice?: any
}

const HotelRoomsDetails = ({
  index,
  endDate,
  startDate,
  roomsData,
  selectedRooms,
  setSelectedRooms,
  selectedRoomsData,
  setSelectedRoomsData,
  latestRoomsAvailability,
  roomsNewPrice,
  setRoomsNewPrice,
  getOldPrice,
  isModifiedSuccess,
  checkedDates,
  isComplementary,
  complementaryBasePrice
}: HotelRoomsInterface) => {
  const isMobile = useMobileCheck()

  const [selectedIndex, setSelectedIndex] = useState<any>()

  const newRoomData = roomsNewPrice?.filter(
    (room: any) => room?.roomNumber == roomsData?.roomNumber
  )?.[0]


  const handleChange = (index: number) => {
    //* adding and removing the selected room data
    //* handling the multiple rooms selection
    if (selectedRooms?.[index]) {
      selectedRooms[index] = false
      setSelectedRooms([...selectedRooms])
      const newArray = selectedRoomsData?.filter(
        (item: any) => item?.confirmationId !== roomsData?.confirmationId
      )
      setSelectedRoomsData(newArray)
    } else {
      selectedRooms[index] = true
      const newArray = roomsNewPrice?.filter(
        (item: any) => item?.roomNumber !== roomsData?.roomNumber
      )
      setRoomsNewPrice(newArray)
      setSelectedRooms([...selectedRooms])
      setSelectedRoomsData([...selectedRoomsData, roomsData])
    }
  }

  const handleSelectRoom = (newRoomDetails: any) => {
    const newArray = roomsNewPrice?.map((room: any) => {
      if (room?.roomNumber === newRoomData?.roomNumber) {
        return {
          ...newRoomData,
          available: true,
          roomId: newRoomDetails?.roomCode,
          roomType: newRoomDetails?.roomCode,
          rateCode: newRoomDetails?.rateCode,
          roomName: newRoomDetails?.roomName,
          cost: newRoomDetails?.total?.amount,
          originalPrice: getOldPrice(newRoomData?.roomNumber),
          priceDifference:
            newRoomDetails?.total?.amount - getOldPrice(newRoomData?.roomNumber),
        }
      } else {
        return room
      }
    })
    setRoomsNewPrice(newArray)
  }

  const getText = () => {
    const dates = `${formatDateWithMON(startDate)} - ${formatDateWithMON(endDate)}`
    return data?.notAvailable?.split("_")?.join(dates)
  }

  return (
    <Box aria-label="HotelRoomsDetails">
      <MainBox>
        <CheckBoxStack>
          <CustomCheckBox
            withBorder
            isCheckBoxDisabled={isModifiedSuccess || checkedDates}
            onChange={() => {
              handleChange(index)
            }}
            checked={selectedRooms?.[index]}
          />
          <Typography variant={isMobile ? "m-body-m" : "body-m"}>{`Room ${roomsData?.roomNumber}`}</Typography>
        </CheckBoxStack>
      </MainBox>
      <MainStack>
        <Stack flexDirection={"row"} columnGap={MobilePxToVw(20)}>
          {roomsData?.roomImgUrl && (
            <RoomImage
              alt="room-img"
              component={"img"}
              src={urlFor(roomsData?.roomImgUrl)?.url()}
            />
          )}
          {isMobile && (
            <Typography variant={isMobile ? "m-body-l" : "body-l"} sx={{ fontWeight: 700 }}>
              {roomsData?.roomName}
            </Typography>
          )}
        </Stack>
        <>
          <Box width="100%">
            <Stack
              flexDirection={"column"}
              rowGap={isMobile ? MobilePxToVw(20) : DesktopPxToVw(10)}
              p={isMobile ? `0 0 ${MobilePxToVw(20)}` : `${DesktopPxToVw(20)} 0`}>
              {!isMobile && (
                <Typography variant={isMobile ? "m-body-l" : "body-l"} sx={{ fontWeight: 700 }}>
                  {newRoomData?.roomName || roomsData?.roomName}
                </Typography>
              )}
              {
                //* showing rooms availability information (available or not )
                newRoomData && (
                  <>
                    {newRoomData && newRoomData?.available ? (
                      <Typography
                        variant={isMobile ? "m-body-s" : "body-s"}
                        sx={{
                          color: theme?.palette?.neuPalette?.hexTwentyFour,
                        }}>
                        {data?.available}
                      </Typography>
                    ) : (
                      <Typography
                        variant={isMobile ? "m-body-s" : "body-s"}
                        sx={{
                          color: theme?.palette?.neuPalette?.hexTwentyOne,
                        }}>
                        {getText()}
                      </Typography>
                    )}
                  </>
                )
              }
              <Box>
                <BoldLabelTypography variant={isMobile ? "m-body-s" : "body-s"}>
                  {data?.currentDates}
                </BoldLabelTypography>
                <DatesStack>
                  {roomsData?.checkIn && (
                    <Typography variant={isMobile ? "m-body-m" : "body-m"}>
                      {formatDateWithMON(roomsData?.checkIn)}
                    </Typography>
                  )}
                  <StyledDivider />
                  {roomsData?.checkOut && (
                    <Typography variant={isMobile ? "m-body-m" : "body-m"}>
                      {formatDateWithMON(roomsData?.checkOut)}
                    </Typography>
                  )}
                </DatesStack>
              </Box>
              <Box>
                <BoldLabelTypography variant={isMobile ? "m-body-s" : "body-s"}>
                  {data?.package}
                </BoldLabelTypography>
                <PackageDetailsBox>
                  <Typography variant={isMobile ? "m-body-m" : "body-m"}>
                    {roomsData?.packageName}
                  </Typography>
                  <Typography whiteSpace={"nowrap"} variant={isMobile ? "m-body-l" : "body-l"}>
                    {currency2DecimalSymbol(isComplementary
                      ? (complementaryBasePrice || 0)
                      : roomsData?.price, roomsData?.currency)}
                  </Typography>
                </PackageDetailsBox>
              </Box>
            </Stack>
            {newRoomData && newRoomData?.available && (
              <>
                <NewSelectedDateComponent
                  startDate={newRoomData?.checkIn}
                  endDate={newRoomData?.checkOut}
                  newRoom={newRoomData}
                  roomPrice={isComplementary ? complementaryBasePrice : newRoomData?.cost}
                />
                <PriceDivider />
                <Stack sx={{ marginTop: isMobile ? MobilePxToVw(20) : "1.042vw" }}>
                  <BoldLabelTypography variant={isMobile ? "m-body-xs" : "body-s"}>
                    {data?.changeFee}
                  </BoldLabelTypography>
                  <PackageDetailsBox sx={{ marginTop: "0.521vw" }}>
                    <Typography variant={isMobile ? "m-body-m" : "body-m"}>
                      {data?.priceChange}
                    </Typography>
                    <Typography
                      variant={isMobile ? "m-body-m" : "body-m"}
                      sx={{
                        color:
                          roomsData?.price > newRoomData?.cost
                            ? theme?.palette?.neuPalette?.hexTwo
                            : theme.palette.neuPalette.hexTwentyFour,
                      }}>
                      {newRoomData?.priceDifference >= 0
                        ? newRoomData?.priceDifference > 0
                          ? formatCurrencyWithPlus(
                            newRoomData?.priceDifference,
                            newRoomData?.currency
                          )
                          : currency2DecimalSymbol(
                            newRoomData?.priceDifference,
                            newRoomData?.currency
                          )
                        : formatCurrencyWithMinus(
                          newRoomData?.priceDifference,
                          newRoomData?.currency
                        )}
                    </Typography>
                  </PackageDetailsBox>
                </Stack>
              </>
            )}
          </Box>
        </>
      </MainStack>
      {/* showing other rooms to select when selected room is not available */}
      {newRoomData && newRoomData?.showRooms && !isComplementary && latestRoomsAvailability?.roomTypes?.length > 0 && (
        <Stack>
          <Typography
            variant={isMobile ? "m-body-l" : "body-l"}
            fontWeight={700}
            mt={isMobile ? MobilePxToVw(20) : "1.5vw"}>
            {data?.selectAnotherRoom}
          </Typography>
          <Stack
            flexDirection={"column"}
            rowGap={isMobile ? MobilePxToVw(20) : DesktopPxToVw(20)}>
            {latestRoomsAvailability?.roomTypes?.[index]?.rooms?.map(
              (newRoom: any, index: number) => (
                <Stack
                  flexDirection={isMobile ? "column" : "row"}
                  columnGap={DesktopPxToVw(38)}
                  sx={{
                    margin: "1.042vw 0vw",
                  }}
                  key={index}>
                  <Stack flexDirection={"row"} columnGap={MobilePxToVw(20)}>
                    {roomsData?.roomImgUrl && (
                      <RoomImage
                        alt="room-img"
                        component={"img"}
                        src={urlFor(roomsData?.roomImgUrl)?.url()}
                      />
                    )}
                    {isMobile && (
                      <Typography
                        variant={isMobile ? "m-body-l" : "body-l"}
                        sx={{ fontWeight: 700 }}>
                        {newRoom?.roomName}
                      </Typography>
                    )}
                  </Stack>
                  <Stack width={"100%"}>
                    {!isMobile && (
                      <Typography
                        variant={isMobile ? "m-body-l" : "body-l"}
                        sx={{ fontWeight: 700 }}>
                        {newRoom?.roomName}
                      </Typography>
                    )}
                    <NewSelectedDateComponent
                      startDate={newRoomData?.checkIn}
                      endDate={newRoomData?.checkOut}
                      newRoom={newRoomData}
                      roomPrice={
                        newRoom?.total?.amount
                      }
                    />
                    <Button
                      variant={selectedIndex === index ? "light-outlined" : "light-contained"}
                      disabled={isModifiedSuccess}
                      sx={{
                        width: isMobile ? MobilePxToVw(223) : "11.615vw",
                        alignSelf: "flex-end",
                      }}
                      onClick={() => {
                        handleSelectRoom(newRoom), setSelectedIndex(index)
                      }}>
                      {selectedIndex === index ? data?.selectedRoom : data?.selectRoom}
                    </Button>
                  </Stack>
                </Stack>
              ))}
          </Stack>
        </Stack>
      )}
    </Box>
  )
}

export default HotelRoomsDetails
