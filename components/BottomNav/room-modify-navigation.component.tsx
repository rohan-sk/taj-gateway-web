import React, { useContext, useState } from "react"
import {
  Box,
  Stack,
  Collapse,
  Accordion,
  Typography,
  AccordionDetails,
  AccordionSummary,
  SwipeableDrawer,
} from "@mui/material"
import {
  BottomSheetBox,
  DropDownBox,
  DropDownChildrenBox,
  ParentBox,
  PriceDetailsMainBox,
  RoomTaxesDetailsMobileWrapper,
  RoomTaxesTitleMobileWrapper,
  SelectedRoomTypography,
  TitleDivider,
  TitleStack,
} from "./styles/bottomNavStyles"
import { CONSTANTS } from "../constants"
import { theme } from "../../lib/theme"
import { observer } from "mobx-react-lite"
import { RowStack } from "../MyAccount/my-account.styles"
import { ExpandMoreIcon } from "../header/styles/booking-menu"
import { GLOBAL_STORES, PAGE_STORES } from "../../utils/Constants"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import BookingsFlowStore from "../../features/booking/store/pageStore/booking.store"
import BookingFlowGlobalStore from "../../features/booking/store/globalStore/booking.flow.store"
import { BoldTypo, StyledDivider, TaxLabelBox, FlexBox } from "../BookingFlow/styles/cart-summary-card"
import { currency2DecimalSymbol, formatCurrencyWithMinus, formatCurrencyWithPlus } from "../../utils/currency"
import Cart from "../BookingFlow/Json/cart.summary.card.json"
import Pluralize from "../../utils/pluralize"

const RoomModifyNavigationComponent = () => {
  const pageContext = useContext(PageContext)
  const context: any = useContext(IHCLContext)

  const BookingFlowPageStore = pageContext?.getPageStore(PAGE_STORES?.bookingFlowStore) as BookingsFlowStore

  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore

  const { currentStepper } = BookingFlowPageStore
  const { countryCurrencyCode, modifiedRoomsDetails, selectedRoomsDetails, stepperDetails } = bookingFlowGlobalStore

  const [showOldTax, setShowOldTax] = useState<boolean>(false)
  const [showNewTax, setShowNewTax] = useState<boolean>(false)
  const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false)
  const [isExpanded, setIsExpanded] = useState<boolean[]>(
    Array.from({ length: stepperDetails?.data?.length }, () => true),
  )
  const isPayAtHotel = modifiedRoomsDetails?.data?.paymentMethod?.toLowerCase() === Cart?.payAtHotel?.toLowerCase()
  const isNotConfirm = currentStepper?.stepName !== CONSTANTS?.CONFIRM
  const modifiedDetails: any = modifiedRoomsDetails?.data?.items?.[0]?.hotel?.[0]
  const currencyCode = selectedRoomsDetails?.[0]?.currency
  const noOfModifiedRooms = stepperDetails?.data?.filter((room: any) => room?.modified)?.length

  const oldPrice = currency2DecimalSymbol(
    modifiedRoomsDetails?.data?.basePrice ||
      selectedRoomsDetails?.reduce((accumulator: any, currentValue: any) => {
        return accumulator + Number.parseInt(currentValue?.modifyBooking?.price || currentValue?.price)
      }, 0),
    currencyCode,
  )
  const totalOldTax = currency2DecimalSymbol(
    modifiedRoomsDetails?.data?.tax ||
      selectedRoomsDetails?.reduce((accumulator: any, currentValue: any) => {
        return accumulator + Number.parseInt(currentValue?.modifyBooking?.tax?.amount || currentValue?.tax?.amount)
      }, 0),
    currencyCode,
  )
  const oldTotalPrice = currency2DecimalSymbol(
    modifiedRoomsDetails?.data?.totalPrice ||
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

  const modifiedRoomDetails = (id: number) => {
    return modifiedDetails?.room?.filter((item: any) => item?.roomNumber === id)?.[0]
  }
  const handleChange = (index: number) => {
    if (isExpanded?.[index]) {
      isExpanded[index] = false
      setIsExpanded([...isExpanded])
    } else {
      isExpanded[index] = true
      setIsExpanded([...isExpanded])
    }
  }
  const handleBottomSheet = () => setOpenBottomSheet(!openBottomSheet)
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenBottomSheet(newOpen)
  }

  return (
    <Box>
      <ParentBox aria-label="RoomModificationNavigationComponent">
        <BottomSheetBox onClick={handleBottomSheet}>
          <DropDownBox>
            <Typography variant="m-heading-xs">{`view selected rooms (${noOfModifiedRooms})`}</Typography>
            <KeyboardArrowUp />
          </DropDownBox>
        </BottomSheetBox>
        <SwipeableDrawer
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          anchor="bottom"
          open={openBottomSheet}
          transitionDuration={{ enter: 600, exit: 800 }}
          PaperProps={{
            sx: { flex: 1, height: "100%" },
          }}>
          <BottomSheetBox>
            <DropDownBox onClick={handleBottomSheet}>
              <Typography variant="m-heading-xs">{`hide selected rooms (${noOfModifiedRooms})`}</Typography>
              {<KeyboardArrowDown />}
            </DropDownBox>
          </BottomSheetBox>
          <>
            <TitleStack>
              <TitleDivider />
              <Typography variant="m-heading-s" sx={{ fontSize: "5.938vw" }}>
                YOUR STAY
              </Typography>
              <TitleDivider />
            </TitleStack>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-between",
                height: "100%",
              }}>
              <DropDownChildrenBox sx={{ pb: "10vw" }}>
                <Box sx={{ padding: "0vw 7.8125vw" }}>
                  {stepperDetails?.data?.map((item: any, index: number) => (
                    <Box key={index}>
                      <Accordion
                        onChange={() => handleChange(index)}
                        elevation={0}
                        expanded={isExpanded?.[index]}
                        disableGutters={true}
                        style={{
                          padding: "3.28vw 0vw",
                          borderRadius: "0vw",
                          backgroundColor: "transparent",
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
                            sx={{
                              "& .MuiAccordionSummary-content": {
                                margin: "0px",
                              },
                            }}>
                            <Stack rowGap={DesktopPxToVw(8)}>
                              <BoldTypo whiteSpace={"nowrap"} variant={"m-body-l"}>
                                {`Room ${item?.id}: ${Pluralize(CONSTANTS?.ADULT, item?.adults, false)}${
                                  item?.child >= 1 ? `, ${Pluralize(CONSTANTS?.CHILD, item?.child, false)}` : ""
                                }`}
                              </BoldTypo>
                              {/* new selected room */}
                              {!isExpanded?.[index] && (
                                <>
                                  <BoldTypo
                                    variant="m-body-m"
                                    mt={MobilePxToVw(16)}
                                    color={theme.palette.ihclPalette.hexTwelve}>
                                    {CONSTANTS?.NEW_SELECTED_ROOM}
                                  </BoldTypo>
                                  <SelectedRoomTypography variant="m-body-m">
                                    {item?.modified
                                      ? modifiedRoomDetails(item?.id)?.modifyBooking?.roomName
                                      : "Not Selected"}
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
                                  <BoldTypo variant="m-body-m">{CONSTANTS?.CURRENT_BOOKED_ROOM}</BoldTypo>
                                  <SelectedRoomTypography
                                    variant="m-body-m"
                                    sx={{
                                      maxWidth: "95%",
                                      padding: "2.5vw 0vw 0vw !important",
                                    }}>
                                    {room?.roomName}
                                  </SelectedRoomTypography>
                                  {isNotConfirm && (
                                    <RowStack>
                                      <SelectedRoomTypography variant="m-body-m" sx={{ padding: "2.5vw 0vw 0vw" }}>
                                        {room?.packageName}
                                      </SelectedRoomTypography>
                                      <SelectedRoomTypography
                                        sx={{
                                          alignSelf: "flex-end",
                                          whiteSpace: "nowrap",
                                        }}>
                                        {currency2DecimalSymbol(
                                          room?.modifyBooking?.price || room?.price,
                                          room?.currency,
                                        )}
                                      </SelectedRoomTypography>
                                    </RowStack>
                                  )}

                                  {/* new selected room */}
                                  <BoldTypo variant="m-body-m">{CONSTANTS?.NEW_SELECTED_ROOM}</BoldTypo>
                                  <SelectedRoomTypography
                                    variant="m-body-m"
                                    sx={{
                                      maxWidth: "95%",
                                      padding: "2.5vw 0vw 0vw !important",
                                    }}>
                                    {item?.modified
                                      ? modifiedRoomDetails(item?.id)?.modifyBooking?.roomName
                                      : "Not Selected"}
                                  </SelectedRoomTypography>
                                  {isNotConfirm && modifiedRoomDetails(item?.id)?.modifyBooking?.cost && (
                                    <>
                                      <Stack flexDirection={"row"} justifyContent={"space-between"}>
                                        <SelectedRoomTypography variant="m-body-m">
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
                                      <Stack
                                        flexDirection={"row"}
                                        justifyContent={"space-between"}
                                        alignItems={"center"}>
                                        <Typography
                                          whiteSpace={"nowrap"}
                                          color={
                                            Number(modifiedRoomDetails(item?.id)?.changePrice || 0) >= 0
                                              ? theme.palette.ihclPalette.hexTwentyFour
                                              : theme.palette.ihclPalette.hexTwo
                                          }
                                          variant={"m-body-xs"}>
                                          {CONSTANTS?.PRICE_CHANGE}
                                        </Typography>
                                        <Typography
                                          variant={"m-body-s"}
                                          color={
                                            Number(modifiedRoomDetails(item?.id)?.changePrice || 0) >= 0
                                              ? theme.palette.ihclPalette.hexTwentyFour
                                              : theme.palette.ihclPalette.hexTwo
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
                </Box>
              </DropDownChildrenBox>
              <PriceDetailsMainBox>
                <Box sx={{ padding: "0vw 5.47vw 5.47vw 5.47vw" }}>
                  <FlexBox sx={{ marginBottom: `${MobilePxToVw(15)}` }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "0.28vw",
                        cursor: "pointer",
                        alignItems: "center",
                      }}>
                      <BoldTypo variant="m-body-m" sx={{ textDecoration: "underline" }}>
                        {Cart?.oldPriceLabel}
                      </BoldTypo>
                    </Box>
                    <BoldTypo variant="m-body-m">{oldPrice}</BoldTypo>
                  </FlexBox>
                  <>
                    {currencyCode?.toUpperCase() === "INR" && (
                      <FlexBox
                        sx={{
                          marginBottom: showOldTax ? `${MobilePxToVw(15)}` : `0vw`,
                        }}>
                        <TaxLabelBox onClick={() => selectedRoomsDetails?.length > 0 && setShowOldTax(!showOldTax)}>
                          <BoldTypo variant="m-body-m" sx={{ textDecoration: "underline" }}>
                            {Cart?.taxLabel}
                          </BoldTypo>
                          <Box
                            sx={{
                              transform: showOldTax ? "rotate(180deg)" : "rotate(0deg)",
                              paddingTop: "1.8vw",
                            }}>
                            <KeyboardArrowDown
                              sx={{
                                height: "5vw",
                                width: "6vw",
                              }}
                            />
                          </Box>
                        </TaxLabelBox>
                        <BoldTypo variant="m-body-m">{totalOldTax}</BoldTypo>
                      </FlexBox>
                    )}
                    <Collapse in={showOldTax}>
                      <Stack rowGap={MobilePxToVw(10)}>
                        {selectedRoomsDetails?.map((room: any, index: number) => (
                          <RoomTaxesDetailsMobileWrapper key={index}>
                            <RoomTaxesTitleMobileWrapper>
                              <Typography variant={"m-body-s"}>{`Room ${room?.roomNumber}`}</Typography>
                              <Typography variant={"m-body-s"}>{`Goods and service tax`}</Typography>
                            </RoomTaxesTitleMobileWrapper>
                            <Typography component={"div"} variant={"m-body-s"}>
                              {currency2DecimalSymbol(
                                room?.modifyBooking?.tax?.amount || room?.tax?.amount || 0,
                                currencyCode,
                              )}
                            </Typography>
                          </RoomTaxesDetailsMobileWrapper>
                        ))}
                      </Stack>
                    </Collapse>
                  </>
                  <FlexBox marginTop={MobilePxToVw(5)}>
                    <BoldTypo variant="m-body-m">{Cart?.totalPrice}</BoldTypo>
                    <BoldTypo variant="m-body-m">{oldTotalPrice}</BoldTypo>
                  </FlexBox>
                  {/* new price */}
                  <StyledDivider sx={{ margin: "2vw 0vw !important" }} />
                  {modifiedDetails && (
                    <>
                      <FlexBox
                        sx={{
                          marginBottom: `${MobilePxToVw(15)}`,
                        }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "0.28vw",
                            cursor: "pointer",
                            alignItems: "center",
                          }}>
                          <Typography variant="m-body-m">{Cart?.newPriceLabel}</Typography>
                        </Box>
                        <Typography variant="m-body-m">{newPrice}</Typography>
                      </FlexBox>
                      <FlexBox
                        sx={{
                          marginBottom: `${MobilePxToVw(15)}`,
                        }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "0.28vw",
                            cursor: "pointer",
                            alignItems: "center",
                          }}>
                          <Typography
                            variant="m-body-m"
                            color={
                              totalPriceChange >= 0
                                ? theme.palette.ihclPalette.hexTwentyFour
                                : theme.palette.ihclPalette.hexTwo
                            }>
                            {Cart?.totalChange}
                          </Typography>
                        </Box>
                        <Typography
                          variant="m-body-m"
                          color={
                            totalPriceChange >= 0
                              ? theme.palette.ihclPalette.hexTwentyFour
                              : theme.palette.ihclPalette.hexTwo
                          }>
                          {totalPriceChange >= 0
                            ? totalPriceChange > 0
                              ? formatCurrencyWithPlus(totalPriceChange, currencyCode)
                              : currency2DecimalSymbol(totalPriceChange, currencyCode)
                            : formatCurrencyWithMinus(totalPriceChange, currencyCode)}
                        </Typography>
                      </FlexBox>
                      {currencyCode?.toUpperCase() === "INR" && (
                        <FlexBox
                          sx={{
                            marginBottom: showOldTax ? `${MobilePxToVw(15)}` : `0vw`,
                          }}>
                          <TaxLabelBox onClick={() => modifiedDetails?.room?.length > 0 && setShowNewTax(!showNewTax)}>
                            <BoldTypo variant="m-body-m" sx={{ textDecoration: "underline" }}>
                              {Cart?.taxLabel}
                            </BoldTypo>
                            <Box
                              sx={{
                                transform: showNewTax ? "rotate(180deg)" : "rotate(0deg)",
                                paddingTop: "1.8vw",
                              }}>
                              <KeyboardArrowDown
                                sx={{
                                  height: "5vw",
                                  width: "6vw",
                                }}
                              />
                            </Box>
                          </TaxLabelBox>
                          <BoldTypo variant="m-body-m">{totalNewTax}</BoldTypo>
                        </FlexBox>
                      )}
                      <Collapse in={showNewTax}>
                        <Stack rowGap={MobilePxToVw(10)}>
                          {modifiedDetails?.room?.map((room: any, index: number) => (
                            <RoomTaxesDetailsMobileWrapper key={index}>
                              <RoomTaxesTitleMobileWrapper>
                                <Typography variant={"m-body-s"}>{`Room ${room?.roomNumber}`}</Typography>
                                <Typography variant={"m-body-s"}>{Cart?.roomTaxLabel}</Typography>
                              </RoomTaxesTitleMobileWrapper>
                              <Typography component={"div"} variant={"m-body-s"}>
                                {currency2DecimalSymbol(
                                  room?.modifyBooking?.tax?.amount || room?.tax?.amount || 0,
                                  currencyCode,
                                )}
                              </Typography>
                            </RoomTaxesDetailsMobileWrapper>
                          ))}
                        </Stack>
                      </Collapse>
                      <FlexBox>
                        {isPayAtHotel ? (
                          <>
                            <FlexBox marginTop={MobilePxToVw(5)}>
                              <BoldTypo variant="m-body-m">{Cart?.newTotalPriceLabel}</BoldTypo>
                              <BoldTypo variant="m-body-m">
                                {currency2DecimalSymbol(modifiedDetails?.grandTotal, currencyCode)}
                              </BoldTypo>
                            </FlexBox>
                          </>
                        ) : (
                          <>
                            <FlexBox marginTop={MobilePxToVw(5)}>
                              <BoldTypo variant="m-body-m">
                                {modifiedRoomsDetails?.data?.modifiedPayableAmount
                                  ? Cart?.additionalAmount
                                  : Cart?.refundableAmount}
                              </BoldTypo>
                              <BoldTypo variant="m-body-m">
                                {currency2DecimalSymbol(
                                  modifiedRoomsDetails?.data?.modifiedPayableAmount
                                    ? modifiedRoomsDetails?.data?.modifiedPayableAmount
                                    : modifiedRoomsDetails?.data?.refundableAmount,
                                  currencyCode,
                                )}
                              </BoldTypo>
                            </FlexBox>
                          </>
                        )}
                      </FlexBox>
                      {countryCurrencyCode?.toUpperCase() === "GBP" && (
                        <Typography variant="m-body-m" component="div" mt="1.1vw">
                          {CONSTANTS?.INCLUSIVE_TAXES}
                        </Typography>
                      )}
                    </>
                  )}
                </Box>
              </PriceDetailsMainBox>
            </Box>
          </>
        </SwipeableDrawer>
      </ParentBox>
    </Box>
  )
}

export default observer(RoomModifyNavigationComponent)
