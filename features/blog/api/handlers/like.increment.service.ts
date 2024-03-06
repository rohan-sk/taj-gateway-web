import { axios } from "../../../../api/axios-instance"
import { ApiHandler, ApiMethod } from "../../../../types"
import { LIKE_INCREMENT_API } from "../../constants"

export const handler: ApiHandler = {
  createRequest: (url: string, payload: any, headers: any) => {
    return {
      url,
      data: payload,
      method: ApiMethod.post,
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    }
  },

  apiCall: async (payload: any) => {
    const apiConfig = handler?.createRequest(`${LIKE_INCREMENT_API}/${payload?.blogId}`, {})
    const response = await axios(apiConfig)
    return handler?.mapResponse("increment likes", response)
  },

  mapResponse: (title: string, response: any) => {
    if (response?.status === 201) {
      return {
        error: false,
        data: response?.data,
      }
    } else {
      return { error: true, data: response }
    }
  },
}
