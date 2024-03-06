import React, { useContext, useEffect, useRef } from "react"
import { AccordionSummary, Grid } from "@mui/material"
import AccountStore from "../../../features/my-account/store/pageStore/account.store"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import Bookings from "../booking-history/bookings.component"
import { CONSTANTS, NO_ORDERS_AVAILABLE } from "../../constants"
import {
  NoBookingsSection,
  NoBookingsSectionText,
  OverViewSectionsTitle,
  TitleWrapper,
  ButtonWrapper,
  ViewMoreButton,
} from "./styles/render-over-view"
import { ViewAllLink } from "../booking-history/booking-styles"
import { useMobileCheck } from "../../../utils/isMobilView"
import { StyledAccordion, StyledAccordionDetails } from "./OverViewGiftCard/styles/over-view-membership-card"
import { ExpandMoreIcon } from "../../header/styles/booking-menu"
import { observer } from "mobx-react-lite"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { UserAccountStore } from "../../../store"
import { useRouter } from "next/router"
import DesktopPxToVw from "../../../utils/DesktopFontCalc"
import LoadingSpinner from "../../../utils/SpinnerComponent"

const OverViewBooking = ({ title, variant, index, primaryAction }: any) => {
  const pageContextUse = useContext(PageContext)
  const isMobile = useMobileCheck()
  const scrollRef: any = useRef(null)
  const router = useRouter()

  const { myAccountData, updateCurrentTab, updateCurrentTabViewer, tabsData }: any = pageContextUse?.getPageStore(
    PAGE_STORES.ACCOUNT_STORES.myAccountStore,
  ) as AccountStore

  const globalContext = useContext(IHCLContext)

  const accountStore: any = globalContext?.getGlobalStore(GLOBAL_STORES.userAccountStore) as UserAccountStore

  const currentDate = new Date()
  myAccountData?.hotelBookings?.data?.map((item: any) => {
    const checkoutDate = item?.orderLineItems?.[0]?.hotel?.rooms?.map((item: any) => item?.checkOut)
    new Date(checkoutDate).getTime() > new Date(currentDate).getTime()
  })

  useEffect(() => {
    accountStore?.fetchUserOverviewData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const parts = router?.asPath.split("?")
    const newURL = parts[0]
    if (router?.query?.tab !== undefined) {
      handleRedirect()
    }
    return () => {
      if (router?.query?.tab !== undefined) {
        router.push(newURL, undefined, { shallow: true })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router?.query?.tab])

  const handleRedirect = () => {
    //adding +1 for index to match with left side tabs index
    let indexValue = index + 1
    const selectedTab = tabsData?.data?.[indexValue]
    updateCurrentTab({
      index: indexValue,
      value: selectedTab?.title,
      key: selectedTab?.tabKey,
    })
    updateCurrentTabViewer({
      data: selectedTab,
    })
    if (isMobile) {
      scrollRef.current.scrollIntoView({
        block: "start",
        inline: "nearest",
        behavior: "smooth",
      })
    }
  }

  const upcomingBookings = accountStore?.myAccountOverview?.hotelBookings?.upComingBookings

  return (
    <>
      {isMobile ? (
        <StyledAccordion ref={scrollRef}>
          <AccordionSummary expandIcon={<ExpandMoreIcon style={{ fontSize: "20px" }} />}>
            <OverViewSectionsTitle>{title}</OverViewSectionsTitle>
          </AccordionSummary>
          <StyledAccordionDetails $mobile={isMobile}>
            {accountStore?.upComingBookingsLoading ? (
              <LoadingSpinner />
            ) : (
              <Grid sx={{ paddingTop: isMobile ? "5.43vw" : "0vw" }}>
                {upcomingBookings?.length > 0 ? (
                  <>
                    {upcomingBookings?.map((item: any, index: number) => (
                      <Bookings bookingData={item} key={index} primaryAction={primaryAction} />
                    ))}
                  </>
                ) : (
                  <NoBookingsSection $mobile={isMobile}>
                    <NoBookingsSectionText $mobile={isMobile}>{NO_ORDERS_AVAILABLE}</NoBookingsSectionText>
                  </NoBookingsSection>
                )}

                {accountStore?.myAccountOverview?.hotelBookings?.upComingCount > 2 && (
                  <ButtonWrapper container>
                    <ViewMoreButton variant="light-outlined" onClick={() => handleRedirect()}>
                      {CONSTANTS?.VIEW_ALL}
                    </ViewMoreButton>
                  </ButtonWrapper>
                )}
              </Grid>
            )}
          </StyledAccordionDetails>
        </StyledAccordion>
      ) : (
        <>
          <TitleWrapper>
            <OverViewSectionsTitle mt={isMobile ? "" : DesktopPxToVw(0)} mb={isMobile ? "" : DesktopPxToVw(16)}>
              {title}
            </OverViewSectionsTitle>

            {accountStore?.myAccountOverview?.hotelBookings?.upComingCount > 2 && (
              <ViewAllLink variant="link-m" onClick={() => handleRedirect()}>
                {CONSTANTS?.VIEW_ALL}
              </ViewAllLink>
            )}
          </TitleWrapper>
          {accountStore?.upComingBookingsLoading ? (
            <LoadingSpinner
              componentLevel={true}
              containerStyle={{ height: DesktopPxToVw(360), backgroundColor: "transparent" }}
            />
          ) : (
            <Grid>
              {upcomingBookings?.length > 0 ? (
                <>
                  {upcomingBookings?.map((item: any, index: number) => (
                    <Bookings bookingData={item} key={index} primaryAction={primaryAction} />
                  ))}
                </>
              ) : (
                <NoBookingsSection $mobile={isMobile}>
                  <NoBookingsSectionText $mobile={isMobile}>{NO_ORDERS_AVAILABLE}</NoBookingsSectionText>
                </NoBookingsSection>
              )}
            </Grid>
          )}
        </>
      )}
    </>
  )
}

export default observer(OverViewBooking)
