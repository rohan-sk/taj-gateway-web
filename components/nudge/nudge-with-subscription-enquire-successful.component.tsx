import { Box } from "@mui/material"
import React, { useContext } from "react"
import { SubscriptionMainBox } from "./styles/subscription-success-nudge"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"

const SubscriptionEnquireSuccess = (props: any) => {
  const context = useContext(IHCLContext)
  return (
    <>
      <SubscriptionMainBox>
        {
          <>
            {context?.renderComponent(props?._type, {
              ...props,
            })}
          </>
        }
      </SubscriptionMainBox>
    </>
  )
}

export default SubscriptionEnquireSuccess
