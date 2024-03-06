import { ApiHandler, ApiMethod } from "../../../../types"
import { axios } from "../../../../api/axios-instance"
import { GET_USER_ADDRESSES } from "./account.constants"

export const handler: ApiHandler = {
  createRequest: (url, payload, headers) => {
    return {
      url,
      method: ApiMethod.get,
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

  apiCall: async () => {
    const apiConfig = handler.createRequest(
      GET_USER_ADDRESSES,
      {},
      {
        Authorization: `Bearer ${global?.window?.localStorage?.getItem(
          "accessToken"
        )}`,
      }
    )
    const response = await axios(apiConfig)
    return handler.mapResponse("fetch user addresses", response)
  },
}
