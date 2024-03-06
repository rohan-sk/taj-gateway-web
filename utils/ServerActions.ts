import axios from "axios"
import { VERIFY_CAPTCHA } from "../api/api-urls"

export async function verifyCaptcha(token: string | null) {
  let data = JSON.stringify({
    token,
  })

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: VERIFY_CAPTCHA,
    headers: {
      "Content-Type": "application/json",
    },
    data,
  }

  return new Promise((resolve, reject) => {
    axios
      .request(config)
      .then((response) => {
        if (response.data.success) {
          resolve(response.data.success)
        } else {
          reject(new Error("verify captcha failed"))
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}
