import dynamic from "next/dynamic"

const SiteMapAccordianComponent = dynamic(
  () => import("./sitemap-accordian.component")
)

const RenderSiteMapComponent = (props: any) => {
  const variant = props?.largeVariant

  switch (variant) {
    case "accordion-sitemap":
      return <SiteMapAccordianComponent {...props} />
    default:
      return <></>
  }
}
export default RenderSiteMapComponent
