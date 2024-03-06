//If we provide any number it will return space after 4 digits
//exm: given number 12345678901234
// it will return 1234 5678 9012 3456

export const getSpace = (num: any = 234) => {
  let str = num.toString()

  const chunks = []
  let i, len
  for (i = 0, len = str.length; i < len; i += 4) {
    chunks.push(str.substr(i, 4))
  }
  return chunks.join(" ")
}
