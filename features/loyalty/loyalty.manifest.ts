import { ManifestDefinition } from "../../types"
import { GLOBAL_STORES, PAGE_STORES } from "../../utils/Constants"
import LoyaltyStore from "./store/pageStore/loyalty.store"
import {
  cardVariants,
  components,
  groupVariants,
  placeholderVariants,
  switchCaseBlockVariants,
  layoutPlaceholderVariants,
} from "./components"
import LoyaltyConfirmationPageStore from "./store/pageStore/loyaltyConfirmation.store"

const loyaltyManifest: ManifestDefinition = {
  name: "loyalty",
  stores: [
    {
      name: GLOBAL_STORES.loyaltyGlobalStore,
      instance: new LoyaltyStore(),
    },
  ],
  pageStores: [
    {
      name: PAGE_STORES.LOYALTY_STORES.loyaltyEpicureCardsStore,
      getInstance: () => new LoyaltyStore(),
    },
    {
      name: PAGE_STORES.LOYALTY_STORES.loyaltyConfirmationStore,
      getInstance: () => new LoyaltyConfirmationPageStore(),
    },
  ],
  components,
  groupVariants,
  cardVariants,
  placeholderVariants,
  switchCaseBlockVariants,
  layoutPlaceholderVariants,
}

export default loyaltyManifest
