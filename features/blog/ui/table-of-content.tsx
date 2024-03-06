import { observer } from "mobx-react-lite"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { useContext, useState } from "react"
import { GLOBAL_STORES } from "../../../utils/Constants"
import BlogStore from "../store/blog.store"
import { Stack, Typography } from "@mui/material"
import { useMobileCheck } from "../../../utils/isMobilView"
import {
  CustomDivider,
  RowContentCount,
  TableBody,
  TableHeader,
  TableOfContentWrapper,
  TableRow,
} from "./styles/blogs-landing-page"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { BLOG_CONSTANTS } from "../constants"

function TableOfContent() {
  const ihclContext = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  const blogStore = ihclContext?.getGlobalStore(GLOBAL_STORES?.blogStore) as BlogStore
  const { articleContent, tocHeading } = blogStore?.blogData
  const [content, setContent] = useState(
    articleContent?.filter((item: any) => item?.contentType == BLOG_CONSTANTS?.headingElement) ?? [],
  )

  const scrollToArticleContent = (id: string) => {
    const releventDiv = document?.getElementById(id)
    let position: any = releventDiv?.getBoundingClientRect()
    window?.scrollTo(position?.left, position?.top + window?.scrollY - 100)
  }

  return (
    <TableOfContentWrapper $isMobile={isMobile}>
      <Stack marginBottom={3.75}>
        <TableHeader $isMobile={isMobile}>
          <CustomDivider $isMobile={isMobile} />
          <Typography
            marginLeft={isMobile ? MobilePxToVw(40) : DesktopPxToVw(40)}
            variant={isMobile ? "m-heading-s" : "heading-s"}>
            {tocHeading ?? BLOG_CONSTANTS?.tableOfContent}
          </Typography>
        </TableHeader>
        <TableBody $isMobile={isMobile}>
          {content?.map((item: any, index: number) => {
            return (
              <TableRow $isMobile={isMobile} $index={index} key={index}>
                <RowContentCount $isMobile={isMobile}>{`${index + 1 < 10 ? 0 + "" : ""}${index + 1}`}</RowContentCount>
                <Typography
                  variant={isMobile ? "m-body-sl" : "body-ml"}
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    scrollToArticleContent(item?.headingText)
                  }}>
                  {item?.headingText}
                </Typography>
              </TableRow>
            )
          })}
        </TableBody>
      </Stack>
    </TableOfContentWrapper>
  )
}

export default observer(TableOfContent)
