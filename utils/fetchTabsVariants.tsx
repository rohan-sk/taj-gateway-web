import { MobilePxToVw } from "./DesktopFontCalc"

export const fetchTabsVariants = (themes: any, setSelectedType: any) => {
  return {
    items: themes?.map((item: any) => {
      return {
        _type: "card",
        handleProperty: setSelectedType,
        title: item?.title,
        url: "",
        isdynamicPadding: true,
        largeVariant: "ihcl.core.card-center-aligned-title-tabs",
        variant: "ihcl.core.card-center-aligned-title-tabs",
      }
    }),
    largeVariant: "ihcl.core.group.multi-static-with-tabs",
    variant: "ihcl.core.group.option-selector-popup-modal",
    title: "",
    isFromProperty: true,
    isComponentFullWidth: false,
    isMobileComponentFullWidth: false,
    initialSlide: 0,
    aesthetic: {
      padding: {
        desktop: "0 12.5vw",
        mobile: `0 ${MobilePxToVw(44)}`,
      },
    },
  }
}
