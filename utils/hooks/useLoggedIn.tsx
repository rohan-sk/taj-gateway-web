import { useState, useEffect, useContext } from "react"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../Constants"
import { UserStore } from "../../store"

export const useLoggedIn = () => {
  const context = useContext(IHCLContext)
  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const userHash = global?.window?.localStorage?.getItem("customerHash")
  const [isLoggedIn, setIsLoggedIn] = useState(
    userStore?.userDetails?.userHash.length > 0 || userHash !== null ? true : false,
  )
  const [isClientLoaded, setIsClientLoaded] = useState<boolean>(false)

  useEffect(() => {
    setIsClientLoaded(true)
    if (userStore?.userDetails?.userHash.length > 0 || userHash !== null) setIsLoggedIn(true)
    else setIsLoggedIn(false)
  }, [userStore?.userDetails?.userHash, userHash])

  return isClientLoaded && isLoggedIn
}
