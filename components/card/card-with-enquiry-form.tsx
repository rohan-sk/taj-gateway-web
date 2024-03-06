/* eslint-disable @next/next/no-img-element */
import { Autocomplete, Box, TextField, Typography } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { BoxWrapper, ColumnFlexBox, MobileNumberInput, SBFlex } from "../EventEnquiry/Styles"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { senderEmail, senderFirstName, senderMobile } from "../forms/gift-card-form/constants"
import { AutoCompleteInput, CountryCodeDropdownBox, InputText } from "../forms/gift-card-form/styles"
import TextfieldValidator from "../../utils/validations/TextfieldValidator"
import { ErrorMessageTypography } from "../hoc/SignIn.tsx/sign-in.style"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { DateTextField } from "../Login/Styles/register.styles"
import { ICONS } from "../constants"
import { GLOBAL_STORES } from "../../utils/Constants"
import { PropertyStore } from "../../store"
import MemoizedHotelContactData from "./hotel-contact-text.component"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
const CountryCodeDropdown = dynamic(() => import("../../utils/CountryCodeDropdown"))

function CardWithEnquiryForm(props: any, handleModalClose: Function) {
  let data = {
    eventType: [
      {
        type: "marriage",
      },
      {
        type: "party",
      },
      {
        type: "function",
      },
      {
        type: "birthday",
      },
    ],
    guestList: [
      {
        no: "10",
      },
      {
        no: "50",
      },
      {
        no: "100",
      },
      {
        no: "500",
      },
    ],
    estimatedRooms: [
      {
        roomNo: "1",
      },
      {
        roomNo: "10",
      },
      {
        roomNo: "20",
      },
      {
        roomNo: "50",
      },
    ],

    enquire: "ENQUIRE",
  }
  type enquiryForm = {
    [senderFirstName]: string
    [senderEmail]: string
    [senderMobile]: string
    noOfGuests: string
    eventDescription?: string
  }
  type enquiryErrors = {
    [senderFirstName]: boolean
    [senderEmail]: boolean
    [senderMobile]: boolean
    noOfGuests: boolean
    eventDescription?: boolean
  }
  const initialValues = {
    [senderFirstName]: "",
    [senderEmail]: "",
    [senderMobile]: "",
    noOfGuests: "",
  }
  const initialErrors = {
    [senderFirstName]: false,
    [senderEmail]: false,
    [senderMobile]: false,
    noOfGuests: false,
  }
  const initialErrorMessages = {
    [senderFirstName]: "",
    [senderEmail]: "",
    [senderMobile]: "",
    noOfGuests: "",
  }
  const Context = useContext(IHCLContext)
  const PortableText = Context!.PortableText
  const propertyStore = Context?.getGlobalStore(GLOBAL_STORES?.propertyStore) as PropertyStore
  const [formValues, setFormValues] = useState<enquiryForm>(initialValues)
  const [formErrors, setFormErrors] = useState<enquiryErrors>(initialErrors)
  const [errorMessages, setErrorMessages] = useState<any>(initialErrorMessages)
  const [countryCode, setCountryCode] = useState<string>("+91")
  const [date, setDate] = useState<any>(null)
  const [emptyDate, setEmptyDate] = useState<boolean>(false)
  const formValidation = (isFormValid: any, id: any) => {
    setFormErrors({ ...formErrors, [id]: !isFormValid })
  }
  const handleChangeForm = (event: any) => {
    const { name, value } = event.target
    const { status, errorMsg, fieldName } = TextfieldValidator(name, value)
    setErrorMessages((prevFormErrors: any) => ({
      ...prevFormErrors,
      [fieldName]: errorMsg,
    }))
    setFormValues((prevFormValues: any) => ({
      ...prevFormValues,
      [name]: value,
    }))
    formValidation(status, name)
  }

  useEffect(() => {
    if (date) {
      setEmptyDate(true)
    } else {
      setEmptyDate(false)
    }
  }, [date])
  const navigate = useAppNavigation()
  const handelSubmitForm = () => {
    if (emptyDate && !formErrors[senderFirstName] && !formErrors[senderEmail] && !formErrors[senderMobile]) {
      navigate(props.primaryAction?.url, props.primaryAction?.urlType)
    }
  }
  const CalenderIcon = () => {
    return <Box component={"img"} src={ICONS?.DOWN_ARROW} alt={`CalendarIcon`} width={"100%"} height={"100%"} />
  }

  const ButtonDisable =
    date &&
    formValues?.senderFirstName?.length >= 3 &&
    formValues?.senderMobile?.length == 10 &&
    formValues?.noOfGuests !== ""
  return (
    <BoxWrapper>
      <Typography variant={"heading-s"} mb={2}>
        {props?.title}
      </Typography>
      <SBFlex>
        <ColumnFlexBox>
          <InputText
            inputProps={{ maxLength: 10 }}
            placeholder={props.parameterMap?.[0]?.value}
            variant="standard"
            name={senderFirstName}
            value={formValues?.[senderFirstName]}
            error={formErrors.senderFirstName}
            onChange={handleChangeForm}
          />
          {formErrors?.[senderFirstName] && formValues.senderFirstName.length > 0 && (
            <ErrorMessageTypography variant="body-s">{errorMessages?.[senderFirstName]}</ErrorMessageTypography>
          )}
        </ColumnFlexBox>
        <ColumnFlexBox>
          <InputText
            placeholder={props.parameterMap?.[1]?.value}
            variant="standard"
            name={senderEmail}
            value={formValues?.[senderEmail]}
            error={formErrors?.[senderEmail]}
            onChange={handleChangeForm}
          />
          {formErrors?.[senderEmail] && formValues?.[senderEmail].length > 0 && (
            <ErrorMessageTypography variant="body-s">{errorMessages?.[senderEmail]}</ErrorMessageTypography>
          )}
        </ColumnFlexBox>
        <Box>
          <CountryCodeDropdownBox>
            <CountryCodeDropdown countryCode={countryCode} setCountryCode={setCountryCode} />
            <MobileNumberInput
              type="tel"
              onInput={(e: any) => {
                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
              }}
              variant="standard"
              placeholder={props.parameterMap?.[2]?.value}
              value={formValues?.[senderMobile]}
              name={senderMobile}
              error={formErrors?.senderMobile}
              onChange={(e) => handleChangeForm(e)}
            />
          </CountryCodeDropdownBox>
          {formErrors?.senderMobile && formValues.senderMobile.length > 0 && (
            <ErrorMessageTypography variant="body-s">{errorMessages?.senderMobile}</ErrorMessageTypography>
          )}
        </Box>
      </SBFlex>
      <SBFlex>
        <Autocomplete
          popupIcon={<KeyboardArrowDownIcon />}
          sx={{ width: "26.598vw" }}
          options={data?.guestList}
          getOptionLabel={(option: any) => option.no}
          onChange={(event: any, newValue: any) => {
            setFormValues({
              ...formValues,
              noOfGuests: newValue as string,
            })
          }}
          renderInput={(params) => (
            <AutoCompleteInput
              type="number"
              {...params}
              variant="standard"
              placeholder={props.parameterMap?.[4]?.value}
              error={formErrors.noOfGuests}
            />
          )}
        />
      </SBFlex>
      <SBFlex>
        <InputText
          fullWidth
          multiline
          rows={3}
          size="small"
          variant="standard"
          placeholder={props.parameterMap?.[5]?.value}
          sx={{
            width: "100%",
            "& input::placeholder": {
              color: "black",
            },
          }}
          name="location"
          value={formValues?.eventDescription}
          onChange={(e: any) =>
            setFormValues((prev: any) => {
              return {
                ...prev,
                eventDescription: e?.target?.value,
              }
            })
          }
        />
      </SBFlex>
      <RenderActionItem
        url={""}
        title={props.primaryAction?.title}
        variant={props.primaryAction?.variant}
        navigationType={props.primaryAction?.urlType}
        isActionButtonType={true}
        onClick={() => {
          handelSubmitForm()
        }}
        isDisable={ButtonDisable ? true : false}
      />

      <Box
        sx={{
          marginTop: DesktopPxToVw(30),
          textAlign: "center",
        }}>
        <MemoizedHotelContactData singleContent={props?.singleContent} propertyStore={propertyStore} />
      </Box>
    </BoxWrapper>
  )
}

export default CardWithEnquiryForm
