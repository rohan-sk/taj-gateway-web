import React, { useContext } from 'react'
import { IHCLContext } from '../../PresentationalComponents/lib/prepare-ihcl-context';
import { Box, Grid, Typography } from '@mui/material';
import { CONSTANTS } from '../constants';
import { useMobileCheck } from '../../utils/isMobilView';
import DesktopPxToVw, { MobilePxToVw } from '../../utils/DesktopFontCalc';
import { ParameterMapStack, RenderComponentContentWrapper, VerticalDivider } from './styles/group-image-with-content';
import { Stack } from '@mui/system';
import { parameterMapItems } from '../types';

const LoyaltyChambersTabsImageContent = ({ props }: any) => {
    const context = useContext(IHCLContext)
    const isMobile = useMobileCheck()

    const LoopingData = props?.items
    let renderItemsCount = LoopingData?.length
    const fourItems = renderItemsCount === CONSTANTS?.FOUR
    const sixItems = renderItemsCount === CONSTANTS?.SIX
    const threeItems = renderItemsCount === CONSTANTS?.THREE
    const fiveItems = renderItemsCount === CONSTANTS?.FIVE
    const twoItems = renderItemsCount === CONSTANTS?.TWO
    const parameterItems = props?.parameterMap?.length


    return (
        <>
            <Grid container justifyContent={"center"}
                rowGap={
                    isMobile
                        ? MobilePxToVw(42)
                        : DesktopPxToVw(60)
                }
                columnGap={isMobile ? MobilePxToVw(20) : DesktopPxToVw(60)}>

                {props?.items?.map((item: any, index: number) => (
                    <Grid key={index}
                        xs={5.65}
                        sm={
                            isMobile
                                ? fourItems
                                    ? 5.65
                                    : twoItems || threeItems || sixItems || fiveItems
                                        ? 5.65
                                        : 5.6
                                : fourItems
                                    ? 2.7
                                    : 3
                        }
                        md={fourItems ? 2.7 : 2.5}
                        lg={fourItems ? 2.7 : 2.5}
                        xl={fourItems ? 2.7 : 2.5}>
                        <Box sx={{ width: "100%" }}>
                            <RenderComponentContentWrapper
                                $isMobile={isMobile}
                                $fourItems={fourItems}
                                $showDivider={false}>

                                {context?.renderComponent(item._type, {
                                    ...item,
                                })}
                            </RenderComponentContentWrapper>
                        </Box>
                    </Grid>
                )
                )}
                <Grid container justifyContent={"center"}  >
                    {props?.parameterMap && (
                        <ParameterMapStack>
                            {props?.parameterMap?.map((item: parameterMapItems, index: number) => (
                                <Stack flexDirection={"row"} key={index}
                                    sx={{
                                        width: isMobile ? (parameterItems % 2 !== 0 && index === 0 ? '100%' : 'initial') : 'initial',
                                        justifyContent: 'center'
                                    }}>
                                    <Typography variant={isMobile ? "m-body-s" : "body-s"}>
                                        {item?.value}
                                    </Typography>
                                    {!isMobile && (index + 1 < parameterItems) && (
                                        <VerticalDivider orientation='vertical' />
                                    )}
                                    {
                                        (isMobile && (parameterItems % 2 !== 0 && index < (parameterItems - 1) ? ((index === 0) ? false : true) : index < (parameterItems - 1)) &&
                                            < VerticalDivider orientation='vertical' />
                                        )
                                    }
                                </Stack>
                            ))}
                        </ParameterMapStack>
                    )}
                </Grid>
            </Grid >
        </>
    )
}

export default LoyaltyChambersTabsImageContent