import React, { useContext } from "react"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { TabGroup } from "./tab-group"

const TabLinks = (props: any) => {
  const { tabs } = props
  const context = useContext(IHCLContext)

  return (
    <TabGroup
      items={tabs}
      itemRenderer={(item) => context!.renderComponent(item._type, item)}
    />
  )
}

export default TabLinks
