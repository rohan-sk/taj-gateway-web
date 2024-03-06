import React, { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import TextfieldValidator from "../../../utils/validations/TextfieldValidator"
import { CalenderIcon } from "../../../utils/customIcons"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { theme } from "../../../lib/theme"
import { useMobileCheck } from "../../../utils/isMobilView"
import { City, dateOfBirth } from "../../modal/constants"
import { ClickAwayListener, Stack, Typography } from "@mui/material"
import { handler as countryListService } from "../../../features/my-account/api/handler/get-country-state-city.service"

import {
  CheckBoxContainer,
  CheckBoxWrapper,
  DateContainer,
  FirstRow,
  FullBox,
  MemberAddress,
} from "./business-sme-form"
import {
  address,
  Country,
  ERROR_MESSAGES,
  No,
  pinCode,
  PLACEHOLDERS,
  senderEmail,
  senderFirstName,
  senderLastName,
  senderMobile,
  State,
  Yes,
} from "../gift-card-form/constants"

import { acceptOnlyNumbers, restrictNumericSymbol } from "../book-a-stay-form/utils"
import { nameFieldsRestrictions } from "../common/utils/nameFieldRestrictionsHandler"
import { FormErrorIcon } from "../common/form-components"
import { StayDateContainer } from "../enquiry-forms/tap-enquire-forms/tap-styles"
import { convertDateFormat, getDateBefore18Years } from "../../../utils/getDate"
import { PincodeServiceability } from "../../../utils/pincode-serviceability"
import { FieldChange } from "./types"
import { ErrorMessageTypography, InputTextField } from "../common/styles"
import { updateArrayState } from "../common/utils/updateArrayState"
import phoneNumberVerifier from "../../../utils/phone-number-verifier"
import CustomAutoCompleteComponent from "../../custom-auto-complete.component"
import EnquireTextField from "../common/form-input.component"
const CustomDatePickerComponent = dynamic(() => import("../../hoc/CustomDatePicker/custom-date-picker.component"))
const CountryCodeDropdown = dynamic(() => import("../../../utils/CountryCodeDropdown"))
const CustomCheckBox = dynamic(() =>
  import("../../hoc/CustomCheckBox/Checkbox").then((module) => module.CustomCheckBox),
)

const MemberFormComponent = ({
  memberId,
  setMembers,
  memberData,
  memberErrors,
  handleScroll,
  setMemberErrors,
  activeAccordion,
  membersParentRef,
  countryList = ["India"],
  currentMember: memberDetails,
}: any) => {
  const initialFieldChange: FieldChange = {
    [Country]: true,
    [State]: true,
  }
  const isMobile = useMobileCheck()
  const [date, setDate] = useState<any>(null)
  const [open, setOpen] = useState<boolean>(false)
  const [cityList, setCityList] = useState<string[]>([])
  const [userCode, setUserCode] = useState<string>("IN")
  const [stateList, setStateList] = useState<string[]>([])
  const [countryCode, setCountryCode] = useState<string>("+91")
  const [isFieldChange, setIsFieldChange] = useState<FieldChange>(initialFieldChange)
  const [isNueOrEpicureMemberCheck, setIsNueOrEpicureMemberCheck] = useState<boolean>(true)
  const calendarRef: any = useRef()
  const formRef: any = useRef()

  const currentMemberErrors = { ...memberErrors?.[memberId] }

  //for textField
  const handleOnChange: any = (e: any) => {
    const { name, value } = e?.target
    const { status } = TextfieldValidator(name, value)
    updateArrayState(setMembers, memberId, { [name]: value })
    updateArrayState(setMemberErrors, memberId, { [name]: !status })
  }
  const dateString = memberDetails?.[dateOfBirth]
    ? memberDetails?.[dateOfBirth]?.split("-")?.reverse()?.join("-")
    : null

  const fieldChangeSetter = (obj: any) => {
    setIsFieldChange((prev: any) => ({ ...prev, ...obj }))
  }
  const handleMobile = (event: any, code: any) => {
    const { name, value } = event?.target
    const val = `${value || ""}`
    const length = val?.length
    const isVerified = !!val ? phoneNumberVerifier(code, Number(val)) : false
    if (countryCode === "+91") {
      if (length <= 10 && Number(val[0]) > 5) {
        updateArrayState(setMembers, memberId, {
          [name]: Math.max(0, parseInt(val)).toString().slice(0, 10),
        })
      } else {
        length == 0 &&
          updateArrayState(setMembers, memberId, {
            [name]: "",
          })
      }
    } else {
      if (length <= 14 && Number(val[0]) > 1) {
        updateArrayState(setMembers, memberId, {
          [name]: Math.max(0, parseInt(val)).toString().slice(0, 14),
        })
      } else {
        length === 0 &&
          updateArrayState(setMembers, memberId, {
            [name]: "",
          })
      }
    }
    updateArrayState(setMemberErrors, memberId, { [name]: !isVerified })
  }
  const handleUserCode = (code: string) => {
    const value = memberDetails?.[senderMobile]
    setUserCode(code)
    value &&
      handleMobile(
        {
          target: {
            value,
            name: senderMobile,
          },
        },
        code,
      )
  }

  //for datePicker
  const handleDate = (newValue: any) => {
    setDate(newValue)
    setOpen(false)
    updateArrayState(setMembers, memberId, { [dateOfBirth]: convertDateFormat(newValue) })
    updateArrayState(setMemberErrors, memberId, { [dateOfBirth]: false })
  }
  const keypadCloseForDatePicker = () => {
    if (document?.activeElement instanceof HTMLInputElement) {
      document?.activeElement?.blur()
    }
  }

  const onCountryChange = (newValue: any) => {
    updateArrayState(setMembers, memberId, { [Country]: newValue, [State]: "", [City]: "" })
    fieldChangeSetter({ [Country]: true })
    setStateList([])
  }
  const onStateChange = (newValue: any) => {
    updateArrayState(setMembers, memberId, { [State]: newValue, [City]: "" })
    fieldChangeSetter({ [State]: true })
    setCityList([])
  }
  const onCityChange = (newValue: any) => {
    updateArrayState(setMembers, memberId, { [City]: newValue })
  }
  const getStateList = async (newValue: any) => {
    const res: any = await countryListService?.getStates(newValue)
    if (!res?.error && res?.data) {
      setStateList(res?.data)
      fieldChangeSetter({ [Country]: false })
    }
  }
  const getCityList = async (newValue: any) => {
    const res: any = await countryListService?.getCities(newValue)
    setCityList([])
    if (!res?.error && res?.data) {
      setCityList(res?.data)
      fieldChangeSetter({ [State]: false })
    }
  }

  //for pinCode
  const handlePinCode = async (event: any) => {
    const { name, value } = event?.target
    const isIndianAddress = memberDetails?.[Country]?.toLowerCase() === "india"
    const isEmpty = !memberDetails?.[Country]
    const { status } = TextfieldValidator(name, value)
    updateArrayState(setMembers, memberId, { [pinCode]: value })
    if (value?.length === 6) {
      const response = await PincodeServiceability(value)
      if (!response?.error) {
        updateArrayState(setMembers, memberId, {
          [Country]: response?.country || "",
          [State]: response?.state || "",
          [City]: response?.city || "",
        })
        updateArrayState(setMembers, memberId, { [pinCode]: value })
        updateArrayState(setMemberErrors, memberId, {
          [Country]: response?.country ? false : memberDetails?.[Country],
          [State]: response?.state ? false : memberDetails?.[State],
          [City]: response?.city ? false : memberDetails?.[City],
          [pinCode]: false,
        })
      } else {
        updateArrayState(setMemberErrors, memberId, {
          [pinCode]: isIndianAddress,
        })
      }
    } else {
      updateArrayState(setMemberErrors, memberId, {
        [pinCode]: isIndianAddress || isEmpty ? !status : !value,
      })
    }
  }

  //setting up memberDetails epicure checkbox
  useEffect(() => {
    updateArrayState(setMembers, memberId, { isIHCLLoyaltyMember: isNueOrEpicureMemberCheck })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNueOrEpicureMemberCheck, memberId])

  //setting up countryCodeValue to parent state
  useEffect(() => {
    updateArrayState(setMembers, memberId, { countryCodeValue: countryCode })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryCode, memberId])

  const isActiveAccordion = activeAccordion === memberId
  useEffect(() => {
    if (isActiveAccordion) {
      handleScroll &&
        handleScroll({
          memberId: memberId,
          memberRef: formRef,
          parentRef: membersParentRef,
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActiveAccordion])

  return (
    <Stack ref={formRef}>
      <FirstRow>
        <EnquireTextField
          name={senderFirstName}
          helperText={memberData?.[0]?.errorText}
          placeholder={memberData?.[0]?.labelText}
          value={memberDetails?.[senderFirstName]}
          onChange={(e: any) => {
            nameFieldsRestrictions(e, handleOnChange)
          }}
          sx={{ width: "100%", gridArea: "formName" }}
          error={currentMemberErrors?.[senderFirstName]}
        />
        <EnquireTextField
          name={senderLastName}
          helperText={memberData?.[1]?.errorText}
          value={memberDetails?.[senderLastName]}
          placeholder={memberData?.[1]?.labelText}
          onChange={(e: any) => {
            nameFieldsRestrictions(e, handleOnChange)
          }}
          sx={{ width: "100%", gridArea: "formEmail" }}
          error={currentMemberErrors?.[senderLastName]}
        />

        <Stack sx={{ width: "100%", gridArea: "formMobile" }}>
          <Stack flexDirection={"row"}>
            <CountryCodeDropdown
              backgroundColor={isMobile ? theme?.palette?.background?.default : theme?.palette?.background?.paper}
              isCustomizedArrow={true}
              parentStyles={{
                minHeight: isMobile ? "6.25vw" : DesktopPxToVw(40),
                "&, & .MuiSelect-select.MuiSelect-standard.MuiInputBase-input.MuiInput-input, & .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-colorPrimary, & input~div":
                  {
                    display: "flex",
                    alignItems: "center",
                    gap: DesktopPxToVw(5),
                    height: isMobile ? "6.25vw" : DesktopPxToVw(40),
                  },
                "& span": {
                  margin: "0vw",
                  position: "unset",
                },
                "@media (max-Width:640px)": {
                  "& .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-colorPrimary": {
                    minWidth: "initial",
                    paddingBottom: "0vw",
                    height: "6.25vw",
                  },
                },
              }}
              iconStyle={{
                position: "static !important",
                color: `${theme?.palette?.neuPalette?.hexSeventeen} !important`,
                fontSize: isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
              }}
              countryCode={countryCode}
              setUserCode={handleUserCode}
              setCountryCode={setCountryCode}
              dropdownStyle={{
                width: isMobile ? "58%" : "17vw",
                marginLeft: isMobile ? "18vw" : "5.4vw",
              }}
            />
            <EnquireTextField
              name={senderMobile}
              onChange={(e: any) => {
                handleMobile(e, userCode)
              }}
              type="tel"
              onKeyDown={restrictNumericSymbol}
              value={memberDetails?.[senderMobile]}
              placeholder={memberData?.[2]?.labelText}
              error={currentMemberErrors?.[senderMobile]}
              inputProps={{ maxLength: countryCode === "+91" ? 10 : 14 }}
              sx={{
                "& input, & label": {
                  paddingLeft: isMobile ? MobilePxToVw(14) : DesktopPxToVw(24),
                },
              }}
            />
          </Stack>
          {currentMemberErrors?.[senderMobile] && (
            <Stack sx={{ width: "100%", position: "relative" }}>
              <ErrorMessageTypography sx={{ position: "absolute", marginTop: "3px" }}>
                {memberData?.[2]?.errorText}
              </ErrorMessageTypography>
            </Stack>
          )}
        </Stack>
      </FirstRow>
      <MemberAddress>
        <Stack sx={{ gridArea: "formAddress" }}>
          <EnquireTextField
            name={address}
            value={memberDetails?.[address]}
            error={currentMemberErrors?.[address]}
            onChange={(e: any) => handleOnChange(e)}
            helperText={memberData?.[0]?.errorText}
            placeholder={memberData?.[3]?.labelText}
          />
        </Stack>
        <Stack sx={{ gridArea: "formCountry" }}>
          <CustomAutoCompleteComponent
            showErrorIcon={currentMemberErrors?.[Country]}
            value={memberDetails?.[Country]}
            onChange={(event: any, newValue: any, job: string) => {
              if (newValue) {
                onCountryChange(newValue)
                updateArrayState(setMemberErrors, memberId, { [Country]: false })
              } else if (job?.toLowerCase() === "clear") {
                setStateList([])
                updateArrayState(setMembers, memberId, {
                  [Country]: "",
                  [State]: "",
                  [City]: "",
                })
              } else {
                updateArrayState(setMembers, memberId, {
                  [Country]: "",
                })
              }
              updateArrayState(setMembers, memberId, {
                [pinCode]: "",
              })
            }}
            options={countryList}
            noOptionsText={"Please wait fetching country list..."}
            renderInput={(params: any) => (
              <InputTextField
                {...params}
                name={Country}
                variant="standard"
                helperText={
                  currentMemberErrors?.[Country] && (memberData?.[4]?.errorText || ERROR_MESSAGES?.empty_country_error)
                }
                placeholder={memberData?.[4]?.labelText}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password",
                }}
              />
            )}
            getOptionLabel={(option: any) => option}
            sx={{
              width: "100%",
              "& .MuiInput-input ": {
                padding: "0vw !important",
              },
            }}
          />
        </Stack>
        <Stack sx={{ gridArea: "formState" }}>
          <CustomAutoCompleteComponent
            value={memberDetails?.[State]}
            onChange={(event: any, newValue: any, job: string) => {
              if (newValue) {
                onStateChange(newValue)
                updateArrayState(setMemberErrors, memberId, { [State]: false })
              } else if (job?.toLowerCase() === "clear") {
                setCityList([])
                updateArrayState(setMembers, memberId, {
                  [State]: "",
                  [City]: "",
                })
              } else {
                updateArrayState(setMembers, memberId, {
                  [State]: "",
                })
              }
              updateArrayState(setMembers, memberId, {
                [pinCode]: "",
              })
            }}
            onOpen={() => {
              isFieldChange?.[Country] && !!memberDetails?.[Country] && getStateList(memberDetails?.[Country])
            }}
            options={stateList}
            noOptionsText={
              isFieldChange?.[Country] ? "Please wait fetching state list..." : "Please select the country first"
            }
            getOptionLabel={(option: any) => option}
            showErrorIcon={currentMemberErrors?.[State]}
            renderInput={(params: any) => (
              <InputTextField
                {...params}
                name={State}
                variant="standard"
                placeholder={memberData?.[5]?.labelText}
                helperText={currentMemberErrors?.[State] && memberData?.[5]?.errorText}
                inputProps={{
                  ...params?.inputProps,
                  autoComplete: "new-password",
                }}
              />
            )}
            sx={{
              width: "100%",
              ".MuiInput-input ": {
                padding: "0vw !important",
              },
            }}
          />
        </Stack>
        <Stack sx={{ gridArea: "formPinCode" }}>
          <EnquireTextField
            name={pinCode}
            type="tel"
            value={memberDetails?.[pinCode]}
            error={currentMemberErrors?.[pinCode]}
            helperText={memberData?.[6]?.errorText}
            placeholder={memberData?.[6]?.labelText}
            onChange={(e: any) => acceptOnlyNumbers(e, handlePinCode)}
            inputProps={{ maxLength: 6 }}
          />
        </Stack>
        <Stack sx={{ gridArea: "formCity" }}>
          <CustomAutoCompleteComponent
            options={cityList}
            onOpen={() => {
              isFieldChange?.[State] && !!memberDetails?.[State] && getCityList(memberDetails?.[State])
            }}
            showErrorIcon={currentMemberErrors?.[City]}
            onChange={(event: any, newValue: any, job: string) => {
              if (newValue) {
                onCityChange(newValue)
                updateArrayState(setMemberErrors, memberId, { [City]: false })
              } else if (job?.toLowerCase() === "clear") {
                updateArrayState(setMembers, memberId, {
                  [City]: "",
                })
              } else {
                updateArrayState(setMembers, memberId, {
                  [City]: "",
                })
              }
              updateArrayState(setMembers, memberId, {
                [pinCode]: "",
              })
            }}
            value={memberDetails?.[City]}
            noOptionsText={isFieldChange?.[State] ? "Please wait fetching city list..." : ""}
            renderInput={(params: any) => (
              <InputTextField
                {...params}
                name={State}
                variant="standard"
                placeholder={memberData?.[7]?.labelText}
                helperText={currentMemberErrors?.[City] && memberData?.[7]?.errorText}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password",
                }}
              />
            )}
            getOptionLabel={(option: any) => option}
            sx={{
              width: "100%",
              ".MuiInput-input ": {
                padding: "0vw !important",
              },
            }}
          />
        </Stack>
      </MemberAddress>
      <DateContainer ref={calendarRef}>
        <Stack
          sx={{ width: "100%" }}
          onFocus={() => {
            setOpen(true)
            handleScroll &&
              handleScroll({
                memberId: memberId,
                parentRef: membersParentRef,
                memberRef: calendarRef,
              })
          }}
          onClick={() => keypadCloseForDatePicker()}>
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            <StayDateContainer $isOpen={open} sx={{ minWidth: "initial !important" }}>
              <CustomDatePickerComponent
                date={dateString ? new Date(dateString) : null}
                isOpen={open}
                sx={{
                  width: "100%",
                  height: "100%",
                }}
                defaultActiveStartDate={getDateBefore18Years()}
                maxDate={getDateBefore18Years()}
                onChange={handleDate}
                calendarIcon={() => <></>}
                placeholder={memberData?.[8]?.labelText}
                renderComponent={
                  <InputTextField
                    sx={{ width: "100%" }}
                    onKeyDown={(e: any) => e?.preventDefault()}
                    onFocus={(e: any) => setOpen(() => true)}
                    onClick={(e: any) => setOpen(() => true)}
                    variant="standard"
                    autoComplete="off"
                    placeholder={date ? "" : PLACEHOLDERS?.DOB}
                    value={date ? convertDateFormat(new Date(dateString))?.replaceAll("-", "/") : ""}
                    helperText={
                      currentMemberErrors?.dateOfBirth
                        ? memberData?.[8]?.errorText || ERROR_MESSAGES?.EMPTY_ADD_ON_DOB_ERROR
                        : ""
                    }
                    InputProps={{
                      endAdornment: currentMemberErrors?.dateOfBirth ? (
                        <FormErrorIcon />
                      ) : (
                        <Stack onClick={(prev: any) => setOpen(!prev)} justifyContent={"end"}>
                          <CalenderIcon
                            sx={{
                              height: "auto",
                              width: isMobile ? MobilePxToVw(18) : DesktopPxToVw(18),
                            }}
                          />
                        </Stack>
                      ),
                    }}
                  />
                }
                calendarWidth={isMobile ? MobilePxToVw(476) : DesktopPxToVw(578)}
              />
            </StayDateContainer>
          </ClickAwayListener>
        </Stack>

        <EnquireTextField
          name={senderEmail}
          sx={{ width: "100%" }}
          onChange={handleOnChange}
          helperText={memberData?.[9]?.errorText}
          placeholder={memberData?.[9]?.labelText}
          value={memberDetails?.[senderEmail]}
          error={currentMemberErrors?.[senderEmail]}
        />
      </DateContainer>
      <FullBox
        sx={{
          mt: isMobile ? MobilePxToVw(40) : DesktopPxToVw(35),
          mb: isMobile ? MobilePxToVw(15) : DesktopPxToVw(15),
        }}>
        <Typography sx={{ lineHeight: "140%" }} variant={isMobile ? "m-body-l" : "body-l"}>
          {memberData?.[10]?.labelText || PLACEHOLDERS?.IHCL_LOYALTY_MEMBER}
        </Typography>
      </FullBox>
      <CheckBoxContainer>
        <CheckBoxWrapper>
          <CustomCheckBox
            name={"terms"}
            onChange={(e: any) => {
              setIsNueOrEpicureMemberCheck(true)
            }}
            checked={isNueOrEpicureMemberCheck}
          />
          <Typography variant={isMobile ? "m-body-l" : "body-l"}>{Yes}</Typography>
        </CheckBoxWrapper>
        <CheckBoxWrapper>
          <CustomCheckBox
            name={"privacy"}
            onChange={(e: any) => {
              setIsNueOrEpicureMemberCheck(false)
            }}
            checked={!isNueOrEpicureMemberCheck}
          />
          <Typography variant={isMobile ? "m-body-l" : "body-l"}>{No}</Typography>
        </CheckBoxWrapper>
      </CheckBoxContainer>
    </Stack>
  )
}
export default MemberFormComponent
