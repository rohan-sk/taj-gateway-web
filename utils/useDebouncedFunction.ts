import { useMemo } from "react"

type CallbackFunction = (...args: any[]) => void

const useDebouncedFunction = (callback: CallbackFunction, delay: number): CallbackFunction => {
  const debouncedFunction = useMemo(() => debounce(callback, delay), [callback, delay])

  return debouncedFunction
}

const debounce = (func: CallbackFunction, delay: number): CallbackFunction => {
  let timer: ReturnType<typeof setTimeout>
  return function (this: any, ...args: any[]) {
    clearTimeout(timer)
    timer = setTimeout(() => func.apply(this, args), delay)
  }
}

export default useDebouncedFunction
