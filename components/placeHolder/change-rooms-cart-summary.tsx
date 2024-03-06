import React, { useContext, useState, useRef, useEffect } from "react"
import { theme } from "../../lib/theme"
import { observer } from "mobx-react-lite"
import { CONSTANTS, ICONS } from "../constants"
import { useMobileCheck } from "../../utils/isMobilView"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Cart from "../BookingFlow/Json/cart.summary.card.json"
import { GLOBAL_STORES, PAGE_STORES } from "../../utils/Constants"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import BookingsFlowStore from "../../features/booking/store/pageStore/booking.store"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import BookingFlowGlobalStore from "../../features/booking/store/globalStore/booking.flow.store"
import { currency2DecimalSymbol, formatCurrencyWithMinus, formatCurrencyWithPlus } from "../../utils/currency"
import {
  Box,
  Stack,
  Button,
  Divider,
  Accordion,
  Typography,
  AccordionDetails,
  AccordionSummary,
  Collapse,
} from "@mui/material"
import {
  MainBox,
  FlexBox,
  BoldTypo,
  TaxLabelBox,
  StyledDivider,
  PriceDetailsBox,
  SelectedRoomTypography,
  BlockTypography,
} from "../BookingFlow/styles/cart-summary-card"
import { RowStack } from "../MyAccount/my-account.styles"
import { BOOKING_CONSTANT } from "../../features/booking/constants"
import RenderListItems from "../../features/booking/ui/renderListItems.component"
import { TaxLabelStack } from "../../features/booking/ui/styles/BookingConfirmedRoomDetails"
import Pluralize from "../../utils/pluralize"

const CartSummaryCard = () => {
  const listRef = useRef<any>(null)
  const isMobile = useMobileCheck()
  const confirmRef = useRef<any>(null)
  const pageContext = useContext(PageContext)
  const context: any = useContext(IHCLContext)

  const BookingFlowPageStore = pageContext?.getPageStore(PAGE_STORES?.bookingFlowStore) as BookingsFlowStore
  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore
  const { currentStepper, updateCurrentStepper } = BookingFlowPageStore
  const { countryCurrencyCode, modifiedRoomsDetails, selectedRoomsDetails, stepperDetails, updateStepperDetails } =
    bookingFlowGlobalStore

  const [sidebarWidth] = useState<any>(undefined)
  const [showNewTax, setShowNewTax] = useState<boolean>(false)
  const [showOldTax, setShowOldTax] = useState<boolean>(false)
  const [isExpanded, setIsExpanded] = useState<boolean[]>(
    Array.from({ length: stepperDetails?.data?.length }, () => true),
  )
  const isNotConfirm = currentStepper?.stepName !== CONSTANTS?.CONFIRM
  const modifiedDetails: any = modifiedRoomsDetails?.data?.items?.[0]?.hotel?.[0]
  const isPayAtHotel = modifiedRoomsDetails?.data?.paymentMethod?.toLowerCase() === Cart?.payAtHotel?.toLowerCase()
  const isAllRoomsSelected = stepperDetails?.data?.every((item: any) => item?.modified === true)
  const selectedRoomNumbers = selectedRoomsDetails?.map((room: any) => room?.roomNumber)
  const modifyingRoomDetails = modifiedDetails?.room?.filter((room: any) =>
    selectedRoomNumbers?.includes(room?.roomNumber),
  )
  const modifiedRoomDetails = (id: number) => {
    return modifiedDetails?.room?.filter((item: any) => item?.roomNumber === id)?.[0]
  }
  const currencyCode = selectedRoomsDetails?.[0]?.currency

  const confirmChange = async () => {
    updateCurrentStepper({ stepName: "CONFIRM" })
    const isSelectedRooms = stepperDetails?.data?.map((item: any) => {
      return { ...item, isSelected: false }
    })
    updateStepperDetails({ data: isSelectedRooms })
  }
  const oldPrice = currency2DecimalSymbol(
    selectedRoomsDetails?.reduce((accumulator: any, currentValue: any) => {
      return accumulator + Number.parseInt(currentValue?.modifyBooking?.price || currentValue?.price)
    }, 0),
    currencyCode,
  )
  const totalOldTax = currency2DecimalSymbol(
    selectedRoomsDetails?.reduce((accumulator: any, currentValue: any) => {
      return accumulator + Number.parseInt(currentValue?.modifyBooking?.tax?.amount || currentValue?.tax?.amount)
    }, 0),
    currencyCode,
  )
  const oldTotalPrice = currency2DecimalSymbol(
    selectedRoomsDetails?.reduce((accumulator: any, currentValue: any) => {
      return accumulator + Number.parseInt(currentValue?.modifyBooking?.grandTotal || currentValue?.grandTotal)
    }, 0),
    currencyCode,
  )
  const newPrice = currency2DecimalSymbol(
    modifiedRoomsDetails?.data?.modifiedPaymentDetails?.modifiedBasePrice,
    currencyCode,
  )
  const totalNewTax = currency2DecimalSymbol(
    modifiedRoomsDetails?.data?.modifiedPaymentDetails?.modifiedTax,
    currencyCode,
  )
  const totalPriceChange = Number(modifiedRoomsDetails?.data?.totalPriceChange || 0)

  const handleChange = (index: number) => {
    if (isExpanded?.[index]) {
      isExpanded[index] = false
      setIsExpanded([...isExpanded])
    } else {
      isExpanded[index] = true
      setIsExpanded([...isExpanded])
    }
  }

  useEffect(() => {
    const boxStyle = listRef.current.style
    if (isAllRoomsSelected && confirmRef?.current) {
      boxStyle.position = "absolute" // Change to your desired position value
      boxStyle.top = "0px" // Change to your desired position value
      confirmRef.current.scrollIntoView({
        block: "end",
        inline: "center",
        behavior: "smooth",
      })
    } else {
      boxStyle.position = "sticky" // Change to your desired position value
      boxStyle.top = DesktopPxToVw(106)
    }
  }, [modifiedDetails, isAllRoomsSelected])

  return (
    <Box sx={{ position: "relative", height: "100%" }} aria-label="CartSummaryCard">
      <MainBox
        ref={listRef}
        className="stickyCart"
        style={{ width: sidebarWidth }}
        sx={{
          m: isNotConfirm ? "8vw 0" : "0vw",
          border: `0.052vw solid ${theme?.palette?.neuPalette?.hexTwo}`,
        }}>
        <Typography variant={isMobile ? "m-heading-xs" : "heading-xs"} sx={{ padding: "1.04vw" }}>
          {Cart?.title}
        </Typography>
        <StyledDivider />
        {stepperDetails?.data?.map((item: any, index: number) => (
          <Box key={index} sx={{ position: "relative" }}>
            {/* {item?.isSelected && isNotConfirm && <StyledLeftArrow />} */}
            <Accordion
              onChange={() => handleChange(index)}
              elevation={0}
              expanded={isExpanded?.[index]}
              disableGutters={true}
              style={{
                padding: "1.04vw",
                borderRadius: "0vw",
                backgroundColor: "transparent",
                border: item?.isSelected && isNotConfirm ? `0.15vw solid ${theme?.palette?.neuPalette?.hexTwo}` : "",
              }}
              sx={{
                "& .MuiAccordionSummary-root": {
                  alignItems: "start",
                },
              }}>
              <>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon style={{ fontSize: "20px" }} />}
                  style={{
                    padding: "0px",
                    cursor: "default",
                    minHeight: "fit-content",
                  }}
                  sx={{ "& .MuiAccordionSummary-content": { margin: "0px" } }}>
                  <Stack rowGap={DesktopPxToVw(8)}>
                    <BoldTypo
                      whiteSpace={"nowrap"}
                      variant={isMobile ? "m-body-s" : "body-s"}>
                      {`Room ${item?.id}: ${Pluralize(CONSTANTS?.ADULT, item?.adults, false)}${item?.child >= 1
                        ? `, ${Pluralize(CONSTANTS?.CHILD, item?.child, false)}` : ""}`}
                    </BoldTypo>
                    {/* new selected room */}
                    {!isExpanded?.[index] && (
                      <>
                        <BoldTypo variant={isMobile ? "m-body-s" : "body-s"}>{CONSTANTS?.NEW_SELECTED_ROOM}</BoldTypo>
                        <SelectedRoomTypography variant={isMobile ? "m-body-s" : "body-s"}>
                          {item?.modified ? modifiedRoomDetails(item?.id)?.modifyBooking?.roomName : "Not Selected"}
                        </SelectedRoomTypography>
                      </>
                    )}
                  </Stack>
                </AccordionSummary>
              </>
              {selectedRoomsDetails?.map((room: any, childIndex: number) => (
                <AccordionDetails
                  key={childIndex}
                  sx={{
                    padding: "0vw",
                    marginTop: isNotConfirm ? "0.520vw" : "0vw",
                  }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: isNotConfirm ? "0.416vw" : "0vw",
                    }}>
                    {room?.roomNumber === item?.id && (
                      <>
                        <BoldTypo variant={isMobile ? "m-body-s" : "body-s"}>{CONSTANTS?.CURRENT_BOOKED_ROOM}</BoldTypo>
                        <SelectedRoomTypography variant={isMobile ? "m-body-s" : "body-s"} sx={{ maxWidth: "95%" }}>
                          {room?.roomName}
                        </SelectedRoomTypography>
                        {isNotConfirm && (
                          <RowStack>
                            <SelectedRoomTypography variant={isMobile ? "m-body-s" : "body-s"}>
                              {room?.packageName}
                            </SelectedRoomTypography>
                            <SelectedRoomTypography sx={{ alignSelf: "flex-end", whiteSpace: "nowrap" }}>
                              {currency2DecimalSymbol(room?.modifyBooking?.price || room?.price, room?.currency)}
                            </SelectedRoomTypography>
                          </RowStack>
                        )}

                        {/* new selected room */}
                        <BoldTypo variant={isMobile ? "m-body-s" : "body-s"}>{CONSTANTS?.NEW_SELECTED_ROOM}</BoldTypo>
                        <SelectedRoomTypography variant={isMobile ? "m-body-s" : "body-s"} sx={{ maxWidth: "95%" }}>
                          {item?.modified ? modifiedRoomDetails(item?.id)?.modifyBooking?.roomName : "Not Selected"}
                        </SelectedRoomTypography>
                        {isNotConfirm && modifiedRoomDetails(item?.id)?.modifyBooking?.cost && (
                          <>
                            <Stack flexDirection={"row"} justifyContent={"space-between"}>
                              <SelectedRoomTypography variant={isMobile ? "m-body-s" : "body-s"}>
                                {modifiedRoomDetails(item?.id)?.modifyBooking?.packageName || ""}
                              </SelectedRoomTypography>
                              <SelectedRoomTypography
                                sx={{
                                  alignSelf: "flex-end",
                                  whiteSpace: "nowrap",
                                }}>
                                {currency2DecimalSymbol(
                                  modifiedRoomDetails(item?.id)?.modifyBooking?.cost,
                                  currencyCode,
                                )}
                              </SelectedRoomTypography>
                            </Stack>
                            {/* price change */}
                            <Stack flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
                              <Typography
                                whiteSpace={"nowrap"}
                                color={
                                  Number(modifiedRoomDetails(item?.id)?.changePrice || 0) >= 0
                                    ? theme.palette.neuPalette.hexTwentyFour
                                    : theme.palette.neuPalette.hexTwo
                                }
                                variant={isMobile ? "m-body-xs" : "body-xs"}>
                                {CONSTANTS?.PRICE_CHANGE}
                              </Typography>
                              <Typography
                                variant={isMobile ? "m-body-s" : "body-s"}
                                color={
                                  Number(modifiedRoomDetails(item?.id)?.changePrice || 0) >= 0
                                    ? theme.palette.neuPalette.hexTwentyFour
                                    : theme.palette.neuPalette.hexTwo
                                }>
                                {Number(modifiedRoomDetails(item?.id)?.changePrice || 0) >= 0
                                  ? Number(modifiedRoomDetails(item?.id)?.changePrice || 0) > 0
                                    ? formatCurrencyWithPlus(
                                        Number(modifiedRoomDetails(item?.id)?.changePrice || 0),
                                        currencyCode,
                                      )
                                    : currency2DecimalSymbol(
                                        Number(modifiedRoomDetails(item?.id)?.changePrice || 0),
                                        currencyCode,
                                      )
                                  : formatCurrencyWithMinus(
                                      Number(modifiedRoomDetails(item?.id)?.changePrice || 0),
                                      currencyCode,
                                    )}
                              </Typography>
                            </Stack>
                          </>
                        )}
                      </>
                    )}
                  </Box>
                </AccordionDetails>
              ))}
            </Accordion>
            <StyledDivider />
          </Box>
        ))}
        <PriceDetailsBox sx={{ padding: "1.04vw", rowGap: DesktopPxToVw(6) }}>
          <FlexBox>
            <Typography variant={isMobile ? "m-body-s" : "body-s"}>{Cart?.oldPriceLabel}</Typography>
            <Typography variant={isMobile ? "m-body-s" : "body-s"}>{oldPrice}</Typography>
          </FlexBox>
          {totalOldTax && (
            <>
              {currencyCode?.toUpperCase() !== "GBP" && (
                <RowStack>
                  <TaxLabelStack onClick={() => setShowOldTax(!showOldTax)} sx={{ cursor: "pointer" }}>
                    <BlockTypography variant={isMobile ? "m-body-s" : "body-s"} sx={{ textDecoration: "underline" }}>
                      {BOOKING_CONSTANT.TAX_AND_FEES}
                    </BlockTypography>
                    <Box
                      component="img"
                      alt={"key-arrow-down"}
                      src={ICONS?.KEY_ARROW_DOWN}
                      sx={{
                        transform: showOldTax ? "rotate(0deg)" : "rotate(180deg)",
                      }}
                    />
                  </TaxLabelStack>
                  <BlockTypography variant={isMobile ? "m-body-s" : "body-s"}>{totalOldTax}</BlockTypography>
                </RowStack>
              )}
              <Collapse in={showOldTax}>
                <Stack
                  flexDirection={"column"}
                  gap={isMobile ? MobilePxToVw(8) : DesktopPxToVw(10)}
                  mb={isMobile ? MobilePxToVw(20) : DesktopPxToVw(20)}>
                  <RenderListItems
                    rooms={selectedRoomsDetails}
                    labelName={`(${currencyCode === "INR" ? BOOKING_CONSTANT.GST_LABEL : currencyCode})`}
                    isModified={true}
                    labelKey={"tax"}
                    currencyCode={currencyCode}
                    isChangeRooms={true}
                  />
                </Stack>
              </Collapse>
            </>
          )}
          <FlexBox>
            <TaxLabelBox>
              <Typography variant={isMobile ? "m-body-s" : "body-s"}>{Cart?.totalPrice}</Typography>
            </TaxLabelBox>
            <Typography variant={isMobile ? "m-body-s" : "body-s"}>{oldTotalPrice}</Typography>
          </FlexBox>
          {countryCurrencyCode?.toUpperCase() === "GBP" && (
            <Typography variant="body-xs">{CONSTANTS?.INCLUSIVE_TAXES}</Typography>
          )}
          {/* new price change */}
          {modifiedDetails && (
            <PriceDetailsBox rowGap={DesktopPxToVw(5)}>
              <Box my={isMobile ? MobilePxToVw(20) : DesktopPxToVw(20)}>
                <Divider></Divider>
              </Box>
              <FlexBox>
                <Typography variant={isMobile ? "m-body-s" : "body-s"}>{Cart?.newPriceLabel}</Typography>
                <Typography variant={isMobile ? "m-body-s" : "body-s"}>{newPrice}</Typography>
              </FlexBox>
              <FlexBox>
                <Typography
                  variant={isMobile ? "m-body-s" : "body-s"}
                  color={
                    totalPriceChange >= 0 ? theme.palette.neuPalette.hexTwentyFour : theme.palette.neuPalette.hexTwo
                  }>
                  {Cart?.totalChange}
                </Typography>
                <Typography
                  variant={isMobile ? "m-body-s" : "body-s"}
                  color={
                    totalPriceChange >= 0 ? theme.palette.neuPalette.hexTwentyFour : theme.palette.neuPalette.hexTwo
                  }>
                  {totalPriceChange >= 0
                    ? totalPriceChange > 0
                      ? formatCurrencyWithPlus(totalPriceChange, currencyCode)
                      : currency2DecimalSymbol(totalPriceChange, currencyCode)
                    : formatCurrencyWithMinus(totalPriceChange, currencyCode)}
                </Typography>
              </FlexBox>
              {totalNewTax && (
                <>
                  {currencyCode?.toUpperCase() !== "GBP" && (
                    <RowStack mb={isMobile ? MobilePxToVw(20) : DesktopPxToVw(20)}>
                      <TaxLabelStack onClick={() => setShowNewTax(!showNewTax)} sx={{ cursor: "pointer" }}>
                        <BlockTypography
                          variant={isMobile ? "m-body-s" : "body-s"}
                          sx={{ textDecoration: "underline" }}>
                          {BOOKING_CONSTANT.TAX_AND_FEES}
                        </BlockTypography>
                        <Box
                          component="img"
                          alt={"key-arrow-down"}
                          src={ICONS?.KEY_ARROW_DOWN}
                          sx={{
                            transform: showNewTax ? "rotate(0deg)" : "rotate(180deg)",
                          }}
                        />
                      </TaxLabelStack>
                      <BlockTypography variant={isMobile ? "m-body-s" : "body-s"}>{totalNewTax}</BlockTypography>
                    </RowStack>
                  )}
                  <Collapse in={showNewTax}>
                    <Stack
                      flexDirection={"column"}
                      gap={isMobile ? MobilePxToVw(8) : DesktopPxToVw(10)}
                      mb={isMobile ? MobilePxToVw(20) : DesktopPxToVw(20)}>
                      <RenderListItems
                        rooms={modifyingRoomDetails}
                        labelName={`(${currencyCode === "INR" ? BOOKING_CONSTANT.GST_LABEL : currencyCode})`}
                        isModified={true}
                        labelKey={"tax"}
                        currencyCode={currencyCode}
                        isChangeRooms={true}
                      />
                    </Stack>
                  </Collapse>
                </>
              )}

              <FlexBox>
                {isPayAtHotel ? (
                  <>
                    <TaxLabelBox>
                      <Typography variant={isMobile ? "m-body-m" : "body-m"} fontWeight={700}>
                        {Cart?.newTotalPriceLabel}
                      </Typography>
                    </TaxLabelBox>
                    <Typography variant={isMobile ? "m-body-m" : "body-m"} fontWeight={700}>
                      {currency2DecimalSymbol(modifiedDetails?.grandTotal, currencyCode)}
                    </Typography>
                  </>
                ) : (
                  <>
                    <TaxLabelBox>
                      <Typography variant={isMobile ? "m-body-m" : "body-m"} fontWeight={700}>
                        {modifiedRoomsDetails?.data?.modifiedPayableAmount
                          ? BOOKING_CONSTANT.PAYABLE_AMOUNT
                          : BOOKING_CONSTANT.REFUNDABLE_AMOUNT}
                      </Typography>
                    </TaxLabelBox>
                    <BlockTypography variant={isMobile ? "m-body-m" : "body-m"} fontWeight={700}>
                      {currency2DecimalSymbol(
                        modifiedRoomsDetails?.data?.modifiedPayableAmount
                          ? modifiedRoomsDetails?.data?.modifiedPayableAmount
                          : modifiedRoomsDetails?.data?.refundableAmount,
                        currencyCode,
                      )}
                    </BlockTypography>
                  </>
                )}
              </FlexBox>
              {countryCurrencyCode?.toUpperCase() === "GBP" && (
                <Typography variant="body-xs">{CONSTANTS?.INCLUSIVE_TAXES}</Typography>
              )}
            </PriceDetailsBox>
          )}
        </PriceDetailsBox>
        {isAllRoomsSelected && (
          <Button
            sx={{
              margin: isMobile ? 0 : `0 ${DesktopPxToVw(20)} ${DesktopPxToVw(20)}`,
            }}
            ref={confirmRef}
            variant="light-contained"
            disabled={!(selectedRoomsDetails?.length > 0)}
            onClick={confirmChange}>
            {CONSTANTS?.CONFIRM_CHANGE}
          </Button>
        )}
      </MainBox>
    </Box>
  )
}

export default observer(CartSummaryCard)
