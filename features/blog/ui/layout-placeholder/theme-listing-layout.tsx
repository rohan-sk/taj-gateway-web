import { useContext } from "react"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import { useMobileCheck } from "../../../../utils/isMobilView"
import BlogStore from "../../store/blog.store"
import MultiRowTitle from "../../../../components/hoc/title/multi-row-title"
import { Box } from "@mui/material"
import { ThemeListingWrapper } from "../styles/blogs-landing-page"
import { observer } from "mobx-react-lite"
import { BlogTypesDeclarations } from "../blogTypes/blogTypesDeclarations"

function ThemeListingLayout(props: BlogTypesDeclarations) {
  const {
    groupLargeVariant,
    groupMobileVariant,
    cardLargeVariant,
    cardMobileVariant,
    aesthetic,
    cardAesthetic,
    parameterMap,
    alignmentVariant,
    charactersLimit,
    cardActionType,
    groupActionType,
    errorText,
    mobileCharactersLimit,
    ...rest
  } = props

  const ihclContext = useContext(IHCLContext)
  const isMobile = useMobileCheck()

  const blogStore = ihclContext?.getGlobalStore(GLOBAL_STORES?.blogStore) as BlogStore

  const { blogs, themeTitle, description, ...layoutData } = blogStore?.blogListingData || {}

  return (
    <ThemeListingWrapper $isMobile={isMobile} $padding={aesthetic?.padding}>
      {/* <MultiRowTitle
        subTitle={description}
        title={{
          mobileTitle: themeTitle?.mobileTitle,
          desktopTitle: themeTitle?.desktopTitle,
          headingElement: themeTitle?.headingElement,
        }}
        charactersLimit={charactersLimit}
        alignmentVariant={alignmentVariant}
        aesthetic={undefined}
        isComponentFullWidth={false}
        isMobileComponentFullWidth={false}
      /> */}

      <Box>
        {ihclContext?.renderComponent("card", {
          cardActionTypes: cardActionType,
          groupActionTypes: groupActionType,
          variant: cardMobileVariant,
          largeVariant: cardLargeVariant,
          cardAesthetics: cardAesthetic,
          parameterMapValues: parameterMap,
          themesErrorText: errorText,
          charactersLimitCount: charactersLimit,
        })}
      </Box>
    </ThemeListingWrapper>
  )
}

export default observer(ThemeListingLayout)
