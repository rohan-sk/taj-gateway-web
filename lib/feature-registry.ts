import { ManifestDefinition } from "../types"
import bookingManifest from "../features/booking/booking.manifest"
import giftCardManifest from "../features/giftCard/giftCard.manifest"
import loginManifest from "../features/login/login.manifest"
import RegistrationManifest from "../features/registration/registration.manifest"
import loyaltyManifest from "../features/loyalty/loyalty.manifest"
import accountManifest from "../features/my-account/account.manifest"
import notificationManifest from "../features/notification/notification.manifest"
import propertyManifest from "../features/property/property.manifest"
import destinationManifest from "../features/destination/destination.manifest"
import gcManifest from "../features/gc/gc.manifest"
import blogManifest from "../features/blog/blog.manifest"

const buildFeatureRegistry: ManifestDefinition[] = [
  giftCardManifest,
  bookingManifest,
  loginManifest,
  RegistrationManifest,
  loyaltyManifest,
  accountManifest,
  notificationManifest,
  propertyManifest,
  destinationManifest,
  gcManifest,
  blogManifest,
]

export default buildFeatureRegistry
