import { Fragment } from "react"
import { PlaceholderTitle } from "../my-account.styles"
import { AccountTabsInterface } from "../personalDetails/personal-details.types"
import PreferenceCardComponent from "./common/preferance-card.component"
import { BorderBox } from "./styles"
import data from "./JSON/prefranceData.json"

const PreferenceManagement = (props: AccountTabsInterface) => {
  const { title } = props

  return (
    <Fragment>
      <PlaceholderTitle variant="heading-m">{title}</PlaceholderTitle>
      <BorderBox>
        {data?.data?.map((item: any, index: number) => (
          <PreferenceCardComponent {...item} key={index} />
        ))}
      </BorderBox>
    </Fragment>
  )
}

export default PreferenceManagement
