import dynamic from "next/dynamic"
import { Box } from "@mui/material"
import { PlaceholderTitle } from "../styles/transaction-summary-details-style"

import { useMobileCheck } from "../../../../utils/isMobilView"
import { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { useAesthetics } from "../../../../utils/fetchAsthetics"

//components
export const ClaimMissingPoints = dynamic(() => import("../claimMissingPoints/claim-missing-points.component"))

function TransactionSummaryDetails(props: any) {
  const isMobile = useMobileCheck()
  const { cardPadding } = useAesthetics(props?.aesthetic?._ref)

  return (
    <Box
      sx={{
        margin: isMobile ? cardPadding?.mobile : cardPadding?.desktop,
      }}>
      <Box
        sx={
          isMobile
            ? {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                rowGap: MobilePxToVw(35),
              }
            : { mb: "0vw" }
        }>
        <PlaceholderTitle variant={isMobile ? "m-heading-s" : "heading-m"}>{props?.title}</PlaceholderTitle>

        {/* commented  this toggle for future use case to show txn summary */}

        {/* <ClaimMissingPointsTypography
          variant={isMobile ? "m-link-m" : "link-m"}
          onClick={() => setShowClaimPoints(!showClaimPoints)}>
          {!showClaimPoints ? (
            CONSTANTS?.CLAIM_MISSING_POINTS
          ) : (
            <Box sx={{ display: "flex" }}>
              <StyledChevronRight sx={{ transform: "rotate(180deg)" }} />
              {CONSTANTS?.BACK_TO_TXN_SUMMARY}
            </Box>
          )}
        </ClaimMissingPointsTypography> */}
      </Box>
      {/* {!showClaimPoints ? (
        <Stack spacing={2}>
          {filteredData ? (
            <>
              <SortAndFilter
                sort={sort}
                setSort={setSort}
                selectFilter={selectFilter}
                setSelectFilter={setSelectFilter}
              />
              <TransactionSummaryCard filteredData={filteredData} /> */}
      {/* commented temporarily */}
      {/* <FlexBox>
                <StyledPagination
                  page={page}
                  count={paginationCount}
                  onChange={handleChange}
                />
              </FlexBox> */}
      {/* <RenderActionItem
                url={""}
                title={"EXPORT TRANSACTIONS"}
                variant={"link-m"}
                navigationType={undefined}
                isActionButtonType={false}
                buttonStyles={{ marginTop: "1.82vw" }}
              />
            </>
          ) : (
            <LoadingSpinner />
          )}
        </Stack>
      ) : (
        )} */}
      <ClaimMissingPoints {...props} />
    </Box>
  )
}

export default TransactionSummaryDetails
