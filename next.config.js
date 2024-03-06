const ContentSecurityPolicy = ` 
default-src 'self' *.googletagmanager.com app.link;
script-src 'unsafe-inline' 'self' *.googletagmanager.com www.google.com public.releases.juspay.in *.cloud.yellow.ai www.gstatic.com sit-r2-account.tatadigital.com accounts.tatadigital.com maps.googleapis.com assets.juspay.in code.jquery.com test.ccavenue.com 'unsafe-eval';
style-src 'unsafe-inline' 'self' app.link;
object-src 'self' *.sanity.io app.link;
base-uri 'self';
connect-src 'self' *.sanity.io analytics.google.com *.googletagmanager.com ocl5w36p.api.sanity.io cdn.sanity.io www.google.com *.blob.core.windows.net *.api-devv2.tajhotels.com api-devv2.tajhotels.com *.api-qa1v2.tajhotels.com api-qa1v2.tajhotels.com *.api-uatv2.tajhotels.com api-uatv2.tajhotels.com assets.juspay.in ;
font-src 'self';
media-src 'self' cdn.sanity.io assets-preprod1-528v2.tajhotels.com s3.amazonaws.com cdn.jsdelivr.net;
img-src 'self' *.sanity.io cdn.sanity.io www.google.com www.googletagmanager.com assets-preprod1-528v2.tajhotels.com s3.amazonaws.com cdn.jsdelivr.net;
manifest-src 'self' app.link;`
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  basePath: "/en-in",
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // {
          //   key: "X-Frame-Options",
          //   value: "SAMEORIGIN",
          // },
          // {
          //   key: "Content-Security-Policy",
          //   value: ContentSecurityPolicy.replace(/\n/g, ""),
          // },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // {
          //   key: "X-XSS-Protection",
          //   value: "1; mode=block",
          // },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en-in",
        basePath: false,
        permanent: false,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: "/robots.txt",
        destination: `${process.env.NEXT_PUBLIC_DOMAIN_URL}en-in/robots.txt`,
        basePath: false,
      },
      {
        source: "/sitemap.xml",
        destination: `${process.env.NEXT_PUBLIC_DOMAIN_URL}en-in/sitemap.xml`,
        basePath: false,
      },
      {
        source: "/destination.xml",
        destination: `${process.env.NEXT_PUBLIC_DOMAIN_URL}en-in/destination.xml`,
        basePath: false,
      },
      {
        source: "/about-taj.xml",
        destination: `${process.env.NEXT_PUBLIC_DOMAIN_URL}en-in/about-taj.xml`,
        basePath: false,
      },
      {
        source: "/gifting-shopping.xml",
        destination: `${process.env.NEXT_PUBLIC_DOMAIN_URL}en-in/gifting-shopping.xml`,
        basePath: false,
      },
      {
        source: "/j-wellness-circle.xml",
        destination: `${process.env.NEXT_PUBLIC_DOMAIN_URL}en-in/j-wellness-circle.xml`,
        basePath: false,
      },
      {
        source: "/offers.xml",
        destination: `${process.env.NEXT_PUBLIC_DOMAIN_URL}en-in/offers.xml`,
        basePath: false,
      },
      {
        source: "/restaurants.xml",
        destination: `${process.env.NEXT_PUBLIC_DOMAIN_URL}en-in/restaurants.xml`,
        basePath: false,
      },
      {
        source: "/taj-holidays.xml",
        destination: `${process.env.NEXT_PUBLIC_DOMAIN_URL}en-in/taj-holidays.xml`,
        basePath: false,
      },
      {
        source: "/taj-membership.xml",
        destination: `${process.env.NEXT_PUBLIC_DOMAIN_URL}en-in/taj-membership.xml`,
        basePath: false,
      },
      {
        source: "/taj-properties.xml",
        destination: `${process.env.NEXT_PUBLIC_DOMAIN_URL}en-in/taj-properties.xml`,
        basePath: false,
      },
    ]
  },

  compiler: {
    removeConsole:
      process.env.NEXT_PUBLIC_ENVIRONMENT === "dev" || process.env.NEXT_PUBLIC_ENVIRONMENT === "sit" ? false : true,
  },
}

module.exports = nextConfig
