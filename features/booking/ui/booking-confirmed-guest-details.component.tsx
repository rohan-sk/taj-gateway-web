import React, { useContext, useEffect } from "react"
import { Box, Stack } from "@mui/material"
import { observer } from "mobx-react-lite"
import { BOOKING_CONSTANT } from "../constants"
import Pluralize from "../../../utils/pluralize"
import { PAGE_STORES } from "../../../utils/Constants"
import { useMobileCheck } from "../../../utils/isMobilView"
import { formatDateWithMON } from "../../../utils/getDate"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import BookingConfirmationPageStore from "../store/pageStore/booking.confirmation.store"
import {
  MainBox,
  GridItem,
  DetailsBox,
  GridContainer,
  MarginTopStack,
  TitleTypography,
  ItineraryNumber,
  BookingStatusBox,
  DetailsTypography,
  ConfirmDetailsBox,
  MarginTopTypography,
  EllipsesTypography,
} from "../../../components/BookingFlow/styles/booking-confirmed"

const BookingConfirmedGuestDetails = (props: any) => {
  const isMobile = useMobileCheck()
  const pageContext = useContext(PageContext)

  const { bookingConfirmationResponse, showComponents } = pageContext?.getPageStore(
    PAGE_STORES.BOOKING_STORES.bookingConfirmationPageStore,
  ) as BookingConfirmationPageStore

  const {
    checkIn,
    checkOut,
    guestName,
    numberOfRooms,
    paymentStatus,
    paymentMethod,
    bookingStatus,
    numberOfGuests,
    itineraryNumber,
  } = BOOKING_CONSTANT

  const isModified = bookingConfirmationResponse?.modifiedCount > 0

  useEffect(() => {
    //? Using to clear the orderId from session storage
    const handleForwardAndBackwardButtonClick = () => {
      sessionStorage?.removeItem("bookingOrderId")
    }
    const handlePageRefresh = () => {
      sessionStorage?.removeItem("bookingOrderId")
    }
    global?.window?.addEventListener("popstate", handleForwardAndBackwardButtonClick)
    global?.window?.addEventListener("beforeunload", handlePageRefresh)
    return () => {
      global?.window?.removeEventListener("popstate", handleForwardAndBackwardButtonClick)
      global?.window?.removeEventListener("beforeunload", handlePageRefresh)
    }
  }, [])

  const renderDesktopView = () => {
    return (
      <ConfirmDetailsBox
        aria-label="BookingConfirmedGuestDetails"
        sx={{ gap: isMobile ? MobilePxToVw(0) : DesktopPxToVw(40) }}>
        <DetailsBox mb={isMobile ? MobilePxToVw(30) : DesktopPxToVw(0)}>
          <BookingStatusBox>
            {bookingConfirmationResponse?.itinerary_number && (
              <>
                <TitleTypography variant="body-s">{itineraryNumber}</TitleTypography>
                <ItineraryNumber variant="heading-xs">
                  {bookingConfirmationResponse?.itinerary_number}
                </ItineraryNumber>
              </>
            )}
          </BookingStatusBox>
          <BookingStatusBox>
            {bookingConfirmationResponse?.guest_name && (
              <>
                <TitleTypography variant="body-s">{guestName}</TitleTypography>
                <EllipsesTypography
                  variant="heading-xs"
                  sx={{
                    maxWidth: bookingConfirmationResponse?.guest_name?.length > 40 ? DesktopPxToVw(300) : "100%",
                  }}>
                  {bookingConfirmationResponse?.guest_name}
                </EllipsesTypography>
              </>
            )}
          </BookingStatusBox>
          <BookingStatusBox>
            {bookingConfirmationResponse?.booking_status && (
              <>
                <TitleTypography variant="body-s">{bookingStatus}</TitleTypography>
                <DetailsTypography variant="heading-xs">
                  {bookingConfirmationResponse?.booking_status}
                </DetailsTypography>
              </>
            )}
          </BookingStatusBox>
          <BookingStatusBox>
            {bookingConfirmationResponse?.transactionStatus && (
              <>
                <TitleTypography variant="body-s">{isModified ? paymentMethod : paymentStatus}</TitleTypography>
                <DetailsTypography variant="heading-xs">
                  {bookingConfirmationResponse?.transactionStatus}
                </DetailsTypography>
              </>
            )}
          </BookingStatusBox>
        </DetailsBox>
        <DetailsBox>
          <BookingStatusBox>
            {bookingConfirmationResponse?.check_in && (
              <>
                <TitleTypography variant="body-s">{checkIn}</TitleTypography>
                <DetailsTypography variant="heading-xs">
                  {formatDateWithMON(bookingConfirmationResponse?.check_in)}
                </DetailsTypography>
              </>
            )}
          </BookingStatusBox>
          <BookingStatusBox>
            {bookingConfirmationResponse?.check_out && (
              <>
                <TitleTypography variant="body-s">{checkOut}</TitleTypography>
                <DetailsTypography variant="heading-xs">
                  {formatDateWithMON(bookingConfirmationResponse?.check_out)}
                </DetailsTypography>
              </>
            )}
          </BookingStatusBox>
          <BookingStatusBox>
            {bookingConfirmationResponse?.number_of_rooms && (
              <>
                <TitleTypography variant="body-s">{numberOfRooms}</TitleTypography>
                <DetailsTypography variant="heading-xs">
                  {Pluralize("ROOM", bookingConfirmationResponse?.number_of_rooms, true)}
                </DetailsTypography>
              </>
            )}
          </BookingStatusBox>
          {(bookingConfirmationResponse?.number_of_guests_ADULTS ||
            bookingConfirmationResponse?.number_of_guests_CHILDREN) && (
              <BookingStatusBox>
                <TitleTypography variant="body-s">{numberOfGuests}</TitleTypography>
                <DetailsTypography variant="heading-xs">
                  {Pluralize("ADULT", bookingConfirmationResponse?.number_of_guests_ADULTS, true)}
                  &nbsp;
                  {Pluralize("CHILD", bookingConfirmationResponse?.number_of_guests_CHILDREN) !== undefined
                    ? `${Pluralize("CHILD", bookingConfirmationResponse?.number_of_guests_CHILDREN, true)}`
                    : ""}
                </DetailsTypography>
              </BookingStatusBox>
            )}
        </DetailsBox>
      </ConfirmDetailsBox>
    )
  }

  const renderMobileView = () => {
    return (
      <MainBox>
        <GridContainer container>
          {bookingConfirmationResponse?.itinerary_number && (
            <GridItem item md={6} sm={6} xs={6}>
              <TitleTypography variant="m-body-s" defaultValue={itineraryNumber}>
                {itineraryNumber}
              </TitleTypography>
              <Stack flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <MarginTopTypography variant="m-heading-xs">
                  {bookingConfirmationResponse?.itinerary_number}
                </MarginTopTypography>
              </Stack>
            </GridItem>
          )}
          {bookingConfirmationResponse?.guest_name && (
            <GridItem item md={6} sm={6} xs={6}>
              <TitleTypography variant="m-body-s">{guestName}</TitleTypography>
              <EllipsesTypography
                variant="m-heading-xs"
                sx={{
                  maxWidth: bookingConfirmationResponse?.guest_name?.length > 40 ? MobilePxToVw(400) : "100%",
                }}>
                {bookingConfirmationResponse?.guest_name}
              </EllipsesTypography>
            </GridItem>
          )}
        </GridContainer>
        <GridContainer container>
          {bookingConfirmationResponse?.booking_status && (
            <GridItem item md={6} sm={6} xs={6}>
              <TitleTypography variant="m-body-s">{bookingStatus}</TitleTypography>
              <MarginTopTypography variant="m-heading-xs">
                {bookingConfirmationResponse?.booking_status}
              </MarginTopTypography>
            </GridItem>
          )}
          {bookingConfirmationResponse?.transactionStatus && (
            <GridItem item md={6} sm={6} xs={6}>
              <TitleTypography variant="m-body-s">{isModified ? paymentMethod : paymentStatus}</TitleTypography>
              <MarginTopTypography variant="m-heading-xs">
                {bookingConfirmationResponse?.transactionStatus}
              </MarginTopTypography>
            </GridItem>
          )}
        </GridContainer>
        <GridContainer container>
          {bookingConfirmationResponse?.check_in && (
            <GridItem item md={6} sm={6} xs={6}>
              <TitleTypography variant="m-body-s">{checkIn}</TitleTypography>
              <MarginTopTypography variant="m-heading-xs">
                {formatDateWithMON(bookingConfirmationResponse?.check_in)}
              </MarginTopTypography>
            </GridItem>
          )}
          {bookingConfirmationResponse?.check_out && (
            <GridItem item md={6} sm={6} xs={6}>
              <TitleTypography variant="m-body-s">{checkOut}</TitleTypography>
              <MarginTopTypography variant="m-heading-xs">
                {formatDateWithMON(bookingConfirmationResponse?.check_out)}
              </MarginTopTypography>
            </GridItem>
          )}
        </GridContainer>
        <GridContainer container>
          {bookingConfirmationResponse?.number_of_rooms && (
            <GridItem item md={6} sm={6} xs={6}>
              <TitleTypography variant="m-body-s">{numberOfRooms}</TitleTypography>
              <MarginTopTypography variant="m-heading-xs">
                {Pluralize("ROOM", bookingConfirmationResponse?.number_of_rooms, true)}
              </MarginTopTypography>
            </GridItem>
          )}
          {(bookingConfirmationResponse?.number_of_guests_ADULTS ||
            bookingConfirmationResponse?.number_of_guests_CHILDREN) && (
              <GridItem item md={6} sm={6} xs={6}>
                <TitleTypography variant="m-body-s">{numberOfGuests}</TitleTypography>
                <MarginTopTypography variant="m-heading-xs">
                  {Pluralize("ADULT", bookingConfirmationResponse?.number_of_guests_ADULTS, true)}
                  &nbsp;
                  {Pluralize("CHILD", bookingConfirmationResponse?.number_of_guests_CHILDREN) !== undefined
                    ? `${Pluralize("CHILD", bookingConfirmationResponse?.number_of_guests_CHILDREN)}`
                    : ""}
                </MarginTopTypography>
              </GridItem>
            )}
        </GridContainer>
      </MainBox>
    )
  }

  return showComponents?.showGuestDetails ? isMobile ? renderMobileView() : renderDesktopView() : <></>
}

export default observer(BookingConfirmedGuestDetails)
