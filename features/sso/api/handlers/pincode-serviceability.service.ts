import { axios } from "../../../../api/axios-instance"
import { ApiHandler, ApiMethod } from "../../../../types"
import { GET_ADDRESS_WITH_PINCODE } from "../../../login/api/handlers/api-constants"

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
  apiCall: async (payload: any) => {
    const payloadRequest = `/${payload}`
    const apiConfig = handler.createRequest(
      `${GET_ADDRESS_WITH_PINCODE + payloadRequest}`,
      {
        Authorization: `Bearer ${global?.window?.localStorage?.getItem(
          "accessToken"
        )}`,
      }
    )
    const response = await axios(apiConfig)
    return handler.mapResponse("Get user address with pincode", response)
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
