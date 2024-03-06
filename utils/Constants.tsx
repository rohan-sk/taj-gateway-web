import {
  GSTNo,
  addOnEmail,
  addOnFirstName,
  addOnLastName,
  addOnMobile,
  address,
  firstName,
  lastName,
  memberShipNumber,
  pinCode,
  receiverEmail,
  receiverFirstName,
  receiverLastName,
  receiverMobile,
  senderEmail,
  senderFirstName,
  senderLastName,
  senderMobile,
  amount,
  GCNumber,
  GCPin,
  CGCNumber,
  city,
  designation,
  SalesCoordinatorName,
  reloadAmount,
  userFirstName,
  userLastName,
  additionalReceiverMobile,
  textArea,
  orderRefNumber,
  receiverAddress,
  itineraryRefId,
  CardName,
  companyName,
  senderAddress,
  voucherPin,
  voucherNumber,
} from "../components/forms/gift-card-form/constants"
import { Email, Name, Mobile } from "../components/modal/constants"

export const googleMapsApiKey: string = `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
export const GLOBAL_STORES = {
  coreModalStore: "core.modalStore",
  searchStore: "search.store",
  userStore: "user.store",
  bookingFlowStore: "bookingFlowStore",
  giftCardStore: "giftCardStore",
  propertyStore: "property.store",
  restaurantStore: "restaurant.store",
  brandRestaurantStore: "brandRestaurantStore.store",
  destinationStore: "destination.store",
  holidayStore: "holiday.store",
  hamperStore: "hamper.store",
  userDetailsStore: "userDetailsStore",
  offerStore: "offer.store",
  userAccountStore: "userAccountStore",
  gaStore: "ga.Store",
  gcStore: "gc.Store",
  blogStore: "blog.store",
  loyaltyGlobalStore: "loyalty.stores.epicure-global-store",
}

export const PAGE_STORES = {
  giftCardFormDetailsStore: "giftCards.formDetails-store",
  bookingFlowStore: "bookings.store",
  loginStore: "authentication.login-store",
  giftCardManageCard: "giftCards.manage-gift-card",
  searchResultsPage: "ihcl.core.connectedStores.search-results",
  registrationStore: "authentication.stores.register-store",
  GIFTCARD_STORES: {
    giftCardConfirmationPageStore: "giftCards.confirmationPage-store",
    giftCardThemeStore: "giftCards.theme-store",
    reloadGiftCardStore: "giftCards.connectedStores.balance-reload",
  },
  LOYALTY_STORES: {
    loyaltyEpicureCardsStore: "loyalty.stores.loyalty-epicure-cards-store",
    loyaltyConfirmationStore: "loyalty.stores.member-confirm-details",
  },
  BOOKING_STORES: {
    bookingConfirmationPageStore: "bookings.booking-confirmation-page-store",
  },
  ACCOUNT_STORES: {
    myAccountStore: "myAccount.stores.my-account-store",
  },
}

export const firstNameFields = [receiverFirstName, senderFirstName, firstName, addOnFirstName]

export const lastNameFields = [receiverLastName, senderLastName, lastName, addOnLastName]

export const nameFields = [Name, SalesCoordinatorName, designation, CardName]

export const UserName = [userFirstName, userLastName]

export const MobileFields = [senderMobile, receiverMobile, Mobile, addOnMobile, additionalReceiverMobile]

export const EmailFields = [receiverEmail, senderEmail, Email, addOnEmail]

export const PinCodeFields = [pinCode]

export const GSTNoFields = [GSTNo]

export const memberShipID = [memberShipNumber]

export const GiftCardAmount = [amount]

export const GiftCardNumber = [GCNumber, CGCNumber]

export const GiftCardPin = [GCPin]

export const Address = [address, receiverAddress, senderAddress]

export const TextArea = [textArea]

export const City = [city]

export const GCReloadBalance = [reloadAmount]

export const OrderId = [orderRefNumber]

export const ItineraryId = [itineraryRefId]

export const ConfirmationNumber = "ConfirmationNumber"

export const CompanyNameField = [companyName]
