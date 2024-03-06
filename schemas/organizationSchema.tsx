export const fetchOrganizationSchema = (
  name: string,
  description: string,
  logo: any
) => {
  return {
    "@context": "http://schema.org",
    "@type": "Organization",
    url: global?.window?.location?.href,
    name: name,
    description: description,
    sameAs: [
      "https://www.facebook.com/TajHotels/",
      "https://twitter.com/TajHotels?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor",
      "https://www.instagram.com/tajhotels/?hl=en",
      "https://www.youtube.com/user/TajMovies",
    ],
    logo: logo,
    address: {
      addressCountry: "India",
      addressRegion: "",
      postalCode: "400005",
      streetAddress:
        "9th Floor Express Towers, Barrister Rajini Patel Marg Nariman Point, Mumbai, Maharashtra 400 021, India",
    },
  };
};
