import { useEffect, useState } from "react"

let voiceSpeech: any
if (global?.window?.webkitSpeechRecognition) {
  // eslint-disable-next-line
  const SpeechRecognition = global?.window?.webkitSpeechRecognition
  voiceSpeech = new SpeechRecognition()
  voiceSpeech.continuous = true
} else {
  voiceSpeech = null
}

const useVoice = () => {
  const [listenedText, setListenedText] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [listeningTypo, setListeningTypo] = useState<boolean>(false)

  const listen = () => {
    setIsListening(!isListening)
    if (isListening) {
      voiceSpeech?.stop()
      setListeningTypo(false)
    } else {
      voiceSpeech?.start()
      setListeningTypo(true)
    }
  }

  useEffect(() => {
    if (!voiceSpeech) {
      return
    }
    voiceSpeech.onresult = (event: any) => {
      setListenedText(event.results[event.results.length - 1][0].transcript)
      setIsListening(false)
      voiceSpeech.stop()
      setListeningTypo(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    listenedText,
    isListening,
    listen,
    voiceSupported: voiceSpeech !== null,
    listeningTypo,
    setListeningTypo
  }
}

export { useVoice }
