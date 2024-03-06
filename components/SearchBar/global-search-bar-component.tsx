import React from "react"
import { ICONS } from "../constants"
import { StyledInputBase } from "../banner/styles"
import {
  GlobalSearchBarMicIconBox,
  GlobalSearchBarPaper,
  GlobalSearchBarSearchIconBox,
} from "./StyledComponets/global-search-bar-component-styles"

const GlobalSearchBar = (props: any) => {
  const { setFromMic } = props
  const handleOpenMic = () => {
    setFromMic(true)
  }
  return (
    <GlobalSearchBarPaper component="form">
      <GlobalSearchBarSearchIconBox alt={"search-img"} component={"img"} src={ICONS?.GLOBAL_SEARCH_ICON} />
      <StyledInputBase readOnly placeholder={props?.placeholderText} />
      <GlobalSearchBarMicIconBox
        alt={`mic-img`}
        component={"img"}
        onClick={() => handleOpenMic()}
        src={ICONS?.GLOBAL_SEARCH_MIC_ICON}
      />
    </GlobalSearchBarPaper>
  )
}

export default GlobalSearchBar
