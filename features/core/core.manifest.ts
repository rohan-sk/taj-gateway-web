import {
  GAStore,
  PropertyStore,
  UserAccountStore,
  RestaurantStore,
  DestinationStore,
  BrandRestaurantStore,
  HolidayStore,
} from "../../store"
import HamperStore from "../../store/global/hamper.store"
import ModalStore from "../../store/global/modal.store"
import OffersStore from "../../store/global/offers.store"
import UserStore from "../../store/global/user.store"
import { ManifestDefinition } from "../../types"
import { GLOBAL_STORES, PAGE_STORES } from "../../utils/Constants"
import LoyaltyGlobalStore from "../loyalty/store/globalStore/loyalty-global-store"
import searchResultsListing from "../search/store/pageStore/searchListingPage.store"
import SearchStore from "../search/store/search.store"
import {
  cardVariants,
  components,
  dividerVariants,
  groupVariants,
  placeholderVariants,
  layoutPlaceholderVariants,
  switchCaseBlockVariants,
  authenticationVariants,
  customVariants,
} from "./components"

const coreManifest: ManifestDefinition = {
  name: "core",
  stores: [
    {
      name: GLOBAL_STORES.coreModalStore,
      instance: ModalStore.getInstance(),
    },
    {
      name: GLOBAL_STORES.searchStore,
      instance: new SearchStore(),
    },
    {
      name: GLOBAL_STORES.userStore,
      instance: new UserStore(),
    },
    {
      name: GLOBAL_STORES.offerStore,
      instance: new OffersStore(),
    },
    {
      name: GLOBAL_STORES.propertyStore,
      instance: new PropertyStore(),
    },
    {
      name: GLOBAL_STORES.restaurantStore,
      instance: new RestaurantStore(),
    },
    {
      name: GLOBAL_STORES.destinationStore,
      instance: new DestinationStore(),
    },
    {
      name: GLOBAL_STORES.hamperStore,
      instance: new HamperStore(),
    },
    {
      name: GLOBAL_STORES.holidayStore,
      instance: new HolidayStore(),
    },
    {
      name: GLOBAL_STORES.brandRestaurantStore,
      instance: new BrandRestaurantStore(),
    },
    {
      name: GLOBAL_STORES.userAccountStore,
      instance: new UserAccountStore(),
    },
    {
      name: GLOBAL_STORES.gaStore,
      instance: new GAStore(),
    },
    {
      name: GLOBAL_STORES.loyaltyGlobalStore,
      instance: new LoyaltyGlobalStore(),
    },
  ],
  components,
  groupVariants,
  cardVariants,
  pageStores: [
    {
      name: PAGE_STORES.searchResultsPage,
      getInstance: () => new searchResultsListing(),
    },
  ],
  placeholderVariants,
  dividerVariants,
  layoutPlaceholderVariants,
  switchCaseBlockVariants,
  authenticationVariants,
  customVariants,
}

export default coreManifest
