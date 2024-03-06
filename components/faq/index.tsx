import dynamic from "next/dynamic"

const FaqListComponent = dynamic(() => import("./faq-list-component"))
const FaqGoogleMapComponent = dynamic(
  () => import("./faq-google-maps-component")
)
const CenterAlignedSingleDropDownItem = dynamic(
  () => import("./center-aligned-single-dropdown.component")
)
const TermsAndConditionsComponent = dynamic(
  () => import("./terms-and-conditions-component")
)
const OffersDetailsTermsComponent = dynamic(
  () => import("./offers-details-terms-component")
)
const OffersDetailsFaqsComponent = dynamic(
  () => import("./offers-details-faqs.component")
)
const RedeemInternalTenderModesInBookingJourney = dynamic(
  () => import("../../features/booking/ui/redeem-and-save.component")
)

const RenderFaqsComponent = (props: any) => {
  const variant = props?.largeVariant

  switch (variant) {
    case "faqs-lists":
      return <FaqListComponent props={props} />
    case "questions-and-answers":
      return <FaqGoogleMapComponent props={props} />
    case "drop-down-list":
      return <CenterAlignedSingleDropDownItem props={props} />
    case "faq-bullet-points":
      return <TermsAndConditionsComponent {...props} />
    case "drop-down-list-offers-tnc":
      return <OffersDetailsTermsComponent {...props} />
    case "drop-down-list-offers-faqs":
      return <OffersDetailsFaqsComponent {...props} />
    case "bookings.internal-tender-modes":
      return <RedeemInternalTenderModesInBookingJourney {...props} />
    default:
      return <></>
  }
}
export default RenderFaqsComponent
