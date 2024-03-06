import GetDefaultValue, {
  CheckDefaultValue,
} from "../validations/getDefaultValue"

export function StoreLoginData(response: any, userStore?: any, router?: any) {
  const pathName = window?.location?.pathname

  if (response?.headers) {
    global?.window?.localStorage?.setItem(
      "accessToken",
      response?.headers?.["x-access-token"]
    )
    global?.window?.localStorage?.setItem(
      "refreshToken",
      response?.headers["x-refresh-token"]
    )
  }
  if (response?.headers?.["x-access-token"]) {
    userStore?.fetchCustomerMemberships()
    userStore?.createSessionApi()
  }
  if (userStore) {
    userStore?.setUserDetailsStore(
      response?.data?.nameDetails?.salutation,
      GetDefaultValue(response?.data?.nameDetails?.firstName),
      GetDefaultValue(response?.data?.nameDetails?.lastName),
      GetDefaultValue(response?.data?.primaryMobile?.isdCode),
      GetDefaultValue(response?.data?.primaryMobile?.phoneNumber),
      CheckDefaultValue(response?.data?.primaryEmailId),
      response?.data?.customerHash,
      GetDefaultValue(response?.data?.dob),
      GetDefaultValue(response?.data?.gender),
      response?.data?.loyaltyInfo?.[0]?.loyaltyPoints,
      GetDefaultValue(response?.data?.tcpNumber),
      GetDefaultValue(response?.data?.addresses),
      response?.data?.loyaltyInfo?.[0]?.currentSlab || "copper"
    )
  }
  global?.window?.localStorage?.setItem(
    "customerHash",
    response?.data?.customerHash
  ),
    GetDefaultValue(response?.data?.dob) &&
      global?.window?.localStorage?.setItem(
        "userDOB",
        GetDefaultValue(response?.data?.dob)
      ),
    global?.window?.localStorage?.setItem(
      "neupassStartDateInfo",
      response?.data?.neuPassInfo?.startDate
    ),
    GetDefaultValue(response?.data?.addresses?.[0]?.country)
  global?.window?.localStorage?.setItem(
    "userNationality",
    GetDefaultValue(response?.data?.addresses?.[0]?.country)
  ),
    global?.window?.localStorage?.setItem(
      "userEmailVerified",
      response?.data?.emailVerified
    ),
    GetDefaultValue(response?.data?.gender) &&
      global?.window?.localStorage?.setItem(
        "userGender",
        GetDefaultValue(response?.data?.gender)
      ),
    GetDefaultValue(response?.data?.nameDetails?.salutation) &&
      global?.window?.localStorage?.setItem(
        "userSalutation",
        GetDefaultValue(response?.data?.nameDetails?.salutation)
      ),
    GetDefaultValue(response?.data?.nameDetails?.firstName) &&
      global?.window?.localStorage?.setItem(
        "userFirstName",
        GetDefaultValue(response?.data?.nameDetails?.firstName)
      ),
    GetDefaultValue(response?.data?.nameDetails?.lastName) &&
      global?.window?.localStorage?.setItem(
        "userLastName",
        GetDefaultValue(response?.data?.nameDetails?.lastName)
      ),
    CheckDefaultValue(response?.data?.primaryEmailId) &&
      global?.window?.localStorage?.setItem(
        "userEmail",
        CheckDefaultValue(response?.data?.primaryEmailId)
      ),
    GetDefaultValue(response?.data?.primaryMobile?.isdCode) &&
      global?.window?.localStorage?.setItem(
        "userCountryCode",
        GetDefaultValue(response?.data?.primaryMobile?.isdCode)
      ),
    GetDefaultValue(response?.data?.primaryMobile?.phoneNumber) &&
      global?.window?.localStorage?.setItem(
        "userPhoneNumber",
        GetDefaultValue(response?.data?.primaryMobile?.phoneNumber)
      )
  global?.window?.localStorage?.setItem(
    "userTier",
    response?.data?.loyaltyInfo?.[0]?.currentSlab || "copper"
  )
  GetDefaultValue(response?.data?.tcpNumber) &&
    global?.window?.localStorage?.setItem(
      "userTICNumber",
      GetDefaultValue(response?.data?.tcpNumber)
    )
  global?.window?.localStorage?.setItem(
    "neuCoins",
    response?.data?.loyaltyInfo?.[0]?.loyaltyPoints
  )
  if (router) {
    const { pathname, query } = router
    const params = new URLSearchParams(query)
    params.delete("authCode")
    params.delete("codeVerifier")
    router.replace({ pathname, query: params.toString() }, undefined, {
      shallow: true,
    })
  }
}
