import { ManifestDefinition } from "../../types"
import BookingsFlowStore from "./store/pageStore/booking.store"
import { GLOBAL_STORES, PAGE_STORES } from "../../utils/Constants"
import BookingFlowGlobalStore from "./store/globalStore/booking.flow.store"
import {
  cardVariants,
  components,
  groupVariants,
  placeholderVariants,
  switchCaseBlockVariants,
} from "./components"
import BookingConfirmationPageStore from "./store/pageStore/booking.confirmation.store"

const bookingManifest: ManifestDefinition = {
  name: "booking",
  stores: [
    {
      name: GLOBAL_STORES?.bookingFlowStore,
      instance: new BookingFlowGlobalStore(),
    },
  ],
  components,
  groupVariants,
  cardVariants,
  pageStores: [
    {
      name: PAGE_STORES?.bookingFlowStore,
      getInstance: () => new BookingsFlowStore(),
    },
    {
      name: PAGE_STORES?.BOOKING_STORES?.bookingConfirmationPageStore,
      getInstance: () => new BookingConfirmationPageStore(),
    },
  ],
  placeholderVariants,
  switchCaseBlockVariants,
}

export default bookingManifest
