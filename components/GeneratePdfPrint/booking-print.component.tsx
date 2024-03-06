import React, { useContext } from "react"
import dynamic from "next/dynamic"
import { ICONS } from "../constants"
import { observer } from "mobx-react-lite"
import { Box, Stack, Typography } from "@mui/material"
import { PDF_CONSTANT } from "./constants"
import PDFHeroBanner from "./pdf-hero-banner"
import Pluralize from "../../utils/pluralize"
import { getClient, urlFor } from "../../lib-sanity"
import { PAGE_STORES } from "../../utils/Constants"
import { formatDateWithMON } from "../../utils/getDate"
import { useMobileCheck } from "../../utils/isMobilView"
import { BOOKING_CONSTANT } from "../../features/booking/constants"
import { useBrowserCheck } from "../../utils/hooks/useBrowserCheck"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import BookingConfirmationPageStore from "../../features/booking/store/pageStore/booking.confirmation.store"
import { currency2DecimalSymbol, formatCurrencyWithMinus, formatCurrencyWithPlus } from "../../utils/currency"
import {
  BalanceLabel,
  BannerTitle,
  BannerTitleAndLine,
  BoldText,
  BoldTypography,
  BookedNumberText,
  BookedRoomNumber,
  BookingButton,
  BookingStatusText,
  BookingStatusTextTwo,
  BookingStatusTextWrapper,
  BorderBox,
  CancelationPolicyBox,
  CancelationPolicyText,
  CheckInCheckOutText,
  CheckInCheckOutWrapper,
  CheckInTextOneBooking,
  CheckInTextTwoBooking,
  CheckInVerticalLine,
  ContactInfoTextOne,
  ContactInfoTextThree,
  ContactInfoTextTwo,
  ContactText,
  ContactWrapper,
  DynamicPriceAndText,
  FinalPriceBox,
  FinalPriceWrapperBox,
  GuestDetailsHeading,
  GuestDetailsList,
  GuestDetailsWrapper,
  ITNumber,
  ITNumberText,
  ITNumberWrapper,
  IconDescription,
  LogoAndText,
  PrintContainer,
  RoomDescription,
  RoomDescriptionHeadingOne,
  RoomDescriptionHeadingTwo,
  RoomDescriptionPrice,
  RoomDescriptionText,
  RoomDetailsWrapper,
  RoomNumber,
  RoomNumberID,
  TopBorderBox,
  TotalPriceAndText,
  TotalRoomDetails,
  VerticalLine,
} from "./PrintTemplateStyles"
const RenderListItems = dynamic(() => import("../../features/booking/ui/renderListItems.component"))
import { RowStack } from "../MyAccount/my-account.styles"

const BookingPrintComponent = ({ orderId, isDownload = false, isPrintAction = false, bookingPrintData = {} }: any) => {
  const isMobile = useMobileCheck()
  const { isIos } = useBrowserCheck()
  const pageContext = useContext(PageContext)
  const { bookingConfirmationResponse, confirmationBanner } = pageContext?.getPageStore(
    PAGE_STORES.BOOKING_STORES.bookingConfirmationPageStore,
  ) as BookingConfirmationPageStore

  const bannerUrl = confirmationBanner?.[0]?.hotelRooms?.bannerImage?.imageAsset
  const bannerImage = isMobile ? bannerUrl?.image[0]?.asset?._ref : bannerUrl?.largeImage[0]?.asset?._ref

  const {
    rooms,
    voucherRedemption,
    booking_status,
    hotelName,
    itinerary_number,
    check_in,
    check_out,
    number_of_rooms,
    number_of_guests_ADULTS,
    number_of_guests_CHILDREN,
    guest_name,
    paymentMethod,
    hotelAddress,
    payment_status,
    paymentBreakup,
    promoType,
    grandTotal: bookingGrandTotal,
    oldGrandTotal,
    amountPaid,
    totalPriceChange,
    totalTaxChange,
    modifiedCount,
    totalCouponDiscountValue,
  } = bookingConfirmationResponse || {}

  const hotelInformation = bookingPrintData?.orderLineItems?.[0]?.hotel
  const isModified = modifiedCount > 0 || bookingPrintData?.modifyBookingCount > 0
  const isPayAtHotel =
    paymentMethod?.toLowerCase() === BOOKING_CONSTANT?.PAY_AT_HOTEL?.toLowerCase() ||
    bookingPrintData?.paymentMethod?.toLowerCase() === BOOKING_CONSTANT?.PAY_AT_HOTEL?.toLowerCase()
  const {
    amountPaid: totalAmountPaid,
    address,
    country,
    mobileNumber,
    emailId,
    checkIn,
    checkOut,
    roomCount,
    adultCount,
    grandTotal,
    totalPriceChange: totalChangePrice,
    totalTaxChange: totalChangeTax,
    totalBasePrice,
    totalTaxPrice,
    bookingNumber,
    hotelId,
  } = hotelInformation || {}

  const { landmark, city, street, state, pinCode } = address || {}

  const bookingTabHotelAddress = `${street && street + ","} ${landmark && landmark + ","} ${city && city + ","} ${state && state + ","
    } ${pinCode && pinCode + ","} ${country && country}`

  const bookingConfirmationHotelAddress = `${hotelAddress?.landMark && hotelAddress?.landMark + ","} ${hotelAddress?.state && hotelAddress?.state + ","
    } ${hotelAddress?.pinCode && hotelAddress?.pinCode + ","} ${bookingConfirmationResponse?.country && bookingConfirmationResponse?.country + ","
    }`
  const showTotalAmount = BOOKING_CONSTANT?.NEGATIVE_BOOKING_STATUS?.includes(
    booking_status?.toLowerCase() || hotelInformation?.status?.toLowerCase(),
  )
  const currencyCode = (rooms?.[0]?.currency || hotelInformation?.rooms?.[0]?.currency) ?? "INR"

  const isComplementary = voucherRedemption?.isComplementary || hotelInformation?.voucherRedemption?.isComplementary

  const roomInformation = !orderId ? rooms : hotelInformation?.rooms

  const { firstName, lastName, salutation } = hotelInformation?.rooms?.[0]?.travellerDetails?.[0] || {}
  const FullName = guest_name || `${salutation} ${firstName} ${lastName}`

  const neuCoinsPayment = bookingPrintData?.paymentDetails?.transaction_1?.find(
    (obj: any) => obj.paymentMethod == "neuCoins",
  )
  const giftCardPayment = bookingPrintData?.paymentDetails?.transaction_1?.find(
    (obj: any) => obj.paymentMethod == "giftCard",
  )
  const createdDate = bookingPrintData?.createdTimestamp
    ? new Date(bookingPrintData?.createdTimestamp)
    : bookingConfirmationResponse?.createdTimestamp
      ? new Date(bookingConfirmationResponse?.createdTimestamp)
      : new Date()

  return (
    <PrintContainer $isIos={isIos} $print={isPrintAction} className="page-break">
      <LogoAndText $isIos={isIos} $print={isPrintAction} $isMobile={isMobile}>
        <Box
          loading="lazy"
          component="img"
          src={ICONS?.TAJ_GOLD_LOGO}
          alt="TAJ-LOGO"
          width={isMobile ? (isIos && isPrintAction ? "3.125rem" : "6.5rem") : DesktopPxToVw(100)}
          height={isMobile ? (isIos && isPrintAction ? "2.75rem" : "5.7rem") : DesktopPxToVw(88)}
        />
        <BookingStatusTextWrapper>
          <BookingStatusText $isIos={isIos}>Booking Status :</BookingStatusText>
          <BookingStatusTextTwo $isIos={isIos}>
            {bookingPrintData?.orderStatus
              ? bookingPrintData?.orderStatus?.toUpperCase()
              : booking_status?.toUpperCase()}
          </BookingStatusTextTwo>
          <VerticalLine $isIos={isIos}></VerticalLine>
          <BookingStatusText $isIos={isIos}>PAYMENT METHOD :</BookingStatusText>
          <BookingStatusTextTwo $isIos={isIos}>
            {payment_status?.toUpperCase() || bookingPrintData?.transactionStatus?.toUpperCase()}
          </BookingStatusTextTwo>
        </BookingStatusTextWrapper>
      </LogoAndText>
      <PDFHeroBanner title={hotelName || hotelInformation?.name} imgUrl={bannerImage && urlFor(bannerImage)?.url()} />
      <ContactWrapper $isIos={isIos}>
        <Box>
          <ContactText $isIos={isIos}>CONTACT</ContactText>
          <ContactInfoTextOne>
            <Box
              loading="lazy"
              component="img"
              src={ICONS?.BLACK_MARKER_MAP_ICON}
              alt="Location-Icon"
              mt={isMobile ? (isIos ? "0.3rem" : "0.3rem") : DesktopPxToVw(10)}
              width={isMobile ? (isIos ? "1.25rem" : "1.25rem") : DesktopPxToVw(30)}
              height={isMobile ? (isIos ? "1.25rem" : "1.25rem") : DesktopPxToVw(30)}
            />
            <IconDescription $isIos={isIos}>
              {!orderId ? bookingConfirmationHotelAddress : bookingTabHotelAddress}
            </IconDescription>
          </ContactInfoTextOne>
          <ContactInfoTextTwo>
            <Box
              loading="lazy"
              component="img"
              src={ICONS?.PHONE_ICON}
              alt="Phone-Icon"
              width={isMobile ? (isIos ? "1.25rem" : "1.25rem") : DesktopPxToVw(30)}
              height={isMobile ? (isIos ? "1.25rem" : "1.25rem") : DesktopPxToVw(30)}
            />
            <IconDescription $isIos={isIos}>
              {bookingConfirmationResponse?.mobileNumber || mobileNumber}
            </IconDescription>
          </ContactInfoTextTwo>
          <ContactInfoTextThree>
            <Box
              loading="lazy"
              component="img"
              src={ICONS?.MAIL_ICON}
              alt="Mail-Icon"
              width={isMobile ? (isIos ? "1.25rem" : "1.25rem") : DesktopPxToVw(30)}
              height={isMobile ? (isIos ? "1.25rem" : "1.25rem") : DesktopPxToVw(30)}
              alignItems={"center"}
            />
            <IconDescription $isIos={isIos}>{bookingConfirmationResponse?.emailId || emailId}</IconDescription>
          </ContactInfoTextThree>
        </Box>

        <CheckInCheckOutText>
          <ITNumberWrapper $isIos={isIos}>
            <ITNumberText $isIos={isIos}>ITINERARY NUMBER</ITNumberText>
            <ITNumber $isIos={isIos}>{itinerary_number || bookingNumber}</ITNumber>
          </ITNumberWrapper>
          <Stack flexDirection={"row"} marginLeft={isIos ? "20px" : "unset"}>
            <Stack flexDirection={"row"}>
              <CheckInTextOneBooking $isIos={isIos}>{`${BOOKING_CONSTANT?.checkIn}: `}</CheckInTextOneBooking>
              <CheckInTextTwoBooking $isIos={isIos}>{formatDateWithMON(check_in || checkIn)}</CheckInTextTwoBooking>
            </Stack>
            <CheckInVerticalLine />
            <Stack flexDirection={"row"}>
              <CheckInTextOneBooking $isIos={isIos}>{`${BOOKING_CONSTANT?.checkOut}: `}</CheckInTextOneBooking>
              <CheckInTextTwoBooking $isIos={isIos}>{formatDateWithMON(check_out || checkOut)}</CheckInTextTwoBooking>
            </Stack>
          </Stack>
        </CheckInCheckOutText>
      </ContactWrapper>

      <GuestDetailsWrapper $isIos={isIos} $isPrint={isPrintAction}>
        <Box>
          <GuestDetailsHeading $isIos={isIos}>GUEST NAME</GuestDetailsHeading>
          <GuestDetailsList $isIos={isIos}>{FullName}</GuestDetailsList>
        </Box>
        <Box>
          <GuestDetailsHeading $isIos={isIos}>NUMBER OF ROOMS</GuestDetailsHeading>
          <GuestDetailsList $isIos={isIos}>{Pluralize("ROOM", number_of_rooms || roomCount, true)}</GuestDetailsList>
        </Box>
        <Box>
          <GuestDetailsHeading $isIos={isIos}>NUMBER OF GUESTS</GuestDetailsHeading>
          <GuestDetailsList $isIos={isIos}>
            {Pluralize("ADULT", number_of_guests_ADULTS || adultCount, true)}
            {Pluralize("CHILD", bookingConfirmationResponse?.number_of_guests_CHILDREN) !== undefined
              ? ` ${Pluralize("CHILD", bookingConfirmationResponse?.number_of_guests_CHILDREN)}`
              : ""}
          </GuestDetailsList>
        </Box>
        <Box>
          <GuestDetailsHeading $isIos={isIos}>BOOKED ON</GuestDetailsHeading>
          <GuestDetailsList $isIos={isIos}>{createdDate ? formatDateWithMON(createdDate) : ""}</GuestDetailsList>
        </Box>
      </GuestDetailsWrapper>

      <RoomDetailsWrapper>
        {roomInformation?.map((roomInfo: any, index: number) => {
          const roomData = roomInfo?.modifyBooking || roomInfo
          return (
            <Box key={index}>
              <BookedRoomNumber>
                <RoomNumber $isIos={isIos}>ROOM {roomData?.roomNumber}</RoomNumber>
                <Stack flexDirection={"row"} alignItems={"center"}>
                  <BookedNumberText $isIos={isIos}>BOOKING NUMBER:</BookedNumberText>
                  <RoomNumberID $isIos={isIos}>{roomData?.booking_number || roomData?.confirmationId}</RoomNumberID>
                </Stack>
              </BookedRoomNumber>
              <BorderBox $isIos={isIos}>
                <TotalRoomDetails>
                  <Box sx={{ display: "flex" }}>
                    <Box
                      loading="lazy"
                      component="img"
                      src={roomData?.roomImgUrl}
                      alt="Room-Image"
                      width={
                        isIos
                          ? "240px"
                          : isMobile
                            ? isPrintAction
                              ? MobilePxToVw(100)
                              : MobilePxToVw(280)
                            : DesktopPxToVw(240)
                      }
                      height={
                        isIos
                          ? "140px"
                          : isMobile
                            ? isPrintAction
                              ? MobilePxToVw(80)
                              : MobilePxToVw(250)
                            : DesktopPxToVw(160)
                      }
                    />
                    <RoomDescription>
                      <Box>
                        <RoomDescriptionHeadingOne $isIos={isIos}>
                          {roomData?.room_name || roomData?.roomName}
                        </RoomDescriptionHeadingOne>
                        <RoomDescriptionText $isIos={isIos}>
                          {Pluralize("Night", roomData?.noOfNights, false)},{" "}
                          {formatDateWithMON(roomData?.check_in || roomData?.checkIn)} to{" "}
                          {formatDateWithMON(roomData?.check_out || roomData?.checkOut)},{" "}
                          {Pluralize("Adult", roomData?.adults || roomData?.adult, false)}
                          {Pluralize("Child", roomData?.children) !== undefined
                            ? `, ${Pluralize("Child", roomData?.children, false)}`
                            : ""}
                        </RoomDescriptionText>
                      </Box>
                      <Box>
                        <RoomDescriptionHeadingTwo>Package</RoomDescriptionHeadingTwo>
                        <RoomDescriptionText $isIos={isIos}>{roomData?.packageName}</RoomDescriptionText>
                      </Box>
                    </RoomDescription>
                  </Box>
                  {!isComplementary && (
                    <RoomDescriptionPrice>
                      {currency2DecimalSymbol(roomData?.packageData?.package_amount || roomData?.price, roomData?.currency)}
                    </RoomDescriptionPrice>
                  )}
                </TotalRoomDetails>
                {
                  isComplementary ? <>
                    {(Boolean(roomInfo?.changeTax >= 0) || roomInfo?.changeTax < 0) && isModified ? (
                      <Stack alignItems={"end"}>
                        <TopBorderBox $isIos={isIos} width={isMobile ? "100%" : "86%"}>
                          <Stack flexDirection={"column"}>
                            <RoomDescriptionText $isIos={isIos}>{BOOKING_CONSTANT?.CHANGE_FEE}</RoomDescriptionText>
                            <Stack flexDirection={"row"} justifyContent={"space-between"}>
                              <RoomDescriptionText $isIos={isIos}>{PDF_CONSTANT.PRICE_CHANGE}</RoomDescriptionText>
                              <RoomDescriptionText $isIos={isIos}>
                                {roomInfo?.changeTax >= 0
                                  ? roomInfo?.changeTax > 0
                                    ? formatCurrencyWithPlus(roomInfo?.changeTax, currencyCode)
                                    : currency2DecimalSymbol(roomInfo?.changeTax, currencyCode)
                                  : formatCurrencyWithMinus(roomInfo?.changeTax, currencyCode)}
                              </RoomDescriptionText>
                            </Stack>
                          </Stack>
                        </TopBorderBox>
                      </Stack>
                    ) : null}
                  </> : <>
                    {(Boolean(roomInfo?.changePrice >= 0) || roomInfo?.changePrice < 0) && isModified ? (
                      <Stack alignItems={"end"}>
                        <TopBorderBox $isIos={isIos} width={isMobile ? "100%" : "86%"}>
                          <Stack flexDirection={"column"}>
                            <RoomDescriptionText $isIos={isIos}>{BOOKING_CONSTANT?.CHANGE_FEE}</RoomDescriptionText>
                            <Stack flexDirection={"row"} justifyContent={"space-between"}>
                              <RoomDescriptionText $isIos={isIos}>{PDF_CONSTANT.PRICE_CHANGE}</RoomDescriptionText>
                              <RoomDescriptionText $isIos={isIos}>
                                {roomInfo?.changePrice >= 0
                                  ? roomInfo?.changePrice > 0
                                    ? formatCurrencyWithPlus(roomInfo?.changePrice, currencyCode)
                                    : currency2DecimalSymbol(roomInfo?.changePrice, currencyCode)
                                  : formatCurrencyWithMinus(roomInfo?.changePrice, currencyCode)}
                              </RoomDescriptionText>
                            </Stack>
                          </Stack>
                        </TopBorderBox>
                      </Stack>
                    ) : null}
                  </>
                }
              </BorderBox>
            </Box>
          )
        })}
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          gap={isMobile ? MobilePxToVw(20) : DesktopPxToVw(20)}>
          <Stack flexBasis={isMobile ? "50%" : "50%"}>
            <Typography
              component="div"
              sx={{ mt: isMobile ? "1vw" : "1.5vw" }}
              variant={isMobile ? (isPrintAction ? "m-body-xxs" : "m-body-l") : "body-xl"}>
              {PDF_CONSTANT?.CANCELLATION_POLICY_INFO}
            </Typography>
          </Stack>
          <Stack flexBasis={isMobile ? "50%" : "45%"}>
            <Stack flexDirection={"column"}>
              {(oldGrandTotal > 0 || hotelInformation?.oldGrandTotal > 0) && isModified ? (
                <>
                  <RowStack width={"100%"}>
                    <TotalPriceAndText $isIos={isIos} sx={{ fontWeight: 700 }}>
                      {BOOKING_CONSTANT?.ORIGINAL_PRICE}
                    </TotalPriceAndText>
                    <TotalPriceAndText $isIos={isIos} sx={{ fontWeight: 700 }}>
                      {currency2DecimalSymbol(isComplementary ? 0 : (hotelInformation?.oldGrandTotal || oldGrandTotal), currencyCode)}
                    </TotalPriceAndText>
                  </RowStack>
                  <Stack rowGap={DesktopPxToVw(6)}>
                    {isModified && (
                      <TotalPriceAndText $isIos={isIos} sx={{ fontWeight: 700 }}>
                        {BOOKING_CONSTANT?.PRICE}
                      </TotalPriceAndText>
                    )}
                    <RenderListItems
                      rooms={bookingConfirmationResponse?.rooms || hotelInformation?.rooms}
                      isModified={false}
                      labelName={""}
                      labelKey={isComplementary ? "" : "amount"}
                      currencyCode={currencyCode}
                      fromPDF={true}
                      isPrintAction={isPrintAction}
                      isDownload={isDownload}
                    />
                    {isModified && (
                      <TotalPriceAndText $isIos={isIos} sx={{ fontWeight: 700 }}>
                        {BOOKING_CONSTANT?.TAX_AND_FEES}
                      </TotalPriceAndText>
                    )}
                    <RenderListItems
                      isModified={false}
                      rooms={bookingConfirmationResponse?.rooms || hotelInformation?.rooms}
                      labelName={""}
                      labelKey={"tax"}
                      currencyCode={currencyCode}
                      fromPDF={true}
                      isPrintAction={isPrintAction}
                      isDownload={isDownload}
                    />
                  </Stack>
                </>
              ) : null}
              <>
                <RowStack width={"100%"}>
                  <TotalPriceAndText $isIos={isIos} sx={{ fontWeight: 700 }}>
                    {isModified ? PDF_CONSTANT.NEW_PRICE : PDF_CONSTANT.PRICE}
                  </TotalPriceAndText>
                  <TotalPriceAndText $isIos={isIos} sx={{ fontWeight: 700 }}>
                    {currency2DecimalSymbol(
                      isComplementary
                        ? 0
                        : isModified
                          ? (bookingConfirmationResponse?.totalBasePrice || totalBasePrice) +
                          (bookingConfirmationResponse?.totalTaxPrice || totalTaxPrice || 0)
                          : bookingConfirmationResponse?.totalBasePrice || totalBasePrice,
                      currencyCode,
                    )}
                  </TotalPriceAndText>
                </RowStack>
                <Stack rowGap={DesktopPxToVw(6)}>
                  {isModified && (
                    <TotalPriceAndText $isIos={isIos} sx={{ fontWeight: 700 }}>
                      {BOOKING_CONSTANT?.PRICE}
                    </TotalPriceAndText>
                  )}
                  <RenderListItems
                    rooms={bookingConfirmationResponse?.rooms || hotelInformation?.rooms}
                    isModified={isModified}
                    labelName={""}
                    labelKey={isComplementary ? "" : "amount"}
                    currencyCode={currencyCode}
                    fromPDF={true}
                    isPrintAction={isPrintAction}
                    isDownload={isDownload}
                  />
                  {isModified && (
                    <>
                      <TotalPriceAndText $isIos={isIos} sx={{ fontWeight: 700 }}>
                        {BOOKING_CONSTANT?.TAX_AND_FEES}
                      </TotalPriceAndText>
                      <RenderListItems
                        isModified={true}
                        rooms={bookingConfirmationResponse?.rooms || hotelInformation?.rooms}
                        labelName={""}
                        labelKey={"tax"}
                        currencyCode={currencyCode}
                        fromPDF={true}
                        isPrintAction={isPrintAction}
                        isDownload={isDownload}
                      />
                    </>
                  )}
                </Stack>
              </>
              {
                isComplementary ? <>
                  {(totalTaxChange || totalChangeTax) && isModified ? (
                    <RowStack>
                      <TotalPriceAndText $isIos={isIos}>{BOOKING_CONSTANT?.TOTAL_TAX_CHANGE}</TotalPriceAndText>
                      <TotalPriceAndText $isIos={isIos}>
                        {totalTaxChange >= 0 || totalChangeTax >= 0
                          ? totalTaxChange > 0 || totalChangeTax > 0
                            ? formatCurrencyWithPlus(totalTaxChange || totalChangeTax, currencyCode)
                            : currency2DecimalSymbol(totalTaxChange || totalChangeTax, currencyCode)
                          : formatCurrencyWithMinus(totalTaxChange || totalChangeTax, currencyCode)}
                      </TotalPriceAndText>
                    </RowStack>
                  ) : null}
                </> : <>
                  {(totalPriceChange || totalChangePrice) && isModified ? (
                    <RowStack>
                      <TotalPriceAndText $isIos={isIos}>{BOOKING_CONSTANT?.TOTAL_PRICE_CHANGE}</TotalPriceAndText>
                      <TotalPriceAndText $isIos={isIos}>
                        {totalPriceChange >= 0 || totalChangePrice >= 0
                          ? totalPriceChange > 0 || totalChangePrice > 0
                            ? formatCurrencyWithPlus(totalPriceChange || totalChangePrice, currencyCode)
                            : currency2DecimalSymbol(totalPriceChange || totalChangePrice, currencyCode)
                          : formatCurrencyWithMinus(totalPriceChange || totalChangePrice, currencyCode)}
                      </TotalPriceAndText>
                    </RowStack>
                  ) : null}
                </>
              }
              {(amountPaid > 0 || hotelInformation?.amountPaid > 0) && isModified ? (
                <RowStack>
                  <TotalPriceAndText $isIos={isIos}>{BOOKING_CONSTANT?.AMOUNT_PAID_PREVIOUSLY}</TotalPriceAndText>
                  <TotalPriceAndText $isIos={isIos}>
                    {currency2DecimalSymbol(amountPaid || hotelInformation?.amountPaid, currencyCode)}
                  </TotalPriceAndText>
                </RowStack>
              ) : null}
              {!isModified &&
                currencyCode?.toUpperCase() !== "GBP" &&
                (bookingConfirmationResponse?.totalTaxPrice ||
                  bookingConfirmationResponse?.paymentBreakup?.taxes_and_fees?.taxAmount > 0 ||
                  totalTaxPrice > 0) && (
                  <>
                    <RowStack>
                      <TotalPriceAndText $isIos={isIos} sx={{ fontWeight: 700 }}>
                        {BOOKING_CONSTANT.TAX_AND_FEES}
                      </TotalPriceAndText>
                      <TotalPriceAndText $isIos={isIos} sx={{ fontWeight: 700 }}>
                        {currency2DecimalSymbol(
                          bookingConfirmationResponse?.totalTaxPrice ||
                          bookingConfirmationResponse?.paymentBreakup?.taxes_and_fees?.taxAmount ||
                          totalTaxPrice,
                          currencyCode,
                        )}
                      </TotalPriceAndText>
                    </RowStack>
                    <RenderListItems
                      rooms={bookingConfirmationResponse?.rooms || hotelInformation?.rooms}
                      labelName={`(${currencyCode === "INR" ? BOOKING_CONSTANT.GST_LABEL : currencyCode})`}
                      isModified={false}
                      labelKey={"tax"}
                      currencyCode={currencyCode}
                      fromPDF={true}
                      isPrintAction={isPrintAction}
                      isDownload={isDownload}
                    />
                  </>
                )}
              {Boolean((bookingConfirmationResponse?.paymentBreakup?.neuCoins_redemption > 0 ||
                bookingConfirmationResponse?.paymentBreakup?.giftCard_redemption > 0 ||
                neuCoinsPayment?.txnNetAmount > 0 ||
                giftCardPayment?.txnNetAmount > 0 ||
                totalCouponDiscountValue || hotelInformation?.totalCouponDiscountValue) &&
                (bookingConfirmationResponse?.paymentBreakup?.total || bookingPrintData?.gradTotal)) && (
                  <RowStack>
                    <TotalPriceAndText $isIos={isIos}>{BOOKING_CONSTANT?.TOTAL_AMOUNT}</TotalPriceAndText>
                    <TotalPriceAndText $isIos={isIos}>
                      {currency2DecimalSymbol(
                        bookingConfirmationResponse?.paymentBreakup?.total || bookingPrintData?.gradTotal,
                        currencyCode,
                      )}
                    </TotalPriceAndText>
                  </RowStack>
                )}
              {Boolean(+paymentBreakup?.neuCoins_redemption > 0 || neuCoinsPayment) ? (
                <RowStack>
                  <TotalPriceAndText $isIos={isIos}>
                    {paymentBreakup?.neuCoins_redemption > 1 || neuCoinsPayment?.txnNetAmount > 1
                      ? PDF_CONSTANT.NEUCOINS_REDEMPTION
                      : PDF_CONSTANT.NEUCOIN_REDEMPTION}
                  </TotalPriceAndText>
                  <TotalPriceAndText $isIos={isIos}>
                    {`- ${paymentBreakup?.neuCoins_redemption || neuCoinsPayment?.txnNetAmount}`}
                  </TotalPriceAndText>
                </RowStack>
              ) : null}
              {Boolean(+paymentBreakup?.giftCard_redemption > 0 || giftCardPayment) ? (
                <RowStack>
                  <TotalPriceAndText $isIos={isIos}>{BOOKING_CONSTANT.GC_REDEEMED}</TotalPriceAndText>
                  <TotalPriceAndText $isIos={isIos}>
                    {`- ${currency2DecimalSymbol(
                      paymentBreakup?.giftCard_redemption || giftCardPayment?.txnNetAmount,
                      currencyCode,
                    )}`}
                  </TotalPriceAndText>
                </RowStack>
              ) : null}
              {Boolean(promoType?.toLowerCase() === "coupon" || hotelInformation?.totalCouponDiscountValue) ? (
                <RowStack>
                  <TotalPriceAndText $isIos={isIos}>{BOOKING_CONSTANT?.COUPON_DISCOUNT}</TotalPriceAndText>
                  <TotalPriceAndText $isIos={isIos}>
                    {currency2DecimalSymbol(
                      totalCouponDiscountValue || hotelInformation?.totalCouponDiscountValue,
                      currencyCode,
                    )}
                  </TotalPriceAndText>
                </RowStack>
              ) : null}
              <RowStack>
                <DynamicPriceAndText
                  $isIos={isIos}
                  sx={{ whiteSpace: "pre-wrap !important" }}
                  $isSmall={
                    (bookingConfirmationResponse?.balancePayable > 0 || hotelInformation?.balancePayable > 0) &&
                    !isModified &&
                    (bookingConfirmationResponse?.isDepositPaid || hotelInformation?.isDepositPaid)
                  }>
                  {isModified
                    ? isPayAtHotel
                      ? BOOKING_CONSTANT?.PAYABLE_AMOUNT
                      : bookingConfirmationResponse?.totalPriceChange >= 0 || hotelInformation?.totalPriceChange >= 0
                        ? BOOKING_CONSTANT?.PAYABLE_AMOUNT
                        : BOOKING_CONSTANT?.REFUNDABLE_AMOUNT
                    : isPayAtHotel
                      ? BOOKING_CONSTANT?.AMOUNT_PAYABLE_AT_HOTEL
                      : isComplementary
                        ? BOOKING_CONSTANT?.AMOUNT_PAID
                        : bookingConfirmationResponse?.isDepositPaid || hotelInformation?.isDepositPaid || showTotalAmount
                          ? BOOKING_CONSTANT?.TOTAL_AMOUNT
                          : bookingConfirmationResponse?.isDepositFull || hotelInformation?.isDepositFull
                            ? BOOKING_CONSTANT?.DEPOSIT_PAID
                            : BOOKING_CONSTANT?.AMOUNT_PAID}
                </DynamicPriceAndText>
                <DynamicPriceAndText
                  $isIos={isIos}
                  $isSmall={
                    (bookingConfirmationResponse?.balancePayable > 0 || hotelInformation?.balancePayable > 0) &&
                    !isModified &&
                    (bookingConfirmationResponse?.isDepositPaid || hotelInformation?.isDepositPaid)
                  }>
                  {currency2DecimalSymbol(
                    isModified
                      ? isPayAtHotel
                        ? bookingGrandTotal || grandTotal
                        : totalPriceChange >= 0 || totalChangePrice >= 0
                          ? bookingConfirmationResponse?.payableAmount ||
                          hotelInformation?.payableAmount ||
                          bookingConfirmationResponse?.totalPriceChange
                          : bookingConfirmationResponse?.refundAmount ||
                          hotelInformation?.refundAmount ||
                          bookingConfirmationResponse?.totalPriceChange
                      : isPayAtHotel
                        ? paymentBreakup?.payableAmount || bookingPrintData?.payableAmount
                        : isComplementary
                          ? amountPaid || totalAmountPaid || 0
                          : bookingConfirmationResponse?.isDepositPaid || hotelInformation?.isDepositPaid || showTotalAmount
                            ? bookingGrandTotal || grandTotal
                            : bookingConfirmationResponse?.isDepositFull || hotelInformation?.isDepositFull
                              ? bookingGrandTotal || grandTotal
                              : amountPaid || totalAmountPaid,
                    currencyCode,
                  )}
                </DynamicPriceAndText>
              </RowStack>
              {(bookingConfirmationResponse?.amountPaid > 0 || hotelInformation?.amountPaid > 0) &&
                !isModified &&
                (bookingConfirmationResponse?.totalDepositAmount > 0 || hotelInformation?.totalDepositAmount > 0) &&
                (bookingConfirmationResponse?.isDepositPaid || hotelInformation?.isDepositPaid) ? (
                <RowStack>
                  <TotalPriceAndText $isIos={isIos}>{BOOKING_CONSTANT?.DEPOSIT_PAID}</TotalPriceAndText>
                  <TotalPriceAndText $isIos={isIos}>
                    {currency2DecimalSymbol(
                      bookingConfirmationResponse?.totalDepositAmount || hotelInformation?.totalDepositAmount,
                      currencyCode,
                    )}
                  </TotalPriceAndText>
                </RowStack>
              ) : null}
              {(bookingConfirmationResponse?.balancePayable > 0 || hotelInformation?.balancePayable > 0) &&
                !isModified &&
                (bookingConfirmationResponse?.isDepositPaid || hotelInformation?.isDepositPaid) ? (
                <RowStack>
                  <BalanceLabel $isIos={isIos}>{BOOKING_CONSTANT?.BALANCE_PAYABLE_AT_HOTEL}</BalanceLabel>
                  <BalanceLabel $isIos={isIos} whiteSpace={"nowrap"}>
                    {currency2DecimalSymbol(
                      bookingConfirmationResponse?.balancePayable || hotelInformation?.balancePayable,
                      currencyCode,
                    )}
                  </BalanceLabel>
                </RowStack>
              ) : null}
            </Stack>
          </Stack>
        </Stack>
      </RoomDetailsWrapper>
    </PrintContainer>
  )
}

export default observer(BookingPrintComponent)
