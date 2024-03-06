import { formatDateEnGB } from "./getDate"
import { externalNavigation } from "../components/constants"

//? Using to generate URL to redirect non Taj brand hotels for SEB
function getSEBCrossBrandURL(
  identifier?: string,
  brandName?: string,
  fromDate?: any,
  toDate?: any,
  offerRateCode?: string,
  roomsCount?: number,
  roomDetails?: any,
  sebObject?: any,
  isTajSats?: boolean,
  overrideSessionDates?: boolean,
) {
  const brand = brandName?.toUpperCase()
  const navUrl = externalNavigation[brand as string]
  const adults = roomDetails?.reduce((acc: any, value: any) => {
    return acc + Number.parseInt(value?.adults)
  }, 0)
  const children = roomDetails?.reduce((acc: any, value: any) => {
    return acc + Number.parseInt(value?.child)
  }, 0)
  const formattedURL = `${
    `${navUrl ? `${navUrl}` : ""}` +
    `${identifier ? `/${identifier}` : ""}` +
    `${offerRateCode ? `?offerRateCode=${offerRateCode}` : ""}` +
    `${fromDate ? `&from=${formatDateEnGB(fromDate)}` : ""}` +
    `${toDate ? `&to=${formatDateEnGB(toDate)}` : ""}` +
    `${roomsCount ? `&rooms=${roomsCount}` : ""}` +
    `${adults ? `&adults=${adults}` : ""}` +
    `${children ? `&children=${children}` : ""}` +
    `${overrideSessionDates ? `&overrideSessionDates=${overrideSessionDates}` : ""}` +
    `{${sebObject ? `&sebObject=${objToQueryParams(sebObject)}` : ""}}` +
    `${isTajSats ? `&isTajSats=${isTajSats}` : ""}`
  }`
  return formattedURL
}

function objToQueryParams(obj: any) {
  const keys = Object.keys(obj)
  const keyValuePairs = keys.map((key) => {
    return `"${encodeURIComponent(key)}"="${encodeURIComponent(key)}"`
  })
  return keyValuePairs.join("&")
}

export default getSEBCrossBrandURL
