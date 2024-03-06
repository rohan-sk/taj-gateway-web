import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { ROUTES } from "../utils/routes"
import dynamic from "next/dynamic"
const LoadingSpinner = dynamic(() => import("../utils/SpinnerComponent"))
import { PathType } from "../types"

function RouteGuard({ children }: any) {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.basePath + router.asPath)

    // on route change start - hide page content by setting authorized to false and show loader
    const hideContent = () => setAuthorized(false)
    router.events.on("routeChangeStart", hideContent)

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck)

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent)
      router.events.off("routeChangeComplete", authCheck)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function authCheck(url: any) {
    // redirect to Homepage page if accessing a protected page and not logged in
    const protectedPaths = [ROUTES.MY_ACCOUNT.OVERVIEW, ROUTES.MY_ACCOUNT.BOOKING_DETAILS]
    const path = url.split("?")[0]
    if (protectedPaths.includes(path) && !global?.window?.localStorage?.getItem("customerHash")) {
      setAuthorized(false)
      router.push({
        pathname: ROUTES.WITHOUTSEO_FOR_ROUTING.HOMEPAGE,
        query: {
          redirectUrl: router.asPath,
          pathUrl: ROUTES?.WITHOUTSEO_FOR_ROUTING?.SSO?.LOGIN,
          redirectionType: PathType?.dialog,
        },
      })
    } else {
      setAuthorized(true)
    }
  }
  return (
    <>
      {!authorized && <LoadingSpinner />}
      {children}
    </>
  )
}
export default RouteGuard
