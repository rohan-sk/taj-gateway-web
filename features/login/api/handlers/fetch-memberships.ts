import { axios } from "../../../../api/axios-instance"
import { ApiHandler, ApiMethod } from "../../../../types"
import { FETCH_CUSTOMER_MEMBERSHIPS } from "./api-constants"

export const handler: ApiHandler = {
  createRequest: (url: string, headers: any) => {
    return {
      url,
      method: ApiMethod.get,
      headers: {
        ...headers,
      },
    }
  },

  apiCall: async () => {
    const apiConfig = handler.createRequest(FETCH_CUSTOMER_MEMBERSHIPS, {
      Authorization: `Bearer ${global?.window?.localStorage?.getItem(
        "accessToken"
      )}`,
    })
    const response = await axios(apiConfig)
    return handler.mapResponse("fetch memberships", response)
  },
  mapResponse: (title: string, response: any) => {
    const { data, status }: { data: any; status: number } = response || {}
    if (status === 200) {
      return {
        error: false,
        data,
        status,
      }
    } else {
      return { error: true, data: response }
    }
  },
}
