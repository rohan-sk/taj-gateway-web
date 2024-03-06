import React, { useContext, useState } from "react"
import { PathType } from "../../types"
import { theme } from "../../lib/theme"
import { useRouter } from "next/router"
import { observer } from "mobx-react-lite"
import Pluralize from "../../utils/pluralize"
import { CONSTANTS, ICONS } from "../constants"
import { KeyboardArrowUp } from "@mui/icons-material"
import ModalStore from "../../store/global/modal.store"
import { KeyboardArrowDown } from "@mui/icons-material"
import { formatToShortDate } from "../../utils/getDate"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Cart from "../BookingFlow/Json/cart.summary.card.json"
import { currency2DecimalSymbol } from "../../utils/currency"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { BOOKING_CONSTANT } from "../../features/booking/constants"
import { GLOBAL_STORES, PAGE_STORES } from "../../utils/Constants"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import BookingsFlowStore from "../../features/booking/store/pageStore/booking.store"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import BookingFlowGlobalStore from "../../features/booking/store/globalStore/booking.flow.store"
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
  FlexBox,
  BoldTypo,
  TaxLabelBox,
  StyledDivider,
  RoomPriceDetailsWrapper,
} from "../BookingFlow/styles/cart-summary-card"
import {
  ParentBox,
  TitleStack,
  DropDownBox,
  TitleDivider,
  BottomSheetBox,
  CartRemoveLink,
  DropDownChildrenBox,
  PriceDetailsMainBox,
} from "./styles/bottomNavStyles"
import { RowStack } from "../MyAccount/my-account.styles"

const RoomBookingNavigationComponent = (props: any) => {
  const router = useRouter()
  const navigate = useAppNavigation()
  const context = useContext(IHCLContext)
  const pageContext = useContext(PageContext)
  const modalStore = ModalStore.getInstance()

  const bookingFlowPageStore =
    (pageContext?.getPageStore(PAGE_STORES?.bookingFlowStore) as BookingsFlowStore) || undefined
  const bookingFlowGlobalStore =
    (context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore) || undefined

  const { currentStepper } = bookingFlowPageStore || {}
  const {
    activeTab,
    cartDetails,
    guestDetails,
    countryCurrencyCode,
    setRemoveFromCart,
    updateGuestDetails,
    paymentLabelDetails,
  } = bookingFlowGlobalStore || {}

  const [showTax, setShowTax] = useState<boolean>(false)
  const [showPrice, setShowPrice] = useState<boolean>(false)
  const [showTotalPay, setShowTotalPay] = useState<boolean>(true)
  const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false)
  const [isExpanded, setIsExpanded] = useState<boolean[]>(
    Array.from({ length: guestDetails?.data?.length }, () => true),
  )

  const isPayFull = activeTab?.toLowerCase() === "pay full"
  const isPayAtHotel = activeTab?.toLowerCase() === "pay at hotel"
  const isComplementaryVoucher = router?.query?.isComplementaryVoucher
  const paymentSummary = cartDetails?.cartDetailsResponse?.paymentSummary
  const isNotReservationTab = currentStepper?.stepName !== CONSTANTS?.RESERVATION
  const guaranteePolicy = paymentLabelDetails?.paymentLabelsResponse?.gccRemarks
  const cancellationPolicy = cartDetails?.cartDetailsResponse?.cancelPolicyDescription
  const selectedRooms = cartDetails?.cartDetailsResponse?.items?.[0]?.hotel?.[0]?.room
  const currencyCode = countryCurrencyCode || selectedRooms?.[0]?.currency || "INR"
  const isCouponApplied =
    cartDetails?.cartDetailsResponse?.items?.[0]?.hotel?.[0]?.promoType?.toLowerCase() === "coupon"

  const handleBottomSheet = () => setOpenBottomSheet(!openBottomSheet)
  const handleChange = (index: number) => {
    if (!!isExpanded?.[index]) {
      isExpanded[index] = false
      setIsExpanded([...isExpanded])
    } else {
      isExpanded[index] = true
      setIsExpanded([...isExpanded])
    }
  }
  const getRoomName = (number: number) => {
    return selectedRooms?.filter((room: any) => room?.roomNumber === number)?.[0]?.roomName
  }

  const updateRoomSelection = (id: number) => {
    const isSelectedRoom = guestDetails?.data?.map((item: any) =>
      item?.id === id ? { ...item, isSelected: true } : { ...item, isSelected: false },
    )
    updateGuestDetails({ data: isSelectedRoom })
  }
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenBottomSheet(newOpen)
  }

  const RenderTaxes = ({ taxes }: any) => {
    const [show, setShow] = useState<boolean>(false)

    return (
      <Stack width={"100%"}>
        <RowStack>
          <Stack
            sx={{ cursor: "pointer" }}
            columnGap={DesktopPxToVw(6)}
            flexDirection={"row"}
            onClick={() => setShow(!show)}>
            <Typography variant={"m-body-s"}>{formatToShortDate(taxes?.date)}</Typography>
            <Box
              loading={"lazy"}
              component="img"
              alt={"key-arrow-down"}
              src={ICONS?.KEY_ARROW_DOWN}
              sx={{
                transform: show ? "rotate(0deg)" : "rotate(180deg)",
              }}
            />
          </Stack>
          <Typography variant={"m-body-s"}>{currency2DecimalSymbol(taxes?.tax?.amount, currencyCode)}</Typography>
        </RowStack>
        <Collapse in={show}>
          <Box pb={show ? DesktopPxToVw(5) : 0}>
            {taxes?.tax?.breakDown?.map((tax: any, index: number) => (
              <RowStack key={index}>
                <Typography variant={"m-body-s"}>{tax?.code}</Typography>
                <Typography variant={"m-body-s"}>{currency2DecimalSymbol(tax?.amount, currencyCode)}</Typography>
              </RowStack>
            ))}
          </Box>
        </Collapse>
      </Stack>
    )
  }

  return (
    <Box>
      <ParentBox aria-label="RoomBookingNavigationComponent">
        <BottomSheetBox onClick={handleBottomSheet}>
          <DropDownBox>
            <Typography variant="m-heading-xs">{`view selected rooms (${selectedRooms?.length || 0})`}</Typography>
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
          <BottomSheetBox aria-label="RoomBookingNavigationComponent">
            <DropDownBox onClick={handleBottomSheet}>
              <Typography variant="m-heading-xs">{`hide selected rooms (${selectedRooms?.length || 0})`}</Typography>
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
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}>
              <DropDownChildrenBox>
                <Box sx={{ padding: "0vw 7.8125vw" }}>
                  {guestDetails?.data?.map((item: any, index: number) => (
                    <Box key={index}>
                      <Accordion
                        elevation={0}
                        expanded={!!isExpanded?.[index]}
                        onChange={() => getRoomName(index + 1) && handleChange(index)}
                        disableGutters={true}
                        style={{
                          borderRadius: "0vw",
                          padding: "3.28vw 0vw",
                          backgroundColor: "transparent",
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
                            <Box sx={{ display: "flex" }}>
                              <BoldTypo
                                variant="m-body-l"
                                sx={{
                                  lineHeight: "140%",
                                }}>{`Room ${item?.id} :`}</BoldTypo>
                              {item?.adults !== 0 && (
                                <BoldTypo variant="m-body-l" sx={{ lineHeight: "140%" }}>
                                  {Pluralize("Adult", item?.adults?.length)}
                                </BoldTypo>
                              )}
                              {item?.child !== 0 && (
                                <BoldTypo variant="m-body-l" sx={{ lineHeight: "140%" }}>
                                  {Pluralize("Child", item?.child?.length)}
                                </BoldTypo>
                              )}
                            </Box>
                          </AccordionSummary>
                          {!isExpanded?.[index] && (
                            <Typography
                              variant="m-body-m"
                              component="div"
                              mt={MobilePxToVw(16)}
                              color={theme.palette.neuPalette.hexTwelve}>
                              {getRoomName(index + 1) ?? CONSTANTS?.NOT_SELECTED}
                            </Typography>
                          )}
                          {!getRoomName(index + 1) && (
                            <Typography
                              variant="m-body-m"
                              component="div"
                              mt={MobilePxToVw(16)}
                              color={theme.palette.neuPalette.hexTwelve}>
                              {CONSTANTS?.NOT_SELECTED}
                            </Typography>
                          )}
                        </>
                        {selectedRooms?.map((childItem: any, childIndex: number) => (
                          <AccordionDetails
                            key={childIndex}
                            sx={{
                              padding: "0vw",
                            }}>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                              }}>
                              {childItem?.roomNumber === item?.id && (
                                <>
                                  <Typography variant="m-body-m" p={`${MobilePxToVw(16)} 0vw`}>
                                    {childItem?.roomName}
                                  </Typography>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}>
                                    <Typography variant="m-body-m">{childItem?.packageName}</Typography>
                                    {!isComplementaryVoucher && (
                                      <Typography variant="m-body-m" sx={{ pr: "3.125vw" }}>
                                        {currency2DecimalSymbol(childItem?.cost || 0, currencyCode)}
                                      </Typography>
                                    )}
                                  </Box>
                                  {isNotReservationTab ? (
                                    <CartRemoveLink
                                      variant="m-text-link"
                                      onClick={() => {
                                        setRemoveFromCart([
                                          {
                                            roomId: childItem?.roomId,
                                            roomType: childItem?.roomType,
                                            packageCode: childItem?.packageCode,
                                            roomNumber: childItem?.roomNumber,
                                          },
                                        ])
                                        updateRoomSelection(index + 1)
                                      }}>
                                      {Cart?.ctaLabel}
                                    </CartRemoveLink>
                                  ) : (
                                    <CartRemoveLink
                                      variant="m-link-m"
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
                                    </CartRemoveLink>
                                  )}
                                </>
                              )}
                              {/* ) : (
                <GrayColorTypo variant="body-s">{CONSTANTS?.NOT_SELECTED}</GrayColorTypo>
              )} */}
                            </Box>
                          </AccordionDetails>
                        ))}
                      </Accordion>
                      <StyledDivider />
                    </Box>
                  ))}
                </Box>
                {(guaranteePolicy || cancellationPolicy) && !isNotReservationTab && (
                  <Stack
                    sx={{
                      gap: MobilePxToVw(17),
                      padding: `${MobilePxToVw(24)} ${MobilePxToVw(50)}`,
                    }}>
                    {cancellationPolicy && (
                      <Stack gap={MobilePxToVw(10)}>
                        <Typography variant="m-body-sl" fontWeight={700}>
                          Cancellation Policy
                        </Typography>
                        <Typography variant="m-body-m">{cancellationPolicy}</Typography>
                      </Stack>
                    )}
                    {guaranteePolicy && (
                      <Stack gap={MobilePxToVw(10)}>
                        <Typography variant="m-body-sl" fontWeight={700}>
                          Guarantee Policy
                        </Typography>
                        <Typography variant="m-body-m">{guaranteePolicy}</Typography>
                      </Stack>
                    )}
                  </Stack>
                )}
              </DropDownChildrenBox>
              <PriceDetailsMainBox>
                <Box sx={{ padding: "0vw 5.47vw 5.47vw 5.47vw" }}>
                  <FlexBox
                    sx={{
                      marginBottom: showPrice ? MobilePxToVw(15) : "0vw",
                    }}>
                    <Box
                      onClick={() => setShowPrice(!showPrice)}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "0.28vw",
                        cursor: "pointer",
                        alignItems: "center",
                      }}>
                      <BoldTypo variant="m-body-m" sx={{ textDecoration: "underline", fontWeight: "bold" }}>
                        {Cart?.priceLabel}
                      </BoldTypo>
                      <Box
                        sx={{
                          transform: showPrice ? "rotate(180deg)" : "rotate(0deg)",
                          paddingTop: showPrice ? "0vw" : MobilePxToVw(4),
                        }}>
                        <KeyboardArrowDown
                          sx={{
                            height: "5vw",
                            width: "6vw",
                          }}
                        />
                      </Box>
                    </Box>
                    <BoldTypo variant="m-body-m">
                      {currency2DecimalSymbol(
                        isComplementaryVoucher ? 0 : cartDetails?.cartDetailsResponse?.basePrice || 0,
                        currencyCode,
                      )}
                    </BoldTypo>
                  </FlexBox>
                  <Collapse in={showPrice}>
                    <Stack rowGap={DesktopPxToVw(5)}>
                      {selectedRooms?.map((roomDaily: any, index: number) => (
                        <RoomPriceDetailsWrapper key={index}>
                          <Typography variant={"m-body-s"}>{`Room ${index + 1}`}</Typography>
                          <Box>
                            {roomDaily?.daily?.map((priceDaily: any, indexs: number) => {
                              return (
                                <>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      paddingBottom: "0.8vw",
                                      justifyContent: "space-between",
                                    }}>
                                    {priceDaily?.date && (
                                      <>
                                        <Typography variant={"m-body-s"}>
                                          {formatToShortDate(priceDaily?.date)}
                                        </Typography>
                                        <Typography variant={"m-body-s"}>
                                          {currency2DecimalSymbol(
                                            isComplementaryVoucher ? 0 : priceDaily?.amount,
                                            currencyCode,
                                          )}
                                        </Typography>
                                      </>
                                    )}
                                  </Box>
                                </>
                              )
                            })}
                          </Box>
                        </RoomPriceDetailsWrapper>
                      ))}
                    </Stack>
                  </Collapse>
                  <>
                    {currencyCode !== "GBP" && (
                      <FlexBox
                        sx={{
                          marginBottom: showTax ? `${MobilePxToVw(15)}` : `0vw`,
                        }}>
                        <TaxLabelBox onClick={() => selectedRooms?.length > 0 && setShowTax(!showTax)}>
                          <BoldTypo variant="m-body-m" sx={{ textDecoration: "underline", fontWeight: "bold" }}>
                            {Cart?.taxLabel}
                          </BoldTypo>
                          <Box
                            sx={{
                              transform: showTax ? "rotate(180deg)" : "rotate(0deg)",
                              paddingTop: showTax ? "0vw" : MobilePxToVw(4),
                            }}>
                            <KeyboardArrowDown
                              sx={{
                                height: "5vw",
                                width: "6vw",
                              }}
                            />
                          </Box>
                        </TaxLabelBox>
                        <BoldTypo variant="m-body-m">
                          {currency2DecimalSymbol(cartDetails?.cartDetailsResponse?.tax || 0, currencyCode)}
                        </BoldTypo>
                      </FlexBox>
                    )}
                    <Collapse in={showTax}>
                      <Stack rowGap={MobilePxToVw(10)}>
                        {selectedRooms?.map((roomTax: any, index: number) => (
                          <RoomPriceDetailsWrapper key={index}>
                            <Typography variant={"m-body-s"}>{`Room ${index + 1}`}</Typography>
                            <Box>
                              {roomTax?.daily?.map((priceDaily: any, idx: number) => {
                                return (
                                  <Box
                                    key={idx}
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      justifyContent: "space-between",
                                      paddingBottom: "0.8vw",
                                    }}>
                                    {priceDaily?.date && (
                                      <>
                                        {currencyCode === "INR" ? (
                                          <>
                                            <Stack direction={"column"}>
                                              <Typography variant={"m-body-s"}>
                                                {formatToShortDate(priceDaily?.date)}
                                              </Typography>
                                              <Typography variant={"m-body-s"}>
                                                {`(${
                                                  priceDaily?.tax?.breakDown?.[0]?.name ||
                                                  priceDaily?.tax?.breakDown?.[0]?.code
                                                })`}
                                              </Typography>
                                            </Stack>
                                            <Typography variant={"m-body-s"}>
                                              {currency2DecimalSymbol(priceDaily?.tax?.amount, currencyCode)}
                                            </Typography>
                                          </>
                                        ) : (
                                          <RenderTaxes taxes={priceDaily}></RenderTaxes>
                                        )}
                                      </>
                                    )}
                                  </Box>
                                )
                              })}
                            </Box>
                          </RoomPriceDetailsWrapper>
                        ))}
                      </Stack>
                    </Collapse>
                  </>

                  <FlexBox marginTop={MobilePxToVw(8)}>
                    <Stack
                      flexDirection={"row"}
                      alignItems={"center"}
                      onClick={() => {
                        setShowTotalPay(!showTotalPay)
                      }}
                      sx={{
                        cursor: "pointer",
                      }}>
                      <BoldTypo variant="m-body-m">
                        {isPayAtHotel ? CONSTANTS?.AMOUNT_AT_HOTEL : CONSTANTS?.TOTAL_AMOUNT}
                      </BoldTypo>
                      {(paymentSummary?.giftCardPrice > 0 || paymentSummary?.neuCoins > 0) && (
                        <KeyboardArrowDown
                          sx={{
                            height: "5vw",
                            width: "6vw",
                            transform: showTotalPay ? "rotate(180deg)" : "rotate(0deg)",
                          }}
                        />
                      )}
                    </Stack>
                    <BoldTypo variant="m-body-m">
                      {currency2DecimalSymbol(paymentSummary?.totalPrice || 0, currencyCode)}
                    </BoldTypo>
                  </FlexBox>
                  <Collapse in={showTotalPay}>
                    {isCouponApplied && (
                      <FlexBox sx={{ margin: "1.875vw 0vw" }}>
                        <Typography variant="m-body-m">{CONSTANTS?.COUPON_DISCOUNT}</Typography>
                        <Typography variant="m-body-m">
                          {currency2DecimalSymbol(
                            cartDetails?.cartDetailsResponse?.totalCouponDiscountValue || 0,
                            currencyCode,
                          )}
                        </Typography>
                      </FlexBox>
                    )}
                    {paymentSummary?.neuCoins > 0 && (
                      <FlexBox sx={{ margin: "1.875vw 0vw" }}>
                        <Typography variant="m-body-m">
                          {`${paymentSummary?.neuCoins == 1 ? CONSTANTS?.NEU_COIN : CONSTANTS?.NEU_COINS} Redeemed`}
                        </Typography>
                        <Typography variant="m-body-m">{`- ${paymentSummary?.neuCoins}`}</Typography>
                      </FlexBox>
                    )}
                    {paymentSummary?.giftCardPrice > 0 && (
                      <FlexBox sx={{ margin: "1.875vw 0vw" }}>
                        <Typography variant="m-body-m">{CONSTANTS?.TE_GIFT_CARD_REDEEMED}</Typography>
                        <Typography variant="m-body-m">
                          - {currency2DecimalSymbol(paymentSummary?.giftCardPrice || 0, currencyCode)}
                        </Typography>
                      </FlexBox>
                    )}
                    {(paymentSummary?.neuCoins > 0 || paymentSummary?.giftCardPrice > 0 || isCouponApplied) && (
                      <FlexBox
                        sx={{
                          margin: "0.416vw 0vw",
                          alignItems: "flex-start !important",
                        }}>
                        <BoldTypo variant="m-body-m">
                          {isPayFull ? BOOKING_CONSTANT?.DEPOSIT_PAYABLE : CONSTANTS?.TOTAL_TO_PAY}
                        </BoldTypo>
                        <BoldTypo variant="m-body-m" sx={{ whiteSpace: "nowrap" }}>
                          {currency2DecimalSymbol(paymentSummary?.totalPayableAmount || 0, currencyCode)}
                        </BoldTypo>
                      </FlexBox>
                    )}
                  </Collapse>
                </Box>
              </PriceDetailsMainBox>
            </Box>
          </>
        </SwipeableDrawer>
      </ParentBox>
    </Box>
  )
}

export default observer(RoomBookingNavigationComponent)
