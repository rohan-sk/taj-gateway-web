import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import {
  HotelInformation,
  OfferBenefitsFormDisable,
  OfferBenefitsFormValues,
  OwnerBenefitsHotelInformation,
} from "./types"
import { BookAStayErrorMessages, Comment, ERROR_MESSAGES, Email, Mobile, Name } from "../gift-card-form/constants"
import { Box, InputAdornment, Stack, Typography } from "@mui/material"
import { useMobileCheck } from "../../../utils/isMobilView"
import { FormErrorIcon, FormSelectArrowIcon, StyledArrowIcon } from "../common/form-components"
import { ErrorMessageTypography, InputTextField } from "../enquiry-forms/news-letter-form/news-letter-form.styles"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { acceptOnlyNumbers, guestTextGenerator, handleBookAHotelSearch, restrictNumericSymbol } from "./utils"
import { theme } from "../../../lib/theme"
import { nameFieldsRestrictions } from "../common/utils/nameFieldRestrictionsHandler"
import TextfieldValidator from "../../../utils/validations/TextfieldValidator"
import { CalenderIcon, CloseIcon, SearchIcon } from "../../../utils/customIcons"
import { DatePickerContainer, GuestRoomContainer } from "../../card/styles/book-a-stay-default-card.styles"
import { getListWithBrandSorting } from "../../../utils/getListWithBrandSorting"
import { ExpandMoreIcon } from "../../header/styles/booking-menu"
import {
  convertDateFormat,
  dateFormatConverter,
  formatDateWithMON,
  getDayAfterTomorrowDate,
  getTomorrowDate,
} from "../../../utils/getDate"
import dayjs from "dayjs"
import { StyledDivider } from "../../banner/styles"
import {
  ButtonWrapper,
  CommentContainer,
  FieldsContainer,
  FormContainer,
  PaddingContainer,
  TitleContainer,
} from "./styles"
import {
  AutocompleteOptionTypography,
  AutocompletePaper,
  SearchAutocomplete,
} from "../../card/styles/card-with-experience-form"
import { fetchAllHotels } from "../../../lib/utils"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import { handler as privilegePlusAPI } from "../../../features/notification/api/handlers/privilage-enquiry"
import { PathType } from "../../types"
import { useLoggedIn } from "../../../utils/hooks/useLoggedIn"
import { LinkDisableBlockContentBox, MultilineInputText } from "../common/styles"
import { CONSTANTS } from "../../constants"
const PortableText = dynamic(() =>
  import("../../../lib/portable-text-serializers").then((module) => module.PortableText),
)
const RenderActionItem = dynamic(() => import("../../hoc/actions/action-items-ui"))
const CountryCodeDropdown = dynamic(() => import("../../../utils/CountryCodeDropdown"))
const CustomDatePickerComponent = dynamic(() => import("../../hoc/CustomDatePicker/custom-date-picker.component"))
const GuestRoomComponent = dynamic(() => import("../../banner/guestRooms/GuestRoomComponent"))

const OffersOwnerBenefitsForm = ({
  items,
  title,
  PrimaryAction,
  secondaryAction,
  content,
  url,
  urlType,
  aesthetic,
  parameterMap,
}: any) => {
  const customerHash = global?.localStorage?.getItem("customerHash") || ""
  const userFirstName = global?.localStorage?.getItem("userFirstName") || ""
  const userLastName = global?.localStorage?.getItem("userLastName") || ""
  const userCountryCode = global?.localStorage?.getItem("userCountryCode") || ""
  const userPhoneNumber = global?.localStorage?.getItem("userPhoneNumber") || ""
  const userEmail = global?.localStorage?.getItem("userEmail") || ""
  const userFullName = `${userFirstName} ${userLastName}`?.trim()
  const initialRoomCountValue = [{ id: 1, adults: 1, child: 0, room: "ROOM", isSelected: false }]

  const initialGuestInformationValue = {
    adult: 1,
    child: 0,
    text: "1 Adult, 0 Child - 1 Room",
  }
  const initialHotelInformation: OwnerBenefitsHotelInformation = {
    hotelName: "",
    id: "",
    identifier: "",
    brandName: "",
  }
  const initialFormValues: OfferBenefitsFormValues = {
    [Name]: "",
    [Email]: "",
    [Mobile]: "",
    [Comment]: "",
  }
  const initialDisableStates: OfferBenefitsFormDisable = {
    [Name]: false,
    [Email]: false,
    [Mobile]: false,
    CountryCode: false,
  }
  const FormErrors = {
    [Email]: false,
    [Name]: false,
    [Mobile]: false,
  }

  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const isLoggedIn = useLoggedIn()

  //refs
  const FormRef = useRef<any>(null)

  //states
  const [disable, setDisable] = useState<OfferBenefitsFormDisable>(initialDisableStates)
  const [formValues, setFormValues] = useState<OfferBenefitsFormValues>(initialFormValues)
  const [formErrors, setFormErrors] = useState<any>(FormErrors)
  const [guestCount, setGuestCount] = useState<number>(1)
  const [error, setError] = useState<any>()
  const [open, setOpen] = useState<boolean>(false)
  const [hotelInformation, setHotelInformation] = useState<OwnerBenefitsHotelInformation>(initialHotelInformation)
  const [roomsCount, setRoomsCount] = useState(initialRoomCountValue)
  const [packages, setPackages] = useState([])
  const [participatingHotels, setParticipatingHotels] = useState<any[]>([])
  const [guestInformation, setGuestInformation] = useState<any>(initialGuestInformationValue)
  const [loader, setLoader] = useState<boolean>(false)
  const [expandGuestRoomCount, setExpandGuestRoomCount] = useState<boolean>(false)

  const [refresh, setRefresh] = useState<any>(new Date().getTime())
  const [countryCode, setCountryCode] = useState<string>("+91")
  const [userCode, setUserCode] = useState<string>("IN")
  const [date, setDate] = useState<any>([dayjs(getTomorrowDate()), dayjs(getDayAfterTomorrowDate())])
  const standardEmails = parameterMap?.filter((item: any) => item?.key === "email")?.map((item: any) => item?.value)
  const standardPhones = parameterMap?.filter((item: any) => item?.key === "mobile")?.map((item: any) => item?.value)

  const handleDateSelection = (date: any) => {
    if (
      `${date?.[0]?.getDate()}${date?.[0]?.getMonth()}${date?.[0]?.getFullYear()}` ===
      `${date?.[1]?.getDate()}${date?.[1]?.getMonth()}${date?.[1]?.getFullYear()}`
    ) {
      const tomorrow = new Date(date?.[0])
      tomorrow.setDate(new Date(date?.[0]).getDate() + 1)
      setDate([date?.[0], tomorrow])
    } else {
      setDate(date)
    }
  }

  const keypadCloseForExpandGuestRoom = () => {
    if (document?.activeElement instanceof HTMLInputElement) {
      document?.activeElement.blur()
    }
  }

  const startDate = dateFormatConverter(date[0])
  const endDate = dateFormatConverter(date[1])

  const handleChange = (e: any) => {
    const { name, value } = e?.target
    const { status } = TextfieldValidator(name, value)
    setFormValues({
      ...formValues,
      [name]: value,
    })
    setFormErrors({
      ...formErrors,
      [name]: !status,
    })
  }

  const handleSearchClose = () => {
    setError((prev: any) => ({
      ...prev,
      search: true,
    }))
    setHotelInformation((prev: any) => initialHotelInformation)
  }
  const checkEmptyFields = () => {
    let tempErrors: any = {
      [Name]: formErrors?.[Name],
      [Mobile]: formErrors?.[Mobile],
      [Email]: formErrors?.[Email],
    }
    let tempFormValues: any = { ...formValues }
    Object?.entries(tempErrors)?.forEach(([key, error]: any) => {
      tempErrors = {
        ...tempErrors,
        [key]: error === true ? true : tempFormValues?.[key]?.length === 0,
      }
    })
    setFormErrors((prev: any) => ({
      ...prev,
      ...tempErrors,
    }))
    setError((prev: any) => ({
      ...prev,
      search: !(!!hotelInformation?.hotelName && !!hotelInformation?.brandName),
    }))
  }

  const handleSubmit = async () => {
    setLoader(() => true)
    let response = await privilegePlusAPI?.apiCall({
      customerName: formValues?.[Name],
      email: formValues?.[Email],
      mobileCountryCode: countryCode,
      mobile: formValues?.[Mobile],
      preferredLocation: hotelInformation?.hotelName,
      startDate: date?.[0] ? convertDateFormat(date?.[0]) : "",
      endDate: date?.[1] ? convertDateFormat(date?.[1]) : "",
      adultCount: guestInformation?.adult,
      childCount: guestInformation?.child,
      comments: formValues?.[Comment],
      numberOfRooms: roomsCount?.length,
    })
    if (response?.error === false) {
      setLoader(() => false)
      if (response?.data?.cause) {
        navigate(secondaryAction?.url, secondaryAction?.urlType)
      } else {
        navigate(PrimaryAction?.url, PrimaryAction?.urlType)
      }
    } else {
      setLoader(() => false)
      navigate(secondaryAction?.url, secondaryAction?.urlType)
    }
  }

  useEffect(() => {
    if (FormRef?.current && (open || expandGuestRoomCount)) {
      FormRef.current.scrollIntoView({
        block: "start",
        inline: "nearest",
        behavior: "smooth",
      })
    }
  }, [open, expandGuestRoomCount])

  useEffect(() => {
    setGuestInformation(() => guestTextGenerator(roomsCount))
  }, [roomsCount])

  useEffect(() => {
    if (isLoggedIn) {
      setFormValues((prev: any) => ({
        ...prev,
        [Name]: userFullName,
        [Email]: userEmail,
        [Mobile]: userPhoneNumber,
      }))
      setCountryCode(userCountryCode || "+91")
    }
    setDisable((prev: any) => ({
      ...prev,
      [Name]: !!userFullName,
      [Email]: !!userEmail,
      [Mobile]: !!userPhoneNumber,
      CountryCode: !!userCountryCode,
    }))
  }, [isLoggedIn, userCountryCode, userEmail, userFullName, userPhoneNumber])

  useEffect(() => {
    const fetchParticipatingHotels = async () => {
      const res: any = await fetchAllHotels()
      if (Array?.isArray(res)) {
        setParticipatingHotels(res?.map((item: any) => ({ ...item, name: item?.hotelName })))
      }
    }
    fetchParticipatingHotels()
  }, [])

  return (
    <PaddingContainer
      $componentPadding={isMobile ? aesthetic?.padding?.mobile : aesthetic?.padding?.desktop || `0vw 12.5vw`}>
      <FormContainer
        ref={FormRef}
        $componentBackground={aesthetic?.backgroundColor?.hex || theme?.palette?.background?.paper}>
        {title && (
          <TitleContainer>
            <Typography variant={isMobile ? "m-heading-s" : "heading-s"} component={"h2"}>
              {title}
            </Typography>
          </TitleContainer>
        )}
        <FieldsContainer>
          <InputTextField
            autoComplete="off"
            placeholder={items?.[0]?.labelText}
            variant="standard"
            name={Name}
            disabled={disable?.[Name]}
            value={formValues?.Name}
            InputProps={{
              endAdornment: <>{formErrors?.[Name] && <FormErrorIcon />}</>,
            }}
            helperText={formErrors?.[Name] && ERROR_MESSAGES?.EMPTY_NAME_ERROR}
            onChange={(e: any) => {
              nameFieldsRestrictions(e, handleChange)
            }}
          />
          <InputTextField
            autoComplete="off"
            disabled={disable?.[Email]}
            placeholder={items?.[1]?.labelText}
            variant="standard"
            name={Email}
            value={formValues?.[Email]}
            InputProps={{
              endAdornment: <>{formErrors?.[Email] && <FormErrorIcon />}</>,
            }}
            helperText={formErrors?.[Email] && items?.[1]?.errorText}
            onChange={(e: any) => handleChange(e)}
          />
          <Stack sx={{ width: "100%" }}>
            <Stack flexDirection={"row"} sx={{ width: "100%" }}>
              <CountryCodeDropdown
                isDisable={disable?.CountryCode}
                isCustomizedArrow={true}
                parentStyles={{
                  minHeight: isMobile ? "6.25vw" : DesktopPxToVw(40),
                  "&, & .MuiSelect-select.MuiSelect-standard.MuiInputBase-input.MuiInput-input, & .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-colorPrimary, & input~div":
                    {
                      display: "flex",
                      alignItems: "center",
                      height: isMobile ? "6.25vw" : DesktopPxToVw(40),
                    },
                  "& span": {
                    margin: "0vw",
                    position: "unset",
                  },
                  "@media (max-Width:640px)": {
                    "& .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-colorPrimary": {
                      minWidth: "initial",

                      paddingBottom: "0vw",
                      height: "6.25vw",
                    },
                  },
                }}
                iconStyle={{
                  position: "static !important",
                  color: `${theme?.palette?.ihclPalette?.hexSeventeen}`,
                  fontSize: isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
                }}
                dropdownStyle={{
                  marginLeft: isMobile ? MobilePxToVw(60) : DesktopPxToVw(95),
                  width: isMobile ? MobilePxToVw(500) : DesktopPxToVw(300),
                }}
                countryCode={countryCode}
                setCountryCode={setCountryCode}
                setUserCode={setUserCode}
                backgroundColor={theme?.palette?.background?.paper}
              />
              <InputTextField
                type="tel"
                disabled={disable?.[Mobile]}
                autoComplete="off"
                name={Mobile}
                sx={{
                  "& input, & label": {
                    paddingLeft: isMobile ? MobilePxToVw(14) : DesktopPxToVw(24),
                  },
                }}
                placeholder={items?.[2]?.labelText}
                value={formValues?.[Mobile]}
                onKeyDown={(e: any) => restrictNumericSymbol(e)}
                onChange={(e: any) => acceptOnlyNumbers(e, handleChange)}
                variant="standard"
                InputProps={{
                  endAdornment: <>{formErrors?.[Mobile] && <FormErrorIcon />}</>,
                }}
              />
            </Stack>
            {formErrors?.[Mobile] && (
              <Stack sx={{ position: "relative" }}>
                <ErrorMessageTypography sx={{ position: "absolute" }}>{items?.[2]?.errorText}</ErrorMessageTypography>
              </Stack>
            )}
          </Stack>
        </FieldsContainer>
        <FieldsContainer>
          <SearchAutocomplete
            sx={{
              "& .MuiInputBase-root": {
                paddingBottom: "0vw",
              },
            }}
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
            onInput={(event: any) => handleBookAHotelSearch(event, setHotelInformation, setError)}
            onChange={(event: any, newValue: any) => {
              handleBookAHotelSearch(event, setHotelInformation, setError, newValue)
            }}
            popupIcon={<ExpandMoreIcon />}
            noOptionsText={"No results found for your search"}
            value={hotelInformation}
            getOptionLabel={(option: any) => option?.hotelName}
            options={
              participatingHotels?.length > 0
                ? hotelInformation == null || hotelInformation?.hotelName?.length === 0
                  ? getListWithBrandSorting(participatingHotels)
                  : getListWithBrandSorting(participatingHotels)
                : []
            }
            PaperComponent={({ children }: any) => <AutocompletePaper>{children}</AutocompletePaper>}
            renderOption={(props: any) => {
              return (
                <AutocompleteOptionTypography {...props} variant={isMobile ? "m-body-m" : "body-m"}>
                  {props.key}
                </AutocompleteOptionTypography>
              )
            }}
            renderInput={(params: any) => {
              const { InputProps } = params
              const temp = {
                ...params,
                InputProps: {
                  ...InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        sx={{
                          height: "auto",
                          width: isMobile ? MobilePxToVw(22) : DesktopPxToVw(22),
                        }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: hotelInformation?.hotelName && hotelInformation?.hotelName?.length > 0 && (
                    <>
                      <InputAdornment position="end">
                        <Box component={"div"} onClick={() => handleSearchClose()}>
                          <CloseIcon
                            sx={{
                              cursor: "pointer",
                              height: isMobile ? "auto" : "0.8vw",
                              width: isMobile ? "2.5vw" : "1vw",
                            }}
                          />
                        </Box>
                      </InputAdornment>
                    </>
                  ),
                },
              }
              return (
                <InputTextField
                  variant="standard"
                  name={"name"}
                  placeholder="Find a Hotel"
                  {...temp}
                  helperText={error?.search && BookAStayErrorMessages?.HOTEL}
                />
              )
            }}
          />
          <Stack sx={{ width: "100%" }}>
            <DatePickerContainer
              key={refresh}
              sx={{
                width: "100% !important",
                height: isMobile ? "6.25vw !important" : "2.083vw !important",
              }}>
              <CustomDatePickerComponent
                date={date}
                isOpen={open}
                onChange={handleDateSelection}
                minDate={new Date()}
                defaultActiveStartDate={new Date()}
                calendarWidth={isMobile ? MobilePxToVw(476) : DesktopPxToVw(1158)}
                calendarIcon={<CalenderIcon sx={{ width: isMobile ? "2.656vw" : "0.833vw" }} />}
                showDoubleView={isMobile ? false : true}
                selectRange={true}
                onCalendarOpen={() => {
                  setOpen(true), keypadCloseForExpandGuestRoom()
                }}
                onCalendarClose={() => {
                  setRefresh(`${new Date().getTime()}`)
                  setOpen(false)
                }}
                focusSelectedMonth={true}
                renderComponent={
                  <Stack
                    alignItems={"center"}
                    flexDirection={"row"}
                    onClick={() => setOpen(!open)}
                    columnGap={DesktopPxToVw(10)}>
                    <Typography
                      whiteSpace={"nowrap"}
                      color={theme.palette.ihclPalette.Seventeen}
                      variant={isMobile ? "m-body-l" : "body-l"}>
                      {date?.[0] ? formatDateWithMON(date?.[0]) : "Check in"}
                    </Typography>
                    <StyledDivider sx={{ width: `${DesktopPxToVw(30)} !important` }} />
                    <Typography
                      whiteSpace={"nowrap"}
                      color={theme.palette.ihclPalette.hexSeventeen}
                      variant={isMobile ? "m-body-l" : "body-l"}>
                      {date?.[1] ? formatDateWithMON(date?.[1]) : "Check out"}
                    </Typography>
                  </Stack>
                }
              />
            </DatePickerContainer>
            {error?.date && (
              <Box position={"relative"} width={"100%"}>
                <ErrorMessageTypography position={"absolute"}>{BookAStayErrorMessages?.DATE}</ErrorMessageTypography>
              </Box>
            )}
          </Stack>
          <Stack onClick={() => setExpandGuestRoomCount(!expandGuestRoomCount)} sx={{ width: "100%" }}>
            <InputTextField
              variant={"standard"}
              inputProps={{
                style: {
                  fontFamily: "Inter",
                },
              }}
              InputProps={{
                endAdornment: <StyledArrowIcon toggle={expandGuestRoomCount} />,
              }}
              onClick={(e: any) => {
                setExpandGuestRoomCount((prev: boolean) => !prev), keypadCloseForExpandGuestRoom()
              }}
              onKeyDown={(e: any) => e?.preventDefault()}
              value={guestInformation?.text}
            />
            {expandGuestRoomCount && (
              <GuestRoomContainer>
                <GuestRoomComponent
                  top={"0vw"}
                  right={isMobile ? "" : "-1.5vw"}
                  roomsCount={roomsCount}
                  setRoomsCount={setRoomsCount}
                  setGuestCount={setGuestCount}
                  expandGuestRoomCount={expandGuestRoomCount}
                  setExpandGuestRoomCount={setExpandGuestRoomCount}
                  maxRoomsCount={CONSTANTS?.THREE}
                />
              </GuestRoomContainer>
            )}
          </Stack>
        </FieldsContainer>
        <CommentContainer>
          <Typography
            sx={{
              color: theme?.palette?.ihclPalette.hexSeventeen,
              fontSize: isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
            }}>
            {items?.[6]?.labelText}
          </Typography>
          <MultilineInputText
            multiline
            sx={{ width: "100%" }}
            autoComplete="off"
            variant="standard"
            name={Comment}
            value={formValues?.[Comment]}
            inputProps={{ maxLength: 100 }}
            onChange={(e: any) => handleChange(e)}
          />
        </CommentContainer>
        <ButtonWrapper>
          <RenderActionItem
            isActionButtonType={true}
            url={PrimaryAction?.url}
            title={PrimaryAction?.title}
            variant={PrimaryAction?.variant}
            navigationType={PrimaryAction?.urlType}
            buttonStyles={{
              lineHeight: "140%",
              letterSpacing: "1.8px",
            }}
            onClick={() => {
              if (
                formValues?.[Name]?.length > 0 &&
                formValues?.[Email]?.length > 0 &&
                formValues?.[Mobile]?.length > 0 &&
                hotelInformation?.hotelName &&
                hotelInformation?.hotelName?.length > 0 &&
                hotelInformation?.brandName &&
                hotelInformation?.brandName?.length > 0
              ) {
                handleSubmit()
              } else {
                checkEmptyFields()
              }
            }}
          />
        </ButtonWrapper>
        <Box
          sx={{
            margin: "0 auto",
            textAlign: "center",
            marginTop: isMobile ? "5.469vw" : "2.07vw",
          }}>
          {content?.map((content: any, index: number) => {
            return (
              <LinkDisableBlockContentBox
                isDisable={!isMobile && content?.content?.[0]?.markDefs?.[0]?.linkType === "mobile"}
                key={index}
                component={"span"}
                textAlign={"center"}>
                <PortableText blocks={content?.content} key={index} />
              </LinkDisableBlockContentBox>
            )
          })}
        </Box>
      </FormContainer>
    </PaddingContainer>
  )
}
export default OffersOwnerBenefitsForm
