function DesktopPxToVw(fontSize: number) {
  return `${(fontSize / 1920) * 100}vw`
}

export default DesktopPxToVw

export function MobilePxToVw(fontSize: number) {
  return `${(fontSize / 640) * 100}vw`
}
