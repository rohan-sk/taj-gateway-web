import { BRANDS_ORDER_SEQUENCE } from "../components/constants"

export const getListWithBrandSorting = (sortingArr: any) => {
  function customComparator(a: any, b: any) {
    const indexA = BRANDS_ORDER_SEQUENCE.indexOf(a?.brandName)
    const indexB = BRANDS_ORDER_SEQUENCE.indexOf(b?.brandName)

    if (indexA === indexB) {
      return a?.hotelName?.localeCompare(b?.hotelName)
    } else {
      return indexA - indexB
    }
  }

  return sortingArr?.sort(customComparator)?.sort(({score:a}: any, {score:b}: any) => b-a)
}

export const searchTabsListing = (sortingArr: any, cmsTabsdata: any) => {
  function customComparator(a: any, b: any) {
    const indexA = cmsTabsdata?.indexOf(a?.tabTitle)
    const indexB = cmsTabsdata?.indexOf(b?.tabTitle)

    if (indexA === indexB) {
      return a?.hotelName?.localeCompare(b?.hotelName)
    } else {
      return indexA - indexB
    }
  }

  return sortingArr?.sort(customComparator)?.sort(({score:a}: any, {score:b}: any) => b-a)
}
