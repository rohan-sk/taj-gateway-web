import { urlFor } from "../../lib-sanity"
import { Box, Typography } from "@mui/material"
import { DownLoadButtonBoxStyled } from "./style"
import { useMobileCheck } from "../../utils/isMobilView"

interface DownLoadSchema {
  documents: DocumentsProps[]
}

interface DocumentsProps {
  logo: any
}

const DownLoadPdf = (props: DownLoadSchema) => {
  const DownLoadItems = props?.documents && props?.documents[0]
  const isMobile = useMobileCheck()
  return (
    <>
      <Box sx={{ padding: "0vw 0.6vw" }}>
        <DownLoadButtonBoxStyled>
          <Box
            component="img"
            src={
              DownLoadItems && urlFor(DownLoadItems?.logo?.asset?._ref).url()
            }
            height="20px"
            width="20px"
          />
          <Typography
            variant={isMobile ? "m-text-link" : "link-m"}
            sx={{
              letterSpacing: "0vw",
              cursor: "pointer",
            }}>
            DOWNLOAD PDF
          </Typography>
        </DownLoadButtonBoxStyled>
      </Box>
    </>
  )
}
export default DownLoadPdf
