import * as React from "react"
import MenuItem from "@mui/material/MenuItem"
import dynamic from "next/dynamic"
import FormControl from "@mui/material/FormControl"
import ListItemText from "@mui/material/ListItemText"
import Select from "@mui/material/Select"
import { Grid, Input } from "@mui/material"
import { StyledInputLabel } from "./khazana-enquiry-form.styles"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import DesktopPxToVw from "../../../../utils/DesktopFontCalc"
import { theme } from "../../../../lib/theme"
import { useMobileCheck } from "../../../../utils/isMobilView"
const CustomCheckBox = dynamic(() =>
import("../../../hoc/CustomCheckBox/Checkbox").then((module) => module.CustomCheckBox)
)

const data = [
  { id: 3, name: "9:00AM - 10:00 AM" },
  { id: 1, name: "10:00AM - 11:00 AM" },
  { id: 2, name: "11:00AM - 12:00 PM" },
  { id: 12, name: "12:00PM - 1:00 PM" },
  { id: 11, name: "1:00PM - 2:00 PM" },
  { id: 10, name: "2:00AM - 3:00 AM" },
]

interface dropDownInterface {
  selectedOptions: any[]
  setSelectedOptions: Function
  dropDownWidth?: string
}
const MultipleSelectDropDown = ({
  selectedOptions,
  setSelectedOptions,
  dropDownWidth,
}: dropDownInterface) => {
  const isMobile = useMobileCheck()
  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event
    let duplicateRemoved: any = []
    value.forEach((item: any) => {
      if (duplicateRemoved.findIndex((e: any) => e.id === item.id) >= 0) {
        duplicateRemoved = duplicateRemoved.filter(
          (entered: any) => entered.id === item.id
        )
      } else {
        duplicateRemoved.push(item)
      }
    })
    setSelectedOptions(duplicateRemoved)
  }
  return (
    <Grid>
      <FormControl fullWidth={isMobile}>
        <StyledInputLabel
          sx={{
            "& .MuiInputBase-root": {
              margin: "12px",
            },
          }}
        >
          {selectedOptions.length > 0 ? "" : "Best Time to Contact*"}
        </StyledInputLabel>
        <Select
          sx={{
            width: dropDownWidth ? dropDownWidth : "18.177vw",
            marginRight: isMobile ? "0vw" : "2vw",
            fontSize: DesktopPxToVw(24),
            "& .MuiSelect-select": {
              "&:focus": {
                backgroundColor: theme?.palette?.background?.default,
              },
              marginBottom: isMobile ? "3vw" : "0vw",
            },
          }}
          multiple
          value={selectedOptions}
          onChange={handleChange}
          IconComponent={() => (
            <KeyboardArrowDownIcon
              sx={{ marginBottom: "0.4vw", cursor: "pointer" }}
            />
          )}
          input={<Input />}
          renderValue={(selected) => selected.map((x: any) => x.name).join(",")}
        >
          {data.map((variant: any, index: number) => (
            <MenuItem
              key={index}
              value={variant}
              sx={{
                display: "flex",
                gap: "1.172vw",
                padding: isMobile ? "2vw" : "1.042vw",
                backgroundColor: `${theme?.palette?.background?.default} !important`,
              }}
            >
              <CustomCheckBox
                withBorder
                name={"terms"}
                onChange={() => {}}
                checked={
                  selectedOptions.findIndex(
                    (item: any) => item.id === variant.id
                  ) >= 0
                }
              />
              <ListItemText primary={variant.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  )
}
export default MultipleSelectDropDown
