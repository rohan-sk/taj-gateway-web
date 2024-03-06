import { triggerEvent } from "../.."
import { PathType } from "../../../../types"
import { getCookie } from "../../../cookie"
import { AFFILIATION, PAGE_LANG, TAJ_HOTELS } from "../../constants"

export const handleTopNav = (
  url: string,
  type: PathType | undefined,
  linkText: string,
  dataLayer: any,
  isUserLoggedIn: boolean,
  headerData: any,
) => {
  triggerEvent({
    action: !isUserLoggedIn && linkText === "LOGIN / JOIN" ? "Login_Clicked" : "TopNavigationBar_Clicked",
    params: {
      ...dataLayer,
      pageTitle: url?.replace("/", "")?.toUpperCase(),
      pageURL: `${global?.window?.location?.origin}` + `${url}`,
      location: "",
      eventType: "",
      arrival_date: "",
      departure_date: "",
      LoggedIN: isUserLoggedIn ? "LoggedIn" : "Not LoggedIn",
      noOfAdults: "",
      noOfChild: "",
      noOfRooms: "",
      specialCode: "",
      buttonLinkName: linkText,
      optionSelected: linkText,
      outbound: type === PathType?.internal ? false : true,
      clientId: getCookie("_ga")?.slice(6),
      pageHierarchy: JSON.parse(
        `["${TAJ_HOTELS}","${PAGE_LANG}","${AFFILIATION}","${url?.replace("/", "").toUpperCase()}"]`,
      ),
      pageSection: headerData?.[0]?.title,
      widget_title: headerData?.[0]?.title,
      widget_type: headerData?.[0]?._type,
      link_url: url,
      link_text: linkText,
      journey_type: !isUserLoggedIn && linkText === "LOGIN / JOIN" ? "LogIn" : "",
    },
  })
}
