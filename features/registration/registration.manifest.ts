import React from "react"
import { PAGE_STORES } from "../../utils/Constants"
import AuthenticRegistrationStore from "./store/authentic.registration.store"
import {
  cardVariants,
  components,
  groupVariants,
  placeholderVariants,
} from "../core/components"
import { ManifestDefinition } from "../../types"

const RegistrationManifest: ManifestDefinition = {
  name: "registration",
  stores: [],
  pageStores: [
    {
      name: PAGE_STORES.registrationStore,
      getInstance: () => new AuthenticRegistrationStore(),
    },
  ],
  components,
  groupVariants,
  cardVariants,
  placeholderVariants,
}
export default RegistrationManifest
