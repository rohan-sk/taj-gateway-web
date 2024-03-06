import React, { useCallback, useContext, useEffect, useState } from "react"
import { Box } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import RenderActionItem from "../../../../components/hoc/actions/action-items-ui"
import { theme } from "../../../../lib/theme"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import BlogStore from "../../store/blog.store"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { CONSTANTS } from "../../../../components/constants"
import { useMobileCheck } from "../../../../utils/isMobilView"
import dynamic from "next/dynamic"
import { observer } from "mobx-react-lite"
import { ActionProps } from "../../../../components"
import { MasonryCardActionBox, NoResultsFoundText, TagListCardWrapper } from "../styles/blog-cards-styles"

const VenueSearchFilter = dynamic(() => import("../../../property/ui/venues-search-filter"))
const IndividualTagsListItem = dynamic(() => import("./individual-tag-list-item"))

type GroupActionType = {
  primaryAction: ActionProps
  secondaryAction: ActionProps
  ctaLabel: ActionProps
}
type TagCardTypes = {
  groupActionTypes: GroupActionType[]
  parameterMapValues: Array<{}>
  mobileCardFullWidth: boolean
  tagsErrorText: string
  cardCharactersCountLimit: number
}

const TagCardsList = (props: TagCardTypes) => {
  const { cardCharactersCountLimit, mobileCardFullWidth, tagsErrorText } = props
  const isMobile = useMobileCheck()
  const ctaLabelAction = props?.groupActionTypes?.[0]?.ctaLabel
  const ihclContext = useContext(IHCLContext)
  const initialTagCardsToShow = isMobile ? CONSTANTS?.THREE : CONSTANTS?.SIX
  const [showTagItems, setShowTagItems] = useState<number>(initialTagCardsToShow)
  const [originalData, setOriginalData] = useState<any>([])
  const [filteredData, setFilteredData] = useState<any>([])
  const [maxheight, setMaxheight] = useState<number>(0)

  const blogStore = ihclContext?.getGlobalStore(GLOBAL_STORES?.blogStore) as BlogStore

  const setTitleHeight = useCallback((height: any) => {
    setMaxheight((prevValue: any) => (prevValue > height ? prevValue : height))
  }, [])

  useEffect(() => {
    setShowTagItems(initialTagCardsToShow)
  }, [initialTagCardsToShow])

  const [searchFilters, setSearchFilters] = useState<any>({ recent_tag: "" })
  const [facets, setFacets] = useState<any>({ recent_tag: ["Most Liked"] })

  const getKey: any = (index: number, filters: any): string => {
    return filters ? Object?.keys(filters)?.[index] : ""
  }

  useEffect(() => {
    setOriginalData(blogStore?.blogListingData?.blogs)
    setFilteredData(blogStore?.blogListingData?.blogs)
  }, [blogStore?.blogListingData?.blogs, props?.parameterMapValues?.length])

  const getFilterComponent = () => {
    return (
      <VenueSearchFilter
        originalData={originalData}
        setFilteredData={setFilteredData}
        filteredData={filteredData}
        filters={props?.parameterMapValues}
        setSearchFilters={setSearchFilters}
        searchFilters={searchFilters}
        facets={facets}
        getKey={getKey}
      />
    )
  }

  return (
    <>
      {props?.parameterMapValues?.length > 0 && (
        <Box
          sx={{
            padding: isMobile ? "0 8.215vw 2vw" : "initial",
          }}>
          {getFilterComponent()}
        </Box>
      )}
      <TagListCardWrapper>
        {filteredData &&
          filteredData?.slice(0, showTagItems)?.map((tagItems: any, index: number) => (
            <Box key={index} sx={{ marginBottom: isMobile ? "14.06vw" : "3.12vw" }}>
              <IndividualTagsListItem
                tagItems={tagItems}
                setTitleHeight={setTitleHeight}
                maxheight={maxheight}
                mobileCardFullWidth={mobileCardFullWidth}
                cardCharactersCountLimit={cardCharactersCountLimit}
              />
            </Box>
          ))}
        {filteredData?.length < 1 && <NoResultsFoundText>{tagsErrorText}</NoResultsFoundText>}
      </TagListCardWrapper>
      {filteredData?.length > showTagItems && (
        <MasonryCardActionBox
          onClick={() => {
            setShowTagItems(showTagItems + CONSTANTS?.TWO)
          }}>
          <RenderActionItem
            url={ctaLabelAction?.url}
            isActionButtonType={true}
            variant={ctaLabelAction?.variant}
            navigationType={ctaLabelAction?.urlType}
            title={ctaLabelAction?.title}
            onClick={() => {}}
            buttonStyles={{
              letterSpacing: "1.8px",
              fontWeight: 400,
              padding: "0vw",
              height: "auto",
              textDecoration: "underline",
              "&:hover": {
                textDecoration: "underline",
              },
              "@media (max-width: 640px)": {
                fontWeight: 700,
                padding: "0vw",
                height: "auto",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "none",
                },
              },
            }}
          />
          <ExpandMoreIcon sx={{ color: theme?.palette?.neuPalette?.hexTwo }} />
        </MasonryCardActionBox>
      )}
    </>
  )
}

export default observer(TagCardsList)
