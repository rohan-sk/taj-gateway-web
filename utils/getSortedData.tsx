//utility to sort the data by comparing nested object's value
//getValueFromItem :=> pass a function to get the nested value from the object
export const getSortedData = (arr: any[], getValueFromItem?: Function): any[] => {
  if (getValueFromItem) {
    return arr?.sort((a: any, b: any) => getValueFromItem(a)?.localeCompare(getValueFromItem(b)))
  } else {
    return arr?.sort()
  }
}
