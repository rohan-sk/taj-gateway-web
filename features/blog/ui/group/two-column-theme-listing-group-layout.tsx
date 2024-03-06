import React, { useContext } from "react"
import { Grid } from "@mui/material"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import BlogStore from "../../store/blog.store"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import MultiRowTitle from "../../../../components/hoc/title/multi-row-title"
import { observer } from "mobx-react-lite"

function TwoColumnThemeListingGroupLayout(props: any) {
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
    mobileCharactersLimit,
    ...rest
  } = props
  const context = useContext(IHCLContext)
  const blogStore = context?.getGlobalStore(GLOBAL_STORES?.blogStore) as BlogStore
  const { blogs, themeTitle, description, ...layoutData } = blogStore?.blogListingData || {}

  return (
    <>
      {(themeTitle?.mobileTitle || themeTitle?.desktopTitle) && (
        <MultiRowTitle
          subTitle={description}
          title={{
            mobileTitle: themeTitle?.mobileTitle,
            desktopTitle: themeTitle?.desktopTitle,
            headingElement: themeTitle?.headingElement,
          }}
          charactersLimit={charactersLimit}
          alignmentVariant={`center`}
          aesthetic={undefined}
          isComponentFullWidth={false}
          isMobileComponentFullWidth={false}
        />
      )}

      <Grid container spacing={7.5}>
        <Grid item xs={12} sm={12} md={8} lg={8} key={props?.items?.[0]?._key}>
          {context?.renderComponent(props?.[0]?._type, props?.[0])}
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} key={props?.items?.[0]?._key}>
          {context?.renderComponent(props?.[1]?._type, props?.[1])}
        </Grid>
      </Grid>
    </>
  )
}

export default observer(TwoColumnThemeListingGroupLayout)
