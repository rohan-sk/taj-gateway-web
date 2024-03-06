import { ApiHandler, ApiMethod } from "../types"
import { axios } from "../api/axios-instance"
import { CCAVENUE_ENCRYPTION_API } from "../features/booking/constants"

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
    if (status === 200) {
      return {
        error: false,
        data,
      }
    } else {
      return { error: true, data: response }
    }
  },

  apiCall: async (formBody: string, workingKey: string) => {
    const apiConfig = handler.createRequest(
      CCAVENUE_ENCRYPTION_API,
      JSON.stringify({ data: formBody })
    )
    const response = await axios(apiConfig)
    return handler.mapResponse("ccavenue Encryption logic", response)
  },
}
