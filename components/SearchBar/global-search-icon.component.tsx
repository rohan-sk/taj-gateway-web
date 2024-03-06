import React from "react"
import { urlFor } from "../../lib-sanity"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
import { Box } from "@mui/material"
import { SearchBackgroundBox, SearchImageBox } from "./StyledComponets/global-search-bar-component-styles"
import { ICONS } from "../constants"

const GlobalSearchIcon = (props: any) => {
  const { getOptimizeImageUrl } = useImageUtility()
  return (
    <Box textAlign={"center"}>
      <SearchBackgroundBox $background={props?.searchIconColor?.hex}>
        <SearchImageBox loading={"lazy"} component={"img"} alt={"searchIcon"} src={ICONS?.SEARCH_ICON_WHITE} />
      </SearchBackgroundBox>
    </Box>
  )
}

export default GlobalSearchIcon
