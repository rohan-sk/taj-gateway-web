import { Box, Grid, Stack } from "@mui/material"
import dynamic from "next/dynamic"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { gridBreakPointsGenerator } from "../card/SearchResultCards/search-card.component"
import { useMobileCheck } from "../../utils/isMobilView"
import { GlobalContacts } from "../contactus/Globalcontacts"
import HotelContactCard from "../card/card-with-global-hotel-contacts.card.component"
import { contactHotelData, salesOfficeData } from "../../lib/utils"
import { useEffect, useState, useContext } from "react"
const RenderActionItem = dynamic(() =>  import("../hoc/actions/action-items-ui"))
import { CONSTANTS } from "../constants"
import { useDebounce } from "../../utils/useDebounce"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { UserStore } from "../../store"
import { GLOBAL_STORES } from "../../utils/Constants"
import { observer } from "mobx-react-lite"
import {
  NoResultContainer,
  NoResultTypography,
} from "../card/SearchResultCards/styles/search-card"
import { NoResultsFoundBox } from "../modal/styles/global-search"
import ModalStore from "../../store/global/modal.store"

const getCoordinatesArray = (coordinates: any) => {
  return (
    coordinates
      ?.filter(
        (coordinate: any) =>
          !!coordinate && coordinate?.latitude && coordinate?.longitude
      )
      ?.map((coordinate: any) => ({
        lat: Number(coordinate?.latitude),
        lng: Number(coordinate?.longitude),
      })) || []
  )
}

const HotelContactGroup = ({ items, alternateAllLinks }: any) => {
  const context = useContext(IHCLContext)
  const userStore = context?.getGlobalStore(
    GLOBAL_STORES.userStore
  ) as UserStore
  const { setContactFilteredCoordinates } = userStore

  const isMobile = useMobileCheck()
  const [contactInfo, setContactInfo] = useState([])
  const [loadItems, setLoadItems] = useState(CONSTANTS?.SIX)
  const [searchLocation, setSearchLocation] = useState("")
  const [radioFilter, setRadioFilter] = useState<string>(
    items?.[0]?.parameterMap?.filter(
      (item: any) => item?.key === "radioButton"
    )?.[0]?.value || ""
  )
  const debouncedSearchLocation = useDebounce(searchLocation, 300)
  const modalStore = ModalStore.getInstance()

  useEffect(() => {
    if (modalStore?.visibility === false) {
      setContactFilteredCoordinates(
        getCoordinatesArray(
          contactInfo?.map(
            (item: any) =>
              item?.address?.locationAndDirectionsInfo?.locationDetails
          )
        )
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalStore?.visibility])

  const updateHotelInfo = async (searchTerm: string) => {
    let data: any = []
    data = await contactHotelData(searchTerm)
    setContactInfo(data)
  }
  const updateSalesOfficeInfo = async (searchTerm: string) => {
    let data: any = []
    data = await salesOfficeData(searchTerm)
    setContactInfo(data)
  }
  const setContactInfoOnKey = (key: string, searchTerm: string) => {
    switch (key) {
      case "sale office":
        updateSalesOfficeInfo(searchTerm)
        break
      case "hotel":
        updateHotelInfo(searchTerm)
        break
      default:
        updateSalesOfficeInfo(searchTerm)
    }
  }

  useEffect(() => {
    setContactFilteredCoordinates(
      getCoordinatesArray(
        contactInfo?.map(
          (item: any) =>
            item?.address?.locationAndDirectionsInfo?.locationDetails
        )
      )
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactInfo])

  useEffect(() => {
    setContactInfoOnKey(radioFilter.toLowerCase(), debouncedSearchLocation)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radioFilter, debouncedSearchLocation])

  return (
    <Box>
      {items?.[0]?.parameterMap && (
        <Grid container mb={isMobile ? "0vw" : DesktopPxToVw(60)}>
          <GlobalContacts
            alternateAllLinks={alternateAllLinks}
            parameterMap={items?.[0]?.parameterMap}
            searchLocation={searchLocation}
            setSearchLocation={setSearchLocation}
            setRadioFilter={setRadioFilter}
            radioFilter={radioFilter}
          />
        </Grid>
      )}
      <Grid
        container
        columnGap={isMobile ? "" : DesktopPxToVw(40)}
        rowGap={isMobile ? MobilePxToVw(30) : DesktopPxToVw(40)}>
        {contactInfo?.length > 0 ? (
          contactInfo?.slice(0, loadItems)?.map((item: any, index: any) => (
            <Grid
              item
              key={index}
              minHeight={"100%"}
              {...gridBreakPointsGenerator(isMobile, 3.775, 12)}>
              <HotelContactCard
                {...{
                  actionItem: alternateAllLinks?.[0],
                  title: item?.title,
                  description:
                    item?.address?.locationAndDirectionsInfo?.basicInfo
                      ?.description,
                  coordinates:
                    item?.address?.locationAndDirectionsInfo?.locationDetails,
                  phone: item?.contact?.phone,
                  email: item?.contact?.email,
                }}
              />
            </Grid>
          ))
        ) : (
          <NoResultContainer>
            <NoResultsFoundBox sx={{ padding: "25vh 0 !important" }}>
              <NoResultTypography
                variant={isMobile ? "m-body-l" : "body-ml"}
                sx={{ textAlign: "center" }}>
                {CONSTANTS?.SEARCH_RESULTS_NOT_FOUND}
              </NoResultTypography>
            </NoResultsFoundBox>
          </NoResultContainer>
        )}
      </Grid>
      {contactInfo?.length > CONSTANTS?.SIX && (
        <Grid
          container
          justifyContent={"center"}
          mt={isMobile ? MobilePxToVw(55) : DesktopPxToVw(80)}>
          <RenderActionItem
            title={
              loadItems < contactInfo?.length
                ? CONSTANTS?.LOAD_MORE
                : CONSTANTS?.VIEW_LESS
            }
            url="/"
            variant={"light-outlined"}
            onClick={() => {
              loadItems < contactInfo?.length
                ? setLoadItems((prevValue: number) =>
                    prevValue < contactInfo?.length
                      ? prevValue + CONSTANTS?.THREE
                      : CONSTANTS?.SIX
                  )
                : setLoadItems((prevValue: number) => CONSTANTS?.SIX)
            }}
            navigationType={"internal"}
            iconStyles={{
              transform:
                loadItems < contactInfo?.length
                  ? "rotate(90deg)"
                  : "rotate(-90deg)",
            }}
            isActionButtonType={isMobile ? true : false}
          />
        </Grid>
      )}
    </Box>
  )
}
export default observer(HotelContactGroup)
