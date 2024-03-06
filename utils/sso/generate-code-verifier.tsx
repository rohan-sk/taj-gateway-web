export const generateCodeVerifier = () => {
  let text = ""
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~"
  for (let i = 0; i < 64; i++) {
    text += possible?.charAt(Math?.floor(Math?.random() * possible?.length))
  }
  return text
}
