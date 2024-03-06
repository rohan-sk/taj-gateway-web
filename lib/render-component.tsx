import React from "react"
import dynamic from "next/dynamic"
const RenderDividerComponent = dynamic(() => import("../components/Divider"))
const Group = dynamic(() => import("../components/Divider"))
const RenderCustomComponent = dynamic(() => import("../components/customComponents"))
const RenderTabsComponent = dynamic(() => import("../components/tabs"))
const RenderFaqsComponent = dynamic(() => import("../components/faq"))
const RenderStepperComponent = dynamic(() => import("../components/stepper"))
const RenderCardComponent = dynamic(() => import("../components/card").then((module) => module.RenderCardComponent))
const RenderInformationComponent = dynamic(() =>
  import("../components/rich-data").then((module) => module.RenderInformationComponent),
)
const RenderAccordionComponent = dynamic(() =>
  import("../components/accordion").then((module) => module.RenderAccordionComponent),
)
const RenderCarouselComponent = dynamic(() =>
  import("../components/carousal").then((module) => module.RenderCarouselComponent),
)
const RenderMediaComponent = dynamic(() => import("../components/media").then((module) => module.RenderMediaComponent))
const RenderBannerComponent = dynamic(() =>
  import("../components/banner").then((module) => module.RenderBannerComponent),
)

export const renderComponent = (
  type: string,
  props: any,
  index?: number,
  characterLimitForItemDescription?: number,
) => {
  switch (type) {
    case "group":
      return <Group {...props} />
    case "card":
      return <RenderCardComponent index={index} {...props} characterLimit={characterLimitForItemDescription} />
    case "banner":
      return <RenderBannerComponent {...props} />
    case "tabLinks":
      return <RenderTabsComponent {...props} />
    case "tabs":
      return <RenderTabsComponent {...props} />
    case "carousel":
      return <RenderCarouselComponent {...props} />
    case "media":
      return <RenderMediaComponent {...props} />
    case "information":
      return <RenderInformationComponent {...props} index={index} />
    case "accordion":
      return <RenderAccordionComponent {...props} index={index} />
    case "faqs":
      return <RenderFaqsComponent {...props} />
    case "stepper":
      return <RenderStepperComponent {...props} />
    case "divider":
      return <RenderDividerComponent {...props} />
    case "custom":
      return <RenderCustomComponent {...props} />
    default:
      return <></>
  }
}
