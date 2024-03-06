import { urlFor } from "../lib-sanity";

export const fetchOfferSchema = (
    offersData: any
  ) => {
    return {
        "@context": "http://schema.org",
        "@type": "Offer",
        name: offersData?.pageTitle,
        description: offersData?.seoDescription,
        image: offersData?.thumbnail?.[0]?.imageAsset?.image?.[0]?.asset?._ref
          ? urlFor(
              offersData?.thumbnail?.[0]?.imageAsset?.image?.[0]?.asset?._ref
            )?.url()
          : "",
        startDate: offersData?.validityDates?.[0]?.fromDate,
        endDate: offersData?.validityDates?.[0]?.toDate,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
        location: [
          {
            "@type": "VirtualLocation",
            url: global?.window?.location?.href,
          },
          {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              streetAddress: "",
              addressCountry: "",
              addressLocality: "",
              postalCode: "",
            },
          },
        ],
        performer: { "@type": "PerformingGroup", name: "Taj Hotels" },
      };
  };
  