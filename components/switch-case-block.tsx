import dynamic from "next/dynamic"
import { Fragment, useContext } from "react"
import DefaultEpicureMemberCase from "./SwitchCase/defaultEpicureMemberCase"
import { IHCLContext } from "../PresentationalComponents/lib/prepare-ihcl-context"

const LoyaltyDefaultSwitchCase = dynamic(
  () => import("../features/loyalty/UI/epicure-default-switch-case")
)
const SwitchCaseDefaultComponent = dynamic(() => import("./SwitchCase"))
const BookingsMainContentComponent = dynamic(
  () => import("../features/booking/ui/bookings-main-content.component")
)
const DefaultPaymentsSwitchCaseComponent = dynamic(
  () => import("./SwitchCase/DefaultPaymentsSwitchCaseComponent")
)
const CancelOrderStatusModalSwitchCase = dynamic(
  () =>
    import(
      "../features/my-account/ui/cancel-order-status-switch-case.component"
    )
)

const SubscriptionSwitchCase = dynamic(
  () => import("../components/SwitchCase/defaultSubscriptionSwitchCase")
)
const LoyaltyUserLoginSwitchCase = dynamic(
  () => import("./SwitchCase/switch-case-block-loyalty-user-login")
)

const SwitchCaseForBothWebAndMobileComponent = dynamic(
  () => import("./SwitchCase/switch-case-for-both-web-and-mobile-component"),
)
export function SwitchCaseBlock(props: any) {
  const { variant } = props
  const context = useContext(IHCLContext)

  const renderVariants: any = () => {
    switch (variant) {
      case "bookings.switchCaseBlock.default":
        return <BookingsMainContentComponent {...props} />
      case "ihcl.core.default-switch-case":
        return <SwitchCaseDefaultComponent {...props} />
      case "ihcl.core.switchCaseBlock.payments":
        return <DefaultPaymentsSwitchCaseComponent {...props} />
      case "myAccount.switchCaseBlock.booking-status":
        return <CancelOrderStatusModalSwitchCase {...props} />
      case "notifications.switchCaseBlock.user-subscription-case":
        return <SubscriptionSwitchCase {...props} />
      case "loyalty.switchCaseBlock.membership-login":
        return <DefaultEpicureMemberCase props={props} />
      case "loyalty.switchCaseBlock.loyalty-user-login":
        return <LoyaltyUserLoginSwitchCase props={props} />
      case "loyalty.switchCaseBlock.epicure-purchase-journey":
        return <LoyaltyDefaultSwitchCase props={props} />
      case "aboutUs.switchCaseBlock.web-and-mobile":
        return <SwitchCaseForBothWebAndMobileComponent {...props} />

      default: {
        const DefaultComponent: any =
          context?.getSwitchCaseVariant(variant) || (() => null)
        return <DefaultComponent {...props} />
      }
    }
  }

  return <Fragment>{renderVariants()}</Fragment>
}
