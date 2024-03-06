import { Box } from "@mui/material"
import { useMobileCheck } from "../../utils/isMobilView"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { urlFor } from "../../lib-sanity"
import { CenterBox } from "./styles/card-with-desc"
import { PortableText } from "../../lib/portable-text-serializers"

const CardWithImageCenterBoldContent = (props: any) => {
  const { url, image, largeImage, urlType, content } = props
  const mobileImage = image?.asset?._ref
  const webImage = largeImage?.asset?._ref
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {((isMobile && mobileImage) || (!isMobile && webImage)) && (
        <Box
          alt={(isMobile ? image?.altText : largeImage?.altText) || `-img`}
          width={"100%"}
          height={"100%"}
          component={"img"}
          src={urlFor(isMobile ? mobileImage : webImage).url()}
          onClick={() => {
            url && navigate(url, urlType)
          }}
          sx={{
            cursor: url ? "pointer" : "",
            marginBottom: isMobile ? "4.375vw" : "1.875vw",
          }}
        />
      )}
      <Box>
        {content?.map((content: any, index: number) => (
          <CenterBox key={index}>
            <PortableText blocks={content?.content} key={index} />
          </CenterBox>
        ))}
      </Box>
    </Box>
  )
}
export default CardWithImageCenterBoldContent
