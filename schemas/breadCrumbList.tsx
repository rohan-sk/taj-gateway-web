export const breadcrumbList = (router: any) => {
  const { asPath, query } = router
  const asPathWithoutQuery = router.asPath.split("?")[0]

  const filteredPaths = ["experiences", "incredible-escapes"]
  const isFilteredSubPathExist = (arr: string[], subPath: string): boolean => {
    return arr?.some((item: string) => item?.toLocaleLowerCase() === subPath?.toLocaleLowerCase())
  }

  let asPathNestedRoutes = asPathWithoutQuery.split(/\/|\?/).filter((v: string) => v?.length > 0)
  if (asPathNestedRoutes?.findIndex((item: any) => item?.toLocaleLowerCase() === "taj-holidays") > -1) {
    asPathNestedRoutes = asPathNestedRoutes?.filter((item: any) => !isFilteredSubPathExist(filteredPaths, item))
  }
  const loc =
    typeof location !== "undefined"
      ? {
          query: Object.fromEntries(new URLSearchParams(location.search)),
          pathname: location?.pathname?.split("/en-in")?.[1],
        }
      : {
          query,
          pathname: asPath?.split("/en-in")?.[1],
        }

  let asPathParts = loc.pathname?.split(/\/|\?/)
  if (asPathParts?.findIndex((item: any) => item?.toLocaleLowerCase() === "taj-holidays") > -1) {
    asPathParts = asPathParts?.filter((item: any) => !isFilteredSubPathExist(filteredPaths, item))
  }

  const crumblist = asPathParts?.map((subpath: any, idx: number) => {
    const href = subpath !== "" ? asPathNestedRoutes.slice(0, idx).join("/") : ""
    return { href, text: subpath === "" ? "Home" : subpath }
  })

  return crumblist ? [...crumblist] : []
}
