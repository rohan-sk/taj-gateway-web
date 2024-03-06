import React from "react"
import dynamic from "next/dynamic"
import {
  BackDropBox,
  ParentBox,
  MainBox,
  LargeDivider,
  ShareDetailsStack,
  ShareImage,
  StyledImage,
  ImageParentBox,
  VouchersNumberBox,
} from "../share/styles/booking-details-share"
import { Typography } from "@mui/material"
import { useMobileCheck } from "../../utils/isMobilView"
const PDFGenerator = dynamic(() => import("../downloadPdf/ReactToPdfDowload"))
import { ICONS } from "../constants"
import OffersAndVouchersPrint from "./offers-and-vouchers.print.component"
import { CloseIcon } from "../../utils/customIcons"
import { CloseIconStyles } from "../../features/my-account/ui/styles/booking-details-share"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
import { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { BOOKING_CONSTANT } from "../../features/booking/constants"

type ShareModalProps = {
  fileName: string
  emailSubject: string
  setOpenShare: Function
  printData: any
  isVoucher?: boolean
  imageUrl: string
}
const ShareModal = ({
  fileName,
  emailSubject,
  setOpenShare,
  printData,
  isVoucher = false,
  imageUrl,
}: ShareModalProps) => {
  const isMobile = useMobileCheck()
  const { getOptimizeImageUrl } = useImageUtility()
  const shareText = isVoucher
    ? `${global?.window?.location?.host}: ${printData?.productName}: ${printData?.productDescription}`
    : `${global?.window?.location?.host}: ${printData?.title}: ${printData?.description}`

  const handleClose = () => {
    setOpenShare(false)
  }

  return (
    <BackDropBox>
      <ParentBox>
        <MainBox>
          <CloseIcon sx={{ ...CloseIconStyles }} onClick={handleClose} />
          <Typography variant={isMobile ? "m-heading-xs" : "heading-xs"}>Share</Typography>
          <LargeDivider />
          <ImageParentBox>
            <StyledImage component={"img"} src={getOptimizeImageUrl(imageUrl, 3)} />
            {isVoucher ? (
              <VouchersNumberBox>
                <Typography
                  sx={{
                    textTransform: "capitalize",
                  }}
                  variant={isMobile ? "m-body-xs" : "body-xs"}>
                  {BOOKING_CONSTANT?.voucherNumber}
                </Typography>
                <Typography variant={isMobile ? "m-body-sl" : "body-ml"}>{printData?.uniquePrivilegeCode}</Typography>
              </VouchersNumberBox>
            ) : (
              <Typography variant={isMobile ? "m-body-ml" : "body-ml"}>
                {printData?.productName || printData?.title}
              </Typography>
            )}
          </ImageParentBox>
          {isVoucher && (
            <Typography variant={isMobile ? "m-body-ml" : "body-ml"}>
              {printData?.productName || printData?.title}
            </Typography>
          )}
          <LargeDivider
            sx={{
              margin: isMobile
                ? isVoucher
                  ? `${MobilePxToVw(15)} 0`
                  : `${MobilePxToVw(40)} 0`
                : isVoucher
                ? "0.78vw 0vw 0.52vw"
                : "2vw 0vw 1.5vw",
            }}
          />
          <ShareDetailsStack>
            <Typography variant={isMobile ? "m-body-s" : "body-s"} whiteSpace="nowrap">
              Share :
            </Typography>
            <PDFGenerator
              downloadButton={<ShareImage component="img" src={ICONS?.SHARE_MAIL_ICON} />}
              type="email"
              PDFData={<OffersAndVouchersPrint printData={printData} isVoucher={isVoucher} />}
              fileNameForUrl={fileName}
              emailSubject={emailSubject}
              shareText={shareText}
            />
            <PDFGenerator
              downloadButton={<ShareImage component="img" src={ICONS?.SHARE_WHATSAPP_ICON} />}
              type="whatsapp"
              PDFData={<OffersAndVouchersPrint printData={printData} isVoucher={isVoucher} />}
              fileNameForUrl={fileName}
              shareText={shareText}
            />
            <PDFGenerator
              downloadButton={<ShareImage component="img" src={ICONS?.SHARE_DOWNLOAD_ICON} />}
              type="download"
              PDFData={<OffersAndVouchersPrint printData={printData} isVoucher={isVoucher} />}
              fileNameForUrl={fileName}
              shareText={shareText}
            />
          </ShareDetailsStack>
        </MainBox>
      </ParentBox>
    </BackDropBox>
  )
}

export default ShareModal
