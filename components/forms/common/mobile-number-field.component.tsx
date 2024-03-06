import { Stack } from "@mui/material"
import { ErrorMessageTypography, InputTextField } from "./styles"
import CountryCodeDropdown from "../../../utils/CountryCodeDropdown"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../../utils/isMobilView"
import { theme } from "../../../lib/theme"
import { useState } from "react"
import { acceptOnlyNumbers, restrictNumericSymbol } from "../book-a-stay-form/utils"
import { FormErrorIcon } from "./form-components"
import { handleMobileNumber } from "./utils/mobileNumberHandler"

type MobileNumberFieldType = {
  value: any
  name: string
  formState: any
  helperText: string
  countryCode: string
  placeholder: string
  errorState: boolean
  setErrorState: Function
  setFormState: Function
  setCountryCode: Function
  disable?: boolean
  dropDownStyle?: any
  color?: string
}

const MobileNumberField = ({
  name,
  value,
  formState,
  errorState,
  helperText,
  placeholder,
  setFormState,
  setErrorState,
  setCountryCode,
  disable = false,
  dropDownStyle = {},
  countryCode = "+91",
  color = theme?.palette?.ihclPalette?.hexSeventeen,
}: MobileNumberFieldType) => {
  const isMobile = useMobileCheck()

  //states
  const [userCode, setUserCode] = useState<string>("IN")

  const handleUserCode = (code: string) => {
    setUserCode(code)
    value &&
      handleMobileNumber(
        {
          target: {
            value,
          },
        },
        code,
        countryCode,
        setFormState,
        name,
        setErrorState,
      )
  }

  let getBgColor = theme?.palette?.background?.paper
  const inputStyle = {
    WebkitBoxShadow: `0 0 0 1000px ${getBgColor} inset !important`,
  }

  return (
    <Stack sx={{ width: "100%" }}>
      <Stack flexDirection={"row"}>
        <CountryCodeDropdown
          isDisable={disable}
          isCustomizedArrow={true}
          parentStyles={{
            "& *": {
              color: `${color} !important`,
              " &::before, &::after": {
                borderBottomColor: `currentColor !important`,
              },
            },
            minHeight: "2.083vw",
            "@media (max-width:640px)": {
              minHeight: "6.25vw",
            },

            "&, & .MuiSelect-select.MuiSelect-standard.MuiInputBase-input.MuiInput-input, & .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-colorPrimary, & input~div":
              {
                display: "flex",
                alignItems: "center",
                gap: DesktopPxToVw(5),
                height: "2.083vw",
                "@media (max-width:640px)": {
                  minHeight: "6.25vw",
                },
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
            color: `${theme?.palette?.ihclPalette?.hexSeventeen} !important`,
            fontSize: isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
          }}
          countryCode={countryCode}
          setCountryCode={setCountryCode}
          setUserCode={handleUserCode}
          dropdownStyle={{
            width: isMobile ? "75vw" : "17.25vw",
            margin: isMobile ? "0 0 0 10vw" : "0 0 0 5.7vw",
            ...dropDownStyle,
          }}
        />
        <InputTextField
          variant="standard"
          $WebkitBoxShadow={getBgColor}
          placeholder={placeholder}
          disabled={disable}
          type="tel"
          sx={{
            "& *": {
              color: `${color} !important`,
              "&::before, &::after": {
                borderBottomColor: `currentColor !important`,
              },
            },
            "& input, & label": {
              paddingLeft: isMobile ? MobilePxToVw(14) : DesktopPxToVw(24),
            },
          }}
          autoComplete="off"
          value={value}
          name={name}
          onKeyDown={restrictNumericSymbol}
          onChange={(e: any) => {
            acceptOnlyNumbers(e, (e: any) =>
              handleMobileNumber(e, userCode, countryCode, setFormState, name, setErrorState),
            )
          }}
          InputProps={{
            endAdornment: <>{errorState && <FormErrorIcon />}</>,
            style: inputStyle,
            autoComplete: "new-password",
          }}
          inputProps={{ maxLength: countryCode === "+91" ? 10 : 14 }}
        />
      </Stack>
      {errorState && helperText && (
        <Stack sx={{ width: "100%", position: "relative", marginTop: "3px" }}>
          <ErrorMessageTypography sx={{ position: "absolute" }}>{helperText}</ErrorMessageTypography>
        </Stack>
      )}
    </Stack>
  )
}
export default MobileNumberField
