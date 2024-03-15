import React, { useContext, useEffect, useState } from "react"
import { CONSTANTS } from "./constants"
import dynamic from "next/dynamic"
import { urlFor } from "../../lib-sanity"
import { useMobileCheck } from "../../utils/isMobilView"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { Box, Grid, Stack, Typography, useTheme } from "@mui/material"
import {
  BrandActionTypes,
  FooterProps,
  IconSubItems,
  QuickLinkItems,
  downloadButtonItems,
  legalInformationItems,
} from "./footer-types"

import {
  FlexBox,
  MainBox,
  InnerBox,
  TollFreeTypo,
  LogoImageBox,
  CopyRightBox,
  FooterTagLine,
  InputFieldBox,
  SocialIconsBox,
  QuickLinksTypo,
  QrCodeImageBox,
  ButtonImageBox,
  QrCodeImageGrid,
  SocialIconsGrid,
  BrandImagesGrid,
  FooterTextField,
  SupportMailTypo,
  QrCodeTitleTypo,
  ColumnReverseBox,
  DownloadButtonBox,
  CopyRightLinksBox,
  SupportDetailsBox,
  CopyRightLinksTypo,
  CustomerNumberTypo,
  CustomerSupportTypo,
  QuickLinksTitleTypo,
  BrandImagesTopDivider,
  QrCodeImagesContainer,
  CopyRightLinksDivider,
  BrandImagesBottomDivider,
  CopyRightLinksBottomDivider,
  ErrorWrapper,
  StyledButton,
  SocialIconsContainer,
  CTABox,
} from "./styles"
import { ICONS } from "../constants"
import { PathType } from "../../types"
import { observer } from "mobx-react-lite"
import { GAStore, UserStore } from "../../store"
import { GLOBAL_STORES } from "../../utils/Constants"
import { useLoggedIn } from "../../utils/hooks/useLoggedIn"
import { senderEmail } from "../forms/gift-card-form/constants"
import SharingDetails from "../../utils/sharingDetailsOnSocialMedia"
import { ErrorMessageTypography } from "../hoc/SignIn.tsx/sign-in.style"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
import TextfieldValidator from "../../utils/validations/TextfieldValidator"
import { generateCodeVerifier } from "../../utils/sso/generate-code-verifier"
import { generateCodeChallenge } from "../../utils/sso/generate-code-challenge"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { handleFooter } from "../../utils/analytics/events/NonEcommerce/footer-event"
import { data } from "jquery"

const BackToTopButton = dynamic(() => import("./back-to-top.component"))
const FooterAccordion = dynamic(() => import("./footer-accordion.component"))
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))

const Footer = (props: FooterProps) => {
  const {
    logo,
    icons,
    brand,
    tagLine,
    ctaLabel,
    hotelDetails,
    supportDetails,
    downloadButtons,
    legalInformation,
    showBottomNavigation,
    faqs,
  } = props
  const theme = useTheme()
  const isLogin = useLoggedIn()
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const context = useContext(IHCLContext)
  const whiteColor = theme?.palette?.ihclPalette?.hexOne

  const [error, setError] = useState<boolean>(false)
  const [disable, setDisable] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<any>("")
  const [disableEmail, setDisableEmail] = useState<boolean>(false)
  const [userEnteredEmail, setUserEnteredEmail] = useState<string>("")

  const indexArr: number[] = isMobile ? [2, 4, 7, 10] : [4]

  const handelClick = (url: string, urlType: any) => {
    url && urlType && navigate(url, urlType)
  }

  const formValidation = (isFormValid: any, id: any) => {
    setError(!isFormValid)
  }

  const handleChangeForm = (event: any) => {
    const { name, value } = event.target
    const { status, errorMsg } = TextfieldValidator(name, value)
    setErrorMessage(errorMsg)
    formValidation(status, name)
    setUserEnteredEmail(event?.target?.value)
    setDisable(status)
  }

  const handleKeyRestrictions = (event: any) => {
    if (event?.key === "Enter") {
      handleSubmit()
    }
  }

  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore

  const dataLayer = MemberDataLayer(userStore, gaStoreData)
  const isFooterEmailClear = userStore?.clearFooterEmail
  const userEmail = global?.localStorage?.getItem("userEmail")

  useEffect(() => {
    if (isFooterEmailClear) {
      setUserEnteredEmail("")
    }
  }, [isFooterEmailClear])

  useEffect(() => {
    if (isLogin) {
      setUserEnteredEmail(() => userEmail || "")
      setDisableEmail(() => userEmail?.length === 0 || userEmail !== null || userEmail !== undefined)
      setDisable(() => userEmail?.length === 0 || userEmail !== null || userEmail !== undefined)
    } else {
      setDisableEmail(() => false)
      setDisable(() => false)
    }
  }, [userEmail, isLogin])

  const handleSubmit = () => {
    if (!error) {
      userStore?.setSubscriptionEmail(userEnteredEmail)
      userStore?.setFooterEmailClear(false)
      navigate(props?.ctaLabel?.[0]?.url, props?.ctaLabel?.[0]?.urlType)
    }
  }

  const handleRoute = (url: string): void => {
    global?.window?.open(url)
  }

  const handleRouting = async (url: string, urlType: any) => {
    let response: any
    if (isLogin) {
      let codeVerifier = generateCodeVerifier()
      let codeChallenge = generateCodeChallenge(codeVerifier)
      response = await userStore?.generateAuthCodeApi(codeChallenge)
      if (response?.error === false && url && response?.data?.authCode) {
        window?.open(
          `${url}?authCode=${response?.data?.authCode}&codeVerifier=${codeVerifier}&codeChallenge=${codeChallenge}`,
        )
      }
    } else {
      url && urlType && navigate(url, urlType)
    }
  }

  return (
    <MainBox>
      {!isMobile && <BackToTopButton />}
      <InnerBox>
        {logo?.asset?._ref && (
          <LogoImageBox>
            <Box
              width={"100%"}
              height={"100%"}
              loading="lazy"
              component="img"
              alt="ihcl-logo"
              sx={{ objectFit: "fill", cursor: "pointer" }}
              src={urlFor(logo?.asset?._ref).url()}
              onClick={() => handelClick(props?.url, PathType?.external)}
            />
          </LogoImageBox>
        )}
        <Grid container>
          <Grid item xs={12} sm={isMobile ? 12 : 6.2} md={7} lg={7} xl={6.5}>
            <FlexBox>
              {tagLine && <FooterTagLine variant={isMobile ? "m-body-s" : "heading-xxs"}>{tagLine}</FooterTagLine>}
              <InputFieldBox
                sx={{
                  "& .MuiInputBase-root.MuiInput-root": {
                    "&::before": {
                      borderBottomStyle: "solid!important",
                    },
                  },
                }}>
                <FooterTextField
                  variant="standard"
                  label={CONSTANTS?.ENTER_YOUR_MAIL}
                  disabled={disableEmail}
                  aria-disabled={disableEmail}
                  value={userEnteredEmail}
                  onKeyDown={handleKeyRestrictions}
                  onChange={handleChangeForm}
                  name={senderEmail}
                  inputProps={{
                    style: { color: theme?.palette?.ihclPalette?.hexTwo },
                  }}
                />

                {ctaLabel?.[0]?.title && (
                  <RenderActionItem
                    url={""}
                    isActionButtonType={true}
                    variant={"dark-contained"}
                    navigationType={"external"}
                    title={ctaLabel?.[0]?.title}
                    buttonStyles={{
                      borderRadius: "0em",
                      letterSpacing: "1.8px",
                      color: theme?.palette?.text?.primary,
                      minWidth: isMobile ? MobilePxToVw(200) : DesktopPxToVw(193),
                      opacity: "unset !important",
                    }}
                    onClick={() => {
                      if (userEnteredEmail?.length > 0 && !error) {
                        handleSubmit()
                      }
                    }}
                    isDisable={disable}
                  />
                )}
              </InputFieldBox>
              <ErrorWrapper>
                {error && errorMessage && (
                  <ErrorMessageTypography variant={isMobile ? "m-body-s" : "body-s"}>
                    {errorMessage}
                  </ErrorMessageTypography>
                )}
              </ErrorWrapper>
              <CTABox>
                <FlexBox>
                  <FooterTagLine variant={isMobile ? "m-body-s" : "heading-xxs"}>
                    {supportDetails?.[0]?.title}
                  </FooterTagLine>
                  <SupportDetailsBox>
                    <FlexBox>
                      <CustomerNumberTypo variant={isMobile ? "m-body-m" : "body-m"}>
                        <a
                          href={`tel:${supportDetails?.[0]?.phone?.current}`}
                          onClick={() =>
                            handleFooter(
                              "footer_clicked",
                              supportDetails?.[0]?.phone?.current,
                              "",
                              dataLayer,
                              gaStoreData,
                              props?._type,
                              props?.title,
                              supportDetails?.[0]?.title,
                              "phone",
                            )
                          }>
                          {supportDetails?.[0]?.phone?.current}
                        </a>
                      </CustomerNumberTypo>
                    </FlexBox>
                    <SupportMailTypo variant={isMobile ? "m-body-l" : "body-m"}>
                      <Box
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          SharingDetails("https://mail.google.com/", "", "", supportDetails?.[0]?.mail)
                          handleFooter(
                            "footer_clicked",
                            supportDetails?.[0]?.mail,
                            "",
                            dataLayer,
                            gaStoreData,
                            props?._type,
                            props?.title,
                            supportDetails?.[0]?.title,
                            "mail",
                          )
                        }}>
                        {supportDetails?.[0]?.mail}
                      </Box>
                    </SupportMailTypo>
                  </SupportDetailsBox>
                </FlexBox>
                <FlexBox>
                  <FooterTagLine variant={isMobile ? "m-body-s" : "heading-xxs"}>
                    {supportDetails?.[1]?.title}
                  </FooterTagLine>
                  <SupportDetailsBox>
                    <FlexBox>
                      <CustomerNumberTypo variant={isMobile ? "m-body-l" : "body-m"}>
                        {supportDetails?.[1]?.phone?.current && (
                          <a
                            href={`tel:${supportDetails?.[1]?.phone?.current}`}
                            onClick={() =>
                              handleFooter(
                                "footer_clicked",
                                supportDetails?.[1]?.phone?.current,
                                "",
                                dataLayer,
                                gaStoreData,
                                props?._type,
                                props?.title,
                                supportDetails?.[1]?.title,
                                "phone",
                              )
                            }>
                            {supportDetails?.[1]?.phone?.current}
                          </a>
                        )}
                      </CustomerNumberTypo>
                      <SupportMailTypo variant={isMobile ? "m-body-m" : "body-m"}>
                        <Box
                          sx={{ cursor: "pointer" }}
                          onClick={() => {
                            supportDetails?.[1]?.mail?.length > 0
                              ? SharingDetails("https://mail.google.com/", "", "", supportDetails?.[1]?.mail)
                              : global?.window?.location?.assign(`${supportDetails?.[1]?.href}#careTajness`)
                            handleFooter(
                              "footer_clicked",
                              supportDetails?.[1]?.mail,
                              "",
                              dataLayer,
                              gaStoreData,
                              props?._type,
                              props?.title,
                              supportDetails?.[1]?.title,
                              "mail",
                            )
                          }}>
                          {supportDetails?.[1]?.value}
                        </Box>
                      </SupportMailTypo>

                      {isMobile && (
                        <StyledButton variant="light-contained" href={`tel:${supportDetails?.[0]?.phone?.current}`}>
                          {CONSTANTS?.CALL_NOW}
                        </StyledButton>
                      )}
                    </FlexBox>
                  </SupportDetailsBox>
                </FlexBox>
              </CTABox>
            </FlexBox>
          </Grid>
          {isMobile && (
            <Box sx={{ display: "flex", flexDirection: "column", paddingTop: "8vw" }}>
              <Typography
                variant={"m-body-m"}
                sx={{
                  opacity: "0.5",
                  color: whiteColor,
                }}>
                {icons?.[0]?.title}
              </Typography>
              <SocialIconsBox>
                {icons?.[0]?.icons?.map((item: IconSubItems, index: number) => (
                  <Box key={index}>
                    {item?.image?.asset?._ref && (
                      <Box
                        loading="lazy"
                        width={"100%"}
                        height={"100%"}
                        component={"img"}
                        alt="logo"
                        onClick={() => handelClick(item?.url, item?.urlType)}
                        src={
                          isMobile
                            ? urlFor(item?.image?.asset?._ref).url()
                            : urlFor(item?.largeImage?.asset?._ref).url()
                        }
                        sx={{
                          paddingRight: isMobile ? "7.65vw" : "1.04vw",
                          cursor: "pointer",
                        }}
                      />
                    )}
                  </Box>
                ))}
              </SocialIconsBox>
            </Box>
          )}
          <Grid item xs={12} sm={isMobile ? 12 : 3.5} md={3.5} lg={3.5} xl={3.6}>
            <FooterTagLine variant={isMobile ? "m-body-s" : "heading-xxs"}>{hotelDetails[0]?.title}</FooterTagLine>
            <Grid container marginTop={isMobile ? "1.875vw" : "0.88"} justifyContent={"space-between"}>
              {hotelDetails[0]?.quickLinks?.map((item: QuickLinkItems, index: number) => (
                <Grid key={index} item xs={5.6} sm={5.5} md={5.5} lg={5.5}>
                  <QuickLinksTypo
                    variant={isMobile ? "m-body-l" : "body-m"}
                    sx={{ lineHeight: isMobile ? "140%" : "200% !important", fontFamily: "Supreme" }}
                    onClick={() => {
                      navigate(item?.url),
                        handleFooter(
                          "footer_clicked",
                          item?.title,
                          item?.url,
                          dataLayer,
                          gaStoreData,
                          props?._type,
                          props?.title,
                          hotelDetails?.[0]?.title,
                        )
                    }}>
                    {item?.title}
                  </QuickLinksTypo>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "right" }} sm={isMobile ? 12 : 2.2} md={2.2} lg={1.5} xl={1.9}>
            {isMobile ? (
              //? commented as per the feedback from ihcl business
              // <DownloadButtonBox>
              //   <ButtonImageBox>
              //     <Box
              //       width="100%"
              //       height="100%"
              //       loading="lazy"
              //       component="img"
              //       sx={{ objectFit: "fill" }}
              //       src={ICONS?.PLAY_STORE}
              //       onClick={() => handleRoute(downloadButtons?.[0]?.url)}
              //     />
              //   </ButtonImageBox>
              //   <ButtonImageBox>
              //     <Box
              //       width="100%"
              //       height="100%"
              //       loading="lazy"
              //       component="img"
              //       sx={{ objectFit: "fill" }}
              //       src={ICONS?.APP_STORE}
              //       onClick={() => handleRoute(downloadButtons?.[1]?.url)}
              //     />
              //   </ButtonImageBox>
              // </DownloadButtonBox>
              <></>
            ) : (
              <>
                <QrCodeImagesContainer container>
                  {downloadButtons?.map((item: downloadButtonItems, index: number) => (
                    <QrCodeImageGrid key={index} item md={6} lg={6} xl={6}>
                      <FlexBox>
                        <QrCodeTitleTypo variant={"heading-xxs"}>{item?.title}</QrCodeTitleTypo>
                        {item?.image?.asset?._ref && (
                          <QrCodeImageBox>
                            <Box
                              width="100%"
                              height="100%"
                              loading="lazy"
                              component="img"
                              alt="download-qr"
                              sx={{
                                mt: "12%",
                                objectFit: "contain",
                              }}
                              src={urlFor(item?.image?.asset?._ref).url()}
                            />
                          </QrCodeImageBox>
                        )}
                      </FlexBox>
                    </QrCodeImageGrid>
                  ))}
                  <Grid container mb={"1.042vw"}>
                    <Typography
                      variant={"heading-xxs"}
                      sx={{
                        fontFamily: theme?.palette?.font?.primaryFontFamily,
                        fontWeight: "600",
                        color: theme?.palette?.ihclPalette?.hexThirtyFive,
                      }}>
                      {icons?.[0]?.title}
                    </Typography>
                  </Grid>
                  <SocialIconsContainer>
                    {icons?.[0]?.icons?.map((item: IconSubItems, index: number) => (
                      <SocialIconsGrid key={index}>
                        {item?.image?.asset?._ref && (
                          <Box
                            loading="lazy"
                            width="auto"
                            height={isMobile ? "" : "1.042vw"}
                            component={"img"}
                            alt="icon"
                            onClick={() => {
                              handelClick(item?.url, item?.urlType)
                              handleFooter(
                                "footer_clicked",
                                item?.title,
                                item?.url,
                                dataLayer,
                                gaStoreData,
                                props?._type,
                                props?.title,
                                icons?.[0]?.title,
                              )
                            }}
                            src={urlFor(item?.image?.asset?._ref).url()}
                            sx={{
                              objectFit: "contain",
                              backgroundPosition: "center",
                              cursor: "pointer",
                            }}
                          />
                        )}
                      </SocialIconsGrid>
                    ))}
                  </SocialIconsContainer>
                </QrCodeImagesContainer>
              </>
            )}
          </Grid>
          <BrandImagesTopDivider
            sx={{
              margin: isMobile ? "7.5vw 0vw 0vw !important" : "1.979vw 0vw 0.5vw 0vw !important",
            }}
          />
          <FooterAccordion props={props?.faqs?.[0]} dataLayer={dataLayer} gaStoreData={gaStoreData} data={props} />
          <BrandImagesTopDivider
            sx={{
              margin: isMobile ? "0vw 0vw 7.5vw !important" : "0.4vw 0vw 1.8vw 0vw !important",
            }}
          />
          <Grid xs={12} item>
            {brand?.title && (
              <Typography
                variant={isMobile ? "m-heading-xs" : "heading-xs"}
                sx={{
                  mb: isMobile ? MobilePxToVw(10) : DesktopPxToVw(10),
                  fontWeight: "600",
                  fontSize: "1.042vw",
                }}>
                {brand?.title}
              </Typography>
            )}
            <Stack
              flexDirection={"row"}
              sx={{
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: isMobile ? "space-between" : "space-around",
                columnGap: isMobile ? MobilePxToVw(60) : "unset",
                rowGap: isMobile ? MobilePxToVw(35) : "unset",
              }}>
              {brand?.actionTypes?.map((item: BrandActionTypes, index: number) => (
                <Box textAlign={"center"} sx={{ cursor: "pointer" }} key={index}>
                  {item?.image?.asset?._ref && (
                    <Box
                      loading="lazy"
                      component="img"
                      alt="brand-logo"
                      width="100%"
                      height="100%"
                      onClick={() => {
                        handleRouting(item?.url, item?.urlType),
                          handleFooter(
                            "footer_clicked",
                            item?.title,
                            item?.url,
                            dataLayer,
                            gaStoreData,
                            props?._type,
                            props?.title,
                            "Brands",
                          )
                      }}
                      src={urlFor(item?.image?.asset?._ref).url()}
                    />
                  )}
                </Box>
              ))}
            </Stack>
          </Grid>
          <BrandImagesBottomDivider />
          <ColumnReverseBox>
            <Box sx={{ width: "75%" }} mb={isMobile && showBottomNavigation ? MobilePxToVw(78) : 0}>
              <Typography variant={isMobile ? "m-body-xs" : "body-xs"}>
                {`© ${new Date()?.getFullYear()} ${legalInformation?.[0]?.title}`}
              </Typography>
            </Box>
            {isMobile && <CopyRightLinksBottomDivider />}
            <CopyRightBox>
              {legalInformation
                ?.slice(1, legalInformation?.length)
                ?.map((item: legalInformationItems, index: number) => (
                  <CopyRightLinksBox key={index}>
                    <CopyRightLinksTypo
                      variant={isMobile ? "m-body-s" : "body-xs"}
                      onClick={() => {
                        navigate(item?.url, item?.urlType),
                          handleFooter(
                            "footer_clicked",
                            item?.title,
                            item?.url,
                            dataLayer,
                            gaStoreData,
                            props?._type,
                            props?.title,
                            legalInformation?.[0]?.title,
                          )
                      }}>
                      {item?.title}
                    </CopyRightLinksTypo>
                    {legalInformation?.length - 2 !== index && !indexArr?.includes(index) && (
                      <CopyRightLinksDivider variant="middle" orientation="vertical" />
                    )}
                  </CopyRightLinksBox>
                ))}
            </CopyRightBox>
          </ColumnReverseBox>
        </Grid>
      </InnerBox>
    </MainBox>
  )
}

export default observer(Footer)
