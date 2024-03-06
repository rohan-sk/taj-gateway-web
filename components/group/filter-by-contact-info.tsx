import React, { Fragment, useContext, useMemo, useState } from "react"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { useMobileCheck } from "../../utils/isMobilView"
const CustomDropDown = dynamic(() => import("../hoc/CustomDropDown").then((module) => module.CustomDropDown))
import { Box } from "@mui/system"
import dynamic from "next/dynamic"

const FilterByContactInfo = ({ props }: any) => {
  const context = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  const formattedData = useMemo(
    () => props?.map((item: any) => item?.title),
    [props]
  )
  const [selected, setSelected] = useState(formattedData?.[0])

  const foundCard = props?.find((item: any) => item?.title === selected)

  return (
    <Box>
      <CustomDropDown
        data={formattedData}
        value={selected}
        setValue={setSelected}
        minWidth="100%"
        margin={"0px !important"}
      />
      {foundCard && (
        <Fragment>
          {context?.renderComponent(foundCard._type, {
            ...foundCard,
            isMobile,
            disableTitle: true,
            disableBg: true,
          })}
        </Fragment>
      )}
    </Box>
  )
}

export default FilterByContactInfo
