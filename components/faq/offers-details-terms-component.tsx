import React, { useContext, useState } from "react"
import { useMobileCheck } from "../../utils/isMobilView"
import dynamic from "next/dynamic"
import { Box, Slide, Typography } from "@mui/material"
import { PortableTextAccordionDetailsOffersContainer } from "./styles/terms-and-conditions-component-styles"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../utils/Constants"
import OffersStore from "../../store/global/offers.store"
import { observer } from "mobx-react-lite"
import {
  StyledDownArrow,
  TitleStack,
} from "./styles/center-aligned-single-dropdown."
const PortableText = dynamic(() =>
import("../../lib/portable-text-serializers").then((module) => module.PortableText)
)

const OffersDetailsTermsComponent = (props: any) => {
  const isMobile = useMobileCheck()
  const [showDescription, setShowDescription] = useState<boolean>(false)
  const [selectedIndex, setSelectedIndex] = useState<number>(-1)
  const handleSelect = (updatingIndex: number) => {
    if (updatingIndex === selectedIndex) {
      setSelectedIndex(-1)
    } else {
      setSelectedIndex(updatingIndex)
    }
  }
  const Context = useContext(IHCLContext)
  const offerStore = Context?.getGlobalStore(
    GLOBAL_STORES.offerStore
  ) as OffersStore
  const tncData = offerStore?.offersData?.tnc || offerStore?.vouchersData?.tnc
  return (
    <Box>
      <TitleStack onClick={() => setShowDescription(!showDescription)}>
        <Typography
          sx={{ cursor: "pointer" }}
          variant={isMobile ? "m-heading-xs" : "heading-s"}>
          {props?.title}
        </Typography>
        <StyledDownArrow
          sx={{
            transform: showDescription ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </TitleStack>
      <Slide in={showDescription} direction="up" mountOnEnter unmountOnExit>
        <Box>
          {tncData?.length > 0 &&
            tncData?.map((item: any, index: number) => (
              <PortableTextAccordionDetailsOffersContainer key={index}>
                <PortableText blocks={item} />
              </PortableTextAccordionDetailsOffersContainer>
            ))}
        </Box>
      </Slide>
    </Box>
  )
}

export default observer(OffersDetailsTermsComponent)
