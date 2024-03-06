import dynamic from "next/dynamic"
import React from "react"
const MembershipLoginForm = dynamic(() => import("../Login/InitialScreen/membership-login-form.component"))

const RenderCustomComponent = (props: any) => {
  const type = props?.items?.[0]?._type
  switch (type) {
    case "membershipLogin":
      return <MembershipLoginForm props={props?.items?.[0]} />
    default:
      return <></>
  }
}

export default RenderCustomComponent
