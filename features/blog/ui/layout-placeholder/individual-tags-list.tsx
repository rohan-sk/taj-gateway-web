import React, { useContext } from "react"
import { Box } from "@mui/material"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"

const IndividualTagsList = (props: any) => {
  const context = useContext(IHCLContext)
  const {
    cardMobileVariant,
    cardLargeVariant,
    groupActionType,
    parameterMap,
    errorText,
    isMobileComponentFullWidth,
    cardCharactersLimit,
  } = props

  return (
    <Box>
      {context?.renderComponent("card", {
        variant: cardMobileVariant,
        largeVariant: cardLargeVariant,
        groupActionTypes: groupActionType,
        parameterMapValues: parameterMap,
        tagsErrorText: errorText,
        cardCharactersCountLimit: cardCharactersLimit,
        mobileCardFullWidth: isMobileComponentFullWidth,
      })}
    </Box>
  )
}

export default IndividualTagsList
