import React, { useContext, useState } from "react"
import { Box } from "@mui/material"
import { CONSTANTS } from "../../../../components/constants"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import BlogStore from "../../store/blog.store"
import RenderActionItem from "../../../../components/hoc/actions/action-items-ui"
import { TravelInspirationTitle, TravelInspirationsWrapper } from "../styles/blog-cards-styles"
import { observer } from "mobx-react-lite"
import { ActionProps, PathType } from "../../../../components"
import { useAesthetics } from "../../../../utils/fetchAsthetics"
import { useRouter } from "next/router"
import { useAppNavigation } from "../../../../utils/NavigationUtility"

type GroupActionType = {
  primaryAction: ActionProps
  secondaryAction: ActionProps
  ctaLabel: ActionProps
}

type InspirationTagTypes = {
  cardActionType: GroupActionType[]
}

const TravelInspirationArticleTags = ({ props }: any) => {
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const router = useRouter()
  const routerPath = router?.asPath?.split("/")?.slice(0, -1)?.join("/")
  const [inspirationTags, setInspirationTags] = useState<number>(CONSTANTS?.TWO)
  const ctaButton = props?.cardActionTypes?.[0]?.primaryAction
  const ihclContext = useContext(IHCLContext)
  let tagItemsPadding = useAesthetics(props?.cardAesthetics?._ref)?.cardPadding

  const blogStore = ihclContext?.getGlobalStore(GLOBAL_STORES?.blogStore) as BlogStore

  return (
    <Box
      sx={{
        padding: isMobile ? tagItemsPadding?.mobile : tagItemsPadding?.desktop,
        marginBottom: isMobile ? "8.59vw" : "3.125vw",
      }}>
      <TravelInspirationsWrapper>
        {((isMobile && blogStore?.articleTags?.slice(0, inspirationTags)) || blogStore?.articleTags)?.map(
          (tagTitles: any, index: number) => (
            <Box key={index}>
              {tagTitles?.title && (
                <TravelInspirationTitle
                  onClick={() => {
                    navigate(`${routerPath}/${tagTitles?.identifier}`, PathType?.internal)
                  }}>
                  {tagTitles?.title}
                </TravelInspirationTitle>
              )}
            </Box>
          ),
        )}
      </TravelInspirationsWrapper>

      {isMobile && blogStore?.articleTags?.length > inspirationTags && ctaButton?.title && (
        <RenderActionItem
          url={ctaButton?.url}
          title={ctaButton?.title}
          navigationType={ctaButton?.urlType}
          variant={ctaButton?.variant}
          isActionButtonType={true}
          isButtonChevron={true}
          onClick={() => {
            setInspirationTags(inspirationTags + CONSTANTS?.FIVE)
          }}
          buttonStyles={{
            letterSpacing: "1.8px",
            fontWeight: 700,
          }}
        />
      )}
    </Box>
  )
}

export default observer(TravelInspirationArticleTags)
