import React, { useState } from "react"
import { Box, Collapse, Divider, Grid, Stack, Typography } from "@mui/material"
import data from "./price-update.json"
import { theme } from "../../../../lib/theme"
import { PathType } from "../../../types"
import { ChangesDates, MainBox, PriceTypography, StyledDivider, StyledRow } from "./price-change-chart.styles"
import { formatDateWithMON } from "../../../../utils/getDate"
import {
  currency2DecimalSymbol,
  formatCurrency,
  formatCurrencyWithMinus,
  formatCurrencyWithPlus,
} from "../../../../utils/currency"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { CONSTANTS, ICONS } from "../../../constants"
import { BoldLabelTypography } from "./styles/hotel-room-details"
import { BOOKING_CONSTANT } from "../../../../features/booking/constants"
import { DescriptionBox } from "../change-rooms/price-change-chart.styles"
import { TaxLabelStack } from "../../../../features/booking/ui/styles/BookingConfirmedRoomDetails"
import RenderListItems from "../../../../features/booking/ui/renderListItems.component"

interface PriceChangeChartInterface {
  primaryAction: {
    urlType: any
    checkBox: PathType | undefined
    title: string
    url: string
    variant: string
  }
  secondaryAction: {
    urlType: any
    checkBox: PathType | undefined
    title: string
    url: string
    variant: string
  }
  parameterMap: any
  orderDetails: any
  roomsNewPrice: any
  isComplementary: any
  complementaryBasePrice: any
}
const PriceChangeChart = ({
  orderDetails,
  roomsNewPrice,
  isComplementary,
  complementaryBasePrice,
}: PriceChangeChartInterface) => {
  const isMobile = useMobileCheck()
  const modifiedRooms = orderDetails?.items?.[0]?.hotel?.[0]?.room
  const hotelLevelDetails = orderDetails?.items?.[0]?.hotel?.[0]
  const isPayAtHotel = orderDetails?.paymentMethod?.toLowerCase() === data?.payAtHotel?.toLowerCase()
  const modifiedPaymentDetails = orderDetails?.modifiedPaymentDetails
  const roomsModified = roomsNewPrice?.map((room: any) => room?.roomNumber)
  const currencyCode = modifiedRooms?.[0]?.currency
  const totalPriceChange = orderDetails?.totalPriceChange
  const totalPriceChangeWithTaxes = orderDetails?.totalPriceChange + orderDetails?.totalTaxChange
  const totalCancelPayableAmount = modifiedRooms?.reduce((accumulator: any, currentValue: any) => {
    return accumulator + Number.parseInt(currentValue?.cancelPayableAmount || 0)
  }, 0)
  const [showPrice, setShowPrice] = useState<boolean>(false)
  const [showOriginalPrice, setShowOriginalPrice] = useState<boolean>(false)
  const [showCharges, setShowCharges] = useState<boolean>(false)
  return (
    <Grid>
      <MainBox>
        <Typography variant={isMobile ? "m-body-sl" : "body-ml"} sx={{ fontWeight: 700 }}>
          {data?.title}
        </Typography>
        {modifiedRooms?.map((room: any) => (
          <>
            {roomsModified?.includes(room?.roomNumber) && (
              <ChangesDates>
                <Stack flexDirection={isMobile ? "column" : "row"} rowGap={MobilePxToVw(15)}>
                  <Typography
                    variant={
                      isMobile ? "m-body-l" : "body-l"
                    }>{`${data?.roomDates} ${room?.modifyBooking?.roomNumber} :`}</Typography>
                  <Stack flexDirection={"row"} columnGap={isMobile ? MobilePxToVw(20) : DesktopPxToVw(20)}>
                    <Typography
                      whiteSpace={"nowrap"}
                      variant={isMobile ? "m-body-l" : "body-l"}
                      sx={{ margin: isMobile ? 0 : "0vw 1vw 0vw 2vw" }}>
                      {formatDateWithMON(room?.modifyBooking?.checkIn)}
                    </Typography>
                    <StyledDivider
                      sx={{
                        borderBottomColor: theme.palette.ihclPalette.hexTwelve,
                      }}
                    />
                    <Typography whiteSpace={"nowrap"} variant={isMobile ? "m-body-l" : "body-l"}>
                      {formatDateWithMON(room?.modifyBooking?.checkOut)}
                    </Typography>
                  </Stack>
                </Stack>
                <Typography
                  whiteSpace={"nowrap"}
                  variant={isMobile ? "m-body-l" : "body-l"}
                  sx={{
                    fontWeight: 700,
                    position: "relative",
                    float: "right",
                  }}>
                  {/* {currency2DecimalSymbol(isComplementary ? complementaryBasePrice : room?.changePrice, currencyCode)} */}
                  {isComplementary
                    ? currency2DecimalSymbol(complementaryBasePrice, currencyCode)
                    : room?.changePrice >= 0
                    ? room?.changePrice > 0
                      ? formatCurrencyWithPlus(room?.changePrice, currencyCode)
                      : currency2DecimalSymbol(room?.changePrice, currencyCode)
                    : formatCurrencyWithMinus(room?.changePrice, currencyCode)}
                </Typography>
              </ChangesDates>
            )}
          </>
        ))}
        {(totalPriceChange || totalPriceChange <= 0) && (
          <StyledRow>
            <BoldLabelTypography variant={isMobile ? "m-body-l" : "body-l"}>
              {CONSTANTS?.TOTAL_PRICE_CHANGE}
            </BoldLabelTypography>
            <BoldLabelTypography variant={isMobile ? "m-body-l" : "body-l"}>
              {isComplementary
                ? currency2DecimalSymbol(complementaryBasePrice, currencyCode)
                : totalPriceChange >= 0
                ? totalPriceChange > 0
                  ? formatCurrencyWithPlus(totalPriceChange, currencyCode)
                  : currency2DecimalSymbol(totalPriceChange, currencyCode)
                : formatCurrencyWithMinus(totalPriceChange, currencyCode)}
            </BoldLabelTypography>
          </StyledRow>
        )}
        <Divider color={theme?.palette?.ihclPalette?.hexTwelve} />
        <Box pt={isMobile ? MobilePxToVw(20) : DesktopPxToVw(20)}>
          {orderDetails?.totalPrice >= 0 && (
            <StyledRow>
              <TaxLabelStack onClick={() => setShowOriginalPrice(!showOriginalPrice)} sx={{ cursor: "pointer" }}>
                <Typography aria-label="Price" variant={isMobile ? "m-body-l" : "body-l"}>
                  {BOOKING_CONSTANT?.ORIGINAL_PRICE}
                </Typography>
                <Box
                  component="img"
                  alt={"key-arrow-down"}
                  src={ICONS?.KEY_ARROW_DOWN}
                  sx={{
                    transform: showOriginalPrice ? "rotate(0deg)" : "rotate(180deg)",
                  }}
                />
              </TaxLabelStack>
              <Typography variant={isMobile ? "m-body-l" : "body-l"}>
                {currency2DecimalSymbol(isComplementary ? 0 : orderDetails?.totalPrice, currencyCode)}
              </Typography>
            </StyledRow>
          )}
          <Collapse
            in={showOriginalPrice}
            sx={{
              paddingBottom: showOriginalPrice ? "0.86vw" : "0vw",
            }}>
            <Stack rowGap={DesktopPxToVw(6)}>
              <Typography fontWeight={700} variant={isMobile ? "m-body-m" : "body-m"}>
                {BOOKING_CONSTANT?.PRICE}
              </Typography>
              <RenderListItems
                rooms={modifiedRooms}
                isModified={false}
                labelName={""}
                labelKey={isComplementary ? "" : "amount"}
                currencyCode={currencyCode}
              />
              <Typography fontWeight={700} variant={isMobile ? "m-body-m" : "body-m"}>
                {BOOKING_CONSTANT?.TAX_AND_FEES}
              </Typography>
              <RenderListItems
                isModified={false}
                rooms={modifiedRooms}
                labelName={""}
                labelKey={"tax"}
                currencyCode={currencyCode}
              />
            </Stack>
          </Collapse>
          <Divider />
          {hotelLevelDetails?.grandTotal >= 0 && (
            <>
              <StyledRow>
                <TaxLabelStack onClick={() => setShowPrice(!showPrice)} sx={{ cursor: "pointer" }}>
                  <Typography aria-label="Price" variant={isMobile ? "m-body-l" : "body-l"}>
                    {BOOKING_CONSTANT?.NEW_PRICE}
                  </Typography>
                  <Box
                    component="img"
                    alt={"key-arrow-down"}
                    src={ICONS?.KEY_ARROW_DOWN}
                    sx={{
                      transform: showPrice ? "rotate(0deg)" : "rotate(180deg)",
                    }}
                  />
                </TaxLabelStack>
                <Typography variant={isMobile ? "m-body-l" : "body-l"}>
                  {currency2DecimalSymbol(isComplementary ? 0 : hotelLevelDetails?.grandTotal || 0, currencyCode)}
                </Typography>
              </StyledRow>
              <Collapse
                in={showPrice}
                sx={{
                  paddingBottom: showPrice ? "0.86vw" : "0vw",
                }}>
                <Stack rowGap={DesktopPxToVw(6)}>
                  <Typography fontWeight={700} variant={isMobile ? "m-body-m" : "body-m"}>
                    {BOOKING_CONSTANT?.PRICE}
                  </Typography>
                  <RenderListItems
                    rooms={modifiedRooms}
                    isModified={true}
                    labelName={""}
                    labelKey={isComplementary ? "" : "amount"}
                    currencyCode={currencyCode}
                  />
                  <>
                    <Typography fontWeight={700} variant={isMobile ? "m-body-m" : "body-m"}>
                      {BOOKING_CONSTANT?.TAX_AND_FEES}
                    </Typography>
                    <RenderListItems
                      isModified={true}
                      rooms={modifiedRooms}
                      labelName={""}
                      labelKey={"tax"}
                      currencyCode={currencyCode}
                    />
                  </>
                </Stack>
              </Collapse>
              <Divider />
            </>
          )}
          <StyledRow>
            <PriceTypography $isGreen={totalPriceChangeWithTaxes >= 0} variant={isMobile ? "m-body-l" : "body-l"}>
              {isPayAtHotel ? BOOKING_CONSTANT?.DIFFERENCE : data?.priceChangeWithTaxes}
            </PriceTypography>
            <PriceTypography
              whiteSpace={"nowrap"}
              $isGreen={totalPriceChangeWithTaxes >= 0}
              variant={isMobile ? "m-body-l" : "body-l"}>
              {isComplementary
                ? currency2DecimalSymbol(complementaryBasePrice, currencyCode)
                : totalPriceChangeWithTaxes >= 0
                ? totalPriceChangeWithTaxes > 0
                  ? formatCurrencyWithPlus(totalPriceChangeWithTaxes, currencyCode)
                  : currency2DecimalSymbol(totalPriceChangeWithTaxes, currencyCode)
                : formatCurrencyWithMinus(totalPriceChangeWithTaxes, currencyCode)}
            </PriceTypography>
          </StyledRow>
          <Divider />
          <StyledRow>
            <Box
              onClick={() => totalCancelPayableAmount !== 0 && setShowCharges(!showCharges)}
              sx={{ cursor: "pointer" }}>
              <Typography variant={isMobile ? "m-body-l" : "body-l"}>
                {BOOKING_CONSTANT?.CANCELLATION_CHARGES}
              </Typography>
              {totalCancelPayableAmount !== 0 && (
                <Box
                  component={"img"}
                  src={ICONS?.DOWN_ARROW}
                  height={"0.373vw"}
                  width={"0.613vw"}
                  alt="down arrow img"
                  sx={{
                    marginLeft: "0.6vw",
                    transform: showCharges ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              )}
            </Box>
            <Typography variant={isMobile ? "m-body-l" : "body-l"}>
              {totalCancelPayableAmount === 0
                ? "NIL"
                : currency2DecimalSymbol(totalCancelPayableAmount || 0, currencyCode)}
            </Typography>
          </StyledRow>
          <Divider />
          <Collapse in={showCharges}>
            {modifiedRooms?.map((room: any, index: number) => (
              <>
                <StyledRow key={index}>
                  <Typography variant={isMobile ? "m-body-l" : "body-l"}>{`Room ${room?.roomNumber}`}</Typography>
                  <Typography variant={isMobile ? "m-body-l" : "body-ml"}>
                    {room?.cancelPayableAmount === 0
                      ? "NIL"
                      : currency2DecimalSymbol(room?.cancelPayableAmount, currencyCode)}
                  </Typography>
                </StyledRow>
                <Divider />
              </>
            ))}
          </Collapse>
          {hotelLevelDetails?.grandTotal >= 0 && !isPayAtHotel && (
            <>
              <StyledRow>
                <Typography variant={isMobile ? "m-body-l" : "body-l"}>{data?.paidPreviously}</Typography>
                <Typography variant={isMobile ? "m-body-l" : "body-l"}>
                  {currency2DecimalSymbol(hotelLevelDetails?.amountPaid, currencyCode)}
                </Typography>
              </StyledRow>
              <Divider />
            </>
          )}
          <StyledRow columnGap={isMobile ? MobilePxToVw(10) : "unset"}>
            {isPayAtHotel ? (
              <>
                <Typography variant={isMobile ? "m-body-l" : "body-l"} sx={{ lineHeight: "140%", fontWeight: 700 }}>
                  {isPayAtHotel ? BOOKING_CONSTANT?.PAYABLE_AMOUNT : data?.newTotalPrice}
                </Typography>
                <Typography
                  variant={isMobile ? "m-body-xl" : "body-xl"}
                  whiteSpace={"nowrap"}
                  sx={{ lineHeight: "140%", fontWeight: 700 }}>
                  {currency2DecimalSymbol(orderDetails?.modifiedPayableAmount || 0, currencyCode)}
                </Typography>
              </>
            ) : (
              <>
                <Typography variant={isMobile ? "m-body-l" : "body-l"} sx={{ lineHeight: "140%", fontWeight: 700 }}>
                  {totalPriceChange >= 0 ? BOOKING_CONSTANT?.PAYABLE_AMOUNT : data?.refundableAmount}
                </Typography>
                <Typography
                  variant={isMobile ? "m-body-xl" : "body-xl"}
                  whiteSpace={"nowrap"}
                  sx={{ lineHeight: "140%", fontWeight: 700 }}>
                  {currency2DecimalSymbol(
                    totalPriceChange >= 0
                      ? orderDetails?.modifiedPayableAmount || totalPriceChange
                      : orderDetails?.refundableAmount || totalPriceChange,
                    currencyCode,
                  )}
                </Typography>
              </>
            )}
          </StyledRow>
        </Box>
        <Divider
          sx={{
            borderBottom: `2px solid ${theme?.palette?.ihclPalette?.hexFour}`,
          }}
        />
        <DescriptionBox>
          <Typography variant={isMobile ? "m-body-l" : "body-l"} sx={{ lineHeight: "140%" }}>
            {isPayAtHotel
              ? BOOKING_CONSTANT?.PAYABLE_DESCRIPTION
              : totalPriceChange >= 0
              ? BOOKING_CONSTANT?.PAYABLE_DESCRIPTION
              : BOOKING_CONSTANT?.REFUND_DESCRIPTION}
          </Typography>
        </DescriptionBox>
      </MainBox>
    </Grid>
  )
}

export default PriceChangeChart
