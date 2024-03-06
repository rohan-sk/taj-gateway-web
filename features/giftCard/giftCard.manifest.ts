import { ManifestDefinition } from "../../types"
import { GLOBAL_STORES, PAGE_STORES } from "../../utils/Constants"
import {
  cardVariants,
  components,
  groupVariants,
  placeholderVariants,
  switchCaseBlockVariants,
} from "../core/components"
import GiftCardConfirmationPageStore from "./store/pageStore/GCConfirmationPage.store"
import GiftCardFormDetailsStore from "./store/pageStore/GCFormdetails.store"
import GiftCardStore from "./store/globalStore/gift-card.store"
import manageGCStore from "./store/pageStore/manageGC.store"
import ReloadGiftCardPageStore from "./store/pageStore/reloadGC.store"

const giftCardManifest: ManifestDefinition = {
  name: "giftCard",
  stores: [
    {
      name: GLOBAL_STORES?.giftCardStore,
      instance: new GiftCardStore(),
    },
  ],
  pageStores: [
    {
      name: PAGE_STORES.giftCardFormDetailsStore,
      getInstance: () => new GiftCardFormDetailsStore(),
    },
    {
      name: PAGE_STORES.giftCardManageCard,
      getInstance: () => new manageGCStore(),
    },
    {
      name: PAGE_STORES.GIFTCARD_STORES.giftCardConfirmationPageStore,
      getInstance: () => new GiftCardConfirmationPageStore(),
    },
    {
      name: PAGE_STORES.GIFTCARD_STORES.giftCardThemeStore,
      getInstance: () => new GiftCardConfirmationPageStore(),
    },
    {
      name: PAGE_STORES.GIFTCARD_STORES.reloadGiftCardStore,
      getInstance: () => new ReloadGiftCardPageStore(),
    },
  ],
  components,
  groupVariants,
  cardVariants,
  placeholderVariants,
  switchCaseBlockVariants,
}

export default giftCardManifest
