import { useState } from "react"
import { Box } from "@mui/material"
import { ICONS } from "../../constants"
import filterData from "./booking-json.json"
import { theme } from "../../../lib/theme"
import upArrow from "../../../public/arrow-up-sort.png"
import DesktopPxToVw from "../../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../../utils/isMobilView"
import downArrow from "../../../public/arrow-down-sort.png"
import { FilterSelect, StyledInputLabel } from "./booking-styles"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import {
  ArrowsContainer,
  FilterMainGrid,
  SortContainer,
  SortWrapper,
  StyledFormControl,
  StyledMenu,
} from "./booking-details.styles"

interface filterInterface {
  setSelectFilter: Function
  selectFilter: string
  handleBookingSort: Function
}

interface ItemInterface {
  filterTitle: string
}

const SortAndFilter = ({ setSelectFilter, selectFilter, handleBookingSort }: filterInterface) => {
  const isMobile = useMobileCheck()
  const [sortDate, setSortDate] = useState<boolean>(false)
  const handleFilter = (event: any) => {
    setSelectFilter(event?.target?.value)
  }
  return (
    <FilterMainGrid aria-label="SortAndFilter">
      <StyledFormControl sx={{ width: isMobile ? "44.531vw" : "9.635vw" }} variant="standard">
        {selectFilter?.length === 0 && <StyledInputLabel>{filterData?.filterByRoom}</StyledInputLabel>}
        <FilterSelect
          sx={{ width: "100%", position: "relative", top: isMobile ? 0 : DesktopPxToVw(4) }}
          variant="standard"
          value={selectFilter}
          onChange={handleFilter}
          IconComponent={(filterData) => <KeyboardArrowDownIcon {...filterData} sx={{ cursor: "pointer" }} />}
          MenuProps={{
            PaperProps: {
              elevation: 0,
              sx: {
                maxHeight: 300,
                borderRadius: "0",
                boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
                backgroundColor: theme?.palette?.background?.default,
              },
            },
          }}>
          {filterData?.filter?.map((item: ItemInterface, index: number) => (
            <StyledMenu key={index} value={item?.filterTitle}>
              {item?.filterTitle}
            </StyledMenu>
          ))}
        </FilterSelect>
      </StyledFormControl>

      <SortWrapper
        onClick={() => {
          handleBookingSort(), setSortDate(!sortDate)
        }}>
        <SortContainer variant={isMobile ? "m-body-l" : "body-s"}>Sort by Date</SortContainer>
        <ArrowsContainer>
          <Box
            component="img"
            src={sortDate ? ICONS?.GOLDEN_DOWN_ARROW : downArrow?.src}
            width={isMobile ? "1.875vw" : "unset"}
            height={isMobile ? "2.813vw" : "0.813vw"}
          />
          <Box
            component="img"
            src={sortDate ? ICONS?.GOLDEN_UPWARD_ARROW : upArrow?.src}
            width={isMobile ? "1.875vw" : "unset"}
            height={isMobile ? "2.813vw" : "0.813vw"}
          />
        </ArrowsContainer>
      </SortWrapper>
    </FilterMainGrid>
  )
}

export default SortAndFilter
