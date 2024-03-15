import { Box } from "@mui/material"
import { ICONS } from "../components/constants"
import { Error_icon } from "../components/forms/gift-card-form/constants"

export const CalenderIcon = ({ sx }: any) => {
  return <Box component={"img"} loading="lazy" src={ICONS?.CALENDER_ICON} alt={`CalendarIcon`} sx={{ ...sx }} />
}

export const CalenderIconSvg = ({ sx }: any) => {
  return <Box component={"img"} loading="lazy" src={ICONS?.CALENDER_SVG} alt={`CalendarIcon`} sx={{ ...sx }} />
}

export const AccountCalenderIcon = ({ sx }: any) => {
  return <Box component={"img"} loading="lazy" src={ICONS?.ACCOUNT_CALENDER_ICON} alt={`CalendarIcon`} sx={{ ...sx }} />
}

export const GateWayLargeLogo = ({ sx, ...rest }: any) => {
  return (
    <Box loading="lazy" component={"img"} src={ICONS?.TAJ_GATEWAY_LOGO} alt={`desktop logo`} sx={{ ...sx }} {...rest} />
  )
}

export const GateWayLargeLogoSecondary = ({ sx, ...rest }: any) => {
  return (
    <Box
      loading="lazy"
      component={"img"}
      src={ICONS?.TAJ_GATEWAY_LOGO_SECONDARY}
      alt={`desktop logo`}
      sx={{ ...sx }}
      {...rest}
    />
  )
}
export const GateWayMobileLogoSecondary = ({ sx, ...rest }: any) => {
  return (
    <Box
      loading="lazy"
      component={"img"}
      src={ICONS?.TAJ_GATEWAY_LOGO_MOBILE}
      alt={`mobile logo`}
      sx={{ ...sx }}
      {...rest}
    />
  )
}
export const CloseIconWhite = ({ sx, ...rest }: any) => {
  return (
    <Box loading="lazy" component={"img"} src={ICONS?.CLOSE_ICON_WHITE} alt={`CalendarIcon`} sx={{ ...sx }} {...rest} />
  )
}

export const GoldColorPrevIcon = () => {
  return (
    <Box
      loading="lazy"
      component={"img"}
      src={ICONS?.PREV_GOLD_COLOR_ARROW}
      alt={`GoldColorPrevIcon`}
      width={"100%"}
      height={"100%"}
    />
  )
}

export const GoldColorNextIcon = () => {
  return (
    <Box
      loading="lazy"
      component={"img"}
      src={ICONS?.NEXT_GOLD_COLOR_ARROW}
      alt={`GoldColorNextIcon`}
      width={"100%"}
      height={"100%"}
    />
  )
}

export const HamburgerIcon = ({ sx, ...rest }: any) => {
  return <Box component={"img"} loading="lazy" src={ICONS?.HAMBURGER_ICON} sx={{ ...sx }} {...rest} alt={"menu-icon"} />
}
export const HamburgerGoldIcon = () => {
  return (
    <Box
      component={"img"}
      loading="lazy"
      src={ICONS?.HAMBURGER_GOLD_ICON}
      alt={"menu-icon"}
      width={"100%"}
      height={"100%"}
    />
  )
}
export const ButtonTickIcon = ({ sx }: any) => {
  return <Box component={"img"} loading="lazy" src={ICONS?.BUTTON_TICK_ICON} alt={`tick-icon`} sx={{ ...sx }} />
}

export const SearchIcon = ({ sx }: any) => {
  return <Box component={"img"} loading="lazy" src={ICONS?.SEARCH_ICON} alt={`Search Icon`} sx={{ ...sx }} />
}

export const ModalCloseIcon = ({ sx }: any) => {
  return <Box component={"img"} loading="lazy" src={ICONS?.CLOSE_ICON_WHITE} alt={`close icon`} sx={{ ...sx }} />
}
export const QuoteIcon = ({ sx }: any) => {
  return <Box component={"img"} loading="lazy" src={ICONS?.QUOTE_ICON} alt={`close icon`} sx={{ ...sx }} />
}

export const WarningIcon = ({ sx }: any) => {
  return <Box component={"img"} loading="lazy" src={ICONS?.WARNING_ICON} alt={`warning icon`} sx={{ ...sx }} />
}

export const SuccessIcon = ({ sx }: any) => {
  return <Box component={"img"} loading="lazy" src={ICONS?.SUCCESS_TICK} alt={`success icon`} sx={{ ...sx }} />
}

export const CommonSearchIcon = ({ sx }: any) => {
  return <Box component={"img"} loading="lazy" src={ICONS?.COMMON_ICON} alt={`common search icon`} sx={{ ...sx }} />
}

export const ErrorIcon = ({ sx }: any) => {
  return (
    <Box
      component={"img"}
      loading="lazy"
      src={Error_icon}
      alt={`error-icon`}
      width={"100%"}
      height={"100%"}
      sx={{ ...sx }}
    />
  )
}
export const UploadCloudIcon = (rest: any) => {
  return <Box {...rest} component={"img"} loading="lazy" src={ICONS?.UPLOAD_CLOUD_ICON} alt={`CalendarIcon`} />
}

export const ShareIcon = () => {
  return <Box alt="share-icon" width={"100%"} loading="lazy" height={"100%"} component={"img"} src={ICONS?.MAIL_ICON} />
}

export const GoldMailShareIcon = ({ sx, ...rest }: any) => {
  return (
    <Box
      loading="lazy"
      alt="share-icon"
      width={"100%"}
      height={"100%"}
      component={"img"}
      src={ICONS?.GOLD_MAIL_SHARE_ICON}
      sx={{ ...sx }}
      {...rest}
    />
  )
}

// update icon from figma
export const PrintIcon = ({ sx, ...rest }: any) => {
  return (
    <Box
      loading="lazy"
      alt="print-icon"
      width={"100%"}
      height={"100%"}
      component={"img"}
      src={ICONS?.MAIL_ICON}
      sx={{ ...sx }}
      {...rest}
    />
  )
}

export const GoldPrintIcon = ({ sx, ...rest }: any) => {
  return (
    <Box
      loading="lazy"
      alt="print-icon"
      width={"100%"}
      height={"100%"}
      component={"img"}
      src={ICONS?.GOLD_PRINT_ICON}
      sx={{ ...sx }}
      {...rest}
    />
  )
}
export const DocumentIcon = (rest: any) => {
  return <Box {...rest} alt="document-icon" loading="lazy" component={"img"} src={ICONS?.DOCUMENT_ICON} />
}
export const CloseIcon = (rest: any) => {
  return <Box {...rest} alt="close-icon" loading="lazy" component={"img"} src={ICONS?.SEARCH_FIELD_CLOSE_ICON} />
}

export const SelectedIcon = (rest: any) => {
  return <Box {...rest} alt="selected-icon" loading="lazy" component={"img"} src={ICONS.SELECTED_ICON} />
}

export const PlusIcon = ({ sx, ...rest }: any) => {
  return <Box alt="plus-icon" component={"img"} loading="lazy" src={ICONS.PLUS_ICON} sx={{ ...sx }} {...rest} />
}

export const MinusIcon = ({ sx, ...rest }: any) => {
  return <Box alt="minus-icon" component={"img"} loading="lazy" src={ICONS.MINUS_ICON} sx={{ ...sx }} {...rest} />
}

export const SearchIcon2 = ({ sx, ...rest }: any) => {
  return <Box alt="search-icon" component={"img"} loading="lazy" src={ICONS.SEARCH_ICON_2} sx={{ ...sx }} {...rest} />
}

export const ClockIcon = ({ sx, ...rest }: any) => {
  return <Box alt="clock-icon" component={"img"} loading="lazy" src={ICONS.CLOCK} sx={{ ...sx }} {...rest} />
}

export const SuccessTickIcon = ({ sx, ...rest }: any) => {
  return <Box alt="tick-icon" loading="lazy" component={"img"} src={ICONS.SUCCESS_TICK_ICON} sx={{ ...sx }} {...rest} />
}

export const ShareMessengerIcon = ({ sx, ...rest }: any) => {
  return (
    <Box
      loading="lazy"
      width={"100%"}
      height={"100%"}
      component={"img"}
      alt="messenger-icon"
      src={ICONS.SHARE_MESSENGER_ICON}
      sx={{ ...sx }}
      {...rest}
    />
  )
}

export const ShareWattsAppIcon = ({ sx, ...rest }: any) => {
  return (
    <Box
      loading="lazy"
      width={"100%"}
      height={"100%"}
      component={"img"}
      alt="whatsapp-icon"
      src={ICONS.SHARE_WHATSAPP_ICON}
      sx={{ ...sx }}
      {...rest}
    />
  )
}

export const ShareMailIcon = ({ sx, ...rest }: any) => {
  return (
    <Box
      loading="lazy"
      width={"100%"}
      height={"100%"}
      alt="mail-icon"
      component={"img"}
      src={ICONS.SHARE_MAIL_ICON}
      sx={{ ...sx }}
      {...rest}
    />
  )
}

export const ConfirmationMailShareIcon = ({ sx, ...rest }: any) => {
  return (
    <Box
      loading="lazy"
      width={"100%"}
      height={"100%"}
      component={"img"}
      alt="mail-share-icon"
      src={ICONS?.CONFIRMATION_MAIL_SHARE_ICON}
      sx={{ ...sx }}
      {...rest}
    />
  )
}

export const GoldTickCircleIcon = ({ sx, ...rest }: any) => {
  return (
    <Box
      loading="lazy"
      width={"100%"}
      height={"100%"}
      component={"img"}
      alt="gold-tick-cirle-icon"
      src={ICONS?.SVG_TICK_MARK}
      sx={{ ...sx }}
      {...rest}
    />
  )
}
export const GoldMoreIcon = ({ sx, ...rest }: any) => {
  return <Box component={"img"} loading="lazy" alt="gold-more-icon" src={ICONS?.MORE_ICON} sx={{ ...sx }} {...rest} />
}
export const WhiteDownloadIcon = ({ sx }: any) => {
  return <Box component={"img"} loading="lazy" src={ICONS?.SEARCH_ICON} alt={`Search Icon`} sx={{ ...sx }} />
}

export const DropDownArrow = ({ sx }: any) => {
  return <Box component={"img"} loading="lazy" src={ICONS?.DROP_DOWN_ICON} alt={`drop-down-icon`} sx={{ ...sx }} />
}

export const UserProfileIcon = ({ sx }: any) => {
  return <Box component={"img"} loading="lazy" src={ICONS?.USER_PROFILE} alt={`user-profile-icon`} sx={{ ...sx }} />
}

export const SortIcon = ({ sx }: any) => {
  return <Box component={"img"} loading="lazy" src={ICONS?.SORT_ICON} alt={`sort-icon`} sx={{ ...sx }} />
}
