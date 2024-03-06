export const randomStr = () => {
  let arr = "123456789abcdefghijklmnoprstuvwxyz"
  let len = 20
  let ans = ""
  for (let i = len; i > 0; i--) {
    ans += arr[Math.floor(Math.random() * arr.length)]
  }
  return ans
}
