import { ApiHandler, ApiMethod } from "../../../../types"
import { axios } from "../../../../api/axios-instance"
import { DELETE_USER_ADDRESS } from "./account.constants"

export const handler: ApiHandler = {
  createRequest: (url, payload, headers) => {
    return {
      url,
      method: ApiMethod.delete,
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
    const apiConfig = handler.createRequest(DELETE_USER_ADDRESS, payload, {
      Authorization: `Bearer ${global?.window?.localStorage?.getItem(
        "accessToken"
      )}`,
    })
    const response = await axios(apiConfig)
    return handler.mapResponse("delete user addresses", response)
  },
}
