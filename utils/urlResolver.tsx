export function urlResolver(url: string) {
  const defaultURL = `/homepage`
  // returning defaultURL for falsy value of url
  if (!url) return defaultURL

  try {
    let source = window.location.search
    const isV1Url = url
      ?.split("/")
      .find((keyword) => keyword.toLowerCase() === "v1")

    if (isV1Url) {
      const v1RelativeUrl = "/" + url.split("/").slice(2).join("/")
      return `${v1RelativeUrl}`
    } else {
      return url
    }
  } catch (e) {
    location.href = defaultURL
  }
}
