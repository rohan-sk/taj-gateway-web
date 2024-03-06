import { axios } from "../../../../api/axios-instance"
import { ApiHandler, ApiMethod } from "../../../../types"
import { BLOG_COMMENTS_API } from "../../constants"

export const handler: ApiHandler = {
  createRequest: (url: string, payload: any, headers: any) => {
    return {
      url,
      data: payload,
      method: ApiMethod.post,
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage?.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    }
  },

  apiCall: async (payload: any) => {
    const apiConfig = handler?.createRequest(BLOG_COMMENTS_API, payload)
    const response = await axios(apiConfig)
    return handler?.mapResponse("publish comment", response)
  },

  mapResponse: (response: any) => {
    if (response?._type) {
      return {
        error: false,
        data: response,
      }
    } else {
      return { error: true, data: response }
    }
  },
}
