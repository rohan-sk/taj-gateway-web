import { Typography, Button } from "@mui/material"
import { Box } from "@mui/system"
import { theme } from "../../lib/theme"
import { CONSTANTS } from "../constants"
import { observer } from "mobx-react-lite"
import Pluralize from "../../utils/pluralize"
import { useMobileCheck } from "../../utils/isMobilView"
import { useContext, useState, useEffect, useRef } from "react"
import { CustomCheckBox } from "../hoc/CustomCheckBox/Checkbox"
import { gcConstants } from "../forms/gift-card-form/constants"
import { GLOBAL_STORES, PAGE_STORES } from "../../utils/Constants"
import { BOOKING_CONSTANT } from "../../features/booking/constants"
import { restrictNumericSymbol } from "../forms/book-a-stay-form/utils"
import LoyaltyStore from "../../features/loyalty/store/pageStore/loyalty.store"
import manageGCStore from "../../features/giftCard/store/pageStore/manageGC.store"
import { GCAddTenderModeToCart, GCDeleteTenderModeToCart } from "./tender.service"
import { currencyPrettier, numberFormatWithoutSymbol } from "../../utils/currency"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import BookingsFlowStore from "../../features/booking/store/pageStore/booking.store"
import GiftCardStore from "../../features/giftCard/store/globalStore/gift-card.store"
import dynamic from "next/dynamic"
import {
  RedeemBox,
  NueCoinsBox,
  RedeemAllBox,
  InnerAccordion,
  ColorTypography,
  BalanceCheckBox,
  NueCoinsRedeemBox,
  RedeemAllTypography,
  NueCoinsRedeemInput,
  InnerAccordionSummary,
  InnerRoomAccordionDetail,
  GiftCardRedeemCheckBoxContainer,
  RedeemBoxWrapper,
  ColorTypographyWrapper,
} from "../BookingFlow/styles/redeem-save"
import RenderActionItem from "../hoc/actions/action-items-ui"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import { PathType } from "../../types"
const LoadingSpinner = dynamic(() => import("../../utils/SpinnerComponent"))

const NeuCoinsRedemption = (props: any) => {
  const isMobile = useMobileCheck()
  const pageContext = useContext(PageContext)
  const context: any = useContext(IHCLContext)
  const [userEnteredCoins, setUserEnteredCoins] = useState<number | null>(null)
  const [tenderNeucoinsRedeemed, setTenderNeucoinsRedeemed] = useState(0)
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [loader, setLoader] = useState<boolean>(false)

  const [apiRes, setApiRes] = useState<any>(null)
  const iconColor = theme?.palette?.ihclPalette?.hexSeventeen
  const inputRef = useRef<HTMLInputElement | null>(null)
  const PortableText = context!.PortableText

  const { remove, redeemAll, balanceAmount } = BOOKING_CONSTANT

  //* Page store
  const { fetchNeuCoins, userNeuCoins } = pageContext?.getPageStore(PAGE_STORES?.bookingFlowStore) as BookingsFlowStore

  const giftCardManageStore = pageContext?.getPageStore(PAGE_STORES?.giftCardManageCard) as manageGCStore

  const [checked, setChecked] = useState<boolean>(true)

  const GCFormDetailsStore = context?.getGlobalStore(GLOBAL_STORES.giftCardStore) as GiftCardStore

  const loyaltyEnrollStore = pageContext?.getPageStore(
    PAGE_STORES.LOYALTY_STORES.loyaltyEpicureCardsStore,
  ) as LoyaltyStore

  // Get the current URL's search parameters
  const searchParams = new URLSearchParams(global?.window?.location?.search)

  // Access a specific query parameter
  const orderIdFromURL: any = searchParams?.get("orderId")

  const isFetchOrder = orderIdFromURL && GCFormDetailsStore?.cartDetails?.priceSummary?.neuCoins > 0

  useEffect(() => {
    if (userNeuCoins > 0 && !(GCFormDetailsStore?.cartDetails?.priceSummary?.neuCoins > 0)) {
      if (userNeuCoins >= totalAmount) {
        setLoader(true)
        GCAddTenderModeToCart(
          giftCardManageStore,
          GCFormDetailsStore,
          totalAmount as number,
          setTenderNeucoinsRedeemed,
          setUserEnteredCoins,
          setApiRes,
          apiRes,
          setLoader,
        )
      } else {
        GCAddTenderModeToCart(
          giftCardManageStore,
          GCFormDetailsStore,
          userNeuCoins as number,
          setTenderNeucoinsRedeemed,
          setUserEnteredCoins,
          setApiRes,
          apiRes,
        )
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userNeuCoins])

  const handleCheck = () => {
    setChecked((prev: boolean) => !prev)
  }

  useEffect(() => {
    if (isFetchOrder) {
      setTenderNeucoinsRedeemed(GCFormDetailsStore?.cartDetails?.priceSummary?.neuCoins)
    }
  }, [GCFormDetailsStore?.cartDetails?.priceSummary?.neuCoins, isFetchOrder])

  useEffect(() => {
    if (userNeuCoins >= totalAmount) {
      setUserEnteredCoins(totalAmount)
    } else {
      setUserEnteredCoins(userNeuCoins)
    }
  }, [totalAmount, userNeuCoins])

  useEffect(() => {
    if (checked) {
      if (userNeuCoins >= totalAmount) {
        setUserEnteredCoins(totalAmount)
      } else {
        setUserEnteredCoins(userNeuCoins)
      }
    } else {
      setUserEnteredCoins(null)
      inputRef.current !== null && inputRef.current.querySelector("input")?.focus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked])

  useEffect(() => {
    let amount: number = 0
    if (GCFormDetailsStore) {
      const amountValue = GCFormDetailsStore?.formValues[gcConstants.amount!] as unknown as number
      const quantityValue = GCFormDetailsStore?.formValues[gcConstants.quantity!] as unknown as number

      if (amountValue && quantityValue) {
        amount = amountValue * quantityValue
      }
    }
    setTotalAmount(amount)
  }, [GCFormDetailsStore, loyaltyEnrollStore])

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true)
      try {
        if (global?.window.localStorage.getItem("accessToken")) {
          await fetchNeuCoins(global?.window.localStorage.getItem("accessToken"))
          setLoader(false)
        }
      } catch (error) {
        console.log(error, "error at fetch neucoins")
        setLoader(false)
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userNeuCoins])

  return (
    <>
      {loader ? (
        <LoadingSpinner containerStyle={{ background: theme?.palette?.ihclPalette?.hexSix }} />
      ) : (
        <InnerAccordion expanded={true}>
          <InnerAccordionSummary sx={{ cursor: "default !important" }}>
            {props?.singleContent && (
              <Box>
                {props?.singleContent?.map((content: string | {}, idx: number) => (
                  <PortableText blocks={content} key={idx} />
                ))}
              </Box>
            )}
          </InnerAccordionSummary>
          <InnerRoomAccordionDetail>
            {!isFetchOrder && (
              <NueCoinsBox>
                <BalanceCheckBox>
                  <Typography variant={isMobile ? "m-body-s" : "body-s"} sx={{ color: iconColor }}>
                    {balanceAmount + " (NeuCoins)"}
                  </Typography>
                  <Typography variant={isMobile ? "m-body-sl" : "body-s"} sx={{ color: iconColor }}>
                    {currencyPrettier(userNeuCoins ?? 0)?.slice(1)}
                  </Typography>
                </BalanceCheckBox>
                {userNeuCoins > 0 && (
                  <NueCoinsRedeemBox>
                    <RedeemAllBox>
                      <GiftCardRedeemCheckBoxContainer $isMobile={isMobile}>
                        <CustomCheckBox
                          isCheckBoxDisabled={apiRes !== null}
                          checked={checked}
                          withBorder={false}
                          onChange={() => handleCheck()}
                        />
                        <RedeemAllTypography
                          variant={isMobile ? "m-body-s" : "body-s"}
                          sx={{ whiteSpace: isMobile ? "nowrap" : "inherit" }}>
                          {redeemAll}
                        </RedeemAllTypography>
                      </GiftCardRedeemCheckBoxContainer>
                      <NueCoinsRedeemInput
                        ref={inputRef}
                        sx={{
                          "& .Mui-disabled": {
                            "&:before": {
                              borderBottomStyle: "solid !important",
                            },
                          },
                        }}
                        disabled={apiRes !== null || checked}
                        onKeyDown={restrictNumericSymbol}
                        variant="standard"
                        value={userEnteredCoins ?? ""}
                        onChange={(e: any) => {
                          const pattern = /^([0-9])*$/
                          pattern.test(e?.target?.value) && setUserEnteredCoins(e?.target?.value)
                        }}
                        inputProps={{ readonly: checked }}
                      />
                    </RedeemAllBox>
                    <Box>
                      <Button
                        sx={{
                          alignSelf: isMobile ? "inherit" : "flex-end",
                          width: isMobile ? "24.844vw !important" : "default",
                        }}
                        variant="light-contained"
                        disabled={
                          !(
                            userEnteredCoins &&
                            userEnteredCoins > 0 &&
                            userEnteredCoins <= userNeuCoins &&
                            userEnteredCoins <= totalAmount &&
                            !apiRes
                          )
                        }
                        onClick={() => {
                          giftCardManageStore &&
                            GCAddTenderModeToCart(
                              giftCardManageStore,
                              GCFormDetailsStore,
                              userEnteredCoins as number,
                              setTenderNeucoinsRedeemed,
                              setUserEnteredCoins,
                              setApiRes,
                              apiRes,
                            )
                        }}>
                        REDEEM
                      </Button>
                    </Box>
                  </NueCoinsRedeemBox>
                )}
              </NueCoinsBox>
            )}

            {(isFetchOrder || loyaltyEnrollStore?.epcOrderId) && (
              <Box>
                <>
                  <RedeemBox
                    sx={{
                      marginTop: isMobile ? "1.56vw !important" : "0vw",
                    }}>
                    {(props?.parameterMap?.[0]?.value || props?.parameterMap?.[1]?.value) && (
                      <Typography
                        variant={isMobile ? "m-body-sl" : "body-ml"}
                        sx={{
                          color: theme?.palette?.ihclPalette?.hexTwentyEight,
                        }}>
                        {`${
                          Number(
                            apiRes?.data?.priceSummary?.neuCoins
                              ? apiRes?.data?.priceSummary?.neuCoins
                              : GCFormDetailsStore?.cartDetails?.priceSummary?.neuCoins,
                          ) > 1
                            ? props?.parameterMap?.[1]?.value
                            : props?.parameterMap?.[0]?.value
                        }
                `}
                      </Typography>
                    )}
                    {isMobile && (
                      <Typography
                        variant={isMobile ? "m-text-link" : "link-m"}
                        onClick={() => {
                          GCFormDetailsStore &&
                            GCDeleteTenderModeToCart(
                              giftCardManageStore,
                              GCFormDetailsStore,
                              tenderNeucoinsRedeemed,
                              setApiRes,
                            )
                        }}>
                        {remove}
                      </Typography>
                    )}
                  </RedeemBox>
                  <RedeemBoxWrapper $isMobile={isMobile}>
                    <RedeemBox
                      sx={{
                        padding: isMobile ? "3.125vw" : "1.04vw 1.30vw",
                        background: theme?.palette?.ihclPalette?.hexEighteen,
                        width: "100%",
                      }}>
                      <ColorTypographyWrapper>
                        <ColorTypography variant={isMobile ? "m-body-sl" : "body-ml"}>
                          {`${Pluralize(CONSTANTS?.NEU_COIN, tenderNeucoinsRedeemed, false)?.split(" ")?.[1]} ${
                            CONSTANTS?.REDEEMED
                          }`}
                        </ColorTypography>
                        <ColorTypography variant={isMobile ? "m-body-sl" : "body-ml"}>
                          {numberFormatWithoutSymbol(tenderNeucoinsRedeemed)}
                        </ColorTypography>
                      </ColorTypographyWrapper>
                    </RedeemBox>
                    {!isMobile && (
                      <Box>
                        <RenderActionItem
                          isActionButtonType={true}
                          url={""}
                          title={remove}
                          variant={"light-contained"}
                          onClick={() => {
                            GCFormDetailsStore &&
                              GCDeleteTenderModeToCart(
                                giftCardManageStore,
                                GCFormDetailsStore,
                                tenderNeucoinsRedeemed,
                                setApiRes,
                              )
                          }}
                          navigationType={PathType?.internal}
                          buttonStyles={{
                            minWidth: DesktopPxToVw(185),
                            letterSpacing: "0.1em",
                          }}
                        />
                      </Box>
                    )}
                  </RedeemBoxWrapper>
                </>
              </Box>
            )}
          </InnerRoomAccordionDetail>
        </InnerAccordion>
      )}
    </>
  )
}

export default observer(NeuCoinsRedemption)
