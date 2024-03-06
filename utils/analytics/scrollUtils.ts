export function getWindowHeight() {
  return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
}

export function getWindowScrollY() {
  return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0
}

export function getDocumentHeight() {
  return Math.max(
    document.body.scrollHeight || 0,
    document.documentElement.scrollHeight || 0,
    document.body.offsetHeight || 0,
    document.documentElement.offsetHeight || 0,
    document.body.clientHeight || 0,
    document.documentElement.clientHeight || 0,
  )
}

export function getScrollPercent() {
  return ((getWindowScrollY() + getWindowHeight()) / getDocumentHeight()) * 100
}
