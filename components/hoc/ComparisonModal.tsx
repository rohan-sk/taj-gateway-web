import React, { useContext } from "react"
import { CONSTANTS, ICONS } from "../constants"
import { theme } from "../../lib/theme"
import { urlFor } from "../../lib-sanity"
import { useMobileCheck } from "../../utils/isMobilView"
import PDFGenerator from "../downloadPdf/ReactToPdfDowload"
import { PrintTajLogo } from "../GeneratePdfPrint/pdf-hero-banner"
import { useBrowserCheck } from "../../utils/hooks/useBrowserCheck"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import DownViewComparisonModal from "../downloadPdf/DownloadViewComparison"
import { IHCLContext } from "../forms/loyalty-form/epicure-imports.component"
import GeneratePDFPrint from "../GeneratePdfPrint/render-pdf-print.component"
import { Box, Stack, Table, Button, TableRow, TableBody, TableHead, Typography } from "@mui/material"
import {
  TableCellHead,
  TableRowEpicure,
  ButtonBoxStyleEp,
  BoxTableHeadTitle,
  TableCellBodyFirst,
  TypographyTitleComp,
  TableCellBodySecond,
  TableCellBenefitsContent,
  EpicureBenefitsTitlesWrapper,
  EpicureBenefitsContentWrapper,
} from "../card/styles/membership-billing-details-card"

const ComparisonModal = ({ props, printMode = false, isPrintAction = false }: any) => {
  const isMobile = useMobileCheck()
  const isIos = useBrowserCheck()
  const context = useContext(IHCLContext)
  const PortableText = context!.PortableText
  return (
    <>
      <Box
        aria-label="ComparisonModal"
        sx={{
          bgcolor: isMobile ? "unset" : theme?.palette?.background?.paper,
          padding: isMobile
            ? props?.aesthetic?.padding?.mobile || `${MobilePxToVw(80)} ${MobilePxToVw(22)}`
            : props?.aesthetic?.padding?.desktop || `${DesktopPxToVw(50)} ${DesktopPxToVw(115)}`,
        }}>
        {isPrintAction && printMode && (
          <Box>
            <PrintTajLogo />
          </Box>
        )}
        {props?.items && (
          <EpicureBenefitsContentWrapper $isMobile={isMobile}>
            {props?.items?.map((item: any, index: number) => {
              return (
                <Box key={index}>
                  {item?._type === CONSTANTS?.COMPARISON_TABLE && (
                    <EpicureBenefitsTitlesWrapper $isMobile={isMobile} $isPrintAction={isPrintAction}>
                      <Stack
                        flexDirection={"column"}
                        alignItems={"start"}
                        minWidth={isMobile ? MobilePxToVw(300) : isPrintAction ? "50%" : DesktopPxToVw(580)}
                        maxWidth={isMobile ? MobilePxToVw(300) : isPrintAction ? "50%" : DesktopPxToVw(580)}>
                        <Typography variant={isMobile ? "m-heading-s" : "body-xl"}>{item?.title}</Typography>
                        <Typography
                          variant={isPrintAction && printMode ? "body-l" : isMobile ? "m-body-xs" : "body-xs"}>
                          {item?.subtitle}
                        </Typography>
                      </Stack>
                      <Stack columnGap={isMobile ? MobilePxToVw(10) : DesktopPxToVw(20)} direction="row" width={"100%"}>
                        {item?.comparatives?.map((item: any, id: number) => {
                          return (
                            <Box
                              key={id}
                              minWidth={isMobile ? MobilePxToVw(130) : isPrintAction ? "50%" : DesktopPxToVw(200)}
                              maxWidth={isMobile ? MobilePxToVw(130) : isPrintAction ? "50%" : DesktopPxToVw(200)}
                              textAlign={"center"}
                              flexDirection={"column"}
                              display={"flex"}>
                              <TypographyTitleComp
                                sx={{ fontWeight: `${700} !important` }}
                                variant={isPrintAction && printMode ? "body-xl" : isMobile ? "m-body-m" : "body-ml"}>
                                {item?.title}
                              </TypographyTitleComp>
                              <Typography
                                variant={isPrintAction && printMode ? "body-x" : isMobile ? "m-body-m" : "heading-xs"}>
                                {item?.text}
                              </Typography>
                            </Box>
                          )
                        })}
                      </Stack>
                    </EpicureBenefitsTitlesWrapper>
                  )}
                </Box>
              )
            })}
            <>
              {props?.items?.[0]?.tabularData?.map((item: any, index: any) => (
                <>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCellHead
                          $isIos={isIos}
                          $isMobile={isMobile}
                          key={index}
                          isPrintAction={isPrintAction}
                          sx={{ borderBottom: isMobile ? "" : "unset" }}
                          printMode={printMode}>
                          {item?.title}
                        </TableCellHead>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {item?.specifications?.map((data: any, index: any) => (
                        <>
                          <TableRowEpicure>
                            {(data?.title || data?.bracketTitle) && (
                              <TableCellBodyFirst
                                isPrintAction={isPrintAction}
                                printMode={printMode}
                                $isMobile={isMobile}
                                key={index}
                                $comparativesItems={props?.items?.[0]?.comparatives?.length > 2}>
                                {data?.title}
                                {data?.bracketTitle}
                              </TableCellBodyFirst>
                            )}
                            <TableCellBenefitsContent $isMobile={isMobile}>
                              {(data?.comparativeSpefications ?? props?.items?.[0]?.comparatives)?.map(
                                (item: any, idx: number) => {
                                  return (
                                    <TableCellBodySecond $isMobile={isMobile} key={idx} $isPrintAction={isPrintAction}>
                                      {item?.asset?._ref && (
                                        <Box
                                          alt={`tick-img`}
                                          width={
                                            isIos && isMobile
                                              ? "12px"
                                              : isMobile
                                              ? MobilePxToVw(13)
                                              : isPrintAction && printMode
                                              ? "0.677vw"
                                              : DesktopPxToVw(13)
                                          }
                                          height={
                                            isIos && isMobile ? "13px" : isPrintAction && printMode ? "0.677vw" : "100%"
                                          }
                                          component={"img"}
                                          src={item?.asset?._ref && urlFor(item?.asset?._ref).url()}
                                        />
                                      )}
                                      {item?.title && (
                                        <BoxTableHeadTitle
                                          isPrintAction={isPrintAction}
                                          $isMobile={isMobile}
                                          $isIos={isIos}
                                          printMode={printMode}>
                                          {item?.title}
                                        </BoxTableHeadTitle>
                                      )}
                                      {item?.content?.map((content: any, index: number) => {
                                        return (
                                          <Stack
                                            key={index}
                                            sx={{
                                              "> span": {
                                                fontSize:
                                                  isPrintAction && printMode
                                                    ? "1.354vw"
                                                    : isMobile
                                                    ? MobilePxToVw(16)
                                                    : DesktopPxToVw(16),
                                              },
                                            }}>
                                            <PortableText blocks={content} />
                                          </Stack>
                                        )
                                      })}
                                    </TableCellBodySecond>
                                  )
                                },
                              )}
                            </TableCellBenefitsContent>
                          </TableRowEpicure>
                        </>
                      ))}
                    </TableBody>
                  </Table>
                </>
              ))}
            </>
          </EpicureBenefitsContentWrapper>
        )}
        {props?.items?.map((item: any, index: number) => {
          return (
            <Box key={index}>
              {item?._type === CONSTANTS?.CARD &&
                item?.singleContent?.map((content: any, id: number) => {
                  return (
                    <Stack
                      key={id}
                      sx={{
                        "> span": {
                          fontSize: isMobile ? MobilePxToVw(16) : DesktopPxToVw(16),
                        },
                      }}>
                      <PortableText blocks={content} />
                    </Stack>
                  )
                })}
            </Box>
          )
        })}
        <Box sx={{ marginTop: isMobile ? MobilePxToVw(30) : DesktopPxToVw(30) }}>
          <ButtonBoxStyleEp>
            {!printMode && (
              <>
                {props?.alternateAllLinks?.map((item: any, index: number) => {
                  return (
                    <>
                      {item?.identifier === CONSTANTS?.DOWNLOAD_LOWER_CASE && (
                        <PDFGenerator
                          key={index}
                          downloadButton={
                            <Button
                              variant={"light-outlined"}
                              sx={{ "& .MuiButton-startIcon": { height: "100%" } }}
                              startIcon={
                                <Box
                                  sx={{
                                    paddingRight: isMobile ? MobilePxToVw(0) : DesktopPxToVw(9),
                                  }}
                                  minWidth={isMobile ? "auto" : "100%"}
                                  alt="mail-icon"
                                  component={"img"}
                                  src={ICONS?.GOLD_DOWNLOAD_ICON}
                                />
                              }>
                              {props?.alternateAllLinks?.[0]?.title}
                            </Button>
                          }
                          type="download"
                          PDFData={<DownViewComparisonModal props={props} printMode={true} isPrintAction={true} />}
                          fileNameForUrl={"epicure comparison modal"}
                          giftCardPageResolution={true}
                        />
                      )}
                    </>
                  )
                })}
                {props?.alternateAllLinks?.map((item: any, index: number) => {
                  return (
                    <>
                      {item?.identifier === CONSTANTS?.PRINT_LOWER_CASE && (
                        <GeneratePDFPrint comparison={true} props={props} page="Comparision-modal" key={index} />
                      )}
                    </>
                  )
                })}
              </>
            )}
          </ButtonBoxStyleEp>
        </Box>
      </Box>
    </>
  )
}

export default ComparisonModal
