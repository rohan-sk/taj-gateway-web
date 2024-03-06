import React, { useRef, useContext, useState, useEffect } from "react"
import dynamic from "next/dynamic"
import ShareText from "./ShareText"
import { ICONS } from "../constants"
import { theme } from "../../lib/theme"
import { Box, Button } from "@mui/material"
import { useReactToPrint } from "react-to-print"
import { BoldTypography } from "./PrintTemplateStyles"
import GiftCardPrint from "./gift-card-print.component"
import { GoldPrintIcon } from "../../utils/customIcons"
import { useMobileCheck } from "../../utils/isMobilView"
import EpicurePrintComponent from "./epicure-print.component"
import BookingPrintComponent from "./booking-print.component"
import { PRINT_ICON, WHITE_PRINT_ICON } from "../forms/gift-card-form/constants"
import data from "../../mock-data/epicure-membership-json/membership-billing-details.json"
import { StyledImages, UserOptionText, UserOptionsContainer } from "../MyAccount/booking-history/booking-styles"
import GiftCardReloadPrintComponent from "./gift-card-reload-print.component"
import OffersAndVouchersPrint from "./offers-and-vouchers.print.component"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import { PAGE_STORES } from "../../utils/Constants"
import BookingConfirmationPageStore from "../../features/booking/store/pageStore/booking.confirmation.store"
import { observer } from "mobx-react-lite"
const ComparisonModal = dynamic(() => import("../hoc/ComparisonModal"))

export const PDF_PAGE_STYLES = `
@media print {
  /* Hide the unwanted headers and footers */
  @page {
    size: auto; /* Reset page size to auto */
    margin: 20mm; /* Adjust the margin as needed */
    @bottom-center {
      content: "";
    }
    @bottom-right {
      content: "";
    }
  }

  /* Hide page number and URL in footer */
  body::before {
    content: none;
  }
  body::after {
    content: none;
  }
  
  body {
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact;
    -moz-print-color-adjust: exact;
    -ms-print-color-adjust: exact;
     print-color-adjust: exact;
  }
  /* Hide headers and footers */
  @page :first {
    margin-top: 0; /* Hide header on the first page */
  }
  @page {
    margin-top: 20px; /* Add space at the top of each page */
    margin: 20mm; /* Adjust the margin as needed */
  }
  header, footer {
    display: none !important;
  }

  @page :footer {
    content: "" !important;
  }
 }
`

const PrintPdf = ({
  hotelId = "",
  showShareButton = false,
  page,
  buttonVariant = "light-contained",
  orderId = "",
  isBookingTab,
  printData,
  isVoucher,
  props,
  comparison = false,
  bookingPrintData = {},
  giftcardConfirmationPrint,
  giftCardReloadConfirmation,
}: any) => {
  const isMobile = useMobileCheck()
  const componentRef = useRef<any>(null)
  const isBooking = page === "booking"
  const printHandler = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: PDF_PAGE_STYLES,
  })
  const pageContext = useContext(PageContext)
  const bookingConfirmationStore = pageContext?.getPageStore(
    PAGE_STORES.BOOKING_STORES.bookingConfirmationPageStore,
  ) as BookingConfirmationPageStore

  const printBooking = async () => {
    if (isBooking && hotelId) {
      await bookingConfirmationStore?.setHotelBannerData(hotelId)
      printHandler()
    } else {
      printHandler()
    }
  }

  const getPrintComponent = () => {
    switch (page) {
      case "booking": {
        return (
          <>
            <BookingPrintComponent orderId={orderId} isPrintAction={true} bookingPrintData={bookingPrintData} />
          </>
        )
      }

      case "gift-card": {
        return (
          <>
            <GiftCardPrint props={giftcardConfirmationPrint} isPrintAction={true} />
          </>
        )
      }
      case "epicure": {
        return <EpicurePrintComponent isPrintAction={true} />
      }
      case "gift-card-reload": {
        return <GiftCardReloadPrintComponent props={giftCardReloadConfirmation} isPrintAction={true} />
      }
      case "offers-or-vouchers": {
        return (
          <>
            <OffersAndVouchersPrint printData={printData} isVoucher={isVoucher} isPrintAction={true} />
          </>
        )
      }
      case "Comparision-modal": {
        return (
          <>
            <ComparisonModal props={props} printMode={true} isPrintAction={true} />
          </>
        )
      }
      default: {
        return (
          <>
            <BookingPrintComponent orderId={orderId} isPrintAction={true} bookingPrintData={bookingPrintData} />
          </>
        )
      }
    }
  }

  return (
    <Box>
      <div
        style={{
          display: "none",
        }}>
        <div className="pass-title" ref={componentRef}>
          {getPrintComponent()}
        </div>
      </div>

      {showShareButton && <ShareText />}
      {isBookingTab ? (
        <UserOptionsContainer sx={{ marginTop: "0vw!important" }} onClick={printBooking}>
          <StyledImages component={"img"} alt="print-icon" src={PRINT_ICON} />
          <UserOptionText variant={isMobile ? "m-text-link" : "link-m"}>{data?.print}</UserOptionText>
        </UserOptionsContainer>
      ) : (
        <Button
          variant={comparison ? "light-outlined" : buttonVariant}
          sx={{
            gap: isMobile ? "3.125vw" : "1.024vw",
            padding: "0.938vw 1.875vw",
          }}
          onClick={printHandler}>
          {buttonVariant === "light-outlined" ? (
            <GoldPrintIcon />
          ) : (
            <Box
              alt="print-icon"
              width={"100%"}
              height={"100%"}
              loading="lazy"
              component={"img"}
              src={comparison ? ICONS?.GOLD_PRINT_ICON : WHITE_PRINT_ICON}
            />
          )}
          <BoldTypography
            sx={{
              color: comparison
                ? theme?.palette?.ihclPalette?.hexTwo
                : buttonVariant === "light-outlined"
                ? theme?.palette?.ihclPalette?.hexTwo
                : theme?.palette?.ihclPalette?.hexOne,
            }}
            variant={isMobile ? "m-body-s" : "heading-xxs"}>
            {data?.print}
          </BoldTypography>
        </Button>
      )}
    </Box>
  )
}

export default observer(PrintPdf)
