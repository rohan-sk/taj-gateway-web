import { useEffect, useState } from "react"
import { PAGELANG, POWERED_BY_WIDGET } from "../../features/booking/constants"
import { ageFromDOB } from "../getDate"
import { UseAddress } from "../hooks/useAddress"
import { useLoggedIn } from "../hooks/useLoggedIn"
import { useMobileCheck } from "../isMobilView"
import {
  CHAMBERS_ID,
  CHAMBERS_TIER,
  CUSTOMER_HASH,
  DOB,
  EPICURE_ID,
  EPICURE_TIER,
  GENDER,
  USER_EMAIL,
  USER_FIRST_NAME,
  USER_LAST_NAME,
  USER_NATIONALITY,
  USER_PHONE_NUMBER,
  USER_TIRE,
  USER_TYPE,
  LOGIN_METHOD,
  AFFILIATION,
  isUserLoggedIn,
  TAJ_HOTELS,
  USER_COUNTRY_CODE,
} from "./constants"
import useStorage from "../useStorage"
import crypto from "crypto"

export const MemberDataLayer = (
  userStore: any,
  gaStoreData: any,
  widgetTitle?: String,
  widgetDescription?: string,
  widgetType?: string,
) => {
  const { getItem } = useStorage()
  const isLoggedIn = useLoggedIn()
  const address = UseAddress(userStore)
  const isMobile = useMobileCheck()
  const mobileNumber =
    `${userStore?.userDetails?.countryCode || getItem("userCountryCode") || USER_COUNTRY_CODE || ""}` +
    `${userStore?.userDetails?.phone || getItem("userPhoneNumber") || USER_PHONE_NUMBER}`
  let digitalData: any

  digitalData = {
    device: isMobile ? "Mobile" : "Desktop",
    pageLanguage: PAGELANG,
    isMember: isLoggedIn || isUserLoggedIn ? "Yes" : "No",
    membershipType:
      isLoggedIn || isUserLoggedIn
        ? `${
            getItem("chambersMemberTier") || CHAMBERS_TIER || getItem("epicureMemberTier") || EPICURE_TIER || "Neupass"
          } - ${getItem("userTier") || USER_TIRE}`
        : "",
    memberEmailId:
      userStore?.userDetails?.email || USER_EMAIL
        ? crypto
            .createHash("sha256")
            .update(userStore?.userDetails?.email || USER_EMAIL)
            .digest("hex")
        : "",

    memberMobileNo:
      userStore?.userDetails?.phone || getItem("userPhoneNumber") || USER_PHONE_NUMBER
        ? crypto.createHash("sha256").update(mobileNumber.toString()).digest("hex")
        : "",
    memberName:
      isLoggedIn || isUserLoggedIn
        ? `${getItem("userFirstName") || USER_FIRST_NAME}` + ` ${getItem("userLastName") || USER_LAST_NAME}`
        : "",
    memberGender: userStore?.userDetails?.gender || GENDER || "",
    memberDOB: userStore?.userDetails?.dob || DOB || "",
    membershipNumber:
      getItem("chambersMemberID") ||
      CHAMBERS_ID ||
      getItem("epicureMemberID") ||
      EPICURE_ID ||
      getItem("userPhoneNumber") ||
      USER_PHONE_NUMBER ||
      "",
    memberState: address?.state ? address?.state : "",
    memberCity: address?.cityTown ? address?.cityTown : "",
    memberPincode: address?.pinCode ? address?.pinCode : "",
    memberCountry: getItem("userNationality") || address?.country || "",
    existingCustomer:
      EPICURE_ID || CHAMBERS_ID || getItem("epicureMemberID") || getItem("chambersMemberID") ? "Yes" : "No",
    userId:
      getItem("customerHash") || CUSTOMER_HASH ? getItem("customerHash")?.toString() || CUSTOMER_HASH?.toString() : "",
    encryptedEmailID:
      userStore?.userDetails?.email || USER_EMAIL
        ? crypto
            .createHash("sha256")
            .update(userStore?.userDetails?.email || USER_EMAIL)
            .digest("hex")
        : "",
    encryptedMobileNo:
      userStore?.userDetails?.phone || getItem("userPhoneNumber") || USER_PHONE_NUMBER
        ? crypto.createHash("sha256").update(mobileNumber.toString()).digest("hex")
        : "",
    widget_powered_by: POWERED_BY_WIDGET,
    userType: isLoggedIn || isUserLoggedIn ? getItem("userType") || USER_TYPE : "",
    userStatus: isLoggedIn || isUserLoggedIn ? "LoggedIn" : "Not LoggedIn",
    memberAge: isLoggedIn || (isUserLoggedIn && DOB) ? ageFromDOB(DOB) : "",
    pageTitle: gaStoreData?.pageData?.pageTitle || "",
    widget_title: widgetTitle || "",
    widget_description: widgetDescription || "",
    widget_type: widgetType || "",
    widget_position: "",
    pageURL: global?.window?.location?.href,
    pageSection: "",
    pageHierarchy: JSON.parse(
      `["${TAJ_HOTELS}",` + `"${PAGELANG}",` + `"${AFFILIATION}",` + `"${gaStoreData?.pageData?.pageTitle}"]`,
    ),
    pageReferrer: global?.window?.localStorage?.getItem("previousPageURL") ?? "",
    pageReferrerTitle: global?.window?.localStorage?.getItem("previousPageTitle") ?? "",
    method: isLoggedIn || isUserLoggedIn ? getItem("loginJourneyType") || LOGIN_METHOD : "",
    brandName: AFFILIATION,
  }

  return digitalData
}
