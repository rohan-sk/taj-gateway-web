import { Box, InputAdornment, Select, Stack } from "@mui/material"
import {
  StyledFormControl,
  StyledLabel,
  StyledMenuItem,
} from "./safaris-enquire-form.styles"
import { theme } from "../../../../lib/theme"
import { Error_icon } from "../../gift-card-form/constants"
import { KeyboardArrowDown } from "@mui/icons-material"
import { ErrorTextTypography } from "../../../Login/register-form/register-form.styles"

const FormDropDownComponent = ({
  disable = false,
  name,
  label = "",
  value,
  error,
  onChange,
  styles,
  data,
  helperText,
  placeholder = "",
}: any) => {
  return (
    <Stack width={"100%"}>
      <StyledFormControl variant={"standard"} sx={{ width: "100%", ...styles }}>
        {label && `${value}`?.length === 0 && (
          <StyledLabel>{label}</StyledLabel>
        )}
        <Select
          disabled={disable}
          aria-disabled={disable}
          label={label}
          aria-label={label}
          value={value}
          placeholder={placeholder}
          name={name}
          error={error}
          onChange={onChange ? onChange : () => {}}
          MenuProps={{
            PaperProps: {
              elevation: 0,
              sx: {
                maxHeight: 300,
                backgroundColor: theme?.palette?.background?.default,
                borderRadius: "0",
                boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
              },
            },
          }}
          IconComponent={(props: any) =>
            error ? (
              <InputAdornment position="end">
                <Box component="img" src={Error_icon} alt="Expand Image" />
              </InputAdornment>
            ) : (
              <KeyboardArrowDown
                {...props}
                sx={{
                  color:
                    theme?.palette?.neuPalette?.hexTwentyNine + "!important",
                  fontWeight: 300,
                  cursor: "pointer",
                }}
              />
            )
          }>
          {data?.map((item: any, index: number) => (
            <StyledMenuItem key={index} value={item}>
              {item}
            </StyledMenuItem>
          ))}
        </Select>
      </StyledFormControl>
      {error && helperText && (
        <Stack>
          <ErrorTextTypography>{helperText}</ErrorTextTypography>
        </Stack>
      )}
    </Stack>
  )
}
export default FormDropDownComponent
