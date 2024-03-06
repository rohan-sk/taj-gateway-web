import React, { Fragment, useContext, useEffect } from "react"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { Box } from "@mui/material"
import { GLOBAL_STORES } from "../../utils/Constants"
import { UserStore } from "../../store"

const DefaultSubscriptionSwitchCase = (props: any) => {
  const { cases, defaultCase } = props
  const context = useContext(IHCLContext)
  const accessToken =
    (global?.localStorage?.getItem("accessToken") || "")?.length > 0

  //global user store
  const userStore = context?.getGlobalStore(
    GLOBAL_STORES.userStore
  ) as UserStore

  const SubscriptionKey = () => {
    if (userStore?.subscribedSuccessfully) {
      if (accessToken && userStore?.alreadySubscribed) {
        return "KNOWN_USER_SUBSCRIBED"
      } else if (accessToken && !userStore?.alreadySubscribed) {
        return "KNOWN_USER_NOT_SUBSCRIBED"
      } else if (!accessToken && !userStore?.alreadySubscribed) {
        return "ANONYMOUS_USER_NOT_SUBSCRIBED"
      } else {
        return "ANONYMOUS_USER_SUBSCRIBED"
      }
    } else {
      return "SUBSCRIPTION_FAILED"
    }
  }

  const currentCase = cases?.filter(
    ({ value }: any, index: number) => value === SubscriptionKey()
  )
  return (
    <>
      {context?.renderComponent(currentCase?.[0]?.item?.[0]?._type, {
        ...currentCase?.[0]?.item?.[0],
      })}
    </>
  )
}

export default DefaultSubscriptionSwitchCase
