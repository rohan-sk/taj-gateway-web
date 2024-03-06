import React from "react"
import { useMobileCheck } from "../../utils/isMobilView"
import dynamic from "next/dynamic"
const BusinessSMEEnquiryForm = dynamic(() => import("./business-form/card-with-business-enquiry-form.component"))
import BookAStayForm from "./offers-forms/book-a-stay-form"
import { COMPLEMENT, SUGGESSION } from "./gift-card-form/constants"
const PersonalDetailsComponent = dynamic(() => import("../Login/register-form/personal-details.component"))
const AddAddressComponent = dynamic(() => import("../Login/register-form/add-address.component"))
const KhazanaEnquiryForm = dynamic(() => import("./enquiry-forms/khazana-enquiry-form/khazana-enquiry-form.component"))
const FeedBackComponent = dynamic(() => import("../contactus/FeedBack-component"))
const HolidayEnquireForm = dynamic(() => import("./enquiry-forms/holiday-enquire-forms/holiday-enquire-form.component"))
const WeddingEnquireForm = dynamic(() => import("./enquiry-forms/wedding-enquire-forms/wedding-enquire-form.component"))
const CardWithForm = dynamic(() => import("../card/card-with-form"))
const CardWithWellnessEnquiry = dynamic(() => import("../card/card-with-welllness-enquiry"))
const CardWithExperienceEnquiry = dynamic(() => import("../card/card-with-experience-form"))
const TapEnquireComponent = dynamic(() => import("./enquiry-forms/tap-enquire-forms/tap-enquire.component"))
const EnterDetailsForm = dynamic(() => import("./gift-card-form/enter-details.form"))
const LoyaltyCardsEnrollForm = dynamic(() => import("./loyalty-form/loyalty-cards-enroll-form"))
const SafariFromComponent = dynamic(() => import("./enquiry-forms/safaris-enquire-form/safaris-enquire-form.component"))
const ReserveATableEnquireForm = dynamic(
  () => import("./enquiry-forms/reserve-a-table-enquire-form/reserve-a-table-enquire-form.component"),
)
const BusinessEnquiryForm = dynamic(() => import("./business-enquiry-form.component"))
const ParticipatingHotelsComponent = dynamic(() => import("./participating-hotels/participating-hotels.component"))
const DiningEnquiryPlanEventForm = dynamic(
  () => import("./enquiry-forms/reserve-a-table-enquire-form/dining-enquiry-plan-event-form.component"),
)
const SpecialOccasionEnquireForm = dynamic(
  () => import("./enquiry-forms/wedding-enquire-forms/special-occasion-enquire.component"),
)
const BulkEnquireCardComponent = dynamic(() => import("../card/bulk-enquire-card.component"))
const NewsLetterForm = dynamic(() => import("./enquiry-forms/news-letter-form/news-letter-form.component"))
const StayTabFormComponent = dynamic(() => import("./find-your-booking-forms/stay-tab-form-component"))
const DiningTabFormComponent = dynamic(() => import("./find-your-booking-forms/dining-tab-form-component"))

const BalanceCheck = dynamic(() => import("../modal/manage-cards-modal-components/balance-check.component"))
const ReloadCardComponent = dynamic(() => import("../modal/manage-cards-modal-components/reload-card.component"))
const OrderStatusComponent = dynamic(() => import("../modal/manage-cards-modal-components/order-status.component"))
const OffersOwnerBenefitsForm = dynamic(() => import("./book-a-stay-form/offers-owner-benefits.component"))

const TransactionSummaryDetails = dynamic(
  () => import("../../features/my-account/ui/TransactionSummary/transaction-summary-cards-template.component"),
)
export const Forms = (props: any) => {
  const isMobile = useMobileCheck()
  const variant = isMobile ? props?.variant : props?.largeVariant
  switch (variant) {
    case "businessServices.form.enquiry-form":
      return <BusinessEnquiryForm {...props} />
    case "ihclForms.khazana-enquiry-form":
      return <KhazanaEnquiryForm {...props} isHamperVariant={false} />
    case "ihclForms.hamper-product-enquiry-form":
      return <KhazanaEnquiryForm {...props} isHamperVariant={true} />
    case "ihclForms.hamper-category-product-enquiry-form":
      return <KhazanaEnquiryForm {...props} isHamperVariant={true} isHamperCategoryVariant={true} />
    case "ihclForms.tap-enquiry-form":
      return <TapEnquireComponent {...props} isTapForm={true} />
    case "ihclForms.tappme-enquiry-form":
      return <TapEnquireComponent {...props} isTapForm={false} />
    case "giftCards.form.participating-hotel-search":
      return <ParticipatingHotelsComponent {...props} />
    case "businessServices.form.business-connect-enquiry-form":
      return <BusinessSMEEnquiryForm {...props} />
    case "offers.form.book-a-stay-template":
      return <BookAStayForm {...props} />
    case "ihclForms.dining-enquiry":
      return <ReserveATableEnquireForm {...props} />
    case "ihclForms.contact-form-tabs":
      return <FeedBackComponent {...props} type={COMPLEMENT} />
    case "ihclForms.contact-suggestions":
      return <FeedBackComponent {...props} type={SUGGESSION} />
    case "ihclForms.holidays-enquiry":
      return <HolidayEnquireForm {...props} />
    case "ihclForms.asya-enquiry-form":
      return <KhazanaEnquiryForm {...props} isAsyaVariant={true} />
    case "ihclForms.wedding-enquiry":
      return <WeddingEnquireForm {...props} />
    case "ihclForms.wellness-enquiry-modal":
      return <CardWithWellnessEnquiry {...props} />
    case "ihclForms.experiences-enquiry-modal":
      return <CardWithExperienceEnquiry {...props} />
    case "ihclForms.venue-enquiry-modal":
      return <CardWithForm {...props} />
    case "ihclForms.wedding-event-enquiry":
      return <SpecialOccasionEnquireForm {...props} />
    case "ihclForms.dining-plan-an-event-enquiry":
      return <DiningEnquiryPlanEventForm {...props} />
    case "giftCards.form.member-purchase-details-with-cta":
      return <BulkEnquireCardComponent {...props} />
    case "common-utils.forms.subscription":
      return <NewsLetterForm {...props} />
    case "myAccount.forms.stay-reservation-details":
      return <StayTabFormComponent {...props} />
    case "myAccount.forms.dining-reservation-details":
      return <DiningTabFormComponent {...props} />
    case "giftCards.forms.check-balance-form":
      return <BalanceCheck {...props} />
    case "giftCards.forms.reload-balance-form":
      return <ReloadCardComponent {...props} />
    case "giftCards.forms.order-status-form":
      return <OrderStatusComponent {...props} />
    case "ihclForms.safari-enquiry-form":
      return <SafariFromComponent {...props} />
    case "membership.form.participating-hotel-search":
      return <ParticipatingHotelsComponent {...props} />
    case "giftCards.forms.enter-details":
      return <EnterDetailsForm {...props} />
    case "loyalty.forms.epicure-member-details":
      return <LoyaltyCardsEnrollForm props={props} />
    case "offers.form.book-here-for-owner-benefits":
      return <OffersOwnerBenefitsForm {...props} />
    case "authentication.form.personal-details":
      return <PersonalDetailsComponent {...props} />
    case "myAccount.forms.claim-neuCoins":
      return <TransactionSummaryDetails {...props} />

    case "authentication.form.international-user-address":
      return <AddAddressComponent {...props} />
    default:
      return <></>
  }
  return <></>
}
