import React, { useRef, ReactNode, useState } from "react"
import dynamic from "next/dynamic"
import generatePDF, { Resolution, Margin, usePDF } from "react-to-pdf"
import SharingDetails from "../../utils/sharingDetailsOnSocialMedia"
const LoadingSpinner = dynamic(() => import("../../utils/SpinnerComponent"))
import { Box } from "@mui/material"

interface PDFGeneratorProps {
  downloadButton: ReactNode
  type: string
  PDFData?: any
  fileNameForUrl: string
  emailSubject?: string
  setOpenShare?: any
  emailId?: any
  giftCardPageResolution?: boolean
  shareText?: string
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({
  downloadButton,
  type = "download",
  PDFData,
  fileNameForUrl,
  emailSubject,
  setOpenShare,
  emailId,
  giftCardPageResolution = false,
  shareText = "",
}) => {
  const contentRef = useRef<HTMLDivElement | null>(null)
  const { targetRef } = usePDF()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const options = {
    resolution: giftCardPageResolution ? Resolution.MEDIUM : Resolution.LOW,
    page: {
      margin: { top: 10, right: 20, bottom: 10, left: 20 },
    },
  }
  const handleDownloadPDF = async () => {
    const input = contentRef?.current
    if (!input) return
    input.style.display = "block"
    input.style.position = "absolute"
    input.style.left = "-9999px"
    const fileName = `${fileNameForUrl?.replaceAll(" ", "_")?.replaceAll(",", "_")}.pdf`

    switch (type) {
      case "whatsapp": {
        setIsLoading(true)
        const newOptions = {
          ...options,
          method: "build" as "build" | "save" | "open",
        }
        const pdf = await generatePDF(targetRef, newOptions)
        const pdfBlob = pdf?.output("blob")
        const formData = new FormData()
        formData?.append("file", pdfBlob, fileName)
        await fetch(`${process.env.NEXT_PUBLIC_SSO_BASE_API_URL}upload_pdf`, {
          method: "POST",
          headers: {},
          body: formData,
        })
          .then(async (response) => {
            if (response?.ok) {
              const result = await response?.json()
              const message = (shareText ? `${shareText}\n` : "") + "Checkout: " + result?.url
              SharingDetails("https://wa.me", message)
            }
            setIsLoading(false)
            setOpenShare(false)
          })
          .catch((error) => {
            console?.error("pdf error", error)
            setIsLoading(false)
          })

        return
      }
      case "download": {
        setIsLoading(true)
        await generatePDF(targetRef, {
          ...options,
          filename: fileName,
        })
        setIsLoading && setIsLoading(false)
        setOpenShare && setOpenShare(false)
        return
      }
      case "email": {
        setIsLoading(true)
        const newOptions = {
          ...options,
          method: "build" as "build" | "save" | "open",
        }
        const pdf = await generatePDF(targetRef, newOptions)
        const pdfBlob = pdf?.output("blob")
        const formData = new FormData()
        formData?.append("file", pdfBlob, fileName)
        await fetch(`${process.env.NEXT_PUBLIC_SSO_BASE_API_URL}upload_pdf`, {
          method: "POST",
          headers: {},
          body: formData,
        })
          .then(async (response) => {
            if (response?.ok) {
              const result = await response?.json()
              const message = (shareText ? `${shareText}\n` : "") + "Checkout: " + result?.url
              SharingDetails("https://mail.google.com/", message, emailSubject, emailId)
            }
            setIsLoading(false)
            setOpenShare(false)
          })
          .catch((error) => {
            console?.error("pdf error", error)
            setIsLoading(false)
          })
        break
      }
    }

    input.style.display = "none"
  }

  return (
    <>
      {downloadButton && (
        <Box display={"flex"} onClick={() => handleDownloadPDF()}>
          {downloadButton}
        </Box>
      )}
      {isLoading && <LoadingSpinner />}
      <div
        ref={contentRef}
        style={{
          display: "none",
        }}>
        <div ref={targetRef}>{PDFData}</div>
      </div>
    </>
  )
}

export default PDFGenerator
