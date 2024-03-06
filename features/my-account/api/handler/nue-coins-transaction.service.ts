import { axios } from "../../../../api/axios-instance"
import { ApiHandler, ApiMethod } from "../../../../types"
import { NEUCOINS_TRANSACTION } from "../../../../api/api-urls"

export const handler: ApiHandler = {
  createRequest: (url, payload, headers) => {
    return {
      url,
      data: payload,
      method: ApiMethod.post,
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

  apiCall: async () => {
    const apiConfig = handler.createRequest(
      NEUCOINS_TRANSACTION,
      {
        authorization: `${global?.window?.localStorage?.getItem("accessToken")}`,
      },
      {}
    )
    const response = await axios(apiConfig)
    return handler.mapResponse("nueCoins transaction", response)
  },
}
