import React, { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { theme } from "../../../lib/theme"
import { CONSTANTS } from "../../constants"
import CallIcon from "@mui/icons-material/Call"
import Pluralize from "../../../utils/pluralize"
import EmailIcon from "@mui/icons-material/Email"
import { getClient, urlFor } from "../../../lib-sanity"
import { useMobileCheck } from "../../../utils/isMobilView"
import { formatDateWithMON } from "../../../utils/getDate"
import { currency2DecimalSymbol } from "../../../utils/currency"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import { fetchHighlightedCardData } from "../../../utils/fetchRoomData"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { Box, ClickAwayListener, Collapse, Divider, Grid, Tooltip, Typography } from "@mui/material"
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined"
import { EDIT_ICON, TOOL_TIP_ICON, EMAIL_SHARE_ICON, DISABLED_EDIT_ICON } from "../../forms/gift-card-form/constants"
import {
  ModalBox,
  HotelName,
  AmountText,
  BoxWrapper,
  StatusText,
  GuestTitle,
  RoomDetails,
  UserOptions,
  GuestDetails,
  PriceWrapper,
  StyledImages,
  BoxContainer,
  ModifyBooking,
  ContentWrapper,
  TextTypography,
  BookingsWrapper,
  AmountTypography,
  DetailsContainer,
  IconsBoxContainer,
  UserDataContainer,
  UserOptionsContainer,
  BookingDetailsGrid,
  HotelGuestInfoContainer,
  GuestDetailsGrid,
  FlexDirectionToggler,
  FullBox,
  UserOptionText,
  MobileViewDetailsContainer,
  RoomDetailsSection,
  BoldText,
  InlineText,
  DetailsStack,
  StackContainer,
} from "./booking-styles"
import data from "./booking-json.json"
import { groq } from "next-sanity"
import { CheckInCheckOUtContainer } from "./room-details.styles"
import { useImageUtility } from "../../../utils/hooks/useImageUtility"

const RoomsDetails = dynamic(() => import("./room-details"))
const PrintPdf = dynamic(() => import("../../GeneratePdfPrint/render-pdf-print.component"))
const BookingDetailsShare = dynamic(() => import("../../../features/my-account/ui/booking-details-share.component"))

const Bookings = ({ bookingData, primaryAction, secondaryAction, isPastBooking = false }: any) => {
  //? isPastBooking value is using to hide the pay now and modify buttons in the past booking details card
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const { getOptimizeImageUrl } = useImageUtility()

  const [hotelData, setHotelData] = useState<any>()
  const [hotelImage, setHotelImage] = useState<any>()
  const [openShare, setOpenShare] = useState<boolean>(false)
  const [viewDetails, setViewDetails] = useState<boolean>(false)

  const bookingDetails = bookingData?.orderLineItems?.[0]?.hotel

  const roomsData = bookingDetails?.rooms?.map((room: any) => {
    return room?.modifyBooking || room
  })
  const travelerData = roomsData?.[0]?.travellerDetails?.[0]
  const adultCount = bookingDetails?.adultCount
  const childCount = bookingDetails?.childrens
  const paidType = bookingData?.transactionStatus
  const bookingNumber = bookingDetails?.bookingNumber
  const checkInFormatted = bookingDetails?.checkIn?.length > 2 && formatDateWithMON(bookingDetails?.checkIn)
  const checkOutFormatted = bookingDetails?.checkOut?.length > 2 && formatDateWithMON(bookingDetails?.checkOut)
  const modifiableStatus = ["confirmed", "partially confirmed", "partially cancelled", "paid partially"]
  const disableModify = false
  // bookingData?.modifyBookingCount >= 2 ||
  // differenceInDays(
  //   new Date(),
  //   new Date(bookingDetails?.rooms?.[0]?.checkIn)
  // ) < 2
  const isPaymentSuccess = bookingData?.paymentStatus?.toLowerCase() === "charged"
  const isOrderCancelled = bookingDetails?.status?.toLowerCase() === "cancelled"
  const isOrderPending = bookingDetails?.status?.toLowerCase() === "pending"
  const isOrderPartiallyCancelled = bookingDetails?.status?.toLowerCase() === "partially cancelled"
  const isComplementary = bookingDetails?.voucherRedemption?.isComplementary
  const complementaryBasePrice = bookingDetails?.complementaryBasePrice
  const isSEB = bookingDetails?.isSEB
  const isModifiable = modifiableStatus?.includes(bookingDetails?.status?.toLowerCase()) && !isSEB

  const handelClick = () => {
    setViewDetails(!viewDetails)
  }

  useEffect(() => {
    if (bookingDetails?.hotelId) {
      const fetchCancellationReasons = async () => {
        const query = groq`
         *[_type == "hotel" && hotelId == "${bookingDetails?.hotelId}"]{
          "image":hotelOverview->.basicInfo.media[0].imageAsset }[0]
        `
        await getClient(true)
          .fetch(query)
          .then((data) => {
            setHotelImage(data?.image)
          })
      }
      fetchCancellationReasons()
    }
  }, [bookingDetails?.hotelId])

  useEffect(() => {
    async function fetchHotelInformationData() {
      let response = await fetchHighlightedCardData(bookingDetails?.hotelId, "hotelContact")
      if (response) {
        setHotelData(response)
      }
    }
    fetchHotelInformationData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const hotelPhoneNumber = hotelData?.hotelContact?.phone?.filter((item: any) => {
    return item?.type?.toLowerCase() === "business" && item?.mobile
  })

  return (
    <Box aria-label="Bookings">
      <BookingsWrapper container justifyContent={"space-between"}>
        <Grid item xs={12} sm={isMobile ? 12 : 3.25} md={3.25} lg={3.23} xl={3.23}>
          {hotelImage?.image[0]?.asset?._ref && hotelImage?.largeImage[0]?.asset?._ref && (
            <Box
              width="100%"
              height="100%"
              alt="-hotel img"
              component={"img"}
              src={getOptimizeImageUrl(
                urlFor(isMobile ? hotelImage?.image[0]?.asset?._ref : hotelImage?.largeImage[0]?.asset?._ref)?.url(),
                5,
              )}
              sx={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={isMobile ? 12 : 8.4} md={8.4} lg={8.4} xl={8.4} sx={{ padding: isMobile ? "5vw" : "" }}>
          {/* payment method */}
          <ContentWrapper sx={{ gap: isMobile ? 0 : DesktopPxToVw(10) }}>
            <BoxWrapper>
              {bookingNumber && (
                <FlexDirectionToggler rowGap={MobilePxToVw(3)}>
                  <Typography whiteSpace={"nowrap"} variant={isMobile ? "m-body-s" : "body-ml"}>
                    {isMobile ? data?.ItineraryNo : data?.itineraryNo}
                  </Typography>
                  <BoldText variant={isMobile ? "m-body-l" : "body-ml"}>{bookingNumber}</BoldText>
                </FlexDirectionToggler>
              )}
            </BoxWrapper>
            {/* need to remove later */}
            <Typography visibility={"hidden"}>{bookingData?.modifyBookingCount}</Typography>
            <BoxWrapper>
              <FlexDirectionToggler rowGap={MobilePxToVw(3)}>
                <Typography whiteSpace={"nowrap"} variant={isMobile ? "m-body-s" : "body-xxs"}>
                  {data?.PaymentMethod}
                </Typography>
                {!isMobile && <Typography variant={isMobile ? "m-body-sl" : "body-s"}>{":"}</Typography>}
                <BoldText $isWrap={true} variant={isMobile ? "m-body-sl" : "body-s"}>
                  {paidType ? paidType : data?.pending}
                </BoldText>
              </FlexDirectionToggler>
            </BoxWrapper>
          </ContentWrapper>
          <BookingDetailsGrid>
            <HotelGuestInfoContainer $isPartiallyCancelled={isOrderPartiallyCancelled}>
              {/* hotel details */}
              <FullBox>
                <HotelName variant={isMobile ? "m-heading-xs" : "heading-xs"}>{bookingDetails?.name}</HotelName>
              </FullBox>
              {/* {bookingData} */}
              <CheckInCheckOUtContainer>
                <RoomDetails variant={isMobile ? "m-body-s" : "body-s"}>
                  {bookingDetails?.roomCount > 0 && `${Pluralize("Room", bookingDetails?.roomCount, false)} - `}
                  {bookingDetails?.bookingNoOfNights > 0 &&
                    `${Pluralize("Night", bookingDetails?.bookingNoOfNights, false)}`}
                  {checkInFormatted && checkOutFormatted && `, ${checkInFormatted} to ${checkOutFormatted}`}
                  {adultCount > 0 ? `, ${Pluralize("Adult", adultCount, false)}` : ""}
                  {bookingDetails?.childrens > 0 && `, ${Pluralize("Child", childCount, false)}`}
                </RoomDetails>
              </CheckInCheckOUtContainer>
              {/* customer details */}
              <DetailsContainer>
                {/* Hotel email and hotel Mobile Number are static  */}
               {hotelData?.hotelContact?.email?.[0]?.email &&
                <BoxContainer>
                  <EmailIcon
                    sx={{
                      width: isMobile ? "2.656vw" : "1.2vw",
                      height: "auto",
                      color: theme?.palette?.neuPalette?.hexSeventeen,
                    }}
                  />
                  <CustomTooltip tooltipTitle={hotelData?.hotelContact?.email?.[0]?.email} tooltipPlacement={"top-end"}>
                    <InlineText variant={isMobile ? "m-body-s" : "body-s"}>
                      {hotelData?.hotelContact?.email?.[0]?.email}
                    </InlineText>
                  </CustomTooltip>
                </BoxContainer>
                }
                {hotelPhoneNumber?.[0]?.mobile && (
                  <BoxContainer sx={{ paddingLeft: "0.5vw" }}>
                    <CallIcon
                      sx={{
                        width: isMobile ? "2.656vw" : "1.2vw",
                        height: "auto",
                        color: theme?.palette?.neuPalette?.hexSeventeen,
                      }}
                    />
                    <InlineText variant={isMobile ? "m-body-s" : "body-s"}>
                      {hotelPhoneNumber?.[0]?.mobile}
                    </InlineText>
                  </BoxContainer>
                )}
              </DetailsContainer>
            </HotelGuestInfoContainer>

            <PriceWrapper>
              <AmountTypography
                variant={isMobile ? "m-body-s" : "body-s"}
                fontWeight={isMobile ? 700 : 300}
                lineHeight={isMobile ? "5.25vw" : "1.75vw"}>
                {isOrderCancelled ? data?.refund : isMobile ? data?.priceAmountCaps : data?.price}
              </AmountTypography>
              <AmountText variant={isMobile ? "m-heading-s" : "heading-xs"}>
                {currency2DecimalSymbol(
                  isOrderCancelled
                    ? bookingDetails?.totalCancelRefundableAmount
                    : isComplementary
                    ? bookingDetails?.amountPaid || complementaryBasePrice
                    : bookingDetails?.grandTotal,
                  bookingDetails?.rooms?.[0]?.currency,
                )}
              </AmountText>
              <Box sx={{ textAlign: "end" }}>
                <StatusText
                  $check={isOrderPending || isOrderCancelled ? true : false}
                  variant={isMobile ? "m-body-l" : "body-l"}>
                  {bookingDetails?.status}
                </StatusText>
              </Box>
            </PriceWrapper>
          </BookingDetailsGrid>
          <GuestDetailsGrid>
            {/* guest details */}
            <GuestTitle variant={isMobile ? "m-body-m" : "body-m"}>{data?.guestInformation}</GuestTitle>
            <GuestDetails>
              <DetailsStack>
                <InlineText
                  variant={
                    isMobile ? "m-body-s" : "body-s"
                  }>{`${travelerData?.firstName} ${travelerData?.lastName}`}</InlineText>
                {travelerData?.email && (
                  <StackContainer>
                    <EmailIcon
                      sx={{
                        width: isMobile ? "2.656vw" : "1.2vw",
                        height: "auto",
                        color: theme?.palette?.neuPalette?.hexSeventeen,
                      }}
                    />
                    <CustomTooltip tooltipTitle={travelerData?.email}>
                      <InlineText variant={isMobile ? "m-body-s" : "body-s"}>{travelerData?.email}</InlineText>
                    </CustomTooltip>
                  </StackContainer>
                )}
              </DetailsStack>
             {travelerData?.mobile && <UserDataContainer sx={{ justifySelf: "end", gridArea: "mobile" }}>
                <CallIcon
                  sx={{
                    width: isMobile ? "2.656vw" : "1.2vw",
                    height: "auto",
                    color: theme?.palette?.neuPalette?.hexSeventeen,
                  }}
                />
                <InlineText variant={isMobile ? "m-body-s" : "body-s"}>{travelerData?.mobile}</InlineText>
              </UserDataContainer>}
            </GuestDetails>
          </GuestDetailsGrid>
          <Divider sx={{ border: "1px solid #D7D5CF" }} />
          {/* user options */}
          <UserOptions>
            {/*print icon*/}
            <PrintPdf
              page="booking"
              isBookingTab
              orderId={bookingData?.orderId}
              bookingPrintData={bookingData}
              hotelId={bookingDetails?.hotelId}
            />
            {/*share option*/}
            <UserOptionsContainer sx={{ marginTop: "0vw!important" }} onClick={() => setOpenShare(!openShare)}>
              {!isMobile && <Divider orientation="vertical" flexItem sx={{ border: "1px solid #8A8B84" }} />}
              <StyledImages component={"img"} alt="email-share-icon" src={EMAIL_SHARE_ICON} />
              <UserOptionText variant={isMobile ? "m-text-link" : "link-m"}>{data?.share}</UserOptionText>
            </UserOptionsContainer>

            {/*view details dropdown*/}
            {!isMobile && (
              <UserOptionsContainer>
                <>
                  {!isMobile && <Divider orientation="vertical" flexItem sx={{ border: "1px solid #8A8B84" }} />}
                  {viewDetails ? (
                    <IconsBoxContainer onClick={handelClick}>
                      <UserOptionText variant={isMobile ? "m-text-link" : "link-m"}>{data?.hideDetails}</UserOptionText>
                      <KeyboardArrowUpIcon
                        sx={{
                          color: theme?.palette?.neuPalette?.hexTwo,
                          fontSize: "1vw",
                        }}
                      />
                    </IconsBoxContainer>
                  ) : (
                    <IconsBoxContainer onClick={handelClick}>
                      <UserOptionText variant={isMobile ? "m-text-link" : "link-m"}>{data?.viewDetails}</UserOptionText>
                      <KeyboardArrowDownOutlinedIcon
                        sx={{
                          color: theme?.palette?.neuPalette?.hexTwo,
                          fontSize: "1vw",
                        }}
                      />
                    </IconsBoxContainer>
                  )}
                </>
              </UserOptionsContainer>
            )}

            {/*modify booking link*/}
            {!isPastBooking && !isOrderCancelled && (
              <>
                {!isMobile && isModifiable && (
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                      border: `1px solid ${theme?.palette?.neuPalette?.hexTwelve}`,
                    }}
                  />
                )}
                <UserOptionsContainer
                  onClick={() => {
                    if (isModifiable && !disableModify && bookingData?.channel?.toLowerCase() === "web") {
                      navigate(`${primaryAction?.url}?orderId=${bookingData?.orderId}`, primaryAction?.urlType)
                    } else {
                      navigate(process.env.NEXT_PUBLIC_SYNXIS_URL || "", primaryAction?.urlType)
                    }
                  }}>
                  {isModifiable && (
                    <>
                      <StyledImages
                        component={"img"}
                        alt="edit-icon"
                        src={disableModify ? DISABLED_EDIT_ICON : EDIT_ICON}
                      />
                      <ModifyBooking
                        variant="link-m"
                        color={
                          disableModify ? theme?.palette?.neuPalette?.hexSixteen : theme?.palette?.neuPalette?.hexTwo
                        }>
                        {primaryAction?.title}
                      </ModifyBooking>
                      {(disableModify || isComplementary) && (
                        <Tooltip
                          title={<React.Fragment>{isComplementary ? CONSTANTS?.COMPLEMENTARY_TOOL_TIP : CONSTANTS?.TOOL_TIP_TEXT}</React.Fragment>}
                          placement="top"
                          componentsProps={{
                            tooltip: {
                              sx: {
                                borderRadius: "0px",
                                backgroundColor: theme?.palette?.neuPalette?.hexSixteen,
                                color: theme?.palette?.neuPalette?.hexSeventeen,
                                padding: DesktopPxToVw(16),
                                textAlign: "center",
                              },
                            },
                          }}>
                          <Box component={"img"} alt="tool-tip-icon" src={TOOL_TIP_ICON} />
                        </Tooltip>
                      )}
                    </>
                  )}
                </UserOptionsContainer>
              </>
            )}
            {
              //* Commented this code because currently we don't have pay now option in my account section
              /* {bookingData?.paymentStatus !== "CHARGED" && !isPastBooking && (
              <>
                <Divider orientation="vertical" flexItem />
                <Box
                  onClick={() => {
                    navigate(secondaryAction?.url, secondaryAction?.urlType)
                  }}>
                  <Divider orientation="vertical" flexItem />
                  <UserOptionsContainer>
                    <StyledImages component={"img"} alt="tool-tip-icon" src={WALLET_ICON} />
                    <UserOptionText variant={isMobile ? "m-text-link" : "link-m"}>{data?.payNow}</UserOptionText>
                  </UserOptionsContainer>
                </Box>
              </>
            )} */
            }
          </UserOptions>
          {
            <MobileViewDetailsContainer $onView={viewDetails}>
              {isMobile && <Divider sx={{ width: "100%" }} />}
              {isMobile && (
                <UserOptionsContainer sx={{ width: "fit-content!important" }}>
                  <>
                    {!isMobile && <Divider orientation="vertical" flexItem />}
                    {viewDetails ? (
                      <IconsBoxContainer onClick={handelClick}>
                        <UserOptionText variant={isMobile ? "m-text-link" : "link-m"}>
                          {data?.hideDetails}
                        </UserOptionText>
                        <KeyboardArrowUpIcon
                          sx={{
                            color: theme?.palette?.neuPalette?.hexTwo,
                          }}
                        />
                      </IconsBoxContainer>
                    ) : (
                      <IconsBoxContainer onClick={handelClick}>
                        <UserOptionText variant={isMobile ? "m-text-link" : "link-m"}>
                          {data?.viewDetails}
                        </UserOptionText>
                        <KeyboardArrowDownOutlinedIcon
                          sx={{
                            color: theme?.palette?.neuPalette?.hexTwo,
                          }}
                        />
                      </IconsBoxContainer>
                    )}
                  </>
                </UserOptionsContainer>
              )}
            </MobileViewDetailsContainer>
          }
        </Grid>
        {/*View Booked Rooms */}
        <Collapse in={viewDetails} sx={{ width: "100%" }}>
          <RoomDetailsSection>
            {roomsData
              ?.sort((a: any, b: any) => a?.roomNumber - b?.roomNumber)
              ?.map((room: any, index: number) => (
                <RoomsDetails
                  isComplementary={isComplementary}
                  complementaryBasePrice={complementaryBasePrice}
                  isLarge={false}
                  item={room?.modifyBooking || room}
                  index={index}
                  key={index}
                />
              ))}
          </RoomDetailsSection>
        </Collapse>
      </BookingsWrapper>
      {openShare && <BookingDetailsShare openShare={openShare} data={bookingData} setOpenShare={setOpenShare} />}
    </Box>
  )
}

export default Bookings

export const CustomTooltip = ({ children, tooltipTitle, tooltipPlacement }: any) => {
  const isMobile = useMobileCheck()
  const [openTooltip, setOpenTooltip] = useState<boolean>(false)

  const handleTooltipClose = () => {
    setOpenTooltip(false)
  }

  const handleTooltipOpen = () => {
    setOpenTooltip(true)
  }
  return isMobile ? (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip
        onClick={handleTooltipOpen}
        placement={tooltipPlacement ? tooltipPlacement : "top"}
        arrow
        PopperProps={{
          disablePortal: true,
        }}
        slotProps={{
          popper: {
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, -10],
                },
              },
            ],
          },
        }}
        onClose={handleTooltipClose}
        open={openTooltip}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title={tooltipTitle}>
        {children}
      </Tooltip>
    </ClickAwayListener>
  ) : (
    <Tooltip
      sx={{ cursor: "pointer" }}
      title={tooltipTitle}
      placement="top"
      arrow
      slotProps={{
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, -10],
              },
            },
          ],
        },
      }}>
      {children}
    </Tooltip>
  )
}
