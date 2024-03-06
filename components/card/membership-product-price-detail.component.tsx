import { observer } from "mobx-react-lite"
import { GLOBAL_STORES, PAGE_STORES } from "../../utils/Constants"
import dynamic from "next/dynamic"
import { currencyPrettier } from "../../utils/currency"
import { useMobileCheck } from "../../utils/isMobilView"
import React, { useContext, useEffect, useState } from "react"
import fetchMembershipDetails from "../../utils/fetchMembershipData"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
const BillingDetailCardComponent = dynamic(() => import("../card/membership-billing-details-card"))
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import LoyaltyConfirmationPageStore from "../../features/loyalty/store/pageStore/loyaltyConfirmation.store"
import GiftCardConfirmationPageStore from "../../features/giftCard/store/pageStore/GCConfirmationPage.store"
import { useLoggedIn } from "../../utils/hooks/useLoggedIn"
import { UseAddress } from "../../utils/hooks/useAddress"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { GAStore, UserStore } from "../../store"
import { Box, Table, Stack, TableRow, TableBody, TableCell, TableHead, Typography, TableContainer } from "@mui/material"
import {
  BoldTypography,
  FlexGapCenterBoxStyle,
  ProductPurchaseBoxStyle,
} from "./styles/membership-product-price-detail-component"

import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
import useStorage from "../../utils/useStorage"
import GiftCardFormDetailsStore from "../../features/giftCard/store/pageStore/GCFormdetails.store"
import GiftCardStore from "../../features/giftCard/store/globalStore/gift-card.store"
import { handleEpicurePurchase } from "../../utils/analytics/events/Ecommerce/Epicure-Journey/purchase-epicure"

interface MembershipProductPriceProps {
  urlType: string
  isMultiBlockContent?: boolean
  imageAsset: {
    largeImage: any
  }
  parameterMap: any
}

const MembershipProductPriceDetailComponent = (props: MembershipProductPriceProps) => {
  const context = useContext(IHCLContext)

  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(userStore, gaStoreData)

  const [membershipDetails, setMembershipDetails] = useState([])
  const [purchasedProductDetails, setPurchaseProductDetails] = useState<any>()
  const isLoggedIn = useLoggedIn()
  const address = UseAddress(userStore)
  const { getItem } = useStorage()
  const isUserLoggedIn: any = global?.localStorage?.getItem("customerHash")
  //USED IN EPICURE ENROLLMENT SUCCESSFUL
  const isMobile = useMobileCheck()
  const pageContext = useContext(PageContext)
  const giftCardConfirmationPageStore = pageContext?.getPageStore(
    PAGE_STORES.GIFTCARD_STORES.giftCardConfirmationPageStore,
  ) as GiftCardConfirmationPageStore

  const paymentConfirmation = giftCardConfirmationPageStore?.paymentConfirmationResponse

  const GCFormDetailsStore = context?.getGlobalStore(GLOBAL_STORES.giftCardStore) as GiftCardStore

  const LoyaltyEpicureStore = pageContext?.getPageStore(
    PAGE_STORES?.LOYALTY_STORES.loyaltyConfirmationStore,
  ) as LoyaltyConfirmationPageStore

  const ResponseData = LoyaltyEpicureStore?.loyaltyConfirmationResponse?.products?.[0]

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
        (product: any) => product?.tier === LoyaltyEpicureStore?.loyaltyConfirmationResponse?.products?.[0]?.type,
      )
      productDetails && setPurchaseProductDetails(productDetails?.[0])
    }
  }, [LoyaltyEpicureStore?.loyaltyConfirmationResponse?.products, membershipDetails])

  useEffect(() => {
    //epicure card purchase analytics
    if (ResponseData?.type) {
      LoyaltyEpicureStore &&
        handleEpicurePurchase("purchase", dataLayer, address, LoyaltyEpicureStore, ResponseData, getItem, isLoggedIn)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ResponseData])

  return (
    <>
      {/* <ProductPurchaseBoxStyle> */}
      {/* // due to new figma this product table will be removed */}
      {/* {isMobile ? (
          <>
            {(ResponseData || purchasedProductDetails) && (
              <Stack
                sx={{
                  borderBottom: `2px solid ${theme?.palette?.neuPalette?.hexTwelve}}`,
                }}
                padding={`${MobilePxToVw(35)} 0vw`}
                flexDirection="row"
                alignItems="flex-start"
                justifyContent="space-between">
                {purchasedProductDetails?.image?.smallImage?.asset?._ref && (
                  <Box
                    alt={purchasedProductDetails?.image?.smallImage?.altText ||"card-image"}
                    component={"img"}
                    width={MobilePxToVw(120)}
                    src={urlFor(
                      purchasedProductDetails?.image?.smallImage?.asset?._ref
                    ).url()}
                  />
                )}
                <Stack
                  rowGap={MobilePxToVw(10)}
                  sx={{ width: MobilePxToVw(320) }}>
                  {purchasedProductDetails?.title && (
                    <Box>
                      <BoldTypography variant="m-body-l">
                        {purchasedProductDetails?.title}
                      </BoldTypography>
                    </Box>
                  )}
                  <Stack
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between">
                    {ResponseData?.total && (
                      <Typography variant={"m-body-l"}>
                        {currencyPrettier(Number(ResponseData?.total))}
                      </Typography>
                    )}
                    {ResponseData?.quantity && (
                      <Typography variant={"m-body-m"}>
                        {ResponseData?.quantity}
                      </Typography>
                    )}
                  </Stack>
                  {ResponseData?.total && (
                    <Stack
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="space-between">
                      <Typography variant="m-body-l">{"TOTAL : "}</Typography>
                      <BoldTypography
                        variant={"m-body-l"}
                        sx={{ fontWeight: "300" }}>
                        {currencyPrettier(Number(ResponseData?.total))}
                      </BoldTypography>
                    </Stack>
                  )}
                </Stack>
              </Stack>
            )}
            {(GCFormDetailsStore || paymentConfirmation) && (
              <Stack
                flexDirection={"row"}
                justifyContent="space-between"
                alignItems="flex-start"
                borderBottom={`1px solid ${theme?.palette?.neuPalette?.hexTwelve}`}
                padding={`${MobilePxToVw(35)} 0vw`}>
                {GCFormDetailsStore?.GCThemeData?.base?.largeImage?.asset
                  ?._ref && (
                  <Box
                    alt={GCFormDetailsStore?.GCThemeData?.base?.largeImage?.altText || "card-image"}
                    component={"img"}
                    width={MobilePxToVw(120)}
                    src={urlFor(
                      GCFormDetailsStore?.GCThemeData?.base?.largeImage?.asset
                        ?._ref
                    ).url()}
                  />
                )}
                <Stack
                  flexDirection={"column"}
                  gap={MobilePxToVw(10)}
                  sx={{ width: MobilePxToVw(320) }}>
                  <Typography variant={"m-body-sl"} sx={{ fontWeight: 700 }}>
                    {GCFormDetailsStore?.GCThemeData?.name}
                  </Typography>
                  <Stack flexDirection={"row"} justifyContent="space-between">
                    {paymentConfirmation?.giftCard?.[0]?.amount && (
                      <Typography variant={"m-body-sl"}>
                        {currencyPrettier(
                          Number(paymentConfirmation?.giftCard?.[0]?.amount)
                        )}
                      </Typography>
                    )}
                    <Typography variant={"m-body-sl"}>
                      {paymentConfirmation?.giftCard?.length}
                    </Typography>
                  </Stack>
                  <Stack flexDirection={"row"} justifyContent="space-between">
                    <Typography variant={"m-body-sl"}>{data?.total}</Typography>
                    {paymentConfirmation?.priceBreakUp?.totalPrice && (
                      <Typography
                        variant={"m-body-sl"}
                        sx={{ fontWeight: 700 }}>
                        {currencyPrettier(
                          Number(paymentConfirmation?.priceBreakUp?.totalPrice)
                        )}
                      </Typography>
                    )}
                  </Stack>
                </Stack>
              </Stack>
            )}
          </>
        ) : (
          <TableContainer
            sx={{ padding: "0.521vw 2.083vw 0.83vw 2.083vw", width: "100%",border:"2px solid green", }}>
            <Table sx={{ minWidth: "33.854vw" }} aria-label="simple table">
              <TableHead sx={{ border: "none", padding: "1.198vw 0" }}>
                <TableRow>
                  <TableCell>
                    {data?.product && (
                      <Typography variant={"heading-xs"}>
                        {data?.product}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {data?.price && (
                      <Typography variant={"heading-xs"}>
                        {data?.price}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {data?.quantity && (
                      <Typography variant={"heading-xs"}>
                        {data?.quantity}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {data?.total && (
                      <Typography variant={"heading-xs"}>
                        {data?.total}
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              </TableHead>
              {(GCFormDetailsStore || paymentConfirmation) && (
                <TableBody>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}>
                    <React.Fragment>
                      <TableCell scope="row">
                        <Stack
                          flexDirection="row"
                          alignItems="center"
                          gap={DesktopPxToVw(40)}>
                          {GCFormDetailsStore?.GCThemeData?.base?.largeImage
                            ?.asset?._ref && (
                            <Box
                              alt={ GCFormDetailsStore?.GCThemeData?.base
                                  ?.largeImage?.altText || "card-image"}
                              component={"img"}
                              width={DesktopPxToVw(207)}
                              src={urlFor(
                                GCFormDetailsStore?.GCThemeData?.base
                                  ?.largeImage?.asset?._ref
                              ).url()}
                            />
                          )}
                          <Typography
                            variant={isMobile ? "m-body-l" : "body-l"}
                            sx={{ fontWeight: 700 }}>
                            {GCFormDetailsStore?.GCThemeData?.name}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="center">
                        {paymentConfirmation?.giftCard?.[0]?.amount && (
                          <Typography
                            variant={isMobile ? "m-body-l" : "body-l"}>
                            {currencyPrettier(
                              Number(paymentConfirmation?.giftCard?.[0]?.amount)
                            )}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant={isMobile ? "m-body-sl" : "body-ml"}>
                          {paymentConfirmation?.giftCard?.length}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        {paymentConfirmation?.priceBreakUp?.totalPrice && (
                          <Typography
                            variant={isMobile ? "m-body-l" : "body-l"}
                            sx={{ fontWeight: 700 }}>
                            {currencyPrettier(
                              Number(
                                paymentConfirmation?.priceBreakUp?.totalPrice
                              )
                            )}
                          </Typography>
                        )}
                      </TableCell>
                    </React.Fragment>
                  </TableRow>
                </TableBody>
              )}
              {(ResponseData || purchasedProductDetails) && (
                <TableBody>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}>
                    <React.Fragment>
                      <TableCell
                        scope="row"
                        sx={{ padding: "2vw 0vw 1vw 0vw !important" }}>
                        <FlexGapCenterBoxStyle>
                          {purchasedProductDetails?.image?.largeImage
                            ?.asset && (
                            <Box
                              alt={ purchasedProductDetails?.image?.largeImage?.altText || "card-image"}
                              component={"img"}
                              width={DesktopPxToVw(180)}
                              src={urlFor(
                                purchasedProductDetails?.image?.largeImage
                                  ?.asset?._ref
                              ).url()}
                            />
                          )}
                          {purchasedProductDetails?.title && (
                            <Box>
                              <BoldTypography variant="body-l">
                                {purchasedProductDetails?.title}
                              </BoldTypography>
                            </Box>
                          )}
                        </FlexGapCenterBoxStyle>
                      </TableCell>
                      <TableCell align="center">
                        {ResponseData?.price && (
                          <Typography variant={"body-ml"}>
                            {currencyPrettier(Number(ResponseData?.price))}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {ResponseData?.quantity && (
                          <Typography variant={"body-m"}>
                            {ResponseData?.quantity}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {ResponseData?.total && (
                          <BoldTypography variant={"body-l"}>
                            {currencyPrettier(Number(ResponseData?.total))}
                          </BoldTypography>
                        )}
                      </TableCell>
                    </React.Fragment>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        )} */}
      {/* </ProductPurchaseBoxStyle> */}
      <BillingDetailCardComponent isLoyaltyEpicure={LoyaltyEpicureStore} props={props} />
    </>
  )
}
export default observer(MembershipProductPriceDetailComponent)
