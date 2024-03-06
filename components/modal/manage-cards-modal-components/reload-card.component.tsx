import { Box, Stack, Typography } from "@mui/material"
import { useContext, useEffect, useMemo, useRef, useState } from "react"
import manageGCStore from "../../../features/giftCard/store/pageStore/manageGC.store"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import TextfieldValidator from "../../../utils/validations/TextfieldValidator"
import { reloadAmount, CGCNumber, ERROR_MESSAGES, GCNumber } from "../../forms/gift-card-form/constants"
import RenderActionItem from "../../hoc/actions/action-items-ui"
import {
  ReloadContentWrapper,
  ReloadContentTitleContainer,
  CustomCheckBoxWrapper,
  CardBoxGC,
  ReloadErrorMessageTypography,
} from "../styles/manage-card.styles"
import { useMobileCheck } from "../../../utils/isMobilView"
import { CustomCheckBox } from "../../hoc/CustomCheckBox/Checkbox"
import { RestrictSpecialChar } from "../../../utils/restrictSpecialChar"
import CustomTextField from "../../hoc/textField/custom-text-field"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import { PathType } from "../../../types"
import { GLOBAL_STORES } from "../../../utils/Constants"
import GiftCardStore from "../../../features/giftCard/store/globalStore/gift-card.store"
import { urlFor } from "../../../lib-sanity"

const ReloadCardComponent = (props: any) => {
  const reloadErrorRef: any = useRef(null)
  const [wrongMsg, setWrongMsg] = useState<string>()
  const [balance, setBalance] = useState<any>()
  const [check, setChecked] = useState<boolean>(false)
  const [responseCode, setResponseCode] = useState<string>("")
  const [formValues, setFormValues] = useState<any>({
    [GCNumber]: "",
    [CGCNumber]: "",
    [reloadAmount]: "",
  })
  const [ErrorMessage, setErrorMessage] = useState<any>({
    [GCNumber]: "",
    [CGCNumber]: "",
    [reloadAmount]: "",
  })
  const [formErrors, setFormErrors] = useState<any>({
    [GCNumber]: false,
    [CGCNumber]: false,
    [reloadAmount]: false,
  })
  const formValidation = (isFormValid: any, id: any) => {
    setFormErrors({ ...formErrors, [id]: !isFormValid })
  }

  const navigate = useAppNavigation()

  const manageGC = new manageGCStore()

  const Context = useContext(IHCLContext)

  const giftCardGlobalStore = Context?.getGlobalStore(GLOBAL_STORES?.giftCardStore) as GiftCardStore

  const handleChangeForm = (event: any) => {
    const { name, value } = event.target
    if (name === CGCNumber || name === GCNumber) {
      setWrongMsg("")
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
        [name]: event?.target?.value,
      }
    })
    formValidation(status, name)
  }
  const PortableText = Context!.PortableText
  const reloadCardBalance = async (event: any) => {
    responseCode === "0" && setWrongMsg("")
    event?.preventDefault()

    if (!check || !formValues?.[GCNumber] || !formValues?.[CGCNumber] || !formValues?.[reloadAmount]) {
      return
    } else if (
      !(formValues?.reloadAmount >= 500 && formValues?.reloadAmount <= 25000) // hardcoded to 25k since m not getting from BE
    ) {
      return
    } else if (Number(formValues?.[reloadAmount]) + Number(balance) <= 25000) {
      try {
        manageGC
          .GCReloadBalance(
            JSON.stringify({
              cardNumber: formValues?.GCNumber?.replaceAll(" ", ""), //sample card number: "9530355500001797",
              amount: formValues?.reloadAmount, // card pin: "127367",
              orderId: "",
            }),
          )

          .then((res) => {
            if (res?.status === 200) {
              if (res?.data?.orderId) {
                global?.window?.localStorage.setItem("guestCustomerHash", res?.headers?.guestuser)
                navigate("/gift-card/payment-i-frame", PathType.dialog)
                giftCardGlobalStore?.updateReloadGcDetails(res?.data?.orderId)
              }
            } else {
              setWrongMsg(res?.data)
            }
          })
          .catch((err) => {
            console.error(err)
          })
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleCardNumber = (event: any) => {
    let CardNumber = event?.target?.value
    if (CardNumber > 19) {
      CardNumber = CardNumber.substr(0, 19)
    }
    const inputVal = CardNumber?.replace(/ /g, "")
    let inputNumbersOnly = inputVal?.replace(/\D/g, "")
    if (inputNumbersOnly?.length >= 16) {
      inputNumbersOnly = inputNumbersOnly.replace(/[`~!$%^@*()_|+\\=?;:'"<>\\{\\}\\[\]\\]/gi, "").substr(0, 16)
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
    const target = { ...event?.target }
    handleChangeForm({ ...event, target: { ...target, name: event.target.name, value: spacedNumber } })
  }
  const isMobile = useMobileCheck()
  useMemo(() => {
    if (formValues?.[CGCNumber]?.length === 19 && formValues?.[CGCNumber] === formValues?.[GCNumber]) {
      manageGC
        .balanceEnquiry({
          balanceEnquiry: [
            {
              CardNumber: formValues?.GCNumber?.replace(/\s/g, "").trim(), //sample card number: "9530355500001794",
            },
          ],
        })

        .then((res: any) => {
          setResponseCode(res?.data?.Cards?.[0]?.ResponseCode)
          if (!res?.error) {
            setBalance(res?.data?.Cards?.[0]?.Balance)
          } else {
            setWrongMsg(res?.data?.Cards?.[0]?.ResponseMessage)
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues?.[GCNumber], formValues?.[CGCNumber]])

  useEffect(() => {
    const maxBalanceCanReload = Number(formValues?.[reloadAmount]) + Number(balance)

    if (formValues[reloadAmount] && formValues[reloadAmount] < 500) {
      setFormErrors({ ...formErrors, reloadAmount: true })
      setErrorMessage({
        ...ErrorMessage,
        reloadAmount: "Please enter value more than ₹ 500",
      })
    }

    if (maxBalanceCanReload > 25000) {
      setFormErrors({ ...formErrors, reloadAmount: true })
      setErrorMessage({
        ...ErrorMessage,
        reloadAmount: "Maximum balance you can reload is ₹" + (Number(25000) - Number(balance)),
      })
    } else if (Number(formValues?.[reloadAmount]) > 500 && Number(formValues?.[reloadAmount]) < maxBalanceCanReload) {
      setFormErrors({ ...formErrors, reloadAmount: false })
      setErrorMessage({
        ...ErrorMessage,
        reloadAmount: "",
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues[reloadAmount]])

  useEffect(() => {
    if (reloadErrorRef.current) {
      reloadErrorRef.current.scrollIntoView({
        block: "center",
        inline: "nearest",
        behavior: "smooth",
      })
    }
  }, [wrongMsg])

  return (
    <ReloadContentWrapper className="tab-panel-box-container" $isMobile={isMobile} aria-label="reload-card-component">
      {props?.description && (
        <ReloadContentTitleContainer className={"reload-description"} $isMobile={isMobile}>
          <Typography variant={isMobile ? "m-body-sl" : "body-s"}>{props?.description}</Typography>
        </ReloadContentTitleContainer>
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
      <form style={{ textAlign: "center" }} onSubmit={reloadCardBalance}>
        <Stack
          sx={{
            paddingBottom: isMobile ? MobilePxToVw(55) : DesktopPxToVw(40),
          }}
          alignItems="center"
          gap={isMobile ? MobilePxToVw(5) : DesktopPxToVw(16)}
          paddingBottom={"0vw !important"}>
          <Stack
            gap={isMobile ? MobilePxToVw(5) : DesktopPxToVw(30)}
            flexDirection={isMobile ? "column" : "row"}
            width={"100%"}
            justifyContent="center">
            <Stack
              width={isMobile ? "100%" : DesktopPxToVw(330)}
              sx={{
                display: "flex",
              }}>
              <CustomTextField
                width={isMobile ? "100%" : DesktopPxToVw(330)}
                labelFontSize={isMobile ? MobilePxToVw(22) : DesktopPxToVw(18)}
                showAdornment
                placeholder={props?.items?.[0]?.labelText}
                required
                error={formErrors[GCNumber]}
                helperText={formErrors[GCNumber] && formValues[GCNumber].length > 0 && props?.items?.[0]?.errorText}
                autoComplete="off"
                name={GCNumber}
                variant="standard"
                value={formValues?.[GCNumber]}
                onChange={(e: any) => handleCardNumber(e)}
                maxLength={19}
              />
            </Stack>

            <Stack
              width={isMobile ? "100%" : DesktopPxToVw(330)}
              sx={{
                display: "flex",
                paddingBottom: isMobile ? MobilePxToVw(7) : DesktopPxToVw(0),
              }}>
              <CustomTextField
                width={isMobile ? "100%" : DesktopPxToVw(330)}
                labelFontSize={isMobile ? MobilePxToVw(22) : DesktopPxToVw(18)}
                showAdornment
                placeholder={props?.items?.[1]?.labelText}
                required
                error={formErrors[CGCNumber] || formValues?.[GCNumber] !== formValues?.[CGCNumber]}
                helperText={
                  (formErrors[CGCNumber] && formValues[CGCNumber].length > 0 && props?.items?.[0]?.errorText) ||
                  (formValues?.[GCNumber] !== formValues?.[CGCNumber] &&
                    formValues[CGCNumber].length > 0 &&
                    props?.items?.[1]?.errorText)
                }
                autoComplete="off"
                maxLength={19}
                name={CGCNumber}
                variant="standard"
                value={formValues?.[CGCNumber]}
                onChange={(e: any) => handleCardNumber(e)}
              />
            </Stack>
          </Stack>

          <Stack width={isMobile ? "100%" : DesktopPxToVw(700)}>
            <CustomTextField
              width={isMobile ? "100%" : DesktopPxToVw(700)}
              labelFontSize={isMobile ? MobilePxToVw(22) : DesktopPxToVw(18)}
              onInput={(e: any) => {
                e.target.value = Math.max(0, parseInt(e.target.value))

                  .toString()

                  .slice(0, 6)
              }}
              type="number"
              onKeyDown={RestrictSpecialChar}
              showAdornment
              placeholder={props?.items?.[2]?.labelText}
              name={reloadAmount}
              variant="standard"
              value={formValues?.reloadAmount}
              onChange={(e: any) => handleChangeForm(e)}
              required
              error={formErrors[reloadAmount]}
              helperText={formErrors[reloadAmount] && formValues[reloadAmount].length > 0 && ErrorMessage[reloadAmount]}
              autoComplete="off"
            />
          </Stack>
          <Stack>
            <CustomCheckBoxWrapper $isMobile={isMobile}>
              <CustomCheckBox
                checked={check}
                onChange={() => {
                  setChecked(!check)
                }}
                isMarginRight={isMobile ? MobilePxToVw(20) : DesktopPxToVw(20)}
              />
              <Typography variant="body-s" sx={{ textAlign: "start" }}>
                <PortableText blocks={props?.items?.[3]?.content} />
              </Typography>
            </CustomCheckBoxWrapper>
          </Stack>
        </Stack>
        {wrongMsg && (
          <ReloadErrorMessageTypography
            component={"div"}
            variant={isMobile ? "m-body-l" : "body-l"}
            ref={reloadErrorRef}
            $isMobile={isMobile}>
            {wrongMsg}
          </ReloadErrorMessageTypography>
        )}
        {props?.PrimaryAction?.title && (
          <RenderActionItem
            isDisable={
              formValues?.GCNumber?.length === 19 &&
              formValues?.CGCNumber?.length === 19 &&
              formValues?.GCNumber === formValues?.CGCNumber &&
              formValues?.reloadAmount?.length >= 3 &&
              !formErrors?.reloadAmount &&
              check &&
              responseCode === "0"
            }
            isDisableRippleEffect
            type="submit"
            url=""
            variant={props?.PrimaryAction?.variant}
            navigationType="internal"
            isActionButtonType={true}
            title={props?.PrimaryAction?.title}
          />
        )}
      </form>
    </ReloadContentWrapper>
  )
}

export default ReloadCardComponent
