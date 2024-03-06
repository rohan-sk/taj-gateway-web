import { Box } from "@mui/material"
import dynamic from "next/dynamic"
const CalenderIcon = dynamic(() => import("../../utils/customIcons").then((components) => components.CalenderIcon))
import {
  DateCell,
  DateItem,
  DateTitleContainer,
  DateTitleTypography,
  DateTypography,
  DatesContainer,
  IconCell,
  MainContainer,
  StyledDivider,
} from "./styles/offers-stay-dates.styles"
import { useMobileCheck } from "../../utils/isMobilView"
import { formatDateWithFullMonth } from "../../utils/getDate"
import { hotelRoute, offersRoute } from "../../features/property/ui/constants"
import { useRouter } from "next/router"
import { Fragment } from "react"

const DateItemComponent = ({ title, icon, dates, altTxt, isLastItem, isSingle }: any) => {
  return (
    <>
      <DateCell $isLastItem={isLastItem} $isSingle={isSingle}>
        <DateTitleContainer>
          <DateTitleTypography>{title}</DateTitleTypography>
        </DateTitleContainer>
        <DatesContainer>
          {dates?.length > 0 ? (
            dates?.map((date: any, index: number) => {
              return (
                <DateItem key={index}>
                  <IconCell>{icon || <CalenderIcon sx={{ width: "100%" }} />}</IconCell>
                  <DateTypography>{`${
                    date?.fromDate ? formatDateWithFullMonth(date?.fromDate, false, true) : "Valid for stays till"
                  } - ${formatDateWithFullMonth(date?.toDate, false, true)}`}</DateTypography>
                </DateItem>
              )
            })
          ) : (
            <>
              <DateItem>
                <IconCell>{icon || <CalenderIcon />}</IconCell>
                <DateTypography>{altTxt}</DateTypography>
              </DateItem>
            </>
          )}
        </DatesContainer>
      </DateCell>
    </>
  )
}

const OffersStayDatesCard = ({ data, aesthetic }: any) => {
  const isMobile = useMobileCheck()
  const router = useRouter()
  const routerArr = router?.asPath?.split("/")
  const hotelRouteIndex = routerArr?.findIndex((route: any) => route === hotelRoute)
  const isHotelSpecificOfferDetailsPage = hotelRouteIndex === 1 && routerArr?.[hotelRouteIndex + 2] === offersRoute

  let datesArr = [
    {
      title: "VALIDITY",
      dates:
        ((data?.displayGlobal ? data?.validThroughYear : data?.hotels?.validThroughYear) &&
          isHotelSpecificOfferDetailsPage) ||
        (data?.validThroughYear && !isHotelSpecificOfferDetailsPage)
          ? []
          : isHotelSpecificOfferDetailsPage
          ? data?.displayGlobal
            ? data?.validityDates
            : data?.hotels?.validityDates
          : data?.validityDates,
      altTxt: "Round the Year",
    },
    {
      title: "STAY DATES",
      dates: isHotelSpecificOfferDetailsPage
        ? data?.displayGlobal
          ? data?.stayDates
          : data?.hotels?.stayDates
        : data?.stayDates,
      altTxt: "No Restrictions",
    },
    {
      title: "BLACKOUT DATES",
      dates: isHotelSpecificOfferDetailsPage
        ? data?.displayGlobal
          ? data?.blackoutDates
          : data?.hotels?.blackoutDates
        : data?.blackoutDates,
      altTxt: "No Restrictions",
    },
  ]
  datesArr = datesArr?.filter((item: any) => item?.dates?.length > 0) || []

  return (
    <>
      {(datesArr?.length > 0 ||
        (data?.displayGlobal
          ? data?.validThroughYear
          : data?.hotels?.validThroughYear && isHotelSpecificOfferDetailsPage) ||
        (data?.validThroughYear && !isHotelSpecificOfferDetailsPage)) && (
        <Box
          sx={{
            background: aesthetic?.isGradientEnabled ? `${aesthetic?.gradient}` : aesthetic?.backgroundColor?.hex,
            padding: isMobile ? aesthetic?.padding?.mobile : aesthetic?.padding?.desktop,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}>
          <Box
            sx={
              isMobile
                ? {}
                : {
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }
            }>
            <MainContainer $isBottomBorder={false}>
              {(((data?.displayGlobal ? data?.validThroughYear : data?.hotels?.validThroughYear) &&
                isHotelSpecificOfferDetailsPage) ||
                (data?.validThroughYear && !isHotelSpecificOfferDetailsPage)) && (
                <>
                  <DateItemComponent
                    title={"VALIDITY"}
                    dates={""}
                    isSingle={datesArr?.length < 1 ? true : false}
                    isLastItem={datesArr?.length < 1 ? true : false}
                    altTxt={"Round the Year"}
                  />
                  {!isMobile && datesArr?.length > 0 && <StyledDivider orientation={"vertical"} flexItem />}
                </>
              )}
              {datesArr?.map((item: any, index: number) => (
                <Fragment key={index}>
                  {(item?.dates?.length > 0 || data?.hotels?.validThroughYear) && (
                    <>
                      <DateItemComponent
                        isLastItem={index === datesArr?.length - 1}
                        title={item?.title}
                        dates={item?.dates}
                        altTxt={data?.hotels?.validThroughYear ? "Round the Year" : ""}
                      />
                      {index < datesArr?.length - 1 && !isMobile && <StyledDivider orientation={"vertical"} flexItem />}
                    </>
                  )}
                </Fragment>
              ))}
            </MainContainer>
          </Box>
        </Box>
      )}
    </>
  )
}

export default OffersStayDatesCard
