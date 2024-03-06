import React, { useContext, useState, useEffect } from "react"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { Box, Divider, Typography } from "@mui/material"
import {
  CheckInCheckOutText,
  FinalPriceAndText,
  FinalPriceBox,
  FinalPriceWrapperBox,
  GiftDetailsWrapper,
  EpicurePurchaseWrapper,
  GiftTable,
  GiftTableHeading,
  GiftTableTitle,
  GuestDetailsHeading,
  GuestDetailsList,
  ITNumber,
  ITNumberText,
  ITNumberWrapper,
  TotalPriceAndText,
  GiftImgTitle,
  MembershipBlock,
  MembershipNumber,
  ItineraryWrapper,
  PrintContainer,
  CheckInTextOne,
  EpicurePaymentWrapper,
  GiftTableTitleTotal,
} from "./PrintTemplateStyles"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import { PAGE_STORES } from "../../utils/Constants"
import { observer } from "mobx-react-lite"
import LoyaltyConfirmationPageStore from "../../features/loyalty/store/pageStore/loyaltyConfirmation.store"
import fetchMembershipDetails from "../../utils/fetchMembershipData"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
import { urlFor } from "../../lib-sanity"
import { PDF_CONSTANT } from "./constants"
import PDFHeroBanner, { PrintTajLogo } from "./pdf-hero-banner"
import { useMobileCheck } from "../../utils/isMobilView"
import { currencyPrettier, currencyWithNoDecimalsWithMinus } from "../../utils/currency"
import { formatDateWithMON } from "../../utils/getDate"
import { useBrowserCheck } from "../../utils/hooks/useBrowserCheck"
import { useRouter } from "next/router"
import { BottomGradientBox } from "../banner/styles"
import { Stack } from "@mui/system"
import { theme } from "../../lib/theme"

const EpicurePrint = ({ isPrintAction = false }: any) => {
  const [membershipDetails, setMembershipDetails] = useState<any>([])
  const [purchasedProductDetails, setPurchaseProductDetails] = useState<any>()
  const [orderId, setOrderId] = useState<any>("")
  const { isSafari, isIos } = useBrowserCheck()
  const router = useRouter()

  const pageContext = useContext(PageContext)
  const isMobile = useMobileCheck()
  const { getOptimizeImageUrl } = useImageUtility()

  const loyaltyEpicureStore = pageContext?.getPageStore(
    PAGE_STORES?.LOYALTY_STORES.loyaltyConfirmationStore,
  ) as LoyaltyConfirmationPageStore

  const {
    mobileNumber,
    emailId,
    membershipId,
    dateOfBirth,
    gstNumber,
    paymentMethod,
    cardNumber,
    priceBreakUp,
    purchaseOrderNumber,
    buyerName,
    address,
    products,
    addOnCardDetails,
  } = loyaltyEpicureStore?.loyaltyConfirmationResponse || {}
  const bannerImage = isMobile
    ? loyaltyEpicureStore?.epicureBanners?.imageInfo?.image?.[0]?.image?.asset?._ref
    : loyaltyEpicureStore?.epicureBanners?.imageInfo?.image?.[0]?.largeImage?.asset?._ref

  const PurchaseOrderNumber = purchaseOrderNumber
  const firstName = buyerName?.split(" ")[0]
  const lastName = buyerName?.split(" ")[1]
  const isBank = products?.[0]?.type?.toLowerCase() === "corporate"

  const constructUserAddress = () => {
    let addressLine1 = address?.address1
    let city = address?.city
    let state = address?.state
    let pinCode = address?.pincode
    let country = address?.country

    return `${addressLine1 && addressLine1}${addressLine1 && ""} ${city && city}${city && ""} ${state && state}${
      state && ""
    } ${pinCode && pinCode}${pinCode && ""} ${country && country}`
  }

  useEffect(() => {
    if (global?.window?.sessionStorage?.getItem("order_id")) {
      setOrderId(global?.window?.sessionStorage?.getItem("order_id"))
    }
  }, [])

  useEffect(() => {
    async function fetchMembershipProductDetails() {
      let response = await fetchMembershipDetails()
      setMembershipDetails(response)
    }
    fetchMembershipProductDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (membershipDetails) {
      let productDetails = membershipDetails?.filter(
        (product: any) =>
          product?.planCode?.toLowerCase() === products?.[0]?.type?.toLowerCase() ||
          product?.tier?.toLowerCase() === products?.[0]?.type?.toLowerCase(),
      )
      productDetails && setPurchaseProductDetails(productDetails?.[0])
    }
  }, [products, membershipDetails])

  return (
    <PrintContainer className="page-break" $print={isPrintAction} $isIos={isIos}>
      <PrintTajLogo />
      <Box
        sx={{
          position: "relative",
          height: isMobile ? "auto" : DesktopPxToVw(780),
        }}>
        <BottomGradientBox $isIos={isIos} $gradient={theme?.palette?.ihclPalette?.linearGradientBottom} />
        <Box
          sx={{
            position: "absolute",
            left: isMobile ? MobilePxToVw(10) : DesktopPxToVw(80),
            bottom: isMobile ? 0 : DesktopPxToVw(46),
          }}>
          <Box component={"h2"}>
            <Stack columnGap={isMobile ? MobilePxToVw(20) : DesktopPxToVw(40)} direction={"row"} alignItems={"center"}>
              <Divider
                sx={{
                  background: theme?.palette?.ihclPalette?.hexOne,
                  borderColor: theme?.palette?.ihclPalette?.hexOne,
                  width: isMobile ? MobilePxToVw(40) : DesktopPxToVw(80),
                  height: isMobile ? MobilePxToVw(2) : DesktopPxToVw(2),
                }}
              />
              <Typography
                color={theme?.palette?.ihclPalette?.hexOne}
                component={"span"}
                sx={{
                  fontFamily: theme?.palette?.font?.primaryFontFamily,
                  fontSize: isMobile || isIos ? (isPrintAction ? "1.625rem" : MobilePxToVw(80)) : DesktopPxToVw(80),
                  fontWeight: 400,
                  lineHeight: isMobile ? "140%" : DesktopPxToVw(88),
                  letterSpacing: "-0.05em",
                }}>
                {purchasedProductDetails?.title}
              </Typography>
            </Stack>
          </Box>
        </Box>
        <Box
          loading="lazy"
          component={"img"}
          alt="hotel img"
          width={"100%"}
          src={bannerImage && urlFor(bannerImage)?.url()}
          height={
            isMobile
              ? isPrintAction
                ? "15.375rem"
                : isMobile && isIos && !isPrintAction
                ? "34.375rem"
                : MobilePxToVw(780)
              : DesktopPxToVw(780)
          }
        />
      </Box>

      <ItineraryWrapper $isIos={isIos}>
        <CheckInCheckOutText>
          <MembershipBlock>
            <CheckInTextOne $isIos={isIos}>{PDF_CONSTANT?.YOUR_MEMBERSHIP_NUMBER}</CheckInTextOne>
            <MembershipNumber $isIos={isIos}>{membershipId}</MembershipNumber>
          </MembershipBlock>
        </CheckInCheckOutText>
      </ItineraryWrapper>
      <Box>
        <GiftDetailsWrapper $isIos={isIos}>
          <Box sx={{ marginRight: DesktopPxToVw(25) }}>
            <GuestDetailsHeading $isIos={isIos}>{PDF_CONSTANT?.FIRST_NAME}</GuestDetailsHeading>
            <GuestDetailsList $isIos={isIos}>{firstName}</GuestDetailsList>
          </Box>
          <Box sx={{ marginRight: DesktopPxToVw(25) }}>
            <GuestDetailsHeading $isIos={isIos}>{PDF_CONSTANT?.LAST_NAME}</GuestDetailsHeading>
            <GuestDetailsList $isIos={isIos}>{lastName}</GuestDetailsList>
          </Box>
          <Box>
            <GuestDetailsHeading $isIos={isIos}>{PDF_CONSTANT?.EMAIL}</GuestDetailsHeading>
            <GuestDetailsList $isIos={isIos}>{emailId}</GuestDetailsList>
          </Box>
        </GiftDetailsWrapper>
        <EpicurePurchaseWrapper $isIos={isIos}>
          <Box>
            <GuestDetailsHeading $isIos={isIos}>{PDF_CONSTANT?.MOBILE_NUMBER}</GuestDetailsHeading>
            <GuestDetailsList $isIos={isIos}>{mobileNumber}</GuestDetailsList>
          </Box>
          <Box>
            <GuestDetailsHeading $isIos={isIos}>{PDF_CONSTANT?.DATE_OF_BIRTH}</GuestDetailsHeading>
            <GuestDetailsList $isIos={isIos}>{dateOfBirth && formatDateWithMON(dateOfBirth)}</GuestDetailsList>
          </Box>
          <Box>
            <GuestDetailsHeading $isIos={isIos}>{PDF_CONSTANT?.GST_NUMBER}</GuestDetailsHeading>
            <GuestDetailsList $isIos={isIos}>{gstNumber}</GuestDetailsList>
          </Box>
          <Box>
            <GuestDetailsHeading $isIos={isIos}>{PDF_CONSTANT?.MEMBERSHIP_TYPE}</GuestDetailsHeading>
            <GuestDetailsList $isIos={isIos}>{purchasedProductDetails?.title}</GuestDetailsList>
          </Box>
        </EpicurePurchaseWrapper>
        <EpicurePaymentWrapper $isIos={isIos}>
          <Box>
            <GuestDetailsHeading $isIos={isIos}>{PDF_CONSTANT?.PAYMENT_METHODS}</GuestDetailsHeading>
            <GuestDetailsList $isIos={isIos}>{paymentMethod}</GuestDetailsList>
          </Box>
          <Box>
            <GuestDetailsHeading $isIos={isIos}>{PDF_CONSTANT?.CARD_NUMBER}</GuestDetailsHeading>
            <GuestDetailsList $isIos={isIos}>{cardNumber ? cardNumber : "NA"}</GuestDetailsList>
          </Box>
          {addOnCardDetails?.obtainAddOnCard && (
            <Box>
              <GuestDetailsHeading $isIos={isIos}>{PDF_CONSTANT?.ADD_ON_CARD}</GuestDetailsHeading>

              <GuestDetailsList
                $isIos={isIos}>{`${addOnCardDetails?.firstName} ${addOnCardDetails?.lastName}`}</GuestDetailsList>
            </Box>
          )}
        </EpicurePaymentWrapper>
        <Box>
          <GuestDetailsHeading $isIos={isIos}>{PDF_CONSTANT?.ADDRESS}</GuestDetailsHeading>
          <GuestDetailsList $isIos={isIos}>{constructUserAddress()}</GuestDetailsList>
        </Box>
      </Box>
      <br />
      <GiftTable>
        <GiftTableHeading sx={{ alignItems: "center" }}>
          <GiftTableTitle $isIos={isIos} sx={{ marginBottom: isMobile ? MobilePxToVw(5) : DesktopPxToVw(20) }}>
            {PDF_CONSTANT?.PRODUCT_S}
          </GiftTableTitle>
          <GiftTableTitle $isIos={isIos} sx={{ marginBottom: isMobile ? MobilePxToVw(5) : DesktopPxToVw(20) }}>
            {PDF_CONSTANT?.PRICE?.toUpperCase()}
          </GiftTableTitle>
          <GiftTableTitle $isIos={isIos} sx={{ marginBottom: isMobile ? MobilePxToVw(5) : DesktopPxToVw(20) }}>
            {priceBreakUp?.discountPrice > 0 ? PDF_CONSTANT?.DISCOUNT : PDF_CONSTANT?.QUANTITY}
          </GiftTableTitle>
          <GiftTableTitleTotal
            sx={{
              display: "flex",
              flexDirection: "column",
              ml: DesktopPxToVw(10),
            }}
            $isIos={isIos}>
            <>{PDF_CONSTANT?.TOTAL?.toUpperCase()}</>
            <Box
              sx={{
                fontSize: isPrintAction ? DesktopPxToVw(14) : isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
                display: "flex",
                justifyContent: "end",
              }}>
              {"(including taxes)"}
            </Box>
          </GiftTableTitleTotal>
        </GiftTableHeading>
        <GiftTableHeading>
          <GiftImgTitle>
            {purchasedProductDetails?.image?.largeImage?.asset?._ref && (
              <Box
                loading="lazy"
                alt="card-image"
                component={"img"}
                width={isMobile ? MobilePxToVw(150) : DesktopPxToVw(200)}
                height={isMobile ? MobilePxToVw(102) : DesktopPxToVw(132)}
                src={getOptimizeImageUrl(
                  urlFor(
                    isMobile
                      ? purchasedProductDetails?.image?.smallImage?.asset?._ref
                      : purchasedProductDetails?.image?.largeImage?.asset?._ref,
                  ).url(),
                  3,
                )}
              />
            )}
            <span
              style={{
                marginLeft: isMobile ? MobilePxToVw(30) : DesktopPxToVw(30),
                fontWeight: 700,
              }}>
              {purchasedProductDetails?.title}
            </span>
          </GiftImgTitle>
          <GiftTableTitle $isIos={isIos}>{currencyPrettier(Number(priceBreakUp?.price))}</GiftTableTitle>
          <GiftTableTitle $isIos={isIos}>
            {priceBreakUp?.discountPrice > 0 ? `${priceBreakUp?.discountPercent}%` : products?.[0]?.quantity || 1}
          </GiftTableTitle>
          <GiftTableTitle $isIos={isIos}>{currencyPrettier(Number(priceBreakUp?.totalPrice))}</GiftTableTitle>
        </GiftTableHeading>
        {!isBank && (
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <FinalPriceWrapperBox>
              <Box>
                <TotalPriceAndText $isIos={isIos}>{PDF_CONSTANT?.PRICE}</TotalPriceAndText>
                <TotalPriceAndText $isIos={isIos}>{PDF_CONSTANT?.TAX_FEES}</TotalPriceAndText>
                <TotalPriceAndText $isIos={isIos}>{PDF_CONSTANT?.TOTAL_AMOUNT}</TotalPriceAndText>
                {priceBreakUp?.neuCoins ? (
                  <TotalPriceAndText $isIos={isIos}>{PDF_CONSTANT?.NEUCOINS_REDEMPTION}</TotalPriceAndText>
                ) : null}
                {!!priceBreakUp?.totalPayableAmount && (
                  <FinalPriceAndText $isIos={isIos}>{PDF_CONSTANT?.AMOUNT_PAID}</FinalPriceAndText>
                )}
              </Box>
              <FinalPriceBox>
                {/* {currencyPrettier(Number(productDetails?.price))} */}
                <TotalPriceAndText $isIos={isIos}>{currencyPrettier(Number(priceBreakUp?.price))}</TotalPriceAndText>
                <TotalPriceAndText $isIos={isIos}>
                  {!!priceBreakUp?.discountTax
                    ? currencyPrettier(Number(priceBreakUp?.tax - priceBreakUp?.discountTax))
                    : currencyPrettier(Number(priceBreakUp?.tax))}
                </TotalPriceAndText>
                <TotalPriceAndText $isIos={isIos}>
                  {currencyPrettier(Number(priceBreakUp?.totalPrice))}
                </TotalPriceAndText>
                {priceBreakUp?.neuCoins ? (
                  <TotalPriceAndText $isIos={isIos}>
                    {currencyWithNoDecimalsWithMinus(Number(priceBreakUp?.neuCoins))}
                  </TotalPriceAndText>
                ) : null}

                <FinalPriceAndText $isIos={isIos}>
                  {!!priceBreakUp?.totalPayableAmount && currencyPrettier(Number(priceBreakUp?.totalPayableAmount))}
                </FinalPriceAndText>
              </FinalPriceBox>
            </FinalPriceWrapperBox>
          </Box>
        )}
      </GiftTable>
    </PrintContainer>
  )
}

export default observer(EpicurePrint)
