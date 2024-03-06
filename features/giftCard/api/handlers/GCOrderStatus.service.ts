import { axios } from "../../../../api/axios-instance"
import { ApiMethod } from "../../../../types"

export const handler: any = {
  createRequest: (url?: string, payload?: any) => {
    return {
      url,
      method: ApiMethod.get,
      params: payload.params,
      data: payload,
    }
  },

  GCOrderStatus: async (data: string) => {
    const apiConfig = handler.createRequest(
      `${process.env.NEXT_PUBLIC_LOYALTY_BASE_URL}order-details`,
      {
        params: { orderId: data },
      },
      {}
    )
    const response = await axios(apiConfig)
    return response
  },
}
