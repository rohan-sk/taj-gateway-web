import React, { useEffect, useState } from "react"
import { ActionProps } from "../types"
import { theme } from "../../lib/theme"
import RenderActionItem from "../hoc/actions/action-items-ui"
import { Box, InputAdornment, Paper, Typography } from "@mui/material"
import {
  TitleContainerTypographyBox,
  TitleWithSingleActionContainer,
} from "./styles/bussiness-services-with-action-component-styles"
import { useMobileCheck } from "../../utils/isMobilView"
import { CONSTANTS, ICONS } from "../constants"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { AutoCompleteInput, DefaultStyledAutocomplete } from "../card/styles/book-a-stay-default-card.styles"
import { fetchHotelsFactSheets } from "../../lib/utils"
import { getVideoUrl } from "../../lib-sanity"
import { ErrorDisplayTypography } from "../forms/business-form/business-sme-form"

interface parameterMapItems {
  key: string
  value: string
}
interface TitleWithSingleActionItems {
  title: string
  _key: string
  _type: string
  variant: string
  primaryAction: ActionProps
  parameterMap: parameterMapItems[]
}
const TitleWithSingleAction = ({ title, parameterMap, primaryAction, variant }: TitleWithSingleActionItems) => {
  const isMobile = useMobileCheck()
  const [factSheet, setFactSheet] = useState<any>(null)
  const [error, setError] = useState<boolean>(false)
  const [hotelInformation, setHotelInformation] = useState<any>([])

  useEffect(() => {
    const fetchHotelsFactSheetsData = async () => {
      try {
        const response: any = await fetchHotelsFactSheets()
        if (response?.length > 0) {
          setHotelInformation(response)
        }
      } catch (error) {
        console.log("Offers error :", error)
      }
    }
    fetchHotelsFactSheetsData()
  }, [])

  return (
    <Box aria-label={variant} sx={{ padding: isMobile ? "0vw 6.25vw" : "0vw 18.91vw" }}>
      <TitleWithSingleActionContainer $borderBottom={!parameterMap}>
        {title && (
          <TitleContainerTypographyBox>
            <Typography
              variant={isMobile ? "m-heading-s" : "heading-s"}
              sx={{ color: theme?.palette?.neuPalette?.hexOne }}>
              {title}
            </Typography>
          </TitleContainerTypographyBox>
        )}
        {parameterMap && (
          <Box>
            {parameterMap?.map((item: parameterMapItems, index: number) => (
              <Box key={index} sx={{ display: "flex", flexDirection: "column" }}>
                <DefaultStyledAutocomplete
                  onOpen={() => {
                    if (global?.window !== undefined) {
                      document.body.style.overflow = "hidden"
                    }
                  }}
                  onClose={() => {
                    if (global?.window !== undefined) {
                      document.body.style.overflow = "auto"
                    }
                  }}
                  onChange={(event: any, newValue: any) => {
                    setFactSheet(newValue)
                    setError(false)
                  }}
                  sx={{
                    width: isMobile ? "67.188vw" : "23.6vw",
                    "& .MuiAutocomplete-inputRoot": {
                      paddingRight: "0vw !important",
                    },
                    "& .MuiInput-input": {
                      color: "#fff !important",
                    },
                    "& .MuiTextField-root": {
                      borderBottom: error
                        ? `1px solid ${theme.palette.neuPalette.hexTen} !important`
                        : `1px solid ${theme.palette.neuPalette.hexTwelve} !important`,
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: theme?.palette?.neuPalette?.hexOne,
                    },
                  }}
                  noOptionsText={"No results found for your search"}
                  value={factSheet?.hotelName}
                  getOptionLabel={(option: any) => option.hotelName}
                  options={hotelInformation?.length > 0 ? hotelInformation : []}
                  PaperComponent={({ children }: any) => (
                    <Paper
                      sx={{
                        width: isMobile ? "67.188vw" : "23.6vw",
                        borderRadius: 0,
                        boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
                        backgroundColor: theme?.palette?.background.default,
                      }}>
                      {children}
                    </Paper>
                  )}
                  renderOption={(props: any) => {
                    return (
                      <Box component={"div"}>
                        <Typography
                          {...props}
                          variant={isMobile ? "m-body-m" : "body-m"}
                          sx={{
                            fontWeight: "300",
                            margin: "1.04vw 0vw 1.04vw",
                            paddingLeft: "2.083vw!important",
                          }}>
                          {props.key}
                        </Typography>
                      </Box>
                    )
                  }}
                  renderInput={(params) => {
                    const { InputProps } = params
                    const temp = {
                      ...params,
                      InputProps: {
                        ...InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <Box
                              alt={`-img`}
                              component={"img"}
                              src={ICONS?.BUSINESS_SERVICE_SEARCH_ICON}
                              sx={{
                                height: isMobile ? "3.438vw" : "1.146vw",
                                width: isMobile ? "3.438vw" : "1.146vw",
                                marginRight: isMobile ? "2.344vw" : "0.781vw",
                              }}
                            />
                          </InputAdornment>
                        ),
                      },
                    }
                    return <AutoCompleteInput variant="standard" name={"name"} placeholder="Hotel" {...temp} />
                  }}
                />
                <Box width={"100%"} textAlign={"center"}>
                  {error && (
                    <ErrorDisplayTypography
                      sx={{
                        marginBottom: isMobile ? "1.563vw" : "0.541vw",
                        position: "absolute",
                        left: "50%",
                        transform: "translateX(-50%)",
                        alignSelf: "center",
                      }}>
                      {CONSTANTS?.DOWNLOAD_FACTSHEET_ERROR}
                    </ErrorDisplayTypography>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        )}
        {primaryAction?.title && (
          <Box mt={isMobile ? MobilePxToVw(40) : DesktopPxToVw(35)}>
            <RenderActionItem
              url={primaryAction?.url}
              isActionButtonType={true}
              title={primaryAction?.title}
              variant={primaryAction?.variant}
              navigationType={primaryAction?.urlType}
              buttonStyles={{ letterSpacing: "1.8px" }}
              onClick={() => {
                if (factSheet) {
                  window?.open(`${getVideoUrl(factSheet?.hotelFactsheet)}`)
                } else {
                  setError(true)
                }
              }}
            />
          </Box>
        )}
      </TitleWithSingleActionContainer>
    </Box>
  )
}

export default TitleWithSingleAction
