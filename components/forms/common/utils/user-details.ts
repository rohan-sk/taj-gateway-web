export const LoggedInUserDetails = {
    userPhoneNumber: global?.localStorage?.getItem("userPhoneNumber") || "",
    userCustomerHash: global?.localStorage?.getItem("customerHash") || "",
    userSalutation: global?.localStorage?.getItem("userSalutation") || "",
    userCountryCode: global?.localStorage?.getItem("userCountryCode") || "",
    userFirstName: global?.localStorage?.getItem("userFirstName") || "",
    userLastName: global?.localStorage?.getItem("userLastName") || "",
    userEmail: global?.localStorage?.getItem("userEmail") || "",
    userState: global?.localStorage?.getItem("userState") || "",
    userCity: global?.localStorage?.getItem("userCity") || "",
    userDOB: global?.localStorage?.getItem("userDOB") || "",
    userFullName: `${global?.localStorage?.getItem("userFirstName") || ""} ${global?.localStorage?.getItem("userLastName") || ""}`?.trim()
}