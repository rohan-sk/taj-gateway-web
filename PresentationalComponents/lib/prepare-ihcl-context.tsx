import React from "react"
import coreManifest from "../../features/core/core.manifest"
import { ManifestDefinition } from "../../types"
import { bootstrap } from "./bootstrap"
import { PortableText } from "../../lib/portable-text-serializers"
import { urlResolver } from "../../utils/urlResolver"
export interface IHCLContextProps {
  PortableText: (props: any) => JSX.Element | null
  renderComponent: (type: string, props: any, parentProps?: any) => JSX.Element
  getGroupVariant: (name: string) => object
  getCardVariant: (name: string) => object
  urlResolver: (url: string) => any
  getGlobalStore: (name: string) => object
  getSwitchCaseVariant: (name: string) => object
  getPlaceholderVariant: (name: string) => object
  getDividerVariant: (name: string) => object
  getLayoutPlaceholderVariant: (name: string) => object
}

export const IHCLContext = React.createContext<IHCLContextProps | undefined>(
  undefined
)

export function prepareIHCLContext(
  registry: ManifestDefinition[]
): IHCLContextProps {
  const {
    componentMap,
    groupVariantMap,
    cardVariantMap,
    storeMap,
    switchCaseVariantMap,
    placeholderVariantMap,
    dividerVariantMap,
    layoutPlaceholderVariantMap,
  }: any = bootstrap([...registry, coreManifest])
  return {
    PortableText,
    renderComponent: (type: string, props: any, parentProps?: any) => {
      const Component = componentMap[type]
      if (!Component) {
        const UnknownComponent = componentMap["unknown"]
        return <UnknownComponent {...props} {...parentProps} />
      }
      return <Component {...props} parentProps={parentProps} />
    },
    getCardVariant: (name) => cardVariantMap[name],
    getGroupVariant: (name) => groupVariantMap[name],
    urlResolver,
    getGlobalStore: (name) => storeMap[name],
    getSwitchCaseVariant: (name) => switchCaseVariantMap[name],
    getPlaceholderVariant: (name) => placeholderVariantMap[name],
    getDividerVariant: (name) => dividerVariantMap[name],
    getLayoutPlaceholderVariant: (name) => layoutPlaceholderVariantMap[name],
  }
}
