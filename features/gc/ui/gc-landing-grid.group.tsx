import React, { useContext, useEffect, useState } from "react"
import MultiRowTitle from "../../../components/hoc/title/multi-row-title"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../../utils/Constants"
import GCStore from "../store/pageStore/gc.store"
import { getGiftCardSubCategoryDetails } from "../../../utils/fetchGiftCardDetails"

const GcLandingGrid = (props: any) => {
  const { groupLargeVariant, cardLargeVariant, groupMobileVariant } =
    props || {}
  const [groupData, setGroupData] = useState<any>()
  const [componentData, setComponentData] = useState<any>()

  const Context = useContext(IHCLContext)

  const gcStore = Context?.getGlobalStore(GLOBAL_STORES.gcStore) as GCStore
  const groupTitle = gcStore?.gcData?.title

  const fetchCategoryData = async () => {
    const data = await getGiftCardSubCategoryDetails(
      gcStore?.gcData?.identifier
    )
    gcStore?.setGcSubcategoryData(data?.[0]?.subCategoryItems)
    setComponentData(data?.[0]?.subCategoryItems)
  }

  useEffect(() => {
    fetchCategoryData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(
    () => {
      setGroupData({
        aesthetic: props?.aesthetic,
        title: groupTitle,
        subTitle: props?.subTitle,
        alignmentVariant: "center",
        largeVariant: groupLargeVariant,
        isComponentFullWidth: false,
        isDynamic: true,
        variant: groupMobileVariant,
        items: componentData?.map((cardData: any, index: number) => {
          return {
            sku: cardData?.sku,
            name: cardData?.name,
            largeVariant: cardLargeVariant,
            largeImage: {
              _type: "image",
              asset: {
                _ref: cardData?.base?.largeImage?.asset?._ref,
                _type: "reference",
              },
            },
            image: {
              _type: "image",
              asset: {
                _ref: cardData?.base?.largeImage?.asset?._ref,
                _type: "reference",
              },
            },
            primaryAction: {
              variant: "light-contained",
              title: "BUY NOW",
              url: `${cardData?.sku}`,
              urlType: "internal",
              _type: "navigationItem",
            },
          }
        }),
      })
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [gcStore?.gcSubcategoryData]
  )
  return (
    <>
      {/* <MultiRowTitle
        {...props}
        title={groupTitle}
        aesthetic={props?.aesthetic}
      /> */}
      <>
        {Context?.renderComponent("group", { ...groupData, isDynamic: true })}
      </>
    </>
  )
}

export default GcLandingGrid
