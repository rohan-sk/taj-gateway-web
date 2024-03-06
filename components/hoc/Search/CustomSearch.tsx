import { FormControl, Grid, InputAdornment } from "@mui/material"
import React, { useContext, useState } from "react"
import { StyledField } from "./SearchStyles"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import { useMobileCheck } from "../../../utils/isMobilView"
import { CommonSearchIcon, SearchIcon } from "../../../utils/customIcons"
import { theme } from "../../../lib/theme"
import { getCookie } from "../../../utils/cookie"
import { AFFILIATION } from "../../../utils/analytics/constants"
import { GAStore, UserStore } from "../../../store"
import { MemberDataLayer } from "../../../utils/analytics/member-data-layer"
import { triggerEvent } from "../../../utils/analytics"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../../utils/Constants"

export const CustomSearch = ({
  value,
  setValue,
  placeholder,
  maxWidth,
  floatPosition = "right",
  styles,
  margin,
  disabledProp = false,
  fontSizeProp,
  commonSearchIcon = true,
  backgroundColor,
  textColor = theme?.palette?.neuPalette?.hexSeventeen,
  onChange,
  iconColor,
}: any) => {
  const isMobile = useMobileCheck()
  const [showClearIcon, setShowClearIcon] = useState("none")
  const context = useContext(IHCLContext)
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(UserStore, gaStoreData)
  //Analytics search events on hold for MVP1 .
  // const handleDestinationSearch = (event: any) => {
  //   let isDestination = placeholder === "Destination"
  //   isDestination &&
  //     triggerEvent({
  //       action: "destinationSelected11111",
  //       params: {
  //         ...dataLayer,
  //         destinationSelected: event.target.value,
  //         eventType: "",
  //         eventPlace: "",
  //         eventTicketsQty: "",
  //         eventDate: "",
  //         clientId: getCookie("_ga")?.slice(6),
  //         visitSource: "",
  //         brandName: AFFILIATION,
  //         link_url: "",
  //         link_text: event.target.value,
  //         widget_title: placeholder,
  //         widget_description: "",
  //         widget_type: "",
  //         widget_position: "",
  //         outbound: false,
  //         item_name: event.target.value,
  //         item_type: "",
  //         location: event.target.value || "",
  //       },
  //     })
  // }
  const handleSearch = (event: any) => {
    const { name, value } = event.target
    if (name === "search") {
      setValue(value)
    }
    setShowClearIcon(event.target.value === "" ? "none" : "flex")
    // handleDestinationSearch(event)
  }
  const handleClearSearch = (event: any) => {
    setShowClearIcon("none")
    setValue("")
  }
  let getBgColor = backgroundColor || theme?.palette?.neuPalette?.hexOne
  const inputStyle = {
    WebkitBoxShadow: `0 0 0 1000px ${getBgColor} inset`,
  }

  return (
    <Grid sx={{ width: isMobile ? "100%" : "auto" }}>
      <FormControl
        sx={{
          margin: margin,
          minWidth: maxWidth ? maxWidth : "23.594vw !important",
          float: floatPosition,
        }}>
        <StyledField
          variant="standard"
          autoComplete="off"
          placeholder={placeholder}
          name="search"
          disabled={disabledProp}
          value={value}
          inputProps={{ style: inputStyle }}
          sx={{
            "& .MuiInputBase-root": {
              alignItems: "center",
              "&:after, &:before": {
                borderBottomColor: textColor ? `${textColor} !important` : "",
              },
            },

            "& .MuiInput-input": {
              fontSize: fontSizeProp ? fontSizeProp : "0.938vw",
              boxShadow: "none !important",
              color: textColor,
              "&::placeholder": {
                color: textColor,
                fontSize: fontSizeProp ? fontSizeProp : "0.938vw",
              },
            },
          }}
          onChange={onChange ? onChange : handleSearch}
          // onClick={() => {
          //   handleCitySearch(event)
          // }}
          InputLabelProps={{ style: { fontSize: "2.08vw" } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {commonSearchIcon ? (
                  <CommonSearchIcon
                    sx={{
                      width: isMobile ? "3.906vw" : "1.302vw",
                      height: isMobile ? "3.750vw" : "1.250vw",
                      filter: iconColor ?? textColor ? "invert(1)" : "none",
                    }}
                  />
                ) : (
                  <SearchIcon />
                )}
              </InputAdornment>
            ),
            endAdornment: (
              <>
                {value && (
                  <InputAdornment
                    position="end"
                    style={{ display: showClearIcon }}>
                    <CloseRoundedIcon
                      sx={{ cursor: "pointer" }}
                      onClick={handleClearSearch}
                    />
                  </InputAdornment>
                )}
              </>
            ),
            style: {
              ...styles,
            },
          }}
        />
      </FormControl>
    </Grid>
  )
}
