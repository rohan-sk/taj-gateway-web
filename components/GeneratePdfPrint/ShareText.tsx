import React, { useState } from "react"
import dynamic from "next/dynamic"
const GeneratePrint = dynamic(() => import("./booking-print.component"))

const ShareText = () => {
  const shareToWhatsApp = () => {
    const compo = <GeneratePrint />
    const text = encodeURIComponent("https://i.ibb.co/gJXQFRd/Mask-group.png")
    const url = `https://api.whatsapp.com/send?text=${text}`
    window.open(url, "_blank")
  }

  return (
    <div className="App">
      <button
        style={{
          width: "200px",
          height: "60px",
          fontSize: "20px",
          margin: "30px auto",
          display: "block",
          cursor: "pointer",
        }}
        onClick={shareToWhatsApp}>
        Share to WhatsApp
      </button>
    </div>
  )
}

export default ShareText
