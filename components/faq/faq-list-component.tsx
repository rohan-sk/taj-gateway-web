import { Box, useTheme } from "@mui/material"
import { observer } from "mobx-react-lite"
import dynamic from "next/dynamic"
import { theme } from "../../lib/theme"
import { useMobileCheck } from "../../utils/isMobilView"
import { useAesthetics } from "../../utils/fetchAsthetics"
const RenderFaqList = dynamic(() => import("./faq-list"))

const FaqListComponent = ({ props }: any) => {
  const { isModal } = props
  const isMobile = useMobileCheck()
  const { cardPadding } = useAesthetics(props?.aesthetic?._ref)
  return (
    <>
      <Box
        pb={isMobile ? "7.813vw" : "2.08vw"}
        sx={{
          width: "100%",
          maxWidth: "100%",
          alignItems: "center",
          padding:isMobile?cardPadding?.mobile: cardPadding?.desktop
        }}
      >
        {props?.items && (
          <RenderFaqList
            title={props?.title}
            items={props?.items}
            isModal={isModal}
            _type={props?._type}
            variant={props?.variant}
            widgetIndex={props?.widgetIndex}
            widgetSubtitle={props?.widgetSubtitle}
            metadata={props?.metadata}
          />
        )}
      </Box>
    </>
  )
}
export default FaqListComponent
