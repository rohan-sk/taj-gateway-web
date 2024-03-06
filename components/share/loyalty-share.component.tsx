import React from "react"
import dynamic from "next/dynamic"
import { urlFor } from "../../lib-sanity"
import { CONSTANTS, ICONS } from "../constants"
import { Box, Stack, Typography } from "@mui/material"
import { useMobileCheck } from "../../utils/isMobilView"
import ReactToPdfDownlaod from "../downloadPdf/ReactToPdfDowload"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import GiftCardPrintComponent from "../GeneratePdfPrint/gift-card-print.component"
import {
  MainBox,
  ParentBox,
  ShareImage,
  CloseImage,
  LargeDivider,
  ShareDetailsStack,
  ImageContentWrapper,
  PurchaseImageWrapper,
  PurchaseContentWrapper,
} from "./styles/booking-details-share"
import { observer } from "mobx-react-lite"

const LoyaltyConfirmationShare = ({
  img,
  planName,
  buyerName,
  cardNumber,
  setOpenShare,
  isReloadGiftCard,
  isConfirmationGiftCard,
  confirmationGiftCardReviewDescription,
  isConfirmationGiftCardReviewDownloadPagePDF = false,
  props,
}: any) => {
  const isMobile = useMobileCheck()
  // To capitalize the first letter of each word
  const justifiedPlanName = planName?.toLowerCase()?.split(" ")

  for (let i = 0; i < justifiedPlanName?.length; i++) {
    justifiedPlanName[i] = justifiedPlanName?.[i]?.[0]?.toUpperCase() + justifiedPlanName?.[i]?.substr(1)
  }

  const fileName = isReloadGiftCard
    ? `${CONSTANTS.GIFT_CARD_RELOAD}_${cardNumber}`
    : isConfirmationGiftCard
    ? `${planName}_${cardNumber}`
    : `${planName}_CONFIRMATION_${cardNumber}`

  const EpicurePrintComponent = dynamic(() => import("../GeneratePdfPrint/epicure-print.component"))
  const GiftCardReloadPrintComponent = dynamic(() => import("../GeneratePdfPrint/gift-card-reload-print.component"))
  return (
    <ParentBox>
      <MainBox
        sx={{
          minHeight: isMobile
            ? isReloadGiftCard
              ? `${MobilePxToVw(200)} !important`
              : `${MobilePxToVw(341)} !important`
            : isReloadGiftCard
            ? `${DesktopPxToVw(200)} !important`
            : `${DesktopPxToVw(341)} !important`,
        }}>
        <CloseImage component="img" src={ICONS?.SHARE_CLOSE_ICON} onClick={() => setOpenShare(false)} />
        <Typography variant={isMobile ? "m-heading-xs" : "heading-xs"}>SHARE</Typography>
        {!isReloadGiftCard ? (
          <>
            <LargeDivider />
            <ImageContentWrapper $isMobile={isMobile}>
              {img && <PurchaseImageWrapper component={"img"} src={urlFor(img)?.url()} />}
              <PurchaseContentWrapper $isMobile={isMobile}>
                <Typography variant={isMobile ? "m-body-xs" : "body-xs"} sx={{ opacity: 0.6 }}>
                  {"Purchase order number"}
                </Typography>
                <Typography variant={isMobile ? "m-body-sl" : "body-ml"}>{cardNumber}</Typography>
              </PurchaseContentWrapper>
            </ImageContentWrapper>
            <Stack flexDirection="row" columnGap={isMobile ? MobilePxToVw(9) : DesktopPxToVw(9)}>
              {planName && (
                <>
                  <Typography variant={isMobile ? "m-body-s" : "body-s"}>Plan name:</Typography>
                  <Typography variant={isMobile ? "m-body-s" : "body-s"}>{planName}</Typography>
                </>
              )}
            </Stack>
            <Stack>
              <Stack flexDirection="row" columnGap={isMobile ? MobilePxToVw(9) : DesktopPxToVw(9)}>
                {buyerName && (
                  <>
                    <Typography variant={isMobile ? "m-body-s" : "body-s"}>Buyer Name:</Typography>
                    <Typography variant={isMobile ? "m-body-s" : "body-s"}>{buyerName}</Typography>
                  </>
                )}
              </Stack>
            </Stack>
            <LargeDivider
              sx={{
                margin: isMobile
                  ? `${MobilePxToVw(10)} 0vw ${MobilePxToVw(15)}`
                  : `${DesktopPxToVw(10)} 0vw ${DesktopPxToVw(15)}`,
              }}
            />
          </>
        ) : (
          <Box sx={{ height: isMobile ? MobilePxToVw(70) : DesktopPxToVw(70) }}>
            <PurchaseContentWrapper $isMobile={isMobile}>
              {cardNumber && (
                <>
                  <Typography variant={isMobile ? "m-body-xs" : "body-xs"} sx={{ opacity: 0.6 }}>
                    {"Purchase order number"}
                  </Typography>
                  <Typography variant={isMobile ? "m-body-sl" : "body-ml"}>{cardNumber}</Typography>
                </>
              )}
            </PurchaseContentWrapper>
          </Box>
        )}
        <ShareDetailsStack>
          <Typography variant={isMobile ? "m-body-s" : "body-s"} whiteSpace="nowrap">
            Share :
          </Typography>
          <ReactToPdfDownlaod
            setOpenShare={setOpenShare}
            downloadButton={<ShareImage component="img" src={ICONS?.SHARE_MAIL_ICON} />}
            type="email"
            PDFData={
              isReloadGiftCard ? (
                <GiftCardReloadPrintComponent props={props} downloadPagePDF={true} />
              ) : isConfirmationGiftCard ? (
                <GiftCardPrintComponent props={props} downloadPagePDF={true} />
              ) : (
                <EpicurePrintComponent />
              )
            }
            fileNameForUrl={fileName}
            emailSubject={
              isReloadGiftCard
                ? CONSTANTS.GIFT_CARD_EMAIL
                : isConfirmationGiftCard
                ? CONSTANTS.GIFT_CARD_EMAIL
                : `${justifiedPlanName?.join(" ")} Welcome Email`
            }
            giftCardPageResolution={isReloadGiftCard || isConfirmationGiftCard ? true : false}
          />
          {ICONS?.SHARE_WHATSAPP_ICON && (
            <ReactToPdfDownlaod
              setOpenShare={setOpenShare}
              downloadButton={<ShareImage component="img" src={ICONS?.SHARE_WHATSAPP_ICON} />}
              type="whatsapp"
              PDFData={
                isReloadGiftCard ? (
                  <GiftCardReloadPrintComponent props={props} downloadPagePDF={true} />
                ) : isConfirmationGiftCard ? (
                  <GiftCardPrintComponent props={props} downloadPagePDF={true} />
                ) : (
                  <EpicurePrintComponent />
                )
              }
              fileNameForUrl={fileName}
              giftCardPageResolution={isReloadGiftCard || isConfirmationGiftCard ? true : false}
            />
          )}
          {ICONS?.SHARE_DOWNLOAD_ICON && (
            <ReactToPdfDownlaod
              setOpenShare={setOpenShare}
              downloadButton={<ShareImage component="img" src={ICONS?.SHARE_DOWNLOAD_ICON} />}
              type="download"
              PDFData={
                isReloadGiftCard ? (
                  <GiftCardReloadPrintComponent props={props} downloadPagePDF={true} />
                ) : isConfirmationGiftCard ? (
                  <GiftCardPrintComponent props={props} downloadPagePDF={true} />
                ) : (
                  <EpicurePrintComponent />
                )
              }
              fileNameForUrl={fileName}
              giftCardPageResolution={isReloadGiftCard || isConfirmationGiftCard ? true : false}
            />
          )}
        </ShareDetailsStack>
      </MainBox>
    </ParentBox>
  )
}

export default observer(LoyaltyConfirmationShare)
