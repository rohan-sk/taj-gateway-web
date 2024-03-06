import React from "react"
import { useContext, useEffect } from "react"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { EnquireFormGroup } from "./Styles"
import ModalStore from "../../store/global/modal.store"

export const Enquire = (props: any) => {
  const context = useContext(IHCLContext)
  const modalStore = ModalStore.getInstance()

  const isGroupScroll =
    props?.data?.items?.[0]?.variant ===
    "ihclForms.dining-plan-an-event-enquiry"

  useEffect(() => {
    window.addEventListener("popstate", () => {
      modalStore?.closeModal()
    })
  }, [modalStore])

  return (
    <EnquireFormGroup $isGroupScroll={isGroupScroll} id="scrollable-form">
      {props?.data?.items?.map((item: any, index: Number) =>
        context?.renderComponent(item?._type, item)
      )}
    </EnquireFormGroup>
  )
}
