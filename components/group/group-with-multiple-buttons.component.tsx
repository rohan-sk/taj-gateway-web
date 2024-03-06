import React from "react"
import { ButtonsBox, StyledButton } from "./styles/group-with-filter-cards"
import { useAppNavigation } from "../../utils/NavigationUtility"

const GroupWithMultipleButtons = ({ props }: any) => {
  const navigate = useAppNavigation()

  return (
    <ButtonsBox>
      {props?.map((item: any, index: number) => (
        <StyledButton
          onClick={() => {
            navigate(item?.url)
          }}
          key={index}
          variant="light-outlined">
          {item?.title}
        </StyledButton>
      ))}
    </ButtonsBox>
  )
}

export default GroupWithMultipleButtons
