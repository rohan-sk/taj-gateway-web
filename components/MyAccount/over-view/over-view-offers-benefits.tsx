import { AccordionSummary, Grid } from "@mui/material"
import React, { useContext } from "react"
import { CONSTANTS, OVER_VIEW_OFFERS } from "../../constants"
import {
  ButtonWrapper,
  NoBookingsSection,
  NoBookingsSectionText,
  OverViewSectionsTitle,
  TitleWrapper,
  ViewMoreButton,
} from "./styles/render-over-view"
import { ViewAllLink } from "../booking-history/booking-styles"
import { useMobileCheck } from "../../../utils/isMobilView"
import {
  StyledAccordion,
  StyledAccordionDetails,
} from "./OverViewGiftCard/styles/over-view-membership-card"
import { ExpandMoreIcon } from "../../header/styles/booking-menu"
import DesktopPxToVw from "../../../utils/DesktopFontCalc"
import OverViewMyAccountCard from "./over-view-myaccount-card.component"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import AccountStore from "../../../features/my-account/store/pageStore/account.store"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import { observer } from "mobx-react-lite"
import { UserAccountStore } from "../../../store"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"

const OverViewOffersBenefits = ({ title, primaryAction }: any) => {
  const isMobile = useMobileCheck()
  const globalContext = useContext(IHCLContext)
  const pageContextUse = useContext(PageContext)
  const { updateCurrentTab, updateCurrentTabViewer, tabsData }: any =
    pageContextUse?.getPageStore(
      PAGE_STORES.ACCOUNT_STORES.myAccountStore
    ) as AccountStore

  const accountStore = globalContext?.getGlobalStore(
    GLOBAL_STORES.userAccountStore
  ) as UserAccountStore
  const overViewOffers = accountStore?.myAccountOffersData

  const handleRedirect = () => {
    //adding +1 for index to match with left side tabs index
    let index = 1
    let indexValue = index + 2
    const selectedTab = tabsData?.data?.[indexValue]
    updateCurrentTab({
      index: indexValue,
      value: selectedTab?.title,
      key: selectedTab?.tabKey,
    })
    updateCurrentTabViewer({
      data: selectedTab,
    })
  }
  return (
    <>
      {isMobile ? (
        <StyledAccordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ fontSize: "20px" }} />}>
            <OverViewSectionsTitle>{title}</OverViewSectionsTitle>
          </AccordionSummary>
          <StyledAccordionDetails $mobile={isMobile}>
            <Grid
              sx={{
                padding: "5.469vw 0 0 2.469vw",
                gap: "5.469vw",
                display: "flex",
                flexDirection: "column",
              }}>
              {overViewOffers?.length > 0 ? (
                overViewOffers
                  ?.slice(0, 2)
                  ?.map((item: any, index: number) => (
                    <OverViewMyAccountCard
                      key={index?.toString()}
                      item={item}
                      indexIdentifier={index?.toString()}
                      primaryAction={primaryAction}></OverViewMyAccountCard>
                  ))
              ) : (
                <NoBookingsSection $mobile={isMobile}>
                  <NoBookingsSectionText $mobile={isMobile}>
                    {OVER_VIEW_OFFERS}
                  </NoBookingsSectionText>
                </NoBookingsSection>
              )}
            </Grid>
          </StyledAccordionDetails>
          {overViewOffers?.length > 2 && (
            <ButtonWrapper sx={{ paddingBottom: "5.469vw" }} container>
              <ViewMoreButton
                variant="light-outlined"
                onClick={() => handleRedirect()}>
                {CONSTANTS?.VIEW_ALL}
              </ViewMoreButton>
            </ButtonWrapper>
          )}
        </StyledAccordion>
      ) : (
        <>
          <TitleWrapper>
            <OverViewSectionsTitle mb={isMobile ? "" : DesktopPxToVw(16)}>
              {title}
            </OverViewSectionsTitle>
            {/* Add Conditional Rendering based on total number of Offers */}
            {overViewOffers?.length > 2 && (
              <ViewAllLink variant="link-m" onClick={() => handleRedirect()}>
                {CONSTANTS?.VIEW_ALL}
              </ViewAllLink>
            )}
          </TitleWrapper>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "2.604vw",
              padding: "1.25vw 0 5.208vw 0",
            }}>
            {overViewOffers?.length > 0 ? (
              overViewOffers
                ?.slice(0, 2)
                ?.map((item: any, index: number) => (
                  <OverViewMyAccountCard
                    key={index?.toString()}
                    item={item}
                    indexIdentifier={index?.toString()}
                    primaryAction={primaryAction}></OverViewMyAccountCard>
                ))
            ) : (
              <NoBookingsSection $mobile={isMobile}>
                <NoBookingsSectionText $mobile={isMobile}>
                  {OVER_VIEW_OFFERS}
                </NoBookingsSectionText>
              </NoBookingsSection>
            )}
          </Grid>
        </>
      )}
    </>
  )
}

export default observer(OverViewOffersBenefits)
