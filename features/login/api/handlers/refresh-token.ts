import { axios } from "../../../../api/axios-instance"
import { ApiHandler, ApiMethod } from "../../../../types"
import { REFRESH_TOKEN } from "./api-constants"

export const handler: ApiHandler = {
  createRequest: (url: string, headers: any) => {
    return {
      url,
      method: ApiMethod.get,
      headers: {
        ...headers,
      },
    }
  },

  apiCall: async () => {
    const apiConfig = handler.createRequest(REFRESH_TOKEN, {
      Authorization: `Bearer ${global?.window?.localStorage?.getItem(
        "refreshToken"
      )}`,
    })
    const response = await axios(apiConfig)
    return handler.mapResponse("create session", response)
  },
  mapResponse: (title: string, response: any) => {
    const {
      data,
      status,
      headers,
    }: { data: any; status: number; headers: any } = response || {}
    if (status === 201 || status === 200) {
      global?.window?.localStorage?.setItem(
        "accessToken",
        headers["x-access-token"]
      )
      return {
        error: false,
        data,
        headers,
      }
    } else {
      return { error: true, data: response }
    }
  },
}
