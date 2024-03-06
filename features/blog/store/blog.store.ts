import { makeAutoObservable, runInAction } from "mobx"
import { handler as publishComment } from "../api/handlers/comment.service"
import { handler as likeIncrement } from "../api/handlers/like.increment.service"

export class BlogStore {
  blogData: any
  articleTags: any
  articleThemes: any
  blogListingData: any
  likeIncrementResponse: any
  commentLoader: boolean = false
  likeIncrementLoader: boolean = false
  blogLikesCount = 0

  constructor() {
    makeAutoObservable(this)
  }

  setBlogData = async (data: any) => {
    runInAction(() => {
      this.blogData = data
      this.blogLikesCount = data?.likes
    })
  }
  setBlogArticleTags = async (data: any) => {
    runInAction(() => {
      this.articleTags = data
    })
  }
  setBlogArticleThemes = async (data: any) => {
    runInAction(() => {
      this.articleThemes = data
    })
  }
  setBlogListingData = async (data: any) => {
    runInAction(() => {
      this.blogListingData = data
    })
  }

  publishComment = async (payload: any) => {
    this.commentLoader = true
    try {
      const response = await publishComment?.apiCall(payload)
      if (response?.error === false) {
        return response
      } else {
        return { response, error: true }
      }
    } catch (error) {
      console?.log("error", error)
      return {
        error: true,
        data: error,
      }
    } finally {
      this.commentLoader = false
    }
  }

  likeIncrement = async (payload: any) => {
    this.likeIncrementLoader = true
    try {
      const response = await likeIncrement?.apiCall(payload)
      if (response?.error === false) {
        runInAction(() => {
          this.likeIncrementResponse = { error: false, data: response }
          this.blogLikesCount = response?.data?.likes
        })
      } else {
        this.likeIncrementResponse = { error: true, data: response }
      }
    } catch (error) {
      console?.log("error", error)
      return {
        error: true,
        data: error,
      }
    } finally {
      this.likeIncrementLoader = false
    }
  }
}

export default BlogStore
