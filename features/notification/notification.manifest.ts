import { ManifestDefinition } from "../../types"
import {
  cardVariants,
  components,
  groupVariants,
  placeholderVariants,
  dividerVariants,
} from "../core/components"

const notificationManifest: ManifestDefinition = {
  name: "notification",
  stores: [],
  pageStores: [],
  components,
  groupVariants,
  cardVariants,
  placeholderVariants,
  dividerVariants,
}

export default notificationManifest
