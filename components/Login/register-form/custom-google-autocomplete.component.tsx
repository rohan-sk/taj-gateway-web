import { Box, IconButton } from "@mui/material"
import { useRef, useState } from "react"
import { SearchIcon } from "../../../utils/customIcons"
import { theme } from "../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../../utils/isMobilView"
import GooglePlacesAutocomplete from "react-google-places-autocomplete"
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete"
import { AutocompleteWrapper } from "../Styles/custom-google-autocomplete.styles"

const CustomGoogleAutocomplete = ({
  mapDetails,
  setMapDetails,
  generateAddress,
}: any) => {
  const isMobile = useMobileCheck()
  const googleAutoComplete: any = useRef()

  const [value, setValue] = useState<any>("")
  const getPlaces = (changeProps: any) => {
    setValue(changeProps)
    geocodeByAddress(changeProps?.label)
      .then((results: any) => getLatLng(results[0]))
      .then(({ lat, lng }: any) => {
        setMapDetails({
          ...mapDetails,
          formatted_address: value?.description || "",
          lat: lat,
          lng: lng,
          center: {
            lat: lat,
            lng: lng,
          },
        }),
          generateAddress(lat, lng)
      })
  }

  return (
    <>
      <AutocompleteWrapper>
        <IconButton
          sx={{
            paddingRight: "0 !important",
          }}>
          <SearchIcon
            sx={{
              width: isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
            }}
          />
        </IconButton>
        <Box
          ref={googleAutoComplete}
          sx={{
            width: "100%",
          }}>
          <GooglePlacesAutocomplete
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
            selectProps={{
              label: "value",
              placeholder: "Location",
              onChange: getPlaces,
              styles: {
                input: (provided: any) => ({
                  ...provided,
                  paddingLeft: "0",
                }),
                option: (provided: any) => ({
                  ...provided,
                  fontWeight: 300,
                  opacity: 1,
                  fontSize: isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
                }),

                indicatorsContainer: (provided: any) => ({
                  ...provided,
                  display: "none",
                }),
                placeholder: (provided: any) => ({
                  ...provided,
                  opacity: 1,
                  fontWeight: "300 !important",
                  fontSize: isMobile ? MobilePxToVw(26) : DesktopPxToVw(24),
                  color: theme?.palette?.neuPalette?.hexSeventeen,
                }),
                control: (provided: any) => ({
                  ...provided,
                  border: "none",
                  borderRadius: "none",
                  borderColor: theme?.palette?.neuPalette?.hexEleven,
                  boxShadow: "none",
                  boxShadowBottom: "none",
                  maxWidth: isMobile ? MobilePxToVw(478) : DesktopPxToVw(667),
                  "&:hover": {
                    borderColor: theme?.palette?.neuPalette?.hexEleven,
                  },
                }),
              },
            }}
          />
        </Box>
      </AutocompleteWrapper>
    </>
  )
}

export default CustomGoogleAutocomplete
