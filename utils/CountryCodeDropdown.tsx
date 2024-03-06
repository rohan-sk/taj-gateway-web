import { MenuItem, Box } from "@mui/material"
import data from "../mock-data/CountriesDialCodes.json"
import DesktopPxToVw, { MobilePxToVw } from "./DesktopFontCalc"
import { useMobileCheck } from "./isMobilView"
import { theme } from "../lib/theme"
import { Fragment, useRef, useState } from "react"
import { CountryCodeArrowIcon, CountryTitle, CustomArrowIcon, CustomSelect } from "./style"

const CountryCodeDropdown = ({
  isDisable,
  countryCode,
  setCountryCode,
  backgroundColor = "transparent",
  dropdownStyle,
  iconStyle,
  titleStyles,
  customSelectStyles,
  parentStyles,
  menuItemStyles,
  isCustomizedArrow = false,
  openingDelay,
  onOpen,
  scroll,
  onClose,
  menuHeight,
  setUserCode,
  fontSize,
  onSelectChange,
  selectedCountry,
  setNumber,
}: any) => {
  const [countrySelected, setCountrySelected] = useState<string>(selectedCountry || "")
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
  const dropdownRef = useRef<any>(null)

  function handleChange(event: any) {
    setCountryCode(event.target.value)
    setNumber && setNumber("")
    onSelectChange && onSelectChange()
  }

  function handleSelect(codes: any) {
    setCountrySelected(codes)
    setUserCode && setUserCode(codes)
  }

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

  const isMobile = useMobileCheck()
  return (
    <Box sx={{ ...parentStyles }} ref={dropdownRef}>
      <CustomSelect
        sx={{
          ...customSelectStyles,
          "& .MuiTypography-root": {
            fontSize: `${fontSize} !important`,
          },
        }}
        open={dropdownOpen}
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
        renderValue={(selected: any) => {
          const selectedCountry: any = data?.filter((data: any) => {
            if (countrySelected) {
              return data?.code === countrySelected
            } else {
              return selected === data?.dial_code
            }
          })
          return (
            <Fragment>
              <Box
                component="img"
                alt="country-flag"
                src={selectedCountry?.[0]?.image}
                width={isMobile ? "4.5vw" : DesktopPxToVw(30)}
              />
              <CountryTitle
                variant="body-m"
                sx={{
                  paddingLeft: "4px",
                  ...titleStyles,
                  fontSize: fontSize,
                }}>
                {selected}
              </CountryTitle>
            </Fragment>
          )
        }}
        $backgroundColorProp={backgroundColor}
        IconComponent={(props) => (
          <Box onClick={() => !isDisable && setDropdownOpen(true)} sx={{ cursor: "pointer" }}>
            {isCustomizedArrow ? (
              <CountryCodeArrowIcon fontSize="small" {...props} sx={{ ...iconStyle }} />
            ) : (
              <Box
                sx={{
                  ...iconStyle,
                }}>
                <CustomArrowIcon fontSize="small" />
              </Box>
            )}
          </Box>
        )}
        disabled={isDisable}
        variant="standard"
        value={countryCode}
        onChange={handleChange}
        MenuProps={{
          PaperProps: {
            elevation: 0,
            sx: {
              maxHeight: menuHeight ?? 300,
              width: DesktopPxToVw(120), // "120px",
              backgroundColor: theme?.palette?.background?.default,
              borderRadius: "0",
              boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
              ...dropdownStyle,
            },
          },
        }}>
        {data?.map((itemCode: any, index: number) => {
          return (
            <MenuItem
              onClick={(event: any) => handleSelect(itemCode?.code)}
              key={itemCode?.dial_code}
              value={itemCode?.dial_code}
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center !important",
                paddingLeft: "30px",
                height: "50px",
                ...menuItemStyles,
              }}>
              <Box
                component="img"
                alt="country-flag"
                src={itemCode?.image}
                width={isMobile ? "6vw" : DesktopPxToVw(30)}
              />
              <CountryTitle variant="body-m" sx={{ width: isMobile ? MobilePxToVw(70) : DesktopPxToVw(70) }}>
                {itemCode?.dial_code}
              </CountryTitle>
              <CountryTitle variant="body-m">{itemCode?.name}</CountryTitle>
            </MenuItem>
          )
        })}
      </CustomSelect>
    </Box>
  )
}
export default CountryCodeDropdown
