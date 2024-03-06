import { AccordionSummary, Grid } from "@mui/material"
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react"
import { CONSTANTS, OVER_VIEW_VOUCHERS } from "../../constants"
import { MobileCenteredViewAllLink, ViewAllLink } from "../booking-history/booking-styles"
import { useMobileCheck } from "../../../utils/isMobilView"
import { ExpandMoreIcon } from "../../header/styles/booking-menu"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import OverViewVouchersCard from "./over-view-vouchers-card.component"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import {
  ButtonWrapper,
  NoBookingsSection,
  NoBookingsSectionText,
  OverViewSectionsTitle,
  TitleWrapper,
  ViewMoreButton,
} from "./styles/render-over-view"
import {
  StyledAccordion,
  StyledAccordionDetails,
} from "./OverViewGiftCard/styles/over-view-membership-card"
import fetchVoucherImg from "../../../utils/fetchVoucherImg"
import { observer } from "mobx-react-lite"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { UserAccountStore } from "../../../store"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import AccountStore from "../../../features/my-account/store/pageStore/account.store"

const OverViewVouchers = ({ title, index }: any) => {
  const isMobile = useMobileCheck()
  const globalContext = useContext(IHCLContext)
  const pageContextUse = useContext(PageContext)
  const [voucherData, setVoucherData] = useState<any>()
  const [accountOverView, setAccountOverView] = useState<any>()

  const accountStore = globalContext?.getGlobalStore(
    GLOBAL_STORES.userAccountStore
  ) as UserAccountStore
  const { updateCurrentTab, updateCurrentTabViewer, tabsData }: any =
    pageContextUse?.getPageStore(
      PAGE_STORES.ACCOUNT_STORES.myAccountStore
    ) as AccountStore
  const accountOverViewVouchersData = accountStore?.myAccountVouchersData

  useMemo(() => {
    setAccountOverView(
      accountOverViewVouchersData?.chamber?.pendingVouchers?.[0]?.length > 1
        ? accountOverViewVouchersData?.chamber?.pendingVouchers?.[0]?.slice(0, 2)
        : accountOverViewVouchersData?.chamber?.pendingVouchers?.[0]?.length === 1
        ? {
            ...accountOverViewVouchersData?.chamber?.pendingVouchers?.[0],
            ...accountOverViewVouchersData?.epicure?.pendingVouchers?.[0]?.[0],
          }
        : accountOverViewVouchersData?.epicure?.pendingVouchers?.[0]?.slice(0, 2)
    )
  }, [
    accountOverViewVouchersData?.chamber?.pendingVouchers,
    accountOverViewVouchersData?.epicure?.pendingVouchers,
  ])

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
  }

  const handleVoucherImg = useCallback(async () => {
    let response: any
    if (accountOverView?.length > 1) {
      response = await fetchVoucherImg(
        accountOverView?.[0]?.productName,
        accountOverView?.[1]?.productName
      )
    } else if (accountOverView?.length > 0) {
      response = await fetchVoucherImg(accountOverView?.[0]?.productName)
    }
    setVoucherData(response?.[0])
  }, [accountOverView])

  useEffect(() => {
    handleVoucherImg()
  }, [handleVoucherImg])

  return (
    <>
      {isMobile ? (
        <>
          <StyledAccordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{ fontSize: "20px" }} />}
            >
              <OverViewSectionsTitle>{title}</OverViewSectionsTitle>
            </AccordionSummary>
            {accountOverView?.length > 0 ? (
              <>
                <Grid
                  container
                  sx={{
                    marginBottom: isMobile
                      ? MobilePxToVw(25)
                      : DesktopPxToVw(0),
                    marginTop:isMobile ? MobilePxToVw(35) : DesktopPxToVw(0)
                  }}
                >
                  {accountOverView?.map((item: any, index: any) => (
                    <Grid key={index} item md={12} sm={12} xs={12}>
                      <OverViewVouchersCard
                        accountOverView={item}
                        voucherData={voucherData}
                      />
                    </Grid>
                  ))}
                  {accountOverView?.length > 0 && (
                  <ButtonWrapper container>
                  <ViewMoreButton 
                  variant="light-outlined"
                  onClick={()=>handleRedirect()}>{CONSTANTS?.VIEW_ALL}</ViewMoreButton>
                  </ButtonWrapper> 
              )}
                </Grid>
              </>
            ) : (
              <StyledAccordionDetails $mobile={isMobile}>
                <Grid>
                  <NoBookingsSection $mobile={isMobile}>
                    <NoBookingsSectionText $mobile={isMobile}>
                      {OVER_VIEW_VOUCHERS}
                    </NoBookingsSectionText>
                  </NoBookingsSection>
                </Grid>
              </StyledAccordionDetails>
            )}
            
          </StyledAccordion>
        </>
      ) : (
        <>
          <TitleWrapper>
            <OverViewSectionsTitle
              mt={isMobile ? "" : DesktopPxToVw(61.5)}
              mb={isMobile ? "" : DesktopPxToVw(16)}
            >
              {title}
            </OverViewSectionsTitle>
            {/* Add Conditional Rendering based on total number of membership's */}
            {accountOverView?.length > 0 && (
              <ViewAllLink variant="link-m" onClick={() => handleRedirect()}>
                {CONSTANTS?.VIEW_ALL}
              </ViewAllLink>
            )}
          </TitleWrapper>
          {accountOverView?.length > 0 ? (
            <>
              <Grid container sx={{marginBottom:DesktopPxToVw(80)}}>
                {accountOverView?.slice(0, 2)?.map((item: any, index: any) => (
                  <Grid
                    key={index}
                    item
                    md={5.8}
                    sm={5.8}
                    xs={5.8}
                    lg={5.8}
                    marginRight={index === 0 ? DesktopPxToVw(30) : "0vw"}
                    gap={DesktopPxToVw(30)}
                  >
                    <OverViewVouchersCard
                      accountOverView={item}
                      voucherData={voucherData}
                    />
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <>
              <Grid sx={{marginBottom:DesktopPxToVw(100)}}>
                <NoBookingsSection $mobile={isMobile}>
                  <NoBookingsSectionText $mobile={isMobile}>
                    {OVER_VIEW_VOUCHERS}
                  </NoBookingsSectionText>
                </NoBookingsSection>
              </Grid>
            </>
          )}
        </>
      )}
    </>
  )
}

export default observer(OverViewVouchers)
