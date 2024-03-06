//* checks the undefined or null values

const GetDefaultValue = (value: any) => {
  const negativeValues = ["null", "undefined", null, undefined]
  return negativeValues?.includes(value) ? "" : value
}

export default GetDefaultValue

export const CheckDefaultValue = (value: any) => {
  const negativeValues = [null, undefined]
  return negativeValues?.includes(value) ? "" : value
}

export const setLocalStorage = (key: string, value: string): void => {
  global?.window?.localStorage?.setItem(key, value)
}
