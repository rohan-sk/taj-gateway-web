import {
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
} from "@mui/material"
import { useContext } from "react"
import AccountStore from "../../../../features/my-account/store/pageStore/account.store"
import { PageContext } from "../../../../PresentationalComponents/lib/prepare-page-context"
import { PAGE_STORES } from "../../../../utils/Constants"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import OverViewGiftCardComponent from "./common/over-view-gift-card.component"
import {
  NoBookingsSection,
  NoBookingsSectionText,
  OverViewSectionsTitle,
  TitleWrapper,
} from "../styles/render-over-view"
import { ViewAllLink } from "../../booking-history/booking-styles"
import { CONSTANTS, OVER_VIEW_GIFT_CARDS } from "../../../constants"
import { observer } from "mobx-react-lite"
import { useMobileCheck } from "../../../../utils/isMobilView"
import {
  OverviewLoadMoreButton,
  StyledAccordion,
  StyledAccordionDetails,
} from "./styles/over-view-membership-card"
import { ExpandMoreIcon } from "../../../header/styles/booking-menu"

const OverViewGiftCard = ({ index, title }: any) => {
  const isMobile = useMobileCheck()
  const pageContextUse = useContext(PageContext)
  const accountStore: any = pageContextUse?.getPageStore(
    PAGE_STORES.ACCOUNT_STORES.myAccountStore
  ) as AccountStore
  const GiftCardPurchasedData =
    accountStore?.myAccountData?.giftCards?.data?.filter(
      (card: any) => card.orderType === CONSTANTS?.GIFT_CARD_PURCHASE
    )
  const handleRedirect = () => {
    //adding +1 for index to match with left side tabs index
    let indexValue = index + 1
    const selectedTab = accountStore?.tabsData?.data?.[indexValue]
    accountStore?.updateCurrentTab({
      index: indexValue,
      value: selectedTab?.title,
      key: selectedTab?.tabKey,
    })
    accountStore?.updateCurrentTabViewer({
      data: selectedTab,
    })
    if (window.scrollY) {
      window.scroll(0, 200) // reset the scroll position to the top left of the document.
    }
  }

  return (
    <>
      {isMobile ? (
        <StyledAccordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon style={{ fontSize: "20px" }}/>}>
            <OverViewSectionsTitle>{title}</OverViewSectionsTitle>
          </AccordionSummary>
          <StyledAccordionDetails $mobile={isMobile}>
            <Grid
              container
              marginTop={isMobile ? "5.469vw" : ""}
              justifyContent={"space-between"}
              rowGap={isMobile ? "5.469vw" : "2.083vw"}>
              {GiftCardPurchasedData?.length > 0 ? (
                <>
                  {GiftCardPurchasedData?.slice(0, 2)?.map(
                    (item: any, id: number) => (
                      <Grid
                        item
                        xs={12}
                        sm={isMobile ? 12 : 5.774}
                        md={5.774}
                        lg={5.774}
                        xl={5.774}
                        key={id}>
                        <OverViewGiftCardComponent {...item} />
                      </Grid>
                    )
                  )}
                </>
              ) : (
                <NoBookingsSection $mobile={isMobile}>
                  <NoBookingsSectionText $mobile={isMobile}>
                    {OVER_VIEW_GIFT_CARDS}
                  </NoBookingsSectionText>
                </NoBookingsSection>
              )}
            </Grid>
            <Grid container justifyContent={"center"}>
              <OverviewLoadMoreButton
                onClick={handleRedirect}
                variant="outlined">
                {CONSTANTS?.VIEW_ALL}
              </OverviewLoadMoreButton>
            </Grid>
          </StyledAccordionDetails>
        </StyledAccordion>
      ) : (
        <Box>
          <TitleWrapper>
            <OverViewSectionsTitle>{title}</OverViewSectionsTitle>
            {GiftCardPurchasedData?.length > 0 && (
              <ViewAllLink onClick={handleRedirect} variant="link-m">
                {CONSTANTS?.VIEW_ALL}
              </ViewAllLink>
            )}
          </TitleWrapper>
          <Grid
            container
            justifyContent={"space-between"}
            rowGap={isMobile ? "5.469vw" : "2.083vw"}>
            {GiftCardPurchasedData?.length > 0 ? (
              <>
                {GiftCardPurchasedData?.slice(0, 2)?.map(
                  (item: any, id: number) => (
                    <Grid
                      item
                      xs={12}
                      sm={isMobile ? 12 : 5.774}
                      md={5.774}
                      lg={5.774}
                      xl={5.774}
                      key={id}>
                      <OverViewGiftCardComponent {...item} />
                    </Grid>
                  )
                )}
              </>
            ) : (
              <NoBookingsSection $mobile={isMobile}>
                <NoBookingsSectionText $mobile={isMobile}>
                  {OVER_VIEW_GIFT_CARDS}
                </NoBookingsSectionText>
              </NoBookingsSection>
            )}
          </Grid>
        </Box>
      )}
    </>
  )
}

export default observer(OverViewGiftCard)
