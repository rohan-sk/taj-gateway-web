import { Group } from "@mui/icons-material"
import dynamic from "next/dynamic"
import {
  ComponentMap,
  Unknown,
  BlockSection,
  RenderCardComponent,
  RenderNudgeComponent,
  RenderShareComponent,
  SwitchCaseBlock,
  RenderBannerComponent,
} from "../../components"
import { RenderFaqsComponent } from "../booking/components"
import { RenderTabsComponent, RenderLayoutPlaceholder } from "../destination/components"

export const components: ComponentMap = {
  faqs: RenderFaqsComponent,
  group: Group,
  unknown: Unknown,
  blockSection: BlockSection,
  card: RenderCardComponent,
  nudge: RenderNudgeComponent,
  link: RenderShareComponent,
  switchCaseBlock: SwitchCaseBlock,
  banner: RenderBannerComponent,
  tabsComponent: RenderTabsComponent,
  layoutPlaceholder: RenderLayoutPlaceholder,
}
const TwoColumnGrid = dynamic(() => import("./ui/group/two-column-grid"))
const BlogBody = dynamic(() => import("./ui/group/blog-body"))
const BlogHeader = dynamic(() => import("./ui/card/blog-header"))
const CommentContent = dynamic(() => import("./ui/comments/comment-content"))
const TagCardsList = dynamic(() => import("./ui/card/tag-cards-list"))
const IndividualTagsList = dynamic(() => import("./ui/layout-placeholder/individual-tags-list"))
const BlogMasonryThemesCard = dynamic(() => import("./ui/card/3-column-masonry-card"))
const StoriesImageTitleCard = dynamic(() => import("./ui/card/stories-images-and-titles-card"))
const StoriesThemeTitles = dynamic(() => import("./ui/card/stories-theme-titles"))
const ArticleTags = dynamic(() => import("./ui/card/article-tags"))
const BlogContent = dynamic(() => import("./ui/layout-placeholder/blog-content"))
const BlogArticleContent = dynamic(() => import("./ui/card/blog-article-content"))
const AboutAuthor = dynamic(() => import("./ui/card/about-author"))
const VerticalLongList = dynamic(() => import("./ui/group/vertical-long-list-group"))
const Stories = dynamic(() => import("./ui/layout-placeholder/stories"))
const Comments = dynamic(() => import("./ui/layout-placeholder/comments"))
const ThemeListingLayout = dynamic(() => import("./ui/layout-placeholder/theme-listing-layout"))
const TwoColumnThemeListingGroupLayout = dynamic(() => import("./ui/group/two-column-theme-listing-group-layout"))

export const groupVariants: ComponentMap = {
  "blog.group.two-column-grid": TwoColumnGrid,
  "blog.group.body": BlogBody,
  "blog.group.vertical.long.list": VerticalLongList,
  "blog.group.two-column-grid-theme-listing": TwoColumnThemeListingGroupLayout,
}

export const cardVariants: ComponentMap = {
  "blog.card.header": BlogHeader,
  "blog.card.article-content": BlogArticleContent,
  "blog.card.author.details": AboutAuthor,
  "blog.card.comment": CommentContent,
  "blog.card.center-card-carousel-with-focused-title": StoriesImageTitleCard,
  "blog.card.story-themes": StoriesThemeTitles,
  "blog.card.article-tags": ArticleTags,
  "blog.card.masonry-alignment": BlogMasonryThemesCard,
  "blog.card.two-column-grid-tag-blogs": TagCardsList,
}

export const placeholderVariants: ComponentMap = {}

export const layoutPlaceholderVariants: ComponentMap = {
  "blog.group.body-content": BlogContent,
  "blog.group.stories": Stories,
  "blog.group.comments": Comments,
  "blog.group.theme-listing-layout": ThemeListingLayout,
  "blog.group.tag-listing-layout": IndividualTagsList,
}
