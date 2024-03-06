import { PathType } from "../../../types"
import { theme } from "../../../lib/theme"
import { observer } from "mobx-react-lite"
import { currencyPrettier } from "../../../utils/currency"
import { useMobileCheck } from "../../../utils/isMobilView"
import LoyaltyStore from "../store/pageStore/loyalty.store"
import LoadingSpinner from "../../../utils/SpinnerComponent"
import { Box, Button, Grid, Typography } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import { useLoggedIn } from "../../../utils/hooks/useLoggedIn"
import { DefaultColor } from "./render-epicure-payment-tabs.styles"
import { EPICURE_NEU_COINS_REDEMPTION_CONSTANTS } from "./constants"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import LoyaltyGlobalStore from "../store/globalStore/loyalty-global-store"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import RenderActionItem from "../../../components/hoc/actions/action-items-ui"
import { CustomCheckBox } from "../../../components/hoc/CustomCheckBox/Checkbox"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { EpcAddTenderModeToCart, EpcDeleteTenderModeToCart } from "./tender-modes.service"
import { restrictNumericSymbol } from "../../../components/forms/book-a-stay-form/utils"
import {
  BalanceCheckBox,
  ColorTypography,
  ErrorMessageBox,
  InnerAccordion,
  InnerAccordionSummary,
  InnerRoomAccordionDetail,
  NueCoinsBox,
  NueCoinsRedeemBox,
  NueCoinsRedeemInput,
  RedeemAllBox,
  RedeemAllTypography,
  RedeemGrid,
} from "./neu-coins-redemption.styles"

const EpicureNeuCoinsRedemption = ({ props }: any) => {
  const [show, setShow] = useState<boolean>(false)
  const [apiRes, setApiRes] = useState<any>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [checked, setChecked] = useState<boolean>(true)
  const [loader, setLoader] = useState<boolean>(false)
  const [tenderNeucoinsRedeemed, setTenderNeucoinsRedeemed] = useState(0)
  const [userEnteredCoins, setUserEnteredCoins] = useState<number | null>(null)

  const login = useLoggedIn()
  const isMobile = useMobileCheck()
  const pageContext = useContext(PageContext)
  const context: any = useContext(IHCLContext)

  //loyalty global store
  const { epicureCardData, fetchNeuCoins, userNeuCoins, updateEpicureCardData }: any = context?.getGlobalStore(
    GLOBAL_STORES.loyaltyGlobalStore,
  ) as LoyaltyGlobalStore

  //loyalty page store
  const loyaltyEnrollStore = pageContext?.getPageStore(
    PAGE_STORES.LOYALTY_STORES.loyaltyEpicureCardsStore,
  ) as LoyaltyStore

  const { epcOrderId } = loyaltyEnrollStore

  const orderId: any = global?.window?.sessionStorage?.getItem("order_id")

  const totalAmountPayable = Number(epicureCardData?.totalPayableAmount)

  const iconColor = theme?.palette?.ihclPalette?.hexTwentyEight

  const {
    remove,
    redeemAll,
    balanceAmount,
    neuCoinsRedeemed,
    neuCoinRedeemed,
    successfullyRedeemCoins,
    UseYourNeuCoins,
    oneNeuCoinOneRupee,
  } = EPICURE_NEU_COINS_REDEMPTION_CONSTANTS

  const isFetchOrder =
    (orderId && loyaltyEnrollStore?.epcTenderModeDetails?.data?.priceSummary?.neuCoins > 0) ||
    epicureCardData?.neuCoins > 0

  useEffect(() => {
    if (isFetchOrder) {
      setIsVisible(true)
      setTenderNeucoinsRedeemed(epicureCardData?.neuCoins)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (Number(userNeuCoins) > 0) {
      if (Number(userNeuCoins) >= Number(totalAmountPayable)) {
        EpcAddTenderModeToCart(
          loyaltyEnrollStore,
          totalAmountPayable as number,
          setTenderNeucoinsRedeemed,
          setApiRes,
          apiRes,
          setIsVisible,
          updateEpicureCardData,
          setLoader,
        )
        setUserEnteredCoins(totalAmountPayable)
      } else {
        EpcAddTenderModeToCart(
          loyaltyEnrollStore,
          userNeuCoins as number,
          setTenderNeucoinsRedeemed,
          setApiRes,
          apiRes,
          setIsVisible,
          updateEpicureCardData,
        )
        setUserEnteredCoins(userNeuCoins)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userNeuCoins])

  useEffect(() => {
    if (epcOrderId) {
      setShow(true)
    } else {
      setShow(false)
    }
  }, [epcOrderId])

  useEffect(() => {
    if (Number(userNeuCoins) >= Number(totalAmountPayable)) {
      setChecked(true)
      setUserEnteredCoins(totalAmountPayable)
    } else {
      setChecked(true)
      setUserEnteredCoins(userNeuCoins)
    }
  }, [totalAmountPayable, userNeuCoins])

  useEffect(() => {
    if (checked) {
      if (Number(userNeuCoins) >= Number(totalAmountPayable)) {
        setUserEnteredCoins(totalAmountPayable)
      } else {
        setUserEnteredCoins(userNeuCoins)
      }
    } else {
      setUserEnteredCoins(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked])

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

  const handleCheck = () => {
    setChecked((prev: boolean) => !prev)
  }

  const handleNeuCoins = (event: any) => {
    const enterValue = event?.target?.value
    const pattern = /^([0-9])*$/
    if (enterValue === "") {
      setUserEnteredCoins(null)
    } else if (pattern.test(enterValue) && enterValue !== "" && !isNaN(enterValue)) {
      const value = parseFloat(enterValue)
      if (value <= userNeuCoins && value <= totalAmountPayable) {
        setUserEnteredCoins(value)
      }
    }
  }

  return (
    <>
      {loader ? (
        <LoadingSpinner containerStyle={{ background: theme?.palette?.ihclPalette?.hexSix }} />
      ) : (
        <>
          {show && login && (
            <>
              <InnerAccordion expanded={true}>
                <InnerAccordionSummary sx={{ cursor: "default !important" }}>
                  <DefaultColor
                    sx={{
                      fontWeight: 700,
                    }}
                    variant={isMobile ? "m-body-sl" : "body-ml"}>
                    {UseYourNeuCoins}
                  </DefaultColor>
                  <Typography variant={isMobile ? "m-body-sl" : "body-ml"} sx={{ ml: "0.52vw" }}>
                    {`(${oneNeuCoinOneRupee})`}
                  </Typography>
                </InnerAccordionSummary>
                <InnerRoomAccordionDetail
                  sx={{
                    padding: successfullyRedeemCoins ? `${DesktopPxToVw(1)} 0 0 !important` : "intial",
                  }}>
                  {!isVisible && (
                    <NueCoinsBox>
                      <BalanceCheckBox>
                        <Typography variant={isMobile ? "m-body-l" : "body-ml"}>{balanceAmount}</Typography>
                        <Typography variant={isMobile ? "m-body-l" : "body-ml"}>
                          {currencyPrettier(userNeuCoins ?? 0)?.slice(1)}
                        </Typography>
                      </BalanceCheckBox>
                      {userNeuCoins > 0 && (
                        <NueCoinsRedeemBox>
                          <RedeemAllBox>
                            <Box
                              sx={{
                                padding: "1vw 0px",
                                display: "flex",
                                alignItems: "center",
                              }}>
                              <CustomCheckBox
                                isCheckBoxDisabled={apiRes !== null}
                                checked={checked}
                                withBorder={false}
                                onChange={() => handleCheck()}
                              />
                              <RedeemAllTypography
                                variant={isMobile ? "m-body-s" : "body-s"}
                                sx={{
                                  whiteSpace: isMobile ? "nowrap" : "inherit",
                                }}>
                                {redeemAll}
                              </RedeemAllTypography>
                            </Box>
                            <NueCoinsRedeemInput
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
                              onChange={(e: any) => handleNeuCoins(e)}
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
                              disabled={false}
                              onClick={() => {
                                if (!Number.isNaN(Number(userEnteredCoins)) && Number(userEnteredCoins) > 0) {
                                  EpcAddTenderModeToCart(
                                    loyaltyEnrollStore,
                                    userEnteredCoins as number,
                                    setTenderNeucoinsRedeemed,
                                    setApiRes,
                                    apiRes,
                                    setIsVisible,
                                    updateEpicureCardData,
                                  )
                                }
                              }}>
                              {props?.title}
                            </Button>
                          </Box>
                        </NueCoinsRedeemBox>
                      )}
                    </NueCoinsBox>
                  )}
                  {apiRes?.error && apiRes?.data?.data && (
                    <ErrorMessageBox $isMobile={isMobile}>
                      <Typography
                        color={theme?.palette?.ihclPalette?.hexTen}
                        variant={isMobile ? "m-body-s" : "body-s"}>
                        {apiRes?.data?.data}
                      </Typography>
                    </ErrorMessageBox>
                  )}
                  {isVisible && (
                    <Grid container sx={{ alignItems: "center" }}>
                      <>
                        {(props?.parameterMap?.[0]?.value || props?.parameterMap?.[1]?.value) && (
                          <RedeemGrid
                            item
                            lg={12}
                            md={12}
                            xl={12}
                            xs={11}
                            sm={11}
                            sx={{
                              marginTop: isMobile ? "1.56vw !important" : "1vw",
                            }}>
                            <Typography variant={isMobile ? "m-body-sl" : "body-ml"} sx={{ color: iconColor }}>
                              {Number(tenderNeucoinsRedeemed) > 1
                                ? props?.parameterMap?.[0]?.value
                                : props?.parameterMap?.[1]?.value}
                            </Typography>
                          </RedeemGrid>
                        )}
                        {isMobile && (
                          <Grid item xs={1} sm={1} sx={{ display: "flex", justifyContent: "end", marginTop: "1vw" }}>
                            <Typography
                              sx={{ fontSize: MobilePxToVw(18) }}
                              variant={isMobile ? "m-text-link" : "link-m"}
                              onClick={() => {
                                EpcDeleteTenderModeToCart(
                                  loyaltyEnrollStore,
                                  tenderNeucoinsRedeemed,
                                  setApiRes,
                                  setIsVisible,
                                  updateEpicureCardData,
                                )
                              }}>
                              {remove}
                            </Typography>
                          </Grid>
                        )}
                        <Grid container>
                          <RedeemGrid
                            item
                            lg={10}
                            md={10}
                            xl={10}
                            xs={12}
                            sm={12}
                            sx={{
                              padding: isMobile ? "3.125vw" : "1.04vw 1.30vw",
                              background: theme?.palette?.ihclPalette?.hexEighteen,
                              marginTop: isMobile ? "3.125vw !important" : "1.04vw",
                            }}>
                            <ColorTypography variant={isMobile ? "m-body-sl" : "body-ml"}>
                              {Number(tenderNeucoinsRedeemed) > 1 ? neuCoinsRedeemed : neuCoinRedeemed}
                            </ColorTypography>
                            <ColorTypography variant={isMobile ? "m-body-sl" : "body-ml"}>
                              {tenderNeucoinsRedeemed && currencyPrettier(tenderNeucoinsRedeemed)?.slice(1)}
                            </ColorTypography>
                          </RedeemGrid>
                          {!isMobile && (
                            <Grid
                              item
                              lg={2}
                              md={2}
                              xl={2}
                              sx={{ display: "flex", alignItems: "end", marginBottom: "0.2vw" }}>
                              <RenderActionItem
                                isActionButtonType={true}
                                url={""}
                                title={remove}
                                variant={"light-contained"}
                                navigationType={PathType?.internal}
                                onClick={() => {
                                  EpcDeleteTenderModeToCart(
                                    loyaltyEnrollStore,
                                    tenderNeucoinsRedeemed,
                                    setApiRes,
                                    setIsVisible,
                                    updateEpicureCardData,
                                  )
                                }}
                                buttonStyles={{
                                  marginLeft: DesktopPxToVw(19),
                                  width: DesktopPxToVw(146),
                                }}
                              />
                            </Grid>
                          )}
                        </Grid>
                      </>
                    </Grid>
                  )}
                </InnerRoomAccordionDetail>
              </InnerAccordion>
            </>
          )}
        </>
      )}
    </>
  )
}

export default observer(EpicureNeuCoinsRedemption)
