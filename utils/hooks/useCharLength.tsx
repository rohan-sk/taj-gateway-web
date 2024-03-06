
export const useCharLength = () => {
  const getCharLength = (text: string, limit: number) => {
    if(text.length < limit) {
      const diffLength = limit - text.length;
      let finalText = '<span style="visibility: hidden">'
      for(let i=0; i<diffLength; i++) {
        finalText += '-'
      }
      finalText += '</span>'
      return finalText;
    } else {
      return text
    }
  }
  return {
    getCharLength,
  }
}
