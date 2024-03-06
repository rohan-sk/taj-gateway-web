import { ApiHandler, ApiMethod } from "../../../../types"

import { axios } from "../../../../api/axios-instance"
import { FETCH_NEUCOINS } from "../../constants"

export const handler: ApiHandler = {
  createRequest: (url, payload, headers) => {
    return {
      url,
      method: ApiMethod.post,
      data: payload,
      headers: {
        ...headers,
      },
    }
  },

  mapResponse: (title: string, response: any) => {
    const { data, status }: { data: any; status: number } = response || {}
    if (status === 200) {
      return {
        error: false,
        data,
      }
    } else {
      return { error: true, data: response }
    }
  },

  apiCall: async (authorizationId: string) => {
    const apiConfig = handler.createRequest(FETCH_NEUCOINS, JSON.stringify({ authorization: authorizationId }), {
      Authorization:
        global?.window?.localStorage?.getItem("accessToken") &&
        `Bearer ${global?.window?.localStorage?.getItem("accessToken")}`,
    })
    const response = await axios(apiConfig)
    return handler.mapResponse("Neu Coins Redemption", response)
  },
}
