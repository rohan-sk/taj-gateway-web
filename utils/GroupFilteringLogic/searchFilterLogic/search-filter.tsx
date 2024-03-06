import React, { useContext, useEffect, useMemo, useState } from "react"
import { CustomSearch } from "../../../components/hoc/Search/CustomSearch"
import { theme } from "../../../lib/theme"
import { useMobileCheck } from "../../isMobilView"
import DesktopPxToVw, { MobilePxToVw } from "../../DesktopFontCalc"
import { useDebounce } from "../../useDebounce"
import { MemberDataLayer } from "../../analytics/member-data-layer"
import { GAStore, UserStore } from "../../../store"
import { GLOBAL_STORES } from "../../Constants"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { triggerEvent } from "../../analytics"
import { getCookie } from "../../cookie"
import { AFFILIATION } from "../../analytics/constants"

const SearchFilter = ({
  backgroundColor,
  filterTypeData,
  props,
  textColor,
  setFilteredProps,
  numberOfFilter,
  iconColor,
}: any) => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const debouncedStaySearchTerm = useDebounce(searchTerm, 300)
  const context = useContext(IHCLContext)
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(UserStore, gaStoreData)
  let filterTerm = filterTypeData?.filterTerm

  useEffect(() => {
    let filteredArr = []
    if (debouncedStaySearchTerm) {
      filteredArr = props?.items?.filter((card: any) => {
        if (card?.[filterTerm]?.toLowerCase()?.includes(debouncedStaySearchTerm?.toLowerCase()?.trim())) {
          return card
        }
      })
      setFilteredProps({
        ...props,
        items: filteredArr.length > 0 ? filteredArr : props?.items,
      })
    } else if (debouncedStaySearchTerm?.length === 0) {
      setFilteredProps({ ...props, items: props?.items })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedStaySearchTerm, props?.items])
  //DONOT remove the code untill analytics is compltetd
  // useEffect(() => {
  //   let pathname = window.location.pathname
  //   let isCity = pathname.includes("destinations")
  //   // uncomment if destinationselected need to be triggred in hotel search
  //   //will remove commented code after  analytics events got signoff
  //   // let isDestination = pathname.includes("hotels")
  //   // if (debouncedStaySearchTerm?.length > 2 && isCity) {
  //   //   triggerEvent({
  //   //     action: "citySelected",
  //   //     params: {
  //   //       ...dataLayer,
  //   //       destinationSelected: searchTerm,
  //   //       eventType: "",
  //   //       eventName: "",
  //   //       eventPlace: "",
  //   //       eventTicketsQty: "",
  //   //       eventDate: "",
  //   //       clientId: getCookie("_ga")?.slice(6),
  //   //       visitSource: "",
  //   //       brandName: AFFILIATION,
  //   //       link_url: "",
  //   //       link_text: searchTerm,
  //   //       // widget_title: label,
  //   //       widget_description: "",
  //   //       widget_type: "",
  //   //       widget_position: "",
  //   //       outbound: false,
  //   //       item_name: searchTerm,
  //   //       item_type: "",
  //   //       // no_of_items: data?.length,
  //   //       location: searchTerm || "",
  //   //       city: searchTerm,
  //   //     },
  //   //   })
  //   // }
  //   // else if (isDestination) {
  //   //   triggerEvent({
  //   //     action: "destinationSelected",
  //   //     params: {
  //   //       ...dataLayer,
  //   //       destinationSelected: searchTerm,
  //   //       eventType: "",
  //   //       eventName: "",
  //   //       eventPlace: "",
  //   //       eventTicketsQty: "",
  //   //       eventDate: "",
  //   //       clientId: getCookie("_ga")?.slice(6),
  //   //       visitSource: "",
  //   //       brandName: AFFILIATION,
  //   //       link_url: "",
  //   //       link_text: searchTerm,
  //   //       // widget_title: label,
  //   //       widget_description: "",
  //   //       widget_type: "",
  //   //       widget_position: "",
  //   //       outbound: false,
  //   //       item_name: searchTerm,
  //   //       item_type: "",
  //   //       // no_of_items: data?.length,
  //   //       location: searchTerm || "",
  //   //       city: searchTerm,
  //   //     },
  //   //   })
  //   // }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [debouncedStaySearchTerm])
  const isMobile = useMobileCheck()

  return (
    <CustomSearch
      fontSizeProp={isMobile ? MobilePxToVw(22) : DesktopPxToVw(24)}
      maxWidth={isMobile ? "100% !important" : numberOfFilter > 3 ? "17.188vw" : null}
      value={searchTerm}
      textColor={textColor}
      setValue={setSearchTerm}
      backgroundColor={backgroundColor}
      placeholder={filterTypeData?.filterPlaceholder}
      debouncedSearchTerm={debouncedStaySearchTerm}
      styles={{
        fontWeight: 300,
        fontStyle: "normal",
        fontFamily: "Inter",
        color: theme?.palette?.ihclPalette?.hexSeventeen,
      }}
      iconColor={iconColor}
    />
  )
}

export default SearchFilter
