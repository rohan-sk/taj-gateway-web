import dynamic from "next/dynamic"
import { useMobileCheck } from "../../../utils/isMobilView"
import { observer } from "mobx-react-lite"
import { Box } from "@mui/material"

const MultiRowTitle = dynamic(() => import("../../../components/hoc/title/multi-row-title"))

type BlogTitleType = {
  articleTitle: {
    mobileTitle: string[]
    desktopTitle: string[]
    headingElement?: any
  }
}

function BlogTitle(props: BlogTitleType) {
  const { articleTitle } = props
  const isMobile = useMobileCheck()
  const checkTitleAlignment = isMobile ? "center" : "center-aligned-regular-title-with-no-hyphens"

  return (
    <Box
      sx={{
        "& span": {
          whiteSpace: "normal",
        },
      }}>
      {(articleTitle?.mobileTitle || articleTitle?.desktopTitle) && (
        <MultiRowTitle
          subTitle={null}
          title={{
            mobileTitle: articleTitle?.mobileTitle,
            desktopTitle: articleTitle?.desktopTitle,
            headingElement: articleTitle?.headingElement,
          }}
          charactersLimit={0}
          alignmentVariant={checkTitleAlignment}
          aesthetic={undefined}
          isComponentFullWidth={false}
          isMobileComponentFullWidth={false}
          isMarginBottomNotRequired={true}
        />
      )}
    </Box>
  )
}

export default observer(BlogTitle)
