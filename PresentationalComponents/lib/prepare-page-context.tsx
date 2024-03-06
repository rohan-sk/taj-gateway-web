import { createContext } from "react"
import { bootstrapPage } from "./bootstrap"

export interface PageContextProps {
  getPageStore: (name: string) => object
  queryParams?: object
  path?: any
  pageStoreMap?: any
  pageTitle?: string
}

export interface ModalContextProps {
  getPageStore: (name: string) => object
  path?: any
  pageStoreMap?: any
  pageTitle?: string
}
export const PageContext = createContext<PageContextProps | undefined>(
  undefined
)

export function preparePageContext(configuredStores: any): PageContextProps {
  const { pageStoreMap } = bootstrapPage(configuredStores || [])
  return {
    getPageStore: (name: string) => pageStoreMap[name],
    pageStoreMap,
  }
}

export const ModalContext = createContext<ModalContextProps | undefined>(
  undefined
)

export function prepareModalContext(configuredStores: any): ModalContextProps {
  const { pageStoreMap } = bootstrapPage(configuredStores || [])
  return {
    getPageStore: (name: string) => pageStoreMap[name],
    pageStoreMap,
  }
}
