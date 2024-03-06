import dynamic from "next/dynamic"
import { observer } from "mobx-react-lite"
import { SignUpInterface } from "../login-form.types"
import { PAGE_STORES } from "../../../utils/Constants"
import { Box, InputAdornment, Stack } from "@mui/material"
import { useMobileCheck } from "../../../utils/isMobilView"
import React, { useContext, useEffect, useState } from "react"
import { CityWrapper, FormErrors } from "../Styles/register.styles"
import { RestrictSpecialChar } from "../../../utils/restrictSpecialChar"
import { AddressTextField, StyledTextField } from "./register-form.styles"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { PincodeServiceability } from "../../../utils/pincode-serviceability"
import TextfieldValidator from "../../../utils/validations/TextfieldValidator"
import { Error_icon, address, pinCode } from "../../forms/gift-card-form/constants"
import { BoxWrapper, GridWrapper, TextFieldContainer } from "./register-form.styles"
import { ModalContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import AuthenticRegistrationStore from "../../../features/registration/store/authentic.registration.store"
import { handler as countryListService } from "../../../features/my-account/api/handler/get-country-state-city.service"
import AccountStore from "../../../features/my-account/store/pageStore/account.store"
const CustomAutoCompleteComponent = dynamic(() => import("../../custom-auto-complete.component"))

const AddAddress = (props: SignUpInterface) => {
  const { items } = props
  const [values, setValues] = useState({ address: "", city: "", pinCode: "" })
  const [select, setSelect] = useState({ country: "", state: "", city: "" })
  const pageContext = useContext(ModalContext)
  const [countryList, setCountryList] = useState<Array<string>>([])
  const [stateList, setStateList] = useState<Array<string>>([])
  const [cityList, setCityList] = useState<Array<string>>([])
  const isMobile = useMobileCheck()

  const authenticRegistrationStore = pageContext?.getPageStore(
    PAGE_STORES.registrationStore,
  ) as AuthenticRegistrationStore

  const accountStore = pageContext?.getPageStore(PAGE_STORES.ACCOUNT_STORES.myAccountStore) as AccountStore

  const getCountryList = async () => {
    const countryList: any = await countryListService?.getCountry()
    if (countryList?.data?.length > 0) {
      setCountryList(() => countryList?.data)
    }
  }
  const getStates = async (country: string) => {
    const states: any = await countryListService.getStates(country)
    if (!states?.error && states?.data?.length > 0) {
      setStateList(() => states?.data)
    }
  }
  const getCity = async (state: string) => {
    const cities: any = await countryListService.getCities(state)
    if (!cities?.error && cities?.data?.length > 0) {
      setCityList(() => cities?.data)
    }
  }

  useEffect(() => {
    getCountryList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [errors, setErrors] = useState({
    address: false,
    city: false,
    pinCode: false,
    country: false,
    state: false,
  })

  useEffect(() => {
    authenticRegistrationStore?.userAddressStore(
      values?.address,
      select?.country,
      select?.state,
      select?.city,
      values?.pinCode,
    )
  }, [authenticRegistrationStore, select?.country, select?.state, values?.address, select?.city, values?.pinCode])

  useEffect(() => {
    if (errors?.city || errors?.pinCode || errors?.address || errors?.country || errors?.state) {
      authenticRegistrationStore?.validAddressFormData(true)
    } else {
      authenticRegistrationStore?.validAddressFormData(false)
    }
  }, [authenticRegistrationStore, errors?.address, errors?.city, errors?.country, errors?.pinCode, errors?.state])

  const formValidation = (isFormValid: any, id: any) => {
    setErrors({ ...errors, [id]: !isFormValid })
  }

  const handleChange = (event: any) => {
    const { name, value } = event.target
    const { status, errorMsg, fieldName } = TextfieldValidator(name, value)

    setValues((prev: any) => {
      return {
        ...prev,
        [name]: event?.target?.value,
      }
    })
    formValidation(status, name)
  }

  const handlePincode = async (event: any) => {
    const { name, value } = event?.target
    const { status, errorMsg, fieldName } = TextfieldValidator(name, value)
    setValues((prev: any) => {
      return {
        ...prev,
        [name]: value,
      }
    })
    if (value?.length === 6) {
      const response = await PincodeServiceability(value)
      if (
        response?.country !== undefined &&
        response?.pincode !== undefined &&
        response?.state !== undefined &&
        response?.city !== undefined &&
        !response?.error
      ) {
        if (response?.country?.toLowerCase() === "india") {
          select?.state?.toLowerCase() !== response?.state?.toLowerCase() &&
            setSelect((prev: any) => {
              return { ...prev, state: response?.state }
            })
          select?.country?.toLowerCase() !== response?.country?.toLowerCase() &&
            setSelect((prev: any) => {
              return { ...prev, country: response?.country }
            })
          select?.city?.toLowerCase() !== response?.city?.toLowerCase() &&
            setSelect((prev: any) => {
              return { ...prev, city: response?.city }
            })
        }
      }
    }
    if (value?.length === 6) {
      formValidation(status, name)
    } else {
      formValidation(true, name)
    }
  }

  return (
    <Box>
      <GridWrapper>
        <TextFieldContainer>
          <AddressTextField
            variant="standard"
            placeholder={items?.[0]?.labelText}
            value={values?.address}
            name={address}
            // error={errors?.address}
            InputProps={{
              endAdornment: (
                <>
                  {values?.address?.length === 0 &&
                    authenticRegistrationStore?.userAddressErrors?.addressLine1Error && (
                      <InputAdornment position="end">
                        <Box component="img" src={Error_icon} alt="Expand Image" />
                      </InputAdornment>
                    )}
                </>
              ),
            }}
            helperText={
              (errors?.address && values?.address?.length > 0 && items?.[0]?.helperText) ||
              (values?.address?.length === 0 &&
                authenticRegistrationStore?.userAddressErrors?.addressLine1Error &&
                items?.[0]?.errorText)
            }
            onChange={handleChange}
            inputProps={{ maxLength: 80 }}
          />
        </TextFieldContainer>
        <BoxWrapper>
          <Stack direction={"row"} columnGap={isMobile ? MobilePxToVw(30) : DesktopPxToVw(40)}>
            <Box>
              <CustomAutoCompleteComponent
                showErrorIcon={
                  Boolean(select?.country?.length == 0) && !!authenticRegistrationStore?.userAddressErrors?.countryError
                }
                disableClearable={select?.country?.length === 0 ? true : false}
                noOptionsText={countryList?.length === 0 ? "Please wait fetching country list..." : ""}
                value={select?.country}
                options={countryList || []}
                onChange={(event: any, newValue: any) => {
                  setSelect({
                    ...select,
                    country: newValue ? newValue : "",
                    city: "",
                    state: "",
                  })
                  setValues({
                    ...values,
                    pinCode: "",
                  })
                  setStateList(() => [])
                  setCityList(() => [])
                  getStates(newValue)
                }}
                renderInput={(params: any) => (
                  <StyledTextField
                    {...params}
                    variant="standard"
                    placeholder={items?.[1]?.labelText}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
                  />
                )}
                getOptionLabel={(option: any) => option}
                sx={{
                  width: isMobile ? MobilePxToVw(256) : DesktopPxToVw(453),
                }}
              />

              {select?.country?.length == 0 && authenticRegistrationStore?.userAddressErrors?.countryError && (
                <FormErrors error={true}>{items?.[1]?.errorText}</FormErrors>
              )}
            </Box>

            <Box>
              <CustomAutoCompleteComponent
                showErrorIcon={
                  Boolean(select?.state?.length == 0) && !!authenticRegistrationStore?.userAddressErrors?.regionError
                }
                noOptionsText={
                  !select?.country
                    ? "Please select country first"
                    : stateList?.length === 0
                    ? "Please wait fetching states list..."
                    : ""
                }
                value={select?.state}
                disableClearable={select?.state?.length === 0 ? true : false}
                options={(select?.country && stateList && stateList) || []}
                onOpen={() => getStates(select?.country)}
                onChange={(event: any, newValue: any) => {
                  setSelect({
                    ...select,
                    state: newValue ? newValue : "",
                    city: "",
                  }),
                    setErrors({
                      ...errors,
                      state: false,
                    })
                  setCityList(() => [])
                  getCity(newValue)
                }}
                renderInput={(params: any) => (
                  <StyledTextField
                    {...params}
                    variant="standard"
                    placeholder={items?.[2]?.labelText}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
                  />
                )}
                getOptionLabel={(option: any) => option}
                sx={{
                  width: isMobile ? MobilePxToVw(256) : DesktopPxToVw(453),
                }}
              />
              {select?.state?.length == 0 && authenticRegistrationStore?.userAddressErrors?.regionError && (
                <FormErrors error={true}>{items?.[2]?.errorText}</FormErrors>
              )}
            </Box>
          </Stack>
        </BoxWrapper>
      </GridWrapper>
      <CityWrapper>
        <Stack direction={"row"} columnGap={isMobile ? MobilePxToVw(30) : DesktopPxToVw(40)}>
          <Box>
            <CustomAutoCompleteComponent
              showErrorIcon={
                Boolean(select?.city?.length == 0) && !!authenticRegistrationStore?.userAddressErrors?.regionError
              }
              value={select?.city}
              disableClearable={select?.city?.length === 0 ? true : false}
              noOptionsText={
                !select?.state
                  ? `Please select Region/Province first`
                  : cityList?.length === 0
                  ? "Please wait fetching cities list..."
                  : ""
              }
              options={(select?.country && select?.state && cityList && cityList) || []}
              onOpen={() => getCity(select?.state)}
              onChange={(event: any, newValue: any) => {
                setSelect({
                  ...select,
                  city: newValue ? newValue : "",
                })
              }}
              renderInput={(params: any) => (
                <StyledTextField
                  {...params}
                  variant="standard"
                  placeholder={items?.[3]?.labelText}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                  error={errors?.city && errors?.city}
                  helperText={errors?.city && items?.[3]?.errorText}
                />
              )}
              getOptionLabel={(option: any) => option}
              sx={{
                width: isMobile ? MobilePxToVw(256) : DesktopPxToVw(453),
              }}
            />
            {select?.city?.length == 0 && authenticRegistrationStore?.userAddressErrors?.cityError && (
              <FormErrors error={true}>{items?.[3]?.errorText}</FormErrors>
            )}
          </Box>
          <Box>
            <StyledTextField
              variant="standard"
              placeholder={items?.[4]?.labelText}
              value={values.pinCode}
              name={pinCode}
              onKeyDown={RestrictSpecialChar}
              InputProps={{
                endAdornment: (
                  <>
                    {values.pinCode?.length === 0 && authenticRegistrationStore?.userAddressErrors?.pincodeError && (
                      <InputAdornment position="end">
                        <Box component="img" src={Error_icon} alt="Expand Image" />
                      </InputAdornment>
                    )}
                  </>
                ),
              }}
              helperText={
                values.pinCode?.length === 0 &&
                authenticRegistrationStore?.userAddressErrors?.pincodeError &&
                items?.[4]?.errorText
              }
              type="number"
              onInput={(e: any) => {
                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 6)
              }}
              onChange={handlePincode}
            />
          </Box>
        </Stack>
      </CityWrapper>
    </Box>
  )
}

export default observer(AddAddress)
