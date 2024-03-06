import { axios } from "../../../../api/axios-instance"
import { ApiHandler, ApiMethod } from "../../../../types"
import { TRANSACTION_DETAILS } from "../../../../api/api-urls"

export const handler: ApiHandler = {
  createRequest: (url, payload, headers) => {
    return {
      url,
      data: payload,
      method: ApiMethod.get,
      params: payload.params,
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
      TRANSACTION_DETAILS,
      { params: { limit: 10 } },
      {
        customerHash: localStorage?.getItem("customerHash")
          ? localStorage?.getItem("customerHash")
          : localStorage?.getItem("guestCustomerHash"),
      }
    )
    const response = await axios(apiConfig)
    return handler.mapResponse("my account transaction details", response)
  },
}
