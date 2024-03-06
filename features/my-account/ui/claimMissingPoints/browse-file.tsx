import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import { theme } from "../../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { UploadCloudIcon } from "../../../../utils/customIcons"
import { FileUploadBox, FileFlexBox, DropContainer } from "./styles"
import { useMobileCheck } from "../../../../utils/isMobilView"

import { FileUploader } from "react-drag-drop-files"

const BrowseFile = ({ setDocument }: any) => {
  const isMobile = useMobileCheck()

  const fileTypes = ["JPEG", "PDF", "JPG"]
  const maxFileSizeMB = 5 // Maximum file size in megabytes

  const handleChange = (file: any) => {
    const selectedFile = file
    const fileSizeMB = selectedFile.size / (1024 * 1024)

    const fileType = selectedFile?.type?.split("/")[1]?.toUpperCase()
    if (!fileTypes.includes(fileType)) {
      alert("Invalid file format. Please select a file with JPG, JPEG, or PDF format.")
      return
    }
    if (fileSizeMB > maxFileSizeMB) {
      alert(`File size exceeds ${maxFileSizeMB} MB. Please select a file less or euqals to ${maxFileSizeMB} MB.`)
      return
    } else {
      setDocument(selectedFile)
    }
  }
  return (
    <FileUploadBox>
      <FileUploader multiple={false} handleChange={handleChange} name="file" maxSize={10}>
        <FileFlexBox>
          <DropContainer>
            <UploadCloudIcon />
            <Typography sx={{ fontWeight: "700" }} variant={isMobile ? "m-body-l" : "body-l"}>
              Browse a file to upload
            </Typography>
          </DropContainer>
          <Typography
            variant={isMobile ? "m-body-l" : "body-l"}
            sx={{
              paddingTop: DesktopPxToVw(10),
              fontSize: isMobile ? "2.413vw" : "0.938vw",
              color: theme?.palette?.ihclPalette?.hexTwelve,
            }}>
            File supported: PDF, JPEG, JPG | Max File Size : 5 MB
          </Typography>

          <Box
            sx={{
              marginTop: isMobile ? MobilePxToVw(40) : DesktopPxToVw(40),
            }}>
            <Box
              component={"label"}
              htmlFor="upload"
              style={{
                padding: isMobile ? "2.813vw 6.250vw" : "0.938vw 2.083vw",
                border: `0.052vw solid ${theme?.palette?.ihclPalette?.hexTwo}`,
                fontSize: isMobile ? MobilePxToVw(18) : DesktopPxToVw(18),
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "140%",
                letterSpacing: "0.094vw",
                cursor: "pointer",
                color: theme?.palette?.ihclPalette?.hexTwo,
              }}>
              BROWSE
            </Box>
          </Box>
        </FileFlexBox>
      </FileUploader>
    </FileUploadBox>
  )
}

export default BrowseFile
