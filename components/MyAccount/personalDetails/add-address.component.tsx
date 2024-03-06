import { Grid, Stack } from "@mui/material"
import { AutoCompleteInput, InputText } from "../../forms/gift-card-form/styles"
import CustomAutoCompleteComponent from "../../custom-auto-complete.component"
import { ERROR_MESSAGES, PLACEHOLDERS } from "../../forms/gift-card-form/constants"
import { useEffect, useMemo, useState } from "react"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../../utils/isMobilView"
import { RestrictSpecialChar } from "../../../utils/restrictSpecialChar"
import { PincodeServiceability } from "../../../utils/pincode-serviceability"
import { ENTER_ADDRESS } from "../../constants"

const AddAddress = ({
  setAddress,
  address,
  errors,
  setErrors,
  setAddressErr,
  isEditing,
  accountStore,
  addressId,
  tab,
}: any) => {
  const isMobile = useMobileCheck()
  const [countryList, setCountryList] = useState<Array<string>>([])
  const [stateList, setStateList] = useState<Array<string>>([])
  const [cityList, setCityList] = useState<Array<string>>([])

  const getCountryList = async () => {
    const countryList: any = await accountStore.getCountries()
    setCountryList(() => countryList?.data)
  }
  const getStates = async (country: string) => {
    const states: any = await accountStore.getStates(country)
    setStateList(() => states?.data)
  }
  const getCity = async (state: string) => {
    const cities: any = await accountStore.getCities(state)
    setCityList(() => cities?.data)
  }
  useEffect(() => {
    getCountryList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handlePinCode = async (event: any) => {
    const { value } = event.target
    setAddress({
      ...address,
      pinCode: value,
    })

    if (value?.length === 6) {
      setErrors((prev: any) => ({
        ...prev,
        pinCode: false,
        country: false,
        state: false,
        city: false,
      }))
      const response = await PincodeServiceability(value)
      if (!response?.error) {
        //setting country from pincode serviceability
        getStates(response?.country)
        getCity(response?.state)
        setAddress((prev: any) => ({
          ...prev,
          country: response?.country || "",
          state: response?.state || "",
          city: response?.city || "",
        }))
      } else {
        address?.country?.toLowerCase() === "india" &&
          setErrors((prev: any) => ({
            ...prev,
            pinCode: true,
            validateError: true,
          }))
      }
    } else {
      if (address?.country?.toLowerCase() === "india") {
        setErrors({
          ...errors,
          pinCode: true,
        })
        setStateList(() => [])
        setAddress((prev: any) => ({
          ...prev,
          city: "",
          state: "",
        }))
      }
    }
  }

  useEffect(() => {
    if (address?.addressLine?.length > 3 && address?.pinCode?.length > 5) {
      setErrors((prev: any) => ({
        ...prev,
        addressLine: false,
        pinCode: false,
      }))
      setAddressErr(false)
    }
    if (!!address?.country && address?.country?.toLowerCase() !== "india") {
      setErrors({
        ...errors,
        pinCode: false,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, address?.country])

  useEffect(() => {
    if (tab.toLowerCase() == ENTER_ADDRESS.toLowerCase()) {
      const editAddressData = accountStore.userAddresses?.data?.filter(
        (item: any) => item?.addressId === addressId,
      )?.[0]
      setAddress({
        ...address,
        addressLine: editAddressData?.addressLine || "",
        city: editAddressData?.city || "",
        country: editAddressData?.country || "",
        pinCode: editAddressData?.pinCode || "",
        state: editAddressData?.state || "",
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing])

  const handleInputChange = (event: any) => {
    const inputValue = event?.target?.value
    const alphabetsRegex = /^[A-Za-z0-9]*$/
    const regex = /^[,./\-\/A-Za-z0-9\s]*$/
    if (inputValue?.length === 1) {
      if (alphabetsRegex.test(inputValue)) {
        setAddress({
          ...address,
          addressLine: event?.target?.value as string,
        })
      }
    } else {
      if (regex.test(inputValue)) {
        setAddress({
          ...address,
          addressLine: event?.target?.value as string,
        })
      }
    }
    setErrors({
      ...errors,
      addressLine: false,
    })
  }

  return (
    <Stack width={"100%"} rowGap={isMobile ? MobilePxToVw(20) : DesktopPxToVw(30)}>
      <Grid container>
        <Grid item xs={12} md={12}>
          <InputText
            value={address?.addressLine}
            sx={{
              width: "100%",
              "& .MuiFormHelperText-root": {
                fontFamily: "Inter",
                fontSize: isMobile ? MobilePxToVw(18) : DesktopPxToVw(18),
              },
              "& .MuiInput-input": {
                fontSize: isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
              },
            }}
            placeholder={"Address"}
            variant="standard"
            required
            error={errors?.addressLine && errors?.addressLine}
            helperText={errors?.addressLine && ERROR_MESSAGES?.empty_address_error}
            onChange={(event: any) => handleInputChange(event)}
          />
        </Grid>
      </Grid>
      <Grid container columnSpacing={DesktopPxToVw(40)} rowGap={MobilePxToVw(20)}>
        <Grid item xs={12} md={6}>
          <InputText
            sx={{
              width: "100%",
              "& .MuiFormHelperText-root": {
                fontFamily: "Inter",
                fontSize: isMobile ? MobilePxToVw(18) : DesktopPxToVw(18),
              },
              "& .MuiInput-input": {
                fontSize: isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
              },
            }}
            placeholder={PLACEHOLDERS?.POSTAL_CODE}
            variant="standard"
            required
            value={address?.pinCode}
            type="number"
            onInput={(e: any) => {
              e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 6)
            }}
            onKeyDown={RestrictSpecialChar}
            onChange={(e: any) => handlePinCode(e)}
            error={errors?.pinCode && errors?.pinCode}
            helperText={
              errors?.pinCode &&
              (errors?.validateError ? ERROR_MESSAGES?.PIN_CODE : ERROR_MESSAGES?.empty_pincode_error)
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomAutoCompleteComponent
            noOptionsText={countryList?.length === 0 ? "Please wait fetching country list..." : ""}
            options={countryList || []}
            onChange={(event: any, newValue: any) => {
              setAddress({
                ...address,
                country: newValue as string,
                state: "",
                city: "",
                pinCode: "",
              }),
                setErrors({
                  ...errors,
                  country: false,
                  state: false,
                })
              setStateList(() => [])
              getStates(newValue)
            }}
            renderInput={(params: any) => (
              <AutoCompleteInput
                {...params}
                value={address?.country}
                variant="standard"
                placeholder={address?.country || PLACEHOLDERS?.COUNTRY}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password",
                }}
                error={errors?.country && errors?.country}
                helperText={errors?.country && ERROR_MESSAGES?.empty_country_error}
              />
            )}
            getOptionLabel={(option: any) => option}
            sx={{
              width: "100%",
            }}
          />
        </Grid>
      </Grid>
      <Grid container columnSpacing={DesktopPxToVw(40)} rowGap={MobilePxToVw(20)}>
        <Grid item xs={12} md={6}>
          <CustomAutoCompleteComponent
            noOptionsText={
              !address?.country
                ? "Please select country first"
                : stateList?.length === 0
                ? "Please wait fetching states list..."
                : ""
            }
            value={address?.state}
            disableClearable={address?.state?.length === 0 ? true : false}
            options={(address?.country && stateList && stateList) || []}
            onOpen={() => getStates(address?.country)}
            onChange={(event: any, newValue: any) => {
              setAddress({
                ...address,
                state: newValue as string,
                city: address?.country?.toLowerCase() !== "india" ? address?.city : "",
                pinCode: address?.country?.toLowerCase() !== "india" ? address?.pinCode : "",
              }),
                setErrors({
                  ...errors,
                  state: false,
                })
              setCityList(() => [])
              getCity(newValue)
            }}
            renderInput={(params: any) => (
              <AutoCompleteInput
                {...params}
                variant="standard"
                placeholder={address?.state || PLACEHOLDERS?.STATE}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password",
                }}
                error={errors?.state && errors?.state}
                helperText={errors?.state && ERROR_MESSAGES?.empty_state_error}
              />
            )}
            getOptionLabel={(option: any) => option}
            sx={{
              width: "100%",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomAutoCompleteComponent
            value={address?.city}
            disableClearable={address?.city?.length === 0 ? true : false}
            noOptionsText={
              !address?.state
                ? "Please select state first"
                : cityList?.length === 0
                ? "Please wait fetching cities list..."
                : ""
            }
            options={(address?.country && address?.state && cityList && cityList) || []}
            onOpen={() => getCity(address?.state)}
            onChange={(event: any, newValue: any) => {
              setAddress({
                ...address,
                city: newValue as string,
              }),
                setErrors({
                  ...errors,
                  city: false,
                })
            }}
            renderInput={(params: any) => (
              <AutoCompleteInput
                {...params}
                variant="standard"
                placeholder={address?.city || PLACEHOLDERS?.CITY}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password",
                }}
                error={errors?.city && errors?.city}
                helperText={errors?.city && ERROR_MESSAGES?.empty_city_error}
              />
            )}
            getOptionLabel={(option: any) => option}
            sx={{
              width: "100%",
            }}
          />
        </Grid>
      </Grid>
    </Stack>
  )
}

export default AddAddress
