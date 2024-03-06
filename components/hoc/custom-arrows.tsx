import { Typography } from "@mui/material"
import { triggerEvent } from "../../utils/analytics"
import { GLOBAL_STORES } from "../../utils/Constants"
import { GAStore, UserStore } from "../../store"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { useContext } from "react"
import { getCookie } from "../../utils/cookie"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"

export function CustomPrevArrow(props: any) {
  const { className, style, onClick, cssData, isPrev = true, prevArrowTitle, items, disabled = false } = props

  const IHCLContexts = useContext(IHCLContext)
  const userStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore

  const context = useContext(IHCLContext)
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(userStore, gaStoreData)
  const handleLeftSwipe = () => {
    const type = items?.map((item?: any, index?: number) => {
      return item?._type
    })
    triggerEvent({
      action: "leftSwipe",
      params: {
        ...dataLayer,
        eventType: "",
        eventName: "",
        visitSource: "",
        clientId: getCookie("_ga")?.slice(6),
        event: "leftSwipe",
        location: "",
        eventPlace: "",
        eventTicketsQty: "",
        eventDate: "",
        item_name: prevArrowTitle || "",
        item_type: type?.[0] || "",
        no_of_items: items?.length || "",
      },
    })
  }
  return (
    <div
      className={className}
      style={{
        ...style,
        ...cssData,
        display: disabled ? "none" : "flex",
        cursor: "pointer",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
        backgroundSize: "contain",
      }}
      onClick={() => {
        isPrev && onClick()
        handleLeftSwipe()
      }}>
      <Typography
        variant="heading-xs"
        sx={{
          color: "#FFFFFF",
          minWidth: "13vw",
          textAlign: "left",
          marginLeft: "18vw",
          whiteSpace: "normal",
          wordWrap: "break-word",
        }}>
        {prevArrowTitle}
      </Typography>
    </div>
  )
}
export function CustomNextArrow(props: any) {
  const { className, style, onClick, cssData, isNext = true, nextArrowTitle, items, disabled } = props

  const IHCLContexts = useContext(IHCLContext)
  const userStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore

  const context = useContext(IHCLContext)
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(userStore, gaStoreData)
  const handleRightSwipe = () => {
    const type = items?.map((item?: any, index?: number) => {
      return item?._type
    })
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
        item_type: type?.[0] || "",
        no_of_items: items?.length || "",
      },
    })
  }
  return (
    <div
      className={className}
      style={{
        ...style,
        ...cssData,
        display: disabled ? "none" : "flex",
        cursor: "pointer",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
        backgroundSize: "contain",
      }}
      onClick={() => {
        isNext && onClick()
        handleRightSwipe()
      }}>
      <Typography
        variant="heading-xs"
        sx={{
          width: "11vw",
          color: "#FFFFFF",
          textAlign: "right",
          whiteSpace: "normal",
          marginLeft: "-16.33vw",
          wordWrap: "break-word",
        }}>
        {nextArrowTitle}
      </Typography>
    </div>
  )
}
