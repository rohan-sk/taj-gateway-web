import { ManifestDefinition } from "../../types"
import {
  cardVariants,
  components,
  groupVariants,
  placeholderVariants,
  layoutPlaceholderVariants,
} from "./components"

const propertyManifest: ManifestDefinition = {
  name: "property",
  stores: [],
  pageStores: [],
  components,
  groupVariants,
  cardVariants,
  placeholderVariants,
  layoutPlaceholderVariants,
}

export default propertyManifest
