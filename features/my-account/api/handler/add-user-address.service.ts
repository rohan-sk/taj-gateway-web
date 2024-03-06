import { ApiHandler, ApiMethod } from "../../../../types"
import { axios } from "../../../../api/axios-instance"
import { ADD_USER_ADDRESSES } from "./account.constants"

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
    if (status === 200 || status === 201) {
      return {
        error: false,
        data,
      }
    } else {
      return { error: true, data: response }
    }
  },

  apiCall: async (payload: any) => {
    const apiConfig = handler.createRequest(ADD_USER_ADDRESSES, payload, {
      Authorization: `Bearer ${global?.window?.localStorage?.getItem(
        "accessToken"
      )}`,
    })
    const response = await axios(apiConfig)
    return handler.mapResponse("add user addresses", response)
  },
}
