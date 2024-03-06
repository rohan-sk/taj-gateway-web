import React, { useContext } from "react"
import { UserStore } from "../../../store"
import { observer } from "mobx-react-lite"
import { Typography } from "@mui/material"
import { ROUTES } from "../../../utils/routes"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { useMobileCheck } from "../../../utils/isMobilView"
import { BoxWrapper, UserName } from "../my-account.styles"
import { LOG_OUT } from "../../forms/gift-card-form/constants"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"

const AccountHeaderLogout = () => {
  const isMobile = useMobileCheck()
  const IHCLContexts = useContext(IHCLContext)
  const userStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore

  const CustomerHash = global?.localStorage?.getItem("customerHash")
  const userName =
    global?.window?.localStorage?.getItem("userFirstName") || userStore?.userDetails?.firstName
  return (
    <BoxWrapper aria-label="AccountHeaderLogout">
      {userName && (
        <UserName
          sx={{
            maxWidth:
              userName?.length > 40 ? (isMobile ? MobilePxToVw(400) : DesktopPxToVw(500)) : "100%",
          }}
          variant={isMobile ? "m-body-sl" : "body-ml"}>{`HELLO! ${userName}`}</UserName>
      )}
      {CustomerHash && (
        <Typography
          variant={isMobile ? "m-text-link" : "link-m"}
          onClick={() => {
            userStore?.userLogout()
            localStorage.clear(),
              userStore?.setUserDetailsStore("", "", "", "", "", "", "", "", "", ""),
              userStore?.clearUserMobileNumber(),
              userStore?.clearUserCountryCode(),
              userStore?.clearUserEmailID(),
              userStore?.clearUserEnteredRegistrationMobileNumber(),
              userStore?.updateUserEnteredMemberID(""),
              window?.location?.assign(ROUTES.HOMEPAGE)
          }}>
          {LOG_OUT}
        </Typography>
      )}
    </BoxWrapper>
  )
}

export default observer(AccountHeaderLogout)
