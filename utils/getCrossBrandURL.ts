import { formatDateEnGB } from "./getDate"
import { externalNavigation } from "../components/constants"

//? Using to generate URL to redirect non Taj brand hotels
function getNonTajBrandCrossURL(
  brandName: string,
  identifier: string,
  toDate: any,
  fromDate: any,
  roomDetails: any,
  type?: string,
  promoCode?: string,
  offerRateCode?: string,
  agencyid?: string,
  couponCode?: string,
  synxisHotelCode?: string,
) {
  const brand = brandName?.toUpperCase()
  const navUrl = externalNavigation[brand]
  const adultsPerRoomToShareInURL = roomDetails?.map((item: any) => item?.adults)?.join(",")
  const childrenPerRoomToShareInURL = roomDetails?.map((item: any) => item?.child)?.join(",")
  const formattedURL =
    couponCode || agencyid
      ? `${process.env.NEXT_PUBLIC_BE_SYNXIS_URL}?adult=${adultsPerRoomToShareInURL}
      &arrive=${fromDate}&chain=21305&child=${childrenPerRoomToShareInURL}&
      children=${childrenPerRoomToShareInURL}&coupon=${couponCode}&currency=INR&depart=${toDate}
      &from=${fromDate}&hotel=${synxisHotelCode}&level=chain&locale=en-US&overrideSessionDates=true${
          promoCode ? `&promo=${promoCode}` : ""
        }${agencyid ? `&agencyid=${agencyid}` : ""}&rooms=${roomDetails?.length}&to=${toDate}`
      : `${navUrl}/${identifier}/${
          type === "overview"
            ? ""
            : brand === "AMA"
            ? "accommodations/"
            : brand === "GINGER"
            ? "rooms/"
            : "rooms-and-suites/"
        }?from=${formatDateEnGB(fromDate)}&to=${formatDateEnGB(toDate)}&rooms=${
          roomDetails?.length
        }&adults=${adultsPerRoomToShareInURL}&children=${childrenPerRoomToShareInURL}${
          promoCode ? `&promoCode=${promoCode}` : ""
        }${offerRateCode ? `&offerRateCode=${offerRateCode}` : ""}&`
  return formattedURL
}

export default getNonTajBrandCrossURL
