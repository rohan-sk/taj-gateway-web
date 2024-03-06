import { ManifestDefinition } from "../../types"
import AccountStore from "./store/pageStore/account.store"
import { GLOBAL_STORES, PAGE_STORES } from "../../utils/Constants"
import UserDetailsStore from "./store/globalStore/user-details.store"
import { cardVariants, components, groupVariants, placeholderVariants } from "./components"

const accountManifest: ManifestDefinition = {
  name: "account",
  stores: [
    {
      name: GLOBAL_STORES.userDetailsStore,
      instance: new UserDetailsStore(),
    },
  ],
  pageStores: [
    {
      name: PAGE_STORES.ACCOUNT_STORES.myAccountStore,
      getInstance: () => new AccountStore(),
    },
  ],
  components,
  groupVariants,
  cardVariants,
  placeholderVariants,
}

export default accountManifest
