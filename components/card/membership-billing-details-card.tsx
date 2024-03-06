import React, { useContext, useEffect, useState, Fragment, useCallback } from "react"
import dynamic from "next/dynamic"
import { theme } from "../../lib/theme"
import { urlFor } from "../../lib-sanity"
import { observer } from "mobx-react-lite"
import Pluralize from "../../utils/pluralize"
import { useMobileCheck } from "../../utils/isMobilView"
import { useLoggedIn } from "../../utils/hooks/useLoggedIn"
import { CART_SUMMARY, CONSTANTS, ICONS } from "../constants"
import RenderActionItem from "../hoc/actions/action-items-ui"
import getGiftCardDetails from "../../utils/fetchGiftCardDetails"
import { GLOBAL_STORES, PAGE_STORES } from "../../utils/Constants"
import { ConfirmationMailShareIcon } from "../../utils/customIcons"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
import { BOOKING_CONSTANT } from "../../features/booking/constants"
import fetchMembershipDetails from "../../utils/fetchMembershipData"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import GiftCardStore from "../../features/giftCard/store/globalStore/gift-card.store"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import data from "../../mock-data/epicure-membership-json/membership-billing-details.json"
import LoyaltyConfirmationPageStore from "../../features/loyalty/store/pageStore/loyaltyConfirmation.store"
import GiftCardConfirmationPageStore from "../../features/giftCard/store/pageStore/GCConfirmationPage.store"
import { useRouter } from "next/router"
import {
  currencyPrettier,
  numberFormatWithoutSymbol,
  currencyWithNoDecimalsWithMinus,
  formatCurrencyWithMinusWithoutDecimal,
} from "../../utils/currency"
import { Box, Grid, Modal, Button, Stack, Collapse, Typography } from "@mui/material"
import {
  MarginBox,
  FieldsGrid,
  BoldTypography,
  ButtonBoxStyle,
  StyledSeperator,
  SummaryTypography,
  GridRightTextAligner,
  CustomAccordianStyle,
  GiftCardContentWrapper,
  LoyaltyLeftSideImageContent,
  GiftcardActionButtonsWrapper,
  GiftCardContentBottomDivider,
  GiftCardContentTotalPriceWrapper,
  GiftcardPrintActionButtonsWrapper,
} from "./styles/membership-billing-details-card"
import fetchEpicureBanners, {
  fetchEpicureBankBanners,
  fetchEpicureJourneyBanners,
} from "../../utils/epicure-banner-groq"

const PDFGenerator = dynamic(() => import("../downloadPdf/ReactToPdfDowload"))
const LoyaltyConfirmationShare = dynamic(() => import("../share/loyalty-share.component"))
const GeneratePDFPrint = dynamic(() => import("../GeneratePdfPrint/render-pdf-print.component"))
const EpicurePrintComponent = dynamic(() => import("../GeneratePdfPrint/epicure-print.component"))
const GiftCardPrintComponent = dynamic(() => import("../GeneratePdfPrint/gift-card-print.component"))

//* USED IN EPICURE ENROLLMENT SUCCESSFUL
const BillingDetailCardComponent = ({ props, isLoyaltyEpicure }: any) => {
  const isMobile = useMobileCheck()
  const pageContext = useContext(PageContext)
  const IHCLContexts = useContext(IHCLContext)
  const isLoggedIn = useLoggedIn()
  const router = useRouter()
  const epicureLabels: any = props?.parameterMap
  const LoyaltyEpicureStore = pageContext?.getPageStore(
    PAGE_STORES?.LOYALTY_STORES.loyaltyConfirmationStore,
  ) as LoyaltyConfirmationPageStore

  const giftCardConfirmationPageStore = pageContext?.getPageStore(
    PAGE_STORES.GIFTCARD_STORES.giftCardConfirmationPageStore,
  ) as GiftCardConfirmationPageStore

  const GCFormDetailsStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.giftCardStore) as GiftCardStore

  const [membershipDetails, setMembershipDetails] = useState([])
  const [isBankUrl, setIsBankUrl] = useState<boolean>(false)
  const [openShare, setOpenShare] = useState<boolean>(false)
  const [purchasedProductDetails, setPurchaseProductDetails] = useState<any>()
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [skuDetails, setSkuDetails] = useState<any>()
  const [membershipType, setMemberShipType] = useState<string>("")
  const [programType, setProgramType] = useState<string>("")
  const bankName: any = router?.query?.bankName

  useEffect(() => {
    props?.parameterMap?.map((item: any) => {
      if (item?.value !== undefined) {
        if (item?.key?.toLowerCase() === "shareholder" && router?.query?.programType === "shareholder") {
          setProgramType("shareholder")
          setMemberShipType(item?.value)
        } else if (item?.key?.toLowerCase() === "tata" && router?.query?.programType === "tata") {
          setProgramType("tata")
          setMemberShipType(item?.value)
        } else if (item?.key?.toLowerCase() === "renewal" && router?.query?.programType === "renewal") {
          setProgramType("renewal")
          setMemberShipType(item?.value)
        } else if (item?.key?.toLowerCase() === "renewal" && router?.query?.programType === "bank") {
          setIsBankUrl(true)
        }
      }
    })
  }, [props?.parameterMap, router?.query])
  useEffect(() => {
    async function fetchMembershipProductDetails() {
      let response = await fetchMembershipDetails()
      setMembershipDetails(response)
    }
    fetchMembershipProductDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleEpicureBanner = useCallback(
    async () => {
      let response: any
      if (router?.query?.programType === "bank") {
        response = await fetchEpicureBankBanners(bankName)
      } else if (programType) {
        response = await fetchEpicureBanners(programType)
      } else {
        response = await fetchEpicureJourneyBanners()
      }
      LoyaltyEpicureStore?.updateEpicureBannerData(response?.[0]?.banner)
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isBankUrl, membershipType],
  )
  useEffect(() => {
    handleEpicureBanner()
  }, [handleEpicureBanner])

  useEffect(() => {
    if (membershipDetails) {
      let productDetails = membershipDetails?.filter(
        (product: any) =>
          product?.planCode?.toLowerCase() ===
            LoyaltyEpicureStore?.loyaltyConfirmationResponse?.products?.[0]?.type?.toLowerCase() ||
          product?.tier?.toLowerCase() ===
            LoyaltyEpicureStore?.loyaltyConfirmationResponse?.products?.[0]?.type?.toLowerCase(),
      )
      productDetails?.length > 0 && setPurchaseProductDetails(productDetails?.[0])
    }
  }, [LoyaltyEpicureStore?.loyaltyConfirmationResponse?.products, membershipDetails])

  const orderResponse = LoyaltyEpicureStore?.loyaltyConfirmationResponse
  const productDetails = LoyaltyEpicureStore?.loyaltyConfirmationResponse?.products?.[0]
  const giftCardPaymentConfirmation = giftCardConfirmationPageStore?.paymentConfirmationResponse
  let giftCardBuyerName = `${giftCardPaymentConfirmation?.senderFirstName} ${giftCardPaymentConfirmation?.senderLastName}`
  let giftCardPlaneName = skuDetails?.title?.desktopTitle.toString()

  useEffect(() => {
    if (giftCardPaymentConfirmation?.giftCard?.[0]?.sku) {
      let skuDetails: any = getGiftCardDetails(giftCardPaymentConfirmation?.giftCard?.[0]?.sku)
      skuDetails.then((data: any) => {
        setSkuDetails(data?.[0])
        GCFormDetailsStore?.updateGCThemeData(data?.[0])
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [giftCardPaymentConfirmation?.giftCard?.[0]?.sku])
  const loyaltyPriceBreakUp = LoyaltyEpicureStore?.loyaltyConfirmationResponse?.priceBreakUp
  const isNotBank = LoyaltyEpicureStore?.loyaltyConfirmationResponse?.products?.[0]?.type?.toLowerCase() !== "corporate"
  const epicurePurchase = !!loyaltyPriceBreakUp?.discountPrice || !!loyaltyPriceBreakUp?.neuCoins

  return (
    <>
      <MarginBox
        aria-label="membership-billing-cancellation-policy"
        $giftCardConfirmation={giftCardPaymentConfirmation?.priceBreakUp}>
        <Grid container sx={{ justifyContent: "space-between" }}>
          <Grid xs={isMobile ? 12 : 5}>
            <LoyaltyLeftSideImageContent>
              {!!isLoyaltyEpicure &&
                !GCFormDetailsStore?.GCThemeData?.base?.largeImage?.asset?._ref &&
                purchasedProductDetails?.image?.smallImage?.asset?._ref && (
                  <Box
                    sx={{
                      paddingRight: isMobile ? MobilePxToVw(0) : DesktopPxToVw(9),
                    }}
                    width={isMobile ? MobilePxToVw(360) : DesktopPxToVw(380)}
                    height={isMobile ? MobilePxToVw(237) : DesktopPxToVw(250)}
                    alt={purchasedProductDetails?.image?.smallImage?.altText || "membership"}
                    component={"img"}
                    src={urlFor(purchasedProductDetails?.image?.smallImage?.asset?._ref)?.url()}
                  />
                )}
              {!isLoyaltyEpicure && !!GCFormDetailsStore?.GCThemeData?.base?.largeImage?.asset?._ref && (
                <Box
                  width={isMobile ? MobilePxToVw(360) : DesktopPxToVw(380)}
                  height={isMobile ? MobilePxToVw(237) : DesktopPxToVw(250)}
                  alt={GCFormDetailsStore?.GCThemeData?.base?.largeImage?.altText || "membership"}
                  component={"img"}
                  src={urlFor(GCFormDetailsStore?.GCThemeData?.base?.largeImage?.asset?._ref)?.url()}
                />
              )}

              {/* confirmation page MY ACCOUNT button commented */}
              {(props.primaryAction?.title || props.secondaryAction?.title) && (
                <RenderActionItem
                  url={isLoggedIn ? props.primaryAction?.url : props.secondaryAction?.url}
                  title={isLoggedIn ? props.primaryAction?.title : props.secondaryAction?.title}
                  variant={isLoggedIn ? props.primaryAction?.variant : props.secondaryAction?.variant}
                  navigationType={isLoggedIn ? props.primaryAction?.urlType : props.secondaryAction?.urlType}
                  isActionButtonType={true}
                  buttonStyles={{
                    lineHeight: "140%",
                    letterSpacing: "1.8px",
                    width: "auto",
                    whiteSpace: "noWrap ",
                  }}
                />
              )}
            </LoyaltyLeftSideImageContent>
          </Grid>
          {/* removed cancellation policy in order confirmation page.*/}
          {/* <Grid
            xs={isMobile ? 12 : 6.5}
            sx={{
              columnCount: 1,
              display: "flex",
              flexDirection: "column",
              marginBottom: isMobile ? "5.469vw" : "",
              rowGap: isMobile ? "1.563vw" : "0.521vw",
            }}>
            {data?.title && (
              <Typography variant={isMobile ? "m-body-s" : "body-s"}>
                {data?.title}
              </Typography>
            )}
            {data?.subTitle && (
              <Typography variant={isMobile ? "m-body-s" : "body-s"}>
                {data?.subTitle}
              </Typography>
            )}
          </Grid> */}
          <Grid item xs={isMobile ? 12 : 5.5}>
            {isMobile && !giftCardPaymentConfirmation && (
              <Grid container sx={{ marginBottom: "3.125vw" }}>
                <SummaryTypography>{CART_SUMMARY}</SummaryTypography>
              </Grid>
            )}
            {giftCardPaymentConfirmation?.giftCard?.[0]?.amount && (
              <GiftCardContentWrapper container>
                <Grid item xs={6}>
                  {giftCardPaymentConfirmation?.giftCard?.[0]?.amount && (
                    <Typography
                      variant={isMobile ? "m-body-s" : "body-s"}
                      sx={isMobile ? { fontSize: MobilePxToVw(22) } : { fontSize: DesktopPxToVw(19) }}>
                      {data?.giftCard?.singleCardPrice}
                    </Typography>
                  )}
                </Grid>
                <GridRightTextAligner item xs={6}>
                  {giftCardPaymentConfirmation?.giftCard?.[0]?.amount && (
                    <Typography variant={isMobile ? "m-body-sxl" : "body-ml"}>
                      {currencyPrettier(Number(giftCardPaymentConfirmation?.giftCard?.[0]?.amount))}
                      {` x ${giftCardPaymentConfirmation?.giftCard?.length}`}
                    </Typography>
                  )}
                </GridRightTextAligner>
              </GiftCardContentWrapper>
            )}
            {isNotBank && (
              <>
                {loyaltyPriceBreakUp && (
                  <FieldsGrid
                    sx={{
                      marginBottom: "0.4vw !important",
                    }}
                    container>
                    <Grid item xs={6}>
                      <Typography
                        variant={isMobile ? "m-body-s" : "body-s"}
                        sx={isMobile ? { fontSize: MobilePxToVw(22) } : { fontSize: "0.989vw" }}>
                        {epicureLabels?.[0]?.value}
                      </Typography>
                    </Grid>
                    <GridRightTextAligner item xs={6}>
                      <Typography variant={isMobile ? "m-body-sxl" : "body-ml"}>
                        {!!loyaltyPriceBreakUp?.discountPrice
                          ? currencyPrettier(Number(loyaltyPriceBreakUp?.price))
                          : currencyPrettier(Number(loyaltyPriceBreakUp?.price))}
                      </Typography>
                    </GridRightTextAligner>
                  </FieldsGrid>
                )}
                {!!loyaltyPriceBreakUp?.discountPrice && (
                  <FieldsGrid container>
                    <Grid item xs={6}>
                      {loyaltyPriceBreakUp?.discountPrice && (
                        <Typography
                          variant={isMobile ? "m-body-s" : "body-s"}
                          sx={isMobile ? { fontSize: MobilePxToVw(22) } : { fontSize: "0.989vw" }}>
                          {`${membershipType} (${loyaltyPriceBreakUp?.discountPercent}%)`}
                        </Typography>
                      )}
                    </Grid>
                    <GridRightTextAligner item xs={6}>
                      <Typography variant={isMobile ? "m-body-sxl" : "body-ml"}>
                        {formatCurrencyWithMinusWithoutDecimal(Number(loyaltyPriceBreakUp?.discountPrice))}
                      </Typography>
                    </GridRightTextAligner>
                  </FieldsGrid>
                )}
                {LoyaltyEpicureStore && (
                  <FieldsGrid container>
                    <Stack width={"100%"} flexDirection={"row"} alignItems={"flex-end"}>
                      <Grid xs={6}>
                        <CustomAccordianStyle sx={{ p: 0, m: 0 }}>
                          {
                            <Typography
                              variant={isMobile ? "m-body-sxl" : "body-s"}
                              sx={{
                                fontSize: isMobile ? MobilePxToVw(22) : DesktopPxToVw(19),
                                whiteSpace: "nowrap",
                              }}>
                              {epicureLabels?.[1]?.value}
                            </Typography>
                          }
                        </CustomAccordianStyle>
                      </Grid>
                      <GridRightTextAligner xs={6}>
                        <GridRightTextAligner item xs={12}>
                          <Typography variant={isMobile ? "m-body-sxl" : "body-ml"}>
                            {!!loyaltyPriceBreakUp?.discountTax
                              ? currencyPrettier(Number(loyaltyPriceBreakUp?.tax - loyaltyPriceBreakUp?.discountTax))
                              : currencyPrettier(Number(loyaltyPriceBreakUp?.tax))}
                          </Typography>
                        </GridRightTextAligner>
                      </GridRightTextAligner>
                    </Stack>
                  </FieldsGrid>
                )}
                {loyaltyPriceBreakUp && isNotBank && (
                  <FieldsGrid
                    container
                    justifyContent={"space-between"}
                    mt={1}
                    sx={{ marginBottom: "0.8vw !important" }}>
                    {!!Number(loyaltyPriceBreakUp?.totalPrice) && (
                      <>
                        <Typography
                          variant={isMobile ? "m-body-sxl" : "body-s"}
                          sx={{
                            fontSize: isMobile
                              ? MobilePxToVw(22)
                              : epicurePurchase
                              ? DesktopPxToVw(19)
                              : DesktopPxToVw(24),
                            whiteSpace: "nowrap",
                            fontWeight: epicurePurchase ? 300 : 700,
                          }}>
                          {epicurePurchase ? epicureLabels?.[2]?.value : epicureLabels?.[4]?.value}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: epicurePurchase ? 300 : 700,
                          }}
                          variant={
                            isMobile
                              ? epicurePurchase
                                ? "m-body-sxl"
                                : "m-body-sxl"
                              : epicurePurchase
                              ? "body-ml"
                              : "body-x"
                          }>
                          {currencyPrettier(Number(loyaltyPriceBreakUp?.totalPrice))}
                        </Typography>
                      </>
                    )}
                  </FieldsGrid>
                )}
              </>
            )}

            {giftCardPaymentConfirmation?.priceBreakUp?.totalPrice && (
              <GiftCardContentWrapper
                container
                sx={{
                  justifyContent: "space-between",
                }}>
                <Typography
                  variant={isMobile ? "m-body-s" : "body-s"}
                  sx={isMobile ? { fontSize: MobilePxToVw(22) } : { fontSize: DesktopPxToVw(19) }}>
                  {data?.giftCard?.TotalAmount}
                </Typography>
                {giftCardPaymentConfirmation?.priceBreakUp && (
                  <Typography variant={isMobile ? "m-body-sxl" : "body-ml"}>
                    {currencyPrettier(Number(giftCardPaymentConfirmation?.priceBreakUp?.totalPrice))}
                  </Typography>
                )}
              </GiftCardContentWrapper>
            )}
            {!!loyaltyPriceBreakUp?.neuCoins && (
              <GiftCardContentWrapper
                container
                sx={{
                  justifyContent: "space-between",
                }}>
                <Typography
                  variant={isMobile ? "m-body-s" : "body-s"}
                  sx={isMobile ? { fontSize: MobilePxToVw(22) } : { fontSize: DesktopPxToVw(19) }}>
                  {Number(loyaltyPriceBreakUp?.neuCoins) > 1 ? epicureLabels?.[3]?.value : data?.neucoinRedemption}
                </Typography>
                {!!loyaltyPriceBreakUp?.neuCoins && (
                  <Typography variant={isMobile ? "m-body-sxl" : "body-ml"}>
                    {currencyWithNoDecimalsWithMinus(Number(loyaltyPriceBreakUp?.neuCoins))}
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
                  sx={isMobile ? { fontSize: MobilePxToVw(22) } : { fontSize: DesktopPxToVw(19) }}>
                  {`${
                    Pluralize(
                      CONSTANTS?.NEU_COIN,
                      giftCardPaymentConfirmation?.priceBreakUp?.neuCoinsAmount,
                      false,
                    )?.split(" ")?.[1]
                  } ${CONSTANTS?.REDEEMED}`}
                </Typography>
                {giftCardPaymentConfirmation?.priceBreakUp?.neuCoinsAmount && (
                  <Typography variant={isMobile ? "m-body-sxl" : "body-ml"}>
                    {`- ${numberFormatWithoutSymbol(giftCardPaymentConfirmation?.priceBreakUp?.neuCoinsAmount)}`}
                  </Typography>
                )}
              </GiftCardContentWrapper>
            )}
            {!!giftCardPaymentConfirmation?.priceBreakUp?.price && (
              <GiftCardContentTotalPriceWrapper container>
                <BoldTypography
                  sx={{
                    fontSize: isMobile ? "3.750vw !important" : "1.250vw !important",
                  }}
                  variant={isMobile ? "m-body-l" : "body-l"}>
                  {data?.giftCard?.Total_Paid}
                </BoldTypography>
                {!!giftCardPaymentConfirmation?.priceBreakUp?.price && (
                  <BoldTypography
                    sx={{
                      fontSize: isMobile ? "5vw !important" : "1.667vw !important",
                    }}
                    variant={isMobile ? "m-body-xl" : "body-xl"}>
                    {currencyPrettier(Number(giftCardPaymentConfirmation?.priceBreakUp?.price))}
                  </BoldTypography>
                )}
              </GiftCardContentTotalPriceWrapper>
            )}
            {LoyaltyEpicureStore &&
              isNotBank &&
              !!Number(loyaltyPriceBreakUp?.totalPayableAmount) &&
              Number(loyaltyPriceBreakUp?.totalPayableAmount) !== Number(loyaltyPriceBreakUp?.totalPrice) && (
                <FieldsGrid container justifyContent={"space-between"} mt={2} sx={{ marginBottom: "0.5vw !important" }}>
                  <>
                    <BoldTypography
                      sx={{
                        fontSize: isMobile ? "3.750vw !important" : "1.250vw !important",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                      }}
                      variant={isMobile ? "m-body-l" : "body-l"}>
                      {epicureLabels?.[4]?.value}
                    </BoldTypography>
                    <BoldTypography
                      sx={{
                        fontSize: isMobile ? "5vw !important" : "1.667vw !important",
                      }}
                      variant={isMobile ? "m-body-xl" : "body-xl"}>
                      {currencyPrettier(Number(loyaltyPriceBreakUp?.totalPayableAmount))}
                    </BoldTypography>
                  </>
                </FieldsGrid>
              )}
            {giftCardPaymentConfirmation && (
              <Collapse sx={{ paddingLeft: "1.08vw" }} in={showDetail}>
                {giftCardPaymentConfirmation &&
                  Number(
                    orderResponse?.priceBreakUp?.neuCoinsAmount ||
                      giftCardPaymentConfirmation?.priceBreakUp?.neuCoinsAmount,
                  ) > 0 && (
                    <FieldsGrid container>
                      <Grid item xs={6}>
                        {data?.price && (
                          <Typography
                            variant={isMobile ? "m-body-s" : "body-s"}
                            sx={isMobile ? { fontSize: MobilePxToVw(22) } : { fontSize: "0.989vw" }}>
                            {orderResponse?.priceBreakUp?.neuCoinsAmount > 1 ||
                            giftCardPaymentConfirmation?.priceBreakUp?.neuCoinsAmount > 1
                              ? data?.neucoinsRedemption
                              : data?.neucoinRedemption}
                          </Typography>
                        )}
                      </Grid>
                      <GridRightTextAligner item xs={6}>
                        <Typography variant={isMobile ? "m-body-sxl" : "body-ml"}>
                          {`- ${Number(
                            orderResponse?.priceBreakUp?.neuCoinsAmount ||
                              giftCardPaymentConfirmation?.priceBreakUp?.neuCoinsAmount,
                          )}`}
                        </Typography>
                      </GridRightTextAligner>
                    </FieldsGrid>
                  )}
                <FieldsGrid container mt={1}>
                  <Grid item xs={6}>
                    {data?.totalPaid && (
                      <Typography
                        variant={isMobile ? "m-body-s" : "body-s"}
                        sx={isMobile ? { fontSize: MobilePxToVw(22) } : { fontSize: "0.989vw" }}>
                        {data?.totalPaid}
                      </Typography>
                    )}
                  </Grid>
                  <GridRightTextAligner item xs={6}>
                    {orderResponse?.priceBreakUp?.price || giftCardPaymentConfirmation?.priceBreakUp?.price ? (
                      <Typography variant={isMobile ? "m-body-sxl" : "body-ml"}>
                        ₹{" "}
                        {currencyPrettier(
                          Number(
                            orderResponse?.priceBreakUp?.price || giftCardPaymentConfirmation?.priceBreakUp?.price || 0,
                          ),
                        )?.slice(2)}
                      </Typography>
                    ) : (
                      <Typography variant={isMobile ? "m-body-sxl" : "body-ml"}>₹ 0</Typography>
                    )}
                  </GridRightTextAligner>
                </FieldsGrid>
              </Collapse>
            )}
            {isNotBank && <StyledSeperator $giftCardPaymentConfirmation={giftCardPaymentConfirmation} />}
            {isLoyaltyEpicure && (
              <ButtonBoxStyle>
                <PDFGenerator
                  downloadButton={
                    <Button
                      variant={"light-contained"}
                      sx={{ "& .MuiButton-startIcon": { height: "100%" } }}
                      startIcon={
                        <Box
                          sx={{
                            paddingRight: isMobile ? MobilePxToVw(0) : DesktopPxToVw(9),
                          }}
                          minWidth={isMobile ? "auto" : "100%"}
                          alt="mail-icon"
                          component={"img"}
                          src={ICONS?.WHITE_DOWNLOAD_ICON}
                        />
                      }>
                      {BOOKING_CONSTANT.DOWNLOAD}
                    </Button>
                  }
                  type="download"
                  PDFData={<EpicurePrintComponent />}
                  fileNameForUrl={`${purchasedProductDetails?.title && purchasedProductDetails?.title}_Confirmation_${
                    orderResponse?.purchaseOrderNumber ? orderResponse?.purchaseOrderNumber : orderResponse?.orderId
                  }`}
                />

                {data?.print && <GeneratePDFPrint page="epicure" />}
                {data?.share && (
                  <Button
                    sx={{ gap: 1.25 }}
                    variant="light-contained"
                    onClick={() => setOpenShare(true)}
                    startIcon={<ConfirmationMailShareIcon />}>
                    <BoldTypography
                      sx={{ color: theme?.palette?.neuPalette?.hexOne }}
                      variant={isMobile ? "m-heading-xxs" : "heading-xxs"}>
                      {data?.share}
                    </BoldTypography>
                  </Button>
                )}
              </ButtonBoxStyle>
            )}
            {giftCardPaymentConfirmation?.priceBreakUp && (
              <GiftcardActionButtonsWrapper>
                <PDFGenerator
                  downloadButton={
                    <Button
                      variant={"light-contained"}
                      startIcon={
                        <Box
                          sx={{
                            paddingRight: isMobile ? MobilePxToVw(0) : DesktopPxToVw(9),
                          }}
                          width={isMobile ? MobilePxToVw(20) : "100%"}
                          height={isMobile ? MobilePxToVw(20) : DesktopPxToVw(20)}
                          alt="mail-icon"
                          component={"img"}
                          src={ICONS?.WHITE_DOWNLOAD_ICON}
                        />
                      }>
                      {BOOKING_CONSTANT.DOWNLOAD}
                    </Button>
                  }
                  type="download"
                  PDFData={<GiftCardPrintComponent props={props} downloadPagePDF={true} />}
                  fileNameForUrl={`${
                    giftCardPlaneName ? giftCardPlaneName : giftCardPaymentConfirmation?.giftCard?.[0]?.theme
                  }_Confirmation_${giftCardPaymentConfirmation?.giftCard?.[0]?.sku}`}
                  giftCardPageResolution={true}
                />

                {data?.print && (
                  <GiftcardPrintActionButtonsWrapper $isMobile={isMobile}>
                    <GeneratePDFPrint page="gift-card" giftcardConfirmationPrint={props} />
                  </GiftcardPrintActionButtonsWrapper>
                )}
                {data?.share && (
                  <Button
                    sx={{ gap: isMobile ? 0 : DesktopPxToVw(10) }}
                    variant="light-contained"
                    onClick={() => setOpenShare(true)}
                    startIcon={
                      <ConfirmationMailShareIcon
                        sx={{
                          width: isMobile ? MobilePxToVw(26) : DesktopPxToVw(26),
                          height: isMobile ? MobilePxToVw(22) : DesktopPxToVw(22),
                        }}
                      />
                    }>
                    <Typography
                      fontWeight={700}
                      sx={{ color: theme?.palette?.neuPalette?.hexOne }}
                      variant={isMobile ? "m-body-xs" : "body-s"}>
                      {data?.share}
                    </Typography>
                  </Button>
                )}
              </GiftcardActionButtonsWrapper>
            )}
          </Grid>
        </Grid>
        {giftCardPaymentConfirmation?.priceBreakUp && (
          <GiftCardContentBottomDivider orientation="horizontal" $isMobile={isMobile} />
        )}
      </MarginBox>
      {openShare && (
        <Fragment>
          <Modal open={openShare}>
            <>
              <LoyaltyConfirmationShare
                img={
                  LoyaltyEpicureStore
                    ? purchasedProductDetails?.image?.largeImage?.asset?._ref
                    : GCFormDetailsStore?.GCThemeData?.base?.largeImage?.asset?._ref
                }
                cardNumber={
                  LoyaltyEpicureStore
                    ? orderResponse?.purchaseOrderNumber || orderResponse?.orderId
                    : giftCardPaymentConfirmation?.purchaseOrderNo
                }
                buyerName={LoyaltyEpicureStore ? orderResponse?.buyerName : giftCardBuyerName}
                planName={
                  LoyaltyEpicureStore
                    ? purchasedProductDetails?.title
                    : giftCardPlaneName
                    ? giftCardPlaneName
                    : giftCardPaymentConfirmation?.giftCard?.[0]?.theme
                }
                setOpenShare={setOpenShare}
                isConfirmationGiftCard={!LoyaltyEpicureStore}
                isConfirmationGiftCardReviewDownloadPagePDF={true}
                props={props}
                giftCardConfirmationDownloadPagePDF={true}
              />
            </>
          </Modal>
        </Fragment>
      )}
    </>
  )
}
export default observer(BillingDetailCardComponent)
