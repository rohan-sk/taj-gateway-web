import React, { useContext } from "react"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { useRouter } from "next/router"

const LoyaltyDefaultSwitchCase = ({ props }: any) => {
  const { cases, defaultCase } = props
  const context: any = useContext(IHCLContext)
  const router = useRouter()

  return (
    <>
      {cases?.map(({ item, value }: any, index: number) => (
        <>
          {router?.query?.cardType?.toString()?.toLowerCase() ===
            value?.toLowerCase() && (
            <>
              {item?.map((subItems: any) =>
                context?.renderComponent(subItems?._type, subItems, index)
              )}
            </>
          )}
        </>
      ))}
    </>
  )
}

export default LoyaltyDefaultSwitchCase
