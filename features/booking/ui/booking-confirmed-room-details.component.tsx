import React, { useContext, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { PathType } from "../../../types"
import { observer } from "mobx-react-lite"
import { theme } from "../../../lib/theme"
import { ROUTES } from "../../../utils/routes"
import { BOOKING_CONSTANT } from "../constants"
import Pluralize from "../../../utils/pluralize"
import { GAStore, UserStore } from "../../../store"
import ModalStore from "../../../store/global/modal.store"
import { formatDateWithMON } from "../../../utils/getDate"
import { useMobileCheck } from "../../../utils/isMobilView"
import { UseAddress } from "../../../utils/hooks/useAddress"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import { PAGE_STORES, GLOBAL_STORES } from "../../../utils/Constants"
import { MemberDataLayer } from "../../../utils/analytics/member-data-layer"
import BookingFlowGlobalStore from "../store/globalStore/booking.flow.store"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { Box, Button, Collapse, Divider, Stack, Typography } from "@mui/material"
import BookingsFlowStore from "../../../features/booking/store/pageStore/booking.store"
import { ConfirmationMailShareIcon, GoldMailShareIcon } from "../../../utils/customIcons"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import BookingConfirmationPageStore from "../store/pageStore/booking.confirmation.store"
import { currency2DecimalSymbol, formatCurrencyWithMinus, formatCurrencyWithPlus } from "../../../utils/currency"
import { urlFor } from "../../../lib-sanity"
import useStorage from "../../../utils/useStorage"
import { ICONS } from "../../../components/constants"
import { fetchConfirmRoomData } from "../../../utils/fetchRoomData"
import { HotelDataLayer } from "../../../utils/analytics/hotel-data-layer"
import { CtaLabelTypo } from "../../../components/BookingFlow/styles/details-card"
import { BoldTypo } from "../../../components/BookingFlow/styles/cart-summary-card"
import { handlePurchase } from "../../../utils/analytics/events/Ecommerce/Booking-Journey/purchase"
import handleModifiedBooking from "../../../utils/analytics/events/Ecommerce/Booking-Journey/modified-booking"
import handleModifiedPurchase from "../../../utils/analytics/events/Ecommerce/Booking-Journey/modified-purchase"
import {
  MainBox,
  FlexBox,
  StatusBox,
  ButtonsBox,
  DetailsBox,
  StyledImage,
  StyledDivider,
  TaxLabelStack,
  BoldTypography,
  ContentMainBox,
  PriceDetailsBox,
  PriceDetailsMainBox,
  LabelBoldTypography,
  PriceContainer,
  DynamicText,
} from "./styles/BookingConfirmedRoomDetails"

const RenderListItems = dynamic(() => import("./renderListItems.component"))
const PDFGenerator = dynamic(() => import("../../../components/downloadPdf/ReactToPdfDowload"))
const BookingDetailsShare = dynamic(() => import("../../../components/share/booking-details-share.component"))
const GeneratePDFPrint = dynamic(() => import("../../../components/GeneratePdfPrint/render-pdf-print.component"))
const BookingPrintComponent = dynamic(() => import("../../../components/GeneratePdfPrint/booking-print.component"))

const BookingConfirmedRoomDetails = (props: any) => {
  const isMobile = useMobileCheck()
  const { getItem } = useStorage()
  const navigate = useAppNavigation()
  const pageContext = useContext(PageContext)
  const context: any = useContext(IHCLContext)
  const modalStore = ModalStore.getInstance()

  const [showTax, setShowTax] = useState<boolean>(false)
  const [openShare, setOpenShare] = useState<boolean>(false)
  const [showPrice, setShowPrice] = useState<boolean>(false)
  const [hotelResponse, setHotelResponse] = useState<any>(null)
  const [showCharges, setShowCharges] = useState<boolean>(false)
  const [showOriginalPrice, setShowOriginalPrice] = useState<boolean>(false)

  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const bookingFlowPageStore = pageContext?.getPageStore(PAGE_STORES?.bookingFlowStore) as BookingsFlowStore
  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore
  const { bookingConfirmationResponse, setHotelBannerData, showComponents } = pageContext?.getPageStore(
    PAGE_STORES.BOOKING_STORES.bookingConfirmationPageStore,
  ) as BookingConfirmationPageStore

  const roomsData = bookingConfirmationResponse?.rooms
    ?.slice(0)
    ?.sort((a: any, b: any) => a?.roomNumber - b?.roomNumber)
  const address = UseAddress(userStore)
  const hotelDataLayer = HotelDataLayer()
  const dataLayer = MemberDataLayer(userStore, gaStoreData)
  const accessToken = global?.window?.localStorage?.getItem("accessToken")
  const isModified = bookingConfirmationResponse?.modifiedCount > 0
  const currencyCode = bookingConfirmationResponse?.rooms?.[0]?.currency?.toUpperCase() ?? "INR"
  const isComplementary = bookingConfirmationResponse?.voucherRedemption?.isComplementary
  const isPayAtHotel =
    bookingConfirmationResponse?.paymentMethod?.toLowerCase() === BOOKING_CONSTANT?.PAY_AT_HOTEL?.toLowerCase()
  const priceChange = bookingConfirmationResponse?.totalPriceChange + bookingConfirmationResponse?.totalTaxChange
  const taxChange = bookingConfirmationResponse?.totalTaxChange
  const presentDate = new Date()
  const checkInDate = new Date(bookingConfirmationResponse?.check_in)
  const checkOutDate = new Date(bookingConfirmationResponse?.check_out)
  const adults = parseInt(bookingConfirmationResponse?.number_of_guests_ADULTS)
  const children = parseInt(bookingConfirmationResponse?.number_of_guests_CHILDREN)
  const rooms = parseInt(bookingConfirmationResponse?.number_of_rooms)
  const codes = bookingFlowGlobalStore?.userEnteredPromoCode
  const epochTime = presentDate?.getTime()
  const dateString = bookingConfirmationResponse?.createdTimestamp
  const modifiedDateString = bookingConfirmationResponse?.modifiedTimestamp
  const dateObject = new Date(dateString)
  const modifiedDateObject = new Date(modifiedDateString)
  const epochTimeCreated = dateObject?.getTime() / 1000
  const epochTimeModified = modifiedDateObject?.getTime() / 1000
  const showTotalAmount = BOOKING_CONSTANT?.NEGATIVE_BOOKING_STATUS?.includes(
    bookingConfirmationResponse?.booking_status?.toLowerCase(),
  )

  async function fetchHotelData(hotelId?: any) {
    let response = await fetchConfirmRoomData(hotelId)
    setHotelResponse(response)
  }

  useEffect(() => {
    fetchHotelData(bookingConfirmationResponse?.hotelId)
    bookingConfirmationResponse?.hotelId && setHotelBannerData(bookingConfirmationResponse?.hotelId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingConfirmationResponse?.hotelId])

  useEffect(() => {
    if (bookingConfirmationResponse?.booking_status === "CONFIRMED" && hotelResponse) {
      !isModified &&
        handlePurchase(
          "purchase",
          bookingFlowPageStore,
          codes,
          bookingConfirmationResponse,
          dataLayer,
          hotelDataLayer,
          hotelResponse,
          address,
          getItem,
          adults,
          children,
          rooms,
          checkInDate,
          presentDate,
          currencyCode,
          checkOutDate,
          epochTimeCreated,
        )
      isModified &&
        handleModifiedBooking(
          "booking_modification",
          dataLayer,
          hotelDataLayer,
          address,
          hotelResponse,
          getItem,
          bookingConfirmationResponse,
          epochTimeCreated,
        )
      isModified &&
        handleModifiedPurchase(
          "refund",
          bookingConfirmationResponse,
          isModified,
          dataLayer,
          hotelDataLayer,
          hotelResponse,
          address,
          getItem,
          rooms,
          checkInDate,
          presentDate,
          currencyCode,
          checkOutDate,
          codes,
        )
      isModified &&
        handleModifiedPurchase(
          "purchase",
          bookingConfirmationResponse,
          isModified,
          dataLayer,
          hotelDataLayer,
          hotelResponse,
          address,
          getItem,
          rooms,
          checkInDate,
          presentDate,
          currencyCode,
          checkOutDate,
          codes,
        )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingConfirmationResponse?.booking_status, hotelResponse])

  //* to disable scroll when share modal is open
  useEffect(() => {
    if (openShare) {
      document.body.classList.add("disable-scroll")
    } else {
      document.body.classList.remove("disable-scroll")
    }
  }, [openShare])

  const RoomDetailsInfo = ({ roomData, index }: any) => {
    const room = roomData?.modifyBooking ? roomData?.modifyBooking : roomData
    return (
      <Box key={index}>
        <StatusBox>
          {isMobile ? (
            <>
              <Typography variant="m-body-s">{`Room ${room?.roomNumber} ${
                isModified ? `Booking Number: ${room?.booking_number}` : ""
              }`}</Typography>
              <Typography variant="m-body-s">{room?.booking_status}</Typography>
            </>
          ) : (
            <>
              <Typography variant="body-ml">{`Room ${room?.roomNumber} Booking Number: ${room?.booking_number}`}</Typography>
              <Typography variant="body-ml">{room?.booking_status}</Typography>
            </>
          )}
        </StatusBox>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
          }}>
          <StyledImage
            component="img"
            src={room?.modifyBooking?.roomImgUrl || (room?.roomImgUrl && urlFor(room?.roomImgUrl).url())}
            alt="img"
          />
          <ContentMainBox aria-label="yes">
            <FlexBox>
              <BoldTypography variant={isMobile ? "m-body-l" : "body-l"}>{room?.room_name}</BoldTypography>
              <BoldTypography variant={isMobile ? "m-body-l" : "body-l"} sx={{ margin: isMobile ? "1.250vw 0vw" : "" }}>
                {bookingConfirmationResponse?.hotelName}
              </BoldTypography>
              {((isMobile && isModified) || !isMobile) && (
                <Typography variant={isMobile ? "m-body-s" : "body-s"} sx={{ mt: "0.26vw" }}>
                  {`${Pluralize("Night", room?.noOfNights, false)}, ${formatDateWithMON(
                    room?.check_in,
                  )} to ${formatDateWithMON(room?.check_out)}, ${Pluralize("Adult", room?.adults, false)}${
                    Pluralize("Child", room?.children, false) !== undefined
                      ? `, ${Pluralize("Child", room?.children, false)}`
                      : ""
                  }`}
                </Typography>
              )}
            </FlexBox>
            {!isModified && (
              <>
                {isMobile ? (
                  <Stack gap="1.250vw">
                    <>
                      <Typography
                        variant={"m-body-s"}>{`Guest: ${bookingConfirmationResponse?.guest_name}`}</Typography>
                      <Typography variant={"m-body-s"}>{room?.guest_information?.email}</Typography>
                      <Typography variant={"m-body-s"}>{room?.guest_information?.phn_number}</Typography>
                      <Typography variant={"m-body-s"}>{`Booking Number:${room?.booking_number}`}</Typography>
                    </>
                    <Typography variant={"m-body-s"}>
                      {`${Pluralize("Night", room?.noOfNights, false)}, ${formatDateWithMON(
                        room?.check_in,
                      )} to ${formatDateWithMON(room?.check_out)}, ${Pluralize(
                        "Adult",
                        room?.modifyBooking?.adults || room?.adults,
                        false,
                      )}${
                        Pluralize("Child", room?.modifyBooking?.children || room?.children, false) !== undefined
                          ? `, ${Pluralize("Child", room?.modifyBooking?.children || room?.children, false)}`
                          : ""
                      }`}
                    </Typography>
                  </Stack>
                ) : (
                  <>
                    <LabelBoldTypography>{BOOKING_CONSTANT.GUEST_INFO}</LabelBoldTypography>
                    <FlexBox
                      sx={{
                        gap: "0.26vw",
                        marginTop: "0.26vw",
                      }}>
                      <Typography variant="body-s">{bookingConfirmationResponse?.guest_name}</Typography>
                      <Typography variant="body-s">{room?.guest_information?.email}</Typography>
                      {/* currently hardcoding the country code, once we get it from BE we have to remove it */}
                      <Typography variant="body-s">{room?.guest_information?.phn_number}</Typography>
                    </FlexBox>
                  </>
                )}
              </>
            )}
            {!isModified && <StyledDivider />}
            <>
              <LabelBoldTypography>{BOOKING_CONSTANT.PACKAGE}</LabelBoldTypography>
              <DetailsBox>
                <Typography
                  variant={isMobile ? "m-body-m" : "body-m"}
                  sx={{ mt: "0.36vw", maxWidth: MobilePxToVw(300) }}>
                  {room?.packageData?.package_name}
                </Typography>
                {!isComplementary && (
                  <Typography variant={isMobile ? "m-body-m" : "body-ml"}>
                    {currency2DecimalSymbol(room?.packageData?.package_amount, currencyCode)}
                  </Typography>
                )}
              </DetailsBox>
            </>
            <CtaLabelTypo
              component="div"
              variant={isMobile ? "m-text-link" : "link-m"}
              onClick={() => {
                modalStore?.setPropertyData({
                  title: room?.packageName,
                  cancellationPolicy: room?.cancelPolicyDescription,
                  guaranteePolicy: room?.bookingPolicyDescription,
                  shortDescription: room?.description,
                  longDescription: room?.detailedDescription,
                  price: isComplementary
                    ? bookingConfirmationResponse?.paidAmount || 0
                    : room?.packageData?.package_amount,
                  currencyCode: currencyCode,
                })
                navigate(props?.parameterMap?.[0]?.value, PathType?.dialog)
              }}>
              {isModified ? BOOKING_CONSTANT?.CANCELLATION_POLICY : BOOKING_CONSTANT?.RATE_DETAILS}
            </CtaLabelTypo>
            {room?.bookingPolicyDescription && (
              <Typography
                component="div"
                variant={isMobile ? "m-body-m" : "body-m"}
                marginTop={isMobile ? MobilePxToVw(10) : DesktopPxToVw(10)}>
                {room?.bookingPolicyDescription}
              </Typography>
            )}
            {isComplementary ? (
              <>
                {isModified && Boolean(roomData?.changeTax >= 0 || roomData?.changeTax < 0) && (
                  <>
                    <Divider
                      sx={{
                        mt: isMobile ? MobilePxToVw(20) : DesktopPxToVw(20),
                      }}
                    />
                    <LabelBoldTypography>{BOOKING_CONSTANT?.CHANGE_FEE}</LabelBoldTypography>
                    <DetailsBox>
                      <Typography variant={isMobile ? "m-body-m" : "body-m"} sx={{ mt: "0.36vw" }}>
                        {BOOKING_CONSTANT?.PRICE_CHANGE}
                      </Typography>
                      <Typography
                        lineHeight={"150%"}
                        color={
                          roomData?.changeTax < 0
                            ? theme.palette.ihclPalette.hexTwo
                            : theme.palette.ihclPalette.hexTwentyFour
                        }
                        variant={isMobile ? "m-body-m" : "body-ml"}>
                        {roomData?.changeTax >= 0
                          ? roomData?.changeTax > 0
                            ? formatCurrencyWithPlus(roomData?.changeTax, currencyCode)
                            : currency2DecimalSymbol(roomData?.changeTax, currencyCode)
                          : formatCurrencyWithMinus(roomData?.changeTax, currencyCode)}
                      </Typography>
                    </DetailsBox>
                  </>
                )}
              </>
            ) : (
              <>
                {isModified && Boolean(roomData?.changePrice >= 0 || roomData?.changePrice < 0) && (
                  <>
                    <Divider
                      sx={{
                        mt: isMobile ? MobilePxToVw(20) : DesktopPxToVw(20),
                      }}
                    />
                    <LabelBoldTypography>{BOOKING_CONSTANT?.CHANGE_FEE}</LabelBoldTypography>
                    <DetailsBox>
                      <Typography variant={isMobile ? "m-body-m" : "body-m"} sx={{ mt: "0.36vw" }}>
                        {BOOKING_CONSTANT?.PRICE_CHANGE}
                      </Typography>
                      <Typography
                        lineHeight={"150%"}
                        color={
                          roomData?.changePrice < 0
                            ? theme.palette.ihclPalette.hexTwo
                            : theme.palette.ihclPalette.hexTwentyFour
                        }
                        variant={isMobile ? "m-body-m" : "body-ml"}>
                        {roomData?.changePrice >= 0
                          ? roomData?.changePrice > 0
                            ? formatCurrencyWithPlus(roomData?.changePrice, currencyCode)
                            : currency2DecimalSymbol(roomData?.changePrice, currencyCode)
                          : formatCurrencyWithMinus(roomData?.changePrice, currencyCode)}
                      </Typography>
                    </DetailsBox>
                  </>
                )}
              </>
            )}
          </ContentMainBox>
        </Box>
      </Box>
    )
  }

  return showComponents?.showRoomDetails ? (
    <>
      <MainBox sx={{ position: "relative" }} aria-label="BookingConfirmedRoomDetails">
        <Typography sx={{ color: theme?.palette?.text?.primary }} variant={isMobile ? "m-heading-s" : "heading-xs"}>
          {props?.title}
        </Typography>
        {roomsData?.map((room: any, index: number) => (
          <RoomDetailsInfo key={index} roomData={room} index={index} />
        ))}
        <StyledDivider sx={{ marginBottom: "2.24vw" }} />
        {/* ==========================================================Payment break up========================================================== */}
        <Stack
          aria-label="Payment break up"
          sx={{
            justifyContent: isModified ? "space-between" : "flex-end",
            flexDirection: isModified ? "column" : isMobile ? "column" : "row",
            alignItems: isModified ? "unset" : isMobile ? "unset" : "flex-end",
            gap: isModified ? "unset" : isMobile ? MobilePxToVw(10) : DesktopPxToVw(150),
          }}>
          <PriceDetailsMainBox
            alignItems={isModified ? "unset !important" : "center"}
            justifyContent={isModified ? "space-between !important" : "flex-end"}>
            <Stack flexDirection={"column"} justifyContent={"space-between"}>
              {isModified && !isMobile && (
                <Typography
                  maxWidth={isMobile ? "unset" : DesktopPxToVw(690)}
                  component="div"
                  variant={isMobile ? "m-body-m" : "body-ml"}>
                  {isPayAtHotel
                    ? BOOKING_CONSTANT?.PAYABLE_DESCRIPTION
                    : bookingConfirmationResponse?.totalPriceChange >= 0
                    ? BOOKING_CONSTANT?.PAYABLE_DESCRIPTION
                    : BOOKING_CONSTANT?.REFUND_DESCRIPTION}
                </Typography>
              )}
              {isModified && accessToken && (
                <Stack
                  flexDirection={"row"}
                  alignItems={"center"}
                  columnGap={isMobile ? MobilePxToVw(7) : DesktopPxToVw(7)}
                  onClick={() => {
                    navigate(ROUTES?.WITHOUTSEO_FOR_ROUTING?.MY_ACCOUNT?.OVERVIEW)
                  }}>
                  <Box
                    height={isMobile ? MobilePxToVw(9) : DesktopPxToVw(9)}
                    component={"img"}
                    alt="left-arrow"
                    src={"../left-arrow.svg"}
                  />
                  <Typography variant={isMobile ? "m-link-m" : "link-m"}>
                    {BOOKING_CONSTANT?.BACK_TO_ACCOUNT}
                  </Typography>
                </Stack>
              )}
            </Stack>
            <Box sx={{ width: isMobile ? "100%" : "inherit" }}>
              {bookingConfirmationResponse?.oldTotalBasePrice >= 0 && isModified && (
                <PriceDetailsBox mb={isMobile ? MobilePxToVw(20) : DesktopPxToVw(20)}>
                  <TaxLabelStack onClick={() => setShowOriginalPrice(!showOriginalPrice)} sx={{ cursor: "pointer" }}>
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
                  <BoldTypo variant={isMobile ? "m-body-sxl" : "body-ml"}>
                    {currency2DecimalSymbol(
                      isComplementary ? 0 : bookingConfirmationResponse?.oldGrandTotal,
                      currencyCode,
                    )}
                  </BoldTypo>
                </PriceDetailsBox>
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
                    rooms={bookingConfirmationResponse?.rooms}
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
                    rooms={bookingConfirmationResponse?.rooms}
                    labelName={""}
                    labelKey={"tax"}
                    currencyCode={currencyCode}
                  />
                </Stack>
              </Collapse>
              {/* NEW PRICE/ PRICE */}
              {bookingConfirmationResponse?.totalBasePrice >= 0 && (
                <PriceDetailsBox mb={isMobile ? MobilePxToVw(20) : DesktopPxToVw(20)}>
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
                  <BoldTypo variant={isMobile ? "m-body-sxl" : "body-ml"}>
                    {currency2DecimalSymbol(
                      isComplementary
                        ? 0
                        : isModified
                        ? bookingConfirmationResponse?.totalBasePrice + bookingConfirmationResponse?.totalTaxPrice
                        : bookingConfirmationResponse?.totalBasePrice,
                      currencyCode,
                    )}
                  </BoldTypo>
                </PriceDetailsBox>
              )}
              <Collapse
                in={showPrice}
                sx={{
                  paddingBottom: showPrice ? "0.86vw" : "0vw",
                }}>
                <Stack rowGap={DesktopPxToVw(6)}>
                  {isModified && (
                    <BoldTypo variant={isMobile ? "m-body-m" : "body-m"}>{BOOKING_CONSTANT?.PRICE}</BoldTypo>
                  )}
                  <RenderListItems
                    rooms={bookingConfirmationResponse?.rooms}
                    isModified={isModified ? true : false}
                    labelName={""}
                    labelKey={isComplementary ? "" : "amount"}
                    currencyCode={currencyCode}
                  />
                  {isModified && (
                    <>
                      <BoldTypo variant={isMobile ? "m-body-m" : "body-m"}>{BOOKING_CONSTANT?.TAX_AND_FEES}</BoldTypo>
                      <RenderListItems
                        isModified={true}
                        rooms={bookingConfirmationResponse?.rooms}
                        labelName={""}
                        labelKey={"tax"}
                        currencyCode={currencyCode}
                      />
                    </>
                  )}
                </Stack>
              </Collapse>
              <Stack
                rowGap={isMobile ? MobilePxToVw(20) : DesktopPxToVw(20)}
                mb={isModified ? (isMobile ? MobilePxToVw(20) : DesktopPxToVw(20)) : 0}>
                {isComplementary ? (
                  <>
                    {isModified && (Boolean(taxChange) || taxChange == 0) && (
                      <PriceContainer>
                        <Typography variant={isMobile ? "m-body-m" : "body-m"}>
                          {BOOKING_CONSTANT?.TOTAL_TAX_CHANGE}
                        </Typography>
                        <Typography
                          variant={isMobile ? "m-body-sxl" : "body-ml"}
                          lineHeight={"150%"}
                          whiteSpace={"nowrap"}
                          color={
                            taxChange < 0 ? theme.palette.ihclPalette.hexTwo : theme.palette.ihclPalette.hexTwentyFour
                          }>
                          {taxChange >= 0
                            ? taxChange > 0
                              ? formatCurrencyWithPlus(taxChange, currencyCode)
                              : currency2DecimalSymbol(taxChange, currencyCode)
                            : formatCurrencyWithMinus(taxChange, currencyCode)}
                        </Typography>
                      </PriceContainer>
                    )}
                  </>
                ) : (
                  <>
                    {isModified && (Boolean(priceChange) || priceChange == 0) && (
                      <PriceContainer>
                        <Typography variant={isMobile ? "m-body-m" : "body-m"}>
                          {isComplementary
                            ? BOOKING_CONSTANT?.TOTAL_TAX_CHANGE
                            : isPayAtHotel
                            ? BOOKING_CONSTANT?.DIFFERENCE
                            : BOOKING_CONSTANT?.TOTAL_PRICE_CHANGE}
                        </Typography>
                        <Typography
                          variant={isMobile ? "m-body-sxl" : "body-ml"}
                          lineHeight={"150%"}
                          whiteSpace={"nowrap"}
                          color={
                            priceChange < 0 ? theme.palette.ihclPalette.hexTwo : theme.palette.ihclPalette.hexTwentyFour
                          }>
                          {priceChange >= 0
                            ? priceChange > 0
                              ? formatCurrencyWithPlus(priceChange, currencyCode)
                              : currency2DecimalSymbol(priceChange, currencyCode)
                            : formatCurrencyWithMinus(priceChange, currencyCode)}
                        </Typography>
                      </PriceContainer>
                    )}
                  </>
                )}
                {bookingConfirmationResponse?.amountPaid >= 0 && !isPayAtHotel && isModified && (
                  <PriceContainer>
                    <Typography variant={isMobile ? "m-body-m" : "body-m"}>
                      {BOOKING_CONSTANT?.AMOUNT_PAID_PREVIOUSLY}
                    </Typography>
                    <Typography variant={isMobile ? "m-body-sxl" : "body-ml"}>
                      {currency2DecimalSymbol(bookingConfirmationResponse?.amountPaid, currencyCode)}
                    </Typography>
                  </PriceContainer>
                )}
                {bookingConfirmationResponse?.paymentBreakup?.member_discount && (
                  <PriceDetailsBox>
                    <Typography variant={isMobile ? "m-body-m" : "body-m"}>
                      {BOOKING_CONSTANT.MEMBER_DISCOUNT}
                    </Typography>
                    <Typography variant={isMobile ? "m-body-sxl" : "body-ml"}>
                      {bookingConfirmationResponse?.paymentBreakup?.member_discount}
                    </Typography>
                  </PriceDetailsBox>
                )}
                {bookingConfirmationResponse?.paymentBreakup?.add_ons && (
                  <PriceDetailsBox>
                    <Typography variant={isMobile ? "m-body-m" : "body-m"}>{BOOKING_CONSTANT.ADD_ONS}</Typography>
                    <Typography variant={isMobile ? "m-body-sxl" : "body-ml"}>
                      {bookingConfirmationResponse?.paymentBreakup?.add_ons}
                    </Typography>
                  </PriceDetailsBox>
                )}
                {bookingConfirmationResponse?.paymentBreakup?.voucher_discount && (
                  <PriceDetailsBox>
                    <Typography variant={isMobile ? "m-body-m" : "body-m"}>
                      {BOOKING_CONSTANT.VOUCHER_DISCOUNT}
                    </Typography>
                    <Typography variant={isMobile ? "m-body-sxl" : "body-ml"}>
                      {bookingConfirmationResponse?.paymentBreakup?.voucher_discount}
                    </Typography>
                  </PriceDetailsBox>
                )}
              </Stack>
              {bookingConfirmationResponse?.paymentBreakup?.taxes_and_fees && !isModified && (
                <>
                  {currencyCode?.toUpperCase() !== "GBP" && (
                    <PriceContainer mb={isMobile ? MobilePxToVw(20) : DesktopPxToVw(20)}>
                      <TaxLabelStack onClick={() => setShowTax(!showTax)} sx={{ cursor: "pointer" }}>
                        <BoldTypo variant={isMobile ? "m-body-m" : "body-m"} sx={{ textDecoration: "underline" }}>
                          {BOOKING_CONSTANT.TAX_AND_FEES}
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
                      <BoldTypo variant={isMobile ? "m-body-sxl" : "body-ml"}>
                        {currency2DecimalSymbol(
                          bookingConfirmationResponse?.totalTaxPrice ||
                            bookingConfirmationResponse?.paymentBreakup?.taxes_and_fees?.taxAmount,
                          currencyCode,
                        )}
                      </BoldTypo>
                    </PriceContainer>
                  )}
                  <Collapse in={showTax}>
                    <Stack
                      flexDirection={"column"}
                      gap={isMobile ? MobilePxToVw(8) : DesktopPxToVw(10)}
                      mb={isMobile ? MobilePxToVw(20) : DesktopPxToVw(20)}>
                      <RenderListItems
                        rooms={bookingConfirmationResponse?.rooms}
                        labelName={`(${currencyCode === "INR" ? BOOKING_CONSTANT.GST_LABEL : currencyCode})`}
                        isModified={false}
                        labelKey={"tax"}
                        currencyCode={currencyCode}
                      />
                    </Stack>
                  </Collapse>
                </>
              )}
              <Stack flexDirection={"column"} rowGap={isMobile ? MobilePxToVw(5) : DesktopPxToVw(20)}>
                {(bookingConfirmationResponse?.paymentBreakup?.neuCoins_redemption > 0 ||
                  bookingConfirmationResponse?.totalCouponDiscountValue ||
                  bookingConfirmationResponse?.paymentBreakup?.giftCard_redemption > 0) &&
                  bookingConfirmationResponse?.paymentBreakup?.total && (
                    <PriceDetailsBox>
                      <Typography aria-label="total-amount" variant={isMobile ? "m-body-m" : "body-m"}>
                        {BOOKING_CONSTANT?.TOTAL_AMOUNT}
                      </Typography>
                      <Typography variant={isMobile ? "m-body-sxl" : "body-ml"}>
                        {currency2DecimalSymbol(bookingConfirmationResponse?.paymentBreakup?.total, currencyCode)}
                      </Typography>
                    </PriceDetailsBox>
                  )}
                {bookingConfirmationResponse?.paymentBreakup?.neuCoins_redemption > 0 && (
                  <PriceDetailsBox>
                    <Typography variant={isMobile ? "m-body-m" : "body-m"}>
                      {bookingConfirmationResponse?.paymentBreakup?.neuCoins_redemption == 1
                        ? `${BOOKING_CONSTANT?.NEUCOIN} Redeemed`
                        : `${BOOKING_CONSTANT?.NEUCOIN}s Redeemed`}
                    </Typography>
                    <Typography variant={isMobile ? "m-body-sxl" : "body-ml"}>
                      {`- ${Math.round(bookingConfirmationResponse?.paymentBreakup?.neuCoins_redemption)}`}
                    </Typography>
                  </PriceDetailsBox>
                )}
                {bookingConfirmationResponse?.paymentBreakup?.giftCard_redemption &&
                  bookingConfirmationResponse?.paymentBreakup?.giftCard_redemption > 0 && (
                    <PriceDetailsBox>
                      <Typography aria-label="gift-card" variant={isMobile ? "m-body-m" : "body-m"}>
                        {BOOKING_CONSTANT?.GC_REDEEMED}
                      </Typography>
                      <Typography variant={isMobile ? "m-body-sxl" : "body-ml"}>
                        {formatCurrencyWithMinus(
                          bookingConfirmationResponse?.paymentBreakup?.giftCard_redemption,
                          currencyCode,
                        )}
                      </Typography>
                    </PriceDetailsBox>
                  )}
                {bookingConfirmationResponse?.promoType?.toLowerCase() === "coupon" && (
                  <PriceDetailsBox sx={{ mb: "0vw" }}>
                    <Typography variant={isMobile ? "m-body-m" : "body-m"}>
                      {BOOKING_CONSTANT?.COUPON_DISCOUNT}
                    </Typography>
                    <Typography variant={isMobile ? "m-body-m" : "body-m"}>
                      {currency2DecimalSymbol(bookingConfirmationResponse?.totalCouponDiscountValue || 0, currencyCode)}
                    </Typography>
                  </PriceDetailsBox>
                )}
                {bookingConfirmationResponse?.cancelPayableAmount >= 0 && isModified && (
                  <>
                    {currencyCode?.toUpperCase() !== "GBP" && (
                      <PriceContainer>
                        <TaxLabelStack
                          onClick={() =>
                            bookingConfirmationResponse?.cancelPayableAmount !== 0 && setShowCharges(!showCharges)
                          }
                          sx={{
                            cursor: bookingConfirmationResponse?.cancelPayableAmount !== 0 ? "pointer" : "auto",
                          }}>
                          <Typography variant={isMobile ? "m-body-m" : "body-m"}>
                            {BOOKING_CONSTANT.CANCELLATION_CHARGES}
                          </Typography>
                          {bookingConfirmationResponse?.cancelPayableAmount !== 0 && (
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
                        <Typography variant={isMobile ? "m-body-sxl" : "body-ml"}>
                          {bookingConfirmationResponse?.cancelPayableAmount == 0
                            ? "NIL"
                            : currency2DecimalSymbol(
                                bookingConfirmationResponse?.cancelPayableAmount || 0,
                                currencyCode,
                              )}
                        </Typography>
                      </PriceContainer>
                    )}
                    {bookingConfirmationResponse?.cancelPayableAmount !== 0 && (
                      <Collapse in={showCharges}>
                        <Stack flexDirection={"column"} gap={isMobile ? MobilePxToVw(8) : DesktopPxToVw(10)}>
                          {bookingConfirmationResponse?.rooms?.map((room: any, index: number) => (
                            <PriceContainer key={index}>
                              <Typography variant={isMobile ? "m-body-m" : "body-m"}>
                                {`Room ${room?.roomNumber}`}
                              </Typography>
                              <Typography variant={isMobile ? "m-body-sxl" : "body-ml"}>
                                {room?.cancelPayableAmount == 0
                                  ? "NIL"
                                  : currency2DecimalSymbol(room?.cancelPayableAmount, currencyCode)}
                              </Typography>
                            </PriceContainer>
                          ))}
                        </Stack>
                      </Collapse>
                    )}
                  </>
                )}
                {bookingConfirmationResponse?.paymentBreakup?.total && (
                  <PriceDetailsBox alignItems={"start !important"} aria-label="dynamic-label" sx={{ mb: "0vw" }}>
                    <DynamicText
                      sx={{
                        whiteSpace: isMobile ? "unset !important" : "wrap",
                      }}
                      $isSmallSize={true}
                      $isSmall={
                        bookingConfirmationResponse?.balancePayable > 0 &&
                        !isModified &&
                        bookingConfirmationResponse?.isDepositPaid
                      }>
                      {isModified
                        ? isPayAtHotel
                          ? BOOKING_CONSTANT?.PAYABLE_AMOUNT
                          : bookingConfirmationResponse?.totalPriceChange >= 0
                          ? BOOKING_CONSTANT?.PAYABLE_AMOUNT
                          : BOOKING_CONSTANT?.REFUNDABLE_AMOUNT
                        : isPayAtHotel
                        ? BOOKING_CONSTANT?.AMOUNT_PAYABLE_AT_HOTEL
                        : isComplementary
                        ? BOOKING_CONSTANT?.AMOUNT_PAID
                        : bookingConfirmationResponse?.isDepositPaid || showTotalAmount
                        ? BOOKING_CONSTANT?.TOTAL_AMOUNT
                        : bookingConfirmationResponse?.isDepositFull
                        ? BOOKING_CONSTANT?.DEPOSIT_PAID
                        : BOOKING_CONSTANT?.AMOUNT_PAID}
                    </DynamicText>
                    <DynamicText
                      $isSmall={
                        bookingConfirmationResponse?.balancePayable > 0 &&
                        !isModified &&
                        bookingConfirmationResponse?.isDepositPaid
                      }>
                      {currency2DecimalSymbol(
                        isModified
                          ? isPayAtHotel
                            ? bookingConfirmationResponse?.grandTotal
                            : bookingConfirmationResponse?.totalPriceChange >= 0
                            ? bookingConfirmationResponse?.payableAmount ||
                              bookingConfirmationResponse?.totalPriceChange
                            : bookingConfirmationResponse?.refundAmount || bookingConfirmationResponse?.totalPriceChange
                          : isPayAtHotel
                          ? bookingConfirmationResponse?.paymentBreakup?.payableAmount
                          : isComplementary
                          ? bookingConfirmationResponse?.amountPaid || 0
                          : bookingConfirmationResponse?.isDepositPaid ||
                            bookingConfirmationResponse?.isDepositFull ||
                            showTotalAmount
                          ? bookingConfirmationResponse?.paymentBreakup?.total
                          : bookingConfirmationResponse?.amountPaid,
                        currencyCode,
                      )}
                    </DynamicText>
                  </PriceDetailsBox>
                )}
                {isModified && isMobile && (
                  <Typography component="div" variant={isMobile ? "m-body-m" : "body-ml"}>
                    {isPayAtHotel
                      ? BOOKING_CONSTANT?.PAYABLE_DESCRIPTION
                      : bookingConfirmationResponse?.totalPriceChange >= 0
                      ? BOOKING_CONSTANT?.PAYABLE_DESCRIPTION
                      : BOOKING_CONSTANT?.REFUND_DESCRIPTION}
                  </Typography>
                )}
                {bookingConfirmationResponse?.amountPaid > 0 &&
                  bookingConfirmationResponse?.totalDepositAmount > 0 &&
                  bookingConfirmationResponse?.isDepositPaid &&
                  !isModified && (
                    <PriceDetailsBox sx={{ mb: "0vw" }} aria-label="deposit-amount">
                      <Typography variant={isMobile ? "m-body-m" : "body-m"}>
                        {BOOKING_CONSTANT?.DEPOSIT_PAID}
                      </Typography>
                      <Typography variant={isMobile ? "m-body-m" : "body-m"}>
                        {currency2DecimalSymbol(bookingConfirmationResponse?.totalDepositAmount, currencyCode)}
                      </Typography>
                    </PriceDetailsBox>
                  )}
                {bookingConfirmationResponse?.balancePayable > 0 &&
                  !isModified &&
                  bookingConfirmationResponse?.isDepositPaid && (
                    <PriceDetailsBox sx={{ mb: "0vw", gap: "0vw!important" }} aria-label="balance-payable">
                      <BoldTypography variant={isMobile ? "m-body-sl" : "body-ml"}>
                        {BOOKING_CONSTANT?.BALANCE_PAYABLE_AT_HOTEL}
                      </BoldTypography>
                      <BoldTypography variant={isMobile ? "m-body-sl" : "body-ml"}>
                        {currency2DecimalSymbol(bookingConfirmationResponse?.balancePayable, currencyCode)}
                      </BoldTypography>
                    </PriceDetailsBox>
                  )}
              </Stack>
              {!isMobile && (
                <StyledDivider
                  sx={{
                    height: "0.10vw !important",
                  }}
                />
              )}
              <ButtonsBox>
                <PDFGenerator
                  downloadButton={
                    <Button
                      variant={isModified ? "light-outlined" : "light-contained"}
                      sx={{ "& .MuiButton-startIcon": { height: "100%" } }}
                      startIcon={
                        <Box
                          sx={{
                            paddingRight: isMobile ? MobilePxToVw(0) : DesktopPxToVw(9),
                          }}
                          minWidth={isMobile ? "auto" : "100%"}
                          alt="mail-icon"
                          component={"img"}
                          src={isModified ? ICONS.GOLD_DOWNLOAD_ICON : ICONS?.WHITE_DOWNLOAD_ICON}
                        />
                      }>
                      {BOOKING_CONSTANT.DOWNLOAD}
                    </Button>
                  }
                  type="download"
                  PDFData={<BookingPrintComponent isDownload={true} bookingPrintData={bookingConfirmationResponse} />}
                  fileNameForUrl={`${bookingConfirmationResponse?.hotelName}_Reservation_Confirmation_${bookingConfirmationResponse?.itinerary_number}`}
                />
                <GeneratePDFPrint
                  page={"booking"}
                  bookingPrintData={bookingConfirmationResponse}
                  buttonVariant={isModified ? "light-outlined" : "light-contained"}
                />
                <Button
                  variant={isModified ? "light-outlined" : "light-contained"}
                  sx={{ "& .MuiButton-startIcon": { height: "100%" } }}
                  onClick={() => {
                    setOpenShare(true)
                  }}
                  startIcon={isModified ? <GoldMailShareIcon /> : <ConfirmationMailShareIcon />}>
                  {BOOKING_CONSTANT.SHARE}
                </Button>
                {openShare && (
                  <BookingDetailsShare
                    openShare={openShare}
                    setOpenShare={setOpenShare}
                    data={bookingConfirmationResponse}
                  />
                )}
              </ButtonsBox>
            </Box>
          </PriceDetailsMainBox>
        </Stack>
      </MainBox>
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: isMobile ? "center" : "start",
          mt: isMobile ? MobilePxToVw(40) : DesktopPxToVw(40),
        }}>
        <CtaLabelTypo
          sx={{ margin: "0vw !important " }}
          variant={isMobile ? "m-text-link" : "link-m"}
          onClick={() => navigate(props?.primaryAction?.url, props?.primaryAction?.urlType)}>
          {props?.primaryAction?.title}
        </CtaLabelTypo>
        <Divider
          sx={{
            width: "0.05vw",
            margin: "0.2vw  0.8vw",
            background: theme?.palette?.ihclPalette?.hexTwo,
            "@media (max-width: 640px)": {
              margin: "0.2vw 4vw",
            },
          }}
        />
        <CtaLabelTypo
          sx={{ margin: "0vw !important" }}
          variant={isMobile ? "m-text-link" : "link-m"}
          onClick={() => navigate(props?.secondaryAction?.url, props?.secondaryAction?.urlType)}>
          {props?.secondaryAction?.title}
        </CtaLabelTypo>
      </Stack>
    </>
  ) : (
    <></>
  )
}
export default observer(BookingConfirmedRoomDetails)
