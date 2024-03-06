import { triggerEvent } from "../.."
import { getCookie } from "../../../cookie"
import crypto from "crypto"
export const handleCredEntered = (
  eventName: string,
  urlType: any,
  url: any,
  title: string,
  dataLayer: any,
  userStore: any,
  props: any,
  number: string,
  email: string,
  memberShipNo: any,
  journey_type: string,
  widgetTitle?: String,
) => {
  triggerEvent({
    action: eventName,
    params: {
      ...dataLayer,
      encryptedMobileNo:
        userStore?.userMobileNumber || number
          ? crypto
              .createHash("sha256")
              .update(userStore?.userMobileNumber || number)
              .digest("hex")
          : "",
      encryptedEmailID:
        userStore?.userEmailID || email
          ? crypto
              .createHash("sha256")
              .update(userStore?.userEmailID || email)
              .digest("hex")
          : "",
      membershipNumber: memberShipNo ? crypto.createHash("sha256").update(memberShipNo).digest("hex") : "",
      buttonLinkName: title,
      link_text: title,
      link_url: url,
      location: "",
      eventType: "",
      eventName: "",
      eventPlace: "",
      eventTicketsQty: "",
      eventDate: "",
      specialCode: "",
      visitSource: "",
      redemptionType: "",
      redemptionName: "",
      redemptionDescription: "",
      pointsType: "",
      pointstobeRedeemed: "",
      outbound: urlType === "internal" ? false : true,
      journey_type: journey_type,
      clientId: getCookie("_ga")?.slice(6),
      widget_title: props?.title || widgetTitle,
      widget_type: props?._type,
      widget_description: "",
      pageSection: props?.title || widgetTitle,
    },
  })
}
