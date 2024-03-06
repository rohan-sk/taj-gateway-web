import React, { useContext } from "react"
import ModalStore from "../../../store/global/modal.store"
import { observer } from "mobx-react-lite"
import { Box } from "@mui/material"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"

const HotelGalleryCarousel = ({
  groupLargeVariant,
  groupMobileVariant,
}: any) => {
  const modalStore = ModalStore.getInstance()
  const context = useContext(IHCLContext)
  let groupData = {
    items: modalStore?.propertyData
      ? modalStore?.propertyData?.map((item: any, index: any) => {
          return {
            ...item,
            isFromProperty: true,
          }
        })
      : [],
    largeVariant: groupLargeVariant,
    variant: groupMobileVariant,
  }
  return <Box>{context?.renderComponent("group", groupData)}</Box>
}

export default observer(HotelGalleryCarousel)
