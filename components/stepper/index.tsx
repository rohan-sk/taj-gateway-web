import dynamic from "next/dynamic"

const BookFlowSteps = dynamic(() => import("./booking-flow.steps.component"))
const ModifyFlowSteps = dynamic(() => import("./change-rooms.steps.component"))
const EpicureStepper = dynamic(() => import("./epicure-stepper.component"))

const RenderStepperComponent = (props: any) => {
  const variant = props?.largeVariant

  switch (variant) {
    case "bookings.stepper.default":
      return <BookFlowSteps {...props} />
    case "myAccount.stepper.default":
      return <ModifyFlowSteps {...props} />
    case "loyalty.purchase-default":
      return <EpicureStepper {...props} />
    default:
      return <></>
  }
}

export default RenderStepperComponent
