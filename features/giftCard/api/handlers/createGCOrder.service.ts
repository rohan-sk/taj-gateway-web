import { axios } from "../../../../api/axios-instance"
import { ApiMethod } from "../../../../types"

export const handler: any = {
  createRequest: (url?: string, payload?: any, headers?: any) => {
    return {
      url,
      method: payload?.method || ApiMethod.post,
      headers: {
        customerHash:
          localStorage.getItem("customerHash") ||
          localStorage.getItem("guestCustomerHash"),
        ...headers,
      },
      data: payload,
    }
  },

  CreateGCOrder: async () => {
    const apiConfig = handler.createRequest(
      `${process.env.NEXT_PUBLIC_ORDERS_BASE_URL}orders/create-order/gift-card`,
      {},
      {
        type: "Gift_Card_Purchase",
      }
    )
    const response = await axios(apiConfig)
    return response
  },

  addToCart: async (data: any) => {
    const apiConfig = handler.createRequest(
      `${process.env.NEXT_PUBLIC_CART_SERVICE_BASE_API_URL}gc/add-to-cart`,
      data
    )
    const response = await axios(apiConfig)
    return response
  },

  fetchCart: async () => {
    const apiConfig = handler.createRequest(
      `${process.env.NEXT_PUBLIC_CART_SERVICE_BASE_API_URL}fetch-cart`,
      { method: ApiMethod.get },
      {
        type: "Gift_Card_Purchase",
      }
    )
    const response = await axios(apiConfig)
    return response
  },
}
