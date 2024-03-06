import dynamic from "next/dynamic"

const EpicureViewComparision = dynamic(
  () => import("../../features/loyalty/UI/epicure-view-comparision.component")
)
const NudgeWithAction = dynamic(() => import("./nudge-with-action.component"))
const NudgeWithTwoLinks = dynamic(() => import("./nudge-with-two-links-component"))
const ThankYouScreen = dynamic(() => import("../Login/thank-you-screen.component"))
const NudgeWellnessJivaSuccess = dynamic(() => import("./nudge-wellness-jiva-success"))
const AddAddress = dynamic(() => import("../Login/register-form/add-address.component"))
const NudgeCardWithImage = dynamic(() => import("./nudge-with-right-content-with-border"))
const GiftCardPreviewComponent = dynamic(() => import("../card/gift-card-preview.component"))
const GiftCardSummaryComponent = dynamic(() => import("../card/gift-card-summary.component"))
const NudgeWithMailAction = dynamic(() => import("./nudge-with-rounded-mail-action.component"))
const SubscriptionSuccess = dynamic(() => import("./nudge-for-subscription-success.component"))
const PersonalDetails = dynamic(() => import("../Login/register-form/personal-details.component"))
const NudgeWithDualActionsComponent = dynamic(() => import("./nudge-with-dual-actions.component"))
const CancelSuccessModal = dynamic(
  () => import("../../features/my-account/ui/cancel-success-modal.component")
)
const CancelOrderFailureModal = dynamic(
  () => import("../../features/my-account/ui/cancel-failure-modal.component")
)
const NudgeWithPartnerMembership = dynamic(() => import("./nudge-for-partner-membership"))

export const RenderNudgeComponent = (props: any) => {
  const variant = props?.largeVariant

  switch (variant) {
    case "ihcl.core.nudge.navigation":
      return <NudgeWithAction {...props} />
    case "loyalty.nudge-with-key-value":
      return <GiftCardSummaryComponent {...props} />
    case "loyalty.nudge-with-action":
      return <NudgeWithMailAction {...props} />
    case "loyalty.imagePreviewNudge":
      return <GiftCardPreviewComponent {...props} />
    case "loyalty.nudge.dual-action":
      return <NudgeWithDualActionsComponent {...props} />
    case "authentication.nudge.details-form":
      return <PersonalDetails {...props} />
    case "authentication.nudge.address-form":
      return <AddAddress {...props} />
    case "authentication.nudge.membership-login-options":
      return <ThankYouScreen {...props} />
    case "partners.nudge.left-image-right-content-with-border":
      return <NudgeCardWithImage {...props} />
    case "partners.nudge.nudge-with-two-links":
      return <NudgeWithTwoLinks {...props} />
    case "ihcl.core.nudge.alert-message-status":
      return <NudgeWellnessJivaSuccess {...props} />
    case "ihcl.core.subscription-confirmation":
      return <SubscriptionSuccess {...props} />
    case "myAccount.nudge.alert-message-with-two-buttons":
      return <CancelSuccessModal {...props} />
    case "partners.nudge.content-wrapped-in-outlined-border":
      return <NudgeWithPartnerMembership {...props} />
    case "loyalty.nudge.action-and-message":
      return <EpicureViewComparision {...props} />
    default:
      return <></>
  }
}
