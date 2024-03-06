import React, { useContext, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { theme } from "../../lib/theme"
import { CONSTANTS, ICONS } from "../constants"
import { Box, Grid } from "@mui/material"
import { observer } from "mobx-react-lite"
import { GLOBAL_STORES, PAGE_STORES } from "../../utils/Constants"
import { useMobileCheck } from "../../utils/isMobilView"
import { FORWARD_RIGHT_ICON, froward_icon } from "../forms/gift-card-form/constants"
import { AccountTabsInterface } from "./personalDetails/personal-details.types"
import AccountStore from "../../features/my-account/store/pageStore/account.store"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import {
  TabBox,
  TabTitle,
  RowStack,
  StyledTab,
  StyledTabs,
  TabListBox,
  StyledImage,
  TabTypography,
  VerticalDivider,
  StyledDownArrow,
  HorizontalDivider,
  MoreLabelTypography,
} from "./my-account.styles"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { UserAccountStore } from "../../store"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"

const BasicModal = dynamic(() => import("../hoc/modal/modal"))
const TabsListInModal = dynamic(() => import("./tabs-modal-component"))
const LoadingSpinner = dynamic(() => import("../../utils/SpinnerComponent"))

const RenderAccountTabs = (props: AccountTabsInterface) => {
  const { title, _key } = props
  const personalDetailsVariant = props?.variant === "myAccount.tabs.account-and-preferences-tabs"
  const isMobile = useMobileCheck()
  const pageContextUse = useContext(PageContext)
  const globalContext = useContext(IHCLContext)
  //store
  const accountStore = pageContextUse?.getPageStore(PAGE_STORES.ACCOUNT_STORES.myAccountStore) as AccountStore

  const globalAccountStore = globalContext?.getGlobalStore(GLOBAL_STORES.userAccountStore) as UserAccountStore

  const membershipRenewalCard = globalAccountStore?.epicureRenewalCards

  const {
    loading,
    currentTab,
    mobileTabsData,
    updateTabsData,
    updateCurrentTab,
    updateMobileTabsData,
    updateCurrentTabViewer,
    setActvieTierLabel,
  } = accountStore

  const [openModel, setOpenModel] = useState<boolean>(false)

  const modifiedTabs = props?.tabs?.map((tab: any) => {
    return {
      ...tab,
      tabKey: _key,
    }
  })

  useEffect(() => {
    props?.tabs?.map((item: any) => {
      if (accountStore.currentTab.index === -1) {
        accountStore?.updateCurrentTab({
          index: 0,
          value: item?.title,
          key: _key,
        })
        updateCurrentTabViewer({ data: item })
        updateTabsData({
          data: modifiedTabs,
        })
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  /**
   * * This useEffect was written to convert the CMS tabs data into required format for mobile site
   */
  useEffect(() => {
    if (props?.tabs) {
      if (props?.tabs) {
        for (const item of props?.tabs) {
          if (mobileTabsData?.filter((data: any) => data?.title == item?.title)?.length === 0) {
            updateMobileTabsData([item, ...mobileTabsData])
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileTabsData])

  const handleChange = (newValue: number, tabName: string, item: any) => {
    updateCurrentTab({
      index: newValue,
      value: tabName,
      key: _key,
    })
    updateCurrentTabViewer({ data: item })
    setActvieTierLabel("")
  }
  const isRenewalPresent = membershipRenewalCard?.length > 0

  const tabsList = props?.tabs?.filter((item: any) => {
    if (!isRenewalPresent) {
      return !item?.identifier?.includes("isMembershipExpired")
    }
    return item
  })

  const renderMobileView = () => {
    const firstTwoArrayElements = mobileTabsData?.slice(0, 2)
    const activeTab: any = mobileTabsData?.find((item: any) => item?.title === currentTab?.value)
    const checkIsActiveTabAvailable = firstTwoArrayElements.includes(activeTab)
    const FinalTabsList = checkIsActiveTabAvailable ? firstTwoArrayElements : [...firstTwoArrayElements, ...[activeTab]]

    const handleModelOpening = () => setOpenModel(!openModel)

    return (
      <Box
        className={"mobile-myaccount-tabs"}
        sx={{
          borderBottom: `1px solid ${theme?.palette?.ihclPalette?.hexSixteen}`,
        }}>
        <TabListBox>
          {FinalTabsList?.map((item: any, index: number) => (
            <RowStack key={index}>
              <TabTypography
                variant="m-body-m"
                color={theme?.palette?.ihclPalette?.hexSeventeen}
                sx={{
                  fontWeight: currentTab?.value === item?.title ? 700 : 300,
                }}
                onClick={() => {
                  index > 1 ? handleModelOpening() : handleChange(index, item.title, item)
                }}>
                {item?.title || CONSTANTS?.MORE}
              </TabTypography>
              {index < 2 && <VerticalDivider flexItem orientation="vertical" />}
            </RowStack>
          ))}
          <RowStack onClick={handleModelOpening}>
            {FinalTabsList.length <= 2 && (
              <MoreLabelTypography variant="m-body-m">{CONSTANTS?.MORE}</MoreLabelTypography>
            )}
            <StyledDownArrow />
          </RowStack>
          {/* <HorizontalDivider /> */}
        </TabListBox>
        {openModel && (
          <BasicModal
            width="100%"
            height="100%"
            open={openModel}
            handleClose={handleModelOpening}
            showLogo={true}
            tajLogoTop={"32px"}
            bgcolor={theme?.palette?.background?.paper}
            CloseIcon={ICONS.CLOSE_GOLD_ICON}
            Component={<TabsListInModal tabs={tabsList} handleModelOpening={handleModelOpening} />}
            mobileTop={`${isMobile ? MobilePxToVw(75) : DesktopPxToVw(75)} !important`}
            iconPosition={"absolute !important"}
            iconRight="9.375vw !important"
          />
        )}
      </Box>
    )
  }

  const renderDesktopView = () => {
    return (
      <>
        {props?.tabs ? (
          <>
            {loading && <LoadingSpinner />}
            <Grid aria-label="account-tabs" sx={{ mb: isMobile ? "0vw" : DesktopPxToVw(10) }}>
              {props?.tabs?.length > 1 && title && <TabTitle>{title}</TabTitle>}
              <StyledTabs>
                <Box>
                  {tabsList?.map((item: any, index: number) => (
                    <TabBox
                      key={index}
                      $index={_key === currentTab?.key && item?.title === currentTab?.value}
                      sx={{
                        minHeight: DesktopPxToVw(51),
                        marginBottom: DesktopPxToVw(20),
                        marginTop: personalDetailsVariant
                          ? index === 0
                            ? DesktopPxToVw(10)
                            : DesktopPxToVw(20)
                          : DesktopPxToVw(0),
                      }}
                      onClick={() => handleChange(index, item?.title, item)}>
                      <StyledTab
                        $index={_key === currentTab?.key && item?.title === currentTab?.value}
                        key={item.title}>
                        {item.title}
                      </StyledTab>
                      {_key === currentTab?.key && item?.title === currentTab?.value && (
                        <Box>
                          <StyledImage
                            height={"0.7vw !important"}
                            component={"img"}
                            alt="icon"
                            src={FORWARD_RIGHT_ICON}
                          />
                        </Box>
                      )}
                    </TabBox>
                  ))}
                </Box>
              </StyledTabs>
            </Grid>
          </>
        ) : (
          <TabTitle>{title}</TabTitle>
        )}
      </>
    )
  }

  return isMobile ? renderMobileView() : renderDesktopView()
}
export default observer(RenderAccountTabs)
