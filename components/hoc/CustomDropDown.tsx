import { useContext, useRef, useState } from "react"
import { theme } from "../../lib/theme"
import { MenuItem, FormControl, InputLabel, Box } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../utils/isMobilView"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ClearIcon from "@mui/icons-material/Clear"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { triggerEvent } from "../../utils/analytics"
import { GLOBAL_STORES, PAGE_STORES } from "../../utils/Constants"
import { GAStore, UserStore } from "../../store"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { getCookie } from "../../utils/cookie"
import { AFFILIATION, PAGELANG, POWERED_BY_WIDGET } from "../../features/booking/constants"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"

export const CustomDropDown = ({
  data,
  label,
  value,
  margin,
  setValue,
  minWidth,
  placeHolder,
  dropDownStyles,
  fontSize,
  onChange,
  backgroundColor,
  marginBottom,
  isClearIconRequired = false,
  open,
  onOpen,
  onClose,
  scroll,
  openingDelay,
  menuHeight,
  fontWeight,
  isPlaceholder = false,
  selectMarginTop,
}: any) => {
  const isMobile = useMobileCheck()
  const [isInFocus, setIsInFocus] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
  const dropdownRef = useRef<any>(null)
  const Context = useContext(IHCLContext)
  const IHCLContexts = useContext(IHCLContext)
  const navigate = useAppNavigation()
  const userStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  let getBgColor = backgroundColor || theme?.palette?.ihclPalette?.hexOne
  const context = useContext(IHCLContext)
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(userStore, gaStoreData)
  // Need to remove this after getting from cms. Temporary fix for eventname
  const eventName = dataLayer?.pageTitle === "Destinations" ? "citySelected" : "themeSelected"

  const handleChange = (event: SelectChangeEvent) => {
    let isTheme = placeHolder === "Theme"
    let isCapacity = placeHolder === "Capacity"
    let isSeatingStyle = placeHolder === "Seating Style"
    setIsInFocus(false)
    setValue(event.target.value)
    if (isCapacity) {
      triggerEvent({
        action: "capacitySelected",
        params: {
          ...dataLayer,
          eventType: "",
          eventName: "",
          eventPlace: "",
          eventTicketsQty: "",
          eventDate: "",
          clientId: getCookie("_ga")?.slice(6),
          visitSource: "",
          brandName: AFFILIATION,
          link_url: "",
          link_text: event.target.value,
          widget_title: label,
          widget_description: "",
          widget_type: "",
          widget_position: "",
          outbound: false,
          item_name: "",
          item_type: "",
          no_of_items: data?.length,
          capacity: event.target.value,
          location: "",
          buttonLinkName: "",
          offerName: "",
          offerCode: "",
          offerID: "",
          offerCategory: "",
          offerValidity: "",
          specialCode: "",
          pageSection: label,
        },
      })
    } else if (isTheme) {
      triggerEvent({
        action: "themeSelected",
        params: {
          ...dataLayer,
          eventType: "",
          eventName: "",
          eventPlace: "",
          eventTicketsQty: "",
          eventDate: "",
          clientId: getCookie("_ga")?.slice(6),
          visitSource: "",
          brandName: AFFILIATION,
          link_url: "",
          link_text: event.target.value,
          widget_title: label,
          widget_description: "",
          widget_type: "",
          widget_position: "",
          outbound: false,
          item_name: event.target.value,
          item_type: "",
          no_of_items: data?.length,
          location: "",
          theme: event.target.value,
          themeType: event.target.value,
          offerName: "",
          offerCode: "",
          offerID: "",
          offerCategory: "",
          offerValidity: "",
          pageSection: label,
        },
      })
    } else if (isSeatingStyle) {
      triggerEvent({
        action: "seatingStyleSelected",
        params: {
          ...dataLayer,
          eventType: "",
          eventName: "",
          eventPlace: "",
          eventTicketsQty: "",
          eventDate: "",
          clientId: getCookie("_ga")?.slice(6),
          visitSource: "",
          brandName: AFFILIATION,
          link_url: "",
          link_text: "",
          widget_title: label,
          widget_description: "",
          widget_type: "",
          widget_position: "",
          outbound: false,
          item_name: "",
          item_type: "",
          no_of_items: data?.length,
          location: "",
          offerName: "",
          offerCode: "",
          offerID: "",
          offerCategory: "",
          offerValidity: "",
          seatingStyle: event.target.value,
          buttonLinkName: "",
          specialCode: "",
          pageSection: label,
        },
      })
    }
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

  return (
    <FormControl
      variant="standard"
      ref={dropdownRef}
      sx={{
        m: isMobile ? 0 : margin ? margin : 1,
        display: isMobile ? "block" : "auto",
        float: isMobile ? "none" : "right",
        marginBottom: marginBottom ? marginBottom : isMobile ? "3.12vw" : "none",
        "& .MuiSelect-select:focus": {
          backgroundColor: `${getBgColor} !important`,
          margin: isMobile ? "6px 2px" : "4px 0px",
          padding: 0,
        },
        "& .MuiSelect-select": {
          padding: isMobile ? "6px 2px" : "4px 0px",
        },
      }}>
      <InputLabel
        sx={{
          fontFamily: "Inter",
          fontSize: fontSize ? fontSize : "1.25vw",
          fontStyle: "normal",
          fontWeight: fontWeight ? fontWeight : 300,
          lineHeight: "150%",
          transform: isPlaceholder ? "unset !important" : "",
          top: isPlaceholder ? "0.7vw" : "-0.521vw",
          "@media (max-width: 640px)": {
            fontSize: "3.75vw",
            top: isPlaceholder ? "1.8vw" : "-3.125vw",
          },
          color: theme?.palette?.text?.primary,
        }}>
        {placeHolder}
      </InputLabel>
      <Select
        open={dropdownOpen}
        onOpen={() => {
          scroll ? handleScroll() : onOpen ? onOpen() : setDropdownOpen(true)
        }}
        onFocus={() => setIsInFocus(true)}
        onBlur={() => setIsInFocus(false)}
        MenuProps={{
          // disableScrollLock: true,     // commented this as it is behaving weirdly
          PaperProps: {
            sx: {
              maxHeight: menuHeight ? menuHeight : 350,
            },
          },
          sx: {
            "&& .Mui-selected": {
              backgroundColor: theme?.palette?.ihclPalette?.hexOne,
            },
            "& .MuiPaper-rounded": {
              borderRadius: 0,
              backgroundColor: theme?.palette?.background?.default,
              boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
            },
          },
        }}
        onClose={() => {
          onClose && onClose()
          setTimeout(() => {
            ;(document?.activeElement as HTMLElement)?.blur()
          }, 0)
          setDropdownOpen(false)
        }}
        inputProps={{ "aria-label": "Without label" }}
        IconComponent={(props) => (
          <>
            {isClearIconRequired && value && (
              <Box sx={{ cursor: "pointer" }} onClick={() => setValue("")}>
                <ClearIcon />
              </Box>
            )}
            <ExpandMoreIcon {...props} sx={{ cursor: "pointer" }} />
          </>
        )}
        value={value}
        onChange={onChange ? onChange : handleChange}
        label={label}
        sx={{
          width: minWidth ? minWidth : "23.594vw !important",
          marginTop: selectMarginTop ? selectMarginTop : "0.521vw !important",
          "& .MuiSelect-select:focus": {
            backgroundColor: theme?.palette?.background?.paper,
          },
          fontSize: fontSize ? fontSize : DesktopPxToVw(24),
          fontWeight: fontWeight ? fontWeight : 300,
          "@media (max-width: 640px)": {
            fontSize: fontSize ? fontSize : MobilePxToVw(24),
          },
          input: {
            "&::placeholder": {
              textOverflow: "ellipsis !important",
              fontWeight: 300,
              opacity: 1,
            },
          },
          ...dropDownStyles,
        }}>
        {data?.map((item: any, index: number) => {
          return (
            <MenuItem key={index} value={item} sx={{ margin: `${DesktopPxToVw(5)} 0vw`, fontWeight: 300 }}>
              {item}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}
