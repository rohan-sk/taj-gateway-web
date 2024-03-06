import { getListWithBrandSorting } from "./getListWithBrandSorting"

export const getListWithScoreAndBrandSorting = (arr: any[]) => {
  const priorityComparator = (a: any, b: any) => b?.score - a?.score
  if (Array?.isArray(arr)) {
    const priorityData: any = []
    let priorityLessData = getListWithBrandSorting(
      arr?.filter((item: any) => {
        if (!!item?.score) {
          priorityData?.push(item)
          return false
        } else {
          return true
        }
      }),
    )

    return [...priorityData?.sort(priorityComparator), ...priorityLessData]
  } else {
    return []
  }
}
