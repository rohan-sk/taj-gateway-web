import { Box, Stack, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import manageGCStore from "../../../features/giftCard/store/pageStore/manageGC.store"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import TextfieldValidator from "../../../utils/validations/TextfieldValidator"
import { GCNumber, GCPin } from "../../forms/gift-card-form/constants"
import RenderActionItem from "../../hoc/actions/action-items-ui"
import {
  ActionPropsWrapper,
  BalanceAmountContainer,
  BalanceContentDivider,
  BalanceContentWrapper,
  ErrorMessageTypography,
  MainContentDescriptionWrapper,
  YourBalanceMainContentWrapper,
  CardBoxGC,
} from "../styles/manage-card.styles"
import { currencyPrettier } from "../../../utils/currency"
import { useMobileCheck } from "../../../utils/isMobilView"
import CustomTextField from "../../hoc/textField/custom-text-field"
import { CONSTANTS } from "../../constants"
import { formatDateWithMON } from "../../../utils/getDate"
import { urlFor } from "../../../lib-sanity"

const BalanceCheck = (props: any) => {
  const balanceBoxRef: any = useRef(null)
  const [balance, setBalance] = useState<string | null>(null)
  const [expiryDate, setExpiryDate] = useState("")
  const [wrongMsg, setWrongMsg] = useState<string>()
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

  const formValidation = (isFormValid: any, id: any) => {
    setFormErrors({ ...formErrors, [id]: !isFormValid })
  }

  const manageGC = new manageGCStore()

  const handleReset = () => {
    setBalance(null)
    setFormErrors({
      [GCNumber]: false,
      [GCPin]: false,
    })
    setWrongMsg("")
    setFormValues({
      [GCNumber]: "",
      [GCPin]: "",
    })
  }
  const handleChangeForm = (event: any) => {
    setWrongMsg("")
    setBalance("")
    const { name, value } = event.target
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
        [name]: event?.target?.value,
      }
    })
    formValidation(status, name)
  }

  const fetchGCBalance = async (event: any) => {
    event?.preventDefault()

    setWrongMsg("")
    setBalance("")
    if (
      !(formValues?.[GCNumber]?.replace(/\s/g, "").trim()?.length === 16) ||
      !(formValues?.[GCPin]?.trim()?.length === 6)
    ) {
      return
    }
    if (!formValues?.[GCNumber] || !formValues?.[GCPin]) {
      return
    }
    try {
      manageGC
        .balanceEnquiry({
          balanceEnquiry: [
            {
              CardNumber: formValues?.GCNumber?.replace(/\s/g, "").trim(), //sample card number: "9530355500001794",
              CardPin: formValues?.GCPin, // card pin: "127367",
            },
          ],
        })

        .then((res) => {
          if (!res?.error) {
            setBalance(res?.data?.Cards?.[0]?.Balance)
            setExpiryDate(res?.data?.Cards?.[0]?.ExpiryDate)
          } else setWrongMsg(res?.data?.Cards?.[0]?.ResponseMessage)
        })
        .catch((err) => {
          console.error(err)
        })
    } catch (error) {
      console.error(error)
    }
  }
  const handleCardNumber = (event: any) => {
    setWrongMsg("")
    handleChangeForm(event)
    let CardNumber = event?.target?.value
    if (CardNumber > 19) {
      CardNumber = CardNumber.substr(0, 19)
    }
    const inputVal = CardNumber?.replace(/ /g, "")
    let inputNumbersOnly = inputVal?.replace(/\D/g, "")
    if (inputNumbersOnly?.length >= 16) {
      inputNumbersOnly = inputNumbersOnly.replace(/[`~!$%^@*()_|+\\=?;:'"<>{}/\\[\]\\]/gi, "").substr(0, 16)
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
          GCNumber: spacedNumber.trim(),
        }
      })
    }
  }
  const isMobile = useMobileCheck()

  useEffect(() => {
    if (balanceBoxRef.current) {
      balanceBoxRef.current.scrollIntoView({
        block: "center",
        inline: "nearest",
        behavior: "smooth",
      })
    }
  }, [balance, wrongMsg])

  return (
    <YourBalanceMainContentWrapper
      className="tab-panel-box-container"
      $isMobile={isMobile}
      aria-label="check-balance-form">
      {props?.description && (
        <MainContentDescriptionWrapper $isMobile={isMobile} className="you-balance-description">
          <Typography variant={isMobile ? "m-body-sl" : "body-s"}>{props?.description}</Typography>
        </MainContentDescriptionWrapper>
      )}
      {props?.logo?.asset?._ref && (
        <CardBoxGC $isMobile={isMobile}>
          <Box
            alt={`card-img`}
            width={isMobile ? MobilePxToVw(310) : DesktopPxToVw(256)}
            height={isMobile ? MobilePxToVw(205) : DesktopPxToVw(159)}
            component={"img"}
            src={urlFor(props?.logo?.asset?._ref)?.url()}
            sx={{
              marginRight: DesktopPxToVw(12),
            }}
          />
        </CardBoxGC>
      )}
      <form style={{ textAlign: "center" }} onSubmit={fetchGCBalance}>
        <Stack
          gap={isMobile ? MobilePxToVw(18) : DesktopPxToVw(40)}
          flexDirection={isMobile ? "column" : "row"}
          justifyContent="center"
          sx={{
            paddingBottom: isMobile ? "unset" : DesktopPxToVw(40),
          }}>
          <Stack
            width={isMobile ? "100%" : DesktopPxToVw(400)}
            sx={{
              display: "flex",
              // justifyContent: "flex-end",
            }}>
            <CustomTextField
              width={isMobile ? "100%" : DesktopPxToVw(400)}
              labelFontSize={isMobile ? MobilePxToVw(22) : DesktopPxToVw(18)}
              showAdornment
              placeholder={props?.items?.[0]?.labelText}
              required
              error={formErrors[GCNumber] && formValues[GCNumber].length < 19}
              helperText={
                formErrors[GCNumber] &&
                formValues[GCNumber].length > 0 &&
                formValues[GCNumber].length < 19 &&
                ErrorMessage[GCNumber]
              }
              autoComplete="off"
              name={GCNumber}
              variant="standard"
              value={formValues?.[GCNumber]}
              onChange={(e: any) => {
                handleCardNumber(e)
              }}
            />
          </Stack>
          <Stack
            width={isMobile ? "100%" : DesktopPxToVw(260)}
            sx={{
              display: "flex",
              // justifyContent: "flex-start",
            }}>
            <CustomTextField
              showAdornment
              width={isMobile ? "100%" : DesktopPxToVw(260)}
              labelFontSize={isMobile ? MobilePxToVw(22) : DesktopPxToVw(18)}
              placeholder={props?.items?.[1]?.labelText}
              type="password"
              name={GCPin}
              variant="standard"
              error={formErrors[GCPin]}
              helperText={formErrors[GCPin] && formValues[GCPin].length > 0 && ErrorMessage[GCPin]}
              maxLength={6}
              value={isNaN(formValues?.[GCPin]) ? "" : formValues?.[GCPin]}
              onInput={(e: any) => {
                e.target.value = Math?.max(0, parseInt(e?.target?.value))?.toString()?.slice(0, 6)
              }}
              onChange={(e: any) => handleChangeForm(e)}
              required
            />
          </Stack>
        </Stack>
        {(props?.PrimaryAction?.title || props?.secondaryAction?.title) && (
          <ActionPropsWrapper $isMobile={isMobile} className="check-balance-button">
            {props?.PrimaryAction?.title && (
              <RenderActionItem
                isDisable={formValues?.GCNumber?.length === 19 && formValues?.GCPin?.length === 6}
                isDisableRippleEffect
                type="submit"
                url=""
                variant={props?.PrimaryAction?.variant}
                navigationType="internal"
                isActionButtonType={true}
                title={props?.PrimaryAction?.title}
              />
            )}
            {props?.secondaryAction?.title && (
              <RenderActionItem
                url={""}
                title={props?.secondaryAction?.title}
                navigationType={undefined}
                variant={props?.secondaryAction?.variant}
                isActionButtonType={true}
                onClick={handleReset}
              />
            )}
          </ActionPropsWrapper>
        )}
        {wrongMsg && (
          <Box ref={balanceBoxRef}>
            <ErrorMessageTypography $isMobile={isMobile}>{wrongMsg}</ErrorMessageTypography>
          </Box>
        )}
      </form>

      {balance !== null && String(balance) && !wrongMsg && (
        <BalanceContentWrapper $isMobile={isMobile} className="balance-content" ref={balanceBoxRef}>
          <BalanceAmountContainer>
            <Typography variant={isMobile ? "m-body-sl" : "body-s"}>{CONSTANTS?.Balance_Amount}</Typography>
            <Typography
              variant={isMobile ? "m-heading-s" : "heading-s"}
              sx={{
                paddingTop: isMobile ? MobilePxToVw(13) : DesktopPxToVw(13),
              }}>
              {currencyPrettier(balance)}
            </Typography>
          </BalanceAmountContainer>
          <BalanceContentDivider orientation="vertical" flexItem $isMobile={isMobile} />
          <BalanceAmountContainer>
            <Typography variant={isMobile ? "m-body-sl" : "body-s"}>{CONSTANTS?.Balance_Expiry_Date}</Typography>
            <Typography
              variant={isMobile ? "m-body-sl" : "body-ml"}
              sx={{
                paddingTop: isMobile ? MobilePxToVw(17) : DesktopPxToVw(17),
              }}>
              {expiryDate ? formatDateWithMON(expiryDate) : "-"}
            </Typography>
          </BalanceAmountContainer>
        </BalanceContentWrapper>
      )}
    </YourBalanceMainContentWrapper>
  )
}

export default BalanceCheck
