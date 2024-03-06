import {
  fetchHolidaysXMLURLs,
  fetchVacationThemeURLs,
} from "../utils/fetchHolidaysXMLURLs"

const Holidays = () => {
  return null
}

export const getServerSideProps = async ({ res, req }: any) => {
  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL
  let response = await fetchHolidaysXMLURLs()
  let vacationRes = await fetchVacationThemeURLs()
  let slugs: any = []
  response?.map((holidays: any) => {
    slugs.push(`/taj-holidays/experiences/${holidays?.identifier?.replace(/\&/g, "&amp;")}`)
  })
  vacationRes?.map((theme: any) => {
    slugs.push(`/taj-holidays/vacation-themes/${theme?.identifier?.replace(/\&/g, "&amp;")}`)
  })

  const holidaySitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <url>
    <loc>${domainUrl}en-in/taj-holidays</loc>
    <lastmod>2023-09-02</lastmod>
    <changefreq>Daily</changefreq>
    <priority>1</priority>
    </url>
    ${slugs
      .map((url: any) => {
        return `
          <url>
          <loc>${domainUrl}en-in${url}</loc>
          <lastmod>2023-09-02</lastmod>
          <changefreq>Daily</changefreq>
          <priority>0.9</priority>
          </url>
            `
      })
      .join("")}
      </urlset>
    `

  res.setHeader("Content-Type", "text/xml")
  res.write(holidaySitemap)
  res.end()

  return {
    props: {},
  }
}

export default Holidays
