import { useState, useEffect } from "react"

const useIntersection = (element: any, rootMargin: any) => {
  const [isVisible, setState] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setState(entry?.isIntersecting)
      },
      { rootMargin }
    )
    element?.current && observer?.observe(element?.current)
    return () => {
        if (element?.current)
          observer.unobserve(element?.current)
    }
  }, [element, rootMargin])

  return isVisible
}

export default useIntersection
