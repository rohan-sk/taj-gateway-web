import { FilledInput, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { theme } from "../../lib/theme"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import { InputLabelTextStyle } from "../forms/business-form/business-sme-form"
import { CustomSelect } from "../../utils/style"

const DropDown = ({ value, setValue, items, placeholder, width, name, validationField }: any) => {
  const onChangeHandler = (event: any) => {
    setValue(event.target.value)
  }
  return (
    <FormControl sx={{ width: width ? width : "100%" }} variant="standard">
      <InputLabelTextStyle>{value === null ? placeholder : ""}</InputLabelTextStyle>
      <CustomSelect
        MenuProps={{
          disableScrollLock: true,
          sx: {
            "&& .Mui-selected": {
              backgroundColor: theme?.palette?.ihclPalette?.hexOne,
            },
          },
        }}
        name={name ? name : ""}
        value={value}
        placeholder={placeholder}
        onChange={validationField ? (validationField === true ? setValue : onChangeHandler) : onChangeHandler}>
        {items?.map((item: any, index: number) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </CustomSelect>
    </FormControl>
  )
}
export default DropDown
