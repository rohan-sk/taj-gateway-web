export const fetchRestaurantSchema = (restaurantData: any) => {
  return {
    "@context": "http://schema.org/",
    "@type": "Restaurant",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        restaurantData?.hotelDetailDiningPage?.restaurantAddress?.addressLine1,
      addressCountry:
        restaurantData?.hotelDetailDiningPage?.restaurantAddress?.country,
      addressLocality:
        restaurantData?.hotelDetailDiningPage?.restaurantAddress?.state,
      postalCode:
        restaurantData?.hotelDetailDiningPage?.restaurantAddress?.pincode,
    },
    name: restaurantData?.pageTitle,
    url: global?.window?.location?.href,
    email: "",
    telephone:
      restaurantData?.hotelDetailDiningPage?.restaurantContact?.phone?.[0]
        ?.mobile,
    openingHours: restaurantData?.openingHours?.[0],
    servesCuisine:
      restaurantData?.hotelDetailDiningPage?.restaurantAvailability?.filter(
        (val: any) => {
          return val?.title === "CUISINE";
        }
      )?.[0]?.list?.[0]?.item,
    geo: {
      "@type": "GeoCoordinates",
      latitude:
        restaurantData?.hotelDetailDiningPage?.restaurantAddress?.latitude,
      longitude:
        restaurantData?.hotelDetailDiningPage?.restaurantAddress?.longitude,
    },
  };
};
