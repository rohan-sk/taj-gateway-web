import React, { useCallback, useContext, useEffect, useState } from "react"
import { Box, Divider, Grid, Typography } from "@mui/material"
import dynamic from "next/dynamic"
import { urlFor } from "../../lib-sanity"
import { CommonCarouselStyles } from "../hoc/carousal-component-styles"
import { ParentCarouselImageBox } from "../GalleryCarousel/styles"
import Slider from "react-slick"
const CustomCheckBox = dynamic(() => import("../hoc/CustomCheckBox/Checkbox").then((module) => module.CustomCheckBox))
const RenderActionItem = dynamic(() =>  import("../hoc/actions/action-items-ui"))
const CountryCodeDropdown = dynamic(() => import("../../utils/CountryCodeDropdown"))
import AuthenticLoginStore from "../../features/login/store/authentication.login.store"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES, PAGE_STORES } from "../../utils/Constants"
import { UserStore } from "../../store"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
const SnackbarToast = dynamic(() => import("../../utils/SnackbarToast"))
import { useAppNavigation } from "../../utils/NavigationUtility"
import { ErrorMessageTypography } from "../Login/Styles/tabs.styles"
import TextfieldValidator from "../../utils/validations/TextfieldValidator"

import {
  ModalContext,
  PageContext,
} from "../../PresentationalComponents/lib/prepare-page-context"
import {
  Account,
  AccountNavigation,
  ERROR_MESSAGES,
  LoggedIn,
  senderMobile,
} from "../forms/gift-card-form/constants"
import {
  BoxComponent,
  CheckBox,
  GridContainer,
  InputBox,
  MobileNumberField,
  StyledImageBox,
  TitleBox,
  TitleTypography,
  LoginBoxWrapper,
  TitleWrapper,
  SubTitleTypography,
  DescriptionTypography,
  CarouselTitle,
  CarouselBoxWrapper,
  StyledTypography,
  HighlightsTitle,
} from "./styles/group-preview-carousal"
import { useMobileCheck } from "../../utils/isMobilView"
const PortableText = dynamic(() =>  import("../../lib/portable-text-serializers").then((module) => module.PortableText))
import { theme } from "../../lib/theme"
import { observer } from "mobx-react-lite"
import { getRecaptchaToken } from "../../utils/recaptcha"

const GroupPreviewCarousel = ({ props }: any) => {
  const isMobile = useMobileCheck()
  const carouselImages = props?.[0]?.items
  const primaryAction = props?.[1]?.primaryAction
  const secondaryAction = props?.[1]?.secondaryAction
  const IHCLContexts = useContext(IHCLContext)
  const PageContextUse = useContext(PageContext)
  const navigate: any = useAppNavigation()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [mainSliderReference, setMainSliderReference] = useState<Slider>()
  const [bottomSliderReference, setBottomSliderReference] = useState<Slider>()
  const [mobile, setMobile] = useState<string>("")
  const [check, setCheck] = useState<boolean>(false)
  const [countryCode, setCountryCode] = useState<string>("+91")
  const [login, setLogin] = useState<boolean>(false)
  const [openErrorMessage, setOpenErrorMessage] = useState<boolean>(false)
  const [snackMessage, setSnackMessage] = useState<string>("")
  const CustomerHash = global?.localStorage?.getItem("customerHash")
  const [errorMessage, setErrorMessage] = useState<{
    senderMobile: string
    CheckBoxError: string
  }>({
    senderMobile: "",
    CheckBoxError: "",
  })

  //store
  const userStore = IHCLContexts?.getGlobalStore(
    GLOBAL_STORES.userStore
  ) as UserStore

  //api's
  const authenticLoginStore = PageContextUse?.getPageStore(
    PAGE_STORES.loginStore
  ) as AuthenticLoginStore

  useEffect(() => {
    if (userStore?.userDetails?.userHash || CustomerHash) {
      setLogin(true)
    } else {
      setLogin(false)
    }
  }, [userStore?.userDetails?.userHash, CustomerHash])

  const settings = {
    arrows: true,
    infinite: false,
    swipeToSlide: true,
    speed: 500,
    initialSlide: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          arrows: false,
          infinite: false,
          swipeToSlide: true,
          speed: 500,
          initialSlide: 0,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    afterChange: (sliderIndex: number) => {
      setSelectedIndex(sliderIndex)
    },
  }
  const secondSettings = {
    arrows: false,
    infinite: false,
    swipeToSlide: true,
    speed: 500,
    initialSlide: 0,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          arrows: false,
          infinite: false,
          swipeToSlide: true,
          speed: 500,
          initialSlide: 0,
          slidesToShow: 2.5,
          slidesToScroll: 1,
        },
      },
    ],
  }

  const clickHandler = useCallback(
    (index: number) => {
      mainSliderReference?.slickGoTo(index, true)
    },
    [mainSliderReference]
  )

  useEffect(() => {
    let userTier =
      userStore.userDetails.userTier?.toLowerCase() ||
      global?.window?.localStorage?.getItem("userTier")?.toLowerCase()
    if (userTier === "platinum") {
      setSelectedIndex(3)
      clickHandler(3)
    } else if (userTier === "gold") {
      clickHandler(2)
      setSelectedIndex(2)
    } else if (userTier === "silver") {
      clickHandler(1)
      setSelectedIndex(1)
    } else {
      clickHandler(0)
      setSelectedIndex(0)
    }
  }, [
    bottomSliderReference,
    clickHandler,
    login,
    mainSliderReference,
    userStore.userDetails.userTier,
  ])

  const handleNumberChange = (e: any) => {
    const { name, value } = e.target
    const { status, errorMsg, fieldName } = TextfieldValidator(name, value)
    setErrorMessage((prev: any) => {
      return {
        ...prev,
        [fieldName]: errorMsg,
      }
    })
    setMobile(e.target?.value.slice(0, 10))
  }

  const handleSubmit = async () => {
    const recaptchaGenerated = await getRecaptchaToken()
    userStore.setUserMobileNumber(mobile)
    userStore?.setUserCountryCode(countryCode)
    const response = await authenticLoginStore?.generateOTP(
      JSON.stringify({
        phone: mobile,
        recaptchaToken: recaptchaGenerated,
      })
    )
    if (response?.error === false) {
      if (response?.status === 201) {
        if (response?.data?.userType?.toLowerCase() === "existing") {
          primaryAction && navigate(primaryAction?.url, primaryAction?.urlType)
        } else if (response?.data?.userType?.toLowerCase() === "new") {
          secondaryAction &&
            navigate(secondaryAction?.url, secondaryAction?.urlType)
        } else {
          setOpenErrorMessage(true)
          setSnackMessage(response?.data || ERROR_MESSAGES?.NETWORK_ERROR)
        }
      }
    } else {
      setOpenErrorMessage(true)
      setSnackMessage(
        response?.response?.data?.message || ERROR_MESSAGES?.NETWORK_ERROR
      )
    }
  }
  return (
    <Grid container>
      <SnackbarToast
        open={openErrorMessage}
        onClose={() => setOpenErrorMessage(false)}
        Message={snackMessage}
      />
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "6vw" : "7vw",
        }}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <CommonCarouselStyles>
            <Slider
              {...settings}
              asNavFor={bottomSliderReference}
              ref={(slider1: any) => {
                setMainSliderReference(slider1)
              }}>
              {carouselImages?.map((item: any, index: number) => (
                <>
                  {item?.largeImage?.asset?._ref && (
                    <>
                      <ParentCarouselImageBox key={index}>
                        <BoxComponent
                        loading="lazy"
                          component="img"
                          alt={`card-image`}
                          width={"100%"}
                          src={urlFor(item?.largeImage?.asset?._ref).url()}
                        />
                        <TitleWrapper>
                          <SubTitleTypography
                            variant={isMobile ? "m-body-l" : "heading-s"}>
                            {item?.subTitle}
                          </SubTitleTypography>
                          <DescriptionTypography
                            color={
                              isMobile
                                ? theme?.palette?.neuPalette?.hexTwentyNine
                                : theme?.palette?.neuPalette?.hexOne
                            }
                            variant={isMobile ? "m-body-s" : "body-ml"}>
                            {item?.description}
                          </DescriptionTypography>
                          {item?.title && (
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: isMobile
                                  ? MobilePxToVw(20)
                                  : DesktopPxToVw(40),
                              }}>
                              <Divider
                                sx={{
                                  width: isMobile
                                    ? MobilePxToVw(330)
                                    : DesktopPxToVw(330),
                                  borderColor:
                                    theme?.palette?.neuPalette?.hexTwentyNine,
                                }}></Divider>
                              <CarouselTitle
                                variant={
                                  isMobile ? "m-heading-xs" : "heading-s"
                                }>
                                {item?.title}
                              </CarouselTitle>
                              <HighlightsTitle
                                variant={
                                  isMobile ? "m-heading-xs" : "heading-xm"
                                }>
                                {item?.highLights}
                              </HighlightsTitle>
                            </Box>
                          )}
                        </TitleWrapper>
                      </ParentCarouselImageBox>
                    </>
                  )}
                </>
              ))}
            </Slider>
          </CommonCarouselStyles>
          <CommonCarouselStyles
            mt={isMobile ? "4.375vw" : "1.563vw"}
            mr={"0.2vw"}>
            <Slider
              {...secondSettings}
              asNavFor={mainSliderReference}
              ref={(slider2: any) => setBottomSliderReference(slider2)}>
              {carouselImages?.map((item: any, index: number) => (
                <Box
                  key={index}
                  onClick={() => {
                    clickHandler(index), setSelectedIndex(index)
                  }}
                  sx={{
                    position: "relative",
                  }}>
                  <CarouselBoxWrapper $border={selectedIndex === index}>
                    <StyledImageBox
                    loading="lazy"
                      component="img"
                      alt={`-image`}
                      width={"100%"}
                      src={urlFor(item?.logo?.asset?._ref).url()}
                    />
                  </CarouselBoxWrapper>
                  <TitleBox>
                    <StyledTypography
                      variant={isMobile ? "m-body-s" : "body-ml"}>
                      {item?.title}
                    </StyledTypography>
                  </TitleBox>
                </Box>
              ))}
            </Slider>
          </CommonCarouselStyles>
        </Grid>
        {login ? (
          <LoginBoxWrapper>
            <Typography
              sx={{ marginBottom: isMobile ? "4.68vw" : "none" }}
              variant={isMobile ? "m-heading-xs" : "heading-s"}>
              {LoggedIn}
            </Typography>
            <RenderActionItem
              url={AccountNavigation}
              title={Account}
              variant={primaryAction?.variant}
              navigationType={"internal"}
              isActionButtonType={primaryAction?._type}
              buttonStyles={{ marginTop: DesktopPxToVw(54) }}
            />
          </LoginBoxWrapper>
        ) : (
          <GridContainer
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
            sx={{ margin: 0 }}>
            <TitleTypography variant={isMobile ? "m-heading-s" : "heading-s"}>
              {props?.[1]?.title}
            </TitleTypography>
            <InputBox>
              <CountryCodeDropdown
                countryCode={countryCode}
                setCountryCode={setCountryCode}
                dropdownStyle={{
                  width: isMobile ? MobilePxToVw(420) : DesktopPxToVw(510),
                  marginLeft: isMobile ? "15vw" : "10.4vw",
                }}
              />
              <MobileNumberField
                placeholder={props?.[1]?.subtitle}
                variant="standard"
                type="tel"
                onInput={(e: any) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 10)
                }}
                name={senderMobile}
                value={mobile}
                onChange={handleNumberChange}
              />
            </InputBox>
            {errorMessage?.senderMobile && mobile?.length < 10 && (
              <ErrorMessageTypography>
                {errorMessage?.senderMobile}
              </ErrorMessageTypography>
            )}
            <CheckBox>
              <Box sx={{ marginRight: "-1vw" }}>
                <CustomCheckBox
                  onChange={() => setCheck(!check)}
                  checked={check}
                  withBorder={true}
                />
              </Box>
              <Box
                className="portableText"
                ml={isMobile ? MobilePxToVw(11) : DesktopPxToVw(16)}>
                {props?.[1]?.singleContent && (
                  <PortableText blocks={props?.[1]?.singleContent?.[0]} />
                )}
              </Box>
            </CheckBox>
            {errorMessage?.CheckBoxError && !check && (
              <ErrorMessageTypography>
                {errorMessage?.CheckBoxError}
              </ErrorMessageTypography>
            )}
            <RenderActionItem
              url={primaryAction?.url}
              title={primaryAction?.title}
              variant={primaryAction?.variant}
              navigationType={primaryAction?.urlType}
              isActionButtonType={true}
              onClick={() => {
                if (mobile?.length > 9) {
                  if (check) {
                    handleSubmit()
                  } else {
                    setErrorMessage((prev: any) => {
                      return {
                        ...prev,
                        CheckBoxError: ERROR_MESSAGES?.checkboxError,
                      }
                    })
                  }
                }
              }}
            />
          </GridContainer>
        )}
      </Grid>
    </Grid>
  )
}

export default observer(GroupPreviewCarousel)
