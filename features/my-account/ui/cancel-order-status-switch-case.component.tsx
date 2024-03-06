import React, { Fragment, useContext, useEffect, useState } from "react"
import { Box } from "@mui/material"
import { observer } from "mobx-react-lite"
import { GLOBAL_STORES } from "../../../utils/Constants"
import UserDetailsStore from "../store/globalStore/user-details.store"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"

const CancelOrderStatusModalSwitchCase = (props: any) => {
  const { cases, defaultCase } = props
  const context = useContext(IHCLContext)
  const [cancelStatus, setCancelStatus] = useState(defaultCase)

  const { cancelOrderDetails } = context?.getGlobalStore(
    GLOBAL_STORES.userDetailsStore
  ) as UserDetailsStore

  useEffect(() => {
    cancelOrderDetails?.error === true ? setCancelStatus("Failure") : setCancelStatus("Success")
  }, [cancelOrderDetails])

  return (
    <>
      <Box>
        {cases?.map(({ item, value }: any, key: React.Key | null | undefined) => (
          <Fragment key={key}>
            {cancelStatus === value
              ? context?.renderComponent(item[0]?._type, {
                  ...item[0],
                })
              : null}
          </Fragment>
        ))}
      </Box>
    </>
  )
}

export default observer(CancelOrderStatusModalSwitchCase)
