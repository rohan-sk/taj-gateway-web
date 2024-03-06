import { useRef, useState } from "react"
import { Select, Stack } from "@mui/material"

import { FormErrorIcon, FormMenuProps, FormSelectArrowIcon } from "./form-components"
import { theme } from "../../../lib/theme"
import { ErrorMessageTypography, StyledFormControl, StyledInputLabel, StyledMenuItem } from "./styles"

const EnquireDropDown = ({
  label,
  value,
  disable = false,
  onChange,
  error = false,
  helperText,
  items,
  name,
  property,
  openingDelay,
  onOpen,
  onClose,
  scroll,
}: any) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
  const dropdownRef = useRef<any>(null)

  const handleScroll = () => {
    dropdownRef?.current?.scrollIntoView({
      block: "center",
      inline: "nearest",
      behavior: "smooth",
    })
    setTimeout(() => {
      setDropdownOpen(true)
    }, openingDelay ?? 500)
  }

  return (
    <Stack sx={{ width: "100%" }} ref={dropdownRef}>
      <StyledFormControl variant="standard" sx={{ width: "100%", "& label": { transform: "unset !important" } }}>
        {(!value || value?.length === 0) && (
          <StyledInputLabel
            sx={{
              color: disable
                ? `${theme?.palette?.neuPalette?.hexSeventeen}38`
                : theme?.palette?.neuPalette?.hexSeventeen,
            }}>
            {label}
          </StyledInputLabel>
        )}
        <Select
          sx={{ width: "100%" }}
          variant="standard"
          value={value}
          open={dropdownOpen}
          name={name}
          autoComplete="off"
          disabled={disable}
          onChange={onChange ? (e: any) => onChange(e) : () => {}}
          IconComponent={error ? FormErrorIcon : FormSelectArrowIcon}
          onOpen={() => {
            scroll ? handleScroll() : onOpen ? onOpen() : setDropdownOpen(true)
          }}
          onClose={() => {
            onClose && onClose()
            setTimeout(() => {
              ;(document?.activeElement as HTMLElement)?.blur()
            }, 0)
            setDropdownOpen(false)
          }}
          MenuProps={FormMenuProps}>
          {items?.map((item: any, index: number) => (
            <StyledMenuItem
              key={index}
              value={property ? item?.[property] : item}
              disabled={property ? item?.disabled : false}>
              {property ? item?.[property] : item}
            </StyledMenuItem>
          ))}
        </Select>
      </StyledFormControl>
      {error && helperText && (
        <Stack sx={{ position: "relative", marginTop: "3px" }}>
          <ErrorMessageTypography sx={{ position: "absolute" }}>{helperText}</ErrorMessageTypography>
        </Stack>
      )}
    </Stack>
  )
}
export default EnquireDropDown
