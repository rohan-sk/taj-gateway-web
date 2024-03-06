import React, { useContext, useEffect } from "react"
import dynamic from "next/dynamic"
import { theme } from "../../../lib/theme"
import Pluralize from "../../../utils/pluralize"
import { Stack, Typography } from "@mui/material"
import { ICONS } from "../../../components/constants"
import { formatDateWithMON } from "../../../utils/getDate"
import { useMobileCheck } from "../../../utils/isMobilView"
import { CloseIcon, ShareMailIcon } from "../../../utils/customIcons"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { ShareImage } from "../../../components/share/styles/booking-details-share"
import {
  MainBox,
  ParentBox,
  BackDropBox,
  StyledImage,
  LargeDivider,
  ImageParentBox,
  CloseIconStyles,
  ShareImageStyles,
  ShareDetailsStack,
  ItineraryNumTypography,
  ContactDetailStack,
} from "./styles/booking-details-share"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import { PAGE_STORES } from "../../../utils/Constants"
import BookingConfirmationPageStore from "../../booking/store/pageStore/booking.confirmation.store"

const PDFGenerator = dynamic(() => import("../../../components/downloadPdf/ReactToPdfDowload"))
const BookingPrintComponent = dynamic(() => import("../../../components/GeneratePdfPrint/booking-print.component"))

const BookingDetailsShare = ({ data, setOpenShare }: any) => {
  const pageContext = useContext(PageContext)
  const { setHotelBannerData } = pageContext?.getPageStore(
    PAGE_STORES.BOOKING_STORES.bookingConfirmationPageStore,
  ) as BookingConfirmationPageStore
  const isMobile = useMobileCheck()
  const bookingDetails = data?.orderLineItems?.[0]?.hotel
  const roomDetails = data?.orderLineItems?.[0]?.hotel?.rooms?.[0]
  const { name, bookingNumber, mobileNumber, hotelId = "" } = data?.orderLineItems?.[0]?.hotel || {}

  const handleClose = () => {
    setOpenShare(false)
  }

  useEffect(() => {
    hotelId && setHotelBannerData(hotelId)
  }, [])

  return (
    <BackDropBox>
      <ParentBox aria-label="BookingDetailsShare">
        <MainBox>
          <CloseIcon sx={{ ...CloseIconStyles }} onClick={handleClose} />
          <Typography variant={isMobile ? "m-heading-xs" : "heading-xs"}>Share</Typography>
          <LargeDivider />
          <ImageParentBox>
            {roomDetails?.roomImgUrl && <StyledImage component={"img"} src={roomDetails?.roomImgUrl} />}
            {bookingDetails?.bookingNumber && (
              <Stack rowGap={isMobile ? MobilePxToVw(10) : "0.417vw"}>
                <ItineraryNumTypography variant={isMobile ? "m-body-xs" : "body-xs"}>
                  Itinerary No.
                </ItineraryNumTypography>
                <Typography variant={isMobile ? "m-body-ml" : "body-ml"}>{bookingDetails?.bookingNumber}</Typography>
              </Stack>
            )}
          </ImageParentBox>
          <Stack rowGap={isMobile ? MobilePxToVw(7) : DesktopPxToVw(8)}>
            <Typography variant={isMobile ? "m-body-s" : "body-s"}>
              {(roomDetails?.modifyBooking?.noOfNights || roomDetails?.noOfNights) &&
                `${Pluralize("Night", roomDetails?.modifyBooking?.noOfNights || roomDetails?.noOfNights, false)},`}
              {` ${formatDateWithMON(bookingDetails?.checkIn)} to ${formatDateWithMON(
                bookingDetails?.checkOut,
              )}, ${Pluralize("Adult", bookingDetails?.adultCount, false)} ${
                Pluralize("Child", bookingDetails?.childrens, false) !== undefined
                  ? `,${Pluralize("Child", bookingDetails?.childrens, false)}`
                  : ""
              }`}
            </Typography>
            {bookingDetails?.name && (
              <Typography
                variant={
                  isMobile ? "m-body-s" : "body-s"
                }>{`${bookingDetails?.name} (${data?.transactionStatus})`}</Typography>
            )}
          </Stack>
          {mobileNumber && (
            <>
              <ContactDetailStack>
                <Typography variant={isMobile ? "m-body-s" : "body-s"}>More info pls call</Typography>
                {isMobile ? (
                  <Typography variant={"m-body-s"} color={theme.palette.ihclPalette.hexTwo}>
                    <a href={`tel:${mobileNumber}`}>{mobileNumber}</a>
                  </Typography>
                ) : (
                  <Typography variant={"body-s"} color={theme.palette.ihclPalette.hexTwo}>
                    {mobileNumber}
                  </Typography>
                )}
              </ContactDetailStack>
            </>
          )}
          <LargeDivider
            sx={{
              margin: isMobile ? `${MobilePxToVw(10)} ${MobilePxToVw(15)}` : "0.521vw 0vw 0.781vw 0vw",
            }}
          />
          <ShareDetailsStack>
            <Typography variant={isMobile ? "m-body-s" : "body-s"} whiteSpace="nowrap">
              Share :
            </Typography>
            <PDFGenerator
              downloadButton={<ShareMailIcon sx={{ ...ShareImageStyles }} />}
              type="email"
              PDFData={<BookingPrintComponent bookingPrintData={data} orderId={data?.orderId} />}
              fileNameForUrl={`${name}_Reservation_Confirmation_${bookingNumber}`}
              emailSubject={`Your Reservation at ${name} is confirmed - ${bookingNumber}`}
            />
            <PDFGenerator
              downloadButton={<ShareImage component="img" src={ICONS?.SHARE_WHATSAPP_ICON} />}
              type="whatsapp"
              PDFData={<BookingPrintComponent bookingPrintData={data} orderId={data?.orderId} />}
              fileNameForUrl={`${name}_Reservation_Confirmation_${bookingNumber}`}
            />
            <PDFGenerator
              downloadButton={<ShareImage component="img" src={ICONS?.SHARE_DOWNLOAD_ICON} />}
              type="download"
              PDFData={<BookingPrintComponent bookingPrintData={data} orderId={data?.orderId} />}
              fileNameForUrl={`${name}_Reservation_Confirmation_${bookingNumber}`}
            />
          </ShareDetailsStack>
        </MainBox>
      </ParentBox>
    </BackDropBox>
  )
}

export default BookingDetailsShare
