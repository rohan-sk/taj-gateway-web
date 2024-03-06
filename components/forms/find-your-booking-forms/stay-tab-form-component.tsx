import { useRouter } from "next/router"
import { ActionProps } from "../../types"
import dynamic from "next/dynamic"
import { PathType } from "../../../types"
import { Typography } from "@mui/material"
import { theme } from "../../../lib/theme"
import { ROUTES } from "../../../utils/routes"
import React, { useContext, useState } from "react"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { useMobileCheck } from "../../../utils/isMobilView"
const RenderActionItem = dynamic(() => import("../../hoc/actions/action-items-ui"))
const CustomCheckBox = dynamic(() =>
  import("../../hoc/CustomCheckBox/Checkbox").then((module) => module.CustomCheckBox),
)
import { useAppNavigation } from "../../../utils/NavigationUtility"
import { receiverEmail, itineraryRefId } from "../gift-card-form/constants"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import TextfieldValidator from "../../../utils/validations/TextfieldValidator"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import UserDetailsStore from "../../../features/my-account/store/globalStore/user-details.store"
import {
  InputTextField,
  InputEmailTextField,
  BlockContentWrapper,
  MainStayContentWrapper,
  MainStayContentContainer,
  MainCustomCheckBoxContainer,
} from "./stay-tab-form-component-styles"

interface StayTabFormComponentProps {
  items: any
  _key: string
  metadata: any
  _type: string
  variant: string
  parentProps: number
  largeVariant: string
  PrimaryAction: ActionProps
}

const StayTabFormComponent = ({ items, variant, largeVariant, PrimaryAction }: StayTabFormComponentProps) => {
  const isMobile = useMobileCheck()
  const router = useRouter()
  const navigate = useAppNavigation()
  const Context = useContext(IHCLContext)
  const PortableText = Context!.PortableText

  const { SetFindYourBooking } = Context?.getGlobalStore(GLOBAL_STORES?.userDetailsStore) as UserDetailsStore

  const [check, setChecked] = useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(false)
  const [formValues, setFormValues] = useState<any>({
    [receiverEmail]: "",
    [itineraryRefId]: "",
  })
  const [formErrors, setFormErrors] = useState<any>({
    [receiverEmail]: false,
    [itineraryRefId]: false,
  })
  const [ErrorMessage, setErrorMessage] = useState<any>({
    [receiverEmail]: "",
    [itineraryRefId]: "",
  })
  const [wrongMsg, setWrongMsg] = useState<any>()
  const [message, setMessage] = useState<any>()
  const isButtonDisable =
    check &&
    formValues?.[receiverEmail]?.length > 3 &&
    formValues?.[itineraryRefId]?.length > 3 &&
    !formErrors?.[itineraryRefId] &&
    !formErrors?.[receiverEmail]

  const formValidation = (isFormValid: any, name: any) => {
    setFormErrors({ ...formErrors, [name]: !isFormValid })
  }
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

  const handleSubmit = (url: string, type: PathType) => {
    setWrongMsg("")
    setMessage("")
    if (!isButtonDisable) {
      return
    }
    try {
      setLoader(true)
      SetFindYourBooking({
        itenaryNumber: formValues?.[itineraryRefId],
        email: formValues?.[receiverEmail],
      })
        .then((res: any) => {
          if (res?.data?.[0]?.orderId) {
            if (res?.data?.[0]?.channel?.toLowerCase() === "web") {
              navigate(`${url}?orderId=${res?.data?.[0]?.orderId}`, type)
            } else {
              navigate(process.env.NEXT_PUBLIC_SYNXIS_URL || "", type)
            }
          } else if (res?.data?.statusCode?.value == 301) {
            navigate(process.env.NEXT_PUBLIC_SYNXIS_URL || "", type)
          } else {
            if (!res?.data?.status?.message) {
              setWrongMsg(res?.data?.data)
            } else {
              setWrongMsg("")
            }
          }
        })
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
    <MainStayContentWrapper $isMobile={isMobile} aria-label={isMobile ? variant : largeVariant}>
      {items && (
        <MainStayContentContainer $isMobile={isMobile}>
          {items?.[0]?.inputFieldType && (
            <InputTextField
              sx={{ width: isMobile ? "100%" : DesktopPxToVw(700) }}
              variant="standard"
              placeholder={items?.[0]?.labelText}
              $isMobile={isMobile}
              name={itineraryRefId}
              value={formValues?.itineraryRefId}
              error={formErrors?.[itineraryRefId] || formValues?.[itineraryRefId]?.length < 0}
              helperText={formErrors?.[itineraryRefId] && items?.[0]?.errorText}
              onChange={(e) => handleChangeForm(e)}
            />
          )}
          {items?.[1]?.inputFieldType && (
            <InputEmailTextField
              sx={{ width: isMobile ? "100%" : DesktopPxToVw(700) }}
              variant="standard"
              placeholder={items?.[1]?.labelText}
              $isMobile={isMobile}
              name={receiverEmail}
              value={formValues?.receiverEmail}
              error={formErrors?.receiverEmail || formValues?.receiverEmail.length < 0}
              helperText={formErrors?.receiverEmail && items?.[1]?.errorText}
              type="email"
              onChange={(e) => handleChangeForm(e)}
            />
          )}
          {items?.[2]?.content && (
            <MainCustomCheckBoxContainer $isMobile={isMobile}>
              <CustomCheckBox
                checked={check}
                onChange={() => {
                  setChecked(!check)
                }}
                isMarginRight={isMobile ? MobilePxToVw(20) : DesktopPxToVw(20)}
              />
              {items?.[2]?.content?.map((content: any, index: number) => (
                <BlockContentWrapper key={index} $isMobile={isMobile}>
                  <PortableText blocks={content} key={index} />
                </BlockContentWrapper>
              ))}
            </MainCustomCheckBoxContainer>
          )}
        </MainStayContentContainer>
      )}
      <RenderActionItem
        url={PrimaryAction?.url}
        isDisableRippleEffect
        onClick={() => handleSubmit(PrimaryAction?.url, PrimaryAction?.urlType)}
        isActionButtonType={true}
        isDisable={isButtonDisable}
        title={PrimaryAction?.title}
        variant={PrimaryAction?.variant}
        navigationType={PrimaryAction?.urlType}
        buttonStyles={{ letterSpacing: "1.8px" }}
      />
      {wrongMsg && (
        <Typography
          variant={isMobile ? "m-body-xs" : "body-xs"}
          color={`${theme?.palette?.ihclPalette?.hexTwentyOne}`}
          textAlign={"center"}>
          {wrongMsg}
        </Typography>
      )}
    </MainStayContentWrapper>
  )
}

export default StayTabFormComponent
//
