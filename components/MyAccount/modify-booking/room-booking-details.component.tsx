import React from "react"
import data from "./modify-booking-json.json"
import { Divider, Stack, Typography } from "@mui/material"
import { formatDateWithMON } from "../../../utils/getDate"
import { useMobileCheck } from "../../../utils/isMobilView"
import { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { currency2DecimalSymbol } from "../../../utils/currency"
import {
  ColumnBox,
  CheckInBox,
  GridWrapper,
  TextTypography,
} from "./room-booking-details.styles"

const RoomBookingDetails = ({ hotelDetails }: any) => {
  const isMobile = useMobileCheck()
  const roomDetails = hotelDetails?.orderLineItems?.[0]?.hotel
  const isComplementary = roomDetails?.voucherRedemption?.isComplementary
  const complementaryBasePrice = roomDetails?.complementaryBasePrice

  return (
    <GridWrapper aria-label="RoomBookingDetails">
      <Stack
        flexDirection={"row"}
        rowGap={MobilePxToVw(30)}
        flexWrap={isMobile ? "wrap" : "unset"}
        justifyContent={"space-between"}>
        <ColumnBox>
          <CheckInBox>
            <Typography variant={isMobile ? "m-body-s" : "body-s"}>{data?.checkIn}</Typography>
            <TextTypography variant={isMobile ? "m-heading-xs" : "heading-xs"}>
              {formatDateWithMON(roomDetails?.checkIn)}
            </TextTypography>
          </CheckInBox>
        </ColumnBox>
        {!isMobile && <Divider orientation="vertical" flexItem />}
        <ColumnBox>
          <CheckInBox>
            <Typography variant={isMobile ? "m-body-s" : "body-s"}>{data?.checkOut}</Typography>
            <TextTypography variant={isMobile ? "m-heading-xs" : "heading-xs"}>
              {formatDateWithMON(roomDetails?.checkOut)}
            </TextTypography>
          </CheckInBox>
        </ColumnBox>
        {!isMobile && <Divider orientation="vertical" flexItem />}
        <ColumnBox>
          <CheckInBox>
            <Typography variant={isMobile ? "m-body-s" : "body-s"}>{data?.bookedOn}</Typography>
            <TextTypography variant={isMobile ? "m-heading-xs" : "heading-xs"}>
              {formatDateWithMON(hotelDetails?.createdTimestamp)}
            </TextTypography>
          </CheckInBox>
        </ColumnBox>
        {!isMobile && <Divider orientation="vertical" flexItem />}
        <ColumnBox>
          <CheckInBox>
            <Typography variant={isMobile ? "m-body-s" : "body-s"}>{data?.priceAmount}</Typography>
            <TextTypography variant={isMobile ? "m-heading-xs" : "heading-xs"}>
              {currency2DecimalSymbol(isComplementary ? roomDetails?.amountPaid : roomDetails?.grandTotal,
                roomDetails?.rooms?.[0]?.currency)}
            </TextTypography>
          </CheckInBox>
        </ColumnBox>
        {!isMobile && <Divider orientation="vertical" flexItem />}
        <ColumnBox>
          <CheckInBox>
            <Typography whiteSpace={"nowrap"} variant={isMobile ? "m-body-s" : "body-s"}>
              {data?.paymentMethod}
            </Typography>
            <TextTypography variant={isMobile ? "m-heading-xs" : "heading-xs"}>
              {hotelDetails?.transactionStatus}
            </TextTypography>
          </CheckInBox>
        </ColumnBox>
      </Stack>
    </GridWrapper>
  )
}

export default RoomBookingDetails
