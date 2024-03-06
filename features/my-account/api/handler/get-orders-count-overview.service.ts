import { ApiHandler, ApiMethod } from "../../../../types"
import { axios } from "../../../../api/axios-instance"
import { GET_USER_ORDERS_COUNT_OVERVIEW } from "./account.constants"

export const handler: ApiHandler = {
  createRequest: (url, payload, headers) => {
    return {
      url,
      method: ApiMethod.get,
      data: payload,
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
      GET_USER_ORDERS_COUNT_OVERVIEW,
      { params: { limit: 2 } },
      {
        customerHash: window?.localStorage.getItem("customerHash") || "",
        Authorization: `Bearer ${global?.window?.localStorage?.getItem(
          "accessToken"
        )}`       
      }
    )
    const response = await axios(apiConfig)
    return handler.mapResponse("user account orders count overview", response)
  },
}
