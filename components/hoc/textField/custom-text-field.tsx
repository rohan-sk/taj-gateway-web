import React, { useState } from "react"
import { CustomTextFieldStyled } from "./styles"
import { InputAdornment } from "@mui/material"
import { SuccessIcon, WarningIcon } from "../../../utils/customIcons"

const CustomTextField = ({
  value,
  name,
  error,
  label,
  helperText,
  onChange,
  placeholder,
  showAdornment,
  width,
  maxLength,
  onInput,
  type,
  disabled,
  multiline,
  rows,
  inputFieldStyles,
  autoComplete = "off",
  fontSize,
  helperTextFontSize,
  fontWeight,
  onKeyDown,
  labelFontSize,
  ...rest
}: any) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <CustomTextFieldStyled
      $fontWeight={fontWeight}
      $fontSize={fontSize}
      $helperTextFontSize={helperTextFontSize}
      autoComplete={autoComplete == "on" ? "on" : "off"}
      multiline={multiline}
      rows={rows}
      disabled={disabled}
      sx={{ width: width || "22.96vw", ...inputFieldStyles }}
      onFocus={() => setIsFocused(true)}
      type={type}
      onBlur={() => setIsFocused(false)}
      onInput={onInput}
      InputProps={
        showAdornment && {
          endAdornment: (
            <InputAdornment position="end">
              {error ? (
                <WarningIcon />
              ) : (
                isFocused && value?.length > 0 && !error && <SuccessIcon />
              )}
            </InputAdornment>
          ),
        }
      }
      variant="standard"
      name={name}
      inputProps={{ maxLength: maxLength }}
      value={value}
      error={error}
      label={label || placeholder}
      $labelFontSize={labelFontSize}
      helperText={helperText}
      onChange={onChange}
      onKeyDown={onKeyDown}
      {...rest}
    />
  )
}

export default CustomTextField
