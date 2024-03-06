import {
  useContext,
  theme,
  CalenderIcon,
  useMobileCheck,
  RestrictSpecialChar,
  KeyboardArrowDownIcon,
  DesktopPxToVw,
  MobilePxToVw,
  salutationData,
  LoyaltyStore,
  GLOBAL_STORES,
  PAGE_STORES,
  PageContext,
  observer,
  fetchAlertDialogData,
  IHCLContext,
  LoyaltyGlobalStore,
  FormSelectArrowIcon,
  getDateBefore18Years,
  getDateBeforeCentenary,
  formatDateWithFullMonth,
  Box,
  InputAdornment,
  Select,
  EpicureFormAddress,
  CustomDatePickerComponent,
  CountryCodeDropdown,
  lastName,
  firstName,
  Error_icon,
  senderEmail,
  receiverMobile,
  epicureCardInterface,
  FourRowGrid,
  FirstRowGrid,
  StyledWrapper,
  StyledMenuItem,
  MobileNumberWrapper,
  ErrorMessageTypography,
  EpicureCartFormControl,
  EpicureCartFormLabel,
  InputTextFieldEpicure,
  TentativeDateContainer,
} from "./epicure-imports.component"

const EpicureCardEnrollFormUI = ({
  props,
  membershipType,
  scrollRef,
  disable,
  loyaltyOpen,
  loyaltyType,
  setLoyaltyOpen,
  select,
  emptyFieldErrors,
  handleSelectedValue,
  values,
  errors,
  handleChange,
  countryCode,
  setCountryCode,
  CustomWidthTooltip,
  openToolTip,
  handleToolTip,
  voucherCode,
  loyaltyEnrollStore,
  handleVouchers,
  voucherPin,
  setOpenForm,
  openForm,
  clusterItem,
  invalidPinCode,
  handlePincode,
  date,
  handleDatePicker,
  boxRef,
  setOpen,
  formDate,
  open,
  disableForm,
  setOpenToolTip,
  setSelect,
}: epicureCardInterface) => {
  //utils
  const isMobile = useMobileCheck()
  const context = useContext(IHCLContext)
  const pageContext = useContext(PageContext)

  //stores
  const epicurePageStore = pageContext?.getPageStore(
    PAGE_STORES.LOYALTY_STORES.loyaltyEpicureCardsStore,
  ) as LoyaltyStore

  //global loyalty store
  const epicureGlobalStore = context?.getGlobalStore(GLOBAL_STORES.loyaltyGlobalStore) as LoyaltyGlobalStore

  const labels = props?.items

  return (
    <>
      {epicureGlobalStore?.epicureCardData?.isBankUrl && (
        <InputTextFieldEpicure
          sx={{
            width: isMobile ? MobilePxToVw(268) : DesktopPxToVw(370),
            marginBottom: isMobile ? "2vw" : "0.8vw",
            input: {
              "&:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 50px #FFFFFF inset !important",
              },
            },
          }}
          variant="standard"
          label={"Select your Membership"}
          value={membershipType}
          disabled={disableForm || true}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <KeyboardArrowDownIcon
                  {...{
                    ...props,
                    sx: {
                      cursor: "pointer",
                      width: isMobile ? MobilePxToVw(19) : DesktopPxToVw(19),
                      height: isMobile ? MobilePxToVw(19) : DesktopPxToVw(19),
                      top: isMobile ? "" : "0.5vw !important",
                    },
                  }}
                />
              </InputAdornment>
            ),
          }}
        />
      )}
      <FirstRowGrid>
        {/***Title */}
        <EpicureCartFormControl variant="standard" ref={scrollRef}>
          <EpicureCartFormLabel disabled={disableForm || disable?.disableSalutation}>
            {labels?.[0]?.labelText}
          </EpicureCartFormLabel>
          <Select
            open={loyaltyOpen?.salutation}
            onOpen={() => loyaltyType("salutation")}
            onClose={() => {
              setTimeout(() => {
                ;(document?.activeElement as HTMLElement)?.blur()
              }, 0)
              setLoyaltyOpen({ ...loyaltyOpen, salutation: false })
            }}
            sx={{
              width: isMobile ? "41.156vw" : "11vw",
            }}
            disabled={disableForm || disable?.disableSalutation}
            variant="standard"
            value={select?.title}
            name="title"
            MenuProps={{
              PaperProps: {
                elevation: 0,
                sx: {
                  maxHeight: 200,
                  backgroundColor: theme?.palette?.background?.default,
                  borderRadius: "0",
                  boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
                  fontSize: "4vw",
                },
              },
            }}
            IconComponent={(props: any) => (
              <>
                {emptyFieldErrors?.title &&
                (select?.title?.length === 0 || select?.title === "null" || select?.title == undefined) ? (
                  <Box
                    loading="lazy"
                    component="img"
                    width={isMobile ? MobilePxToVw(24) : DesktopPxToVw(24)}
                    src={Error_icon}
                    alt="Expand Image"
                  />
                ) : (
                  <FormSelectArrowIcon {...props} />
                )}
              </>
            )}
            onChange={(e) => {
              handleSelectedValue(e, "salutation")
            }}>
            {salutationData?.salutation?.map((item: any, index: number) => (
              <StyledMenuItem key={index} value={item?.title}>
                {item?.title}
              </StyledMenuItem>
            ))}
          </Select>
          {emptyFieldErrors?.title &&
            (select?.title?.length === 0 || select?.title === "null" || select?.title == undefined) && (
              <Box position={"relative"} sx={{ marginBottom: "1vw" }}>
                <ErrorMessageTypography sx={{ position: "absolute" }}>{labels?.[0]?.errorText}</ErrorMessageTypography>
              </Box>
            )}
        </EpicureCartFormControl>
        {/*First Name*/}
        <InputTextFieldEpicure
          variant="standard"
          disabled={disableForm || disable?.disableFirstName}
          label={labels?.[1]?.labelText}
          value={values?.firstName}
          name={firstName}
          InputLabelProps={{
            shrink: values?.firstName ? true : false,
          }}
          helperText={
            (errors?.firstName && values?.firstName?.length > 0 && labels?.[1]?.helperText) ||
            (emptyFieldErrors?.firstName &&
              (values?.firstName?.length === 0 || values?.firstName === null || values?.firstName == undefined) &&
              labels?.[1]?.errorText)
          }
          sx={{
            width: isMobile ? "100%" : "17.3vw",
            input: {
              "&:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 50px #FFFFFF inset !important",
              },
            },
          }}
          onChange={(e: any) => handleChange(e)}
          InputProps={{
            endAdornment: (
              <>
                {emptyFieldErrors?.firstName &&
                  (values?.firstName?.length === 0 || values?.firstName === null || values?.firstName == undefined) && (
                    <InputAdornment position="end">
                      <Box
                        loading="lazy"
                        component="img"
                        width={isMobile ? MobilePxToVw(24) : DesktopPxToVw(24)}
                        src={Error_icon}
                        alt="Expand Image"
                      />
                    </InputAdornment>
                  )}
              </>
            ),
          }}
        />
        {/* last Name */}
        <InputTextFieldEpicure
          sx={{
            width: isMobile ? "100%" : "17.1vw",
            input: {
              "&:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 50px #FFFFFF inset !important",
              },
            },
          }}
          variant="standard"
          label={labels?.[2]?.labelText}
          value={values?.lastName}
          name={lastName}
          disabled={disableForm || disable?.disableLastName}
          InputLabelProps={{
            shrink: values?.lastName ? true : false,
          }}
          helperText={
            (errors?.lastName && values?.lastName?.length > 0 && labels?.[2]?.helperText) ||
            (emptyFieldErrors?.lastName &&
              (values?.lastName?.length === 0 || values?.lastName === null || values?.lastName == undefined) &&
              labels?.[2]?.errorText)
          }
          onChange={(e: any) => handleChange(e)}
          InputProps={{
            endAdornment: (
              <>
                {emptyFieldErrors?.lastName &&
                  (values?.lastName?.length === 0 || values?.lastName === null || values?.lastName == undefined) && (
                    <InputAdornment position="end">
                      <Box
                        loading="lazy"
                        component="img"
                        width={isMobile ? MobilePxToVw(24) : DesktopPxToVw(24)}
                        src={Error_icon}
                        alt="Expand Image"
                      />
                    </InputAdornment>
                  )}
              </>
            ),
          }}
        />
      </FirstRowGrid>
      <FourRowGrid sx={{ marginTop: isMobile ? "2vw" : "" }}>
        {/**Email */}
        <InputTextFieldEpicure
          sx={{
            width: isMobile ? "100%" : "15.4550vw",
            input: {
              "&:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 50px #FFFFFF inset !important",
              },
            },
          }}
          variant="standard"
          disabled={disableForm || disable?.disableEmail}
          label={labels?.[3]?.labelText}
          value={values?.senderEmail}
          InputLabelProps={{
            shrink: values?.senderEmail ? true : false,
          }}
          name={senderEmail}
          helperText={
            (errors?.senderEmail && values?.senderEmail?.length > 0 && labels?.[3]?.helperText) ||
            (emptyFieldErrors?.email &&
              (values?.senderEmail?.length === 0 || values?.senderEmail === null || values?.senderEmail == undefined) &&
              labels?.[3]?.errorText)
          }
          onChange={(e: any) => handleChange(e)}
          InputProps={{
            endAdornment: (
              <>
                {emptyFieldErrors?.email &&
                  (values?.senderEmail?.length === 0 ||
                    values?.senderEmail === null ||
                    values?.senderEmail == undefined) && (
                    <InputAdornment position="end">
                      <Box
                        loading="lazy"
                        component="img"
                        width={isMobile ? MobilePxToVw(24) : DesktopPxToVw(24)}
                        src={Error_icon}
                        alt="Expand Image"
                      />
                    </InputAdornment>
                  )}
              </>
            ),
          }}
        />
        <StyledWrapper>
          <MobileNumberWrapper>
            <CountryCodeDropdown
              isDisable={true}
              countryCode={countryCode}
              setCountryCode={setCountryCode}
              dropdownStyle={{ width: "11vw", marginLeft: "9vw" }}
              iconStyle={{ display: "none" }}
              isCustomizedArrow={true}
              fontSize={isMobile ? `${MobilePxToVw(18)} !important` : `${DesktopPxToVw(18)} !important`}
              parentStyles={{
                minHeight: isMobile ? MobilePxToVw(40) : DesktopPxToVw(40),
                "&, & .MuiSelect-select.MuiSelect-standard.MuiInputBase-input.MuiInput-input, & .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-colorPrimary, & input~div":
                  {
                    display: "flex",
                    alignItems: "center",
                    gap: DesktopPxToVw(5),
                    height: isMobile ? MobilePxToVw(40) : DesktopPxToVw(40),
                  },
                "& span": {
                  margin: "0vw",
                  position: "unset",
                },
                "@media (max-Width:640px)": {
                  "& .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-colorPrimary": {
                    minWidth: "initial",
                    paddingBottom: "0vw",
                    height: MobilePxToVw(40),
                  },
                },
              }}
            />
            <InputTextFieldEpicure
              variant="standard"
              label={labels?.[4]?.labelText}
              disabled={disableForm || disable?.disablePhone}
              value={values?.receiverMobile}
              name={receiverMobile}
              type="tel"
              onKeyDown={RestrictSpecialChar}
              InputLabelProps={{
                shrink: values?.receiverMobile ? true : false,
              }}
              onInput={(e: any) => {
                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
              }}
              sx={{
                width: isMobile ? "100% !important" : "10.9550vw",
                "& input, & label": {
                  paddingLeft: DesktopPxToVw(18),
                },
                "& .MuiInputLabel-root": {
                  paddingLeft: "1.2vw",
                  marginTop: isMobile ? "auto" : "",
                },
                input: {
                  "&:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 50px #FFFFFF inset !important",
                  },
                },
              }}
              onChange={(e: any) => handleChange(e)}
              InputProps={{
                endAdornment: (
                  <>
                    {emptyFieldErrors?.mobile &&
                      (values?.receiverMobile?.length === 0 ||
                        values?.receiverMobile === null ||
                        values?.receiverMobile == undefined) && (
                        <InputAdornment position="end">
                          <Box
                            loading="lazy"
                            component="img"
                            width={isMobile ? MobilePxToVw(24) : DesktopPxToVw(24)}
                            src={Error_icon}
                            alt="Expand Image"
                          />
                        </InputAdornment>
                      )}
                  </>
                ),
              }}
            />
          </MobileNumberWrapper>
          {((errors?.receiverMobile && values?.receiverMobile?.length > 0 && values?.receiverMobile?.length <= 10) ||
            (emptyFieldErrors?.mobile &&
              (values?.receiverMobile?.length === 0 ||
                values?.receiverMobile === null ||
                values?.receiverMobile == undefined))) && (
            <Box position={"relative"} mb={"1vw"}>
              <ErrorMessageTypography variant="body-m" position={"absolute"}>
                {errors?.receiverMobile ? labels?.[4]?.helperText : labels?.[4]?.errorText}
              </ErrorMessageTypography>
            </Box>
          )}
        </StyledWrapper>
        {/**date field */}
        <Box
          sx={{
            width: isMobile ? "100%" : DesktopPxToVw(250),
            "& .react-date-picker__calendar--open": {
              zIndex: `${9} !important`,
            },
          }}>
          <TentativeDateContainer
            sx={{
              "& .react-calendar": {
                right: "6vw",
                "@media (max-width:640px)": {
                  right: "unset",
                },
              },
            }}
            ref={boxRef}
            onClick={() => {
              if (!disable?.disableDob) {
                setOpen(!open)
              } else {
                setOpen(false)
              }
            }}>
            <CustomDatePickerComponent
              date={new Date()}
              disableCalendar={disableForm || disable?.disableDob}
              isOpen={false}
              onChange={(e: any) => !disable?.disableDob && handleDatePicker(e)}
              calendarIcon={null}
              placeholder={labels?.[5]?.labelText}
              onCalendarOpen={!disable?.disableDob && open}
              maxDate={getDateBefore18Years()}
              minDate={getDateBeforeCentenary()}
              defaultActiveStartDate={getDateBefore18Years()}
              renderComponent={
                <Box
                  ref={boxRef}
                  width={isMobile ? "100% !important" : "15.4vw"}
                  onClick={() => {
                    if (!disable?.disableDob) {
                      setOpen(!open)
                    } else {
                      setOpen(false)
                    }
                  }}>
                  <InputTextFieldEpicure
                    inputProps={{ autoComplete: "off", readOnly: isMobile }}
                    onKeyDown={(e: any) => !disable?.disableDob && e.preventDefault()}
                    disabled={disableForm || disable?.disableDob}
                    sx={{
                      width: isMobile ? "100% !important" : "14.8vw",
                      marginleft: isMobile ? "0vw" : "3vw",
                      "&  .MuiFormHelperText-root": {
                        color: `${theme?.palette?.neuPalette?.hexTen} !important`,
                      },
                    }}
                    variant="standard"
                    label={labels?.[5]?.labelText}
                    value={date ? formatDateWithFullMonth(date, false) : ""}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Box
                            onClick={(prev: any) => {
                              if (!disable?.disableDob) {
                                setOpen(!prev)
                              } else {
                                setOpen(false)
                              }
                            }}>
                            <CalenderIcon
                              sx={{
                                cursor: !disable?.disableDob ? "pointer" : "initial",
                                width: isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
                              }}
                            />
                          </Box>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              }
              calendarWidth={isMobile ? MobilePxToVw(540) : DesktopPxToVw(453)}
            />
          </TentativeDateContainer>
          {emptyFieldErrors?.dateOfBirth && (formDate?.length === 0 || formDate === null || formDate == undefined) && (
            <ErrorMessageTypography sx={{ mt: DesktopPxToVw(12), width: "max-content" }}>
              {labels?.[5]?.errorText}
            </ErrorMessageTypography>
          )}
        </Box>
      </FourRowGrid>
      <EpicureFormAddress
        CustomWidthTooltip={CustomWidthTooltip}
        openToolTip={openToolTip}
        handleToolTip={handleToolTip}
        voucherCode={voucherCode}
        loyaltyEnrollStore={loyaltyEnrollStore}
        handleVouchers={handleVouchers}
        voucherPin={voucherPin}
        setOpenForm={setOpenForm}
        openForm={openForm}
        clusterItem={clusterItem}
        invalidPinCode={invalidPinCode}
        handlePincode={handlePincode}
        setOpenToolTip={setOpenToolTip}
        epicureGlobalStore={epicureGlobalStore}
        values={values}
        select={select}
        disableForm={disableForm}
        errors={errors}
        disable={disable}
        emptyFieldErrors={emptyFieldErrors}
        handleChange={handleChange}
        loyaltyOpen={loyaltyOpen}
        setLoyaltyOpen={setLoyaltyOpen}
        loyaltyType={loyaltyType}
        handleSelectedValue={handleSelectedValue}
        props={props}
        setSelect={setSelect}
      />
    </>
  )
}

export default observer(EpicureCardEnrollFormUI)
