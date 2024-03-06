import React, { useContext, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { theme } from "../../../lib/theme"
import { observer } from "mobx-react-lite"
import { BOOKING_CONSTANT } from "../constants"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { useMobileCheck } from "../../../utils/isMobilView"
import { getSpace } from "../../../utils/GetSpaceAfterFourDigits"
import manageGCStore from "../../giftCard/store/pageStore/manageGC.store"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import BookingFlowGlobalStore from "../store/globalStore/booking.flow.store"
import TextfieldValidator from "../../../utils/validations/TextfieldValidator"
import { CustomCheckBox } from "../../../components/hoc/CustomCheckBox/Checkbox"
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { GCPin, GCNumber } from "../../../components/forms/gift-card-form/constants"
import { Box, Input, Button, IconButton, Typography, FormControl, InputAdornment, FormHelperText } from "@mui/material"
import {
  RedeemBox,
  InputsFieldBox,
  InputTextField,
  ColorTypography,
  ErrorTypographyBox,
  CheckBalanceButton,
  RedeemedBalanceBox,
  GiftCardRedeemInput,
  RedeemAllTypography,
  InnerRoomAccordionDetail,
  FormErrorsWrapperContainer,
  AnotherGiftCardWrapperContainer,
  GiftCardAmountWrapperContainer,
  InnerAccordion,
  InnerAccordionSummary,
} from "../../../components/BookingFlow/styles/redeem-save"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { MinusIcon, PlusIcon } from "../../../utils/customIcons"

const LoadingSpinner = dynamic(() => import("../../../utils/SpinnerComponent"))

const RedeemGiftCard = (props: any) => {
  const { REDEEM, remove, redeemAll, CHECK_BALANCE, ADD_ANOTHER_GIFT_CARD, GIFT_CARD, GIFT_CARD_MAX_LIMIT } =
    BOOKING_CONSTANT

  const isMobile = useMobileCheck()
  const context: any = useContext(IHCLContext)

  const manageGC = new manageGCStore()

  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore

  const {
    loading,
    setLoading,
    cartDetails,
    isGCRedeemed,
    orderDetails,
    setIsGCRedeemed,
    addTenderModeToCart,
    addTenderModesError,
    removeTenderModeFromCart,
    setListOfGiftCardsAddedToCart,
    updateAddTenderModeErrorMessage,
  } = bookingFlowGlobalStore

  const paymentSummary = cartDetails?.cartDetailsResponse?.paymentSummary

  const redeemedGiftCards = cartDetails?.cartDetailsResponse?.paymentDetails?.filter(
    (item: any) => item?.paymentType === GIFT_CARD,
  )

  const [balance, setBalance] = useState<any>()
  const [enteredOTP, setEnteredOTP] = useState<any>()
  const [checked, setChecked] = useState<boolean>(false)
  const [userBalance, setUserBalance] = useState<any>(null)
  const [resendTimer, setResendTimer] = useState<number>(30)
  const [redeemState, setRedeemState] = useState<string>("check")
  const [showPassword, setShowPassword] = useState<Boolean>(false)
  const [isExpiredCard, setIsExpiredCard] = useState<boolean>(false)
  const [addTenderModeErrorMsg, setAddTenderModeErrorMsg] = useState<string>()
  const [formValues, setFormValues] = useState<any>({
    [GCNumber]: "",
    [GCPin]: "",
  })
  const [ErrorMessage, setErrorMessage] = useState<any>({
    [GCNumber]: "",
    [GCPin]: "",
  })
  const [formErrors, setFormErrors] = useState<any>({
    [GCNumber]: false,
    [GCPin]: false,
  })
  const [expanded, setExpanded] = useState<boolean>(false)

  const handleAccordion = () => {
    setExpanded(!expanded)
  }

  const availableBalance = +balance

  const formValidation = (isFormValid: any, id: any) => {
    setFormErrors({ ...formErrors, [id]: !isFormValid })
  }

  const isCardAlreadyRedeemed = redeemedGiftCards?.some((card: any) =>
    card?.cardNumber?.includes(formValues?.GCNumber?.split(" ")?.join("")),
  )

  const handleChangeForm = (event: any) => {
    const { name, value } = event.target
    props?.setWrongMsg("")
    setAddTenderModeErrorMsg("")
    updateAddTenderModeErrorMessage()
    if (event?.target?.value?.length < 6) {
      setRedeemState("check")
    }
    const { status, errorMsg, fieldName } = TextfieldValidator(name, value)
    setErrorMessage((prev: any) => {
      return {
        ...prev,
        [fieldName]: errorMsg,
      }
    })
    setFormValues((prev: any) => {
      return {
        ...prev,
        [name]: isNaN(event?.target?.value) ? "" : event?.target?.value,
      }
    })
    formValidation(status, name)
  }

  const handleCheck = () => {
    setChecked(!checked)
    checked ? setUserBalance("") : setUserBalance(availableBalance)
  }
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const gcRedeemsLimit: boolean = redeemedGiftCards?.length < GIFT_CARD_MAX_LIMIT

  useEffect(() => {
    setFormValues({ [GCNumber]: "", [GCPin]: "" })
    setUserBalance("")
  }, [isGCRedeemed])

  useEffect(() => {
    if (addTenderModesError) {
      setAddTenderModeErrorMsg(addTenderModesError)
    } else {
      updateAddTenderModeErrorMessage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addTenderModesError])

  const getGiftCardBalance = async () => {
    try {
      setLoading(true)
      await manageGC
        .balanceEnquiry({
          balanceEnquiry: [
            {
              CardPin: formValues?.GCPin,
              type: BOOKING_CONSTANT?.BOOKING_TYPE,
              CardNumber: formValues?.GCNumber?.replaceAll(" ", ""),
            },
          ],
        })
        .then((res) => {
          if (!res?.error) {
            if (res?.data?.ResponseCode !== "0" && Number(res?.data?.ResponseCode) !== 10012) {
              props?.setWrongMsg(res?.data?.Cards?.[0]?.ResponseMessage)
            } else if (Number(res?.data?.ResponseCode) == 10012) {
              setIsExpiredCard(true)
              setRedeemState("success")
            } else {
              setBalance(res?.data?.Cards?.[0]?.Balance)
              setListOfGiftCardsAddedToCart({
                amount: res?.data?.Cards?.[0]?.Balance,
                cardNumber: formValues?.GCNumber,
              })
              if (isCardAlreadyRedeemed) {
                props?.setWrongMsg("This card has already been  used, please use a different card for redemption")
                setRedeemState("success")
              } else {
                setRedeemState("verifyOTP")
              }
            }
          } else {
            props?.setWrongMsg(res?.data?.message || res?.data?.Cards?.[0]?.ResponseMessage)
          }
        })
        .catch((err) => {
          console.error(err)
        })
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    paymentSummary?.giftCardPrice > 0 && setRedeemState("success")
  }, [paymentSummary?.giftCardPrice])

  useEffect(() => {
    if (formValues?.GCNumber?.length === 19) {
      setFormErrors({ ...formErrors, [GCNumber]: false })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues?.GCNumber])

  const handleCardNumber = (event: any) => {
    handleChangeForm(event)
    let CardNumber = event?.target?.value
    if (CardNumber > 19) {
      CardNumber = CardNumber.substr(0, 19)
    } else {
      setRedeemState("check")
    }
    const inputVal = CardNumber?.replace(/ /g, "")
    let inputNumbersOnly = inputVal?.replace(/\D/g, "")
    if (inputNumbersOnly?.length >= 16) {
      inputNumbersOnly = inputNumbersOnly.replace(/[`~!$%^@*()_|+\=?;:'"<>\{\}\[\]\\]/gi, "").substr(0, 16)
    }
    const splits = inputNumbersOnly?.match(/.{1,4}/g)
    let spacedNumber = ""
    if (splits) {
      spacedNumber = splits?.join(" ")
    }
    if (spacedNumber.slice(0, 1) !== "0") {
      setFormValues((prev: any) => {
        return {
          ...prev,
          [event.target.name]: spacedNumber.trim(),
        }
      })
    }
  }

  useEffect(() => {
    if (resendTimer != 0 && redeemState == "verifyOTP") {
      setTimeout(() => {
        setResendTimer(resendTimer - 1)
      }, 1000)
    }
  }, [resendTimer, redeemState])

  const gcBalanceToRedeem = checked
    ? cartDetails?.cartDetailsResponse?.payableAmount > balance
      ? balance
      : cartDetails?.cartDetailsResponse?.payableAmount < balance
      ? cartDetails?.cartDetailsResponse?.payableAmount
      : balance
    : userBalance

  return (
    <>
      {!props?.isHidden && (
        <>
          {loading && <LoadingSpinner />}
          <InnerAccordion expanded={expanded} onChange={handleAccordion}>
            <InnerAccordionSummary
              expandIcon={
                expanded ? (
                  <MinusIcon
                    sx={{
                      height: isMobile ? "2.188vw" : "0.729vw",
                      width: isMobile ? "2.188vw" : "0.729vw",
                    }}
                  />
                ) : (
                  <PlusIcon
                    sx={{
                      height: isMobile ? "2.188vw" : "0.729vw",
                      width: isMobile ? "2.188vw" : "0.729vw",
                    }}
                  />
                )
              }>
              <Typography
                sx={{
                  fontWeight: 700,
                  color: theme?.palette?.text?.primary,
                }}
                variant={isMobile ? "m-body-sl" : "body-ml"}>
                Redeem A Gift Card
              </Typography>
            </InnerAccordionSummary>
            <InnerRoomAccordionDetail>
              {cartDetails?.cartDetailsResponse?.paymentDetails?.length > 0 && (
                <AnotherGiftCardWrapperContainer $isMobile={isMobile}>
                  {cartDetails?.cartDetailsResponse?.paymentDetails?.length > 0 &&
                    redeemedGiftCards?.map((giftCard: any, index: number) => (
                      <>
                        <RedeemBox key={index} m={isMobile ? `${MobilePxToVw(10)} 0vw 0vw` : "1.04vw 0vw"}>
                          <Typography
                            variant={isMobile ? "m-body-s" : "body-s"}
                            sx={{
                              paddingRight: isMobile ? MobilePxToVw(65) : "unset",
                            }}>
                            Congratulations, your gift card number
                            <b> {getSpace(giftCard?.cardNumber)} </b> has been successfully redeemed!
                          </Typography>
                          {!props?.continueButtonClicked && (
                            <Typography
                              variant={isMobile ? "m-text-link" : "link-m"}
                              sx={{
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                removeTenderModeFromCart(
                                  orderDetails?.orderDetailsResponse?.orderId,
                                  GIFT_CARD,
                                  giftCard?.txnNetAmount,
                                  giftCard?.cardNumber,
                                )
                                props?.setWrongMsg("")
                                setUserBalance("")
                                setRedeemState("check")
                                setChecked(false)
                              }}>
                              {remove}
                            </Typography>
                          )}
                        </RedeemBox>
                        <GiftCardAmountWrapperContainer
                          $isMobile={isMobile}
                          mb={gcRedeemsLimit ? (isMobile ? MobilePxToVw(10) : DesktopPxToVw(20)) : 0}>
                          <ColorTypography variant={isMobile ? "m-body-s" : "body-ml"}>
                            {BOOKING_CONSTANT?.GIFT_CARD_AMOUNT_REDEEMED}
                          </ColorTypography>
                          <ColorTypography variant={isMobile ? "m-body-sl" : "body-ml"}>
                            {giftCard?.txnNetAmount?.toLocaleString("en-IN", {
                              maximumFractionDigits: 0,
                              style: "currency",
                              currency: "INR",
                            })}
                          </ColorTypography>
                        </GiftCardAmountWrapperContainer>
                      </>
                    ))}
                  {isExpiredCard && formValues?.GCNumber && (
                    <Typography
                      variant={isMobile ? "m-body-s" : "body-m"}
                      sx={{
                        color: theme.palette.neuPalette.hexThirtyTwo,
                      }}>{`Gift card number ${formValues?.GCNumber} has Expired. Please enter a new gift card.`}</Typography>
                  )}
                  {redeemState === "success" && gcRedeemsLimit && (
                    <Button
                      variant="light-outlined"
                      sx={{
                        width: isMobile ? "100%" : "20vw",
                        margin: isMobile ? `${MobilePxToVw(20)} 0vw` : "1.04vw 0vw 1.77vw 0vw",
                      }}
                      disabled={
                        cartDetails?.cartDetailsResponse?.basePrice ===
                        cartDetails?.cartDetailsResponse?.paymentSummary?.giftCardPrice
                          ? true
                          : false
                      }
                      onClick={() => {
                        setIsGCRedeemed()
                        setRedeemState("check")
                        setIsExpiredCard(false)
                        setFormValues({})
                        props?.setWrongMsg("")
                      }}>
                      {ADD_ANOTHER_GIFT_CARD}
                    </Button>
                  )}
                </AnotherGiftCardWrapperContainer>
              )}
              {redeemState !== "success" && (
                <FormErrorsWrapperContainer $isMobile={isMobile} alignItems={"baseline"}>
                  <InputsFieldBox $textFieldErrors={formErrors[GCPin] || formErrors[GCNumber]}>
                    <InputTextField
                      required
                      error={formErrors[GCNumber] && formValues[GCNumber]?.length > 0}
                      placeholder={"Enter Your Gift Card Number"}
                      inputProps={{
                        maxLength: 19,
                      }}
                      helperText={formErrors[GCNumber] && formValues[GCNumber]?.length > 0 && ErrorMessage[GCNumber]}
                      sx={{
                        "& .MuiFormHelperText-root.Mui-error ": {
                          fontSize: isMobile ? `${MobilePxToVw(16)} !important` : "0.8vw",
                        },
                        "& input::placeholder": {
                          lineHeight: "140%",
                          fontStyle: "normal",
                          fontFamily: "Inter",
                          fontWeight: "300 !important",
                          fontSize: isMobile ? MobilePxToVw(22) : DesktopPxToVw(22),
                          color: `${theme.palette.neuPalette?.hexSeventeen} !important`,
                        },
                        "& .MuiInputBase-input": {
                          lineHeight: "140%",
                          fontStyle: "normal",
                          fontFamily: "Inter",
                          fontWeight: "300 !important",
                          fontSize: isMobile ? MobilePxToVw(22) : DesktopPxToVw(22),
                          color: `${theme.palette.neuPalette?.hexSeventeen} !important`,
                          paddingBottom: isMobile ? MobilePxToVw(5) : DesktopPxToVw(10),
                        },
                      }}
                      name={GCNumber}
                      variant="standard"
                      value={formValues?.[GCNumber]}
                      onChange={(e: any) => handleCardNumber(e)}
                    />
                    <FormControl variant="standard" sx={{ width: isMobile ? "22.188vw" : "9.37vw" }}>
                      <Input
                        name={GCPin}
                        placeholder={"PIN"}
                        value={isNaN(formValues?.GCPin) ? "" : formValues?.GCPin}
                        id="standard-adornment-password"
                        type={showPassword ? "number" : "password"}
                        onInput={(e: any) => {
                          e.target.value = Math?.max(0, parseInt(e?.target?.value))?.toString()?.slice(0, 6)
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              sx={{
                                padding: "0px",
                              }}
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}>
                              {showPassword ? (
                                <VisibilityOutlinedIcon
                                  sx={{
                                    width: isMobile ? MobilePxToVw(30) : DesktopPxToVw(32),
                                    height: isMobile ? MobilePxToVw(20) : DesktopPxToVw(22),
                                  }}
                                />
                              ) : (
                                <VisibilityOffOutlinedIcon
                                  sx={{
                                    width: isMobile ? MobilePxToVw(30) : DesktopPxToVw(32),
                                    height: isMobile ? MobilePxToVw(20) : DesktopPxToVw(22),
                                  }}
                                />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        onChange={(e: any) => handleChangeForm(e)}
                        error={formErrors[GCPin] && formValues[GCPin]?.length > 0 && formValues[GCPin]?.length < 6}
                        sx={{
                          "& .MuiFormControl-root.MuiTextField-root input": {
                            padding: "0vw",
                          },
                          "& .MuiInputBase-input": {
                            fontWeight: 300,
                            lineHeight: "140%",
                            fontStyle: "normal",
                            fontFamily: "Inter",
                            fontSize: isMobile ? MobilePxToVw(22) : DesktopPxToVw(22),
                            color: `${theme.palette.neuPalette?.hexSeventeen}`,
                            paddingBottom: isMobile ? MobilePxToVw(5) : DesktopPxToVw(10),
                          },
                          "& input::placeholder": {
                            fontWeight: 300,
                            lineHeight: "140%",
                            fontStyle: "normal",
                            fontFamily: "Inter",
                            color: `${theme.palette.neuPalette?.hexSeventeen} !important`,
                            fontSize: isMobile ? MobilePxToVw(18) : DesktopPxToVw(18),
                            opacity: 1,
                          },
                        }}
                      />
                      {formErrors[GCPin] && formValues[GCPin]?.length > 0 && formValues[GCPin]?.length < 6 && (
                        <FormHelperText
                          sx={{
                            color: theme?.palette?.neuPalette?.hexTwentySeven,
                            fontSize: isMobile ? MobilePxToVw(16) : "0.8vw",
                          }}>
                          {ErrorMessage[GCPin]}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </InputsFieldBox>
                  {(redeemState === "check" || balance == 0) && (
                    <CheckBalanceButton
                      variant="light-contained"
                      onClick={() => {
                        getGiftCardBalance()
                        setChecked(false)
                        setUserBalance(null)
                      }}
                      disabled={
                        formErrors[GCNumber] ||
                        formValues?.[GCNumber] === "" ||
                        formErrors[GCPin] ||
                        formValues.cardPin === "" ||
                        formValues[GCPin]?.length < 6
                      }>
                      {CHECK_BALANCE}
                    </CheckBalanceButton>
                  )}
                </FormErrorsWrapperContainer>
              )}
              {props?.wrongMsg && (
                <ErrorTypographyBox>
                  <Typography
                    variant={isMobile ? "m-body-m" : "body-m"}
                    color={theme?.palette?.neuPalette?.hexTwentySeven}
                    sx={{ textAlign: "justify", mt: isMobile ? 0 : DesktopPxToVw(10) }}>
                    {props?.wrongMsg}
                  </Typography>
                </ErrorTypographyBox>
              )}
              {(redeemState == "getOTP" || redeemState == "verifyOTP") && formValues?.GCNumber && formValues?.GCPin && (
                <>
                  <RedeemedBalanceBox sx={{}}>
                    <ColorTypography variant={isMobile ? "m-body-s" : "body-s"}>
                      {BOOKING_CONSTANT?.balanceAmount}
                    </ColorTypography>
                    <ColorTypography variant={isMobile ? "m-body-l" : "body-ml"}>
                      {Number(balance)?.toLocaleString("en-IN", {
                        maximumFractionDigits: 0,
                        style: "currency",
                        currency: "INR",
                      })}
                    </ColorTypography>
                  </RedeemedBalanceBox>
                  <InputsFieldBox
                    $textFieldErrors={false}
                    sx={{
                      marginTop: isMobile ? "3.125vw" : "1.04vw",
                      alignItems: isMobile ? "inherit" : "unset !important",
                      justifyContent: isMobile ? "space-between" : "inherit",
                    }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ padding: isMobile ? "0vw 1vw 0vw 0vw" : "1vw" }}>
                        <CustomCheckBox checked={checked} withBorder={false} onChange={() => handleCheck()} />
                        <RedeemAllTypography variant={isMobile ? "m-body-s" : "body-s"}>
                          {redeemAll}
                        </RedeemAllTypography>
                      </Box>
                      <GiftCardRedeemInput
                        variant="standard"
                        placeholder="Enter Amount"
                        value={gcBalanceToRedeem}
                        onChange={(e: { target: { value: any } }) => {
                          const pattern = /^([0-9])*$/
                          pattern.test(e?.target?.value) && setUserBalance(e?.target?.value)
                        }}
                        sx={{
                          "& ::placeholder": {
                            fontWeight: 300,
                            lineHeight: "140%",
                            fontStyle: "normal",
                            fontFamily: "Inter",
                            color: `${theme.palette.neuPalette?.hexSeventeen} !important`,
                            fontSize: isMobile ? MobilePxToVw(22) : DesktopPxToVw(22),
                          },
                          "& .MuiInputBase-input": {
                            fontWeight: 300,
                            lineHeight: "140%",
                            fontStyle: "normal",
                            fontFamily: "Inter",
                            color: `${theme.palette.neuPalette?.hexSeventeen} !important`,
                            fontSize: isMobile ? MobilePxToVw(22) : DesktopPxToVw(22),
                          },
                        }}
                      />
                    </Box>
                    {redeemState == "verifyOTP" && (
                      <Button
                        sx={{ width: isMobile ? "25.313vw" : "auto" }}
                        variant="light-contained"
                        onClick={async () => {
                          await addTenderModeToCart(
                            orderDetails?.orderDetailsResponse?.orderId,
                            GIFT_CARD,
                            gcBalanceToRedeem,
                            formValues?.GCPin,
                            formValues?.GCNumber?.replaceAll(" ", ""),
                          )
                          setChecked(false)
                        }}
                        disabled={
                          checked
                            ? availableBalance
                              ? false
                              : true
                            : userBalance > 0 &&
                              availableBalance >= userBalance &&
                              cartDetails?.cartDetailsResponse?.payableAmount >= userBalance
                            ? false
                            : true
                        }>
                        {REDEEM}
                      </Button>
                    )}
                  </InputsFieldBox>
                </>
              )}
              {addTenderModeErrorMsg && (
                <ErrorTypographyBox>
                  <Typography
                    variant={isMobile ? "m-body-m" : "body-m"}
                    color={theme?.palette?.neuPalette?.hexTwentySeven}>
                    {addTenderModeErrorMsg}
                  </Typography>
                </ErrorTypographyBox>
              )}
              {/* //commented as of now bcz we don't have OTP verification now */}
              {/* {redeemState == "verifyOTP" && (
          <>
            <InputsFieldVerify>
              <Input
                type="number"
                placeholder={"Enter OTP"}
                inputProps={{ maxLength: 6 }}
                id="standard-adornment-password"
                sx={{ width: isMobile ? "22.97vw" : "12.70vw" }}
                onChange={(e: { target: { value: any } }) =>
                  setEnteredOTP(e?.target?.value)
                }
              />
              <Button
                variant="light-contained"
                onClick={() => {
                  addTenderModeToCart(
                    "GIFT_CARD",
                    gcBalanceToRedeem,
                    formValues?.GCPin,
                    formValues?.GCNumber?.replaceAll(" ", "")
                  )
                }}
                sx={{ width: isMobile ? "22.97vw" : "7.65vw" }}
                disabled={enteredOTP?.length == 6 ? false : true}>
                {REDEEM}
              </Button>
            </InputsFieldVerify>
            <Box sx={{ marginTop: "1.04vw" }}>
              {resendTimer != 0 ? (
                <Typography variant={isMobile ? "m-body-s" : "body-s"}>
                  Resend code in {resendTimer} secs
                </Typography>
              ) : (
                <Typography
                  variant={isMobile ? "m-text-link" : "link-m"}
                  sx={{ cursor: "pointer" }}
                  onClick={() => setResendTimer(30)}>
                  Resend OTP{" "}
                </Typography>
              )}
            </Box>
          </>
        )} */}
            </InnerRoomAccordionDetail>
          </InnerAccordion>
        </>
      )}
    </>
  )
}

export default observer(RedeemGiftCard)
