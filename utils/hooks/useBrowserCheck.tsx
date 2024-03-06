import { useState, useEffect } from "react"

export const useBrowserCheck = () => {
  const [isSafari, setIsSafari] = useState(false)
  const [isChrome, setIsChrome] = useState(false)
  const [isIos, setIsIos] = useState(false)

  useEffect(() => {
    const userAgent = navigator.userAgent

    setIsSafari(
      userAgent.indexOf("Safari") !== -1 && userAgent.indexOf("Chrome") === -1
    )
    setIsChrome(userAgent.indexOf("Chrome") !== -1)
    var ua = global?.window?.navigator?.userAgent
    setIsIos(!!ua.match(/iPad/i) || !!ua.match(/iPhone/i))
  }, [])

  return { isSafari, isChrome, isIos }
}
