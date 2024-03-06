import React, { useContext, useState } from "react"
import { observer } from "mobx-react-lite"
import { Box, Typography } from "@mui/material"
import { urlFor } from "../../../lib-sanity"
import { AmountTypography, FormBox } from "./styles"
import { currencyPrettier } from "../../../utils/currency"
import DesktopPxToVw from "../../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../../utils/isMobilView"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import { useImageUtility } from "../../../utils/hooks/useImageUtility"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import GiftCardStore from "../../../features/giftCard/store/globalStore/gift-card.store"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import GiftCardConfirmationPageStore from "../../../features/giftCard/store/pageStore/GCConfirmationPage.store"
import { useBrowserCheck } from "../../../utils/hooks/useBrowserCheck"

interface GcReviewImageFormProps {
  props?: any
  isDownloadPagePDF?: boolean
  isDownloadPDFPageFromShareIcon?: boolean
}

const GcReviewImageForm: React.FC<GcReviewImageFormProps> = ({ isDownloadPagePDF, isDownloadPDFPageFromShareIcon }) => {
  const [imgLoaded, setImgLoaded] = useState(false)
  // const [showLoadingError, setShowLoadingError] = useState(false)

  const { isIos } = useBrowserCheck()
  const isMobile = useMobileCheck()
  const context = useContext(IHCLContext)
  const pageContext = useContext(PageContext)
  const GCStore = context?.getGlobalStore(GLOBAL_STORES.giftCardStore) as GiftCardStore
  const giftCardConfirmationPageStore = pageContext?.getPageStore(
    PAGE_STORES.GIFTCARD_STORES.giftCardConfirmationPageStore,
  ) as GiftCardConfirmationPageStore
  const { getOptimizeImageUrl } = useImageUtility()

  const PortableText = context!.PortableText

  // commented  as its taking more time to render img

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     if (!imgLoaded) {
  //       setShowLoadingError(true)
  //     }
  //   }, 5000) // 5000 milliseconds (5 seconds)

  //   return () => {
  //     clearTimeout(timeoutId)
  //   }
  // }, [imgLoaded])
  return (
    <>
      <FormBox
        sx={{
          padding: giftCardConfirmationPageStore ? 0 : `${DesktopPxToVw(35)} ${DesktopPxToVw(60)} ${DesktopPxToVw(40)}`,
        }}
        aria-label="gc-review-image-form">
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}>
          {/* // commented as its taking more time to render img */}
          {/* {!imgLoaded && !showLoadingError && <LoadingSpinner componentLevel />}
          {showLoadingError && (
            <Typography variant={isMobile ? "m-body-s" : "body-s"} color="error">
              Image failed to load...
            </Typography>
          )} */}
          <Box
            // sx={{ display: imgLoaded ? "flex" : "none" }}
            alt="media"
            onLoad={() => setImgLoaded(true)}
            width={"100%"}
            height={"100%"}
            loading="lazy"
            component="img"
            src={
              GCStore?.GCThemeData?.frontCover?.largeImage?.asset?._ref &&
              getOptimizeImageUrl(urlFor(GCStore?.GCThemeData?.frontCover?.largeImage?.asset?._ref)?.url(), 1)
            }
          />
          {imgLoaded && (
            <AmountTypography
              $isMobile={isMobile}
              variant={isMobile ? "m-heading-s" : "heading-s"}
              $confirmationAlignment={
                !!giftCardConfirmationPageStore?.paymentConfirmationResponse?.giftCard?.[0]?.amount
              }
              $isIos={isIos}
              $isDownloadPagePDF={!!isDownloadPagePDF}
              $isDownloadPDFPageFromShareIcon={!!isDownloadPDFPageFromShareIcon}>
              {giftCardConfirmationPageStore?.paymentConfirmationResponse?.giftCard?.[0]?.amount
                ? currencyPrettier(
                    giftCardConfirmationPageStore?.paymentConfirmationResponse?.giftCard?.[0]?.amount ?? 0,
                  )
                : currencyPrettier(GCStore?.cartDetails?.items?.giftCardDetails?.[0]?.amount ?? 0)}
            </AmountTypography>
          )}
        </Box>
        {!giftCardConfirmationPageStore?.paymentConfirmationResponse?.priceBreakUp?.totalPrice && (
          <Box sx={{ margin: isMobile ? "5.4688vw 6vw" : "1.8229vw 2vw" }}>
            <Typography variant={isMobile ? "m-body-s" : "body-s"}>
              {GCStore?.GCThemeData?.previewCardDescription?.map((content: any, idx: number) => (
                <PortableText blocks={content} key={idx} />
              ))}
            </Typography>
          </Box>
        )}
      </FormBox>
    </>
  )
}

export default observer(GcReviewImageForm)
