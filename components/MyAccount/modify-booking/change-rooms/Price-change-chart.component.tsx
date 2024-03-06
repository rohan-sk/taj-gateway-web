import React, { useState, useContext } from "react"
import dynamic from "next/dynamic"
import data from "./price-update.json"
import { useRouter } from "next/router"
import { ICONS } from "../../../constants"
import { theme } from "../../../../lib/theme"
import { ROUTES } from "../../../../utils/routes"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { BOOKING_CONSTANT } from "../../../../features/booking/constants"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { Box, Button, Collapse, Divider, Grid, Stack, Typography } from "@mui/material"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { DescriptionBox, MainBox, PriceTypography, StyledRow } from "./price-change-chart.styles"
import { TaxLabelStack } from "../../../../features/booking/ui/styles/BookingConfirmedRoomDetails"
import BookingFlowGlobalStore from "../../../../features/booking/store/globalStore/booking.flow.store"
import { currency2DecimalSymbol, formatCurrencyWithMinus, formatCurrencyWithPlus } from "../../../../utils/currency"
import { handler as ModifyBookingOrder } from "../../../../features/booking/api/handlers/modify-booking-order.service"

const LoadingSpinner = dynamic(() => import("../../../../utils/SpinnerComponent"))
const RenderListItems = dynamic(() => import("../../../../features/booking/ui/renderListItems.component"))

const PriceChangeChart = (props: any) => {
  const router = useRouter()
  const isMobile = useMobileCheck()
  const orderId = router?.query?.order_id
  const context: any = useContext(IHCLContext)

  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES.bookingFlowStore) as BookingFlowGlobalStore

  const { loading, setLoading, modifiedRoomsDetails } = bookingFlowGlobalStore

  const modifiedSummary: any = modifiedRoomsDetails?.data
  const hotelLevelDetails: any = modifiedSummary?.items?.[0]?.hotel?.[0]
  const currencyCode = modifiedSummary?.items?.[0]?.hotel?.[0]?.room?.[0]?.currency
  const isPayAtHotel = modifiedSummary?.paymentMethod?.toLowerCase() === data?.payAtHotel?.toLowerCase()

  const originalPrice = currency2DecimalSymbol(modifiedSummary?.totalPrice, currencyCode)
  const newPrice = currency2DecimalSymbol(hotelLevelDetails?.grandTotal, currencyCode)
  const paidAmount = currency2DecimalSymbol(hotelLevelDetails?.amountPaid, currencyCode)
  const totalPriceChange = Number(modifiedSummary?.totalPriceChange + modifiedSummary?.totalTaxChange || 0)
  const totalCancelPayableAmount = hotelLevelDetails?.room?.reduce((accumulator: any, currentValue: any) => {
    return accumulator + Number.parseInt(currentValue?.cancelPayableAmount || 0)
  }, 0)

  const [showPrice, setShowPrice] = useState<boolean>(false)
  const [showCharges, setShowCharges] = useState<boolean>(false)
  const [showOriginalPrice, setShowOriginalPrice] = useState<boolean>(false)

  const confirmChange = async () => {
    try {
      setLoading(true)
      const { error, data } = await ModifyBookingOrder?.apiCall(orderId)
      setLoading(false)
      if (!error) {
        data?.orderId && global?.window?.sessionStorage?.setItem("bookingOrderId", data?.orderId)
        await router?.push(`${global?.window?.location?.origin}${ROUTES?.BOOKING?.MODIFY_CONFIRMED_PAGE}`)
      }
    } catch (error) {
      console.log("error at Modify Booking Order ", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loading && <LoadingSpinner />}
      <Stack
        aria-label="change-rooms-price-chart"
        p={isMobile ? `${MobilePxToVw(20)} ${MobilePxToVw(50)} ${MobilePxToVw(95)}` : 0}
        width={"100%"}
        justifyContent={"center"}
        alignItems={"center"}>
        <MainBox>
          <Box
            mt={isMobile ? MobilePxToVw(10) : DesktopPxToVw(10)}
            pt={isMobile ? MobilePxToVw(20) : DesktopPxToVw(20)}>
            <StyledRow>
              <TaxLabelStack onClick={() => setShowOriginalPrice(!showOriginalPrice)} sx={{ cursor: "pointer" }}>
                <Typography aria-label="Original Price" variant={isMobile ? "m-body-l" : "body-l"}>
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
                {props?.isComplementary ? 0 : originalPrice}
              </Typography>
            </StyledRow>
            <Collapse
              in={showOriginalPrice}
              sx={{
                textAlign: "left",
                paddingBottom: showOriginalPrice ? "0.86vw" : "0vw",
              }}>
              <Stack rowGap={DesktopPxToVw(6)}>
                <Typography fontWeight={700} variant={isMobile ? "m-body-m" : "body-m"}>
                  {BOOKING_CONSTANT?.PRICE}
                </Typography>
                <RenderListItems
                  rooms={hotelLevelDetails?.room}
                  isModified={false}
                  labelName={""}
                  labelKey={props?.isComplementary ? "" : "amount"}
                  currencyCode={currencyCode}
                />
                <Typography fontWeight={700} variant={isMobile ? "m-body-m" : "body-m"}>
                  {BOOKING_CONSTANT?.TAX_AND_FEES}
                </Typography>
                <RenderListItems
                  isModified={false}
                  rooms={hotelLevelDetails?.room}
                  labelName={""}
                  labelKey={"tax"}
                  currencyCode={currencyCode}
                />
              </Stack>
            </Collapse>
            <Divider />
            {newPrice && (
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
                    {props?.isComplementary ? 0 : newPrice}
                  </Typography>
                </StyledRow>
                <Collapse
                  in={showPrice}
                  sx={{
                    textAlign: "left",
                    paddingBottom: showPrice ? "0.86vw" : "0vw",
                  }}>
                  <Stack rowGap={DesktopPxToVw(6)}>
                    <Typography fontWeight={700} variant={isMobile ? "m-body-m" : "body-m"}>
                      {BOOKING_CONSTANT?.PRICE}
                    </Typography>
                    <RenderListItems
                      rooms={hotelLevelDetails?.room}
                      isModified={true}
                      labelName={""}
                      labelKey={props?.isComplementary ? "" : "amount"}
                      currencyCode={currencyCode}
                    />
                    <>
                      <Typography fontWeight={700} variant={isMobile ? "m-body-m" : "body-m"}>
                        {BOOKING_CONSTANT?.TAX_AND_FEES}
                      </Typography>
                      <RenderListItems
                        isModified={true}
                        rooms={hotelLevelDetails?.room}
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
              <Grid container>
                <Grid item xs={6} sm={6}>
                  <Box sx={{ textAlign: "start" }}>
                    <PriceTypography
                      variant={isMobile ? "m-body-l" : "body-l"}
                      color={
                        totalPriceChange >= 0 ? theme.palette.neuPalette.hexTwentyFour : theme.palette.neuPalette.hexTwo
                      }>
                      {isPayAtHotel ? BOOKING_CONSTANT?.DIFFERENCE : BOOKING_CONSTANT?.TOTAL_PRICE_CHANGE}
                    </PriceTypography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Box sx={{ textAlign: "end" }}>
                    <PriceTypography
                      variant={isMobile ? "m-body-l" : "body-l"}
                      color={
                        totalPriceChange >= 0 ? theme.palette.neuPalette.hexTwentyFour : theme.palette.neuPalette.hexTwo
                      }>
                      {totalPriceChange >= 0
                        ? totalPriceChange > 0
                          ? formatCurrencyWithPlus(totalPriceChange, currencyCode)
                          : currency2DecimalSymbol(totalPriceChange, currencyCode)
                        : formatCurrencyWithMinus(totalPriceChange, currencyCode)}
                    </PriceTypography>
                  </Box>
                </Grid>
              </Grid>
            </StyledRow>
            <Divider />
            {!isPayAtHotel && paidAmount && (
              <>
                <StyledRow>
                  <Typography variant={isMobile ? "m-body-l" : "body-l"}>
                    {BOOKING_CONSTANT?.AMOUNT_PAID_PREVIOUSLY}
                  </Typography>
                  <Typography variant={isMobile ? "m-body-l" : "body-l"}>{paidAmount}</Typography>
                </StyledRow>
                <Divider />
              </>
            )}
            <Divider />
            <StyledRow>
              <Stack
                flexDirection={"row"}
                onClick={() => totalCancelPayableAmount !== 0 && setShowCharges(!showCharges)}
                alignItems={"center"}
                sx={{ cursor: "pointer" }}>
                <Typography variant={isMobile ? "m-body-l" : "body-l"}>
                  {BOOKING_CONSTANT?.CANCELLATION_CHARGES}
                </Typography>
                {totalCancelPayableAmount !== 0 && (
                  <Box
                    key={`img-${isMobile}`}
                    component={"img"}
                    src={ICONS?.DOWN_ARROW}
                    width={isMobile ? MobilePxToVw(10) : "0.613vw"}
                    alt={"arrow-img"}
                    sx={{
                      marginLeft: isMobile ? MobilePxToVw(8) : "0.6vw",
                      transform: showCharges ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                )}
              </Stack>
              <Typography variant={isMobile ? "m-body-l" : "body-l"}>
                {totalCancelPayableAmount === 0
                  ? "NIL"
                  : currency2DecimalSymbol(totalCancelPayableAmount || 0, currencyCode)}
              </Typography>
            </StyledRow>
            <Divider />
            <Collapse in={showCharges}>
              {hotelLevelDetails?.room?.map((room: any, index: number) => (
                <>
                  <StyledRow key={index}>
                    <Typography variant={isMobile ? "m-body-l" : "body-l"}>{`Room ${room?.roomNumber}`}</Typography>
                    <Typography variant={isMobile ? "m-body-l" : "body-l"}>
                      {room?.cancelPayableAmount === 0
                        ? "NIL"
                        : currency2DecimalSymbol(room?.cancelPayableAmount, currencyCode)}
                    </Typography>
                  </StyledRow>
                  <Divider />
                </>
              ))}
            </Collapse>
            <StyledRow textAlign={"left"}>
              <Typography variant={isMobile ? "m-body-l" : "body-l"} sx={{ lineHeight: "140%", fontWeight: 700 }}>
                {isPayAtHotel
                  ? BOOKING_CONSTANT?.REVISED_TOTAL_PRICE
                  : modifiedSummary?.modifiedPayableAmount
                    ? BOOKING_CONSTANT.PAYABLE_AMOUNT
                    : BOOKING_CONSTANT.REFUNDABLE_AMOUNT}
              </Typography>
              <Typography
                variant={isMobile ? "m-body-xl" : "body-xl"}
                sx={{
                  lineHeight: "140%",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                }}>
                {currency2DecimalSymbol(
                  isPayAtHotel
                    ? modifiedSummary?.modifiedPayableAmount || 0
                    : modifiedSummary?.modifiedPayableAmount
                      ? modifiedSummary?.modifiedPayableAmount || 0
                      : modifiedSummary?.refundableAmount || 0,
                  currencyCode,
                )}
              </Typography>
            </StyledRow>
          </Box>
          <Divider
            sx={{
              borderBottom: `2px solid ${theme?.palette?.neuPalette?.hexFour}`,
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
        <Button
          sx={{
            margin: `${DesktopPxToVw(60)} auto ${DesktopPxToVw(110)}`,
          }}
          variant="light-contained"
          onClick={confirmChange}>
          {BOOKING_CONSTANT?.CONTINUE_WITH_PAY_AT_HOTEL}
        </Button>
      </Stack>
    </>
  )
}

export default PriceChangeChart
