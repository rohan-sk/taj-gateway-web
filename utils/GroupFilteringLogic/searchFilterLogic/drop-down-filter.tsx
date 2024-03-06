import { useEffect, useState } from "react"
import { CustomDropDown } from "../../../components/hoc/CustomDropDown"
import { useMobileCheck } from "../../isMobilView"
import { Box } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../DesktopFontCalc"

const DropDownFilter = ({
  backgroundColor,
  filterTypeData,
  props,
  setFilteredProps,
  numberOfFilter,
}: any) => {
  const [dropDownValue, setDropDownValue] = useState<string>("")
  const [selected, setSelected] = useState()

  useEffect(() => {
    let dropDownArr: any = []

    props?.items?.map((card: any) => {
      card?.filterTerm?.map((filters: any) => {
        if (!dropDownArr?.includes(filters?.term?.toLowerCase())) {
          dropDownArr?.push(filters?.term?.toLowerCase())
        }
      })
    })
    setDropDownValue(dropDownArr)
  }, [props?.items])

  useEffect(() => {
    let localCardsArr: any = []
    props?.items?.map((item: any) => {
      item?.filterTerm?.map((nestedSelected: any) => {
        if (nestedSelected?.term?.toLowerCase() === selected) {
          localCardsArr?.push(item)
        }
      })
      selected && setFilteredProps({ ...props, items: localCardsArr })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  const isMobile = useMobileCheck()

  return (
    <>
      {filterTypeData?.filterPlaceholder && (
        <Box
          sx={{
            width: isMobile ? "100%" : "auto",
            maxWidth: isMobile ? "75vw" : "initial",
          }}>
          <CustomDropDown
            label={filterTypeData?.filterPlaceholder}
            data={dropDownValue || []}
            value={selected}
            placeHolder={filterTypeData?.filterPlaceholder}
            setValue={setSelected}
            backgroundColor={backgroundColor}
            minWidth={
              isMobile
                ? "100% !important"
                : numberOfFilter > 3
                ? "17.188vw"
                : null
            }
            margin={"0px !important"}
            marginBottom={isMobile ? "0vw" : null}
          />
        </Box>
      )}
    </>
  )
}

export default DropDownFilter
