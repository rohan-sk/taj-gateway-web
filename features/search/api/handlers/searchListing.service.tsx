import { ApiHandler, ApiMethod } from "../../../../types"

import { axios } from "../../../../api/axios-instance"

export const handler: any = {
  createRequest: (url: string, payload: any, headers: any = {}) => {
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

  apiCall: async (searchTerm: any) => {
    const apiConfig = handler.createRequest(
      `${process?.env.NEXT_PUBLIC_SEARCH_BASE_API}items`,
      {
        params: { ...searchTerm },
      },
      {}
    )
    const response = await axios(apiConfig)
    return response.data
  },
}
