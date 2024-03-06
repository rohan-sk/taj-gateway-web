import React, { useContext, useEffect, useRef, useState } from "react"
import { groq } from "next-sanity"
import dynamic from "next/dynamic"
import { observer } from "mobx-react-lite"
import { theme } from "../../../lib/theme"
import { getClient } from "../../../lib-sanity"
import { CONSTANTS } from "../../../components/constants"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useMobileCheck } from "../../../utils/isMobilView"
import { Box, FormControl, Typography } from "@mui/material"
import { KeyboardArrowDownSharp } from "@mui/icons-material"
import { currency2DecimalSymbol } from "../../../utils/currency"
import BookingsFlowStore from "../store/pageStore/booking.store"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import { handler as CCAvenueEncruption } from "../../ccavenue-encryption"
import BookingFlowGlobalStore from "../store/globalStore/booking.flow.store"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import { Accordion, AccordionDetails, AccordionSummary, Button, Stack } from "@mui/material"
import {
  SelectStack,
  StyledBox,
  StyledCollapse,
  StyledLabel,
  StyledMenuItem,
} from "../../../components/BookingFlow/styles/details-card"
import { MainAccordion, MainAccordionSummary } from "./styles/payment-component"
import { InnerRoomAccordionDetail } from "../../../components/BookingFlow/styles/redeem-save"

const PayAtHotelForInternationalBooking = dynamic(
  () => import("./pay-at-hotel-card-for-international-booking.component"),
)

const PaymentDetailsCCA = (props: any) => {
  const { title, subtitle, description, primaryAction } = props
  const isMobile = useMobileCheck()
  const pageContext = useContext(PageContext)
  const context: any = useContext(IHCLContext)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const scrollRef = useRef<any>(null)
  const accordionRef = useRef<any>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [sanityTab, setSanityTabs] = useState<any>()
  const [encqRequest, setEncqRequest] = useState<any>()
  const [expanded, setExpanded] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [selectedCard, setSelectedCard] = useState<any>({})
  const [debitCardData, setDebitCardData] = useState<any>([])
  const [creditCardData, setCreditCardData] = useState<any>([])
  const [netBankingData, setNetBankingData] = useState<any>([])

  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore
  const bookingFlowPageStore = pageContext?.getPageStore(PAGE_STORES?.bookingFlowStore) as BookingsFlowStore
  const { guestFormDetails } = bookingFlowPageStore
  const { countryCurrencyCode, cartDetails, setIsSelectedComplimentaryVoucher } = bookingFlowGlobalStore

  const amountToPay = cartDetails?.cartDetailsResponse?.paymentSummary?.totalPayableAmount
  const currencyCode = countryCurrencyCode
    ? countryCurrencyCode
    : cartDetails?.cartDetailsResponse?.items?.[0]?.hotel?.[0]?.room?.[0]?.currency

  useEffect(() => {
    if (
      guestFormDetails?.firstName?.length > 0 &&
      guestFormDetails?.lastName?.length > 0 &&
      guestFormDetails?.email?.length > 0 &&
      guestFormDetails?.PhoneNumber?.length > 0
    ) {
      bookingFlowPageStore?.updateFormValidation(true)
    } else {
      bookingFlowPageStore?.updateFormValidation(false)
    }
  }, [
    bookingFlowPageStore,
    guestFormDetails?.PhoneNumber?.length,
    guestFormDetails?.email?.length,
    guestFormDetails?.firstName?.length,
    guestFormDetails?.lastName?.length,
  ])

  const handleAccordion = () => {
    setExpanded(!expanded)
  }

  const payNowHandler = async () => {
    // await bookingFlowGlobalStore?.setCreateOrder(guestFormDetails, "PAY AT HOTEL")
    setIsSelectedComplimentaryVoucher(false)
    await FormHandler()
  }
  const FormHandler = async () => {
    let encryptionURL = `cancel_url=${
      process.env.NEXT_PUBLIC_API_GATEWAY_BASE_URL
    }paymentService/v1/ccavenue/decrypt&mobile_no=${global?.window?.localStorage?.getItem(
      "userPhoneNumber",
    )}&si_end_date=29-04-2025&currency=INR&amount=1.00&billing_email=test@gmail.com&si_mer_ref_no=${
      bookingFlowGlobalStore?.orderDetails?.orderDetailsResponse?.orderId
    }&merchant_id=83198&si_start_date=28-04-2023&sub_account_id=${
      bookingFlowGlobalStore?.orderDetails?.orderDetailsResponse?.orderLineItems?.[0]?.hotel?.storeId || "HLTIXBCK"
    }&payment_option=${selectedCard?.payOptType}&language=EN&data_accept=Y&si_type=ONDEMAND&order_id=${
      bookingFlowGlobalStore?.orderDetails?.orderDetailsResponse?.orderId
    }&redirect_url=${
      process.env.NEXT_PUBLIC_API_GATEWAY_BASE_URL
    }paymentService/v1/ccavenue/decrypt&si_is_setup_amt=N&si_amount=${
      bookingFlowGlobalStore?.orderDetails?.orderDetailsResponse?.payableAmount
    }`
    setIsLoading(true)
    try {
      const response = await CCAvenueEncruption.apiCall(encryptionURL, process.env.NEXT_PUBLIC_CCAVENUE_WORKING_KEY)
      setEncqRequest(response?.data)
    } catch (error) {
      // eslint-disable-next-line
      console.log("error", error)
      setIsLoading(false)
    }
    return null
  }

  useEffect(() => {
    //* Programmatically click the button
    //* Need to change later
    if (buttonRef.current && encqRequest) {
      buttonRef.current.click()
    }
    setIsLoading(false)
  }, [encqRequest])

  const mapPaymentsData = (paymentData: any) => {
    let data: any = []
    paymentData?.map((item: any) => {
      let card: any = {}
      card.cardName = item?.cardName
      card.cardType = item?.cardType
      card.payOptType = item?.payOptType
      data?.push(card)
    })
    return data
  }
  const separatePayoutOptions = (data: any) => {
    setCreditCardData(mapPaymentsData(JSON.parse(data?.[0]?.OPTCRDC)))
    setDebitCardData(mapPaymentsData(JSON.parse(data?.[1]?.OPTDBCRD)))
    setNetBankingData(mapPaymentsData(JSON.parse(data?.[2]?.OPTNBK)))
  }

  const callCCAvenue = async () => {
    let jsonData: any
    let amount = "1.00"
    let currency = "INR"

    let url =
      process.env.NEXT_PUBLIC_CCAVENUE_DOMAIN_SCRIPT +
      "?command=getJsonData&access_code=" +
      process.env.NEXT_PUBLIC_CCAVENUE_ACCESSCODE +
      "&currency=" +
      currency +
      "&amount=" +
      amount

    $.ajax({
      url,
      dataType: "jsonp",
      jsonp: false,
      jsonpCallback: "processData",
      success: (data: any) => {
        jsonData = data
        separatePayoutOptions(data)
      },
      error: function (xhr: { status: any }, textStatus: any, errorThrown: any) {
        alert("An error occurred! " + (errorThrown ? errorThrown : xhr.status))
      },
    })
  }

  useEffect(() => {
    currencyCode === "INR" && callCCAvenue()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencyCode])

  const renderMenuItems = (item: any) => {
    switch (item) {
      case CONSTANTS?.DEBIT_CARD:
        return debitCardData?.map((card: any, index: number) => (
          <StyledMenuItem
            key={index}
            onClick={() => {
              setSelectedCard(card), setOpen(false)
            }}>
            {card?.cardName}
          </StyledMenuItem>
        ))
      case CONSTANTS?.CREDIT_CARD:
        return creditCardData?.map((card: any, index: number) => (
          <StyledMenuItem
            key={index}
            onClick={() => {
              setSelectedCard(card), setOpen(false)
            }}>
            {card?.cardName}
          </StyledMenuItem>
        ))
      case CONSTANTS?.NET_BANKING:
        return netBankingData?.map((card: any, index: number) => (
          <StyledMenuItem
            key={index}
            onClick={() => {
              setSelectedCard(card), setOpen(false)
            }}>
            {card?.cardName}
          </StyledMenuItem>
        ))

      default:
        break
    }
  }

  //* Using to fetch the payment tabs data from CMS
  useEffect(() => {
    const fetchPaymentTabs = async () => {
      const query = groq`*[_type == "appConfig" ]{ bookingPaymentQueries}`
      await getClient(true)
        .fetch(query)
        .then((data) => {
          setSanityTabs(data?.[0]?.bookingPaymentQueries)
        })
    }
    fetchPaymentTabs()
  }, [])

  useEffect(() => {
    setSelectedCard(creditCardData?.[0])
  }, [creditCardData])

  useEffect(() => {
    setExpanded(true)
  }, [])

  const handleScroll = (ref: any) => {
    if (ref?.current) {
      ref.current.scrollIntoView({
        block: "center",
        inline: "nearest",
        behavior: "smooth",
      })
    }
  }

  return (
    <Box
      aria-label="PaymentDetailsCCA"
      sx={{
        margin: isMobile ? "6.250vw 7.813vw 14.063vw 7.813vw" : "default",
      }}>
      <MainAccordion disableGutters expanded={expanded} onChange={handleAccordion}>
        <MainAccordionSummary expandIcon={<ExpandMoreIcon style={{ fontSize: "20px" }} />}>
          <Stack
            sx={{
              flexDirection: "row",
              width: isMobile ? "86%" : "60%",
              justifyContent: "space-between",
            }}>
            <Stack>
              <Typography
                sx={{ color: theme?.palette?.text?.primary }}
                variant={isMobile ? "m-heading-s" : "heading-s"}>
                {title}
              </Typography>
              <Typography variant={isMobile ? "m-body-s" : "body-s"} marginTop={"0.521vw"}>
                {subtitle}
              </Typography>
            </Stack>
            <Stack sx={{ justifyContent: "center" }}>
              <Typography variant={isMobile ? "m-body-l" : "body-ml"}>{CONSTANTS?.TOTAL_TO_PAY}</Typography>
              <Typography variant={isMobile ? "m-body-l" : "body-ml"}>
                {currency2DecimalSymbol(amountToPay || 0, currencyCode)}
              </Typography>
            </Stack>
          </Stack>
        </MainAccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          {currencyCode?.toUpperCase() === "INR" && (
            <Box sx={{ mb: isMobile ? MobilePxToVw(20) : DesktopPxToVw(20) }}>
              {sanityTab?.items?.map((item: any, index: number) => (
                <Box key={index}>{context?.renderComponent(item?._type, item)}</Box>
              ))}
            </Box>
          )}
          {currencyCode?.toUpperCase() === "INR" ? (
            <Box>
              {/*
            Commented as we are not showing the dropdown in frontend              
              {props?.parameterMap?.map((data: any, cIdx: number) => (
                <>
                  <Accordion
                    key={cIdx}
                    elevation={0}
                    disableGutters={true}
                    sx={{
                      borderRadius: "0vw",
                      backgroundColor: "transparent",
                      padding: "1.04vw 1.04vw 1.04vw 0vw",
                    }}>
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon style={{ fontSize: "20px" }} />
                      }
                      style={{
                        padding: "0px",
                        cursor: "pointer",
                        minHeight: "fit-content",
                      }}
                      sx={{
                        "& .MuiAccordionSummary-content": { margin: "0px" },
                      }}
                      onClick={() => {
                        setSelectedCard(""), handleScroll(accordionRef)
                      }}>
                      <Typography
                        sx={{
                          fontWeight: 400,
                        }}
                        variant={isMobile ? "m-body-sl" : "body-ml"}>
                        {data?.value}
                      </Typography>
                    </AccordionSummary>
                    <InnerRoomAccordionDetail ref={accordionRef}>
                      <>
                        <Typography variant={isMobile ? "m-body-s" : "body-s"}>
                          {description}
                        </Typography>
                        <FormControl
                          ref={scrollRef}
                          variant="standard"
                          sx={{
                            m: 1,
                            minWidth: 178,
                            position: "relative",
                            "& .MuiSelect-select": {
                              "&:focus": {
                                backgroundColor: "transparent",
                              },
                            },
                          }}>
                          <Stack flexDirection={"column"}>
                            <SelectStack
                              onClick={() => {
                                setOpen(!open), handleScroll(scrollRef)
                              }}>
                              <StyledLabel>
                                {selectedCard?.cardName && !open
                                  ? selectedCard?.cardName
                                  : CONSTANTS?.SELECT_CARD}
                              </StyledLabel>
                              <Box
                                sx={{
                                  transform: open
                                    ? "rotate(180deg)"
                                    : "rotate(0deg)",
                                }}>
                                <KeyboardArrowDownSharp />
                              </Box>
                            </SelectStack>
                            <StyledCollapse in={open}>
                              <StyledBox>
                                {renderMenuItems(data?.value)}
                              </StyledBox>
                            </StyledCollapse>
                          </Stack>
                        </FormControl>
                        <br />
                      </>
                      <Button
                        variant="light-contained"
                        disabled={!(selectedCard?.cardName?.length > 3)}
                        sx={{
                          width: isMobile ? "35vw" : "15.10vw",
                          marginTop: isMobile
                            ? MobilePxToVw(22)
                            : DesktopPxToVw(22),
                        }}
                        onClick={() => {
                          payNowHandler()
                        }}>
                        {CONSTANTS?.CONTINUE_2}
                      </Button>
                    </InnerRoomAccordionDetail>
                  </Accordion>
                </>
              ))} */}

              <Button
                variant="light-contained"
                disabled={!(selectedCard?.cardName?.length > 3)}
                sx={{
                  marginTop: isMobile ? MobilePxToVw(22) : DesktopPxToVw(22),
                }}
                onClick={() => {
                  payNowHandler()
                }}>
                {primaryAction?.title}
              </Button>
            </Box>
          ) : (
            <PayAtHotelForInternationalBooking />
          )}

          {encqRequest && (
            <>
              <form
                id="nonseamless"
                method="post"
                name="redirect"
                action={`${process.env.NEXT_PUBLIC_CCAVENUE_DOMAIN_SCRIPT}?command=initiateTransaction`}>
                <input type="hidden" id="encRequest" name="encRequest" value={`${encqRequest}`} />
                <input
                  type="hidden"
                  name="access_code"
                  id="access_code"
                  value={`${process.env.NEXT_PUBLIC_CCAVENUE_ACCESSCODE}`}
                />
                <script lang="javascript">document.redirect.submit();</script>
                <button style={{ visibility: "hidden" }} type="submit" ref={buttonRef}>
                  Hide me
                </button>
              </form>
            </>
          )}
        </AccordionDetails>
      </MainAccordion>
    </Box>
  )
}

export default observer(PaymentDetailsCCA)
