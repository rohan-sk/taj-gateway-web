import React, { useContext, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { PathType } from "../types"
import { useRouter } from "next/router"
import { theme } from "../../lib/theme"
import { CONSTANTS } from "../constants"
import { urlFor } from "../../lib-sanity"
import { observer } from "mobx-react-lite"
import useStorage from "../../utils/useStorage"
import { GAStore, UserStore } from "../../store"
import { Box, Tooltip, Typography } from "@mui/material"
import { useMobileCheck } from "../../utils/isMobilView"
import { UseAddress } from "../../utils/hooks/useAddress"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { GLOBAL_STORES, PAGE_STORES } from "../../utils/Constants"
import { ButtonTypography, DynamicStack } from "./styles/card-with-grid"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import LoyaltyStore from "../../features/loyalty/store/pageStore/loyalty.store"
import { cardsWithCardInterface } from "../forms/loyalty-form/loyalty-form.interface"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import LoyaltyGlobalStore from "../../features/loyalty/store/globalStore/loyalty-global-store"
import { BoxRenewal, BoxRenewalSub, CardText, TaxText } from "./styles/card-with-card.component"
import { handleViewItemListEvent } from "../../utils/analytics/events/Ecommerce/Epicure-Journey/view-item-list-epicure"
import { handleSelectEvent } from "../../utils/analytics/events/Ecommerce/Epicure-Journey/add-to-cart-epicure"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
const SnackbarToast = dynamic(() => import("../../utils/SnackbarToast"))
const Loader = dynamic(() => import("../../utils/SpinnerComponent"))

const CardWithCard = ({ props, parentProps }: cardsWithCardInterface) => {
  const [loader, setLoader] = useState<boolean>(false)
  const [snackMessage, setSnackMessage] = useState<string>("")
  const [openErrorMessage, setOpenErrorMessage] = useState<boolean>(false)
  const [epicureCardType, setEpicureCardType] = useState<{
    bank: boolean
    shareholder: boolean
    tata: boolean
    renewal: boolean
  }>({ bank: false, shareholder: false, tata: false, renewal: false })
  const [journeyType, setJourneyType] = useState({
    corporate: "",
    new: "",
    renewal: "",
  })

  const isMobile = useMobileCheck()
  const context = useContext(IHCLContext)
  const pageContext = useContext(PageContext)
  const navigate = useAppNavigation()
  const PrimaryAction = props?.[0]?.primaryAction?.title
  const isSingle = props?.length === 1
  const router = useRouter()

  //global user store
  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore

  //global loyalty store
  const epicureGlobalStore = context?.getGlobalStore(GLOBAL_STORES.loyaltyGlobalStore) as LoyaltyGlobalStore

  const address = UseAddress(userStore)
  const { getItem } = useStorage()

  const loyaltyEnrollStore = pageContext?.getPageStore(
    PAGE_STORES.LOYALTY_STORES.loyaltyEpicureCardsStore,
  ) as LoyaltyStore

  const isUserLoggedIn: any = global?.localStorage?.getItem("customerHash")
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(userStore, gaStoreData)

  const filteredProps =
    epicureCardType?.renewal && router?.query?.cardType === "privileged"
      ? props?.filter((item: any) => item?.tier?.toLowerCase() === "privileged")
      : props

  useEffect(() => {
    epicureGlobalStore?.epicurePageData?.journeyType?.map((item: any) => {
      if (item?.toLowerCase() === "corporate") {
        setJourneyType((prev: any) => {
          return {
            ...prev,
            corporate: item?.toLowerCase() === "corporate" ? item : "",
          }
        })
      }
      if (item?.toLowerCase() === "new") {
        setJourneyType((prev: any) => {
          return {
            ...prev,
            new: item?.toLowerCase() === "new" ? item : "",
          }
        })
      }
      if (item?.toLowerCase() === "renewal") {
        setJourneyType((prev: any) => {
          return {
            ...prev,
            renewal: item?.toLowerCase() === "renewal" ? item : "",
          }
        })
      }
    })
    epicureGlobalStore?.updateEpicureCardsLength(filteredProps?.length)
    global?.window?.localStorage?.setItem("bankName", epicureGlobalStore?.epicurePageData?.identifier)
  }, [epicureGlobalStore, filteredProps?.length, router?.query?.slug])

  useEffect(() => {
    if (epicureGlobalStore?.epicurePageData?.subType) {
      setEpicureCardType((prev: any) => {
        return {
          ...prev,
          bank: epicureGlobalStore?.epicurePageData?.subType?.toLowerCase() === "bank" ? true : false,
          shareholder: epicureGlobalStore?.epicurePageData?.subType?.toLowerCase() === "shareholder" ? true : false,
          tata: epicureGlobalStore?.epicurePageData?.subType?.toLowerCase() === "tata" ? true : false,
          renewal: epicureGlobalStore?.epicurePageData?.subType?.toLowerCase() === "renewal" ? true : false,
        }
      })
    }
  }, [epicureGlobalStore?.epicurePageData?.subType])

  const updateEpicureData = async (url: string, navigationType: PathType, CardType: any) => {
    setLoader(true)
    await loyaltyEnrollStore?.EpicureEmptyCartAPI()
    global?.window?.sessionStorage?.removeItem("order_id")
    const cardName = CardType?.split(" ")?.[1]
    const response = await loyaltyEnrollStore?.EpicureAddToCartAPI(
      JSON.stringify({
        epicureDetails: {
          bankName: epicureCardType?.bank ? parentProps?.items?.[0]?.bankName : "",
          isTata: epicureCardType?.tata,
          epicureType: epicureCardType?.bank ? journeyType?.corporate : cardName,
          isBankUrl: epicureCardType?.bank,
          isShareHolder: epicureCardType?.shareholder,
          memberShipPurchaseType: epicureCardType?.renewal ? journeyType?.renewal : journeyType?.new,
        },
      }),
    )
    if (global?.window?.localStorage.getItem("customerHash") === null) {
      global?.window?.localStorage.setItem("guestCustomerHash", response?.data?._id)
    }
    if (!response?.error) {
      setLoader(false)
      await epicureGlobalStore?.updateEpicureCardData(
        response?.data?.items?.epicureDetails.bankName,
        response?.data?.items?.epicureDetails.isBankUrl,
        response?.data?.items?.epicureDetails.isShareHolder,
        response?.data?.items?.epicureDetails.isTata,
        response?.data?.items?.epicureDetails.memberShipPurchaseType,
        response?.data?.items?.epicureDetails.epicureType,
        response?.data?.priceSummary?.neuCoins,
        response?.data?.priceSummary?.price,
        response?.data?.priceSummary?.tax,
        response?.data?.priceSummary?.totalPayableAmount,
        response?.data?.priceSummary?.discountPrice,
        response?.data?.priceSummary?.discountPercent,
        response?.data?.priceSummary?.discountTax,
      )
      navigate(url, navigationType)
    } else {
      setLoader(false)
      setOpenErrorMessage(true)
      setSnackMessage(response?.data?.data)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    //analytics viewItemList event
    handleViewItemListEvent("view_item_list", dataLayer, address, isMobile, parentProps, getItem, isUserLoggedIn)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {loader && <Loader />}
      <SnackbarToast open={openErrorMessage} onClose={() => setOpenErrorMessage(false)} Message={snackMessage} />
      <Box
        aria-label={"card-with-card-component"}
        sx={{
          display: props?.[0]?.primaryAction?.title && isMobile ? "block" : "flex",
          justifyContent: "center",
          alignItems: "center",
          whiteSpace: props?.[0]?.primaryAction?.title && !isMobile ? "nowrap" : "wrap",
          gap: isMobile ? "5vw" : "10.83vw",
        }}>
        {filteredProps?.map((item: any, index: number) => (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: props?.length == 2 ? "row" : "column",
                padding:
                  isMobile && !epicureCardType?.bank
                    ? index == 0
                      ? " 0vw "
                      : epicureCardType?.renewal || epicureCardType?.shareholder || epicureCardType?.tata
                        ? "11.5vw 0vw 0vw"
                        : "6.25vw 0vw 0vw"
                    : "",
                justifyContent: isMobile ? "center" : "initial",
              }}
              key={item?._key}>
              <Box
                onClick={() => {
                  handleSelectEvent(
                    "add_to_cart",
                    index,
                    item?.primaryAction?.url,
                    item?.primaryAction?.urlType,
                    item,
                    dataLayer,
                    address,
                    isMobile,
                    parentProps,
                    PrimaryAction,
                  )
                }}
                key={item?._key}
                sx={{
                  cursor: "pointer",
                  columnGap: "2.083vw",
                  display: "flex",
                  flexDirection: isMobile
                    ? epicureCardType?.renewal || epicureCardType?.shareholder || epicureCardType?.tata
                      ? " row"
                      : "column"
                    : "row",
                  textAlign: isMobile && isSingle ? "center" : "auto",
                  alignItems: "center",
                }}>
                <Box
                  alt={"card-img"}
                  component={(isMobile ? item?.image?.altText : item?.largeImage?.altText) || "img"}
                  className="centerImg"
                  maxWidth={
                    isMobile
                      ? epicureCardType?.renewal || epicureCardType?.shareholder || epicureCardType?.tata
                        ? MobilePxToVw(286)
                        : item?.primaryAction?.title
                          ? MobilePxToVw(476)
                          : MobilePxToVw(186)
                      : item?.primaryAction?.title
                        ? DesktopPxToVw(330)
                        : DesktopPxToVw(150)
                  }
                  src={
                    isMobile
                      ? urlFor(item?.image?.asset?._ref || "")?.url()
                      : urlFor(item?.largeImage?.asset?._ref || "")?.url()
                  }
                />
                <Box
                  sx={{
                    width: isMobile ? "100%" : "unset",
                    display: isMobile && item?.primaryAction?.title ? "flex" : "block",
                    justifyContent: "space-between",
                    marginTop: isMobile
                      ? index == 0 &&
                        (epicureCardType?.renewal || epicureCardType?.shareholder || epicureCardType?.tata)
                        ? "0vw"
                        : epicureCardType?.renewal || epicureCardType?.shareholder || epicureCardType?.tata
                          ? "0vw"
                          : "4.68vw"
                      : "auto",
                    gap: item?.primaryAction?.title ? "1vw" : "3.12vw",
                    flexDirection:
                      epicureCardType?.renewal || epicureCardType?.shareholder || epicureCardType?.tata
                        ? "column"
                        : "initial",
                  }}>
                  <Box
                    sx={{
                      width: epicureCardType?.bank ? "min-content" : "unset",
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: !isMobile && item?.primaryAction?.title ? "1.04vw" : "0vw",
                      minWidth: "fit-content",
                    }}>
                    {(item?.highLights || item?.highlights?.[0]?.term) && (
                      <Typography
                        variant={isMobile ? "m-body-l" : epicureCardType?.bank ? "body-l" : "body-l"}
                        sx={{
                          fontWeight: "700 !important",
                          width: (isMobile && item?.primaryAction?.title) || epicureCardType?.bank ? "100%" : "auto",
                          color: theme?.palette?.neuPalette?.hexSeventeen,
                          whiteSpace: epicureCardType?.bank ? "pre-line" : "",
                          marginBottom: isSingle ? "0.677vw" : isMobile ? MobilePxToVw(10) : "0.417vw",
                          "@media (max-width: 640px)": {
                            fontSize: "3.65vw",
                          },
                        }}>
                        {item?.highLights || item?.highlights?.[0]?.term}
                      </Typography>
                    )}
                    {item?.children && (
                      <>
                        {isMobile && item?.primaryAction?.title ? (
                          <BoxRenewal
                            $renewal={
                              epicureCardType?.renewal || epicureCardType?.shareholder || epicureCardType?.tata
                            }>
                            {item?.children != "0" && (
                              <CardText
                                sx={{
                                  textDecoration:
                                    epicureCardType?.renewal || epicureCardType?.shareholder || epicureCardType?.tata
                                      ? "line-through"
                                      : "none",
                                  color:
                                    epicureCardType?.renewal || epicureCardType?.shareholder || epicureCardType?.tata
                                      ? theme?.palette?.neuPalette?.hexTwelve
                                      : "initial",
                                }}
                                variant={
                                  isMobile
                                    ? epicureCardType?.renewal || epicureCardType?.shareholder || epicureCardType?.tata
                                      ? "m-body-ml"
                                      : "m-heading-s"
                                    : "heading-s"
                                }>
                                {item?.children}
                              </CardText>
                            )}
                            {(epicureCardType?.renewal || epicureCardType?.shareholder || epicureCardType?.tata) && (
                              <CardText
                                sx={{
                                  color: theme?.palette?.neuPalette?.hexTwo,
                                }}
                                variant={isMobile ? "m-heading-s" : "heading-s"}>
                                {item?.renewal?.discountPrice}
                              </CardText>
                            )}
                            {item?.normalText &&
                              !epicureCardType?.renewal &&
                              !epicureCardType?.shareholder &&
                              !epicureCardType?.tata && (
                                <TaxText
                                  variant={
                                    epicureCardType?.renewal ||
                                    epicureCardType?.shareholder ||
                                    (epicureCardType?.tata && isMobile)
                                      ? "m-body-ml"
                                      : isMobile
                                        ? "m-body-s"
                                        : "body-m"
                                  }>
                                  {item?.normalText}
                                </TaxText>
                              )}
                          </BoxRenewal>
                        ) : (
                          <>
                            {item?.children != "0" && (
                              <Box
                                sx={{
                                  display:
                                    epicureCardType?.renewal || epicureCardType?.shareholder || epicureCardType?.tata
                                      ? "flex"
                                      : "unset",
                                  gap: "1vw",
                                }}>
                                <CardText
                                  sx={{
                                    textDecoration:
                                      epicureCardType?.renewal || epicureCardType?.shareholder || epicureCardType?.tata
                                        ? "line-through"
                                        : "none",
                                    color:
                                      epicureCardType?.renewal || epicureCardType?.shareholder || epicureCardType?.tata
                                        ? theme?.palette?.neuPalette?.hexTwelve
                                        : theme?.palette?.neuPalette?.hexSeventeen,
                                    fontSize: isMobile ? MobilePxToVw(32) : DesktopPxToVw(22),
                                  }}
                                  variant={
                                    epicureCardType?.renewal || epicureCardType?.shareholder || epicureCardType?.tata
                                      ? isMobile
                                        ? "m-heading-xs"
                                        : "heading-xs"
                                      : isMobile
                                        ? "m-heading-xs"
                                        : "heading-xs"
                                  }>
                                  {item?.children}
                                </CardText>
                                {(epicureCardType?.renewal ||
                                  epicureCardType?.shareholder ||
                                  epicureCardType?.tata) && (
                                  <CardText
                                    sx={{
                                      color: theme?.palette?.neuPalette?.hexTwo,
                                    }}
                                    variant={isMobile ? "m-heading-s" : "heading-s"}>
                                    {item?.renewal?.discountPrice}
                                  </CardText>
                                )}
                                {item?.normalText &&
                                  !epicureCardType?.renewal &&
                                  !epicureCardType?.shareholder &&
                                  !epicureCardType?.tata && (
                                    <TaxText
                                      variant={
                                        epicureCardType?.renewal && isMobile
                                          ? "m-body-ml"
                                          : isMobile
                                            ? "m-body-s"
                                            : "body-m"
                                      }>
                                      {item?.normalText}
                                    </TaxText>
                                  )}
                              </Box>
                            )}
                          </>
                        )}
                      </>
                    )}
                    {(epicureCardType?.renewal || epicureCardType?.shareholder || epicureCardType?.tata) && (
                      <BoxRenewalSub sx={{ gap: `${DesktopPxToVw(6)} !important` }}>
                        <TaxText
                          sx={{
                            fontSize: isMobile ? MobilePxToVw(20) : DesktopPxToVw(15),
                          }}
                          variant={
                            epicureCardType?.renewal && isMobile ? "m-body-ml" : isMobile ? "m-body-xs" : "body-xs"
                          }>
                          {item?.renewal?.discountPercentage}
                        </TaxText>
                        <Tooltip
                          title={<React.Fragment>{item?.renewal?.toolTip?.text}</React.Fragment>}
                          placement="top"
                          componentsProps={{
                            tooltip: {
                              sx: {
                                borderRadius: "0px",
                                backgroundColor: theme?.palette?.neuPalette?.hexSixteen,
                                color: theme?.palette?.neuPalette?.hexSeventeen,
                                padding: DesktopPxToVw(16),
                                textAlign: "center",
                              },
                            },
                          }}>
                          {item?.renewal?.toolTip?.icon?.asset?._ref && (
                            <Box
                              width={isMobile ? MobilePxToVw(18) : DesktopPxToVw(14)}
                              height={isMobile ? MobilePxToVw(18) : DesktopPxToVw(14)}
                              component={item?.renewal?.toolTip?.icon?.altText || "img"}
                              alt="tool-tip-icon"
                              src={urlFor(item?.renewal?.toolTip?.icon?.asset?._ref)?.url()}
                            />
                          )}
                        </Tooltip>
                      </BoxRenewalSub>
                    )}
                    {item?.normalText &&
                      (epicureCardType?.renewal || epicureCardType?.shareholder || epicureCardType?.tata) && (
                        <TaxText
                          variant={
                            epicureCardType?.renewal && isMobile ? "m-body-ml" : isMobile ? "m-body-s" : "body-m"
                          }>
                          {item?.normalText}
                        </TaxText>
                      )}
                  </Box>
                  {(item?.renewal?.primaryAction?.title || item?.primaryAction?.title) && (
                    <RenderActionItem
                      url=""
                      onClick={() => {
                        updateEpicureData(
                          `${item?.primaryAction?.url}#loyaltyForm`,
                          item?.primaryAction?.urlType,
                          item?.highLights,
                        )
                      }}
                      title={
                        epicureCardType?.renewal ? item?.renewal?.primaryAction?.title : item?.primaryAction?.title
                      }
                      variant={item?.primaryAction?.variant}
                      navigationType="internal"
                      isActionButtonType={true}
                      buttonStyles={{
                        letterSpacing: "0.1em",
                        // minWidth: isMobile ? "31.094vw" :
                        fontSize: isMobile ? "2.813vw" : "0.938vw",
                        width: isMobile && epicureCardType?.renewal ? MobilePxToVw(147) : "fit-content",
                        whiteSpace: "nowrap",
                        marginBottom: !isMobile && item?.primaryAction?.title ? "0.52vw" : "0vw",
                      }}
                    />
                  )}
                </Box>
              </Box>
            </Box>
          </>
        ))}
      </Box>
      {!epicureCardType?.bank && (
        <>
          <Box
            width={"100%"}
            textAlign={"center"}
            sx={{
              marginTop: isMobile ? MobilePxToVw(80) : DesktopPxToVw(80),
            }}>
            <DynamicStack $isMobile={isMobile}>
              <ButtonTypography
                color={theme.palette.neuPalette.hexTwo}
                variant={isMobile ? "m-body-s" : "body-s"}
                onClick={() => {
                  navigate(parentProps?.url, parentProps?.urlType)
                }}
                sx={{
                  cursor: "pointer",
                }}>
                {CONSTANTS?.VIEW_COMPARSION}
              </ButtonTypography>
            </DynamicStack>
          </Box>
          <Box
            sx={{
              textAlign: "center",
              marginTop: isMobile ? MobilePxToVw(20) : DesktopPxToVw(20),
            }}>
            <Typography variant={isMobile ? "m-body-s" : "body-s"}>
              {epicureGlobalStore?.epicurePageData?.viewComparisonText}
            </Typography>
          </Box>
        </>
      )}
    </>
  )
}

export default observer(CardWithCard)