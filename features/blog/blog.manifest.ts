import { ManifestDefinition } from "../../types"
import { GLOBAL_STORES } from "../../utils/Constants"
import { cardVariants, components, groupVariants, placeholderVariants, layoutPlaceholderVariants } from "./components"
import BlogStore from "./store/blog.store"

const blogManifest: ManifestDefinition = {
  name: "blog",
  stores: [
    {
      name: GLOBAL_STORES?.blogStore,
      instance: new BlogStore(),
    },
  ],
  pageStores: [],
  components,
  groupVariants,
  cardVariants,
  placeholderVariants,
  layoutPlaceholderVariants,
}

export default blogManifest
