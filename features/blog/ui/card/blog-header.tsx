import { observer } from "mobx-react-lite"
import { useContext } from "react"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { Box } from "@mui/system"
import { BlogStore } from "../../store/blog.store"
import dynamic from "next/dynamic"
import { BlogHeaderWrapper } from "../styles/blogs-landing-page"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"

const BlogTitle = dynamic(() => import("./../blog-title"))
const BlogSubTitle = dynamic(() => import("./../blog-sub-title"))

function BlogHeader() {
  const ihclContext = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  const blogStore = ihclContext?.getGlobalStore(GLOBAL_STORES?.blogStore) as BlogStore
  const { articleTitle, _updatedAt, _createdAt, authorInfo, readTime } = blogStore?.blogData || {}

  return (
    <Box pb={isMobile ? MobilePxToVw(40) : DesktopPxToVw(40)}>
      <BlogHeaderWrapper $isMobile={isMobile}>
        <BlogTitle articleTitle={articleTitle} />
        <BlogSubTitle authorInfo={authorInfo} readTime={readTime} _updatedAt={_updatedAt ?? _createdAt} />
      </BlogHeaderWrapper>
    </Box>
  )
}

export default observer(BlogHeader)
