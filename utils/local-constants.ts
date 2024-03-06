export const UserDetails = {
  userFirstName: global?.window?.localStorage.getItem("userFirstName"),
  userLastName: global?.window?.localStorage.getItem("userLastName"),
  userEmail: global?.window?.localStorage.getItem("userEmail"),
  userPhoneNumber: global?.window?.localStorage.getItem("userPhoneNumber"),
  userCountryCode: global?.window?.localStorage.getItem("userCountryCode"),
}