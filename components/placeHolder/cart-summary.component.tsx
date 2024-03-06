import React, { useContext, useState, Fragment, useEffect } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { theme } from "../../lib/theme"
import { observer } from "mobx-react-lite"
import { PathType } from "../../types"
import { CONSTANTS, ICONS } from "../constants"
import { GAStore, UserStore } from "../../store"
import TimeCounter from "./time-counter.component"
import ModalStore from "../../store/global/modal.store"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import { UseAddress } from "../../utils/hooks/useAddress"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Cart from "../BookingFlow/Json/cart.summary.card.json"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { GLOBAL_STORES, PAGE_STORES } from "../../utils/Constants"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
import Pluralize from "../../utils/pluralize"
import useStorage from "../../utils/useStorage"
import { formatToShortDate } from "../../utils/getDate"
import RenderTaxesComponent from "./RenderTaxesComponent"
import { BOOKING_CONSTANT } from "../../features/booking/constants"
import { HotelDataLayer } from "../../utils/analytics/hotel-data-layer"
import BookingsFlowStore from "../../features/booking/store/pageStore/booking.store"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { currency2DecimalSymbol, formatCurrencyWithMinus } from "../../utils/currency"
import { TaxLabelStack } from "../../features/booking/ui/styles/BookingConfirmedRoomDetails"
import BookingFlowGlobalStore from "../../features/booking/store/globalStore/booking.flow.store"
import { Box, Stack, Collapse, Accordion, Typography, AccordionDetails, AccordionSummary, Divider } from "@mui/material"
import {
  MainBox,
  FlexBox,
  BoldTypo,
  StyledDivider,
  GreyDivider,
  StyledLeftArrow,
  PriceDetailsBox,
  TimerWrapper,
  GrayColorTypo,
  RowGapStack,
  ChangeRoomsTypography,
  SelectedRoomTypography,
  RoomPriceDetailsWrapper,
} from "../BookingFlow/styles/cart-summary-card"
import { RowStack } from "../MyAccount/my-account.styles"
import { firstAlertData, secondAlertData } from "../../features/booking/JSON_Data/data-for-session-expiry"
import { handleRemoveFromCart } from "../../utils/analytics/events/Ecommerce/Booking-Journey/remove-from-cart"

const BasicModal = dynamic(() => import("../hoc/modal/modal"))
const SessionExpiryAlert = dynamic(() => import("../../features/booking/ui/session-expiring-alert.component"))

const CartSummaryCard = () => {
  const router = useRouter()
  const { getItem } = useStorage()
  const navigate = useAppNavigation()
  const pageContext = useContext(PageContext)
  const context: any = useContext(IHCLContext)
  const modalStore = ModalStore.getInstance()
  const BookingFlowPageStore = pageContext?.getPageStore(PAGE_STORES?.bookingFlowStore) as BookingsFlowStore

  const { currentStepper, setUserSelectedTCCheckBoxToPay } = BookingFlowPageStore

  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore

  const {
    activeTab,
    cartDetails,
    guestDetails,
    bookingError,
    timeRemaining,
    setTimeRemaining,
    paymentLabelDetails,
    countryCurrencyCode,
    emptyUserCart,
    setRemoveFromCart,
    updateGuestDetails,
    clearOrderResponse,
    updateSessionAlertModal,
    openSessionAlertModal,
  } = bookingFlowGlobalStore

  const [showTax, setShowTax] = useState<boolean>(false)
  const [showPrice, setShowPrice] = useState<boolean>(false)
  const [sessionAlertData, setSessionAlertData] = useState<any>()
  const [showTotalPay, setShowTotalPay] = useState<boolean>(true)

  const isPayFull = activeTab?.toLowerCase() === "pay full"
  const isPayAtHotel = activeTab?.toLowerCase() === "pay at hotel"
  const isComplementaryVoucher = router?.query?.isComplementaryVoucher
  const paymentSummary = cartDetails?.cartDetailsResponse?.paymentSummary
  const isNotReservationTab = currentStepper?.stepName !== CONSTANTS?.RESERVATION
  const orderId = bookingFlowGlobalStore?.orderDetails?.orderDetailsResponse?.orderId
  const selectedRooms = cartDetails?.cartDetailsResponse?.items?.[0]?.hotel?.[0]?.room
  const isCouponAdded =
    cartDetails?.cartDetailsResponse?.totalCouponDiscountValue !== 0 &&
    cartDetails?.cartDetailsResponse?.items?.[0]?.hotel?.[0]?.promoType?.toLowerCase() == "coupon"
  const guaranteePolicy = paymentLabelDetails?.paymentLabelsResponse?.gccRemarks
  const cancellationPolicy = cartDetails?.cartDetailsResponse?.cancelPolicyDescription
  const currencyCode = countryCurrencyCode ? countryCurrencyCode : selectedRooms?.[0]?.currency

  const address = UseAddress(userStore)
  const hotelDataLayer = HotelDataLayer()
  const dataLayer = MemberDataLayer(userStore, gaStoreData)
  const codes = bookingFlowGlobalStore?.userEnteredPromoCode
  const getRoomName = (number: number) => {
    return selectedRooms?.filter((room: any) => room?.roomNumber === number)?.[0]?.roomName
  }

  const updateRoomSelection = (id: number) => {
    const isSelectedRoom = guestDetails?.data?.map((item: any) =>
      item?.id === id ? { ...item, isSelected: true } : { ...item, isSelected: false },
    )
    updateGuestDetails({ data: isSelectedRoom })
  }
  const [isExpanded, setIsExpanded] = useState<boolean[]>(
    Array.from({ length: guestDetails?.data?.length }, () => true),
  )
  const handleChange = (index: number) => {
    if (!!isExpanded?.[index]) {
      isExpanded[index] = false
      setIsExpanded([...isExpanded])
    } else {
      isExpanded[index] = true
      setIsExpanded([...isExpanded])
    }
  }

  //? using to handle the session alert modals
  useEffect(() => {
    if (timeRemaining === 600) {
      updateSessionAlertModal(true)
      setSessionAlertData(firstAlertData)
    } else if (timeRemaining === 0) {
      ;(async () => {
        setSessionAlertData(secondAlertData)
        updateSessionAlertModal(true)
        await emptyUserCart()
        clearOrderResponse()
        setUserSelectedTCCheckBoxToPay(false)
      })()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRemaining])

  const handleModalClose = () => {
    updateSessionAlertModal(false)
    if (timeRemaining === 0) {
      setTimeRemaining(-1)
    }
  }

  return (
    <Box sx={{ position: "relative", height: "96%" }} aria-label={"CartSummaryCard"}>
      <MainBox sx={{ m: isNotReservationTab ? "8vw 0" : "0vw" }}>
        <TimerWrapper>{orderId && <TimeCounter count={900} render={orderId} />}</TimerWrapper>
        <Box
          sx={{
            border: `0.052vw solid ${theme?.palette?.ihclPalette?.hexTwo}`,
          }}>
          <Typography variant="heading-xs" sx={{ padding: "1.04vw" }}>
            {Cart?.title}
          </Typography>
          <StyledDivider />
          <Box
            sx={{
              maxHeight: "18vw",
              overflowY: "scroll",
              "&::-webkit-scrollbar": {
                width: "4px",
              },
            }}>
            {guestDetails?.data?.map((item: any, index: number) => (
              <Box key={index} sx={{ position: "relative" }}>
                {item?.isSelected && isNotReservationTab && <StyledLeftArrow />}
                <Accordion
                  onChange={() => getRoomName(index + 1) && handleChange(index)}
                  elevation={0}
                  expanded={!!isExpanded?.[index]}
                  disableGutters={true}
                  style={{
                    padding: "1.04vw",
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
                      expandIcon={<ExpandMoreIcon sx={{ cursor: "pointer" }} />}
                      style={{
                        padding: "0px",
                        cursor: "default",
                        minHeight: "fit-content",
                      }}
                      sx={{
                        "& .MuiAccordionSummary-content": { margin: "0px" },
                      }}>
                      <Stack>
                        <Stack flexDirection={"row"} sx={{ whiteSpace: "nowrap" }}>
                          {item?.adults !== 0 && (
                            <BoldTypo variant="body-s">
                              {`Room ${item?.id} : ${Pluralize("Adult", item?.adults, false)}`}
                            </BoldTypo>
                          )}
                          {item?.child !== 0 && (
                            <BoldTypo variant="body-s">
                              {item?.child <= 1 ? `, ${item?.child} Child` : `, ${item?.child} Children`}
                            </BoldTypo>
                          )}
                        </Stack>
                        {!isExpanded?.[index] && (
                          <Typography key={`rooms-${selectedRooms?.length}`} variant={"body-xs"} mt={DesktopPxToVw(8)}>
                            {getRoomName(index + 1) ?? CONSTANTS?.NOT_SELECTED}
                          </Typography>
                        )}
                      </Stack>
                    </AccordionSummary>
                  </>
                  {selectedRooms?.map((childItem: any, childIndex: number) => (
                    <Fragment key={childIndex}>
                      {childItem?.roomNumber === item?.id && (
                        <AccordionDetails
                          key={childIndex}
                          sx={{
                            padding: "0vw",
                            marginTop: getRoomName(index + 1) ? DesktopPxToVw(8) : "0vw",
                          }}>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: DesktopPxToVw(8),
                            }}>
                            <>
                              <SelectedRoomTypography variant="body-s" sx={{ maxWidth: "95%" }}>
                                {childItem?.roomName}
                              </SelectedRoomTypography>
                              <RowStack>
                                <SelectedRoomTypography variant="body-s">
                                  {childItem?.packageName}
                                </SelectedRoomTypography>
                                {!isComplementaryVoucher && (
                                  <SelectedRoomTypography
                                    sx={{
                                      alignSelf: "flex-end",
                                      whiteSpace: "nowrap",
                                    }}>
                                    {currency2DecimalSymbol(childItem?.cost, currencyCode)}
                                  </SelectedRoomTypography>
                                )}
                              </RowStack>
                              {isNotReservationTab ? (
                                <ChangeRoomsTypography
                                  variant="link-m"
                                  sx={{ cursor: "pointer" }}
                                  onClick={async () => {
                                    await setRemoveFromCart([
                                      {
                                        roomId: childItem?.roomId,
                                        roomType: childItem?.roomType,
                                        packageCode: childItem?.packageCode,
                                        roomNumber: childItem?.roomNumber,
                                      },
                                    ])
                                    updateRoomSelection(index + 1)
                                    handleRemoveFromCart(
                                      childItem,
                                      index,
                                      dataLayer,
                                      hotelDataLayer,
                                      Cart,
                                      bookingFlowGlobalStore,
                                      BookingFlowPageStore,
                                      codes,
                                      getItem,
                                      bookingError,
                                      address,
                                      "remove_from_cart",
                                    )
                                  }}>
                                  {Cart?.ctaLabel}
                                </ChangeRoomsTypography>
                              ) : (
                                <ChangeRoomsTypography
                                  variant="link-m"
                                  sx={{ cursor: "pointer" }}
                                  onClick={() => {
                                    modalStore?.setPropertyData({
                                      title: childItem?.packageName,
                                      shortDescription: childItem?.description,
                                      longDescription: childItem?.detailedDescription,
                                      guaranteePolicy: childItem?.bookingPolicyDescription,
                                      cancellationPolicy: childItem?.cancelPolicyDescription,
                                      price: isComplementaryVoucher ? 0 : childItem?.cost,
                                      currencyCode: currencyCode,
                                    })
                                    navigate("/hotel-rooms/rate-detail", PathType?.dialog)
                                  }}>
                                  {Cart?.rateDetails}
                                </ChangeRoomsTypography>
                              )}
                            </>
                          </Box>
                        </AccordionDetails>
                      )}
                    </Fragment>
                  ))}
                  {!getRoomName(index + 1) && (
                    <GrayColorTypo key={`rooms-${selectedRooms?.length}`}>{CONSTANTS?.NOT_SELECTED}</GrayColorTypo>
                  )}
                </Accordion>
                <StyledDivider />
              </Box>
            ))}
          </Box>
          <PriceDetailsBox sx={{ padding: "0vw 1.04vw 1.04vw 1.04vw", marginTop: "20px" }}>
            <FlexBox
              sx={{
                margin: showPrice ? `0vw 0vw 0.95vw` : "0vw",
              }}>
              <Box
                onClick={() => selectedRooms?.length > 0 && setShowPrice(!showPrice)}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "0.28vw",
                  cursor: "pointer",
                }}>
                <BoldTypo variant={"body-xs"} sx={{ textDecoration: "underline" }}>
                  {Cart?.priceLabel}
                </BoldTypo>
                <Box
                  component="img"
                  alt={"key-arrow-down"}
                  src={ICONS?.KEY_ARROW_DOWN}
                  sx={{
                    transform: showPrice ? "rotate(0deg)" : "rotate(180deg)",
                  }}
                />
              </Box>
              <Typography variant="body-xs" fontWeight="bold">
                {currency2DecimalSymbol(
                  isComplementaryVoucher ? 0 : cartDetails?.cartDetailsResponse?.basePrice || 0,
                  currencyCode,
                )}
              </Typography>
            </FlexBox>

            <Collapse in={showPrice}>
              <Stack rowGap={DesktopPxToVw(5)}>
                {selectedRooms?.map((roomDaily: any, index: number) => (
                  <RoomPriceDetailsWrapper key={index}>
                    <Typography variant={"body-xs"}>{`Room ${index + 1}`}</Typography>
                    <Box>
                      {roomDaily?.daily?.map((priceDaily: any, taxIndex: number) => {
                        return (
                          <Stack key={taxIndex} flexDirection={"column"} rowGap={DesktopPxToVw(6)}>
                            <Stack flexDirection={"row"} justifyContent={"space-between"}>
                              {priceDaily?.date && (
                                <Typography variant={"body-xs"}>{formatToShortDate(priceDaily?.date)}</Typography>
                              )}
                              <Typography variant={"body-xs"}>
                                {currency2DecimalSymbol(isComplementaryVoucher ? 0 : priceDaily?.amount, currencyCode)}
                              </Typography>
                            </Stack>
                          </Stack>
                        )
                      })}
                    </Box>
                  </RoomPriceDetailsWrapper>
                ))}
              </Stack>
            </Collapse>
            <>
              {currencyCode !== "GBP" && (
                <RowGapStack
                  sx={{
                    margin: showTax ? `${DesktopPxToVw(8)} 0vw ${DesktopPxToVw(13)}` : `${DesktopPxToVw(8)} 0vw 0vw`,
                  }}>
                  <TaxLabelStack
                    onClick={() => selectedRooms?.length > 0 && setShowTax(!showTax)}
                    sx={{ cursor: "pointer" }}>
                    <BoldTypo variant={"body-xs"} sx={{ textDecoration: "underline" }}>
                      {Cart?.taxLabel}
                    </BoldTypo>
                    <Box
                      component="img"
                      alt={"key-arrow-down"}
                      src={ICONS?.KEY_ARROW_DOWN}
                      sx={{
                        transform: showTax ? "rotate(0deg)" : "rotate(180deg)",
                      }}
                    />
                  </TaxLabelStack>
                  <Typography variant={"body-xs"} fontWeight="bold">
                    {currency2DecimalSymbol(cartDetails?.cartDetailsResponse?.tax || 0, currencyCode)}
                  </Typography>
                </RowGapStack>
              )}
              <Collapse in={showTax}>
                <Stack rowGap={DesktopPxToVw(5)}>
                  {selectedRooms?.map((roomTax: any, index: number) => (
                    <RoomPriceDetailsWrapper key={index}>
                      <Typography variant={"body-xs"}>{`Room ${index + 1}`}</Typography>
                      <Box>
                        {roomTax?.daily?.map((priceDaily: any, idx: number) => {
                          return (
                            <Stack key={idx} flexDirection={"column"} rowGap={DesktopPxToVw(6)}>
                              <Stack flexDirection={"row"} justifyContent={"space-between"}>
                                {priceDaily?.date && (
                                  <>
                                    {currencyCode === "INR" ? (
                                      <>
                                        <Stack direction={"column"}>
                                          <Typography variant={"body-xs"}>
                                            {formatToShortDate(priceDaily?.date)}
                                          </Typography>
                                          <Typography variant={"body-xs"}>
                                            {`(${
                                              priceDaily?.tax?.breakDown?.[0]?.name ||
                                              priceDaily?.tax?.breakDown?.[0]?.code
                                            })`}
                                          </Typography>
                                        </Stack>
                                        <Typography whiteSpace={"nowrap"} variant={"body-xs"}>
                                          {currency2DecimalSymbol(priceDaily?.tax?.amount, currencyCode)}
                                        </Typography>
                                      </>
                                    ) : (
                                      <RenderTaxesComponent taxes={priceDaily} currencyCode={currencyCode} />
                                    )}
                                  </>
                                )}
                              </Stack>
                            </Stack>
                          )
                        })}
                      </Box>
                    </RoomPriceDetailsWrapper>
                  ))}
                </Stack>
              </Collapse>
            </>
            <GreyDivider
              sx={{
                margin: `${DesktopPxToVw(40)} 0 ${DesktopPxToVw(15)}`,
              }}
            />
            <Stack direction={"column"} rowGap={DesktopPxToVw(5)}>
              <FlexBox alignItems={"start !important"}>
                <Stack
                  flexDirection={"row"}
                  alignItems={"center"}
                  columnGap={DesktopPxToVw(5)}
                  onClick={() => {
                    setShowTotalPay(!showTotalPay)
                  }}
                  sx={{
                    cursor: "pointer",
                  }}>
                  <BoldTypo maxWidth={isPayAtHotel ? DesktopPxToVw(160) : "unset"} variant="body-s" fontWeight={700}>
                    {isPayAtHotel ? CONSTANTS?.AMOUNT_AT_HOTEL : CONSTANTS?.TOTAL_AMOUNT}
                  </BoldTypo>
                  {(paymentSummary?.giftCardPrice > 0 || paymentSummary?.neuCoins > 0 || isCouponAdded) && (
                    <Box
                      component="img"
                      alt={"key-arrow-down"}
                      src={ICONS?.KEY_ARROW_DOWN}
                      sx={{
                        transform: showTotalPay ? "rotate(0deg)" : "rotate(180deg)",
                      }}
                    />
                  )}
                </Stack>
                <BoldTypo whiteSpace={"nowrap"} variant="body-s">
                  {currency2DecimalSymbol(paymentSummary?.totalPrice || 0, currencyCode)}
                </BoldTypo>
              </FlexBox>
              <Collapse in={showTotalPay}>
                {isCouponAdded && (
                  <FlexBox sx={{ margin: "0.416vw 0vw" }}>
                    <Typography variant="body-s">{CONSTANTS?.COUPON_DISCOUNT}</Typography>
                    <Typography variant="body-s">
                      {currency2DecimalSymbol(
                        cartDetails?.cartDetailsResponse?.totalCouponDiscountValue || 0,
                        currencyCode,
                      )}
                    </Typography>
                  </FlexBox>
                )}
                {paymentSummary?.neuCoins > 0 && (
                  //? GC redemption details
                  <FlexBox>
                    <Typography variant="body-s">
                      {`${paymentSummary?.neuCoins == 1 ? CONSTANTS?.NEU_COIN : CONSTANTS?.NEU_COINS} Redeemed`}
                    </Typography>
                    <Typography variant="body-s">{`- ${paymentSummary?.neuCoins}`}</Typography>
                  </FlexBox>
                )}
                {paymentSummary?.giftCardPrice > 0 && (
                  //? NeuCoins redemption details
                  <FlexBox
                    sx={{
                      margin: "0.416vw 0vw",
                      alignItems: "flex-start !important",
                    }}>
                    <Typography variant="body-s">{CONSTANTS?.TE_GIFT_CARD_REDEEMED}</Typography>
                    <Typography variant="body-s" sx={{ whiteSpace: "nowrap" }}>
                      {formatCurrencyWithMinus(paymentSummary?.giftCardPrice)}
                    </Typography>
                  </FlexBox>
                )}
                {(paymentSummary?.neuCoins > 0 || paymentSummary?.giftCardPrice > 0 || isCouponAdded) && (
                  <FlexBox
                    sx={{
                      margin: "0.416vw 0vw",
                      alignItems: "flex-start !important",
                    }}>
                    <BoldTypo variant="body-s">
                      {isPayFull ? BOOKING_CONSTANT?.DEPOSIT_PAYABLE : CONSTANTS?.TOTAL_TO_PAY}
                    </BoldTypo>
                    <BoldTypo variant="body-s" sx={{ whiteSpace: "nowrap" }}>
                      {currency2DecimalSymbol(paymentSummary?.totalPayableAmount || 0, currencyCode)}
                    </BoldTypo>
                  </FlexBox>
                )}
              </Collapse>
              {paymentLabelDetails?.paymentLabelsResponse?.depositAmount > 0 &&
                activeTab == "PAY DEPOSIT" &&
                orderId && (
                  <FlexBox>
                    <BoldTypo variant="body-s">{BOOKING_CONSTANT?.DEPOSIT_PAYABLE}</BoldTypo>
                    <BoldTypo variant="body-s">
                      {currency2DecimalSymbol(paymentLabelDetails?.paymentLabelsResponse?.depositAmount, currencyCode)}
                    </BoldTypo>
                  </FlexBox>
                )}
              {currencyCode === "GBP" && <Typography variant="body-xs">{CONSTANTS?.INCLUSIVE_TAXES}</Typography>}
            </Stack>
          </PriceDetailsBox>
        </Box>
        {/* {orderId && activeTab == "PAY DEPOSIT" && ( */}
        {(guaranteePolicy || cancellationPolicy) && !isNotReservationTab && (
          <Stack
            sx={{
              border: `1px solid ${theme.palette.ihclPalette.hexSixteen}`,
              padding: `${DesktopPxToVw(25)} ${DesktopPxToVw(20)}`,
              marginTop: DesktopPxToVw(20),
            }}>
            {cancellationPolicy && (
              <>
                <Stack gap={DesktopPxToVw(10)}>
                  <Typography variant="body-s" fontWeight={700}>
                    Cancellation Policy
                  </Typography>
                  <Typography variant="body-xs">{cancellationPolicy}</Typography>
                </Stack>
                {guaranteePolicy && cancellationPolicy && (
                  <Divider
                    sx={{
                      height: DesktopPxToVw(1),
                      backgroundColor: theme?.palette?.ihclPalette?.hexSixteen,
                      margin: `${DesktopPxToVw(20)} ${DesktopPxToVw(0)}`,
                    }}
                  />
                )}
              </>
            )}
            {guaranteePolicy && (
              <Stack gap={DesktopPxToVw(10)}>
                <Typography variant="body-s" fontWeight={700}>
                  Guarantee Policy
                </Typography>
                <Typography variant="body-xs">{guaranteePolicy}</Typography>
              </Stack>
            )}
          </Stack>
        )}
        {/* )} */}
      </MainBox>
      {openSessionAlertModal && (
        <BasicModal
          width={"100%"}
          height={"100%"}
          open={openSessionAlertModal}
          handleClose={handleModalClose}
          webCloseIcon={ICONS?.CLOSE_WHITE_ICON}
          ModalCloseButtonStyles={{ right: "25.5%" }}
          ModalCloseButtonColor={theme?.palette?.background?.paper}
          Component={<SessionExpiryAlert data={sessionAlertData} handleModalClose={handleModalClose} />}
        />
      )}
    </Box>
  )
}

export default observer(CartSummaryCard)
