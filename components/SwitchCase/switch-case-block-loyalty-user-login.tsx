import { Box } from "@mui/material"
import React, { useContext } from "react"
import { useLoggedIn } from "../../utils/hooks/useLoggedIn"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { observer } from "mobx-react-lite"

const LoyaltyUserLoginSwitchCase = ({ props }: any) => {
  const { cases, defaultCase } = props
  const user = useLoggedIn()
  const context = useContext(IHCLContext)

  const currentCase = cases?.filter(
    ({ value }: any, index: number) => value?.toUpperCase() === "LOGGED_IN_USER"
  )

  return (
    <Box sx={{ padding: "0vw 12vw" }}>
      {context?.renderComponent(currentCase?.[0]?.item?.[0]?._type, {
        ...currentCase?.[0]?.item?.[0],
      })}
    </Box>
  )
}

export default observer(LoyaltyUserLoginSwitchCase)