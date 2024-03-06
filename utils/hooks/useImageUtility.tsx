import { useEffect, useState } from "react"

export const useImageUtility = () => {
  const [screenWidth, setWidth] = useState(0)

  useEffect(() => {
    if (!window) return
    const screenWidth = window?.innerWidth | 0
    setWidth(screenWidth)
  }, [])

  const getOptimizeImageUrl = (url: string, size: number): string => {
    const width = screenWidth < 768 ? screenWidth : screenWidth / size
    const dpr = 2
    const q = 20

    if (width < 480) {
      return `${url}?w=480&auto=format&dpr=${dpr}`
    } else if (width <= 768) {
      return `${url}?w=768&auto=format&dpr=${dpr}`
    } else if (width <= 1024) {
      return `${url}?w=1024&auto=format&dpr=${dpr}`
    } else if (width <= 1280) {
      return `${url}?w=1280&auto=format&dpr=${dpr}`
    } else if (width <= 1366) {
      return `${url}?w=1366&auto=format&dpr=${dpr}`
    } else if (width <= 1600) {
      return `${url}?w=1600&auto=format&dpr=${dpr}`
    } else if (width <= 1920) {
      return `${url}?w=1920&auto=format&dpr=${dpr}`
    } else {
      return `${url}?w=3840&auto=format&dpr=${dpr}`
    }
  }

  return {
    getOptimizeImageUrl,
  }
}
