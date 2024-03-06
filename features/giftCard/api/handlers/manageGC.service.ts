import { axios } from "../../../../api/axios-instance"
import { ApiMethod } from "../../../../types"

export const handler: any = {
  createRequest: (url?: string, payload?: any, headers: any = {}, method?: ApiMethod) => {
    return {
      url,
      method: method ?? ApiMethod.post,
      headers: {
        ...headers,
      },
      data: payload,
    }
  },

  GCBalanceEnquireMapResponse: (title: string, response: any) => {
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
  GCBalanceEnquire: async (data: any) => {
    const apiConfig = handler.createRequest(`${process.env.NEXT_PUBLIC_LOYALTY_BASE_URL}balance-enquiry`, data)
    const response = await axios(apiConfig)
    return handler.GCBalanceEnquireMapResponse("Balance enquiry", response)
  },

  GCReloadBalance: async (data: any) => {
    const apiConfig = handler.createRequest(`${process.env.NEXT_PUBLIC_LOYALTY_BASE_URL}reload-card`, data)
    const response = await axios(apiConfig)
    return response
  },

  GCOrderStatus: async (data: any) => {
    const apiConfig = handler.createRequest(`${process.env.NEXT_PUBLIC_LOYALTY_BASE_URL}order-status`, data)
    const response = await axios(apiConfig)
    return response
  },

  GCCreateOrderForReloadBalance: async (data: any) => {
    const apiConfig = handler.createRequest(
      `${process.env.NEXT_PUBLIC_ORDERS_BASE_URL}orders/create-order/gc-reload`,
      data,
      {
        customerHash: localStorage?.getItem("customerHash"),
      },
    )
    const response = await axios(apiConfig)
    return response
  },

  AddTenderMode: async (data: any) => {
    const apiConfig = handler.createRequest(
      `${process.env.NEXT_PUBLIC_CART_SERVICE_BASE_API_URL}add-tender-mode`,
      data,
      {
        customerHash: localStorage?.getItem("customerHash"),
        type: "Gift_Card_Purchase",
      },
    )
    const response = await axios(apiConfig)
    return response
  },

  RemoveTenderMode: async (data: any) => {
    const apiConfig = handler.createRequest(
      `${process.env.NEXT_PUBLIC_CART_SERVICE_BASE_API_URL}delete-tender-mode`,
      data,
      {
        customerHash: localStorage?.getItem("customerHash"),
        type: "Gift_Card_Purchase",
      },
      ApiMethod.delete,
    )
    const response = await axios(apiConfig)
    return response
  },

  GCMergeCart: async () => {
    const apiConfig = handler.createRequest(
      `${process.env.NEXT_PUBLIC_CART_SERVICE_BASE_API_URL}merge-cart`,
      {},
      {
        CUSTOMERHASH: localStorage?.getItem("customerHash"),
        GuestUser: localStorage?.getItem("guestCustomerHash"),
        TYPE: "Gift_Card_Purchase",
      },
      ApiMethod.put,
    )
    const response = await axios(apiConfig)
    return response
  },

  GCClearCart: async () => {
    const apiConfig = handler.createRequest(
      `${process.env.NEXT_PUBLIC_CART_SERVICE_BASE_API_URL}empty-cart`,
      {},
      {
        CUSTOMERHASH: localStorage?.getItem("customerHash") || localStorage?.getItem("guestCustomerHash"),
        TYPE: "Gift_Card_Purchase",
      },
      ApiMethod.delete,
    )
    const response = await axios(apiConfig)
    return response
  },
}
