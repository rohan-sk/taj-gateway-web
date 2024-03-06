import CryptoJS, { SHA256 as sha256 } from "crypto-js"

export const generateCodeChallenge = (codeVerifier: any) => {
  return base64URL(sha256(codeVerifier))
}

function base64URL(string: any) {
  return string
    ?.toString(CryptoJS.enc.Base64)
    ?.replace(/=/g, "")
    ?.replace(/\+/g, "-")
    ?.replace(/\//g, "_")
}
