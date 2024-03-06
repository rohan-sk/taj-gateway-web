import { Stack } from "@mui/material"
import { ActionProps } from "../../types"
import dynamic from "next/dynamic"
import React, { useContext, useState } from "react"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { useMobileCheck } from "../../../utils/isMobilView"
const RenderActionItem = dynamic(() => import("../../hoc/actions/action-items-ui"))
const CustomCheckBox = dynamic(() =>
import("../../hoc/CustomCheckBox/Checkbox").then((module) => module.CustomCheckBox)
)
const CountryCodeDropdown =dynamic(() => import("../../../utils/CountryCodeDropdown"))
import { itineraryRefId, senderMobile } from "../gift-card-form/constants"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import TextfieldValidator from "../../../utils/validations/TextfieldValidator"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import UserDetailsStore from "../../../features/my-account/store/globalStore/user-details.store"
import {
  MainContainer,
  MainContentWrapper,
  MobileErrorMessage,
  BlockContentWrapper,
  BlockContentContainer,
  InputTextFieldWrapper,
  InputMobileTextFieldWrapper,
  InputMobileTextFieldContainer,
} from "./dining-tab-form-component-styles"

interface DiningTabFormComponentProps {
  items: any
  _key: string
  _type: string
  metadata: any
  variant: string
  parentProps: number
  largeVariant: string
  PrimaryAction: ActionProps
}

const DiningTabFormComponent = ({
  items,
  variant,
  largeVariant,
  PrimaryAction,
}: DiningTabFormComponentProps) => {
  const isMobile = useMobileCheck()

  const Context = useContext(IHCLContext)
  const PortableText = Context!.PortableText

  const { SetFindYourBooking, findYourBooking } = Context?.getGlobalStore(
    GLOBAL_STORES?.userDetailsStore
  ) as UserDetailsStore

  const [check, setChecked] = useState<boolean>(false)
  const [countryCode, setCountryCode] = useState<string>("+91")
  const [wrongMsg, setWrongMsg] = useState<any>()
  const [message, setMessage] = useState<any>()
  const [loader, setLoader] = useState<boolean>(false)
  const [formValues, setFormValues] = useState<any>({
    [senderMobile]: "",
    [itineraryRefId]: "",
  })
  const [formErrors, setFormErrors] = useState<any>({
    [senderMobile]: false,
    [itineraryRefId]: false,
  })
  const [ErrorMessage, setErrorMessage] = useState<any>({
    [senderMobile]: "",
    [itineraryRefId]: "",
  })
  const formValidation = (isFormValid: any, name: any) => {
    setFormErrors({ ...formErrors, [name]: !isFormValid })
  }
  const isButtonDisable =
    check &&
    formValues?.[senderMobile]?.length == 10 &&
    formValues?.[itineraryRefId]?.length > 3 &&
    !formErrors?.[itineraryRefId] &&
    !formErrors?.[senderMobile]

  const handleChangeForm = (event: any) => {
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

  const handleSubmit = (event: any) => {
    event?.preventDefault()
    setWrongMsg("")
    setMessage("")
    if (!isButtonDisable) {
      return
    }
    try {
      setLoader(true)
      SetFindYourBooking({
        hotelId: formValues?.[itineraryRefId],
        guestPhoneNumber: formValues?.[senderMobile],
      })
        .then((res) => {})
        .catch((err) => {
          console.error(err)
        })
    } catch (error) {
      console.error(error)
    } finally {
      setLoader(false)
    }
  }

  return (
    <MainContentWrapper
      $isMobile={isMobile}
      aria-label={isMobile ? variant : largeVariant}>
      {items && (
        <MainContainer $isMobile={isMobile}>
          {items?.[0]?.inputFieldType && (
            <InputTextFieldWrapper
              sx={{ width: isMobile ? "100%" : DesktopPxToVw(700) }}
              variant="standard"
              placeholder={items?.[0]?.labelText}
              $isMobile={isMobile}
              name={itineraryRefId}
              value={formValues?.itineraryRefId}
              error={
                formErrors?.[itineraryRefId] ||
                formValues?.[itineraryRefId]?.length < 0
              }
              helperText={
                formErrors?.[itineraryRefId] && ErrorMessage?.[itineraryRefId]
              }
              onChange={(e) => handleChangeForm(e)}
            />
          )}
          {items?.[1]?.inputFieldType && (
            <Stack width={"100%"} alignItems="center">
              <InputMobileTextFieldContainer $isMobile={isMobile}>
                <CountryCodeDropdown
                  countryCode={countryCode}
                  setCountryCode={setCountryCode}
                  dropdownStyle={{
                    width: "17.35vw",
                  }}
                />
                <InputMobileTextFieldWrapper
                  fullWidth
                  variant="standard"
                  inputProps={{ maxLength: 10 }}
                  placeholder={items?.[1]?.labelText}
                  $isMobile={isMobile}
                  value={formValues?.[senderMobile]}
                  name={senderMobile}
                  error={formErrors?.senderMobile}
                  onChange={(e) => handleChangeForm(e)}
                  type="tel"
                  onInput={(e: any) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 10)
                  }}
                />
              </InputMobileTextFieldContainer>
              {formErrors?.senderMobile &&
                formValues.senderMobile.length > 0 && (
                  <MobileErrorMessage
                    variant={isMobile ? "m-body-xs" : "body-s"}>
                    {ErrorMessage?.senderMobile}
                  </MobileErrorMessage>
                )}
            </Stack>
          )}
          {items?.[2]?.content && (
            <BlockContentWrapper $isMobile={isMobile}>
              <CustomCheckBox
                checked={check}
                onChange={() => {
                  setChecked(!check)
                }}
                isMarginRight={isMobile ? MobilePxToVw(20) : DesktopPxToVw(20)}
              />
              {items?.[2]?.content?.map((content: any, index: number) => (
                <BlockContentContainer key={index} $isMobile={isMobile}>
                  <PortableText blocks={content} key={index} />
                </BlockContentContainer>
              ))}
            </BlockContentWrapper>
          )}
        </MainContainer>
      )}
      <RenderActionItem
        url={""}
        isDisableRippleEffect
        onClick={handleSubmit}
        isActionButtonType={true}
        isDisable={isButtonDisable}
        title={PrimaryAction?.title}
        variant={PrimaryAction?.variant}
        navigationType={PrimaryAction?.urlType}
        buttonStyles={{ letterSpacing: "1.8px" }}
      />
    </MainContentWrapper>
  )
}

export default DiningTabFormComponent
//
