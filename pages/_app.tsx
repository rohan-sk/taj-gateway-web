import { useEffect, useMemo } from "react"
import Head from "next/head"
import dynamic from "next/dynamic"
import { theme } from "../lib/theme"
import RouteGuard from "./routeGuard"
import { useRouter } from "next/router"
import type { AppProps } from "next/app"
import { ThemeProvider } from "@mui/material"
import { GOOGLE_MAPS_SCRIPT } from "../api/api-urls"
import NoInternetConnection from "../utils/no-internet"
import { ApplicationContextWrapper } from "../lib/context"
import buildFeatureRegistry from "../lib/feature-registry"
import ReferenceDataContext from "../components/hoc/ReferenceDataContext"
const PageTransitionLoader = dynamic(() =>
  import("../utils/PageTransitionLoader").then((module) => module.PageTransitionLoader),
)
import { IHCLContext, IHCLContextProps, prepareIHCLContext } from "../PresentationalComponents/lib/prepare-ihcl-context"
import "../styles/globals.css"
import "../styles/spinner.css"
import "slick-carousel/slick/slick.css"
import "react-calendar/dist/Calendar.css"
import "slick-carousel/slick/slick-theme.css"
import "react-date-picker/dist/DatePicker.css"

function TajIhclApp({ Component, pageProps }: AppProps | any) {
  const router = useRouter()
  const Context = useMemo<IHCLContextProps>(() => prepareIHCLContext(buildFeatureRegistry), [])
  let modalDropdownContextData = {}
  const itemValued = useMemo(() => {
    return {
      modalDropdownContextData: {
        title: pageProps?.bannerTitle,
        logo: pageProps?.bannerLogo,
      },
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalDropdownContextData])

  //? Using to get previous page URL
  function storePathValues() {
    const storage: any = globalThis?.sessionStorage
    if (storage && global?.window !== undefined) {
      const prevPath: any = storage?.getItem("currentPath")
      // Set the previous path as the value of the current path.
      if (prevPath) {
        if (prevPath?.includes("/en-in")) {
          //? Removing "/en-in", as it was appending 2 times in the URL when we using router.push
          let modifiedValue = prevPath?.replace("/en-in", "")
          storage?.setItem("prevPath", modifiedValue)
          window?.localStorage?.setItem("prevPageURL", modifiedValue)
        } else {
          storage?.setItem("prevPath", prevPath)
          window?.localStorage?.setItem("prevPageURL", prevPath)
        }
      }
    }
    // Set the current path value by looking at the browser's location object.
    storage?.setItem("currentPath", globalThis?.location?.pathname)
    window?.localStorage?.setItem("currentPageURL", globalThis?.location?.pathname)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => storePathValues, [router.asPath])

  useEffect(() => {
    const loadGooglePlaces = () => {
      new window.google.maps.places.AutocompleteService()
    }

    if (window.google) {
      loadGooglePlaces()
    } else {
      // Wait for the Google Maps API to load
      window.initMap = loadGooglePlaces
      const script = document?.createElement("script")
      script.src = GOOGLE_MAPS_SCRIPT
      document.head.appendChild(script)
    }
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <ThemeProvider theme={theme}>
        <IHCLContext.Provider value={Context}>
          <ReferenceDataContext.Provider value={itemValued}>
            <ApplicationContextWrapper>
              {/* commented page transition loader as i have added route guard */}
              <PageTransitionLoader />
              <RouteGuard>
                <NoInternetConnection>
                  <Component {...pageProps} />
                </NoInternetConnection>
              </RouteGuard>
            </ApplicationContextWrapper>
          </ReferenceDataContext.Provider>
        </IHCLContext.Provider>
      </ThemeProvider>
    </>
  )
}

export default TajIhclApp
