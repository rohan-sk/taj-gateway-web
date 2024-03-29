export const GET_OTP_GATEWAY = `${process.env.NEXT_PUBLIC_SSO_BASE_API_URL}generate-phone-otp`
export const VERIFY_OTP_GATEWAY = `${process.env.NEXT_PUBLIC_SSO_BASE_API_URL}verify-phone-otp`
export const GET_EMAIL_OTP = `${process.env.NEXT_PUBLIC_SSO_BASE_API_URL}generate-email-otp`
export const VERIFY_EMAIL_OTP = `${process.env.NEXT_PUBLIC_SSO_BASE_API_URL}verify-email-otp`
export const VERIFY_CHANGE_EMAIL_OTP = `${process.env.NEXT_PUBLIC_SSO_BASE_API_URL}verify-email-change-otp`
export const GENERATE_MEMBERID_OTP = `${process.env.NEXT_PUBLIC_SSO_BASE_API_URL}generate-memberId-otp`
export const VERIFY_MEMBER_ID_OTP = `${process.env.NEXT_PUBLIC_SSO_BASE_API_URL}verify-memberId-otp`
export const LOGOUT = `${process.env.NEXT_PUBLIC_SSO_BASE_API_URL}logout`
export const TicPassword = `${process.env.NEXT_PUBLIC_SSO_BASE_API_URL}tic-password`
export const TIC_GET_EMAIL_OTP_FOR_FORGOT_PASSWORD = `${process.env.NEXT_PUBLIC_SSO_BASE_API_URL}get-otp-for-email-reset-Password`
export const TIC_VERIFY_EMAIL_OTP_FOR_FORGOT_PASSWORD = `${process.env.NEXT_PUBLIC_SSO_BASE_API_URL}verify-email-otp-forgot-Password`
export const TIC_EMAIL_PASSWORD_RESET = `${process.env.NEXT_PUBLIC_SSO_BASE_API_URL}email-reset-password`
export const FETCH_CUSTOMER_MEMBERSHIPS = `${process.env.NEXT_PUBLIC_SSO_BASE_API_URL}fetch-membership`
export const REFRESH_TOKEN = `${process.env.NEXT_PUBLIC_SSO_BASE_API_URL}refresh-token`
export const CREATE_SESSION = `${process.env.NEXT_PUBLIC_SSO_BASE_API_URL}create-session`
export const CHECK_SESSION = `${process.env.NEXT_PUBLIC_SSO_BASE_API_URL}check-session`
export const GENERATE_AUTH_CODE = `${process.env.NEXT_PUBLIC_SSO_BASE_API_URL}generate-auth-code`
export const VERIFY_AUTH_CODE = `${process.env.NEXT_PUBLIC_SSO_BASE_API_URL}verify-authcode`
export const GET_ADDRESS_WITH_PINCODE = `${process.env.NEXT_PUBLIC_SSO_BASE_API_URL}get-location-by-pincode`
export const GET_ADDRESS_WITH_LAT_LONG = `${process.env.NEXT_PUBLIC_SSO_BASE_API_URL}get-location-by-lat-and-long`
