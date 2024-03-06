; import React, { Fragment } from "react"
import { observer } from "mobx-react-lite"
import dynamic from "next/dynamic"
import Pluralize from "../../../utils/pluralize"
import { Box, Divider, Stack, Typography } from "@mui/material"
import { formatDateWithMON, isDateExpired } from "../../../utils/getDate"
import {
  currency2DecimalSymbol,
  currencyPrettier,
} from "../../../utils/currency"
const CustomCheckBox = dynamic(() => import("../../../components/hoc/CustomCheckBox/Checkbox").then((module) => module.CustomCheckBox))
import {
  ItemsCenterBox,
  RoomImageBox,
  RoomSelectionBarBox,
} from "./styles/cancel-room-selection-template"
import {
  DateStack,
  DateDivider,
  RoomDetailsBox,
  BoldTypography,
  PackageNameStack,
  CancelPolicyStack,
  CancelPolicyMainStack,
  CancelPolicyTypography,
  PayableAmountTypography,
  RefundAmountLabelTypography,
  DynamicStack,
} from "./styles/booked-room-details"

import data from "./cancel-room-data.json"
import { useMobileCheck } from "../../../utils/isMobilView"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { urlFor } from "../../../lib-sanity"

const RoomDetailsCard = ({
  roomDetails,
  selectedRooms,
  setSelectedRooms,
  cancellationRequested,
  cancellationDetails,
  isComplementary,
  complementaryBasePrice
}: any) => {
  const isMobile = useMobileCheck()

  const handleChange = (index: number) => {
    if (selectedRooms?.[index]) {
      selectedRooms[index] = false
      setSelectedRooms([...selectedRooms])
    } else {
      selectedRooms[index] = true
      setSelectedRooms([...selectedRooms])
    }
  }

  const getCancelledRoomData = (roomNumber: number) => {
    return cancellationDetails?.rooms?.filter((room: any) => room?.roomNumber === roomNumber)?.[0] || null
  }

  return (
    <Box aria-label="cancel-booking-template">
      {roomDetails?.rooms?.length > 0 &&
        roomDetails?.rooms
          ?.slice()
          ?.sort((a: any, b: any) => a?.roomNumber - b?.roomNumber)
          ?.map((room: any, index: number) => (
            <Fragment key={index}>
              {room?.status?.toLowerCase() !== "cancelled" && (
                <>
                  <RoomSelectionBarBox aria-label="RoomDetailsCard">
                    <ItemsCenterBox>
                      <CustomCheckBox
                        withBorder
                        onChange={() => {
                          handleChange(index)
                        }}
                        isCheckBoxDisabled={cancellationRequested}
                        checked={selectedRooms?.[index]}
                      />
                      <Typography variant={isMobile ? "m-body-l" : "body-l"}>
                        {`Room ${room?.roomNumber}`}
                      </Typography>
                    </ItemsCenterBox>
                  </RoomSelectionBarBox>
                  <RoomDetailsBox>
                    <Stack flexDirection={isMobile ? "row" : "inherit"}>
                      <RoomImageBox loading="lazy" component={"img"} src={urlFor(room?.modifyBooking?.roomImgUrl || room?.roomImgUrl)?.url()} />
                      {isMobile && (
                        <BoldTypography variant="m-body-l">
                          {room?.modifyBooking?.roomName || room?.roomName}
                        </BoldTypography>
                      )}
                    </Stack>
                    <Stack sx={{ width: "100%" }}>
                      {!isMobile && (
                        <BoldTypography variant="body-l">
                          {room?.modifyBooking?.roomName || room?.roomName}
                        </BoldTypography>
                      )}
                      <Stack
                        sx={{
                          gap: isMobile ? "3.125vw" : "6.67vw",
                          mt: isMobile ? "3.125vw" : "1.042vw",
                          flexDirection: isMobile ? "inherit" : "row",
                        }}>
                        <Stack
                          marginTop={isMobile ? MobilePxToVw(20) : 0}
                          gap={isMobile ? MobilePxToVw(5) : DesktopPxToVw(5)}>
                          <BoldTypography variant={isMobile ? "m-body-xs" : "body-xs"}>
                            {data?.currentDates}
                          </BoldTypography>
                          <DateStack>
                            <Typography variant={isMobile ? "m-body-m" : "body-l"}>
                              {formatDateWithMON(room?.modifyBooking?.checkIn || room?.checkIn)}
                            </Typography>
                            <DateDivider />
                            <Typography variant={isMobile ? "m-body-m" : "body-l"}>
                              {formatDateWithMON(room?.modifyBooking?.checkOut || room?.checkOut)}
                            </Typography>
                          </DateStack>
                        </Stack>
                        <Stack marginTop="0.208vw">
                          <BoldTypography
                            variant={isMobile ? "m-body-xs" : "body-xs"}
                            sx={{ lineHeight: "150%" }}>
                            {data?.guests}
                          </BoldTypography>
                          <Stack flexDirection={'row'}>
                            <Typography variant={isMobile ? "m-body-m" : "body-l"}>
                              {Pluralize(
                                "Adult",
                                room?.modifyBooking?.adult || room?.adult,
                                false
                              )}
                            </Typography>
                            {room?.modifyBooking?.children > 0 ||
                              (room?.children > 0 && (
                                <Typography
                                  variant={isMobile ? "m-body-m" : "body-l"}>
                                  ,
                                  {room?.modifyBooking?.children > 1 ||
                                    room?.children > 1
                                    ? `${room?.modifyBooking?.children ||
                                    room?.children
                                    } children`
                                    : `${room?.modifyBooking?.children ||
                                    room?.children
                                    } child`}
                                </Typography>
                              ))}
                          </Stack>
                        </Stack>
                      </Stack>
                      <BoldTypography
                        variant={isMobile ? "m-body-xs" : "body-xs"}
                        sx={{ marginTop: isMobile ? "3.125vw" : "0.521vw" }}>
                        {data?.package}
                      </BoldTypography>
                      <PackageNameStack>
                        <Typography variant={isMobile ? "m-body-m" : "body-m"}>
                          {room?.modifyBooking?.packageName || room?.packageName}
                        </Typography>
                        <Typography variant={isMobile ? "m-body-l" : "body-ml"} whiteSpace={"nowrap"}>
                          {currencyPrettier(
                            isComplementary ? complementaryBasePrice : room?.modifyBooking?.price || room?.price,
                            room?.currency
                          )}
                        </Typography>
                      </PackageNameStack>
                      {
                        !isMobile && <BoldTypography
                          variant={isMobile ? "m-body-xs" : "body-xs"}
                          sx={{ marginTop: isMobile ? "3.125vw" : "0.313vw" }}>
                          {data?.cancelPolicy}
                        </BoldTypography>
                      }
                      <CancelPolicyMainStack>
                        {
                          !isMobile && <CancelPolicyTypography variant={isMobile ? "m-body-m" : "body-m"}>
                            {room?.modifyBooking?.cancelPolicyDescription ||
                              room?.cancelPolicyDescription}
                          </CancelPolicyTypography>
                        }
                        {cancellationRequested && getCancelledRoomData(room?.roomNumber) && (
                          <CancelPolicyStack>
                            <Divider />
                            {getCancelledRoomData(room?.roomNumber)?.penaltyAmount >= 0 && (
                              <DynamicStack>
                                <RefundAmountLabelTypography
                                  variant={isMobile ? "m-body-s" : "body-s"}>
                                  {data?.CANCELLATION_FEES}
                                </RefundAmountLabelTypography>
                                <PayableAmountTypography
                                  variant={isMobile ? "m-body-ml" : "body-ml"}
                                  sx={{ textAlign: "end" }}>
                                  {currency2DecimalSymbol(
                                    getCancelledRoomData(room?.roomNumber)?.penaltyAmount,
                                    getCancelledRoomData(room?.roomNumber)?.currency
                                  )}
                                </PayableAmountTypography>
                              </DynamicStack>
                            )}
                            <DynamicStack>
                              <RefundAmountLabelTypography variant={isMobile ? "m-body-s" : "body-s"}>
                                {getCancelledRoomData(room?.roomNumber)?.cancelPayableAmount > 0
                                  ? data?.PAYABLE_AMOUNT
                                  : data?.REFUNDABLE_AMOUNT}
                              </RefundAmountLabelTypography>
                              <PayableAmountTypography
                                variant={isMobile ? "m-body-ml" : "body-ml"}
                                sx={{ textAlign: "end" }}>
                                {currency2DecimalSymbol(
                                  getCancelledRoomData(room?.roomNumber)?.cancelPayableAmount > 0
                                    ? getCancelledRoomData(room?.roomNumber)?.cancelPayableAmount
                                    : getCancelledRoomData(room?.roomNumber)
                                      ?.cancelRefundableAmount || 0,
                                  getCancelledRoomData(room?.roomNumber)?.currency
                                )}
                              </PayableAmountTypography>
                            </DynamicStack>
                          </CancelPolicyStack>
                        )}
                      </CancelPolicyMainStack>
                      {
                        isMobile &&
                        <Stack flexDirection={"column"} gap={MobilePxToVw(5)}>
                          <BoldTypography
                            variant={isMobile ? "m-body-xs" : "body-xs"}
                            sx={{ marginTop: isMobile ? 0 : "0.313vw" }}>
                            {data?.cancelPolicy}
                          </BoldTypography>
                          <CancelPolicyTypography variant={isMobile ? "m-body-m" : "body-m"}>
                            {room?.modifyBooking?.cancelPolicyDescription ||
                              room?.cancelPolicyDescription}
                          </CancelPolicyTypography>
                        </Stack>
                      }
                    </Stack>
                  </RoomDetailsBox>
                </>
              )}
            </Fragment>
          ))}
    </Box>
  )
}

export default observer(RoomDetailsCard)
