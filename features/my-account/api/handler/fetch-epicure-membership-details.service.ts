import { ApiHandler, ApiMethod } from "../../../../types"
import { axios } from "../../../../api/axios-instance"
import { GET_EPICURE_MEMBERSHIP_DETAILS } from "./account.constants"

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

  apiCall: async (pageCount: any) => {
    const apiConfig = handler.createRequest(
      GET_EPICURE_MEMBERSHIP_DETAILS,
      {},
      {
        Authorization: `${global?.window?.localStorage?.getItem(
          "accessToken"
        )}`,
      }
    )
    const response = await axios(apiConfig)
    return handler.mapResponse("get epicure cards", response)
  },
}
