// gift card page under My Account Section

import React, { Fragment, useContext, useEffect, useState } from "react"
import { AccountTabsInterface } from "../personalDetails/personal-details.types"
import { Box, Divider, Typography } from "@mui/material"
import { PlaceholderTitle } from "../my-account.styles"
import {
  ChildGridContainer,
  TabWrapper,
  ContentBox,
} from "../AccountHeader/account-header.styles"
import GiftCardDetailsCardComponent from "./common/gift-card-details-card.component"
import GCData from "./Json/giftCardData.json"
import GiftCardTabHeaderComponent from "./common/gift-card-tab-header.component"
import { GiftCardDetailsType } from "./gift-card-box.types"
import {
  GCFlexBox,
  GCHeaderWrapperBox,
  LoadMoreContainer,
  NoGiftCardsText,
} from "./common/styles"
import { useMobileCheck } from "../../../utils/isMobilView"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import { PAGE_STORES } from "../../../utils/Constants"
import AccountStore from "../../../features/my-account/store/pageStore/account.store"
import { CONSTANTS } from "../../constants"

const GiftCardComponent = (props: AccountTabsInterface) => {
  const { title } = props
  const [selected, setSelected] = useState<number>(0)
  const [cardsToShow, setCardsToShow] = useState(3)
  const handleClick = (event: any, id: number) => {
    setSelected(id)
  }
  const isMobile = useMobileCheck()
  const pageContextUse = useContext(PageContext)
  const data: any = pageContextUse?.getPageStore(
    PAGE_STORES.ACCOUNT_STORES.myAccountStore
  ) as AccountStore

  const GiftCardPurchasedData = data?.myAccountData?.giftCards?.data?.filter(
    (card: any) => card.orderType === CONSTANTS?.GIFT_CARD_PURCHASE
  )
  return (
    <Fragment>
      <GCFlexBox $isMobile={isMobile}>
        <PlaceholderTitle variant="heading-m">{title}</PlaceholderTitle>
        <Box>
          {GiftCardPurchasedData?.length > 0 && (
            <ChildGridContainer>
              <TabWrapper
                variant="body-m"
                $index={selected === 0}
                onClick={(e: any) => handleClick(e, 0)}>
                {"MY CARDS"}
              </TabWrapper>
              <Divider orientation="vertical" flexItem />
              <TabWrapper
                variant="body-m"
                $index={selected === 1}
                onClick={(e: any) => handleClick(e, 1)}>
                {"FULLY REDEEMED"}
              </TabWrapper>
              <Divider orientation="vertical" flexItem />
              <TabWrapper
                variant="body-m"
                sx={{ marginRight: "0vw!important" }}
                $index={selected === 2}
                onClick={(e: any) => handleClick(e, 2)}>
                {"GIFTED"}
              </TabWrapper>
            </ChildGridContainer>
          )}
        </Box>
      </GCFlexBox>
      <GCHeaderWrapperBox>
        {/* commented Since it got removed from FIGMA */}

        {/* <GiftCardTabHeaderComponent label="TOTAL VALUE" value="100,000" />
        <GiftCardTabHeaderComponent label="TOTAL REDEEMED" value="40,000" />
        <GiftCardTabHeaderComponent label="CURRENT BALANCE" value="60,000" /> */}
        {GiftCardPurchasedData?.length > 0 && (
          <Typography variant="body-l">
            TOTAL REDEEMED : <b>10,000</b>
          </Typography>
        )}
      </GCHeaderWrapperBox>
      <ContentBox $select={selected === 0}>
        {GiftCardPurchasedData?.length > 0 ? (
          <>
            {GiftCardPurchasedData?.slice(0, cardsToShow).map(
              (item: GiftCardDetailsType, idx: number) => (
                <Fragment key={idx}>
                  <GiftCardDetailsCardComponent {...item} />
                </Fragment>
              )
            )}
            <LoadMoreContainer>
              {cardsToShow < GiftCardPurchasedData.length && (
                <Typography
                  variant="link-m"
                  onClick={() => setCardsToShow(cardsToShow + 3)}>
                  Load more
                </Typography>
              )}
            </LoadMoreContainer>
          </>
        ) : (
          <NoGiftCardsText variant="heading-xs">
            {CONSTANTS?.MY_ACCOUNT_EMPTY_TEXT}
          </NoGiftCardsText>
        )}
      </ContentBox>
      <ContentBox $select={selected === 1}>
        <Typography variant="heading-m"> {"FULLY REDEEMED"}</Typography>
      </ContentBox>
      <ContentBox $select={selected === 2}>
        <Typography variant="heading-m"> {"GIFTED"}</Typography>
      </ContentBox>
    </Fragment>
  )
}

export default GiftCardComponent
