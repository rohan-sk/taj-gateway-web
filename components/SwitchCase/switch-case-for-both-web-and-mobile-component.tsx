import React, { useContext, useEffect, useState } from "react"
import { Box } from "@mui/material"
import { CONSTANTS } from "../constants"
import { observer } from "mobx-react-lite"
import { IHCLContext, useMobileCheck } from "../forms/loyalty-form/epicure-imports.component"

const SwitchCaseForBothWebAndMobileComponent = ({ cases, defaultCase }: any) => {
  const isMobile = useMobileCheck()
  const context = useContext(IHCLContext)
  const [selectedCase, setSelectedCase] = useState<string>("")

  useEffect(() => {
    if (!isMobile && defaultCase === CONSTANTS?.WEB_TYPE) {
      setSelectedCase(defaultCase)
    } else {
      setSelectedCase(CONSTANTS?.MOBILE_TYPE)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile])

  return (
    <Box>
      {cases?.map(({ item, value }: any, index: number) => (
        <Box key={index}>
          {value === selectedCase && (
            <>{item?.map((subItems: any) => context?.renderComponent(subItems?._type, subItems, index))}</>
          )}
        </Box>
      ))}
    </Box>
  )
}

export default observer(SwitchCaseForBothWebAndMobileComponent)
