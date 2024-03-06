import React, { Fragment, useState, useEffect, useContext } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { observer } from "mobx-react-lite"
import { theme } from "../../../lib/theme"
import data from "./modify-booking-json.json"
import { urlFor } from "../../../lib-sanity"
import { ICONS } from "../../constants"
import { ROUTES } from "../../../utils/routes"
import { RowStack } from "../my-account.styles"
import { BottomGradientBox } from "../../banner/styles"
import { useMobileCheck } from "../../../utils/isMobilView"
import { PathType, singleContentInterface } from "../../types"
import { useLoggedIn } from "../../../utils/hooks/useLoggedIn"
import RenderActionItem from "../../hoc/actions/action-items-ui"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import { BOOKING_CONSTANT } from "../../../features/booking/constants"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import { diffInDaysAllowNegative, formatDateWithMON } from "../../../utils/getDate"
import { Box, Grid, Stack, Divider, Collapse, Typography, Button } from "@mui/material"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import HeroBannerMultiLineTitle from "../../hoc/title/hero-banner-multi-line-title.component"
import { TaxLabelStack } from "../../../features/booking/ui/styles/BookingConfirmedRoomDetails"
import BookingDetailsShare from "../../../features/my-account/ui/booking-details-share.component"
import BookingFlowGlobalStore from "../../../features/booking/store/globalStore/booking.flow.store"
import BookingConfirmationPageStore from "../../../features/booking/store/pageStore/booking.confirmation.store"
import { currency2DecimalSymbol, formatCurrencyWithMinus, formatCurrencyWithPlus } from "../../../utils/currency"
import { EMAIL_SHARE_ICON, TAJ_GOLD_LEFT_ARROW } from "../../forms/gift-card-form/constants"
import {
  StyledBox,
  BoxWrapper,
  ButtonsBox,
  BookingInfo,
  PriceWrapper,
  StyledButtons,
  AlternateLinks,
  BookingPriceWrapper,
  BoldTypographyLabel,
  BoldTypographyValue,
  DynamicAmount,
} from "./modify-booking-styles"
import { BoldTypo, ColumnStack, RowGapStack } from "../../BookingFlow/styles/cart-summary-card"

//**components
const BackButton = dynamic(() => import("../back-button"))
const RoomsDetails = dynamic(() => import("../booking-history/room-details"))
const LoadingSpinner = dynamic(() => import("../../../utils/SpinnerComponent"))
const PDFGenerator = dynamic(() => import("../../downloadPdf/ReactToPdfDowload"))
const RoomBookingDetails = dynamic(() => import("./room-booking-details.component"))
const PrintPdf = dynamic(() => import("../../GeneratePdfPrint/render-pdf-print.component"))
const RenderListItems = dynamic(() => import("../../../features/booking/ui/renderListItems.component"))
const BookingPrintComponent = dynamic(() => import("../../GeneratePdfPrint/booking-print.component"))

interface alternateAllLinksInterface {
  title: string
  url: string
  urlType: PathType | undefined
  variant: string
}
interface propsInterface {
  content: singleContentInterface[]
}
interface modifyBookingInterface {
  props: propsInterface[]
  alternateAllLinks: alternateAllLinksInterface[]
  parameterMap: any
}

const RenderModifyBooking = ({ props, parameterMap, alternateAllLinks }: modifyBookingInterface) => {
  const router = useRouter()
  const isMobile = useMobileCheck()
  const userLoggedIn = useLoggedIn()
  const navigate = useAppNavigation()
  const Context = useContext(IHCLContext)
  const pageContext = useContext(PageContext)
  const PortableText = Context!.PortableText

  //* stores
  const bookingFlowGlobalStore = Context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore
  const { confirmationBanner, setHotelBannerData } = pageContext?.getPageStore(
    PAGE_STORES.BOOKING_STORES.bookingConfirmationPageStore,
  ) as BookingConfirmationPageStore
  const { loading, bookingOrderData, updateGuestDetails, setGuestBookingSchedule, getOrderDetails } =
    bookingFlowGlobalStore || {}
  const hotelDetails = bookingOrderData?.bookingOrderResponse

  const orderId = router?.query?.orderId
  const hotelBannerTitle = confirmationBanner?.[0]?.hotelBannerTitle
  const bannerUrl = confirmationBanner?.[0]?.hotelRooms?.bannerImage?.imageAsset
  const bannerImage = isMobile ? bannerUrl?.image[0]?.asset?._ref : bannerUrl?.largeImage[0]?.asset?._ref

  const [showTax, setShowTax] = useState<boolean>(false)
  const [showPrice, setShowPrice] = useState<boolean>(false)
  const [openShare, setOpenShare] = useState<boolean>(false)
  const [showCharges, setShowCharges] = useState<boolean>(false)
  const [showOriginalPrice, setShowOriginalPrice] = useState<boolean>(false)

  const roomDetails = hotelDetails?.orderLineItems?.[0]?.hotel
  const priceChangeWithTaxes = roomDetails?.totalPriceChange + roomDetails?.totalTaxChange
  const totalTaxChange = roomDetails?.totalTaxChange
  const currencyCode = hotelDetails?.orderLineItems?.[0]?.hotel?.rooms?.[0]?.currency
  const isComplementary = roomDetails?.voucherRedemption?.isComplementary
  const isCouponApplied = roomDetails?.promoType?.toLowerCase() === "coupon"
  const complementaryBasePrice = roomDetails?.complementaryBasePrice
  const showTotalAmount = BOOKING_CONSTANT?.NEGATIVE_BOOKING_STATUS?.includes(roomDetails?.status?.toLowerCase())
  const filteredLinks = isCouponApplied
    ? alternateAllLinks?.filter((link: any) => link?.url == ROUTES?.WITHOUTSEO_FOR_ROUTING?.MY_ACCOUNT?.CANCEL_BOOKING)
    : isComplementary
      ? hotelDetails?.modifyBookingCount > 0
        ? alternateAllLinks?.filter(
          (link: any) => link?.url == ROUTES?.WITHOUTSEO_FOR_ROUTING?.MY_ACCOUNT?.CANCEL_BOOKING,
        )
        : alternateAllLinks?.filter((link: any) => link?.url !== ROUTES?.WITHOUTSEO_FOR_ROUTING?.MY_ACCOUNT?.CHANGE_ROOMS)
      : alternateAllLinks
  const isPayAtHotel = hotelDetails?.paymentMethod?.toLowerCase() === BOOKING_CONSTANT?.PAY_AT_HOTEL?.toLowerCase()
  const isModified = hotelDetails?.modifyBookingCount > 0
  const isSEB = roomDetails?.isSeb
  const hideTabs =
    (roomDetails?.rooms?.every(
      (item: any) => item?.status?.toLowerCase() === "cancelled" || item?.status?.toLowerCase() === "pending",
    ) || diffInDaysAllowNegative(new Date(), roomDetails?.checkIn) < 0) || isSEB

  useEffect(() => {
    orderId && getOrderDetails(orderId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId])

  // to disable scroll when share modal is open
  useEffect(() => {
    if (openShare) {
      window?.document?.body.classList.add("disable-scroll")
    } else {
      window?.document?.body.classList.remove("disable-scroll")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openShare])

  const handleNavigation = (index: any, item: any) => {
    setGuestBookingSchedule(roomDetails?.checkIn, roomDetails?.checkOut)
    updateGuestDetails({
      data: roomDetails?.rooms?.map((room: any) => {
        return {
          id: room?.roomNumber,
          adults: room?.adult,
          child: room?.children,
          room: "ROOM",
          isSelected: false,
        }
      }),
    })
    navigate(`${item?.url}?orderId=${orderId}&hotelId=${roomDetails?.hotelId}`, item?.urlType)
  }

  useEffect(() => {
    roomDetails?.hotelId && setHotelBannerData(roomDetails?.hotelId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomDetails?.hotelId])

  const RenderTaxes = ({ room }: any) => {
    const taxesDetails = room?.modifyBooking?.daily || room?.daily
    return (
      <Stack flexDirection={"column"}>
        {taxesDetails?.map((item: any, index: number) => (
          <RowGapStack key={index}>
            <TaxLabelStack>
              <Typography variant={isMobile ? "m-body-m" : "body-m"}>
                {`${formatDateWithMON(item?.date)} ${currencyCode === "INR" ? data?.GST_LABEL : ""}`}
              </Typography>
            </TaxLabelStack>
            <Typography variant={isMobile ? "m-body-sl" : "body-ml"}>
              {currency2DecimalSymbol(item?.tax?.amount || 0, currencyCode)}
            </Typography>
          </RowGapStack>
        ))}
      </Stack>
    )
  }

  const getTenderAmount = (type: string) => {
    const transactionDetails = hotelDetails?.paymentDetails?.transaction_1?.find(
      (item: any) => item?.paymentMethod === type,
    )
    return transactionDetails?.txnNetAmount || 0
  }

  return (
    <Box aria-label="RenderModifyBooking">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Grid>
          {userLoggedIn && (
            <Box ml={isMobile ? MobilePxToVw(50) : 0}>
              <BackButton />
            </Box>
          )}
          {/* banner image */}
          <Box
            sx={{
              position: "relative",
            }}>
            <BottomGradientBox
              $gradient={theme?.palette?.neuPalette?.linearGradientBottom}
              sx={{
                bottom: "0.2vw !important", // added for now need to check
              }}
            />
            <Box
              sx={{
                position: "absolute",
                left: isMobile ? MobilePxToVw(53) : DesktopPxToVw(66),
                bottom: isMobile ? MobilePxToVw(44) : DesktopPxToVw(40),
              }}>
              <HeroBannerMultiLineTitle title={hotelBannerTitle} />
            </Box>
            {bannerImage && (
              <Box
                key={bannerImage}
                width={"100%"}
                alt="hotel img"
                component={"img"}
                src={bannerImage && urlFor(bannerImage).url()}
                height={isMobile ? MobilePxToVw(584) : DesktopPxToVw(541)}
              />
            )}
          </Box>
          {bookingOrderData?.errorResponse?.data ? (
            <Box
              sx={{
                width: "100%",
                textAlign: "center",
                background: theme.palette.background.paper,
                p: isMobile ? `${MobilePxToVw(80)} ${MobilePxToVw(20)}` : `${DesktopPxToVw(100)} ${DesktopPxToVw(30)}`,
              }}>
              <Typography variant={isMobile ? "m-body-xl" : "body-xl"}>
                {bookingOrderData?.errorResponse?.data || "Order details not available"}
              </Typography>
            </Box>
          ) : (
            <>
              {/* booking order details */}
              <RoomBookingDetails hotelDetails={hotelDetails} />
              <BoxWrapper>
                {/* modification tabs */}
                {!hideTabs && (
                  <AlternateLinks>
                    {filteredLinks?.map((item: alternateAllLinksInterface, index: number) => (
                      <Fragment key={index}>
                        <Box key={index} onClick={() => handleNavigation(index, item)}>
                          <RenderActionItem
                            isActionButtonType={false}
                            url={""}
                            title={item?.title}
                            variant={item?.variant}
                            navigationType={item?.urlType}
                            iconStyles={{ display: "none" }}
                          />
                        </Box>
                        {isMobile ? (
                          <>
                            {index === 0 && filteredLinks?.length > 1 && (
                              <Divider
                                orientation="vertical"
                                flexItem
                                sx={{
                                  borderColor: theme.palette.neuPalette.hexSeventeen,
                                }}
                              />
                            )}
                          </>
                        ) : (
                          <>
                            {index !== filteredLinks?.length - 1 && (
                              <Divider
                                orientation="vertical"
                                flexItem
                                sx={{
                                  borderColor: theme.palette.neuPalette.hexSeventeen,
                                }}
                              />
                            )}
                          </>
                        )}
                      </Fragment>
                    ))}
                  </AlternateLinks>
                )}
                {/* individual room info */}
                {roomDetails?.rooms
                  ?.slice()
                  ?.sort((a: any, b: any) => a?.roomNumber - b?.roomNumber)
                  ?.map((roomsData: any, index: number) => (
                    <Box key={index}>
                      <BookingInfo>
                        <Typography lineHeight={"150%"} variant={isMobile ? "m-body-m" : "body-m"}>
                          {`Room ${roomsData?.roomNumber} ${data?.roomDetails} ${roomsData?.confirmationId}`}
                        </Typography>
                        <Typography variant={isMobile ? "m-body-m" : "body-m"}>{roomsData?.status}</Typography>
                      </BookingInfo>
                      <RoomsDetails
                        isComplementary={isComplementary}
                        complementaryBasePrice={complementaryBasePrice}
                        index={index}
                        hotelDetails={hotelDetails?.orderLineItems?.[0]?.hotel}
                        isLarge={true}
                        roomsData={roomsData?.modifyBooking || roomsData}
                        currencyCode={currencyCode}
                        changePrice={roomsData?.changePrice || 0}
                      />
                    </Box>
                  ))}
                <Divider
                  sx={{
                    width: "100%",
                    marginTop: isMobile ? MobilePxToVw(20) : DesktopPxToVw(40),
                    border: `1px solid ${theme?.palette?.neuPalette?.hexSixteen}`,
                  }}
                />
                <BookingPriceWrapper mt={isMobile ? MobilePxToVw(20) : DesktopPxToVw(40)}>
                  {/* price breakup */}
                  <Stack width={"100%"} alignItems={isMobile ? "space-between" : "end"}>
                    <PriceWrapper>
                      <StyledBox>
                        {isModified && roomDetails?.oldTotalBasePrice >= 0 && (
                          <RowStack>
                            <TaxLabelStack
                              onClick={() => setShowOriginalPrice(!showOriginalPrice)}
                              sx={{ cursor: "pointer" }}>
                              <BoldTypo
                                aria-label="Price"
                                variant={isMobile ? "m-body-m" : "body-m"}
                                sx={{ textDecoration: "underline" }}>
                                {BOOKING_CONSTANT?.ORIGINAL_PRICE}
                              </BoldTypo>
                              <Box
                                component="img"
                                alt={"key-arrow-down"}
                                src={ICONS?.KEY_ARROW_DOWN}
                                sx={{
                                  transform: showOriginalPrice ? "rotate(0deg)" : "rotate(180deg)",
                                }}
                              />
                            </TaxLabelStack>
                            <BoldTypo variant={isMobile ? "m-body-l" : "body-ml"}>
                              {currency2DecimalSymbol(isComplementary ? 0 : roomDetails?.oldGrandTotal, currencyCode)}
                            </BoldTypo>
                          </RowStack>
                        )}
                        <Collapse
                          in={showOriginalPrice}
                          sx={{
                            paddingBottom: showOriginalPrice ? "0.86vw" : "0vw",
                          }}>
                          <Stack rowGap={DesktopPxToVw(6)}>
                            {isModified && (
                              <Typography fontWeight={700} variant={isMobile ? "m-body-m" : "body-m"}>
                                {BOOKING_CONSTANT?.PRICE}
                              </Typography>
                            )}
                            <RenderListItems
                              rooms={roomDetails?.rooms}
                              isModified={false}
                              labelName={""}
                              labelKey={isComplementary ? "" : "amount"}
                              currencyCode={currencyCode}
                            />
                            {isModified && (
                              <Typography fontWeight={700} variant={isMobile ? "m-body-m" : "body-m"}>
                                {BOOKING_CONSTANT?.TAX_AND_FEES}
                              </Typography>
                            )}
                            <RenderListItems
                              isModified={false}
                              rooms={roomDetails?.rooms}
                              labelName={""}
                              labelKey={"tax"}
                              currencyCode={currencyCode}
                            />
                          </Stack>
                        </Collapse>
                        {/* New Price/ Price */}
                        <RowStack>
                          <TaxLabelStack onClick={() => setShowPrice(!showPrice)} sx={{ cursor: "pointer" }}>
                            <BoldTypo
                              aria-label="Price"
                              variant={isMobile ? "m-body-m" : "body-m"}
                              sx={{ textDecoration: "underline" }}>
                              {isModified ? BOOKING_CONSTANT?.NEW_PRICE : BOOKING_CONSTANT?.PRICE}
                            </BoldTypo>
                            <Box
                              component="img"
                              alt={"key-arrow-down"}
                              src={ICONS?.KEY_ARROW_DOWN}
                              sx={{
                                transform: showPrice ? "rotate(0deg)" : "rotate(180deg)",
                              }}
                            />
                          </TaxLabelStack>
                          <BoldTypo variant={isMobile ? "m-body-l" : "body-ml"}>
                            {currency2DecimalSymbol(
                              isComplementary
                                ? 0
                                : isModified
                                  ? roomDetails?.totalBasePrice + roomDetails?.totalTaxPrice
                                  : roomDetails?.totalBasePrice,
                              currencyCode,
                            )}
                          </BoldTypo>
                        </RowStack>
                        {(roomDetails?.totalPriceChange >= 0 || roomDetails?.totalPriceChange < 0) && (
                          <Collapse
                            in={showPrice}
                            sx={{
                              paddingBottom: showPrice ? "0.86vw" : "0vw",
                            }}>
                            <Stack rowGap={DesktopPxToVw(6)}>
                              {isModified && (
                                <Typography fontWeight={700} variant={isMobile ? "m-body-m" : "body-m"}>
                                  {BOOKING_CONSTANT?.PRICE}
                                </Typography>
                              )}
                              <RenderListItems
                                rooms={roomDetails?.rooms}
                                isModified={isModified ? true : false}
                                labelName={""}
                                labelKey={isComplementary ? "" : "amount"}
                                currencyCode={currencyCode}
                              />
                              {isModified && (
                                <Stack>
                                  <Typography fontWeight={700} variant={isMobile ? "m-body-m" : "body-m"}>
                                    {BOOKING_CONSTANT?.TAX_AND_FEES}
                                  </Typography>
                                  <RenderListItems
                                    isModified={true}
                                    rooms={roomDetails?.rooms}
                                    labelName={""}
                                    labelKey={"tax"}
                                    currencyCode={currencyCode}
                                  />
                                </Stack>
                              )}
                            </Stack>
                          </Collapse>
                        )}
                        {
                          isComplementary ?
                            <>
                              {(Boolean(totalTaxChange) || totalTaxChange == 0) && isModified && (
                                <RowStack>
                                  <Typography variant={isMobile ? "m-body-sl" : "body-ml"}>
                                    {BOOKING_CONSTANT?.TOTAL_TAX_CHANGE}
                                  </Typography>
                                  <Typography
                                    color={
                                      totalTaxChange < 0
                                        ? theme.palette.neuPalette.hexTwo
                                        : theme.palette.neuPalette.hexTwentyFour
                                    }
                                    variant={isMobile ? "m-body-sl" : "body-ml"}>
                                    {totalTaxChange >= 0
                                      ? totalTaxChange > 0
                                        ? formatCurrencyWithPlus(totalTaxChange, currencyCode)
                                        : currency2DecimalSymbol(totalTaxChange, currencyCode)
                                      : formatCurrencyWithMinus(totalTaxChange, currencyCode)}
                                  </Typography>
                                </RowStack>
                              )}
                            </> : <>
                              {(Boolean(priceChangeWithTaxes) || priceChangeWithTaxes == 0) && isModified && (
                                <RowStack>
                                  <Typography variant={isMobile ? "m-body-sl" : "body-ml"}>
                                    {BOOKING_CONSTANT?.TOTAL_PRICE_CHANGE}
                                  </Typography>
                                  <Typography
                                    color={
                                      priceChangeWithTaxes < 0
                                        ? theme.palette.neuPalette.hexTwo
                                        : theme.palette.neuPalette.hexTwentyFour
                                    }
                                    variant={isMobile ? "m-body-sl" : "body-ml"}>
                                    {priceChangeWithTaxes >= 0
                                      ? priceChangeWithTaxes > 0
                                        ? formatCurrencyWithPlus(priceChangeWithTaxes, currencyCode)
                                        : currency2DecimalSymbol(priceChangeWithTaxes, currencyCode)
                                      : formatCurrencyWithMinus(priceChangeWithTaxes, currencyCode)}
                                  </Typography>
                                </RowStack>
                              )}
                            </>
                        }
                        {roomDetails?.amountPaid > 0 && isModified && (
                          <RowStack>
                            <Typography variant={isMobile ? "m-body-sl" : "body-ml"}>
                              {BOOKING_CONSTANT?.AMOUNT_PAID_PREVIOUSLY}
                            </Typography>
                            <Typography variant={isMobile ? "m-body-sl" : "body-ml"}>
                              {currency2DecimalSymbol(roomDetails?.amountPaid || 0, currencyCode)}
                            </Typography>
                          </RowStack>
                        )}
                        {currencyCode?.toUpperCase() !== "GBP" && !isModified && (
                          <RowGapStack>
                            <TaxLabelStack
                              onClick={() => roomDetails?.rooms?.length > 0 && setShowTax(!showTax)}
                              sx={{ cursor: "pointer" }}>
                              <BoldTypo variant={isMobile ? "m-body-m" : "body-m"} sx={{ textDecoration: "underline" }}>
                                {data?.tax}
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
                            <BoldTypo variant={isMobile ? "m-body-sl" : "body-ml"}>
                              {`${currency2DecimalSymbol(
                                isModified ? roomDetails?.totalTaxPrice : hotelDetails?.taxAmount,
                                currencyCode,
                              )}`}
                            </BoldTypo>
                          </RowGapStack>
                        )}
                        <Collapse in={showTax}>
                          <Stack
                            flexDirection={"column"}
                            gap={isMobile ? MobilePxToVw(8) : DesktopPxToVw(10)}
                            mb={isMobile ? MobilePxToVw(20) : DesktopPxToVw(20)}>
                            <RenderListItems
                              rooms={roomDetails?.rooms}
                              labelName={`(${currencyCode === "INR" ? BOOKING_CONSTANT.GST_LABEL : currencyCode})`}
                              isModified={false}
                              labelKey={"tax"}
                              currencyCode={currencyCode}
                            />
                          </Stack>
                        </Collapse>
                        {(getTenderAmount("giftCard") > 0 || getTenderAmount("neuCoins") > 0 || isCouponApplied) && (
                          <RowStack>
                            <Typography aria-label="total-amount" variant={isMobile ? "m-body-m" : "body-m"}>
                              {BOOKING_CONSTANT?.TOTAL_AMOUNT}
                            </Typography>
                            <Typography variant={isMobile ? "m-body-l" : "body-ml"}>
                              {currency2DecimalSymbol(hotelDetails?.gradTotal, currencyCode)}
                            </Typography>
                          </RowStack>
                        )}
                        {getTenderAmount("giftCard") > 0 && (
                          <RowStack>
                            <Typography aria-label="gift-card" variant={isMobile ? "m-body-m" : "body-m"}>
                              {BOOKING_CONSTANT?.GC_REDEEMED}
                            </Typography>
                            <Typography variant={isMobile ? "m-body-l" : "body-ml"}>
                              {formatCurrencyWithMinus(getTenderAmount("giftCard"), currencyCode)}
                            </Typography>
                          </RowStack>
                        )}
                        {getTenderAmount("neuCoins") > 0 && (
                          <RowStack>
                            <Typography aria-label="neu-coins" variant={isMobile ? "m-body-m" : "body-m"}>
                              {getTenderAmount("neuCoins") == 1
                                ? `${BOOKING_CONSTANT?.NEUCOIN} Redeemed`
                                : `${BOOKING_CONSTANT?.NEUCOIN}s Redeemed`}
                            </Typography>
                            <Typography variant={isMobile ? "m-body-l" : "body-ml"}>
                              {`- ${getTenderAmount("neuCoins")}`}
                            </Typography>
                          </RowStack>
                        )}
                        {isCouponApplied && (
                          <RowStack>
                            <Typography aria-label="coupon-discount" variant={isMobile ? "m-body-m" : "body-m"}>
                              {BOOKING_CONSTANT?.COUPON_DISCOUNT}
                            </Typography>
                            <Typography variant={isMobile ? "m-body-l" : "body-ml"}>
                              {currency2DecimalSymbol(roomDetails?.totalCouponDiscountValue || 0, currencyCode)}
                            </Typography>
                          </RowStack>
                        )}
                        {roomDetails?.totalCancellationPenaltyAmount >= 0 && isModified && (
                          <>
                            <RowGapStack>
                              <TaxLabelStack
                                onClick={() =>
                                  roomDetails?.totalCancellationPenaltyAmount !== 0 && setShowCharges(!showCharges)
                                }
                                sx={{
                                  cursor: roomDetails?.totalCancellationPenaltyAmount !== 0 ? "pointer" : "auto",
                                }}>
                                <Typography variant={isMobile ? "m-body-sl" : "body-ml"}>
                                  {BOOKING_CONSTANT?.CANCELLATION_CHARGES}
                                </Typography>
                                {roomDetails?.totalCancellationPenaltyAmount !== 0 && (
                                  <Box
                                    component="img"
                                    alt={"key-arrow-down"}
                                    src={ICONS?.KEY_ARROW_DOWN}
                                    sx={{
                                      transform: showCharges ? "rotate(0deg)" : "rotate(180deg)",
                                    }}
                                  />
                                )}
                              </TaxLabelStack>
                              <Typography variant={isMobile ? "m-body-sl" : "body-ml"}>
                                {`${roomDetails?.totalCancellationPenaltyAmount === 0
                                  ? "NIL"
                                  : currency2DecimalSymbol(
                                    roomDetails?.totalCancellationPenaltyAmount || 0,
                                    currencyCode,
                                  )
                                  }`}
                              </Typography>
                            </RowGapStack>
                            {roomDetails?.totalCancellationPenaltyAmount !== 0 && (
                              <Collapse in={showCharges}>
                                <ColumnStack $isMobile={isMobile}>
                                  {roomDetails?.rooms?.map((room: any, index: number) => (
                                    <RowGapStack key={index}>
                                      <Typography variant={isMobile ? "m-body-m" : "body-m"}>
                                        {`Room ${room?.roomNumber}`}
                                      </Typography>
                                      <Typography variant={isMobile ? "m-body-m" : "body-m"}>
                                        {room?.cancelPayableAmount}
                                      </Typography>
                                    </RowGapStack>
                                  ))}
                                </ColumnStack>
                              </Collapse>
                            )}
                          </>
                        )}
                        {/* Total Amount Label */}
                        <RowStack>
                          <DynamicAmount
                            sx={{ whiteSpace: isMobile ? "normal !important" : "nowrap" }}
                            $isSmall={roomDetails?.balancePayable > 0 && !isModified}
                            $isSmallSize={true}
                            aria-label="dynamic-label"
                            variant={isMobile ? "m-body-m" : "body-x"}>
                            {isModified
                              ? isPayAtHotel
                                ? BOOKING_CONSTANT?.NEW_TOTAL
                                : priceChangeWithTaxes >= 0
                                  ? BOOKING_CONSTANT?.PAYABLE_AMOUNT
                                  : BOOKING_CONSTANT?.REFUNDABLE_AMOUNT
                              : isPayAtHotel
                                ? BOOKING_CONSTANT?.AMOUNT_PAYABLE_AT_HOTEL
                                : isComplementary
                                  ? BOOKING_CONSTANT?.AMOUNT_PAID
                                  : roomDetails?.isDepositPaid || showTotalAmount
                                    ? BOOKING_CONSTANT?.TOTAL_AMOUNT
                                    : roomDetails?.isDepositFull
                                      ? BOOKING_CONSTANT?.DEPOSIT_PAID
                                      : BOOKING_CONSTANT?.AMOUNT_PAID}
                          </DynamicAmount>
                          <DynamicAmount
                            $isSmall={roomDetails?.balancePayable > 0 && !isModified}
                            variant={isMobile ? "m-body-l" : "body-xl"}>
                            {currency2DecimalSymbol(
                              isModified
                                ? isPayAtHotel
                                  ? roomDetails?.grandTotal
                                  : priceChangeWithTaxes >= 0
                                    ? roomDetails?.payableAmount || priceChangeWithTaxes
                                    : roomDetails?.refundAmount || priceChangeWithTaxes
                                : isPayAtHotel
                                  ? hotelDetails?.payableAmount
                                  : isComplementary
                                    ? roomDetails?.amountPaid || 0
                                    : roomDetails?.isDepositPaid || roomDetails?.isDepositFull || showTotalAmount
                                      ? roomDetails?.grandTotal
                                      : roomDetails?.amountPaid,
                              currencyCode,
                            )}
                          </DynamicAmount>
                        </RowStack>
                        {roomDetails?.amountPaid > 0 &&
                          roomDetails?.totalDepositAmount > 0 &&
                          roomDetails?.isDepositPaid &&
                          !isModified && (
                            <RowStack>
                              <Typography variant={isMobile ? "m-body-m" : "body-ml"}>
                                {BOOKING_CONSTANT?.DEPOSIT_PAID}
                              </Typography>
                              <Typography variant={isMobile ? "m-body-m" : "body-ml"}>
                                {currency2DecimalSymbol(roomDetails?.totalDepositAmount || 0, currencyCode)}
                              </Typography>
                            </RowStack>
                          )}
                        {roomDetails?.balancePayable > 0 && !isModified && (
                          <RowStack>
                            <BoldTypographyLabel variant={isMobile ? "m-body-m" : "body-ml"}>
                              {BOOKING_CONSTANT?.BALANCE_PAYABLE_AT_HOTEL}
                            </BoldTypographyLabel>
                            <BoldTypographyValue variant={isMobile ? "m-body-m" : "body-ml"}>
                              {currency2DecimalSymbol(roomDetails?.balancePayable || 0, currencyCode)}
                            </BoldTypographyValue>
                          </RowStack>
                        )}
                      </StyledBox>
                    </PriceWrapper>
                    {!isMobile && (
                      <Divider
                        sx={{
                          width: DesktopPxToVw(606),
                          marginTop: DesktopPxToVw(20),
                          border: `1px solid ${theme?.palette?.neuPalette?.hexTwelve}`,
                        }}
                      />
                    )}
                    <Stack
                      width="100%"
                      flexDirection={isMobile ? "column-reverse" : "row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}>
                      {/* back button */}
                      {userLoggedIn && (
                        <Stack
                          flexDirection={"row"}
                          alignItems={"center"}
                          onClick={() => {
                            navigate(parameterMap?.[1]?.value, parameterMap?.[2]?.value)
                          }}>
                          <Box
                            component={"img"}
                            alt="left-arrow"
                            src={TAJ_GOLD_LEFT_ARROW}
                            width={isMobile ? MobilePxToVw(9) : "0.5vw"}
                          />
                          &nbsp;
                          <Typography whiteSpace={"nowrap"} variant={isMobile ? "m-link-m" : "link-m"}>
                            {parameterMap?.[0]?.value}
                          </Typography>
                        </Stack>
                      )}
                      <ButtonsBox>
                        <PDFGenerator
                          downloadButton={
                            <Button
                              variant={"light-outlined"}
                              sx={{ "& .MuiButton-startIcon": { height: "100%" } }}
                              startIcon={
                                <Box
                                  width={"100%"}
                                  height={"100%"}
                                  alt="mail-icon"
                                  component={"img"}
                                  src={ICONS?.GOLD_DOWNLOAD_ICON}
                                />
                              }>
                              {BOOKING_CONSTANT.DOWNLOAD}
                            </Button>
                          }
                          type="download"
                          PDFData={<BookingPrintComponent orderId={orderId} bookingPrintData={hotelDetails} />}
                          fileNameForUrl={`${roomDetails?.name}_Reservation_Confirmation_${roomDetails?.bookingNumber}`}
                        />
                        <PrintPdf
                          page="booking"
                          orderId={orderId}
                          buttonVariant={"light-outlined"}
                          bookingPrintData={hotelDetails}
                        />
                        <StyledButtons
                          variant="light-outlined"
                          onClick={() => setOpenShare(true)}
                          startIcon={
                            <Box
                              width={isMobile ? MobilePxToVw(26) : DesktopPxToVw(26)}
                              height={"100%"}
                              alt="mail-icon"
                              component={"img"}
                              src={EMAIL_SHARE_ICON}
                            />
                          }>
                          {data?.share}
                        </StyledButtons>
                        {openShare && (
                          <BookingDetailsShare openShare={openShare} setOpenShare={setOpenShare} data={hotelDetails} />
                        )}
                      </ButtonsBox>
                    </Stack>
                  </Stack>
                </BookingPriceWrapper>
              </BoxWrapper>
            </>
          )}
          {/* Addition info */}
          <Box mx={isMobile ? MobilePxToVw(50) : 0}>
            <PortableText blocks={props?.[0]?.content} />
          </Box>
        </Grid>
      )}
    </Box>
  )
}

export default observer(RenderModifyBooking)
