import { urlFor } from "../../lib-sanity"
import { Box, Typography } from "@mui/material"
import { PAGE_STORES } from "../../utils/Constants"
import { ActionProps, aestheticItems } from "../types"
import { useContext, useEffect, useRef, useState } from "react"
import { useMobileCheck } from "../../utils/isMobilView"
import { useAesthetics } from "../../utils/fetchAsthetics"
import RenderActionItem from "../hoc/actions/action-items-ui"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import GiftCardConfirmationPageStore from "../../features/giftCard/store/pageStore/GCConfirmationPage.store"
import {
  NudgeBox,
  NudgeContainer,
  ShareIconContentWrapper,
} from "./styles/nudge-with-dual-actions"
import GiftCardPrint from "../GeneratePdfPrint/gift-card-print.component"
import { useReactToPrint } from "react-to-print"
import { PDF_PAGE_STYLES } from "../GeneratePdfPrint/render-pdf-print.component"
import ReactToPdfDownload from "../downloadPdf/ReactToPdfDowload"
import { ShareImage } from "../share/styles/booking-details-share"
import { CONSTANTS, ICONS } from "../constants"
import GiftCardPrintComponent from "../GeneratePdfPrint/gift-card-print.component"
type NudgeWithDualActionsProps = {
  icon?: any
  variant: string
  subtitle: string
  description: string
  largeVariant: string
  aesthetic: aestheticItems
  PrimaryAction: ActionProps
  secondaryAction: ActionProps
}

const NudgeWithDualActionsComponent = ({
  icon,
  variant,
  subtitle,
  aesthetic,
  description,
  largeVariant,
  PrimaryAction,
  secondaryAction,
}: NudgeWithDualActionsProps) => {
  const { cardPadding } = useAesthetics(aesthetic?._ref)
  const isMobile = useMobileCheck()
  const pageContext = useContext(PageContext)

  const [loader, setLoader] = useState<boolean>(false)

  const giftCardConfirmationPageStore = pageContext?.getPageStore(
    PAGE_STORES.GIFTCARD_STORES.giftCardConfirmationPageStore
  ) as GiftCardConfirmationPageStore

  const giftCardRef = useRef<any>()
  const fileName = `${CONSTANTS?.GIFT_CARD_PDF}_${
    giftCardConfirmationPageStore?.paymentConfirmationResponse
      ?.purchaseOrderNumber ||
    giftCardConfirmationPageStore?.paymentConfirmationResponse?.purchaseOrderNo
  }`

  useEffect(() => {
    setLoader(giftCardConfirmationPageStore?.loading)
  }, [giftCardConfirmationPageStore?.loading])

  return (
    <NudgeContainer
      $margin={cardPadding}
      aria-label={isMobile ? variant : largeVariant}>
      <div
        style={{
          display: "none",
        }}>
        <div className="pass-title" ref={giftCardRef}>
          <GiftCardPrint />
        </div>
      </div>
      {(subtitle || description) && (
        <Box
          sx={{
            textAlign: "center",
            paddingBottom: isMobile ? MobilePxToVw(50) : DesktopPxToVw(80),
          }}>
          <Typography variant={isMobile ? "m-body-l" : "body-l"}>
            {subtitle}
          </Typography>
          {description && (
            <Box
              sx={{
                marginTop: isMobile ? MobilePxToVw(55) : DesktopPxToVw(80),
              }}>
              <Typography variant={isMobile ? "m-body-l" : "body-l"}>
                {description}
              </Typography>
            </Box>
          )}
        </Box>
      )}
      <NudgeBox $giftCardConfirmation={giftCardConfirmationPageStore}>
        <RenderActionItem
          url={PrimaryAction?.url}
          title={PrimaryAction?.title}
          navigationType={PrimaryAction?.urlType}
          variant={PrimaryAction?.variant}
          isActionButtonType={true}
          buttonStyles={{
            height: isMobile ? "auto !important" : "3.177vw",
            flex: isMobile ? "1 1 0px" : "none",
            padding: isMobile
              ? `${MobilePxToVw(18)} ${MobilePxToVw(36)} !important`
              : `${DesktopPxToVw(18)} ${DesktopPxToVw(36)}`,
            fontSize: isMobile ? "2.813vw" : "0.938vw",
            letterSpacing: "1.8px",
          }}
        />
        <RenderActionItem
          url={secondaryAction?.url}
          title={secondaryAction?.title}
          navigationType={secondaryAction?.urlType}
          variant={secondaryAction?.variant}
          isActionButtonType={true}
          buttonStyles={{
            height: isMobile ? "auto !important" : "3.177vw",
            flex: isMobile ? "1 1 0px" : "none",
            padding: isMobile
              ? `${MobilePxToVw(18)}${MobilePxToVw(36)} !important`
              : `${DesktopPxToVw(18)} ${DesktopPxToVw(36)}`,
            fontSize: isMobile ? "2.813vw" : "0.938vw",
            letterSpacing: "1.8px",
          }}
        />
      </NudgeBox>
      {icon && (
        <ShareIconContentWrapper $isMobile={isMobile}>
          <Typography variant={isMobile ? "m-body-s" : "body-s"}>
            Share :
          </Typography>
          <ReactToPdfDownload
            downloadButton={
              <ShareImage component="img" src={ICONS?.SHARE_MAIL_ICON} />
            }
            type="email"
            PDFData={<GiftCardPrintComponent />}
            fileNameForUrl={fileName}
            emailSubject={CONSTANTS.GIFT_CARD_EMAIL}
          />
          {ICONS?.SHARE_WHATSAPP_ICON && (
            <ReactToPdfDownload
              downloadButton={
                <ShareImage component="img" src={ICONS?.SHARE_WHATSAPP_ICON} />
              }
              type="whatsapp"
              PDFData={<GiftCardPrintComponent />}
              fileNameForUrl={fileName}
            />
          )}
          {ICONS?.SHARE_DOWNLOAD_ICON && (
            <ReactToPdfDownload
              downloadButton={
                <ShareImage component="img" src={ICONS?.SHARE_DOWNLOAD_ICON} />
              }
              type="download"
              PDFData={<GiftCardPrintComponent />}
              fileNameForUrl={fileName}
            />
          )}
        </ShareIconContentWrapper>
      )}
    </NudgeContainer>
  )
}

export default NudgeWithDualActionsComponent
