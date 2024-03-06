import React, { useContext, useEffect, useState } from "react"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../../utils/Constants"
import GCStore from "../store/pageStore/gc.store"

import { Box } from "@mui/material"
const PortableText = dynamic(() =>
  import("../../../lib/portable-text-serializers").then((module) => module.PortableText),
)
import { useMobileCheck } from "../../../utils/isMobilView"
const RenderActionItem = dynamic(() => import("../../../components/hoc/actions/action-items-ui"))
import { PortableTextBox, RenderActionButtonBox } from "./styles"
import dynamic from "next/dynamic"

const GroupWithSectionalTabs = (props: any) => {
  const { groupLargeVariant, cardLargeVariant, cardMobileVariant } = props || {}
  const [groupData, setGroupData] = useState<any>()
  const Context = useContext(IHCLContext)
  const isMobile = useMobileCheck()

  const gcStore = Context?.getGlobalStore(GLOBAL_STORES.gcStore) as GCStore
  useEffect(
    () => {
      setGroupData({
        _key: "62fe1402a9e6",
        // aesthetic: props?.aesthetic,
        largeVariant: groupLargeVariant,

        items: gcStore?.gcData?.icons?.map((cardData: any, index: number) => {
          return {
            largeVariant: cardLargeVariant,
            _type: "card",

            image: {
              asset: {
                _ref: cardData?.logo?.asset?._ref,
                _type: cardData?.logo?.asset?._type,
              },
              _type: cardData?.logo?._type,
            },

            variant: cardMobileVariant,
            largeImage: {
              _type: cardData?.largeLogo?._type,
              asset: {
                _ref: cardData?.largeLogo?.asset?._ref,
                _type: cardData?.largeLogo?.asset?._type,
              },
            },
            description: cardData?.title.map((title: any) => {
              return title
            }),
            isDynamic: true,
          }
        }),
      })
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [gcStore?.gcData],
  )

  return (
    <Box
      sx={{
        padding: isMobile ? props?.aesthetic?.padding?.mobile : props?.aesthetic?.padding?.desktop,
      }}>
      {Context?.renderComponent("group", groupData)}
      {gcStore?.gcData?.content &&
        gcStore?.gcData?.content?.map((item: any, idx: number) => (
          <PortableTextBox $isMobile={isMobile} key={idx}>
            <PortableText blocks={item} />
          </PortableTextBox>
        ))}
      {props?.groupActionType?.map((buttonList: any, index: number) => {
        return (
          <RenderActionButtonBox $isMobile={isMobile} key={index}>
            {buttonList?.primaryAction && (
              <RenderActionItem
                url={buttonList?.primaryAction?.url}
                title={buttonList?.primaryAction?.title}
                navigationType={buttonList?.primaryAction?.urlType}
                variant={buttonList?.primaryAction?.variant}
                isActionButtonType={true}
                buttonImgStyles={{
                  margin: isMobile ? "8vw 0vw" : "2vw 0vw",
                }}
                buttonStyles={{
                  letterSpacing: "1.8px",
                }}
              />
            )}
          </RenderActionButtonBox>
        )
      })}
    </Box>
  )
}

export default GroupWithSectionalTabs
