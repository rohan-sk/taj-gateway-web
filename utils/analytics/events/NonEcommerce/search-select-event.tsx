import { triggerEvent } from "../.."
import { getCookie } from "../../../cookie"
import { AFFILIATION, PAGE_LANG, TAJ_HOTELS } from "../../constants"

export const handleSelected = (item: any, value: any, eventName: string, dataLayer: any, props: any) => {
  let isDestination = eventName?.includes("destinationSelected")
  let isHoliday = eventName?.includes("holidaySelected")
  let isHotels = eventName?.includes("hotelSelected")
  if (isDestination) {
    triggerEvent({
      action: eventName,
      params: {
        ...dataLayer,
        destinationSelected: item?.name,
        eventName: "",
        buttonLinkName: "",
        link_url: `/destination/hotels-in-${item?.city?.toLowerCase()}?hotel_type=${item?.hotel_type}`,
        link_text: item?.name,
        brandName: item?.brand_name ? item?.brand_name : AFFILIATION,
        widget_title: props?.title?.desktopTitle || "",
        widget_description: props?.placeholderText,
        widget_type: props?._type,
        widget_position: "",
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
        hotelName: item?.hotel_name || "",
        hotelType: item?.hotel_type || "",
        hotelBrand: item?.brand_name || "",
        hotelCity: item?.city || "",
        country: item?.hotel_country || "",
        city: item?.city,
        hotelCountry: item?.hotel_country || "",
        hotelState: item?.hotel_state || "",
        hotelPinCode: item?.hotel_pin_code || "",
        hotelCode: item?.hotel_code || "",
        bunglowCode: "",
        clientId: getCookie("_ga")?.slice(6),
        eventDate: "",
        eventPlace: "",
        eventTicketsQty: "",
        eventType: "",
        location: item?.city || "",
        outbound: false,
        pageTitle: `/destination/hotels-in-${item?.city?.toLowerCase()}?hotel_type=${item?.hotel_type}`
          .replace("/", "")
          .toUpperCase(),
        pageURL:
          `${global?.window?.location?.origin}` +
          `${`/destination/hotels-in-${item?.city?.toLowerCase()}?hotel_type=${item?.hotel_type}`}`,
        pageSection: props?.title?.desktopTitle ? props?.title?.desktopTitle : "",
        pageHierarchy: JSON.parse(
          `["${TAJ_HOTELS}",` +
            `"${PAGE_LANG}",` +
            `"${AFFILIATION}",` +
            `"${`/destination/hotels-in-${item?.city?.toLowerCase()}?hotel_type=${item?.hotel_type}`
              .replace("/", "")
              .toUpperCase()}"]`,
        ),
      },
    })
  } else if (isHoliday) {
    triggerEvent({
      action: eventName,
      params: {
        ...dataLayer,
        eventName: "",
        buttonLinkName: "",
        link_url: `/hotels/${item?.identifier}`,
        link_text: item?.name,
        brandName: item?.brand_name ? item?.brand_name : "",
        widget_title: props?.title?.desktopTitle ? props?.title?.desktopTitle : "",
        widget_description: props?.placeholderText ? props?.placeholderText : "",
        widget_type: props?._type ? props?._type : "",
        widget_position: "",
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
        hotelName: item?.name,
        hotelType: item?.hotel_type || item?.hotelType,
        hotelBrand: item?.brand_name || "",
        hotelCity: item?.hotelAddress?.city || item?.hotel_city,
        hotelCountry: item?.hotel_country || item?.hotelAddress?.country,
        hotelState: item?.hotel_state || item?.hotelAddress?.state,
        hotelPinCode: item?.hotel_pin_code || item?.hotelAddress?.pincode,
        hotelCode: item?.synxis_hotel_id || item?.synxisHotelId,
        bunglowCode: "",
        theme: item?.theme ? item?.theme : item?.name,
        clientId: getCookie("_ga")?.slice(6),
        eventDate: "",
        eventPlace: "",
        eventTicketsQty: "",
        eventType: "",
        location: item?.hotelAddress?.city ? item?.hotelAddress?.city : item?.hotel_city,
        outbound: false,
        holidayType: item?.experience ? item?.experience : "",
        pageTitle: `/hotels/${item?.identifier}`.replace("/", "")?.toUpperCase(),
        pageURL: `${global?.window?.location?.origin}` + `/hotels/${item?.identifier}`,
        pageSection: props?.title?.desktopTitle ? props?.title?.desktopTitle : "",
        pageHierarchy: JSON.parse(
          `["${TAJ_HOTELS}",` +
            `"${PAGE_LANG}",` +
            `"${AFFILIATION}",` +
            `"${`/hotels/${item?.identifier}`.replace("/", "").toUpperCase()}"]`,
        ),
      },
    })
  } else if (isHotels) {
    triggerEvent({
      action: eventName,
      params: {
        ...dataLayer,
        hotelSelected: item?.name,
        eventName: "",
        buttonLinkName: "",
        link_url: `/hotels/${item?.identifier}`,
        link_text: item?.name,
        brandName: item?.brand_name ? item?.brand_name : "",
        widget_title: props?.title?.desktopTitle ? props?.title?.desktopTitle : "",
        widget_description: props?.placeholderText ? props?.placeholderText : "",
        widget_type: props?._type ? props?._type : "",
        widget_position: "",
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
        hotelName: item?.name,
        hotelType: item?.hotel_type || item?.hotelType,
        hotelBrand: item?.brand_name || "",
        hotelCity: item?.city || item?.hotelAddress?.city,
        hotelCountry: item?.hotel_country || item?.hotelAddress?.country,
        hotelState: item?.hotel_state || item?.hotelAddress?.state,
        hotelPinCode: item?.hotel_pin_code || item?.hotelAddress?.pincode,
        hotelCode: item?.synxis_hotel_id || item?.synxisHotelId,
        bunglowCode: "",
        theme: item?.theme || "",
        clientId: getCookie("_ga")?.slice(6),
        eventDate: "",
        eventPlace: "",
        eventTicketsQty: "",
        eventType: "",
        location: item?.city || item?.hotelAddress?.city,
        outbound: false,
        pageTitle: `/hotels/${item?.identifier}`.replace("/", "").toUpperCase(),
        pageURL: `${global?.window?.location.origin}` + `/hotels/${item?.identifier}`,
        pageSection: props?.title?.desktopTitle ? props?.title?.desktopTitle : "",
        pageHierarchy: JSON.parse(
          `["${TAJ_HOTELS}",` +
            `"${PAGE_LANG}",` +
            `"${AFFILIATION}",` +
            `"${`/hotels/${item?.identifier}`.replace("/", "").toUpperCase()}"]`,
        ),
      },
    })
  } else {
    triggerEvent({
      action: eventName,
      params: {
        ...dataLayer,
        eventName: "",
        buttonLinkName: "",
        link_url: `/hotels/${item?.hotel_identifier}/restaurants/${item?.restaurant_identifier}`,
        link_text: item?.name || item?.restaurant_name,
        brandName: item?.brand_name || AFFILIATION,
        widget_title: props?.title?.desktopTitle,
        widget_description: props?.placeholderText,
        widget_type: props?._type,
        widget_position: "",
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
        cuisineType: item?.cuisine_type || "",
        restaurantCity: item?.restaurant_city || "",
        restaurantCountry: item?.restaurant_country || "",
        restaurantName: item?.name || item?.restaurant_name,
        theme: "",
        bunglowCode: "",
        clientId: getCookie("_ga")?.slice(6),
        eventDate: "",
        eventPlace: "",
        eventTicketsQty: "",
        eventType: "",
        location: item?.restaurant_city,
        NightsQty: "",
        outbound: false,
        pageSection: props?.title?.desktopTitle ? props?.title?.desktopTitle : "",
        pageHierarchy: JSON.parse(
          `["${TAJ_HOTELS}",` +
            `"${PAGE_LANG}",` +
            `"${AFFILIATION}",` +
            `"${`/hotels/${item?.hotel_identifier}/restaurants/${item?.restaurant_identifier}`
              .replace("/", "")
              .toUpperCase()}"]`,
        ),
        pageTitle: `/hotels/${item?.hotel_identifier}/restaurants/${item?.restaurant_identifier}`
          .replace("/", "")
          .toUpperCase(),
        pageURL:
          `${global?.window?.location?.origin}` +
          `${`/hotels/${item?.hotel_identifier}/restaurants/${item?.restaurant_identifier}`}`,
      },
    })
  }
}
