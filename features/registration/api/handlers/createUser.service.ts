import { axios } from "../../../../api/axios-instance"
import { ApiHandler, ApiMethod } from "../../../../types"

export const handler: any = {
  createRequest: (url?: string, payload?: any) => {
    return {
      url,
      method: ApiMethod.post,
      data: payload,
      headers: {
        Authorization: `Bearer ${localStorage?.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    }
  },
  mapResponse: (response: any) => {
    const { data, status }: { data: any; status: number } = response || {}
    if (status === 201) {
      return {
        error: false,
        data,
      }
    } else if (status === 502) {
      return { error: true, data: response }
    } else {
      return { error: true, data: response }
    }
  },

  createNewUser: async (data: any) => {
    const apiConfig = handler.createRequest(
      `${process.env.NEXT_PUBLIC_SSO_BASE_API_URL}update-customer`,
      data
    )
    const response = await axios(apiConfig)
    return response
  },
}
