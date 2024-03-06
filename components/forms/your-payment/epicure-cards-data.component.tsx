import fetchMembershipDetails from "../../../utils/fetchMembershipData"

export const EpicureCardsData = async (
  isRenewal: boolean,
  setEpicureData: Function,
  setLoyaltyNavigation: Function,
  epicureType: string,
  epicureCard: string,
  programType: string
) => {
  let response: any
  const membershipType = programType

  response = await fetchMembershipDetails()

  if (response) {
    response?.map((card: any) => {
      if (
        !isRenewal &&
        card?.tier?.toUpperCase() === "PREFERRED" &&
        (!programType ? card?.type === "epicure" : card?.type === programType)
      ) {
        setLoyaltyNavigation((prev: any) => {
          return {
            ...prev,
            preferredNav: card?.primaryAction,
          }
        })
      } else if (
        card?.tier?.toUpperCase() === "PREFERRED" &&
        isRenewal &&
        card?.type?.toLowerCase() === "renewal"
      ) {
        setLoyaltyNavigation((prev: any) => {
          return {
            ...prev,
            preferredNav: card?.primaryAction,
          }
        })
      }
      if (
        !isRenewal &&
        card?.tier?.toUpperCase() === "PRIVILEGED" &&
        (!programType ? card?.type === "epicure" : programType)
      ) {
        setLoyaltyNavigation((prev: any) => {
          return {
            ...prev,
            privilegedNav: card?.primaryAction,
          }
        })
      } else if (
        card?.tier?.toUpperCase() === "PRIVILEGED" &&
        isRenewal &&
        card?.type?.toLowerCase() === "renewal"
      ) {
        setLoyaltyNavigation((prev: any) => {
          return {
            ...prev,
            privilegedNav: card?.primaryAction,
          }
        })
      }
      if (
        !isRenewal &&
        card?.tier?.toLowerCase() ===
          (epicureType?.toLowerCase() || epicureCard?.toLowerCase()) &&
        (!programType ? card?.type === "epicure" : programType)
      ) {
        setEpicureData((prev: any) => {
          return {
            ...prev,
            tax: card?.tax,
            price: card?.price,
            title: card?.title,
            type: card?.type,
            tier: card?.tier,
          }
        })
      } else if (
        card?.tier?.toLowerCase() ===
          (epicureType?.toLowerCase() || epicureCard?.toLowerCase()) &&
        isRenewal &&
        card?.type?.toLowerCase() === "renewal"
      ) {
        setEpicureData((prev: any) => {
          return {
            ...prev,
            tax: card?.tax,
            price: card?.price,
            title: card?.title,
            type: card?.type,
            tier: card?.tier,
          }
        })
      }
    })
  }
}