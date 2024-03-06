import React from "react"
import data from "./booking-json.json"
import Pluralize from "../../../utils/pluralize"
import { formatDateWithMON } from "../../../utils/getDate"
import { useMobileCheck } from "../../../utils/isMobilView"
import {
  currency2DecimalSymbol,
  formatCurrencyWithMinus,
  formatCurrencyWithPlus,
} from "../../../utils/currency"
import { Box, Divider, Stack, Typography } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import {
  GridWrapper,
  RoomDetailsText,
  HotelText,
  RoomDetailsContainer,
  RoomBookingNumber,
  BookingNumber,
  Package,
  Policy,
} from "./room-details.styles"
import { PathType } from "../../../types"
import ModalStore from "../../../store/global/modal.store"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import { urlFor } from "../../../lib-sanity"
import { useImageUtility } from "../../../utils/hooks/useImageUtility"
import { CONSTANTS } from "../../constants"
import { BOOKING_CONSTANT } from "../../../features/booking/constants"
import { LabelBoldTypography } from "../../../features/booking/ui/styles/BookingConfirmedRoomDetails"
import { DetailsBox } from "../../BookingFlow/styles/booking-confirmed"
import { theme } from "../../../lib/theme"

const RoomsDetails = ({
  roomsData,
  item,
  isLarge,
  hotelDetails,
  isComplementary = false,
  complementaryBasePrice,
  currencyCode = "INR",
  changePrice = 0,
}: any) => {
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const modalStore = ModalStore.getInstance()
  const { getOptimizeImageUrl } = useImageUtility()
  const room = item ? item : roomsData
  const roomImage = room?.roomImgUrl?.split(" ")?.join("") //? for few image URLs we are getting space, due to that we are getting application error

  return (
    <Box aria-label="RoomsDetails">
      <Stack
        flexDirection={isMobile ? "column" : "row"}
        columnGap={DesktopPxToVw(30)}>
        {roomImage && (
          <Box
            component={"img"}
            alt="room-img"
            ml={!isLarge && !isMobile ? DesktopPxToVw(30) : 0}
            width={
              isMobile
                ? MobilePxToVw(476)
                : isLarge
                ? DesktopPxToVw(350)
                : DesktopPxToVw(250)
            }
            height={
              isMobile
                ? MobilePxToVw(280)
                : isLarge
                ? DesktopPxToVw(280)
                : DesktopPxToVw(171)
            }
            key={room?.roomImgUrl}
            src={getOptimizeImageUrl(urlFor(roomImage)?.url(), 6)}
          />
        )}
        <GridWrapper>
          <RoomDetailsText variant={isMobile ? "m-body-ml" : "body-ml"}>
            {room?.modifyBooking?.roomName || room?.roomName}
          </RoomDetailsText>
          {isLarge && (
            <HotelText variant={isMobile ? "m-body-ml" : "body-ml"}>
              {hotelDetails?.name}
            </HotelText>
          )}
          <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
            <RoomDetailsContainer
              sx={{ flexDirection: item ? "column" : "initial" }}>
              <RoomBookingNumber variant={isMobile ? "m-body-s" : "body-xs"}>
                {item ? (
                  `${CONSTANTS?.ROOM_LABEL} ${room?.roomNumber} ${data?.roomBookingNumber}`
                ) : (
                  <>
                    {(room?.modifyBooking?.noOfNights || room?.noOfNights) &&
                      `${Pluralize(
                        CONSTANTS?.NIGHT_LABEL,
                        room?.modifyBooking?.noOfNights || room?.noOfNights,
                        false
                      )},`}
                    {`
                ${formatDateWithMON(roomsData?.checkIn)} to
                ${formatDateWithMON(roomsData?.checkOut)},`}
                    &nbsp;
                    {Pluralize(CONSTANTS?.ADULT, roomsData?.adult, false)}
                    {roomsData?.children ? ", " : ""}
                    {roomsData?.children
                      ? roomsData?.children > 1
                        ? `${roomsData?.children} ${CONSTANTS?.CHILDREN}`
                        : `${roomsData?.children} ${CONSTANTS?.CHILD}`
                      : ""}
                  </>
                )}
              </RoomBookingNumber>
              <BookingNumber variant={isMobile ? "m-body-xs" : "body-m"}>
                {item?.confirmationId}
              </BookingNumber>
            </RoomDetailsContainer>
            {item ? (
              <Typography variant={isMobile ? "m-body-xs" : "body-xs"}>
                {room?.status?.toUpperCase()}
              </Typography>
            ) : (
              <></>
            )}
          </Stack>
          {isMobile && <Divider sx={{ width: "100%", margin: "3.125vw 0" }} />}
          <Stack gap={isMobile ? MobilePxToVw(8) : DesktopPxToVw(8)}>
            <Package variant={isMobile ? "m-body-xs" : "body-m"}>
              {data?.package}
            </Package>
            <Stack flexDirection={"row"} justifyContent={"space-between"}>
              <Typography variant={isMobile ? "m-body-m" : "body-s"}>
                {room?.modifyBooking?.packageName || room?.packageName}
              </Typography>
              <Typography
                variant={isMobile ? "m-body-l" : "body-s"}
                whiteSpace={"nowrap"}>
                {currency2DecimalSymbol(
                  isComplementary
                    ? complementaryBasePrice
                    : room?.modifyBooking?.price || room?.price,
                  room?.currency
                )}
              </Typography>
            </Stack>
          </Stack>
          <Policy
            variant={isMobile ? "m-text-link" : "link-m"}
            mt={isMobile ? MobilePxToVw(10) : DesktopPxToVw(10)}
            onClick={() => {
              modalStore?.setPropertyData({
                title: room?.modifyBooking?.packageName || room?.packageName,
                cancellationPolicy:
                  room?.modifyBooking?.cancelPolicyDescription ||
                  room?.cancelPolicyDescription,
                guaranteePolicy:
                  room?.modifyBooking?.bookingPolicyDescription ||
                  room?.bookingPolicyDescription,
                price: isComplementary
                  ? complementaryBasePrice
                  : room?.modifyBooking?.price || room?.price,
                shortDescription:
                  room?.modifyBooking?.description || room?.description,
                longDescription:
                  room?.modifyBooking?.detailedDescription ||
                  room?.detailedDescription,
                currencyCode: room?.modifyBooking?.currency || room?.currency,
              })
              navigate("/hotel-rooms/rate-detail", PathType?.dialog)
            }}>
            {data?.cancelationPolicy}
          </Policy>
          {/* Commented Temporarily as it is reflected in my account with out breakup */}
          {/* {Boolean(changePrice || changePrice == 0) && (
            <>
              <Divider
                sx={{
                  mt: isMobile
                    ? MobilePxToVw(20)
                    : DesktopPxToVw(20),
                }}
              />
              <LabelBoldTypography>
                {BOOKING_CONSTANT?.CHANGE_FEE}
              </LabelBoldTypography>
              <DetailsBox>
                <Typography
                  variant={isMobile ? "m-body-m" : "body-m"}
                  sx={{ mt: "0.36vw" }}>
                  {BOOKING_CONSTANT?.PRICE_CHANGE}
                </Typography>
                <Typography
                  lineHeight={"150%"}
                  color={
                    changePrice < 0
                      ? theme.palette.neuPalette.hexTwo
                      : theme.palette.neuPalette.hexTwentyFour
                  }
                  variant={isMobile ? "m-body-m" : "body-ml"}>
                  {changePrice >= 0
                    ? changePrice > 0
                      ? formatCurrencyWithPlus(
                        changePrice,
                        currencyCode
                      )
                      : currency2DecimalSymbol(
                        changePrice,
                        currencyCode
                      )
                    : formatCurrencyWithMinus(
                      changePrice,
                      currencyCode
                    )}
                </Typography>
              </DetailsBox>
            </>
          )} */}
        </GridWrapper>
      </Stack>
    </Box>
  )
}

export default RoomsDetails
