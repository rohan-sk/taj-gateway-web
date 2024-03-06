import { ManifestDefinition } from "../../types"
import {
  cardVariants,
  components,
  groupVariants,
  placeholderVariants,
  layoutPlaceholderVariants,
} from "./components"

const destinationManifest: ManifestDefinition = {
  name: "destination",
  stores: [],
  pageStores: [],
  components,
  groupVariants,
  cardVariants,
  placeholderVariants,
  layoutPlaceholderVariants,
}

export default destinationManifest
