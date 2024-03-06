import React from "react"
import { useContext, useEffect } from "react"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"

import ModalStore from "../../../store/global/modal.store"
import { EpicureFormGroup } from "./Styles"

export const RenderEpicureComparsionModal = (props: any) => {
  const context = useContext(IHCLContext)
  const modalStore = ModalStore.getInstance()

  useEffect(() => {
    window.addEventListener("popstate", () => {
      modalStore?.closeModal()
    })
  }, [modalStore])
  
  //Dialog for width 1280 desktop and mobile 100% for epicure comparision table
  return (
    <EpicureFormGroup  id="epicure-comparision-model" >
      {props?.items?.map((item: any, index: Number) =>
        context?.renderComponent(item?._type, item)
      )}
    </EpicureFormGroup>
  )
}
