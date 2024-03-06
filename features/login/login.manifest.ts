import { ManifestDefinition } from "../../types"
import { PAGE_STORES } from "../../utils/Constants"
import {
  cardVariants,
  components,
  groupVariants,
  placeholderVariants,
  switchCaseBlockVariants,
} from "./components"
import AuthenticLoginStore from "./store/authentication.login.store"

const loginManifest: ManifestDefinition = {
  name: "login",
  stores: [],
  pageStores: [
    {
      name: PAGE_STORES.loginStore,
      getInstance: () => new AuthenticLoginStore(),
    },
  ],
  components,
  placeholderVariants,
  switchCaseBlockVariants,
  groupVariants,
  cardVariants,
}

export default loginManifest
