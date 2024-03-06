import { axios } from "../../../../api/axios-instance"
import { GET_USER_VOUCHERS } from "./account.constants"
import { ApiHandler, ApiMethod } from "../../../../types"

export const handler: ApiHandler = {
  createRequest: (url, payload, headers) => {
    return {
      url,
      data: payload,
      method: ApiMethod.get,
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
      `${GET_USER_VOUCHERS}/${global?.window?.localStorage.getItem(
        "epicureMemberID"
      )}`,
      "",
      {}
    )
    const response = await axios(apiConfig)
    return handler.mapResponse("get customer vouchers", response)
  },
}
