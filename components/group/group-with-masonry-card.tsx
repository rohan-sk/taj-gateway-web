import { Box, Divider, Typography } from "@mui/material"
import React, { createRef, useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { useMobileCheck } from "../../utils/isMobilView"
import { urlFor } from "../../lib-sanity"
const VideoPlayerModal = dynamic(() => import("../modal/video-player-modal.component"))
import {
  LeftBoxItem,
  LeftCardItemTitle,
  LeftMediaVideoItem,
  MasonryBoxWrapper,
  MasonryGridWrapper,
  RightBoxItem,
  RightCardItemTitle,
  RightMediaVideoItem,
} from "./styles/group-with-masonry-card-style"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { theme } from "../../lib/theme"
import { CustomDivider } from "../card/styles/card-with-img-content"
const MultiRowTitle = dynamic(() => import("../hoc/title/multi-row-title"))
import { useImageUtility } from "../../utils/hooks/useImageUtility"
import VideoSEOScript from "../../utils/VideoSEOScript"

function GroupWithMasonryCard({ props }: any) {
  const isMobile = useMobileCheck()

  const [open, setOpen] = useState<boolean>(false)
  const [video, setVideo] = useState<string>("")
  const [videoAsset, setVideoAsset] = useState<any>()
  const [muteVideo, setMuteVideo] = useState<boolean>(true)
  const handleModelClose = () => setOpen(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [masonryItems, setMasonryItems] = useState<any>()

  useEffect(() => {
    setMasonryItems(props?.[0]?.items)
  }, [props])

  const { getOptimizeImageUrl } = useImageUtility()

  const getFilterCheck = (masonryItem: any) => {
    return masonryItem?.items?.findIndex((val: any) => {
      return val?.textOnly === true
    })
  }

  return (
    <>
      <MasonryBoxWrapper>
        {masonryItems &&
          masonryItems[0]?.itemsData?.map((masonryItem: any, outerIndex: number) => (
            <MasonryGridWrapper
              $isMobile={isMobile}
              key={outerIndex}
              xs={12 / masonryItems[0]?.itemsData?.length}
              container
              $outerIndex={outerIndex}>
              <>
                <Box>
                  {masonryItem?.items.map((item: any, index: any) => {
                    return (
                      <Box
                        key={index}
                        style={{
                          position: "relative",
                          display: "inline-block",
                        }}>
                        {item.mediaType == "video" ? (
                          <LeftMediaVideoItem>
                            <Box
                              alt="img"
                              loading="lazy"
                              component="img"
                              sx={{
                                cursor: "pointer",
                                width:
                                  masonryItem.col !== "middle"
                                    ? index === 0
                                      ? `calc(100% * ${masonryItems[0]?.firstItemWidth}`
                                      : index === masonryItem?.items?.length - 1
                                      ? `calc(100% * ${masonryItems[0]?.lastItemWidth}`
                                      : "100%"
                                    : "100%",
                                position: "absolute",
                                bottom: isMobile ? MobilePxToVw(221) : DesktopPxToVw(232),
                                left: isMobile ? MobilePxToVw(802) : DesktopPxToVw(458),
                              }}
                              src={
                                item?.videoAsset?.playIcon?.asset?._ref &&
                                urlFor(item?.videoAsset?.playIcon?.asset?._ref).url()
                              }
                              onClick={() => {
                                item?.videoAsset?.videoPlay?.asset?._ref &&
                                  setVideo(item?.videoAsset?.videoPlay?.asset?._ref),
                                  setVideoAsset(item?.videoAsset),
                                  setOpen(true)
                              }}
                            />
                            <Box
                              alt="img"
                              loading="lazy"
                              component="img"
                              sx={{ cursor: "pointer" }}
                              src={
                                item?.videoAsset?.videoThumbnail?.asset?._ref &&
                                urlFor(item?.videoAsset?.videoThumbnail?.asset?._ref).url()
                              }
                              onClick={() => {
                                item?.videoAsset?.videoPlay?.asset?._ref &&
                                  setVideo(item?.videoAsset?.videoPlay?.asset?._ref),
                                  setVideoAsset(item?.videoAsset),
                                  setOpen(true)
                              }}
                            />
                          </LeftMediaVideoItem>
                        ) : (
                          <>
                            {item?.textOnly ? (
                              <>{!isMobile && <MultiRowTitle {...props} title={item?.text} />}</>
                            ) : (
                              <Box
                                style={{
                                  paddingBottom: DesktopPxToVw(40), //"28px",
                                  width:
                                    masonryItem.col !== "middle"
                                      ? (getFilterCheck(masonryItem) === 0 && index === 1) ||
                                        (getFilterCheck(masonryItem) < 0 && index === 0)
                                        ? `calc(100% * ${masonryItems[0]?.firstItemWidth}`
                                        : index === masonryItem?.items?.length - 1
                                        ? `calc(100% * ${masonryItems[0]?.lastItemWidth}`
                                        : outerIndex == 0
                                        ? "87%"
                                        : "100%"
                                      : "100%",
                                }}
                                alt={`-img`}
                                loading="lazy"
                                component={"img"}
                                src={getOptimizeImageUrl(
                                  item?.imageAsset?.largeImage?.[0]?.asset?._ref
                                    ? urlFor(item?.imageAsset?.largeImage?.[0]?.asset?._ref).url()
                                    : urlFor(item?.imageAsset?.image?.[0]?.asset?._ref)?.url(),
                                  2,
                                )}
                              />
                            )}
                          </>

                          //  {item?.rightItems}
                        )}
                        <LeftCardItemTitle
                          $isMobile={isMobile}
                          variant={isMobile ? "m-heading-xxs" : "heading-s"}
                          style={{
                            width:
                              masonryItem.col !== "middle"
                                ? (getFilterCheck(masonryItem) === 0 && index === 1) ||
                                  (getFilterCheck(masonryItem) < 0 && index === 0)
                                  ? `calc(100% * ${masonryItems[0]?.firstItemWidth}`
                                  : index === masonryItem?.items?.length - 1
                                  ? `calc(100% * ${masonryItems[0]?.lastItemWidth}`
                                  : "87%"
                                : "100%",
                            right: outerIndex === 0 ? 0 : "unset",
                            left: outerIndex !== 0 ? 0 : "unset",
                          }}>
                          {item?.title}
                        </LeftCardItemTitle>
                      </Box>
                    )
                  })}
                </Box>
              </>
            </MasonryGridWrapper>
          ))}
        <VideoSEOScript {...videoAsset} />
        {open && <VideoPlayerModal videoUrl={video} handleModalOpen={open} handleModalClose={handleModelClose} />}
      </MasonryBoxWrapper>
    </>
  )
}

const LeftImages = ({ item, setVideo, setVideoAsset, setOpen }: any) => {
  const widthRefs = useRef<any>([])
  widthRefs.current = item?.leftItems.map((element: any, i: number) => widthRefs.current[i] ?? createRef())
  const { getOptimizeImageUrl } = useImageUtility()

  const checkWidthAndHeight = (index: number) => {
    let style = {}
    if (index == 0) {
      style = {
        width: MobilePxToVw(243),
        height: MobilePxToVw(293),
      }
    } else if (index == 1) {
      style = {
        width: MobilePxToVw(278),
        height: MobilePxToVw(205),
      }
    } else if (index == 2) {
      style = {
        width: MobilePxToVw(227),
        height: MobilePxToVw(227),
      }
    }
    return style
  }

  return (
    <Box>
      {item?.leftItems.map((item: any, index: any) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            position: "relative",
          }}>
          <Box sx={{ marginBottom: MobilePxToVw(16) }}>
            {item.mediaType == "video" ? (
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  display: "grid",
                  placeItems: "center",
                }}>
                <Box
                  alt="img"
                  loading="lazy"
                  component="img"
                  sx={{
                    cursor: "pointer",
                    position: "absolute",
                    width: MobilePxToVw(40),
                    height: MobilePxToVw(40),
                  }}
                  src={item?.videoAsset?.playIcon?.asset?._ref && urlFor(item?.videoAsset?.playIcon?.asset?._ref).url()}
                  onClick={() => {
                    item?.videoAsset?.videoPlay?.asset?._ref && setVideo(item?.videoAsset?.videoPlay?.asset?._ref),
                      setVideoAsset(item?.videoAsset)
                    setOpen(true)
                  }}
                />
                <Box
                  alt="img"
                  loading="lazy"
                  component="img"
                  ref={widthRefs.current[index]}
                  sx={{ ...checkWidthAndHeight(index), cursor: "pointer" }}
                  src={
                    item?.videoAsset?.smallVideoThumbnail?.asset?._ref &&
                    urlFor(item?.videoAsset?.smallVideoThumbnail?.asset?._ref).url()
                  }
                  onClick={() => {
                    item?.videoAsset?.videoPlay?.asset?._ref && setVideo(item?.videoAsset?.videoPlay?.asset?._ref),
                      setVideoAsset(item?.videoAsset)
                    setOpen(true)
                  }}
                />
              </Box>
            ) : (
              <>
                {item?.imageAsset?.image?.[0]?.asset?._ref && (
                  <Box
                    alt={`-img`}
                    sx={{ ...checkWidthAndHeight(index) }}
                    ref={widthRefs.current[index]}
                    loading="lazy"
                    component={"img"}
                    src={getOptimizeImageUrl(urlFor(item?.imageAsset?.image?.[0]?.asset?._ref)?.url(), 2)}
                  />
                )}
              </>
            )}
          </Box>
          <Typography
            variant={"m-body-s"}
            sx={{
              color: theme?.palette?.ihclPalette?.hexOne,
              padding: `${MobilePxToVw(4)} ${MobilePxToVw(8)}`,
              bottom: MobilePxToVw(15),
              width: widthRefs.current[index]?.current?.clientWidth,
              textAlign: "center",
              position: "absolute",
            }}>
            {item?.title}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

const RightImages = ({ item, setVideo, setVideoAsset, setOpen }: any) => {
  const widthRefs = useRef<any>([])
  widthRefs.current = item?.leftItems.map((element: any, i: number) => widthRefs.current[i] ?? createRef())

  const { getOptimizeImageUrl } = useImageUtility()

  const checkWidthAndHeight = (index: number) => {
    let style = {}
    if (index == 0) {
      style = {
        width: MobilePxToVw(242),
        height: MobilePxToVw(204),
      }
    } else if (index == 1) {
      style = {
        width: MobilePxToVw(312),
        height: MobilePxToVw(204),
      }
    } else if (index == 2) {
      style = {
        width: MobilePxToVw(212),
        height: MobilePxToVw(284),
      }
    }
    return style
  }

  return (
    <Box>
      {item?.rightItems.map((item: any, index: any) => {
        return (
          <Box key={index} sx={{ position: "relative" }}>
            <Box sx={{ marginBottom: MobilePxToVw(16) }}>
              {item.mediaType == "video" ? (
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    display: "grid",
                    placeItems: "center",
                  }}>
                  <Box
                    alt="img"
                    loading="lazy"
                    component="img"
                    sx={{
                      cursor: "pointer",
                      position: "absolute",
                    }}
                    src={
                      item?.videoAsset?.playIcon?.asset?._ref && urlFor(item?.videoAsset?.playIcon?.asset?._ref).url()
                    }
                    onClick={() => {
                      item?.videoAsset?.videoPlay?.asset?._ref && setVideo(item?.videoAsset?.videoPlay?.asset?._ref),
                        setVideoAsset(item?.videoAsset),
                        setOpen(true)
                    }}
                  />
                  <Box
                    alt="img"
                    component="img"
                    loading="lazy"
                    sx={{ ...checkWidthAndHeight(index), cursor: "pointer" }}
                    ref={widthRefs.current[index]}
                    src={
                      item?.videoAsset?.smallVideoThumbnail?.asset?._ref &&
                      urlFor(item?.videoAsset?.smallVideoThumbnail?.asset?._ref).url()
                    }
                    onClick={() => {
                      item?.videoAsset?.videoPlay?.asset?._ref && setVideo(item?.videoAsset?.videoPlay?.asset?._ref),
                        setVideoAsset(item?.videoAsset),
                        setOpen(true)
                    }}
                  />
                </Box>
              ) : (
                <>
                  {item?.imageAsset?.image?.[0]?.asset?._ref && (
                    <Box
                      ref={widthRefs.current[index]}
                      alt={`-img`}
                      sx={{ ...checkWidthAndHeight(index) }}
                      loading="lazy"
                      component={"img"}
                      src={getOptimizeImageUrl(urlFor(item?.imageAsset?.image?.[0]?.asset?._ref)?.url(), 2)}
                    />
                  )}
                </>
              )}
            </Box>
            <Typography
              variant={"m-body-s"}
              sx={{
                color: theme?.palette?.ihclPalette?.hexOne,
                padding: `${MobilePxToVw(4)} ${MobilePxToVw(8)}`,
                bottom: MobilePxToVw(15),
                width: widthRefs.current[index]?.current?.clientWidth,
                textAlign: "center",
                position: "absolute",
              }}>
              {item?.title}
            </Typography>
          </Box>
        )
      })}
    </Box>
  )
}

export default GroupWithMasonryCard
