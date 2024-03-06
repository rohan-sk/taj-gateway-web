import { handler as refreshTokenApi } from "../../features/login/api/handlers/refresh-token"

export const VerifyRefreshToken = async () => {
  const refreshTokenApiRes = await refreshTokenApi?.apiCall()
  return refreshTokenApiRes
}
