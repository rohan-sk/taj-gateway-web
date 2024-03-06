import { generateCodeChallenge } from "./generate-code-challenge"
import { generateCodeVerifier } from "./generate-code-verifier"

interface crossBrandLoginInterface {
  url: string
  loggedIn: boolean
  userStore: any
  isSEB?: boolean
}

export const CrossSiteNavigation = async ({
  url,
  loggedIn,
  userStore,
  isSEB,
}: crossBrandLoginInterface) => {
  if (loggedIn) {
    let codeVerifier = generateCodeVerifier()
    let codeChallenge = await generateCodeChallenge(codeVerifier)
    let authCode = await userStore?.generateAuthCodeApi(codeChallenge)
    if (authCode?.error === false) {
      if (isSEB) {
        window.location.href = `${url}authCode=${authCode?.data?.authCode}&codeVerifier=${codeVerifier}&codeChallenge=${codeChallenge}`;
      } else {
        url &&
          Object?.assign(document.createElement("a"), {
            target: "_blank",
            rel: "noopener noreferrer",
            href: `${url}authCode=${authCode?.data?.authCode}&codeVerifier=${codeVerifier}&codeChallenge=${codeChallenge}`,
          }).click()
      }
    } else {
      if (isSEB) {
        window.location.href = url;
      } else {
        url &&
          Object?.assign(document.createElement("a"), {
            target: "_blank",
            rel: "noopener noreferrer",
            href: url,
          }).click()
      }
    }
  } else {
    if (isSEB) {
      window.location.href = url;
    } else {
      url &&
        Object?.assign(document.createElement("a"), {
          target: "_blank",
          rel: "noopener noreferrer",
          href: url,
        }).click()
    }
  }
}