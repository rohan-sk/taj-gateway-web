import dynamic from "next/dynamic"
import { PathType } from "../../../types"
import { theme } from "../../../lib/theme"
import { useEffect, useRef, useState } from "react"
import { useDebounce } from "../../../utils/useDebounce"
import { useMobileCheck } from "../../../utils/isMobilView"
import { useAesthetics } from "../../../utils/fetchAsthetics"
import { CONSTANTS, ICONS } from "../../../components/constants"
import { CloseIcon, SearchIcon } from "../../../utils/customIcons"
import { fetchEpicureParticipatingHotels } from "../../../lib/utils"
import { Box, InputAdornment, Stack, Typography } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
const RenderActionItem = dynamic(() => import("../../../components/hoc/actions/action-items-ui"))
import { InputTextField } from "../../../components/forms/enquiry-forms/news-letter-form/news-letter-form.styles"
import {
  BoldText,
  ButtonStack,
  ChartHeader,
  DataColumn,
  MainStack,
  MembershipColumn,
  ValueStack,
  VoucherColumn,
  CheckMarkStack,
  CenteringStack,
} from "./styles/epicure-participating-hotels-chart.styles"

const data = {
  header: {
    hotel: "Hotel",
    city: "City",
    country: "Country",
  },
}

export const NormalTitle = ({ title = "", width = 80 }: any) => {
  const isMobile = useMobileCheck()
  return (
    <Box width={isMobile ? MobilePxToVw(width) : DesktopPxToVw(width)}>
      <Typography variant={isMobile ? "m-body-xs" : "body-xs"}>{title}</Typography>
    </Box>
  )
}

const CheckMark = ({ available = false, width = 80 }: any) => {
  const isMobile = useMobileCheck()
  return (
    <CheckMarkStack $width={width}>
      {available ? (
        <Box
          loading="lazy"
          component={"img"}
          sx={{
            width: DesktopPxToVw(15),
            "@media (max-width:640px)": {
              width: MobilePxToVw(15),
            },
          }}
          src={ICONS?.CHECK_MARK}
        />
      ) : (
        <Box
          component={"img"}
          width={isMobile ? MobilePxToVw(15) : DesktopPxToVw(15)}
          height={isMobile ? MobilePxToVw(13) : DesktopPxToVw(13)}
          loading="lazy"
          src={ICONS?.CLOSE_BLACK_ICON}
        />
      )}
    </CheckMarkStack>
  )
}

const ChartHeaderComponent = (props: any) => {
  const vouchersData = [
    {
      available: props?.applicableVouchers?.oneNightStay,
      width: 50,
    },
    {
      available: props?.applicableVouchers?.oneHourSpaTreatment,
      width: 80,
    },
    { available: props?.applicableVouchers?.mealForTwo, width: 45 },
    {
      available: props?.applicableVouchers?.celebrationCake,
      width: 90,
    },
    {
      available: props?.applicableVouchers?.bestAvailableRate20,
      width: 100,
    },
    {
      available: props?.applicableVouchers?.bestAvailableRateTajPalaces20,
      width: 110,
    },
    {
      available: props?.applicableVouchers?.bestAvailableRateTajSafaris20,
      width: 110,
    },
  ]

  // Create a ref to access the container element

  // Function to handle the scroll to the left

  const isMobile = useMobileCheck()
  return (
    <ChartHeader>
      <CenteringStack>
        <DataColumn py={isMobile ? MobilePxToVw(30) : DesktopPxToVw(30)}>
          <BoldText variant={isMobile ? "m-body-sl" : "body-ml"}></BoldText>
        </DataColumn>
        <MembershipColumn py={isMobile ? MobilePxToVw(30) : DesktopPxToVw(30)}>
          <BoldText variant={isMobile ? "m-body-sl" : "body-ml"}>{props?.membershipBenefit?.categoryTitle}</BoldText>
        </MembershipColumn>
        <VoucherColumn py={isMobile ? MobilePxToVw(30) : DesktopPxToVw(30)}>
          <BoldText variant={isMobile ? "m-body-sl" : "body-ml"}>{props?.applicableVouchers?.categoryTitle}</BoldText>
        </VoucherColumn>
      </CenteringStack>
      <CenteringStack>
        <DataColumn pb={isMobile ? MobilePxToVw(30) : DesktopPxToVw(30)}>
          <Stack width={isMobile ? MobilePxToVw(200) : DesktopPxToVw(200)} alignItems={"start"} textAlign={"start"}>
            <BoldText variant={isMobile ? "m-body-sl" : "body-ml"}>{data?.header?.hotel}</BoldText>
          </Stack>
          <Stack width={isMobile ? MobilePxToVw(110) : DesktopPxToVw(110)}>
            <BoldText variant={isMobile ? "m-body-sl" : "body-ml"}>{data?.header?.city}</BoldText>
          </Stack>
          <Stack width={isMobile ? MobilePxToVw(110) : DesktopPxToVw(110)}>
            <BoldText variant={isMobile ? "m-body-sl" : "body-ml"}>{data?.header?.country}</BoldText>
          </Stack>
        </DataColumn>
        <MembershipColumn pb={isMobile ? MobilePxToVw(30) : DesktopPxToVw(30)}>
          <Typography variant={isMobile ? "m-body-xs" : "body-xs"}>
            {props?.membershipBenefit?.discountsOnFoodAndBeverage?.columnTitle}
          </Typography>
          <Typography variant={isMobile ? "m-body-xs" : "body-xs"}>
            {props?.membershipBenefit?.discountsOnSpa?.columnTitle}
          </Typography>
        </MembershipColumn>
        <VoucherColumn pb={isMobile ? MobilePxToVw(30) : DesktopPxToVw(30)}>
          {vouchersData?.map((item: any, index: number) => (
            <NormalTitle key={index} width={item?.width} title={item?.available?.columnTitle} />
          ))}
        </VoucherColumn>
      </CenteringStack>
    </ChartHeader>
  )
}

const RecordComponent = ({ recordData }: any) => {
  const isMobile = useMobileCheck()
  const VoucherData = [
    {
      available: recordData?.applicableVouchers?.oneNightStay,
      width: 50,
    },
    {
      available: recordData?.applicableVouchers?.oneHourSpaTreatment,
      width: 80,
    },
    { available: recordData?.applicableVouchers?.mealForTwo, width: 45 },
    {
      available: recordData?.applicableVouchers?.celebrationCake,
      width: 90,
    },
    {
      available: recordData?.applicableVouchers?.bestAvailableRate20,
      width: 100,
    },
    {
      available: recordData?.applicableVouchers?.bestAvailableRateTajPalaces20,
      width: 110,
    },
    {
      available: recordData?.applicableVouchers?.bestAvailableRateTajSafaris20,
      width: 110,
    },
  ]
  return (
    <ValueStack>
      <DataColumn py={isMobile ? MobilePxToVw(30) : DesktopPxToVw(30)} sx={{ alignItems: "center" }}>
        <Stack width={isMobile ? MobilePxToVw(200) : DesktopPxToVw(200)} alignItems={"start"} textAlign={"start"}>
          <Typography variant={isMobile ? "m-body-s" : "body-s"}>{recordData?.partipatingHotelName}</Typography>
        </Stack>
        <Stack width={isMobile ? MobilePxToVw(110) : DesktopPxToVw(110)} alignItems={"center"}>
          <Typography variant={isMobile ? "m-body-s" : "body-s"}>{recordData?.city}</Typography>
        </Stack>
        <Stack width={isMobile ? MobilePxToVw(110) : DesktopPxToVw(110)} alignItems={"center"}>
          <Typography variant={isMobile ? "m-body-s" : "body-s"}>{recordData?.country}</Typography>
        </Stack>
      </DataColumn>
      <MembershipColumn py={isMobile ? MobilePxToVw(30) : DesktopPxToVw(30)}>
        <CheckMark available={recordData?.membershipBenefit?.discountsOnFoodAndBeverage?.columnInfo} width={110} />
        <CheckMark available={recordData?.membershipBenefit?.discountsOnSpa?.columnInfo} width={110} />
      </MembershipColumn>
      <VoucherColumn py={isMobile ? MobilePxToVw(30) : DesktopPxToVw(30)}>
        {VoucherData?.map((item: any, index: number) => (
          <CheckMark key={index} available={item?.available?.columnInfo} width={item?.width} />
        ))}
      </VoucherColumn>
    </ValueStack>
  )
}

const EpicureParticipatingHotelsChart = (props: any) => {
  const { cardPadding, cardBackgroundColor } = useAesthetics(props?.aesthetic?._ref)

  const containerRef: any = useRef(null)

  const inputStyle = {
    WebkitBoxShadow: `0 0 0 1000px ${theme?.palette?.background?.default} inset`,
  }

  const isMobile = useMobileCheck()
  const [scrollPosition, setScrollPosition] = useState<any>(false)
  const [tabularData, setTabularData] = useState<any>([{}])
  const [filteredTabularData, setFilteredTabularData] = useState([{}])
  const [loadItems, setLoadItems] = useState(12)
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const [scroll, setScroll] = useState<boolean>(false)

  const scrollLeft = () => {
    if (containerRef.current) {
      const currentScrollLeft = containerRef.current.scrollLeft
      const targetScrollLeft = currentScrollLeft + 900

      const scrollOptions = {
        left: targetScrollLeft,
        behavior: "smooth",
        block: "start",
      }

      containerRef.current.scrollTo(scrollOptions)

      // You can adjust the scroll distance
    }
    setScrollPosition(true)
  }
  const scrollRight = () => {
    if (containerRef.current) {
      const currentScrollLeft = containerRef.current.scrollLeft
      const targetScrollLeft = currentScrollLeft - 900

      const scrollOptions = {
        left: targetScrollLeft,
        behavior: "smooth",
        block: "start",
      }

      containerRef.current.scrollTo(scrollOptions)

      // You can adjust the scroll distance
    }
    setScrollPosition(false)
  }
  useEffect(() => {
    if (debouncedSearchTerm === "") {
      setFilteredTabularData(tabularData)
    } else {
      setFilteredTabularData(() => {
        let term = debouncedSearchTerm?.toLowerCase()
        const filteredData = tabularData?.filter(
          (item: any) =>
            item?.partipatingHotelName?.toLowerCase()?.includes(term) ||
            item?.city?.toLowerCase()?.includes(term) ||
            item?.country?.toLowerCase()?.includes(term),
        )
        return filteredData
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, tabularData])
  useEffect(() => {
    const fetchData = async () => {
      const response: any = await fetchEpicureParticipatingHotels()
      if (response) {
        const sortedData = response?.tabularData?.sort((a: any, b: any) => {
          const taj: any = a?.partipatingHotelName?.toLowerCase()
          const nonTaj: any = b?.partipatingHotelName?.toLowerCase()
          if (taj < nonTaj) return -1
          if (taj > nonTaj) return 1
        })
        let tajHotelsData: any[] = []
        let nonTajHotelsData: any[] = []
        sortedData?.map((item: any) => {
          if (item?.brandName?.toLowerCase() === "taj") {
            tajHotelsData.push(item)
          } else {
            nonTajHotelsData.push(item)
          }
        })
        // Sorting participating hotels brand wises
        const brandWiseSortedData = [...tajHotelsData, ...nonTajHotelsData]
        if (response) {
          setTabularData(brandWiseSortedData || [{}])
          setFilteredTabularData(brandWiseSortedData || [{}])
        }
      }
    }
    fetchData()
  }, [])

  const handleErrorScroll = (element: any) => {
    if (element) {
      element?.scrollIntoView({
        block: "center",
        behavior: "smooth",
        inline: "center",
      })
    }
  }

  useEffect(() => {
    if (scroll) {
      const element = document.getElementById("loadLessScrollId")
      handleErrorScroll(element)
    }
  }, [scroll])

  return (
    <Box
      sx={{
        padding: isMobile ? cardPadding?.mobile : cardPadding?.desktop,
        position: isMobile ? "relative" : "unset",
      }}>
      <Stack
        alignItems={isMobile ? "center" : "end"}
        margin={isMobile ? `0vw auto ${MobilePxToVw(55)}` : `0vw auto ${DesktopPxToVw(60)}`}
        maxWidth={isMobile ? "initial" : "75%"}>
        <InputTextField
          variant="standard"
          value={searchTerm}
          placeholder="Destination/Hotel"
          sx={{ width: isMobile ? MobilePxToVw(453) : DesktopPxToVw(453) }}
          onChange={(e: any) => {
            setSearchTerm(e?.target?.value)
          }}
          inputProps={{ style: inputStyle }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={{
                    width: isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
                  }}
                />
              </InputAdornment>
            ),
            endAdornment:
              searchTerm?.length > 0 ? (
                <Stack onClick={(e: any) => setSearchTerm("")}>
                  <CloseIcon
                    sx={{
                      cursor: "pointer",
                      width: isMobile ? MobilePxToVw(18) : DesktopPxToVw(18),
                    }}
                  />
                </Stack>
              ) : (
                <></>
              ),
          }}
        />
      </Stack>
      <Stack id="loadLessScrollId">
        <MainStack ref={containerRef}>
          <ChartHeaderComponent {...tabularData?.[0]} />
          {isMobile && (
            <Stack>
              {!scrollPosition ? (
                <Box
                  loading="lazy"
                  component={"img"}
                  sx={{
                    width: MobilePxToVw(36),
                    height: MobilePxToVw(36),
                    position: isMobile ? "absolute" : "unset",
                    left: "90vw",
                    transform: "translateY(-50%)",
                  }}
                  onClick={() => scrollLeft()}
                  src={ICONS?.NEXT_GOLD_COLOR_ARROW}
                />
              ) : (
                <Box
                  loading="lazy"
                  component={"img"}
                  sx={{
                    width: MobilePxToVw(36),
                    height: MobilePxToVw(36),
                    position: isMobile ? "absolute" : "unset",
                    right: "90vw",
                    transform: "translateY(-50%)",
                  }}
                  onClick={() => scrollRight()}
                  src={ICONS?.PREV_GOLD_COLOR_ARROW}
                />
              )}
            </Stack>
          )}
          {filteredTabularData?.length > 0 ? (
            <Stack>
              {filteredTabularData?.slice(0, loadItems)?.map((recordData: any, index: number) => (
                <RecordComponent key={index} recordData={recordData} />
              ))}
            </Stack>
          ) : (
            <Typography variant={isMobile ? "m-body-xsl" : "body-x"} sx={{ margin: "4vw 0vw" }}>
              {CONSTANTS?.EMPTY_SEARCH_RESULTS}
            </Typography>
          )}
        </MainStack>
      </Stack>
      {filteredTabularData?.length > 0 && (
        <>
          {filteredTabularData?.length > 12 && (
            <ButtonStack>
              <RenderActionItem
                title={loadItems < filteredTabularData?.length ? CONSTANTS?.LOAD_MORE : CONSTANTS?.LOAD_LESS}
                url={"/"}
                onClick={() => {
                  if (loadItems < filteredTabularData?.length) {
                    setScroll(false)
                    setLoadItems(filteredTabularData?.length)
                  } else {
                    setScroll(true)
                    setLoadItems(12)
                  }
                }}
                navigationType={PathType?.internal}
                isButtonChevron={true}
                isActionButtonType={isMobile ? true : false}
                variant={"light-outlined"}
                iconStyles={{
                  transform: loadItems < filteredTabularData?.length ? "rotate(90deg)" : "rotate(-90deg)",
                }}
                isButtonChevronStyles={
                  isMobile && loadItems < filteredTabularData?.length ? "rotate(90deg)" : "rotate(-90deg)"
                }
              />
            </ButtonStack>
          )}
        </>
      )}
    </Box>
  )
}

export default EpicureParticipatingHotelsChart
