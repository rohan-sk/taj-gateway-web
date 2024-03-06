import React from "react"
import dynamic from "next/dynamic"
const RenderEpicureSelectableTabs = dynamic(
  () =>
    import("../../features/loyalty/UI/render-epicure-selectable-tabs.component")
)
const SSOLoginFormTabsModal = dynamic(
  () => import("../Login/SSOLoginForm/SSOLoginFormTabsModal")
)

const ManageGiftCardsTabsComponent = dynamic(
  () => import("../MyAccount/GiftCard/manage-gift-cards-tabs-component")
)
const BasicTabs = dynamic(() => import("./basic-tab-component"))
const ToggleTabs = dynamic(() => import("./toggle-tabs.component"))
const ManageTabsComponent = dynamic(() => import("./manage-tabs.component"))
const RenderAccountTabs = dynamic(
  () => import("../MyAccount/render-account-tabs")
)
const TabWithSelectionTick = dynamic(
  () => import("./tab-with-selection-tick.component")
)
const TabsComponent = dynamic(
  () => import("../Login/InitialScreen/tabs-component.component")
)
const GiftCardManageTabsComponent = dynamic(
  () => import("./gift-card/gift-card-manage-tabs.component")
)
const FindYourBookingTabsComponent = dynamic(
  () => import("./find-your-booking-tabs-component")
)
const LoyaltyChambersTabs = dynamic(() => import("./loyalty-chambers-tabs"))

const RenderTabsComponent = (props: any) => {
  const variant = props?.variant

  switch (variant) {
    case "default":
      return <BasicTabs {...props} />
    case "bookings.tabs.bookings":
      return <ToggleTabs {...props} />
    case "authentication.sso-tabs":
      return <SSOLoginFormTabsModal {...props} />
    case "authentication.sso-multiple-tabs":
      return <TabsComponent {...props} />
    case "giftCards.tabs.manage-card-multiple-tabs":
      return <GiftCardManageTabsComponent {...props} />
    case "authentication.tabs.address-tabs":
      return <ManageTabsComponent {...props} />
    case "myAccount.tabs.account-and-preferences-tabs":
      return <RenderAccountTabs {...props} />
    case "bookings.tabs.selectable-buttons":
      return <TabWithSelectionTick {...props} />
    case "myAccount.tabs.manage-gift-card":
      return <ManageGiftCardsTabsComponent {...props} />
    case "myAccount.tabs.find-booking-tabs":
      return <FindYourBookingTabsComponent {...props} />
    case "loyalty.tabs.chambers-tabs":
      return <LoyaltyChambersTabs {...props} />
    case "loyalty.tabs.selectable-buttons":
      return <RenderEpicureSelectableTabs props={props} />
    default:
      return <></>
  }
}

export default RenderTabsComponent
