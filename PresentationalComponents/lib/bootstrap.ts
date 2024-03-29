import { ManifestDefinition } from "../../types"
let coreRegistry: ManifestDefinition[] = []

export function bootstrap(registry: ManifestDefinition[]) {
  coreRegistry = registry

  const map = {
    componentMap: {},
    groupVariantMap: {},
    cardVariantMap: {},
    storeMap: {},
    switchCaseVariantMap: {},
    placeholderVariantMap: {},
    dividerVariantMap: {},
    layoutPlaceholderVariantMap: {},
    authenticationVariantMap: {},
    customVariantsMap: {},
  }

  return registry.reduce((obj, item: ManifestDefinition) => {
    obj.componentMap = { ...obj.componentMap, ...item?.components }
    obj.groupVariantMap = { ...obj.groupVariantMap, ...item?.groupVariants }
    obj.cardVariantMap = { ...obj.cardVariantMap, ...item?.cardVariants }
    obj.dividerVariantMap = {
      ...obj.dividerVariantMap,
      ...item?.dividerVariants,
    }
    obj.switchCaseVariantMap = {
      ...obj.switchCaseVariantMap,
      ...item?.switchCaseBlockVariants,
    }
    obj.placeholderVariantMap = {
      ...obj.placeholderVariantMap,
      ...item?.placeholderVariants,
    }
    obj.authenticationVariantMap = {
      ...obj.authenticationVariantMap,
      ...item?.authenticationVariants,
    }

    obj.layoutPlaceholderVariantMap = {
      ...obj.layoutPlaceholderVariantMap,
      ...item?.layoutPlaceholderVariants,
    }
    obj.customVariantsMap = {
      ...obj.customVariantsMap,
      ...item?.customVariants,
    }

    const itemStoreMap = item?.stores?.reduce((storeMap, store) => {
      storeMap = { ...storeMap, [store.name]: store.instance }
      return storeMap
    }, {})

    obj.storeMap = { ...obj.storeMap, ...itemStoreMap }
    return obj
  }, map)
}

export function bootstrapPage(configuredStores: any[]): any {
  const map = {
    pageStoreMap: {},
  }

  return coreRegistry.reduce((obj, item) => {
    const itemStoreMap = item?.pageStores.reduce((pageStoreMap, store) => {
      const isConfigured = configuredStores.find(
        (configuredStore) => configuredStore.variant === store.name
      )
      if (isConfigured)
        pageStoreMap = { ...pageStoreMap, [store.name]: store.getInstance() }
      return pageStoreMap
    }, {})

    obj.pageStoreMap = { ...obj.pageStoreMap, ...itemStoreMap }

    return obj
  }, map)
}
