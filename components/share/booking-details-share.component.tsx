import React, { useContext } from "react"
import dynamic from "next/dynamic"
import { ICONS } from "../constants"
import { theme } from "../../lib/theme"
import Pluralize from "../../utils/pluralize"
import { Stack, Typography } from "@mui/material"
import {
  MainBox,
  ParentBox,
  ShareImage,
  CloseImage,
  StyledImage,
  LargeDivider,
  ImageParentBox,
  LinkTypography,
  ShareDetailsStack,
  ContactDetailStack,
  ItineraryNumTypography,
  BackDropBox,
} from "./styles/booking-details-share"
import { PAGE_STORES } from "../../utils/Constants"
import { useMobileCheck } from "../../utils/isMobilView"
import { formatDateWithMON } from "../../utils/getDate"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import BookingConfirmationPageStore from "../../features/booking/store/pageStore/booking.confirmation.store"

const PDFGenerator = dynamic(() => import("../downloadPdf/ReactToPdfDowload"))
const BookingPrintComponent = dynamic(() => import("../GeneratePdfPrint/booking-print.component"))

const BookingDetailsShare = ({ data, setOpenShare }: any) => {
  const isMobile = useMobileCheck()
  const roomData = data?.rooms?.[0]
  const roomImg = data?.rooms?.[0]?.roomImgUrl

  const pageContext = useContext(PageContext)
  const bookingConfirmation = pageContext?.getPageStore(
    PAGE_STORES.BOOKING_STORES.bookingConfirmationPageStore,
  ) as BookingConfirmationPageStore

  const emailId = roomData?.guest_information?.email || ""
  const fileName = `${bookingConfirmation?.bookingConfirmationResponse?.hotelName}_Reservation_Confirmation_${bookingConfirmation?.bookingConfirmationResponse?.itinerary_number}`
  const emailSubject = `Your Reservation at ${bookingConfirmation?.bookingConfirmationResponse?.hotelName} is confirmed-${bookingConfirmation?.bookingConfirmationResponse?.itinerary_number}`

  const handleClose = () => {
    setOpenShare(false)
  }
  let pdfShareText = `BOOKING DETAILS: ${data?.hotelName}
Itinerary No.${data?.itinerary_number}.
${
  (roomData?.modifyBooking?.noOfNights || roomData?.noOfNights) &&
  `${Pluralize("Night", roomData?.modifyBooking?.noOfNights || roomData?.noOfNights, false)},`
}${` ${formatDateWithMON(data?.check_in)} to ${formatDateWithMON(data?.check_out)}, ${Pluralize(
    "Adult",
    data?.number_of_guests_ADULTS,
    false,
  )} ${
    Pluralize("Child", data?.number_of_guests_CHILDREN, false) !== undefined
      ? `,${Pluralize("Child", data?.number_of_guests_CHILDREN, false)}`
      : ""
  }`} ${data?.hotelName} (${data?.paymentStatus})
More info pls call${data?.mobileNumber}`

  return (
    <BackDropBox aria-label="share-modal">
      <ParentBox>
        <MainBox>
          <CloseImage component="img" src={"../close.svg"} onClick={handleClose} />
          <Typography variant={isMobile ? "m-heading-xs" : "heading-xs"}>Share</Typography>
          <LargeDivider />
          <ImageParentBox>
            {roomImg && <StyledImage component={"img"} src={roomImg} />}
            {data?.itinerary_number && (
              <Stack rowGap={isMobile ? MobilePxToVw(10) : "0.417vw"}>
                <ItineraryNumTypography variant={isMobile ? "m-body-xs" : "body-xs"}>
                  Itinerary No.
                </ItineraryNumTypography>
                <Typography variant={isMobile ? "m-body-ml" : "body-ml"}>{data?.itinerary_number}</Typography>
              </Stack>
            )}
          </ImageParentBox>
          <Stack rowGap={isMobile ? MobilePxToVw(7) : DesktopPxToVw(8)}>
            <Typography variant={isMobile ? "m-body-s" : "body-s"}>
              {(roomData?.modifyBooking?.noOfNights || roomData?.noOfNights) &&
                `${Pluralize("Night", roomData?.modifyBooking?.noOfNights || roomData?.noOfNights, false)},`}
              {` ${formatDateWithMON(data?.check_in)} to ${formatDateWithMON(data?.check_out)}, ${Pluralize(
                "Adult",
                data?.number_of_guests_ADULTS,
                false,
              )} ${
                Pluralize("Child", data?.number_of_guests_CHILDREN, false) !== undefined
                  ? `,${Pluralize("Child", data?.number_of_guests_CHILDREN, false)}`
                  : ""
              }`}
            </Typography>
            {(data?.hotelName || data?.paymentStatus) && (
              <Typography
                variant={isMobile ? "m-body-s" : "body-s"}>{`${data?.hotelName} (${data?.paymentStatus})`}</Typography>
            )}
          </Stack>
          {!isMobile && (
            <>
              <ContactDetailStack>
                <Typography variant={isMobile ? "m-body-s" : "body-s"}>More info pls call</Typography>
                <Typography variant={isMobile ? "m-body-s" : "body-s"} color={theme.palette.ihclPalette.hexTwo}>
                  {" "}
                  {data?.mobileNumber}
                </Typography>
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
              downloadButton={<ShareImage component="img" src={ICONS?.SHARE_MAIL_ICON} />}
              type="email"
              PDFData={<BookingPrintComponent isDownload={true} bookingPrintData={data} />}
              fileNameForUrl={fileName}
              emailSubject={emailSubject}
              emailId={emailId}
              shareText={pdfShareText}
            />
            <PDFGenerator
              downloadButton={<ShareImage component="img" src={ICONS?.SHARE_WHATSAPP_ICON} />}
              type="whatsapp"
              PDFData={<BookingPrintComponent isDownload={true} bookingPrintData={data} />}
              fileNameForUrl={fileName}
              shareText={pdfShareText}
            />
            <PDFGenerator
              downloadButton={<ShareImage component="img" src={ICONS?.SHARE_DOWNLOAD_ICON} />}
              type="download"
              PDFData={<BookingPrintComponent isDownload={true} bookingPrintData={data} />}
              fileNameForUrl={fileName}
            />
          </ShareDetailsStack>
        </MainBox>
      </ParentBox>
    </BackDropBox>
  )
}

export default BookingDetailsShare
