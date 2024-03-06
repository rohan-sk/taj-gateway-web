export const fetchHotelSchema = (propertyData: any, image: string, defaultOverviewRoute: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: propertyData?.hotelName,
    description: propertyData?.[defaultOverviewRoute]?.description,
    url: global?.window?.location?.href,
    address: {
      "@type": "PostalAddress",
      addressCountry: propertyData?.hotelAddress?.country,
      addressRegion: propertyData?.hotelAddress?.city,
      postalCode: propertyData?.hotelAddress?.pincode,
      streetAddress: propertyData?.hotelAddress?.addressLine1,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&amp;query=${
      propertyData?.hotelAddress?.latitude || ""
    },${propertyData?.hotelAddress?.longitude || ""}`,
    telephone: `${propertyData?.hotelContact?.phone?.[0]?.mobile} ${
      propertyData?.hotelContact?.phone?.[1]?.mobile
        ? `/For Room Reservations : ${propertyData?.hotelContact?.phone?.[1]?.mobile}`
        : ""
    }`,
    image: image,
  };
};
