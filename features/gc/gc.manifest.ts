import { ManifestDefinition } from "../../types"
import { GLOBAL_STORES, PAGE_STORES } from "../../utils/Constants"
import {
  cardVariants,
  components,
  groupVariants,
  placeholderVariants,
  layoutPlaceholderVariants,
} from "./components"
import GCStore from "./store/pageStore/gc.store"

const gcManifest: ManifestDefinition = {
  name: "gc",
  stores: [
    {
      name: GLOBAL_STORES?.gcStore,
      instance: new GCStore(),
    },
  ],
  pageStores: [],
  components,
  groupVariants,
  cardVariants,
  placeholderVariants,
  layoutPlaceholderVariants,
}

export default gcManifest
