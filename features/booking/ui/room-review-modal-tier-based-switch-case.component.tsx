import dynamic from "next/dynamic"
const caseMap: any = {
  copper: "DEFAULT",
  other: "TIER",
}
const RoomReviewModalAfterLogin = dynamic(
  () => import("./room-review-modal.component")
)

const getCaseKey = (tier: any) => {
  switch (tier) {
    case "copper":
      return "DEFAULT"
    default:
      return "TIER"
  }
}

const RoomDetailModalSwitchCaseLogicComponent = ({
  cases,
  openModal,
  handleClose,
}: any) => {
  const userTier = global?.window?.localStorage?.getItem("userTier") || "copper"

  const currentCase = getCaseKey(userTier?.toLowerCase())
  const componentData = cases?.filter(
    (caseItem: any) => caseItem?.value?.toUpperCase() === currentCase
  )?.[0]?.item?.[0]
  return (
    <RoomReviewModalAfterLogin
      props={componentData}
      handleClose={handleClose}
      openModal={openModal}
      userTier={userTier}
    />
  )
}
export default RoomDetailModalSwitchCaseLogicComponent
