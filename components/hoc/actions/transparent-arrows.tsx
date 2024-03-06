import { Box, Typography } from "@mui/material"
import { ICONS } from "../../constants"
import { triggerEvent } from "../../../utils/analytics"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { GAStore, UserStore } from "../../../store"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { useContext } from "react"
import { useMobileCheck } from "../../../utils/isMobilView"
import { getCookie } from "../../../utils/cookie"
import { MemberDataLayer } from "../../../utils/analytics/member-data-layer"

export function PrevArrow(props: any) {
  const { handleClick, onClick, styles, prevArrowTitle, titleColor, GoldColorPrevIcon, items, data } = props
  const IHCLContexts = useContext(IHCLContext)
  const userStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore

  const context = useContext(IHCLContext)
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(userStore, gaStoreData)
  const handleLeftSwipe = () => {
    triggerEvent({
      action: "leftSwipe",
      params: {
        ...dataLayer,
        eventType: "",
        eventName: "",
        clientId: getCookie("_ga")?.slice(6),
        event: "leftSwipe",
        location: "",
        eventPlace: "",
        eventTicketsQty: "",
        eventDate: "",
        item_name: prevArrowTitle || "",
        item_type: items?._type || data?._type,
        no_of_items: items?.items?.length || data?.items?.length,
        widget_title: items?.title?.desktopTitle || data?.title?.desktopTitle || "",
        widget_description: items?.subTitle || data?.subTitle || "",
        widget_type: items?._type || data?._type,
        pageSection: items?.title?.desktopTitle || data?.title?.desktopTitle || "",
      },
    })
  }
  return (
    <Box
      sx={{
        zIndex: 1,
        width: "23%",
        height: "34.1vw",
        display: "flex",
        position: "absolute",
        alignItems: "center",
        ...styles,
      }}>
      {GoldColorPrevIcon ? (
        <Box
          component={"img"}
          src={ICONS?.PREV_GOLD_COLOR_ARROW}
          alt={`GoldColorPrevIcon`}
          onClick={() => {
            onClick()
            handleClick && handleClick()
            handleLeftSwipe()
          }}
          sx={{
            width: "3.125vw",
            height: "3.125vw",
            cursor: "pointer",
            marginLeft: "4.166vw",
          }}
        />
      ) : (
        <Box
          component="img"
          sx={{
            width: "3.125vw",
            height: "3.125vw",
            cursor: "pointer",
            marginLeft: "4.166vw",
          }}
          src={ICONS?.TRANSPARENT_ARROW_LEFT}
          onClick={() => {
            onClick()
            handleClick && handleClick()
            handleLeftSwipe()
          }}
        />
      )}
      <Typography
        variant="heading-xs"
        sx={{
          width: "15vw",
          color: titleColor ? titleColor : "#FFFFFF",
          textAlign: "left",
          whiteSpace: "normal",
          paddingLeft: "2.1vw",
          paddingRight: "2.1vw",
          wordWrap: "break-word",
        }}>
        {prevArrowTitle}
      </Typography>
    </Box>
  )
}

export function NextArrow(props: any) {
  const { handleClick, onClick, styles, nextArrowTitle, titleColor, GoldColorNextIcon, items, data } = props
  const IHCLContexts = useContext(IHCLContext)
  const userStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const context = useContext(IHCLContext)
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(userStore, gaStoreData)
  const handleRightSwipe = () => {
    triggerEvent({
      action: "rightSwipe",
      params: {
        ...dataLayer,
        eventType: "",
        eventName: "",
        clientId: getCookie("_ga")?.slice(6),
        event: "rightSwipe",
        location: "",
        eventPlace: "",
        eventTicketsQty: "",
        eventDate: "",
        item_name: nextArrowTitle || "",
        item_type: items?._type || data?._type,
        no_of_items: items?.items?.length || data?.items?.length,
        widget_title: items?.title?.desktopTitle || data?.title?.desktopTitle || "",
        widget_description: items?.subTitle || data?.subTitle || "",
        widget_type: items?._type || data?._type,
        pageSection: items?.title?.desktopTitle || data?.title?.desktopTitle || "",
      },
    })
  }
  return (
    <Box
      sx={{
        top: 0,
        right: 0,
        width: "23%",
        height: "34.1vw",
        display: "flex",
        position: "absolute",
        alignItems: "center",
        ...styles,
      }}>
      <Typography
        variant="heading-xs"
        sx={{
          width: "15vw",
          color: titleColor ? titleColor : "#FFFFFF",
          textAlign: "right",
          paddingLeft: "2.1vw",
          paddingRight: "2.1vw",
          whiteSpace: "normal",
          wordWrap: "break-word",
        }}>
        {nextArrowTitle}
      </Typography>
      {GoldColorNextIcon ? (
        <Box
          component={"img"}
          src={ICONS?.NEXT_GOLD_COLOR_ARROW}
          alt={`GoldColorNextIcon`}
          onClick={() => {
            onClick()
            handleClick && handleClick()
            handleRightSwipe()
          }}
          sx={{
            width: "3.125vw",
            height: "3.125vw",
            cursor: "pointer",
            marginRight: "4.166vw",
          }}
        />
      ) : (
        <Box
          component="img"
          sx={{
            width: "3.125vw",
            height: "3.125vw",
            cursor: "pointer",
            marginRight: "4.166vw",
          }}
          src={ICONS?.TRANSPARENT_ARROW_RIGHT}
          onClick={() => {
            onClick()
            handleClick && handleClick()
            handleRightSwipe()
          }}
        />
      )}
    </Box>
  )
}
