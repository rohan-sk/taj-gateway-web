import React from "react"
import dynamic from "next/dynamic"
import { Accordion } from "./Accordian-tobe-removed"

export const RenderAccordionComponent = (props: any) => {
  const variant = props?.variant

  switch (variant) {
    default:
      return <Accordion {...props}></Accordion>
  }
}
