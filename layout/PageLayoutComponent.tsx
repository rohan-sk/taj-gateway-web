import React, { useContext, useEffect, useMemo } from "react"
import dynamic from "next/dynamic"
import { ROUTES } from "../utils/routes"
import { observer } from "mobx-react-lite"
import Modal from "../components/hoc/tdlModal"
import PageComponent from "../components/page"
import { RenderFooterComponent } from "../components/footer"
import { RenderHeaderComponent } from "../components/header"
import { fireViewAnalytics } from "../utils/analytics/view-event"
import { analyticsPageview } from "../utils/analytics"
import { PageContext, PageContextProps, preparePageContext } from "../PresentationalComponents/lib/prepare-page-context"
import { IHCLContext } from "../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../utils/Constants"
import OffersStore from "../store/global/offers.store"
import { BrandRestaurantStore, HamperStore, HolidayStore, UserStore } from "../store"
import { AuthTokenVerifier } from "../utils/sso/authTokenVerifier"
import RestaurantStore from "../store/global/restaurant.store"
import DestinationStore from "../store/global/destination.store"
import { randomStr } from "../utils/analytics/generateClientId"
import { getCookie, setCookie } from "../utils/cookie"
import { GAStore, PropertyStore } from "../store"
import { useRouter } from "next/router"
import LoyaltyGlobalStore from "../features/loyalty/store/globalStore/loyalty-global-store"
import GCStore from "../features/gc/store/pageStore/gc.store"
import BlogStore from "../features/blog/store/blog.store"
import AnalyticsScrollComponent from "../utils/analytics/AnalyticsScrollComponent"
import { useMediaQuery } from "@mui/material"

const RenderBottomNavItems = dynamic(() => import("../components/BottomNav"))

interface PageLayoutProps {
  bannerTitle: string
  bannerLogo: string
  queryParams: any
  data: any
  propertyData: any
  offersData?: any
  vouchersData?: any
  restaurantData?: any
  destinationData?: any
  brandRestaurantData?: any
  holidayData?: any
  hamperData?: any
  epicureData?: any
  epicureMembershipData?: any
  epicureProgramData?: any
  gcData?: any
  blogData?: any
  articleTags?: any
  articleThemes?: any
  blogListingData?: any
  epicureTermsAndConditionsData?: any
}

const PageLayoutComponent = ({
  data: { footer = [], header = [], pageBody = [] } = {},
  bannerTitle,
  bannerLogo,
  queryParams,
  propertyData,
  offersData,
  vouchersData,
  restaurantData,
  destinationData,
  brandRestaurantData,
  holidayData,
  hamperData,
  epicureData,
  epicureMembershipData,
  epicureProgramData,
  gcData,
  blogData,
  articleTags,
  articleThemes,
  blogListingData,
  epicureTermsAndConditionsData,
}: PageLayoutProps) => {
  const Context = useContext(IHCLContext)
  //global Offers store
  const offersStoreData = Context?.getGlobalStore(GLOBAL_STORES.offerStore) as OffersStore
  const propertyStore = Context?.getGlobalStore(GLOBAL_STORES.propertyStore) as PropertyStore
  const restaurantStore = Context?.getGlobalStore(GLOBAL_STORES.restaurantStore) as RestaurantStore
  const pageStoreData = Context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const destinationStore = Context?.getGlobalStore(GLOBAL_STORES.destinationStore) as DestinationStore
  const brandRestaurantStore = Context?.getGlobalStore(GLOBAL_STORES.brandRestaurantStore) as BrandRestaurantStore
  const userStore = Context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const holidayStore = Context?.getGlobalStore(GLOBAL_STORES.holidayStore) as HolidayStore
  const hamperStore = Context?.getGlobalStore(GLOBAL_STORES.hamperStore) as HamperStore
  const epicureGlobalStore = Context?.getGlobalStore(GLOBAL_STORES.loyaltyGlobalStore) as LoyaltyGlobalStore
  const gcStore = Context?.getGlobalStore(GLOBAL_STORES.gcStore) as GCStore
  const blogStore = Context?.getGlobalStore(GLOBAL_STORES.blogStore) as BlogStore
  const router = useRouter()
  const pageContextAdditionalData = useMemo<PageContextProps>(
    () => preparePageContext(pageBody.connectedStores),
    [pageBody],
  )

  const isMobile = useMediaQuery("(max-width:641px)")

  useEffect(() => {
    const handleRouteChange = () => {
      const previousPath = localStorage?.getItem("previousPageURL") ?? ""
      const previousTitle = localStorage?.getItem("previousPageTitle") ?? ""
      analyticsPageview(
        global?.window?.location?.href,
        pageBody?.title,
        pageBody?.variant,
        previousPath,
        previousTitle,
        global?.window?.localStorage?.getItem("customerHash")
          ? global?.window?.localStorage?.getItem("customerHash")?.toString()
          : "",
        global?.window?.localStorage?.getItem("customerHash") ? "neupass" : "",
      )
      global?.window?.localStorage?.setItem("previousPageTitle", pageBody?.title)
    }
    if (document.readyState === "complete") {
      handleRouteChange()
    } else {
      window.addEventListener("load", handleRouteChange)
      return () => document.removeEventListener("load", handleRouteChange)
    }

    const setPage = () => {
      window?.localStorage?.setItem("previousPageURL", global?.window?.location?.href)
    }

    router.events.on("routeChangeComplete", setPage)

    return () => {
      router.events.off("routeChangeComplete", setPage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const pageContext = useMemo(
    () => ({
      ...pageContextAdditionalData,
      queryParams,
      pageBody,
    }),
    [queryParams, pageBody, pageContextAdditionalData],
  )

  const handleOnView = (props: any, ref: any) => {
    fireViewAnalytics(props, ref)
  }

  let headingData = {
    pageHeaderVariant: pageBody?.pageHeaderVariant,
    pageTitle: pageBody?.title,
    pageDescription: "",
    headerBackgroundVariant: pageBody?.headerBGVariant,
    ...header,
  }
  let pageData = {
    pageTitle: pageBody?.title,
    pageDescription: pageBody?.description,
  }
  pageData && pageStoreData?.setPageData(pageData)
  propertyData && propertyStore?.setPropertyData(propertyData)
  restaurantData && restaurantStore?.setRestaurantData(restaurantData)
  destinationData && destinationStore?.setDestinationData(destinationData)
  brandRestaurantData && brandRestaurantStore?.setBrandRestaurantData(brandRestaurantData)
  holidayData && holidayStore?.setHolidayData(holidayData)
  if (global?.window?.location?.pathname === ROUTES.HOMEPAGE) {
    global?.window?.localStorage?.getItem("guestCustomerHash") &&
      global?.window?.localStorage?.removeItem("guestCustomerHash")
  }
  offersData && offersStoreData?.setOffersData(offersData.data, offersData.filters)
  hamperData && hamperStore?.setHamperData(hamperData)

  gcData && gcStore?.setStoreData(gcData)
  epicureTermsAndConditionsData && epicureGlobalStore?.updateEpicureTermsAndConditonsData(epicureTermsAndConditionsData)
  vouchersData && offersStoreData?.setVouchersData(vouchersData)
  if (epicureData || epicureMembershipData || epicureProgramData) {
    epicureGlobalStore.updateEpicurePageData(epicureData || epicureMembershipData || epicureProgramData)
  }
  if (gcData) {
    gcStore?.setStoreData(gcData)
  }
  if (blogData) {
    blogStore?.setBlogData(blogData)
  }
  if (articleTags) {
    blogStore?.setBlogArticleTags(articleTags)
  }
  if (articleThemes) {
    blogStore?.setBlogArticleThemes(articleThemes)
  }
  if (blogListingData) {
    blogStore?.setBlogListingData(blogListingData)
  }
  if (epicureTermsAndConditionsData) {
    epicureGlobalStore?.updateEpicureTermsAndConditonsData(epicureTermsAndConditionsData)
  }

  useEffect(() => {
    if (!getCookie("clientID")) {
      setCookie("clientID", randomStr(), 365)
    }
  }, [])

  useEffect(() => {
    if (global?.window?.location?.search?.includes("authCode")) {
      AuthTokenVerifier(userStore, router)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <PageContext.Provider value={pageContext}>
        <Modal />
        <AnalyticsScrollComponent title={pageBody?.title || ""} variant={pageBody?.variant || ""} isMobile={isMobile} />
        <RenderHeaderComponent headerData={headingData} />
        <PageComponent {...pageBody} viewEventCallback={handleOnView} isMobile={isMobile} />
        <RenderFooterComponent footerData={footer} showBottomNavigation={pageBody?.showBottomNavigation} />
        {isMobile && pageBody?.showBottomNavigation === true && <RenderBottomNavItems props={pageBody} />}
      </PageContext.Provider>
    </>
  )
}

export default observer(PageLayoutComponent)
