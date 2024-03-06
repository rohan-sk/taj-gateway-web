import { ApiHandler, ApiMethod } from "../../../../types"
import { axios } from "../../../../api/axios-instance"
import { GET_OVERVIEW_VOUCHERS } from "./account.constants"

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
    if (status === 200 || status === 201) {
      return {
        error: false,
        data,
      }
    } else {
      return { error: true, data: response }
    }
  },

  apiCall: async (page: number, limit: number, productCategory: string) => {
    const apiConfig = handler.createRequest(
      GET_OVERVIEW_VOUCHERS,
      {
        params: {
          limit,
          page,
          productCategory,
        },
      },
      {
        Authorization: `${global?.window?.localStorage?.getItem("accessToken")}`,
      },
    )
    const response = await axios(apiConfig)
    return handler.mapResponse("user overview vouchers with count", response)
  },
}
