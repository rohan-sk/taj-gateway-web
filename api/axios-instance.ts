import axios, { AxiosRequestConfig } from "axios"
import { VerifyRefreshToken } from "../utils/sso/verify-refresh-token"

interface RetryQueueItem {
  resolve: (value?: any) => void
  reject: (error?: any) => void
  config: AxiosRequestConfig
}

// Create a list to hold the request queue
const refreshAndRetryQueue: RetryQueueItem[] = []

// Flag to prevent multiple token refresh requests
let isRefreshing = false
let axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
})

axiosInstance.interceptors.response.use(
  (response: any) => {
    return response
  },
  async (err: any) => {
    const originalRequest: AxiosRequestConfig = err.config
    if (
      err?.response?.data?.message == "Invalid or Missing Access-Token" ||
      err?.response?.data?.errorMessage == "Invalid or Missing Access-Token"
    ) {
      if (!isRefreshing) {
        isRefreshing = true
        try {
          if (global?.window?.localStorage?.getItem("refreshToken")) {
            const newAccessToken = await VerifyRefreshToken()

            if (!newAccessToken?.error) {
              err.config.headers["Authorization"] = `Bearer ${newAccessToken?.headers["x-access-token"]}`

              // Retry the original request after token refresh
              const retryOriginalRequest = axiosInstance(originalRequest)

              // Clear the queue
              refreshAndRetryQueue.length = 0

              // Resolve all queued requests with the refreshed response
              refreshAndRetryQueue.forEach(({ resolve }) => {
                resolve(retryOriginalRequest)
              })

              // Return the refreshed response
              return retryOriginalRequest
            }
          }
        } catch (refreshError) {
          // Handle token refresh error
          // You can clear all storage and redirect the user to the login page
          throw refreshError
        } finally {
          isRefreshing = false
        }
      }

      // Queue the original request
      return new Promise<void>((resolve, reject) => {
        refreshAndRetryQueue.push({ config: originalRequest, resolve, reject })
      })
    }

    return err?.response?.data
  },
)

export { axiosInstance as axios }
