import React from "react"
import { useRouter } from "next/router"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import {
  MainBox,
  VerticalDivider,
  TabTypography,
} from "../styles/gift-cards-tabs"

type GiftCardTabProps = {
  props: GiftCardTabItems[]
}

type GiftCardTabItems = {
  url: string
  title: string
  urlType: string
}
const GiftCardTabs = ({ props }: GiftCardTabProps) => {
  const router = useRouter()
  const navigate = useAppNavigation()

  return (
    <>
      <MainBox>
        {props?.map((item: GiftCardTabItems, index: number) => (
          <>
            <TabTypography
              key={index}
              variant="m-body-m"
              $isHighlighted={item?.url === router?.asPath}
              onClick={() => item?.url && navigate(item?.url)}>
              {item?.title}
            </TabTypography>
            {index !== props?.length - 1 && (
              <VerticalDivider orientation="vertical" flexItem />
            )}
          </>
        ))}
      </MainBox>
    </>
  )
}

export default GiftCardTabs
