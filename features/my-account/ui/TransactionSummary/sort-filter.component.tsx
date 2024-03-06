import React, { useState } from "react"
import { Box, FormControl, Typography } from "@mui/material"
import { CONSTANTS } from "../../../../components/constants"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { FilterSelect, StyledInputLabel } from "../styles/transaction-styles"
import {
  DateTextField,
  FilterMainGrid,
  FilterWrapper,
  SortWrapper,
  StyledMenu,
} from "../styles/transaction-summary-details-style"

import filterData from "./transaction-json.json"
import { CalenderIcon } from "../../../../utils/customIcons"
import { CustomDropDown } from "../../../../components/hoc/CustomDropDown"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../../../utils/isMobilView"

interface filterInterface {
  setSelectFilter: Function
  selectFilter: string
  setSort: Function
  sort: boolean
}

interface ItemInterface {
  filterTitle: string
}

const SortAndFilter = ({ setSelectFilter, selectFilter, setSort, sort }: filterInterface) => {
  const [date, setDate] = useState<any>(null)
  const handleFilter = (event: any) => {
    setSelectFilter(event?.target?.value)
  }

  const isMobile = useMobileCheck()

  return (
    <FilterMainGrid columnGap={isMobile ? MobilePxToVw(40) : DesktopPxToVw(40)}>
      <CustomDropDown
        margin={0}
        placeHolder={filterData?.filterByMonthYear}
        data={filterData?.filter?.map((item: ItemInterface, index: number) => item?.filterTitle)}
        value={selectFilter}
        minWidth={isMobile ? MobilePxToVw(180) : DesktopPxToVw(222)}
        setValue={setSelectFilter}
      />

      <SortWrapper onClick={() => setSort((sort: boolean) => !sort)}>
        <Typography variant={isMobile ? "m-body-l" : "body-l"}>{CONSTANTS?.SORTING_BY_DATE}</Typography>
        <ArrowDownwardIcon sx={{ fontSize: "medium" }} />
        <ArrowUpwardIcon sx={{ fontSize: "medium" }} />
      </SortWrapper>
    </FilterMainGrid>
  )
}
export default SortAndFilter
