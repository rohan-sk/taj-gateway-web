import React, { useContext, useState, useEffect } from "react"
import { Box } from "@mui/system"
import dynamic from "next/dynamic"
import { groq } from "next-sanity"
import { observer } from "mobx-react-lite"
import { urlFor, getClient } from "../../lib-sanity"
import { currencyPrettier, numberFormatWithoutSymbol } from "../../utils/currency"
import { useMobileCheck } from "../../utils/isMobilView"
import { GLOBAL_STORES, PAGE_STORES } from "../../utils/Constants"
import { useBrowserCheck } from "../../utils/hooks/useBrowserCheck"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import GiftCardStore from "../../features/giftCard/store/globalStore/gift-card.store"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import GiftCardConfirmationPageStore from "../../features/giftCard/store/pageStore/GCConfirmationPage.store"
const GiftCardSummaryComponent = dynamic(() => import("../card/gift-card-summary.component"))
import {
  BoldTypography,
  GiftCardContentTotalPriceWrapper,
  GiftCardContentWrapper,
  GridRightTextAligner,
  LoyaltyLeftSideImageContent,
  MarginBox,
} from "../card/styles/membership-billing-details-card"
import { Grid, Typography } from "@mui/material"
import Pluralize from "../../utils/pluralize"
import { CONSTANTS } from "../constants"
import { GIFT_CARD_CONSTANTS } from "../forms/gift-card-form/constants"
const MultiRowTitle = dynamic(() => import("../hoc/title/multi-row-title"))

const GiftCardPrint = ({
  props,
  isPrintAction = false,
  downloadPagePDF = false,
  shareDownloadPagePDF = false,
}: any) => {
  const pageContext = useContext(PageContext)
  const context = useContext(IHCLContext)

  const { getOptimizeImageUrl } = useImageUtility()
  const isMobile = useMobileCheck()
  const { isIos } = useBrowserCheck()

  const [dynamicEGCImageFront, setDynamicEGCImageFront] = useState<any>("")
  const [dynamicEGCImageBack, setDynamicEGCImageBack] = useState<any>("")
  const [dynamicEGCBannerImage, setDynamicEGCBannerImage] = useState<any>("")

  const giftCardConfirmationPageStore = pageContext?.getPageStore(
    PAGE_STORES.GIFTCARD_STORES.giftCardConfirmationPageStore,
  ) as GiftCardConfirmationPageStore

  const GCFormDetailsStore = context?.getGlobalStore(GLOBAL_STORES.giftCardStore) as GiftCardStore

  const cardDetails = giftCardConfirmationPageStore?.paymentConfirmationResponse

  const SingleGCDetails = giftCardConfirmationPageStore?.paymentConfirmationResponse?.giftCard?.[0]

  const fetchEGCDetails = async (sku: string | string[] | null) => {
    const query = groq`*[_type == "giftCardsDetails" && sku == "${sku}"]`
    await getClient(true)
      .fetch(query)
      .then((data) => {
        setDynamicEGCBannerImage(data?.[0]?.bannerImage)
        setDynamicEGCImageFront(data?.[0]?.cardPreview?.frontImage)
        setDynamicEGCImageBack(data?.[0]?.cardPreview?.backImage)
      })
  }

  useEffect(() => {
    if (SingleGCDetails?.sku) {
      fetchEGCDetails(SingleGCDetails.sku)
    }
  }, [SingleGCDetails])
  const giftCardPaymentConfirmation = giftCardConfirmationPageStore?.paymentConfirmationResponse

  return (
    <Box
      width={
        isMobile
          ? isIos
            ? downloadPagePDF
              ? MobilePxToVw(1280)
              : "100%"
            : downloadPagePDF
            ? MobilePxToVw(1280)
            : "100%"
          : DesktopPxToVw(1920)
      }
      sx={{
        marginTop: isPrintAction ? (isMobile ? MobilePxToVw(20) : DesktopPxToVw(80)) : 0,
      }}>
      <Box
        sx={{
          ".multi-row-group-title": { fontSize: isMobile && downloadPagePDF ? "7vw" : "3.75vw !important" },
          ".multi-row-group-subtitle": {
            fontSize: isMobile && downloadPagePDF ? "3vw" : downloadPagePDF ? "1.5vw" : "1.667vw !important",
            maxWidth: isMobile && downloadPagePDF ? MobilePxToVw(950) : "62vw",
          },
        }}>
        <MultiRowTitle
          subTitle={props?.description}
          title={{
            mobileTitle: [props?.title],
            desktopTitle: [props?.title],
            headingElement: undefined,
          }}
          charactersLimit={props?.description?.length}
          alignmentVariant={"center"}
          aesthetic={undefined}
          isComponentFullWidth={false}
          isMobileComponentFullWidth={false}
        />
      </Box>
      <GiftCardSummaryComponent parameterMap={props?.parameterMap} printPage={isPrintAction} downloadPagePDF={true} />
      <MarginBox>
        <Grid
          container
          sx={{
            justifyContent: "space-between",
          }}>
          <Grid lg={5} md={5} sm={5} xs={5}>
            <LoyaltyLeftSideImageContent>
              {!!GCFormDetailsStore?.GCThemeData?.base?.largeImage?.asset?._ref && (
                <Box
                  width={isMobile ? "100%" : "19.792vw"}
                  height={isMobile ? "100%" : "13.021vw"}
                  alt="membership"
                  component={"img"}
                  src={urlFor(GCFormDetailsStore?.GCThemeData?.base?.largeImage?.asset?._ref)?.url()}
                />
              )}
            </LoyaltyLeftSideImageContent>
          </Grid>
          <Grid lg={5.5} md={5.5} sm={5.5} xs={5.5}>
            {giftCardPaymentConfirmation?.giftCard?.[0]?.amount && (
              <GiftCardContentWrapper container>
                <Grid xs={6}>
                  {giftCardPaymentConfirmation?.giftCard?.[0]?.amount && (
                    <Typography
                      variant={isMobile ? "m-body-s" : "body-s"}
                      sx={{
                        fontSize: isMobile ? (downloadPagePDF ? "2.8vw" : "1.51vw") : "1.51vw",
                      }}>
                      {GIFT_CARD_CONSTANTS?.PRICE_QUANTITY}
                    </Typography>
                  )}
                </Grid>
                <GridRightTextAligner xs={6}>
                  {giftCardPaymentConfirmation?.giftCard?.[0]?.amount && (
                    <Typography
                      variant={isMobile ? "m-body-sxl" : "body-ml"}
                      sx={{
                        fontSize: isMobile ? (downloadPagePDF ? "3vw" : "1.667vw") : "1.667vw",
                      }}>
                      {currencyPrettier(Number(giftCardPaymentConfirmation?.giftCard?.[0]?.amount))}
                      {` x ${giftCardPaymentConfirmation?.giftCard?.length}`}
                    </Typography>
                  )}
                </GridRightTextAligner>
              </GiftCardContentWrapper>
            )}

            {giftCardPaymentConfirmation?.priceBreakUp?.totalPrice && (
              <GiftCardContentWrapper
                container
                sx={{
                  justifyContent: "space-between",
                }}>
                <Typography
                  variant={isMobile ? "m-body-s" : "body-s"}
                  sx={{
                    fontSize: isMobile ? (downloadPagePDF ? "2.8vw" : "1.51vw") : "1.51vw",
                  }}>
                  {GIFT_CARD_CONSTANTS?.TOTAL_AMOUNT}
                </Typography>
                {giftCardPaymentConfirmation?.priceBreakUp && (
                  <Typography
                    variant={isMobile ? "m-body-sxl" : "body-ml"}
                    sx={{
                      fontSize: isMobile ? (downloadPagePDF ? "3vw" : "1.667vw") : "1.667vw",
                    }}>
                    {currencyPrettier(Number(giftCardPaymentConfirmation?.priceBreakUp?.totalPrice))}
                  </Typography>
                )}
              </GiftCardContentWrapper>
            )}
            {!!giftCardPaymentConfirmation?.priceBreakUp?.neuCoinsAmount && (
              <GiftCardContentWrapper
                container
                sx={{
                  justifyContent: "space-between",
                }}>
                <Typography
                  variant={isMobile ? "m-body-s" : "body-s"}
                  sx={{
                    fontSize: isMobile ? (downloadPagePDF ? "2.8vw" : "1.51vw") : "1.51vw",
                  }}>
                  {`${
                    Pluralize(
                      CONSTANTS?.NEU_COIN,
                      giftCardPaymentConfirmation?.priceBreakUp?.neuCoinsAmount,
                      false,
                    )?.split(" ")?.[1]
                  } ${CONSTANTS?.REDEEMED}`}
                </Typography>
                {giftCardPaymentConfirmation?.priceBreakUp?.neuCoinsAmount && (
                  <Typography
                    variant={isMobile ? "m-body-sxl" : "body-ml"}
                    sx={{
                      fontSize: isMobile ? (downloadPagePDF ? "3vw" : "1.667vw") : "1.667vw",
                    }}>
                    {`- ${numberFormatWithoutSymbol(giftCardPaymentConfirmation?.priceBreakUp?.neuCoinsAmount)}`}
                  </Typography>
                )}
              </GiftCardContentWrapper>
            )}
            {!!giftCardPaymentConfirmation?.priceBreakUp?.price && (
              <GiftCardContentTotalPriceWrapper container>
                <BoldTypography
                  variant={isMobile ? "m-body-l" : "body-l"}
                  sx={{
                    fontSize: isMobile ? (downloadPagePDF ? "3.5vw" : "1.771vw !important") : "1.771vw !important",
                  }}>
                  {GIFT_CARD_CONSTANTS?.AMOUNT_PAID}
                </BoldTypography>
                {!!giftCardPaymentConfirmation?.priceBreakUp?.price && (
                  <BoldTypography
                    variant={isMobile ? "m-body-xl" : "body-xl"}
                    sx={{
                      fontSize: isMobile ? (downloadPagePDF ? "3.5vw" : "2.188vw !important") : "2.188vw !important",
                    }}>
                    {currencyPrettier(Number(giftCardPaymentConfirmation?.priceBreakUp?.price))}
                  </BoldTypography>
                )}
              </GiftCardContentTotalPriceWrapper>
            )}
          </Grid>
        </Grid>
      </MarginBox>
    </Box>
  )
}

export default observer(GiftCardPrint)
