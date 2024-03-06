import { theme } from "../../../lib/theme"
import { UserStore } from "../../../store"
import { CONSTANTS } from "../../constants"
import SnackbarToast from "../../../utils/SnackbarToast"
import { CustomDropDown } from "../../hoc/CustomDropDown"
import { useMobileCheck } from "../../../utils/isMobilView"
import React, { useContext, useEffect, useState, useRef } from "react"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import CountryCodeDropdown from "../../../utils/CountryCodeDropdown"
import { Box, ClickAwayListener, Divider, Grid, Stack, Tooltip, Typography } from "@mui/material"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import nationalityData from "../../../mock-data/nationality-data.json"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import CustomAutoCompleteComponent from "../../custom-auto-complete.component"
import TextfieldValidator from "../../../utils/validations/TextfieldValidator"
import CustomDatePicker from "../../hoc/CustomDatePicker/custom-date-picker.component"
import AccountStore from "../../../features/my-account/store/pageStore/account.store"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  formatDateWithMON,
  getDateBefore18Years,
  formatDateWithHyphen,
  formatDateWithFullMonth,
} from "../../../utils/getDate"
import {
  EditIcon,
  StyledEdit,
  SaveTypography,
  InputBoxWrapper,
  StyledTypography,
  DetailsGridWrapper,
} from "./personal-details.styles"
import {
  EDIT_ICON,
  EDIT_TEXT,
  PLACEHOLDERS,
  receiverEmail,
  receiverMobile,
  DISABLE_EDIT_ICON,
  CLICK_TO_ADD_YOUR,
  GENDER_VALUE,
} from "../../forms/gift-card-form/constants"
import {
  InputText,
  AutoCompleteInput,
  MobileNumberInput,
  CountryCodeDropdownBox,
} from "../../forms/gift-card-form/styles"
import { CalenderIcon } from "../../../utils/customIcons"
import salutationData from "../../../utils/salutation-json.json"
import { PortableText } from "../../../lib/portable-text-serializers"
import GetDefaultValue, { setLocalStorage } from "../../../utils/validations/getDefaultValue"
import { userFirstName, userLastName, userSalutation } from "../../../utils/browserStoreConstants"

type CommonFieldsType = {
  receiverEmail: string
}
type CommonFieldsErrorsType = {
  receiverEmail: boolean
}

const FieldDetails = ({
  content,
  userInfo,
  field: singleField,
  title,
  subtitle,
  withoutEdit = false,
  type,
  setUserInfo,
  setIsEditing,
  extraData,
}: any) => {
  const isMobile = useMobileCheck()
  const calendarRef = useRef<any>(null)
  const [date, setDate] = useState<any>(null)
  const [editField, setEditField] = useState(false)
  const [apiResponse, setApiResponse] = useState<any>()
  const [snackMessage, setSnackMessage] = useState<string>("")
  const [openErrorMessage, setOpenErrorMessage] = useState<boolean>(false)
  const [localUserInfo, setLocalUserInfo] = useState<any>(userInfo)
  const [receiverCountryCode, setReceiverCountryCode] = useState<string>("+91")
  const [showTooltip, setShowTooltip] = useState<boolean>(false)
  const [changeEmail, setChangeEmail] = useState<any>({
    initiateChange: null,
    email: "",
  })
  const [open, setOpen] = useState<boolean>(false)

  const [errorMessage, setErrorMessage] = useState<CommonFieldsType>({
    receiverEmail: "",
  })

  const [errors, setErrors] = useState<CommonFieldsErrorsType>({
    receiverEmail: false,
  })

  const formValidation = (isFormValid: boolean, id: number) => {
    setErrors({ ...errors, [id]: !isFormValid })
  }
  useEffect(() => {
    setLocalUserInfo(userInfo)
    setChangeEmail({ ...changeEmail, email: userInfo.email })
    userStore.setUserEmailID(userInfo?.email)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo])
  const navigate = useAppNavigation()
  useEffect(() => {
    setUserInfo &&
      setUserInfo((prev: any) => {
        return {
          ...prev,
          firstName: apiResponse?.nameDetails?.firstName,
          lastName: apiResponse?.nameDetails?.lastName,
          email: apiResponse?.primaryEmailId,
          phoneNumber: `${apiResponse?.primaryMobile?.isdCode && apiResponse?.primaryMobile?.isdCode}-${
            apiResponse?.primaryMobile?.phoneNumber && apiResponse?.primaryMobile?.phoneNumber
          }`,
          dob: apiResponse?.dob,
          gender: apiResponse?.gender,
          nationality: apiResponse?.nationality,
          isEmailVerified: apiResponse?.emailVerified,
          addresses: apiResponse?.addresses,
          salutation: apiResponse?.nameDetails?.salutation,
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiResponse])

  const handleScroll = () => {
    if (calendarRef?.current) {
      calendarRef.current.scrollIntoView({
        block: "center",
        inline: "nearest",
        behavior: "smooth",
      })
    }
  }

  const handleDatePicker = (newValue: any) => {
    const date = new Date(newValue?.toLocaleString())
    const eventFormat = new Date(Date.UTC(date?.getFullYear(), date?.getMonth(), date?.getDate()))
    const formattedDate = eventFormat.toLocaleString("en-GB", { timeZone: "UTC" }).split(",")[0]

    setDate(formatDateWithMON(eventFormat.toISOString().split("T")[0]))
    setLocalUserInfo((prev: any) => {
      return {
        ...prev,
        dob: formatDateWithHyphen(formattedDate),
      }
    })
  }

  //store
  const pageContextUse = useContext(PageContext)
  const ihclContext = useContext(IHCLContext)
  const accountStore = pageContextUse?.getPageStore(PAGE_STORES.ACCOUNT_STORES.myAccountStore) as AccountStore

  const userStore = ihclContext?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore

  const updateEmail = async () => {
    if (changeEmail?.email === userInfo?.email) {
      setOpenErrorMessage(true)
      setSnackMessage("Please use different email")
      setChangeEmail({
        ...changeEmail,
        email: userInfo.email,
        initiateChange: false,
      })
    }
    const res = await accountStore?.requestChangeEmail(changeEmail?.email)
    if (res?.code === "SSO-1037") {
      setOpenErrorMessage(true)
      setSnackMessage(res?.message)
      return
    }
    if (!res?.error && res?.userType?.toLowerCase() === "new") {
      userStore.setUserEmailID(changeEmail?.email)
      userStore.setEmailChangeRequest(true)

      navigate(extraData?.url, extraData?.urlType)
    } else if (res?.userType?.toLowerCase() === "existing") {
      setChangeEmail({
        ...changeEmail,
        email: userInfo.email,
        initiateChange: false,
      })
      setOpenErrorMessage(true)
      setSnackMessage("Email is already in use please use another email address")
    }
  }

  const UpdateUser = async (type: string) => {
    if (changeEmail?.initiateChange) {
      updateEmail()
    } else {
      const createUserApi = await accountStore?.createUser(
        localUserInfo?.salutation,
        localUserInfo?.firstName,
        localUserInfo?.lastName,
        localUserInfo?.phoneNumber?.split("-")?.[1],
        localUserInfo?.email,
        localUserInfo?.dob,
        localUserInfo?.gender,
        localUserInfo?.nationality,
        {},
      )

      if (createUserApi?.data?.status?.code === "200") {
        setApiResponse(createUserApi?.data)
        setLocalUserInfo(userInfo)

        const getData = (key: string): { key: string; value: string } => {
          switch (key) {
            case "salutation":
              return {
                key: userSalutation,
                value: GetDefaultValue(createUserApi?.data?.nameDetails?.salutation || localUserInfo?.salutation),
              }
            case "firstName":
              return {
                key: userFirstName,
                value: GetDefaultValue(createUserApi?.data?.nameDetails?.firstName || localUserInfo?.firstName),
              }
            case "lastName":
              return {
                key: userLastName,
                value: GetDefaultValue(createUserApi?.data?.nameDetails?.lastName || localUserInfo?.lastName),
              }
            default:
              return {
                value: "",
                key: "",
              }
          }
        }
        const data = getData(type)
        if (data?.value && (type === "salutation" || type === "firstName" || type === "lastName")) {
          setLocalStorage(data?.key, data?.value)
          userStore?.setUserDetailsStore(
            type === "salutation" ? data?.value : userStore?.userDetails?.salutation,
            type === "firstName" ? data?.value : userStore?.userDetails?.firstName,
            type === "lastName" ? data?.value : userStore?.userDetails?.lastName,
            userStore?.userDetails?.countryCode,
            userStore?.userDetails?.phone,
            userStore?.userDetails?.email,
            userStore?.userDetails?.userHash,
            userStore?.userDetails?.dob,
            userStore?.userDetails?.gender,
            userStore?.userDetails?.neuCoins,
            userStore?.userDetails?.userTICNumber,
            userStore?.userDetails?.userAddresses,
            userStore?.userDetails?.userTier,
            userStore?.userDetails?.existingCustomer,
          )
        }
      } else {
        setOpenErrorMessage(true)
        setSnackMessage(createUserApi?.data?.status?.message)
      }
    }
    setChangeEmail({ ...changeEmail, email: userInfo.email })
  }
  const handleEmailChangeRequest = (e: any) => {
    const { status, errorMsg, fieldName } = TextfieldValidator(e.target.name, e.target.value)
    setErrorMessage((prev: any) => {
      return {
        ...prev,
        [fieldName]: errorMsg,
      }
    })
    setChangeEmail({
      ...changeEmail,
      email: e.target.value,
      initiateChange: true,
    })
    formValidation(status, e.target.name)
  }

  const [selectOpen, setSelectOpen] = useState<any>({
    salutation: false,
    nationality: false,
    gender: false,
  })

  const gotoCenter = useRef<any>(null)
  const selectType = (type: string) => {
    gotoCenter?.current?.scrollIntoView({
      block: "center",
      inline: "nearest",
      behavior: "smooth",
    })
    setTimeout(() => {
      setSelectOpen({ ...selectOpen, [type]: true })
    }, 400)
  }

  return (
    <DetailsGridWrapper container ref={gotoCenter}>
      <SnackbarToast open={openErrorMessage} onClose={() => setOpenErrorMessage(false)} Message={snackMessage} />
      <Grid item xs={12} md={12} sm={12} lg={3.5} xl={3.5}>
        <StyledTypography variant={isMobile ? "m-body-l" : "body-l"}>{title}</StyledTypography>
      </Grid>
      <Grid item md={6.5}>
        {type !== "date" ? (
          <>
            {singleField === null || editField ? (
              editField ? (
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  {editField && type === "firstName" && (
                    <Stack width={"100%"} rowGap={isMobile ? MobilePxToVw(10) : DesktopPxToVw(30)}>
                      <InputText
                        variant="standard"
                        name={"receiverFirstName"}
                        inputProps={{ maxLength: 20 }}
                        value={localUserInfo?.firstName}
                        defaultValue={singleField?.split(" ")?.[0]}
                        placeholder={PLACEHOLDERS?.FIRST_NAME}
                        onChange={(e) => {
                          setLocalUserInfo({
                            ...localUserInfo,
                            firstName: e.target.value,
                          })
                        }}
                      />
                    </Stack>
                  )}
                  {editField && type === "salutation" && (
                    <Stack
                      width={"100%"}
                      rowGap={isMobile ? MobilePxToVw(10) : DesktopPxToVw(30)}
                      marginTop={isMobile ? MobilePxToVw(20) : "initial"}>
                      <CustomDropDown
                        scroll
                        open={selectOpen?.salutation}
                        onClose={() => {
                          setSelectOpen({
                            ...selectOpen,
                            salutation: false,
                          })
                        }}
                        placeHolder={PLACEHOLDERS?.SALUTATION}
                        label={PLACEHOLDERS?.SALUTATION}
                        data={salutationData?.salutation?.map((salutation) => salutation.title)}
                        value={localUserInfo?.salutation}
                        onChange={(e: any) => {
                          setLocalUserInfo({
                            ...localUserInfo,
                            salutation: e.target.value,
                          })
                        }}
                        margin={{
                          margin: isMobile ? "0vw" : "-0.521vw 0vw 0vw",
                        }}
                        minWidth={isMobile ? MobilePxToVw(300) : "18.958vw"}
                        fontSize={isMobile ? MobilePxToVw(24) : DesktopPxToVw(24)}
                      />
                    </Stack>
                  )}
                  {editField && type === "lastName" && (
                    <InputBoxWrapper>
                      <InputText
                        variant="standard"
                        name={"receiverLastName"}
                        inputProps={{ maxLength: 20 }}
                        value={localUserInfo?.lastName}
                        defaultValue={singleField?.split(" ")?.[0]}
                        placeholder={PLACEHOLDERS?.LAST_NAME}
                        onChange={(e) => {
                          setLocalUserInfo({
                            ...localUserInfo,
                            lastName: e.target.value,
                          })
                        }}
                      />
                    </InputBoxWrapper>
                  )}
                  {editField && type === "email" ? (
                    <InputBoxWrapper>
                      <InputText
                        variant="standard"
                        name={receiverEmail}
                        value={changeEmail?.email}
                        placeholder={PLACEHOLDERS?.EMAIL}
                        onChange={(e) => {
                          handleEmailChangeRequest(e)
                        }}
                        error={errors?.receiverEmail}
                        helperText={errors?.receiverEmail && errorMessage?.receiverEmail}
                      />
                    </InputBoxWrapper>
                  ) : (
                    <></>
                  )}
                  {editField && type === "nationality" && (
                    <InputBoxWrapper>
                      <CustomAutoCompleteComponent
                        open={selectOpen?.nationality}
                        onOpen={() => selectType("nationality")}
                        onClose={() => {
                          setSelectOpen({
                            ...selectOpen,
                            nationality: false,
                          })
                        }}
                        defaultValue={
                          localUserInfo?.nationality || userInfo?.nationality
                            ? {
                                title: localUserInfo?.nationality || userInfo?.nationality,
                              }
                            : null
                        }
                        options={nationalityData?.data}
                        getOptionLabel={(option: any) => option?.title}
                        sx={{
                          width: isMobile ? "50vw" : DesktopPxToVw(440),
                        }}
                        onChange={(event: any, newValue: any) => {
                          setLocalUserInfo({
                            ...localUserInfo,
                            nationality: newValue?.title as string,
                          })
                        }}
                        renderInput={(params: any) => (
                          <AutoCompleteInput {...params} variant="standard" label={PLACEHOLDERS?.NATIONALITY} />
                        )}
                      />
                    </InputBoxWrapper>
                  )}
                  {editField && type === "mobileNumber" && (
                    <CountryCodeDropdownBox>
                      <CountryCodeDropdown
                        dropdownStyle={{
                          marginLeft: isMobile ? MobilePxToVw(60) : DesktopPxToVw(170),
                          width: isMobile ? MobilePxToVw(500) : DesktopPxToVw(450),
                        }}
                        countryCode={receiverCountryCode}
                        setCountryCode={setReceiverCountryCode}
                      />
                      <MobileNumberInput
                        sx={{ width: "100%" }}
                        type="tel"
                        onInput={(e: any) => {
                          e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                        }}
                        variant="standard"
                        placeholder={PLACEHOLDERS?.PHONE_NUMBER}
                        value={localUserInfo?.phoneNumber}
                        name={receiverMobile}
                        // error={formErrors.receiverMobile}
                        onChange={(e: any) => {
                          setLocalUserInfo({
                            ...localUserInfo,
                            phoneNumber: e.target.value,
                          })
                        }}
                      />
                    </CountryCodeDropdownBox>
                  )}
                  {editField && type === "gender" && (
                    <InputBoxWrapper marginTop={isMobile ? MobilePxToVw(20) : DesktopPxToVw(10)}>
                      <CustomDropDown
                        scroll
                        open={selectOpen?.gender}
                        onClose={() => {
                          setSelectOpen({
                            ...selectOpen,
                            gender: false,
                          })
                        }}
                        placeHolder={GENDER_VALUE}
                        data={["Male", "Female", "I'd rather not say"]}
                        value={localUserInfo?.gender}
                        onChange={(e: any) => {
                          setLocalUserInfo({
                            ...localUserInfo,
                            gender: e.target.value,
                          })
                        }}
                        margin={{
                          margin: isMobile ? "1vw" : "-0.521vw 0vw 0vw",
                        }}
                        minWidth={isMobile ? "50vw" : "22.760vw"}
                        fontSize={isMobile ? MobilePxToVw(24) : DesktopPxToVw(24)}
                      />
                    </InputBoxWrapper>
                  )}
                </Box>
              ) : (
                <>
                  <Typography
                    variant={isMobile ? "m-link-m" : "link-m"}
                    onClick={() => {
                      setEditField(true)
                    }}>
                    {`${CLICK_TO_ADD_YOUR} ${title.toUpperCase()}`}
                  </Typography>
                  <br />
                  <Typography variant={isMobile ? "m-body-m" : "body-m"}>{subtitle}</Typography>
                </>
              )
            ) : (
              <Typography
                variant={isMobile ? "m-body-l" : "body-l"}
                sx={{
                  color: withoutEdit ? theme?.palette?.neuPalette?.hexTwelve : theme?.palette?.neuPalette?.hexSeventeen,
                }}>
                {singleField && singleField}
              </Typography>
            )}
          </>
        ) : (
          <Box width={"100%"}>
            {!(userInfo?.dob?.length > 0) || editField ? (
              editField ? (
                <Box width={"100%"} sx={{ display: "flex", justifyContent: "space-between" }}>
                  {editField && type === "date" && (
                    <>
                      {!editField ? (
                        <Typography
                          variant={isMobile ? "m-link-m" : "link-m"}
                          onClick={() => {
                            setEditField(true)
                          }}>
                          {`${CLICK_TO_ADD_YOUR} ${title.toUpperCase()}`}
                        </Typography>
                      ) : (
                        <Box ref={calendarRef} width={isMobile ? MobilePxToVw(300) : DesktopPxToVw(453)}>
                          <CustomDatePicker
                            date={date}
                            isOpen={open}
                            onChange={handleDatePicker}
                            onCalendarOpen={handleScroll}
                            placeholder={"Date of Birth*"}
                            maxDate={getDateBefore18Years()}
                            calendarIcon={
                              <Box onClick={(prev: any) => setOpen(!prev)}>
                                <CalenderIcon></CalenderIcon>
                              </Box>
                            }
                            defaultActiveStartDate={getDateBefore18Years()}
                            renderComponent={
                              date && (
                                <Box onClick={() => setOpen(!open)}>
                                  <Typography sx={{ color: "#8B8A84" }} variant={isMobile ? "m-body-l" : "body-l"}>
                                    {date}
                                  </Typography>
                                </Box>
                              )
                            }
                            calendarWidth={isMobile ? MobilePxToVw(460) : DesktopPxToVw(453)}
                          />
                        </Box>
                      )}
                    </>
                  )}
                </Box>
              ) : (
                <>
                  <Typography
                    variant={isMobile ? "m-link-m" : "link-m"}
                    sx={{ whiteSpace: "nowrap" }}
                    onClick={() => {
                      setEditField(true)
                    }}>
                    {`${CLICK_TO_ADD_YOUR} ${title.toUpperCase()}`}
                  </Typography>
                  <br />
                  <Typography variant={isMobile ? "m-body-m" : "body-m"}>{subtitle}</Typography>
                </>
              )
            ) : (
              <Typography
                variant={isMobile ? "m-body-l" : "body-l"}
                sx={{
                  color: withoutEdit ? theme?.palette?.neuPalette?.hexTwelve : theme?.palette?.neuPalette?.hexSeventeen,
                }}>
                {formatDateWithFullMonth(singleField, false)}
              </Typography>
            )}
          </Box>
        )}
      </Grid>
      {/* {!withoutEdit && ( */}
      <ClickAwayListener onClickAway={() => setShowTooltip(false)}>
        <Grid
          item
          md={2}
          sx={{
            paddingTop: editField && type === "nationality" && !isMobile ? DesktopPxToVw(42) : "initial",
          }}>
          {!editField && (
            <>
              <StyledEdit
                $withoutEdit={withoutEdit}
                variant={isMobile ? "m-link-m" : "link-m"}
                onClick={() => {
                  if (withoutEdit) return
                  setEditField(true)
                  setIsEditing && setIsEditing(true)
                }}>
                {withoutEdit && (
                  <EditIcon
                    onClick={() => {
                      isMobile && setShowTooltip((prev: boolean) => !prev)
                    }}
                    onMouseEnter={() => {
                      !isMobile && setShowTooltip(true)
                    }}
                    onMouseLeave={() => {
                      !isMobile && setShowTooltip(false)
                    }}
                    component={"img"}
                    alt="edit_icon"
                    src={DISABLE_EDIT_ICON}
                  />
                )}

                {!withoutEdit ? (
                  <>
                    <EditIcon component={"img"} alt="edit_icon" src={EDIT_ICON} />

                    {EDIT_TEXT}
                  </>
                ) : (
                  <Tooltip
                    arrow
                    open={showTooltip}
                    onClick={() => {
                      isMobile && setShowTooltip((prev: boolean) => !prev)
                    }}
                    onMouseEnter={() => {
                      !isMobile && setShowTooltip(true)
                    }}
                    onMouseLeave={() => {
                      !isMobile && setShowTooltip(false)
                    }}
                    title={<PortableText blocks={content?.[2]?.content?.[0]} />}
                    placement="top-end"
                    componentsProps={{
                      tooltip: {
                        sx: {
                          borderRadius: "0px",
                          backgroundColor: theme?.palette?.neuPalette?.hexSixteen,
                          color: theme?.palette?.neuPalette?.hexSeventeen,
                          padding: DesktopPxToVw(16),
                          textAlign: "center",
                        },
                      },
                    }}>
                    <span>{EDIT_TEXT}</span>
                  </Tooltip>
                )}
              </StyledEdit>
            </>
          )}
          {editField && (
            <>
              <Stack
                sx={{
                  paddingTop: editField && type === "salutation" && isMobile ? MobilePxToVw(30) : "initial",
                }}
                flexDirection={"row"}>
                <SaveTypography
                  variant={isMobile ? "m-link-m" : "link-m"}
                  onClick={() => {
                    if (errors.receiverEmail) {
                      return
                    }
                    setEditField(false)
                    setErrors({ receiverEmail: false })
                    setIsEditing && setIsEditing(false)
                    UpdateUser(type)
                  }}
                  $errorMessage={errors.receiverEmail}>
                  {CONSTANTS?.SAVE}
                </SaveTypography>
                <Divider orientation="vertical" sx={{ height: "20px", margin: "0 10px" }}></Divider>
                <Typography
                  sx={{ display: "flex", justifyContent: "right" }}
                  variant={isMobile ? "m-link-m" : "link-m"}
                  onClick={() => {
                    setEditField(false)
                    setErrors({ receiverEmail: false })
                    setIsEditing && setIsEditing(false)
                    setLocalUserInfo(userInfo)
                    setChangeEmail({ ...changeEmail, email: userInfo.email })
                  }}>
                  {CONSTANTS.CANCEL}
                </Typography>
              </Stack>
            </>
          )}
        </Grid>
      </ClickAwayListener>
    </DetailsGridWrapper>
  )
}

export default FieldDetails
