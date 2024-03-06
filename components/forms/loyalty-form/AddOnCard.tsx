import {
  AddOnCardInterface,
  observer,
  CustomDatePickerComponent,
  DesktopPxToVw,
  MobilePxToVw,
  salutationData,
  RestrictSpecialChar,
  Error_icon,
  addOnEmail,
  addOnLastName,
  addOnMobile,
  AddOnFormControl,
  AddOnMainGrid,
  EpicureCartFormLabel,
  ErrorMessageTypography,
  FlexWrapper,
  FourRowGrid,
  InputTextFieldEpicure,
  MobileNumberWrapper,
  StyledMenuItem,
  StyledWrapper,
  formatDateWithFullMonth,
  getDateBefore18Years,
  TentativeDateContainer,
  CountryCodeDropdown,
  theme,
  KeyboardArrowDownIcon,
  CalenderIcon,
  useMobileCheck,
  PageContext,
  LoyaltyStore,
  PAGE_STORES,
  Box,
  InputAdornment,
  Select,
  useContext,
  useEffect,
  useRef,
  useState,
} from "./epicure-imports.component"

const AddOnCard = ({
  select,
  handleSelectedValue,
  loyaltyOpen,
  setLoyaltyOpen,
  values,
  addOnFirstName,
  errors,
  handleChange,
  handleAddOnDatePicker,
  addOnFormDate,
  addOnCountryCode,
  setAddOnCountryCode,
  primaryEmail,
  primaryPhoneNumber,
  duplicateValueError,
  setDuplicateValueError,
  disableForm,
  props,
}: AddOnCardInterface) => {
  const [open, setOpen] = useState<boolean>(false)
  const isMobile = useMobileCheck()
  const pageContext = useContext(PageContext)
  const calendarRef = useRef<any>(null)

  const loyaltyEnrollStore = pageContext?.getPageStore(
    PAGE_STORES.LOYALTY_STORES.loyaltyEpicureCardsStore,
  ) as LoyaltyStore

  useEffect(() => {
    if (values?.addOnEmail?.length > 1 && primaryEmail === values?.addOnEmail) {
      setDuplicateValueError((prev: any) => {
        return {
          ...prev,
          duplicateEmail: true,
        }
      })
    } else {
      setDuplicateValueError((prev: any) => {
        return {
          ...prev,
          duplicateEmail: false,
        }
      })
    }
    if (values?.addOnMobile?.length > 8 && primaryPhoneNumber === values?.addOnMobile) {
      setDuplicateValueError((prev: any) => {
        return {
          ...prev,
          duplicateMobile: true,
        }
      })
    } else {
      setDuplicateValueError((prev: any) => {
        return {
          ...prev,
          duplicateMobile: false,
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primaryEmail, primaryPhoneNumber, values?.addOnEmail, values?.addOnMobile])
  const emptyFieldErrors = loyaltyEnrollStore?.emptyAddOnFormErrors

  useEffect(() => {
    if (open && calendarRef?.current) {
      calendarRef.current.scrollIntoView({
        block: "center",
        inline: "nearest",
        behavior: "smooth",
      })
    }
  }, [open])

  const keypadCloseForDatePicker = () => {
    if (document?.activeElement instanceof HTMLInputElement) {
      document?.activeElement?.blur()
    }
  }

  const addOnCardLabels = props?.items

  return (
    <AddOnMainGrid>
      <FlexWrapper
        sx={{
          alignItems: "baseline",
          gap: DesktopPxToVw(40),
          input: {
            "&:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 50px #F6F5F5 inset !important",
            },
          },
        }}>
        <AddOnFormControl
          $componentBackgroundColor={theme?.palette?.neuPalette?.paper}
          variant="standard"
          sx={{ width: isMobile ? MobilePxToVw(257) : DesktopPxToVw(180) }}>
          <EpicureCartFormLabel
            sx={{
              fontSize: isMobile ? "unset" : "0.9375vw !important",
            }}>
            {addOnCardLabels?.[0]?.labelText}
          </EpicureCartFormLabel>

          <Select
            open={loyaltyOpen?.addOnSalutation}
            disabled={disableForm}
            onOpen={() => {
              calendarRef.current.scrollIntoView({
                block: "center",
                inline: "nearest",
                behavior: "smooth",
              })
              setTimeout(() => {
                setLoyaltyOpen({ ...loyaltyOpen, addOnSalutation: true })
              }, 500)
            }}
            onClose={() => {
              setTimeout(() => {
                ;(document?.activeElement as HTMLElement)?.blur()
              }, 0)
              setLoyaltyOpen({ ...loyaltyOpen, addOnSalutation: false })
            }}
            sx={{
              width: "100%",
            }}
            variant="standard"
            value={select?.addOnTitle}
            name="addOnTitle"
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
                {emptyFieldErrors?.addOnTitle && select?.addOnTitle?.length === 0 ? (
                  <Box
                    loading="lazy"
                    component="img"
                    width={isMobile ? MobilePxToVw(24) : DesktopPxToVw(24)}
                    src={Error_icon}
                    alt="Expand Image"
                  />
                ) : (
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
                )}
              </>
            )}
            onChange={(e: any) => handleSelectedValue(e)}>
            {salutationData?.salutation?.map((item: any, index: number) => (
              <StyledMenuItem key={index} value={item?.title}>
                {item?.title}
              </StyledMenuItem>
            ))}
          </Select>
          {emptyFieldErrors?.addOnTitle && select?.addOnTitle?.length === 0 && (
            <ErrorMessageTypography>{addOnCardLabels?.[0]?.errorText}</ErrorMessageTypography>
          )}
        </AddOnFormControl>
        <InputTextFieldEpicure
          variant="standard"
          disabled={disableForm}
          label={addOnCardLabels?.[1]?.labelText}
          value={values?.addOnFirstName}
          name={addOnFirstName}
          InputProps={{
            endAdornment: (
              <>
                {emptyFieldErrors?.addOnFirstName && values?.addOnFirstName?.length === 0 && (
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
          helperText={
            (errors?.addOnFirstName && values?.addOnFirstName?.length > 0 && addOnCardLabels?.[1]?.helperText) ||
            (emptyFieldErrors?.addOnFirstName &&
              values?.addOnFirstName?.length === 0 &&
              addOnCardLabels?.[1]?.errorText)
          }
          onChange={(e: any) => handleChange(e)}
          inputProps={{ maxLength: 20 }}
          sx={{
            width: isMobile ? "100%" : DesktopPxToVw(310),
            margin: isMobile ? "2vw 0vw " : "0vw",
            input: {
              "&:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 50px #F6F5F5 inset !important",
              },
            },
          }}
        />
        <InputTextFieldEpicure
          variant="standard"
          disabled={disableForm}
          label={addOnCardLabels?.[2]?.labelText}
          value={values?.addOnLastName}
          name={addOnLastName}
          helperText={
            (errors?.addOnLastName && values?.addOnLastName?.length > 0 && addOnCardLabels?.[2]?.helperText) ||
            (emptyFieldErrors?.addOnLastName && values?.addOnLastName?.length === 0 && addOnCardLabels?.[2]?.errorText)
          }
          onChange={(e: any) => handleChange(e)}
          inputProps={{ maxLength: 20 }}
          InputProps={{
            endAdornment: (
              <>
                {emptyFieldErrors?.addOnLastName && values?.addOnLastName?.length === 0 && (
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
          sx={{
            width: isMobile ? "100%" : DesktopPxToVw(310),
            margin: isMobile ? "2.781vw 0vw 0vw 0vw" : "0vw",
            input: {
              "&:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 50px #F6F5F5 inset !important",
              },
            },
          }}
        />
      </FlexWrapper>
      <FourRowGrid sx={{ alignItems: "flex-start" }}>
        <InputTextFieldEpicure
          variant="standard"
          label={addOnCardLabels?.[3]?.labelText}
          disabled={disableForm}
          value={values?.addOnEmail}
          name={addOnEmail}
          helperText={
            (errors?.addOnEmail && values?.addOnEmail?.length > 0 && addOnCardLabels?.[3]?.helperText) ||
            (emptyFieldErrors?.addOnEmail && values?.addOnEmail?.length === 0 && addOnCardLabels?.[3]?.errorText) ||
            (duplicateValueError?.duplicateEmail && addOnCardLabels?.[3]?.hintText)
          }
          InputProps={{
            endAdornment: (
              <>
                {emptyFieldErrors?.addOnEmail && values?.addOnEmail?.length === 0 && (
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
          onChange={(e: any) => handleChange(e)}
          inputProps={{ maxLength: 40 }}
          sx={{
            width: isMobile ? "100%" : "13.5vw",
            marginTop: isMobile ? "4vw" : "",
            input: {
              "&:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 50px #F6F5F5 inset !important",
              },
            },
          }}
        />
        <StyledWrapper
          sx={{
            width: "100% !important",
          }}>
          <MobileNumberWrapper
            sx={{
              width: isMobile ? "100%" : "15vw",
              marginBottom: isMobile && emptyFieldErrors?.addOnMobile && values?.addOnMobile?.length === 0 ? "0vw" : "",
              input: {
                "&:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 50px #F6F5F5 inset !important",
                },
              },
            }}>
            <CountryCodeDropdown
              isDisable={true}
              countryCode={addOnCountryCode}
              setCountryCode={setAddOnCountryCode}
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
              sx={{
                "& .MuiInputBase-root": {
                  width: isMobile ? "100% !important" : "11.5vw",
                },
                "& .MuiInputBase-input": {
                  padding: "0vw 0vw 0vw 1vw",
                },
                "& .MuiInputLabel-root": {
                  paddingLeft: "1.2vw",
                  marginTop: isMobile ? "auto" : "",
                },

                input: {
                  "&:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 50px #F6F5F5 inset !important",
                  },
                },
              }}
              variant="standard"
              disabled={disableForm}
              label={addOnCardLabels?.[4]?.labelText}
              type="tel"
              onInput={(e: any) => {
                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
              }}
              value={values?.addOnMobile}
              name={addOnMobile}
              onKeyDown={RestrictSpecialChar}
              onChange={(e: any) => handleChange(e)}
              inputProps={{ maxLength: 12 }}
              InputProps={{
                endAdornment: (
                  <>
                    {emptyFieldErrors?.addOnMobile &&
                      (values?.addOnMobile?.length === 0 ||
                        values?.addOnMobile === null ||
                        values?.addOnMobile == undefined) && (
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
          {((errors?.addOnMobile && values?.addOnMobile?.length > 0 && values?.addOnMobile?.length < 10) ||
            (emptyFieldErrors?.addOnMobile &&
              (values?.addOnMobile?.length === 0 ||
                values?.addOnMobile === null ||
                values?.addOnMobile == undefined))) && (
            <Box position={"relative"} mb={"1vw"}>
              <ErrorMessageTypography variant="body-m" position={"absolute"}>
                {errors?.addOnMobile ? addOnCardLabels?.[4]?.helperText : addOnCardLabels?.[4]?.errorText}
              </ErrorMessageTypography>
            </Box>
          )}
          {duplicateValueError?.duplicateMobile && values?.addOnMobile?.length > 8 && (
            <ErrorMessageTypography variant="body-m">{addOnCardLabels?.[4]?.hintText}</ErrorMessageTypography>
          )}
        </StyledWrapper>
        {/**date field */}
        <Box
          sx={{
            width: isMobile ? "100%" : DesktopPxToVw(260),
            alignItems: "baseline",
            marginTop: isMobile ? "1vw" : "",
            paddingBottom: "10px",
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
            ref={calendarRef}
            onClick={keypadCloseForDatePicker}>
            <CustomDatePickerComponent
              date={new Date()}
              isOpen={open}
              placeholder={addOnCardLabels?.[5]?.labelText}
              onCalendarOpen={() => {
                !disableForm && setOpen(true)
              }}
              openCalendarOnFocus={disableForm ? false : true}
              onCalendarClose={() => {
                setOpen(false)
              }}
              onChange={handleAddOnDatePicker}
              calendarIcon={null}
              sx={{ marginBottom: isMobile ? "1.563vw" : "" }}
              label={addOnCardLabels?.[5]?.labelText}
              maxDate={getDateBefore18Years()}
              defaultActiveStartDate={getDateBefore18Years()}
              renderComponent={
                <InputTextFieldEpicure
                  disabled={disableForm}
                  inputProps={{ autoComplete: "off", readOnly: isMobile }}
                  onKeyDown={(e: any) => e.preventDefault()}
                  onClick={(e: any) => !disableForm && setOpen(!open)}
                  sx={{
                    width: isMobile ? "100%" : "13vw !important",
                    marginLeft: "0vw",

                    marginRight: "0vw",
                    "&  .MuiFormHelperText-root": {
                      color: `${theme?.palette?.neuPalette?.hexTen} !important`,
                    },
                  }}
                  variant="standard"
                  label={addOnCardLabels?.[5]?.labelText}
                  value={addOnFormDate ? formatDateWithFullMonth(addOnFormDate, false) : ""}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Box onClick={(prev: any) => !disableForm && setOpen(false)}>
                          <CalenderIcon
                            sx={{
                              cursor: "pointer",
                              width: isMobile ? MobilePxToVw(17) : DesktopPxToVw(24),
                              height: isMobile ? MobilePxToVw(17) : DesktopPxToVw(25),
                            }}
                          />
                        </Box>
                      </InputAdornment>
                    ),
                  }}
                />
              }
              calendarWidth={isMobile ? MobilePxToVw(476) : DesktopPxToVw(453)}
            />
          </TentativeDateContainer>
          {emptyFieldErrors?.dateOfBirth && !addOnFormDate && (
            <ErrorMessageTypography sx={{ mt: isMobile ? "unset" : DesktopPxToVw(11.5) }}>
              {addOnCardLabels?.[5]?.errorText}
            </ErrorMessageTypography>
          )}
        </Box>
      </FourRowGrid>
    </AddOnMainGrid>
  )
}

export default observer(AddOnCard)
