import React, { Fragment } from "react"
import { CONSTANTS } from "../../../../components/constants"
import { formatDateWithMON } from "../../../../utils/getDate"
import { Box, Typography, Grid } from "@mui/material"
import { BorderBox } from "../styles/transaction-summary-card"
import { currencyPrettier } from "../../../../utils/currency"
import { theme } from "../../../../lib/theme"
import { useMobileCheck } from "../../../../utils/isMobilView"
import TransactionSummaryMobile from "./transaction-summary-mobile.component"

interface TransactionProps {
  discount: string
  amountSpent: string
  transactionId: string
  neuCoinsEarned: string
  transactionDetail: string
}

interface TransactionSummaryCardProps {
  date: string
  transaction: TransactionProps
}

function TransactionSummaryCard({ filteredData }: any) {
  const getDetails = (type: any) => {
    switch (type?.paymentType?.toLowerCase()) {
      case "tata_neu":
        return `Neucoins Redemption - ${currencyPrettier(type?.txnNetAmount)?.slice(2)} coins`
      case "gift_card":
        return `Gift Card Redemption`
      case "jus_pay":
        return `JusPay`
      default:
        break
    }
  }
  const isMobile = useMobileCheck()
  return (
    <>
      {isMobile ? (
        <TransactionSummaryMobile filteredData={filteredData} />
      ) : (
        <BorderBox>
          <Grid
            container
            sx={{
              borderBottom: `0.026vw solid ${theme?.palette?.ihclPalette?.hexSixteen}`,
            }}>
            <Grid item md={2}>
              <Typography variant="body-s">{CONSTANTS?.DATE}</Typography>
            </Grid>
            <Grid item md={4.5}>
              <Typography variant="body-s">{CONSTANTS?.TRANSACTION_DETAIL}</Typography>
            </Grid>
            <Grid item md={2.5}>
              <Typography variant="body-s" sx={{ justifyContent: "center", display: "flex" }}>
                {CONSTANTS?.AMOUNT_SPENT}
              </Typography>
            </Grid>
            <Grid item md={1.5}>
              <Typography variant="body-s">{CONSTANTS?.DISCOUNTS}</Typography>
            </Grid>
            <Grid item md={1.5}>
              <Typography variant="body-s">{CONSTANTS?.NEUCOINS_EARNED}</Typography>
            </Grid>
          </Grid>
          {filteredData?.map((data: any, index: number) => {
            return (
              <Fragment key={index}>
                <Box sx={{ margin: "1.042vw 0vw 0.521vw 0vw" }}>
                  <Typography variant="body-s" sx={{ fontWeight: 700 }}>
                    {formatDateWithMON(data?.createdTimestamp)}
                  </Typography>
                </Box>
                <Grid
                  container
                  sx={{
                    backgroundColor:
                      data?.orderType?.toLowerCase() === "hotel_booking"
                        ? theme?.palette?.ihclPalette?.hexTwentyNine
                        : "unset",
                    padding: "10px 0px",
                  }}>
                  <Grid item md={2}>
                    <Typography variant="body-s">
                      <Typography variant="body-s">{data?.transactionId || "Transaction ID"}</Typography>
                    </Typography>
                  </Grid>
                  <Grid item md={4.5}>
                    <Typography variant="body-s">
                      {data?.orderType?.toLowerCase() === "hotel_booking" ? (
                        <>{`Room Booking - ${data?.transactionDetails?.[0]?.name}`}</>
                      ) : (
                        <>{data?.orderType}</>
                      )}
                    </Typography>
                  </Grid>
                  <Grid item md={2.5} sx={{ justifyContent: "center", display: "flex" }}>
                    <Typography variant="body-s">{currencyPrettier(data?.gradTotal)?.slice(1)}</Typography>
                  </Grid>
                  <Grid item md={2}>
                    <Typography variant="body-s">{data?.points}</Typography>
                  </Grid>
                  <Grid item md={1.5}>
                    <Typography variant="body-s">{/* {CONSTANTS?.NEUCOINS_EARNED} */}</Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={2}></Grid>
                  <Grid item md={4.5}>
                    <ul>
                      {data?.transactionDetails?.map((txn: any) => {
                        return txn?.paymentDetails?.map((detail: any, index: number) => {
                          return (
                            <li key={index}>
                              <Typography>{getDetails(detail)}</Typography>
                            </li>
                          )
                        })
                      })}
                    </ul>
                  </Grid>
                  <Grid
                    item
                    md={2.5}
                    sx={{
                      justifyContent: "center",
                      display: "flex",
                      paddingTop: "1vw",
                    }}>
                    <Typography variant="body-s">
                      {data?.transactionDetails?.map((txn: any) => {
                        return txn?.paymentDetails?.map((detail: any, index: number) => {
                          return (
                            <>
                              {detail?.paymentType?.toLowerCase() === "jus_pay" ? (
                                <Typography key={index}>
                                  {`${currencyPrettier(detail?.txnNetAmount)?.slice(2)}`}
                                </Typography>
                              ) : (
                                <br />
                              )}
                            </>
                          )
                        })
                      })}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    md={1.5}
                    sx={{
                      justifyContent: "center",
                      display: "flex",
                      paddingTop: "1vw",
                    }}>
                    <Typography variant="body-s">
                      {data?.transactionDetails?.map((txn: any) => {
                        return txn?.paymentDetails?.map((detail: any, index: number) => {
                          return (
                            <>
                              {detail?.paymentType?.toLowerCase() !== "jus_pay" ? (
                                <Typography key={index}>
                                  {`${currencyPrettier(detail?.txnNetAmount)?.slice(2)}`}
                                </Typography>
                              ) : (
                                <br />
                              )}
                            </>
                          )
                        })
                      })}
                    </Typography>
                  </Grid>
                  <Grid item md={1.5}></Grid>
                </Grid>
              </Fragment>
            )
          })}

          {/* <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell
              sx={{
                width: "7vw",
              }}>
              <Typography variant="body-s">{CONSTANTS?.DATE}</Typography>
            </TableHeadCell>
            <TableHeadCell
              sx={{
                width: "16vw",
              }}>
              <Typography variant="body-s">
                {CONSTANTS?.TRANSACTION_DETAIL}
              </Typography>
            </TableHeadCell>
            <TableHeadCell
              align="center"
              sx={{
                width: "9vw",
              }}>
              <Typography variant="body-s">
                {CONSTANTS?.AMOUNT_SPENT}
              </Typography>
            </TableHeadCell>
            <TableHeadCell
              align="center"
              sx={{
                width: "7vw",
              }}>
              <Typography variant="body-s">{CONSTANTS?.DISCOUNTS}</Typography>
            </TableHeadCell>
            <TableHeadCell
              sx={{
                width: "5vw",
                textAlign: "center",
              }}>
              <Typography variant="body-s">
                {CONSTANTS?.NEUCOINS_EARNED}
              </Typography>
            </TableHeadCell>
          </TableRow>
        </TableHead>
        {filteredData?.map((data: any, index: number) => {
          return (
            <Fragment key={index}>
              <Box sx={{ margin: "1.042vw 0vw 0.521vw 0vw" }}>
                <Typography variant="body-s" sx={{ fontWeight: 700 }}>
                  {formatDateWithMON(data?.createdTimestamp)}
                </Typography>
              </Box>
              <TableBody>
                <TableRow
                  sx={{
                    height: "2.135vw",
                    verticalAlign: "top",
                  }}>
                  <TableBodyCell>
                    <HeroTableCell variant="body-s">
                      {data?.transactionId || "transaction id"}
                    </HeroTableCell>
                  </TableBodyCell>

                  <TableBodyCell>
                    <Box>
                      <HeroTableCell variant="body-s">
                        {data?.orderType?.toLowerCase() === "hotel_booking" ? (
                          <>{`Room Booking - ${data?.transactionDetails?.[0]?.name}`}</>
                        ) : (
                          <>{data?.orderType}</>
                        )}
                      </HeroTableCell>
                      <ul>
                        {data?.transactionDetails?.map((txn: any) => {
                          return txn?.paymentDetails?.map(
                            (detail: any, index: number) => {
                              return (
                                <li key={index}>
                                  <Typography>{getDetails(detail)}</Typography>
                                </li>
                              )
                            }
                          )
                        })}
                      </ul>
                    </Box>
                  </TableBodyCell>
                  <TableBodyCell align="center">
                    <HeroTableCell variant="body-s">
                      {currencyPrettier(data?.gradTotal)?.slice(1)}
                    </HeroTableCell>
                  </TableBodyCell>
                  <TableBodyCell align="center">
                    <HeroTableCell variant="body-s">
                      {data?.discountAmount}
                    </HeroTableCell>
                  </TableBodyCell>
                  <TableBodyCell>
                    <HeroTableCell variant="body-s">
                      {data?.points}
                    </HeroTableCell>
                  </TableBodyCell>
                </TableRow>
              </TableBody>
            </Fragment>
          )
        })}
      </Table> */}
        </BorderBox>
      )}
    </>
  )
}

export default TransactionSummaryCard
