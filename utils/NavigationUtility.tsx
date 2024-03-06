import { useContext, useCallback } from "react"
import { useRouter, NextRouter } from "next/router"
import { IHCLContext, IHCLContextProps } from "../PresentationalComponents/lib/prepare-ihcl-context"
import { PathType } from "../types"
import ModalStore from "../store/global/modal.store"

export function navigateTo(
  path: string,
  Context: IHCLContextProps | undefined,
  router: NextRouter,
  pathType: PathType = PathType.internal,
  callbackFunc?: () => void,
) {
  const modalStore = ModalStore.getInstance()
  if (pathType?.toLowerCase() == PathType.internal) {
    global?.window?.scrollTo(0, 0)
  }
  if (typeof callbackFunc === "function") {
    callbackFunc()
  }
  const REDIRECTION_URL_QUERYPARAM = "redirectUrl"
  const REDIRECTION_PATH_URL_QUERYPARAM = "pathUrl"
  const REDIRECTION_URLTYPE_QUERYPARAM = "redirectionType"
  const [baseUrl, queryParams] = path?.split("?") || [] // eslint-disable-line
  let params = new URLSearchParams(queryParams)
  const redirectionPath = params?.get(REDIRECTION_URL_QUERYPARAM)
  if (path?.includes(REDIRECTION_PATH_URL_QUERYPARAM)) {
    navigationHandler(
      params?.get(REDIRECTION_PATH_URL_QUERYPARAM) || "",
      Context,
      router,
      params?.get(REDIRECTION_URLTYPE_QUERYPARAM) || PathType.internal,
      modalStore,
    )
    // Removing pathUrl query parameter
    params.delete(REDIRECTION_PATH_URL_QUERYPARAM)
    if (REDIRECTION_URLTYPE_QUERYPARAM) {
      // Removing redirectionType query parameter
      params.delete(REDIRECTION_URLTYPE_QUERYPARAM)
    }
    if (REDIRECTION_URL_QUERYPARAM) {
      // Removing redirectUrl query parameter
      params.delete(REDIRECTION_URL_QUERYPARAM)
      // Storing redirection url in localStorage as gotoAfterLogin after successful login
      localStorage?.setItem("gotoAfterLogin", `${redirectionPath}?${params}`)
    }
    return
  } else {
    navigationHandler(path, Context, router, pathType, modalStore)
  }
}

export const navigationHandler = (path: string, Context: any, router: any, pathType: string, modalStore?: any) => {
  switch (pathType) {
    case PathType.external:
    case PathType.externalApplication:
      window?.open(Context!.urlResolver(path))
      break
    case PathType.dialog:
      modalStore.openModal(path)
      break
    case PathType.internal:
    default:
      router.push(Context!.urlResolver(path))
      break
  }
}
export function useAppNavigation() {
  const Context = useContext(IHCLContext)
  const router = useRouter()

  return useCallback(
    (path: string, pathType: PathType = PathType.internal, callbackFunc?: () => void) =>
      navigateTo(path, Context, router, pathType, callbackFunc),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )
}
