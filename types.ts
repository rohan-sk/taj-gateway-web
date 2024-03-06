import { AxiosRequestConfig } from "axios"
export enum ApiMethod {
  get = "get",
  post = "post",
  put = "put",
  delete = "delete",
}

export const enum status {
  done = "done" /* eslint-disable-line */,
  pending = "pending" /* eslint-disable-line */,
  error = "error" /* eslint-disable-line */,
}
export type APIComponentProps = {
  url: string
  title: string
  type: string
  payload: any
  parameterMap: any
  subtitle?: string
}

export type ManifestDefinition = {
  name: string
  stores: { name: string; instance: object }[]
  pageStores: { name: string; getInstance: () => object }[]
  components: { [key: string]: {} }
  groupVariants: { [key: string]: {} }
  cardVariants: { [key: string]: {} }
  switchCaseBlockVariants?: { [key: string]: {} }
  placeholderVariants?: { [key: string]: {} }
  dividerVariants?: { [key: string]: {} }
  layoutPlaceholderVariants?: { [key: string]: {} }
  authenticationVariants?: { [key: string]: {} }
  customVariants?: { [key: string]: {} }
}

export enum PathType {
  external = "external",
  externalApplication = "externalApplication",
  internal = "internal",
  dialog = "dialog",
}
export type FAQ = {
  _key: string
  question?: string
  answer?: string
}

export type ApiHandler = {
  createRequest: (
    url: string,
    payload?: any,
    user?: any,
    withCredentials?: boolean,
    timeout?: number,
  ) => AxiosRequestConfig
  mapResponse: (title: string, response: any) => { [key: string]: any }
  apiCall?: any
}

export type variantTypes =
  | "heading-l"
  | "heading-m"
  | "heading-s"
  | "heading-xs"
  | "m-heading-l"
  | "m-heading-m"
  | "m-heading-s"
  | "m-heading-xs"
  | "heading-xxs"
  | "body-xxl"
  | "body-xl"
  | "body-l"
  | "body-ml"
  | "body-m"
  | "body-ms"
  | "body-s"
  | "m-body-xl"
  | "m-body-ml"
  | "m-body-l"
  | "m-body-m"
  | "m-body-s"
  | "m-body-xs"
  | "m-body-sl"
  | "body-xs"
  | "small"
  | "x-small"
  | "xx-small"
  | "link-m"
  | "m-text-link"
  | "button"
  | "m-body-sl"
  | "body-xsl"
  | "m-body-xsl"
  | "m-body-xxl"
