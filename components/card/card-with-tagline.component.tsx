import React, { useContext } from "react"
import { ImageProps } from "../types"
import { urlFor } from "../../lib-sanity"
import { Box, Typography } from "@mui/material"
import { useMobileCheck } from "../../utils/isMobilView"
import { CardBox, ImageBox } from "./styles/card-with-title"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { triggerEvent } from "../../utils/analytics"
import { GLOBAL_STORES } from "../../utils/Constants"
import { GAStore, UserStore } from "../../store"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
import { getCookie } from "../../utils/cookie"
import { TAJ_HOTELS, PAGE_LANG, AFFILIATION } from "../../utils/analytics/constants"

interface CardWithTagLine {
  props: {
    _type: any
    url: string
    urlType: any
    title: string
    image: ImageProps
    largeImage: ImageProps
    gridSize?: number
    variant: string
    largeVariant: string
    city: string
    country: string
    heading?: string
    isDestinationNavigation?: boolean
  }
}

const CardWithTagLine = ({ props }: CardWithTagLine) => {
  const {
    image,
    largeImage,
    title,
    url,
    urlType,
    gridSize = 4,
    city,
    country,
    _type,
    isDestinationNavigation,
    heading,
  } = props

  const { getOptimizeImageUrl } = useImageUtility()
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const cardImage = isMobile ? image?.asset?._ref : largeImage?.asset?._ref
  const variant = isMobile
    ? props?.variant === "common-utils.card.thumbnail-city-card"
    : props?.largeVariant === "common-utils.card.thumbnail-city-card"
  const context = useContext(IHCLContext)
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(UserStore, gaStoreData)
  const handleDestinationBooking = () => {
    let pathname = global?.window?.location?.pathname
    let isDestination = pathname?.includes("destinations")
    if (isDestination) {
      triggerEvent({
        action: "destinationSelected",
        params: {
          ...dataLayer,
          destinationSelected: title,
          buttonLinkName: title,
          link_url: url,
          link_text: title,
          eventType: "",
          eventName: "",
          eventPlace: "",
          eventTicketsQty: "",
          eventDate: "",
          offerName: "",
          offerCode: "",
          offerID: "",
          offerCategory: "",
          offerValidity: "",
          datesToBook: "",
          arrivalDate: "",
          departureDate: "",
          noOfAdults: "",
          noOfChild: "",
          noOfRooms: "",
          specialCode: "",
          brandName: AFFILIATION,
          country: country,
          city: city,
          hotelName: "",
          hotelCode: "",
          hotelType: "",
          hotelCountry: "",
          hotelCity: "",
          hotelState: "",
          hotelPinCode: "",
          hotelbrand: "",
          roomName: "",
          roomOffer: "",
          bunglowCode: "",
          clientId: getCookie("_ga")?.slice(6),
          pageTitle: url?.replaceAll("/", "").toUpperCase(),
          pageURL: `${global?.window?.location?.origin}` + `${url}`,
          item_type: _type,
          widget_type: _type,
          pageHierarchy: JSON.parse(
            `["${TAJ_HOTELS}",` +
              `"${PAGE_LANG}",` +
              `"${AFFILIATION}",` +
              `"${url?.replaceAll("/", "").toUpperCase()}"]`,
          ),
          outbound: urlType == "internal" ? false : true,
          location: city,
          pageSection: heading,
          widget_title: heading,
        },
      })
    }
  }

  const handleNavigation = () => {
    navigate(url, urlType)
    handleDestinationBooking()
  }
  return (
    <>
      {cardImage && (
        <CardBox sx={{ textAlign: "center" }}>
          <ImageBox $variant={variant} onClick={() => handleNavigation()}>
            <Box
              alt={(isMobile ? image?.altText : largeImage?.altText) || `-img`}
              width={"100%"}
              height={"100%"}
              component={"img"}
              src={getOptimizeImageUrl(urlFor(cardImage).url(), gridSize)}
            />
          </ImageBox>
          <Typography
            onClick={() => {
              isDestinationNavigation && handleNavigation()
            }}
            variant={isMobile ? "m-body-s" : "body-s"}
            sx={{
              cursor: isDestinationNavigation ? "pointer" : "initial",
              fontSize: isMobile
                ? variant
                  ? MobilePxToVw(22)
                  : MobilePxToVw(18)
                : variant
                ? DesktopPxToVw(22)
                : DesktopPxToVw(18),
            }}>
            {title}
          </Typography>
        </CardBox>
      )}
    </>
  )
}

export default CardWithTagLine
