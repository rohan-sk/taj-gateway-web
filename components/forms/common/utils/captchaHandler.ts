import { verifyCaptcha } from "../../../../utils/ServerActions"

async function captchaHandler(token: string | null, setIsVerified: Function) {
  // Server function to verify captcha

  await verifyCaptcha(token)
    .then((response: any) => {
      setIsVerified(response)
    })
    .catch((error: any) => {
      setIsVerified(false)
      console.log(error)
    })
}
export default captchaHandler
