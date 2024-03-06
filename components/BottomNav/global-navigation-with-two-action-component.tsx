import React from "react"
import { CONSTANTS } from "../constants"
import {
  ActionButtonTitleTypography,
  NavigationWithTwoContentBox,
  NavigationFirstActionContentBox,
  NavigationSecondActionContentBox,
} from "./styles/global-navigation-with-two-action-component.styles"

const GlobalNavigationWithTwoActionComponent = () => {
  return (
    <NavigationWithTwoContentBox>
      {CONSTANTS?.RESERVE_A_TABLE && (
        <NavigationFirstActionContentBox>
          <ActionButtonTitleTypography variant="m-body-m">
            {CONSTANTS?.RESERVE_A_TABLE}
          </ActionButtonTitleTypography>
        </NavigationFirstActionContentBox>
      )}
      {CONSTANTS?.CHECK_RATES && (
        <NavigationSecondActionContentBox>
          <ActionButtonTitleTypography variant="m-body-m">
            {CONSTANTS?.CHECK_RATES}
          </ActionButtonTitleTypography>
        </NavigationSecondActionContentBox>
      )}
    </NavigationWithTwoContentBox>
  )
}

export default GlobalNavigationWithTwoActionComponent
