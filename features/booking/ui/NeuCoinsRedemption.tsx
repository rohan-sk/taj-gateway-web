import React, { useContext, useEffect, useState } from "react"
import { UserStore } from "../../../store"
import dynamic from "next/dynamic"
import { observer } from "mobx-react-lite"
import { theme } from "../../../lib/theme"
import { BOOKING_CONSTANT } from "../constants"
import { Box, Button, Typography } from "@mui/material"
import { currencyPrettier } from "../../../utils/currency"
import { useMobileCheck } from "../../../utils/isMobilView"
import BookingsFlowStore from "../store/pageStore/booking.store"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import BookingFlowGlobalStore from "../store/globalStore/booking.flow.store"
const CustomCheckBox = dynamic(() =>
  import("../../../components/hoc/CustomCheckBox/Checkbox").then((module) => module.CustomCheckBox),
)
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import {
  RedeemBox,
  RemoveLink,
  InputRedeem,
  RedeemAllBox,
  InputsFieldBox,
  RedeemCheckbox,
  BalanceCheckBox,
  ColorTypography,
  RedeemAllTypography,
  InnerRoomAccordionDetail,
  NueCoinsRedeemInput,
  NueCoinsBox,
  NueCoinsRedeemBox,
  InnerAccordionSummary,
  InnerAccordion,
  DefaultColor,
  RedeemBoxWrapper,
} from "../../../components/BookingFlow/styles/redeem-save"
import { useLoggedIn } from "../../../utils/hooks/useLoggedIn"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
const RenderActionItem = dynamic(() => import("../../../components/hoc/actions/action-items-ui"))

const NeuCoinsRedemption = (props: any) => {
  const { primaryAction, wrongMsg, setWrongMsg, isHidden, title, continueButtonClicked } = props || {}
  const isMobile = useMobileCheck()
  const isUserLoggedIn = useLoggedIn()
  const pageContext = useContext(PageContext)
  const context: any = useContext(IHCLContext)

  const iconColor = theme?.palette?.ihclPalette?.hexSeventeen
  const { remove, redeemAll, balanceAmount, neucoinsRedeemed, successfullyRedeem } = BOOKING_CONSTANT
  //* User Store
  const { userDetails } = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore

  //* Global store
  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES.bookingFlowStore) as BookingFlowGlobalStore

  //* Page store
  const { fetchNeuCoins, userNeuCoins } = pageContext?.getPageStore(PAGE_STORES?.bookingFlowStore) as BookingsFlowStore

  const { cartDetails, orderDetails, addTenderModeToCart, removeTenderModeFromCart } = bookingFlowGlobalStore

  const payableAmount = cartDetails?.cartDetailsResponse?.payableAmount
  const redeemedNueCoins = cartDetails?.cartDetailsResponse?.paymentSummary?.neuCoins

  const [checked, setChecked] = useState<boolean>(true)
  const [userEnteredCoins, setUserEnteredCoins] = useState<string | number>("")
  const coins = +userEnteredCoins //converted string value to number

  const handleCheck = () => {
    setChecked(!checked)
    setUserEnteredCoins("")
  }

  useEffect(() => {
    try {
      if (global?.window?.localStorage?.getItem("accessToken")) {
        fetchNeuCoins(global?.window?.localStorage?.getItem("accessToken"))
      }
    } catch (error) {
      console.log(error, "error at fetch neucoins")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userNeuCoins, userDetails?.userHash])
  const coinsToRedeem = checked
    ? payableAmount > userNeuCoins
      ? userNeuCoins
      : payableAmount < userNeuCoins
      ? payableAmount
      : userNeuCoins
    : userEnteredCoins

  useEffect(() => {
    if (userNeuCoins > 0) {
      addTenderModeToCart(orderDetails?.orderDetailsResponse?.orderId, "TATA_NEU", coinsToRedeem)
      wrongMsg && setWrongMsg("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userNeuCoins])

  return (
    <>
      {!isHidden && isUserLoggedIn && (
        <InnerAccordion expanded={true}>
          <InnerAccordionSummary sx={{ cursor: "default !important" }}>
            <DefaultColor
              sx={{
                fontWeight: 700,
              }}
              variant={isMobile ? "m-body-sl" : "body-ml"}>
              {title}
            </DefaultColor>
            <Typography variant={isMobile ? "m-body-sl" : "body-ml"} sx={{ ml: "0.52vw" }}>
              (1 NeuCoin = 1 Rupee)
            </Typography>
          </InnerAccordionSummary>
          <InnerRoomAccordionDetail>
            {redeemedNueCoins <= 0 && (
              <NueCoinsBox>
                <BalanceCheckBox>
                  <Typography variant={isMobile ? "m-body-s" : "body-s"} sx={{ color: iconColor }}>
                    {balanceAmount}
                  </Typography>
                  <Typography variant={isMobile ? "m-body-l" : "body-ml"} sx={{ color: iconColor }}>
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
                        <CustomCheckBox checked={checked} withBorder={false} onChange={() => handleCheck()} />
                        <RedeemAllTypography
                          variant={isMobile ? "m-body-s" : "body-s"}
                          sx={{ whiteSpace: isMobile ? "nowrap" : "inherit" }}>
                          {redeemAll}
                        </RedeemAllTypography>
                      </Box>
                      <NueCoinsRedeemInput
                        sx={{
                          "&.MuiFormControl-root.MuiTextField-root input": {
                            paddingBottom: isMobile ? MobilePxToVw(10) : DesktopPxToVw(19),
                          },
                        }}
                        variant="standard"
                        value={coinsToRedeem}
                        onChange={(e: any) => {
                          const pattern = /^([0-9])*$/
                          pattern.test(e?.target?.value) && setUserEnteredCoins(e?.target?.value)
                        }}
                      />
                    </RedeemAllBox>
                    <Button
                      sx={{
                        alignSelf: isMobile ? "inherit" : "flex-end",
                        width: isMobile ? "24.844vw !important" : "default",
                      }}
                      variant="light-contained"
                      disabled={
                        checked
                          ? userNeuCoins > 0
                            ? false
                            : true
                          : coins > 0 && coins <= userNeuCoins && coins <= payableAmount
                          ? false
                          : true
                      }
                      onClick={() => {
                        addTenderModeToCart(orderDetails?.orderDetailsResponse?.orderId, "TATA_NEU", coinsToRedeem)
                        wrongMsg && setWrongMsg("")
                      }}>
                      REDEEM
                    </Button>
                  </NueCoinsRedeemBox>
                )}
              </NueCoinsBox>
            )}
            {redeemedNueCoins > 0 && (
              <Box>
                {isMobile && (
                  <Box
                    sx={{
                      marginTop: isMobile ? "1.56vw !important" : "0vw",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}>
                    {!continueButtonClicked && (
                      <Typography
                        variant={isMobile ? "m-text-link" : "link-m"}
                        onClick={() => {
                          removeTenderModeFromCart(
                            orderDetails?.orderDetailsResponse?.orderId,
                            "TATA_NEU",
                            redeemedNueCoins,
                          )
                        }}>
                        {remove}
                      </Typography>
                    )}
                  </Box>
                )}
                <RedeemBoxWrapper $isMobile={isMobile}>
                  <RedeemBox
                    sx={{
                      padding: isMobile ? "3.125vw" : "1.04vw 1.30vw",
                      background: theme?.palette?.ihclPalette?.hexEighteen,
                      width: "100%",
                    }}>
                    <ColorTypography variant={isMobile ? "m-body-sl" : "body-ml"}>
                      {redeemedNueCoins == 1 ? "NeuCoin redeemed" : neucoinsRedeemed}
                    </ColorTypography>
                    <ColorTypography variant={isMobile ? "m-body-sl" : "body-ml"}>
                      {Math.round(redeemedNueCoins)?.toLocaleString()}
                    </ColorTypography>
                  </RedeemBox>
                  {!isMobile && (
                    <Box>
                      <RenderActionItem
                        isActionButtonType={true}
                        url={""}
                        title={primaryAction?.title}
                        variant={primaryAction?.variant}
                        navigationType={primaryAction?.urlTypes}
                        onClick={() => {
                          removeTenderModeFromCart(
                            orderDetails?.orderDetailsResponse?.orderId,
                            "TATA_NEU",
                            redeemedNueCoins,
                          )
                        }}
                        buttonStyles={{
                          minWidth: DesktopPxToVw(185),
                          letterSpacing: "0.1em",
                        }}
                      />
                    </Box>
                  )}
                </RedeemBoxWrapper>
              </Box>
            )}
          </InnerRoomAccordionDetail>
        </InnerAccordion>
      )}
    </>
  )
}

export default observer(NeuCoinsRedemption)
