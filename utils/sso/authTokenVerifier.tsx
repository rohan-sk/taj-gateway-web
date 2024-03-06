import { generateCodeChallenge } from "./generate-code-challenge"
import { StoreLoginData } from "./store-login-response"

export async function AuthTokenVerifier(userStore: any, router: any) {
  const searchParams = new URLSearchParams(window.location.search)
  const authCode = searchParams?.get("authCode")
  const codeVerifier = searchParams?.get("codeVerifier")
  let codeChallenge: any
  codeChallenge = generateCodeChallenge(codeVerifier)
  const verifyAuthCodeRes = await userStore?.verifyAuthCodeApi(
    JSON.stringify({
      authCode: authCode,
      codeVerifier: codeVerifier,
      codeChallenge: codeChallenge,
    })
  )
  if (verifyAuthCodeRes?.error === false) {
    StoreLoginData(verifyAuthCodeRes, userStore, router)
  }
}
