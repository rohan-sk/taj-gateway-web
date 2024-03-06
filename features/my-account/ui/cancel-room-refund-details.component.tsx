import { groq } from "next-sanity"
import { useRouter } from "next/router"
import { theme } from "../../../lib/theme"
import { getClient } from "../../../lib-sanity"
import React, { useEffect, useState } from "react"
import { useMobileCheck } from "../../../utils/isMobilView"
import { currency2DecimalSymbol } from "../../../utils/currency"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
const RenderActionItem = dynamic(() => import("../../../components/hoc/actions/action-items-ui"))
import { Box, FormControl, MenuItem, Select, Stack, Typography } from "@mui/material"
import { StyledInputLabel } from "../../../components/card/styles/card-with-experience-form"
import {
  TotalAmount,
  AmountStack,
  AmountDivider,
  AmountWrapper,
  DeductionAmount,
  RefundPriceDetailsStack,
} from "./styles/cancel-room-selection-template"
import { AutoSizeTextArea } from "../../../components/BookingFlow/styles/primary.guest.details"
import { ErrorMessageTypography } from "../../../components/modal/styles/manage-card.styles"
import { ERROR_MESSAGES } from "../../../components/forms/gift-card-form/constants"
import dynamic from "next/dynamic"

const CancelRoomRefundDetails = ({
  props,
  setCancellationReason,
  cancelReason,
  setCancelReason,
  cancellationReason,
  bookingDetails,
  cancellationDetails,
}: any) => {
  const router = useRouter()
  const isMobile = useMobileCheck()
  const isCouponApplied = Boolean(
    bookingDetails?.orderLineItems?.[0]?.hotel?.promoType?.toLowerCase() === "coupon" &&
      bookingDetails?.orderLineItems?.[0]?.hotel?.promoCode,
  )
  const paidAmount = cancellationDetails?.paidAmount || 0
  const cancellationAmount = cancellationDetails?.cancellationAmount
  const totalAmount =
    cancellationDetails?.cancelPayableAmount > 0
      ? cancellationDetails?.cancelPayableAmount
      : cancellationDetails?.cancelRefundableAmount
  const cancellationLabel =
    cancellationDetails?.cancelPayableAmount > 0 ? props?.PAYABLE_AMOUNT : props?.REFUNDABLE_AMOUNT
  const cancellationRemark =
    cancellationDetails?.bookingCancelRemarks || cancellationDetails?.rooms?.map((room: any) => room?.cancelRemark)?.[0]
  const [selectedOption, setSelectedOption] = useState<any>(null)
  const [cancellationData, setCancellationData] = useState<any>({})
  const [cancelError, setCancelError] = useState<any>(false)
  const handleTextForm = (value: any) => {
    setCancelReason(value)
    setCancelError(value?.toString()?.length === 0)
  }

  useEffect(() => {
    const fetchCancellationReasons = async () => {
      const query = groq`*[_type == "appConfig" ]{cancellationDropdown}`
      await getClient(true)
        .fetch(query)
        .then((data) => {
          setCancellationData(data?.[0]?.cancellationDropdown?.[0])
        })
    }
    fetchCancellationReasons()
  }, [])

  const handleSelection = (value: any) => {
    setSelectedOption(value)
  }

  /**
   * @returns Mobile view
   */
  const renderMobileView = () => {
    return (
      <Box
        sx={{
          padding: "40px 32px",
          border: `1px solid ${theme?.palette?.neuPalette?.hexSixteen}`,
          margin: "35px 0vw",
          ".MuiSelect-select": {
            textAlign: "left !important",
          },
        }}>
        {
          //Todo :we have to uncomment this code once we get the dynamic rebate amount
          <Stack sx={{ flexDirection: "column" }}>
            <AmountStack>
              <Typography variant="m-body-m">{props?.paidAmount}</Typography>
              <AmountWrapper>
                {paidAmount > 0
                  ? `${currency2DecimalSymbol(paidAmount || 0, cancellationDetails?.rooms?.[0]?.currency)}`
                  : "-"}
              </AmountWrapper>
            </AmountStack>
            <AmountDivider />
            <AmountStack>
              <Typography variant="m-body-m">{props?.totalAmount}</Typography>
              <TotalAmount>
                {currency2DecimalSymbol(cancellationAmount || 0, cancellationDetails?.rooms?.[0]?.currency)}
              </TotalAmount>
            </AmountStack>
            <AmountDivider />
            <AmountStack>
              <Typography variant="m-body-m" fontWeight={"bold"}>
                {cancellationLabel}
              </Typography>
              <AmountWrapper
                $color={
                  cancellationDetails?.cancelPayableAmount > 0
                    ? theme.palette.neuPalette.hexTwo
                    : theme.palette.neuPalette.hexTwentyEight
                }
                sx={{ fontSize: isMobile ? "5vw !important" : "inherit", fontWeight: 700 }}>
                {currency2DecimalSymbol(totalAmount || 0, cancellationDetails?.rooms?.[0]?.currency)}
              </AmountWrapper>
            </AmountStack>
            <AmountDivider sx={{ opacity: "1 !important", m: "3.125vw 0vw !important" }} />
          </Stack>
        }
        <DeductionAmount>
          <Typography variant={"m-body-m"} sx={{ lineHeight: "140%" }}>
            {cancellationRemark}
          </Typography>
          <FormControl variant="standard">
            {cancellationReason?.length < 1 && (
              <StyledInputLabel sx={{ transform: "translate(0, 1vw) scale(1)" }}>
                {cancellationData?.title}
              </StyledInputLabel>
            )}
            <Select
              variant="standard"
              sx={{
                fontWeight: "300",
                textAlign: "start",
                fontSize: "3.750vw",
                mt: "0px !important",
                backgroundColor: "white",
                "& .MuiSelect-select": {
                  "&:focus": {
                    background: theme?.palette?.neuPalette?.hexOne,
                  },
                },
              }}
              name={cancellationData?.title}
              value={cancellationReason}
              onChange={(e: any) => setCancellationReason(e?.target?.value)}
              MenuProps={{
                PaperProps: {
                  elevation: 0,
                  sx: {
                    backgroundColor: theme?.palette?.neuPalette?.hexOne,
                    boxShadow: `-6px 10px 24px 0px rgba(0, 0, 0, 0.10)`,
                  },
                },
              }}
              IconComponent={(props: any) => <KeyboardArrowDownIcon {...{ ...props }} />}>
              {cancellationData?.values?.map((value: any, index: number) => {
                return (
                  <MenuItem
                    sx={{
                      fontSize: MobilePxToVw(22),
                      padding: `${MobilePxToVw(8)} ${MobilePxToVw(26)}`,
                    }}
                    onClick={() => handleSelection(value?.primaryAction)}
                    key={value?._key}
                    value={value?.text}>
                    {value?.text}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
          {cancellationReason === "other" && (
            <Box>
              <AutoSizeTextArea
                minRows={1}
                placeholder={"Enter Cancellation Reason"}
                maxLength={100}
                onChange={(e) => {
                  handleTextForm(e?.target?.value)
                }}
              />
              <Typography
                sx={{
                  float: "right",
                  fontSize: isMobile ? "2.5vw" : "0.9vw",
                }}>{`${cancelReason?.length ?? 0}/100`}</Typography>
              {cancelError && (
                <ErrorMessageTypography $isMobile={true} variant={isMobile ? "m-body-s" : "body-s"}>
                  {ERROR_MESSAGES?.CANCEL_REASON}
                </ErrorMessageTypography>
              )}
            </Box>
          )}
          {selectedOption?.title && !isCouponApplied && (
            <RenderActionItem
              isActionButtonType={false}
              url={`${selectedOption?.url}?orderId=${router?.query?.orderId}`}
              title={selectedOption?.title}
              variant={selectedOption?.variant}
              navigationType={selectedOption?.urlType}
              iconStyles={{ display: "none" }}
              buttonStyles={{ justifyContent: "center", marginTop: MobilePxToVw(32) }}
            />
          )}
        </DeductionAmount>
      </Box>
    )
  }

  /**
   * @returns Desktop view
   */
  const renderDesktopView = () => {
    return (
      <>
        {
          //Todo :we have to uncomment this code once we get the dynamic rebate amount
          <RefundPriceDetailsStack>
            <Stack>
              <Typography variant="body-ml" fontWeight={"bold"}>
                {props?.paidAmount}
              </Typography>
              <AmountWrapper>
                {paidAmount > 0
                  ? `${currency2DecimalSymbol(paidAmount || 0, cancellationDetails?.rooms?.[0]?.currency)}`
                  : "-"}
              </AmountWrapper>
            </Stack>
            <Stack>
              <Typography variant="body-ml" fontWeight={"bold"}>
                {props?.TOTAL_CANCELLATION}
              </Typography>
              <TotalAmount>
                {currency2DecimalSymbol(cancellationAmount || 0, cancellationDetails?.rooms?.[0]?.currency)}
              </TotalAmount>
            </Stack>
            <Stack>
              <Typography variant="body-ml" fontWeight={"bold"}>
                {cancellationLabel}
              </Typography>
              <AmountWrapper
                $color={
                  cancellationDetails?.cancelPayableAmount > 0
                    ? theme.palette.neuPalette.hexTwo
                    : theme.palette.neuPalette.hexTwentyEight
                }>
                {currency2DecimalSymbol(totalAmount || 0, cancellationDetails?.rooms?.[0]?.currency)}
              </AmountWrapper>
            </Stack>
          </RefundPriceDetailsStack>
        }
        <DeductionAmount>
          <Typography variant={isMobile ? "m-body-m" : "body-m"} sx={{ lineHeight: "140%" }}>
            {cancellationRemark}
          </Typography>
          {/* Cancel Reasons DropDown */}
          <FormControl variant="standard" sx={{ marginTop: "2.083vw" }}>
            {cancellationReason?.length < 1 && <StyledInputLabel>{cancellationData?.title}</StyledInputLabel>}
            <Select
              variant="standard"
              sx={{
                width: "100%",
                fontSize: "1.250vw",
                ".MuiSelect-select": {
                  textAlign: "left !important",
                },
                "& .MuiSelect-select": {
                  "&:focus": {
                    background: theme?.palette?.neuPalette?.hexOne,
                  },
                },
              }}
              name={cancellationData?.title}
              value={cancellationReason}
              onChange={(e: any) => setCancellationReason(e?.target?.value)}
              MenuProps={{
                PaperProps: {
                  elevation: 0,
                  sx: {
                    backgroundColor: theme?.palette?.neuPalette?.hexOne,
                    boxShadow: `-6px 10px 24px 0px rgba(0, 0, 0, 0.10)`,
                  },
                },
              }}
              IconComponent={(props: any) => <KeyboardArrowDownIcon {...{ ...props }} />}>
              {cancellationData?.values?.map((value: any, index: number) => {
                return (
                  <MenuItem
                    sx={{
                      fontSize: DesktopPxToVw(22),
                      padding: `${DesktopPxToVw(8)} ${DesktopPxToVw(26)}`,
                    }}
                    onClick={() => handleSelection(value?.primaryAction)}
                    key={value?._key}
                    value={value?.text}>
                    {value?.text}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
          {cancellationReason === "other" && (
            <Box sx={{ paddingTop: isMobile ? "" : DesktopPxToVw(30) }}>
              <AutoSizeTextArea
                minRows={1}
                placeholder={"Enter Cancellation Reason"}
                maxLength={100}
                onChange={(e) => {
                  handleTextForm(e?.target?.value)
                }}
              />
              <Typography
                sx={{
                  float: "right",
                  fontSize: isMobile ? "2.5vw" : "0.9vw",
                }}>{`${cancelReason?.length ?? 0}/100`}</Typography>
              {cancelError && (
                <ErrorMessageTypography $isMobile={false} variant={isMobile ? "m-body-s" : "body-s"}>
                  {ERROR_MESSAGES?.CANCEL_REASON}
                </ErrorMessageTypography>
              )}
            </Box>
          )}
        </DeductionAmount>
        {selectedOption?.title && !isCouponApplied && (
          <RenderActionItem
            isActionButtonType={false}
            url={`${selectedOption?.url}?orderId=${router?.query?.orderId}`}
            title={selectedOption?.title}
            variant={selectedOption?.variant}
            navigationType={selectedOption?.urlType}
            iconStyles={{ display: "none" }}
            buttonStyles={{ justifyContent: "center", marginTop: DesktopPxToVw(30) }}
          />
        )}
      </>
    )
  }

  return isMobile ? renderMobileView() : renderDesktopView()
}

export default CancelRoomRefundDetails
