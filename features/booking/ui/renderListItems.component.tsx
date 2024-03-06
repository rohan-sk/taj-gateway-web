import { Box, Collapse, Stack, Typography } from "@mui/material"
import React, { useState } from "react"
import { PriceContainer, TaxLabelStack } from "./styles/BookingConfirmedRoomDetails"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { formatToShortDate } from "../../../utils/getDate"
import { currency2DecimalSymbol } from "../../../utils/currency"
import { useMobileCheck } from "../../../utils/isMobilView"
import { RowStack } from "../../../components/MyAccount/my-account.styles"
import { ICONS } from "../../../components/constants"
import { BlockTypography } from "../../../components/BookingFlow/styles/cart-summary-card"

const RenderListItems = ({
    rooms,
    labelName,
    labelKey,
    isModified = true,
    currencyCode = "",
    isChangeRooms = false,
    fromPDF = false,
    isPrintAction = false,
    isDownload = false
}: any) => {
    const getDailyDetails = (room: any) => {
        return isModified ? (room?.["modifyBooking"]?.daily || room?.daily) : room?.daily
    }
    const isMobile = useMobileCheck()
    const [show, setShow] = useState(true)

    const textVariant = (size: string) => {
        const textSize = fromPDF ? "pdf" : size
        switch (textSize) {
            case "pdf":
                return isMobile ? isPrintAction ? "m-body-xxs" : isDownload ? "inherit" : "m-body-xl" : "body-xl"
            case "m":
                return isMobile ? isPrintAction ? "m-body-m" : isDownload ? "inherit" : "m-body-m" : "body-m"
            case "l":
                return isMobile ? isPrintAction ? "m-body-l" : isDownload ? "inherit" : "m-body-ml" : "body-ml"
            case "s":
                return isMobile ? isPrintAction ? "m-body-s" : isDownload ? "inherit" : "m-body-s" : "body-s"
            case "xs":
                return isMobile ? isPrintAction ? "m-body-xs" : isDownload ? "inherit" : "m-body-xs" : "body-xs"
            default:
                return isMobile ? isPrintAction ? "m-body-m" : isDownload ? "inherit" : "m-body-m" : "body-m"
        }
    }
    // for international tax breakup
    const RenderTaxes = ({ taxes }: any) => {
        const [showTaxes, setShowTaxes] = useState(fromPDF ? true : false)
        return (
            <Stack width={"100%"} flexDirection={"column"}>
                <RowStack>
                    <Stack
                        sx={{ cursor: "pointer" }}
                        columnGap={isMobile ? MobilePxToVw(6) : DesktopPxToVw(6)}
                        flexDirection={"row"}
                        onClick={() => setShowTaxes(!showTaxes)}>
                        <BlockTypography variant={isChangeRooms ? textVariant("s") : textVariant("m")}>
                            {formatToShortDate(taxes?.date)}
                        </BlockTypography>
                        {
                            !fromPDF &&
                            <Box
                                component="img"
                                alt={"key-arrow-down"}
                                src={ICONS?.KEY_ARROW_DOWN}
                                sx={{
                                    transform: showTaxes ? "rotate(0deg)" : "rotate(180deg)",
                                }}
                            />
                        }
                    </Stack>
                    <BlockTypography variant={isChangeRooms ? textVariant("s") : textVariant("m")}>
                        {currency2DecimalSymbol(taxes?.tax?.amount, currencyCode)}
                    </BlockTypography>
                </RowStack>
                <Collapse in={showTaxes}>
                    <Box py={fromPDF ? isMobile ? MobilePxToVw(10) : DesktopPxToVw(10) : 0}>
                        <Box pb={showTaxes ? isMobile ? MobilePxToVw(5) : DesktopPxToVw(5) : 0}>
                            {taxes?.tax?.breakDown?.map((tax: any, index: number) => (
                                <RowStack key={index}>
                                    <Typography variant={textVariant("s")}>{tax?.name || tax?.code}</Typography>
                                    <BlockTypography variant={textVariant("s")}>
                                        {currency2DecimalSymbol(tax?.amount, currencyCode)}
                                    </BlockTypography>
                                </RowStack>
                            ))}
                        </Box>
                    </Box>
                </Collapse>
            </Stack>
        )
    }
    return (
        <Stack rowGap={DesktopPxToVw(5)}>
            {rooms?.map((room: any, index: number) => (
                <React.Fragment key={index}>
                    <Typography
                        variant={textVariant("m")}>
                        {`Room ${room?.roomNumber}`}
                    </Typography>
                    <Collapse in={show}>
                        <Stack flexDirection={"column"}
                            py={fromPDF ? isMobile ? MobilePxToVw(10) : DesktopPxToVw(10) : 0}>
                            {getDailyDetails(room)?.map((item: any, index: number) => (
                                <RowStack key={index}>
                                    {labelKey === "amount" ? (
                                        <>
                                            <TaxLabelStack>
                                                {item?.date && (
                                                    <BlockTypography
                                                        variant={isChangeRooms ? textVariant("s") : textVariant("m")}>
                                                        {`${formatToShortDate(item?.date)}`}
                                                    </BlockTypography>
                                                )}
                                            </TaxLabelStack>
                                            <BlockTypography variant={isChangeRooms ? textVariant("s") : textVariant("m")}>
                                                {currency2DecimalSymbol(
                                                    item?.[labelKey] || 0,
                                                    currencyCode
                                                )}
                                            </BlockTypography>
                                        </>
                                    ) : (
                                        <>
                                            {currencyCode === "INR" ? (
                                                <>
                                                    <TaxLabelStack>
                                                        {item?.date && (
                                                            <Stack direction={"column"}>
                                                                <Typography
                                                                    variant={isChangeRooms ? textVariant("s") : textVariant("m")}>
                                                                    {formatToShortDate(
                                                                        item?.date
                                                                    )}
                                                                </Typography>
                                                                {
                                                                    Boolean(labelKey === "tax"
                                                                        ? (item?.[labelKey]?.breakDown?.[0]?.name
                                                                            || item?.[labelKey]?.breakDown?.[0]?.code)
                                                                        : labelName) &&
                                                                    <Typography
                                                                        variant={isChangeRooms ? textVariant("s") : textVariant("m")}>
                                                                        {`(${labelKey === "tax"
                                                                            ? (item?.[labelKey]?.breakDown?.[0]?.name
                                                                                || item?.[labelKey]?.breakDown?.[0]?.code)
                                                                            : labelName})`}
                                                                    </Typography>
                                                                }
                                                            </Stack>
                                                        )}
                                                    </TaxLabelStack>
                                                    <BlockTypography
                                                        variant={isChangeRooms ? textVariant("s") : textVariant("m")}>
                                                        {currency2DecimalSymbol(
                                                            labelKey === "tax"
                                                                ? item?.[labelKey]?.amount || 0
                                                                : item?.[labelKey] || 0,
                                                            currencyCode
                                                        )}
                                                    </BlockTypography>
                                                </>
                                            ) : (
                                                <RenderTaxes taxes={item} />
                                            )}
                                        </>
                                    )}
                                </RowStack>
                            ))}
                        </Stack>
                    </Collapse>
                </React.Fragment>
            ))}
        </Stack>
    )
}

export default RenderListItems
