export const fetchLocalBusinessSchema = (
  title: string,
  image: string,
  propertyData?: any
) => {
  return {
    "@context": "http://schema.org/",
    "@type": "LocalBusiness",
    name: title,
    image: image,
    url: global?.window?.location?.href,
    telephone: `${propertyData?.hotelContact?.phone?.[0]?.mobile} ${
      propertyData?.hotelContact?.phone?.[1]?.mobile
        ? `/ ${propertyData?.hotelContact?.phone?.[1]?.mobile}`
        : ""
    }`,
    address: {
      "@type": "PostalAddress",
      streetAddress: propertyData?.hotelAddress?.addressLine1,
      addressCountry: propertyData?.hotelAddress?.country,
      addressLocality: propertyData?.hotelAddress?.city,
      postalCode: propertyData?.hotelAddress?.pincode,
    },
    "@id": global?.window?.location?.href,
    geo: {
      "@type": "GeoCoordinates",
      latitude: `https://www.google.com/maps/search/?api=1&query=${
        propertyData?.hotelAddress?.latitude || ""
      }`,
      longitude: `https://www.google.com/maps/search/?api=2&query=${
        propertyData?.hotelAddress?.longitude || ""
      }`,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: [
      "https://www.facebook.com/TajHotels/",
      "https://twitter.com/TajHotels?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor",
      "https://www.instagram.com/tajhotels/?hl=en",
      "https://www.youtube.com/user/TajMovies",
    ],
  };
};
