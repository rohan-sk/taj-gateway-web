import { observer } from "mobx-react-lite"
import { useContext, useEffect, useState } from "react"
import { useMobileCheck } from "../../utils/isMobilView"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"

const SwitchCaseDefaultComponent = ({ cases, defaultCase }: any) => {
  const context = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  const [selectedCase, setSelectedCase] = useState()

  useEffect(() => {
    if (!isMobile) {
      setSelectedCase(defaultCase)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile])

  return (
    <>
      {cases?.map(({ item, value }: any, index: number) => (
        <>
          {value === selectedCase && (
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

export default observer(SwitchCaseDefaultComponent)
