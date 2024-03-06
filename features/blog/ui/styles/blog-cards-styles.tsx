import { Box, Button, Divider, TextField, Typography, styled } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { theme } from "../../../../lib/theme"

export const AuthorWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  border: `1px solid ${theme?.palette?.ihclPalette?.hexTwo}`,
  padding: `${DesktopPxToVw(40)} ${DesktopPxToVw(36)}`,
  "@media (max-width: 640px)": {
    padding: `${MobilePxToVw(40)} ${MobilePxToVw(36)}`,
  },
}))

export const AuthorImageWrapper = styled(Box)(() => ({
  margin: `${DesktopPxToVw(20)} 0vw`,
  width: DesktopPxToVw(180),
  height: DesktopPxToVw(180),
  "@media (max-width: 640px)": {
    width: MobilePxToVw(180),
    height: MobilePxToVw(180),
    margin: `${MobilePxToVw(20)} 0vw`,
  },
}))

export const AuthorViewStoriesButton = styled(Button)(() => ({
  fontWeight: 700,
  fontFamily: theme?.typography?.fontFamily,
  letterSpacing: "1.8px",
  fontSize: DesktopPxToVw(18),
  color: theme?.palette?.ihclPalette?.hexTwo,
  padding: `${DesktopPxToVw(18)} ${DesktopPxToVw(36)}`,
  border: `1px solid ${theme?.palette?.ihclPalette?.hexTwo}`,
  "@media (max-width: 640px)": {
    fontSize: MobilePxToVw(18),
    letterSpacing: "1.8px",
    padding: `${MobilePxToVw(18)} ${MobilePxToVw(36)}`,
  },
}))

export const ArticleTagsWrapper = styled(Box)(() => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "start",
  gap: DesktopPxToVw(20),
  margin: `${DesktopPxToVw(20)} 0vw`,
  "@media (max-width: 640px)": {
    gap: MobilePxToVw(20),
    margin: `${MobilePxToVw(20)} 0vw`,
  },
}))

export const EachArticleTag = styled(Typography)(() => ({
  color: theme?.palette?.ihclPalette?.hexTwo,
  textAlign: "center",
  fontFamily: theme?.typography?.fontFamily,
  fontSize: DesktopPxToVw(18),
  fontWeight: 700,
  letterSpacing: "1.8px",
  padding: `${DesktopPxToVw(18)} ${DesktopPxToVw(34)}`,
  cursor: "pointer",
  border: `1px solid ${theme?.palette?.ihclPalette?.hexTwo}`,
  "@media (max-width: 640px)": {
    letterSpacing: "1.8px",
    fontSize: MobilePxToVw(18),
    padding: `${MobilePxToVw(18)} ${MobilePxToVw(36)}`,
  },
}))

export const StoriesImageAndTitleWrapper = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "38% 62%",
  alignItems: "center",
  paddingBottom: DesktopPxToVw(20),
  borderBottom: `1px solid ${theme?.palette?.ihclPalette?.hexSixteen}`,
}))

export const TitleHyphenDivider = styled(Divider)(() => ({
  height: "1%",
  width: "2.083vw",
  marginTop: "0.7vw",
  borderColor: theme?.palette?.ihclPalette?.hexSeventeen,
  background: theme?.palette?.ihclPalette?.hexSeventeen,
  "@media (max-width: 640px)": {
    width: "6.56vw",
    marginTop: "4.8vw",
  },
}))

export const CardContentWrapper = styled(Box)(() => ({
  display: "flex",
  gap: DesktopPxToVw(22),
  "@media (max-width: 640px)": {
    gap: MobilePxToVw(22),
  },
}))

export const MasonryCardContentWrapper = styled(CardContentWrapper)(() => ({
  paddingTop: DesktopPxToVw(40),
  "@media (max-width: 640px)": {
    paddingTop: MobilePxToVw(38),
  },
}))

export const BlogThemePageTitle = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: DesktopPxToVw(5),
  "@media (max-width: 640px)": {
    flexDirection: "column",
    textAlign: "center",
  },
}))

export const ArticleTagsActionBox = styled(Box)(() => ({
  display: "flex",
  gap: DesktopPxToVw(4),
  alignItems: "center",
  cursor: "pointer",
  "@media (max-width: 640px)": {
    gap: MobilePxToVw(10),
    width: "fit-content",
    padding: `${MobilePxToVw(16)} ${MobilePxToVw(42)}`,
    border: `1px solid ${theme?.palette?.ihclPalette?.hexTwo}`,
  },
}))

export const PreviuosNextActionBox = styled(ArticleTagsActionBox)(() => ({
  gap: DesktopPxToVw(0),
}))

export const CtaActionsWrapper = styled(Box)(() => ({
  display: "flex",
  marginTop: DesktopPxToVw(40),
  justifyContent: "space-between",
}))

export const MasonryCardActionBox = styled(ArticleTagsActionBox)(() => ({
  justifyContent: "center",
  "@media (max-width: 640px)": {
    margin: `0vw auto`,
  },
}))

export const MasonryCard = styled(Box)(() => ({
  width: "100%",
  boxSizing: "border-box",
  breakInside: "avoid-column",
}))

export const NoResultsFoundText = styled(Typography)(() => ({
  margin: `${DesktopPxToVw(24)} 0vw`,
  fontSize: DesktopPxToVw(20),
  "@media (max-width: 640px)": {
    margin: `${MobilePxToVw(24)} 0vw`,
    fontSize: MobilePxToVw(20),
  },
}))

export const TagListCardWrapper = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  columnGap: DesktopPxToVw(40),
  "@media (max-width: 640px)": {
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
  },
}))

export const TravelInspirationsWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: DesktopPxToVw(20),
  "@media (max-width: 640px)": {
    justifyContent: "start",
    margin: `0vw 0vw ${MobilePxToVw(35)} 0vw`,
  },
}))

export const TravelInspirationTitle = styled(Typography)(() => ({
  color: theme?.palette?.ihclPalette?.hexTwo,
  fontSize: DesktopPxToVw(18),
  fontWeight: 700,
  letterSpacing: "1.8px",
  cursor: "pointer",
  fontFamily: theme?.typography?.fontFamily,
  padding: `${DesktopPxToVw(18)} ${DesktopPxToVw(34)}`,
  border: `1px solid ${theme?.palette?.ihclPalette?.hexTwo}`,
  "@media (max-width: 640px)": {
    fontSize: MobilePxToVw(18),
    letterSpacing: "1.8px",
    padding: `${MobilePxToVw(18)} ${MobilePxToVw(34)}`,
  },
}))

export const SortTextTypographyBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-end",
}))

export const CommentsContentBox = styled(Box)(() => ({
  gap: "1.04vw",
  display: "flex",
  marginBottom: "2.08vw",
  flexDirection: "column",
  "@media (max-width: 640px)": {
    gap: "3.125vw",
    margin: "3.125vw 0vw 6.25vw 0vw",
  },
}))

export const UserProfileAndNameWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "3.125vw",
}))

export const StoryThemeButtonWrapper = styled(UserProfileAndNameWrapper)(() => ({
  gap: "0vw",
  marginBottom: DesktopPxToVw(40),
  "@media (max-width: 640px)": {
    marginBottom: MobilePxToVw(40),
  },
}))

export const CommentsButtonWrapper = styled(StoryThemeButtonWrapper)(() => ({}))

export const CommentsWrapperBox = styled(Box)(() => ({
  display: "flex",
  gap: "2.08vw",
  borderBottom: `1px solid ${theme?.palette?.ihclPalette?.hexSeventeen}`,
  "@media (max-width: 640px)": {
    display: "block",
    gap: "0vw",
  },
}))

export const LikesWrapperBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: DesktopPxToVw(40),
  "@media (max-width: 640px)": {
    gap: "0vw",
  },
}))

export const DisLikesIconAndCountBox = styled(LikesWrapperBox)(() => ({
  gap: DesktopPxToVw(10),
}))

export const LikesIconAndCountBox = styled(DisLikesIconAndCountBox)(() => ({}))

export const LikesCountTypography = styled(Typography)(() => ({
  fontSize: DesktopPxToVw(22),
  "@media (max-width: 640px)": {
    marginLeft: MobilePxToVw(10),
    fontSize: MobilePxToVw(22),
  },
}))

export const CommentReplyTypography = styled(Typography)(() => ({
  color: theme?.palette?.ihclPalette?.hexTwo,
  fontSize: DesktopPxToVw(18),
  fontWeight: 400,
  cursor: "pointer",
  letterSpacing: "1.8px",
  textDecoration: "underline",
  "@media (max-width: 640px)": {
    marginLeft: MobilePxToVw(40),
    fontSize: MobilePxToVw(18),
  },
}))

export const CommentsHeadingWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  "@media (max-width: 640px)": {
    display: "block",
  },
}))

export const CommentsBoxWrapper = styled(Box)(() => ({
  backgroundColor: theme?.palette?.ihclPalette?.hexOne,
  margin: "2.08vw 0vw 3.125vw 0vw",
  padding: "3.125vw 2.08vw 2.08vw 2.08vw",
  "@media (max-width: 640px)": {
    margin: "6.25vw 0vw 9.37vw 0vw",
    padding: "9.37vw 6.25vw 6.25vw 6.25vw",
  },
}))

export const UseIconAndTextFieldWrapper = styled(Box)(() => ({
  display: "flex",
  gap: "2.08vw",
  alignItems: "center",
  marginBottom: "2.08vw",
  "@media (max-width: 640px)": {
    gap: "3.12vw",
    marginBottom: "6.25vw",
  },
}))

export const CommentsInputTextField = styled(TextField)(() => ({
  width: "100%",
  input: {
    fontFamily: theme?.typography?.fontFamily,
    fontSize: DesktopPxToVw(24),
    margin: "0vw 0vw 1.04vw 0vw",
    "@media (max-width: 640px)": {
      fontSize: MobilePxToVw(24),
    },
    "&::placeholder": {
      opacity: 1,
      fontWeight: 300,
      fontFamily: theme?.typography?.fontFamily,
      fontSize: DesktopPxToVw(24),
      color: theme?.palette?.ihclPalette?.hexSeventeen,
      "@media (max-width: 640px)": {
        fontSize: MobilePxToVw(24),
      },
    },
  },
}))

export const ThemeListingLikesWrapper = styled(Box)(() => ({
  top: "80%",
  position: "absolute",
  right: DesktopPxToVw(8),
  background: theme?.palette?.ihclPalette?.hexOne,
  padding: `${DesktopPxToVw(8)} ${DesktopPxToVw(12)}`,
  borderRadius: "20%",
  "@media (max-width: 640px)": {
    top: "88%",
    right: MobilePxToVw(10),
    padding: `${MobilePxToVw(6)} ${MobilePxToVw(14)}`,
  },
}))

export const ThemeListingCommentsWrapper = styled(ThemeListingLikesWrapper)(() => ({
  top: "63%",
  "@media (max-width: 640px)": {
    top: "77%",
  },
}))

export const BlogArticleText = styled(Typography)(() => ({
  textAlign: "initial",
  "@media (max-width: 640px)": {
    textAlign: "center",
  },
}))

export const BlogArticleHeadingText = styled(BlogArticleText)(() => ({
  letterSpacing: "1.2px",
}))

export const BlogArticleParagraphText = styled(BlogArticleText)(() => ({
  "& p": {
    marginTop: DesktopPxToVw(32),
  },
  "@media (max-width: 640px)": {
    "& p": {
      marginTop: MobilePxToVw(32),
    },
    "& ul": {
      "& li": {
        textAlign: "start",
      },
    },
  },
}))

export const TopStoriesTitle = styled(Typography)(() => ({
  paddingLeft: "1.04vw",
  cursor: "pointer",
  "@media (max-width: 640px)": {
    display: "block",
    marginTop: "5.62vw",
    paddingLeft: "0vw",
  },
}))

///////////////////////// Blog theme Listing New UI Styles

export const ThemeListingWrapperBox = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: DesktopPxToVw(40),
  "@media (max-width: 640px)": {
    display: "block",
  },
}))

export const ThemeListingContentWrapper = styled(Box)(() => ({
  display: "flex",
  marginTop: DesktopPxToVw(40),
  "@media (max-width: 640px)": {
    marginTop: MobilePxToVw(40),
  },
}))

export const ThemeListingContentBox = styled(Box)(() => ({
  marginLeft: DesktopPxToVw(22),
  "@media (max-width: 640px)": {
    marginLeft: MobilePxToVw(22),
  },
}))

export const BlogThemeTextAndLikesCount = styled(Box)(() => ({
  "@media (max-width: 640px)": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: MobilePxToVw(10),
  },
}))
